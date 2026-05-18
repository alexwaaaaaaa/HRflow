"use client";

import Page from "@/components/ui/Page";

import React from 'react';
import {
    Search, ShieldCheck, Download, Activity, Eye, FileText, User,
    Trash2, AlertCircle, Calendar, UploadCloud
} from 'lucide-react';

const AUDIT_LOGS = [
    { id: 'AL-902', action: 'Downloaded File', item: 'Q3_Financials_Internal.pdf', user: 'Amit Desai (Finance Dept)', ip: '112.19.45.12', time: '10 mins ago', type: 'activity' },
    { id: 'AL-901', action: 'Modified Permissions', item: 'Employee_Records_Folder', user: 'HR Admin', ip: '192.168.1.5 (Internal VPN)', time: '2 hrs ago', type: 'security', risk: 'high' },
    { id: 'AL-900', action: 'Deleted File', item: 'Old_Draft_Policy_v1.docx', user: 'Rahul Sharma', ip: '14.139.60.209', time: '3 hrs ago', type: 'critical', risk: 'medium' },
    { id: 'AL-899', action: 'Viewed File', item: 'Appointment_Letter_Amit.pdf', user: 'System (Automated Workflow)', ip: '10.0.0.12', time: '5 hrs ago', type: 'activity' },
    { id: 'AL-898', action: 'Uploaded File', item: 'NDA_Signed_Client_X.pdf', user: 'Priya P.', ip: '112.19.45.16', time: '1 day ago', type: 'activity' },
];

export default function DocumentAuditScreen() {
    return (
        <Page
            title="Document Audit Trail"
            subtitle="Immutable log of all interactions, permission changes, and document lifecycle events."
            breadcrumbs={[{ label: "Documents", href: "/documents" }, { label: "Audit" }]}
            maxWidth="1400px"
        >

        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200 flex flex-col h-screen">
            <div className="max-w-[1400px] mx-auto w-full flex flex-col flex-1">

                {/* Header */}
                <div className="flex justify-between items-center mb-6 shrink-0">
                    <div>
                        <h1 className="text-2xl font-bold text-white mb-1 flex items-center gap-3">
                            <ShieldCheck className="text-rose-500" size={28} />
                            Document Audit Trail
                        </h1>
                        <p className="text-sm text-[#8899AA]">Immutable log of all interactions, permission changes, and document lifecycle events.</p>
                    </div>
                    <div className="flex space-x-3">
                        <button className="px-4 py-2 border border-rose-500/50 bg-rose-500/10 text-xs font-bold rounded-lg hover:bg-rose-500 hover:text-white transition-colors flex items-center text-rose-500 shadow-sm">
                            <Activity size={16} className="mr-2" /> Alerting active
                        </button>
                        <button className="px-4 py-2 bg-[#0066FF] text-white font-bold text-sm rounded-lg hover:bg-[#0052cc] transition-colors shadow-[0_0_15px_rgba(0,102,255,0.3)] flex items-center gap-2">
                            <Download size={16} /> Export Logs (CSV)
                        </button>
                    </div>
                </div>

                {/* Toolbar */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-3 mb-6 shrink-0 flex flex-wrap gap-3 items-center shadow-sm">
                    <div className="flex-1 min-w-[300px] relative">
                        <Search size={16} className="absolute left-3 top-2.5 text-[#556677]" />
                        <input
                            type="text"
                            placeholder="Search by file name, action, user, or IP..."
                            className="w-full bg-[#060B14] border border-[#1A2A3A] text-sm text-white rounded-lg pl-9 pr-3 py-2 outline-none focus:border-[#0066FF] transition-colors"
                        />
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <select className="bg-[#060B14] border border-[#1A2A3A] text-sm text-white px-3 py-2 rounded-lg outline-none focus:border-[#0066FF]">
                            <option>All Actions</option>
                            <option>Viewed</option>
                            <option>Downloaded</option>
                            <option>Modified</option>
                            <option>Deleted</option>
                            <option>Permission Changed</option>
                        </select>
                        <div className="flex items-center gap-2 bg-[#060B14] border border-[#1A2A3A] px-3 py-1 rounded-lg">
                            <Calendar size={14} className="text-[#8899AA]" />
                            <select className="bg-transparent text-sm text-white outline-none border-none">
                                <option>Last 7 Days</option>
                                <option>Last 30 Days</option>
                                <option>This Quarter</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Data Table */}
                <div className="flex-1 bg-[#0A1420] border border-[#1A2A3A] rounded-xl shadow-lg flex flex-col min-h-0 overflow-hidden relative">
                    {/* Watermark/Stamp */}
                    <div className="absolute right-8 bottom-8 pointer-events-none opacity-5 flex flex-col items-center">
                        <ShieldCheck size={120} />
                        <div className="font-bold text-2xl tracking-widest mt-2 uppercase">SECURE AUDIT_LOG</div>
                    </div>

                    <div className="overflow-x-auto overflow-y-auto flex-1 custom-scrollbar z-10">
                        <table className="w-full text-left border-collapse whitespace-nowrap">
                            <thead className="bg-[#060B14] sticky top-0 border-b border-[#1A2A3A]">
                                <tr>
                                    <th className="p-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Timestamp</th>
                                    <th className="p-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">User / Agent</th>
                                    <th className="p-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Action Event</th>
                                    <th className="p-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Target Resource</th>
                                    <th className="p-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">IP Address</th>
                                    <th className="p-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider border-l border-[#1A2A3A]">Risk Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#1A2A3A]">
                                {AUDIT_LOGS.map((log) => (
                                    <tr key={log.id} className="hover:bg-[#1A2A3A]/20 transition-colors font-mono text-sm group">
                                        <td className="p-4 text-[#8899AA] whitespace-nowrap">{log.time}</td>
                                        <td className="p-4 flex items-center gap-2 text-white">
                                            <User size={14} className="text-[#556677]" />
                                            {log.user}
                                        </td>
                                        <td className="p-4 font-bold text-slate-300 flex items-center gap-2">
                                            {log.action.includes('Viewed') && <Eye size={14} className="text-emerald-500" />}
                                            {log.action.includes('Downloaded') && <Download size={14} className="text-[#0066FF]" />}
                                            {log.action.includes('Permissions') && <ShieldCheck size={14} className="text-amber-500" />}
                                            {log.action.includes('Deleted') && <Trash2 size={14} className="text-rose-500" />}
                                            {log.action.includes('Uploaded') && <UploadCloud size={14} className="text-indigo-500" />}
                                            {log.action}
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-2 max-w-xs truncate text-[#0066FF] group-hover:underline cursor-pointer">
                                                <FileText size={14} className="shrink-0" />
                                                <span className="truncate">{log.item}</span>
                                            </div>
                                        </td>
                                        <td className="p-4 text-[#556677]">{log.ip}</td>
                                        <td className="p-4 border-l border-[#1A2A3A]/50">
                                            {log.risk ? (
                                                <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border border-current 
                                                    ${log.risk === 'high' ? 'bg-rose-500/10 text-rose-500' : 'bg-amber-500/10 text-amber-500'}`}>
                                                    <AlertCircle size={10} /> {log.risk} RISK
                                                </span>
                                            ) : (
                                                <span className="text-[#556677] text-xs">Standard</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    
        </Page>
    );
}
