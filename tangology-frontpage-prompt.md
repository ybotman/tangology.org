# Tangology.org — Front Page Prompt & Migration Architecture

## Project Context

**Tangology.org** is a fork/migration of the tango-history section of tobytango.com into its own standalone domain. The existing React codebase from tobytango.com will be forked and restructured.

### What Exists Today on tobytango.com

**Routes:**
- `/` — Home page (banner cards: Tango Collab, Tango Lab, History, About Toby)
- `/tango-history` — Interactive timeline (multi-track: Argentina, Orchestras, Dancers, Europe, USA)
- `/tango-history/glossary` — Tango Index (search + category filter tabs + 3-col card grid, 157 entities)
- `/tango-history/argentina#epoca-de-oro` — Era detail pages (accordion expand with summary + key figures chips + download paper)
- `/people` — People listing (filter by Type: Dancer/Musician/Singer/Composer/Teacher/Organizer + filter by Generation: Nuevo Innovators/Guardian/Stage Pioneers/Bridge/Golden Age/Post-Golden Age)
- `/people/:slug` — Full person profiles (hero card with avatar/name/dates/summary/tags, then Biography with subsections, Notable Quotes, Related entities)

**Data:** master-index.json with 157 entities (89 people, 7 couples, 17 orchestras, 14 venues, 6 styles, 15 terms, 6 events). Sage (Claude Code) is generating ~142 more prompts for entity profiles.

