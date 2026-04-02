"use client";
import React, { useState } from 'react';
import { LayoutTemplate, Code2, Eye } from 'lucide-react';

export default function NotificationTemplatePage() {
    const [view, setView] = useState<'editor' | 'preview'>('editor');

    return (
        <div className="min-h-screen p-6 max-w-5xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                        <LayoutTemplate className="text-emerald-500" />
                        Notification Templates
                    </h1>
                    <p className="text-sm text-[#8899AA] mt-1">Design rich email and push templates using Handlebars syntax.</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => setView('editor')}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex gap-2 items-center ${view === 'editor' ? 'bg-[#1A2A3A] text-white' : 'text-[#8899AA] hover:text-white hover:bg-[#0A1420]'}`}
                    >
                        <Code2 size={16} /> Edit Code
                    </button>
                    <button
                        onClick={() => setView('preview')}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex gap-2 items-center ${view === 'preview' ? 'bg-[#1A2A3A] text-white' : 'text-[#8899AA] hover:text-white hover:bg-[#0A1420]'}`}
                    >
                        <Eye size={16} /> Preview
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="col-span-1 space-y-2">
                    <h3 className="text-xs font-bold text-[#8899AA] uppercase tracking-wider mb-4">Template Library</h3>
                    {['Welcome Email', 'Payslip Ready', 'Leave Approved', 'Password Reset'].map((t, i) => (
                        <button key={i} className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-colors border ${i === 1 ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 font-bold' : 'bg-[#0A1420] border-[#1A2A3A] hover:border-[#2A3A4A] text-[#CCDDEE]'}`}>
                            {t}
                        </button>
                    ))}
                </div>

                <div className="col-span-1 md:col-span-3 bg-[#0A1420] border border-[#1A2A3A] rounded-xl overflow-hidden flex flex-col h-[600px]">
                    <div className="flex border-b border-[#1A2A3A] p-2 bg-[#060D1A]">
                        <div className="flex-1 px-4 py-2">
                            <label className="text-xs text-[#556677] uppercase font-bold tracking-wider">Subject Line</label>
                            <input type="text" defaultValue="Your Salary Slip for {{month_year}} is Ready!" className="w-full bg-transparent text-white font-medium outline-none mt-1" />
                        </div>
                    </div>

                    <div className="flex-1 p-0 relative">
                        {view === 'editor' ? (
                            <textarea
                                className="w-full h-full bg-[#060D1A] text-[#CCDDEE] p-6 font-mono text-sm resize-none outline-none focus:border focus:border-emerald-500/50"
                                defaultValue={`<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">\n  <h2>Hi {{employee.first_name}},</h2>\n  <p>Your salary slip for the month of <strong>{{month_year}}</strong> has been generated and is ready for download.</p>\n  <div style="padding: 20px; background: #f4f4f5; border-radius: 8px;">\n    <p>Net Pay: <strong>₹ {{payroll.net_pay}}</strong></p>\n    <p>Credited To: {{employee.bank_accountMasked}}</p>\n  </div>\n  <a href="{{app_url}}/payroll/my-slips" style="display: inline-block; padding: 12px 24px; background: #10b981; color: white; text-decoration: none; border-radius: 6px; margin-top: 20px;">Download Payslip</a>\n</div>`}
                            />
                        ) : (
                            <div className="w-full h-full bg-white p-10 overflow-auto">
                                <div style={{ fontFamily: 'sans-serif', maxWidth: '600px', margin: '0 auto', color: '#333' }}>
                                    <h2>Hi Anjali,</h2>
                                    <p>Your salary slip for the month of <strong>October 2024</strong> has been generated and is ready for download.</p>
                                    <div style={{ padding: '20px', background: '#f4f4f5', borderRadius: '8px' }}>
                                        <p>Net Pay: <strong>₹ 84,500</strong></p>
                                        <p>Credited To: ********4829</p>
                                    </div>
                                    <a href="#" style={{ display: 'inline-block', padding: '12px 24px', background: '#10b981', color: 'white', textDecoration: 'none', borderRadius: '6px', marginTop: '20px' }}>Download Payslip</a>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
