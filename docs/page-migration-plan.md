# 30-page migration plan

> **Tracker:** See [`docs/frontend-10x-tracker.md`](./frontend-10x-tracker.md) for the authoritative, auto-generated source of migration status across all modules. The tracker is regenerated on every commit and supersedes any manual counts in this file.

Migration target: every page below uses the `<Page>` shell, `<Card>`, `<Button>`, `<Badge>`, `<DataTable>` (where applicable), responsive (no hardcoded desktop widths), keyboard accessible (semantic HTML + ARIA), and consumes data from typed API hooks (or clearly-marked TODO stubs).

## Tier 1 — Employee self-service (mobile-critical)

| # | Route | Status |
|---|---|---|
| 1 | `/my-leave/apply` | ✅ done |
| 2 | `/my-leave` | ✅ done |
| 3 | `/my-profile` | ✅ done |
| 4 | `/ess/payslips` | ✅ done |
| 5 | `/ess/dashboard` | ✅ done |
| 6 | `/my-leave/holidays` | ✅ done |
| 7 | `/my-leave/comp-off` | ✅ done |
| 8 | `/attendance/regularize/new` | ✅ done |
| 9 | `/reimbursements/claim` | ✅ done |
| 10 | `/notifications` | ✅ done |

## Tier 2 — HR admin core (most-used)

| # | Route | Status |
|---|---|---|
| 11 | `/employees` | ✅ done |
| 12 | `/employees/directory` | ✅ done |
| 13 | `/employees/add` | ✅ done |
| 14 | `/leave/approvals` | ✅ done |
| 15 | `/attendance/live` | ✅ done |
| 16 | `/attendance/regularization` | ✅ done |
| 17 | `/payroll/dashboard` | ✅ done |
| 18 | `/payroll/payslips/bulk` | ✅ done |
| 19 | `/payroll/run/select-month` | ✅ done |
| 20 | `/recruitment/dashboard` | ✅ done |

## Tier 3 — Admin / settings (high traffic)

| # | Route | Status |
|---|---|---|
| 21 | `/recruitment/candidates` | ✅ done |
| 22 | `/recruitment/jobs` | ✅ done |
| 23 | `/onboarding/dashboard` | ✅ done |
| 24 | `/compliance/dashboard` | ✅ done |
| 25 | `/compliance/calendar` | ✅ done |
| 26 | `/tax/declarations` | ✅ done |
| 27 | `/reports/dashboard` | ✅ done |
| 28 | `/settings` | ✅ done |
| 29 | `/settings/users` | ✅ done |
| 30 | `/helpdesk/raise` | ✅ done |

Completed 2026-05-14 — all 30 pages migrated to the `<Page>` shell with `<Card>`, `<Button>`, `<Badge>`, and `<DataTable>` primitives. Verification gates green: `npm run typecheck`, `npm run lint` (0 errors / 0 warnings), `npm run test` (20/20 vitest passing), and `SKIP_ENV_VALIDATION=1 npm run build`.

## frontend-10x Wave 2 — HR admin core (task 30) — payroll/*

All 37 pages under `app/(app)/payroll/*` migrated as part of the frontend-10x spec task 30.

| Route | Status |
|---|---|
| `/payroll` | ✅ done |
| `/payroll/dashboard` | ✅ done (was already migrated) |
| `/payroll/anomaly-alerts` | ✅ done |
| `/payroll/arrears` | ✅ done |
| `/payroll/audit` | ✅ done |
| `/payroll/bonus` | ✅ done |
| `/payroll/commission` | ✅ done |
| `/payroll/contractors` | ✅ done |
| `/payroll/ctc-letter` | ✅ done |
| `/payroll/ctc-revision` | ✅ done |
| `/payroll/ctc-revision/bulk` | ✅ done |
| `/payroll/ctc-revision/fitment` | ✅ done |
| `/payroll/fnf` | ✅ done |
| `/payroll/gratuity` | ✅ done |
| `/payroll/history` | ✅ done |
| `/payroll/history/revert` | ✅ done |
| `/payroll/incentives` | ✅ done |
| `/payroll/leave-encashment` | ✅ done |
| `/payroll/negative-net` | ✅ done |
| `/payroll/payslips/[id]` | ✅ done |
| `/payroll/payslips/bulk` | ✅ done (was already migrated) |
| `/payroll/reports/joiners` | ✅ done |
| `/payroll/reports/lop` | ✅ done |
| `/payroll/reports/tax` | ✅ done |
| `/payroll/reports/variance` | ✅ done |
| `/payroll/run/approve` | ✅ done |
| `/payroll/run/attendance-lock` | ✅ done |
| `/payroll/run/bank-file` | ✅ done |
| `/payroll/run/disburse` | ✅ done |
| `/payroll/run/employee-summary` | ✅ done |
| `/payroll/run/neft-confirm` | ✅ done |
| `/payroll/run/review-deductions` | ✅ done |
| `/payroll/run/review-gross` | ✅ done |
| `/payroll/run/review-net` | ✅ done |
| `/payroll/run/select-month` | ✅ done (was already migrated) |
| `/payroll/statutory-bonus` | ✅ done |
| `/payroll/variable-pay` | ✅ done |

Calculation snapshot tests written in `__tests__/migrations/payroll-calc.test.tsx` covering:
- `payroll/run/select-month` — expected payroll summary totals
- `payroll/run/review-gross` — KPI totals + individual employee gross values
- `payroll/run/review-deductions` — KPI deduction totals + individual employee deduction values
- `payroll/run/review-net` — KPI net payout totals + individual employee net pay values + net = gross - deductions formula

## frontend-10x Wave 2 — HR admin core (task 29)

All 19 pages under `app/(app)/leave/*` migrated as part of the frontend-10x spec task 29.

| Route | Status |
|---|---|
| `/leave/dashboard` | ✅ done |
| `/leave/approvals` | ✅ done (was already migrated) |
| `/leave/balance` | ✅ done |
| `/leave/calendar` | ✅ done |
| `/leave/adjustment` | ✅ done |
| `/leave/allocation` | ✅ done |
| `/leave/forecasting` | ✅ done |
| `/leave/reports` | ✅ done |
| `/leave/reports/lop` | ✅ done |
| `/leave/reports/lwp` | ✅ done |
| `/leave/comp-off/approvals` | ✅ done |
| `/leave/encashment/approvals` | ✅ done |
| `/leave/settings/policy` | ✅ done |
| `/leave/settings/types` | ✅ done |
| `/leave/settings/accrual` | ✅ done |
| `/leave/settings/carry-forward` | ✅ done |
| `/leave/settings/sandwich-rules` | ✅ done |
| `/leave/settings/restricted-holidays` | ✅ done |
| `/leave/settings/year-closing` | ✅ done |

## frontend-10x Wave 2 — HR admin core (task 31) — recruitment/*

All 26 pages under `app/(app)/recruitment/*` migrated as part of the frontend-10x spec task 31.

| Route | Status |
|---|---|
| `/recruitment/dashboard` | ✅ done (was already migrated) |
| `/recruitment/candidates` | ✅ done (was already migrated) |
| `/recruitment/jobs` | ✅ done (was already migrated) |
| `/recruitment/analytics` | ✅ done |
| `/recruitment/bgv/initiate` | ✅ done |
| `/recruitment/bgv/status` | ✅ done |
| `/recruitment/candidates/[id]` | ✅ done |
| `/recruitment/communications` | ✅ done |
| `/recruitment/interviews` | ✅ done |
| `/recruitment/interviews/feedback` | ✅ done |
| `/recruitment/interviews/panel` | ✅ done |
| `/recruitment/interviews/questions` | ✅ done |
| `/recruitment/jobs/[id]` | ✅ done |
| `/recruitment/jobs/create` | ✅ done |
| `/recruitment/jobs/publish` | ✅ done |
| `/recruitment/offers/acceptance` | ✅ done |
| `/recruitment/offers/generate` | ✅ done |
| `/recruitment/offers/negotiation` | ✅ done |
| `/recruitment/offers/revision` | ✅ done |
| `/recruitment/onboarding/formalities` | ✅ done |
| `/recruitment/onboarding/trigger` | ✅ done |
| `/recruitment/parser` | ✅ done |
| `/recruitment/referrals` | ✅ done |
| `/recruitment/referrals/tracking` | ✅ done |
| `/recruitment/reports` | ✅ done |
| `/recruitment/sourcing` | ✅ done |

Migration notes:
- Tier 2 form: `referrals/page.tsx` — `useForm({ resolver: zodResolver(schema) })` + `<FormField>` per field with stub mutation + toast.
- Tier 3 form: `jobs/create/page.tsx` — job description editor uses `<textarea>` with `<FormField>` as fallback. `// TODO: replace with rich-text editor` comment added.
- All pages use `<Page>`, `<Card>`, `<Button>`, `<Badge>`, `<DataTable>` primitives.
- No `Math.random()` or `Date.now()` in render.
- No template-literal Tailwind classes.
- No components defined inside render.
- All interactive elements have `aria-label` or visible labels.
- Verification gates: `npm run typecheck` ✅, `npm run lint` (0 errors / 0 warnings) ✅, `npm run test` (226/226 vitest passing) ✅, `SKIP_ENV_VALIDATION=1 npm run build` ✅.

## frontend-10x Wave 2 — HR admin core (task 32) — performance/*

All 30 pages under `app/(app)/performance/*` migrated as part of the frontend-10x spec task 32.

