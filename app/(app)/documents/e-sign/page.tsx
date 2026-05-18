"use client";

import Page from "@/components/ui/Page";

import React from 'react';
import {
    Signature, UploadCloud, Search, CheckCircle2, AlertCircle, Clock,
    FileText, ArrowRight, UserCheck, ChevronRight, Activity
} from 'lucide-react';
import Link from 'next/link';

const ESIGN_REQUESTS = [
    { id: 'REQ-01', title: 'Q3 Independent Contractor Agreement', sender: 'HR Admin', recipient: 'Rahul Sharma', sent: 'Today, 09:30 AM', status: 'Pending', type: 'Signature', urgent: true },
    { id: 'REQ-02', title: 'Revised Code of Conduct 2024', sender: 'Compliance', recipient: 'All Staff (200/250 Done)', sent: '01 Nov 2024', status: 'In Progress', type: 'Acknowledgement', urgent: false },
    { id: 'REQ-03', title: 'Offer Letter - Amit Kumar', sender: 'Recruitment', recipient: 'Amit Kumar', sent: '05 Nov 2024', status: 'Completed', type: 'Signature', urgent: false },
    { id: 'REQ-04', title: 'NDA - Tech Vendor A', sender: 'Legal', recipient: 'Vendor A Contact', sent: '10 Nov 2024', status: 'Declined', type: 'Signature', urgent: false },
];

export default function ESignDashboardScreen() {
    return (
        <Page
            title="E-Signature Gateway"
            subtitle="Manage document signatures and acknowledgements legally and securely."
            breadcrumbs={[{ label: "Documents", href: "/documents" }, { label: "E Sign" }]}
            maxWidth="1200px"
        >

        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-[1200px] mx-auto pb-12">

                {/* Header Actions */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-white mb-1 flex items-center gap-3">
                            <Signature className="text-[#00E5A0]" size={28} />
                            E-Signature Gateway
                        </h1>
                        <p className="text-sm text-[#8899AA]">Manage document signatures and acknowledgements legally and securely.</p>
                    </div>
                    <div className="flex gap-3">
                        <Link href="/documents/e-sign/workflow" className="px-5 py-2.5 bg-[#00E5A0] text-[#060B14] font-bold text-sm rounded-lg hover:bg-[#00c98d] transition-colors shadow-[0_0_15px_rgba(0,229,160,0.3)] flex items-center gap-2">
                            New Request <ArrowRight size={16} />
                        </Link>
                    </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl p-5 shadow-lg flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-[#0066FF]/10 text-[#0066FF] flex items-center justify-center shrink-0">
                            <UploadCloud size={24} />
                        </div>
                        <div>
                            <div className="text-2xl font-black text-white leading-none mb-1">45</div>
                            <div className="text-xs text-[#8899AA] uppercase tracking-wider font-bold">Sent (MTD)</div>
                        </div>
                    </div>
                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl p-5 shadow-lg flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
                            <Clock size={24} />
                        </div>
                        <div>
                            <div className="text-2xl font-black text-white leading-none mb-1">12</div>
                            <div className="text-xs text-[#8899AA] uppercase tracking-wider font-bold">Pending</div>
                        </div>
                    </div>
                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl p-5 shadow-lg flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-[#00E5A0]/10 text-[#00E5A0] flex items-center justify-center shrink-0">
                            <CheckCircle2 size={24} />
                        </div>
                        <div>
                            <div className="text-2xl font-black text-white leading-none mb-1">32</div>
                            <div className="text-xs text-[#8899AA] uppercase tracking-wider font-bold">Completed</div>
                        </div>
                    </div>
                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl p-5 shadow-lg flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center shrink-0">
                            <AlertCircle size={24} />
                        </div>
                        <div>
                            <div className="text-2xl font-black text-white leading-none mb-1">1</div>
                            <div className="text-xs text-[#8899AA] uppercase tracking-wider font-bold">Declined</div>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex gap-4 mb-6">
                    <div className="relative flex-1 max-w-sm">
                        <Search size={16} className="absolute left-3 top-2.5 text-[#556677]" />
                        <input type="text" placeholder="Search requests..." className="w-full bg-[#0A1420] border border-[#1A2A3A] text-sm text-white rounded-lg pl-9 pr-3 py-2 outline-none focus:border-[#0066FF] transition-colors" />
                    </div>
                    <select className="bg-[#0A1420] border border-[#1A2A3A] text-sm text-white rounded-lg px-3 py-2 outline-none focus:border-[#0066FF]">
                        <option>All Statuses</option>
                        <option>Pending</option>
                        <option>Completed</option>
                        <option>Declined</option>
                    </select>
                </div>

                {/* List View */}
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl shadow-lg overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-[#060B14]">
                            <tr>
                                <th className="p-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Document Details</th>
                                <th className="p-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Recipient(s)</th>
                                <th className="p-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Sent Date</th>
                                <th className="p-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Status</th>
                                <th className="p-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1A2A3A]">
                            {ESIGN_REQUESTS.map(req => (
                                <tr key={req.id} className="hover:bg-[#1A2A3A]/30 transition-colors group cursor-pointer">
                                    <td className="p-4">
                                        <div className="flex items-start gap-3">
                                            <div className="mt-1">
                                                <FileText size={18} className="text-[#0066FF]" />
                                            </div>
                                            <div>
                                                <div className="font-bold text-white text-sm mb-1 flex items-center gap-2">
                                                    {req.title}
                                                    {req.urgent && <span className="text-[10px] bg-rose-500/10 text-rose-500 border border-rose-500/30 px-1.5 py-0.5 rounded uppercase font-black">Urgent</span>}
                                                </div>
                                                <div className="text-xs text-[#8899AA]">Sent by: {req.sender} • {req.type}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2 text-sm text-slate-300">
                                            <UserCheck size={14} className="text-[#556677]" /> {req.recipient}
                                        </div>
                                    </td>
                                    <td className="p-4 text-sm text-[#8899AA]">{req.sent}</td>
                                    <td className="p-4">
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-bold uppercase tracking-wider border border-current
                                            ${req.status === 'Completed' ? 'bg-[#00E5A0]/10 text-[#00E5A0]' :
                                                req.status === 'Pending' ? 'bg-amber-500/10 text-amber-500' :
                                                    req.status === 'Declined' ? 'bg-rose-500/10 text-rose-500' :
                                                        'bg-[#0066FF]/10 text-[#0066FF]'}`}>
                                            {req.status === 'Completed' && <CheckCircle2 size={12} />}
                                            {req.status === 'Pending' && <Clock size={12} />}
                                            {req.status === 'Declined' && <AlertCircle size={12} />}
                                            {req.status === 'In Progress' && <Activity size={12} />}
                                            {req.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <button className="text-sm font-semibold text-[#0066FF] hover:text-white transition-colors flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100">
                                            View Details <ChevronRight size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    
        </Page>
    );
}
