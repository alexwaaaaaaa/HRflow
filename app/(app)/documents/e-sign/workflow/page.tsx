"use client";

import React, { useState } from 'react';
import {
    Signature, ArrowRight, ArrowLeft, PenTool, CheckCircle2,
    UploadCloud, UserPlus, AlignLeft, Calendar, User
} from 'lucide-react';
import Link from 'next/link';

export default function ESignWorkflowScreen() {
    const [step, setStep] = useState(1);

    return (
        <div className="min-h-screen bg-[#060B14] font-sans text-slate-200 flex flex-col items-center p-6 h-screen">

            {/* Header */}
            <div className="w-full max-w-5xl flex justify-between items-center mb-6 shrink-0">
                <Link href="/documents/e-sign" className="inline-flex items-center text-sm font-semibold text-[#8899AA] hover:text-white transition-colors">
                    <ArrowLeft size={16} className="mr-2" /> Cancel Request
                </Link>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-[#8899AA]">Draft saved 2 mins ago</span>
                    <button className="px-4 py-2 bg-[#1A2A3A] text-white font-semibold text-sm rounded-lg hover:bg-[#2A3A4A] border border-[#2A3A4A] transition-colors ml-4">
                        Save & Exit
                    </button>
                </div>
            </div>

            {/* Stepper */}
            <div className="w-full max-w-5xl flex justify-between items-center mb-8 shrink-0 relative px-4">
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-[#1A2A3A] -z-10 -translate-y-1/2"></div>

                <StepIndicator num={1} title="Upload Document" active={step === 1} done={step > 1} />
                <StepIndicator num={2} title="Add Recipients" active={step === 2} done={step > 2} />
                <StepIndicator num={3} title="Place Signature Fields" active={step === 3} done={step > 3} />
                <StepIndicator num={4} title="Review & Send" active={step === 4} done={step > 4} />
            </div>

            {/* Main Content Area */}
            <div className="w-full max-w-5xl flex-1 flex flex-col bg-[#0A1420] border border-[#1A2A3A] rounded-2xl shadow-xl overflow-hidden min-h-0">

                {step === 3 ? (
                    <div className="flex-1 flex overflow-hidden">
                        {/* Editor Sidebar */}
                        <div className="w-64 bg-[#0D1928] border-r border-[#1A2A3A] p-4 flex flex-col h-full shrink-0">
                            <h3 className="font-bold text-white text-xs uppercase tracking-wider mb-4">Drag fields onto document</h3>

                            <div className="mb-6">
                                <label className="block text-[10px] font-bold text-[#8899AA] uppercase tracking-wider mb-2">Recipient</label>
                                <select className="w-full bg-[#1A2A3A] text-xs text-white p-2 rounded border border-[#2A3A4A] outline-none">
                                    <option>Rahul Sharma (Candidate)</option>
                                    <option>HR Admin (Sender)</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <FieldItem icon={<PenTool size={16} />} label="Signature" color="text-[#00E5A0]" bg="bg-[#00E5A0]/10" border="border-[#00E5A0]/30" />
                                <FieldItem icon={<PenTool size={16} />} label="Initials" color="text-amber-500" bg="bg-amber-500/10" border="border-amber-500/30" />
                                <FieldItem icon={<Calendar size={16} />} label="Date Signed" color="text-[#0066FF]" bg="bg-[#0066FF]/10" border="border-[#0066FF]/30" />
                                <FieldItem icon={<User size={16} />} label="Name" color="text-indigo-500" bg="bg-indigo-500/10" border="border-indigo-500/30" />
                                <FieldItem icon={<AlignLeft size={16} />} label="Text Field" color="text-slate-300" bg="bg-[#1A2A3A]" border="border-[#2A3A4A]" />
                            </div>
                        </div>

                        {/* Document Viewport */}
                        <div className="flex-1 bg-[#060B14] overflow-auto relative p-8 flex justify-center items-start custom-scrollbar">
                            <div className="w-full max-w-2xl bg-white shadow-2xl origin-top relative select-none">
                                <img src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=2500&auto=format&fit=crop" className="w-full h-auto opacity-50 grayscale" alt="Document Background" />

                                <div className="absolute top-[75%] left-[60%] w-48 h-12 border-2 border-[#00E5A0] bg-[#00E5A0]/20 rounded flex items-center justify-center cursor-move">
                                    <span className="text-[#00E5A0] font-bold text-sm tracking-wider flex items-center gap-1">
                                        <PenTool size={14} /> SIGN HERE
                                    </span>
                                </div>
                                <div className="absolute top-[75%] left-[20%] w-32 h-12 border-2 border-[#0066FF] bg-[#0066FF]/20 rounded flex items-center justify-center cursor-move">
                                    <span className="text-[#0066FF] font-bold text-sm tracking-wider flex items-center gap-1">
                                        <Calendar size={14} /> DATE
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="p-10 flex flex-col items-center justify-center flex-1 text-center">
                        <UploadCloud size={48} className="text-[#00E5A0] mb-4" />
                        <h2 className="text-2xl font-bold text-white mb-2">Simulated Step {step}</h2>
                        <p className="text-[#8899AA] mb-8">This is a placeholder for step {step}. Click continue to proceed to the Field Editor.</p>
                    </div>
                )}

                {/* Footer Controls */}
                <div className="p-4 border-t border-[#1A2A3A] bg-[#0D1928] shrink-0 flex justify-between items-center">
                    <button
                        onClick={() => setStep(Math.max(1, step - 1))}
                        disabled={step === 1}
                        className="px-6 py-2.5 rounded-lg font-semibold text-sm text-[#8899AA] hover:bg-[#1A2A3A] hover:text-white transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
                    >
                        Back step
                    </button>

                    <button
                        onClick={() => setStep(Math.min(4, step + 1))}
                        className={`px-8 py-2.5 rounded-lg font-bold text-sm transition-colors flex items-center gap-2 shadow-lg
                            ${step === 4 ? 'bg-[#00E5A0] text-[#060B14] hover:bg-[#00c98d] shadow-[0_0_15px_rgba(0,229,160,0.3)]' : 'bg-[#0066FF] text-white hover:bg-[#0052cc] shadow-[0_0_15px_rgba(0,102,255,0.3)]'}`}
                    >
                        {step === 4 ? 'Send for Signature' : 'Continue'} {step !== 4 && <ArrowRight size={16} />}
                    </button>
                </div>

            </div>

        </div>
    );
}

function StepIndicator({ num, title, active, done }: any) {
    return (
        <div className="flex flex-col items-center gap-2 bg-[#060B14] px-4 -mx-4 z-10 relative">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-sm border-2 transition-all duration-300
                ${done ? 'bg-[#00E5A0] border-[#00E5A0] text-[#060B14] shadow-[0_0_15px_rgba(0,229,160,0.3)]' :
                    active ? 'bg-[#060B14] border-[#0066FF] text-[#0066FF] shadow-[0_0_10px_rgba(0,102,255,0.2)]' :
                        'bg-[#060B14] border-[#1A2A3A] text-[#556677]'}`}
            >
                {done ? <CheckCircle2 size={16} /> : num}
            </div>
            <div className={`text-xs font-bold leading-none ${active ? 'text-white' : done ? 'text-[#00E5A0]' : 'text-[#556677]'}`}>
                {title}
            </div>
        </div>
    );
}

function FieldItem({ icon, label, color, bg, border }: any) {
    return (
        <div className={`flex items-center gap-3 p-2 border rounded cursor-grab active:cursor-grabbing hover:opacity-80 transition-opacity ${bg} ${border} ${color}`}>
            <div className="shrink-0">{icon}</div>
            <div className="text-xs font-bold tracking-wider uppercase">{label}</div>
        </div>
    );
}