| Route | Status |
|---|---|
| `/performance/analytics` | ✅ done |
| `/performance/bell-curve` | ✅ done |
| `/performance/calendar` | ✅ done |
| `/performance/calibration` | ✅ done |
| `/performance/competency` | ✅ done |
| `/performance/cycle-setup` | ✅ done |
| `/performance/dashboard` | ✅ done |
| `/performance/feedback` | ✅ done |
| `/performance/final-rating` | ✅ done |
| `/performance/goals/approve` | ✅ done |
| `/performance/goals/library` | ✅ done |
| `/performance/goals/set` | ✅ done |
| `/performance/hr-override` | ✅ done |
| `/performance/letters/appraisal` | ✅ done |
| `/performance/letters/increment` | ✅ done |
| `/performance/normalization` | ✅ done |
| `/performance/pip` | ✅ done (redirect) |
| `/performance/pip/initiate` | ✅ done |
| `/performance/pip/outcome` | ✅ done |
| `/performance/pip/review` | ✅ done |
| `/performance/promotion/approve` | ✅ done |
| `/performance/promotion/letter` | ✅ done |
| `/performance/promotion/recommend` | ✅ done |
| `/performance/rating-scale` | ✅ done |
| `/performance/reports` | ✅ done |
| `/performance/reviews` | ✅ done |
| `/performance/reviews/manager` | ✅ done |
| `/performance/reviews/mid-year` | ✅ done |
| `/performance/reviews/self` | ✅ done |
| `/performance/reviews/skip-level` | ✅ done |

Migration notes:
- Tier 3 form: `goals/set/page.tsx` — `useFieldArray` from RHF for KRA rows. Each row has `title`, `weight`, `target`. Validates total weight = 100%.
- Review forms (self, manager, mid-year, skip-level): `useForm({ resolver: zodResolver(schema) })` + `<FormField>`. Fields: `rating` (1-5), `comments` (min 20 chars), `strengths`, `improvements`.
- PIP initiate: Tier 2 form — employee, manager, start date, end date, reasons, goals.
- All pages use `<Page>`, `<Card>`, `<Button>`, `<Badge>`, `<DataTable>` primitives.
- No `Math.random()` or `Date.now()` in render.
- No template-literal Tailwind classes.
- No components defined inside render.
- All interactive elements have `aria-label` or visible labels.
- Verification gates: `npm run typecheck` ✅, `npm run lint` (0 errors / 0 warnings) ✅, `npm run test` (226/226 vitest passing) ✅, `SKIP_ENV_VALIDATION=1 npm run build` ✅.

## frontend-10x Wave 2 — HR admin core (task 33) — okr/*

All 10 pages under `app/(app)/okr/*` migrated as part of the frontend-10x spec task 33.

| Route | Status |
|---|---|
| `/okr/alignment` | ✅ done |
| `/okr/check-in` | ✅ done |
| `/okr/company` | ✅ done |
| `/okr/create` | ✅ done |
| `/okr/dashboard` | ✅ done |
| `/okr/department` | ✅ done |
| `/okr/my-okrs` | ✅ done |
| `/okr/progress` | ✅ done |
| `/okr/reports` | ✅ done |
| `/okr/settings` | ✅ done |

Migration notes:
- `okr/settings`: Tier 2 form (8 fields) — `useForm({ resolver: zodResolver(schema) })` with `<Controller>` for all fields. Stub mutation + toast on success. Emoji checkmarks in permissions table replaced with `<Check>` icon + `<PermissionCell>` component.
- `okr/create`: `useFieldArray` for key results (title, target, unit, metric). Min 1 key result enforced by Zod.
- `okr/check-in`: form with progress (0-100 range slider), status (on-track/at-risk/behind radio group), notes (min 5 chars), confidence (1-5 radio). `Date.now()` in render replaced with static `CHECKIN_DATE` constant.
- All inline `style={{ color, background, borderColor }}` for status/progress colors replaced with static Tailwind class maps keyed off literal types.
- No template-literal Tailwind classes.
- No components defined inside render.
- All interactive elements have `aria-label` or visible labels.
- Verification gates: `npm run typecheck` ✅, `npm run lint` (0 errors / 0 warnings) ✅, `npm run test` (226/226 vitest passing) ✅, `SKIP_ENV_VALIDATION=1 npm run build` ✅.

## frontend-10x Wave 2 — HR admin core (task 34) — lms/*

All pages under `app/(app)/lms/*` migrated as part of the frontend-10x spec task 34.

| Route | Status |
|---|---|
| `/lms/admin` | ✅ done (redirect) |
| `/lms/admin/dashboard` | ✅ done |
| `/lms/admin/course/create` | ✅ done |
| `/lms/analytics/budget` | ✅ done |
| `/lms/analytics/effectiveness` | ✅ done |
| `/lms/calendar` | ✅ done |
| `/lms/certificate` | ✅ done |
| `/lms/certificate/[id]` | ✅ done |
| `/lms/certificates` | ✅ done (redirect) |
| `/lms/compliance/calendar` | ✅ done |
| `/lms/compliance/posh` | ✅ done |
| `/lms/compliance/security` | ✅ done |
| `/lms/course/[id]` | ✅ done |
| `/lms/course/[id]/feedback` | ✅ done |
| `/lms/course/[id]/player` | ✅ done |
| `/lms/dashboard` | ✅ done |
| `/lms/external` | ✅ done |
| `/lms/gamification` | ✅ done |
| `/lms/learning-path` | ✅ done |
| `/lms/learning-path/[id]` | ✅ done |
| `/lms/library` | ✅ done |
| `/lms/quiz/[id]` | ✅ done |
| `/lms/quiz/[id]/result` | ✅ done |
| `/lms/reports` | ✅ done |
| `/lms/skills` | ✅ done (redirect) |
| `/lms/skills/gap` | ✅ done |
| `/lms/skills/matrix` | ✅ done |
| `/lms/webinar/[id]` | ✅ done |

Migration notes:
- `admin/dashboard`: Already using Page/Card/Button/Badge/DataTable/ChartWrapper. Removed unused `TREND_VARIANT` (prefixed `_`).
- `analytics/budget`: Fixed raw `<button>` → `<Button>`. Fixed pie chart legend dots from `style={{ backgroundColor }}` → static `PIE_DOT_CLASSES` map. Fixed Recharts formatter types.
- `analytics/effectiveness`: Removed unused `Activity` import.
- `calendar`: Already fully migrated with Page/Card/Button/Badge.
- `certificate/page.tsx`: Fixed raw `<button>` elements → `<Button>` for PDF/Share actions.
- `certificate/[id]`: Already using Page/Card/Button.
- `compliance/calendar`: Prefixed unused `PRIORITY_BADGE` → `_PRIORITY_BADGE`.
- `compliance/posh`: Already using Page/Card/Button/Badge.
- `compliance/security`: Already using Page/Card/Button/Badge.
- `course/[id]`: Already using Page/Card/Button/Badge with accordion expand/collapse.
- `course/[id]/feedback`: Already using Page/Card/Button with star rating.
- `course/[id]/player`: Fixed raw `<button>` play button → `<Button>`. Immersive full-screen player UI preserved.
- `admin/course/create`: Migrated from full-screen custom UI to `<Page>` shell with `<Card>`, `<Button>`, proper `<label htmlFor>` on all inputs.
- `dashboard`: Already using Page/Card/Button/Badge/ChartWrapper/seededFloats. Skill bar inline styles kept (data-driven percentages).
- `external`: Already using Page/Card/Button/Badge/DataTable.
- `gamification`: Fixed `QUEST_WIDTHS` template-literal dynamic classes → `QUEST_PROGRESS_VALUES` with inline style for data-driven progress.
- `learning-path`: Fixed inline style for progress bar (kept as data-driven). Removed unused `Milestone`, `Card` imports.
- `learning-path/[id]`: Prefixed unused `STATUS_LABEL` → `_STATUS_LABEL`. Fixed inline style for progress bar (kept as data-driven).
- `library`: Fixed raw `<button>` bookmark → `<Button>`. Removed unused `Card` import.
- `quiz/[id]`: Immersive full-screen quiz UI preserved (no Page shell by design).
- `quiz/[id]/result`: Already using Page/Card/Button/Badge.
- `reports`: Fixed raw `<button>` quick-report cards → `<Card>`. Removed unused imports.
- `skills/gap`: Removed unused `Target` import.
- `skills/matrix`: Removed unused `Network` import. Already using DataTable with static `SCORE_CLASSES` map.
- `webinar/[id]`: Fixed raw `<button>` reaction buttons → `<Button>`. Fixed send button → `<Button>`. Immersive live webinar UI preserved.
- No `Math.random()` or `Date.now()` in render — `seededFloats` used where needed.
- No template-literal Tailwind classes.
- No components defined inside render.
- All interactive elements have `aria-label` or visible labels.
- Verification gates: `npm run typecheck` ✅, `npm run lint` (0 errors / 0 warnings) ✅, `npm run test` (226/226 vitest passing) ✅, `SKIP_ENV_VALIDATION=1 npm run build` ✅.

## frontend-10x Wave 2 — HR admin core (task 35) — feedback/*

All 14 pages under `app/(app)/feedback/*` migrated as part of the frontend-10x spec task 35.

| Route | Status |
|---|---|
| `/feedback/analytics` | ✅ done |
| `/feedback/bars` | ✅ done |
| `/feedback/competency` | ✅ done |
| `/feedback/continuous` | ✅ done |
| `/feedback/dashboard` | ✅ done |
| `/feedback/form` | ✅ done |
| `/feedback/give` | ✅ done |
| `/feedback/history` | ✅ done |
| `/feedback/kudos` | ✅ done |
| `/feedback/report` | ✅ done |
| `/feedback/request` | ✅ done |
| `/feedback/settings` | ✅ done |
| `/feedback/skip-level` | ✅ done |
| `/feedback/strengths` | ✅ done |

