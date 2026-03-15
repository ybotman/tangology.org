# Session Handoff: Troilo @ 2026-03-15

## Current Status
Major migration complete. Search and i18n polish remaining.

## Git Branches
- **DEVL** → localhost development
- **TEST** → Vercel staging (CI/CD from git)
- **PROD** → Vercel production (CI/CD from git)

All changes pushed to DEVL and synced to TEST.

---

## COMPLETED PHASES

### Phase 1: Component Extraction ✅
Created reusable component library:
- `/src/components/layout/Header.jsx` - Sticky nav with search button
- `/src/components/layout/Footer.jsx` - Site footer
- `/src/components/layout/PageLayout.jsx` - Shared wrapper with search modal
- `/src/components/ui/StatusBadge.jsx` - Content status indicators
- `/src/components/ui/GrainOverlay.jsx` - Visual texture
- `/src/components/ui/LanguageSwitcher.jsx` - EN/ES toggle
- `/src/components/ui/EntityCard.jsx` - Reusable cards for entities
- `/src/components/ui/SearchModal.jsx` - Global Cmd+K search
- `/src/lib/theme.js` - Design tokens (colors, fonts)
- `/src/lib/hooks/useInView.js` - Intersection observer hook

### Phase 2: Dynamic Paper Rendering ✅
- `/src/lib/papers/loadPaper.js` - Fetch markdown with frontmatter
- `/src/lib/papers/parseFrontmatter.js` - YAML parser
- `/src/components/content/MarkdownRenderer.jsx` - Styled markdown
- `/src/app/[locale]/papers/[...slug]/page.jsx` - Dynamic route

Route pattern: `/en/papers/argentina/epoca-de-oro` → `/public/tango-papers/argentina/epoca-de-oro.md`

### Phase 3: Section Pages ✅
All mobile-first with filters and search:
- `/src/app/[locale]/glossary/page.jsx` - 96 terms, A-Z nav, categories
- `/src/app/[locale]/people/page.jsx` - 33 profiles, type/era filters
- `/src/app/[locale]/orchestras/page.jsx` - Big Four highlighted
- `/src/app/[locale]/venues/page.jsx` - Active/historic toggle
- `/src/app/[locale]/styles/page.jsx` - Expandable style cards

### Phase 4: Search Integration ✅
- `/src/lib/search/buildIndex.js` - Unified search index builder
- `/src/lib/search/useSearch.js` - Fuse.js hook
- `/src/components/ui/SearchModal.jsx` - Cmd+K modal with keyboard nav
- Wired into Header and PageLayout

### Phase 6 & 7: Auth + Firebase Infrastructure ✅
Using shared tangotiempo-257ff Firebase project:
- `/src/lib/firebase/config.js` - Firebase initialization
- `/src/lib/firebase/activityTracker.js` - Paper/search tracking
- `/src/app/contexts/AuthContext.jsx` - Google, Apple, Email auth
- `/.env.local.example` - Required env vars

---

## REMAINING PHASES

### Phase 5: i18n Completion 🔄 (IN PROGRESS)
Add Spanish translations for new pages.

**Files to update:**
- `/messages/en.json` - Add keys for glossary, people, orchestras, venues, styles, search
- `/messages/es.json` - Spanish translations

**New keys needed:**
```json
{
  "glossary": {
    "title": "Glossary",
    "subtitle": "Essential Tango Vocabulary",
    "searchPlaceholder": "Search terms...",
    "showingResults": "Showing {count} of {total} terms",
    "noResults": "No terms found matching your criteria.",
    "clearFilters": "Clear filters",
    "alsoKnownAs": "Also known as",
    "related": "Related"
  },
  "people": {
    "title": "People",
    "subtitle": "Dancers, Musicians, Singers & Cultural Figures",
    "allTypes": "All Types",
    "allEras": "All Eras"
  },
  "orchestras": {
    "title": "Orchestras",
    "subtitle": "The Golden Age Ensembles That Built Tango",
    "bigFour": "The Big Four",
    "moreOrchestras": "More Orchestras"
  },
  "venues": {
    "title": "Venues",
    "subtitle": "Buenos Aires Milongas — Historic and Living",
    "allVenues": "All Venues",
    "active": "Active",
    "historic": "Historic",
    "mapComingSoon": "Interactive map coming soon"
  },
  "styles": {
    "title": "Styles",
    "subtitle": "From Milonguero to Nuevo — How the Dance Evolved",
    "majorStyles": "Major Styles",
    "otherStyles": "Other Styles & Influences"
  },
  "search": {
    "title": "Search",
    "placeholder": "Search {count} entries...",
    "noResults": "No results found for \"{query}\"",
    "startTyping": "Start typing to search...",
    "hint": "Search orchestras, terms, people, venues, styles, and eras",
    "navigate": "navigate",
    "select": "select"
  },
  "common": {
    "all": "All",
    "showingOf": "Showing {count} of {total}",
    "profiles": "profiles",
    "terms": "terms"
  }
}
```

---

## FUTURE WORK (Beyond Current Plan)

### Landing Page Updates
- Wire up search input in Hero section to open SearchModal
- Update NavCards with actual hrefs to new pages
- Connect "Explore full timeline" links

### Auth UI (When Ready)
- Create `/src/app/[locale]/auth/login/page.jsx`
- Create `/src/app/[locale]/auth/signup/page.jsx`
- Add login/signup links to Header
- Wrap layout with AuthProvider

### Activity Tracking (When Ready)
- Integrate `trackPaperView()` in paper pages
- Integrate `trackSearch()` in search modal
- Add `trackPersonView()` to people profiles

---

## KEY FILE LOCATIONS

| Purpose | Path |
|---------|------|
| Design tokens | `/src/lib/theme.js` |
| Component library | `/src/components/` |
| Firebase config | `/src/lib/firebase/config.js` |
| Search system | `/src/lib/search/` |
| Paper loader | `/src/lib/papers/` |
| English messages | `/messages/en.json` |
| Spanish messages | `/messages/es.json` |
| Timeline data | `/src/app/data/tangoTimelineData.js` |
| Glossary data | `/public/tango-papers/index/glossary/01-tango-terms.json` |
| Orchestras data | `/public/tango-papers/index/glossary/02-orchestras.json` |

---

## TO CONTINUE

1. Read this handoff
2. Complete Phase 5 (i18n) - update messages/en.json and messages/es.json
3. Wire up landing page search input
4. Test all routes in both locales
5. Commit and push to TEST for Vercel preview

---

## COMMITS THIS SESSION

```
5b8ddc9 [feat]: Add component library + section pages
0b7792b [infra]: Add Firebase auth + activity tracking infrastructure
```

Both pushed to DEVL and synced to TEST.
