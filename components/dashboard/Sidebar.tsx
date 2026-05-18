"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    LayoutDashboard, Users, IndianRupee, Clock, Calendar,
    Briefcase, Target, BookOpen, TrendingUp, CreditCard,
    PiggyBank, Shield, FileText, Settings,
    HelpCircle, LogOut, ChevronDown, Gift, Monitor,
    BarChart2, MessageSquare, Landmark, PieChart, ShieldCheck, FolderOpen,
    Bell, Code2, AlertTriangle, Lock, Receipt, Layers, Scale,
    Users2, Globe, GitBranch, LayoutTemplate, Timer, Megaphone,
    Building2, Zap, Search, PanelLeftClose, PanelLeftOpen
} from "lucide-react";
import { useState, useCallback, useEffect } from "react";

// ── Sub-Menu Link Data ────────────────────────────────────────────────────────

const EMPLOYEE_LINKS = [
    { label: "Employee List", href: "/employees" },
    { label: "Add Employee", href: "/employees/add" },
    { label: "Directory", href: "/employees/directory" },
    { label: "Salary Revisions", href: "/employees/salary-revisions" },
    { label: "Onboarding", href: "/onboarding/dashboard" },
    { label: "Offboarding / FnF", href: "/fnf/dashboard" },
    { label: "Import Employees", href: "/employees/import" },
    { label: "Search", href: "/employees/search" },
];

const ORG_CHART_LINKS = [
    { label: "Org Chart (Tree)", href: "/org-chart/tree" },
    { label: "Matrix Org Chart", href: "/org-chart/matrix" },
    { label: "Departments", href: "/org-chart/departments" },
    { label: "Designations", href: "/org-chart/designations" },
    { label: "Grade Bands", href: "/org-chart/grades" },
    { label: "Locations", href: "/org-chart/locations" },
    { label: "Cost Centers", href: "/org-chart/cost-centers" },
    { label: "Budget vs Actual", href: "/org-chart/budget-vs-actual" },
    { label: "Budget Planning", href: "/org-chart/budget-planning" },
    { label: "Headcount Planning", href: "/org-chart/planning/headcount" },
    { label: "Workforce Planning", href: "/org-chart/planning/workforce" },
    { label: "Workforce Analytics", href: "/org-chart/analytics" },
    { label: "Headcount Forecast", href: "/org-chart/planning/forecast" },
    { label: "Open Positions", href: "/org-chart/positions/open" },
    { label: "Span of Control", href: "/org-chart/span-of-control" },
    { label: "Holiday Calendar", href: "/org-chart/calendar/holiday" },
    { label: "Working Calendar", href: "/org-chart/calendar/working" },
];

const PAYROLL_LINKS = [
    { label: "Payroll Dashboard", href: "/payroll/dashboard" },
    { label: "Run Payroll", href: "/payroll/run/select-month" },
    { label: "Salary Components", href: "/payroll-settings/components" },
    { label: "Arrears", href: "/payroll/arrears" },
    { label: "Payslips", href: "/payroll/payslips/bulk" },
    { label: "IT Declarations", href: "/tax/declarations" },
    { label: "Form 16", href: "/tax/form-16" },
    { label: "Variance Report", href: "/payroll/reports/variance" },
    { label: "LOP Report", href: "/payroll/reports/lop" },
    { label: "CTC Revision", href: "/payroll/ctc-revision" },
    { label: "Payroll History", href: "/payroll/history" },
    { label: "FnF Settlement", href: "/payroll/fnf" },
];

const ATTENDANCE_LINKS = [
    { label: "Attendance Dashboard", href: "/attendance/dashboard" },
    { label: "Live Attendance", href: "/attendance/live" },
    { label: "Daily Log", href: "/attendance/daily-log" },
    { label: "Regularization", href: "/attendance/regularization" },
    { label: "Shift Roster", href: "/attendance/shifts/roster" },
    { label: "Overtime Report", href: "/attendance/reports/overtime" },
    { label: "WFH Requests", href: "/attendance/wfh/request" },
    { label: "WFH Approvals", href: "/attendance/wfh/approve" },
    { label: "Biometric Devices", href: "/attendance/biometric" },
    { label: "Holiday Calendar", href: "/attendance/holidays" },
    { label: "Attendance Reports", href: "/attendance/reports" },
    { label: "Policy Settings", href: "/attendance/settings/policies" },
];

const LEAVE_LINKS = [
    { label: "Leave Dashboard", href: "/leave/dashboard" },
    { label: "Apply Leave", href: "/my-leave/apply" },
    { label: "Leave Balance", href: "/leave/balance" },
    { label: "Team Calendar", href: "/leave/calendar" },
    { label: "Leave Approvals", href: "/leave/approvals" },
    { label: "Holiday List", href: "/my-leave/holidays" },
    { label: "Comp-off", href: "/my-leave/comp-off" },
    { label: "Leave Allocation", href: "/leave/allocation" },
    { label: "Leave Reports", href: "/leave/reports" },
    { label: "Leave Policy", href: "/leave/settings/policy" },
    { label: "Accrual Settings", href: "/leave/settings/accrual" },
];

const PERF_LINKS = [
    { label: "PMS Dashboard", href: "/performance/dashboard" },
    { label: "Cycle Setup", href: "/performance/cycle-setup" },
    { label: "Rating Scale", href: "/performance/rating-scale" },
    { label: "Goal Setting (Emp)", href: "/performance/goals/set" },
    { label: "Goal Approval (Mgr)", href: "/performance/goals/approve" },
    { label: "Goal Library", href: "/performance/goals/library" },
    { label: "Mid-Year Review", href: "/performance/reviews/mid-year" },
    { label: "Self Appraisal", href: "/performance/reviews/self" },
    { label: "Manager Appraisal", href: "/performance/reviews/manager" },
    { label: "Skip-Level Review", href: "/performance/reviews/skip-level" },
    { label: "Calibration", href: "/performance/calibration" },
    { label: "Bell Curve", href: "/performance/bell-curve" },
    { label: "Final Ratings", href: "/performance/final-rating" },
    { label: "Appraisal Letter", href: "/performance/letters/appraisal" },
    { label: "Increment Letter", href: "/performance/letters/increment" },
    { label: "Promo Recommend", href: "/performance/promotion/recommend" },
    { label: "Promotion Letter", href: "/performance/promotion/letter" },
    { label: "Promotion Approval", href: "/performance/promotion/approve" },
    { label: "PIP Initiation", href: "/performance/pip/initiate" },
    { label: "PIP Weekly Review", href: "/performance/pip/review" },
    { label: "PIP Outcome", href: "/performance/pip/outcome" },
    { label: "PMS Reports", href: "/performance/reports" },
    { label: "PMS Calendar", href: "/performance/calendar" },
];

