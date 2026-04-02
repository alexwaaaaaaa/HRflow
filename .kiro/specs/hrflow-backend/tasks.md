# Implementation Plan: HRFlow Backend

## Overview

Incremental implementation of the HRFlow HRMS backend in TypeScript + Fastify 4.x + Prisma 5.x + PostgreSQL 16 + Redis 7 + BullMQ. Each task builds on the previous, ending with a fully wired, production-ready system. All monetary values are stored and computed in paise (BIGINT). The implementation language is TypeScript (strict mode).

## Tasks

- [ ] 1. Project Foundation
  - [ ] 1.1 Initialise the backend package
    - Create `backend/` directory with `package.json` (Node 20, TypeScript 5 strict, Fastify 4, Prisma 5, Zod, BullMQ, IORedis, fast-check, Vitest, Supertest)
    - Add `tsconfig.json` with `strict: true`, `target: ES2022`, `moduleResolution: bundler`
    - Add `vitest.config.ts` with coverage thresholds
    - _Requirements: NFR.1, NFR.3_

  - [ ] 1.2 Implement `src/config/env.ts` — Zod-validated environment schema
    - Validate `DATABASE_URL`, `REDIS_HOST`, `REDIS_PORT`, `JWT_SECRET`, `REFRESH_TOKEN_SECRET`, `ENCRYPTION_KEY` (32-byte hex), `PORT`, `LOG_LEVEL`, `NODE_ENV`, `S3_*` vars
    - Export typed `env` object; throw on startup if any required var is missing
    - _Requirements: TR.1, SR.3_

  - [ ] 1.3 Implement `src/config/constants.ts` — statutory constants
    - Export `PF_WAGE_CEILING_PAISE = 1_500_000n`, `EPS_CAP_MONTHLY_PAISE = 125_000n`, `ESI_CEILING_PAISE = 2_100_000n`
    - Export Finance Act 2025-26 new-regime and old-regime tax slabs as typed arrays
    - Export `STANDARD_DEDUCTION_NEW_PAISE = 7_500_000n`, `STANDARD_DEDUCTION_OLD_PAISE = 5_000_000n`
    - Export `REBATE_87A_NEW_THRESHOLD_PAISE`, `REBATE_87A_NEW_MAX_PAISE`, `REBATE_87A_OLD_THRESHOLD_PAISE`, `REBATE_87A_OLD_MAX_PAISE`
    - _Requirements: TDS.1, PP.7, PP.8, PP.9_

  - [ ] 1.4 Implement Fastify app factory `src/app.ts` and entry point `src/index.ts`
    - `buildApp()` registers plugins in order: prisma → redis → bullmq → rate-limit → auth → rls → audit
    - Registers all module routes under `/api/v1/*` prefix
    - Adds `/health` endpoint
    - `src/index.ts` calls `buildApp()`, starts server, wires graceful shutdown (SIGTERM/SIGINT)
    - _Requirements: TR.2, NFR.3_

  - [ ] 1.5 Implement `src/shared/errors.ts` — AppError hierarchy
    - `AppError`, `ValidationError`, `AuthError`, `ForbiddenError`, `NotFoundError`, `ConflictError`, `PayrollError`
    - Fastify `setErrorHandler` mapping AppError → structured JSON response with `request_id` and `timestamp`
    - _Requirements: TR.2_

  - [ ] 1.6 Add Docker configuration
    - Multi-stage `Dockerfile` (builder → runner, node:20-alpine)
    - `docker-compose.yml` with services: api, postgres:16-alpine, redis:7-alpine, minio/minio
    - `.env.example` with all required variables
    - _Requirements: NFR.3_

- [ ] 2. Database Schema & Migrations
  - [ ] 2.1 Write Prisma schema `prisma/schema.prisma`
    - Models: `Organization`, `User`, `Employee`, `SalaryStructure`, `Department`, `Designation`
    - Models: `PayrollRun`, `Payslip`, `PayrollEvent`, `Outbox`, `TaxDeclaration`
    - Models: `AuditLog`, `PtSlab`, `ComplianceFiling`, `RefreshToken`
    - Models: `AttendanceRecord`, `LeaveBalance`, `LeaveRequest`, `LeavePolicy`
    - Models: `FnfSettlement`, `Loan`, `LoanRepayment`, `EwaRequest`
    - All monetary fields as `BigInt`; all tables include `org_id` UUID and `created_at`
    - _Requirements: TR.3, SR.1, PP.2_

  - [ ] 2.2 Write RLS migration `prisma/migrations/001_rls_policies.sql`
    - Enable RLS on every business table
    - Create `tenant_isolation` policy: `USING (org_id = current_setting('app.current_org_id')::uuid)`
    - Audit log special policies: INSERT-only for mutations, SELECT with org filter
    - _Requirements: SR.1, SR.8_

  - [ ] 2.3 Write seed data `prisma/seed.ts`
    - Seed one demo organization, one HR admin user (bcrypt-hashed password), PT slabs for all 28 states
    - Seed Finance Act 2025-26 tax slab constants into `pt_slabs` table
    - _Requirements: C.5, TR.3_

  - [ ]* 2.4 Write property test for RLS tenant isolation
    - **Property 19: RLS Tenant Isolation**
    - **Validates: Requirements SR.1, SR.8**
    - Insert employee records for org A; query with org B context; assert zero results returned
    - _File: `tests/properties/security.property.test.ts`_

