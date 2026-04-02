"use client";

import React, { useState } from 'react';
import {
    Folder, FolderOpen, Plus, MoreVertical, Edit2, Trash2, ShieldCheck, UserCheck, Lock
} from 'lucide-react';

const CATEGORIES = [
    { id: 'C1', name: 'Employee Records', subcats: ['Offer Letters', 'ID Proofs', 'Relieving Letters'], access: 'HR Admin Only', files: 3450, color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
    { id: 'C2', name: 'Corporate Policies', subcats: ['Leave Policy', 'IT Policy', 'Code of Conduct'], access: 'All Employees', files: 45, color: 'text-[#00E5A0]', bg: 'bg-[#00E5A0]/10' },
    { id: 'C3', name: 'Compliance Docs', subcats: ['Tax Returns', 'PF Registrations', 'Labour Law Audits'], access: 'Finance & Legal', files: 128, color: 'text-amber-500', bg: 'bg-amber-500/10' },
    { id: 'C4', name: 'Training Material', subcats: ['Onboarding', 'Skill Upgradation', 'Security Training'], access: 'All Employees', files: 320, color: 'text-[#0066FF]', bg: 'bg-[#0066FF]/10' },
    { id: 'C5', name: 'Separation & FNF', subcats: ['Resignation Letters', 'Exit Interviews', 'FNF Statements'], access: 'HR Admin Only', files: 890, color: 'text-rose-500', bg: 'bg-rose-500/10' },
];

export default function DocumentCategoryScreen() {
    return (
        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-6xl mx-auto">

                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-white mb-1 flex items-center gap-3">
                            <FolderOpen className="text-[#0066FF]" size={28} />
                            Document Categories
                        </h1>
                        <p className="text-sm text-[#8899AA]">Manage global document classification and folder structures.</p>
                    </div>
                    <button className="px-4 py-2 bg-[#0066FF] text-white font-bold text-sm rounded-lg hover:bg-[#0052cc] transition-colors shadow-[0_0_15px_rgba(0,102,255,0.3)] flex items-center gap-2">
                        <Plus size={16} /> New Category
                    </button>
                </div>

                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl shadow-lg border-l-4 border-l-rose-500 p-4 mb-8 flex justify-between items-center">
                    <div>
                        <h3 className="font-bold text-white text-sm">Strict Access Control Enforcement</h3>
                        <p className="text-xs text-[#8899AA] mt-1">Categories labeled "HR Admin Only" cannot be shared publicly, overriding folder-level permissions.</p>
                    </div>
                    <button className="px-4 py-2 bg-[#1A2A3A] hover:bg-[#2A3A4A] text-white text-sm font-semibold rounded-lg transition-colors border border-[#2A3A4A]">
                        Review Policies
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {CATEGORIES.map(cat => (
                        <div key={cat.id} className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl overflow-hidden shadow-lg hover:border-[#2A3A4A] transition-colors group relative">
                            <div className="p-5 border-b border-[#1A2A3A]">
                                <div className="flex justify-between items-start mb-4">
                                    <div className={`w-12 h-12 rounded-lg ${cat.bg} flex items-center justify-center`}>
                                        <Folder className={cat.color} size={24} fill="currentColor" fillOpacity={0.2} />
                                    </div>
                                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="p-1.5 text-[#556677] hover:bg-[#1A2A3A] hover:text-white rounded"><Edit2 size={14} /></button>
                                        <button className="p-1.5 text-[#556677] hover:bg-[#1A2A3A] hover:text-rose-500 rounded"><Trash2 size={14} /></button>
                                    </div>
                                </div>
                                <h3 className="font-bold text-white text-lg mb-1">{cat.name}</h3>
                                <div className="text-xs text-[#8899AA]">{cat.files.toLocaleString()} total files stored</div>
                            </div>

                            <div className="p-5 space-y-4 bg-[#0D1928]">
                                <div>
                                    <div className="text-[10px] text-[#556677] uppercase font-bold mb-2 tracking-wider">Sub-Categories</div>
                                    <div className="flex flex-wrap gap-2">
                                        {cat.subcats.map(sub => (
                                            <span key={sub} className="text-[11px] px-2 py-1 bg-[#1A2A3A] text-slate-300 rounded-md border border-[#2A3A4A]">
                                                {sub}
                                            </span>
                                        ))}
                                        <button className="text-[11px] px-2 py-1 border border-dashed border-[#2A3A4A] text-[#556677] hover:text-white hover:border-[#556677] rounded-md transition-colors flex items-center gap-1">
                                            <Plus size={10} /> Add
                                        </button>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-[#1A2A3A]">
                                    <div className="text-[10px] text-[#556677] uppercase font-bold mb-2 tracking-wider">Default Access Level</div>
                                    <div className={`flex items-center gap-1.5 text-xs font-semibold
                                        ${cat.access === 'HR Admin Only' ? 'text-rose-500' :
                                            cat.access === 'All Employees' ? 'text-[#00E5A0]' : 'text-amber-500'}`}>
                                        {cat.access === 'HR Admin Only' ? <Lock size={14} /> :
                                            cat.access === 'All Employees' ? <UserCheck size={14} /> : <ShieldCheck size={14} />}
                                        {cat.access}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}
