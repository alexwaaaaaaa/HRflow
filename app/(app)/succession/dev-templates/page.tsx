"use client";
import React from 'react';
import { Library, Link as LinkIcon, FileText, Download, Briefcase, Code } from 'lucide-react';
import Link from 'next/link';

export default function DevTemplatesScreen() {
    const TEMPLATES = [
        { title: 'C-Suite Acceleration Track', desc: 'A rigorous 18-month plan focused on board communication, P&L ownership, and crisis management.', uses: 12, cat: 'Executive' },
        { title: 'Technical to People Leader', desc: 'Transition plan for distinguished engineers moving into VP Engineering or Director roles.', uses: 34, cat: 'Engineering' },
        { title: 'Enterprise GTM Expansion', desc: 'Readiness plan for revenue leaders focusing on multi-product, global market scaling strategies.', uses: 8, cat: 'Sales' },
        { title: 'Emerging Leader Bootstrap', desc: 'Foundational framework for high-potential ICs showing early signs of leadership capability.', uses: 156, cat: 'General' },
    ];

    return (
        <div className="min-h-screen p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3"><Library size={24} className="text-indigo-400" /> IDP Template Library</h1>
                    <p className="text-[#8899AA] text-sm mt-1">Standardized development roadmaps for common succession pathways (70/20/10 models).</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors flex items-center gap-2 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                        + Create New Template
                    </button>
                </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {TEMPLATES.map((tmpl, i) => (
                    <div key={i} className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 hover:border-indigo-500/40 transition-colors flex flex-col group h-full cursor-pointer">
                        <div className="mb-4">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-white font-bold text-lg leading-tight group-hover:text-indigo-400 transition-colors">{tmpl.title}</h3>
                                <span className="bg-[#1A2A3A] text-[#8899AA] text-[10px] font-bold px-2 py-0.5 rounded uppercase border border-[#2A3A4A] shrink-0 ml-2">{tmpl.cat}</span>
                            </div>
                            <p className="text-[#556677] text-sm leading-relaxed">{tmpl.desc}</p>
                        </div>

                        <div className="grid grid-cols-3 gap-2 mt-auto pb-6">
                            <div className="bg-[#131B2B] rounded px-2 py-1 text-center border border-[#1A2A3A]">
                                <div className="text-[#AABBCC] font-bold text-xs">70%</div>
                                <div className="text-[#556677] text-[10px] uppercase">Exp.</div>
                            </div>
                            <div className="bg-[#131B2B] rounded px-2 py-1 text-center border border-[#1A2A3A]">
                                <div className="text-[#AABBCC] font-bold text-xs">20%</div>
                                <div className="text-[#556677] text-[10px] uppercase">Exp.</div>
                            </div>
                            <div className="bg-[#131B2B] rounded px-2 py-1 text-center border border-[#1A2A3A]">
                                <div className="text-[#AABBCC] font-bold text-xs">10%</div>
                                <div className="text-[#556677] text-[10px] uppercase">Edu.</div>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-[#1A2A3A] flex justify-between items-center text-xs">
                            <span className="text-[#8899AA] font-bold font-mono bg-[#1A2A3A] px-2 py-1 rounded">Applied: {tmpl.uses} times</span>
                            <span className="text-indigo-400 font-bold hover:text-white transition-colors">Preview Roadmap &rarr;</span>
                        </div>
                    </div>
                ))}

                <div className="bg-[#0A1420]/30 border-2 border-dashed border-[#1A2A3A] hover:border-indigo-500/30 rounded-2xl p-6 transition-colors flex flex-col items-center justify-center text-center group cursor-pointer h-full min-h-[250px]">
                    <div className="w-12 h-12 rounded-full border border-[#2A3A4A] bg-[#131B2B] text-[#556677] flex items-center justify-center mb-3 group-hover:text-indigo-400 group-hover:border-indigo-500/30 group-hover:bg-indigo-500/10 transition-colors">
                        <Code size={20} />
                    </div>
                    <h3 className="text-[#8899AA] font-bold group-hover:text-white transition-colors">Import JSON Framework</h3>
                    <p className="text-[#556677] text-xs mt-1">Upload external mapping model</p>
                </div>
            </div>
        </div>
    );
}