- [ ] 3. Core Plugins
  - [ ] 3.1 Implement `src/plugins/prisma.ts`
    - Decorate Fastify instance with `fastify.prisma` (PrismaClient singleton)
    - Register `onClose` hook to call `prisma.$disconnect()`
    - _Requirements: TR.3_

  - [ ] 3.2 Implement `src/plugins/redis.ts`
    - Decorate Fastify instance with `fastify.redis` (IORedis client)
    - Connect using `env.REDIS_HOST` / `env.REDIS_PORT`; register `onClose` hook
    - _Requirements: TR.1_

  - [ ] 3.3 Implement `src/plugins/bullmq.ts`
    - Create and decorate queues: `payroll:process`, `payroll:disburse`, `compliance:generate`, `gazette:monitor`, `notification:send`, `report:generate`
    - Configure default job options: `attempts: 3`, exponential backoff `delay: 5000`
    - _Requirements: TR.1, PP.3_

  - [ ] 3.4 Implement `src/plugins/rls.ts`
    - `onRequest` hook: extract `org_id` from `request.user`; execute `SET LOCAL app.current_org_id = $1` inside every transaction
    - Skip for public routes (`/health`, `/api/v1/auth/login`, `/api/v1/auth/refresh`)
    - _Requirements: SR.1, SR.8_

  - [ ] 3.5 Implement `src/plugins/rate-limit.ts`
    - Use `@fastify/rate-limit` with Redis store
    - 1000 req/min per `org_id`; 100 req/min per `user_id`
    - Return `429` with `Retry-After` header on breach
    - _Requirements: SR.4_

  - [ ] 3.6 Implement `src/plugins/audit.ts`
    - `onResponse` hook: for all mutating methods (POST/PUT/PATCH/DELETE), write one `audit_logs` record with `resource_type`, `resource_id`, `user_id`, `org_id`, `old_value`, `new_value`, `ip_address`
    - _Requirements: SR.7_

  - [ ] 3.7 Implement `src/shared/encryption.ts` — AES-256-GCM helpers
    - `encrypt(plaintext: string): string` — random 12-byte IV, returns base64(iv + tag + ciphertext)
    - `decrypt(ciphertext: string): string` — reverses the above
    - Key sourced from `env.ENCRYPTION_KEY` (32-byte hex)
    - _Requirements: SR.2, SR.3_

  - [ ]* 3.8 Write property test for PII encryption round-trip
    - **Property 20: PII Encryption Round-Trip**
    - **Validates: Requirements SR.2**
    - Assert `decrypt(encrypt(v)) === v`, `encrypt(v) !== v`, two encryptions of same value differ
    - _File: `tests/properties/security.property.test.ts`_

  - [ ] 3.9 Implement `src/shared/pagination.ts` — cursor pagination helpers
    - `encodeCursor(id, timestamp)` → base64 string
    - `decodeCursor(cursor)` → `{ id, timestamp }`
    - `buildPrismaWhere(cursor)` → Prisma `where` clause for keyset pagination
    - _Requirements: TR.2_

  - [ ] 3.10 Implement `src/shared/idempotency.ts` — idempotency key middleware
    - Fastify `preHandler` hook for financial endpoints: read `Idempotency-Key` header
    - Check Redis for `(org_id, idempotency_key)` → if hit, return cached `{ statusCode, body }` immediately
    - On miss: store result in Redis with 24h TTL after handler completes
    - _Requirements: SR.10, PP.4_

  - [ ]* 3.11 Write property test for financial API idempotency
    - **Property 24: Financial API Idempotency**
    - **Validates: Requirements SR.10**
    - Same `Idempotency-Key` called twice → identical status code and response body, no duplicate DB records
    - _File: `tests/properties/security.property.test.ts`_

- [ ] 4. Auth Module
  - [ ] 4.1 Implement `src/modules/auth/auth.service.ts`
    - `login(email, password, totpCode?)` → verify bcrypt hash, check TOTP if enabled, issue JWT (15min) + refresh token (30 days, SHA-256 hashed in DB)
    - `refresh(refreshToken)` → validate hash, rotate token (family-based theft detection), issue new access token
    - `logout(refreshToken)` → invalidate token family
    - `revokeAll(userId)` → invalidate all refresh tokens for user
    - _Requirements: TR.5, SR.5, SR.6_

  - [ ] 4.2 Implement `src/modules/auth/totp.service.ts`
    - `generateSecret()` → 20-byte base32 secret, store encrypted via `encrypt()`
    - `verifyCode(secret, code, windowSteps = 1)` → accept current + ±1 step (30s window)
    - `generateQRUri(secret, email, issuer)` → `otpauth://` URI for authenticator apps
    - _Requirements: SR.6_

  - [ ] 4.3 Implement `src/plugins/auth.ts` — JWT verify hook
    - `preHandler` hook: extract Bearer token, verify with `JWT_SECRET`, attach decoded payload to `request.user`
    - Check token not in revoked set (Redis blacklist)
    - Skip public routes
    - _Requirements: SR.5_

  - [ ] 4.4 Implement `src/modules/auth/auth.routes.ts` and `auth.schema.ts`
    - `POST /api/v1/auth/login` — Zod-validated `LoginRequest`, returns `LoginResponse`
    - `POST /api/v1/auth/refresh` — rotates refresh token
    - `POST /api/v1/auth/logout` — invalidates refresh token
    - `POST /api/v1/auth/totp/setup` — generates TOTP secret + QR URI
    - `POST /api/v1/auth/totp/verify` — enables TOTP after first successful verification
    - _Requirements: TR.5, SR.5, SR.6_

  - [ ]* 4.5 Write property test for JWT expiry invariants
    - **Property 21: JWT Expiry Invariants**
    - **Validates: Requirements SR.5**
    - Assert `exp - iat === 900` for all issued access tokens; refresh token TTL = 30 days
    - _File: `tests/properties/security.property.test.ts`_

  - [ ]* 4.6 Write property test for TOTP validation
    - **Property 22: TOTP Validation**
    - **Validates: Requirements SR.6**
    - Code at T accepted; code at T-30s accepted; code at T-120s rejected; random 6-digit code rejected ≥99.99% of the time
    - _File: `tests/properties/security.property.test.ts`_

