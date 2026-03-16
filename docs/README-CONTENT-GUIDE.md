# Tangology Content Guide

How to add new content, identify gaps, and review for accuracy.

---

## Data Sources Overview

Tangology has **two data sources** that must stay in sync:

| Source | What It Contains | Location |
|--------|------------------|----------|
| **Papers** (Markdown) | Full narratives, bios, detailed content | `/public/tango-papers/**/*.md` |
| **Timeline Data** (JS) | Era metadata: dates, summaries, key figures | `/src/app/data/tangoTimelineData.js` |

**Rule:** Every paper should have a corresponding entry in timeline data (for eras) or index files (for people/glossary).

---

## Part 1: Injecting New Content

### A. Adding a New Person Profile

**1. Create the paper:**
```
/public/tango-papers/people/{slug}.md
```

**2. Required frontmatter:**
```yaml
---
id: firstname-lastname
name: "Display Name"
type: dancer|musician|singer|teacher|organizer|composer
status: active|historical|deceased
born: 1940
birthPlace: "Buenos Aires, Argentina"
died: 2010  # or null if alive
tags: [milonguero, golden-age, teacher]
eras: [epoca-de-oro, renacimiento]
featured: false
lastUpdated: 2026-03-16
---
```

**3. Update master index:**
```
/public/tango-papers/index/master-index.json
```

Add entry:
```json
{
  "id": "firstname-lastname",
  "type": "person",
  "displayName": "Display Name",
  "personType": "dancer",
  "born": "1940",
  "died": "2010",
  "summary": "One sentence description",
  "paperPath": "/tango-papers/people/firstname-lastname.md"
}
```

**4. Verify build:**
```bash
npm run build
```

---

### B. Adding a New Era Paper

**1. Create the paper:**
```
/public/tango-papers/{category}/{era-id}.md
```

Categories: `argentina`, `europe`, `usa`, `dancers`, `orchestras`

**2. Update tangoTimelineData.js:**

Find the era entry and update:
```javascript
{
  id: "era-id",
  summary: [
    "First key point about this era",
    "Second key point",
    "Third key point",
    "Fourth key point"
  ],
  keyFigures: [
    { name: "Person Name", type: "individual", role: "description" }
  ],
  status: "populated",  // was "placeholder" or "partial"
  paperPath: "/tango-papers/category/era-id.md"
}
```

**3. Verify build:**
```bash
npm run build
```

---

### C. Adding a Glossary Term

**1. Add to glossary index:**
```
/public/tango-papers/index/glossary/01-tango-terms.json
```

```json
{
  "id": "term-name",
  "term": "Spanish Term",
  "translation": "English Translation",
  "definition": "Full definition explaining the term",
  "category": "dance|music|social|vocabulary",
  "relatedTerms": ["other-term"]
}
```

**2. Optionally create a paper:**
```
/public/tango-papers/glossary/term-name.md
```

**3. Add to auto-linker (optional):**
```
/src/lib/content/autoLinker.js
```

---

### D. Adding a Key Event

Edit `/src/app/[locale]/events/page.jsx`:

```javascript
{
  start_date: { year: "1990", month: "6", day: "15" },
  text: {
    headline: "Event Title",
    text: "<p>Description of what happened and why it matters.</p>",
  },
  group: "Show|Film|Music|Political|Cultural|Death|Recording",
},
```

---

## Part 2: Identifying Content Gaps

### Quick Gap Check

Run these commands to identify missing content:

```bash
# Eras with "placeholder" status (need content)
grep -r '"status": "placeholder"' src/app/data/tangoTimelineData.js

# Eras with "partial" status (need more content)
grep -r '"status": "partial"' src/app/data/tangoTimelineData.js

# Count papers per category
find public/tango-papers -name "*.md" | cut -d'/' -f3 | sort | uniq -c
```

### Gap Analysis by Category

| Category | Check For |
|----------|-----------|
| **Argentina** | All 8 eras should have `status: "populated"` + paper |
| **Europe** | 10 eras defined, most need papers |
| **USA** | 5 eras defined, all need papers |
| **Orchestras** | 4 eras defined, need orchestra profiles |
| **People** | Check `people-queue.json` for pending profiles |
| **Glossary** | Terms in index but no definitions |

### People Queue

Check pending people to profile:
```
/docs/queues/people-queue.json
```

Status values: `pending`, `in_progress`, `completed`, `blocked`

---

## Part 3: Content Review & Audit

### What To Review

