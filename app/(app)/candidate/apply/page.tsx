"use client";
import React, { useState } from 'react';
import { ArrowLeft, Upload, Send } from 'lucide-react';
import Link from 'next/link';
import Page from '@/components/ui/Page';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function CandidateApplyScreen() {
    const [step, setStep] = useState(1);

    return (
        <Page
            title="Apply for Senior Frontend Engineer"
            subtitle="Please complete your application below"
            breadcrumbs={[
                { label: 'Home', href: '/' },
                { label: 'Careers', href: '/candidate/jobs' },
                { label: 'Apply', href: '/candidate/apply' },
            ]}
            maxWidth="800px"
        >
            <div className="space-y-8">
                <Link href="/candidate/job-detail" className="text-[#556677] hover:text-white text-sm font-bold flex items-center gap-1 inline-flex">
                    <ArrowLeft size={16} aria-hidden="true" /> Back to Job Description
                </Link>

                <div className="flex items-center justify-between mb-8 relative">
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-[#1A2A3A] -translate-y-1/2 pointer-events-none" aria-hidden="true"></div>
                    <div
                        className="absolute top-1/2 left-0 h-0.5 bg-indigo-600 -translate-y-1/2 pointer-events-none transition-all"
                        style={{ width: step === 1 ? '50%' : '100%' }}
                        aria-hidden="true"
                    ></div>

                    <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center relative z-10 font-bold ${step >= 1 ? 'bg-indigo-600 text-white shadow-[0_0_15px_rgba(79,70,229,0.5)]' : 'bg-[#1A2A3A] text-[#8899AA]'}`}
                        aria-current={step === 1 ? 'step' : undefined}
                    >1</div>
                    <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center relative z-10 font-bold ${step >= 2 ? 'bg-indigo-600 text-white shadow-[0_0_15px_rgba(79,70,229,0.5)]' : 'bg-[#1A2A3A] text-[#8899AA]'}`}
                        aria-current={step === 2 ? 'step' : undefined}
                    >2</div>
                </div>

                {step === 1 && (
                    <Card padding="lg" className="space-y-6 animate-in fade-in slide-in-from-right-4">
                        <h2 className="text-xl font-bold text-white border-b border-[#1A2A3A] pb-4 mb-6">Personal details &amp; Resume</h2>

                        <div className="border border-dashed border-[#2A3A4A] rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:border-indigo-500 transition-colors bg-[#131B2B]">
                            <Upload size={32} className="text-[#556677] mb-3" aria-hidden="true" />
                            <div className="text-white font-bold mb-1">Upload Resume (PDF, DOCX)</div>
                            <div className="text-[#556677] text-sm max-w-sm mb-4">We will automatically parse your resume and prepopulate the fields below.</div>
                            <Button variant="secondary" size="sm">Browse Files</Button>
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="first-name" className="block text-[#8899AA] text-xs font-bold mb-2">First Name *</label>
                                <input id="first-name" type="text" className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl px-4 py-3 text-white focus:border-indigo-500 outline-none transition-colors" />
                            </div>
                            <div>
                                <label htmlFor="last-name" className="block text-[#8899AA] text-xs font-bold mb-2">Last Name *</label>
                                <input id="last-name" type="text" className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl px-4 py-3 text-white focus:border-indigo-500 outline-none transition-colors" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-[#8899AA] text-xs font-bold mb-2">Email *</label>
                                <input id="email" type="email" className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl px-4 py-3 text-white focus:border-indigo-500 outline-none transition-colors" />
                            </div>
                            <div>
                                <label htmlFor="phone" className="block text-[#8899AA] text-xs font-bold mb-2">Phone</label>
                                <input id="phone" type="tel" className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl px-4 py-3 text-white focus:border-indigo-500 outline-none transition-colors" />
                            </div>
                        </div>

                        <div className="flex justify-end pt-6">
                            <Button variant="primary" size="md" onClick={() => setStep(2)}>
                                Next Step
                            </Button>
                        </div>
                    </Card>
                )}

                {step === 2 && (
                    <Card padding="lg" className="space-y-6 animate-in fade-in slide-in-from-right-4">
                        <h2 className="text-xl font-bold text-white border-b border-[#1A2A3A] pb-4 mb-6">Additional Questions</h2>

                        <div>
                            <label htmlFor="linkedin-url" className="block text-[#8899AA] text-xs font-bold mb-2">LinkedIn Profile URL</label>
                            <input id="linkedin-url" type="url" className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl px-4 py-3 text-white focus:border-indigo-500 outline-none transition-colors" />
                        </div>

                        <div>
                            <label htmlFor="github-url" className="block text-[#8899AA] text-xs font-bold mb-2">GitHub / Portfolio URL</label>
                            <input id="github-url" type="url" className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl px-4 py-3 text-white focus:border-indigo-500 outline-none transition-colors" />
                        </div>

                        <div>
                            <label htmlFor="visa-sponsorship" className="block text-[#8899AA] text-xs font-bold mb-2">Will you now or in the future require sponsorship for employment visa status? *</label>
                            <select id="visa-sponsorship" className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl px-4 py-3 text-white focus:border-indigo-500 outline-none transition-colors appearance-none">
                                <option value="">Select option...</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="cover-letter" className="block text-[#8899AA] text-xs font-bold mb-2">Why are you interested in joining HRFlow? (Optional)</label>
                            <textarea id="cover-letter" rows={4} className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl px-4 py-3 text-white focus:border-indigo-500 outline-none transition-colors resize-none"></textarea>
                        </div>

                        <div className="flex justify-between pt-6 border-t border-[#1A2A3A]">
                            <Button variant="secondary" size="md" onClick={() => setStep(1)}>
                                Back
                            </Button>
                            <Link href="/candidate/status" className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-8 py-3 rounded-xl transition-colors flex items-center gap-2">
                                <Send size={18} aria-hidden="true" /> Submit Application
                            </Link>
                        </div>
                    </Card>
                )}
            </div>
        </Page>
    );
}