- [ ] 5. Checkpoint — Auth & Core Infrastructure
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 6. Employee Module
  - [ ] 6.1 Implement `src/modules/employee/employee.service.ts`
    - `createEmployee(orgId, data)` — encrypt PAN, Aadhaar, phone, bank account before write; write audit log
    - `updateEmployee(orgId, id, data)` — partial update with audit log capturing old/new values
    - `getEmployee(orgId, id)` — decrypt PII fields before returning; log `VIEW_PII` audit event
    - `listEmployees(orgId, cursor, limit, fields)` — cursor pagination, partial response via Prisma `select`
    - `softDeleteEmployee(orgId, id)` — set `deleted_at`, never hard delete
    - _Requirements: EM.1, EM.2, SR.2, SR.7_

  - [ ] 6.2 Implement salary structure management in `employee.service.ts`
    - `createSalaryStructure(orgId, employeeId, data)` — all amounts validated as positive BIGINT paise
    - `getEffectiveSalaryStructure(employeeId, date)` — find structure where `effective_from <= date AND (effective_to IS NULL OR effective_to >= date)`
    - _Requirements: EM.2, PP.2_

  - [ ] 6.3 Implement `src/modules/employee/employee.routes.ts` and `employee.schema.ts`
    - `POST /api/v1/employees` — create employee
    - `GET /api/v1/employees` — list with cursor pagination and `?fields=` partial response
    - `GET /api/v1/employees/:id` — get single employee (PII decrypted)
    - `PATCH /api/v1/employees/:id` — partial update
    - `DELETE /api/v1/employees/:id` — soft delete
    - `POST /api/v1/employees/:id/salary-structures` — create salary structure
    - `GET /api/v1/employees/:id/salary-structures` — list salary structures
    - _Requirements: EM.1, EM.2_

  - [ ]* 6.4 Write unit tests for employee PII encryption/decryption
    - Test that stored PAN/Aadhaar/phone are not plaintext in DB
    - Test that `getEmployee` returns decrypted values matching original input
    - _File: `tests/unit/employee.unit.test.ts`_

