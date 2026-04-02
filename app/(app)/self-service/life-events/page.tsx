"use client";
import React from 'react';
import { HeartHandshake, ArrowLeft, Home, Baby, Gift, Plane, GraduationCap } from 'lucide-react';
import Link from 'next/link';

export default function LifeEventsScreen() {
    const EVENTS = [
        { icon: Gift, label: 'Marriage', desc: 'Update spouse details, dependent insurance, and nominee.', bg: 'bg-rose-500/10 text-rose-400', border: 'hover:border-rose-500/50' },
        { icon: Baby, label: 'Childbirth / Adoption', desc: 'Add child to insurance, apply for parental leave, edit tax setup.', bg: 'bg-blue-500/10 text-blue-400', border: 'hover:border-blue-500/50' },
        { icon: Home, label: 'Relocation', desc: 'Update residential address, HRA applicability, and branch mapping.', bg: 'bg-emerald-500/10 text-emerald-400', border: 'hover:border-emerald-500/50' },
        { icon: Plane, label: 'Immigration / Visa', desc: 'Upload new visa details, passport updates for global travel.', bg: 'bg-indigo-500/10 text-indigo-400', border: 'hover:border-indigo-500/50' },
        { icon: GraduationCap, label: 'Higher Education', desc: 'Apply for tuition reimbursement, sabbatical, or adjust work hours.', bg: 'bg-purple-500/10 text-purple-400', border: 'hover:border-purple-500/50' },
    ];

    return (
        <div className="min-h-screen p-6 max-w-5xl mx-auto space-y-6">
            <Link href="/ess/dashboard" className="text-[#556677] hover:text-white text-sm font-bold flex items-center gap-1 mb-2"><ArrowLeft size={14} /> Back to Dashboard</Link>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3"><HeartHandshake size={22} className="text-pink-400" /> Life Events</h1>
                    <p className="text-[#8899AA] text-sm mt-1">Easily update your HR, payroll, and benefits when your life circumstances change.</p>
                </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {EVENTS.map((e, i) => {
                    const Icon = e.icon;
                    return (
                        <div key={i} className={`bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 cursor-pointer transition-colors ${e.border} group`}>
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110 ${e.bg}`}>
                                <Icon size={28} />
                            </div>
                            <h3 className="text-white font-bold text-lg mb-2">{e.label}</h3>
                            <p className="text-[#8899AA] text-sm leading-relaxed">{e.desc}</p>
                            <div className="mt-6">
                                <span className="text-xs font-bold text-[#556677] group-hover:text-white transition-colors flex items-center gap-1">Start Wizard <ArrowLeft size={12} className="rotate-180" /></span>
                            </div>
                        </div>
                    );
                })}

                <div className="bg-gradient-to-br from-[#131B2B] to-[#0A1420] border border-[#2A3A4A] border-dashed rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:border-pink-500/50 transition-colors">
                    <div className="w-12 h-12 rounded-full border-2 border-[#556677] flex items-center justify-center text-[#556677] mb-3">
                        <span className="text-2xl">+</span>
                    </div>
                    <h3 className="text-white font-bold">Other Change</h3>
                    <p className="text-[#8899AA] text-xs mt-1 max-w-[200px]">Something else? Contact HR ops directly.</p>
                </div>
            </div>
        </div>
    );
}