const REC_LINKS = [
    { label: "ATS Dashboard", href: "/recruitment/dashboard" },
    { label: "Job Postings", href: "/recruitment/jobs" },
    { label: "Create Job", href: "/recruitment/jobs/create" },
    { label: "Publish to Job Boards", href: "/recruitment/jobs/publish" },
    { label: "Candidate List", href: "/recruitment/candidates" },
    { label: "Resume Parser", href: "/recruitment/parser" },
    { label: "Candidate Sourcing", href: "/recruitment/sourcing" },
    { label: "Communications", href: "/recruitment/communications" },
    { label: "Interviews", href: "/recruitment/interviews" },
    { label: "Interview Feedback", href: "/recruitment/interviews/feedback" },
    { label: "Question Bank", href: "/recruitment/interviews/questions" },
    { label: "Panel Setup", href: "/recruitment/interviews/panel" },
    { label: "Offer Generation", href: "/recruitment/offers/generate" },
    { label: "Offer Acceptance", href: "/recruitment/offers/acceptance" },
    { label: "Employee Referral", href: "/recruitment/referrals" },
    { label: "BGV Initiation", href: "/recruitment/bgv/initiate" },
    { label: "BGV Status", href: "/recruitment/bgv/status" },
    { label: "Onboarding Trigger", href: "/recruitment/onboarding/trigger" },
    { label: "ATS Reports", href: "/recruitment/reports" },
];

const LMS_LINKS = [
    { label: "My Dashboard", href: "/lms/dashboard" },
    { label: "Course Library", href: "/lms/library" },
    { label: "Learning Paths", href: "/lms/learning-path" },
    { label: "Admin Dashboard", href: "/lms/admin/dashboard" },
    { label: "Course Builder", href: "/lms/admin/course/create" },
    { label: "Webinars & Live", href: "/lms/calendar" },
    { label: "Compliance Training", href: "/lms/compliance/calendar" },
    { label: "Skill Matrix", href: "/lms/skills/matrix" },
    { label: "Skill Gap Analysis", href: "/lms/skills/gap" },
    { label: "Gamification", href: "/lms/gamification" },
    { label: "LMS Reports", href: "/lms/reports" },
];

const ENGAGEMENT_LINKS = [
    { label: "R&R Dashboard", href: "/engagement/rr/dashboard" },
    { label: "Give Recognition", href: "/engagement/rr/give" },
    { label: "Recognition Feed", href: "/engagement/rr/feed" },
    { label: "My Rewards", href: "/engagement/rr/my-rewards" },
    { label: "Reward Catalog", href: "/engagement/rr/catalog" },
    { label: "R&R Admin", href: "/engagement/rr/admin" },
    { label: "Survey Dashboard", href: "/engagement/surveys/dashboard" },
    { label: "Take eNPS", href: "/engagement/surveys/enps-take" },
    { label: "eNPS Dashboard", href: "/engagement/surveys/enps-dashboard" },
    { label: "Heatmap Analytics", href: "/engagement/surveys/analytics/heatmap" },
    { label: "Survey Templates", href: "/engagement/surveys/templates" },
    { label: "Create Survey", href: "/engagement/surveys/create" },
];

const OKR_LINKS = [
    { label: "OKR Dashboard", href: "/okr/dashboard" },
    { label: "Company OKRs", href: "/okr/company" },
    { label: "Department OKRs", href: "/okr/department" },
    { label: "My OKRs", href: "/okr/my-okrs" },
    { label: "Create OKR", href: "/okr/create" },
    { label: "Progress Update", href: "/okr/progress" },
    { label: "Check-in", href: "/okr/check-in" },
    { label: "Alignment View", href: "/okr/alignment" },
    { label: "OKR Reports", href: "/okr/reports" },
    { label: "OKR Settings", href: "/okr/settings" },
];

const FEEDBACK_LINKS = [
    { label: "360° Dashboard", href: "/feedback/dashboard" },
    { label: "Request Feedback", href: "/feedback/request" },
    { label: "Give Feedback", href: "/feedback/give" },
    { label: "360° Report", href: "/feedback/report" },
    { label: "Strengths & Dev", href: "/feedback/strengths" },
    { label: "Continuous Feedback", href: "/feedback/continuous" },
    { label: "Feedback History", href: "/feedback/history" },
    { label: "Kudos Wall", href: "/feedback/kudos" },
    { label: "Feedback Analytics", href: "/feedback/analytics" },
];

const SUCCESSION_LINKS = [
    { label: "Succession Dashboard", href: "/succession/dashboard" },
    { label: "Succession Plan", href: "/succession/plan" },
    { label: "Talent Pool", href: "/succession/talent-pool" },
    { label: "Key Person Risk", href: "/succession/key-person-risk" },
    { label: "Critical Roles", href: "/succession/critical-roles" },
    { label: "Succession Readiness", href: "/succession/readiness" },
    { label: "Attrition Risk", href: "/ai/attrition-risk" },
];

