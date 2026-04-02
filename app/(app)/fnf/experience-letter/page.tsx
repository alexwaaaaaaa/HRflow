"use client";

import React from 'react';
import {
    FileText, Download, Printer, ArrowLeft,
    ChevronRight, Save, Info, ShieldCheck, User, Briefcase, Mail, CheckCircle
} from 'lucide-react';

export default function ExperienceLetter() {
    return (
        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-700">

                {/* Header */}
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4">
                        <button className="p-2 hover:bg-[#1A2A3A] rounded-xl transition-all text-slate-400">
                            <ArrowLeft size={20} />
                        </button>
                        <div>
                            <h1 className="text-2xl font-black text-white tracking-tight">Experience Certificate</h1>
                            <p className="text-slate-400 text-sm font-medium">Generate and issue professional experience letters.</p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-5 py-2.5 bg-[#0D1928] border border-[#1A2A3A] rounded-xl text-sm font-bold text-slate-400 hover:text-white transition-all flex items-center shadow-lg">
                            <Printer size={16} className="mr-2" /> Print Preview
                        </button>
                        <button className="px-6 py-2.5 bg-[#0066FF] rounded-xl text-sm font-black text-white hover:bg-[#0052cc] transition-all shadow-[0_0_20px_rgba(0,102,255,0.3)]">
                            Issue Certificate
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Template Customizer */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 space-y-8 shadow-2xl relative overflow-hidden group">
                            <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest border-b border-[#1A2A3A] pb-4 italic">Letter Template</h3>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-500 uppercase">Template Style</label>
                                    <select className="w-full bg-[#060B14] border border-[#1A2A3A] rounded-xl px-4 py-3.5 text-xs font-bold text-white outline-none focus:border-blue-500/50 appearance-none shadow-inner">
                                        <option>Modern Professional (Standard)</option>
                                        <option>Traditional Narrative</option>
                                        <option>Minimalist Tech-Style</option>
                                        <option>Detailed Skill-Based</option>
                                    </select>
                                </div>

                                <div className="space-y-4 pt-4">
                                    <label className="text-[10px] font-black text-slate-500 uppercase">Include Sections</label>
                                    {[
                                        { label: 'Technical Core Skills', checked: true },
                                        { label: 'Key Project Achievements', checked: true },
                                        { label: 'Leadership Summary', checked: false },
                                        { label: 'Direct Manager Reference', checked: true },
                                    ].map((opt, i) => (
                                        <div key={i} className="flex items-center gap-3 p-3 bg-[#060B14] border border-[#1A2A3A] rounded-xl group/item cursor-pointer hover:border-blue-500/20 transition-all">
                                            <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${opt.checked ? 'bg-blue-600 border-blue-600' : 'border-[#1A2A3A]'}`}>
                                                {opt.checked && <CheckCircle size={10} className="text-white" />}
                                            </div>
                                            <span className="text-[11px] font-bold text-slate-400 group-hover/item:text-slate-200">{opt.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-4">
                                <button className="w-full py-3 bg-[#0D1928] border border-blue-500/20 rounded-xl text-blue-500 font-bold text-[10px] uppercase tracking-widest hover:bg-blue-500/5 transition-all">
                                    + Add Custom Paragraph
                                </button>
                            </div>

                            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000" />
                        </div>
                    </div>

                    {/* Document Preview */}
                    <div className="lg:col-span-8 space-y-6">
                        <div className="bg-white rounded-3xl p-12 shadow-[0_30px_60px_rgba(0,0,0,0.5)] relative overflow-hidden group min-h-[850px] text-[#1e293b] font-serif">

                            {/* Company Letterhead */}
                            <div className="flex justify-between items-start border-b-2 border-[#1e293b]/10 pb-8 mb-12">
                                <div className="space-y-2">
                                    <div className="w-12 h-12 bg-[#0F172A] rounded-xl flex items-center justify-center font-black text-white text-xl">HF</div>
                                    <div className="text-[10px] font-black text-[#64748b] uppercase tracking-widest">HRFlow Solutions Pvt. Ltd.</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-[10px] font-black text-[#64748b] uppercase tracking-widest">Reference No:</div>
                                    <div className="text-xs font-bold font-sans">HF/EXP/2024/771</div>
                                </div>
                            </div>

                            <div className="space-y-10 leading-relaxed text-sm">
                                <div className="text-right font-sans font-bold mb-10">24 March 2024</div>

                                <h2 className="text-xl font-black text-center uppercase tracking-[0.2em] border-y py-4 border-[#1e293b]/5 mb-12">To Whom It May Concern</h2>

                                <p>
                                    This is to certify that <b>Mr. Arnab Das</b> was employed with <b>HRFlow Solutions Pvt. Ltd.</b>
                                    from <b>January 12, 2021</b> to <b>April 24, 2024</b>.
                                </p>

                                <p>
                                    During his tenure, Arnab served as a <b>Senior Frontend Lead</b>. In this capacity,
                                    he was responsible for spearheading the UI/UX architecture for our flagship HRMS platform.
                                    His technical expertise in React and design systems was instrumental in achieving
                                    a 40% reduction in production deployment cycles.
                                </p>

                                <p>
                                    Arnab is a dedicated professional with exceptional problem-solving abilities.
                                    He demonstrated strong leadership qualities while mentoring a team of junior developers,
                                    consistently delivering high-quality modules within strict timelines.
                                </p>

                                <p>
                                    We found Arnab to be sincere, hardworking, and result-oriented. He carries
                                    a professional demeanor and was well-liked by his peers and management alike.
                                </p>

                                <p>
                                    We wish him the very best in all his future technical endeavors.
                                </p>

                                <div className="pt-24 space-y-2">
                                    <div className="font-sans font-black uppercase text-[10px] tracking-widest text-[#64748b]">Authorized Signatory</div>
                                    <div className="w-48 h-px bg-[#1e293b]/20" />
                                    <div className="text-xs font-bold font-sans">Human Resources Department</div>
                                </div>
                            </div>

                            {/* Watermark */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] rotate-[-25deg] pointer-events-none select-none">
                                <ShieldCheck size={400} />
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}
