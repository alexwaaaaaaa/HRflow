"use client";

import { Globe, Calendar as CalendarIcon, Clock, Hash } from "lucide-react";
import Card from "@/components/ui/Card";

export default function LocalePage() {
    return (
        <div className="px-16 py-12 max-w-[840px] animate-fade-in">
            <h2 className="text-2xl font-semibold text-white m-0">Timezone &amp; Language Settings</h2>
            <p className="text-sm text-[#8899AA] mt-1">Set regional defaults. Employees can override language limits individually.</p>

            <div className="grid grid-cols-2 gap-8 mt-8">
                <div className="flex flex-col gap-6">
                    <Card variant="default" padding="md">
                        <div className="flex items-center gap-2 mb-4">
                            <Clock size={18} color="#00E5A0" aria-hidden="true" />
                            <h3 className="text-base font-semibold text-white m-0">System Timezone</h3>
                        </div>
                        <label htmlFor="timezone" className="sr-only">System timezone</label>
                        <select
                            id="timezone"
                            className="w-full h-10 px-3 rounded-lg text-sm bg-[#060B14] border border-[#1A2A3A] text-white outline-none focus:border-[#00E5A0] transition-colors"
                        >
                            <option>(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi</option>
                            <option>(GMT+05:30) Sri Jayawardenepura</option>
                            <option>(GMT+00:00) Greenwich Mean Time</option>
                        </select>
                        <div className="text-xs text-[#8899AA] mt-2">Used for attendance logging, cut-offs, and scheduled emails.</div>
                    </Card>

                    <Card variant="default" padding="md">
                        <div className="flex items-center gap-2 mb-4">
                            <Globe size={18} color="#0066FF" aria-hidden="true" />
                            <h3 className="text-base font-semibold text-white m-0">Default Language</h3>
                        </div>
                        <label htmlFor="language" className="sr-only">Default language</label>
                        <select
                            id="language"
                            className="w-full h-10 px-3 rounded-lg text-sm bg-[#060B14] border border-[#1A2A3A] text-white outline-none focus:border-[#00E5A0] transition-colors"
                        >
                            <option>English (India) — Default</option>
                            <option>Hindi (हिंदी)</option>
                            <option>Marathi (मराठी)</option>
                            <option>Tamil (தமிழ்)</option>
                            <option>Telugu (తెలుగు)</option>
                            <option>Kannada (ಕನ್ನಡ)</option>
                        </select>
                        <div className="text-xs text-[#8899AA] mt-2">Primary language for UI and notifications.</div>
                    </Card>
                </div>

                <div className="flex flex-col gap-6">
                    <Card variant="default" padding="md">
                        <div className="flex items-center gap-2 mb-4">
                            <Hash size={18} color="#FFB800" aria-hidden="true" />
                            <h3 className="text-base font-semibold text-white m-0">Formats</h3>
                        </div>

                        <div className="flex flex-col gap-4">
                            <div>
                                <label htmlFor="date-format" className="block text-xs text-[#8899AA] mb-1.5">Date Format</label>
                                <select
                                    id="date-format"
                                    className="w-full h-10 px-3 rounded-lg text-sm bg-[#060B14] border border-[#1A2A3A] text-white outline-none focus:border-[#00E5A0] transition-colors"
                                >
                                    <option>DD/MM/YYYY (15/08/2024)</option>
                                    <option>DD MMM YYYY (15 Aug 2024)</option>
                                    <option>MM/DD/YYYY (08/15/2024)</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="number-format" className="block text-xs text-[#8899AA] mb-1.5">Number Format (Currency)</label>
                                <select
                                    id="number-format"
                                    className="w-full h-10 px-3 rounded-lg text-sm bg-[#060B14] border border-[#1A2A3A] text-white outline-none focus:border-[#00E5A0] transition-colors"
                                >
                                    <option>Indian System (1,00,000.00)</option>
                                    <option>International System (100,000.00)</option>
                                </select>
                            </div>
                        </div>
                    </Card>

                    <Card variant="default" padding="md">
                        <div className="flex items-center gap-2 mb-4">
                            <CalendarIcon size={18} color="#FF4444" aria-hidden="true" />
                            <h3 className="text-base font-semibold text-white m-0">Holiday Calendar</h3>
                        </div>
                        <label htmlFor="holiday-calendar" className="sr-only">Holiday calendar</label>
                        <select
                            id="holiday-calendar"
                            className="w-full h-10 px-3 rounded-lg text-sm bg-[#060B14] border border-[#1A2A3A] text-white outline-none focus:border-[#00E5A0] transition-colors"
                        >
                            <option>India — Central Holidays (+14 Days)</option>
                            <option>Maharashtra — Regional Holidays (+18 Days)</option>
                            <option>Karnataka — Regional Holidays (+16 Days)</option>
                        </select>
                        <div className="text-xs text-[#8899AA] mt-2">You can assign different holiday lists to different branches later.</div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