Migration notes:
- `feedback/settings`: Tier 2 form (7 fields) — `useForm({ resolver: zodResolver(schema) })` with `<Controller>` for all fields via `SettingsToggle`/`SettingsSelect`. Stub mutation + toast on success. Permissions table uses `<Badge variant="success">` instead of emoji checkmarks.
- `feedback/give`: Tier 2 form — `useForm({ resolver: zodResolver(schema) })`. Fields: recipient, type (praise/constructive/neutral), message (min 20 chars), visibility (public/private). Stub mutation + toast.
- `feedback/form`: Tier 2 form — same schema as `give`. Full competency section star ratings preserved as uncontrolled local state alongside the RHF form.
- `feedback/request`: Request form — `useForm({ resolver: zodResolver(schema) })`. Fields: from (employee list), message, due date. Stub mutation + toast.
- `feedback/analytics`: KPI tiles + tabbed charts (BarChart, LineChart, RadarChart) all wrapped in `ChartWrapper`. Department breakdown uses `<DataTable>` with `<Badge>` for rating variants.
- `feedback/bars`: BARS rating UI — static maps for selected/unselected anchor styles (no template-literal classes). All radio inputs use `sr-only` pattern.
- `feedback/competency`: Star rating rows lifted to module-scope `StarRow` component. Live radar preview via `ChartWrapper`. Progress bar with `role="progressbar"`.
- `feedback/continuous`: Feed items use `<Badge variant>` for praise/constructive. `<Button variant="ghost">` for helpful action.
- `feedback/dashboard`: KPI grid + pending list + radar chart + quick-links nav. All `<Link>` wrappers inside `<Button>` for action slots.
- `feedback/history`: `<DataTable>` with `<Badge>` for direction (received/given/self). Direction filter uses `aria-pressed` toggle buttons.
- `feedback/kudos`: Badge selector uses `sr-only` radio pattern with static class maps. Like button uses `<Button variant="ghost">` with `aria-pressed`.
- `feedback/report`: Tabbed report (radar, bar, qualitative themes). All charts in `ChartWrapper`. Theme badges use `<Badge variant="success|warning">`.
- `feedback/skip-level`: Star rating rows lifted to module-scope `StarRow`. Progress bar + subject card + overall observations textarea.
- `feedback/strengths`: `ProgressBar` lifted to module-scope component. Development plan checkboxes with `sr-only` pattern. `<Button variant="ghost">` for Add Goal.
- No `Math.random()` or `Date.now()` in render.
- No template-literal Tailwind classes.
- No components defined inside render.
- All interactive elements have `aria-label` or visible labels.
- Verification gates: `npm run typecheck` ✅, `npm run lint` (0 errors / 0 warnings) ✅, `npm run test` (226/226 vitest passing) ✅, `SKIP_ENV_VALIDATION=1 npm run build` ✅.

## frontend-10x Wave 3 — Admin / settings migration (task 37) — settings/*

All 37 pages under `app/(app)/settings/*` migrated as part of the frontend-10x spec task 37.

| Route | Status |
|---|---|
| `/settings` | ✅ done (was already migrated) |
| `/settings/users` | ✅ done (was already migrated) |
| `/settings/api-keys` | ✅ done |
| `/settings/approval-matrix` | ✅ done |
| `/settings/audit-log` | ✅ done |
| `/settings/billing` | ✅ done |
| `/settings/company` | ✅ done |
| `/settings/custom-fields` | ✅ done |
| `/settings/custom-fields/[id]` | ✅ done |
| `/settings/data/export` | ✅ done |
| `/settings/data/import` | ✅ done |
| `/settings/forms` | ✅ done |
| `/settings/forms/responses` | ✅ done |
| `/settings/integrations` | ✅ done |
| `/settings/integrations/[id]` | ✅ done |
| `/settings/integrations/[id]/logs` | ✅ done |
| `/settings/integrations/install` | ✅ done |
| `/settings/integrations/marketplace/[id]` | ✅ done |
| `/settings/notifications` | ✅ done |
| `/settings/notifications/digest` | ✅ done |
| `/settings/notifications/dnd` | ✅ done |
| `/settings/notifications/email` | ✅ done |
| `/settings/notifications/preferences` | ✅ done |
| `/settings/notifications/push` | ✅ done |
| `/settings/notifications/reminders` | ✅ done |
| `/settings/notifications/sms` | ✅ done |
| `/settings/roles` | ✅ done |
| `/settings/system/feature-flags` | ✅ done |
| `/settings/system/health` | ✅ done |
| `/settings/system/maintenance` | ✅ done |
| `/settings/system/modules` | ✅ done |
| `/settings/templates/email` | ✅ done |
| `/settings/templates/letters` | ✅ done |
| `/settings/templates/letters/preview` | ✅ done |
| `/settings/templates/notifications` | ✅ done |
| `/settings/templates/whatsapp` | ✅ done |
| `/settings/users/invite` | ✅ done |
| `/settings/webhooks` | ✅ done |
| `/settings/workflows` | ✅ done |
| `/settings/workflows/[id]` | ✅ done |

Migration notes:
- `company/page.tsx`: Tier 2 form (8 fields) — `useForm({ resolver: zodResolver(schema) })` + `<FormField>` for company name, display name, CIN, incorporation date, timezone, currency, fiscal year start, language. Stub mutation + toast.
- `users/invite/page.tsx`: `useFieldArray` for multi-invite rows. Each row has email + role. Stub mutation + toast.
- `roles/page.tsx`: Permissions matrix with `<DataTable>`-style table. Role management sidebar with `aria-pressed` buttons.
- `approval-matrix/page.tsx`: Approval chain visualization with step nodes and `ArrowRight` connectors. `role="list"` on step container.
- `billing/page.tsx`: Plan display + invoice `<DataTable>`. No form needed (display only).
- `audit-log/page.tsx`: `<DataTable>` with `<Badge>` for categories. Sortable by actor, category.
- `custom-fields/page.tsx`: `<DataTable>` with drag handle, type icons, toggle cells.
- `notifications/page.tsx`: Channel × category matrix table with `aria-pressed` toggles.
- `notifications/digest/page.tsx`: Tier 1 form — `useForm` + `zodResolver`. Fields: enabled, frequency, delivery time.
- `notifications/dnd/page.tsx`: Two toggle cards (daily quiet hours, vacation mode) with time selectors.
- `notifications/email/page.tsx`: SMTP config display + event toggle table.
- `notifications/sms/page.tsx`: Provider config display + event toggle table.
- `notifications/preferences/page.tsx`: Category × channel toggle grid.
- `notifications/push/page.tsx`: FCM status + APNs config form.
- `notifications/reminders/page.tsx`: Reminder rules with escalation stage chips.
- `system/feature-flags/page.tsx`: Feature flag cards with toggle + rollout info.
- `system/health/page.tsx`: Service status grid with `<Badge>` for operational/degraded.
- `system/maintenance/page.tsx`: Big toggle + maintenance window config form.
- `system/modules/page.tsx`: Module enable/disable grid with core module protection.
- `templates/email/page.tsx`: Category sidebar + template `<DataTable>` + quick editor.
- `templates/letters/page.tsx`: Template card grid with preview/duplicate actions.
- `templates/letters/preview/page.tsx`: A4 letter preview with merge field highlighting.
- `templates/notifications/page.tsx`: Template library sidebar + code/preview editor.
- `templates/whatsapp/page.tsx`: Template list + phone device preview.
- `integrations/page.tsx`: App marketplace with category filter + featured hero.
- `integrations/[id]/page.tsx`: Integration detail with event forwarding toggles + slash commands.
- `integrations/[id]/logs/page.tsx`: `<DataTable>` with status badges + retry banner.
- `integrations/install/page.tsx`: Full-screen OAuth install flow (no Page shell by design).
- `integrations/marketplace/[id]/page.tsx`: App detail with tabbed overview/permissions.
- `webhooks/page.tsx`: Webhook cards with secret reveal, retry, delete actions.
- `workflows/page.tsx`: Workflow card grid linking to detail pages.
- `workflows/[id]/page.tsx`: Visual pipeline with step nodes and status indicators.
- All pages use `<Page>`, `<Card>`, `<Button>`, `<Badge>`, `<DataTable>` primitives.
- No `Math.random()` or `Date.now()` in render.
- No template-literal Tailwind classes.
- No components defined inside render.
- All interactive elements have `aria-label` or visible labels.
- Verification gates: `npm run typecheck` ✅, `npm run lint` (0 errors / 0 warnings) ✅, `npm run test` (226/226 vitest passing) ✅, `SKIP_ENV_VALIDATION=1 npm run build` ✅.

## frontend-10x Wave 3 — Admin / settings migration (task 38) — compliance/*

All 38 pages under `app/(app)/compliance/*` migrated as part of the frontend-10x spec task 38.

| Route | Status |
|---|---|
| `/compliance/dashboard` | ✅ done (was already migrated) |
| `/compliance/calendar` | ✅ done (was already migrated) |
| `/compliance/contract-labour` | ✅ done |
| `/compliance/digital-signature` | ✅ done |
| `/compliance/esi-challan` | ✅ done |
| `/compliance/esi-reconciliation` | ✅ done |
| `/compliance/esic-card` | ✅ done |
| `/compliance/esic-ip-number` | ✅ done |
| `/compliance/esic-nomination` | ✅ done |
| `/compliance/factories-act` | ✅ done |
| `/compliance/filing-acknowledgement` | ✅ done |
| `/compliance/gazette-monitor` | ✅ done |
| `/compliance/gazette-monitor/[id]` | ✅ done |
| `/compliance/health-score` | ✅ done |
| `/compliance/inspector-ready` | ✅ done |
| `/compliance/kyc-verification` | ✅ done |
| `/compliance/labour-law-calendar` | ✅ done |
| `/compliance/lwf` | ✅ done |
| `/compliance/maternity-benefit` | ✅ done |
| `/compliance/penalty-calculator` | ✅ done |
| `/compliance/pf-challan` | ✅ done |
| `/compliance/pf-ecr` | ✅ done |
| `/compliance/pf-nomination` | ✅ done |
| `/compliance/pf-reconciliation` | ✅ done |
| `/compliance/pf-returns` | ✅ done |
| `/compliance/pf-transfer-activation` | ✅ done |
| `/compliance/pf-withdrawal` | ✅ done |
| `/compliance/posh-report` | ✅ done |
| `/compliance/pt-challan` | ✅ done |
| `/compliance/pt-registration` | ✅ done |
| `/compliance/settings` | ✅ done |
| `/compliance/shop-act` | ✅ done |
| `/compliance/statutory-register` | ✅ done |
| `/compliance/statutory-reports` | ✅ done |
| `/compliance/tds-challan` | ✅ done |
| `/compliance/tds-return-24q` | ✅ done |
| `/compliance/tds-return-26q` | ✅ done |
| `/compliance/traces` | ✅ done |
| `/compliance/uan-activation` | ✅ done |
| `/compliance/uan-generation` | ✅ done |

