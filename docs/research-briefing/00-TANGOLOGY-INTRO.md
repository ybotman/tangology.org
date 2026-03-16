# Tangology.org — Project Introduction

**The definitive digital archive and educational resource for Argentine Tango history, culture, and community.**

---

## Mission

### Core Purpose

- **Preserve** the oral history and traditions of tango before they are lost
- **Educate** dancers, musicians, and enthusiasts about tango's rich heritage
- **Connect** the global tango community through shared knowledge
- **Document** the evolution from Buenos Aires origins to worldwide phenomenon

### Why This Matters

Tango is experiencing a crisis of cultural memory:
- The last generation who danced in the Golden Age (1935-1955) is passing
- Oral traditions are being lost as masters die
- Misinformation spreads faster than verified history
- Non-Spanish speakers lack access to primary sources

Tangology aims to be the authoritative, accessible, multilingual resource that preserves this heritage.

---

## Content Pillars

### 1. Timeline
Interactive history from 1880s to present day
- Visual era bands showing parallel developments
- Category lanes: Argentina, Europe, USA, Dancers, Orchestras
- Click-through to deep-dive papers

### 2. Key Events
TimelineJS3-powered milestone timeline
- First recordings, premieres, political events
- Deaths of masters
- Shows that changed history (Tango Argentino 1983)

### 3. People
Comprehensive profiles of tango figures
- Dancers: from Golden Age milongueros to contemporary stars
- Musicians: bandoneón masters, orchestra leaders
- Singers: the voices of tango
- Teachers: those preserving and transmitting the art

### 4. Orchestras
Detailed profiles of tango ensembles
- The Big Four: D'Arienzo, Di Sarli, Troilo, Pugliese
- Golden Age orchestras
- Revival and contemporary groups
- Essential recordings for DJs and dancers

### 5. Glossary
Spanish-English tango vocabulary
- Dance terms (ocho, giro, boleo)
- Music terms (compás, bandoneón)
- Social customs (cabeceo, tanda, cortina)
- Lunfardo slang

### 6. Eras
Deep-dive papers on historical periods
- Guardia Vieja through Neo-Traditional
- Europe's tangomania to maturation
- USA's discovery and growth

---

## Features

### Interactive Timeline
- Visual era bands sized by duration
- 5 category columns showing parallel history
- Hover tooltips with era details
- Toggle between Visual and List views

### Auto-Linking
Glossary terms, people, and orchestras automatically link when mentioned in papers, creating a connected knowledge graph.

### Multi-Language Support
- English (primary)
- Spanish (Castellano)
- Portuguese (planned)

### Search
Full-text search across all content with Cmd+K global shortcut.

### Mobile-First Design
Dark theme optimized for readability.

---

## Target Audiences

### Dancers
- Learning tango history to dance with more understanding
- Understanding musicality through orchestra knowledge
- Learning vocabulary for classes and milongas

### Teachers
- Reference material for curriculum
- Verified facts for instruction
- Video references for demonstrations

### DJs
- Orchestra profiles with essential recordings
- Style guides for tanda construction
- Historical context for music selection

### Researchers
- Verified dates and facts
- Source citations
- HITM flags indicating areas needing verification

### General Enthusiasts
- Accessible narratives
- Cultural context
- Connected knowledge exploration

---

## Content Philosophy

### Accuracy Over Speed
Every fact should be verifiable. When uncertain, flag for human review rather than guess.

### Narrative Over Data
While we maintain structured data, the papers should tell stories that engage readers.

### Accessibility
- English translations for all Spanish terms
- Pronunciation guides
- Context for insider references

### Acknowledgment of AI
All AI-assisted content includes disclaimers. This transparency builds trust.

### Living Document
Content improves over time through:
- HITM (Human In The Middle) expert review
- Community corrections
- Ongoing research

---

## Technical Stack

- **Framework:** Next.js 14 with App Router
- **Styling:** Tailwind CSS, dark theme
- **Internationalization:** next-intl
- **Timeline:** TimelineJS3 (CDN)
- **Content:** Markdown with YAML frontmatter
- **Deployment:** Vercel

---

## Content Pipeline

```
Research LLM → docs/inbox/ → Troilo (Claude) → Public Papers → Website
                    ↓
              Human Review (HITM)
```

### Roles

| Role | Responsibility |
|------|----------------|
| **Research LLM** | Produces white papers with structured data |
| **Troilo** | Claude Code agent that integrates content |
| **HITM Network** | Human experts who verify facts |
| **El Gotan** | Project owner who provides direction |

---

## Immediate Priorities

1. **Orchestras** — The Big Four need complete profiles
2. **Guardian Generation** — Last milongueros from Golden Age
3. **Época de Oro** — The most important era
4. **Glossary** — Build comprehensive vocabulary

---

## Research Guidelines for This Project

When researching for Tangology:

1. **Verify dates** against multiple sources
2. **Include full names** with nicknames
3. **Translate Spanish** terms to English
4. **Cite sources** for key claims
5. **Flag uncertainties** with HITM markers
6. **Connect content** through cross-references
7. **Write accessibly** for general audiences
8. **Acknowledge AI** assistance

See companion documents:
- **01-SYSTEM-OVERVIEW.md** — Technical architecture
- **02-TEMPLATES.md** — Output format templates
