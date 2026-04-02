"use client";

import React, { useState } from 'react';
import {
    UserPlus, FileText, CheckCircle2, ArrowRight, X, Mail,
    UploadCloud, Briefcase, GraduationCap, Building2, MapPin, AlertCircle
} from 'lucide-react';
import Link from 'next/link';

export default function BGVInitiationScreen() {
    const [step, setStep] = useState(1);

    // Form state mock
    const [selectedCandidate, setSelectedCandidate] = useState<string>('');
    const [packageType, setPackageType] = useState('standard');

    return (
        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-4xl mx-auto">
                <div className="mb-6 flex items-center gap-3">
                    <Link href="/bgv/dashboard" className="w-8 h-8 rounded-full bg-[#1A2A3A] flex items-center justify-center hover:bg-[#2A3A4A] transition-colors">
                        <X size={18} className="text-[#8899AA]" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-white">Initiate BGV</h1>
                        <p className="text-sm text-[#8899AA]">Start background checks for new hires or existing employees.</p>
                    </div>
                </div>

                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">

                    {/* Left Sidebar Steps */}
                    <div className="w-full md:w-64 bg-[#0D1928] border-r border-[#1A2A3A] p-6 shrink-0">
                        <div className="space-y-6">
                            <StepItem num={1} title="Candidate Info" desc="Select individual or bulk" active={step === 1} done={step > 1} />
                            <StepItem num={2} title="Check Package" desc="Select verification items" active={step === 2} done={step > 2} />
                            <StepItem num={3} title="Information Input" desc="Who provides data?" active={step === 3} done={step > 3} />
                            <StepItem num={4} title="Review & Submit" desc="Final confirmation" active={step === 4} done={step > 4} />
                        </div>
                    </div>

                    {/* Right Content Area */}
                    <div className="flex-1 p-6 md:p-8 relative min-h-[500px] flex flex-col">

                        {step === 1 && (
                            <div className="flex-1 animate-fade-in">
                                <h2 className="text-xl font-bold text-white mb-6">Select Candidate</h2>
                                <div className="space-y-5">
                                    <div className="p-4 border border-[#1A2A3A] bg-[#060B14] rounded-xl cursor-pointer hover:border-[#0066FF] transition-colors">
                                        <label className="flex items-center gap-3 cursor-pointer w-full">
                                            <input type="radio" name="cand_mode" defaultChecked className="w-4 h-4 accent-[#0066FF]" />
                                            <div className="flex-1">
                                                <div className="font-bold text-slate-200">Existing Employee / Pre-joined Candidate</div>
                                                <div className="text-xs text-[#8899AA] mt-1">Select from the HR database</div>
                                            </div>
                                        </label>
                                        <div className="mt-4 pl-7">
                                            <select
                                                value={selectedCandidate}
                                                onChange={(e) => setSelectedCandidate(e.target.value)}
                                                className="w-full bg-[#1A2A3A] border border-[#2A3A4A] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#0066FF]"
                                            >
                                                <option value="">-- Select Candidate --</option>
                                                <option value="rahul">Rahul Sharma (SDE II - Offer Accepted)</option>
                                                <option value="priya">Priya Patel (Product Manager - Internal)</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="p-4 border border-[#1A2A3A] bg-[#060B14] rounded-xl cursor-pointer hover:border-[#0066FF] transition-colors opacity-60">
                                        <label className="flex items-center gap-3 cursor-pointer w-full">
                                            <input type="radio" name="cand_mode" disabled className="w-4 h-4 accent-[#0066FF]" />
                                            <div className="flex-1">
                                                <div className="font-bold text-slate-200">Bulk Initiation</div>
                                                <div className="text-xs text-[#8899AA] mt-1">Upload CSV for multiple candidates</div>
                                            </div>
                                            <span className="text-[10px] font-bold bg-[#1A2A3A] px-2 py-0.5 rounded text-[#8899AA]">COMING SOON</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="flex-1 animate-fade-in">
                                <h2 className="text-xl font-bold text-white mb-6">Select BGV Package</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                                    <PackageCard
                                        id="standard" title="Standard Package" price="₹1,500"
                                        features={['ID Verification', 'Current Address', 'Highest Education']}
                                        selected={packageType === 'standard'}
                                        onClick={() => setPackageType('standard')}
                                    />
                                    <PackageCard
                                        id="comprehensive" title="Comprehensive" price="₹3,200"
                                        features={['Standard + Perm Address', 'Criminal / Court Records', 'Past 2 Employments']}
                                        selected={packageType === 'comprehensive'}
                                        onClick={() => setPackageType('comprehensive')}
                                    />
                                    <PackageCard
                                        id="executive" title="Executive" price="₹5,800"
                                        features={['Comprehensive + Global DBD', 'Credit History Check', 'Director Setup Check']}
                                        selected={packageType === 'executive'}
                                        onClick={() => setPackageType('executive')}
                                    />
                                    <PackageCard
                                        id="custom" title="Custom Select" price="Variable"
                                        features={['Handpick specific checks', 'Tailored for specific roles']}
                                        selected={packageType === 'custom'}
                                        onClick={() => setPackageType('custom')}
                                    />
                                </div>

                                {packageType === 'custom' && (
                                    <div className="p-4 border border-[#1A2A3A] rounded-xl bg-[#060B14]">
                                        <h4 className="text-sm font-bold mb-3 text-white">Select Checks</h4>
                                        <div className="grid grid-cols-2 gap-2 text-sm">
                                            <label className="flex items-center gap-2"><input type="checkbox" className="accent-[#0066FF]" defaultChecked /> ID Verification</label>
                                            <label className="flex items-center gap-2"><input type="checkbox" className="accent-[#0066FF]" /> Address (Current)</label>
                                            <label className="flex items-center gap-2"><input type="checkbox" className="accent-[#0066FF]" /> Address (Permanent)</label>
                                            <label className="flex items-center gap-2"><input type="checkbox" className="accent-[#0066FF]" /> Education</label>
                                            <label className="flex items-center gap-2"><input type="checkbox" className="accent-[#0066FF]" /> Employment History</label>
                                            <label className="flex items-center gap-2"><input type="checkbox" className="accent-[#0066FF]" /> Criminal Check</label>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {step === 3 && (
                            <div className="flex-1 animate-fade-in">
                                <h2 className="text-xl font-bold text-white mb-6">Information Input Mode</h2>
                                <p className="text-sm text-[#8899AA] mb-6">How will the vendor receive the required documents and data?</p>

                                <div className="space-y-4">
                                    <div className="p-4 border-2 border-[#0066FF] bg-[#0066FF]/5 rounded-xl cursor-pointer relative">
                                        <div className="absolute top-3 right-3 text-[#0066FF]"><CheckCircle2 size={20} /></div>
                                        <div className="flex items-start gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-[#0066FF]/20 flex items-center justify-center text-[#0066FF] shrink-0"><Mail size={20} /></div>
                                            <div>
                                                <h3 className="font-bold text-white text-base mb-1">Send Link to Candidate (Recommended)</h3>
                                                <p className="text-sm text-[#8899AA]">Candidate will receive an email/SMS link from the vendor to securely upload documents and fill details directly.</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-4 border border-[#1A2A3A] bg-[#060B14] rounded-xl cursor-pointer hover:border-[#556677] transition-colors text-opacity-50">
                                        <div className="flex items-start gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-[#1A2A3A] flex items-center justify-center text-[#8899AA] shrink-0"><UploadCloud size={20} /></div>
                                            <div>
                                                <h3 className="font-bold text-white text-base mb-1">HR Uploads Documents</h3>
                                                <p className="text-sm text-[#8899AA]">HR manually enters data and uploads scanned documents collected from candidate.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {step === 4 && (
                            <div className="flex-1 animate-fade-in">
                                <h2 className="text-xl font-bold text-white mb-6">Review & Submit</h2>

                                <div className="bg-[#060B14] border border-[#1A2A3A] rounded-xl p-5 mb-6">
                                    <h3 className="text-sm font-semibold text-[#8899AA] uppercase tracking-wider mb-4 border-b border-[#1A2A3A] pb-2">Initiation Summary</h3>

                                    <div className="grid grid-cols-2 gap-y-4 text-sm">
                                        <div>
                                            <div className="text-[#556677] text-xs mb-1">Candidate</div>
                                            <div className="font-bold text-white">Rahul Sharma (SDE II)</div>
                                        </div>
                                        <div>
                                            <div className="text-[#556677] text-xs mb-1">Selected Package</div>
                                            <div className="font-bold text-white capitalize">{packageType} Package</div>
                                        </div>
                                        <div>
                                            <div className="text-[#556677] text-xs mb-1">Data Collection</div>
                                            <div className="font-bold text-white">Direct Link to Candidate</div>
                                        </div>
                                        <div>
                                            <div className="text-[#556677] text-xs mb-1">Vendor</div>
                                            <div className="font-bold text-white">FirstAdvantage</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-start gap-3 text-sm text-amber-500/90">
                                    <AlertCircle size={20} className="shrink-0 mt-0.5" />
                                    <div>
                                        Submission will deduct 1 credit (₹{packageType === 'executive' ? '5,800' : packageType === 'comprehensive' ? '3,200' : '1,500'}) from your vendor balance. An email will be dispatched immediately to the candidate.
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Footer Actions */}
                        <div className="mt-8 pt-4 border-t border-[#1A2A3A] flex justify-between items-center mt-auto">
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
                                    // disabled={step === 1 && !selectedCandidate}
                                    className="px-6 py-2 bg-[#0066FF] text-white rounded-lg font-bold text-sm hover:bg-[#0052cc] transition-colors flex items-center gap-2 shadow-[0_0_15px_rgba(0,102,255,0.3)] disabled:opacity-50"
                                >
                                    Continue <ArrowRight size={16} />
                                </button>
                            ) : (
                                <Link
                                    href="/bgv/status"
                                    className="px-6 py-2 bg-[#00E5A0] text-[#060B14] rounded-lg font-bold text-sm hover:bg-[#00c98d] transition-colors flex items-center gap-2 shadow-[0_0_15px_rgba(0,229,160,0.3)]"
                                >
                                    <CheckCircle2 size={16} /> Confirm & Initiate
                                </Link>
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
                    active ? 'bg-[#0066FF] border-[#0066FF] text-white shadow-[0_0_10px_rgba(0,102,255,0.5)]' :
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

function PackageCard({ id, title, price, features, selected, onClick }: any) {
    return (
        <div
            onClick={onClick}
            className={`p-4 rounded-xl border-2 transition-all cursor-pointer relative bg-[#060B14]
                ${selected ? 'border-[#0066FF] shadow-[0_0_15px_rgba(0,102,255,0.15)]' : 'border-[#1A2A3A] hover:border-[#2A3A4A]'}`}
        >
            {selected && <div className="absolute top-2 right-2 text-[#0066FF]"><CheckCircle2 size={20} /></div>}
            <h4 className={`font-bold text-base mb-1 ${selected ? 'text-[#0066FF]' : 'text-white'}`}>{title}</h4>
            <div className="text-lg font-black text-white mb-3">{price}</div>
            <ul className="space-y-1.5 text-xs text-[#8899AA]">
                {features.map((f: string, i: number) => (
                    <li key={i} className="flex items-start gap-1.5">
                        <ArrowRight size={12} className="shrink-0 mt-0.5 text-[#556677]" />
                        <span>{f}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
