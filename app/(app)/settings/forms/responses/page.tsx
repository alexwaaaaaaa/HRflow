"use client";

import React from 'react';
import { FileText, Download, ArrowLeft, Clock, User } from 'lucide-react';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function FormResponsePage() {
    const responses = [
        { id: 1, respondent: 'Kavya Singh', submitted: 'Mar 5, 2024 — 2:30 PM', answers: { 'Reason for Leaving': 'Career Growth', 'Rating (1-10)': '7', 'Would Recommend?': 'Yes', 'Feedback': 'Great culture but limited L&D budget.' } },
        { id: 2, respondent: 'Rohan Mehta', submitted: 'Feb 28, 2024 — 11:00 AM', answers: { 'Reason for Leaving': 'Compensation', 'Rating (1-10)': '5', 'Would Recommend?': 'Maybe', 'Feedback': 'Pay was below market after 2 years.' } },
        { id: 3, respondent: 'Aditi Sharma', submitted: 'Feb 20, 2024 — 4:15 PM', answers: { 'Reason for Leaving': 'Manager', 'Rating (1-10)': '4', 'Would Recommend?': 'No', 'Feedback': 'Micromanagement was a serious issue.' } },
    ];

    return (
        <div className="p-6 md:p-8 animate-fade-in max-w-5xl mx-auto">
            <Link href="/settings/forms" className="text-[#8899AA] hover:text-white text-sm mb-6 inline-block">&larr; Back to Forms</Link>

            <div className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight mb-2 flex items-center gap-3">
                        <FileText size={28} className="text-indigo-400" /> Exit Interview Responses
                    </h1>
                    <p className="text-[#8899AA] text-sm">42 total responses • Form: FRM-001</p>
                </div>
                <Button variant="secondary" className="border-[#2A3A4A] text-white"><Download size={16} className="mr-2" /> Export All</Button>
            </div>

            <div className="space-y-4">
                {responses.map((res) => (
                    <div key={res.id} className="bg-[#0D1928] border border-[#1A2A3A] hover:border-[#2A3A4A] rounded-2xl p-5 transition-colors">
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-[10px] font-bold text-white">{res.respondent.split(' ').map(n => n[0]).join('')}</div>
                                <div>
                                    <div className="text-white font-medium text-sm">{res.respondent}</div>
                                    <div className="text-xs text-[#8899AA] flex items-center gap-1"><Clock size={10} /> {res.submitted}</div>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {Object.entries(res.answers).map(([q, a], i) => (
                                <div key={i} className="bg-[#131B2B] border border-[#2A3A4A] rounded-lg p-3">
                                    <div className="text-[10px] text-[#445566] uppercase tracking-wider font-semibold mb-1">{q}</div>
                                    <div className="text-sm text-white">{a}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
