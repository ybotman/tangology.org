# TANGOLOGY.ORG — COMPLETE RESEARCH BRIEFING

**For: Deep Research LLM**
**Consolidated: All context needed to produce content for tangology.org**

---

# PART 1: PROJECT INTRODUCTION

## What Is Tangology?

**The definitive digital archive and educational resource for Argentine Tango history, culture, and community.**

### Mission

- **Preserve** the oral history and traditions of tango before they are lost
- **Educate** dancers, musicians, and enthusiasts about tango's rich heritage
- **Connect** the global tango community through shared knowledge
- **Document** the evolution from Buenos Aires origins to worldwide phenomenon

### Why This Matters

The last generation who danced in the Golden Age (1935-1955) is passing. Oral traditions are being lost. Tangology aims to be the authoritative, multilingual resource that preserves this heritage.

---

## Content Pillars

| Pillar | Description |
|--------|-------------|
| **Timeline** | Interactive history 1880s-present |
| **People** | Dancers, musicians, teachers, organizers |
| **Orchestras** | Golden age + contemporary ensembles |
| **Glossary** | Spanish/English tango vocabulary |
| **Events** | Key historical moments |
| **Eras** | Deep-dive papers on periods |

---

## Target Audiences

- **Dancers** — Learning history to dance with understanding
- **Teachers** — Reference material for curriculum
- **DJs** — Orchestra profiles, essential recordings
- **Researchers** — Verified facts with citations
- **Enthusiasts** — Accessible narratives

---

# PART 2: ERA TAXONOMY

## Argentina (8 eras)

| ID | Years | Description |
|----|-------|-------------|
| guardia-vieja | 1880-1917 | Early pioneers, brothel origins |
| guardia-nueva | 1917-1935 | Codification and respectability |
| **epoca-de-oro** | **1935-1955** | **Golden Age, peak popularity** |
| decadencia | 1955-1983 | Military rule, suppression |
| renacimiento | 1983-1995 | Revival post-dictatorship |
| investigacion | 1995-2005 | Research into old styles |
| nuevo-peak | 2005-2015 | Tango nuevo flourishes |
| neo-traditional | 2015-present | Return to roots |

## Dancers (4 generations)

| ID | Description |
|----|-------------|
| guardian-generation | Last milongueros from golden age |
| bridge-generation | Learned from guardians, taught foreigners |
| nuevo-innovators | Created nuevo vocabulary |
| stage-pioneers | Show tango that spread globally |

## Orchestras (4 eras)

| ID | Years | Key Orchestras |
|----|-------|----------------|
| early-orchestras | 1900-1935 | Firpo, early Canaro |
| golden-orchestras | 1935-1955 | D'Arienzo, Di Sarli, Troilo, Pugliese |
| post-golden | 1955-1985 | Salgán, decline period |
| revival-orchestras | 1985-present | Sexteto Mayor, El Arranque |

## Europe (10 eras)

first-tangomania, interwar, disconnect, piazzolla-europe, paris-explosion, first-communities, german-nordic, film-legitimacy, festival-era, maturation

## USA (5 eras)

early-usa, ballroom-era, broadway-impact, american-growth, american-present

---

# PART 3: CONTENT TYPES & FORMATS

## Person Types

| Type | Description |
|------|-------------|
| dancer | Social or stage dancer |
| musician | Instrumentalist |
| singer | Tango vocalist |
| teacher | Primarily known for teaching |
| organizer | Milonga/festival organizer |
| composer | Wrote tango music |

## Status Values

For eras: `placeholder` | `partial` | `populated`

For people: `active` | `historical` | `deceased`

---

# PART 4: OUTPUT TEMPLATES

## Person Profile

### Frontmatter
```yaml
---
id: firstname-lastname
name: "Full Name with Nickname"
type: dancer|musician|singer|teacher|organizer|composer
status: active|historical|deceased
born: YYYY or YYYY-MM-DD
birthPlace: "City, Country"
died: YYYY or null
tags: [tag1, tag2]
eras: [era-id-1, era-id-2]
partners: [partner-slug]
featured: false
lastUpdated: YYYY-MM-DD
---
```

### Body
```markdown
# [Full Name]

[2-3 sentence summary]

## Biography
[300-500 words narrative]

## Career Highlights
- **[Year]**: [Achievement]

## Style & Philosophy
[200-300 words]

## Notable Quotes
> "[Quote]" — [Source, Year]

## Videos
| Title | Year | Partner | Link |
|-------|------|---------|------|

## Cross-References
- [Related content]

## HITM Review Flags
- **[Claim]**: [Why uncertain]

---
**Note**: AI-assisted content. Verify against primary sources.
```

---

## Era Paper

