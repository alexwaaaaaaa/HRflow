"use client";

import React, { useState } from 'react';
import {
    Search, UserPlus, Calendar, FileText, ChevronRight,
    AlertTriangle, Info, CheckCircle, ArrowLeft
} from 'lucide-react';

export default function InitiateFnF() {
    const [step, setStep] = useState(1);
    const [selectedEmp, setSelectedEmp] = useState<any>(null);

    const employees = [
        { id: 'EMP-771', name: 'Arnab Das', dept: 'Engineering', designation: 'Senior Developer', joinDate: '12 Jan 2021' },
        { id: 'EMP-892', name: 'Sanya Gupta', dept: 'Marketing', designation: 'Product Manager', joinDate: '05 Mar 2022' },
        { id: 'EMP-443', name: 'Rahul Verma', dept: 'Product', designation: 'Designer', joinDate: '18 Nov 2020' },
    ];

    return (
        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-4xl mx-auto">

                {/* Back Button & Header */}
                <div className="mb-8 flex items-center gap-4">
                    <button className="p-2 hover:bg-[#1A2A3A] rounded-xl transition-all text-slate-400 hover:text-white">
                        <ArrowLeft size={20} />
                    </button>
                    <div>
                        <h1 className="text-2xl font-black text-white tracking-tight">Initiate Offboarding</h1>
                        <p className="text-slate-400 text-sm font-medium">Start the Full & Final settlement process for an employee.</p>
                    </div>
                </div>

                {/* Progress Stepper */}
                <div className="flex items-center gap-4 mb-10 px-4">
                    {[
                        { num: 1, label: 'Select Employee' },
                        { num: 2, label: 'Resignation Details' },
                        { num: 3, label: 'Notice Period' },
                        { num: 4, label: 'Workflows' }
                    ].map((s, i) => (
                        <React.Fragment key={i}>
                            <div className="flex flex-col items-center gap-2">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-sm border-2 transition-all ${step >= s.num ? 'bg-blue-600 border-blue-600 text-white shadow-[0_0_15px_rgba(0,102,255,0.4)]' : 'border-[#1A2A3A] text-slate-500'
                                    }`}>
                                    {step > s.num ? <CheckCircle size={18} /> : s.num}
                                </div>
                                <span className={`text-[10px] uppercase font-black tracking-widest ${step >= s.num ? 'text-white' : 'text-slate-600'}`}>
                                    {s.label}
                                </span>
                            </div>
                            {i < 3 && <div className={`flex-1 h-0.5 rounded-full transition-all ${step > s.num ? 'bg-blue-600' : 'bg-[#1A2A3A]'}`} />}
                        </React.Fragment>
                    ))}
                </div>

                {/* Step Content */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden shadow-2xl">
                    {step === 1 && (
                        <div className="p-8 space-y-6">
                            <div className="relative">
                                <Search size={20} className="absolute left-4 top-3.5 text-slate-500" />
                                <input
                                    type="text"
                                    placeholder="Search by name, ID or department..."
                                    className="w-full bg-[#060B14] border border-[#1A2A3A] rounded-xl pl-12 pr-4 py-3.5 text-white font-medium outline-none focus:border-blue-500/50 transition-all text-lg"
                                />
                            </div>

                            <div className="grid grid-cols-1 gap-4 mt-8">
                                <h3 className="text-xs font-black text-slate-500 uppercase tracking-widest">Recent Selections</h3>
                                {employees.map((emp, i) => (
                                    <div
                                        key={i}
                                        onClick={() => setSelectedEmp(emp)}
                                        className={`p-4 rounded-xl border border-[#1A2A3A] bg-[#060B14] group cursor-pointer hover:border-blue-500/30 transition-all flex items-center justify-between ${selectedEmp?.id === emp.id ? 'border-blue-500 bg-blue-500/5 shadow-[0_0_20px_rgba(0,102,255,0.1)]' : ''
                                            }`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1A2A3A] to-slate-800 flex items-center justify-center font-black text-blue-400">
                                                {emp.name.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <div>
                                                <div className="font-bold text-white text-lg">{emp.name}</div>
                                                <div className="text-sm text-slate-500 font-medium">{emp.id} • {emp.designation}</div>
                                            </div>
                                        </div>
                                        <ChevronRight size={20} className={`text-slate-600 transition-all ${selectedEmp?.id === emp.id ? 'translate-x-1 text-blue-500' : ''}`} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="p-8 space-y-8 animate-in fade-in duration-500">
                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Resignation Type</label>
                                    <select className="w-full bg-[#060B14] border border-[#1A2A3A] rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500/50 appearance-none">
                                        <option>Voluntary Resignation</option>
                                        <option>Termination</option>
                                        <option>Retirement</option>
                                        <option>Absconding</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Resignation Date</label>
                                    <div className="relative">
                                        <Calendar size={18} className="absolute left-4 top-3.5 text-slate-500" />
                                        <input type="date" className="w-full bg-[#060B14] border border-[#1A2A3A] rounded-xl pl-12 pr-4 py-3 text-white outline-none focus:border-blue-500/50" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Last Working Day (Proposed)</label>
                                    <div className="relative">
                                        <Calendar size={18} className="absolute left-4 top-3.5 text-slate-500" />
                                        <input type="date" className="w-full bg-[#060B14] border border-[#1A2A3A] rounded-xl pl-12 pr-4 py-3 text-white outline-none focus:border-blue-500/50" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Exit Reason</label>
                                    <select className="w-full bg-[#060B14] border border-[#1A2A3A] rounded-xl px-4 py-3 text-white outline-none focus:border-blue-500/50 appearance-none">
                                        <option>Better Opportunity</option>
                                        <option>Personal Reasons</option>
                                        <option>Higher Studies</option>
                                        <option>Health Issues</option>
                                        <option>Relocation</option>
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-black text-slate-500 uppercase tracking-widest font-mono tracking-tighter">Detailed Comments (Internal)</label>
                                <textarea
                                    placeholder="Enter any additional context for this exit..."
                                    className="w-full bg-[#060B14] border border-[#1A2A3A] rounded-xl p-4 text-white outline-none focus:border-blue-500/50 min-h-[120px] resize-none"
                                />
                            </div>

                            <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-4 flex gap-4">
                                <Info size={20} className="text-blue-500 shrink-0 mt-0.5" />
                                <div className="text-sm text-slate-400 font-medium">
                                    All exit documentation will be sent to the employee's personal and primary email addresses upon initiation.
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="p-6 bg-[#060B14]/50 border-t border-[#1A2A3A] flex justify-between items-center">
                        <button
                            disabled={step === 1}
                            onClick={() => setStep(s => s - 1)}
                            className="px-6 py-2.5 text-sm font-bold text-slate-400 hover:text-white transition-all disabled:opacity-0 focus:text-blue-500 outline-none"
                        >
                            Back
                        </button>
                        <button
                            onClick={() => step < 2 ? setStep(s => s + 1) : null}
                            className={`px-8 py-3 bg-[#0066FF] rounded-xl text-sm font-black text-white hover:bg-[#0052cc] transition-all shadow-[0_0_20px_rgba(0,102,255,0.3)] flex items-center ${step === 1 && !selectedEmp ? 'opacity-50 cursor-not-allowed grayscale' : ''
                                }`}
                        >
                            {step === 4 ? 'Confirm & Initiate' : 'Continue'} <ChevronRight size={18} className="ml-2" />
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}
