"use client";

import Page from "@/components/ui/Page";
import React from 'react';
import { Shield, ArrowLeft, Heart, Wifi, Coffee, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function MyBenefitsScreen() {
    const BENEFITS = [
        { icon: Heart, label: 'Health Insurance (GMC)', provider: 'Star Health', coverage: '₹5,00,000 Family Floater', tags: ['Self', 'Spouse', '2 Children'], color: 'text-rose-400', bg: 'bg-rose-500', hoverBorder: 'hover:border-rose-500/50' },
        { icon: Shield, label: 'Accident Cover (GPA)', provider: 'ICICI Lombard', coverage: '₹15,00,000 Base Sum', tags: ['Self Only'], color: 'text-emerald-400', bg: 'bg-emerald-500', hoverBorder: 'hover:border-emerald-500/50' },
        { icon: Wifi, label: 'Internet Allowance', provider: 'Direct Claim', coverage: '₹1,500 / Month', tags: ['Reimbursement'], color: 'text-blue-400', bg: 'bg-blue-500', hoverBorder: 'hover:border-blue-500/50' },
        { icon: Coffee, label: 'Food Card', provider: 'Sodexo / Pluxee', coverage: '₹2,500 / Month', tags: ['Pre-loaded Card'], color: 'text-amber-400', bg: 'bg-amber-500', hoverBorder: 'hover:border-amber-500/50' }
    ];

    return (
        <Page
            title="My Benefits Portfolio"
            subtitle="Manage your active corporate perks, insurance coverages, and allowances."
            breadcrumbs={[{ label: "Self Service", href: "/self-service" }, { label: "Benefits" }]}
            maxWidth="1300px"
        >

        <div className="min-h-screen p-6 max-w-6xl mx-auto space-y-6">
            <Link href="/ess/dashboard" className="text-[#556677] hover:text-white text-sm font-bold flex items-center gap-1 mb-2"><ArrowLeft size={14} /> Back to Dashboard</Link>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3"><Shield size={22} className="text-purple-400" /> My Benefits Portfolio</h1>
                    <p className="text-[#8899AA] text-sm mt-1">Manage your active corporate perks, insurance coverages, and allowances.</p>
                </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {BENEFITS.map((b, i) => {
                    const Icon = b.icon;
                    return (


                        <div key={i} className={`bg-[#0A1420] border border-[#1A2A3A] ${b.hoverBorder} rounded-2xl p-6 transition-colors group flex flex-col h-full`}>
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${b.bg}/10 ${b.color}`}>
                                <Icon size={24} />
                            </div>
                            <h3 className="text-white font-bold text-lg mb-1">{b.label}</h3>
                            <div className="text-[#8899AA] text-sm mb-4">Partner: <span className="text-white">{b.provider}</span></div>

                            <div className="mt-auto pt-4 border-t border-[#1A2A3A]">
                                <div className="text-[#AABBCC] text-xs font-bold uppercase tracking-wider mb-1">Coverage / Limit</div>
                                <div className="text-white font-bold mb-3">{b.coverage}</div>
                                <div className="flex flex-wrap gap-2">
                                    {b.tags.map(t => (
                                        <span key={t} className="bg-[#131B2B] text-[#556677] px-2 py-1 rounded text-[10px] font-bold uppercase">{t}</span>
                                    ))}
                                </div>
                            </div>
                            <button className="mt-6 w-full flex items-center justify-center gap-2 bg-[#131B2B] hover:bg-[#1A2A3A] border border-[#2A3A4A] text-white font-bold py-2.5 rounded-xl text-sm transition-colors group-hover:bg-[#1A2A3A]">
                                Manage <ExternalLink size={14} className="text-[#556677]" />
                            </button>
                        </div>
                    
        
);
                })}
            </div>
        </div>
    
        </Page>
    );
}
