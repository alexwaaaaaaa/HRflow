"use client";
import React, { useState } from 'react';
import { Building2, ArrowLeft, CheckCircle2, ChevronRight, Save } from 'lucide-react';
import Link from 'next/link';

export default function AddEntityScreen() {
    const [step, setStep] = useState(1);

    return (
        <div className="min-h-screen p-6 max-w-4xl mx-auto space-y-6">
            <Link href="/multi-entity/list" className="text-[#556677] hover:text-white text-sm font-bold flex items-center gap-1 mb-2">
                <ArrowLeft size={14} /> Back to Entities
            </Link>

            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3"><Building2 size={24} className="text-indigo-400" /> Create New Entity</h1>
                    <p className="text-[#8899AA] text-sm mt-1">Configure a new subsidiary, joint venture, or acquired company.</p>
                </div>
            </div>

            <div className="flex gap-2">
                <div className={`h-1.5 flex-1 rounded-full ${step >= 1 ? 'bg-indigo-500' : 'bg-[#1A2A3A]'}`}></div>
                <div className={`h-1.5 flex-1 rounded-full ${step >= 2 ? 'bg-indigo-500' : 'bg-[#1A2A3A]'}`}></div>
                <div className={`h-1.5 flex-1 rounded-full ${step >= 3 ? 'bg-indigo-500' : 'bg-[#1A2A3A]'}`}></div>
            </div>

            <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-8 space-y-8 animate-in fade-in slide-in-from-right-4">

                {step === 1 && (
                    <>
                        <h2 className="text-xl font-bold text-white border-b border-[#1A2A3A] pb-4 mb-6">Step 1: Basic Information</h2>
                        <div className="space-y-6 text-sm">
                            <div>
                                <label className="block text-[#8899AA] font-bold mb-2">Legal Entity Name *</label>
                                <input type="text" placeholder="e.g. Acme Retail Solutions Pvt Ltd" className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl px-4 py-3 text-white focus:border-indigo-500 outline-none transition-colors" />
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-[#8899AA] font-bold mb-2">Entity Type</label>
                                    <select className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl px-4 py-3 text-white focus:border-indigo-500 outline-none transition-colors appearance-none">
                                        <option>Subsidiary</option>
                                        <option>Joint Venture</option>
                                        <option>Foreign Branch</option>
                                        <option>Acquired Company</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-[#8899AA] font-bold mb-2">Parent Entity</label>
                                    <select className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl px-4 py-3 text-white focus:border-indigo-500 outline-none transition-colors appearance-none">
                                        <option>Acme Technologies Pvt Ltd (Root)</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-[#8899AA] font-bold mb-2">Country of Incorporation</label>
                                    <select className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl px-4 py-3 text-white focus:border-indigo-500 outline-none transition-colors appearance-none">
                                        <option>India</option>
                                        <option>United States</option>
                                        <option>Singapore</option>
                                        <option>United Arab Emirates</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-[#8899AA] font-bold mb-2">Default Currency</label>
                                    <select className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl px-4 py-3 text-white focus:border-indigo-500 outline-none transition-colors appearance-none">
                                        <option>INR - Indian Rupee</option>
                                        <option>USD - US Dollar</option>
                                        <option>SGD - Singapore Dollar</option>
                                        <option>AED - UAE Dirham</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {step === 2 && (
                    <>
                        <h2 className="text-xl font-bold text-white border-b border-[#1A2A3A] pb-4 mb-6">Step 2: Registrations & Compliance</h2>
                        <div className="space-y-6 text-sm">
                            <div>
                                <label className="block text-[#8899AA] font-bold mb-2">Company Registration Number (CIN)</label>
                                <input type="text" placeholder="U72900MH2025PTC123456" className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl px-4 py-3 text-white focus:border-indigo-500 outline-none transition-colors" />
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-[#8899AA] font-bold mb-2">Corporate PAN</label>
                                    <input type="text" placeholder="ABCDE1234F" className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl px-4 py-3 text-white focus:border-indigo-500 outline-none transition-colors uppercase" />
                                </div>
                                <div>
                                    <label className="block text-[#8899AA] font-bold mb-2">Corporate TAN</label>
                                    <input type="text" placeholder="MUMA12345B" className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl px-4 py-3 text-white focus:border-indigo-500 outline-none transition-colors uppercase" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-[#8899AA] font-bold mb-2">GSTIN</label>
                                <input type="text" placeholder="27ABCDE1234F1Z5" className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl px-4 py-3 text-white focus:border-indigo-500 outline-none transition-colors uppercase" />
                            </div>
                        </div>
                    </>
                )}

                {step === 3 && (
                    <>
                        <h2 className="text-xl font-bold text-white border-b border-[#1A2A3A] pb-4 mb-6">Step 3: Configurations</h2>
                        <div className="space-y-6 text-sm">

                            <div className="bg-[#131B2B] border border-[#2A3A4A] rounded-xl p-5">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h3 className="text-white font-bold mb-1">Inherit Global Payroll Settings</h3>
                                        <p className="text-[#8899AA] text-xs">If checked, this entity will use the same payroll cycle, statutory components, and leave policies as the parent company.</p>
                                    </div>
                                    <input type="checkbox" className="w-5 h-5 accent-indigo-500 rounded border-[#2A3A4A]" defaultChecked />
                                </div>
                            </div>

                            <div className="bg-[#131B2B] border border-[#2A3A4A] rounded-xl p-5">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h3 className="text-white font-bold mb-1">Shared Employee Master</h3>
                                        <p className="text-[#8899AA] text-xs">Allow employee ID sequential generation to continue from the parent entity (Global ID routing).</p>
                                    </div>
                                    <input type="checkbox" className="w-5 h-5 accent-indigo-500 rounded border-[#2A3A4A]" defaultChecked />
                                </div>
                            </div>

                            <div className="bg-[#131B2B] border border-[#2A3A4A] rounded-xl p-5">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h3 className="text-white font-bold mb-1">Enable Inter-entity Transfers</h3>
                                        <p className="text-[#8899AA] text-xs">Allow employees to be cross-transferred from other entities without data loss.</p>
                                    </div>
                                    <input type="checkbox" className="w-5 h-5 accent-indigo-500 rounded border-[#2A3A4A]" defaultChecked />
                                </div>
                            </div>
                        </div>
                    </>
                )}

                <div className="flex items-center justify-between pt-6 border-t border-[#1A2A3A]">
                    {step > 1 ? (
                        <button onClick={() => setStep(step - 1)} className="bg-[#131B2B] hover:bg-[#1A2A3A] border border-[#2A3A4A] text-white font-bold px-6 py-3 rounded-xl transition-colors">
                            Back
                        </button>
                    ) : <div />}

                    {step < 3 ? (
                        <button onClick={() => setStep(step + 1)} className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-8 py-3 rounded-xl transition-colors flex items-center gap-2">
                            Continue <ChevronRight size={18} />
                        </button>
                    ) : (
                        <Link href="/multi-entity/list" className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-8 py-3 rounded-xl transition-colors flex items-center gap-2">
                            <Save size={18} /> Create Entity
                        </Link>
                    )}
                </div>

            </div>
        </div>
    );
}
