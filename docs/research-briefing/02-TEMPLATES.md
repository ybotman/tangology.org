# Tangology Content Templates

**All output must follow these templates exactly.**

---

# PART 1: PERSON PROFILE TEMPLATE

## Frontmatter

```yaml
---
id: firstname-lastname
name: "Full Name with Nickname"
type: dancer|musician|singer|teacher|organizer|composer
status: active|historical|deceased
born: YYYY or YYYY-MM-DD
birthPlace: "City, Country"
died: YYYY or null
deathPlace: "City, Country" or null
image: null
tags: [tag1, tag2, tag3]
eras: [era-id-1, era-id-2]
partners: [partner-slug-1, partner-slug-2]
featured: false
lastUpdated: YYYY-MM-DD
---
```

## Body Structure

```markdown
# [Full Name]

[2-3 sentence summary: who they are, why they matter]

## Biography

[Detailed biography in narrative form. 300-500 words. Include birth, early life, how they came to tango, key life events, death if applicable.]

## Career Highlights

- **[Year]**: [Achievement]
- **[Year]**: [Achievement]

## Style & Philosophy

[What distinguishes their dancing/music/teaching. Quote them directly where possible. 200-300 words.]

## Notable Quotes

> "[Quote]"
> — [Source, Year]

> "[Quote]"
> — [Source, Year]

## Videos

| Title | Year | Partner/Context | Link |
|-------|------|-----------------|------|
| [Title] | [Year] | [Partner] | [YouTube](url) |

## Links

- [Todo Tango Profile](url)
- [Wikipedia](url)

## Cross-References

- [Related Era Paper](/tango-papers/category/era.md)
- [Related Person](/people/person-slug)

## HITM Review Flags

- **[Claim]**: [Why uncertain]

---

**Note**: Content developed with AI assistance. Verify against primary sources.
```

---

# PART 2: ERA PAPER TEMPLATE

## Frontmatter

```yaml
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
```

## Body Structure

```markdown
# [Era Name] ([Years])

*[Subtitle describing this period]*

## Overview

[2-3 paragraph introduction covering what defines this era]

## Timeline of Key Events

| Year | Event | Significance |
|------|-------|--------------|
| [Year] | [Event] | [Why it matters] |

## Key Figures

### [Person Name] — "[Nickname]"

**Role:** [Dancer/Musician/etc.]
**Active:** [Years]

[Brief profile paragraph]

## Cultural & Political Context

[What was happening in Argentina/world that affected tango]

## Musical Developments

[How did the music change during this period]

## Dance Evolution

[How did the dance change]

## Legacy

[Lasting impact of this era]

## Cross-References

- **Previous Era:** [Link]
- **Next Era:** [Link]
- **Related Category:** [Link to dancers/orchestras/etc.]

## Sources

1. [Source with citation]
2. [Source with citation]

## HITM Review Flags

- **[Fact]**: [Why uncertain]

---

**Note**: Content developed with AI assistance. Verify against primary sources.
```

---

# PART 3: ORCHESTRA PROFILE TEMPLATE

## Frontmatter

```yaml
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
```

## Body Structure

```markdown
# Orquesta [Name]

*"[Nickname/Epithet]" — [One-line description]*

## Overview

[2-3 paragraph summary of significance]

## The Leader

### [Full Name] — "[Nickname]"

**Born:** [Date, Place]
**Died:** [Date, Place]
**Instrument:** [Primary]

[Biographical narrative]

## Musical Style

- **Tempo:** Fast/Medium/Slow
- **Feel:** Staccato/Legato/Mixed
- **Best for:** Social dancing/Performance

[Detailed style description]

## Key Musicians

### Singers

| Name | Years | Notable Songs |
|------|-------|---------------|
| [Singer] | [Years] | [Songs] |

## Essential Recordings

| Title | Year | Singer | Notes |
|-------|------|--------|-------|
| [Song] | [Year] | [Singer] | [Why essential] |

## For DJs

- **Tempo range:** [BPM]
- **Energy level:** High/Medium/Low
- **Pairs well with:** [Other orchestras]

## Legacy

[Lasting influence]

## HITM Review Flags

- **[Fact]**: [Why uncertain]

---

**Note**: Content developed with AI assistance. Verify against primary sources.
```

---

# PART 4: GLOSSARY TERM TEMPLATE

## Frontmatter

```yaml
---
id: term-slug
term: "Spanish Term"
translation: "English Translation"
type: glossary
category: dance|music|social|vocabulary
definition: "Brief one-line definition"
pronunciation: "phonetic-guide"
lastUpdated: YYYY-MM-DD
---
```

## Body Structure

```markdown
# [Spanish Term]

**[English Translation]**

[2-3 sentence definition]

## Etymology

[Word origin: Spanish, Lunfardo, Italian, etc.]

## Usage in Tango

[How/when this term is used]

## Cultural Context

[Any cultural significance]

## Related Terms

- **[term]** — [connection]

## Pronunciation Guide

**[term]** — [phonetic, e.g., "ca-be-CE-o"]

## Common Mistakes

[What beginners get wrong]

---

**Note**: Content developed with AI assistance. Verify against primary sources.
```

---

# PART 5: EVENT ENTRY TEMPLATE

For the interactive timeline (TimelineJS3):

```yaml
---
id: event-slug
headline: "Short Event Title"
date: YYYY-MM-DD
endDate: YYYY-MM-DD (optional, for spans)
eventType: Recording|Death|Political|Cultural|Show|Film|Music
type: event
lastUpdated: YYYY-MM-DD
---
```

```markdown
# [Event Headline]

**Date:** [Full date]
**Type:** [Event type]

[2-3 paragraph description of what happened and why it matters]

## Significance

[Why this event was important for tango history]

## Key Figures Involved

- [Person] — [Role]

## Cross-References

- [Related era]
- [Related people]

## Sources

- [Citation]

---

**Note**: Content developed with AI assistance. Verify against primary sources.
```

---

# PART 6: INDEX ENTRY FORMAT

For every piece of content, also provide a JSON entry:

```json
{
  "id": "slug",
  "type": "person|era|orchestra|glossary|event",
  "displayName": "Display Name",
  "paperPath": "/tango-papers/category/slug.md",
  "summary": "One sentence summary"
}
```

### Person Index Entry

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
  "tags": ["nuevo", "performer", "teacher"],
  "eras": ["nuevo-peak", "neo-traditional"],
  "summary": "Argentine tango dancer and innovator, key figure in tango nuevo",
  "paperPath": "/tango-papers/people/chicho-frumboli.md"
}
```

### Orchestra Index Entry

```json
{
  "id": "di-sarli",
  "type": "orchestra",
  "displayName": "Carlos Di Sarli",
  "leader": "Carlos Di Sarli",
  "era": "golden-orchestras",
  "activeYears": "1928-1958",
  "style": "Elegant, lyrical, legato",
  "summary": "El Señor del Tango - master of elegant, danceable tango",
  "paperPath": "/tango-papers/orchestras/di-sarli.md"
}
```

---

# CHECKLIST FOR ALL CONTENT

Before submitting:

- [ ] Valid YAML frontmatter
- [ ] All required fields present
- [ ] Dates verified against 2+ sources
- [ ] Full names with nicknames
- [ ] Spanish terms translated
- [ ] Sources cited
- [ ] HITM flags for uncertain facts
- [ ] Cross-references included
- [ ] JSON index entry provided
- [ ] AI disclaimer included
