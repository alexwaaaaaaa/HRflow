"use client";
import React, { useState } from "react";
import {
    Image as ImageIcon, Layout, Type, List, Eye, Save, Code, Variable, ChevronDown,
    CheckCircle2, Edit2, Calendar,
} from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

// ─── Static data ─────────────────────────────────────────────────────────────

const VARIABLES = [
    "{{candidate_name}}", "{{start_date}}", "{{role_title}}",
    "{{manager_name}}", "{{department}}", "{{office_location}}",
    "{{reporting_time}}", "{{company_name}}",
] as const;

// ─── Toolbar button (module-scope to avoid component-in-render) ───────────────

interface ToolbarBtnProps {
    icon: React.ReactNode;
    label: string;
    active?: boolean;
}

function ToolbarBtn({ icon, label, active }: ToolbarBtnProps) {
    return (
        <button
            type="button"
            aria-label={label}
            title={label}
            className={`p-3 rounded-xl transition-colors relative group ${
                active
                    ? "bg-[#1A2A3A] text-[#00E5A0]"
                    : "text-[#8899AA] hover:text-white hover:bg-[#1A2A3A]"
            }`}
        >
            {icon}
            <span className="absolute left-14 top-1/2 -translate-y-1/2 bg-[#0A1420] text-xs text-white px-2 py-1 rounded border border-[#1A2A3A] opacity-0 group-hover:opacity-100 whitespace-nowrap z-10 pointer-events-none transition-opacity">
                {label}
            </span>
        </button>
    );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TemplateBuilder() {
    const [activeTab, setActiveTab] = useState("editor");

    return (
        <Page
            title="Template Builder"
            subtitle="Design welcome emails, appointment letters, and IT instructions"
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Onboarding", href: "/onboarding/dashboard" },
                { label: "Template Builder", href: "/onboarding/template-builder" },
            ]}
            maxWidth="1600px"
            actions={
                <>
                    <Button variant="secondary" icon={<Eye size={16} aria-hidden="true" />}>
                        Preview
                    </Button>
                    <Button icon={<Save size={16} aria-hidden="true" />}>
                        Save Template
                    </Button>
                </>
            }
        >
            <div className="flex gap-6 flex-1 min-h-0" style={{ height: "calc(100vh - 260px)" }}>
                {/* Left Toolbar */}
                <div className="w-16 shrink-0 bg-[#0F1C2E] border border-[#1A2A3A] rounded-xl flex flex-col items-center py-4 space-y-4">
                    <ToolbarBtn icon={<Type size={20} aria-hidden="true" />} label="Text Block" active />
                    <ToolbarBtn icon={<ImageIcon size={20} aria-hidden="true" />} label="Image Header" />
                    <ToolbarBtn icon={<List size={20} aria-hidden="true" />} label="Dynamic List" />
                    <div className="w-8 h-px bg-[#1A2A3A] my-2" />
                    <ToolbarBtn icon={<Layout size={20} aria-hidden="true" />} label="Layout Options" />
                </div>

                {/* Center Canvas */}
                <div className="flex-1 bg-[#0F1C2E] border border-[#1A2A3A] rounded-xl flex flex-col overflow-hidden">
                    <div className="h-12 border-b border-[#1A2A3A] bg-[#152336] flex items-center justify-between px-4">
                        <div className="flex items-center gap-4 text-sm font-medium">
                            <button
                                type="button"
                                onClick={() => setActiveTab("editor")}
                                aria-pressed={activeTab === "editor"}
                                className={`py-3 border-b-2 transition-colors ${
                                    activeTab === "editor"
                                        ? "border-[#00E5A0] text-[#00E5A0]"
                                        : "border-transparent text-[#8899AA] hover:text-white"
                                }`}
                            >
                                Visual Editor
                            </button>
                            <button
                                type="button"
                                onClick={() => setActiveTab("html")}
                                aria-pressed={activeTab === "html"}
                                className={`py-3 border-b-2 transition-colors flex items-center gap-1.5 ${
                                    activeTab === "html"
                                        ? "border-[#00E5A0] text-[#00E5A0]"
                                        : "border-transparent text-[#8899AA] hover:text-white"
                                }`}
                            >
                                <Code size={14} aria-hidden="true" /> HTML Source
                            </button>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="flex items-center gap-1.5 text-xs text-[#00E5A0] bg-[#00E5A0]/10 px-2 py-1 rounded">
                                <CheckCircle2 size={12} aria-hidden="true" /> Auto-saved
                            </span>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto bg-[#0A1420] p-8 flex justify-center">
                        {/* Document Canvas */}
                        <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg min-h-[800px] overflow-hidden">
                            {/* Document Header */}
                            <div className="h-40 bg-gradient-to-r from-blue-600 to-indigo-600 flex flex-col items-center justify-center text-white relative group cursor-pointer border-b-4 border-[#00E5A0]">
                                <h1 className="text-3xl font-bold tracking-tight">Welcome to TechCorp!</h1>
                                <p className="opacity-90 mt-2">We are thrilled to have you onboard.</p>

                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        type="button"
                                        className="bg-white text-gray-900 px-4 py-2 rounded font-medium text-sm flex items-center gap-2"
                                    >
                                        <Edit2 size={16} aria-hidden="true" /> Change Cover
                                    </button>
                                </div>
                            </div>

                            {/* Document Body */}
                            <div className="p-10 text-gray-800 space-y-6">
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900 mb-4 inline-block border border-blue-200 bg-blue-50 px-2 py-1 rounded text-blue-700 cursor-text hover:bg-blue-100 transition-colors">
                                        Dear{" "}
                                        <span className="underline decoration-dashed" title="Variable: {{candidate_name}}">
                                            {"{{candidate_name}}"}
                                        </span>
                                        ,
                                    </h2>

                                    <p className="leading-relaxed hover:bg-gray-50 p-2 -ml-2 rounded cursor-text border border-transparent hover:border-gray-200 transition-colors">
                                        We are excited to officially welcome you to the{" "}
                                        <span className="bg-gray-100 px-1 rounded font-mono text-sm">{"{{department}}"}</span> team as our new{" "}
                                        <span className="bg-gray-100 px-1 rounded font-mono text-sm">{"{{role_title}}"}</span>. Your journey begins on{" "}
                                        <span className="bg-gray-100 px-1 rounded font-mono text-sm">{"{{start_date}}"}</span>.
                                    </p>
                                </div>

                                <div className="p-5 bg-blue-50 border border-blue-100 rounded-lg group cursor-pointer">
                                    <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                                        <Calendar size={18} className="text-blue-600" aria-hidden="true" /> Day 1 Details
                                    </h3>
                                    <ul className="space-y-2 text-sm text-blue-800">
                                        <li className="flex gap-2">
                                            <strong className="w-24">Reporting Time:</strong>
                                            <span className="bg-white px-1 border border-blue-200 rounded font-mono">{"{{reporting_time}}"}</span>
                                        </li>
                                        <li className="flex gap-2">
                                            <strong className="w-24">Location:</strong>
                                            <span className="bg-white px-1 border border-blue-200 rounded font-mono">{"{{office_location}}"}</span>
                                        </li>
                                        <li className="flex gap-2">
                                            <strong className="w-24">Manager:</strong>
                                            <span className="bg-white px-1 border border-blue-200 rounded font-mono">{"{{manager_name}}"}</span>
                                        </li>
                                    </ul>
                                </div>

                                <p className="leading-relaxed hover:bg-gray-50 p-2 -ml-2 rounded cursor-text border border-transparent hover:border-gray-200 transition-colors">
                                    Before your first day, please ensure you log into the NextGen Portal using the temporary credentials sent to your personal email to complete your pre-boarding checklist and acknowledge the company policies.
                                </p>

                                <div className="pt-8 pb-4 border-t border-gray-200 mt-12 hover:bg-gray-50 p-2 -ml-2 rounded cursor-text">
                                    <p className="font-semibold">Best Regards,</p>
                                    <p className="text-gray-500 text-sm mt-1">People &amp; Culture Team</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Settings Pane */}
                <Card padding="none" className="w-[320px] shrink-0 flex flex-col">
                    <div className="p-4 border-b border-[#1A2A3A]">
                        <h2 className="text-white font-semibold">Template Settings</h2>
                    </div>
                    <div className="flex-1 overflow-y-auto p-5 space-y-6">
                        {/* Meta */}
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="template-name" className="text-xs font-semibold text-[#8899AA] uppercase tracking-wider mb-1.5 block">
                                    Template Name
                                </label>
                                <input
                                    id="template-name"
                                    type="text"
                                    defaultValue="Engineering Welcome Standard"
                                    className="w-full bg-[#1A2A3A] border border-[#2A3A4A] text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#00E5A0] transition-colors"
                                />
                            </div>
                            <div>
                                <label htmlFor="trigger-event" className="text-xs font-semibold text-[#8899AA] uppercase tracking-wider mb-1.5 block">
                                    Trigger Event
                                </label>
                                <button
                                    id="trigger-event"
                                    type="button"
                                    aria-haspopup="listbox"
                                    className="w-full bg-[#1A2A3A] border border-[#2A3A4A] text-white rounded-lg px-3 py-2 text-sm flex items-center justify-between hover:border-[#445566] transition-colors"
                                >
                                    Offer Accepted
                                    <ChevronDown size={14} className="text-[#8899AA]" aria-hidden="true" />
                                </button>
                            </div>
                        </div>

                        <div className="h-px bg-[#1A2A3A]" />

                        {/* Smart Variables */}
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <Variable size={16} className="text-[#00E5A0]" aria-hidden="true" />
                                <h3 className="text-sm font-semibold text-white">Smart Variables</h3>
                            </div>
                            <p className="text-xs text-[#8899AA] mb-4 leading-relaxed">
                                Click to copy variables to clipboard, or drag them directly onto the canvas text blocks.
                            </p>

                            <div className="flex flex-wrap gap-2">
                                {VARIABLES.map((v) => (
                                    <button
                                        key={v}
                                        type="button"
                                        aria-label={`Copy variable ${v}`}
                                        className="text-[11px] font-mono bg-[#1A2A3A] text-[#33E6FF] border border-[#2A3A4A] px-2 py-1 rounded cursor-copy hover:border-[#33E6FF] transition-colors"
                                    >
                                        {v}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </Page>
    );
}
