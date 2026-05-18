"use client";

import Page from "@/components/ui/Page";

import React, { useState } from "react";
import { Check, Settings2, LayoutTemplate, Palette, Eye, Upload } from "lucide-react";

export default function PayslipCustomizationPage() {
    const [theme, setTheme] = useState("Modern");
    const [font, setFont] = useState("DM Sans");
    const [language, setLanguage] = useState("English");

    const sections = [
        { id: 'header', label: 'Company Header', defaultChecked: true },
        { id: 'emp-info', label: 'Employee Info', defaultChecked: true },
        { id: 'attendance', label: 'Attendance Summary', defaultChecked: true },
        { id: 'earnings', label: 'Earnings Table', defaultChecked: true },
        { id: 'deductions', label: 'Deductions Table', defaultChecked: true },
        { id: 'net-pay', label: 'Net Pay Box', defaultChecked: true },
        { id: 'ytd', label: 'YTD Summary', defaultChecked: true },
        { id: 'leave', label: 'Leave Balance', defaultChecked: false },
        { id: 'qr', label: 'QR Code for verification', defaultChecked: true },
        { id: 'signature', label: 'Digital Signature', defaultChecked: true },
        { id: 'bank', label: 'Bank Details (masked)', defaultChecked: false },
        { id: 'footer', label: 'Footer (legal text)', defaultChecked: true },
    ];

    return (
        <Page
            title="HRFlow Technologies Pvt. Ltd."
            subtitle="Design your company's payslip format, branding, and visible sections."
            breadcrumbs={[{ label: "Payslip Customization" }]}
            maxWidth="1200px"
        >

        <div className="min-h-screen bg-[#060B14] text-white p-6 font-sans">
            <div className="max-w-[1500px] mx-auto space-y-6">

                {/* Page Header */}
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Payslip Template Customization</h2>
                        <p className="text-gray-400 text-sm mt-1">Design your company&apos;s payslip format, branding, and visible sections.</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-4 py-2 border border-[#1A2A3A] hover:bg-[#1A2A3A] transition-colors rounded-lg text-sm font-medium">Preview Sample Data</button>
                        <button className="px-5 py-2 bg-[#00E5A0] hover:bg-[#00E5A0]/90 text-black font-bold rounded-lg text-sm transition-colors">Apply to Next Payroll</button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Left Panel - Customization (4/12 columns) */}
                    <div className="lg:col-span-4 space-y-6">

                        {/* Theme Selector */}
                        <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl p-5">
                            <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                                <LayoutTemplate className="w-4 h-4 text-[#00E5A0]" /> Select Theme
                            </h3>

                            <div className="grid grid-cols-3 gap-3">
                                {['Corporate', 'Modern', 'Minimal'].map(t => (
                                    <button
                                        key={t}
                                        onClick={() => setTheme(t)}
                                        className={`flex flex-col items-center gap-2 p-3 border rounded-lg transition-colors ${theme === t ? 'border-[#00E5A0] bg-[#00E5A0]/5' : 'border-[#1A2A3A] bg-[#060B14] hover:border-gray-600'}`}
                                    >
                                        <div className="w-full h-16 bg-white rounded flex flex-col p-1.5 gap-1 shadow-inner relative overflow-hidden opacity-80">
                                            {/* Mini mock wireframe inside */}
                                            {t === 'Corporate' && (
                                                <>
                                                    <div className="w-full h-2 bg-slate-300 rounded-sm"></div>
                                                    <div className="flex gap-1 mt-1"><div className="w-1/2 h-8 bg-slate-200 rounded-sm"></div><div className="w-1/2 h-8 bg-slate-200 rounded-sm"></div></div>
                                                </>
                                            )}
                                            {t === 'Modern' && (
                                                <>
                                                    <div className="flex justify-between items-center"><div className="w-4 h-4 rounded-full bg-blue-400"></div><div className="w-8 h-2 bg-slate-200"></div></div>
                                                    <div className="w-full h-8 bg-slate-100 rounded border border-slate-200 mt-2"></div>
                                                </>
                                            )}
                                            {t === 'Minimal' && (
                                                <>
                                                    <div className="w-full h-1 border-b border-black mb-1"></div>
                                                    <div className="w-1/2 h-2 bg-slate-800"></div>
                                                    <div className="w-full h-0.5 bg-slate-200 my-1"></div>
                                                    <div className="w-3/4 h-8 bg-slate-100 border border-slate-200 mx-auto"></div>
                                                </>
                                            )}
                                        </div>
                                        <span className="text-xs font-medium mt-1">{t}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Branding */}
                        <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl p-5">
                            <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                                <Palette className="w-4 h-4 text-[#FFB800]" /> Branding
                            </h3>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs text-gray-400 mb-2">Company Logo</label>
                                    <div className="border border-dashed border-[#1A2A3A] bg-[#060B14] rounded-lg p-3 flex items-center gap-4 hover:border-[#00E5A0]/50 transition-colors cursor-pointer">
                                        <div className="w-16 h-8 bg-white rounded flex items-center justify-center border border-gray-300">
                                            <span className="text-[10px] text-blue-600 font-bold">HRFlow</span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-white flex items-center gap-1"><Upload className="w-3 h-3" /> Replace Logo</p>
                                            <p className="text-xs text-gray-500 mt-0.5">PNG/JPG up to 2MB (120x60px)</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs text-gray-400 mb-2">Primary Color</label>
                                        <div className="flex items-center gap-2 border border-[#1A2A3A] bg-[#060B14] rounded-lg p-2">
                                            <div className="w-6 h-6 rounded bg-blue-600 border border-gray-600"></div>
                                            <span className="text-sm font-mono text-gray-300">#2563EB</span>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs text-gray-400 mb-2">Font</label>
                                        <select
                                            value={font}
                                            onChange={(e) => setFont(e.target.value)}
                                            className="w-full bg-[#060B14] border border-[#1A2A3A] text-white rounded-lg px-2 py-2 text-sm outline-none"
                                        >
                                            <option>DM Sans</option>
                                            <option>Inter</option>
                                            <option>Arial</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Content Sections */}
                        <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl p-5">
                            <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                                <Settings2 className="w-4 h-4 text-[#0066FF]" /> Content Sections
                            </h3>

                            <div className="grid grid-cols-1 gap-2.5 max-h-[220px] overflow-y-auto pr-2 custom-scrollbar">
                                {sections.map(section => (
                                    <label key={section.id} className="flex items-center gap-3 cursor-pointer group">
                                        <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${section.defaultChecked ? 'border-[#00E5A0] bg-[#00E5A0]/20' : 'border-gray-500 bg-transparent group-hover:border-gray-400'}`}>
                                            {section.defaultChecked && <Check className="w-3 h-3 text-[#00E5A0]" />}
                                        </div>
                                        <span className={`text-sm ${section.defaultChecked ? 'text-white' : 'text-gray-400'} group-hover:text-white transition-colors`}>{section.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Translation & Security */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl p-4">
                                <label className="block text-xs font-semibold text-gray-300 mb-2">Language</label>
                                <div className="flex flex-col gap-1.5">
                                    {['English', 'Hindi', 'Bilingual'].map(lang => (
                                        <button
                                            key={lang}
                                            onClick={() => setLanguage(lang)}
                                            className={`text-left text-xs py-1.5 px-2 rounded transition-colors ${language === lang ? 'bg-[#1A2A3A] text-white font-medium' : 'text-gray-400 hover:text-gray-300 hover:bg-[#1A2A3A]/50'}`}
                                        >
                                            {lang}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl p-4">
                                <label className="block text-xs font-semibold text-gray-300 mb-2">Password PDF</label>
                                <div className="flex flex-col gap-1.5 text-xs">
                                    <label className="flex items-center gap-2 cursor-pointer text-gray-400">
                                        <input type="radio" name="pwd" defaultChecked className="text-[#00E5A0]" /> Employee DOB
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer text-gray-400">
                                        <input type="radio" name="pwd" className="text-[#00E5A0]" /> PAN Last 4
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer text-gray-400">
                                        <input type="radio" name="pwd" className="text-[#00E5A0]" /> None
                                    </label>
                                </div>
                            </div>
                        </div>

                        <button className="w-full py-3 bg-[#1A2A3A] hover:bg-[#2A3B4C] text-white rounded-lg text-sm font-medium transition-colors border border-transparent">
                            Save Template
                        </button>

                    </div>

                    {/* Right Panel - Live Preview (8/12 columns) */}
                    <div className="lg:col-span-8 flex justify-center bg-[#111111] border border-[#1A2A3A] rounded-xl overflow-hidden pt-8 pb-12 relative">
                        <div className="absolute top-4 right-4 flex items-center gap-2">
                            <span className="text-xs text-gray-500 font-medium tracking-wider"><Eye className="w-3.5 h-3.5 inline mr-1" /> LIVE PREVIEW</span>
                        </div>

                        {/* Virtual A4 Paper Container */}
                        <div className="w-[794px] min-h-[1123px] bg-white rounded shadow-2xl origin-top" style={{ transform: 'scale(0.85)', transformOrigin: 'top center' }}>
                            <div className="p-10 font-sans text-slate-800">
                                {/* Payslip Header */}
                                <div className="flex justify-between items-start border-b-2 border-slate-200 pb-5 mb-5">
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-10 bg-blue-600 rounded flex items-center justify-center font-bold text-white tracking-widest text-sm">HRFlow</div>
                                        <div>
                                            <h1 className="text-xl font-bold text-slate-900">HRFlow Technologies Pvt. Ltd.</h1>
                                            <p className="text-xs text-slate-500">Outer Ring Road, Bengaluru 560037, India</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <h2 className="text-lg font-bold text-slate-700 tracking-wider">PAYSLIP</h2>
                                        <p className="text-sm font-medium text-slate-500">March 2025</p>
                                    </div>
                                </div>

                                {/* Employee Info Block */}
                                <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 mb-6">
                                    <div className="grid grid-cols-2 gap-x-10 gap-y-3 text-sm">
                                        <div className="flex">
                                            <span className="w-32 text-slate-500 font-medium">Employee Name:</span>
                                            <span className="font-semibold">Rajesh Kumar</span>
                                        </div>
                                        <div className="flex">
                                            <span className="w-32 text-slate-500 font-medium">Employee ID:</span>
                                            <span className="font-semibold">EMP001</span>
                                        </div>
                                        <div className="flex">
                                            <span className="w-32 text-slate-500 font-medium">Designation:</span>
                                            <span className="font-medium">Lead Developer</span>
                                        </div>
                                        <div className="flex">
                                            <span className="w-32 text-slate-500 font-medium">Department:</span>
                                            <span className="font-medium">Engineering</span>
                                        </div>
                                        <div className="flex">
                                            <span className="w-32 text-slate-500 font-medium">Date of Joining:</span>
                                            <span className="font-medium">15 Aug 2021</span>
                                        </div>
                                        <div className="flex">
                                            <span className="w-32 text-slate-500 font-medium">PAN Number:</span>
                                            <span className="font-medium">ABCDE1234F</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Attendance Summary */}
                                <div className="flex my-6 divide-x divide-slate-200 border-y border-slate-200 py-3 text-center">
                                    <div className="flex-1">
                                        <p className="text-xs text-slate-500 font-medium uppercase mb-1">Total Days</p>
                                        <p className="font-bold text-lg">31</p>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-xs text-slate-500 font-medium uppercase mb-1">Worked Days</p>
                                        <p className="font-bold text-lg text-slate-800">22</p>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-xs text-slate-500 font-medium uppercase mb-1">LOP Days</p>
                                        <p className="font-bold text-lg text-slate-800">0</p>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-xs text-slate-500 font-medium uppercase mb-1">Leaves Taken</p>
                                        <p className="font-bold text-lg text-slate-800">1</p>
                                    </div>
                                </div>

                                {/* Main Earnings/Deductions Table */}
                                <div className="flex gap-6 mb-6">
                                    {/* Earnings */}
                                    <div className="flex-1 border border-slate-200 rounded-lg overflow-hidden">
                                        <div className="bg-slate-100 py-2 px-4 border-b border-slate-200 flex justify-between">
                                            <h4 className="font-bold text-slate-700 text-sm">EARNINGS</h4>
                                            <span className="text-xs font-bold text-slate-500">Amount (₹)</span>
                                        </div>
                                        <div className="p-4 space-y-3">
                                            <div className="flex justify-between text-sm"><span>Basic</span><span className="font-medium">40,000.00</span></div>
                                            <div className="flex justify-between text-sm"><span>HRA</span><span className="font-medium">20,000.00</span></div>
                                            <div className="flex justify-between text-sm"><span>Special Allowance</span><span className="font-medium">15,000.00</span></div>
                                            <div className="flex justify-between text-sm"><span>LTA</span><span className="font-medium">8,333.00</span></div>
                                            <div className="flex justify-between text-sm text-green-600"><span>Arrears</span><span className="font-medium">0.00</span></div>
                                        </div>
                                        <div className="bg-slate-50 py-3 px-4 border-t border-slate-200 flex justify-between">
                                            <h4 className="font-bold text-slate-800">Total Gross</h4>
                                            <span className="font-bold text-lg text-slate-900">83,333.00</span>
                                        </div>
                                    </div>

                                    {/* Deductions */}
                                    <div className="flex-1 border border-slate-200 rounded-lg overflow-hidden">
                                        <div className="bg-slate-100 py-2 px-4 border-b border-slate-200 flex justify-between">
                                            <h4 className="font-bold text-slate-700 text-sm">DEDUCTIONS</h4>
                                            <span className="text-xs font-bold text-slate-500">Amount (₹)</span>
                                        </div>
                                        <div className="p-4 space-y-3">
                                            <div className="flex justify-between text-sm"><span>PF Employee</span><span className="font-medium text-red-600">1,800.00</span></div>
                                            <div className="flex justify-between text-sm"><span>Income Tax (TDS)</span><span className="font-medium text-red-600">8,200.00</span></div>
                                            <div className="flex justify-between text-sm"><span>Professional Tax</span><span className="font-medium text-red-600">200.00</span></div>
                                            <div className="flex justify-between text-sm text-red-600"><span>Loss of Pay</span><span className="font-medium">0.00</span></div>
                                        </div>
                                        <div className="mt-8 bg-slate-50 py-3 px-4 border-t border-slate-200 flex justify-between absolute bottom-0 w-[46%]"></div>
                                        {/* Spacer to push total down */}
                                        <div className="flex-1"></div>
                                        <div className="bg-slate-50 py-3 px-4 border-t border-slate-200 flex justify-between mt-8">
                                            <h4 className="font-bold text-slate-800">Total Deductions</h4>
                                            <span className="font-bold text-lg text-red-600">10,200.00</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Net Pay Highlight */}
                                <div className="bg-blue-600 text-white rounded-lg p-5 flex justify-between items-center mb-8 shadow-sm">
                                    <div>
                                        <h3 className="text-lg font-bold">Net Pay</h3>
                                        <p className="text-sm text-blue-100 mt-1">Amount in words: Seventy Three Thousand One Hundred Thirty Three Only</p>
                                    </div>
                                    <div className="text-3xl font-black tracking-tight">₹73,133.00</div>
                                </div>

                                {/* YTD Summary */}
                                <div className="border border-slate-200 rounded-lg p-5 mb-8 text-sm">
                                    <h4 className="font-semibold text-slate-800 border-b border-slate-200 pb-2 mb-3">Year-To-Date (YTD) Summary</h4>
                                    <div className="grid grid-cols-4 gap-4">
                                        <div><p className="text-slate-500 text-xs mb-1">Gross Earnings</p><p className="font-semibold">₹9,99,996.00</p></div>
                                        <div><p className="text-slate-500 text-xs mb-1">TDS Deducted</p><p className="font-semibold">₹98,400.00</p></div>
                                        <div><p className="text-slate-500 text-xs mb-1">PF Contributed</p><p className="font-semibold">₹21,600.00</p></div>
                                        <div><p className="text-slate-500 text-xs mb-1">Net Paid</p><p className="font-semibold">₹8,77,596.00</p></div>
                                    </div>
                                </div>

                                {/* Signature & QR */}
                                <div className="flex justify-between items-end mt-12 pt-8 border-t border-slate-100">
                                    <div className="flex flex-col items-center">
                                        <div className="w-24 h-24 bg-slate-100 border border-slate-300 rounded-md flex justify-center items-center p-2 mb-2">
                                            {/* Fake QR pattern */}
                                            <div className="w-full h-full bg-[url('https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg')] bg-cover opacity-80"></div>
                                        </div>
                                        <p className="text-[10px] text-slate-500 text-center">Scan to verify<br />authenticity</p>
                                    </div>

                                    <div className="text-right flex flex-col items-end">
                                        <div className="w-40 h-16 bg-[url('https://upload.wikimedia.org/wikipedia/commons/f/fb/John_Hancock_signature.svg')] bg-contain bg-no-repeat bg-center opacity-60 mb-2"></div>
                                        <p className="font-bold text-slate-800 border-t border-slate-300 pt-1 px-8">Authorized Signatory</p>
                                    </div>
                                </div>

                                {/* Footer Text */}
                                <div className="mt-6 text-center text-xs text-slate-400">
                                    This is a computer-generated document and does not require a physical signature.<br />
                                    Please contact HR Department for any discrepancies.
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    
        </Page>
    );
}
