"use client";
import React from 'react';
import { Rocket, Monitor, Package, FileText, CheckCircle2, ChevronRight, Video } from 'lucide-react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

const TASKS = [
    { label: 'Welcome Call with Manager', desc: 'Meet VP of Engineering to discuss your first 30 days.', status: 'done', icon: Video, color: 'text-indigo-400' },
    { label: 'Asset Selection', desc: 'Choose your laptop (MacBook Pro M3), monitor, and accessories.', status: 'active', icon: Monitor, color: 'text-amber-400' },
    { label: 'Welcome Swag Kit', desc: 'Confirm your t-shirt size and shipping address.', status: 'pending', icon: Package, color: 'text-rose-400' },
    { label: 'Background Check Forms', desc: 'Complete remaining compliance and previous employer details.', status: 'pending', icon: FileText, color: 'text-emerald-400' },
];

const TASK_ICON_BG: Record<string, string> = {
    done: 'bg-emerald-500/10 text-emerald-500',
    active: 'bg-[#0A1420] border border-[#2A3A4A]',
    pending: 'bg-[#0A1420] border border-[#2A3A4A]',
};

const TASK_CARD_CLASS: Record<string, string> = {
    done: 'bg-[#060D1A] border-[#1A2A3A] opacity-70',
    active: 'bg-[#131B2B] border-indigo-500/50 shadow-[0_0_20px_rgba(79,70,229,0.1)] border-l-4 border-l-indigo-500',
    pending: 'bg-[#131B2B] border-[#2A3A4A] border-l-4 border-l-transparent text-gray-400',
};

const TASK_LABEL_CLASS: Record<string, string> = {
    done: 'text-[#AABBCC]',
    active: 'text-white',
    pending: 'text-[#AABBCC]',
};

export default function CandidatePreboardingScreen() {
    return (
        <div className="min-h-screen bg-[#0A1420] py-10 px-6">
            <div className="max-w-5xl mx-auto space-y-6">

                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                            <Rocket size={28} className="text-indigo-400" aria-hidden="true" /> Pre-boarding Dashboard
                        </h1>
                        <p className="text-[#8899AA]">Welcome aboard! Let&apos;s get everything ready before your Day 1 on Dec 01, 2025.</p>
                    </div>

                    <Card padding="md" className="flex gap-6 text-center">
                        <div>
                            <div className="text-2xl font-black text-emerald-400">26</div>
                            <div className="text-[#556677] text-xs font-bold uppercase mt-1">Days to Go</div>
                        </div>
                        <div className="w-px bg-[#2A3A4A]" aria-hidden="true"></div>
                        <div>
                            <div className="text-2xl font-black text-white">1/4</div>
                            <div className="text-[#556677] text-xs font-bold uppercase mt-1">Tasks Done</div>
                        </div>
                    </Card>
                </div>

                <div className="grid md:grid-cols-3 gap-8 text-black">

                    <div className="md:col-span-2 space-y-6">
                        <h2 className="text-white font-bold text-xl mb-4">Your Setup Checklist</h2>

                        <div className="space-y-4">
                            {TASKS.map((t) => {
                                const Icon = t.icon;
                                return (
                                    <Card
                                        key={t.label}
                                        padding="md"
                                        className={`transition-all ${TASK_CARD_CLASS[t.status]}`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-start gap-4">
                                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${TASK_ICON_BG[t.status]} ${t.status !== 'done' ? t.color : ''}`}>
                                                    {t.status === 'done' ? <CheckCircle2 size={24} aria-hidden="true" /> : <Icon size={20} aria-hidden="true" />}
                                                </div>
                                                <div>
                                                    <h3 className={`font-bold mb-1 ${TASK_LABEL_CLASS[t.status]}`}>{t.label}</h3>
                                                    <p className="text-[#556677] text-sm">{t.desc}</p>
                                                </div>
                                            </div>

                                            {t.status === 'active' && (
                                                <Button variant="primary" size="sm">
                                                    Start <ChevronRight size={16} aria-hidden="true" />
                                                </Button>
                                            )}
                                        </div>
                                    </Card>
                                );
                            })}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <Card padding="lg" className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border-indigo-500/30 relative overflow-hidden text-center text-white">
                            <h3 className="font-bold mb-2 z-10 relative">Meet Your Buddy</h3>
                            <div className="w-20 h-20 rounded-full bg-indigo-500 border-4 border-[#0A1420] mx-auto my-4 shadow-xl z-10 relative flex items-center justify-center text-xl font-black">JS</div>
                            <div className="font-bold text-lg z-10 relative">Jason Smith</div>
                            <div className="text-indigo-200 text-sm mb-4 z-10 relative">Staff Engineer</div>
                            <Button variant="secondary" size="sm" className="w-full relative z-10">
                                Say Hello
                            </Button>
                        </Card>

                        <Card padding="lg">
                            <h3 className="text-white font-bold mb-4">Onboarding Resources</h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between p-3 bg-[#131B2B] rounded-xl group cursor-pointer border border-transparent hover:border-[#2A3A4A]">
                                    <span className="text-sm font-semibold text-[#AABBCC] group-hover:text-white transition-colors">Engineering Culture Deck</span>
                                    <FileText size={16} className="text-[#556677]" aria-hidden="true" />
                                </div>
                                <div className="flex items-center justify-between p-3 bg-[#131B2B] rounded-xl group cursor-pointer border border-transparent hover:border-[#2A3A4A]">
                                    <span className="text-sm font-semibold text-[#AABBCC] group-hover:text-white transition-colors">Day 1 Schedule Guide</span>
                                    <FileText size={16} className="text-[#556677]" aria-hidden="true" />
                                </div>
                                <div className="flex items-center justify-between p-3 bg-[#131B2B] rounded-xl group cursor-pointer border border-transparent hover:border-[#2A3A4A]">
                                    <span className="text-sm font-semibold text-[#AABBCC] group-hover:text-white transition-colors">Tech Stack Overview</span>
                                    <FileText size={16} className="text-[#556677]" aria-hidden="true" />
                                </div>
                            </div>
                        </Card>
                    </div>

                </div>
            </div>
        </div>
    );
}
