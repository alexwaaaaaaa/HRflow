"use client";
import React, { useState } from "react";
import {
    FileText, Mail, Image as ImageIcon, Layout, Type, List,
    Settings2, Eye, Save, Code, Variable, ChevronDown, CheckCircle2,
    Edit2, Calendar
} from "lucide-react";

const VARIABLES = [
    "{{candidate_name}}", "{{start_date}}", "{{role_title}}",
    "{{manager_name}}", "{{department}}", "{{office_location}}",
    "{{reporting_time}}", "{{company_name}}"
];

export default function TemplateBuilder() {
    const [activeTab, setActiveTab] = useState("editor");

    return (
        <div className="p-6 max-w-[1600px] mx-auto h-[calc(100vh-80px)] flex flex-col">
            <div className="flex items-center justify-between mb-6 shrink-0">
                <div>
                    <h1 className="text-2xl font-bold text-white">Template Builder</h1>
                    <p className="text-[#8899AA] text-sm mt-1">Design welcome emails, appointment letters, and IT instructions</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-4 py-2 bg-[#1A2A3A] text-white rounded-lg border border-[#2A3A4A] hover:bg-[#2A3A4A] transition-colors text-sm font-medium flex items-center gap-2">
                        <Eye size={16} /> Preview
                    </button>
                    <button className="px-4 py-2 bg-[#00E5A0] text-[#0A1420] rounded-lg hover:bg-[#00c98d] transition-colors text-sm font-semibold flex items-center gap-2">
                        <Save size={16} /> Save Template
                    </button>
                </div>
            </div>

            <div className="flex gap-6 flex-1 min-h-0">
                {/* Left Toolbar */}
                <div className="w-16 shrink-0 bg-[#0F1C2E] border border-[#1A2A3A] rounded-xl flex flex-col items-center py-4 space-y-4">
                    <button className="p-3 bg-[#1A2A3A] text-[#00E5A0] rounded-xl transition-colors relative group">
                        <Type size={20} />
                        <span className="absolute left-14 top-1/2 -translate-y-1/2 bg-[#0A1420] text-xs text-white px-2 py-1 rounded border border-[#1A2A3A] opacity-0 group-hover:opacity-100 whitespace-nowrap z-10 pointer-events-none transition-opacity">Text Block</span>
                    </button>
                    <button className="p-3 text-[#8899AA] hover:text-white hover:bg-[#1A2A3A] rounded-xl transition-colors relative group">
                        <ImageIcon size={20} />
                        <span className="absolute left-14 top-1/2 -translate-y-1/2 bg-[#0A1420] text-xs text-white px-2 py-1 rounded border border-[#1A2A3A] opacity-0 group-hover:opacity-100 whitespace-nowrap z-10 pointer-events-none transition-opacity">Image Header</span>
                    </button>
                    <button className="p-3 text-[#8899AA] hover:text-white hover:bg-[#1A2A3A] rounded-xl transition-colors relative group">
                        <List size={20} />
                        <span className="absolute left-14 top-1/2 -translate-y-1/2 bg-[#0A1420] text-xs text-white px-2 py-1 rounded border border-[#1A2A3A] opacity-0 group-hover:opacity-100 whitespace-nowrap z-10 pointer-events-none transition-opacity">Dynamic List</span>
                    </button>
                    <div className="w-8 h-px bg-[#1A2A3A] my-2"></div>
                    <button className="p-3 text-[#8899AA] hover:text-white hover:bg-[#1A2A3A] rounded-xl transition-colors relative group">
                        <Layout size={20} />
                        <span className="absolute left-14 top-1/2 -translate-y-1/2 bg-[#0A1420] text-xs text-white px-2 py-1 rounded border border-[#1A2A3A] opacity-0 group-hover:opacity-100 whitespace-nowrap z-10 pointer-events-none transition-opacity">Layout Options</span>
                    </button>
                </div>

                {/* Center Canvas */}
                <div className="flex-1 bg-[#0F1C2E] border border-[#1A2A3A] rounded-xl flex flex-col overflow-hidden">
                    <div className="h-12 border-b border-[#1A2A3A] bg-[#152336] flex items-center justify-between px-4">
                        <div className="flex items-center gap-4 text-sm font-medium">
                            <button
                                onClick={() => setActiveTab("editor")}
                                className={`py-3 border-b-2 transition-colors ${activeTab === "editor" ? "border-[#00E5A0] text-[#00E5A0]" : "border-transparent text-[#8899AA] hover:text-white"}`}
                            >
                                Visual Editor
                            </button>
                            <button
                                onClick={() => setActiveTab("html")}
                                className={`py-3 border-b-2 transition-colors flex items-center gap-1.5 ${activeTab === "html" ? "border-[#00E5A0] text-[#00E5A0]" : "border-transparent text-[#8899AA] hover:text-white"}`}
                            >
                                <Code size={14} /> HTML Source
                            </button>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="flex items-center gap-1.5 text-xs text-[#00E5A0] bg-[#00E5A0]/10 px-2 py-1 rounded">
                                <CheckCircle2 size={12} /> Auto-saved
                            </span>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto bg-[#0A1420] p-8 flex justify-center">
                        {/* The Document Canvas */}
                        <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg min-h-[800px] overflow-hidden">
                            {/* Document Header Image Placeholder */}
                            <div className="h-40 bg-gradient-to-r from-blue-600 to-indigo-600 flex flex-col items-center justify-center text-white relative group cursor-pointer border-b-4 border-[#00E5A0]">
                                <h1 className="text-3xl font-bold tracking-tight">Welcome to TechCorp!</h1>
                                <p className="opacity-90 mt-2">We are thrilled to have you onboard.</p>

                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="bg-white text-gray-900 px-4 py-2 rounded font-medium text-sm flex items-center gap-2">
                                        <Edit2 size={16} /> Change Cover
                                    </button>
                                </div>
                            </div>

                            {/* Document Body */}
                            <div className="p-10 text-gray-800 space-y-6">
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900 mb-4 inline-block border border-blue-200 bg-blue-50 px-2 py-1 rounded text-blue-700 cursor-text hover:bg-blue-100 transition-colors">
                                        Dear <span className="underline decoration-dashed" title="Variable: {{candidate_name}}">{"{{candidate_name}}"}</span>,
                                    </h2>

                                    <p className="leading-relaxed hover:bg-gray-50 p-2 -ml-2 rounded cursor-text border border-transparent hover:border-gray-200 transition-colors">
                                        We are excited to officially welcome you to the <span className="bg-gray-100 px-1 rounded font-mono text-sm">{"{{department}}"}</span> team as our new <span className="bg-gray-100 px-1 rounded font-mono text-sm">{"{{role_title}}"}</span>. Your journey begins on <span className="bg-gray-100 px-1 rounded font-mono text-sm">{"{{start_date}}"}</span>.
                                    </p>
                                </div>

                                <div className="p-5 bg-blue-50 border border-blue-100 rounded-lg group cursor-pointer">
                                    <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                                        <Calendar size={18} className="text-blue-600" /> Day 1 Details
                                    </h3>
                                    <ul className="space-y-2 text-sm text-blue-800">
                                        <li className="flex gap-2"><strong className="w-24">Reporting Time:</strong> <span className="bg-white px-1 border border-blue-200 rounded font-mono">{"{{reporting_time}}"}</span></li>
                                        <li className="flex gap-2"><strong className="w-24">Location:</strong> <span className="bg-white px-1 border border-blue-200 rounded font-mono">{"{{office_location}}"}</span></li>
                                        <li className="flex gap-2"><strong className="w-24">Manager:</strong> <span className="bg-white px-1 border border-blue-200 rounded font-mono">{"{{manager_name}}"}</span></li>
                                    </ul>
                                </div>

                                <p className="leading-relaxed hover:bg-gray-50 p-2 -ml-2 rounded cursor-text border border-transparent hover:border-gray-200 transition-colors">
                                    Before your first day, please ensure you log into the NextGen Portal using the temporary credentials sent to your personal email to complete your pre-boarding checklist and acknowledge the company policies.
                                </p>

                                <div className="pt-8 pb-4 border-t border-gray-200 mt-12 hover:bg-gray-50 p-2 -ml-2 rounded cursor-text">
                                    <p className="font-semibold">Best Regards,</p>
                                    <p className="text-gray-500 text-sm mt-1">People & Culture Team</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Settings Pane */}
                <div className="w-[320px] shrink-0 bg-[#0F1C2E] border border-[#1A2A3A] rounded-xl flex flex-col">
                    <div className="p-4 border-b border-[#1A2A3A]">
                        <h2 className="text-white font-semibold">Template Settings</h2>
                    </div>
                    <div className="flex-1 overflow-y-auto p-5 space-y-6">

                        {/* Meta */}
                        <div className="space-y-4">
                            <div>
                                <label className="text-xs font-semibold text-[#8899AA] uppercase tracking-wider mb-1.5 block">Template Name</label>
                                <input
                                    type="text"
                                    defaultValue="Engineering Welcome Standard"
                                    className="w-full bg-[#1A2A3A] border border-[#2A3A4A] text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#00E5A0] transition-colors"
                                />
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-[#8899AA] uppercase tracking-wider mb-1.5 block">Trigger Event</label>
                                <button className="w-full bg-[#1A2A3A] border border-[#2A3A4A] text-white rounded-lg px-3 py-2 text-sm flex items-center justify-between hover:border-[#445566] transition-colors">
                                    Offer Accepted
                                    <ChevronDown size={14} className="text-[#8899AA]" />
                                </button>
                            </div>
                        </div>

                        <div className="h-px bg-[#1A2A3A]"></div>

                        {/* Smart Variables Map */}
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <Variable size={16} className="text-[#00E5A0]" />
                                <h3 className="text-sm font-semibold text-white">Smart Variables</h3>
                            </div>
                            <p className="text-xs text-[#8899AA] mb-4 leading-relaxed">Click to copy variables to clipboard, or drag them directly onto the canvas text blocks.</p>

                            <div className="flex flex-wrap gap-2">
                                {VARIABLES.map((v, i) => (
                                    <span
                                        key={i}
                                        className="text-[11px] font-mono bg-[#1A2A3A] text-[#33E6FF] border border-[#2A3A4A] px-2 py-1 rounded cursor-copy hover:border-[#33E6FF] transition-colors"
                                        title="Click to copy"
                                    >
                                        {v}
                                    </span>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
