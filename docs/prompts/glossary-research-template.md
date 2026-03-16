# Glossary Term Research Template

Use this template to generate research prompts for tango glossary terms.

---

## PROMPT START

```
# Glossary Term Research Task: {{SLUG}}

You are a tango terminology researcher. Your task is to create a comprehensive glossary entry for a tango term.

## Term Being Researched

- **Term:** {{SLUG}}
- **Type:** glossary

## What We Already Know

{{EXISTING_DATA}}

## Research Scope

Create a complete glossary entry covering:
1. **Definition** — Clear, concise explanation
2. **Etymology** — Origin of the word (Spanish, Lunfardo, Italian, etc.)
3. **Usage** — How and when it's used in tango
4. **Context** — Cultural/historical context
5. **Related Terms** — Connected vocabulary
6. **Pronunciation** — How to say it correctly

---

## Output Format

### Frontmatter (YAML)

{{FRONTMATTER_SCHEMA}}

### Entry Body

```markdown
# [Spanish Term]

**[English Translation]**

[2-3 sentence definition explaining what this term means in tango context]

## Etymology

[Where does this word come from? Lunfardo? Spanish? Italian? African?]

## Usage in Tango

[How is this term used? When would you hear it? Who uses it?]

## Cultural Context

[Any cultural significance, historical background, or social meaning]

## Related Terms

- **[Related term 1]** — Brief connection
- **[Related term 2]** — Brief connection

## Examples

> "[Example sentence using the term]"
> — [Source if applicable]

## Pronunciation Guide

**[term]** — [phonetic guide, e.g., "ca-be-CE-o"]

## Common Mistakes

[What do beginners get wrong about this term?]

---

**Note**: This content was developed with AI assistance and should be verified against primary sources.
```

---

## Category Reference

Categorize terms as:
- **dance** — Steps, movements, positions (ocho, giro, boleo)
- **music** — Musical terms (compás, bandoneón, orquesta típica)
- **social** — Milonga codes and customs (cabeceo, tanda, cortina)
- **vocabulary** — General tango slang (milonguero, tanguera, arrabalero)

---

## Source Priority

1. **Primary** — Todotango.com, Academia Porteña del Lunfardo
2. **Academic** — Linguistics papers, etymology dictionaries
3. **Community** — tejastango.com glossaries, established teachers
4. **Cross-reference** — Multiple sources for verification

---

## Examples of Good Entries

### cabeceo
- Etymology: From Spanish "cabeza" (head)
- Category: social
- Definition: The traditional method of invitation to dance using eye contact and a nod
- Cultural context: Protects both parties from public rejection

### ocho
- Etymology: Spanish for "eight" (the figure traced on the floor)
- Category: dance
- Definition: A figure where the follower traces figure-8 patterns with their feet
- Variants: ocho adelante (forward), ocho atrás (back), ocho cortado

---

**END OF PROMPT**
```

## PROMPT END

---

## Quick Start

1. Identify term to document
2. Copy this template
3. Fill in the {{SLUG}} placeholder
4. Send to Research LLM
5. Save response to /docs/inbox/
6. Process with: node scripts/process-inbox.js
