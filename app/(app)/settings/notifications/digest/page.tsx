"use client";
import React from 'react';
import { Mailbox, Clock, Save } from 'lucide-react';

export default function DigestEmailSetupPage() {
    return (
        <div className="min-h-screen p-6 max-w-3xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                        <Mailbox className="text-amber-500" />
                        Digest Email Configuration
                    </h1>
                    <p className="text-sm text-[#8899AA] mt-1">Batch non-urgent notifications into a single daily or weekly summary email.</p>
                </div>
            </div>

            <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl p-6 space-y-6">
                <div>
                    <label className="flex items-center justify-between cursor-pointer">
                        <div>
                            <span className="text-white font-medium text-sm">Enable Digest Emails</span>
                            <p className="text-xs text-[#556677] mt-1">Turn off to send everything instantly (not recommended for large teams).</p>
                        </div>
                        <div className="relative">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-[#131B2B] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500 border border-[#2A3A4A] transition-colors"></div>
                        </div>
                    </label>
                </div>

                <div className="border-t border-[#1A2A3A] pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-xs font-bold text-[#8899AA] uppercase tracking-wider mb-2">Frequency</label>
                        <select className="w-full bg-[#060D1A] border border-[#1A2A3A] rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-amber-500">
                            <option>Daily Digest</option>
                            <option>Weekly Digest</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-[#8899AA] uppercase tracking-wider mb-2">Delivery Time</label>
                        <div className="relative">
                            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#556677]" size={16} />
                            <select className="w-full pl-10 pr-3 py-2 bg-[#060D1A] border border-[#1A2A3A] rounded-lg text-white text-sm outline-none focus:border-amber-500">
                                <option>08:00 AM</option>
                                <option>09:00 AM</option>
                                <option>05:00 PM</option>
                                <option>06:00 PM</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="border-t border-[#1A2A3A] pt-6 flex justify-end">
                    <button className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-[#060D1A] px-6 py-2 rounded-lg font-bold text-sm transition-colors shadow-lg shadow-amber-500/20">
                        <Save size={16} /> Save Setup
                    </button>
                </div>
            </div>
        </div>
    );
}