const WORKFORCE_LINKS = [
    { label: "Workforce Planning", href: "/workforce-analytics/planning" },
    { label: "Attrition Forecast", href: "/workforce-analytics/attrition" },
    { label: "Cost Forecast", href: "/workforce-analytics/cost" },
    { label: "Scenario Planning", href: "/workforce-analytics/scenarios" },
    { label: "D&I Dashboard", href: "/workforce-analytics/diversity" },
    { label: "Forecast", href: "/workforce-analytics/forecast" },
];

const EMBEDDED_FINANCE_LINKS = [
    { label: "Finance Dashboard", href: "/finance/dashboard" },
    { label: "EWA Portal", href: "/finance/ewa" },
    { label: "Loan Management", href: "/finance/loans" },
    { label: "Insurance Marketplace", href: "/finance/insurance/marketplace" },
    { label: "Company Credit Score", href: "/finance/score" },
    { label: "Double Entry Ledger", href: "/finance/ledger" },
    { label: "Finance Analytics", href: "/finance/analytics" },
    { label: "Finance Settings", href: "/finance/settings" },
];

const EWA_LINKS = [
    { label: "EWA Dashboard", href: "/finance/ewa" },
    { label: "Apply for EWA", href: "/finance/ewa/withdraw" },
    { label: "EWA History", href: "/finance/ewa/history" },
    { label: "Variable Pay Setup", href: "/variable-pay-setup" },
    { label: "Off-cycle Payroll", href: "/off-cycle-payroll" },
];

const LOANS_LINKS = [
    { label: "Loans & Advances", href: "/payroll-settings/loans" },
    { label: "Loan Application", href: "/finance/loans/apply" },
    { label: "Loan Closure", href: "/finance/loans/closure" },
    { label: "Gratuity", href: "/payroll/gratuity" },
    { label: "Statutory Bonus", href: "/payroll/statutory-bonus" },
    { label: "Leave Encashment", href: "/payroll/leave-encashment" },
];

const INSURANCE_LINKS = [
    { label: "Tax Dashboard", href: "/tax/dashboard" },
    { label: "Tax Declarations", href: "/tax/declarations" },
    { label: "Proof Upload", href: "/tax/proofs/upload" },
    { label: "Form 16", href: "/tax/form-16" },
    { label: "Regime Selector", href: "/tax/regime-selector" },
    { label: "TDS 24Q Filing", href: "/compliance/tds-return-24q" },
    { label: "TDS Challan", href: "/compliance/tds-challan" },
    { label: "Form 26AS", href: "/tax/form-26as" },
];

const REIMBURSEMENTS_LINKS = [
    { label: "My Claims", href: "/reimbursements/dashboard" },
    { label: "Raise Claim", href: "/reimbursements/claim" },
    { label: "Claim Approvals", href: "/reimbursements/approvals" },
    { label: "LTA Claim", href: "/reimbursements/lta" },
    { label: "Medical Claim", href: "/reimbursements/medical" },
    { label: "Balance Tracker", href: "/reimbursements/balance" },
    { label: "Reimbursement Policy", href: "/reimbursements/policy" },
    { label: "Reports", href: "/reimbursements/reports" },
];

const FBP_LINKS = [
    { label: "FBP Dashboard", href: "/fbp/dashboard" },
    { label: "My Declaration", href: "/fbp/declare" },
    { label: "FBP Management", href: "/fbp/manage" },
    { label: "Component Setup", href: "/fbp/setup" },
    { label: "Mid-Year Revision", href: "/fbp/mid-year" },
    { label: "Annual Report", href: "/fbp/annual-report" },
];

const COMPLIANCE_LINKS = [
    { label: "Compliance Hub", href: "/compliance/dashboard" },
    { label: "PF ECR Filing", href: "/compliance/pf-ecr" },
    { label: "PF Challan", href: "/compliance/pf-challan" },
    { label: "ESI Challan", href: "/compliance/esi-challan" },
    { label: "TDS 24Q Return", href: "/compliance/tds-return-24q" },
    { label: "PT Challan", href: "/compliance/pt-challan" },
    { label: "LWF Filing", href: "/compliance/lwf" },
    { label: "Gazette Monitor", href: "/compliance/gazette-monitor" },
    { label: "Compliance Calendar", href: "/compliance/calendar" },
    { label: "Digital Signatures", href: "/compliance/digital-signature" },
    { label: "Inspector Ready", href: "/compliance/inspector-ready" },
    { label: "Labour Law Calendar", href: "/compliance/labour-law-calendar" },
    { label: "Health Score", href: "/compliance/health-score" },
    { label: "Compliance Settings", href: "/compliance/settings" },
];

const IT_LINKS = [
    { label: "IT Dashboard", href: "/it-provisioning" },
    { label: "Asset List", href: "/it-provisioning/assets" },
    { label: "Add Asset", href: "/it-provisioning/assets/add" },
    { label: "Asset Assignment", href: "/it-provisioning/assets/assign" },
    { label: "Asset Return", href: "/it-provisioning/assets/return" },
    { label: "Asset Maintenance", href: "/it-provisioning/assets/maintenance" },
    { label: "Software Licenses", href: "/it-provisioning/software" },
    { label: "Software Request", href: "/it-provisioning/software/request" },
    { label: "Access Revocation", href: "/it-provisioning/access/revoke" },
    { label: "IT Analytics", href: "/it-provisioning/analytics" },
];

const BGV_LINKS = [
    { label: "BGV Dashboard", href: "/bgv/dashboard" },
    { label: "Initiate Request", href: "/bgv/initiate" },
    { label: "Status Tracking", href: "/bgv/status" },
    { label: "Discrepancies", href: "/bgv/discrepancies" },
    { label: "Vendor Management", href: "/bgv/vendors" },
    { label: "Policy Setup", href: "/bgv/settings/policy" },
    { label: "BGV Reports", href: "/bgv/reports" },
];

