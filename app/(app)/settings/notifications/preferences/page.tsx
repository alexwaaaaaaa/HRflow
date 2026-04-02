"use client";
import React, { useState } from 'react';
import { Sliders, Bell, Mail, Smartphone, Monitor } from 'lucide-react';

const PREFS = [
    { cat: 'Payroll & Compensation', items: ['Salary Slips', 'Tax Declarations', 'Expense Reimbursements'] },
    { cat: 'Leave & Attendance', items: ['Leave Approvals', 'Shift Changes', 'Attendance Regularisation'] },
    { cat: 'Performance & OKR', items: ['Goal Updates', 'Review Cycles', 'Continuous Feedback'] },
    { cat: 'Company Engagement', items: ['Announcements', 'R&R Spot Awards', 'Surveys'] },
];

export default function NotificationPreferencesPage() {
    return (
        <div className="min-h-screen p-6 max-w-4xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                        <Sliders className="text-[#00E5A0]" />
                        Notification Routing Preferences
                    </h1>
                    <p className="text-sm text-[#8899AA] mt-1">Control how and where different types of alerts are delivered.</p>
                </div>
                <button className="bg-[#00E5A0] hover:bg-emerald-400 text-[#060D1A] px-4 py-2 rounded-lg font-bold text-sm transition-colors">
                    Save Changes
                </button>
            </div>

            <div className="space-y-8">
                {PREFS.map((group, idx) => (
                    <div key={idx} className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl overflow-hidden">
                        <div className="bg-[#0D1928] px-6 py-4 border-b border-[#1A2A3A] flex justify-between items-center">
                            <h3 className="font-bold text-white">{group.cat}</h3>
                        </div>

                        <div className="divide-y divide-[#1A2A3A]">
                            {group.items.map((item, i) => (
                                <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-6 gap-4">
                                    <div>
                                        <h4 className="text-sm font-medium text-[#CCDDEE]">{item}</h4>
                                    </div>
                                    <div className="flex gap-4">
                                        <label className="flex items-center gap-2 cursor-pointer group">
                                            <div className="relative">
                                                <input type="checkbox" className="sr-only peer" defaultChecked={i !== 2} />
                                                <div className="w-10 h-6 bg-[#131B2B] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-500 border border-[#2A3A4A] transition-colors"></div>
                                            </div>
                                            <span className="text-xs text-[#8899AA] flex items-center gap-1 group-hover:text-white transition-colors"><Mail size={14} /> Email</span>
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer group">
                                            <div className="relative">
                                                <input type="checkbox" className="sr-only peer" defaultChecked={i === 0} />
                                                <div className="w-10 h-6 bg-[#131B2B] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500 border border-[#2A3A4A] transition-colors"></div>
                                            </div>
                                            <span className="text-xs text-[#8899AA] flex items-center gap-1 group-hover:text-white transition-colors"><Smartphone size={14} /> Push</span>
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer group">
                                            <div className="relative">
                                                <input type="checkbox" className="sr-only peer" defaultChecked />
                                                <div className="w-10 h-6 bg-[#131B2B] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500 border border-[#2A3A4A] transition-colors"></div>
                                            </div>
                                            <span className="text-xs text-[#8899AA] flex items-center gap-1 group-hover:text-white transition-colors"><Monitor size={14} /> In-App</span>
                                        </label>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
