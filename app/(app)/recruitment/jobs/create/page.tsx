"use client";
import React, { useState } from "react";
import { ArrowLeft, Save, Globe, Eye, UploadCloud, Plus, Loader2 } from "lucide-react";

export default function CreateJobScreen() {
    const [saving, setSaving] = useState(false);
    const [published, setPublished] = useState(false);

    function handleSubmit() {
        setSaving(true);
        setTimeout(() => {
            setSaving(false);
            setPublished(true);
        }, 1500);
    }

    if (published) {
        return (
            <div className="min-h-screen flex items-center justify-center p-8">
                <div className="text-center max-w-md">
                    <div className="w-16 h-16 rounded-full bg-[#00E5A0]/20 border border-[#00E5A0]/30 mx-auto mb-4 flex items-center justify-center">
                        <Globe size={28} className="text-[#00E5A0]" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">Job Published Successfully!</h2>
                    <p className="text-[#8899AA] text-sm mb-6">Senior Frontend Engineer role is now live on your careers page and syndicated to LinkedIn & Indeed.</p>
                    <div className="flex gap-3 justify-center">
                        <button className="h-10 px-4 bg-[#1A2A3A] border border-[#2A3A4A] text-white text-sm rounded-xl hover:bg-[#243040] transition-colors">View Live Posting</button>
                        <button className="h-10 px-4 bg-[#0066FF] text-white text-sm font-bold rounded-xl hover:bg-[#0052cc] transition-colors">Go to Job Pipeline</button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 md:p-8 max-w-[900px] mx-auto text-white">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <button className="w-10 h-10 bg-[#0D1928] border border-[#1A2A3A] hover:bg-[#1A2A3A] rounded-xl flex items-center justify-center text-[#8899AA] transition-colors"><ArrowLeft size={16} /></button>
                    <div>
                        <h1 className="text-3xl font-bold mb-1">Create Job Posting</h1>
                        <p className="text-sm text-[#8899AA]">Draft a new requisition and publish to job boards</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button className="h-10 px-4 bg-[#1A2A3A] text-white text-sm rounded-xl hover:bg-[#243040] flex items-center gap-2 transition-colors">
                        <Save size={14} /> Save Draft
                    </button>
                    <button onClick={handleSubmit} disabled={saving} className="h-10 px-4 bg-[#00E5A0] text-[#060B14] text-sm font-bold rounded-xl hover:bg-[#00c98d] flex items-center gap-2 transition-all disabled:opacity-50">
                        {saving ? <><Loader2 size={14} className="animate-spin" /> Publishing...</> : <><Globe size={14} /> Publish Job</>}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    {/* Basic Info */}
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                        <h3 className="font-semibold mb-4 text-sm">Basic Information</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-medium text-[#8899AA] mb-1.5">Job Title *</label>
                                <input placeholder="e.g. Senior Frontend Engineer" className="w-full h-10 bg-[#060B14] border border-[#1A2A3A] rounded-xl px-3 text-sm text-white placeholder-[#445566] focus:outline-none focus:border-[#0066FF] transition-colors" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-[#8899AA] mb-1.5">Department *</label>
                                    <select className="w-full h-10 bg-[#060B14] border border-[#1A2A3A] rounded-xl px-3 text-sm text-white focus:outline-none focus:border-[#0066FF] transition-colors">
                                        <option>Engineering</option><option>Sales</option><option>Marketing</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-[#8899AA] mb-1.5">Hiring Manager *</label>
                                    <select className="w-full h-10 bg-[#060B14] border border-[#1A2A3A] rounded-xl px-3 text-sm text-white focus:outline-none focus:border-[#0066FF] transition-colors">
                                        <option>Priya Nair</option><option>Rajesh Kumar</option>
                                    </select>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-[#8899AA] mb-1.5">Job Type</label>
                                    <select className="w-full h-10 bg-[#060B14] border border-[#1A2A3A] rounded-xl px-3 text-sm text-white focus:outline-none focus:border-[#0066FF] transition-colors">
                                        <option>Full-time</option><option>Contract</option><option>Internship</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-[#8899AA] mb-1.5">Workplace Type</label>
                                    <select className="w-full h-10 bg-[#060B14] border border-[#1A2A3A] rounded-xl px-3 text-sm text-white focus:outline-none focus:border-[#0066FF] transition-colors">
                                        <option>Hybrid</option><option>On-site</option><option>Remote</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Job Description */}
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-sm">Job Description</h3>
                            <button className="text-xs text-[#0066FF] font-medium border border-[#0066FF] rounded-lg px-2 py-1 flex items-center gap-1 hover:bg-[#0066FF]/10 transition-colors">AI Generate ✨</button>
                        </div>
                        <div className="mb-4 bg-[#0A1420] border border-[#1A2A3A] rounded-xl overflow-hidden">
                            <div className="flex items-center gap-1 border-b border-[#1A2A3A] p-1.5">
                                {['B', 'I', 'U', 'List', 'Link'].map(t => (
                                    <button key={t} className="px-2 py-1 hover:bg-[#1A2A3A] text-xs text-[#8899AA] rounded transition-colors">{t}</button>
                                ))}
                            </div>
                            <textarea rows={8} placeholder="Write the job description, responsibilities, and requirements here..." className="w-full bg-transparent p-4 text-sm text-white placeholder-[#445566] focus:outline-none resize-none" />
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {["React.js", "TypeScript", "3+ YOE", "System Design"].map(tag => (
                                <div key={tag} className="flex items-center gap-1 bg-[#1A2A3A] text-xs px-2.5 py-1.5 rounded-lg text-white">
                                    {tag} <button className="text-[#8899AA] hover:text-[#FF4444] ml-1">×</button>
                                </div>
                            ))}
                            <button className="flex items-center gap-1 text-[#0066FF] text-xs px-2.5 py-1.5 border border-dashed border-[#0066FF] rounded-lg hover:bg-[#0066FF]/10 transition-colors">
                                <Plus size={12} /> Add Skill Tag
                            </button>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    {/* Settings & Syndication */}
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                        <h3 className="font-semibold mb-4 text-sm">Publishing options</h3>
                        <div className="space-y-4">
                            {[
                                { name: "Internal Job Board", desc: "Visible to employees", active: true },
                                { name: "Careers Page", desc: "Visible externally", active: true },
                                { name: "LinkedIn Jobs", desc: "Auto-syndicate via API", active: false },
                                { name: "Naukri.com", desc: "Auto-syndicate via API", active: false }
                            ].map((opt, i) => (
                                <div key={i} className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-white">{opt.name}</p>
                                        <p className="text-[10px] text-[#445566]">{opt.desc}</p>
                                    </div>
                                    <div className={`w-9 h-5 rounded-full flex items-center px-0.5 cursor-pointer transition-colors ${opt.active ? 'bg-[#00E5A0]' : 'bg-[#1A2A3A]'}`}>
                                        <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${opt.active ? 'translate-x-4' : 'translate-x-0'}`} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Preview widget */}
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                        <div className="w-12 h-12 bg-[#1A2A3A] rounded-xl flex items-center justify-center mb-4">
                            <Eye size={20} className="text-[#8899AA]" />
                        </div>
                        <h4 className="font-bold text-white mb-2">How it looks</h4>
                        <p className="text-xs text-[#8899AA] mb-4">Preview the job posting exactly as candidates will see it across different platforms.</p>
                        <button className="w-full h-9 bg-transparent border border-[#2A3A4A] text-[#8899AA] text-xs font-medium rounded-lg hover:border-[#445566] hover:text-white transition-all">Open Preview</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
