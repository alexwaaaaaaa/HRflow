"use client";

import { BedDouble, Clock, Moon, Plane } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function DoNotDisturbPage() {
    return (
        <Page
            title="Do Not Disturb (DND)"
            subtitle="Mute non-critical notifications during off-hours, weekends, or vacations."
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Settings", href: "/settings" },
                { label: "Notifications", href: "/settings/notifications" },
                { label: "DND" },
            ]}
            maxWidth="900px"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Daily Schedule Card */}
                <Card padding="lg" className="relative overflow-hidden group hover:border-indigo-500/50 transition-colors">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none" aria-hidden="true">
                        <BedDouble size={120} className="text-indigo-500" />
                    </div>

                    <div className="flex justify-between items-start mb-6 relative z-10">
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            <Moon size={20} className="text-indigo-400" aria-hidden="true" /> Daily Quiet Hours
                        </h3>
                        <div className="relative shrink-0">
                            <input type="checkbox" id="dnd-daily" className="sr-only peer" defaultChecked />
                            <label
                                htmlFor="dnd-daily"
                                className="w-11 h-6 bg-[#131B2B] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-500 border border-[#2A3A4A] transition-colors block cursor-pointer"
                            />
                        </div>
                    </div>

                    <div className="space-y-4 relative z-10">
                        <div className="flex items-center gap-4">
                            <div className="flex-1">
                                <label htmlFor="dnd-from" className="block text-xs font-bold text-[#8899AA] uppercase tracking-wider mb-2">From</label>
                                <div className="relative">
                                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#556677]" size={16} aria-hidden="true" />
                                    <select id="dnd-from" className="w-full pl-10 pr-3 py-2 bg-[#060D1A] border border-[#1A2A3A] rounded-lg text-white text-sm outline-none focus:border-indigo-500">
                                        <option>08:00 PM</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex-1">
                                <label htmlFor="dnd-to" className="block text-xs font-bold text-[#8899AA] uppercase tracking-wider mb-2">To</label>
                                <div className="relative">
                                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#556677]" size={16} aria-hidden="true" />
                                    <select id="dnd-to" className="w-full pl-10 pr-3 py-2 bg-[#060D1A] border border-[#1A2A3A] rounded-lg text-white text-sm outline-none focus:border-indigo-500">
                                        <option>08:00 AM</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <p className="text-sm text-[#8899AA]">Push notifications will be silenced except for L1 Escalations.</p>
                    </div>
                </Card>

                {/* Vacation Card */}
                <Card padding="lg" className="relative overflow-hidden group hover:border-[#00E5A0]/50 transition-colors">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none" aria-hidden="true">
                        <Plane size={120} className="text-[#00E5A0]" />
                    </div>

                    <div className="flex justify-between items-start mb-6 relative z-10">
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            <Plane size={20} className="text-[#00E5A0]" aria-hidden="true" /> Vacation Mode (OOT)
                        </h3>
                        <div className="relative shrink-0">
                            <input type="checkbox" id="dnd-vacation" className="sr-only peer" />
                            <label
                                htmlFor="dnd-vacation"
                                className="w-11 h-6 bg-[#131B2B] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00E5A0] border border-[#2A3A4A] transition-colors block cursor-pointer"
                            />
                        </div>
                    </div>

                    <div className="space-y-4 relative z-10">
                        <p className="text-sm text-[#8899AA]">Automatically routes your approval requests and mutes all incoming alerts.</p>
                        <div className="pt-2">
                            <label htmlFor="delegate-to" className="block text-xs font-bold text-[#8899AA] uppercase tracking-wider mb-2">Auto-delegate To</label>
                            <select id="delegate-to" className="w-full bg-[#060D1A] border border-[#1A2A3A] rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-[#00E5A0]">
                                <option>Neha Sharma (Direct Report)</option>
                                <option>Rahul Dev (Peer Manager)</option>
                            </select>
                        </div>
                    </div>
                </Card>
            </div>
        </Page>
    );
}
