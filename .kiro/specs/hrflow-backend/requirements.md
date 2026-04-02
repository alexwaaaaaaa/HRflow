# HRFlow Backend - Requirements Document

## Overview
HRFlow is India's most technically superior HRMS SaaS, targeting a 10/10 score against competitors like Darwinbox (8.5/10), Keka (7/10), GreytHR (6/10), and Rippling (9.5/10). The system must process ₹10,000 Cr+ monthly payroll with 100% accuracy, zero data loss, and complete Indian statutory compliance.

## Core Philosophy
- **Every rupee must be 100% correct**: A ₹1 TDS error = legal liability
- **Every payroll run must be idempotent**: Double salary = company disaster
- **Every compliance filing must be audit-ready**: Inspector visit = pass always
- **Performance**: p95 < 60ms APIs, payroll 1000 employees < 10s
- **Security**: Zero trust, Row Level Security (RLS), DPDP Act 2023 compliant

## Business Requirements

### 1. Multi-Tenant Architecture
- Support multiple organizations with complete data isolation
- Row Level Security (RLS) at database level for all tables
- Each organization has independent configuration, compliance settings, and data

### 2. Employee Management
- Complete employee lifecycle management from onboarding to exit
- Support for regular, contract, intern, and probation employment types
- Employee profiles with personal, employment, and payroll information
- Document management with secure storage

### 3. Payroll Processing
- Process payroll for 1000+ employees in under 10 seconds
- Support for regular, off-cycle, and arrear payroll runs
- Accurate calculation of PF, ESI, PT, LWF, TDS, and other deductions
- Event sourcing for complete audit trail of every calculation
- Outbox pattern for disbursement to prevent double payments

### 4. TDS Computation (CA-Level Accuracy)
- 100% compliance with Income Tax Act 1961 as amended by Finance Act 2025-26
- Support for both old and new tax regimes
- Section 87A rebate with marginal relief (competitors get this wrong)
- HRA exemption calculation with metro/non-metro differentiation
- Section 80C, 80D, 80CCD, and other deductions
- Section 89 relief for arrears
- Form 12B support for mid-year joiners

### 5. Statutory Compliance
- EPFO ECR v2.0 file generation and submission
- ESIC challan generation and returns
- TDS Challan 281 and Form 24Q/26Q generation
- Professional Tax calculation for all 28 Indian states
- Labour Welfare Fund (LWF) calculation
- Gazette monitoring for legal changes
- Penalty calculation for late filings

### 6. Attendance & Leave Management
- Multiple check-in methods: biometric, QR, geofence, manual, face recognition
- Real-time attendance tracking
- Leave management with accrual, carry-forward, and sandwich leave calculation
- Integration with payroll for LOP (Loss of Pay) calculations

### 7. FNF (Full & Final) Settlement
- Automated gratuity calculation per Payment of Gratuity Act 1972
- Leave encashment calculation
- Notice period deduction logic
- TDS on FNF payments
- Experience and relieving letter generation

### 8. Embedded Finance
- Earned Wage Access (EWA) with recovery scheduling
- Loan management with repayment schedules
- Insurance policy management and claims processing

### 9. AI & Analytics
- Anomaly detection in payroll and attendance
- Attrition risk prediction
- Career path recommendations
- HR copilot for natural language queries
- Document intelligence with OCR

### 10. Notifications
- Email via AWS SES/Nodemailer
- WhatsApp via Meta Cloud API/Gupshup
- Push notifications
- Compliance due date reminders

## Technical Requirements

### 1. Tech Stack (Non-Negotiable)
- **Runtime**: Node.js 20 LTS + TypeScript 5.x (strict mode)
- **Framework**: Fastify 4.x (3x faster than Express)
- **Database**: PostgreSQL 16 (primary) + Redis 7 (cache/queue)
- **ORM**: Prisma 5.x with strict typing
- **Queue**: BullMQ (Redis-backed job queues)
- **Search**: PostgreSQL full-text search (no Elasticsearch for v1)
- **Auth**: JWT (access 15min) + Refresh tokens (30 days) + TOTP 2FA
- **File Storage**: AWS S3 compatible (MinIO for local dev)
- **Testing**: Vitest + Supertest + k6 for load testing

### 2. Performance Requirements
- API response time: p95 < 60ms
- Payroll processing: 1000 employees < 10 seconds
- Database queries: All N+1 queries eliminated
- Concurrent users: Support 50+ organizations running payroll simultaneously

