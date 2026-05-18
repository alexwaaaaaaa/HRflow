"use client";
import React, { useState } from "react";
import {
    PlayCircle, CheckCircle2, ChevronRight, UploadCloud, Clock, Calendar, Building2,
} from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function PreboardingPortal() {
    const [progress] = useState(45);

    return (
        <Page
            title="Pre-boarding Portal"
            subtitle="Your journey as our new Frontend Developer begins in 4 days. Let's get you prepared for a seamless Day 1."
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Onboarding", href: "/onboarding/dashboard" },
                { label: "Pre-boarding", href: "/onboarding/pre-boarding" },
            ]}
        >
            {/* Hero Banner */}
            <div className="h-[200px] w-full relative overflow-hidden bg-gradient-to-br from-[#0A1420] via-[#0F1C2E] to-[#152336] border border-[#1A2A3A] rounded-2xl mb-8">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-[#00E5A0] opacity-[0.03] blur-[100px] rounded-full translate-x-1/3" />
                <div className="absolute bottom-0 left-0 w-1/3 h-full bg-[#33E6FF] opacity-[0.03] blur-[80px] rounded-full -translate-x-1/4" />

                <div className="h-full px-8 flex flex-col justify-end pb-8 relative z-10">
                    <div className="flex items-end justify-between">
                        <div>
                            <div className="inline-block px-3 py-1 mb-3 rounded-full bg-[#00E5A0]/10 text-[#00E5A0] text-xs font-bold tracking-wider uppercase border border-[#00E5A0]/20">
                                Pre-boarding
                            </div>
                            <h2 className="text-2xl font-bold tracking-tight text-white mb-1">Welcome to TechCorp, Arjun!</h2>
                            <p className="text-[#8899AA] max-w-xl">
                                Your journey as our new <span className="text-white font-medium">Frontend Developer</span> begins in 4 days.
                            </p>
                        </div>

                        {/* Progress Widget */}
                        <div className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-2xl p-4 flex items-center gap-5 shadow-xl">
                            <div className="relative w-16 h-16 flex items-center justify-center">
                                <svg
                                    className="w-full h-full transform -rotate-90"
                                    aria-hidden="true"
                                >
                                    <circle cx="32" cy="32" r="28" stroke="#1A2A3A" strokeWidth="6" fill="none" />
                                    <circle
                                        cx="32"
                                        cy="32"
                                        r="28"
                                        stroke="#00E5A0"
                                        strokeWidth="6"
                                        fill="none"
                                        strokeDasharray={2 * Math.PI * 28}
                                        strokeDashoffset={2 * Math.PI * 28 * (1 - progress / 100)}
                                        className="transition-all duration-1000 ease-out"
                                    />
                                </svg>
                                <span
                                    className="absolute text-sm font-bold text-white"
                                    role="progressbar"
                                    aria-valuenow={progress}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                    aria-label={`Readiness: ${progress}%`}
                                >
                                    {progress}%
                                </span>
                            </div>
                            <div>
                                <h3 className="font-semibold text-white">Your Readiness</h3>
                                <p className="text-xs text-[#8899AA] mt-1">2 of 5 tasks completed</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-8">
                    {/* CEO Welcome Video */}
                    <div className="group relative rounded-2xl overflow-hidden border border-[#1A2A3A] bg-[#0F1C2E] aspect-video cursor-pointer">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                        <img
                            src="https://images.unsplash.com/photo-1556761175-5973dc0f32d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
                            alt="CEO delivering welcome message to new joiners"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 flex items-center justify-center z-20">
                            <div className="w-16 h-16 bg-[#00E5A0] rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(0,229,160,0.5)] group-hover:scale-110 transition-transform">
                                <PlayCircle size={32} className="text-[#0A1420] ml-1" aria-hidden="true" />
                            </div>
                        </div>
                        <div className="absolute bottom-6 left-6 z-20">
                            <h3 className="text-xl font-bold text-white mb-1 drop-shadow-md">A Message from our CEO</h3>
                            <p className="text-sm text-white/80 drop-shadow-md">2:45 mins • Welcome to the family</p>
                        </div>
                    </div>

                    {/* Pre-boarding Tasks */}
                    <Card padding="lg">
                        <h2 className="text-lg font-bold text-white mb-6">Required Before Day 1</h2>

                        <div className="space-y-4">
                            {/* Task 1: Completed */}
                            <div className="flex items-start gap-4 p-4 rounded-xl bg-[#0A1420] border border-[#1A2A3A] opacity-60">
                                <div className="mt-0.5 text-[#00E5A0]">
                                    <CheckCircle2 size={24} aria-hidden="true" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-[15px] font-semibold text-white line-through decoration-[#445566]">
                                        Sign Digital Appointment Letter
                                    </h3>
                                    <p className="text-xs text-[#8899AA] mt-1">Completed on Mar 10</p>
                                </div>
                                <button type="button" className="text-sm text-[#445566] hover:text-white transition-colors">
                                    View
                                </button>
                            </div>

                            {/* Task 2: Active */}
                            <div className="flex items-start gap-4 p-4 rounded-xl bg-[#1A2A3A] border border-[#00E5A0] shadow-[0_0_15px_rgba(0,229,160,0.05)]">
                                <div className="w-6 h-6 rounded-full border-2 border-[#445566] mt-0.5" aria-hidden="true" />
                                <div className="flex-1">
                                    <h3 className="text-[15px] font-semibold text-white">Upload Identity Documents</h3>
                                    <p className="text-sm text-[#8899AA] mt-1 mb-3">
                                        Please upload a clear copy of your PAN Card and Aadhar.
                                    </p>
                                    <Button icon={<UploadCloud size={16} aria-hidden="true" />}>
                                        Upload Files
                                    </Button>
                                </div>
                            </div>

                            {/* Task 3: To Do */}
                            <div className="flex items-start gap-4 p-4 rounded-xl bg-[#0F1C2E] border border-[#1A2A3A] group hover:border-[#2A3A4A] transition-colors cursor-pointer">
                                <div className="w-6 h-6 rounded-full border-2 border-[#445566] group-hover:border-[#8899AA] transition-colors mt-0.5" aria-hidden="true" />
                                <div className="flex-1">
                                    <h3 className="text-[15px] font-semibold text-white group-hover:text-[#33E6FF] transition-colors">
                                        Bank Account Verification
                                    </h3>
                                    <p className="text-sm text-[#8899AA] mt-1">Submit your salary account details for direct deposit.</p>
                                </div>
                                <ChevronRight size={20} className="text-[#445566] group-hover:text-white mt-2 transition-colors" aria-hidden="true" />
                            </div>

                            {/* Task 4: To Do */}
                            <div className="flex items-start gap-4 p-4 rounded-xl bg-[#0F1C2E] border border-[#1A2A3A] group hover:border-[#2A3A4A] transition-colors cursor-pointer">
                                <div className="w-6 h-6 rounded-full border-2 border-[#445566] group-hover:border-[#8899AA] transition-colors mt-0.5" aria-hidden="true" />
                                <div className="flex-1">
                                    <h3 className="text-[15px] font-semibold text-white group-hover:text-[#33E6FF] transition-colors">
                                        IT Asset Preference
                                    </h3>
                                    <p className="text-sm text-[#8899AA] mt-1">Choose between Mac or PC and select your peripherals.</p>
                                </div>
                                <ChevronRight size={20} className="text-[#445566] group-hover:text-white mt-2 transition-colors" aria-hidden="true" />
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    {/* Day 1 Logistics */}
                    <Card padding="lg">
                        <h2 className="text-lg font-bold text-white mb-5 flex items-center gap-2">
                            <Calendar size={18} className="text-[#9D00FF]" aria-hidden="true" /> Day 1 Details
                        </h2>
                        <div className="space-y-4">
                            <div className="flex gap-4 items-start">
                                <div className="bg-[#1A2A3A] p-2 rounded-lg text-[#33E6FF] shrink-0">
                                    <Clock size={16} aria-hidden="true" />
                                </div>
                                <div>
                                    <span className="block text-xs font-semibold text-[#8899AA] uppercase tracking-wider mb-1">Reporting Time</span>
                                    <span className="text-sm text-white font-medium">Monday, 14 Mar • 10:00 AM IST</span>
                                </div>
                            </div>
                            <div className="flex gap-4 items-start">
                                <div className="bg-[#1A2A3A] p-2 rounded-lg text-[#FFB020] shrink-0">
                                    <Building2 size={16} aria-hidden="true" />
                                </div>
                                <div>
                                    <span className="block text-xs font-semibold text-[#8899AA] uppercase tracking-wider mb-1">Office Location</span>
                                    <span className="text-sm text-white font-medium leading-relaxed block">
                                        Cyber Hub, Tower B, 14th Floor,<br />Gurugram, HR 122002
                                    </span>
                                    <a href="#" className="text-xs text-[#00E5A0] hover:underline mt-1 inline-block">
                                        View on Google Maps
                                    </a>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Need Help */}
                    <Card className="bg-gradient-to-b from-[#1A2A3A] to-[#0A1420] border-[#2A3A4A]">
                        <h2 className="text-base font-bold text-white mb-2">Need Assistance?</h2>
                        <p className="text-sm text-[#8899AA] mb-4">
                            Your Onboarding buddy, <strong>Vikram Singh</strong>, is here to help you get settled.
                        </p>
                        <Button variant="secondary" className="w-full justify-center">
                            Email Vikram
                        </Button>
                    </Card>
                </div>
            </div>
        </Page>
    );
}
