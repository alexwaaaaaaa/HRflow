"use client";

import { AlertTriangle, Search, Lock, UserMinus, ShieldCheck, CheckCircle2 } from "lucide-react";
import Button from "@/components/ui/Button";

// --- Mock Data ---
const ACTIVE_APPS = [
    { id: "app-google", name: "Google Workspace", desc: "sarah.connor@company.com", icon: "📧", bg: "bg-[#0066FF]/10 text-[#0066FF]", isCore: true, isRevoked: false },
    { id: "app-adobe", name: "Adobe Creative Cloud", desc: "Design License (₹4,200/mo)", icon: "🎨", bg: "bg-[#0D1928] border border-[#1A2A3A]", isCore: false, isRevoked: false },
    { id: "app-figma", name: "Figma Organization", desc: "Full Editor", icon: "✨", bg: "bg-[#0D1928] border border-[#1A2A3A]", isCore: false, isRevoked: false },
];

const REVOKED_APPS = [
    { id: "app-slack", name: "Slack Teams", time: "1 hour ago", icon: "💬" },
    { id: "app-vpn", name: "Corporate VPN", time: "Yesterday", icon: "🌐" },
];

export default function AccessRevocationScreen() {
    return (
        <main className="px-8 py-6 pb-16 animate-fade-in relative max-w-6xl mx-auto min-h-screen">
            {/* Page Header */}
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 border-b border-[#1A2A3A] pb-6 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white m-0 tracking-tight">Access Revocation</h1>
                    <p className="text-sm text-[#8899AA] mt-1.5">Revoke software access, emails, and VPNs for offboarding</p>
                </div>
            </header>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Employee Search & Context Sidebar */}
                <aside className="w-full lg:w-1/3 flex flex-col gap-6" aria-labelledby="employee-search-heading">
                    <section className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 shadow-sm">
                        <h2 id="employee-search-heading" className="text-base font-bold text-white mb-4">Select Employee</h2>

                        <div className="relative mb-6">
                            <label htmlFor="search-employee" className="sr-only">Search by name or ID</label>
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#445566]" size={16} aria-hidden="true" />
                            <input
                                id="search-employee"
                                type="search"
                                placeholder="Search by name or ID..."
                                className="w-full h-11 bg-[#060B14] border border-[#1A2A3A] rounded-xl pl-10 pr-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#0066FF] focus:border-[#0066FF] transition-all placeholder-[#445566] shadow-sm"
                            />
                        </div>

                        {/* Selected Employee Context */}
                        <div className="flex items-center gap-4 p-4 rounded-xl bg-[#0066FF]/5 border border-[#0066FF]/30 ring-1 ring-[#0066FF]/20 shadow-[0_0_15px_rgba(0,102,255,0.05)]" aria-live="polite">
                            <div className="relative flex-shrink-0">
                                <img src="https://i.pravatar.cc/150?u=sarah" alt="Sarah Connor" className="w-12 h-12 rounded-full border border-[#1A2A3A] object-cover" />
                                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#FF4444] border-2 border-[#060B14] rounded-full flex items-center justify-center text-white" aria-hidden="true">
                                    <UserMinus size={10} />
                                </div>
                            </div>
                            <div className="flex-grow min-w-0">
                                <div className="text-white font-bold truncate">Sarah Connor</div>
                                <div className="text-xs text-[#8899AA] mb-1.5 truncate">Lead Designer</div>
                                <div className="inline-flex text-[10px] font-bold uppercase text-[#FF4444] tracking-wider bg-[#FF4444]/10 px-1.5 py-0.5 rounded">
                                    Offboarding: Nov 20
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="bg-[#FF4444]/5 border border-[#FF4444]/20 rounded-2xl p-6 shadow-sm" aria-labelledby="critical-action-heading">
                        <div className="flex items-start gap-4">
                            <AlertTriangle className="text-[#FF4444] mt-0.5 shrink-0" size={20} aria-hidden="true" />
                            <div>
                                <h2 id="critical-action-heading" className="text-sm font-bold text-[#FF4444] mb-2">Critical Action</h2>
                                <p className="text-sm text-[#FF4444]/90 leading-relaxed m-0">
                                    Revoking access will immediately disconnect the user from the selected applications. Ensure data backup/handover is completed before revoking Core (Email/VPN) tools.
                                </p>
                            </div>
                        </div>
                    </section>
                </aside>

                {/* Revocation List Section */}
                <section className="w-full lg:w-2/3 flex flex-col" aria-labelledby="revocation-list-heading">
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 md:p-8 shadow-sm flex-grow">
                        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 border-b border-[#1A2A3A] pb-5 gap-4">
                            <h2 id="revocation-list-heading" className="text-lg font-bold text-white m-0">
                                Active Provisioned Apps <span className="text-[#8899AA] font-normal" aria-hidden="true">({ACTIVE_APPS.length})</span>
                            </h2>
                            <Button
                                variant="secondary"
                                className="h-9 px-4 text-xs font-semibold text-[#FF4444] bg-[#FF4444]/5 hover:bg-[#FF4444]/10 border-[#FF4444]/20 hover:border-[#FF4444]/40 transition-colors shadow-sm"
                                aria-label="Revoke All Remaining Active Apps"
                            >
                                Revoke All Remaining
                            </Button>
                        </header>

                        <div className="space-y-6">
                            {/* Pending Revocations */}
                            <ul role="list" className="space-y-3 m-0 p-0" aria-label="Apps pending revocation">
                                {ACTIVE_APPS.map((app) => (
                                    <li key={app.id} className="p-4 rounded-xl bg-[#060B14] border border-[#1A2A3A] flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:border-[#334455] transition-colors shadow-sm">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg flex-shrink-0 ${app.bg}`} aria-hidden="true">
                                                {app.icon}
                                            </div>
                                            <div className="min-w-0">
                                                <div className="text-sm font-bold text-white flex items-center gap-2 mb-0.5 truncate flex-wrap">
                                                    {app.name}
                                                    {app.isCore && (
                                                        <span className="text-[9px] bg-[#FF4444]/10 text-[#FF4444] px-1.5 py-0.5 rounded border border-[#FF4444]/20 font-black uppercase tracking-wider flex-shrink-0">
                                                            Core Tool
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="text-xs text-[#8899AA] truncate">{app.desc}</div>
                                            </div>
                                        </div>
                                        <Button
                                            variant="secondary"
                                            icon={<Lock size={14} aria-hidden="true" />}
                                            className="h-9 whitespace-nowrap text-[#FF4444] border-[#1A2A3A] hover:border-[#FF4444]/50 hover:bg-[#FF4444]/5 transition-all w-full sm:w-auto mt-2 sm:mt-0"
                                            aria-label={`Revoke access to ${app.name}`}
                                        >
                                            Revoke Access
                                        </Button>
                                    </li>
                                ))}
                            </ul>

                            {/* Already Revoked */}
                            <div>
                                <h3 className="text-xs font-semibold text-[#8899AA] uppercase tracking-wider mb-3 mt-8">Already Revoked</h3>
                                <ul role="list" className="space-y-3 m-0 p-0" aria-label="Apps already revoked">
                                    {REVOKED_APPS.map((app) => (
                                        <li key={app.id} className="p-4 rounded-xl bg-[#0A1420] border border-[#00E5A0]/20 flex items-center justify-between opacity-75 shadow-inner">
                                            <div className="flex items-center gap-4 text-[#8899AA] min-w-0">
                                                <div className="w-10 h-10 rounded-lg bg-[#060B14] border border-[#1A2A3A] flex items-center justify-center text-lg grayscale flex-shrink-0" aria-hidden="true">
                                                    {app.icon}
                                                </div>
                                                <div className="min-w-0">
                                                    <div className="text-sm font-bold truncate line-through decoration-[#8899AA]/50">{app.name}</div>
                                                    <div className="text-xs flex items-center gap-1.5 mt-0.5 truncate font-medium text-[#00E5A0]/80">
                                                        <ShieldCheck size={14} className="text-[#00E5A0]" aria-hidden="true" />
                                                        Revoked {app.time}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="w-8 h-8 rounded-full bg-[#00E5A0]/10 flex items-center justify-center text-[#00E5A0] flex-shrink-0" title="Successfully Revoked" aria-hidden="true">
                                                <CheckCircle2 size={16} />
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
