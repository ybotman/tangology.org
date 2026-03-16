#!/usr/bin/env node

/**
 * process-inbox.js
 *
 * Processes completed research from /docs/inbox/ into the live site.
 * Handles: people, eras, glossary terms, orchestras, events
 *
 * Usage:
 *   node scripts/process-inbox.js                        # Process all inbox files
 *   node scripts/process-inbox.js --type person          # Process only people
 *   node scripts/process-inbox.js --type era             # Process only eras
 *   node scripts/process-inbox.js --type glossary        # Process only glossary terms
 *   node scripts/process-inbox.js --type event           # Process only events
 *   node scripts/process-inbox.js --slug gustavo-naveira # Process one file
 *   node scripts/process-inbox.js --dry-run              # Preview without changes
 *   node scripts/process-inbox.js --validate-only        # Just validate
 */

const fs = require('fs');
const path = require('path');

// Paths
const ROOT = path.join(__dirname, '..');
const INBOX_PATH = path.join(ROOT, 'docs/inbox');
const PROCESSED_PATH = path.join(ROOT, 'docs/processed');
const PAPERS_PATH = path.join(ROOT, 'public/tango-papers');
const TIMELINE_DATA_PATH = path.join(ROOT, 'src/app/data/tangoTimelineData.js');
const MASTER_INDEX_PATH = path.join(ROOT, 'public/tango-papers/index/master-index.json');

// Parse args
const args = process.argv.slice(2);
const targetType = args.includes('--type') ? args[args.indexOf('--type') + 1] : null;
const targetSlug = args.includes('--slug') ? args[args.indexOf('--slug') + 1] : null;
const dryRun = args.includes('--dry-run');
const validateOnly = args.includes('--validate-only');
const verbose = args.includes('--verbose') || args.includes('-v');

/**
 * Detect content type from filename or frontmatter
 */
function detectContentType(filename, content) {
  // Check frontmatter first
  if (content.startsWith('---')) {
    const frontmatterEnd = content.indexOf('---', 3);
    if (frontmatterEnd > 0) {
      const frontmatter = content.slice(3, frontmatterEnd);

      // Check for type field
      const typeMatch = frontmatter.match(/^type:\s*(.+)$/m);
      if (typeMatch) {
        const type = typeMatch[1].trim().toLowerCase();
        if (['dancer', 'musician', 'singer', 'teacher', 'organizer', 'composer'].includes(type)) {
          return 'person';
        }
        if (type === 'glossary' || type === 'term') {
          return 'glossary';
        }
        if (type === 'orchestra') {
          return 'orchestra';
        }
        if (type === 'event') {
          return 'event';
        }
        if (type === 'era') {
          return 'era';
        }
      }

      // Check for category field (eras)
      const categoryMatch = frontmatter.match(/^category:\s*(.+)$/m);
      if (categoryMatch) {
        const cat = categoryMatch[1].trim().toLowerCase();
        if (['argentina', 'europe', 'usa', 'dancers', 'orchestras'].includes(cat)) {
          return 'era';
        }
      }
    }
  }

  // Fallback: guess from filename
  if (filename.includes('glossary-') || filename.includes('term-')) {
    return 'glossary';
  }
  if (filename.includes('event-')) {
    return 'event';
  }
  if (filename.includes('era-') || filename.includes('epoca-') || filename.includes('guardia-')) {
    return 'era';
  }
  if (filename.includes('orchestra-') || filename.includes('di-sarli') || filename.includes('darienzo') || filename.includes('pugliese') || filename.includes('troilo')) {
    return 'orchestra';
  }

  // Default to person
  return 'person';
}

/**
 * Parse YAML frontmatter
 */
function parseFrontmatter(content) {
  if (!content.startsWith('---')) {
    return { frontmatter: null, body: content };
  }

  const endIndex = content.indexOf('---', 3);
  if (endIndex === -1) {
    return { frontmatter: null, body: content };
  }

  const yaml = content.slice(3, endIndex).trim();
  const body = content.slice(endIndex + 3).trim();

  // Simple YAML parsing
  const frontmatter = {};
  const lines = yaml.split('\n');

  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.slice(0, colonIndex).trim();
      let value = line.slice(colonIndex + 1).trim();

      // Handle arrays
      if (value.startsWith('[') && value.endsWith(']')) {
        value = value.slice(1, -1).split(',').map(s => s.trim().replace(/["']/g, '')).filter(Boolean);
      }
      // Handle null
      else if (value === 'null' || value === '~') {
        value = null;
      }
      // Handle booleans
      else if (value === 'true') {
        value = true;
      } else if (value === 'false') {
        value = false;
      }
      // Handle quoted strings
      else if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }

      frontmatter[key] = value;
    }
  }

  return { frontmatter, body };
}

