# Feastly - PRD

## Original Problem Statement
"Open or import the repository" — then: get the app running AND add more templates over time (user-stated). First requested template: a new MOBILE template that is modern and visually appealing.

## Architecture
- **Frontend**: Vite + React 18 + Tailwind CSS 3, located at `/app/frontend`
  - Routing: `react-router-dom` v7
  - Animation: `framer-motion`
  - Drag & drop: `@dnd-kit/*`
  - Charts: `echarts` + `echarts-for-react`
  - Icons: `react-icons` (Feather set)
  - Path alias: `@` → `/app/frontend/src`
  - Auth: client-side localStorage with dev role-switch buttons (Admin / Business / Customer)
  - Storefront templates engine in `src/components/dashboard/business/storefront/`
- **Backend**: Minimal FastAPI placeholder at `/app/backend/server.py` (only `/api/health`, `/api/`). All app data is client-side localStorage today.
- **Database**: MongoDB available (unused by the frontend).
- **Supervisor**: `backend` (uvicorn :8001) and `frontend` (yarn start → vite :3000) both RUNNING.

## What's Been Implemented
### 2026-01-31 — Repo import & dev-up
- Moved Vite project into `/app/frontend` (supervisor expects that path), added `start` script, configured Vite for `0.0.0.0:3000` with `allowedHosts: true` & HMR clientPort `443`. Installed deps via `yarn install`.
- Added minimal `/app/backend/server.py` placeholder to satisfy supervisor.

### 2026-01-31 — New mobile template: **Mobile Aurora**
- Files under `/app/frontend/src/components/dashboard/business/storefront/`:
  - `mobileAuroraTokens.js` — color/typography/layout/effects design tokens (aurora gradients, glass borders, soft shadows).
  - `mobileAurora/MobileAuroraContext.jsx` — context provider with sections config, cart state.
  - `mobileAurora/MobileAuroraRenderer.jsx` — composer with section visibility + decorative gradient orbs.
  - Sections: `Header`, `Hero`, `Featured`, `Menu`, `Reviews`, `CTA`, `Contact`, `Footer`.
  - `CartDrawer.jsx` (slide-up sheet) + `CartPill.jsx` (sticky bottom pill).
- Registered in 3 places (preview, edit, listing):
  - `StorefrontTemplatesPage.jsx` (Mobile category card)
  - `StorefrontPreview.jsx` (`/storefront/templates/mobile/mobile-aurora/preview`)
  - `StorefrontBuilder.jsx`  (`/storefront/templates/mobile/mobile-aurora/edit`)
- Quick standalone preview route: **`/preview/mobile-aurora`** (added in `App.jsx`) — bypasses the heavy templates list and is great for sharing/screenshots.
- All `data-testid` attributes are added to interactive elements (aurora-header-cart-btn, aurora-hero-cta, aurora-featured-add-{id}, aurora-menu-chip-*, aurora-menu-add-{id}, aurora-cart-pill, aurora-cart-checkout, etc.).

### Visual identity of Mobile Aurora (filling a gap in the lineup)
- Premium **light** theme (the rest of mobile is mostly dark/orange).
- **Aurora gradient** hero (peach → pink → violet → sky), glassmorphism stats card overlapping the hero.
- Floating product cards with image inset, soft purple drop-shadows.
- Pill category chips with gradient on active.
- Bottom-floating **cart pill** that appears when items are added; full-height **cart drawer** with quantity controls and a gradient checkout CTA.
- Typography: Outfit (headings) + Manrope (body) — both already preloaded in `index.html`.

## Setup / Run
- `yarn install` in `/app/frontend` (lockfile committed).
- Supervisor manages frontend (`yarn start`) and backend (uvicorn).
- Production build verified: `npx vite build` → 729 modules, no errors.

## Backlog / Next Tasks
- P1: Add more templates (mobile / modern / classic) as user requests them — follow the Mobile Aurora pattern.
- P1: Wire real persistence (Supabase migrations already exist in `src/supabase/migrations/` but no client is connected).
- P1: Replace dev role buttons with a real auth flow.
- P2: Consider lazy-importing the heavy `TEMPLATE_CONFIG` blocks in `StorefrontTemplatesPage` / `Preview` / `Builder` via `React.lazy` to dramatically reduce dev-mode request count (and stop tripping Cloudflare WAF when ~20+ templates load at once).
- P2: Drop unused deps (`@supabase/supabase-js`, `@questlabs/react-sdk`) if not planning to wire them.

## Known Notes
- In dev mode, opening `/storefront/templates` triggers hundreds of separate JSX module requests (one per template's file tree). Cloudflare's WAF occasionally rate-limits this, showing a transient blank page. Use the standalone `/preview/mobile-aurora` route to demo the new template cleanly, or take a prod build (`npx vite build && npx vite preview`) for a single-bundle view.