- [ ] 7. TDS Engine
  - [ ] 7.1 Implement `src/modules/tds/tds.engine.ts` — core TDS computation
    - Steps 1–11 from the design algorithm using only `bigint` arithmetic
    - Step 1: aggregate gross income (+ Form 12B previous employer income)
    - Step 2: standard deduction (₹75,000 new / ₹50,000 old)
    - Step 3: HRA exemption (old regime only) — delegate to `hra.calculator.ts`
    - Step 4: Chapter VI-A deductions (old regime only, except 80CCD(2))
    - Step 5: taxable income
    - Step 6: slab tax using constants from `config/constants.ts`
    - Step 7: Section 87A rebate + marginal relief
    - Step 8: surcharge
    - Step 9: health & education cess (4%)
    - Step 10: Section 89 relief — delegate to `section89.ts`
    - Step 11: monthly TDS = `CEIL(annual_tds / remaining_months)`
    - Return full `TDSComputationResult` including `computation_steps[]` for event sourcing
    - _Requirements: TDS.1, TDS.2, TDS.3, TDS.4, TDS.5, TDS.6, TDS.7, TDS.8_

  - [ ] 7.2 Implement `src/modules/tds/hra.calculator.ts`
    - `computeHRAExemption({ hraReceivedPaise, rentPaidPaise, basicPaise, cityType })` → bigint
    - Formula: `MAX(0, MIN(hra_received, rent_paid - FLOOR(basic * 10/100), FLOOR(basic * 50/100 or 40/100)))`
    - Return 0 in new regime
    - _Requirements: TDS.3_

  - [ ]* 7.3 Write property test for HRA exemption formula
    - **Property 8: HRA Exemption Formula**
    - **Validates: Requirements TDS.3**
    - For any (hra, rent, basic, cityType): result equals MIN of three components, never negative, zero in new regime
    - _File: `tests/properties/tds.property.test.ts`_

  - [ ] 7.4 Implement `src/modules/tds/section89.ts`
    - `computeSection89Relief({ arrearsPaise, receiptYearIncome, accrualYearIncomes, regime })` → bigint
    - Formula per design: `tax_with_arrear_receipt - tax_without_arrear_receipt - tax_with_arrear_accrual + tax_without_arrear_accrual`
    - Result floored at 0 (never negative)
    - _Requirements: TDS.7_

  - [ ]* 7.5 Write property test for Section 89 arrear relief
    - **Property 11: Section 89 Arrear Relief**
    - **Validates: Requirements TDS.7**
    - Relief is never negative; net tax after relief is >= 0
    - _File: `tests/properties/tds.property.test.ts`_

  - [ ] 7.6 Implement `src/modules/tds/regime.comparator.ts`
    - `compareRegimes(declarations)` → `{ recommendedRegime, oldRegimeTaxPaise, newRegimeTaxPaise, savingsPaise }`
    - `recommendedRegime = oldTax <= newTax ? 'OLD' : 'NEW'`
    - `savingsPaise = ABS(oldTax - newTax)`
    - _Requirements: TDS.9_

  - [ ]* 7.7 Write property test for regime comparison correctness
    - **Property 13: Regime Comparison Correctness**
    - **Validates: Requirements TDS.9**
    - `recommendedRegime` always equals the lower-tax regime; `savingsPaise = ABS(old - new)`
    - _File: `tests/properties/tds.property.test.ts`_

  - [ ]* 7.8 Write property test for Section 87A marginal relief
    - **Property 7: Section 87A Marginal Relief**
    - **Validates: Requirements TDS.2, PP.10**
    - New regime: taxable ≤ ₹12L → tax = 0; taxable > ₹12L → tax ≤ (taxable - ₹12L)
    - Old regime: taxable ≤ ₹5L → tax = 0
    - _File: `tests/properties/tds.property.test.ts`_

  - [ ]* 7.9 Write property test for Chapter VI-A deduction caps
    - **Property 9: Chapter VI-A Deduction Caps**
    - **Validates: Requirements TDS.4, TDS.5**
    - 80C capped at ₹1.5L; 80D self ≤ ₹25K (₹50K senior); 80D parent ≤ ₹25K (₹50K senior); all VI-A = 0 in new regime except 80CCD(2)
    - _File: `tests/properties/tds.property.test.ts`_

  - [ ]* 7.10 Write property test for NPS 80CCD(2) both regimes
    - **Property 10: NPS 80CCD(2) Both Regimes**
    - **Validates: Requirements TDS.6**
    - 80CCD(2) = MIN(employer_nps, FLOOR((basic + da) * 10/100)); available in both regimes
    - _File: `tests/properties/tds.property.test.ts`_

  - [ ]* 7.11 Write property test for Form 12B mid-year income aggregation
    - **Property 12: Form 12B Mid-Year Income Aggregation**
    - **Validates: Requirements TDS.8**
    - Total annual income = current projected + previous employer income; monthly TDS uses remaining months
    - _File: `tests/properties/tds.property.test.ts`_

  - [ ] 7.12 Implement `src/modules/tds/tds.service.ts` and `tds.routes.ts`
    - `POST /api/v1/tds/compute` — compute TDS for an employee for a financial year
    - `GET /api/v1/tds/declarations/:employeeId` — get tax declarations
    - `POST /api/v1/tds/declarations` — submit investment declarations
    - `GET /api/v1/tds/regime-comparison/:employeeId` — regime comparison with savings
    - _Requirements: TDS.1–TDS.9_

  - [ ]* 7.13 Write unit tests for TDS known examples
    - ₹12,00,000 taxable (new regime) → zero tax after 87A
    - ₹12,00,001 taxable (new regime) → tax = ₹1 (marginal relief)
    - ₹15,000 basic → PF on full ₹15,000; ₹15,001 basic → PF still on ₹15,000 ceiling
    - 200+ cases covering all slab boundaries and deduction caps
    - _File: `tests/unit/tds.unit.test.ts`_