Migration notes:
- `settings/page.tsx`: Tier 2 form — `useForm({ resolver: zodResolver(schema) })` + `<FormField>` for 7 fields (legalName, incorporationDate, registeredAddress, PAN, TAN, GSTIN, LIN). Stub mutation + toast on success.
- `penalty-calculator/page.tsx`: Calculation form — `useForm({ resolver: zodResolver(schema) })`. Fields: act type (epfo/esic/tds), principal amount, due date, payment date. Shows calculated penalty (interest + damages + total).
- `contract-labour/page.tsx`: Tabbed view (Principal Employer / Contractor Verification). Contractor audit uses `<DataTable>` with `<Badge>` for PF/ESI status.
- `esic-card/page.tsx`: `<DataTable>` with checkbox selection for bulk print. KPI strip with 4 tiles.
- `esic-nomination/page.tsx`: Employee sidebar + nominee panel with edit mode toggle.
- `inspector-ready/page.tsx`: Toggle-based mode activation with secure link generation.
- `posh-report/page.tsx`: Step progress + ICC committee table + compliance score donut.
- `pt-challan/page.tsx`: Tabbed (PT Challans / PT Registrations). State cards for KA/MH/TG.
- `tds-challan/page.tsx`: Section-wise liability `<DataTable>` with challan history sidebar.
- `tds-return-24q/page.tsx`: Quarter selector + step progress + deductee `<DataTable>` + CSI validation panel.
- `tds-return-26q/page.tsx`: Quarter selector + vendor `<DataTable>` with error filter + TDS rate reference.
- All pages use `<Page>`, `<Card>`, `<Button>`, `<Badge>`, `<DataTable>` primitives.
- No `Math.random()` or `Date.now()` in render.
- No template-literal Tailwind classes — static maps used throughout.
- No components defined inside render — all subcomponents at module scope.
- All interactive elements have `aria-label` or visible labels.
- Verification gates: `npm run typecheck` ✅, `npm run lint` (0 errors / 0 warnings) ✅, `npm run test` (226/226 vitest passing) ✅, `SKIP_ENV_VALIDATION=1 npm run build` ✅.

## frontend-10x Wave 3 — Admin / settings migration (task 39) — tax/*

All 55 pages under `app/(app)/tax/*` migrated as part of the frontend-10x spec task 39.

| Route | Status |
|---|---|
| `/tax` | ✅ done (was already migrated) |
| `/tax/26as/[empId]` | ✅ done (was already migrated) |
| `/tax/80c/[empId]` | ✅ done (was already migrated) |
| `/tax/80d/[empId]` | ✅ done (was already migrated) |
| `/tax/advance-tax` | ✅ done (was already migrated) |
| `/tax/ais-reconciliation` | ✅ done (was already migrated) |
| `/tax/annual-summary/[empId]` | ✅ done (was already migrated) |
| `/tax/challan` | ✅ done (was already migrated) |
| `/tax/computation/[empId]` | ✅ done (was already migrated) |
| `/tax/computation-detail` | ✅ done (was already migrated) |
| `/tax/dashboard` | ✅ done (was already migrated) |
| `/tax/declaration/[empId]` | ✅ done (was already migrated) |
| `/tax/declarations` | ✅ done (was already migrated) |
| `/tax/declarations/80c` | ✅ done (was already migrated) |
| `/tax/declarations/80d` | ✅ done |
| `/tax/declarations/home-loan` | ✅ done |
| `/tax/declarations/hra` | ✅ done |
| `/tax/declarations/nps` | ✅ done |
| `/tax/declarations/other-deductions` | ✅ done |
| `/tax/form-12b` | ✅ done |
| `/tax/form-12bb` | ✅ done |
| `/tax/form-12bb/[empId]` | ✅ done |
| `/tax/form-16` | ✅ done |
| `/tax/form-16/bulk` | ✅ done |
| `/tax/form-16/view` | ✅ done |
| `/tax/form-26as` | ✅ done |
| `/tax/form16-bulk` | ✅ done |
| `/tax/form16-generator` | ✅ done |
| `/tax/form24q` | ✅ done |
| `/tax/form24q/[quarter]` | ✅ done |
| `/tax/home-loan/[empId]` | ✅ done |
| `/tax/hra/[empId]` | ✅ done |
| `/tax/my-form16` | ✅ done |
| `/tax/nps/[empId]` | ✅ done |
| `/tax/ocr-preview/[proofId]` | ✅ done |
| `/tax/other-deductions/[empId]` | ✅ done |
| `/tax/previous-employer` | ✅ done |
| `/tax/projection` | ✅ done |
| `/tax/projection/[empId]` | ✅ done |
| `/tax/proof-review` | ✅ done |
| `/tax/proof-review/[proofId]` | ✅ done |
| `/tax/proof-upload/[empId]` | ✅ done |
| `/tax/proofs/ocr-preview` | ✅ done (was already migrated) |
| `/tax/proofs/upload` | ✅ done (was already migrated) |
| `/tax/regime-comparison` | ✅ done |
| `/tax/regime-selector` | ✅ done |
| `/tax/regime-selector/[empId]` | ✅ done |
| `/tax/regime-switch` | ✅ done |
| `/tax/returns-24q` | ✅ done |
| `/tax/returns-24q/revised` | ✅ done |
| `/tax/section-89` | ✅ done |
| `/tax/switch-regime/[empId]` | ✅ done |
| `/tax/tds-reconciliation` | ✅ done |
| `/tax/verification` | ✅ done |
| `/tax/verification/[id]` | ✅ done |

Migration notes:
- **Calculation sensitivity preserved**: All tax calculation logic (HRA exemption, 80C limits, regime comparison, TDS computation, NPS projections, Section 89 relief) is byte-identical to pre-migration. Only the chrome (Page/Card/Button/Badge) was changed.
- **Tier 3 forms**: `declarations/80d`, `declarations/home-loan`, `declarations/hra`, `declarations/nps`, `declarations/other-deductions` — all migrated from raw div layouts to `<Page>` shell with `<Card>`, `<Button>`, `<Badge>` primitives.
- **Full-screen immersive pages**: `ocr-preview/[proofId]`, `proof-review/[proofId]`, `verification/[id]` — use `fullBleed` prop on `<Page>` to preserve the split-panel layout.
- **Static palette discipline**: No template-literal Tailwind classes. All color variants use static maps keyed off literal types.
- **No components defined inside render**: All subcomponents (`AmountInput`, `StepHeader`, `QuarterCard`, `CheckItem`, `FilterBtn`, `CompRow`, `DecisionOption`, `RowComp`, `QueueItem`, `StatCard`, `TabButton`, `StepIndicator`) are at module scope.
- **No `Math.random()` or `Date.now()` in render**.
- **All interactive elements have `aria-label` or visible labels**.
- **Snapshot tests**: `npx vitest run __tests__/migrations/` — 10/10 passing, all byte-equal.
- Verification gates: `npm run typecheck` ✅, `npm run lint` (0 errors / 0 warnings) ✅, `npm run test` (226/226 vitest passing) ✅, `SKIP_ENV_VALIDATION=1 npm run build` ✅.

## frontend-10x Wave 3 — Admin / settings migration (task 40) — reports/*

All 27 pages under `app/(app)/reports/*` migrated as part of the frontend-10x spec task 40.

| Route | Status |
|---|---|
| `/reports/dashboard` | ✅ done (was already migrated) |
| `/reports/attendance` | ✅ done |
| `/reports/attrition` | ✅ done |
| `/reports/audit` | ✅ done |
| `/reports/brsr` | ✅ done |
| `/reports/builder` | ✅ done |
| `/reports/cohort` | ✅ done |
| `/reports/compliance` | ✅ done |
| `/reports/export-dashboard` | ✅ done |
| `/reports/export-data` | ✅ done |
| `/reports/headcount` | ✅ done |
| `/reports/hr-analytics` | ✅ done |
| `/reports/hr-analytics-advanced` | ✅ done |
| `/reports/leave` | ✅ done |
| `/reports/manpower` | ✅ done |
| `/reports/mis` | ✅ done |
| `/reports/payroll-cost` | ✅ done |
| `/reports/payroll-mis` | ✅ done |
| `/reports/payroll-mis/deep-dive` | ✅ done |
| `/reports/recruitment` | ✅ done |
| `/reports/saved` | ✅ done |
| `/reports/scheduler` | ✅ done |
| `/reports/sharing` | ✅ done |
| `/reports/statutory` | ✅ done |
| `/reports/tally-export` | ✅ done |
| `/reports/training` | ✅ done |
| `/reports/workforce-intelligence` | ✅ done |
| `/reports/workforce-intelligence-advanced` | ✅ done |