### 3. Security Requirements
- **DPDP Act 2023 Compliance**: 
  - PII encryption (PAN, Aadhaar, phone numbers)
  - Consent management
  - Data deletion rights
  - Breach notification within 72 hours
- **Row Level Security**: Every table has org_id with RLS policies
- **Encryption**: AES-256-GCM for sensitive data at rest
- **Rate Limiting**: 1000 req/min per org, 100 req/min per user
- **Audit Logging**: Append-only audit trail for all mutations

### 4. Data Integrity Requirements
- **All amounts in PAISE**: ₹1 = 100, no floating point errors
- **Event Sourcing**: Every payroll calculation step stored for replay
- **Outbox Pattern**: Guaranteed exactly-once disbursement
- **Idempotency**: All financial APIs require Idempotency-Key header
- **Soft Delete**: Never hard delete payroll data, only mark deleted_at

### 5. Compliance Accuracy Requirements
- **TDS**: 100% accurate per Finance Act 2025-26
- **PF**: Correct EPS/EDLI split with ₹1,250/month EPS cap
- **ESI**: ₹21,000 ceiling with mid-month promotion logic
- **PT**: State-wise accurate calculation for all 28 states
- **Gratuity**: 4 years + 240 days rule per Payment of Gratuity Act

## User Stories

### As an HR Administrator, I want to:
1. Onboard new employees with complete profile information
2. Run monthly payroll for all employees with one click
3. Review and approve payroll anomalies before disbursement
4. Generate and submit statutory compliance filings
5. Manage employee leaves and attendance regularization
6. Process FNF settlements for exiting employees
7. Configure organization-specific payroll policies
8. View compliance health score and due dates
9. Access employee payslips and Form 16
10. Monitor real-time attendance of employees

### As an Employee, I want to:
1. View my payslips and tax deductions
2. Submit investment proofs for tax declaration
3. Apply for leaves and track balance
4. Check-in/check-out for attendance
5. Access my Form 16 and other tax documents
6. Apply for EWA (Earned Wage Access)
7. View my attendance and leave history
8. Update personal information
9. Access company policies and documents
10. View my tax regime comparison and recommendations

### As a Finance Manager, I want to:
1. Approve payroll runs before disbursement
2. Review payroll anomalies and overrides
3. Monitor disbursement status and bank reconciliations
4. Generate compliance reports and filings
5. Configure TDS and other deduction policies
6. Manage loan and EWA approvals
7. View financial reports and analytics
8. Monitor compliance penalties and due dates
9. Configure bank account information
10. Audit payroll calculations and adjustments

### As a Compliance Officer, I want to:
1. Monitor gazette notifications for legal changes
2. Generate statutory filings with one click
3. Track filing due dates and penalties
4. Verify employee investment proofs
5. Configure state-wise compliance settings
6. Generate audit trails for inspections
7. Monitor compliance health score
8. Receive alerts for compliance deadlines
9. Generate Form 16 for all employees
10. Reconcile PF/ESI contributions with government portals

## Acceptance Criteria

### Payroll Processing
- [ ] Payroll run for 1000 employees completes in < 10 seconds
- [ ] No rounding errors in financial calculations (all amounts in paise)
- [ ] Event sourcing stores every calculation step for audit
- [ ] Outbox pattern prevents double salary disbursement
- [ ] Anomaly detection flags suspicious calculations
- [ ] Support for mid-month joiners and pro-rata calculations
- [ ] Correct PF calculation with ₹15,000 wage ceiling
- [ ] Correct ESI calculation with ₹21,000 ceiling and mid-month logic
- [ ] State-wise PT calculation for all 28 states
- [ ] Accurate TDS with marginal relief on Section 87A

### TDS Computation
- [ ] 100% accurate per Finance Act 2025-26
- [ ] Section 87A rebate with marginal relief implemented
- [ ] HRA exemption calculation correct for metro/non-metro
- [ ] Section 80C capped at ₹1,50,000
- [ ] Section 80D with senior citizen differentiation
- [ ] NPS 80CCD(2) employer contribution deductible in both regimes
- [ ] Section 89 relief for arrears
- [ ] Form 12B support for mid-year joiners
- [ ] Regime comparison with savings calculation
- [ ] Form 16 generation with digital signature

### Compliance
- [ ] EPFO ECR v2.0 file generation
- [ ] ESIC challan generation
- [ ] TDS Challan 281 generation
- [ ] Form 24Q/26Q FVU file generation
- [ ] Professional Tax calculation for all states
- [ ] LWF bi-annual calculation
- [ ] Gazette monitoring with AI classification
- [ ] Compliance due date calendar
- [ ] Penalty calculation for late filings
- [ ] Audit-ready documentation for all filings