- [ ] 8. Checkpoint — TDS Engine
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 9. Payroll Engine
  - [ ] 9.1 Implement `src/modules/payroll/payroll.calculator.ts` — pure computation functions
    - `computePF(basicPaise)` → `{ eeContribution, erEPF, erEPSCapped, edli, epfWages }` using bigint arithmetic and constants
    - `computeESI(grossPaise)` → `{ eeContribution, erContribution }` with ₹21,000 ceiling; mid-month promotion logic
    - `computeProRata(fullMonthGrossPaise, paidDays, workingDays)` → `FLOOR(full * paid / working)` as bigint
    - `computeLWF(statePaise, periodMonth)` → non-zero only in June (6) and December (12)
    - All functions are pure (no I/O), accept and return bigint
    - _Requirements: PP.6, PP.7, PP.8, PP.9, C.6_

  - [ ]* 9.2 Write property test for paise-only arithmetic
    - **Property 1: Paise-Only Arithmetic**
    - **Validates: Requirements PP.2**
    - For any salary structure inputs, all computed values (gross, net, TDS, PF, ESI, PT, LWF) are `bigint` with no fractional leakage
    - _File: `tests/properties/payroll.property.test.ts`_

  - [ ]* 9.3 Write property test for statutory deduction ceilings
    - **Property 5: Statutory Deduction Ceilings**
    - **Validates: Requirements PP.7, PP.8**
    - PF ee = 12% of MIN(basic, ₹15K); EPS ≤ ₹1,250; ESI = 0 when gross > ₹21K
    - _File: `tests/properties/payroll.property.test.ts`_

  - [ ]* 9.4 Write property test for pro-rata calculation correctness
    - **Property 4: Pro-Rata Calculation Correctness**
    - **Validates: Requirements PP.6**
    - `proRata === FLOOR(fullGross * paidDays / workingDays)` for all valid (paidDays ≤ workingDays) inputs
    - _File: `tests/properties/payroll.property.test.ts`_

  - [ ]* 9.5 Write property test for LWF bi-annual deduction
    - **Property 17: LWF Bi-Annual Deduction**
    - **Validates: Requirements C.6**
    - `lwf_paise > 0` iff `period_month IN (6, 12)` and state has LWF; zero for all other months
    - _File: `tests/properties/payroll.property.test.ts`_

  - [ ] 9.6 Implement PT lookup in `src/modules/compliance/pt.service.ts`
    - `computePT(stateCode, monthlyGrossPaise, effectiveDate)` → bigint
    - Query `pt_slabs` table for matching state + effective date; return 0 for states without PT
    - _Requirements: PP.9, C.5_

  - [ ]* 9.7 Write property test for state-wise PT slab lookup
    - **Property 6: State-Wise PT Slab Lookup**
    - **Validates: Requirements PP.9, C.5**
    - For any (stateCode, grossPaise), result matches DB slab exactly; states without PT return 0
    - _File: `tests/properties/payroll.property.test.ts`_

  - [ ] 9.8 Implement `src/modules/payroll/payroll.service.ts`
    - `createPayrollRun(orgId, userId, data, idempotencyKey)` — create `payroll_runs` record (DRAFT), enqueue `payroll:process` BullMQ job
    - `approvePayrollRun(orgId, runId, approverId)` — transition to APPROVED, write outbox records for each payslip
    - `getPayrollRun(orgId, runId)` — fetch run with summary totals
    - `listPayrollRuns(orgId, cursor, limit)` — cursor-paginated list
    - _Requirements: PP.1, PP.3, PP.4_

  - [ ] 9.9 Implement `src/workers/payroll.worker.ts` — BullMQ payroll processing worker
    - Fetch active employees in batches of 50
    - For each employee (parallel `Promise.all`): fetch salary structure, fetch attendance, compute pro-rata, compute PF, ESI, PT, LWF, TDS (via TDS engine), apply loan/EWA recoveries, compute net
    - Write `payslips` record and `payroll_events` (CALCULATION_STARTED, PF_COMPUTED, ESI_COMPUTED, PT_COMPUTED, TDS_COMPUTED, NET_COMPUTED) in a single transaction
    - Update `payroll_run` totals and set status = PENDING_APPROVAL
    - Emit notification to finance manager
    - Worker config: `concurrency: 5`, `limiter: { max: 10, duration: 1000 }`
    - _Requirements: PP.1, PP.2, PP.3, PP.5_

  - [ ]* 9.10 Write property test for event sourcing completeness
    - **Property 2: Event Sourcing Completeness**
    - **Validates: Requirements PP.3**
    - For any completed payroll run, every payslip has events covering all 6 stages; events are sufficient to reconstruct the payslip
    - _File: `tests/properties/payroll.property.test.ts`_

  - [ ] 9.11 Implement `src/workers/disbursement.worker.ts` — outbox poller
    - Poll `outbox WHERE status = 'PENDING'` every 30s
    - For each record: call bank API (Razorpay/NEFT stub), on success update `outbox.status = SENT` and `payslip.utr_number`, on failure increment `attempts` and set `status = FAILED`
    - Use `SELECT ... FOR UPDATE SKIP LOCKED` to prevent concurrent processing of same record
    - Set `payroll_run.status = COMPLETED` when all outbox records for run are SENT
    - _Requirements: PP.4_

  - [ ]* 9.12 Write property test for disbursement idempotency
    - **Property 3: Disbursement Idempotency**
    - **Validates: Requirements PP.4**
    - Triggering disbursement multiple times for same payslip ID results in exactly one outbox record processed and one bank transfer; subsequent calls return original UTR
    - _File: `tests/properties/payroll.property.test.ts`_

  - [ ] 9.13 Implement `src/modules/payroll/payroll.routes.ts` and `payroll.schema.ts`
    - `POST /api/v1/payroll/runs` — requires `Idempotency-Key` header; returns 202 with run ID
    - `GET /api/v1/payroll/runs` — cursor-paginated list
    - `GET /api/v1/payroll/runs/:id` — get run details
    - `POST /api/v1/payroll/runs/:id/approve` — finance manager approval
    - `GET /api/v1/payroll/runs/:id/payslips` — list payslips for run
    - `GET /api/v1/payroll/payslips/:id` — get individual payslip
    - _Requirements: PP.1, PP.4_

  - [ ]* 9.14 Write unit tests for payroll calculator
    - 100+ cases: zero salary, max salary, exact PF ceiling, ESI ceiling crossing, mid-month joiner, LWF months
    - _File: `tests/unit/payroll.unit.test.ts`_

