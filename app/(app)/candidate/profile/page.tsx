"use client";
import React from 'react';
import { User, Mail, MapPin, Briefcase, FileText, Upload, Save, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function CandidateProfileScreen() {
    return (
        <div className="min-h-screen p-6 max-w-4xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3"><User size={24} className="text-indigo-400" /> Candidate Profile</h1>
                    <p className="text-[#8899AA] text-sm mt-1">Keep your resume and basic details updated for 1-click applications.</p>
                </div>
                <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors">
                    <Save size={16} /> Save Profile
                </button>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 space-y-5">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-20 h-20 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-3xl font-black">AK</div>
                            <div>
                                <h3 className="text-white font-bold text-lg">Anita Kulkarni</h3>
                                <div className="text-[#8899AA] text-sm flex items-center gap-2 mt-1"><Mail size={14} /> anita.kulkarni@example.com</div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[#8899AA] text-xs font-bold mb-2">First Name</label>
                                <input type="text" defaultValue="Anita" className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl px-4 py-2.5 text-white focus:border-indigo-500 outline-none transition-colors" />
                            </div>
                            <div>
                                <label className="block text-[#8899AA] text-xs font-bold mb-2">Last Name</label>
                                <input type="text" defaultValue="Kulkarni" className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl px-4 py-2.5 text-white focus:border-indigo-500 outline-none transition-colors" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[#8899AA] text-xs font-bold mb-2">Phone Number</label>
                            <input type="tel" defaultValue="+91 98765 43210" className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl px-4 py-2.5 text-white focus:border-indigo-500 outline-none transition-colors" />
                        </div>
                        <div>
                            <label className="block text-[#8899AA] text-xs font-bold mb-2 flex items-center gap-1"><MapPin size={12} /> Current Location</label>
                            <input type="text" defaultValue="Bengaluru, India" className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl px-4 py-2.5 text-white focus:border-indigo-500 outline-none transition-colors" />
                        </div>
                        <div>
                            <label className="block text-[#8899AA] text-xs font-bold mb-2 flex items-center gap-1"><Briefcase size={12} /> LinkedIn URL</label>
                            <input type="url" defaultValue="https://linkedin.com/in/anita-kulkarni" className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl px-4 py-2.5 text-white focus:border-indigo-500 outline-none transition-colors" />
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6">
                        <h3 className="text-white font-bold mb-4 flex items-center gap-2"><FileText size={18} className="text-indigo-400" /> Resume / CV</h3>

                        <div className="border border-[#1A2A3A] bg-[#131B2B] rounded-xl p-4 flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg"><FileText size={20} /></div>
                                <div>
                                    <div className="text-white font-bold text-sm">Anita_CV_2026.pdf</div>
                                    <div className="text-[#556677] text-[10px] mt-0.5 mt-0.5">Uploaded 2 months ago • 2.4 MB</div>
                                </div>
                            </div>
                            <CheckCircle2 size={16} className="text-emerald-400" />
                        </div>

                        <div className="border border-dashed border-[#2A3A4A] rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:border-indigo-500 transition-colors bg-[#0A1420]">
                            <Upload size={24} className="text-[#556677] mb-2" />
                            <div className="text-white text-sm font-bold mb-1">Replace Resume</div>
                            <div className="text-[#556677] text-xs">PDF, DOCX up to 5MB</div>
                        </div>
                    </div>

                    <div className="bg-indigo-500/5 border border-indigo-500/20 rounded-2xl p-5">
                        <h3 className="text-indigo-400 font-bold mb-2 text-sm">Profile Connectivity</h3>
                        <p className="text-[#8899AA] text-xs leading-relaxed mb-4">Connecting your social accounts allows us to auto-fill applications and find roles matching your skills.</p>
                        <div className="space-y-2">
                            <button className="w-full bg-white hover:bg-gray-100 text-slate-800 font-bold py-2 rounded-lg text-xs transition-colors flex items-center justify-center gap-2 shadow-sm">
                                Connect GitHub
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