**Design language:** Dark theme (#0D0D0D bg), warm amber/brown border accents, blue category chips, card-based grids, "← BACK TO TIMELINE" breadcrumbs, clean sans-serif body text, era-coded colors (green=populated, orange=partial, gray=coming soon).

---

## Migration Plan: tobytango.com → tangology.org

### What moves to tangology.org:
- All `/tango-history/*` routes → becomes the homepage experience
- `/tango-history/glossary` → `/glossary`
- `/people` and `/people/:slug` → `/people` and `/people/:slug`
- New: `/orchestras` and `/orchestras/:slug`
- New: `/venues` and `/venues/:slug`
- New: `/styles` and `/styles/:slug`
- New: `/library` (white papers / research downloads)
- New: `/contribute`
- New: `/` landing page (doesn't exist on tobytango.com — this is the new front door)
- All JSON data files and tango-papers content

### What stays on tobytango.com:
- Tango Collab
- Tango Lab
- About Toby
- tobytango.com home page (just removes History card, or links to tangology.org)

### Cross-linking:
- tangology.org credits Toby Balsley as founder/curator on `/about`
- tangology.org footer links to tobytango.com for Collab and Lab tools
- tobytango.com `/tango-history` redirects to tangology.org

---

## Site Map for tangology.org

```
tangology.org/
├── /                          → NEW: Landing page (hero + search + nav grid)
├── /timeline                  → MIGRATED from /tango-history (multi-track timeline)
│   └── /timeline/:era         → Era detail pages
├── /glossary                  → MIGRATED from /tango-history/glossary (index)
├── /people                    → MIGRATED from /people (listing + filters)
│   └── /people/:slug          → MIGRATED from /people/:slug (profiles)
├── /orchestras                → NEW: Orchestra listing (card grid + filters)
│   └── /orchestras/:slug      → NEW: Orchestra profile page
├── /venues                    → NEW: Venue listing
│   └── /venues/:slug          → NEW: Venue profile page
├── /styles                    → NEW: Dance style comparison
│   └── /styles/:slug          → NEW: Style detail page
├── /library                   → NEW: White papers & downloads
├── /search?q=                 → NEW: Global search results
├── /contribute                → NEW: Community contribution portal
└── /about                     → NEW: About Tangology, mission, credits
```

---

## Design Evolution

### Keep from tobytango.com:
- Dark theme — it's right for tango
- Card-based entity grids with hover states
- Category filter tabs (Type + Generation on /people)
- Key Figures chips (clickable pills linking to profiles)
- Blue accent for interactive elements, warm brown borders
- "← BACK TO X" breadcrumb navigation
- Status indicators (populated/partial/coming soon)

### Evolve for tangology.org:
- **New landing page** — tobytango.com has no equivalent (its home is just banner cards)
- **Warmer color palette** — shift from cool dark to warm dark (add gold/amber/burgundy accents)
- **Typography upgrade** — add serif display font for headlines (Playfair Display) alongside clean sans body
- **Remove personal branding** — "Toby Balsley Tango" becomes "Tangology" throughout
- **Search becomes primary** — prominent search bar on landing page and header
- **Content density** — more info-dense on desktop, the glossary 3-col grid is good, expand to other sections

### Design Tokens
```css
:root {
  /* Backgrounds */
  --bg-primary:        #0D0D0D;     /* near black — kept from tobytango */
  --bg-secondary:      #1A1614;     /* warm dark brown */
  --bg-card:           #1E1B18;     /* dark card surface */
  --bg-card-hover:     #2A2520;     /* card hover state */

  /* Text */
  --text-primary:      #F5F0E8;     /* warm cream */
  --text-secondary:    #A89F94;     /* muted warm gray */
  --text-muted:        #6B6560;     /* dates, metadata */

  /* Accents */
  --accent-gold:       #C8A96E;     /* vintage gold — primary accent, CTAs */
  --accent-burgundy:   #8B2E3B;     /* deep tango red — secondary accent */
  --accent-blue:       #4A90B8;     /* links, interactive — carried from tobytango */
  --accent-amber:      #D4A053;     /* warm highlights */

  /* Era colors (from existing timeline) */
  --era-guardia-vieja: #6B8E5A;     /* olive green */
  --era-guardia-nueva: #4A90B8;     /* steel blue */
  --era-epoca-oro:     #C8A96E;     /* gold */
  --era-decline:       #8B6E5A;     /* muted brown */
  --era-renacimiento:  #8B2E3B;     /* burgundy */

  /* Borders & surfaces */
  --border-subtle:     #2A2520;     /* card borders */
  --border-accent:     #C8A96E33;   /* gold border with transparency */

  /* Typography */
  --font-display:      'Playfair Display', Georgia, serif;
  --font-body:         'Source Sans 3', -apple-system, sans-serif;
  --font-mono:         'JetBrains Mono', 'SF Mono', monospace;
}
```

---

## Front Page Prompt

### Use this prompt to build the tangology.org landing page:

---

**BUILD: tangology.org Landing Page — React Component**

**What is this:** The front door to tangology.org, a standalone knowledge platform for the study of Argentine tango. This is a NEW page that doesn't exist on the predecessor site (tobytango.com). It serves as the entry point and navigation hub, replacing tobytango.com's banner-card homepage with a content-focused, search-first experience.

**Context:** This is a fork of tobytango.com's tango-history section. The existing site uses dark theme, card grids, category filter tabs, and blue accent chips. The new landing page should feel like an evolution — warmer, more editorial, more authoritative — while being recognizable to existing users.

**Design direction:**
- Dark, warm, nocturnal — Buenos Aires at midnight
- Editorial/magazine quality, not a dance school website
- Think: if Wikipedia and Spotify's artist pages had a tango baby
- Warm palette: near-black (#0D0D0D) + cream text (#F5F0E8) + vintage gold (#C8A96E) + burgundy (#8B2E3B)
- Typography: Playfair Display (serif, display) + Source Sans 3 (sans, body)
- Subtle grain texture on hero (CSS only, no images)
- Generous whitespace, content breathes
- Card surfaces slightly warm (#1E1B18), not cold gray

**Header (sticky):**
- Left: "TANGOLOGY" wordmark in Playfair Display, tracked wide, gold color
- Center/right nav: Timeline · Glossary · Orchestras · People · Styles · Venues
- Right: Search icon (magnifying glass)
- Slim, dark, semi-transparent on scroll
- Mobile: hamburger menu

**Hero section:**
- "TANGOLOGY" — large display heading, Playfair Display, gold (#C8A96E)
- Subtitle: "The Study of Argentine Tango" — cream, lighter weight
- Second line: "History · Music · People · Culture" — muted text, spaced
- Large search bar below: pill-shaped, warm dark bg, gold border on focus
  - Placeholder: "Search 161 entries — orchestras, terms, people, venues..."
- Background: CSS radial gradients (warm amber center glow fading to black) + subtle grain overlay
- No images. Typography and atmosphere only.

**Navigation grid (below hero):**
- 6 cards, responsive: 3×2 desktop, 2×3 tablet, 1-col mobile
- Each card:
  - Small icon/emoji top-left
  - Title in Playfair Display (e.g., "Orchestras")
  - One-line description (Source Sans, muted text)
  - Entity count badge (e.g., "23 profiles") — small, gold text
  - Warm dark surface (#1E1B18), subtle border, gold border-left accent
  - Hover: lift slightly, border-left brightens to full gold, bg lightens
- Cards:
  1. 📅 **Timeline** — "140 years from the conventillos to the world stage" — "5 eras"
  2. 📖 **Glossary** — "Terms, concepts, and culture of the milonga" — "87 terms"
  3. 🎵 **Orchestras** — "The Big Four, and the 20 ensembles that built the Golden Age" — "23 profiles"
  4. 👤 **People** — "Dancers, singers, musicians, and cultural figures" — "89 profiles"
  5. 📍 **Venues** — "Buenos Aires milongas, historic and living" — "16 venues"
  6. 💃 **Styles** — "From milonguero to nuevo — how the dance evolved" — "9 styles"

**Spotlight section:**
- Section heading: "Spotlight" in Playfair Display, with thin gold underline
- Featured entity card (larger, wider than nav cards):
  - Example: Aníbal Troilo
  - Display name, nickname ("Pichuco"), years (1914–1975)
  - 2-line summary from the glossary data
  - "Why dancers love it" teaser text
  - "Explore profile →" link in gold
  - Burgundy left border accent
- This would rotate/change but for the artifact, hardcode Troilo

**Timeline preview:**
- Section heading: "The Timeline" + "Explore 140 years of tango history →"
- Horizontal strip showing 5 era blocks, color-coded:
  - La Guardia Vieja (1880–1920) — olive green
  - La Guardia Nueva (1920–1935) — steel blue
  - La Época de Oro (1935–1955) — gold
  - La Decadencia (1955–1983) — brown
  - El Renacimiento (1983–present) — burgundy
- Each block: era name + Spanish subtitle + date range
- Responsive: horizontal scroll on mobile
- Clickable (placeholder links)

**Stats ribbon:**
- Subtle horizontal bar, slightly different bg (#1A1614)
- Key numbers displayed: "87 Terms · 23 Orchestras · 89 People · 16 Venues · 9 Styles · 6 Eras"
- Small, elegant, gold accent on the numbers
- Optional: "Community-verified knowledge" tagline

**Footer:**
- "TANGOLOGY" wordmark
- Description: "The open study of Argentine tango — history, music, people, culture"
- Links row: About · Timeline · Glossary · Contribute · Data Sources
- Credit: "Founded by Toby Balsley · Community-driven knowledge"
- Small: "Corrections and contributions welcome"
- Optional: tango quote in italic (e.g., attributed to Troilo or Di Sarli)
- Very bottom: "© 2026 Tangology.org" 

**Technical requirements:**
- Single self-contained React JSX component with default export
- Tailwind CSS utility classes only
- Google Fonts: Playfair Display (400, 700) + Source Sans 3 (300, 400, 600)
- Import useState from React for any interactive state (mobile menu toggle, search focus)
- CSS grain texture via pseudo-element with background-image SVG noise
- Smooth hover transitions (transform, border-color, background)
- Entrance animations: staggered fade-in for nav cards
- Mobile-first responsive breakpoints
- All links as `href="#"` placeholders
- No external image dependencies
- No localStorage or sessionStorage

---

## Component Architecture (for the full site, post-migration)

```
src/
├── components/
│   ├── layout/
│   │   ├── Header.jsx              ← NEW (replaces tobytango header)
│   │   ├── Footer.jsx              ← NEW
│   │   ├── MobileMenu.jsx          ← NEW
│   │   └── PageLayout.jsx          ← MIGRATE (add tangology wrapper)
│   │
│   ├── shared/
│   │   ├── EntityCard.jsx          ← MIGRATE from glossary cards
│   │   ├── EntityChip.jsx          ← MIGRATE from Key Figures chips
│   │   ├── CategoryBadge.jsx       ← MIGRATE from filter tabs
│   │   ├── SearchBar.jsx           ← ENHANCE (global, Fuse.js)
│   │   ├── FilterBar.jsx           ← MIGRATE from /people filters
│   │   └── BackLink.jsx            ← MIGRATE (← BACK TO X pattern)
│   │
│   ├── home/
│   │   ├── LandingPage.jsx         ← NEW (this prompt)
│   │   ├── NavGrid.jsx             ← NEW
│   │   ├── Spotlight.jsx           ← NEW
│   │   └── TimelinePreview.jsx     ← NEW
│   │
│   ├── timeline/
│   │   ├── Timeline.jsx            ← MIGRATE from /tango-history
│   │   ├── TimelineTrack.jsx       ← MIGRATE
│   │   └── EraDetail.jsx           ← MIGRATE from accordion
│   │
│   ├── glossary/
│   │   └── GlossaryPage.jsx        ← MIGRATE from /tango-history/glossary
│   │
│   ├── profiles/
│   │   ├── PersonProfile.jsx       ← MIGRATE from /people/:slug
│   │   ├── OrchestraProfile.jsx    ← NEW (same pattern as PersonProfile)
│   │   ├── VenueProfile.jsx        ← NEW
│   │   └── StyleProfile.jsx        ← NEW
│   │
│   └── listings/
│       ├── PeopleListing.jsx       ← MIGRATE from /people
│       ├── OrchestraListing.jsx    ← NEW (same pattern)
│       ├── VenueListing.jsx        ← NEW
│       └── StyleListing.jsx        ← NEW
│
├── data/                           ← MIGRATE all JSON files
├── hooks/
│   ├── useSearch.js                ← NEW (Fuse.js global search)
│   ├── useEntity.js                ← ENHANCE
│   └── useRelatedEntities.js       ← NEW
│
└── App.jsx                         ← UPDATE routing
```

---

## Build Phases

### Phase 1: Landing Page + Migration Skeleton
- [ ] Fork tobytango.com repo → tangology.org
- [ ] Strip non-tango-history routes (Collab, Lab, About Toby)
- [ ] Build landing page (`/`)
- [ ] Remap routes: `/tango-history` → `/timeline`, `/tango-history/glossary` → `/glossary`
- [ ] Keep `/people` and `/people/:slug` as-is
- [ ] Update header/footer/branding
- [ ] Deploy to Vercel on tangology.org domain

### Phase 2: New Entity Routes
- [ ] `/orchestras` listing + `/orchestras/:slug` profiles
- [ ] `/venues` listing + `/venues/:slug` profiles
- [ ] `/styles` listing + `/styles/:slug` profiles
- [ ] `/library` for white papers
- [ ] Global search with Fuse.js

### Phase 3: Community & Polish
- [ ] `/contribute` page
- [ ] Knowledge graph / entity relationship explorer
- [ ] "This Day in Tango" feature
- [ ] Enhanced timeline (zoom, event dots, click-through)
- [ ] Community correction/suggestion pipeline

---

*Architecture document v2.0 — February 2026*
*Migration path: tobytango.com → tangology.org*