- [ ] 10. Checkpoint — Payroll Engine
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 11. Compliance Engine
  - [ ] 11.1 Implement `src/modules/compliance/epfo.service.ts` — EPFO ECR v2.0
    - `generateECR(orgId, payrollRunId)` → ECR v2.0 text file content
    - Build `EPFOECRRecord[]` from payslips: compute `ee_share`, `er_epf_share`, `er_eps_share` per design formulas
    - Validate: `ee + er_epf + er_eps === total_pf`; `er_eps ≤ ₹1,250`; `epf_wages ≤ ₹15,000`
    - Upload to S3, create `compliance_filings` record
    - _Requirements: C.1_

  - [ ]* 11.2 Write property test for EPFO ECR contribution consistency
    - **Property 14: EPFO ECR Contribution Consistency**
    - **Validates: Requirements C.1**
    - `ee + er_epf + er_eps === total_pf`; `er_eps ≤ 125_000n`; `epf_wages ≤ 1_500_000n`; sum of all ECR `ee_share` = payroll run `total_pf_paise`
    - _File: `tests/properties/compliance.property.test.ts`_

  - [ ] 11.3 Implement `src/modules/compliance/esic.service.ts`
    - `generateESICChallan(orgId, periodMonth, periodYear)` → challan data
    - Sum `esi_employee_paise + esi_employer_paise` across all payslips for period
    - Skip challan generation if total is zero
    - _Requirements: C.2_

  - [ ] 11.4 Implement `src/modules/compliance/form24q.service.ts` — TDS returns
    - `generateForm24Q(orgId, quarter, financialYear)` → FVU-compatible file
    - Build `DeducteeRecord[]` from payslips; sum TDS per deductee per quarter
    - Validate: sum of deductee TDS = sum of payslip `tds_paise` for quarter
    - Include challan details matching TDS Challan 281 amounts
    - _Requirements: C.3, C.4_

  - [ ]* 11.5 Write property test for compliance challan totals
    - **Property 15: Compliance Challan Totals**
    - **Validates: Requirements C.2, C.3**
    - ESIC challan total = sum of all payslip ESI amounts; TDS challan total = sum of all payslip TDS; no challan when total is zero
    - _File: `tests/properties/compliance.property.test.ts`_

  - [ ]* 11.6 Write property test for Form 24Q consistency
    - **Property 16: Form 24Q Consistency**
    - **Validates: Requirements C.4**
    - Sum of deductee TDS in FVU file = sum of payslip `tds_paise` for quarter; challan amounts match TDS Challan 281
    - _File: `tests/properties/compliance.property.test.ts`_

  - [ ] 11.7 Implement `src/modules/compliance/form16.service.ts`
    - `generateForm16(orgId, employeeId, financialYear)` → Form 16 Part A + Part B data
    - Part A: TDS deducted and deposited (from payslips + challans)
    - Part B: salary breakup, deductions, taxable income (from TDS computation steps)
    - _Requirements: C.4_

  - [ ] 11.8 Implement `src/modules/compliance/lwf.service.ts`
    - `computeLWFForState(stateCode, grossPaise, periodMonth)` → bigint
    - State-wise LWF rates; non-zero only in June and December
    - _Requirements: C.6_

  - [ ] 11.9 Implement `src/modules/compliance/gazette.service.ts`
    - `fetchGazetteNotifications()` → scrape/poll gazette source, store raw notifications
    - `classifyNotification(text)` → AI classification: LABOUR_LAW | TAX | PF | ESI | PT | LWF | OTHER
    - `getUnreviewedNotifications(orgId)` → list pending notifications for compliance officer review
    - _Requirements: C.7_

  - [ ] 11.10 Implement penalty calculator in `src/modules/compliance/compliance.service.ts`
    - `computePenalty(filingType, dueDate, filedAt)` → bigint paise
    - Zero when `filedAt <= dueDate`; statutory rate × days late otherwise; result always ≥ 0
    - _Requirements: C.9_

  - [ ]* 11.11 Write property test for late filing penalty calculation
    - **Property 18: Late Filing Penalty Calculation**
    - **Validates: Requirements C.9**
    - Penalty = 0 when filed on time; penalty = rate × days_late when late; always non-negative integer paise
    - _File: `tests/properties/compliance.property.test.ts`_

  - [ ] 11.12 Implement `src/modules/compliance/compliance.routes.ts`
    - `POST /api/v1/compliance/epfo/ecr` — generate ECR for a payroll run
    - `POST /api/v1/compliance/esic/challan` — generate ESIC challan
    - `POST /api/v1/compliance/tds/challan` — generate TDS Challan 281
    - `POST /api/v1/compliance/tds/form24q` — generate Form 24Q FVU file
    - `GET /api/v1/compliance/tds/form16/:employeeId` — get Form 16
    - `GET /api/v1/compliance/filings` — list filings with due dates and penalties
    - `GET /api/v1/compliance/gazette` — list gazette notifications
    - _Requirements: C.1–C.9_

  - [ ]* 11.13 Write unit tests for compliance engine
    - 50+ cases: ECR record validation, challan totals, Form 24Q FVU format, PT for all 28 states, LWF months
    - _File: `tests/unit/compliance.unit.test.ts`_

- [ ] 12. Checkpoint — Compliance Engine
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 13. Attendance & Leave Modules
  - [ ] 13.1 Implement `src/modules/attendance/attendance.service.ts`
    - `checkIn(orgId, employeeId, method, metadata)` — methods: BIOMETRIC, QR, GEOFENCE, MANUAL, FACE; write `attendance_records`
    - `checkOut(orgId, employeeId, metadata)` — update record with checkout time
    - `getAttendanceSummary(orgId, employeeId, month, year)` → `{ workingDays, presentDays, lopDays, overtimeHours }`
    - `bulkImport(orgId, records[])` — batch upsert for biometric device sync
    - _Requirements: ATT.1, ATT.2_

  - [ ] 13.2 Implement `src/modules/attendance/leave.service.ts`
    - `applyLeave(orgId, employeeId, data)` — validate balance, create `leave_requests` record
    - `approveLeave(orgId, requestId, approverId)` — deduct from `leave_balances`
    - `accrueLeave(orgId, month, year)` — monthly accrual job: add earned leaves per policy
    - `carryForward(orgId, year)` — year-end carry-forward with cap per policy
    - `computeSandwichLeave(leaveRequest)` — include weekends/holidays between leave days in LOP
    - _Requirements: ATT.3, ATT.4_

  - [ ] 13.3 Implement `src/modules/attendance/attendance.routes.ts`
    - `POST /api/v1/attendance/checkin` — employee check-in
    - `POST /api/v1/attendance/checkout` — employee check-out
    - `GET /api/v1/attendance/summary` — monthly summary
    - `POST /api/v1/attendance/regularize` — regularization request
    - `POST /api/v1/leaves/apply` — apply for leave
    - `GET /api/v1/leaves/balance` — leave balance
    - `POST /api/v1/leaves/:id/approve` — approve leave
    - _Requirements: ATT.1–ATT.4_

