# Tangology.org Research Briefing

**For: Deep Research LLM**
**Project: tangology.org — The definitive digital archive of Argentine Tango**

---

## What Is Tangology?

Tangology.org is a comprehensive knowledge base covering:
- **Timeline** — Interactive history from 1880s to present
- **People** — Dancers, musicians, teachers, organizers
- **Orchestras** — Golden age and contemporary ensembles
- **Glossary** — Spanish/English tango vocabulary
- **Events** — Key moments that shaped tango history
- **Eras** — Deep dives into distinct historical periods

---

## Content Architecture

### Data Sources

| Source | Purpose | Format |
|--------|---------|--------|
| **Papers** | Full narratives, bios, detailed content | Markdown with YAML frontmatter |
| **Timeline Data** | Era metadata for visualization | JavaScript |
| **Index Files** | Search, cross-referencing | JSON |

### Content Types

| Type | Location | Example |
|------|----------|---------|
| Era papers | `/public/tango-papers/{category}/{era}.md` | `argentina/epoca-de-oro.md` |
| People profiles | `/public/tango-papers/people/{slug}.md` | `people/chicho-frumboli.md` |
| Orchestra profiles | `/public/tango-papers/orchestras/{slug}.md` | `orchestras/di-sarli.md` |
| Glossary terms | `/public/tango-papers/glossary/{term}.md` | `glossary/cabeceo.md` |
| Event papers | `/public/tango-papers/events/{slug}.md` | `events/tango-argentino-1983.md` |

---

## Era Categories

### Argentina (8 eras)
| ID | Years | Description |
|----|-------|-------------|
| guardia-vieja | 1880-1917 | Early pioneers, brothel origins |
| guardia-nueva | 1917-1935 | Codification and respectability |
| epoca-de-oro | 1935-1955 | Golden Age, peak popularity |
| decadencia | 1955-1983 | Military rule, suppression |
| renacimiento | 1983-1995 | Revival post-dictatorship |
| investigacion | 1995-2005 | Research into old styles |
| nuevo-peak | 2005-2015 | Tango nuevo flourishes |
| neo-traditional | 2015-present | Return to roots |

### Dancers (4 generations)
| ID | Description |
|----|-------------|
| guardian-generation | Last milongueros who danced in golden age |
| bridge-generation | Learned from guardians, taught foreigners |
| nuevo-innovators | Created nuevo vocabulary |
| stage-pioneers | Show tango that spread globally |

### Europe (10 eras)
| ID | Years | Description |
|----|-------|-------------|
| first-tangomania | 1910-1914 | Paris explosion |
| interwar | 1920-1939 | European tango culture |
| disconnect | 1940-1960 | War years, separation |
| piazzolla-europe | 1960-1985 | Nuevo tango music |
| paris-explosion | 1983-1995 | Tango Argentino effect |
| first-communities | 1990-2000 | European milongas form |
| german-nordic | 1995-2005 | Northern Europe growth |
| film-legitimacy | 1995-2005 | Films bring attention |
| festival-era | 2005-2015 | European festivals boom |
| maturation | 2015-present | Established scene |

### USA (5 eras)
| ID | Description |
|----|-------------|
| early-usa | Tangomania, silent film era |
| ballroom-era | American ballroom tango |
| broadway-impact | Forever Tango, Tango Argentino |
| american-growth | Festival scene develops |
| american-present | Current state |

### Orchestras (4 eras)
| ID | Years | Description |
|----|-------|-------------|
| early-orchestras | 1900-1935 | Guardia Vieja orchestras |
| golden-orchestras | 1935-1955 | D'Arienzo, Di Sarli, Troilo, Pugliese |
| post-golden | 1955-1985 | Decline period |
| revival-orchestras | 1985-present | Sexteto Mayor, El Arranque |

---

## Person Types

| Type | Description |
|------|-------------|
| dancer | Social or stage dancer |
| musician | Instrumentalist (bandoneón, piano, violin, etc.) |
| singer | Tango vocalist |
| teacher | Primarily known for teaching |
| organizer | Milonga/festival organizer |
| composer | Wrote tango music |

---

## Status Values

| Status | Meaning |
|--------|---------|
| placeholder | Structure only, no content yet |
| partial | Some content, more needed |
| populated | Complete, ready for users |

For people:
| Status | Meaning |
|--------|---------|
| active | Currently alive and/or active |
| historical | Historical figure, active period passed |
| deceased | Has died |

---

## Quality Standards

### Required for All Papers
- [ ] YAML frontmatter with required fields
- [ ] Accurate dates (verified against multiple sources)
- [ ] Full names with nicknames noted
- [ ] Spanish terms with English translations
- [ ] Sources cited for key claims
- [ ] Cross-references to related content
- [ ] HITM flags for uncertain facts
- [ ] AI assistance disclaimer

### HITM Review Flags

Use this format to flag facts needing human verification:

```markdown
## HITM Review Flags

- **Birth year**: Sources conflict (1938 vs 1940)
- **Quote attribution**: Need primary source
- **Partnership dates**: Approximate only
```

---

## Output Expectations

When you research content for Tangology, provide:

1. **Complete Markdown File** — Ready to save with frontmatter
2. **Index Entry** — JSON for master-index.json
3. **Cross-References** — What other content should link here
4. **Sources** — What you consulted
5. **HITM Flags** — What needs human verification

---

## Source Priority

1. **Primary** — Interviews, documentaries, their own writings
2. **Academic** — Books by Carolyn Merritt, Christine Denniston, Marta Savigliano
3. **Established Reference** — Todo Tango, UNESCO documentation
4. **Community** — tejastango.com, tangoandchaos.org
5. **General** — Wikipedia (verify cited sources)

---

## Important: What NOT to Do

- **Don't guess URLs** — Provide search terms instead of Wikimedia/YouTube URLs
- **Don't copy text** — Original synthesis only
- **Don't hallucinate dates** — Flag uncertain facts
- **Don't skip frontmatter** — Every paper needs valid YAML
- **Don't forget sources** — Cite key claims

---

## Next Document

See **02-TEMPLATES.md** for specific output templates for each content type.
