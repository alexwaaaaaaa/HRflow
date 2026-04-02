"use client";

import { FileText, Download, BarChart2, Briefcase, FileSpreadsheet, HardDrive, ShieldCheck } from "lucide-react";
import Button from "@/components/ui/Button";

// --- Mock Data ---
const HARDWARE_REPORTS = [
    {
        id: "rep-hw-01",
        title: "Asset Inventory Master List",
        description: "Complete dump of all active, inactive, and maintained hardware.",
        icon: <FileText className="text-[#8899AA]" size={20} aria-hidden="true" />,
        exportFormat: "CSV" as const
    },
    {
        id: "rep-hw-02",
        title: "Upcoming Warranty Expirations",
        description: "Assets with warranties expiring in next 90 days.",
        icon: <FileSpreadsheet className="text-[#8899AA]" size={20} aria-hidden="true" />,
        exportFormat: "CSV" as const
    }
];

const COMPLIANCE_REPORTS = [
    {
        id: "rep-comp-01",
        title: "SaaS License Utilization",
        description: "Under-utilized and fully consumed software subscriptions.",
        icon: <FileText className="text-[#8899AA]" size={20} aria-hidden="true" />,
        exportFormat: "CSV" as const
    },
    {
        id: "rep-comp-02",
        title: "Access Audit Log",
        description: "SOC2 Compliance report: all access grants and revocations.",
        icon: <ShieldCheck className="text-[#8899AA]" size={20} aria-hidden="true" />,
        exportFormat: "PDF" as const
    }
];

export default function ITReportsScreen() {
    return (
        <main className="px-8 py-6 pb-16 animate-fade-in relative max-w-6xl mx-auto min-h-screen">
            {/* Page Header */}
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white m-0 tracking-tight">IT Reports Library</h1>
                    <p className="text-sm text-[#8899AA] mt-1.5">Standardized reports for compliance, finance, and operations</p>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">

                {/* Hardware Reports Section */}
                <section className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl shadow-sm overflow-hidden flex flex-col" aria-labelledby="hardware-reports-heading">
                    <header className="flex items-center gap-4 p-6 border-b border-[#1A2A3A] bg-[#0A1420]/50">
                        <div className="w-12 h-12 rounded-xl bg-[#0066FF]/10 border border-[#0066FF]/20 text-[#0066FF] flex items-center justify-center flex-shrink-0" aria-hidden="true">
                            <HardDrive size={24} />
                        </div>
                        <h2 id="hardware-reports-heading" className="text-xl font-bold text-white m-0">Hardware & Assets</h2>
                    </header>

                    <div className="p-6 flex-grow">
                        <ul className="space-y-4 m-0 p-0 list-none">
                            {HARDWARE_REPORTS.map((report) => (
                                <li key={report.id} className="p-4 rounded-xl border border-[#1A2A3A] bg-[#0A1420] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 group hover:border-[#334455] hover:bg-[#1A2A3A]/30 transition-all">
                                    <div className="flex items-start gap-4 flex-grow">
                                        <div className="mt-0.5 flex-shrink-0">{report.icon}</div>
                                        <div>
                                            <h3 className="text-sm font-bold text-white mb-1.5 leading-tight">{report.title}</h3>
                                            <p className="text-xs text-[#8899AA] leading-relaxed max-w-md">{report.description}</p>
                                        </div>
                                    </div>
                                    <Button
                                        variant="secondary"
                                        icon={<Download size={14} />}
                                        className="h-9 px-4 text-xs font-semibold sm:opacity-0 sm:group-hover:opacity-100 transition-opacity whitespace-nowrap"
                                        aria-label={`Download ${report.title} as ${report.exportFormat}`}
                                        title={`Download ${report.exportFormat}`}
                                    >
                                        {report.exportFormat}
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

                {/* Software & Compliance Reports Section */}
                <section className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl shadow-sm overflow-hidden flex flex-col" aria-labelledby="compliance-reports-heading">
                    <header className="flex items-center gap-4 p-6 border-b border-[#1A2A3A] bg-[#0A1420]/50">
                        <div className="w-12 h-12 rounded-xl bg-[#00E5A0]/10 border border-[#00E5A0]/20 text-[#00E5A0] flex items-center justify-center flex-shrink-0" aria-hidden="true">
                            <ShieldCheck size={24} />
                        </div>
                        <h2 id="compliance-reports-heading" className="text-xl font-bold text-white m-0">Software & Compliance</h2>
                    </header>

                    <div className="p-6 flex-grow">
                        <ul className="space-y-4 m-0 p-0 list-none">
                            {COMPLIANCE_REPORTS.map((report) => (
                                <li key={report.id} className="p-4 rounded-xl border border-[#1A2A3A] bg-[#0A1420] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 group hover:border-[#334455] hover:bg-[#1A2A3A]/30 transition-all">
                                    <div className="flex items-start gap-4 flex-grow">
                                        <div className="mt-0.5 flex-shrink-0">{report.icon}</div>
                                        <div>
                                            <h3 className="text-sm font-bold text-white mb-1.5 leading-tight">{report.title}</h3>
                                            <p className="text-xs text-[#8899AA] leading-relaxed max-w-md">{report.description}</p>
                                        </div>
                                    </div>
                                    <Button
                                        variant="secondary"
                                        icon={<Download size={14} />}
                                        className="h-9 px-4 text-xs font-semibold sm:opacity-0 sm:group-hover:opacity-100 transition-opacity whitespace-nowrap"
                                        aria-label={`Download ${report.title} as ${report.exportFormat}`}
                                        title={`Download ${report.exportFormat}`}
                                    >
                                        {report.exportFormat}
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>

            </div>
        </main>
    );
}
