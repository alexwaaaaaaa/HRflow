# HRFlow Backend — Technical Design

## Overview

HRFlow Backend is a production-grade India HRMS SaaS backend targeting 100% statutory compliance, CA-level TDS accuracy, and FAANG-quality engineering. It processes ₹10,000 Cr+ monthly payroll with zero rounding errors (all amounts in paise), exactly-once disbursement guarantees, and complete audit trails.

### Design Goals

- **Correctness first**: Every rupee calculation is deterministic, reproducible, and auditable
- **Multi-tenant isolation**: PostgreSQL RLS enforces org-level data boundaries at the DB layer
- **Event-sourced payroll**: Every calculation step is stored for replay and audit
- **Outbox pattern**: Disbursement is decoupled from calculation to prevent double payments
- **DPDP Act 2023**: PII encrypted at rest, consent tracked, deletion rights supported
- **Performance**: p95 < 60ms APIs, 1000-employee payroll < 10s

### System Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                                │
│          Next.js Frontend  │  Mobile (future)  │  External APIs     │
└──────────────────────────────┬──────────────────────────────────────┘
                               │ HTTPS
┌──────────────────────────────▼──────────────────────────────────────┐
│                      API GATEWAY / NGINX                            │
│              Rate Limiting │ TLS Termination │ Load Balancing       │
└──────────────────────────────┬──────────────────────────────────────┘
                               │
┌──────────────────────────────▼──────────────────────────────────────┐
│                    FASTIFY 4.x APPLICATION                          │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ │
│  │   Auth   │ │ Employee │ │ Payroll  │ │   TDS    │ │Compliance│ │
│  │  Module  │ │  Module  │ │  Module  │ │  Engine  │ │  Engine  │ │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────────┘ │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ │
│  │Attendance│ │   FNF    │ │ Finance  │ │   File   │ │  Notif.  │ │
│  │  Module  │ │  Module  │ │  Module  │ │  Module  │ │  Module  │ │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────────┘ │
└──────────────────────────────┬──────────────────────────────────────┘
                               │
          ┌────────────────────┼────────────────────┐
          │                    │                    │
┌─────────▼──────┐   ┌─────────▼──────┐   ┌────────▼───────┐
│  PostgreSQL 16 │   │   Redis 7      │   │   AWS S3/MinIO │
│  Primary DB    │   │  Cache + Queue │   │  File Storage  │
│  + RLS         │   │  + BullMQ      │   │                │
└────────────────┘   └────────────────┘   └────────────────┘
          │
┌─────────▼──────────────────────────────────────────────────────────┐
│                      BULLMQ WORKERS                                 │
│  PayrollWorker │ TDSWorker │ ComplianceWorker │ NotificationWorker  │
│  DisbursementWorker │ GazetteWorker │ ReportWorker                  │
└────────────────────────────────────────────────────────────────────┘
```

## Architecture

### Module Dependency Graph

```
                    ┌─────────────┐
                    │    Auth     │
                    └──────┬──────┘
                           │ (all modules depend on auth)
          ┌────────────────┼────────────────┐
          │                │                │
   ┌──────▼──────┐  ┌──────▼──────┐  ┌─────▼───────┐
   │  Employee   │  │  Attendance │  │  Compliance │
   └──────┬──────┘  └──────┬──────┘  └─────┬───────┘
          │                │               │
          └────────┬────────┘               │
                   │                        │
            ┌──────▼──────┐                 │
            │   Payroll   │◄────────────────┘
            │   Engine    │
            └──────┬──────┘
                   │
          ┌────────┼────────┐
          │        │        │
   ┌──────▼──┐ ┌───▼────┐ ┌─▼──────────┐
   │   TDS   │ │  FNF   │ │ Disbursement│
   │ Engine  │ │ Module │ │  (Outbox)  │
   └─────────┘ └────────┘ └────────────┘
```

### Key Architectural Decisions

**1. Paise-only arithmetic**
All monetary values stored and computed as `BIGINT` paise. No `FLOAT` or `DECIMAL` in financial columns. Conversion to rupees happens only at the API response serialization layer.

**2. Multi-tenant RLS**
Every table has an `org_id UUID NOT NULL` column. PostgreSQL RLS policies enforce `org_id = current_setting('app.current_org_id')::uuid`. The application sets this via `SET LOCAL app.current_org_id = $1` inside every transaction.

**3. Event sourcing for payroll**
Each payroll run produces immutable `PayrollEvent` records. The final payslip is a projection of these events. This enables replay, audit, and Section 89 arrear calculations.

**4. Outbox pattern for disbursement**
Salary disbursement writes to an `outbox` table in the same transaction as payroll finalization. A separate worker polls the outbox and calls the bank API. This guarantees exactly-once semantics even if the worker crashes.

**5. Fastify plugin architecture**
Each module is a Fastify plugin registered with `fastify-plugin`. Plugins share the same Fastify instance (Prisma client, Redis, BullMQ queues) via decorators.

### Project Structure

```
src/
├── index.ts                    # Fastify server bootstrap
├── app.ts                      # App factory (testable)
├── config/
│   ├── env.ts                  # Zod-validated env schema
│   └── constants.ts            # Tax slabs, PF limits, etc.
├── plugins/
│   ├── prisma.ts               # Prisma client decorator
│   ├── redis.ts                # IORedis decorator
│   ├── bullmq.ts               # Queue decorators
│   ├── auth.ts                 # JWT verify hook
│   ├── rls.ts                  # RLS context setter
│   ├── rate-limit.ts           # Per-org/per-user limits
│   └── audit.ts                # Audit log hook
├── modules/
│   ├── auth/
│   │   ├── auth.routes.ts
│   │   ├── auth.service.ts
│   │   ├── auth.schema.ts
│   │   └── totp.service.ts
│   ├── employee/
│   │   ├── employee.routes.ts
│   │   ├── employee.service.ts
│   │   └── employee.schema.ts
│   ├── payroll/
│   │   ├── payroll.routes.ts
│   │   ├── payroll.service.ts
│   │   ├── payroll.worker.ts
│   │   ├── payroll.calculator.ts
│   │   └── payroll.schema.ts
│   ├── tds/
│   │   ├── tds.engine.ts       # Core TDS computation
│   │   ├── tds.routes.ts
│   │   ├── tds.service.ts
│   │   ├── hra.calculator.ts
│   │   ├── section89.ts
│   │   └── regime.comparator.ts
│   ├── compliance/
│   │   ├── epfo.service.ts     # ECR v2.0 generation
│   │   ├── esic.service.ts
│   │   ├── form24q.service.ts
│   │   ├── form16.service.ts
│   │   ├── pt.service.ts       # State-wise PT
│   │   ├── lwf.service.ts
│   │   └── gazette.service.ts
│   ├── attendance/
│   ├── fnf/
│   ├── finance/                # EWA, loans
│   └── notifications/
├── workers/
│   ├── payroll.worker.ts
│   ├── disbursement.worker.ts
│   ├── compliance.worker.ts
│   ├── gazette.worker.ts
│   └── notification.worker.ts
├── shared/
│   ├── errors.ts               # AppError hierarchy
│   ├── pagination.ts           # Cursor pagination
│   ├── idempotency.ts          # Idempotency key middleware
│   ├── encryption.ts           # AES-256-GCM helpers
│   └── audit.ts                # Audit log writer
└── types/
    ├── fastify.d.ts            # Fastify decorator types
    └── prisma.d.ts             # Extended Prisma types