/**
 * Validate content based on type
 */
function validateContent(content, type, slug) {
  const errors = [];
  const warnings = [];
  const { frontmatter, body } = parseFrontmatter(content);

  if (!frontmatter) {
    errors.push('Missing YAML frontmatter');
    return { valid: false, errors, warnings };
  }

  // Common validations
  if (!frontmatter.id) {
    errors.push('Missing required field: id');
  } else if (frontmatter.id !== slug) {
    warnings.push(`Frontmatter id "${frontmatter.id}" doesn't match filename "${slug}"`);
  }

  if (!frontmatter.lastUpdated) {
    warnings.push('Missing lastUpdated field');
  }

  // Type-specific validations
  switch (type) {
    case 'person':
      if (!frontmatter.name) errors.push('Missing required field: name');
      if (!frontmatter.type) errors.push('Missing required field: type');
      if (!frontmatter.status) errors.push('Missing required field: status');
      if (!body.includes('## Biography')) warnings.push('Missing Biography section');
      break;

    case 'era':
      if (!frontmatter.name) errors.push('Missing required field: name');
      if (!frontmatter.category) errors.push('Missing required field: category');
      if (!frontmatter.startYear) errors.push('Missing required field: startYear');
      if (!frontmatter.endYear) errors.push('Missing required field: endYear');
      break;

    case 'glossary':
      if (!frontmatter.term) errors.push('Missing required field: term');
      if (!frontmatter.translation) warnings.push('Missing translation field');
      if (!frontmatter.definition) warnings.push('Missing definition field');
      break;

    case 'orchestra':
      if (!frontmatter.name) errors.push('Missing required field: name');
      if (!frontmatter.leader) warnings.push('Missing leader field');
      break;

    case 'event':
      if (!frontmatter.headline) errors.push('Missing required field: headline');
      if (!frontmatter.date) errors.push('Missing required field: date');
      if (!frontmatter.eventType) warnings.push('Missing eventType field');
      break;
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    frontmatter,
    body
  };
}

/**
 * Get destination path for content
 */
function getDestPath(type, slug, frontmatter) {
  switch (type) {
    case 'person':
      return path.join(PAPERS_PATH, 'people', `${slug}.md`);
    case 'era':
      const category = frontmatter?.category || 'argentina';
      return path.join(PAPERS_PATH, category, `${slug}.md`);
    case 'glossary':
      return path.join(PAPERS_PATH, 'glossary', `${slug}.md`);
    case 'orchestra':
      return path.join(PAPERS_PATH, 'orchestras', `${slug}.md`);
    case 'event':
      return path.join(PAPERS_PATH, 'events', `${slug}.md`);
    default:
      return path.join(PAPERS_PATH, 'misc', `${slug}.md`);
  }
}

/**
 * Publish content to destination
 */
