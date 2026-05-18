"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard, FileText, Calendar, FileCheck, Scale, FileSignature,
    Briefcase, Activity, ShieldCheck, PieChart, CreditCard, Building2, Ticket,
    Settings, ShieldAlert, BookOpen, Zap, Heart, Baby
} from 'lucide-react';

const COMPLIANCE_NAV = [
    {
        label: "DASHBOARD",
        items: [
            { name: "Compliance Dashboard", href: "/compliance/dashboard", icon: LayoutDashboard },
            { name: "Compliance Calendar", href: "/compliance/calendar", icon: Calendar },
            { name: "Labour Law Calendar", href: "/compliance/labour-law-calendar", icon: BookOpen },
        ]
    },
    {
        label: "EPFO (PROVIDENT FUND)",
        items: [
            { name: "PF Challan", href: "/compliance/pf-challan", icon: CreditCard },
            { name: "PF ECR File", href: "/compliance/pf-ecr", icon: FileText },
            { name: "PF Reconciliation", href: "/compliance/pf-reconciliation", icon: Activity },
            { name: "PF Annual Returns", href: "/compliance/pf-returns", icon: FileCheck },
            { name: "UAN Generation", href: "/compliance/uan-generation", icon: ShieldCheck },
            { name: "UAN Activation", href: "/compliance/uan-activation", icon: Zap },
            { name: "KYC Verification", href: "/compliance/kyc-verification", icon: ShieldAlert },
            { name: "PF Nomination", href: "/compliance/pf-nomination", icon: FileSignature },
            { name: "PF Transfer", href: "/compliance/pf-transfer-activation", icon: Ticket },
            { name: "PF Withdrawal", href: "/compliance/pf-withdrawal", icon: Briefcase },
        ]
    },
    {
        label: "ESIC (STATE INSURANCE)",
        items: [
            { name: "ESI Challan", href: "/compliance/esi-challan", icon: CreditCard },
            { name: "ESI Reconciliation", href: "/compliance/esi-reconciliation", icon: Activity },
            { name: "ESIC IP Number", href: "/compliance/esic-ip-number", icon: FileText },
            { name: "ESIC Card", href: "/compliance/esic-card", icon: ShieldCheck },
            { name: "ESIC Nomination", href: "/compliance/esic-nomination", icon: Heart },
        ]
    },
    {
        label: "INCOME TAX (TDS)",
        items: [
            { name: "TDS Challan (ITNS 281)", href: "/compliance/tds-challan", icon: CreditCard },
            { name: "TDS Return 24Q", href: "/compliance/tds-return-24q", icon: FileCheck },
            { name: "TDS Return 26Q", href: "/compliance/tds-return-26q", icon: FileCheck },
            { name: "TRACES Integration", href: "/compliance/traces", icon: Activity },
        ]
    },
    {
        label: "PT & LABOUR FUNDS",
        items: [
            { name: "PT Challan", href: "/compliance/pt-challan", icon: CreditCard },
            { name: "PT Registration", href: "/compliance/pt-registration", icon: Building2 },
            { name: "LWF", href: "/compliance/lwf", icon: Scale },
        ]
    },
    {
        label: "STATUTORY ACTS",
        items: [
            { name: "Factories Act", href: "/compliance/factories-act", icon: Building2 },
            { name: "Shop & Establishment", href: "/compliance/shop-act", icon: Building2 },
            { name: "Contract Labour", href: "/compliance/contract-labour", icon: Briefcase },
            { name: "Maternity Benefit", href: "/compliance/maternity-benefit", icon: Baby },
            { name: "POSH Annual Report", href: "/compliance/posh-report", icon: Scale },
        ]
    },
    {
        label: "AUDIT & REGISTERS",
        items: [
            { name: "Statutory Register", href: "/compliance/statutory-register", icon: FileText },
            { name: "Gazette Monitor", href: "/compliance/gazette-monitor", icon: BookOpen },
            { name: "Filing Acknowledgement", href: "/compliance/filing-acknowledgement", icon: FileCheck },
            { name: "Statutory Reports", href: "/compliance/statutory-reports", icon: PieChart },
            { name: "Penalty Calculator", href: "/compliance/penalty-calculator", icon: Activity },
            { name: "Inspector Ready", href: "/compliance/inspector-ready", icon: ShieldAlert },
            { name: "Compliance Health", href: "/compliance/health-score", icon: ShieldCheck },
        ]
    },
    {
        label: "SETTINGS",
        items: [
            { name: "Compliance Settings", href: "/compliance/settings", icon: Settings },
            { name: "Digital Signature", href: "/compliance/digital-signature", icon: FileSignature },
        ]
    }
];

export default function ComplianceSidebar() {
    const pathname = usePathname();

    return (
        <div style={{ width: 260, background: "#060B14", borderRight: "1px solid #1A2A3A" }} className="flex flex-col h-[calc(100vh-64px)] overflow-hidden sticky top-[64px] z-40">

            {/* Header */}
            <div style={{ padding: "16px 20px", borderBottom: "1px solid #1A2A3A" }}>
                <h2 style={{ fontSize: 15, fontWeight: 700, color: "#FFFFFF", margin: 0 }}>Compliance</h2>
                <p style={{ fontSize: 11, color: "#8899AA", marginTop: 2 }}>Statutory & Labour Law Hub</p>
            </div>

            {/* Nav */}
            <div className="flex-1 overflow-y-auto scrollbar-none pb-12" style={{ padding: "12px 8px" }}>
                {COMPLIANCE_NAV.map((group, idx) => (
                    <div key={idx} style={{ marginBottom: 20 }}>
                        <div style={{ fontSize: 9, fontWeight: 800, color: "#7a8fa6", padding: "0 12px", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.8px" }}>
                            {group.label}
                        </div>
                        <div className="flex flex-col gap-0.5">
                            {group.items.map(item => {
                                const Icon = item.icon;
                                const active = pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/compliance/dashboard');
                                return (
                                    <Link key={item.name} href={item.href} style={{ textDecoration: 'none' }}>
                                        <div
                                            style={{
                                                padding: "8px 12px", borderRadius: 7, display: "flex", alignItems: "center", gap: 10,
                                                background: active ? "rgba(59, 130, 246, 0.12)" : "transparent",
                                                color: active ? "#3B82F6" : "#7799AA",
                                                borderLeft: active ? "2px solid #3B82F6" : "2px solid transparent",
                                                transition: "all 0.15s"
                                            }}
                                            className={!active ? "hover:bg-[#0D1928] hover:text-[#CCDDEE]" : ""}
                                        >
                                            <Icon size={14} />
                                            <span style={{ fontSize: 12, fontWeight: active ? 600 : 400, lineHeight: 1.2 }}>{item.name}</span>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