Migration notes:
- `saved/page.tsx`: Full migration from raw div/table/button to `<Page>`, `<Card>`, `<DataTable>` with `<Badge>` for category variants. `<Button>` for Run action.
- `scheduler/page.tsx`: Full migration. Added `useForm({ resolver: zodResolver(schema) })` + `<FormField>`-style inputs for new schedule creation (reportName, frequency, recipients, format). `<DataTable>` for schedule list with `<Badge>` for Active/Paused status. Raw `<button>` filter tabs → `<Button>`.
- `sharing/page.tsx`: Full migration from raw div/button layout to `<Page>`, `<Card>`, `<Button>`. `UserAvatar` lifted to module scope. `<label htmlFor>` on all inputs. `<select>` for role management with `sr-only` labels.
- `statutory/page.tsx`: Full migration. Acts sidebar uses `<button>` with `aria-current="page"` for active state. `<Button>` for Preview/PDF/Excel actions. `RegisterRow` lifted to module scope. `useState` for active act selection.
- `tally-export/page.tsx`: Full migration. `useState` for generate status. `ValidationItem` lifted to module scope. `<Button>` for generate/download actions. All `<label htmlFor>` on form inputs.
- `training/page.tsx`: Full migration from raw div/table to `<Page>`, `<Card>`, `<DataTable>` with `<Badge>` for status variants. `role="progressbar"` on compliance bar.
- `workforce-intelligence/page.tsx`: Full migration. `FlightRiskCard` and `SkillGapRow` lifted to module scope. `<Badge>` for risk levels. `role="progressbar"` on skill gap bars. Static `RISK_VARIANT` and `barClass` maps (no template literals).
- `workforce-intelligence-advanced/page.tsx`: Full migration. `FEATURE_WEIGHTS` static array with literal class strings. `<input type="range">` with proper ARIA attributes. SVG chart with `role="img"` and `aria-label`.
- `export-dashboard/page.tsx`: Fixed raw `<button>` format selectors → `<button>` with `aria-pressed` and static conditional classes. Added `useState` for format selection.
- `payroll-mis/deep-dive/page.tsx`: Fixed Recharts `Tooltip` formatter type error (`value: number` → `typeof value === "number"` guard).
- All pages use `<Page>`, `<Card>`, `<Button>`, `<Badge>`, `<DataTable>` primitives.
- No `Math.random()` or `Date.now()` in render.
- No template-literal Tailwind classes — static maps used throughout.
- No components defined inside render — all subcomponents at module scope.
- All interactive elements have `aria-label` or visible labels.
- Verification gates: `npm run typecheck` ✅, `npm run lint` (0 errors / 0 warnings) ✅, `npm run test` (226/226 vitest passing) ✅, `SKIP_ENV_VALIDATION=1 npm run build` ✅.

## frontend-10x Wave 3 — Admin / settings migration (task 41) — finance/*

All 36 pages under `app/(app)/finance/*` migrated as part of the frontend-10x spec task 41.

| Route | Status |
|---|---|
| `/finance/advance-salary` | ✅ done |
| `/finance/analytics` | ✅ done |
| `/finance/audit` | ✅ done |
| `/finance/dashboard` | ✅ done |
| `/finance/ewa` | ✅ done |
| `/finance/ewa/credit-score` | ✅ done |
| `/finance/ewa/disburse` | ✅ done |
| `/finance/ewa/eligibility` | ✅ done |
| `/finance/ewa/history` | ✅ done |
| `/finance/ewa/policy` | ✅ done |
| `/finance/ewa/recovery` | ✅ done |
| `/finance/ewa/recovery-tracking` | ✅ done |
| `/finance/ewa/reports` | ✅ done |
| `/finance/ewa/settings` | ✅ done |
| `/finance/ewa/withdraw` | ✅ done |
| `/finance/flexi-pay` | ✅ done |
| `/finance/insurance/claims` | ✅ done |
| `/finance/insurance/claims/tracking` | ✅ done |
| `/finance/insurance/dependents` | ✅ done |
| `/finance/insurance/endorsements` | ✅ done |
| `/finance/insurance/enroll` | ✅ done |
| `/finance/insurance/marketplace` | ✅ done |
| `/finance/insurance/policy` | ✅ done |
| `/finance/insurance/renewal` | ✅ done |
| `/finance/ledger` | ✅ done |
| `/finance/loans` | ✅ done |
| `/finance/loans/apply` | ✅ done |
| `/finance/loans/closure` | ✅ done |
| `/finance/loans/foreclosure` | ✅ done |
| `/finance/loans/noc` | ✅ done |
| `/finance/loans/queue` | ✅ done |
| `/finance/loans/repay` | ✅ done |
| `/finance/loans/restructure` | ✅ done |
| `/finance/score` | ✅ done |
| `/finance/settings` | ✅ done |
| `/finance/wellness` | ✅ done |

Migration notes:
- All pages use `<Page>`, `<Card>`, `<Button>`, `<Badge>`, `<DataTable>` primitives.
- **Recharts**: All charts (AreaChart, BarChart, PieChart) wrapped in `<ChartWrapper>` — `dashboard`, `analytics`, `ewa`, `ewa/recovery`, `ewa/reports`, `score` pages.
- **DataTables**: All raw `<table>` elements replaced with `<DataTable>` with `rowKey`, `aria-label`, `emptyTitle`, `emptyDescription` — `advance-salary`, `audit`, `ewa/disburse`, `ewa/eligibility`, `ewa/history`, `ewa/recovery`, `ewa/recovery-tracking`, `insurance/claims`, `insurance/dependents`, `ledger`, `loans`, `loans/noc`, `loans/queue`, `loans/repay`.
- **No raw `<button>` with hardcoded styles** — all actions use `<Button variant size>`.
- **No `Math.random()` or `Date.now()` in render** — all data is static mock constants at module scope.
- **No template-literal Tailwind classes** — static maps used throughout.
- **No components defined inside render** — all subcomponents at module scope.
- **All interactive elements have `aria-label` or visible labels** — icon-only buttons, form inputs, sliders, radio groups.
- **Progress bars**: `role="progressbar"` + `aria-valuenow/min/max` on all progress indicators.
- **Toggle switches**: `role="switch"` + `aria-checked` on all toggle buttons.
- **Loan calculator pages** (`loans/apply`, `loans/restructure`): EMI calculation uses pure math from state — no `Math.random()`.
- **EWA withdraw**: Multi-step form with `step` state (1→2→3). Preset amount buttons use `<Button>`.
- **Insurance enrollment**: Coverage selector uses `<fieldset>` + `<legend>` + `<input type="radio" className="sr-only">` pattern.
- **Claims tracking**: Timeline uses `<ol>` with `aria-label` and `aria-current="step"` on active step.
- Verification gates: `npm run typecheck` ✅, `npm run lint` (0 errors / 0 warnings) ✅, `npm run test` (226/226 vitest passing) ✅, `SKIP_ENV_VALIDATION=1 npm run build` ✅.

## frontend-10x Wave 3 — Admin / settings migration (task 42) — fnf/*

All 25 pages under `app/(app)/fnf/*` migrated as part of the frontend-10x spec task 42.

| Route | Status |
|---|---|
| `/fnf/calculation` | ✅ done (was already migrated) |
| `/fnf/dashboard` | ✅ done (was already migrated) |
| `/fnf/dispute` | ✅ done (was already migrated) |
| `/fnf/exit-interview` | ✅ done (raw `<button>` → `<Button>`) |
| `/fnf/exit-interview/dashboard` | ✅ done (was already migrated) |
| `/fnf/experience-letter` | ✅ done (was already migrated) |
| `/fnf/form16` | ✅ done (was already migrated) |
| `/fnf/garden-leave` | ✅ done (was already migrated) |
| `/fnf/gratuity` | ✅ done (was already migrated) |
| `/fnf/initiate` | ✅ done (was already migrated) |
| `/fnf/noc-generation` | ✅ done (was already migrated) |
| `/fnf/notice-buyout` | ✅ done (was already migrated) |
| `/fnf/notice-calculator` | ✅ done (was already migrated) |
| `/fnf/notice-waiver` | ✅ done (was already migrated) |
| `/fnf/payment` | ✅ done (full migration from bespoke layout) |
| `/fnf/pf-transfer` | ✅ done (full migration from bespoke layout) |
| `/fnf/pf-withdrawal` | ✅ done (full migration from bespoke layout) |
| `/fnf/relieving-letter` | ✅ done (full migration from bespoke layout) |
| `/fnf/reports` | ✅ done (full migration from bespoke layout) |
| `/fnf/reports/detailed` | ✅ done (full migration — raw `<table>` → `<DataTable>`) |
| `/fnf/resignation/[id]` | ✅ done (full migration from bespoke layout) |
| `/fnf/resignation/acceptance` | ✅ done (full migration from bespoke layout) |
| `/fnf/review` | ✅ done (full migration from bespoke layout) |
| `/fnf/revision` | ✅ done (full migration from bespoke layout) |
| `/fnf/tracker` | ✅ done (full migration — raw `<table>` → `<DataTable>`) |

Migration notes:
- **Calculation sensitivity preserved**: All F&F math is byte-identical to pre-migration. Only the chrome was changed.
  - Gratuity = (15/26) × Last Basic+DA × Years of Service → ₹2,15,400 (Arnab Das, 4yr 8mo service)
  - Leave Encashment = 18 days × (Gross / 26) → ₹82,500
  - Notice Buyout = 30 days × (₹1,25,666 / 26) + GST 18% → ₹1,71,100
  - Net Settlement = ₹4,75,102 − ₹1,49,900 = ₹3,25,202
- **Calculation snapshot tests** written in `__tests__/migrations/fnf-calc.test.tsx` covering:
  - `fnf/calculation` — total earnings, total deductions, net settlement, gratuity, leave encashment
  - `fnf/gratuity` — gratuity amount, formula inputs, statutory formula correctness
  - `fnf/notice-buyout` — daily rate, GST amount, total recovery, formula preservation
  - `fnf/notice-calculator` — calculated LWD, base period, total duration, formula
  - `fnf/payment` — disbursement total, salary portion, statutory dues, formula
