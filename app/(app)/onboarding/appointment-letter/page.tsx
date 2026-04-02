"use client";
import React, { useState } from "react";
import {
    FileSignature, Download, Printer, ShieldCheck, FileCheck, Check,
    AlertCircle
} from "lucide-react";

export default function AppointmentLetter() {
    const [signed, setSigned] = useState(false);

    return (
        <div className="min-h-screen bg-[#0A1420] text-white flex flex-col">
            {/* Top Navigation / Action Bar */}
            <div className="h-16 shrink-0 bg-[#0F1C2E] border-b border-[#1A2A3A] flex items-center justify-between px-6 sticky top-0 z-20">
                <div className="flex items-center gap-3">
                    <FileSignature size={20} className="text-[#33E6FF]" />
                    <h1 className="font-semibold text-white">Digital Appointment Letter</h1>
                </div>
                <div className="flex items-center gap-3">
                    <button className="p-2 text-[#8899AA] hover:text-white hover:bg-[#1A2A3A] rounded bg-transparent transition-colors">
                        <Printer size={18} />
                    </button>
                    <button className="p-2 text-[#8899AA] hover:text-white hover:bg-[#1A2A3A] rounded bg-transparent transition-colors">
                        <Download size={18} />
                    </button>
                </div>
            </div>

            {/* Main Content Workspace */}
            <div className="flex-1 overflow-y-auto p-6 md:p-10 flex justify-center bg-[#0A1420]">
                {/* Simulated PDF Viewer Container */}
                <div className="w-full max-w-[850px] space-y-6 pb-32">

                    {/* Status Banner */}
                    {!signed ? (
                        <div className="bg-[#FFB020]/10 border border-[#FFB020]/20 rounded-xl p-4 flex items-start gap-4 shadow-lg">
                            <AlertCircle className="text-[#FFB020] shrink-0 mt-0.5" size={20} />
                            <div>
                                <h3 className="text-[#FFB020] font-semibold text-sm">Action Required</h3>
                                <p className="text-[#8899AA] text-sm mt-1">Please review the terms of your employment and electronically sign at the bottom of the document to complete your pre-boarding process.</p>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-[#00E5A0]/10 border border-[#00E5A0]/20 rounded-xl p-4 flex items-center gap-4 shadow-lg">
                            <ShieldCheck className="text-[#00E5A0] shrink-0" size={24} />
                            <div>
                                <h3 className="text-[#00E5A0] font-semibold text-sm">Document Digitally Signed</h3>
                                <p className="text-[#8899AA] text-sm mt-0.5">Signed on March 12, 2026 at 10:45 AM via secure HRFlow e-Sign.</p>
                            </div>
                        </div>
                    )}

                    {/* The Document */}
                    <div className="bg-white rounded-md shadow-2xl p-10 md:p-16 text-gray-800 min-h-[1100px] border border-gray-200 pointer-events-none select-none relative">

                        {/* Watermark */}
                        {signed && (
                            <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
                                <div className="text-8xl font-black transform -rotate-45 text-black">EXECUTED</div>
                            </div>
                        )}

                        <div className="flex items-start justify-between mb-16 border-b-2 border-gray-900 pb-6">
                            <div>
                                <h2 className="text-2xl font-black text-gray-900 tracking-tight">TechCorp Solutions Inc.</h2>
                                <p className="text-sm text-gray-600 mt-1">123 Tech Park, Gurugram, India 122002</p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-semibold text-gray-600">Date: 10 March 2026</p>
                                <p className="text-sm text-gray-500 mt-1">Ref: TC/HR/2026/089</p>
                            </div>
                        </div>

                        <div className="space-y-6 text-sm leading-relaxed text-justify">
                            <p className="font-bold text-base">To: Arjun Mehta</p>
                            <p className="font-bold text-center text-lg underline underline-offset-4 my-8">Subject: Letter of Appointment</p>

                            <p>Dear Arjun,</p>
                            <p>Following your recent interviews, we are pleased to offer you the position of <strong>Frontend Developer</strong> at TechCorp Solutions. The terms and conditions of your employment are as follows:</p>

                            <ol className="list-decimal pl-6 space-y-4 my-6">
                                <li>
                                    <strong>Commencement of Employment:</strong>
                                    <p className="mt-1">Your employment will commence on <strong>14 March 2026</strong> ("Start Date").</p>
                                </li>
                                <li>
                                    <strong>Remuneration:</strong>
                                    <p className="mt-1">Your total annual compensation will be ₹18,00,000 (Rupees Eighteen Lakhs Only). A detailed breakdown of your salary is attached as Annexure A.</p>
                                </li>
                                <li>
                                    <strong>Probation Period:</strong>
                                    <p className="mt-1">You will be on probation for a period of 90 days from your Start Date. During this period, your employment may be terminated by either party giving 15 days written notice.</p>
                                </li>
                                <li>
                                    <strong>Work Hours & Location:</strong>
                                    <p className="mt-1">Your primary location of work will be Gurugram. Standard working hours are 10:00 AM to 7:00 PM, Monday through Friday, subject to project requirements.</p>
                                </li>
                            </ol>

                            <p>Please review these terms carefully. If you agree, please sign below using our digital signature platform.</p>
                            <p>We welcome you to the TechCorp team and look forward to a mutually rewarding association.</p>

                            <div className="mt-16 pt-8">
                                <p className="font-bold">For TechCorp Solutions Inc.,</p>
                                <div className="w-48 h-16 border-b border-gray-400 my-4 flex items-end">
                                    <span className="font-[SignatureFont] text-2xl text-blue-900" style={{ fontFamily: "'Brush Script MT', cursive" }}>Priya Mehta</span>
                                </div>
                                <p>Priya Mehta</p>
                                <p className="text-xs text-gray-500">Director - Human Resources</p>
                            </div>

                            {/* Employee Signature Area */}
                            <div className="mt-16 bg-gray-50 border border-gray-200 p-8 rounded block pointer-events-auto">
                                <h3 className="font-bold mb-6 text-gray-900">Acceptance of Appointment</h3>
                                <p className="text-sm text-gray-600 mb-6">I accept the terms and conditions outlined in this appointment letter.</p>

                                <div className="flex flex-col md:flex-row gap-8">
                                    <div className="flex-1">
                                        <p className="text-xs text-gray-500 mb-1 uppercase tracking-wider font-semibold">Employee Signature</p>
                                        <div className={`h-20 border-b-2 bg-white flex items-center justify-center transition-colors ${signed ? 'border-green-500 bg-green-50/50' : 'border-dashed border-gray-400'}`}>
                                            {signed ? (
                                                <div className="text-center">
                                                    <span className="text-3xl text-blue-900 font-medium tracking-wide block" style={{ fontFamily: "cursive" }}>Arjun Mehta</span>
                                                    <span className="text-[10px] text-green-600 font-mono mt-2 block">Signed via HRFlow ID: TC-8892</span>
                                                </div>
                                            ) : (
                                                <span className="text-gray-400 italic text-sm">Awaiting signature...</span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="w-48">
                                        <p className="text-xs text-gray-500 mb-1 uppercase tracking-wider font-semibold">Date</p>
                                        <div className="h-20 border-b-2 border-gray-400 bg-white flex items-end pb-2">
                                            <span className="text-gray-900 font-medium">{signed ? "12 Mar 2026" : "DD/MM/YYYY"}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Floating Action Bar Container */}
            {!signed && (
                <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#0A1420] via-[#0A1420] to-transparent z-30 pointer-events-none border-t border-[#1A2A3A] translate-y-[1px]">
                    <div className="max-w-[850px] mx-auto flex justify-end pointer-events-auto mt-4">
                        <button
                            onClick={() => setSigned(true)}
                            className="flex items-center gap-2 bg-[#00E5A0] hover:bg-[#00c98d] text-[#0A1420] px-8 py-3.5 rounded-xl font-bold text-[15px] shadow-[0_10px_30px_rgba(0,229,160,0.3)] hover:shadow-[0_10px_40px_rgba(0,229,160,0.4)] transition-all transform hover:-translate-y-1"
                        >
                            <FileCheck size={20} /> Accept & E-Sign Document
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
