"use client";
import React, { useState } from 'react';
import { FileText, Download, Send, CheckCircle2, History } from 'lucide-react';

export default function ExperienceLetterScreen() {
    const [generated, setGenerated] = useState(false);

    return (
        <div className="min-h-screen p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <div className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-1">Exit Documentation</div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3"><FileText size={24} className="text-sky-400" /> Relieving & Experience Letter</h1>
                    <p className="text-[#8899AA] text-sm mt-1">Generate legally compliant relieving documents after successful Full & Final settlement.</p>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Employee Context Sidebar */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6">
                        <h3 className="text-white font-bold border-b border-[#1A2A3A] pb-3 mb-4">Employee Record</h3>

                        <div className="space-y-4">
                            <div>
                                <div className="text-[#556677] text-xs font-bold uppercase mb-1">Full Legal Name</div>
                                <div className="text-white font-bold text-sm bg-[#131B2B] border border-[#2A3A4A] rounded-lg px-3 py-2">Sarah Jane Jenkins</div>
                            </div>
                            <div>
                                <div className="text-[#556677] text-xs font-bold uppercase mb-1">Employee ID</div>
                                <div className="text-white font-bold text-sm bg-[#131B2B] border border-[#2A3A4A] rounded-lg px-3 py-2 font-mono">HRF-UK-8492</div>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <div className="text-[#556677] text-xs font-bold uppercase mb-1">Date of Joining</div>
                                    <div className="text-white font-bold text-sm bg-[#131B2B] border border-[#2A3A4A] rounded-lg px-3 py-2 font-mono">Mar 12, 2021</div>
                                </div>
                                <div>
                                    <div className="text-[#556677] text-xs font-bold uppercase mb-1">Last Configured LWD</div>
                                    <div className="text-white font-bold text-sm bg-[#131B2B] border border-[#2A3A4A] rounded-lg px-3 py-2 font-mono">Oct 24, 2025</div>
                                </div>
                            </div>
                            <div>
                                <div className="text-[#556677] text-xs font-bold uppercase mb-1">Last Held Designation</div>
                                <div className="text-white font-bold text-sm bg-[#131B2B] border border-[#2A3A4A] rounded-lg px-3 py-2">Engineering Manager</div>
                            </div>
                        </div>

                        <div className="mt-6 pt-4 border-t border-[#1A2A3A]">
                            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold bg-emerald-500/10 p-3 rounded-lg border border-emerald-500/20">
                                <CheckCircle2 size={16} /> FnF Processed (Eligibility Confirmed)
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={() => setGenerated(true)}
                        className="w-full bg-sky-600 hover:bg-sky-500 text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-sky-500/20 flex justify-center items-center gap-2">
                        <FileText size={18} /> Generate Draft Document
                    </button>
                </div>

                {/* Document Preview */}
                <div className="lg:col-span-2 bg-[#0A1420] border border-[#1A2A3A] rounded-2xl flex flex-col h-full min-h-[600px] shadow-2xl relative overflow-hidden">
                    <div className="p-4 border-b border-[#1A2A3A] bg-[#060D1A] flex justify-between items-center">
                        <div className="text-white font-bold text-sm flex items-center gap-2">
                            <FileText size={16} className="text-[#556677]" />
                            Preview: SarahJenkins_ExperienceLetter.pdf
                        </div>
                        <div className="flex gap-2">
                            <button disabled={!generated} className="p-2 text-[#8899AA] hover:text-white disabled:opacity-30 transition-colors"><Download size={16} /></button>
                            <button disabled={!generated} className="p-2 text-[#8899AA] hover:text-white disabled:opacity-30 transition-colors"><Send size={16} /></button>
                        </div>
                    </div>

                    <div className="flex-1 bg-[#131B2B] p-8 overflow-y-auto flex justify-center">
                        {!generated ? (
                            <div className="mt-32 text-center text-[#556677]">
                                <FileText size={48} className="mx-auto mb-4 opacity-50" />
                                <p className="font-bold">Draft not yet generated</p>
                                <p className="text-xs mt-1">Click "Generate Draft" to populate the template.</p>
                            </div>
                        ) : (
                            <div className="bg-white w-full max-w-2xl p-10 min-h-[800px] shadow-2xl rounded text-black font-serif text-sm leading-relaxed animate-in fade-in zoom-in-95">

                                <div className="text-right mb-12">
                                    <div className="font-black text-2xl tracking-tighter text-gray-900">HRFlow Tech.</div>
                                    <div className="text-gray-500 text-xs">100 Tech Square, London, UK</div>
                                </div>

                                <div className="mb-8 font-bold text-gray-800">Date: October 26, 2025</div>

                                <h2 className="text-center font-bold text-lg uppercase underline tracking-widest mb-10 text-gray-900">Experience & Relieving Letter</h2>

                                <p className="mb-6 text-gray-800"><strong>To Whomsoever It May Concern,</strong></p>

                                <p className="mb-4 text-gray-800 text-justify">
                                    This is to certify that <strong>Sarah Jane Jenkins</strong> (Employee ID: HRF-UK-8492) was employed with HRFlow Tech from <strong>March 12, 2021</strong> to <strong>October 24, 2025</strong>.
                                </p>

                                <p className="mb-4 text-gray-800 text-justify">
                                    During her tenure with us, Sarah's last held position was <strong>Engineering Manager</strong>. She has formally resigned from her duties, and her resignation has been accepted. She has been relieved from her responsibilities at the close of working hours on <strong>October 24, 2025</strong>.
                                </p>

                                <p className="mb-4 text-gray-800 text-justify">
                                    We confirm that her full and final settlement has been completed and she has returned all company assets in her possession. To the best of our knowledge, her conduct and performance during her employment were satisfactory.
                                </p>

                                <p className="mb-12 text-gray-800">
                                    We wish Sarah all the very best in her future endeavors.
                                </p>

                                <p className="text-gray-800">Sincerely,</p>
                                <div className="mt-4 mb-2">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Signature_of_John_Hancock.svg" alt="signature" className="h-10 opacity-70 filter invert-[0.3]" />
                                </div>
                                <p className="text-gray-900 font-bold">Alexander Wright</p>
                                <p className="text-gray-600 text-xs mt-1">VP, Human Resources</p>
                                <p className="text-gray-600 text-xs">HRFlow Tech</p>

                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
