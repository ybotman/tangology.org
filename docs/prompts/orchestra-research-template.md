# Orchestra Research Template

Use this template to generate research prompts for tango orchestra profiles.

---

## PROMPT START

```
# Orchestra Research Task: {{SLUG}}

You are a tango music researcher. Your task is to create a comprehensive profile for a tango orchestra.

## Orchestra Being Researched

- **Orchestra:** {{SLUG}}
- **Type:** orchestra

## What We Already Know

{{EXISTING_DATA}}

## Research Scope

Create a complete orchestra profile covering:
1. **History** — Formation, evolution, key periods
2. **Leader** — Biography of the director/bandleader
3. **Style** — Musical characteristics, what makes them distinctive
4. **Key Musicians** — Notable members (singers, instrumentalists)
5. **Essential Recordings** — Must-know songs for DJs and dancers
6. **Legacy** — Influence on tango music and dance

---

## Output Format

### Frontmatter (YAML)

{{FRONTMATTER_SCHEMA}}

### Profile Body

```markdown
# Orquesta [Name]

*[One-line description: "The King of the Beat" / "Master of Lyrical Tango"]*

## Overview

[2-3 paragraph summary of the orchestra's significance, active years, and style]

## The Leader

### [Full Name] — "[Nickname]"

**Born:** [Date, Place]
**Died:** [Date, Place]
**Instrument:** [Primary instrument]

[Biographical narrative: early life, musical training, formation of orchestra]

## Orchestra History

### Formation ([Year])

[How the orchestra came together]

### Peak Years ([Year-Year])

[Their most successful/influential period]

### Later Years

[Evolution, changes, end of active period]

## Musical Style

[What defines their sound? Rhythm, arrangements, tempo]

- **Tempo:** [Fast/Medium/Slow]
- **Feel:** [Staccato/Legato/Mixed]
- **Best for:** [Social dancing/Performance/Both]

## Key Musicians

### Singers

| Name | Years | Notable Songs |
|------|-------|---------------|
| [Singer] | [Years] | [Songs] |

### Instrumentalists

- **[Instrument]:** [Name] — [Contribution]

## Essential Recordings

### For Social Dancing

| Title | Year | Singer | Notes |
|-------|------|--------|-------|
| [Song] | [Year] | [Singer] | [Why essential] |

### Classic Performances

| Title | Year | Notes |
|-------|------|-------|
| [Song] | [Year] | [Significance] |

## Dance Floor Tips

[How do dancers approach this orchestra? What should DJs know?]

- **Tempo range:** [BPM range]
- **Energy level:** [High/Medium/Low]
- **Best placement in tanda:** [Opener/Middle/Closer]
- **Pairs well with:** [Other orchestras for a set]

## Quotes

> "[Quote about their music or style]"
> — [Source]

## Recordings Available

- **Spotify:** [Available? Quality?]
- **Recommended CD:** [If applicable]
- **Digital sources:** [Where to find]

## Legacy

[Their lasting influence on tango music and dance]

## Cross-References

- [Related Era](/tango-papers/orchestras/[era].md)
- [Related Dancers who preferred this orchestra]

## HITM Review Flags

- **[Fact]**: [Why uncertain]

---

**Note**: This content was developed with AI assistance and should be verified against primary sources.
```

---

## Orchestra Era Reference

| Era ID | Years | Key Orchestras |
|--------|-------|----------------|
| early-orchestras | 1900-1935 | Firpo, Canaro (early), Fresedo (early) |
| golden-orchestras | 1935-1955 | D'Arienzo, Di Sarli, Troilo, Pugliese, Tanturi |
| post-golden | 1955-1985 | Salgán, Color Tango |
| revival-orchestras | 1985-present | Sexteto Mayor, El Arranque, Solo Tango |

---

## The Big Four (Priority Research)

1. **Juan D'Arienzo** — "El Rey del Compás" — drove the Golden Age revival
2. **Carlos Di Sarli** — "El Señor del Tango" — elegant, lyrical style
3. **Aníbal Troilo** — "Pichuco" — emotional depth, best bandoneón
4. **Osvaldo Pugliese** — dramatic, complex arrangements

---

## Source Priority

1. **Todotango.com** — Comprehensive discographies
2. **Tangodj.com** — DJ perspective on recordings
3. **Academic sources** — Music history, biographies
4. **Community knowledge** — milonga DJ recommendations

---

**END OF PROMPT**
```

## PROMPT END
