"use client";

import Page from "@/components/ui/Page";

import React, { useState } from "react";
import { FileText, Download, Mail, PenTool, User, Check } from "lucide-react";

export default function CTCLetterGenerationPage() {
    const [template, setTemplate] = useState("Detailed with Breakup");
    const [language, setLanguage] = useState("English");

    return (
        <Page
            title="HRFlow Technologies"
            subtitle="Generate dynamic offer, revision, and appointment letters with e-signatures."
            breadcrumbs={[{ label: "Ctc Letters" }]}
            maxWidth="1400px"
        >

        <div className="min-h-screen bg-[#060B14] text-white p-6 font-sans">
            <div className="max-w-[1400px] mx-auto space-y-6">

                {/* Page Header */}
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">CTC Letter Generation</h2>
                        <p className="text-gray-400 text-sm mt-1">Generate dynamic offer, revision, and appointment letters with e-signatures.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Left Panel - Letter Configuration (5/12 columns) */}
                    <div className="lg:col-span-5 space-y-6">
                        <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl p-6 space-y-6">
                            <h3 className="text-lg font-semibold border-b border-[#1A2A3A] pb-3">Letter Configuration</h3>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Letter Type</label>
                                    <select className="w-full bg-[#060B14] border border-[#1A2A3A] text-white rounded-lg px-4 py-2.5 outline-none focus:border-[#00E5A0]">
                                        <option>Revision Letter</option>
                                        <option>Offer Letter</option>
                                        <option>Appointment Letter</option>
                                        <option>Increment Letter</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Employee</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                                        <input
                                            type="text"
                                            defaultValue="Kavya Nair (EMP004)"
                                            className="w-full bg-[#060B14] border border-[#1A2A3A] text-white rounded-lg pl-10 pr-4 py-2.5 outline-none focus:border-[#00E5A0]"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* CTC Details Card */}
                            <div className="bg-[#060B14] p-4 rounded-lg border border-[#1A2A3A] space-y-3">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-400">Current CTC:</span>
                                    <span className="font-medium text-gray-300 line-through">₹9,60,000</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-400">Revised CTC:</span>
                                    <span className="font-semibold text-[#00E5A0]">₹12,00,000</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-400">Effective Date:</span>
                                    <span className="font-medium">01/04/2025</span>
                                </div>
                            </div>

                            <div className="space-y-4 pt-2">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Template</label>
                                    <select
                                        value={template}
                                        onChange={(e) => setTemplate(e.target.value)}
                                        className="w-full bg-[#060B14] border border-[#1A2A3A] text-white rounded-lg px-4 py-2.5 outline-none focus:border-[#00E5A0]"
                                    >
                                        <option>Standard</option>
                                        <option>Detailed with Breakup</option>
                                        <option>Minimal</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-1">Signatory</label>
                                    <div className="grid grid-cols-2 gap-3">
                                        <input
                                            type="text"
                                            defaultValue="Vikram Mehta"
                                            className="bg-[#060B14] border border-[#1A2A3A] text-white rounded-lg px-3 py-2 text-sm outline-none focus:border-[#00E5A0]"
                                        />
                                        <input
                                            type="text"
                                            defaultValue="Finance Manager"
                                            className="bg-[#060B14] border border-[#1A2A3A] text-white rounded-lg px-3 py-2 text-sm outline-none focus:border-[#00E5A0]"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 pt-2">
                                    <label className="flex items-center gap-2 cursor-pointer group">
                                        <div className="w-5 h-5 rounded border border-[#00E5A0] bg-[#00E5A0]/20 flex items-center justify-center">
                                            <Check className="w-3 h-3 text-[#00E5A0]" />
                                        </div>
                                        <span className="text-sm text-gray-300 group-hover:text-white transition-colors">Digital Signature</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer group">
                                        <div className="w-5 h-5 rounded border border-[#00E5A0] bg-[#00E5A0]/20 flex items-center justify-center">
                                            <Check className="w-3 h-3 text-[#00E5A0]" />
                                        </div>
                                        <span className="text-sm text-gray-300 group-hover:text-white transition-colors">Company Stamp</span>
                                    </label>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Language</label>
                                    <div className="flex gap-2 p-1 bg-[#060B14] rounded-lg border border-[#1A2A3A]">
                                        {['English', 'Hindi'].map(lang => (
                                            <button
                                                key={lang}
                                                onClick={() => setLanguage(lang)}
                                                className={`flex-1 py-1.5 text-sm rounded-md transition-colors ${language === lang ? 'bg-[#1A2A3A] text-white font-medium' : 'text-gray-400 hover:text-gray-300'}`}
                                            >
                                                {lang}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="grid grid-cols-2 gap-3">
                            <button className="flex items-center justify-center gap-2 bg-[#00E5A0] hover:bg-[#00E5A0]/90 text-black py-3 rounded-lg text-sm font-bold transition-colors shadow-lg shadow-[#00E5A0]/20">
                                <FileText className="w-4 h-4" /> Generate PDF
                            </button>
                            <button className="flex items-center justify-center gap-2 bg-[#1A2A3A] hover:bg-[#1A2A3A]/80 text-white py-3 rounded-lg text-sm font-medium transition-colors">
                                <Mail className="w-4 h-4" /> Send via Email
                            </button>
                            <button className="flex items-center justify-center gap-2 bg-[#1A2A3A] hover:bg-[#1A2A3A]/80 text-white py-3 rounded-lg text-sm font-medium transition-colors">
                                <PenTool className="w-4 h-4" /> Request E-sign
                            </button>
                            <button className="flex items-center justify-center gap-2 bg-[#1A2A3A] hover:bg-[#1A2A3A]/80 text-white py-3 rounded-lg text-sm font-medium transition-colors">
                                <Download className="w-4 h-4" /> Download
                            </button>
                        </div>
                    </div>

                    {/* Right Panel - Live Preview (7/12 columns) */}
                    <div className="lg:col-span-7">
                        <div className="bg-white text-black min-h-[800px] rounded-sm shadow-2xl p-12 relative overflow-hidden transform origin-top transition-all duration-300" style={{ transform: 'scale(1)' }}>

                            {/* Paper Background/texture subtle hint */}
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-20 pointer-events-none"></div>

                            {/* Letterhead */}
                            <div className="flex justify-between items-start border-b-2 border-slate-200 pb-6 mb-8">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-blue-600 rounded flex items-center justify-center">
                                        <span className="text-white font-bold text-xl">HR</span>
                                    </div>
                                    <div>
                                        <h1 className="text-2xl font-bold tracking-tight text-slate-800">HRFlow Technologies</h1>
                                        <p className="text-sm text-slate-500">123 Tech Park, Bengaluru, Karnataka 560001</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-medium text-slate-600">Date: 01 April 2025</p>
                                    <p className="text-sm font-medium text-slate-600 mt-1">Ref: HRF/REV/2025/004</p>
                                </div>
                            </div>

                            {/* Body */}
                            <div className="space-y-6 text-slate-700 leading-relaxed max-w-2xl">
                                <p className="font-semibold text-lg text-slate-900">Dear Kavya Nair,</p>

                                <p>
                                    We are pleased to inform you that your Compensation package has been revised in recognition of your outstanding performance and contributions to HRFlow Technologies during the past year.
                                </p>

                                <p>
                                    Effective <strong className="text-slate-900">01 April 2025</strong>, your revised Cost to Company (CTC) will be <strong className="text-blue-600 text-lg">₹12,00,000</strong> per annum.
                                </p>

                                {template === 'Detailed with Breakup' && (
                                    <div className="my-8 border border-slate-200 rounded-lg overflow-hidden">
                                        <div className="bg-slate-50 py-3 px-4 border-b border-slate-200">
                                            <h4 className="font-semibold text-slate-800 text-sm tracking-wide uppercase">Compensation Breakup</h4>
                                        </div>
                                        <table className="w-full text-sm text-left">
                                            <thead>
                                                <tr className="bg-slate-100 text-slate-600">
                                                    <th className="py-2.5 px-4 font-semibold">Component</th>
                                                    <th className="py-2.5 px-4 font-semibold text-right">Monthly (₹)</th>
                                                    <th className="py-2.5 px-4 font-semibold text-right">Annual (₹)</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-200">
                                                <tr className="hover:bg-slate-50">
                                                    <td className="py-3 px-4 font-medium text-slate-800">Basic Salary</td>
                                                    <td className="py-3 px-4 text-right">40,000</td>
                                                    <td className="py-3 px-4 text-right">4,80,000</td>
                                                </tr>
                                                <tr className="hover:bg-slate-50">
                                                    <td className="py-3 px-4 font-medium text-slate-800">House Rent Allowance (HRA)</td>
                                                    <td className="py-3 px-4 text-right">16,000</td>
                                                    <td className="py-3 px-4 text-right">1,92,000</td>
                                                </tr>
                                                <tr className="hover:bg-slate-50">
                                                    <td className="py-3 px-4 font-medium text-slate-800">Special Allowance</td>
                                                    <td className="py-3 px-4 text-right">36,000</td>
                                                    <td className="py-3 px-4 text-right">4,32,000</td>
                                                </tr>
                                                <tr className="hover:bg-slate-50">
                                                    <td className="py-3 px-4 font-medium text-slate-800">Employer PF Contribution</td>
                                                    <td className="py-3 px-4 text-right">4,800</td>
                                                    <td className="py-3 px-4 text-right">57,600</td>
                                                </tr>
                                                <tr className="hover:bg-slate-50">
                                                    <td className="py-3 px-4 font-medium text-slate-800">Variable Pay Bonus (Target)</td>
                                                    <td className="py-3 px-4 text-right">3,200</td>
                                                    <td className="py-3 px-4 text-right">38,400</td>
                                                </tr>
                                            </tbody>
                                            <tfoot>
                                                <tr className="bg-blue-50/50 font-bold border-t-2 border-slate-300">
                                                    <td className="py-4 px-4 text-slate-800 text-base">Total Cost to Company</td>
                                                    <td className="py-4 px-4 text-right text-blue-700 text-base">1,00,000</td>
                                                    <td className="py-4 px-4 text-right text-blue-700 text-base">12,00,000</td>
                                                </tr>
                                            </tfoot>
                                        </table>
                                    </div>
                                )}

                                <p>
                                    All other terms and conditions of your employment remain unchanged as per your original appointment letter. We look forward to your continued dedication and commitment to the company's growth.
                                </p>

                                <p className="mt-6">
                                    Wishing you the very best.
                                </p>
                            </div>

                            {/* Signatures */}
                            <div className="mt-16 flex justify-between items-end border-t border-slate-100 pt-8">
                                <div className="space-y-4">
                                    <div className="w-40 h-16 relative">
                                        {/* Simulated e-signature */}
                                        <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/f/fb/John_Hancock_signature.svg')] opacity-60 bg-contain bg-no-repeat bg-center"></div>
                                        <div className="absolute inset-0 border-2 border-dashed border-slate-200 rounded-md -z-10"></div>
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-800">Vikram Mehta</p>
                                        <p className="text-sm text-slate-500">Finance Manager</p>
                                        <p className="text-xs text-slate-400 mt-1">Digitally signed on 01/04/2025</p>
                                    </div>
                                </div>

                                {/* Simulated Company Stamp */}
                                <div className="opacity-40 -rotate-12 transform pointer-events-none">
                                    <div className="w-24 h-24 rounded-full border-4 border-blue-600 flex items-center justify-center p-1">
                                        <div className="w-full h-full rounded-full border border-blue-600 flex flex-col items-center justify-center text-blue-600 uppercase text-[10px] font-bold tracking-tighter text-center leading-tight">
                                            <span>HRFlow</span>
                                            <span className="border-t border-blue-600 w-12 my-1"></span>
                                            <span>Verified</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Footer text */}
                            <div className="absolute bottom-8 left-12 right-12 text-center text-xs text-slate-400 border-t border-slate-100 pt-4">
                                This is a system generated document and does not require a physical signature.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    
        </Page>
    );
}