```

## Components and Interfaces

### Auth Module

```typescript
// POST /api/v1/auth/login
interface LoginRequest {
  email: string;
  password: string;
  totp_code?: string;        // required if 2FA enabled
}
interface LoginResponse {
  access_token: string;      // JWT, 15min TTL
  refresh_token: string;     // opaque token, 30 days
  requires_totp: boolean;
}

// POST /api/v1/auth/refresh
interface RefreshRequest { refresh_token: string }
interface RefreshResponse { access_token: string }

// JWT Payload
interface JWTPayload {
  sub: string;               // user_id
  org_id: string;
  role: UserRole;
  iat: number;
  exp: number;
}
```

Refresh tokens are stored in `refresh_tokens` table (hashed with SHA-256). On rotation, old token is invalidated. Family-based refresh token rotation detects theft.

### Payroll Module

```typescript
// POST /api/v1/payroll/runs  (requires Idempotency-Key header)
interface CreatePayrollRunRequest {
  period_month: number;      // 1-12
  period_year: number;
  run_type: 'REGULAR' | 'OFF_CYCLE' | 'ARREAR';
  employee_ids?: string[];   // null = all active employees
}

// Payroll Run State Machine
type PayrollRunStatus =
  | 'DRAFT'        // created, not started
  | 'PROCESSING'   // BullMQ job running
  | 'PENDING_APPROVAL'  // awaiting finance manager
  | 'APPROVED'     // ready for disbursement
  | 'DISBURSING'   // outbox worker active
  | 'COMPLETED'    // all payments confirmed
  | 'FAILED'       // error, can retry
  | 'CANCELLED';
```

### TDS Engine Interface

```typescript
interface TDSComputationInput {
  employee_id: string;
  financial_year: string;    // e.g. "2025-26"
  regime: 'OLD' | 'NEW';
  gross_salary_paise: bigint;
  hra_received_paise: bigint;
  rent_paid_paise: bigint;
  city_type: 'METRO' | 'NON_METRO';
  declarations: TaxDeclaration[];
  previous_employer_income_paise?: bigint;  // Form 12B
  arrears_paise?: bigint;
}

interface TDSComputationResult {
  gross_income_paise: bigint;
  standard_deduction_paise: bigint;
  hra_exemption_paise: bigint;
  chapter_vi_a_paise: bigint;
  taxable_income_paise: bigint;
  tax_before_rebate_paise: bigint;
  rebate_87a_paise: bigint;
  marginal_relief_paise: bigint;
  surcharge_paise: bigint;
  health_education_cess_paise: bigint;
  total_tax_paise: bigint;
  monthly_tds_paise: bigint;
  regime_comparison: RegimeComparison;
  computation_steps: ComputationStep[];  // event sourcing
}
```

### Compliance Engine Interface

```typescript
interface EPFOECRRecord {
  uan: string;
  member_name: string;
  gross_wages_paise: bigint;
  epf_wages_paise: bigint;       // capped at ₹15,000
  eps_wages_paise: bigint;       // capped at ₹15,000
  edli_wages_paise: bigint;
  ee_share_paise: bigint;        // 12% of EPF wages
  er_epf_share_paise: bigint;    // 3.67% (12% - 8.33%)
  er_eps_share_paise: bigint;    // 8.33% capped at ₹1,250
  ncp_days: number;
  refund_of_advances_paise: bigint;
}

interface Form24QRecord {
  tan: string;
  quarter: 1 | 2 | 3 | 4;
  financial_year: string;
  deductee_records: DeducteeRecord[];
  challan_details: ChallanDetail[];
}
```

### API Layer Patterns

**Cursor Pagination** (all list endpoints):
```typescript
interface PaginatedRequest {
  cursor?: string;           // base64-encoded last item id + timestamp
  limit?: number;            // default 20, max 100
  fields?: string;           // partial response: "id,name,salary"
}
interface PaginatedResponse<T> {
  data: T[];
  next_cursor: string | null;
  has_more: boolean;
}
```

**Idempotency** (all financial mutation endpoints):
```
POST /api/v1/payroll/runs
Idempotency-Key: <uuid-v4>   // required header
```
The server stores `(org_id, idempotency_key, response_body, status_code)` in Redis with 24h TTL. Duplicate requests return the cached response.

**Partial Response** (field selection):
```
GET /api/v1/employees?fields=id,name,department,salary_paise
```
Implemented via Prisma `select` object built from the `fields` query param.

**Error Response Format**:
```typescript
interface ErrorResponse {
  error: {
    code: string;            // e.g. "PAYROLL_ALREADY_RUNNING"
    message: string;
    details?: unknown;
    request_id: string;
    timestamp: string;
  }
}
```

## Data Models

### Multi-Tenant Foundation

Every table follows this pattern:
```sql
-- RLS policy template (applied to every table)
ALTER TABLE <table> ENABLE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON <table>
  USING (org_id = current_setting('app.current_org_id')::uuid);
```

The application sets the RLS context at the start of every request:
```typescript
// src/plugins/rls.ts
fastify.addHook('onRequest', async (request) => {
  const orgId = request.user.org_id;
  await prisma.$executeRaw`SET LOCAL app.current_org_id = ${orgId}`;
});
```

### Core Schema

```sql
-- Organizations (tenants)
CREATE TABLE organizations (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name          TEXT NOT NULL,
  pan           TEXT,                    -- encrypted
  tan           TEXT,                    -- encrypted
  gstin         TEXT,
  epfo_code     TEXT,
  esic_code     TEXT,
  state_code    CHAR(2) NOT NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at    TIMESTAMPTZ
);

-- Users
CREATE TABLE users (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id        UUID NOT NULL REFERENCES organizations(id),
  email         TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  role          TEXT NOT NULL,           -- HR_ADMIN, EMPLOYEE, FINANCE_MANAGER, COMPLIANCE_OFFICER
  totp_secret   TEXT,                    -- encrypted, AES-256-GCM
  totp_enabled  BOOLEAN NOT NULL DEFAULT false,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at    TIMESTAMPTZ,
  UNIQUE(org_id, email)
);

-- Employees
CREATE TABLE employees (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id            UUID NOT NULL REFERENCES organizations(id),
  user_id           UUID REFERENCES users(id),
  employee_code     TEXT NOT NULL,
  first_name        TEXT NOT NULL,
  last_name         TEXT NOT NULL,
  date_of_birth     DATE NOT NULL,
  date_of_joining   DATE NOT NULL,
  date_of_exit      DATE,
  employment_type   TEXT NOT NULL,       -- REGULAR, CONTRACT, INTERN, PROBATION
  department_id     UUID,
  designation_id    UUID,
  -- PII (encrypted at rest, AES-256-GCM)
  pan_encrypted     TEXT,
  aadhaar_encrypted TEXT,
  phone_encrypted   TEXT,
  -- PF/ESI
  uan               TEXT,
  esic_ip_number    TEXT,
  pf_opted_out      BOOLEAN NOT NULL DEFAULT false,
  -- Payroll
  bank_account_encrypted TEXT,
  ifsc_code         TEXT,
  -- Tax
  tax_regime        TEXT NOT NULL DEFAULT 'NEW',  -- OLD, NEW
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  deleted_at        TIMESTAMPTZ,
  UNIQUE(org_id, employee_code)
);

