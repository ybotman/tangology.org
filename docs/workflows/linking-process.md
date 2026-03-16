# Linking Process: Cross-Reference Workflow

## Overview

This document defines how to create and maintain hyperlinks across tangology.org content.

---

## Link Hierarchy

When linking a name/term, use this priority order:

| Priority | Target | When to Use | Example |
|----------|--------|-------------|---------|
| **1** | People Page | Profile exists at `/people/[slug]` | `[Chicho Frúmboli](/people/chicho-frumboli)` |
| **2** | Glossary Term | Term in glossary index | `[cabeceo](/glossary#cabeceo)` |
| **3** | Timeline Era | Era page exists | `[Golden Age](/timeline#epoca-de-oro)` |
| **4** | Plain Text | No page exists yet | `Chicho Frúmboli` (unlinked) |

**Rule:** Always check if a profile exists before linking to glossary.

---

## Link Targets by Type

### People
```markdown
[Carlos Gardel](/people/carlos-gardel)
[Chicho Frúmboli](/people/chicho-frumboli)
```

### Orchestras
```markdown
[Osvaldo Pugliese](/orchestras/osvaldo-pugliese)
[Juan D'Arienzo](/orchestras/juan-darienzo)
```

### Glossary Terms
```markdown
[cabeceo](/glossary#cabeceo)
[abrazo](/glossary#abrazo)
```

### Timeline Eras
```markdown
[Golden Age](/timeline#epoca-de-oro)
[Investigation Era](/timeline#investigacion)
```

---

## When to Update Links

### Trigger: New Profile Published

When a new person/orchestra profile is published:

1. **Update glossary** — If entity is in glossary, add link to profile
2. **Scan timeline data** — Check `tangoTimelineData.js` keyFigures
3. **Scan related papers** — Check era papers for mentions
4. **Scan related profiles** — Check other people profiles
5. **Update master index** — Ensure `paperPath` points to new profile

### Trigger: New Era Paper Published

When a new era paper is created:

1. **Link all mentioned people** who have profiles
2. **Link all mentioned orchestras** who have profiles
3. **Link all glossary terms** used in the paper
4. **Update timeline** — Add `paperPath` to tangoTimelineData.js

---

## Link Discovery

### Using the Script

```bash
# Make executable (first time only)
chmod +x scripts/find-linkable-mentions.sh

# Find all unlinked mentions
./scripts/find-linkable-mentions.sh

# Scan a specific file
./scripts/find-linkable-mentions.sh public/tango-papers/argentina/epoca-de-oro.md
```

### Manual Search

```bash
# Find "Chicho" mentions not already linked
grep -r "Chicho" public/tango-papers/ --include="*.md" | grep -v "\[Chicho"
```

---

## Name Variations to Recognize

| Slug | Variations |
|------|------------|
| chicho-frumboli | Chicho, Chicho Frúmboli, Mariano Frumboli |
| tete-rusconi | Tete, Tete Rusconi, Pedro Rusconi |
| pepito-avellaneda | Pepito, Pepito Avellaneda |
| juan-darienzo | D'Arienzo, Juan D'Arienzo |
| carlos-di-sarli | Di Sarli, Carlos Di Sarli |
| anibal-troilo | Troilo, Aníbal Troilo, Pichuco |
| osvaldo-pugliese | Pugliese, Osvaldo Pugliese |
| carlos-gardel | Gardel, Carlos Gardel |
| gustavo-naveira | Naveira, Gustavo Naveira |

---

## Auto-Linker

Tangology has an auto-linker that automatically links terms in paper content:

**Location:** `/src/lib/content/autoLinker.js`

The auto-linker:
- Links first occurrence of each term only
- Handles glossary terms, people, orchestras
- Runs when papers are loaded

To add new terms, edit `autoLinker.js`:

```javascript
const LINKABLE_TERMS = {
  // Glossary terms
  'cabeceo': '/glossary#cabeceo',
  'milonga': '/glossary#milonga',

  // People
  'Chicho Frúmboli': '/people/chicho-frumboli',
  'Chicho': '/people/chicho-frumboli',

  // Orchestras
  "D'Arienzo": '/orchestras/juan-darienzo',
};
```

---

## Manual Linking Checklist

When processing a new profile:

- [ ] Profile created at `/public/tango-papers/people/[slug].md`
- [ ] Entry added to `master-index.json` with `paperPath`
- [ ] Added to `autoLinker.js` (name variations)
- [ ] Related profiles updated with links
- [ ] Era papers scanned and linked
- [ ] Glossary checked for related terms

---

## Implementation Priority

### Phase 1: High-Value Links (Do First)
1. Link Big Four orchestras in all papers
2. Link Investigation Group in nuevo/investigacion papers
3. Link Guardian generation in dancers papers

### Phase 2: Systematic Coverage
1. Process each era paper alphabetically
2. Add links to all published people
3. Update glossary with links

### Phase 3: Automation
1. Expand autoLinker.js coverage
2. Add new terms as profiles are created

---

*Adapted from tobytango.com workflow*