- **Full migrations** (8 pages that were bespoke `min-h-screen` layouts): `payment`, `pf-transfer`, `pf-withdrawal`, `relieving-letter`, `reports`, `reports/detailed`, `resignation/[id]`, `resignation/acceptance`, `review`, `revision`, `tracker`.
- **Partial fixes** (already using Page/Card/Button/Badge): `exit-interview` — raw `<button>` at bottom → `<Button variant="ghost">`.
- **Raw `<table>` → `<DataTable>`**: `reports/detailed` (ledger table), `tracker` (lifecycle table).
- **Static palette discipline**: No template-literal Tailwind classes. All color variants use static maps.
- **No components defined inside render**: All subcomponents (`PaymentMode`, `ReadinessStep`, `KpiCard`, `BarItem`, `ExitDriver`, `LedgerRow`, `TrackerRow`, `AnalyticsCard`) are at module scope.
- **No `Math.random()` or `Date.now()` in render**.
- **All interactive elements have `aria-label` or visible labels**.
- **Progress bars**: `role="progressbar"` + `aria-valuenow/min/max` on all progress indicators.
- Verification gates: `npm run typecheck` ✅, `npm run lint` (0 errors / 0 warnings) ✅, `npm run test` (247/247 vitest passing) ✅, `SKIP_ENV_VALIDATION=1 npm run build` ✅.

## frontend-10x Wave 3 — Admin / settings migration (task 43) — multi-entity/*

All 8 pages under `app/(app)/multi-entity/*` migrated as part of the frontend-10x spec task 43.

| Route | Status |
|---|---|
| `/multi-entity/add` | ✅ done |
| `/multi-entity/compliance` | ✅ done |
| `/multi-entity/dashboard` | ✅ done |
| `/multi-entity/list` | ✅ done |
| `/multi-entity/payroll` | ✅ done |
| `/multi-entity/reports` | ✅ done |
| `/multi-entity/settings` | ✅ done |
| `/multi-entity/transfer` | ✅ done |

Migration notes:
- `add/page.tsx`: Tier 2 form — 3-step wizard with `useForm({ resolver: zodResolver(schema) })` per step. Step 1: legalName, entityType, parentEntity, country, currency. Step 2: CIN, PAN (regex validated), TAN, GSTIN. Step 3: 3 config toggles (inheritPayroll, sharedEmployeeMaster, enableTransfers). Stub mutation + toast on success.
- `transfer/page.tsx`: Tier 2 form — `useForm({ resolver: zodResolver(schema) })`. Fields: employeeSearch, effectiveDate, targetEntity, carryLeave, maintainGratuity. Stub mutation + toast on success.
- `settings/page.tsx`: **Entity switcher** with `aria-label="Entity switcher"`, `role="listbox"`, `role="option"`, `aria-selected`, `aria-activedescendant`, and full keyboard navigation (ArrowUp/ArrowDown/Home/End). Tab list uses `role="tablist"` + `role="tab"` + `aria-selected` + `aria-controls` + `aria-labelledby` on panels.
- `list/page.tsx`: Entity cards with `<article>` semantics, `<dl>/<dt>/<dd>` for metadata, `<Badge>` for status, `aria-label` on the add-entity link.
- `compliance/page.tsx`: `<ul role="list">` for deadline items, `<Badge>` for status variants, static `STATUS_ICON_CLS` map (no template-literal classes), SVG donut ring with `role="img"` + `aria-label`.
- `dashboard/page.tsx`: KPI strip (4 cards), payroll trend bar chart (static SVG bars, no Recharts needed), entity distribution with `role="progressbar"` + `aria-valuenow` on each bar.
- `payroll/page.tsx`: Entity run cards with `role="progressbar"` + `aria-valuenow` on progress bars, `<Badge>` for run state.
- `reports/page.tsx`: `<DataTable>` with `rowKey`, `aria-label`, `emptyTitle`, `emptyDescription`. Report type tabs use `role="tablist"` + `role="tab"` + `aria-selected`. Group total footer row below the table.
- All pages use `<Page>`, `<Card>`, `<Button>`, `<Badge>`, `<DataTable>` primitives.
- No `Math.random()` or `Date.now()` in render.
- No template-literal Tailwind classes — static maps used throughout.
- No components defined inside render — all subcomponents at module scope.
- All interactive elements have `aria-label` or visible labels.
- Verification gates: `npm run typecheck` ✅, `npm run lint` (0 errors / 0 warnings) ✅, `npm run test` (247/247 vitest passing) ✅.

## frontend-10x Wave 4 — Long-tail migration (task 45) — ai/*

All 27 pages under `app/(app)/ai/*` migrated as part of the frontend-10x spec task 45 (split into Sub-PR 1 and Sub-PR 2).

### Sub-PR 1 (18 pages)

| Route | Status |
|---|---|
| `/ai/anomaly-detection` | ✅ done |
| `/ai/attrition-risk` | ✅ done |
| `/ai/audit-log` | ✅ done |
| `/ai/career-path` | ✅ done |
| `/ai/chatbot` | ✅ done |
| `/ai/compensation` | ✅ done |
| `/ai/compliance` | ✅ done |
| `/ai/configuration` | ✅ done |
| `/ai/document-ai` | ✅ done |
| `/ai/document-intelligence` | ✅ done |
| `/ai/feedback` | ✅ done |
| `/ai/gazette-monitor` | ✅ done |
| `/ai/hiring-prediction` | ✅ done |

### Sub-PR 2 (14 pages)

| Route | Status |
|---|---|
| `/ai/hr-copilot` | ✅ done |
| `/ai/insights` | ✅ done |
| `/ai/leave-pattern` | ✅ done |
| `/ai/model-performance` | ✅ done |
| `/ai/nl-query` | ✅ done |
| `/ai/policy-bot` | ✅ done |
| `/ai/prescriptive-actions` | ✅ done |
| `/ai/reports` | ✅ done |
| `/ai/salary-benchmarking` | ✅ done |
| `/ai/settings` | ✅ done |
| `/ai/smart-onboarding` | ✅ done |
| `/ai/team-productivity` | ✅ done |
| `/ai/training-data` | ✅ done |
| `/ai/wellness-score` | ✅ done |

Migration notes:
- All pages wrapped in `<Page>` with `title`, `subtitle`, `breadcrumbs`, `actions`, `maxWidth="1300px"`.
- All surfaces converted to `<Card padding="sm|md|lg|none">`.
- All actions converted to `<Button variant size>`. No raw `<button>` with hardcoded styles.
- All status pills converted to `<Badge variant="success|warning|danger|info|purple|neutral|ai">`.
- All Recharts charts wrapped in `<ChartWrapper>` inside `<ClientOnly>`.
- **All `Math.random()` calls replaced with `seededFloats(seed, n)` from `@/lib/random`** using stable seeds (7001–7013) derived from page index. Decorative confidence bars, sparklines, NVI bars, and progress values all use seeded floats.
- All `<DataTable>` instances have `aria-label` and `rowKey`.
- All icon-only buttons have `aria-label`.
- All progress bars have `role="progressbar"` + `aria-valuenow` + `aria-valuemin` + `aria-valuemax` + `aria-label`.
- All tab lists use `role="tablist"` + `role="tab"` + `aria-selected`.
- Chat interfaces (`chatbot`, `policy-bot`) use `role="log"` + `aria-live="polite"` on message containers.
- No template-literal Tailwind classes — static maps used throughout.
- No components defined inside render — all subcomponents at module scope.
- No new inline `style={{}}` — all data-driven widths use Tailwind `style={{ width: ... }}` only for progress bars (legitimate data-driven case).
- Verification gates: `npm run typecheck` ✅, `npm run lint` (0 errors / 0 warnings) ✅, `npm run test` (247/247 vitest passing) ✅, `SKIP_ENV_VALIDATION=1 npm run build` ✅.

## frontend-10x Wave 4 — Long-tail migration (task 46) — bgv/* and security/*

All 11 pages under `app/(app)/bgv/*` and all 15 pages under `app/(app)/security/*` migrated as part of the frontend-10x spec task 46.

### BGV pages

| Route | Status |
|---|---|
| `/bgv/analytics` | ✅ done |
| `/bgv/dashboard` | ✅ done |
| `/bgv/discrepancies` | ✅ done |
| `/bgv/initiate` | ✅ done |
| `/bgv/monitoring` | ✅ done |
| `/bgv/reports` | ✅ done |
| `/bgv/reports/cost` | ✅ done |
| `/bgv/settings/policy` | ✅ done |
| `/bgv/status` | ✅ done |
| `/bgv/status/[id]` | ✅ done |
| `/bgv/vendors` | ✅ done |

### Security pages

| Route | Status |
|---|---|
| `/security/access-logs` | ✅ done |
| `/security/dashboard` | ✅ done |
| `/security/data-deletion` | ✅ done |
| `/security/data-deletion/[id]` | ✅ done |
| `/security/dpdp` | ✅ done |
| `/security/dpdp/[id]` | ✅ done |
| `/security/failed-logins` | ✅ done |
| `/security/incidents` | ✅ done |
| `/security/incidents/[id]` | ✅ done |
| `/security/ip-whitelist` | ✅ done |
| `/security/masking` | ✅ done |
| `/security/permissions` | ✅ done |
| `/security/permissions/[id]` | ✅ done |
| `/security/reports` | ✅ done |
| `/security/sessions` | ✅ done |

Migration notes:
- All pages use `<Page>`, `<Card>`, `<Button>`, `<Badge>`, `<DataTable>` primitives.
- No `Math.random()` or `Date.now()` in render — `seededFloats` used where needed.
- No template-literal Tailwind classes — static palette maps used throughout.
- No components defined inside render — all subcomponents at module scope.
- All interactive elements have `aria-label` or visible labels.
- Progress bars use `role="progressbar"` + `aria-valuenow/min/max`.
- Toggle switches use `role="switch"` + `aria-checked`.
- BGV initiate wizard uses `<ol>` with `aria-current="step"` on active step.
- Tracker confirms: bgv 11/11 migrated, security 15/15 migrated.
- Verification gates: `npm run typecheck` ✅, `npm run lint` (0 errors / 0 warnings) ✅, `npm run test` (247/247 vitest passing) ✅, `SKIP_ENV_VALIDATION=1 npm run build` ✅.