const DOC_LINKS = [
    { label: "Repository", href: "/documents/repository" },
    { label: "Upload Document", href: "/documents/upload" },
    { label: "Categories", href: "/documents/categories" },
    { label: "Search & Retrieval", href: "/documents/search" },
    { label: "Expiry Tracker", href: "/documents/expiry" },
    { label: "Bulk Generation", href: "/documents/bulk-generation" },
    { label: "E-Signature Hub", href: "/documents/e-sign" },
    { label: "Document Reports", href: "/documents/reports" },
    { label: "Audit Trail", href: "/documents/audit" },
];

const REPORTS_LINKS = [
    { label: "Reports Dashboard", href: "/reports/dashboard" },
    { label: "Custom Builder", href: "/reports/builder" },
    { label: "Standard Reports", href: "/reports/headcount" },
    { label: "Payroll & Compliance", href: "/reports/payroll-cost" },
    { label: "Advanced Analytics", href: "/reports/hr-analytics" },
    { label: "BRSR Report", href: "/reports/brsr" },
    { label: "Data Export", href: "/reports/export-dashboard" },
    { label: "Saved Reports", href: "/reports/saved" },
];

const AI_LINKS = [
    { label: "AI Dashboard", href: "/ai/insights" },
    { label: "HR Copilot", href: "/ai/hr-copilot" },
    { label: "Natural Language Query", href: "/ai/nl-query" },
    { label: "Attrition Risk", href: "/ai/attrition-risk" },
    { label: "Gazette Monitor", href: "/ai/gazette-monitor" },
    { label: "Anomaly Detection", href: "/ai/anomaly-detection" },
    { label: "AI Settings", href: "/ai/settings" },
];

const NOTIFICATIONS_LINKS = [
    { label: "Notification Center", href: "/notifications" },
    { label: "History", href: "/notifications/history" },
    { label: "Insights", href: "/notifications/insights" },
    { label: "Escalations", href: "/notifications/escalations" },
    { label: "Milestones", href: "/notifications/milestones" },
    { label: "Analytics", href: "/notifications/analytics" },
];

const SETTINGS_LINKS = [
    { label: "Company Profile", href: "/payroll-settings" },
    { label: "Salary Components", href: "/payroll-settings/components" },
    { label: "Payroll Cycle", href: "/payroll-settings/cycle" },
    { label: "Payslip Template", href: "/payroll-settings/payslip-template" },
    { label: "Lock Engine", href: "/payroll-settings/lock" },
    { label: "Bank Verification", href: "/payroll-settings/bank-verify" },
    { label: "Bands & Grades", href: "/payroll-settings/bands" },
    { label: "Approval Matrix", href: "/settings/approval-matrix" },
    { label: "Role Permissions", href: "/settings/roles" },
    { label: "API Keys", href: "/settings/api-keys" },
];

const GRIEVANCE_LINKS = [
    { label: "Grievance Dashboard", href: "/grievances/dashboard" },
    { label: "Raise Grievance", href: "/grievances/raise" },
    { label: "IC Committee", href: "/grievances/committee" },
    { label: "Grievance Reports", href: "/grievances/reports" },
];

const SECURITY_LINKS = [
    { label: "Security Dashboard", href: "/security/dashboard" },
    { label: "Active Sessions", href: "/security/sessions" },
    { label: "Failed Logins", href: "/security/failed-logins" },
    { label: "IP Whitelist", href: "/security/ip-whitelist" },
    { label: "Permissions", href: "/security/permissions" },
    { label: "Security Incidents", href: "/security/incidents" },
];

const HELP_LINKS = [
    { label: "Help Center", href: "/help" },
    { label: "Knowledge Base", href: "/help/knowledge-base" },
    { label: "Video Tutorials", href: "/help/videos" },
    { label: "Chat Support", href: "/help/chat" },
    { label: "Bug Reports", href: "/help/bug-report" },
    { label: "Keyboard Shortcuts", href: "/help/shortcuts" },
    { label: "API Changelog", href: "/help/changelog" },
];

const DEVELOPER_LINKS = [
    { label: "Developer Dashboard", href: "/developer/dashboard" },
    { label: "API Documentation", href: "/developer/docs" },
    { label: "API Keys", href: "/developer/keys" },
    { label: "OAuth Apps", href: "/developer/oauth" },
    { label: "Webhook Config", href: "/developer/webhooks" },
    { label: "Webhook Logs", href: "/developer/webhooks/logs" },
    { label: "API Usage", href: "/developer/analytics" },
    { label: "Sandbox", href: "/developer/sandbox" },
    { label: "Changelog", href: "/developer/changelog" },
];

const PAY_EQUITY_LINKS = [
    { label: "Pay Equity Dashboard", href: "/pay-equity/dashboard" },
    { label: "Gender Pay Gap", href: "/pay-equity/gender" },
    { label: "Compa-Ratio", href: "/pay-equity/compa-ratio" },
    { label: "Unexplained Gap", href: "/pay-equity/unexplained-gap" },
    { label: "Fair Pay Check", href: "/pay-equity/fair-pay-check" },
    { label: "Remediation Plan", href: "/pay-equity/remediation" },
    { label: "Living Wage", href: "/pay-equity/living-wage" },
    { label: "Executive Comp", href: "/pay-equity/executive-comp" },
    { label: "Pay Transparency", href: "/pay-equity/transparency" },
    { label: "Audit Report", href: "/pay-equity/audit" },
];

const GLOBAL_LINKS = [
    { label: "Country Setup", href: "/global/country-setup" },
    { label: "UAE Payroll", href: "/global/uae-payroll" },
    { label: "Singapore Payroll", href: "/global/singapore-payroll" },
    { label: "Shadow Payroll", href: "/global/shadow-payroll" },
    { label: "Currency Management", href: "/global/currency" },
    { label: "Exchange Rates", href: "/global/exchange-rates" },
    { label: "Expat Management", href: "/global/expat" },
    { label: "International Transfer", href: "/global/international-transfer" },
];

const MULTI_ENTITY_LINKS = [
    { label: "Entity List", href: "/multi-entity/dashboard" },
    { label: "Add Entity", href: "/multi-entity/add" },
    { label: "Inter-entity Transfer", href: "/multi-entity/transfer" },
    { label: "Consolidated Payroll", href: "/multi-entity/payroll" },
    { label: "Group Reports", href: "/multi-entity/reports" },
];

