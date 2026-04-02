"use client";

import { Globe, Calendar as CalendarIcon, Clock, Hash } from "lucide-react";
import Input from "@/components/ui/Input";

export default function LocalePage() {
    return (
        <div style={{ padding: "48px 64px", maxWidth: 840 }} className="animate-fade-in">
            <h2 style={{ fontSize: 24, fontWeight: 600, color: "#FFFFFF", margin: 0 }}>Timezone & Language Settings</h2>
            <p style={{ fontSize: 14, color: "#8899AA", marginTop: 4 }}>Set regional defaults. Employees can override language limits individually.</p>

            <div className="grid grid-cols-2 gap-8 mt-8">

                <div className="flex flex-col gap-6">
                    <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 24 }}>
                        <div className="flex items-center gap-2 mb-4">
                            <Clock size={18} color="#00E5A0" />
                            <h3 style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF", margin: 0 }}>System Timezone</h3>
                        </div>
                        <select className="w-full h-10 px-3 rounded-lg text-sm bg-[#060B14] border border-[#1A2A3A] text-white outline-none focus:border-[#00E5A0]">
                            <option>(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi</option>
                            <option>(GMT+05:30) Sri Jayawardenepura</option>
                            <option>(GMT+00:00) Greenwich Mean Time</option>
                        </select>
                        <div style={{ fontSize: 12, color: "#8899AA", marginTop: 8 }}>Used for attendance logging, cut-offs, and scheduled emails.</div>
                    </div>

                    <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 24 }}>
                        <div className="flex items-center gap-2 mb-4">
                            <Globe size={18} color="#0066FF" />
                            <h3 style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF", margin: 0 }}>Default Language</h3>
                        </div>
                        <select className="w-full h-10 px-3 rounded-lg text-sm bg-[#060B14] border border-[#1A2A3A] text-white outline-none focus:border-[#00E5A0]">
                            <option>English (India) — Default</option>
                            <option>Hindi (हिंदी)</option>
                            <option>Marathi (मराठी)</option>
                            <option>Tamil (தமிழ்)</option>
                            <option>Telugu (తెలుగు)</option>
                            <option>Kannada (ಕನ್ನಡ)</option>
                        </select>
                        <div style={{ fontSize: 12, color: "#8899AA", marginTop: 8 }}>Primary language for UI and notifications.</div>
                    </div>
                </div>

                <div className="flex flex-col gap-6">
                    <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 24 }}>
                        <div className="flex items-center gap-2 mb-4">
                            <Hash size={18} color="#FFB800" />
                            <h3 style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF", margin: 0 }}>Formats</h3>
                        </div>

                        <div className="flex flex-col gap-4">
                            <div>
                                <label style={{ fontSize: 12, color: "#8899AA", marginBottom: 4, display: "block" }}>Date Format</label>
                                <select className="w-full h-10 px-3 rounded-lg text-sm bg-[#060B14] border border-[#1A2A3A] text-white outline-none">
                                    <option>DD/MM/YYYY (15/08/2024)</option>
                                    <option>DD MMM YYYY (15 Aug 2024)</option>
                                    <option>MM/DD/YYYY (08/15/2024)</option>
                                </select>
                            </div>
                            <div>
                                <label style={{ fontSize: 12, color: "#8899AA", marginBottom: 4, display: "block" }}>Number Format (Currency)</label>
                                <select className="w-full h-10 px-3 rounded-lg text-sm bg-[#060B14] border border-[#1A2A3A] text-white outline-none">
                                    <option>Indian System (1,00,000.00)</option>
                                    <option>International System (100,000.00)</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 24 }}>
                        <div className="flex items-center gap-2 mb-4">
                            <CalendarIcon size={18} color="#FF4444" />
                            <h3 style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF", margin: 0 }}>Holiday Calendar</h3>
                        </div>
                        <select className="w-full h-10 px-3 rounded-lg text-sm bg-[#060B14] border border-[#1A2A3A] text-white outline-none">
                            <option>India — Central Holidays (+14 Days)</option>
                            <option>Maharashtra — Regional Holidays (+18 Days)</option>
                            <option>Karnataka — Regional Holidays (+16 Days)</option>
                        </select>
                        <div style={{ fontSize: 12, color: "#8899AA", marginTop: 8 }}>You can assign different holiday lists to different branches later.</div>
                    </div>
                </div>

            </div>

        </div>
    );
}
