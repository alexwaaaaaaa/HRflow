"use client";

import Page from "@/components/ui/Page";
import React from 'react';
import { BarChart2, ArrowLeft, Download, Eye, FileText } from 'lucide-react';
import Link from 'next/link';

const REPORTS = [
    { name: 'Monthly Payroll Summary', category: 'Payroll', format: 'Excel', desc: 'Full payroll register with CTC, deductions, and net salary for all employees', views: 4800 },
    { name: 'PF ECR Challan Report', category: 'Compliance', format: 'Text', desc: 'EPFO-ready ECR file format for online PF remittance', views: 3900 },
    { name: 'ESI Contribution Report', category: 'Compliance', format: 'Excel', desc: 'Employee and employer ESI contributions with challan details', views: 2800 },
    { name: 'Form 24Q TDS Report', category: 'Tax', format: 'FVU', desc: 'TDS quarterly return file for e-filing on TRACES portal', views: 2400 },
    { name: 'Leave Balance Summary', category: 'Leave', format: 'Excel', desc: 'Current leave balances by type for all employees', views: 2100 },
    { name: 'New Joinee Report', category: 'Employees', format: 'Excel', desc: 'Staff joined in the selected period with all compensation details', views: 1900 },
    { name: 'Attrition Report', category: 'HR Analytics', format: 'Excel', desc: 'Monthly attrition rate by department, level, and exit reason', views: 1700 },
    { name: 'Gross-to-Net Statement', category: 'Payroll', format: 'PDF', desc: 'Earnings vs deductions waterfall report for audit purposes', views: 1600 },
    { name: 'CTC-wise Headcount Report', category: 'HR Analytics', format: 'Excel', desc: 'Employee count grouped by CTC bands and cost centers', views: 1400 },
    { name: 'Bank Advice / NEFT File', category: 'Payroll', format: 'Bank XML', desc: 'Direct upload-ready salary file for SBI, HDFC, ICICI, Axis', views: 1200 },
];

const FMT_COLOR: Record<string, string> = {
    'Excel': 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    'PDF': 'text-red-400 bg-red-500/10 border-red-500/20',
    'Text': 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
    'FVU': 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    'Bank XML': 'text-blue-400 bg-blue-500/10 border-blue-500/20',
};

export default function SampleReportsScreen() {
    return (
        <Page
            title="Sample Reports"
            subtitle="Download sample outputs for all 25 HRFlow report formats"
            breadcrumbs={[{ label: "Help", href: "/help" }, { label: "Sample Reports" }]}
            maxWidth="1100px"
        >

        <div className="min-h-screen p-6 max-w-5xl mx-auto space-y-6">
            <Link href="/help" className="text-[#556677] hover:text-white text-sm font-bold flex items-center gap-1 mb-2"><ArrowLeft size={14} /> Help Center</Link>
            <div>
                <h1 className="text-2xl font-bold text-white flex items-center gap-3"><BarChart2 size={22} className="text-orange-400" /> Sample Reports</h1>
                <p className="text-[#8899AA] text-sm mt-1">Download sample outputs for all 25 HRFlow report formats</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
                {REPORTS.map((report, i) => (
                    <div key={i} className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-5 flex items-start gap-4 hover:border-orange-500/20 transition-all group cursor-pointer">
                        <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0">
                            <FileText size={18} className="text-orange-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-start gap-2 flex-wrap">
                                <h3 className="text-white font-semibold text-sm group-hover:text-orange-300 transition-colors">{report.name}</h3>
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${FMT_COLOR[report.format] ?? FMT_COLOR['Excel']}`}>{report.format}</span>
                            </div>
                            <p className="text-[#8899AA] text-xs mt-1 leading-relaxed">{report.desc}</p>
                            <div className="flex items-center gap-3 mt-2 text-[10px] text-[#556677]">
                                <span className="px-2 py-0.5 bg-[#1A2A3A] rounded">{report.category}</span>
                                <span className="flex items-center gap-1"><Eye size={10} /> {report.views.toLocaleString()} downloads</span>
                            </div>
                        </div>
                        <button className="shrink-0 w-8 h-8 rounded-lg bg-[#131B2B] border border-[#2A3A4A] hover:border-orange-500/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                            <Download size={14} className="text-orange-400" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    
        </Page>
    );
}
