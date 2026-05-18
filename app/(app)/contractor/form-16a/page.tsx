"use client";

import Page from "@/components/ui/Page";
import React from 'react';
import { FileCheck, ArrowLeft, Download, Mail, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

const CERTS = [
    { contractor: 'Acme Design Agency', pan: 'ABCDE1234F', qtr: 'Q3 FY 2025-26', tds: 45000, status: 'Generated', sent: true },
    { contractor: 'Raj Gupta', pan: 'XYZPQ5678G', qtr: 'Q3 FY 2025-26', tds: 12000, status: 'Generated', sent: true },
    { contractor: 'Secure IT Services', pan: 'ITSEC9876H', qtr: 'Q3 FY 2025-26', tds: 8400, status: 'Generated', sent: false },
    { contractor: 'Priya Sharma', pan: 'PRSHA3456K', qtr: 'Q3 FY 2025-26', tds: 6500, status: 'Generated', sent: false },
];

export default function Form16AScreen() {
    return (
        <Page
            title="Form 16A Generation"
            subtitle="Generate and distribute quarterly TDS certificates to contractors"
            breadcrumbs={[{ label: "Contractor", href: "/contractor" }, { label: "Form 16a" }]}
            maxWidth="1100px"
        >

        <div className="min-h-screen p-6 max-w-5xl mx-auto space-y-6">
            <Link href="/contractor/list" className="text-[#556677] hover:text-white text-sm font-bold flex items-center gap-1 mb-2"><ArrowLeft size={14} /> Contractor Payroll</Link>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3"><FileCheck size={22} className="text-emerald-400" /> Form 16A Generation</h1>
                    <p className="text-[#8899AA] text-sm mt-1">Generate and distribute quarterly TDS certificates to contractors</p>
                </div>
            </div>

            <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6">
                <h3 className="text-white font-bold mb-4">Upload TRACES Conso File</h3>
                <p className="text-[#8899AA] text-sm mb-4">To generate Form 16A, first file your Form 26Q return, then download the consolidated file from the TRACES portal and upload it here. HRFlow will auto-generate and email the certificates with digital signatures.</p>
                <div className="border-2 border-dashed border-[#2A3A4A] rounded-xl p-8 text-center hover:border-emerald-500/50 cursor-pointer transition-colors bg-[#060D1A]">
                    <Download size={24} className="mx-auto mb-2 text-[#445566]" />
                    <div className="text-white text-sm font-semibold">Drop TRACES .zip file here</div>
                    <div className="text-[#556677] text-xs mt-1">Make sure you have the password ready to extract</div>
                </div>
            </div>

            <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl overflow-hidden flex flex-col">
                <div className="p-4 border-b border-[#1A2A3A] flex items-center justify-between bg-[#060D1A]">
                    <span className="text-white font-bold text-sm">Generated Certificates (Q3 FY 2025-26)</span>
                    <button className="flex items-center gap-2 bg-[#131B2B] hover:bg-[#1A2A3A] border border-[#2A3A4A] text-white font-bold px-3 py-1.5 rounded-lg text-xs transition-colors">
                        <Mail size={14} /> Send All Pending
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="text-[#8899AA] text-xs uppercase tracking-wider bg-[#0A1420]">
                            <tr>
                                <th className="px-5 py-3 text-left font-bold border-b border-[#1A2A3A]">Contractor / PAN</th>
                                <th className="px-5 py-3 text-left font-bold border-b border-[#1A2A3A]">Quarter</th>
                                <th className="px-5 py-3 text-right font-bold border-b border-[#1A2A3A]">TDS Amount</th>
                                <th className="px-5 py-3 text-center font-bold border-b border-[#1A2A3A]">Status</th>
                                <th className="px-5 py-3 text-right font-bold border-b border-[#1A2A3A]">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1A2A3A]">
                            {CERTS.map((cert, i) => (
                                <tr key={i} className="hover:bg-[#131B2B] transition-colors">
                                    <td className="px-5 py-3">
                                        <div className="text-white font-semibold text-xs">{cert.contractor}</div>
                                        <div className="text-[#556677] text-[10px] font-mono mt-0.5">{cert.pan}</div>
                                    </td>
                                    <td className="px-5 py-3 text-[#AABBCC] text-xs">{cert.qtr}</td>
                                    <td className="px-5 py-3 text-right text-red-400 font-bold">₹{cert.tds.toLocaleString()}</td>
                                    <td className="px-5 py-3 text-center pt-4">
                                        {cert.sent ? (
                                            <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1 w-max mx-auto"><CheckCircle2 size={10} /> Emailed</span>
                                        ) : (
                                            <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded text-[10px] font-bold">Generated</span>
                                        )}
                                    </td>
                                    <td className="px-5 py-3 text-right">
                                        <div className="flex items-center gap-2 justify-end">
                                            <button className="text-[#556677] hover:text-emerald-400 p-1 rounded" title="Download PDF"><Download size={14} /></button>
                                            <button className={`p-1 rounded ${cert.sent ? 'text-[#3A4A5A] cursor-not-allowed' : 'text-[#556677] hover:text-emerald-400'}`} title="Email to Contractor" disabled={cert.sent}><Mail size={14} /></button>
                                        </div>
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
