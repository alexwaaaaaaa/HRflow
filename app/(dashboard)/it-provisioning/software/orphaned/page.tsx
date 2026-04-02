"use client";

import { AlertTriangle, TrendingDown, Clock, Search, ShieldAlert, CheckCircle2, MoreVertical, Mail } from "lucide-react";
import Button from "@/components/ui/Button";

// --- Mock Data ---
const ORPHANED_LICENSES = [
    {
        id: "lic-1",
        app: "Adobe Creative Cloud",
        icon: "🎨",
        type: "inactive_user",
        user: "Mike Johnson",
        status: "Offboarded 15 days ago",
        cost: "₹ 4,200/mo",
        lastSeen: "16 days ago"
    },
    {
        id: "lic-2",
        app: "Jira Software Premium",
        icon: "🛠️",
        type: "zero_activity",
        user: "Emily Chen",
        status: "No logins or API activity recorded since Sept 10",
        cost: "₹ 1,100/mo",
        lastSeen: "46 days ago"
    },
];

export default function OrphanedLicenseAlertScreen() {
    return (
        <main className="px-8 py-6 pb-16 animate-fade-in relative max-w-6xl mx-auto min-h-screen">
            {/* Page Header */}
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 border-b border-[#1A2A3A] pb-6 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white m-0 tracking-tight">Orphaned & Unused Licenses</h1>
                    <p className="text-sm text-[#8899AA] mt-1.5">Detect active subscriptions assigned to inactive users or showing zero activity</p>
                </div>
                <Button variant="primary" icon={<TrendingDown size={16} aria-hidden="true" />} className="bg-[#00E5A0] hover:bg-[#00E5A0]/90 text-black border-none font-bold shadow-[0_0_15px_rgba(0,229,160,0.15)] flex-shrink-0">
                    Optimize Costs
                </Button>
            </header>

            {/* Impact Metric Dashboard */}
            <section className="bg-gradient-to-r from-[#FF4444]/10 via-[#FF4444]/5 to-[#FFB800]/5 border border-[#FF4444]/30 rounded-2xl p-6 md:p-8 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-sm relative overflow-hidden" aria-labelledby="savings-heading">
                {/* Background decorative element */}
                <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#FF4444]/10 rounded-full blur-3xl pointer-events-none" aria-hidden="true"></div>

                <div className="flex items-center gap-5 md:gap-6 relative z-10 w-full md:w-auto">
                    <div className="w-16 h-16 rounded-full bg-[#0A1420] border-2 border-[#FF4444]/40 flex justify-center items-center flex-shrink-0 shadow-inner" aria-hidden="true">
                        <AlertTriangle size={28} className="text-[#FF4444]" />
                    </div>
                    <div className="min-w-0">
                        <h2 id="savings-heading" className="text-xs font-bold text-[#FF4444] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                            Potential Monthly Savings
                        </h2>
                        <div className="text-4xl font-black text-white mb-2 tracking-tight">₹ 42,500</div>
                        <p className="text-sm text-[#8899AA] m-0 leading-relaxed truncate whitespace-normal sm:whitespace-nowrap">
                            Based on <strong className="text-white font-semibold">14 unused licenses</strong> detected across 6 applications.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row md:flex-col gap-3 w-full md:w-56 relative z-10 flex-shrink-0">
                    <Button variant="primary" className="w-full bg-[#FF4444] hover:bg-[#FF4444]/90 text-white border-none font-bold shadow-[0_0_15px_rgba(255,68,68,0.2)]" aria-label="Revoke all 14 orphaned licenses">
                        Revoke All Orphaned
                    </Button>
                    <Button variant="secondary" icon={<Mail size={14} aria-hidden="true" />} className="w-full text-sm h-10 border-[#1A2A3A] hover:border-[#334455] bg-[#0A1420] hover:bg-[#1A2A3A]/50">
                        Send Activity Reminders
                    </Button>
                </div>
            </section>

            {/* Detections List Section */}
            <section className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden shadow-sm flex flex-col" aria-labelledby="list-heading">
                <h2 id="list-heading" className="sr-only">Detected Unused Licenses</h2>

                {/* Filter Navigation */}
                <nav className="p-4 border-b border-[#1A2A3A] flex gap-3 bg-[#0A1420]/50 overflow-x-auto custom-scrollbar" aria-label="License Filter Navigation">
                    <div className="flex gap-2 min-w-max">
                        <Button
                            variant="secondary"
                            className="h-9 px-4 text-white border-[#334455] bg-[#1A2A3A] font-medium"
                            aria-current="page"
                        >
                            All Detections (14)
                        </Button>
                        <Button
                            variant="secondary"
                            className="h-9 px-4 border-transparent text-[#8899AA] hover:text-white hover:bg-[#1A2A3A]/50"
                        >
                            Offboarded Users (4)
                        </Button>
                        <Button
                            variant="secondary"
                            className="h-9 px-4 border-transparent text-[#8899AA] hover:text-white hover:bg-[#1A2A3A]/50"
                        >
                            Zero Activity &gt; 30d (10)
                        </Button>
                    </div>
                </nav>

                <div className="flex-grow">
                    <ul role="list" className="divide-y divide-[#1A2A3A] m-0 p-0">
                        {ORPHANED_LICENSES.map((license) => (
                            <li key={license.id} className="p-5 md:p-6 hover:bg-[#1A2A3A]/30 transition-colors group">
                                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5">
                                    <div className="flex gap-4 md:gap-5 min-w-0">
                                        <div className="w-12 h-12 rounded-xl bg-[#060B14] border border-[#1A2A3A] flex justify-center items-center text-2xl shadow-inner flex-shrink-0" aria-hidden="true">
                                            {license.icon}
                                        </div>
                                        <div className="min-w-0">
                                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                                                <h3 className="text-base font-bold text-white m-0 truncate">{license.app}</h3>
                                                {license.type === "inactive_user" ? (
                                                    <span className="inline-flex text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#FF4444]/10 text-[#FF4444] border border-[#FF4444]/20 items-center gap-1.5 w-fit flex-shrink-0">
                                                        <ShieldAlert size={12} aria-hidden="true" /> Inactive User
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#FFB800]/10 text-[#FFB800] border border-[#FFB800]/20 items-center gap-1.5 w-fit flex-shrink-0">
                                                        <Clock size={12} aria-hidden="true" /> Zero Activity &gt; 45d
                                                    </span>
                                                )}
                                            </div>

                                            <p className="text-sm text-[#8899AA] mb-4 leading-relaxed">
                                                Assigned to <strong className="text-white font-medium">{license.user}</strong>.
                                                <span className="block sm:inline sm:ml-1">{license.type === "inactive_user" ? `(${license.status}). License is still active and draining costs.` : `${license.status}.`}</span>
                                            </p>

                                            <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-sm bg-[#060B14] border border-[#1A2A3A] rounded-lg px-4 py-2.5 w-fit">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-[#445566] text-xs uppercase tracking-wider font-semibold">Cost Impact:</span>
                                                    <span className={`font-bold ${license.type === 'inactive_user' ? 'text-[#FF4444]' : 'text-[#FFB800]'}`}>{license.cost}</span>
                                                </div>
                                                <div className="w-px h-4 bg-[#1A2A3A] hidden sm:block" aria-hidden="true"></div>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-[#445566] text-xs uppercase tracking-wider font-semibold">Last Seen:</span>
                                                    <span className="text-white font-medium">{license.lastSeen}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex sm:flex-row flex-col gap-3 lg:w-auto w-full mt-2 lg:mt-0 pl-[4rem] lg:pl-0">
                                        {license.type === "zero_activity" && (
                                            <Button
                                                variant="secondary"
                                                className="w-full sm:w-auto h-10 border-[#1A2A3A] hover:border-[#334455] bg-[#060B14]"
                                                aria-label={`Notify ${license.user} about unused license`}
                                            >
                                                Notify User
                                            </Button>
                                        )}
                                        <Button
                                            variant="secondary"
                                            className={`w-full sm:w-auto h-10 font-medium ${license.type === 'inactive_user' ? 'text-[#FF4444] border-[#FF4444]/30 hover:bg-[#FF4444]/10 hover:border-[#FF4444]/50' : 'text-[#FFB800] border-[#FFB800]/30 hover:bg-[#FFB800]/10 hover:border-[#FFB800]/50'}`}
                                            aria-label={`Revoke ${license.app} license for ${license.user}`}
                                        >
                                            Revoke License
                                        </Button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </main>
    );
}
