"use client";

import Page from "@/components/ui/Page";
import React, { useState } from 'react';
import { HeadphonesIcon, Laptop, MonitorSmartphone, Key, ShieldAlert, Paperclip, Send } from 'lucide-react';

const CATEGORIES = [
    { id: 'Hardware', icon: Laptop, desc: 'Laptop, Monitor, Mouse' },
    { id: 'Software', icon: MonitorSmartphone, desc: 'App installation, OS issues' },
    { id: 'Access', icon: Key, desc: 'Passwords, VPN, SSO' },
    { id: 'Security', icon: ShieldAlert, desc: 'Phishing, Malware, Data' },
];

export default function CreateTicketScreen() {
    const [category, setCategory] = useState('');

    return (
        <Page
            title="Raise IT Support Ticket"
            subtitle="Describe your issue and IT will get back to you shortly."
            breadcrumbs={[{ label: "Assets", href: "/assets" }, { label: "Create Ticket" }]}
            maxWidth="900px"
        >
        <div className="space-y-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3"><HeadphonesIcon size={24} className="text-sky-400" /> Raise IT Support Ticket</h1>
                    <p className="text-[#8899AA] text-sm mt-1">Describe your issue and IT will get back to you shortly.</p>
                </div>
            </div>

            <div className="space-y-8">
                <div>
                    <h2 className="text-white font-bold mb-4">1. What do you need help with?</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {CATEGORIES.map(c => {
                            const Icon = c.icon;
                            return (
                                <label key={c.id} className={`flex flex-col items-center justify-center p-6 border rounded-2xl cursor-pointer transition-all ${category === c.id ? 'bg-sky-500/10 border-sky-500 shadow-[0_0_15px_rgba(14,165,233,0.2)]' : 'bg-[#0A1420] border-[#1A2A3A] hover:border-[#2A3A4A] hover:bg-[#131B2B]'}`}>
                                    <input type="radio" name="category" value={c.id} onChange={(e) => setCategory(e.target.value)} className="hidden" />
                                    <Icon size={32} className={`mb-3 ${category === c.id ? 'text-sky-400' : 'text-[#556677]'}`} />
                                    <div className={`font-bold text-sm mb-1 ${category === c.id ? 'text-white' : 'text-[#8899AA]'}`}>{c.id}</div>
                                    <div className="text-[#556677] text-[10px] text-center">{c.desc}</div>
                                </label>
                            );
                        })}
                    </div>
                </div>

                {category && (
                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-8 space-y-6 animate-in fade-in slide-in-from-bottom-4">
                        <h2 className="text-white font-bold mb-2">2. Provide Details</h2>

                        <div className="space-y-5">
                            <div>
                                <label className="block text-[#8899AA] text-xs font-bold mb-2">Issue Priority (Optional)</label>
                                <select className="bg-[#131B2B] border border-[#2A3A4A] rounded-xl px-4 py-2 text-white focus:border-sky-500 outline-none appearance-none">
                                    <option>Low - Does not affect daily work</option>
                                    <option defaultValue="Medium">Medium - Affects some tasks</option>
                                    <option>High - Unable to work at all</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-[#8899AA] text-xs font-bold mb-2">Subject / Short Summary *</label>
                                <input type="text" placeholder="e.g. Broken keyboard key" className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl px-4 py-3 text-white focus:border-sky-500 outline-none transition-colors" />
                            </div>

                            <div>
                                <label className="block text-[#8899AA] text-xs font-bold mb-2">Detailed Description *</label>
                                <textarea rows={5} placeholder="Please provide as much context as possible. Steps to reproduce, error messages, etc." className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl px-4 py-3 text-white focus:border-sky-500 outline-none transition-colors resize-none"></textarea>
                            </div>

                            <div className="border border-dashed border-[#2A3A4A] rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:border-sky-500 transition-colors bg-[#131B2B]">
                                <Paperclip size={24} className="text-[#556677] mb-2" />
                                <div className="text-white text-sm font-bold mb-1">Upload Screenshots</div>
                                <div className="text-[#556677] text-xs">PNG, JPG up to 5MB</div>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-[#1A2A3A] flex justify-end">
                            <button className="bg-sky-600 hover:bg-sky-500 text-white font-bold px-8 py-3 rounded-xl transition-colors flex items-center gap-2 shadow-[0_0_15px_rgba(14,165,233,0.3)]">
                                Submit Ticket <Send size={18} />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
        </Page>
    );
}