const TIMESHEET_LINKS = [
    { label: "Project List", href: "/projects" },
    { label: "Project Setup", href: "/projects/setup" },
    { label: "Project Assignment", href: "/projects/assign" },
    { label: "Client Billing", href: "/projects/billing" },
    { label: "Utilization Dashboard", href: "/projects/utilization" },
    { label: "Contractor Timesheet", href: "/projects/contractor-timesheet" },
    { label: "Timesheet Audit", href: "/projects/audit" },
];

const NOTICE_BOARD_LINKS = [
    { label: "Alerts", href: "/notice-board/alerts" },
    { label: "Department Notice", href: "/notice-board/dept" },
    { label: "Archive", href: "/notice-board/archive" },
    { label: "Pinned Announcements", href: "/notice-board/pinned" },
];

const SUPER_ADMIN_LINKS = [
    { label: "Super Admin Home", href: "/super-admin/dashboard" },
    { label: "Organizations", href: "/super-admin/organizations" },
    { label: "Plan Management", href: "/super-admin/plans" },
    { label: "Feature Toggles", href: "/super-admin/features" },
    { label: "Billing", href: "/super-admin/billing" },
    { label: "Announcements", href: "/super-admin/announcements" },
    { label: "Support Tickets", href: "/super-admin/support" },
    { label: "Platform Health", href: "/super-admin/health" },
    { label: "Revenue Dashboard", href: "/super-admin/revenue" },
    { label: "Usage Analytics", href: "/super-admin/adoption" },
    { label: "Audit Log", href: "/super-admin/audits" },
    { label: "CA Partner Portal", href: "/super-admin/ca-portal" },
    { label: "Reseller Mgmt", href: "/super-admin/resellers" },
    { label: "Customer Success", href: "/super-admin/customer-success" },
    { label: "Release Notes", href: "/super-admin/release-notes" },
    { label: "NPS Score", href: "/super-admin/nps" },
    { label: "Commission Tracking", href: "/super-admin/commissions" },
    { label: "Churn Analysis", href: "/super-admin/churn" },
];

// ── Nav Group Configuration ───────────────────────────────────────────────────
const NAV_GROUPS = [
    {
        label: "MAIN",
        items: [
            { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard, prefix: "/dashboard", links: [] },
            { name: "Employees", href: "/employees", icon: Users, prefix: "/employees", links: EMPLOYEE_LINKS },
            { name: "Org & Structure", href: "/org-chart/tree", icon: Briefcase, prefix: "/org-chart", links: ORG_CHART_LINKS },
            { name: "Payroll", href: "/payroll/dashboard", icon: IndianRupee, prefix: "/payroll", links: PAYROLL_LINKS },
            { name: "Attendance", href: "/attendance/dashboard", icon: Clock, prefix: "/attendance", links: ATTENDANCE_LINKS },
            { name: "Leave", href: "/leave/dashboard", icon: Calendar, prefix: "/leave", links: LEAVE_LINKS },
        ]
    },
    {
        label: "TALENT",
        items: [
            { name: "Recruitment", href: "/recruitment/dashboard", icon: Briefcase, prefix: "/recruitment", links: REC_LINKS },
            { name: "Performance", href: "/performance/dashboard", icon: Target, prefix: "/performance", links: PERF_LINKS },
            { name: "Learning", href: "/lms/dashboard", icon: BookOpen, prefix: "/lms", links: LMS_LINKS },
            { name: "Engagement", href: "/engagement/rr/dashboard", icon: Gift, prefix: "/engagement", links: ENGAGEMENT_LINKS },
            { name: "Succession", href: "/succession/dashboard", icon: TrendingUp, prefix: "/succession", links: SUCCESSION_LINKS },
            { name: "OKRs", href: "/okr/dashboard", icon: BarChart2, prefix: "/okr", links: OKR_LINKS },
            { name: "360° Feedback", href: "/feedback/dashboard", icon: MessageSquare, prefix: "/feedback", links: FEEDBACK_LINKS },
            { name: "Workforce Analytics", href: "/workforce-analytics/planning", icon: Users2, prefix: "/workforce-analytics", links: WORKFORCE_LINKS },
        ]
    },
    {
        label: "FINANCE",
        items: [
            { name: "Embedded Finance", href: "/finance/dashboard", icon: Landmark, prefix: "/finance", links: EMBEDDED_FINANCE_LINKS },
            { name: "EWA & Variables", href: "/finance/ewa", icon: CreditCard, prefix: "/finance/ewa", links: EWA_LINKS },
            { name: "Loans & Benefits", href: "/payroll-settings/loans", icon: PiggyBank, prefix: "/payroll-settings/loans", links: LOANS_LINKS },
            { name: "Tax & TDS", href: "/tax/dashboard", icon: Shield, prefix: "/tax", links: INSURANCE_LINKS },
            { name: "Reimbursements", href: "/reimbursements/dashboard", icon: Receipt, prefix: "/reimbursements", links: REIMBURSEMENTS_LINKS },
            { name: "Flexi Benefits (FBP)", href: "/fbp/dashboard", icon: Layers, prefix: "/fbp", links: FBP_LINKS },
        ]
    },
    {
        label: "COMPLIANCE & ADMIN",
        items: [
            { name: "Compliance", href: "/compliance/dashboard", icon: FileText, prefix: "/compliance", links: COMPLIANCE_LINKS },
            { name: "IT Provisioning", href: "/it-provisioning", icon: Monitor, prefix: "/it-provisioning", links: IT_LINKS },
            { name: "Background Checks", href: "/bgv/dashboard", icon: ShieldCheck, prefix: "/bgv", links: BGV_LINKS },
            { name: "Document Hub", href: "/documents/repository", icon: FolderOpen, prefix: "/documents", links: DOC_LINKS },
            { name: "Pay Equity", href: "/pay-equity/dashboard", icon: Scale, prefix: "/pay-equity", links: PAY_EQUITY_LINKS },
            { name: "Grievances", href: "/grievances/dashboard", icon: AlertTriangle, prefix: "/grievances", links: GRIEVANCE_LINKS },
            { name: "Security", href: "/security/dashboard", icon: Lock, prefix: "/security", links: SECURITY_LINKS },
        ]
    },
    {
        label: "REPORTS & ANALYTICS",
        items: [
            { name: "Reports Center", href: "/reports/dashboard", icon: PieChart, prefix: "/reports", links: REPORTS_LINKS },
            { name: "AI Insights", href: "/ai/insights", icon: Zap, prefix: "/ai", links: AI_LINKS },
        ]
    },
    {
        label: "ENTERPRISE",
        items: [
            { name: "Multi-Entity", href: "/multi-entity/dashboard", icon: Building2, prefix: "/multi-entity", links: MULTI_ENTITY_LINKS },
            { name: "Global Payroll", href: "/global/country-setup", icon: Globe, prefix: "/global", links: GLOBAL_LINKS },
            { name: "Timesheet & Projects", href: "/projects", icon: Timer, prefix: "/projects", links: TIMESHEET_LINKS },
            { name: "Notice Board", href: "/notice-board/alerts", icon: Megaphone, prefix: "/notice-board", links: NOTICE_BOARD_LINKS },
            { name: "Developer Portal", href: "/developer/dashboard", icon: Code2, prefix: "/developer", links: DEVELOPER_LINKS },
        ]
    },
    {
        label: "SETTINGS",
        items: [
            { name: "Settings", href: "/payroll-settings", icon: Settings, prefix: "/payroll-settings", links: SETTINGS_LINKS },
            { name: "Notifications", href: "/notifications", icon: Bell, prefix: "/notifications", links: NOTIFICATIONS_LINKS },
            { name: "FnF & Exit", href: "/fnf/dashboard", icon: GitBranch, prefix: "/fnf", links: [] },
            { name: "Helpdesk", href: "/helpdesk/dashboard", icon: HelpCircle, prefix: "/helpdesk", links: [] },
            { name: "Help & Support", href: "/help", icon: LayoutTemplate, prefix: "/help", links: HELP_LINKS },
        ]
    },
    {
        label: "SUPER ADMIN",
        items: [
            { name: "Super Admin", href: "/super-admin/dashboard", icon: ShieldCheck, prefix: "/super-admin", links: SUPER_ADMIN_LINKS },
        ]
    },
];