function publishContent(content, destPath) {
  if (dryRun || validateOnly) {
    console.log(`  [DRY RUN] Would write: ${path.relative(ROOT, destPath)}`);
    return;
  }

  const dir = path.dirname(destPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(destPath, content);
  console.log(`  Published: ${path.relative(ROOT, destPath)}`);
}

/**
 * Update master index with new entry
 */
function updateMasterIndex(type, slug, frontmatter, destPath) {
  if (dryRun || validateOnly) {
    console.log(`  [DRY RUN] Would update master-index.json`);
    return;
  }

  let index = { entities: [], version: '1.0', lastUpdated: '' };
  if (fs.existsSync(MASTER_INDEX_PATH)) {
    index = JSON.parse(fs.readFileSync(MASTER_INDEX_PATH, 'utf8'));
  }

  // Remove existing entry if present
  index.entities = index.entities.filter(e => e.id !== slug);

  // Build new entry based on type
  const entry = {
    id: slug,
    type: type === 'person' ? 'person' : type,
    displayName: frontmatter.name || frontmatter.term || frontmatter.headline || slug,
    paperPath: '/' + path.relative(path.join(ROOT, 'public'), destPath)
  };

  // Type-specific fields
  if (type === 'person') {
    entry.fullName = frontmatter.fullName || frontmatter.name;
    entry.born = frontmatter.born;
    entry.died = frontmatter.died;
    entry.status = frontmatter.status;
    entry.personType = frontmatter.type;
    entry.tags = frontmatter.tags || [];
    entry.eras = frontmatter.eras || [];
    entry.summary = frontmatter.summary || '';
  } else if (type === 'glossary') {
    entry.term = frontmatter.term;
    entry.translation = frontmatter.translation;
    entry.definition = frontmatter.definition;
    entry.category = frontmatter.category;
  } else if (type === 'era') {
    entry.category = frontmatter.category;
    entry.startYear = frontmatter.startYear;
    entry.endYear = frontmatter.endYear;
  }

  index.entities.push(entry);
  index.lastUpdated = new Date().toISOString().split('T')[0];

  fs.writeFileSync(MASTER_INDEX_PATH, JSON.stringify(index, null, 2) + '\n');
  console.log(`  Updated: master-index.json`);
}

/**
 * Archive processed file
 */
function archiveFile(sourcePath, slug, type) {
  if (dryRun || validateOnly) {
    console.log(`  [DRY RUN] Would archive to: docs/processed/${type}/${slug}.md`);
    return;
  }

  const destDir = path.join(PROCESSED_PATH, type);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  const destPath = path.join(destDir, `${slug}.md`);
  fs.renameSync(sourcePath, destPath);
  console.log(`  Archived: docs/processed/${type}/${slug}.md`);
}

/**
 * Find inbox files
 */
function findInboxFiles() {
  if (!fs.existsSync(INBOX_PATH)) {
    return [];
  }

  return fs.readdirSync(INBOX_PATH)
    .filter(f => f.endsWith('.md'))
    .filter(f => !f.startsWith('README'))
    .map(f => ({
      filename: f,
      slug: f.replace('.md', ''),
      filepath: path.join(INBOX_PATH, f)
    }));
}

/**
 * Process a single file
 */
function processFile(file) {
  console.log(`\nProcessing: ${file.filename}`);

  const content = fs.readFileSync(file.filepath, 'utf8');
  const type = detectContentType(file.filename, content);

  console.log(`  Type: ${type}`);

  // Filter by target type if specified
  if (targetType && type !== targetType) {
    console.log(`  Skipped: type "${type}" doesn't match filter "${targetType}"`);
    return { success: false, skipped: true, slug: file.slug };
  }

  // Validate
  const validation = validateContent(content, type, file.slug);

  if (validation.errors.length > 0) {
    console.log('  ERRORS:');
    validation.errors.forEach(e => console.log(`    - ${e}`));
  }

  if (verbose && validation.warnings.length > 0) {
    console.log('  Warnings:');
    validation.warnings.forEach(w => console.log(`    - ${w}`));
  }

  if (!validation.valid) {
    console.log(`  FAILED: validation errors`);
    return { success: false, slug: file.slug, errors: validation.errors };
  }

  if (validateOnly) {
    console.log(`  VALID`);
    return { success: true, slug: file.slug, validateOnly: true };
  }

  // Process
  try {
    const destPath = getDestPath(type, file.slug, validation.frontmatter);

    // 1. Publish content
    publishContent(content, destPath);

    // 2. Update index
    updateMasterIndex(type, file.slug, validation.frontmatter, destPath);

    // 3. Archive
    archiveFile(file.filepath, file.slug, type);

    return { success: true, slug: file.slug, type };
  } catch (error) {
    console.error(`  ERROR: ${error.message}`);
    return { success: false, slug: file.slug, error: error.message };
  }
}

/**
 * Main
 */
function main() {
  console.log('=== Tangology Content Inbox Processor ===');
  console.log(`Mode: ${dryRun ? 'DRY RUN' : validateOnly ? 'VALIDATE ONLY' : 'LIVE'}`);
  if (targetType) console.log(`Filter: --type ${targetType}`);
  if (targetSlug) console.log(`Filter: --slug ${targetSlug}`);

  let files = findInboxFiles();

  if (files.length === 0) {
    console.log('\nNo files found in docs/inbox/');
    return;
  }

  console.log(`\nFound ${files.length} file(s) in inbox`);

  // Filter by slug if specified
  if (targetSlug) {
    files = files.filter(f => f.slug === targetSlug);
    if (files.length === 0) {
      console.error(`Slug not found: ${targetSlug}`);
      process.exit(1);
    }
  }

  // Process
  const results = files.map(processFile);

  // Summary
  console.log('\n=== Summary ===');
  const processed = results.filter(r => r.success && !r.validateOnly);
  const validated = results.filter(r => r.success && r.validateOnly);
  const skipped = results.filter(r => r.skipped);
  const failed = results.filter(r => !r.success && !r.skipped);

  if (processed.length > 0) {
    console.log(`Processed: ${processed.length}`);
    processed.forEach(r => console.log(`  - ${r.slug} (${r.type})`));
  }

  if (validated.length > 0) {
    console.log(`Validated: ${validated.length}`);
  }

  if (skipped.length > 0) {
    console.log(`Skipped: ${skipped.length}`);
  }

  if (failed.length > 0) {
    console.log(`Failed: ${failed.length}`);
    failed.forEach(r => console.log(`  - ${r.slug}: ${r.errors?.join(', ') || r.error}`));
  }

  if (dryRun || validateOnly) {
    console.log('\nNo files were modified.');
  }
}

main();
