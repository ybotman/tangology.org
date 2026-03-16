#!/usr/bin/env node

/**
 * generate-prompt.js
 *
 * Generates research prompts for the Deep Research LLM.
 * Supports: people, eras, glossary terms, orchestras
 *
 * Usage:
 *   node scripts/generate-prompt.js person chicho-frumboli
 *   node scripts/generate-prompt.js era epoca-de-oro --category argentina
 *   node scripts/generate-prompt.js glossary cabeceo
 *   node scripts/generate-prompt.js orchestra di-sarli
 *   node scripts/generate-prompt.js --list-pending    # Show all pending items
 *   node scripts/generate-prompt.js --dry-run         # Preview without writing
 */

const fs = require('fs');
const path = require('path');

// Paths
const ROOT = path.join(__dirname, '..');
const PROMPTS_PATH = path.join(ROOT, 'docs/prompts');
const OUTBOX_PATH = path.join(ROOT, 'docs/outbox');
const QUEUES_PATH = path.join(ROOT, 'docs/queues');
const TIMELINE_DATA_PATH = path.join(ROOT, 'src/app/data/tangoTimelineData.js');
const PAPERS_PATH = path.join(ROOT, 'public/tango-papers');

// Parse args
const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const listPending = args.includes('--list-pending');
const category = args.includes('--category') ? args[args.indexOf('--category') + 1] : null;

// Get content type and slug from args
const filteredArgs = args.filter(a => !a.startsWith('--') && args[args.indexOf(a) - 1] !== '--category');
const contentType = filteredArgs[0];
const slug = filteredArgs[1];

/**
 * Load queue file if it exists
 */
function loadQueue(type) {
  const queuePath = path.join(QUEUES_PATH, `${type}-queue.json`);
  if (fs.existsSync(queuePath)) {
    return JSON.parse(fs.readFileSync(queuePath, 'utf8'));
  }
  return { queue: [], stats: {} };
}

/**
 * Save queue file
 */
function saveQueue(type, queue) {
  const queuePath = path.join(QUEUES_PATH, `${type}-queue.json`);
  fs.writeFileSync(queuePath, JSON.stringify(queue, null, 2) + '\n');
}

/**
 * Load template for content type
 */
function loadTemplate(type) {
  const templates = {
    person: 'person-research-template.md',
    era: 'era-research-template.md',
    glossary: 'glossary-research-template.md',
    orchestra: 'orchestra-research-template.md'
  };

  const templatePath = path.join(PROMPTS_PATH, templates[type] || `${type}-research-template.md`);
  if (fs.existsSync(templatePath)) {
    return fs.readFileSync(templatePath, 'utf8');
  }

  // Default template
  return `# ${type.charAt(0).toUpperCase() + type.slice(1)} Research Task

Research the following ${type}: {{SLUG}}

{{EXISTING_DATA}}

## Output Requirements
- Comprehensive markdown content
- YAML frontmatter with required fields
- Sources cited
- HITM Review Flags for uncertain facts

## Frontmatter Fields
{{FRONTMATTER_SCHEMA}}
`;
}

/**
 * Get existing data for an item
 */
function getExistingData(type, slug, category) {
  let existing = [];

  // Check if paper already exists
  let paperPath;
  switch (type) {
    case 'person':
      paperPath = path.join(PAPERS_PATH, 'people', `${slug}.md`);
      break;
    case 'era':
      paperPath = path.join(PAPERS_PATH, category || 'argentina', `${slug}.md`);
      break;
    case 'glossary':
      paperPath = path.join(PAPERS_PATH, 'glossary', `${slug}.md`);
      break;
    case 'orchestra':
      paperPath = path.join(PAPERS_PATH, 'orchestras', `${slug}.md`);
      break;
  }

  if (paperPath && fs.existsSync(paperPath)) {
    existing.push(`### Existing Paper\n\n${fs.readFileSync(paperPath, 'utf8').slice(0, 2000)}...\n`);
  }

  // For eras, check timeline data
  if (type === 'era' && fs.existsSync(TIMELINE_DATA_PATH)) {
    const timelineContent = fs.readFileSync(TIMELINE_DATA_PATH, 'utf8');
    const eraPattern = new RegExp(`id:\\s*["']${slug}["'][^}]+}`, 'gs');
    const match = timelineContent.match(eraPattern);
    if (match) {
      existing.push(`### Timeline Data Entry\n\n\`\`\`javascript\n${match[0]}\n\`\`\`\n`);
    }
  }

  // Check queue for notes
  const queue = loadQueue(type);
  const queueEntry = queue.queue?.find(q => q.slug === slug);
  if (queueEntry?.notes) {
    existing.push(`### Research Notes\n\n${queueEntry.notes}\n`);
  }

  return existing.length > 0 ? existing.join('\n---\n\n') : '*No existing data found*';
}

/**
 * Get frontmatter schema for type
 */