// ── Role → Permitted Group Labels ────────────────────────────────────────────
const SIDEBAR_CONFIG: Record<'hr_admin' | 'manager' | 'employee', string[]> = {
    hr_admin: ['MAIN', 'TALENT', 'FINANCE', 'COMPLIANCE & ADMIN', 'REPORTS & ANALYTICS', 'ENTERPRISE', 'SETTINGS'],
    manager: ['MAIN', 'TALENT', 'REPORTS & ANALYTICS'],
    employee: ['MAIN'],
};

// ── Highlight matched text ────────────────────────────────────────────────────
function HighlightText({ text, query }: { text: string; query: string }) {
    if (!query) return <>{text}</>;
    const idx = text.toLowerCase().indexOf(query.toLowerCase());
    if (idx === -1) return <>{text}</>;
    return (
        <>
            {text.slice(0, idx)}
            <mark style={{ background: 'rgba(0,229,160,0.2)', color: '#00e5a0', borderRadius: 2 }}>
                {text.slice(idx, idx + query.length)}
            </mark>
            {text.slice(idx + query.length)}
        </>
    );
}

// ── Sub-Link Item ─────────────────────────────────────────────────────────────
function SubLink({ href, label, pathname, searchQuery = '' }: { href: string; label: string; pathname: string; searchQuery?: string }) {
    const isActive = pathname === href || pathname.startsWith(href + "/");
    return (
        <Link
            href={href}
            title={label}
            aria-current={isActive ? "page" : undefined}
            className={[
                "block px-3 py-[5px] rounded-[7px] text-[12px] leading-snug truncate transition-all duration-150",
                isActive
                    ? "bg-[rgba(0,229,160,0.1)] text-[#00e5a0] font-500"
                    : "text-[#7a8fa6] hover:bg-[rgba(255,255,255,0.04)] hover:text-[#c8d8e8]"
            ].join(" ")}
        >
            <HighlightText text={label} query={searchQuery} />
        </Link>
    );
}

// ── Nav Item ──────────────────────────────────────────────────────────────────
type NavItemProps = {
    name: string;
    href: string;
    icon: React.ElementType;
    prefix: string;
    links: { label: string; href: string }[];
    pathname: string;
    searchQuery?: string;
    isMini?: boolean;
    forceOpen?: boolean;
};

