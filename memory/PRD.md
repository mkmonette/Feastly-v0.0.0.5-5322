# Feastly - PRD

## Original Problem Statement
"Open or import the repository" — user follow-up: get the app running AND fix/build a specific feature (they plan to add more templates later).

## Architecture
- **Frontend**: Vite + React 18 + Tailwind CSS 3, located at `/app/frontend`
  - Routing: `react-router-dom` v7
  - Animation: `framer-motion`
  - Drag & drop: `@dnd-kit/*`
  - Charts: `echarts` + `echarts-for-react`
  - Icons: `react-icons`
  - Path alias: `@` → `/app/frontend/src`
  - Auth: client-side localStorage with dev role-switch buttons (Admin / Business / Customer)
  - Storefront templates engine in `src/components/dashboard/business/storefront/`
- **Backend**: Minimal FastAPI placeholder at `/app/backend/server.py` (only exposes `/api/health` & `/api/`). The application's data is currently client-side (localStorage); Supabase SQL migrations exist in `src/supabase/migrations/` but no client is wired in.
- **Database**: MongoDB available (unused by the frontend today).
- **Supervisor**: `backend` (uvicorn :8001) and `frontend` (yarn start → vite :3000) both RUNNING.

## What's Been Implemented (Imported as-is)
- Date: 2026-01
- Multi-role app shell with HomePage / AuthPage / DashboardLayout.
- 25+ storefront template token sets + several full template renderers (modernBite, modernClassic, modernSplit, mobile*, sage, hearth, grove, ember, warmCulinary, luxuryClassic, minimalRecipe, quickOrder, etc.).
- Business dashboard modules: Products, Categories, Orders, Marketing, Coupons, Flash sales, Upsells, Add-ons, Loyalty, Notifications, Checkout/Payments, Storefront Builder & Templates page.
- ProductContext + NotificationContext + permissions / currency utilities.

## Setup / Run
- Frontend dependencies installed via `yarn install` (lockfile generated).
- Vite configured to bind `0.0.0.0:3000` with `allowedHosts: true` for the Emergent preview ingress.
- `package.json` has a `start` script (`vite --host 0.0.0.0 --port 3000`) for supervisor.
- Backend placeholder created so supervisor doesn't FATAL. No real API yet.

## Backlog / Next Tasks
- P0: Add more storefront templates (user-stated next step). Each new template = a folder under `src/components/dashboard/business/storefront/<name>/` + a matching `<name>Tokens.js` + registration in `StorefrontTemplatesPage.jsx` / `TemplateRenderer.jsx`.
- P1: Decide on persistence story — keep localStorage, finish Supabase wiring, or move to FastAPI + MongoDB.
- P1: Hook up real auth (currently dev-only role buttons + plain localStorage).
- P2: Wire `@questlabs/react-sdk` if onboarding/feedback widgets are desired, otherwise drop the dependency.
- P2: Image assets / branding polish for templates.

## Status
- App boots cleanly, landing page renders, dev role switchers work, no console errors blocking initial load.