### Frontmatter
```yaml
---
id: era-slug
name: "Era Display Name"
category: argentina|europe|usa|dancers|orchestras
type: era
startYear: YYYY
endYear: YYYY
status: populated
lastUpdated: YYYY-MM-DD
---
```

### Body
```markdown
# [Era Name] ([Years])

## Overview
[2-3 paragraphs]

## Timeline of Key Events
| Year | Event | Significance |

## Key Figures
### [Person] — "[Nickname]"
[Brief profile]

## Cultural Context
## Musical Developments
## Dance Evolution
## Legacy

## Sources
## HITM Review Flags

---
**Note**: AI-assisted content.
```

---

## Orchestra Profile

### Frontmatter
```yaml
---
id: orchestra-slug
name: "Orchestra Name"
leader: "Leader Name"
type: orchestra
era: golden-orchestras
activeYears: "YYYY-YYYY"
style: "Style description"
lastUpdated: YYYY-MM-DD
---
```

### Body
```markdown
# Orquesta [Name]

*"[Nickname]"*

## Overview
## The Leader
## Musical Style
- **Tempo:** Fast/Medium/Slow
- **Feel:** Staccato/Legato

## Key Musicians
## Essential Recordings
| Title | Year | Singer | Notes |

## For DJs
- **BPM range:**
- **Pairs well with:**

## Legacy
## HITM Review Flags

---
**Note**: AI-assisted content.
```

---

## Glossary Term

### Frontmatter
```yaml
---
id: term-slug
term: "Spanish Term"
translation: "English"
type: glossary
category: dance|music|social|vocabulary
definition: "Brief definition"
pronunciation: "phonetic"
lastUpdated: YYYY-MM-DD
---
```

### Body
```markdown
# [Term]

**[Translation]**

[Definition]

## Etymology
## Usage in Tango
## Related Terms
## Pronunciation Guide

---
**Note**: AI-assisted content.
```

---

# PART 5: INDEX ENTRY FORMAT

Always provide a JSON entry for master-index.json:

```json
{
  "id": "slug",
  "type": "person|era|orchestra|glossary",
  "displayName": "Display Name",
  "summary": "One sentence",
  "paperPath": "/tango-papers/category/slug.md"
}
```

### Person Example
```json
{
  "id": "chicho-frumboli",
  "type": "person",
  "displayName": "Chicho Frúmboli",
  "fullName": "Mariano Frúmboli",
  "born": "1970",
  "died": null,
  "status": "active",
  "personType": "dancer",
  "tags": ["nuevo", "performer"],
  "eras": ["nuevo-peak"],
  "summary": "Key figure in tango nuevo movement",
  "paperPath": "/tango-papers/people/chicho-frumboli.md"
}
```

---

# PART 6: QUALITY STANDARDS

## Required for All Content

- [ ] Valid YAML frontmatter
- [ ] Dates verified (2+ sources)
- [ ] Full names with nicknames
- [ ] Spanish translated to English
- [ ] Sources cited
- [ ] HITM flags for uncertainties
- [ ] Cross-references included
- [ ] AI disclaimer

## HITM Review Flags Format

```markdown
## HITM Review Flags

- **Birth year**: Sources conflict (1938 vs 1940)
- **Quote**: Need primary source verification
```

---

# PART 7: SOURCE PRIORITY

1. **Primary** — Interviews, documentaries, their own writings
2. **Academic** — Carolyn Merritt, Christine Denniston, Marta Savigliano
3. **Established** — Todo Tango, UNESCO documentation
4. **Community** — tejastango.com, tangoandchaos.org
5. **General** — Wikipedia (verify cited sources)

---

# PART 8: WHAT NOT TO DO

- **Don't guess URLs** — Provide search terms instead
- **Don't copy text** — Original synthesis only
- **Don't hallucinate dates** — Flag uncertainties
- **Don't skip frontmatter** — Required for processing
- **Don't forget sources** — Cite key claims

---

# PART 9: IMMEDIATE PRIORITIES

## Orchestras (Big Four)
1. Juan D'Arienzo — "El Rey del Compás"
2. Carlos Di Sarli — "El Señor del Tango"
3. Aníbal Troilo — "Pichuco"
4. Osvaldo Pugliese

## Eras
1. Época de Oro (1935-1955) — The most important era
2. Guardian Generation — Last milongueros

## Glossary (Core Terms)
cabeceo, tanda, cortina, milonga, milonguero, abrazo, compás, ocho, giro

---

# CHECKLIST FOR SUBMISSION

Before providing content:

- [ ] Frontmatter complete and valid
- [ ] All required sections present
- [ ] Dates verified
- [ ] Spanish terms translated
- [ ] Sources cited
- [ ] HITM flags added for uncertainties
- [ ] Cross-references included
- [ ] JSON index entry provided
- [ ] AI disclaimer at end

---

**END OF BRIEFING**

*This document contains everything needed to produce content for tangology.org.*