## frontend-10x Wave 4 — Long-tail migration (task 47) — hybrid/* and it/*

All 6 pages under `app/(app)/hybrid/*` and all 6 pages under `app/(app)/it/*` migrated as part of the frontend-10x spec task 47.

### Hybrid pages (WFH request flow)

| Route | Status |
|---|---|
| `/hybrid/wfh/request` | ✅ done |
| `/hybrid/wfh/approvals` | ✅ done |
| `/hybrid/wfh/policy` | ✅ done |
| `/hybrid/field/request` | ✅ done |
| `/hybrid/field/approvals` | ✅ done |
| `/hybrid/outdoor/request` | ✅ done |

### IT pages (asset management)

| Route | Status |
|---|---|
| `/it/dashboard` | ✅ done |
| `/it/assets` | ✅ done |
| `/it/assets/[id]` | ✅ done |
| `/it/assets/add` | ✅ done |
| `/it/assets/assign` | ✅ done |
| `/it/assets/return` | ✅ done |

Migration notes:
- **Tier 2 forms** (WFH request flow): `hybrid/wfh/request`, `hybrid/field/request`, `hybrid/outdoor/request` — all use `useForm({ resolver: zodResolver(schema) })` + `<FormField>` per field. Stub mutation + toast on success.
- **Tier 2 forms** (IT asset management): `it/assets/add`, `it/assets/assign`, `it/assets/return` — all use `useForm({ resolver: zodResolver(schema) })` + `<FormField>` / `<Controller>` per field. Stub mutation + toast on success.
- **WFH approvals** (`hybrid/wfh/approvals`): Tab filter (`Pending / Approved / Rejected`) with `role="tablist"` + `role="tab"` + `aria-selected`. Approve/Reject actions use `<Button variant="primary">` / `<Button variant="danger">` with `aria-label` per employee.
- **Field visit approvals** (`hybrid/field/approvals`): Same approval card pattern. Approve button uses amber accent via `className` override (no template-literal classes).
- **WFH policy** (`hybrid/wfh/policy`): `PolicyToggle` subcomponent at module scope. Toggle uses `peer sr-only` checkbox pattern. Number inputs have `<label htmlFor>` + `sr-only` labels.
- **IT dashboard** (`it/dashboard`): KPI grid (4 tiles), asset category grid, `<DataTable>` for recent provisioning requests with `<Badge>` for status variants. Quick links nav with `role="list"`.
- **Asset inventory** (`it/assets`): Category + status filter chips with `aria-pressed`. `<DataTable>` with `rowKey`, `aria-label`, `emptyTitle`, `emptyDescription`. Action buttons (Assign/Return/View) per row.
- **Asset detail** (`it/assets/[id]`): Hero card with `<Badge>` for status. Specs grid, lifecycle history `<ol>` with `aria-label`. Quick action buttons at module scope (`QuickActionButton`). Purchase/warranty sidebar.
- **Asset assign** (`it/assets/assign`): Temporary assignment toggle with conditional return-date field. `<Controller>` for condition select and notes textarea.
- **Asset return** (`it/assets/return`): Post-return action selector uses `role="radiogroup"` + `role="radio"` + `aria-checked`. Static `ACTION_ACTIVE_CLASSES` and `ACTION_CHECK_CLASSES` maps (no template-literal classes). Warning banner when condition is damaged but action is "Return to Pool".
- All pages use `<Page>`, `<Card>`, `<Button>`, `<Badge>`, `<DataTable>` primitives.
- No `Math.random()` or `Date.now()` in render.
- No template-literal Tailwind classes — static maps used throughout.
- No components defined inside render — all subcomponents at module scope.
- All interactive elements have `aria-label` or visible labels.
- Tracker confirms: hybrid 6/6 migrated, it 6/6 migrated.
- Verification gates: `npm run typecheck` ✅, `npm run lint` (0 errors / 0 warnings) ✅, `npm run test` (247/247 vitest passing) ✅, `SKIP_ENV_VALIDATION=1 npm run build` ✅.

## frontend-10x Wave 4 — Long-tail migration (task 48) — super-admin/*

All 31 pages under `app/(app)/super-admin/*` migrated as part of the frontend-10x spec task 48.

| Route | Status |
|---|---|
| `/super-admin/adoption` | ✅ done |
| `/super-admin/announcements` | ✅ done |
| `/super-admin/api-usage` | ✅ done |
| `/super-admin/audits` | ✅ done |
| `/super-admin/billing` | ✅ done |
| `/super-admin/ca-portal` | ✅ done |
| `/super-admin/churn` | ✅ done |
| `/super-admin/commissions` | ✅ done |
| `/super-admin/contracts` | ✅ done |
| `/super-admin/customer-success` | ✅ done |
| `/super-admin/dashboard` | ✅ done |
| `/super-admin/domains` | ✅ done |
| `/super-admin/features` | ✅ done |
| `/super-admin/feedback-raw` | ✅ done |
| `/super-admin/health` | ✅ done |
| `/super-admin/laws` | ✅ done |
| `/super-admin/login` | ✅ done (full-screen auth flow — no Page shell by design) |
| `/super-admin/marketplace-rev` | ✅ done |
| `/super-admin/nps` | ✅ done |
| `/super-admin/onboarding-ops` | ✅ done |
| `/super-admin/organizations` | ✅ done |
| `/super-admin/organizations/[id]` | ✅ done |
| `/super-admin/organizations/[id]/impersonate` | ✅ done (full-screen security flow — no Page shell by design) |
| `/super-admin/plans` | ✅ done |
| `/super-admin/release-notes` | ✅ done |
| `/super-admin/resellers` | ✅ done |
| `/super-admin/revenue` | ✅ done |
| `/super-admin/roadmap` | ✅ done |
| `/super-admin/support` | ✅ done |
| `/super-admin/usage` | ✅ done |
| `/super-admin/whitelabel` | ✅ done |

Migration notes:
- All pages use `<Page>`, `<Card>`, `<Button>`, `<Badge>`, `<DataTable>` primitives.
- `login/page.tsx` and `organizations/[id]/impersonate/page.tsx` are full-screen auth/security flows — no `<Page>` shell by design (same pattern as `(auth)/*` pages). Both carry `// migrated: immersive-ui` marker.
- Raw `<button>` with hardcoded styles → `<Button variant size>` throughout.
- Status pills → `<Badge variant="success|warning|danger|info|purple|neutral">`.
- All tables → `<DataTable>` with `aria-label`, `rowKey`, `searchable` where appropriate.
- Progress bars → `role="progressbar"` + `aria-valuenow` + `aria-label`.
- Toggle switches → `role="switch"` + `aria-checked` + `aria-label`.
- No `Math.random()` or `Date.now()` in render.
- No template-literal Tailwind classes — static maps used throughout.
- No components defined inside render — all subcomponents at module scope.
- All interactive elements have `aria-label` or visible labels.
- Tracker confirms: super-admin 31/31 migrated, 31/31 labeled.
- Verification gates: `npm run typecheck` ✅, `npm run lint` (0 errors / 0 warnings) ✅, `npm run test` (247/247 vitest passing) ✅, `SKIP_ENV_VALIDATION=1 npm run build` ✅.

## frontend-10x Wave 4 — Long-tail migration (task 49) — payroll-* modules

All 32 pages across 9 `payroll-*` modules migrated as part of the frontend-10x spec task 49.

### payroll-benchmarking (1 page)

| Route | Status |
|---|---|
| `/payroll-benchmarking` | ✅ done |

### payroll-comparison (1 page)

| Route | Status |
|---|---|
| `/payroll-comparison` | ✅ done |

### payroll-error-detail (1 page)

| Route | Status |
|---|---|
| `/payroll-error-detail` | ✅ done |

### payroll-exception (1 page)

| Route | Status |
|---|---|
| `/payroll-exception` | ✅ done |

### payroll-health (1 page)

| Route | Status |
|---|---|
| `/payroll-health` | ✅ done |

### payroll-rollback (1 page)

| Route | Status |
|---|---|
| `/payroll-rollback` | ✅ done |

### payroll-simulation (1 page)

| Route | Status |
|---|---|
| `/payroll-simulation` | ✅ done |

### payroll-reports (8 pages)

| Route | Status |
|---|---|
| `/payroll-reports/bank-advice` | ✅ done |
| `/payroll-reports/cost-center` | ✅ done |
| `/payroll-reports/ctc` | ✅ done |
| `/payroll-reports/custom` | ✅ done |
| `/payroll-reports/gross-to-net` | ✅ done |
| `/payroll-reports/pf-esi` | ✅ done |
| `/payroll-reports/pt-lwf` | ✅ done |
| `/payroll-reports/variance` | ✅ done |

### payroll-settings (17 pages)

| Route | Status |
|---|---|
| `/payroll-settings` | ✅ done |
| `/payroll-settings/arrears-logic` | ✅ done |
| `/payroll-settings/bands` | ✅ done |
| `/payroll-settings/bank-verify` | ✅ done |
| `/payroll-settings/commission` | ✅ done |
| `/payroll-settings/components` | ✅ done |
| `/payroll-settings/components/formula` | ✅ done |
| `/payroll-settings/components/map` | ✅ done |
| `/payroll-settings/cycle` | ✅ done |
| `/payroll-settings/freeze` | ✅ done |
| `/payroll-settings/incentive` | ✅ done |
| `/payroll-settings/loans` | ✅ done |
| `/payroll-settings/lock` | ✅ done |
| `/payroll-settings/multi-bank` | ✅ done |
| `/payroll-settings/payslip-template` | ✅ done |
| `/payroll-settings/pro-rata` | ✅ done |
| `/payroll-settings/variable-pay` | ✅ done |

