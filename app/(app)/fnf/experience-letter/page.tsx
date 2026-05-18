"use client";

import { Printer, ShieldCheck, CheckCircle } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

const SECTIONS = [
    { label: "Technical Core Skills", checked: true },
    { label: "Key Project Achievements", checked: true },
    { label: "Leadership Summary", checked: false },
    { label: "Direct Manager Reference", checked: true },
];

export default function ExperienceLetter() {
    return (
        <Page
            title="Experience Certificate"
            subtitle="Generate and issue professional experience letters."
            breadcrumbs={[
                { label: "FnF", href: "/fnf/dashboard" },
                { label: "Experience Letter" },
            ]}
            maxWidth="1300px"
            actions={
                <>
                    <Button variant="secondary" icon={<Printer size={14} aria-hidden="true" />}>
                        Print Preview
                    </Button>
                    <Button>Issue Certificate</Button>
                </>
            }
        >
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                {/* Template Customizer */}
                <div className="space-y-6 lg:col-span-4">
                    <Card padding="md">
                        <h3 className="mb-4 border-b border-[#1A2A3A] pb-4 text-xs font-bold uppercase tracking-widest text-[#445566]">
                            Letter Template
                        </h3>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="template-style" className="text-[10px] font-bold uppercase text-[#445566]">
                                    Template Style
                                </label>
                                <select
                                    id="template-style"
                                    className="w-full rounded-xl border border-[#1A2A3A] bg-[#060B14] px-4 py-3 text-xs font-semibold text-white outline-none focus:border-[#00e5a0]"
                                >
                                    <option>Modern Professional (Standard)</option>
                                    <option>Traditional Narrative</option>
                                    <option>Minimalist Tech-Style</option>
                                    <option>Detailed Skill-Based</option>
                                </select>
                            </div>

                            <fieldset className="space-y-3">
                                <legend className="text-[10px] font-bold uppercase text-[#445566]">Include Sections</legend>
                                {SECTIONS.map((opt) => (
                                    <label
                                        key={opt.label}
                                        className="flex cursor-pointer items-center gap-3 rounded-xl border border-[#1A2A3A] bg-[#060B14] p-3 transition-colors hover:border-blue-500/20"
                                    >
                                        <input
                                            type="checkbox"
                                            defaultChecked={opt.checked}
                                            className="sr-only"
                                        />
                                        <div
                                            className={`flex h-4 w-4 items-center justify-center rounded border-2 transition-all ${
                                                opt.checked ? "border-blue-600 bg-blue-600" : "border-[#1A2A3A]"
                                            }`}
                                            aria-hidden="true"
                                        >
                                            {opt.checked && <CheckCircle size={10} className="text-white" />}
                                        </div>
                                        <span className="text-xs font-semibold text-[#8899AA]">{opt.label}</span>
                                    </label>
                                ))}
                            </fieldset>

                            <Button variant="outline" size="sm" className="w-full">
                                + Add Custom Paragraph
                            </Button>
                        </div>
                    </Card>
                </div>

                {/* Document Preview */}
                <div className="lg:col-span-8">
                    <div className="min-h-[850px] rounded-3xl bg-white p-12 font-serif text-[#1e293b] shadow-2xl">
                        {/* Letterhead */}
                        <div className="mb-12 flex items-start justify-between border-b-2 border-[#1e293b]/10 pb-8">
                            <div className="space-y-2">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0F172A] text-xl font-black text-white">
                                    HF
                                </div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-[#64748b]">
                                    HRFlow Solutions Pvt. Ltd.
                                </p>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] font-black uppercase tracking-widest text-[#64748b]">Reference No:</p>
                                <p className="text-xs font-bold font-sans">HF/EXP/2024/771</p>
                            </div>
                        </div>

                        <div className="space-y-8 text-sm leading-relaxed">
                            <p className="text-right font-sans font-bold">24 March 2024</p>

                            <h2 className="border-y border-[#1e293b]/5 py-4 text-center text-xl font-black uppercase tracking-[0.2em]">
                                To Whom It May Concern
                            </h2>

                            <p>
                                This is to certify that <b>Mr. Arnab Das</b> was employed with{" "}
                                <b>HRFlow Solutions Pvt. Ltd.</b> from <b>January 12, 2021</b> to{" "}
                                <b>April 24, 2024</b>.
                            </p>

                            <p>
                                During his tenure, Arnab served as a <b>Senior Frontend Lead</b>. In this capacity, he was
                                responsible for spearheading the UI/UX architecture for our flagship HRMS platform. His
                                technical expertise in React and design systems was instrumental in achieving a 40% reduction
                                in production deployment cycles.
                            </p>

                            <p>
                                Arnab is a dedicated professional with exceptional problem-solving abilities. He demonstrated
                                strong leadership qualities while mentoring a team of junior developers, consistently
                                delivering high-quality modules within strict timelines.
                            </p>

                            <p>
                                We found Arnab to be sincere, hardworking, and result-oriented. He carries a professional
                                demeanor and was well-liked by his peers and management alike.
                            </p>

                            <p>We wish him the very best in all his future technical endeavors.</p>

                            <div className="pt-24 space-y-2">
                                <p className="font-sans text-[10px] font-black uppercase tracking-widest text-[#64748b]">
                                    Authorized Signatory
                                </p>
                                <div className="h-px w-48 bg-[#1e293b]/20" />
                                <p className="text-xs font-bold font-sans">Human Resources Department</p>
                            </div>
                        </div>

                        {/* Watermark */}
                        <div
                            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-[25deg] select-none opacity-[0.03]"
                            aria-hidden="true"
                        >
                            <ShieldCheck size={400} />
                        </div>
                    </div>
                </div>
            </div>
        </Page>
    );
}
