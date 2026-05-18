# HRflow

> An intelligent HRMS / payroll / compliance SaaS platform for India.

HRflow is a Next.js 16 + React 19 application covering the full HR surface area
— payroll, attendance, leave, recruitment, performance, LMS, engagement, OKRs,
360° feedback, succession, embedded finance (EWA, loans, insurance), tax & TDS,
statutory compliance (PF / ESI / TDS / PT / LWF / Factories Act / POSH /
Gazette Monitor), AI insights, multi-entity, global payroll, and a
white-labelable super-admin console.

The frontend currently ships as a comprehensive UI prototype with mocked data.
This document describes the codebase shape, how to run it locally, and the
conventions every contributor should follow.

---

## Tech stack

| Layer            | Choice                                                   |
| ---------------- | -------------------------------------------------------- |
| Framework        | Next.js 16 (App Router, Turbopack)                       |
| UI runtime       | React 19                                                 |
| Language         | TypeScript 5 (strict)                                    |
| Styling          | Tailwind CSS 4 + custom CSS theme tokens                 |
| Forms            | `react-hook-form` + `zod` (via `@hookform/resolvers`)    |
| Charts           | Recharts (gated behind `ClientOnly` / `ChartWrapper`)    |
| Icons            | `lucide-react`                                           |
| Tests            | Vitest + Testing Library + jsdom                         |
| Lint / format    | ESLint (`eslint-config-next`) + Prettier                 |
| Database         | PostgreSQL 16 via Prisma (schema scaffolded only)        |
| Cache / queue    | Redis 7                                                  |
| Object storage   | MinIO (S3-compatible) for local dev                      |

Local infra is wired in `docker-compose.yml`. None of the application code
talks to it yet — all data is mocked inside individual `page.tsx` files.

---

## Directory layout

```
app/
  (auth)/         Sign-in, OTP, 2FA, magic-link, SSO, password reset
  (setup)/        13-step company onboarding wizard
  (dashboard)/    HR-admin landing surface (legacy, will fold into (app))
  (app)/          74 modules — the main authenticated app
  layout.tsx      Root HTML shell
  page.tsx        Server-side redirect to /login
  globals.css     Theme tokens, design-system primitives, animations

components/
  auth/           Auth-specific decorations (right panel, etc.)
  compliance/     Compliance secondary sidebar
  dashboard/      Sidebar, Header, AuthedShell, top-level dashboard
  employees/      Add-employee 7-step wizard
  setup/          Onboarding wizard shell
  ui/             Design-system primitives (Button, Badge, Card, Input,
                  ChartWrapper, ClientOnly, Empty/Error/Loading/Success state)

lib/
  api/            HTTP client (fetch wrapper + Zod validation hooks)
  auth/           Session helpers (cookie-only for now)
  utils.ts        cn() — clsx + tailwind-merge

prisma/
  schema.prisma   Bootstrap schema (Organization model only)

proxy.ts          Route-level auth guard (env-flagged, Next.js 16.2+ convention)
__tests__/        Vitest specs
```

---

## Getting started

```bash
# 1. Use the pinned Node version
nvm use            # reads .nvmrc

# 2. Install
npm install

# 3. Copy env template
cp .env.example .env.local

# 4. Optional — start local infra (Postgres + Redis + MinIO)
docker compose up -d

# 5. Run dev server
npm run dev
```

Open <http://localhost:3000>. The root path redirects to `/login`. Use any
email + 8-character password to sign in (the form is currently mocked and
just sets a session cookie).

---

## Available scripts

| Script                | What it does                                                  |
| --------------------- | ------------------------------------------------------------- |
| `npm run dev`         | Next.js dev server with Turbopack                             |
| `npm run build`       | Production build (verifies all 1,005 routes compile)          |
| `npm run start`       | Serve the production build                                    |
| `npm run lint`        | ESLint                                                        |
| `npm run lint:fix`    | ESLint with auto-fix                                          |
| `npm run typecheck`   | `tsc --noEmit`                                                |
| `npm run test`        | Vitest single-run                                             |
| `npm run test:watch`  | Vitest watch mode                                             |
| `npm run format`      | Prettier write                                                |
| `npm run format:check`| Prettier check                                                |
| `npm run verify`      | typecheck + lint + tests (run before pushing)                 |

---

## Auth & route protection

`proxy.ts` is gated by `AUTH_ENFORCE`:

- `AUTH_ENFORCE=0` (default) → middleware passes everything through. Useful
  for design demos and screenshot reviews.
- `AUTH_ENFORCE=1` → unauthenticated requests to `(app)/*` and `(dashboard)/*`
  redirect to `/login?next=<original-path>`.

Public routes always bypass the check: `(auth)/*`, `(setup)/*`, the candidate
portal under `/candidate/*`, and the static landing redirect at `/`.

The session is currently a non-secret marker cookie (`hrflow_session=demo`).
A real backend should issue an HttpOnly + Secure cookie via `Set-Cookie` and
keep the frontend dumb — the middleware only checks presence, never decodes.

---

## Design-system conventions

- Colour tokens, typography, radii, shadows, transitions, and component
  classes (`.card`, `.btn`, `.badge`, `.input-field`, `.alert`, `.data-table`,
  `.sidebar-item`, etc.) live in `app/globals.css` under `@theme` and `:root`.
- Animations: standard Tailwind utilities plus
  `animate-{fade-in,fade-in-up,slide-in-left,slide-in-right,scale-in,pulse-glow,shimmer,spin-slow,bounce-gentle,count-up,float,float-1,float-2,shake}`.
- Reduced motion: respected via `@media (prefers-reduced-motion: reduce)`.
- Always prefer `ClientOnly` or `ChartWrapper` around Recharts elements to
  avoid SSR `width(-1)` warnings.
- Use `cn()` from `@/lib/utils` to merge Tailwind class strings safely.

---

## Important: state of the codebase

This is a **comprehensive UI prototype**, not yet a production system.
What the frontend already does well:

- 1,098 routes covering every HR / payroll / compliance flow (incl. 24
  empty-state, 23 error-state, 20 loading-state, and 25 success-state
  showcase pages).
- Coherent dark theme + design system applied consistently.
- Indian-domain authenticity: gazette monitor, inspector-ready, POSH annual
  report, BRSR, EPFO ECR, TRACES, 24Q, etc.

What is **not** done yet:

- No real data layer — every page inlines `const data = [...]`. The
  `lib/api/` scaffold exists so this can be wired up incrementally.
- No backend services. Prisma schema only contains a placeholder
  `Organization` model.
- No mobile apps, no accessibility audit pass, no i18n, no SLA / observability
  / rate-limiting / DR setup.

If you are evaluating HRflow as a product, treat the frontend as a strong
visual + UX foundation that still needs end-to-end backend integration before
any production rollout.

---

## Contributing

Run `npm run verify` before pushing. PRs should:

1. Stay scoped to a single concern.
2. Keep diff small; reuse existing primitives instead of inventing parallel
   ones.
3. Avoid inline styles in new code — use Tailwind classes or the design-system
   utility classes from `globals.css`.
4. Never disable an ESLint rule globally. Per-line `eslint-disable-next-line`
   with a comment explaining why is acceptable.
5. Include or update tests when changing shared components.

---

## License

Proprietary — © HRFlow Technologies Pvt. Ltd. All rights reserved.