| Source | What To Check |
|--------|---------------|
| **Papers** | Facts, dates, names, sources, narrative quality |
| **tangoTimelineData.js** | Summary bullets, key figures, date ranges |
| **Index files** | Birth/death dates, categories, cross-references |

### Review Checklist for Papers

- [ ] **Dates verified** — Birth, death, career milestones against 2+ sources
- [ ] **Names correct** — Full legal name + nickname format
- [ ] **Spanish accurate** — Terms spelled correctly with accents
- [ ] **Sources cited** — Key claims have references
- [ ] **No AI hallucinations** — Facts independently verifiable
- [ ] **Cross-references work** — Links to other papers/people valid

### Review Checklist for Timeline Data

- [ ] **Summary bullets** — 4 substantive points, accurate
- [ ] **Key figures** — Names spelled correctly, roles accurate
- [ ] **Date range** — Start/end years correct
- [ ] **Paper path** — Points to existing file

### Flagging Issues

Add HITM Review Flags to papers:
```markdown
## HITM Review Flags

- **Birth year**: Sources conflict (1938 vs 1940)
- **Quote**: Need primary source verification
- **Partnership dates**: Approximate, need confirmation
```

---

## Part 4: Content Pipeline Workflow

```
┌─────────────────────────────────────────────────────────────────┐
│                    CONTENT PIPELINE                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  1. IDENTIFY GAP                                                 │
│     └─→ Check status fields, queues, missing papers             │
│                                                                  │
│  2. CREATE RESEARCH PROMPT                                       │
│     └─→ Use template from /docs/prompts/                        │
│     └─→ Save to /docs/outbox/                                   │
│                                                                  │
│  3. RESEARCH LLM PRODUCES                                        │
│     └─→ White paper with structured data                        │
│     └─→ Save to /docs/inbox/                                    │
│                                                                  │
│  4. TROILO (CLAUDE CODE) PROCESSES                               │
│     ├─→ Save paper to /public/tango-papers/                     │
│     ├─→ Update tangoTimelineData.js                             │
│     ├─→ Update index files                                      │
│     └─→ Run npm run build                                       │
│                                                                  │
│  5. HUMAN REVIEWS                                                │
│     └─→ Check accuracy, flag issues for HITM network            │
│                                                                  │
│  6. ARCHIVE                                                      │
│     └─→ Move processed doc to /docs/processed/                  │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Part 5: File Locations Reference

| Purpose | Path |
|---------|------|
| **Content** | |
| Era papers | `/public/tango-papers/{category}/{era-id}.md` |
| People papers | `/public/tango-papers/people/{slug}.md` |
| Event papers | `/public/tango-papers/events/{slug}.md` |
| Glossary papers | `/public/tango-papers/glossary/{term}.md` |
| **Data** | |
| Timeline data | `/src/app/data/tangoTimelineData.js` |
| Master index | `/public/tango-papers/index/master-index.json` |
| Glossary index | `/public/tango-papers/index/glossary/*.json` |
| **Pipeline** | |
| Prompt templates | `/docs/prompts/*.md` |
| Research inbox | `/docs/inbox/` |
| Research outbox | `/docs/outbox/` |
| Processed docs | `/docs/processed/` |
| People queue | `/docs/queues/people-queue.json` |
| **Handoffs** | |
| Session handoffs | `/docs/handoffs/sage/` |

---

## Part 6: Prompt Templates

### For Era Research
Use: `/docs/prompts/era-research-template.md`

Key outputs expected:
- Full paper content (markdown)
- Summary bullets for tangoTimelineData.js
- Key figures list
- Index entries for people mentioned

### For Person Research
Use: `/docs/prompts/person-research-template.md`

Key outputs expected:
- Full profile (markdown with frontmatter)
- Master index entry
- Cross-references to eras/other people

---

## Quick Reference Commands

```bash
# Check current content status
grep -c "status.*populated" src/app/data/tangoTimelineData.js
grep -c "status.*partial" src/app/data/tangoTimelineData.js
grep -c "status.*placeholder" src/app/data/tangoTimelineData.js

# Count papers
find public/tango-papers -name "*.md" | wc -l

# Find papers mentioning a person
grep -rl "Troilo" public/tango-papers/

# Build and check for errors
npm run build

# Start dev server to review
npm run dev
```

---

## When In Doubt

1. **New content** → Create paper first, then update data/indexes
2. **Accuracy question** → Add HITM Review Flag, ask El Gotan
3. **Missing cross-reference** → Add to autoLinker.js
4. **Build fails** → Check frontmatter YAML syntax, file paths

---

*Last updated: 2026-03-16*
