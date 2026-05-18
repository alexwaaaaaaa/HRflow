"use client";
import React from 'react';
import { MapPin, Briefcase, ArrowLeft, Share2, Globe, Heart } from 'lucide-react';
import Link from 'next/link';
import Page from '@/components/ui/Page';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function JobDetailScreen() {
    return (
        <Page
            title="Senior Frontend Engineer"
            subtitle="Engineering · Bengaluru, India (Hybrid) · Full-time"
            breadcrumbs={[
                { label: 'Home', href: '/' },
                { label: 'Careers', href: '/candidate/jobs' },
                { label: 'Senior Frontend Engineer', href: '/candidate/job-detail' },
            ]}
        >
            <div className="space-y-6">
                <Link href="/candidate/jobs" className="text-[#556677] hover:text-white text-sm font-bold flex items-center gap-1 inline-flex">
                    <ArrowLeft size={16} aria-hidden="true" /> Back to all jobs
                </Link>

                <Card padding="lg" className="relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-32 bg-indigo-500/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" aria-hidden="true"></div>

                    <div className="flex justify-between items-start relative z-10">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <span className="px-3 py-1 bg-indigo-500/20 text-indigo-400 text-xs font-bold uppercase rounded-lg border border-indigo-500/30">Engineering</span>
                                <span className="text-[#556677] text-sm">Req ID: JB001</span>
                            </div>
                            <h2 className="text-4xl font-black text-white tracking-tight mb-4">Senior Frontend Engineer</h2>

                            <div className="flex flex-wrap items-center gap-6 text-sm text-[#AABBCC]">
                                <span className="flex items-center gap-2"><MapPin size={18} className="text-[#556677]" aria-hidden="true" /> Bengaluru, India (Hybrid)</span>
                                <span className="flex items-center gap-2"><Briefcase size={18} className="text-[#556677]" aria-hidden="true" /> Full-time</span>
                                <span className="flex items-center gap-2"><Globe size={18} className="text-[#556677]" aria-hidden="true" /> Mid-Senior Level</span>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3">
                            <Link href="/candidate/apply" className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-8 py-3 rounded-xl transition-colors text-center shadow-[0_0_20px_rgba(79,70,229,0.3)]">
                                Apply Now
                            </Link>
                            <div className="flex gap-2">
                                <Button variant="ghost" size="sm" aria-label="Save job">
                                    <Heart size={20} />
                                </Button>
                                <Button variant="ghost" size="sm" aria-label="Share job">
                                    <Share2 size={20} />
                                </Button>
                            </div>
                        </div>
                    </div>
                </Card>

                <div className="grid md:grid-cols-3 gap-8 pt-4">
                    <div className="md:col-span-2 space-y-8 text-slate-300 leading-relaxed">
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">About the Role</h2>
                            <p className="mb-4">HRFlow is building the workforce OS for the modern enterprise. We are looking for an experienced Senior Frontend Engineer to join our core product team.</p>
                            <p>You will be responsible for architecting and building highly performant, responsive, and beautiful user interfaces that millions of employees use daily to manage their work lives.</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-white mb-4">What You Will Do</h2>
                            <ul className="list-disc pl-5 space-y-2 text-[#AABBCC]">
                                <li>Lead the development of complex frontend modules using React, Next.js, and TypeScript.</li>
                                <li>Collaborate closely with product managers and designers to iterate on UI/UX designs.</li>
                                <li>Establish and maintain frontend infrastructure, tooling, and best practices.</li>
                                <li>Mentor junior engineers and conduct technical code reviews.</li>
                                <li>Optimize application performance resulting in faster load times and smoother interactions.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-white mb-4">What We Look For</h2>
                            <ul className="list-disc pl-5 space-y-2 text-[#AABBCC]">
                                <li>5+ years of experience building scalable web applications.</li>
                                <li>Deep expertise in modern JavaScript/TypeScript, React, and related ecosystems.</li>
                                <li>Strong understanding of web performance, DOM rendering, and CSS architectures (Tailwind).</li>
                                <li>A keen eye for design and a passion for creating pixel-perfect, accessible UIs.</li>
                                <li>Excellent communication skills and ability to thrive in a fast-paced startup environment.</li>
                            </ul>
                        </section>
                    </div>

                    <div className="space-y-6">
                        <Card padding="lg">
                            <h3 className="text-white font-bold mb-4">Life at HRFlow</h3>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3 text-sm text-[#AABBCC]">
                                    <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">₹</div>
                                    <div><strong className="text-white block">Competitive Pay</strong>Top 90th percentile equity and compensation.</div>
                                </li>
                                <li className="flex items-start gap-3 text-sm text-[#AABBCC]">
                                    <div className="w-8 h-8 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">🏥</div>
                                    <div><strong className="text-white block">Premium Health Care</strong>Comprehensive family coverage options.</div>
                                </li>
                                <li className="flex items-start gap-3 text-sm text-[#AABBCC]">
                                    <div className="w-8 h-8 rounded-full bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0">✈️</div>
                                    <div><strong className="text-white block">Unlimited PTO</strong>Take the time you need to recharge, no questions asked.</div>
                                </li>
                            </ul>
                        </Card>
                    </div>
                </div>
            </div>
        </Page>
    );
}