- [ ] 14. FNF Settlement Module
  - [ ] 14.1 Implement `src/modules/fnf/fnf.service.ts`
    - `computeGratuity(employeeId, exitDate)` — Payment of Gratuity Act 1972: 4 years + 240 days rule; `(basic + da) / 26 * 15 * years_of_service`
    - `computeLeaveEncashment(employeeId, exitDate)` — encash earned leave balance at basic/30 per day
    - `computeNoticePeriodDeduction(employeeId, exitDate, lastWorkingDay)` — deduct short notice days
    - `computeFNFTDS(employeeId, fnfAmount)` — TDS on FNF using TDS engine with FNF income
    - `createFNFSettlement(orgId, employeeId, data)` — create `fnf_settlements` record, write outbox for disbursement
    - _Requirements: FNF.1–FNF.4_

  - [ ] 14.2 Implement `src/modules/fnf/fnf.routes.ts`
    - `POST /api/v1/fnf/settlements` — initiate FNF (requires `Idempotency-Key`)
    - `GET /api/v1/fnf/settlements/:id` — get settlement details
    - `POST /api/v1/fnf/settlements/:id/approve` — finance manager approval
    - _Requirements: FNF.1–FNF.4_

  - [ ]* 14.3 Write unit tests for FNF calculations
    - Gratuity: 4y 240d boundary, less than 4 years (zero gratuity), exact 5 years
    - Leave encashment: various balances and basic salaries
    - _File: `tests/unit/fnf.unit.test.ts`_

- [ ] 15. Finance Module (EWA, Loans, Insurance)
  - [ ] 15.1 Implement `src/modules/finance/ewa.service.ts`
    - `requestEWA(orgId, employeeId, amountPaise, idempotencyKey)` — validate: amount ≤ 50% of earned wages; create `ewa_requests` record; write outbox
    - `scheduleEWARecovery(payrollRunId)` — deduct pending EWA from next payslip
    - _Requirements: FIN.1_

  - [ ] 15.2 Implement `src/modules/finance/loan.service.ts`
    - `createLoan(orgId, employeeId, data)` — create `loans` record with repayment schedule (EMI = principal / tenure)
    - `processLoanRepayment(payslipId)` — deduct current EMI from payslip, create `loan_repayments` record
    - `getLoanBalance(employeeId)` → outstanding principal paise
    - _Requirements: FIN.2_

  - [ ] 15.3 Implement `src/modules/finance/finance.routes.ts`
    - `POST /api/v1/finance/ewa/requests` — EWA request (requires `Idempotency-Key`)
    - `GET /api/v1/finance/ewa/requests` — list EWA requests
    - `POST /api/v1/finance/loans` — create loan
    - `GET /api/v1/finance/loans/:id` — loan details with repayment schedule
    - _Requirements: FIN.1, FIN.2_

- [ ] 16. Security Hardening & DPDP Act Compliance
  - [ ] 16.1 Implement DPDP Act 2023 consent management
    - Add `consent_records` table: `employee_id`, `purpose`, `granted_at`, `revoked_at`
    - `grantConsent(employeeId, purpose)` and `revokeConsent(employeeId, purpose)` in `src/shared/consent.ts`
    - `checkConsent(employeeId, purpose)` — throw `ForbiddenError` if consent not granted before accessing PII
    - _Requirements: SR.2_

  - [ ] 16.2 Implement data deletion rights
    - `requestDeletion(orgId, employeeId)` — anonymize PII fields (PAN, Aadhaar, phone, bank account) by overwriting with `[DELETED]` marker; preserve payroll records for 8-year audit requirement
    - Log deletion in `audit_logs`
    - _Requirements: SR.2_

  - [ ] 16.3 Implement RLS enforcement tests
    - Integration tests: create data for org A, attempt access with org B JWT, assert 0 records returned for all 15+ tables
    - Test `SET LOCAL` is called in every transaction path
    - _Requirements: SR.1, SR.8_

  - [ ]* 16.4 Write property test for audit log completeness
    - **Property 23: Audit Log Completeness**
    - **Validates: Requirements SR.7**
    - For any mutation on a business entity table, exactly one `audit_logs` record is created in the same transaction; audit records are never deleted or updated
    - _File: `tests/properties/security.property.test.ts`_

