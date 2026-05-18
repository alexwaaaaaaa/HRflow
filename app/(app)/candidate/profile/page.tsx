"use client";
import React from 'react';
import { Mail, MapPin, Briefcase, FileText, Upload, Save, CheckCircle2 } from 'lucide-react';
import Page from '@/components/ui/Page';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function CandidateProfileScreen() {
    return (
        <Page
            title="Candidate Profile"
            subtitle="Keep your resume and basic details updated for 1-click applications"
            breadcrumbs={[
                { label: 'Home', href: '/' },
                { label: 'Careers', href: '/candidate/jobs' },
                { label: 'My Profile', href: '/candidate/profile' },
            ]}
            actions={
                <Button variant="primary" size="md">
                    <Save size={16} aria-hidden="true" /> Save Profile
                </Button>
            }
        >
            <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                    <Card padding="lg" className="space-y-5">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-20 h-20 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-3xl font-black">AK</div>
                            <div>
                                <h3 className="text-white font-bold text-lg">Anita Kulkarni</h3>
                                <div className="text-[#8899AA] text-sm flex items-center gap-2 mt-1"><Mail size={14} aria-hidden="true" /> anita.kulkarni@example.com</div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="first-name" className="block text-[#8899AA] text-xs font-bold mb-2">First Name</label>
                                <input id="first-name" type="text" defaultValue="Anita" className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl px-4 py-2.5 text-white focus:border-indigo-500 outline-none transition-colors" />
                            </div>
                            <div>
                                <label htmlFor="last-name" className="block text-[#8899AA] text-xs font-bold mb-2">Last Name</label>
                                <input id="last-name" type="text" defaultValue="Kulkarni" className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl px-4 py-2.5 text-white focus:border-indigo-500 outline-none transition-colors" />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="phone" className="block text-[#8899AA] text-xs font-bold mb-2">Phone Number</label>
                            <input id="phone" type="tel" defaultValue="+91 98765 43210" className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl px-4 py-2.5 text-white focus:border-indigo-500 outline-none transition-colors" />
                        </div>
                        <div>
                            <label htmlFor="location" className="block text-[#8899AA] text-xs font-bold mb-2 flex items-center gap-1">
                                <MapPin size={12} aria-hidden="true" /> Current Location
                            </label>
                            <input id="location" type="text" defaultValue="Bengaluru, India" className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl px-4 py-2.5 text-white focus:border-indigo-500 outline-none transition-colors" />
                        </div>
                        <div>
                            <label htmlFor="linkedin" className="block text-[#8899AA] text-xs font-bold mb-2 flex items-center gap-1">
                                <Briefcase size={12} aria-hidden="true" /> LinkedIn URL
                            </label>
                            <input id="linkedin" type="url" defaultValue="https://linkedin.com/in/anita-kulkarni" className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl px-4 py-2.5 text-white focus:border-indigo-500 outline-none transition-colors" />
                        </div>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card padding="lg">
                        <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                            <FileText size={18} className="text-indigo-400" aria-hidden="true" /> Resume / CV
                        </h3>

                        <div className="border border-[#1A2A3A] bg-[#131B2B] rounded-xl p-4 flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg"><FileText size={20} aria-hidden="true" /></div>
                                <div>
                                    <div className="text-white font-bold text-sm">Anita_CV_2026.pdf</div>
                                    <div className="text-[#556677] text-[10px] mt-0.5">Uploaded 2 months ago • 2.4 MB</div>
                                </div>
                            </div>
                            <CheckCircle2 size={16} className="text-emerald-400" aria-hidden="true" />
                        </div>

                        <div className="border border-dashed border-[#2A3A4A] rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:border-indigo-500 transition-colors bg-[#0A1420]">
                            <Upload size={24} className="text-[#556677] mb-2" aria-hidden="true" />
                            <div className="text-white text-sm font-bold mb-1">Replace Resume</div>
                            <div className="text-[#556677] text-xs">PDF, DOCX up to 5MB</div>
                        </div>
                    </Card>

                    <Card padding="lg" className="bg-indigo-500/5 border-indigo-500/20">
                        <h3 className="text-indigo-400 font-bold mb-2 text-sm">Profile Connectivity</h3>
                        <p className="text-[#8899AA] text-xs leading-relaxed mb-4">Connecting your social accounts allows us to auto-fill applications and find roles matching your skills.</p>
                        <div className="space-y-2">
                            <Button variant="secondary" size="sm" className="w-full">
                                Connect GitHub
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
        </Page>
    );
}
