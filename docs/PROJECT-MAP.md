# HRflow — Project Map

> **Single source of truth for the HRflow codebase.** Read this before making any non-trivial change. Update it whenever an architectural decision changes.

Last updated: 2026-05-14
Maintainer: Whoever last touched the file (run `git log -p docs/PROJECT-MAP.md`).

---

## Table of contents

1. [What HRflow is](#1-what-hrflow-is)
2. [Tech stack and versions](#2-tech-stack-and-versions)
3. [Directory layout](#3-directory-layout)
4. [Routing model and route groups](#4-routing-model-and-route-groups)
5. [Layouts and shells](#5-layouts-and-shells)
6. [Auth and the proxy.ts file](#6-auth-and-the-proxyts-file)
7. [Data layer (current state and target state)](#7-data-layer-current-state-and-target-state)
8. [Design system and theming](#8-design-system-and-theming)
9. [UI primitives catalog](#9-ui-primitives-catalog)
10. [Page conventions and the migration playbook](#10-page-conventions-and-the-migration-playbook)
11. [State, forms, validation](#11-state-forms-validation)
12. [Charts](#12-charts)
13. [Accessibility rules (non-negotiable)](#13-accessibility-rules-non-negotiable)
14. [Internationalisation (i18n)](#14-internationalisation-i18n)
15. [Observability and analytics](#15-observability-and-analytics)
16. [Testing strategy](#16-testing-strategy)
17. [Lint and TypeScript rules](#17-lint-and-typescript-rules)
18. [Build and verify gates](#18-build-and-verify-gates)
19. [Environment variables](#19-environment-variables)
20. [Known issues and gotchas (READ BEFORE EDITING)](#20-known-issues-and-gotchas-read-before-editing)
21. [Migration history (what's already done, what's still pending)](#21-migration-history)
22. [Do-not-touch list](#22-do-not-touch-list)
23. [Onboarding playbook for a new contributor](#23-onboarding-playbook)
24. [Glossary of project terms](#24-glossary)

---

## 1. What HRflow is

A Next.js 16 + React 19 web application that ships as a comprehensive **UI prototype** of an Indian HRMS / payroll / compliance / finance / AI platform. It currently has:

- **1,149 source files** across `app/`, `components/`, `lib/`, `prisma/`, `__tests__/`, `e2e/`.
- **1,098 routes** under `app/(app)/`, `app/(dashboard)/`, `app/(auth)/`, `app/(setup)/`, plus showcase routes (empty/error/loading/success states).
- **74 modules** under `app/(app)/` covering attendance, payroll, recruitment, performance, OKRs, LMS, compliance, tax, finance, AI, multi-entity, and more.
- **Mock-data only.** No live database calls. Prisma schema has only a placeholder `Organization` model.
- A **complete design system** of dark-themed primitives, design tokens, and CSS animations.

The product positioning is: **modern, AI-first, India-first SMB-to-mid-market HRMS** with embedded finance. Beating Keka and Darwinbox on UX/AI/finance, not on payroll-correctness depth (that takes years).

---

## 2. Tech stack and versions

| Layer | Choice | Version |
|---|---|---|
| Framework | Next.js (App Router, Turbopack) | `^16.1.6` (16.2+ proxy convention applies) |
| UI runtime | React | `19.2.3` |
| Language | TypeScript | `^5` (strict, ES2022 target, `moduleResolution: bundler`) |
| Styling | Tailwind CSS | `^4` (`@tailwindcss/postcss`, JIT) |
| Forms | `react-hook-form` + `zod` (`@hookform/resolvers`) | `^7.71.2` / `^4.3.6` |
| Charts | `recharts` | `^3.8.0` (gated behind `ClientOnly` / `ChartWrapper`) |
| Icons | `lucide-react` | `^0.577.0` |
| Tests | `vitest` + `@testing-library/react` + `jsdom` | `^4.1.2` / `^16.3.2` |
| E2E | `@playwright/test` | `^1.60.0` (5 specs in `e2e/`) |
| Lint | `eslint` + `eslint-config-next` + `eslint-plugin-unused-imports` | `^9` |
| Format | `prettier` + `prettier-plugin-tailwindcss` | `^3.3.3` |
| State (server) | `@tanstack/react-query` | `^5.100.10` |
| i18n | `next-intl` | `^4.12.0` |
| Observability | `@sentry/nextjs`, `posthog-js`, `web-vitals` | `^10.53.1` / `^1.373.4` / `^5.2.0` |
| DB | PostgreSQL via Prisma (scaffold only) | `prisma` schema present |
| Auth | Cookie-only marker (`hrflow_session=demo`); env-flagged proxy guard | n/a |

Node version pinned via `.nvmrc` (≥20.10).

---

## 3. Directory layout

```
.
├── app/                                Next.js App Router
│   ├── (auth)/                         Sign-in, OTP, 2FA, magic-link, SSO, password reset
│   ├── (setup)/                        13-step company onboarding wizard
│   ├── (dashboard)/                    Legacy HR-admin landing surface
│   ├── (app)/                          74 modules — main authenticated app (1,098 routes)
│   │   └── _dev/components/            Dev-only component playground at /_dev/components
│   ├── api/                            Route handlers (currently empty / scaffold)
│   ├── icon.svg, apple-icon.svg        App icons (referenced from metadata)
│   ├── layout.tsx                      Root HTML + i18n provider + skip-to-content link
│   ├── page.tsx                        Server-side redirect to /login
│   ├── globals.css                     Theme tokens, primitives, animations
│   ├── error.tsx, loading.tsx, not-found.tsx, global-error.tsx
│   ├── manifest.webmanifest, sitemap.ts, robots.ts
│
├── components/
│   ├── auth/                           AuthRightPanel, decorative auth chrome
│   ├── compliance/                     Compliance secondary sidebar
│   ├── dashboard/                      AuthedShell, Sidebar, Header, DashboardPage
│   ├── employees/wizard/               Step1Personal … StepReview (used by /employees/add)
│   ├── providers/                      Providers.tsx (TanStack Query, Toast, Observability)
│   ├── setup/                          Onboarding wizard shell
│   └── ui/                             Design-system primitives (see §9)
│
├── lib/
│   ├── a11y/                           Accessibility helpers
│   ├── api/                            HTTP client (fetch wrapper) + typed Zod resources
│   ├── auth/                           Session helpers (cookie-only for now)
│   ├── i18n/                           next-intl config (en, hi)
│   ├── observability/                  Sentry + PostHog wiring (env-gated)
│   ├── query/                          TanStack Query client factory
│   ├── theme/                          tokens.ts (TS export of design tokens)
│   ├── env.ts                          Zod-validated process.env
│   ├── random.ts                       seedRandom / seededFloats / seededPick
│   └── utils.ts                        cn() — clsx + tailwind-merge
│
├── messages/                           next-intl locale JSON (en.json, hi.json)
├── i18n/request.ts                     next-intl request config
│
├── prisma/schema.prisma                Bootstrap Prisma schema (Organization only)
├── proxy.ts                            Next.js 16.2+ auth proxy (renamed from middleware)
│
├── __tests__/                          Vitest specs (20 tests passing)
├── e2e/                                Playwright specs (5 critical user flows)
├── scripts/                            One-off codemod scripts (prefix-unused-vars, etc.)
├── public/                             Static assets (favicons, manifests, icons)
│
├── .kiro/                              Kiro IDE workspace config
│   ├── specs/                          Spec workflow artefacts
│   └── steering/                       Auto-loaded steering docs (rules every chat sees)
│
├── docs/
│   ├── PROJECT-MAP.md                  ← THIS FILE
│   └── page-migration-plan.md          30-page migration tracker
│
├── eslint.config.mjs                   See §17
├── tsconfig.json                       Strict, ES2022, `@/*` → `./*`
├── next.config.ts                      Security headers, redirects, optimizePackageImports
├── postcss.config.mjs                  Tailwind v4 postcss plugin
├── vitest.config.ts                    Vitest + React Testing Library config
├── playwright.config.ts                Playwright config
├── docker-compose.yml                  Local Postgres + Redis + MinIO
└── package.json
```

---

## 4. Routing model and route groups

Next.js App Router with **four route groups** at the top level:

| Group | Purpose | Auth required |
|---|---|---|
| `(auth)/` | Login, password reset, OTP, 2FA, SSO, magic-link, account-locked, session-expired, login-history, active-sessions, first-login | Public |
| `(setup)/` | 13-step company onboarding (welcome, company-details, company-tax, branding, departments, designations, statutory, bank-account, setup-payroll, invite-team, data-retention, locale, complete) | Public (whitelisted) |
| `(dashboard)/` | Legacy HR-admin landing — folds into `(app)` over time | Authed |
| `(app)/` | The main app — 74 modules, 1,098 routes | Authed |

Public-by-name routes bypass `proxy.ts` (see `PUBLIC_PREFIXES` array).

### Module redirects

Configured in `next.config.ts → redirects()` to send `/<module>` → `/<module>/<default-page>`:

```
/ai → /ai/smart-onboarding
/bgv → /bgv/dashboard
/compliance → /compliance/dashboard
/documents → /documents/repository
/engagement → /engagement/rr/dashboard
/feedback → /feedback/dashboard
/finance → /finance/dashboard
/fnf → /fnf/dashboard
/helpdesk → /helpdesk/dashboard
/hybrid → /hybrid/wfh/request
/it → /it/dashboard
/leave → /leave/dashboard
/lms → /lms/dashboard
/okr → /okr/dashboard
/onboarding → /onboarding/dashboard
/org-chart → /org-chart/tree
/performance → /performance/dashboard
/recruitment → /recruitment/dashboard
/reports → /reports/dashboard
```

When you add a new top-level module, **add the redirect**. Don't expect users to land on a directory.

### Showcase routes

Each module has reference pages for empty / error / loading / success states under `app/(app)/{empty,error,loading,success}-states/` (24 + 23 + 20 + 25 = 92 showcase pages). They serve as visual references — don't migrate them away.

---

## 5. Layouts and shells

### Root: `app/layout.tsx`

- Loads **DM Sans** via `next/font/google` (self-hosted, preloaded, `display: swap`, weights 300–700, exposed via `--font-dm-sans`).
- Sets metadata, viewport, OpenGraph, Twitter, robots, and SVG icons.
- Theme colour `#04080f` (matches `--color-bg-base`).
- Wraps children in `<NextIntlClientProvider>` + `<Providers>` + skip-to-content link.

### App shell: `app/(app)/layout.tsx`

Renders `<AuthedShell>` which pulls in `Sidebar`, `Header`, `DashboardPage` chrome. **Do not add layout-level chrome inside individual pages** — the shell already handles it.

### Page shell: `components/ui/Page.tsx`

Every migrated page wraps content in `<Page>` for breadcrumbs, title, subtitle, action slot, max-width, mobile padding, and a sticky header. See §10 for the migration playbook.

### Other route-group layouts

- `(auth)/` — full-bleed two-column with `AuthRightPanel` decoration.
- `(setup)/` — wizard chrome with progress bar.
- `(dashboard)/` — same `AuthedShell` as `(app)`.

---

## 6. Auth and the proxy.ts file

### File location and naming

In Next.js 16.2+, the auth middleware was renamed:

- File: `middleware.ts` → **`proxy.ts`** (at repo root)
- Function: `export function middleware()` → **`export function proxy()`**

**Do not rename it back.** Next.js explicitly fails the build with `Proxy is missing expected function export name`.

### Behaviour

- Gated by env flag `AUTH_ENFORCE`:
  - `AUTH_ENFORCE=0` (default for prototype demos) → no-op pass-through.
  - `AUTH_ENFORCE=1` → enforce session cookie check on `(app)/*` and `(dashboard)/*`.
- Unauthenticated requests to protected routes redirect to `/login?next=<original>`.
- Public prefixes (`/login`, `/forgot-password`, `/welcome`, `/candidate`, etc.) are listed in the `PUBLIC_PREFIXES` array — append to it when adding new public surfaces.
- The session cookie name is configurable: `process.env.SESSION_COOKIE_NAME ?? "hrflow_session"`.

### Matcher

The `config.matcher` excludes `_next/static`, `_next/image`, `favicon.ico`, and any path that ends in a static asset extension. Don't widen this without thinking about the perf impact on every request.

---

## 7. Data layer (current state and target state)

### Current state (2026-05-14)

- **Every page inlines mock data** as a `const` at module scope.
- A scaffold lives in `lib/api/`:
  - `client.ts` — fetch wrapper with `NEXT_PUBLIC_API_BASE_URL`, JSON parsing, error envelope, AbortController support.
  - `resources/employees.ts`, `resources/payroll.ts` — typed Zod schemas + read fns.
  - Hooks like `useEmployees()` exist using TanStack Query.
- `lib/query/client.ts` exports the QueryClient factory; `components/providers/Providers.tsx` wires the provider tree.

### Target state

When a real backend lands, **migrate page-by-page**:

1. Replace the inline `const data = [...]` with `const { data } = useEmployees()`.
2. Show `<LoadingState>` while `isPending`.
3. Show `<ErrorState>` on failure.
4. Show `<EmptyState>` / `<EmptyTable>` when the array is empty.
5. Stub mutations with `// TODO: replace with real mutation` comments until the API is ready.

Don't pre-emptively wire everything. Migrate when the endpoint exists.

---

## 8. Design system and theming

### Token layer

All design tokens live in **`app/globals.css`**:

```css
@theme {
  /* surfaces, borders, brand colours, semantic, text */
  --color-bg-base: #04080f;
  --color-bg-card: #0b1422;
  --color-accent-green: #00e5a0;
  /* ... */
}

:root {
  /* radii, shadows, transitions */
  --radius-xl: 18px;
  --shadow-card: 0 1px 3px ..., 0 4px 16px ...;
  --transition-base: 200ms cubic-bezier(0.4,0,0.2,1);
  /* ... */
}
```

Component classes (`.card`, `.btn`, `.badge`, `.input-field`, `.alert`, `.data-table`, `.sidebar-item`) are defined in the same file. **Prefer the React primitives in `components/ui/` over those CSS classes** for new code — the CSS classes exist for legacy unmigrated pages.

A TS mirror lives in `lib/theme/tokens.ts` for use in JS contexts (chart fills etc).

### Tailwind v4 configuration

- Config is **CSS-first** — Tailwind 4 reads `@theme {}` from `globals.css`.
- There is **no `tailwind.config.js`**. Don't create one.
- The PostCSS plugin is `@tailwindcss/postcss` (configured in `postcss.config.mjs`).

### Tailwind v4 JIT trap (CRITICAL)

Tailwind v4 only compiles class names it can **statically see**. Template-literal class names break in production:

```tsx
// ❌ BREAKS in production (works in dev only by coincidence)
<div className={`border-${color}-500/20 text-${color}-500`} />

// ✅ Use a static map keyed off a literal type
const palette = {
  emerald: { ring: "border-emerald-500/20", text: "text-emerald-500" },
  amber:   { ring: "border-amber-500/20",   text: "text-amber-500" },
} as const;
<div className={`${palette[color].ring} ${palette[color].text}`} />
```

This bit us once on `app/(app)/compliance/dashboard/page.tsx`. The fix is now documented in-file and in `.kiro/specs/page-migration-completion/design.md`. **Do not reintroduce template-literal classes.**

### Animations

Defined in `globals.css`:
`fade-in`, `fade-in-up`, `slide-in-left`, `slide-in-right`, `scale-in`, `pulse-glow`, `shimmer`, `spin-slow`, `bounce-gentle`, `count-up`, `float-y-{0,1,2}` (exposed as `animate-float`, `animate-float-1`, `animate-float-2`), `shake`.

`@media (prefers-reduced-motion: reduce)` kills non-essential motion globally — respect it.

---

## 9. UI primitives catalog

Every primitive lives in `components/ui/`. Use these — don't hand-roll surfaces.

| Primitive | API summary | When to use |
|---|---|---|
| `Page` (default) | `{ title, subtitle, breadcrumbs, actions, maxWidth, fullBleed, children }` | Every page in `(app)`. See §10. |
| `Card` (default) | `{ variant: "default"\|"elevated"\|"bare", padding: "none"\|"sm"\|"md"\|"lg" }` + `<CardHeader>` + `<CardTitle>` | Every surface. Replaces inline `bg-[#0D1928] border ...`. |
| `Button` (default) | `{ variant: "primary"\|"secondary"\|"ghost"\|"danger"\|"outline", size: "sm"\|"md"\|"lg", isLoading, loadingText, icon, iconRight }` | Every actionable element. **Never use a raw `<button>` with hardcoded styles.** |
| `Badge` (named) | `{ variant: "success"\|"warning"\|"danger"\|"info"\|"purple"\|"neutral"\|"ai", dot? }` | Status pills, role chips, category tags. |
| `Input` | `{ label, error, hint, icon, ...inputProps }` | Form text inputs. |
| `DataTable<T>` (default, generic) | `{ data, columns, rowKey, isLoading?, onRowClick?, emptyTitle?, emptyDescription?, emptyAction?, searchable?, searchPlaceholder?, searchPredicate?, "aria-label"? }` + `Column<T>` type | All tabular data. Mobile-responsive (collapses to stacked cards). Sortable columns via `Column.sortable + sortValue`. |
| `EmptyTable` | Empty-state inside a `<DataTable>` slot | Use as `emptyAction` when 0 rows. |
| `EmptyState`, `ErrorState`, `LoadingState`, `SuccessState` | Full-page state surfaces | Use as fallbacks for `useQuery` states. |
| `ChartWrapper` | Wraps Recharts with explicit width/height; defends against SSR `width(-1)` warning | Every Recharts chart. |
| `ClientOnly` | `{ fallback?, children }` — defers render to client | Recharts and any other browser-only render path. |
| `Toast` | `useToast()` hook + provider in `Providers.tsx` | Form submit feedback, error toasts. |
| `CommandPalette` | Cmd+K palette with 35 commands | Wired via `Providers.tsx`. |
| `LocaleSwitcher` | Toggles between locales from `lib/i18n/config.ts` | Header / settings. |
| `PolicyForm` (`PolicyRow`, `Toggle`, `SettingsToggle`, `SettingsSelect`) | Reusable settings rows | Policy / settings pages. |

### Casing-collision risk eliminated (resolved 2026-05-15)

`components/ui/` previously had `chart-wrapper.tsx` (named export `ChartWrapper`, mount-gate only) and `ChartWrapper.tsx` (default export, sized `ResponsiveContainer`). The two files were intentionally split functionally but the case-only filename difference risked breakage on Linux CI / case-sensitive filesystems. The lowercase variant was renamed to `ChartMountGate.tsx` and its named export to `ChartMountGate` (with a deprecated `ChartWrapper` alias kept for backwards compatibility). A pre-commit guard in `.husky/pre-commit` blocks any future commit that reintroduces a case-conflicting filename.

---

## 10. Page conventions and the migration playbook

Every page in `app/(app)/` should follow this five-step recipe:

1. **Wrap in `<Page>`** with `title`, `subtitle`, `breadcrumbs`, `actions`, `maxWidth`. No bespoke header `<div>`.
2. **Convert surfaces to `<Card>`.** Any `bg-[#0D1928] border border-[#1A2A3A] rounded-{xl,2xl} p-X` block becomes `<Card padding="md|lg|sm|none">`.
3. **Convert actions to `<Button>`.** Map: brand-green CTA → `primary`, neutral fill → `secondary`, outline/back → `outline`, destructive → `danger`, accent-coloured → `primary` with className.
4. **Convert status pills to `<Badge>`.** Map: green → `success`, amber → `warning`, red/rose → `danger`, blue/indigo → `info`, purple → `purple`, slate/grey → `neutral`, gradient → `ai`.
5. **Make it responsive + a11y.**
   - Replace `width: 1440` / `min-width: 1200` / `gridTemplateColumns: "700px 468px"` with Tailwind responsive grids (`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr]`).
   - Add `aria-label` on icon-only buttons.
   - Add `aria-current="step"` on active wizard steps.
   - Add `role="radiogroup"` + `<input type="radio">` for visual radio cards.
   - Add `aria-expanded` / `aria-controls` on accordion summaries.
   - Add `role="progressbar"` + `aria-valuenow` on progress bars.

### Reference pages (the gold standard)

When migrating a new page, copy the patterns from these:

- Multi-step form: `app/(app)/my-leave/apply/page.tsx`
- Dashboard: `app/(app)/my-leave/page.tsx`
- DataTable + filter chips: `app/(app)/recruitment/candidates/page.tsx`
- DataTable with empty state: `app/(app)/settings/users/page.tsx`
- KPI cards + charts: `app/(app)/onboarding/dashboard/page.tsx`
- Static palette pattern: `app/(app)/compliance/dashboard/page.tsx`
- Largest accordion form: `app/(app)/tax/declarations/page.tsx`

### Inline-style budget

Aggregated count: ~7,178 inline `style={{}}` usages across the codebase (mostly on legacy unmigrated pages). Budget: **don't add new ones**. When a page is migrated to the shell, drop them and use Tailwind classes.

### CSP note

`next.config.ts` deliberately does **not** set Content-Security-Policy yet because of the inline-style usage. CSP gets enabled once inline styles are migrated.

---

## 11. State, forms, validation

| Need | Tool | Notes |
|---|---|---|
| Server state | `@tanstack/react-query` | `useEmployees()` in `lib/api/resources/employees.ts` is the model. Provider in `components/providers/Providers.tsx`. Devtools in dev only. |
| Form state | `react-hook-form` | Use `useForm({ resolver: zodResolver(schema) })`. |
| Validation | `zod` | Co-locate schemas with resource definitions in `lib/api/resources/*` for round-trip validation. |
| URL state | `next/navigation` `useSearchParams` | Wrap `useSearchParams`-using components in `<Suspense>`. |
| Local UI state | `useState` | Don't reach for context unless multiple unrelated components need the same value. |

### React 19 purity contract

- **Never** call `Math.random()` or `Date.now()` during render. Use `seededFloats`/`seededPick` from `lib/random.ts` for decorative randomness; bump a state seed for "regenerate" actions.
- **Never** define a component inside another component's render. Put it at module scope. The ESLint rule `react-hooks/static-components` flags this; it's currently set to `warn` while migration completes.
- **Never** call `setState` inside `useEffect` without genuinely needing the second render. The rule `react-hooks/set-state-in-effect` flags this; legitimate cases (mount-gates, animation loops) get a targeted `eslint-disable-next-line` with a comment.

---

## 12. Charts

Use **Recharts** but **always** wrap in `ChartWrapper` (or `ClientOnly` with explicit pixel dimensions if you need full control):

```tsx
import ChartWrapper from "@/components/ui/ChartWrapper";

<div className="h-[300px] w-full">
  <ChartWrapper height="h-full">
    <AreaChart data={...}>{/* ... */}</AreaChart>
  </ChartWrapper>
</div>
```

Without this wrapper, Recharts tries to measure its parent during SSR / hydration, gets `width(-1)` and `height(-1)`, and emits a console warning. We hit this on `AuthRightPanel.tsx` once — solved by giving the chart explicit pixel dimensions.

Also note: `Cell` from Recharts shows a deprecation hint in TS but is still the supported API for `<Pie>` slice colours. Keep using it; the warning is benign.

---

## 13. Accessibility rules (non-negotiable)

These come straight from `app/globals.css`, `proxy.ts` skip-link in `app/layout.tsx`, and the migration spec. Treat them as required:

- **Skip-to-content link**: present in `app/layout.tsx`. Don't remove.
- **Focus rings**: `*:focus-visible { outline: 2px solid rgba(0,229,160,0.5); outline-offset: 2px; }` in `globals.css`. Don't override per-element unless replacing with a Tailwind `focus-visible:ring-*` of equivalent contrast.
- **Reduced motion**: `@media (prefers-reduced-motion: reduce)` already gates all animations. Don't introduce animations that bypass this.
- **Icon-only buttons**: must have `aria-label`. The icon itself must be `aria-hidden="true"`.
- **Inputs**: must have an associated `<label htmlFor>` (or `aria-label` if visually labelled).
- **Wizard steps**: `<ol role="list">` with `<li aria-current="step">` on the active step.
- **Accordion summaries**: `<button aria-expanded={open} aria-controls="panel-id">` + panel `<div id="panel-id" role="region" aria-labelledby="summary-id">`.
- **Radio cards** (visual chips that act as radios): wrap in `<fieldset role="radiogroup">` + `<input type="radio" className="peer sr-only">` inside each label.
- **Progress bars**: `<div role="progressbar" aria-valuenow={n} aria-valuemin={0} aria-valuemax={100} aria-label="...">`.
- **Tables**: prefer `<DataTable aria-label="...">` over raw `<table>`.

WCAG 2.1 AA is the target. Full compliance audit pending.

---

## 14. Internationalisation (i18n)

- Library: `next-intl` v4.
- Plugin in `next.config.ts`: `createNextIntlPlugin("./i18n/request.ts")`.
- Locales: `en` (default), `hi`. Files: `messages/en.json`, `messages/hi.json`.
- Switcher: `components/ui/LocaleSwitcher.tsx`.
- Server-side locale resolution: `app/layout.tsx` reads `getLocale()` and `getMessages()` and passes them into `<NextIntlClientProvider>`.

**Most page strings are currently English literals.** String extraction is out of scope for the current sprint (covered in `docs/page-migration-plan.md` notes). Hinglish copy in user-facing strings is acceptable — match existing tone.

---

## 15. Observability and analytics

| Concern | Tool | File |
|---|---|---|
| Error tracking | Sentry (`@sentry/nextjs`) | `lib/observability/index.ts` (env-gated by `NEXT_PUBLIC_SENTRY_DSN`) |
| Product analytics | PostHog (`posthog-js`, `posthog-node`) | `lib/observability/index.ts` (env-gated by `NEXT_PUBLIC_POSTHOG_KEY`) |
| Web vitals | `web-vitals` | Reporter wired in `Providers.tsx` |

Don't import `@sentry/nextjs` or `posthog-js` directly from a page. Always go through `lib/observability/`.

---

## 16. Testing strategy

| Tier | Tool | Where | Run |
|---|---|---|---|
| Unit / component | Vitest + Testing Library | `__tests__/` | `npm run test` |
| Integration / API | Vitest | (none yet — add when API lands) | `npm run test` |
| E2E | Playwright | `e2e/*.spec.ts` (5 critical flows) | `npm run test:e2e` |

Current state: **20 vitest tests passing** (sidebar bug-condition + sidebar preservation tests under `__tests__/`).

Test conventions:
- File suffix: `*.test.tsx` or `*.test.ts`.
- Co-located is fine; `__tests__/` is fine. Don't mix in the same module.
- Keep tests **deterministic** — use `lib/random.ts` seeds where randomness is involved.

---

## 17. Lint and TypeScript rules

### TypeScript (`tsconfig.json`)

- `strict: true`
- `target: ES2022`, `module: esnext`, `moduleResolution: bundler`
- `noUncheckedIndexedAccess: false` (intentional — flipping it would surface ~hundreds of legitimate errors during the migration)
- Path alias: `@/*` → `./*`
- Includes `.next/types/**` and `.next/dev/types/**` (Next.js type generation)

### ESLint (`eslint.config.mjs`)

Built on `eslint-config-next` (`core-web-vitals` + `typescript`). Custom posture:

- `@typescript-eslint/no-unused-vars` — **off** (replaced by `unused-imports/no-unused-vars` which respects `argsIgnorePattern: '^_'` and `varsIgnorePattern: '^_'`).
- `unused-imports/no-unused-imports` — **warn**.
- `@typescript-eslint/no-explicit-any` — **off** (legacy code uses `any` liberally; tighten when migrating modules).
- `react-hooks/purity` — **warn** (catches `Math.random()` / `Date.now()` in render).
- `react-hooks/set-state-in-effect` — **warn** (catches re-render thrash).
- `react-hooks/static-components` — **warn** (catches components defined inside render — they cause input focus loss on every keystroke).
- Test files: relax `react-hooks/purity` and `react-hooks/static-components`.

### CI gate

`package.json` script: `"lint": "eslint . --max-warnings=0"` → **zero errors AND zero warnings.** Don't push if this fails.

> Historical note: previously this script was `next lint`, which was removed in Next.js 15+. The current command runs ESLint directly. Don't revert.

### Don't disable globally

If you must silence a rule, do it inline:

```tsx
// eslint-disable-next-line react-hooks/set-state-in-effect -- mount-gate, runs once
useEffect(() => setMounted(true), []);
```

The reason after `--` is required by code review.

---

## 18. Build and verify gates

| Gate | Command | Required to pass before merge |
|---|---|---|
| TypeScript | `npm run typecheck` | ✅ exit 0 |
| ESLint | `npm run lint` | ✅ exit 0, **0 warnings** |
| Vitest | `npm run test` | ✅ all green |
| Production build | `SKIP_ENV_VALIDATION=1 npm run build` | ✅ succeeds |
| Combined | `npm run verify` | typecheck + lint + tests |

Run `npm run verify` before pushing. If any gate fails, fix it — don't add to the failure count.

For dev-server stale Turbopack caches use `npm run dev:clean`.

---

## 19. Environment variables

Documented in `.env.example`. Never commit `.env.local`.

| Var | Purpose | Required |
|---|---|---|
| `NEXT_PUBLIC_APP_NAME` | Display name | Optional |
| `NEXT_PUBLIC_APP_ENV` | `development`/`staging`/`production` | Optional |
| `NEXT_PUBLIC_APP_URL` | Used by `metadataBase` | Optional |
| `NEXT_PUBLIC_API_BASE_URL` | Backend origin | Required when wiring real API |
| `AUTH_ENFORCE` | `0` (no-op) / `1` (enforce login) in proxy.ts | Optional, defaults to off |
| `SESSION_COOKIE_NAME` | Override cookie name | Optional |
| `SESSION_SECRET` | JWT signing key (when backend lands) | Required in production |
| `SESSION_MAX_AGE_SECONDS` | Default 30 days | Optional |
| `DATABASE_URL` | Postgres connection string | Required for Prisma |
| `REDIS_URL` | Redis | Required for queues |
| `S3_*` | MinIO / S3 | Required for file uploads |
| `SMTP_*` | Outbound mail | Required for invites / OTP |
| `NEXT_PUBLIC_SENTRY_DSN` | Sentry | Optional (off if blank) |
| `NEXT_PUBLIC_POSTHOG_KEY` / `..._HOST` | PostHog | Optional (off if blank) |

Validation lives in `lib/env.ts` (Zod schema). Set `SKIP_ENV_VALIDATION=1` for local builds where you don't have all the secrets.

---

## 20. Known issues and gotchas (READ BEFORE EDITING)

### 20.1 ChartWrapper / ChartMountGate split (resolved)

Previously `components/ui/` had `chart-wrapper.tsx` and `ChartWrapper.tsx` — same export name, different functional behaviour. The lowercase file is renamed to `ChartMountGate.tsx`; its named export is now `ChartMountGate`. A backwards-compat `ChartWrapper` alias is kept inside `ChartMountGate.tsx` for any in-flight refactor PRs. The canonical names are:

- `components/ui/ChartWrapper.tsx` — default export, mount-gate **plus** sized `ResponsiveContainer`. Use when the direct child is a Recharts chart.
- `components/ui/ChartMountGate.tsx` — named export `ChartMountGate`, mount-gate only. Use when the consumer already provides sizing.

A pre-commit guard at `.husky/pre-commit` blocks any future commit that reintroduces a case-conflicting filename in `components/ui/`.

### 20.2 Tailwind v4 dynamic-class trap

Documented in §8. Never use `className={` `border-${color}-500/20 ` `}` patterns. Use a static map.

### 20.3 React 19 purity violations

Documented in §11. The compiler's purity rule is set to `warn` so existing code doesn't break the build, but **new code must be pure**. Run `npm run lint` to surface violations before push.

### 20.4 Components defined inside render

Causes input focus loss on every keystroke. Module-scope every subcomponent. The migration spec for the final 8 pages explicitly enumerated `WizardStepper`, `EmployeeStepper`, `UserCell`, `RoleBadge`, `StatusBadge`, `LastActive`, `RowMenu` for this exact reason.

### 20.5 Hardcoded sidebar offset

The old `app/(app)/employees/add/page.tsx` had `position: fixed; left: 240` for its bottom nav. **Don't hardcode the sidebar width.** Use `sticky bottom-0 -mx-4 md:-mx-8` so the layout stays sidebar-agnostic.

### 20.6 Next.js 16.2 proxy file

Documented in §6. **`proxy.ts` + `export function proxy()`** — never rename either.

### 20.7 `next lint` removed in Next 15+

Documented in §17. The `lint` script runs `eslint .` directly with `--max-warnings=0`.

### 20.8 Inline-style budget

~7,178 occurrences across the codebase. Don't add new ones. Migrating a page is the only time you should be deleting inline styles.

### 20.9 ESLint warning posture

The codebase currently sits at **0 errors and 0 warnings**. Maintain it. If you add a warning during a migration, fix it in the same PR.

### 20.10 No real backend

Every `data` const is mocked. Don't write tests that assume a network call. Use TanStack Query mocks via `lib/api/client.ts` when you need to simulate one.

### 20.11 Recharts `Cell` deprecation hint

The TS hint says `Cell` is deprecated. It isn't — the `<Pie>` API still requires `<Cell>`. Ignore the hint.

### 20.12 `noUncheckedIndexedAccess` is intentionally off

Flipping it would surface hundreds of legitimate index accesses (the codebase trusts `arr[i]` is non-undefined in many UI contexts). Don't flip it without a coordinated cleanup PR.

### 20.13 Prisma is scaffolded only

`prisma/schema.prisma` has only an `Organization` model. The recommended ORM going forward is **Drizzle** (per the earlier ORM evaluation — see commit history). Don't deepen the Prisma schema without revisiting that decision.

### 20.14 Setup wizard step ordering

The 13-step setup wizard had a step-ordering bug previously. The fix is in place. **Don't reorder steps without updating both the wizard component AND the route map.**

---

## 21. Migration history

### Round 1 — Frontend industrialisation (done)

- `tsconfig.json` ES2022, strict.
- `package.json` scripts: `test`, `typecheck`, `lint:fix`, `format`, `verify`.
- `.prettierrc`, `.editorconfig`, `.nvmrc`, `.env.example`.
- Bug fixes: `Math.random()` in render (QR page), components-in-render, missing keyframes, layout divergence between `(app)` and `(dashboard)`, wizard step ordering.
- Infrastructure: route error boundaries, `loading.tsx`, `not-found.tsx`, `global-error.tsx`, font optimisation via `next/font`, security headers, sitemap, robots, web manifest, SVG icons.
- Providers: TanStack Query, Toast, Sentry + PostHog (env-gated), Web Vitals reporter, command palette (Cmd+K with 35 commands).
- Auth: `proxy.ts` (renamed from `middleware.ts`), session helpers, login form Suspense + open-redirect guard.
- Data layer: `lib/api/client.ts`, typed Zod resources (`employees.ts`, `payroll.ts`), `useEmployees` hook.
- CI/CD: `.github/workflows/ci.yml`, Dependabot, CODEOWNERS, PR/issue templates.
- Component playground at `/_dev/components`.
- Theme tokens (`lib/theme/tokens.ts`).
- i18n: `next-intl` installed, `messages/en.json`, `messages/hi.json`, `lib/i18n/config.ts`, `lib/i18n/request.ts`, `i18n/request.ts`, `LocaleSwitcher`.
- E2E tests: 5 Playwright specs in `e2e/`.
- Reusable components: `<Page>`, `<DataTable>`, `<Card>`, `<EmptyTable>`, `<PolicyForm>` (PolicyRow, Toggle, SettingsToggle, SettingsSelect).

### Round 2 — ESLint warning cleanup (done)

- 1,582 → **0** ESLint warnings.
- `eslint-plugin-unused-imports` auto-fix (1,425 fixed).
- Bulk-prefix script `scripts/prefix-unused-vars.mjs` (100 vars prefixed across 81 files).
- Repair script `scripts/fix-destructure-renames.mjs` for destructuring patterns.
- Manual fixes for 4 LMS pages with stale `useParams()` declarations.
- Targeted `eslint-disable-next-line` for legitimate setState-in-effect cases.
- `lib/random.ts` (deterministic seeded RNG) added.

### Round 3 — Page migration sweep (done)

`docs/page-migration-plan.md` shows all **30 priority pages migrated** to the `<Page>` shell pattern. The final 8 (payroll/run/select-month, employees/add, onboarding/dashboard, compliance/dashboard, compliance/calendar, tax/declarations, reports/dashboard, settings/users) were migrated under spec `.kiro/specs/page-migration-completion/`. Tax declarations preserves every calculation byte-identical.

### What's still pending

- Wire 30 migrated pages to typed API hooks **when backend lands** (Round 4).
- Inline-style cleanup for the remaining ~1,000 unmigrated routes (Round 5).
- Mobile native app (separate React Native project; share `lib/api/`).
- i18n string extraction (current sprint scope: copy preserved as English literals).
- WCAG 2.1 AA full audit pass.
- Replace mock data with real APIs page by page.
- Drizzle ORM rollout + Postgres RLS multi-tenancy.

---

## 22. Do-not-touch list

These files / decisions are load-bearing. Don't modify without explicit discussion:

- `proxy.ts` — name, `export function proxy()`, matcher exclusions.
- `app/globals.css` `@theme {}` block — design tokens. Deleting one token cascades across the app.
- `app/layout.tsx` skip-to-content link.
- `next.config.ts` `redirects()` — module landing pages.
- `next.config.ts` security headers — applied to every route.
- `eslint.config.mjs` warning posture (purity / set-state-in-effect / static-components are `warn`, not `error`).
- `package.json` `lint` script — must remain `eslint . --max-warnings=0`.
- The 30 migrated pages listed in `docs/page-migration-plan.md` — they're the gold standard for new pages.
- `lib/random.ts` — used by every page that has decorative randomness. Renaming breaks ~21 imports.
- `tsconfig.json` `noUncheckedIndexedAccess: false` — flipping it surfaces hundreds of legitimate errors.

---

## 23. Onboarding playbook for a new contributor

Day 1 — get oriented:

1. Read this file end to end.
2. Read `docs/page-migration-plan.md`.
3. Read `app/globals.css` (the design system).
4. Open `app/(app)/my-leave/apply/page.tsx`, `app/(app)/recruitment/candidates/page.tsx`, and `app/(app)/onboarding/dashboard/page.tsx` in three tabs. Skim them to internalise the patterns.
5. Run `npm install`, `npm run dev`, click around `/login` → `/dashboard` → `/employees` → `/payroll/run/select-month`.
6. Run `npm run verify`. Confirm green.

Day 2 — first PR:

1. Pick one unmigrated page from `app/(app)/`. (Anything not in `docs/page-migration-plan.md`.)
2. Apply the §10 five-step recipe.
3. Run `npm run verify`. Push.

When stuck:

- Check `.kiro/specs/page-migration-completion/design.md` — the most recent migration design has detailed rationale for every transformation.
- Check `docs/PROJECT-MAP.md` §20 (this section) for known traps.
- Search for similar primitives in `components/ui/` before writing a new one.

---

## 24. Glossary

| Term | Meaning |
|---|---|
| AuthedShell | Top-level chrome (sidebar + header) for `(app)` and `(dashboard)` route groups. |
| Page shell | The `<Page>` primitive in `components/ui/Page.tsx`. |
| Migration | Bringing a page onto the shell + primitives + responsive + a11y. |
| Mock-data | Static `const` arrays embedded in page files. |
| Setup wizard | The 13-step company onboarding flow under `(setup)/`. |
| Five-step recipe | The §10 page migration playbook. |
| Verify gate | `npm run verify` — typecheck + lint + tests. |
| Tailwind JIT trap | Template-literal class names breaking in production. See §8. |
| React 19 purity | The contract that `Math.random()` / `Date.now()` / nested-component definitions are forbidden in render. |
| KPI tile | A single-metric card (label + value + delta), typically in a 4-up grid. |
| EARS | Easy Approach to Requirements Syntax — the WHEN/SHALL form used in Kiro spec requirements. |
| Spec | A `.kiro/specs/<name>/` folder containing `requirements.md`, `design.md`, `tasks.md`. |
| Steering | `.kiro/steering/*.md` files auto-loaded into every Kiro chat. |

---

## Appendix A — Quick command cheatsheet

```bash
# Bootstrap
nvm use && npm install
cp .env.example .env.local
docker compose up -d              # optional: Postgres + Redis + MinIO

# Daily
npm run dev                       # dev server
npm run dev:clean                 # nuke .next cache + restart

# Pre-push
npm run verify                    # typecheck + lint + tests
SKIP_ENV_VALIDATION=1 npm run build

# Spec tooling
python3 .kiro/steering/ui-ux-pro-max/scripts/search.py "<query>" --design-system
```

## Appendix B — File index for fast jumping

- Root config: `package.json`, `tsconfig.json`, `next.config.ts`, `eslint.config.mjs`, `postcss.config.mjs`, `vitest.config.ts`, `playwright.config.ts`, `.prettierrc`, `.editorconfig`, `.nvmrc`, `.env.example`, `docker-compose.yml`.
- Auth: `proxy.ts`, `lib/auth/`, `app/(auth)/login/page.tsx`.
- Design system: `app/globals.css`, `lib/theme/tokens.ts`, `components/ui/*`.
- Data layer: `lib/api/client.ts`, `lib/api/resources/employees.ts`, `lib/api/resources/payroll.ts`, `lib/query/client.ts`.
- Providers: `components/providers/Providers.tsx`.
- Shell: `app/layout.tsx`, `app/(app)/layout.tsx`, `components/dashboard/AuthedShell.tsx`, `Sidebar.tsx`, `Header.tsx`.
- Specs: `.kiro/specs/page-migration-completion/{requirements,design,tasks}.md`.
- Steering: `.kiro/steering/project-conventions.md`, `.kiro/steering/ui-ux-pro-max/SKILL.md`.