- [ ] 17. Background Jobs & Cron Workers
  - [ ] 17.1 Implement `src/workers/compliance.worker.ts`
    - Process `compliance:generate` queue jobs: generate ECR, ESIC challan, Form 24Q based on job payload
    - Update `compliance_filings` status on completion
    - _Requirements: C.1–C.4_

  - [ ] 17.2 Implement `src/workers/gazette.worker.ts`
    - Process `gazette:monitor` queue jobs (triggered by Monday 9am cron)
    - Call `gazette.service.ts` to fetch and classify notifications
    - Send alerts to compliance officers for HIGH-priority classifications
    - _Requirements: C.7_

  - [ ] 17.3 Implement `src/workers/notification.worker.ts`
    - Process `notification:send` queue jobs
    - Route to: AWS SES (email), Meta Cloud API (WhatsApp), or push notification based on `channel` field
    - _Requirements: NOTIF.1_

  - [ ] 17.4 Implement cron job scheduler in `src/workers/scheduler.ts`
    - Register all cron jobs using BullMQ `QueueScheduler`:
      - `outbox-poller`: every 30s → enqueue disbursement check
      - `gazette-monitor`: Monday 9am → enqueue gazette fetch
      - `compliance-reminder`: daily 10am → check due dates, send reminders
      - `pt-slab-refresh`: April 1st → reload PT slabs from DB
      - `token-cleanup`: daily 2am → delete expired refresh tokens
    - _Requirements: C.7, C.8, SR.5_

- [ ] 18. Observability & Telemetry
  - [ ] 18.1 Implement `src/plugins/telemetry.ts` — OpenTelemetry setup
    - `NodeSDK` with `PrometheusExporter` on port 9464
    - `HttpInstrumentation` and `PrismaInstrumentation`
    - _Requirements: NFR.2_

  - [ ] 18.2 Add custom metrics
    - `payroll_run_duration_seconds` histogram (labels: `org_id`, `employee_count`)
    - `tds_computation_duration_ms` histogram
    - `outbox_pending_count` gauge
    - `compliance_filing_overdue_count` gauge (label: `filing_type`)
    - `api_request_duration_ms` histogram (labels: `route`, `status_code`)
    - _Requirements: NFR.2_

- [ ] 19. Integration Tests
  - [ ] 19.1 Write payroll run integration tests
    - Full flow: create org → create employee → set salary structure → run payroll → approve → disburse
    - Assert payslip values match manual calculation for known inputs
    - Assert `payroll_events` contain all 6 stages
    - Assert outbox record created on approval
    - _File: `tests/integration/payroll.integration.test.ts`_
    - _Requirements: PP.1–PP.5_

  - [ ] 19.2 Write auth integration tests
    - Login → get access token → use token → refresh → logout
    - TOTP setup and verification flow
    - Expired token rejection; revoked token rejection
    - _File: `tests/integration/auth.integration.test.ts`_
    - _Requirements: SR.5, SR.6_

  - [ ] 19.3 Write compliance integration tests
    - Generate ECR for a payroll run; validate file format and totals
    - Generate Form 24Q; validate FVU structure and TDS sum
    - Penalty calculation for late filing
    - _File: `tests/integration/compliance.integration.test.ts`_
    - _Requirements: C.1–C.4, C.9_

  - [ ] 19.4 Write RLS cross-tenant isolation integration tests
    - Create employees for org A and org B; query each with the other's JWT; assert zero results
    - Attempt to read payslips across orgs; assert 404 or empty
    - _File: `tests/integration/rls.integration.test.ts`_
    - _Requirements: SR.1, SR.8_

- [ ] 20. Load Tests
  - [ ] 20.1 Write k6 load test for payroll processing
    - `tests/load/payroll.k6.js`: seed 1000 employees, trigger payroll run, poll until COMPLETED
    - Assert completion within 10 seconds; assert p95 API response < 60ms
    - _Requirements: TR.2 (performance), PP.1_

  - [ ] 20.2 Write k6 load test for concurrent org payroll
    - Simulate 50 organizations running payroll simultaneously
    - Assert no cross-tenant data leakage; assert all runs complete successfully
    - _Requirements: TR.2, SR.1_

- [ ] 21. Final Integration & Wiring
  - [ ] 21.1 Wire all modules into `src/app.ts`
    - Register all route plugins in correct order with `/api/v1/*` prefixes
    - Register telemetry plugin before all others
    - Verify all Fastify decorators (`prisma`, `redis`, `queues`) are available to all modules
    - _Requirements: TR.2_

  - [ ] 21.2 Implement graceful shutdown in `src/index.ts`
    - `SIGTERM`/`SIGINT` handlers: `app.close()` → `prisma.$disconnect()` → `redis.quit()` → drain all BullMQ workers
    - Log shutdown sequence with signal name
    - _Requirements: NFR.3_

  - [ ] 21.3 Verify health check endpoint
    - `GET /health` returns `{ status: 'ok', timestamp, db: 'ok', redis: 'ok' }`
    - Check DB connectivity via `prisma.$queryRaw\`SELECT 1\``
    - Check Redis connectivity via `redis.ping()`
    - _Requirements: NFR.2_

  - [ ] 21.4 Validate Docker build and compose
    - Confirm multi-stage `Dockerfile` builds without errors
    - Confirm `docker-compose.yml` starts all services (api, db, redis, minio) and health checks pass
    - _Requirements: NFR.3_

- [ ] 22. Final Checkpoint — All Systems Go
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP
- All monetary arithmetic uses `bigint` — never `number`, `float`, or `Decimal` for financial values
- Every financial mutation endpoint requires an `Idempotency-Key` header
- RLS context (`SET LOCAL app.current_org_id`) must be set in every database transaction
- Property tests use `fast-check` with `numRuns: 1000` for financial properties
- Each property test references its property number and the requirements clause it validates
- Checkpoints ensure incremental validation before proceeding to the next phase