### Security
- [ ] Row Level Security on all tables
- [ ] PII encryption for PAN, Aadhaar, phone numbers
- [ ] DPDP Act 2023 compliance implemented
- [ ] Rate limiting per org and per user
- [ ] JWT with 15min access + 30 day refresh tokens
- [ ] TOTP 2FA support
- [ ] Audit logging for all mutations
- [ ] Cross-tenant data access prevention
- [ ] SQL injection prevention
- [ ] Idempotency keys for all financial APIs

## Success Metrics
1. **Accuracy**: 100% correct financial calculations, zero rounding errors
2. **Performance**: p95 API response < 60ms, 1000-employee payroll < 10s
3. **Reliability**: 99.99% uptime, zero data loss, exactly-once disbursement
4. **Compliance**: 100% statutory compliance, audit-ready at all times
5. **Security**: Zero data breaches, DPDP Act 2023 compliant
6. **Scalability**: Support 50+ organizations running payroll simultaneously
7. **User Experience**: Intuitive APIs, comprehensive documentation, fast responses

## Non-Functional Requirements
1. **Maintainability**: Clean code, comprehensive tests, good documentation
2. **Monitorability**: Comprehensive logging, metrics, and alerting
3. **Deployability**: Docker containers, CI/CD pipeline, easy rollbacks
4. **Extensibility**: Modular architecture, easy to add new features
5. **Documentation**: API docs, architecture docs, deployment guides
6. **Testing**: 200+ payroll test cases, 200+ TDS test cases, load tests
7. **Backup & Recovery**: Automated backups, point-in-time recovery
8. **Disaster Recovery**: Multi-AZ deployment, data replication

## Constraints
1. **Data Sovereignty**: Category A data (PII, payroll) never leaves India
2. **Financial Accuracy**: All amounts must be in paise, no floating point
3. **Legal Compliance**: Must comply with all Indian labor and tax laws
4. **Performance**: Must meet strict performance requirements
5. **Security**: Must implement enterprise-grade security
6. **Auditability**: Must support complete audit trails for 8+ years

## Out of Scope (v1)
1. Mobile app development
2. International payroll (outside India)
3. Advanced analytics and BI tools
4. Custom report builder
5. Advanced workflow engine
6. Third-party integrations (except compliance portals)
7. Advanced AI/ML features beyond basic anomaly detection
8. Multi-currency support
9. Advanced access control beyond role-based
10. Custom branding and white-labeling

## Dependencies
1. **External APIs**: EPFO, ESIC, TRACES, Razorpay, AWS SES, WhatsApp
2. **Infrastructure**: AWS/GCP/Azure, Docker, Kubernetes
3. **Monitoring**: OpenTelemetry, Prometheus, Grafana
4. **CI/CD**: GitHub Actions, Jenkins, or similar
5. **Documentation**: Swagger/OpenAPI, Postman collections

## Risks & Mitigations
1. **Compliance Changes**: Gazette monitor with AI classification + manual review
2. **Performance Issues**: Load testing, profiling, optimization, horizontal scaling
3. **Data Loss**: Event sourcing, outbox pattern, regular backups, multi-AZ
4. **Security Breaches**: Encryption, RLS, rate limiting, security testing
5. **Integration Failures**: Circuit breakers, retries, fallbacks, monitoring
6. **Scalability Issues**: Horizontal scaling, connection pooling, caching
7. **Accuracy Issues**: Comprehensive test suite, property-based testing, code review

## Glossary
- **PAISE**: Indian currency subunit, ₹1 = 100 paise
- **RLS**: Row Level Security (PostgreSQL feature)
- **DPDP**: Digital Personal Data Protection Act 2023
- **TDS**: Tax Deducted at Source
- **PF**: Provident Fund
- **ESI**: Employees' State Insurance
- **PT**: Professional Tax
- **LWF**: Labour Welfare Fund
- **FNF**: Full & Final Settlement
- **EWA**: Earned Wage Access
- **ECR**: Electronic Challan cum Return (EPFO)
- **FVU**: File Validation Utility (NSDL for TDS returns)
- **UTR**: Unique Transaction Reference (bank transactions)
- **PAN**: Permanent Account Number
- **UAN**: Universal Account Number (EPFO)
- **IP Number**: Insurance Policy Number (ESIC)