"use client";

import React, { useState } from 'react';
import {
    FileText, UploadCloud, Play, Settings, ArrowRight,
    Users, FileStack, AlertTriangle, CheckCircle2
} from 'lucide-react';

export default function BulkDocumentGenerationScreen() {
    const [step, setStep] = useState(1);

    return (
        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-5xl mx-auto space-y-6">

                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-white mb-1 flex items-center gap-3">
                            <FileStack className="text-indigo-500" size={28} />
                            Bulk Document Generation
                        </h1>
                        <p className="text-sm text-[#8899AA]">Generate hundreds of personalized letters (appraisals, bonuses, offers) from a template and CSV data.</p>
                    </div>
                </div>

                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">

                    {/* Progress Sidebar */}
                    <div className="w-full md:w-64 bg-[#0D1928] border-r border-[#1A2A3A] p-6 shrink-0">
                        <div className="space-y-6">
                            <StepItem num={1} title="Select Template" desc="Word (.docx) with merge tags" active={step === 1} done={step > 1} />
                            <StepItem num={2} title="Data Source" desc="Upload CSV/Excel or Select DB" active={step === 2} done={step > 2} />
                            <StepItem num={3} title="Map Fields" desc="Map columns to {{tags}}" active={step === 3} done={step > 3} />
                            <StepItem num={4} title="Generate & Distribute" desc="Run engine and send emails" active={step === 4} done={step > 4} />
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 p-6 md:p-8 min-h-[500px] flex flex-col">

                        {step === 1 && (
                            <div className="flex-1 animate-fade-in">
                                <h2 className="text-xl font-bold text-white mb-6">Choose Source Template</h2>

                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div className="p-4 border-2 border-[#0066FF] bg-[#0066FF]/5 rounded-xl cursor-pointer relative">
                                        <div className="absolute top-2 right-2 text-[#0066FF]"><CheckCircle2 size={18} /></div>
                                        <FileText size={24} className="text-[#0066FF] mb-3" />
                                        <h3 className="font-bold text-white text-sm mb-1">Standard_Appraisal_Letter.docx</h3>
                                        <p className="text-xs text-[#8899AA]">Modified 2 days ago</p>
                                    </div>
                                    <div className="p-4 border border-[#1A2A3A] bg-[#060B14] rounded-xl cursor-pointer hover:border-[#2A3A4A] transition-colors flex flex-col items-center justify-center text-center">
                                        <UploadCloud size={24} className="text-[#556677] mb-2" />
                                        <h3 className="font-bold text-white text-sm">Upload New Template</h3>
                                        <p className="text-xs text-[#556677]">.docx format only</p>
                                    </div>
                                </div>

                                <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-lg text-xs leading-relaxed text-indigo-500">
                                    <span className="font-bold block mb-1">Template Tag Info:</span>
                                    Ensure your template uses curly braces for variable tags, e.g., <code>{`{{EmployeeName}}`}</code>, <code>{`{{NewSalary}}`}</code>. The engine will replace these with data from your source file.
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="flex-1 animate-fade-in">
                                <h2 className="text-xl font-bold text-white mb-6">Provide Data Source</h2>
                                <div className="space-y-4">
                                    <div className="p-4 border-2 border-[#0066FF] bg-[#0066FF]/5 rounded-xl cursor-pointer">
                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className="font-bold text-white text-sm flex items-center gap-2">
                                                <Users size={16} className="text-[#0066FF]" /> HR Database Query (Live)
                                            </h3>
                                            <div className="text-[#0066FF]"><CheckCircle2 size={18} /></div>
                                        </div>
                                        <p className="text-xs text-[#8899AA] mb-4">Pull real-time data directly from the HR system's compensation module.</p>
                                        <select className="bg-[#060B14] border border-[#1A2A3A] text-sm text-white rounded px-3 py-2 w-full outline-none focus:border-[#0066FF]">
                                            <option>2024 Finalized Appraisals (124 employees)</option>
                                            <option>2024 Bonus List Only (85 employees)</option>
                                        </select>
                                    </div>
                                    <div className="p-4 border border-[#1A2A3A] bg-[#060B14] rounded-xl cursor-pointer hover:border-[#2A3A4A] transition-colors relative opacity-60">
                                        <div className="flex items-center gap-2 mb-2">
                                            <UploadCloud size={16} className="text-[#556677]" />
                                            <h3 className="font-bold text-white text-sm">Upload CSV / Excel</h3>
                                        </div>
                                        <p className="text-xs text-[#556677]">Upload a flat file containing the merge data.</p>
                                        <div className="absolute top-2 right-2 text-[10px] font-bold bg-[#1A2A3A] px-2 py-0.5 rounded text-[#8899AA]">COMING SOON</div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="flex-1 animate-fade-in">
                                <h2 className="text-xl font-bold text-white mb-6">Map Template Tags</h2>
                                <p className="text-sm text-[#8899AA] mb-4">We found 3 tags in your template. Map them to the database columns.</p>

                                <div className="space-y-3">
                                    <MapRow tag="{{EmployeeName}}" dbCol="Full Name" />
                                    <MapRow tag="{{Designation}}" dbCol="Current Title" />
                                    <MapRow tag="{{NewSalary}}" dbCol="Revised CTC (INR)" />
                                </div>
                            </div>
                        )}

                        {step === 4 && (
                            <div className="flex-1 animate-fade-in">
                                <h2 className="text-xl font-bold text-white mb-6">Ready for Generation</h2>

                                <div className="bg-[#060B14] border border-[#1A2A3A] rounded-xl p-6 text-center mb-8">
                                    <div className="inline-flex w-16 h-16 rounded-full bg-[#00E5A0]/10 border border-[#00E5A0]/30 text-[#00E5A0] items-center justify-center mb-4">
                                        <FileStack size={32} />
                                    </div>
                                    <div className="text-3xl font-black text-white mb-1">124</div>
                                    <div className="text-sm text-[#8899AA]">Documents ready to be generated</div>
                                </div>

                                <div className="space-y-4">
                                    <label className="flex items-start gap-3 cursor-pointer p-4 border border-[#1A2A3A] rounded-lg bg-[#0A1420]">
                                        <input type="checkbox" className="accent-[#0066FF] mt-1 shrink-0" defaultChecked />
                                        <div>
                                            <div className="text-sm font-bold text-white">Save copies to Document Repository</div>
                                            <div className="text-xs text-[#556677] mt-1">Automatically file each generated letter into the respective employee's "Appraisals" folder.</div>
                                        </div>
                                    </label>
                                    <label className="flex items-start gap-3 cursor-pointer p-4 border border-[#1A2A3A] rounded-lg bg-[#0A1420]">
                                        <input type="checkbox" className="accent-[#0066FF] mt-1 shrink-0" />
                                        <div>
                                            <div className="text-sm font-bold text-slate-300">Email directly to candidates</div>
                                            <div className="text-xs text-[#556677] mt-1">Send an email with the generated PDF attached using the system default template.</div>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        )}

                        {/* Footer Controls */}
                        <div className="mt-auto pt-6 border-t border-[#1A2A3A] flex justify-between items-center">
                            <button
                                onClick={() => setStep(step - 1)}
                                disabled={step === 1}
                                className="px-5 py-2 rounded-lg font-semibold text-sm text-[#8899AA] hover:bg-[#1A2A3A] hover:text-white transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
                            >
                                Back
                            </button>

                            {step < 4 ? (
                                <button
                                    onClick={() => setStep(step + 1)}
                                    className="px-6 py-2 bg-[#0066FF] text-white rounded-lg font-bold text-sm hover:bg-[#0052cc] transition-colors flex items-center gap-2 shadow-[0_0_10px_rgba(0,102,255,0.3)]"
                                >
                                    Continue <ArrowRight size={16} />
                                </button>
                            ) : (
                                <button className="px-6 py-2 bg-[#00E5A0] text-[#060B14] rounded-lg font-bold text-sm hover:bg-[#00c98d] transition-colors flex items-center gap-2 shadow-[0_0_15px_rgba(0,229,160,0.3)]">
                                    <Play size={16} /> Start Generation
                                </button>
                            )}
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}

function StepItem({ num, title, desc, active, done }: any) {
    return (
        <div className="flex gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-sm border-2 transition-colors 
                ${done ? 'bg-[#00E5A0] border-[#00E5A0] text-[#060B14]' :
                    active ? 'bg-indigo-500 border-indigo-500 text-white shadow-[0_0_10px_rgba(99,102,241,0.5)]' :
                        'bg-transparent border-[#2A3A4A] text-[#556677]'}`}
            >
                {done ? <CheckCircle2 size={16} /> : num}
            </div>
            <div>
                <h4 className={`font-bold text-sm mb-0.5 ${active || done ? 'text-white' : 'text-[#556677]'}`}>{title}</h4>
                <p className={`text-xs ${active ? 'text-[#8899AA]' : 'text-[#445566]'}`}>{desc}</p>
            </div>
        </div>
    );
}

function MapRow({ tag, dbCol }: any) {
    return (
        <div className="flex items-center gap-4 p-3 bg-[#060B14] border border-[#1A2A3A] rounded-lg">
            <div className="w-1/3 text-sm font-mono text-amber-500">{tag}</div>
            <ArrowRight size={16} className="text-[#556677] shrink-0" />
            <div className="flex-1">
                <select className="w-full bg-[#1A2A3A] border border-[#2A3A4A] rounded px-3 py-1.5 text-sm text-white focus:outline-none focus:border-[#0066FF]">
                    <option>{dbCol}</option>
                    <option>Department</option>
                    <option>Date of Joining</option>
                </select>
            </div>
        </div>
    );
}