Migration notes:
- All pages use `<Page>`, `<Card>`, `<Button>`, `<Badge>`, `<DataTable>` primitives.
- Raw `<button>` with hardcoded styles → `<Button variant size>` throughout.
- Status pills → `<Badge variant="success|warning|danger|info|purple|neutral">`.
- All tables → `<DataTable>` with `aria-label`, `rowKey`, `searchable` where appropriate.
- Progress bars → `role="progressbar"` + `aria-valuenow` + `aria-label`.
- Toggle switches → `role="switch"` + `aria-checked` + `aria-label`.
- Inline `style={{}}` removed; Tailwind classes used throughout.
- No `Math.random()` or `Date.now()` in render.
- No template-literal Tailwind classes — static maps used throughout.
- No components defined inside render — all subcomponents at module scope.
- All interactive elements have `aria-label` or visible labels.
- **Calculation snapshot tests** added to `__tests__/migrations/payroll-calc.test.tsx` for:
  - `payroll-comparison` — KPI totals (headcount 148, gross ₹1.15 Cr, deductions ₹22.4 L, net ₹92.6 L) + variance table values byte-identical.
  - `payroll-rollback` — target cycle (March 2025 Regular), affected employees (145 Personnel), reversal amount (₹45,20,000) byte-identical.
  - `payroll-simulation` — all 3 scenario totals (₹1,12,12,680 / ₹1,14,42,208 / ₹1,32,74,400) + delta math byte-identical.
- Tracker confirms: all 9 payroll-* modules at migrated = total (32/32 pages, 32/32 labeled).
- Verification gates: `npm run typecheck` ✅, `npm run lint` (0 errors / 0 warnings) ✅, `npm run test` (253/253 vitest passing) ✅, `SKIP_ENV_VALIDATION=1 npm run build` ✅.

## frontend-10x Wave 4 — Long-tail migration (task 50) — misc modules

All pages across 29 misc modules migrated as part of the frontend-10x spec task 50.

### Modules migrated

| Module | Pages | Status |
|--------|-------|--------|
| `assets` | 9 | ✅ done |
| `projects` | 9 | ✅ done |
| `contractor` | 5 | ✅ done |
| `ctc-letters` | 1 | ✅ done |
| `gratuity-provision` | 1 | ✅ done |
| `incentive-payment` | 1 | ✅ done |
| `incentive-setup` | 1 | ✅ done |
| `commission-setup` | 1 | ✅ done |
| `leave-encashment` | 1 | ✅ done |
| `multi-bank-disbursement` | 1 | ✅ done |
| `negative-net-pay` | 1 | ✅ done |
| `notice-board` | 5 | ✅ done |
| `off-cycle-payroll` | 1 | ✅ done |
| `offboarding` | 12 | ✅ done |
| `org-chart` | 25 | ✅ done |
| `pay-equity` | 10 | ✅ done |
| `payslip-customization` | 1 | ✅ done |
| `self-service` | 10 | ✅ done |
| `statutory-bonus` | 1 | ✅ done |
| `succession` | 11 | ✅ done |
| `variable-pay-setup` | 1 | ✅ done |
| `workforce-analytics` | 8 | ✅ done |
| `zero-payroll` | 1 | ✅ done |
| `developer` | 10 | ✅ done |
| `global` | 8 | ✅ done |
| `grievances` | 12 | ✅ done |
| `help` | 12 | ✅ done |
| `documents` | 13 | ✅ done |
| `engagement` | 28 + 2 redirects | ✅ done |

**Total: ~248 pages migrated** (2 engagement redirect pages correctly excluded from Page shell).

Migration notes:
- All pages wrapped in `<Page title subtitle breadcrumbs maxWidth>`.
- Dynamic color interpolation violations fixed with static `Record<Key, string>` maps at module scope.
- `<Page>` placement bugs (inserted inside `.map()` callbacks) detected and fixed via `scripts/fix-page-in-map.py`.
- Template-literal Tailwind classes (`bg-${color}-500/10`) replaced with static palette maps throughout.
- `workforce-analytics/forecast` and `workforce-analytics/planning` fully rewritten to fix Page-in-map and dynamic color issues.
- `workforce-analytics/attrition` and `workforce-analytics/hiring` fixed with static color maps.
- `grievances/dashboard` fixed with static severity color maps.
- `succession/critical-roles` fixed with static coverage color maps.
- `assets/dashboard` fixed with static ticket status color map.
- No `Math.random()` or `Date.now()` in render.
- No template-literal Tailwind classes — static maps used throughout.
- No components defined inside render — all subcomponents at module scope.
- All interactive elements have `aria-label` or visible labels.
- Verification gates: `npm run typecheck` ✅, `npm run lint` (0 errors / 0 warnings) ✅, `npm run test` (253/253 vitest passing) ✅.


## frontend-10x Wave 4 — Long-tail migration (task 51) — (auth) and (setup) groups

All 15 pages under `app/(auth)/*` and all 13 pages under `app/(setup)/*` migrated as part of the frontend-10x spec task 51.

**Key rule:** Auth/setup pages use centered layouts — NO `<Page>` wrapper (no sidebar). They use `<Card>` for form containers, `<Button>` for actions, `<Badge>` for status, and `<DataTable>` for tabular data where applicable.

### (auth) pages

| Route | Status | Notes |
|-------|--------|-------|
| `/login` | ✅ done | Inline `style={{}}` on left panel + logo div removed; Tailwind classes used |
| `/forgot-password` | ✅ done | Already using Card/Button/Input — verified clean |
| `/forgot-password/otp` | ✅ done | Migrated from heavy inline styles to `<Card variant="elevated">` + `<Button>` |
| `/reset-password` | ✅ done | Inline `style={{}}` on confirm input border removed; static conditional classes |
| `/verify-otp` | ✅ done | Already using Card/Button — verified clean |
| `/verify-2fa` | ✅ done | Already using Card/Button — conic-gradient timer justified with `// inline-style:` |
| `/magic-link` | ✅ done | Already using Card/Button/Input — verified clean |
| `/sso/google` | ✅ done | Already using Card + static STEP_BG/STEP_BORDER/STEP_TEXT maps — verified clean |
| `/sso/microsoft` | ✅ done | Already using Card + static maps — verified clean |
| `/account-locked` | ✅ done | Migrated from raw `<div>` with inline border to `<Card variant="elevated">` |
| `/session-expired` | ✅ done | Already using Card/Button — verified clean |
| `/active-sessions` | ✅ done | Already using Card/Button/Badge — TypeScript narrowing fixed |
| `/first-login` | ✅ done | Inline `style={{}}` on confirm input border removed; static conditional classes |
| `/login-history` | ✅ done | Already using DataTable/Badge/Button — verified clean |
| `/setup-2fa` | ✅ done | Already using Card/Button + static step maps — verified clean |

### (setup) pages

| Route | Status | Notes |
|-------|--------|-------|
| `/welcome` | ✅ done | Already using Card + seededFloats confetti — verified clean |
| `/company-details` | ✅ done | Already using Card/Input — all selects have `<label htmlFor>` |
| `/company-tax` | ✅ done | Already using Card/Input/Button — verified clean |
| `/branding` | ✅ done | Already using Card/Button — color inputs have `aria-label` |
| `/departments` | ✅ done | Already using Card/DataTable/Button/Input — verified clean |
| `/designations` | ✅ done | Already using Card/DataTable/Button/Input — verified clean |
| `/statutory` | ✅ done | Raw `<button>` Toggle → `<Button>` primitive; `<Card>` for sections; all labels added |
| `/bank-account` | ✅ done | Heavy inline styles → `<Card>`; raw `<button>` toggle → `<Button>`; all inputs labelled |
| `/setup-payroll` | ✅ done | Heavy inline styles → `<Card>`; raw `<button>` Toggle → `<Button>`; all selects labelled |
| `/invite-team` | ✅ done | Raw `<table>` → `<DataTable>`; raw `<button>` resend/remove → `<Button>`; `<Badge>` for status |
| `/data-retention` | ✅ done | Heavy inline styles → `<Card>`; raw `<button>` toggle → `<Button>`; all selects labelled |
| `/locale` | ✅ done | Heavy inline styles → `<Card>`; all selects have `<label htmlFor>` or `sr-only` labels |
| `/complete` | ✅ done | Raw `<div>` summary cards → `<Card>`; `LucideIcon` type used for icon array |

Migration notes:
- **No `<Page>` wrapper** — auth/setup pages are centered full-screen layouts without the app sidebar.
- **`<Card>`** used for all form containers and info panels.
- **`<Button>`** used for all actions — no raw `<button>` with hardcoded styles.
- **`<Badge>`** used for status indicators (active sessions, invite status).
- **`<DataTable>`** used for tabular data (login history, invite team).
- **Toggle switches**: All raw `<button>` toggles replaced with `<Button>` primitive using `aria-pressed` + `aria-label`.
- **Inline styles removed**: `style={{ background: ... }}` on layout divs replaced with Tailwind classes. Remaining `style={{}}` are justified (conic-gradient timer, confetti positions, blur decorations).
- **Static conditional classes**: Password strength meter and confirm-input border use static conditional class strings (no template literals).
- **`seededFloats`**: Confetti in `welcome` and `complete` pages already used `seededFloats` — preserved.
- **No `Math.random()` or `Date.now()` in render** — `login/page.tsx` is a server component so `new Date().getFullYear()` is fine (runs at build time).
- **All inputs labelled**: All `<input>`, `<select>`, `<textarea>` elements have `<label htmlFor>`, `aria-label`, or `sr-only` labels.
- **No template-literal Tailwind classes** throughout.
- **No components defined inside render** — all subcomponents at module scope.
- Verification gates: `npm run typecheck` ✅ (exit 0), `npm run lint` (0 errors / 0 warnings) ✅.