function getFrontmatterSchema(type) {
  const schemas = {
    person: `\`\`\`yaml
---
id: slug
name: "Full Name with Nickname"
type: dancer|musician|singer|teacher|organizer|composer
status: active|historical|deceased
born: YYYY or YYYY-MM-DD
birthPlace: "City, Country"
died: YYYY or null
deathPlace: "City, Country" or null
tags: [tag1, tag2]
eras: [era-id-1, era-id-2]
featured: false
lastUpdated: YYYY-MM-DD
---
\`\`\``,

    era: `\`\`\`yaml
---
id: era-slug
name: "Era Display Name"
category: argentina|europe|usa|dancers|orchestras
type: era
startYear: YYYY
endYear: YYYY
status: placeholder|partial|populated
lastUpdated: YYYY-MM-DD
---
\`\`\``,

    glossary: `\`\`\`yaml
---
id: term-slug
term: "Spanish Term"
translation: "English Translation"
type: glossary
category: dance|music|social|vocabulary
definition: "Brief definition"
pronunciation: "pro-nun-see-AY-shun"
lastUpdated: YYYY-MM-DD
---
\`\`\``,

    orchestra: `\`\`\`yaml
---
id: orchestra-slug
name: "Orchestra Name"
leader: "Leader Full Name"
type: orchestra
era: golden-orchestras|post-golden|revival-orchestras
activeYears: "YYYY-YYYY"
style: "Style description"
lastUpdated: YYYY-MM-DD
---
\`\`\``
  };

  return schemas[type] || '(No schema defined)';
}

/**
 * Generate prompt content
 */
function generatePrompt(type, slug, category) {
  const template = loadTemplate(type);
  const existingData = getExistingData(type, slug, category);
  const schema = getFrontmatterSchema(type);

  let prompt = template
    .replace(/\{\{SLUG\}\}/g, slug)
    .replace(/\{\{EXISTING_DATA\}\}/g, existingData)
    .replace(/\{\{FRONTMATTER_SCHEMA\}\}/g, schema);

  // Add category for eras
  if (type === 'era' && category) {
    prompt = prompt.replace(/\{\{CATEGORY\}\}/g, category);
  }

  // Add header
  const header = `# Research Prompt: ${type} / ${slug}
Generated: ${new Date().toISOString().split('T')[0]}
Type: ${type}
Slug: ${slug}
${category ? `Category: ${category}` : ''}

---

`;

  return header + prompt;
}

/**
 * Save prompt to outbox
 */
function savePrompt(type, slug, content) {
  const filename = `prompt-${type}-${slug}.md`;
  const filepath = path.join(OUTBOX_PATH, filename);

  if (dryRun) {
    console.log(`[DRY RUN] Would write: docs/outbox/${filename}`);
    console.log('\n--- Preview (first 500 chars) ---\n');
    console.log(content.slice(0, 500) + '...');
    return filepath;
  }

  if (!fs.existsSync(OUTBOX_PATH)) {
    fs.mkdirSync(OUTBOX_PATH, { recursive: true });
  }

  fs.writeFileSync(filepath, content);
  console.log(`Saved: docs/outbox/${filename}`);
  return filepath;
}

/**
 * Update queue status
 */
function updateQueueStatus(type, slug) {
  if (dryRun) return;

  const queue = loadQueue(type);
  const entry = queue.queue?.find(q => q.slug === slug);

  if (entry) {
    entry.status = 'prompt_ready';
    entry.promptDate = new Date().toISOString().split('T')[0];
    saveQueue(type, queue);
    console.log(`Updated queue: ${slug} -> prompt_ready`);
  }
}

/**
 * List all pending items across queues
 */
function listAllPending() {
  console.log('=== Pending Research Items ===\n');

  const types = ['people', 'era', 'glossary', 'orchestra'];

  for (const type of types) {
    const queue = loadQueue(type);
    const pending = queue.queue?.filter(q => q.status === 'pending') || [];

    if (pending.length > 0) {
      console.log(`${type.toUpperCase()} (${pending.length} pending):`);
      pending.slice(0, 10).forEach(p => {
        console.log(`  - ${p.slug}: ${p.displayName || p.notes || ''}`);
      });
      if (pending.length > 10) {
        console.log(`  ... and ${pending.length - 10} more`);
      }
      console.log('');
    }
  }

  // Also check for placeholder eras in timeline data
  if (fs.existsSync(TIMELINE_DATA_PATH)) {
    const content = fs.readFileSync(TIMELINE_DATA_PATH, 'utf8');
    const placeholders = content.match(/status:\s*["']placeholder["']/g) || [];
    const partials = content.match(/status:\s*["']partial["']/g) || [];
    console.log(`TIMELINE DATA:`);
    console.log(`  - ${placeholders.length} placeholder eras (need content)`);
    console.log(`  - ${partials.length} partial eras (need more content)`);
  }
}

/**
 * Main
 */
function main() {
  console.log('=== Tangology Prompt Generator ===\n');

  if (listPending) {
    listAllPending();
    return;
  }

  if (!contentType || !slug) {
    console.log('Usage:');
    console.log('  node scripts/generate-prompt.js <type> <slug> [--category <cat>]');
    console.log('  node scripts/generate-prompt.js --list-pending');
    console.log('');
    console.log('Types: person, era, glossary, orchestra');
    console.log('');
    console.log('Examples:');
    console.log('  node scripts/generate-prompt.js person chicho-frumboli');
    console.log('  node scripts/generate-prompt.js era epoca-de-oro --category argentina');
    console.log('  node scripts/generate-prompt.js glossary cabeceo');
    console.log('  node scripts/generate-prompt.js orchestra di-sarli');
    process.exit(1);
  }

  console.log(`Type: ${contentType}`);
  console.log(`Slug: ${slug}`);
  if (category) console.log(`Category: ${category}`);
  console.log('');

  // Generate
  const content = generatePrompt(contentType, slug, category);

  // Save
  savePrompt(contentType, slug, content);

  // Update queue
  updateQueueStatus(contentType, slug);

  if (!dryRun) {
    console.log('\nNext steps:');
    console.log('1. Review the prompt in docs/outbox/');
    console.log('2. Send to Deep Research LLM');
    console.log('3. Save response to docs/inbox/');
    console.log('4. Run: node scripts/process-inbox.js');
  }
}

main();