function NavItem({ name, href, icon: Icon, prefix, links, pathname, searchQuery = '', isMini = false, forceOpen = false }: NavItemProps) {
    const isActive = pathname === href || pathname.startsWith(prefix);
    const hasDropdown = links.length > 0;
    const submenuId = `submenu-${name.toLowerCase().replace(/\s+/g, "-")}`;

    const [open, setOpen] = useState(() => isActive && hasDropdown);

    useEffect(() => {
        if (isActive && hasDropdown && !open) setOpen(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isActive]);

    const handleToggle = useCallback(() => {
        if (hasDropdown) setOpen(o => !o);
    }, [hasDropdown]);

    const isOpen = forceOpen ? true : open;

    const rowClasses = [
        "relative flex h-9 items-center gap-2.5 rounded-[9px] px-3 transition-all duration-150 select-none",
        isActive
            ? "bg-[rgba(0,229,160,0.1)] text-[#00e5a0]"
            : "text-[#7a8fa6] hover:bg-[rgba(255,255,255,0.04)] hover:text-[#c8d8e8] hover:translate-x-0.5",
        hasDropdown ? "cursor-pointer" : "cursor-default",
    ].join(" ");

    const innerContent = (
        <>
            {isActive && (
                <span className="absolute left-0 top-[20%] bottom-[20%] w-[3px] rounded-r-[3px] bg-[#00e5a0] shadow-[0_0_8px_rgba(0,229,160,0.5)]" aria-hidden="true" />
            )}
            <Icon size={15} aria-hidden="true" className="shrink-0" />
            {!isMini && <span className="flex-1 truncate text-[13px] font-500"><HighlightText text={name} query={searchQuery} /></span>}
            {!isMini && hasDropdown && (
                <ChevronDown
                    size={11}
                    className={`shrink-0 transition-transform duration-200 ${isOpen ? "rotate-0" : "-rotate-90"}`}
                    aria-hidden="true"
                />
            )}
        </>
    );

    if (isMini) {
        return (
            <li className="relative group">
                <Link
                    href={href}
                    aria-current={isActive ? "page" : undefined}
                    className={`${rowClasses} justify-center px-0 w-full`}
                    title={name}
                >
                    {innerContent}
                </Link>
                {/* Tooltip */}
                <div
                    className="pointer-events-none absolute left-[52px] top-1/2 -translate-y-1/2 z-50 hidden group-hover:block"
                    style={{
                        background: '#0d1b2a',
                        border: '1px solid #162030',
                        borderRadius: 7,
                        padding: '4px 10px',
                        fontSize: 12,
                        color: '#c8d8e8',
                        whiteSpace: 'nowrap',
                    }}
                >
                    {name}
                </div>
            </li>
        );
    }

    return (
        <li>
            {hasDropdown ? (
                <button
                    type="button"
                    onClick={handleToggle}
                    aria-expanded={isOpen}
                    aria-controls={submenuId}
                    className={`w-full text-left ${rowClasses}`}
                >
                    {innerContent}
                </button>
            ) : (
                <Link
                    href={href}
                    aria-current={isActive ? "page" : undefined}
                    className={rowClasses}
                >
                    {innerContent}
                </Link>
            )}

            {hasDropdown && isOpen && (
                <ul
                    id={submenuId}
                    role="list"
                    className="ml-3 mt-0.5 mb-1 pl-2.5 border-l border-[#162030] flex flex-col gap-0.5"
                >
                    {links.map(l => (
                        <li key={l.href}>
                            <SubLink href={l.href} label={l.label} pathname={pathname} searchQuery={searchQuery} />
                        </li>
                    ))}
                </ul>
            )}
        </li>
    );
}

// ── Main Sidebar ──────────────────────────────────────────────────────────────
export default function Sidebar({ role = 'hr_admin' }: { role?: 'hr_admin' | 'manager' | 'employee' }) {
    const pathname = usePathname();
    const router = useRouter();

    // ── Mini mode ──────────────────────────────────────────────────────────────
    const [isMini, setIsMini] = useState(() => {
        try {
            return localStorage.getItem('sidebar_mini') === 'true';
        } catch {
            return false;
        }
    });

    const toggleMini = useCallback(() => {
        setIsMini(prev => {
            const next = !prev;
            try { localStorage.setItem('sidebar_mini', String(next)); } catch { /* ignore */ }
            document.documentElement.style.setProperty('--sidebar-width', next ? '48px' : '240px');
            return next;
        });
    }, []);

    // Set CSS custom property on mount
    useEffect(() => {
        document.documentElement.style.setProperty('--sidebar-width', isMini ? '48px' : '240px');
    }, [isMini]);

    // ── Collapsed sections ─────────────────────────────────────────────────────
    const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>(() => {
        try {
            const stored = localStorage.getItem('sidebar_collapsed');
            if (stored) return JSON.parse(stored);
        } catch { /* ignore */ }
        // Default: MAIN open, all others collapsed
        const defaults: Record<string, boolean> = {};
        NAV_GROUPS.forEach(g => { defaults[g.label] = g.label !== 'MAIN'; });
        return defaults;
    });

    const toggleSection = useCallback((label: string) => {
        setCollapsedSections(prev => {
            const next = { ...prev, [label]: !prev[label] };
            try { localStorage.setItem('sidebar_collapsed', JSON.stringify(next)); } catch { /* ignore */ }
            return next;
        });
    }, []);

    // Auto-expand section containing active route on pathname change
    useEffect(() => {
        const permittedGroups = NAV_GROUPS.filter(g => SIDEBAR_CONFIG[role].includes(g.label));
        for (const group of permittedGroups) {
            const hasActive = group.items.some(
                item => pathname === item.href || pathname.startsWith(item.prefix)
            );
            if (hasActive) {
                // eslint-disable-next-line react-hooks/set-state-in-effect -- syncs persisted UI state on route change
                setCollapsedSections(prev => {
                    if (!prev[group.label]) return prev;
                    const next = { ...prev, [group.label]: false };
                    try { localStorage.setItem('sidebar_collapsed', JSON.stringify(next)); } catch { /* ignore */ }
                    return next;
                });
                break;
            }
        }
    }, [pathname, role]);

    // ── Search ─────────────────────────────────────────────────────────────────
    const [searchQuery, setSearchQuery] = useState('');

    // ── Role-filtered groups ───────────────────────────────────────────────────
    const permittedGroups = NAV_GROUPS.filter(g => SIDEBAR_CONFIG[role].includes(g.label));

    // Apply search filter
    const visibleGroups = searchQuery
        ? permittedGroups
            .map(group => {
                const filteredItems = group.items
                    .map(item => {
                        const nameMatch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
                        const matchingLinks = item.links.filter(l =>
                            l.label.toLowerCase().includes(searchQuery.toLowerCase())
                        );
                        if (nameMatch) return item;
                        if (matchingLinks.length > 0) return { ...item, links: matchingLinks };
                        return null;
                    })
                    .filter(Boolean) as typeof group.items;
                return { ...group, items: filteredItems };
            })
            .filter(g => g.items.length > 0)
        : permittedGroups;

    const noResults = searchQuery.length > 0 && visibleGroups.length === 0;

    const sidebarWidth = isMini ? 48 : 240;

    return (
        <nav
            aria-label="Main navigation"
            className={`fixed top-0 left-0 h-screen flex flex-col z-50 ${isMini ? '' : 'w-60'}`}
            style={{
                background: "#070d18",
                borderRight: "1px solid #162030",
                width: sidebarWidth,
                transition: 'width 200ms ease',
            }}
        >
            {/* Logo */}
            <div className="flex items-center gap-3 px-4 py-[17px] border-b border-[#162030] shrink-0 overflow-hidden">
                <Link href="/dashboard" className="flex items-center gap-3">
                    <div
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-[#00e5a0]"
                        aria-hidden="true"
                    >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#04080f" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    {!isMini && (
                        <div>
                            <div className="text-[17px] font-700 text-[#f0f4f8] leading-none tracking-[-0.02em]">HRFlow</div>
                            <div className="mt-[3px] text-[10px] text-[#7a8fa6] font-500">TechCorp Solutions</div>
                        </div>
                    )}
                </Link>
            </div>

            {/* Search */}
            {!isMini && (
                <div className="px-3 pt-2 pb-1 shrink-0">
                    <div className="relative flex items-center">
                        <Search size={13} className="absolute left-2.5 text-[#7a8fa6] pointer-events-none" aria-hidden="true" />
                        <input
                            type="text"
                            placeholder="Search menu..."
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            className="w-full rounded-[8px] bg-[rgba(255,255,255,0.04)] border border-[#162030] pl-7 pr-3 py-1.5 text-[12px] text-[#c8d8e8] placeholder-[#3d5166] outline-none focus:border-[rgba(0,229,160,0.3)] transition-colors"
                        />
                    </div>
                </div>
            )}

            {/* Nav Groups */}
            <div className="flex-1 overflow-y-auto px-2 py-2 pb-4" style={{ scrollbarWidth: "none" }}>
                {noResults ? (
                    <p className="px-3 py-4 text-[12px] text-[#7a8fa6] text-center">
                        No results for &ldquo;{searchQuery}&rdquo;
                    </p>
                ) : (
                    visibleGroups.map((group) => {
                        const isCollapsed = !searchQuery && collapsedSections[group.label];
                        const visibleItemCount = group.items.length;

                        return (
                            <div key={group.label} className="mb-2">
                                {!isMini && (
                                    <button
                                        type="button"
                                        onClick={() => toggleSection(group.label)}
                                        aria-expanded={!isCollapsed}
                                        className="w-full flex items-center justify-between px-3 pb-1 pt-2.5 text-[10px] font-600 uppercase tracking-[0.07em] text-[#7a8fa6] hover:text-[#c8d8e8] transition-colors"
                                        aria-label={group.label}
                                    >
                                        <span>
                                            {group.label}
                                            {isCollapsed && (
                                                <span className="ml-1 text-[#7a8fa6] normal-case tracking-normal">
                                                    ({visibleItemCount})
                                                </span>
                                            )}
                                        </span>
                                        <ChevronDown
                                            size={10}
                                            className={`shrink-0 transition-transform duration-200 ${isCollapsed ? '-rotate-90' : 'rotate-0'}`}
                                            aria-hidden="true"
                                        />
                                    </button>
                                )}
                                <div
                                    style={{
                                        maxHeight: isCollapsed ? 0 : 9999,
                                        overflow: 'hidden',
                                        transition: 'max-height 300ms ease',
                                    }}
                                >
                                    <ul role="list" className="flex flex-col gap-0.5">
                                        {group.items.map(item => (
                                            <NavItem
                                                key={item.name}
                                                name={item.name}
                                                href={item.href}
                                                icon={item.icon}
                                                prefix={item.prefix}
                                                links={item.links}
                                                pathname={pathname}
                                                searchQuery={searchQuery}
                                                isMini={isMini}
                                                forceOpen={!!searchQuery}
                                            />
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* Mini toggle */}
            <div className="shrink-0 px-2 pb-1">
                <button
                    type="button"
                    onClick={toggleMini}
                    aria-label={isMini ? "Open panel" : "Collapse panel"}
                    className="flex h-8 w-full items-center justify-center rounded-[9px] text-[#7a8fa6] hover:bg-[rgba(255,255,255,0.04)] hover:text-[#7a8fa6] transition-colors"
                >
                    {isMini ? <PanelLeftOpen size={15} aria-hidden="true" /> : <PanelLeftClose size={15} aria-hidden="true" />}
                </button>
            </div>

            {/* User Footer */}
            <div className="shrink-0 border-t border-[#162030] px-3 py-3">
                <div className={`flex items-center gap-2.5 ${isMini ? 'justify-center px-0' : 'px-1'}`}>
                    <button
                        onClick={() => router.push("/my-profile")}
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[rgba(0,229,160,0.12)] border border-[rgba(0,229,160,0.25)] text-[11px] font-700 text-[#00e5a0] hover:bg-[rgba(0,229,160,0.2)] transition-colors"
                        aria-label="My profile"
                    >
                        PM
                    </button>
                    {!isMini && (
                        <>
                            <button
                                onClick={() => router.push("/my-profile")}
                                className="min-w-0 flex-1 text-left hover:opacity-80 transition-opacity"
                            >
                                <div className="truncate text-[12px] font-600 text-[#c8d8e8]">Priya Mehta</div>
                                <div className="truncate text-[10px] text-[#7a8fa6]">HR Admin</div>
                            </button>
                            <button
                                type="button"
                                onClick={() => router.push("/login")}
                                className="rounded-[7px] p-1.5 text-[#7a8fa6] transition-all hover:bg-[rgba(239,68,68,0.1)] hover:text-[#ef4444]"
                                aria-label="Sign out"
                                title="Sign out"
                            >
                                <LogOut size={14} aria-hidden="true" />
                            </button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
