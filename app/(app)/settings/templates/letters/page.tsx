"use client";

import React, { useState } from 'react';
import { FileSignature, Plus, Search, Eye, Copy, MoreVertical, Type, Code } from 'lucide-react';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function LetterTemplateBuilderPage() {
    const templates = [
        { id: 'LTR-001', name: 'Offer Letter (Standard)', category: 'Recruitment', status: 'Active', variables: 14, lastUsed: '2 days ago' },
        { id: 'LTR-002', name: 'Appointment Letter', category: 'Onboarding', status: 'Active', variables: 18, lastUsed: 'Yesterday' },
        { id: 'LTR-003', name: 'Experience Certificate', category: 'Separation', status: 'Active', variables: 9, lastUsed: '1 week ago' },
        { id: 'LTR-004', name: 'Salary Revision Letter', category: 'Compensation', status: 'Active', variables: 12, lastUsed: '3 days ago' },
        { id: 'LTR-005', name: 'Relieving Letter', category: 'Separation', status: 'Draft', variables: 8, lastUsed: 'Never' },
    ];

    return (
        <div className="p-6 md:p-8 animate-fade-in max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight mb-2 flex items-center gap-3">
                        <FileSignature size={28} className="text-indigo-400" /> Letter Templates
                    </h1>
                    <p className="text-[#8899AA] text-sm max-w-2xl">
                        Design professional letter templates with dynamic merge fields. Auto-generated from employee and company data.
                    </p>
                </div>
                <Button className="bg-indigo-600 hover:bg-indigo-500 text-white border-none py-2 px-6">
                    <Plus size={16} className="mr-2" /> Create Template
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {templates.map((tpl) => (
                    <div key={tpl.id} className="bg-[#0D1928] border border-[#1A2A3A] hover:border-[#2A3A4A] rounded-2xl p-5 group transition-all hover:shadow-lg">
                        <div className="flex justify-between items-start mb-3">
                            <div>
                                <h3 className="text-white font-semibold text-sm group-hover:text-indigo-400 transition-colors">{tpl.name}</h3>
                                <span className="text-[10px] text-[#445566] font-mono">{tpl.id}</span>
                            </div>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${tpl.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                                }`}>{tpl.status}</span>
                        </div>
                        <div className="flex items-center gap-2 mb-4">
                            <span className="bg-[#1A2A3A] text-[#8899AA] border border-[#2A3A4A] px-2 py-0.5 rounded text-[10px]">{tpl.category}</span>
                            <span className="text-[10px] text-[#445566] flex items-center gap-1"><Code size={10} /> {tpl.variables} variables</span>
                        </div>
                        <div className="flex justify-between items-center pt-3 border-t border-[#1A2A3A] text-xs text-[#8899AA]">
                            <span>Last used: {tpl.lastUsed}</span>
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Link href="/settings/templates/letters/preview"><button className="p-1.5 bg-[#1A2A3A] border border-[#2A3A4A] rounded-lg hover:text-white transition-colors"><Eye size={12} /></button></Link>
                                <button className="p-1.5 bg-[#1A2A3A] border border-[#2A3A4A] rounded-lg hover:text-white transition-colors"><Copy size={12} /></button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
