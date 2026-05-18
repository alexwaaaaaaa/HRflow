"use client";

import Page from "@/components/ui/Page";
import React from 'react';
import { Target, Search, Download, FileText, CheckCircle2, ChevronRight } from 'lucide-react';

export default function DiversityReportsScreen() {
    const REPORTS = [
        { title: 'BRSR Report (ESG Framework)', type: 'Statutory', desc: 'Pre-formatted Business Responsibility and Sustainability Report data for Indian regulatory compliance.', date: 'Available for FY25', status: 'ready' },
        { title: 'Global Gender Equality Index Data', type: 'Framework', desc: 'Metrics formatted for submission to international equality indices (e.g., Bloomberg GEI).', date: 'Last run: Oct 2025', status: 'ready' },
        { title: 'Quarterly Diversity Board Pack', type: 'Internal', desc: 'High-level presentation ready export of D&I goals vs actuals for the Board of Directors.', date: 'Q3 FY26 Draft', status: 'draft' },
        { title: 'US EEOC Data Export (EEO-1)', type: 'Statutory', desc: 'Demographic compliance data for US-based employees.', date: 'Action Required', status: 'action' },
    ];

    return (
        <Page
            title="Statutory D&I Reports"
            subtitle="Generate compliant data dumps for BRSR, EEOC, and ESG framework submissions."
            breadcrumbs={[{ label: "Workforce Analytics", href: "/workforce-analytics" }, { label: "Diversity Reports" }]}
            maxWidth="1100px"
        >

        <div className="min-h-screen p-6 max-w-5xl mx-auto space-y-6">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3"><FileText size={24} className="text-rose-400" /> Statutory D&I Reports</h1>
                    <p className="text-[#8899AA] text-sm mt-1">Generate compliant data dumps for BRSR, EEOC, and ESG framework submissions.</p>
                </div>
            </div>

            <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl overflow-hidden">
                <div className="p-4 border-b border-[#1A2A3A] bg-[#060D1A] flex items-center justify-between">
                    <div className="relative w-64">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#556677]" />
                        <input type="text" placeholder="Search reports..."
                            className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-lg pl-9 pr-3 py-1.5 text-white text-xs outline-none" />
                    </div>
                    <select className="bg-[#131B2B] border border-[#2A3A4A] px-3 py-1.5 rounded-lg text-xs text-[#8899AA] outline-none">
                        <option>Filter Category</option>
                        <option>Statutory (India)</option>
                        <option>Statutory (Global)</option>
                        <option>Internal Frameworks</option>
                    </select>
                </div>

                <div className="divide-y divide-[#1A2A3A]">
                    {REPORTS.map((rpt, i) => (
                        <div key={i} className="p-6 hover:bg-[#131B2B]/50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h3 className="text-white font-bold text-lg">{rpt.title}</h3>
                                    <span className="bg-[#1A2A3A] text-[#AABBCC] text-[10px] uppercase font-bold px-2 py-0.5 rounded border border-[#2A3A4A]">{rpt.type}</span>
                                </div>
                                <p className="text-[#556677] text-sm mb-3">{rpt.desc}</p>

                                <div className="flex items-center gap-2 text-xs font-bold text-[#8899AA]">
                                    {rpt.status === 'ready' ? <CheckCircle2 size={14} className="text-emerald-500" /> : <Target size={14} className="text-amber-500" />}
                                    {rpt.date}
                                </div>
                            </div>

                            <div className="flex items-center gap-3 md:pl-6 md:border-l border-[#1A2A3A]">
                                <button className="flex-1 md:flex-none border border-[#2A3A4A] hover:bg-[#131B2B] text-white px-4 py-2 rounded-xl text-sm font-bold transition-colors text-center whitespace-nowrap">
                                    Preview Data
                                </button>
                                <button className={`flex-1 md:flex-none px-4 py-2 rounded-xl text-sm font-bold transition-colors text-center flex items-center justify-center gap-2 whitespace-nowrap ${rpt.status === 'action' ? 'bg-amber-600 hover:bg-amber-500 text-white' : 'bg-rose-600 hover:bg-rose-500 text-white shadow-[0_0_15px_rgba(225,29,72,0.3)]'}`}>
                                    <Download size={16} /> {rpt.status === 'action' ? 'Generate Target' : 'Export File'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="p-4 bg-[#060D1A] border-t border-[#1A2A3A] text-center">
                    <button className="text-[#8899AA] hover:text-white text-xs font-bold flex items-center justify-center gap-1 mx-auto transition-colors">
                        Request custom data extraction <ChevronRight size={14} />
                    </button>
                </div>
            </div>
        </div>
    
        </Page>
    );
}