-- Salary Components
CREATE TABLE salary_structures (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id        UUID NOT NULL,
  employee_id   UUID NOT NULL REFERENCES employees(id),
  effective_from DATE NOT NULL,
  effective_to   DATE,
  -- All amounts in PAISE (BIGINT)
  basic_paise         BIGINT NOT NULL,
  hra_paise           BIGINT NOT NULL,
  special_allowance_paise BIGINT NOT NULL DEFAULT 0,
  lta_paise           BIGINT NOT NULL DEFAULT 0,
  medical_paise       BIGINT NOT NULL DEFAULT 0,
  other_allowances_paise BIGINT NOT NULL DEFAULT 0,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Payroll Runs
CREATE TABLE payroll_runs (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id          UUID NOT NULL,
  idempotency_key TEXT NOT NULL,
  period_month    SMALLINT NOT NULL,     -- 1-12
  period_year     SMALLINT NOT NULL,
  run_type        TEXT NOT NULL,         -- REGULAR, OFF_CYCLE, ARREAR
  status          TEXT NOT NULL DEFAULT 'DRAFT',
  total_gross_paise    BIGINT,
  total_net_paise      BIGINT,
  total_tds_paise      BIGINT,
  total_pf_paise       BIGINT,
  employee_count  INTEGER,
  initiated_by    UUID NOT NULL REFERENCES users(id),
  approved_by     UUID REFERENCES users(id),
  approved_at     TIMESTAMPTZ,
  completed_at    TIMESTAMPTZ,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(org_id, idempotency_key),
  UNIQUE(org_id, period_month, period_year, run_type)
);

-- Payslips (one per employee per run)
CREATE TABLE payslips (
  id                  UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id              UUID NOT NULL,
  payroll_run_id      UUID NOT NULL REFERENCES payroll_runs(id),
  employee_id         UUID NOT NULL REFERENCES employees(id),
  period_month        SMALLINT NOT NULL,
  period_year         SMALLINT NOT NULL,
  -- Earnings (paise)
  gross_paise         BIGINT NOT NULL,
  basic_paise         BIGINT NOT NULL,
  hra_paise           BIGINT NOT NULL,
  special_allowance_paise BIGINT NOT NULL,
  -- Deductions (paise)
  pf_employee_paise   BIGINT NOT NULL,
  esi_employee_paise  BIGINT NOT NULL,
  pt_paise            BIGINT NOT NULL,
  lwf_paise           BIGINT NOT NULL,
  tds_paise           BIGINT NOT NULL,
  loan_recovery_paise BIGINT NOT NULL DEFAULT 0,
  ewa_recovery_paise  BIGINT NOT NULL DEFAULT 0,
  -- Net
  net_paise           BIGINT NOT NULL,
  -- Employer contributions
  pf_employer_paise   BIGINT NOT NULL,
  esi_employer_paise  BIGINT NOT NULL,
  -- Working days
  working_days        SMALLINT NOT NULL,
  paid_days           SMALLINT NOT NULL,
  lop_days            NUMERIC(4,1) NOT NULL DEFAULT 0,
  -- Status
  status              TEXT NOT NULL DEFAULT 'DRAFT',
  disbursed_at        TIMESTAMPTZ,
  utr_number          TEXT,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Payroll Events (event sourcing)
CREATE TABLE payroll_events (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id          UUID NOT NULL,
  payroll_run_id  UUID NOT NULL REFERENCES payroll_runs(id),
  payslip_id      UUID REFERENCES payslips(id),
  event_type      TEXT NOT NULL,         -- CALCULATION_STARTED, PF_COMPUTED, TDS_COMPUTED, etc.
  event_data      JSONB NOT NULL,        -- full computation inputs and outputs
  sequence_no     INTEGER NOT NULL,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_payroll_events_run ON payroll_events(payroll_run_id, sequence_no);

-- Outbox (disbursement)
CREATE TABLE outbox (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id          UUID NOT NULL,
  aggregate_type  TEXT NOT NULL,         -- PAYSLIP, FNF, EWA
  aggregate_id    UUID NOT NULL,
  event_type      TEXT NOT NULL,         -- DISBURSE_SALARY
  payload         JSONB NOT NULL,
  status          TEXT NOT NULL DEFAULT 'PENDING',  -- PENDING, PROCESSING, SENT, FAILED
  attempts        SMALLINT NOT NULL DEFAULT 0,
  last_error      TEXT,
  processed_at    TIMESTAMPTZ,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX idx_outbox_pending ON outbox(status, created_at) WHERE status = 'PENDING';

-- TDS Declarations
CREATE TABLE tax_declarations (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id          UUID NOT NULL,
  employee_id     UUID NOT NULL REFERENCES employees(id),
  financial_year  TEXT NOT NULL,         -- "2025-26"
  regime          TEXT NOT NULL,
  -- 80C components (paise)
  epf_paise       BIGINT NOT NULL DEFAULT 0,
  ppf_paise       BIGINT NOT NULL DEFAULT 0,
  elss_paise      BIGINT NOT NULL DEFAULT 0,
  lic_paise       BIGINT NOT NULL DEFAULT 0,
  home_loan_principal_paise BIGINT NOT NULL DEFAULT 0,
  -- 80D
  health_insurance_self_paise   BIGINT NOT NULL DEFAULT 0,
  health_insurance_parent_paise BIGINT NOT NULL DEFAULT 0,
  parent_senior_citizen         BOOLEAN NOT NULL DEFAULT false,
  -- HRA
  rent_paid_monthly_paise BIGINT NOT NULL DEFAULT 0,
  city_type               TEXT NOT NULL DEFAULT 'NON_METRO',
  -- NPS
  nps_80ccd1b_paise       BIGINT NOT NULL DEFAULT 0,
  -- Home loan interest 24b
  home_loan_interest_paise BIGINT NOT NULL DEFAULT 0,
  -- Status
  status          TEXT NOT NULL DEFAULT 'DRAFT',  -- DRAFT, SUBMITTED, VERIFIED
  submitted_at    TIMESTAMPTZ,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(org_id, employee_id, financial_year)
);

-- Audit Log (append-only)
CREATE TABLE audit_logs (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id          UUID NOT NULL,
  user_id         UUID,
  action          TEXT NOT NULL,         -- CREATE, UPDATE, DELETE, VIEW_PII
  resource_type   TEXT NOT NULL,
  resource_id     UUID,
  old_value       JSONB,
  new_value       JSONB,
  ip_address      INET,
  user_agent      TEXT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);
-- Audit log is append-only: no UPDATE or DELETE RLS policy
CREATE POLICY audit_insert_only ON audit_logs FOR INSERT WITH CHECK (true);
CREATE POLICY audit_select ON audit_logs FOR SELECT
  USING (org_id = current_setting('app.current_org_id')::uuid);

-- Professional Tax (state-wise slabs)
CREATE TABLE pt_slabs (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  state_code  CHAR(2) NOT NULL,
  effective_from DATE NOT NULL,
  slabs       JSONB NOT NULL,  -- [{min_paise, max_paise, monthly_pt_paise}]
  UNIQUE(state_code, effective_from)
);

-- Compliance Filings
CREATE TABLE compliance_filings (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  org_id          UUID NOT NULL,
  filing_type     TEXT NOT NULL,   -- EPFO_ECR, ESIC_CHALLAN, FORM_24Q, PT_RETURN, LWF
  period_month    SMALLINT,
  period_year     SMALLINT NOT NULL,
  quarter         SMALLINT,
  status          TEXT NOT NULL DEFAULT 'PENDING',
  due_date        DATE NOT NULL,
  filed_at        TIMESTAMPTZ,
  ack_number      TEXT,
  file_url        TEXT,            -- S3 key
  penalty_paise   BIGINT NOT NULL DEFAULT 0,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

### TDS Engine — Algorithm Design

The TDS engine implements Finance Act 2025-26 with full marginal relief on Section 87A.

```
TDS Computation Flow:
─────────────────────────────────────────────────────────────────────
INPUT: gross_salary, declarations, regime, city_type, rent_paid

STEP 1: Compute Gross Income
  gross = basic + hra + special_allowance + lta + other_allowances
  + previous_employer_income (Form 12B)

STEP 2: Standard Deduction
  new_regime: ₹75,000 (Finance Act 2025-26)
  old_regime: ₹50,000

STEP 3: HRA Exemption (old regime only)
  hra_exempt = MIN(
    hra_received,
    rent_paid - 10% of basic,
    40% of basic (non-metro) OR 50% of basic (metro)
  )

STEP 4: Chapter VI-A Deductions (old regime only)
  80C = MIN(epf + ppf + elss + lic + home_loan_principal, ₹1,50,000)
  80D = health_insurance_self (max ₹25,000)
       + health_insurance_parent (max ₹25,000 or ₹50,000 if senior)
  80CCD(1B) = MIN(nps_voluntary, ₹50,000)
  80CCD(2) = MIN(employer_nps, 10% of basic+DA) [BOTH regimes]
  24(b) = MIN(home_loan_interest, ₹2,00,000)

STEP 5: Taxable Income
  taxable = gross - standard_deduction - hra_exempt - chapter_vi_a

STEP 6: Tax Computation

  NEW REGIME (Finance Act 2025-26 slabs):
  ₹0 – ₹4,00,000:        0%
  ₹4,00,001 – ₹8,00,000: 5%
  ₹8,00,001 – ₹12,00,000: 10%
  ₹12,00,001 – ₹16,00,000: 15%
  ₹16,00,001 – ₹20,00,000: 20%
  ₹20,00,001 – ₹24,00,000: 25%
  Above ₹24,00,000:        30%

  OLD REGIME slabs:
  ₹0 – ₹2,50,000:         0%
  ₹2,50,001 – ₹5,00,000:  5%
  ₹5,00,001 – ₹10,00,000: 20%
  Above ₹10,00,000:        30%

STEP 7: Section 87A Rebate with Marginal Relief
  NEW REGIME:
    IF taxable_income <= ₹12,00,000:
      rebate = MIN(tax_before_rebate, ₹60,000)
      // Marginal relief: if taxable > ₹12,00,000 but tax > excess over ₹12L
      marginal_relief = MAX(0, tax_after_rebate - (taxable - 12_00_000))
    ELSE: rebate = 0

  OLD REGIME:
    IF taxable_income <= ₹5,00,000:
      rebate = MIN(tax_before_rebate, ₹12,500)
    ELSE: rebate = 0

STEP 8: Surcharge
  IF taxable > ₹50,00,000 AND <= ₹1,00,00,000: 10%
  IF taxable > ₹1,00,00,000 AND <= ₹2,00,00,000: 15%
  IF taxable > ₹2,00,00,000 AND <= ₹5,00,00,000: 25%
  IF taxable > ₹5,00,00,000: 37% (old) / 25% (new, capped)

STEP 9: Health & Education Cess
  cess = (tax_after_surcharge) * 4%

STEP 10: Section 89 Relief (arrears only)
  Compute tax in year of receipt vs year of accrual
  relief = tax_with_arrear - tax_without_arrear

STEP 11: Monthly TDS
  annual_tds = total_tax - section89_relief
  monthly_tds = CEIL(annual_tds / remaining_months)
  // remaining_months = 12 - (current_month - april_month)
─────────────────────────────────────────────────────────────────────
```

### Payroll Processing — Data Flow

```
HR clicks "Run Payroll"
        │
        ▼
POST /api/v1/payroll/runs
  [Idempotency check → Redis]
  [Create payroll_run record: status=DRAFT]
  [Enqueue BullMQ job: payroll:process]
        │
        ▼
PayrollWorker (BullMQ)
  ├── Fetch all active employees (batch of 50)
  ├── For each employee (parallel, Promise.all):
  │   ├── Fetch salary_structure (effective for period)
  │   ├── Fetch attendance (paid_days, lop_days)
  │   ├── Compute pro-rata if mid-month joiner
  │   ├── Compute PF:
  │   │   ├── epf_wages = MIN(basic, ₹15,000)
  │   │   ├── ee_pf = 12% of epf_wages
  │   │   ├── er_eps = MIN(8.33% of epf_wages, ₹1,250)
  │   │   └── er_epf = 12% - er_eps
  │   ├── Compute ESI:
  │   │   ├── IF gross <= ₹21,000: esi_ee = 0.75%, esi_er = 3.25%
  │   │   └── Mid-month promotion: if crossed ₹21,000 mid-month,
  │   │       continue ESI for rest of that contribution period
  │   ├── Compute PT (state-wise slab lookup)
  │   ├── Compute LWF (bi-annual: June + December)
  │   ├── Compute TDS (TDS Engine)
  │   ├── Apply loan/EWA recoveries
  │   ├── Compute net = gross - all_deductions
  │   ├── Write payslip record
  │   └── Write payroll_events (event sourcing)
  ├── Update payroll_run totals
  ├── Set status = PENDING_APPROVAL
  └── Emit notification to finance manager
        │
Finance Manager approves
        │
        ▼
POST /api/v1/payroll/runs/:id/approve
  [Write outbox records for each payslip]
  [Set payroll_run status = APPROVED]
        │
        ▼
DisbursementWorker (BullMQ)
  ├── Poll outbox WHERE status = 'PENDING'
  ├── For each outbox record:
  │   ├── Call bank API (Razorpay/NEFT)
  │   ├── On success: update outbox status=SENT, payslip.utr_number
  │   └── On failure: increment attempts, set status=FAILED (retry)
  └── Set payroll_run status = COMPLETED
```

### PF Calculation Detail

```typescript
function computePF(grossPaise: bigint, basicPaise: bigint): PFResult {
  const PF_WAGE_CEILING = 1500000n;  // ₹15,000 in paise
  const EPS_CAP_MONTHLY = 125000n;   // ₹1,250 in paise

  const epfWages = basicPaise < PF_WAGE_CEILING ? basicPaise : PF_WAGE_CEILING;
  const eeContribution = (epfWages * 12n) / 100n;
  const erEPS = epfWages * 833n / 10000n;  // 8.33%
  const erEPSCapped = erEPS < EPS_CAP_MONTHLY ? erEPS : EPS_CAP_MONTHLY;
  const erEPF = eeContribution - erEPSCapped;  // 3.67%
  const edli = epfWages;  // 0.5% paid by employer separately

  return { eeContribution, erEPF, erEPSCapped, edli, epfWages };
}
```

### Security Architecture

```
Request → Nginx (TLS 1.3) → Fastify
                                │
                    ┌───────────▼───────────┐
                    │   Rate Limit Plugin   │
                    │  1000/min per org     │
                    │  100/min per user     │
                    └───────────┬───────────┘
                                │
                    ┌───────────▼───────────┐
                    │    Auth Plugin        │
                    │  Verify JWT           │
                    │  Check token revoked  │
                    └───────────┬───────────┘
                                │
                    ┌───────────▼───────────┐
                    │    RLS Plugin         │
                    │  SET LOCAL org_id     │
                    │  (every transaction)  │
                    └───────────┬───────────┘
                                │
                    ┌───────────▼───────────┐
                    │    Route Handler      │
                    │  Zod schema validate  │
                    │  Business logic       │
                    └───────────┬───────────┘
                                │
                    ┌───────────▼───────────┐
                    │    Audit Plugin       │
                    │  Log all mutations    │
                    │  (onResponse hook)    │
                    └───────────────────────┘
```

**PII Encryption** (AES-256-GCM):
```typescript
// src/shared/encryption.ts
const ALGORITHM = 'aes-256-gcm';
const KEY = Buffer.from(process.env.ENCRYPTION_KEY!, 'hex'); // 32 bytes

export function encrypt(plaintext: string): string {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv(ALGORITHM, KEY, iv);
  const encrypted = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();
  // Format: iv(12) + tag(16) + ciphertext — base64 encoded
  return Buffer.concat([iv, tag, encrypted]).toString('base64');
}

export function decrypt(ciphertext: string): string {
  const buf = Buffer.from(ciphertext, 'base64');
  const iv = buf.subarray(0, 12);
  const tag = buf.subarray(12, 28);
  const encrypted = buf.subarray(28);
  const decipher = crypto.createDecipheriv(ALGORITHM, KEY, iv);
  decipher.setAuthTag(tag);
  return decipher.update(encrypted) + decipher.final('utf8');
}
```

### Background Jobs

```typescript
// Queue definitions
const QUEUES = {
  PAYROLL:       'payroll:process',
  DISBURSEMENT:  'payroll:disburse',
  COMPLIANCE:    'compliance:generate',
  GAZETTE:       'gazette:monitor',
  NOTIFICATION:  'notification:send',
  REPORT:        'report:generate',
} as const;

// Cron schedules
const CRON_JOBS = [
  { name: 'outbox-poller',      cron: '*/30 * * * * *' },  // every 30s
  { name: 'gazette-monitor',    cron: '0 9 * * 1' },        // Monday 9am
  { name: 'compliance-reminder',cron: '0 10 * * *' },       // daily 10am
  { name: 'pt-slab-refresh',    cron: '0 0 1 4 *' },        // April 1st
  { name: 'token-cleanup',      cron: '0 2 * * *' },        // daily 2am
];
```

**BullMQ Worker Configuration**:
```typescript
const payrollWorker = new Worker('payroll:process', processPayroll, {
  connection: redis,
  concurrency: 5,           // 5 orgs in parallel
  limiter: { max: 10, duration: 1000 },
});
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Paise-Only Arithmetic

*For any* set of salary component inputs (basic, HRA, allowances, deductions), every computed monetary value in the system — gross, net, TDS, PF, ESI, PT, LWF — must be an exact integer when expressed in paise. No fractional paise values should exist anywhere in the computation pipeline.

**Validates: Requirements PP.2**

---

### Property 2: Event Sourcing Completeness

*For any* completed payroll run, every payslip must have a corresponding sequence of `payroll_events` covering all computation stages: CALCULATION_STARTED, PF_COMPUTED, ESI_COMPUTED, PT_COMPUTED, TDS_COMPUTED, NET_COMPUTED. The events must be sufficient to fully reconstruct the payslip from scratch.

**Validates: Requirements PP.3**

---

### Property 3: Disbursement Idempotency

*For any* payslip, triggering the disbursement process multiple times with the same payslip ID must result in exactly one outbox record being processed and exactly one bank transfer. Subsequent disbursement attempts must be no-ops that return the original UTR number.

**Validates: Requirements PP.4**

---

### Property 4: Pro-Rata Calculation Correctness

*For any* employee joining on day D of a month with W total working days, their gross pay must equal `FLOOR(full_month_gross_paise * paid_days / working_days)`. The result must be an integer paise value, and `paid_days` must equal `W - D + 1` (inclusive of joining day).

**Validates: Requirements PP.6**

---

### Property 5: Statutory Deduction Ceilings

*For any* employee salary, the following ceiling invariants must hold simultaneously:
- PF employee contribution = 12% of `MIN(basic_paise, 1_500_000)` (₹15,000 ceiling)
- EPS employer contribution = `MIN(8.33% of epf_wages, 125_000)` (₹1,250/month ceiling)
- ESI employee contribution = 0.75% of gross only when `gross_paise <= 2_100_000` (₹21,000 ceiling); zero otherwise
- ESI employer contribution = 3.25% of gross only when `gross_paise <= 2_100_000`; zero otherwise

**Validates: Requirements PP.7, PP.8**

---

### Property 6: State-Wise PT Slab Lookup

*For any* (state_code, monthly_gross_paise) pair, the computed PT must exactly match the applicable slab from the `pt_slabs` table for that state and the current effective date. For states with no PT (e.g., Rajasthan, UP), the result must be zero.

**Validates: Requirements PP.9, C.5**

---

### Property 7: Section 87A Marginal Relief

*For any* taxable income under the new regime:
- If `taxable_income_paise <= 12_000_000` (₹12 lakh): `tax_after_rebate_paise = 0`
- If `taxable_income_paise > 12_000_000`: `tax_after_rebate_paise <= taxable_income_paise - 12_000_000`
  (effective tax must never exceed the excess income over ₹12 lakh — this is the marginal relief guarantee)

Under the old regime: if `taxable_income_paise <= 500_000`, `tax_after_rebate_paise = 0`.

**Validates: Requirements TDS.2, PP.10**

---

### Property 8: HRA Exemption Formula

*For any* (hra_received_paise, rent_paid_paise, basic_paise, city_type), the HRA exemption must equal:
```
MIN(
  hra_received_paise,
  rent_paid_paise - FLOOR(basic_paise * 10 / 100),
  IF city_type == 'METRO': FLOOR(basic_paise * 50 / 100)
  ELSE:                    FLOOR(basic_paise * 40 / 100)
)
```
The result must never be negative (floor at zero). HRA exemption must be zero in the new tax regime.

**Validates: Requirements TDS.3**

---

### Property 9: Chapter VI-A Deduction Caps

*For any* set of tax declarations:
- Total 80C deduction must equal `MIN(sum_of_80c_components_paise, 15_000_000)` (₹1.5 lakh cap)
- 80D self deduction must equal `MIN(health_insurance_self_paise, 2_500_000)` (₹25,000; or `5_000_000` if self is senior citizen)
- 80D parent deduction must equal `MIN(health_insurance_parent_paise, 2_500_000)` (₹25,000; or `5_000_000` if parents are senior citizens)
- All Chapter VI-A deductions must be zero in the new tax regime (except 80CCD(2))

**Validates: Requirements TDS.4, TDS.5**

---

### Property 10: NPS 80CCD(2) Both Regimes

*For any* employer NPS contribution, the 80CCD(2) deduction must be available in both old and new regimes, and must equal `MIN(employer_nps_paise, FLOOR((basic_paise + da_paise) * 10 / 100))`. This deduction must not be blocked by the new regime restriction on Chapter VI-A deductions.

**Validates: Requirements TDS.6**

---

### Property 11: Section 89 Arrear Relief

*For any* arrear payment, the Section 89 relief must equal:
```
relief = tax_on_(income_with_arrear_in_receipt_year)
       - tax_on_(income_without_arrear_in_receipt_year)
       - tax_on_(income_with_arrear_spread_to_accrual_years)
       + tax_on_(income_without_arrear_in_accrual_years)
```
The relief must never be negative (floor at zero). The net tax after Section 89 relief must be >= 0.

**Validates: Requirements TDS.7**

---

### Property 12: Form 12B Mid-Year Income Aggregation

*For any* mid-year joiner with previous employer income declared via Form 12B, the TDS computation must use `total_annual_income = current_employer_projected_income + previous_employer_income`. The monthly TDS must be computed on this aggregated annual income divided by remaining months in the financial year.

**Validates: Requirements TDS.8**

---

### Property 13: Regime Comparison Correctness

*For any* employee's tax declaration, the regime comparison must correctly identify the lower-tax regime. Formally: `recommended_regime == (old_regime_tax <= new_regime_tax ? 'OLD' : 'NEW')`. The `savings_paise` field must equal `ABS(old_regime_tax - new_regime_tax)`.

**Validates: Requirements TDS.9**

---

### Property 14: EPFO ECR Contribution Consistency

*For any* payroll run, every employee's ECR record must satisfy:
- `ee_share_paise + er_epf_share_paise + er_eps_share_paise == total_pf_contribution_paise`
- `er_eps_share_paise <= 125_000` (₹1,250 cap)
- `epf_wages_paise <= 1_500_000` (₹15,000 cap)
- Sum of all ECR `ee_share_paise` values must equal the payroll run's `total_pf_paise`

**Validates: Requirements C.1**

---

### Property 15: Compliance Challan Totals

*For any* payroll run, the generated compliance challans must satisfy:
- ESIC challan total = sum of all payslip `esi_employee_paise + esi_employer_paise`
- TDS Challan 281 total = sum of all payslip `tds_paise`
- No challan should be generated for a period where the total is zero

**Validates: Requirements C.2, C.3**

---

### Property 16: Form 24Q Consistency

*For any* quarter's Form 24Q, the sum of all deductee TDS amounts in the FVU file must equal the sum of all payslip `tds_paise` values for that quarter. The challan amounts in Form 24Q must match the TDS Challan 281 amounts for the same period.

**Validates: Requirements C.4**

---

### Property 17: LWF Bi-Annual Deduction

*For any* payslip, `lwf_paise > 0` if and only if `period_month IN (6, 12)` (June or December) and the employee's state has LWF. For all other months, `lwf_paise = 0`.

**Validates: Requirements C.6**

---

### Property 18: Late Filing Penalty Calculation

*For any* compliance filing with `due_date` and `filed_at`, the computed penalty must equal the applicable statutory rate multiplied by the number of days late. The penalty must be zero when `filed_at <= due_date`. The penalty must be a non-negative integer paise value.

**Validates: Requirements C.9**

---

### Property 19: RLS Tenant Isolation

*For any* database query executed with `app.current_org_id = X`, no records with `org_id != X` must be returned, regardless of the query structure. This must hold for all tables with RLS enabled. Specifically: creating employee records for org A and querying with org B's context must return zero results.

**Validates: Requirements S.1, S.8**

---

### Property 20: PII Encryption Round-Trip

*For any* plaintext PII value (PAN, Aadhaar, phone number), `decrypt(encrypt(value)) == value`. The encrypted form stored in the database must not equal the plaintext. Two encryptions of the same value must produce different ciphertexts (due to random IV). The decrypted value must exactly equal the original.

**Validates: Requirements S.2**

---

### Property 21: JWT Expiry Invariants

*For any* issued access token, `exp - iat == 900` (exactly 15 minutes = 900 seconds). *For any* issued refresh token record, `expires_at - created_at == 30 days`. Tokens must be rejected after their expiry time regardless of other validity checks.

**Validates: Requirements S.5**

---

### Property 22: TOTP Validation

*For any* TOTP secret and current time T, a code generated at time T must be accepted. A code generated at time T-60s (one step back) must be accepted (clock skew tolerance). A code generated at time T-120s or earlier must be rejected. A randomly generated 6-digit code must be rejected with probability >= 0.9999.

**Validates: Requirements S.6**

---

### Property 23: Audit Log Completeness

*For any* mutation operation (INSERT, UPDATE, DELETE) on a business entity table, exactly one `audit_logs` record must be created in the same transaction. The audit record must contain the `resource_type`, `resource_id`, `user_id`, `org_id`, and either `old_value` or `new_value` (or both for updates). Audit log records must never be deleted or updated.

**Validates: Requirements S.7**

---

### Property 24: Financial API Idempotency

*For any* financial API endpoint called with the same `Idempotency-Key` header twice within 24 hours, the second call must return the identical HTTP status code and response body as the first call, and must not create any additional database records or trigger any additional side effects.

**Validates: Requirements S.10**

## Error Handling

### Error Hierarchy

```typescript
// src/shared/errors.ts
export class AppError extends Error {
  constructor(
    public readonly code: string,
    public readonly message: string,
    public readonly statusCode: number,
    public readonly details?: unknown
  ) { super(message); }
}

export class ValidationError extends AppError {
  constructor(details: unknown) {
    super('VALIDATION_ERROR', 'Request validation failed', 400, details);
  }
}

export class AuthError extends AppError {
  constructor(code = 'UNAUTHORIZED') {
    super(code, 'Authentication required', 401);
  }
}

export class ForbiddenError extends AppError {
  constructor(code = 'FORBIDDEN') {
    super(code, 'Access denied', 403);
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string) {
    super('NOT_FOUND', `${resource} not found`, 404);
  }
}

export class ConflictError extends AppError {
  constructor(code: string, message: string) {
    super(code, message, 409);
  }
}

export class PayrollError extends AppError {
  constructor(code: string, message: string, details?: unknown) {
    super(code, message, 422, details);
  }
}
```

### Domain-Specific Error Codes

| Code | HTTP | Description |
|------|------|-------------|
| `PAYROLL_ALREADY_RUNNING` | 409 | Payroll run in progress for this period |
| `PAYROLL_ALREADY_APPROVED` | 409 | Cannot modify approved payroll |
| `DUPLICATE_IDEMPOTENCY_KEY` | 200 | Returns cached response |
| `EMPLOYEE_NOT_FOUND` | 404 | Employee does not exist in org |
| `SALARY_STRUCTURE_MISSING` | 422 | No salary structure for period |
| `TDS_COMPUTATION_FAILED` | 422 | TDS engine error with details |
| `INVALID_TAX_REGIME` | 400 | Unknown regime value |
| `PF_OPT_OUT_INVALID` | 422 | Cannot opt out if salary < ₹15,000 |
| `ESI_CEILING_EXCEEDED` | 200 | Informational: employee above ESI ceiling |
| `OUTBOX_PROCESSING_FAILED` | 500 | Bank API failure, will retry |
| `RLS_CONTEXT_MISSING` | 500 | Internal: org_id not set in transaction |
| `ENCRYPTION_KEY_MISSING` | 500 | Internal: encryption key not configured |

### Fastify Error Handler

```typescript
fastify.setErrorHandler((error, request, reply) => {
  if (error instanceof AppError) {
    return reply.status(error.statusCode).send({
      error: {
        code: error.code,
        message: error.message,
        details: error.details,
        request_id: request.id,
        timestamp: new Date().toISOString(),
      }
    });
  }
  // Prisma unique constraint violation
  if (error.code === 'P2002') {
    return reply.status(409).send({ error: { code: 'DUPLICATE_RECORD', ... } });
  }
  // Zod validation errors from fastify-type-provider-zod
  if (error.validation) {
    return reply.status(400).send({ error: { code: 'VALIDATION_ERROR', ... } });
  }
  // Unexpected errors
  fastify.log.error(error);
  return reply.status(500).send({ error: { code: 'INTERNAL_ERROR', ... } });
});
```

### BullMQ Worker Error Handling

```typescript
payrollWorker.on('failed', (job, error) => {
  fastify.log.error({ jobId: job?.id, error }, 'Payroll job failed');
  // Update payroll_run status to FAILED
  // Send alert to HR admin
});

// Retry configuration
const payrollQueue = new Queue('payroll:process', {
  defaultJobOptions: {
    attempts: 3,
    backoff: { type: 'exponential', delay: 5000 },
    removeOnComplete: { count: 100 },
    removeOnFail: { count: 500 },
  }
});
```

## Testing Strategy

### Dual Testing Approach

Both unit tests and property-based tests are required. They are complementary:
- Unit tests catch specific bugs with known inputs/outputs
- Property tests verify universal correctness across thousands of generated inputs

### Property-Based Testing

**Library**: `fast-check` (TypeScript-native, excellent arbitrary generators)

**Configuration**: Minimum 100 runs per property (default), 1000 runs for financial properties.

**Tag format**: `// Feature: hrflow-backend, Property N: <property_text>`

Each correctness property from the design document maps to exactly one property-based test:

```typescript
// tests/properties/tds.property.test.ts
import fc from 'fast-check';
import { describe, it } from 'vitest';
import { computeTDS } from '../../src/modules/tds/tds.engine';

describe('TDS Engine Properties', () => {

  // Feature: hrflow-backend, Property 7: Section 87A marginal relief
  it('Property 7: marginal relief — tax never exceeds excess over ₹12L (new regime)', () => {
    fc.assert(fc.property(
      fc.bigInt({ min: 12_000_001n * 100n, max: 15_000_000n * 100n }),  // paise
      (taxableIncomePaise) => {
        const result = computeTDS({ taxableIncomePaise, regime: 'NEW' });
        const excessOverThreshold = taxableIncomePaise - 1_200_000_000n; // ₹12L in paise
        return result.taxAfterRebatePaise <= excessOverThreshold;
      }
    ), { numRuns: 1000 });
  });

  // Feature: hrflow-backend, Property 1: paise-only arithmetic
  it('Property 1: all computed values are integer paise', () => {
    fc.assert(fc.property(
      arbitrarySalaryStructure(),
      (salary) => {
        const result = computeTDS(salary);
        // All bigint values — no fractional check needed by type system
        // But verify no intermediate float leakage
        return typeof result.totalTaxPaise === 'bigint'
          && typeof result.monthlyTdsPaise === 'bigint';
      }
    ), { numRuns: 1000 });
  });

  // Feature: hrflow-backend, Property 8: HRA exemption formula
  it('Property 8: HRA exemption = MIN(hra, rent-10%basic, 40/50% basic)', () => {
    fc.assert(fc.property(
      fc.record({
        hraReceivedPaise: fc.bigInt({ min: 0n, max: 500_000_000n }),
        rentPaidPaise:    fc.bigInt({ min: 0n, max: 500_000_000n }),
        basicPaise:       fc.bigInt({ min: 100_000n, max: 500_000_000n }),
        cityType:         fc.constantFrom('METRO', 'NON_METRO'),
      }),
      ({ hraReceivedPaise, rentPaidPaise, basicPaise, cityType }) => {
        const exemption = computeHRAExemption({ hraReceivedPaise, rentPaidPaise, basicPaise, cityType });
        const cap = cityType === 'METRO'
          ? (basicPaise * 50n) / 100n
          : (basicPaise * 40n) / 100n;
        const rentExcess = rentPaidPaise - (basicPaise * 10n) / 100n;
        const expected = [hraReceivedPaise, rentExcess < 0n ? 0n : rentExcess, cap]
          .reduce((a, b) => a < b ? a : b);
        return exemption === (expected < 0n ? 0n : expected);
      }
    ), { numRuns: 1000 });
  });
});
```

```typescript
// tests/properties/payroll.property.test.ts

// Feature: hrflow-backend, Property 5: statutory deduction ceilings
it('Property 5: PF and ESI respect statutory ceilings', () => {
  fc.assert(fc.property(
    fc.record({
      basicPaise: fc.bigInt({ min: 0n, max: 10_000_000_000n }),
      grossPaise: fc.bigInt({ min: 0n, max: 10_000_000_000n }),
    }),
    ({ basicPaise, grossPaise }) => {
      const pf = computePF(basicPaise);
      const esi = computeESI(grossPaise);
      return pf.eeContribution <= (1_500_000n * 12n) / 100n  // max PF
        && pf.erEPSCapped <= 125_000n                         // EPS cap
        && (grossPaise > 2_100_000n ? esi.eeContribution === 0n : true);
    }
  ), { numRuns: 1000 });
});

// Feature: hrflow-backend, Property 4: pro-rata calculation
it('Property 4: pro-rata gross = full_gross * paid_days / working_days', () => {
  fc.assert(fc.property(
    fc.record({
      fullMonthGrossPaise: fc.bigInt({ min: 100_000n, max: 10_000_000_000n }),
      workingDays:         fc.integer({ min: 1, max: 31 }),
      paidDays:            fc.integer({ min: 1, max: 31 }),
    }).filter(({ paidDays, workingDays }) => paidDays <= workingDays),
    ({ fullMonthGrossPaise, workingDays, paidDays }) => {
      const proRata = computeProRata(fullMonthGrossPaise, BigInt(paidDays), BigInt(workingDays));
      const expected = (fullMonthGrossPaise * BigInt(paidDays)) / BigInt(workingDays);
      return proRata === expected;
    }
  ), { numRuns: 1000 });
});
```

```typescript
// tests/properties/security.property.test.ts

// Feature: hrflow-backend, Property 20: PII encryption round-trip
it('Property 20: encrypt then decrypt returns original value', () => {
  fc.assert(fc.property(
    fc.string({ minLength: 1, maxLength: 200 }),
    (plaintext) => {
      const encrypted = encrypt(plaintext);
      const decrypted = decrypt(encrypted);
      return decrypted === plaintext && encrypted !== plaintext;
    }
  ), { numRuns: 1000 });
});

// Feature: hrflow-backend, Property 24: financial API idempotency
it('Property 24: same idempotency key returns same response', async () => {
  fc.assert(fc.asyncProperty(
    fc.uuid(),
    async (idempotencyKey) => {
      const response1 = await callPayrollAPI(idempotencyKey);
      const response2 = await callPayrollAPI(idempotencyKey);
      return response1.status === response2.status
        && response1.body.id === response2.body.id;
    }
  ), { numRuns: 50 });  // fewer runs for async integration tests
});
```

### Unit Testing

**Library**: Vitest + Supertest

Focus areas:
- Specific TDS computation examples (known inputs → known outputs from IT department)
- Edge cases: zero salary, maximum salary, exact threshold values
- Error conditions: missing salary structure, invalid regime, negative values
- Integration points: Fastify route → service → Prisma

```typescript
// tests/unit/tds.unit.test.ts
describe('TDS Engine — Known Examples', () => {
  it('₹12,00,000 taxable income (new regime) → zero tax after 87A', () => {
    const result = computeTDS({ taxableIncomePaise: 1_200_000_000n, regime: 'NEW' });
    expect(result.taxAfterRebatePaise).toBe(0n);
  });

  it('₹12,00,001 taxable income (new regime) → tax = ₹1 (marginal relief)', () => {
    const result = computeTDS({ taxableIncomePaise: 1_200_000_100n, regime: 'NEW' });
    expect(result.taxAfterRebatePaise).toBe(100n);  // ₹1 in paise
  });

  it('₹15,000 basic → PF on full ₹15,000', () => {
    const pf = computePF(1_500_000n);
    expect(pf.eeContribution).toBe(180_000n);  // 12% of ₹15,000
  });

  it('₹15,001 basic → PF still on ₹15,000 ceiling', () => {
    const pf = computePF(1_500_100n);
    expect(pf.eeContribution).toBe(180_000n);  // ceiling applies
  });
});
```

### Integration Testing

```typescript
// tests/integration/payroll.integration.test.ts
describe('Payroll Run Integration', () => {
  it('creates payroll run and enqueues BullMQ job', async () => {
    const response = await supertest(app)
      .post('/api/v1/payroll/runs')
      .set('Authorization', `Bearer ${hrAdminToken}`)
      .set('Idempotency-Key', randomUUID())
      .send({ period_month: 6, period_year: 2025, run_type: 'REGULAR' });

    expect(response.status).toBe(202);
    expect(response.body.data.status).toBe('PROCESSING');
  });
});
```

### Load Testing (k6)

```javascript
// tests/load/payroll.k6.js
import http from 'k6/http';
import { check } from 'k6';

export const options = {
  scenarios: {
    payroll_1000_employees: {
      executor: 'per-vu-iterations',
      vus: 1,
      iterations: 1,
      maxDuration: '10s',  // must complete in < 10s
    },
  },
  thresholds: {
    http_req_duration: ['p(95)<60'],  // p95 < 60ms for API calls
  },
};

export default function () {
  const res = http.post(`${BASE_URL}/api/v1/payroll/runs`, JSON.stringify({
    period_month: 6, period_year: 2025, run_type: 'REGULAR'
  }), { headers: { 'Idempotency-Key': uuidv4() } });

  check(res, { 'payroll run accepted': (r) => r.status === 202 });
  // Poll until completed
  // Assert completion within 10s
}
```

### Test Coverage Targets

| Module | Unit Tests | Property Tests | Integration Tests |
|--------|-----------|----------------|-------------------|
| TDS Engine | 200+ cases | 8 properties | 10 scenarios |
| Payroll Calculator | 100+ cases | 6 properties | 15 scenarios |
| Compliance Engine | 50+ cases | 5 properties | 10 scenarios |
| Auth Module | 30+ cases | 3 properties | 10 scenarios |
| Security (RLS, encryption) | 20+ cases | 3 properties | 5 scenarios |

## Final Integration

### Fastify Application Bootstrap

```typescript
// src/app.ts
import Fastify from 'fastify';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';

export async function buildApp() {
  const app = Fastify({
    logger: { level: process.env.LOG_LEVEL ?? 'info' },
    requestIdHeader: 'x-request-id',
    genReqId: () => randomUUID(),
  }).withTypeProvider<TypeBoxTypeProvider>();

  // Core plugins (order matters)
  await app.register(import('./plugins/prisma'));
  await app.register(import('./plugins/redis'));
  await app.register(import('./plugins/bullmq'));
  await app.register(import('./plugins/rate-limit'));
  await app.register(import('./plugins/auth'));
  await app.register(import('./plugins/rls'));
  await app.register(import('./plugins/audit'));

  // Module routes
  await app.register(import('./modules/auth/auth.routes'), { prefix: '/api/v1/auth' });
  await app.register(import('./modules/employee/employee.routes'), { prefix: '/api/v1/employees' });
  await app.register(import('./modules/payroll/payroll.routes'), { prefix: '/api/v1/payroll' });
  await app.register(import('./modules/tds/tds.routes'), { prefix: '/api/v1/tds' });
  await app.register(import('./modules/compliance/compliance.routes'), { prefix: '/api/v1/compliance' });
  await app.register(import('./modules/attendance/attendance.routes'), { prefix: '/api/v1/attendance' });
  await app.register(import('./modules/fnf/fnf.routes'), { prefix: '/api/v1/fnf' });

  // Health check
  app.get('/health', async () => ({ status: 'ok', timestamp: new Date().toISOString() }));

  return app;
}
```

### Graceful Shutdown

```typescript
// src/index.ts
const app = await buildApp();
await app.listen({ port: Number(env.PORT), host: '0.0.0.0' });

const shutdown = async (signal: string) => {
  app.log.info({ signal }, 'Shutting down gracefully');
  await app.close();                    // stops accepting new requests
  await prisma.$disconnect();           // close DB connections
  await redis.quit();                   // close Redis connections
  await Promise.all(workers.map(w => w.close()));  // drain BullMQ workers
  process.exit(0);
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT',  () => shutdown('SIGINT'));
```

### Docker Configuration

```dockerfile
# Dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npx prisma generate
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
EXPOSE 8080
CMD ["node", "dist/index.js"]
```

```yaml
# docker-compose.yml (development)
services:
  api:
    build: .
    ports: ["8080:8080"]
    environment:
      DATABASE_URL: postgresql://postgres:postgres@db:5432/hrflow_db
      REDIS_HOST: redis
    depends_on: [db, redis, minio]

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: hrflow_db
      POSTGRES_PASSWORD: postgres
    volumes: [pgdata:/var/lib/postgresql/data]

  redis:
    image: redis:7-alpine
    command: redis-server --appendonly yes

  minio:
    image: minio/minio
    command: server /data --console-address ":9001"
    environment:
      MINIO_ROOT_USER: minioadmin
      MINIO_ROOT_PASSWORD: minioadmin

volumes:
  pgdata:
```

### OpenTelemetry & Observability

```typescript
// src/plugins/telemetry.ts
import { NodeSDK } from '@opentelemetry/sdk-node';
import { PrometheusExporter } from '@opentelemetry/exporter-prometheus';

const sdk = new NodeSDK({
  metricReader: new PrometheusExporter({ port: 9464 }),
  instrumentations: [
    new HttpInstrumentation(),
    new PrismaInstrumentation(),
  ],
});
sdk.start();
```

Key metrics to track:
- `payroll_run_duration_seconds` — histogram, labeled by org_id and employee_count
- `tds_computation_duration_ms` — histogram
- `outbox_pending_count` — gauge
- `compliance_filing_overdue_count` — gauge, labeled by filing_type
- `api_request_duration_ms` — histogram, labeled by route and status_code
