"use client";

import { Link as LinkIcon, CheckCircle2, AlertTriangle, Settings, ExternalLink, ShieldCheck } from "lucide-react";
import Button from "@/components/ui/Button";

// --- Types ---
type IntegrationStatus = "Connected" | "Warning" | "Not Connected";
type Integration = {
    id: number;
    name: string;
    type: string;
    status: IntegrationStatus;
    sync: string;
    icon: string;
};

// --- Mock Data ---
const INTEGRATIONS: Integration[] = [
    { id: 1, name: "Google Workspace", type: "Identity & Email", status: "Connected", sync: "10 mins ago", icon: "📧" },
    { id: 2, name: "Microsoft Entra ID (Azure AD)", type: "SSO & Identity", status: "Connected", sync: "1 hour ago", icon: "🏢" },
    { id: 3, name: "Jamf Pro", type: "MDM (Apple Devices)", status: "Warning", sync: "Failed (2 days ago)", icon: "🍏" },
    { id: 4, name: "Kandji", type: "MDM (Apple Devices)", status: "Not Connected", sync: "-", icon: "🛡️" },
    { id: 5, name: "Jira Service Management", type: "Ticketing", status: "Connected", sync: "Real-time", icon: "🎟️" },
];

const STATUS_STYLES: Record<IntegrationStatus, string> = {
    Connected: "border-[#00E5A0]/30 bg-[#00E5A0]/10 text-[#00E5A0]",
    Warning: "border-[#FFB800]/30 bg-[#FFB800]/10 text-[#FFB800]",
    "Not Connected": "border-[#445566]/30 bg-[#445566]/10 text-[#8899AA]",
};

export default function ITIntegrationScreen() {
    return (
        <main className="px-8 py-6 pb-16 animate-fade-in relative max-w-5xl mx-auto min-h-screen">
            {/* Page Header */}
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 border-b border-[#1A2A3A] pb-6 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white m-0 tracking-tight">IT System Integrations</h1>
                    <p className="text-sm text-[#8899AA] mt-1.5">Connect HRflow with MDM, SSO, and IT helpdesk tools for automated provisioning</p>
                </div>
            </header>

            {/* Integrations List */}
            <section className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden shadow-sm" aria-labelledby="integrations-heading">
                <h2 id="integrations-heading" className="sr-only">Connected Integrations</h2>

                <ul role="list" className="divide-y divide-[#1A2A3A] m-0 p-0">
                    {INTEGRATIONS.map((app) => (
                        <li key={app.id} className="p-5 md:p-6 flex flex-col sm:flex-row sm:items-center justify-between hover:bg-[#1A2A3A]/30 transition-colors group gap-5">
                            <div className="flex items-center gap-5 md:gap-6 min-w-0">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-inner bg-[#060B14] border border-[#1A2A3A] flex-shrink-0 ${app.status === 'Not Connected' ? 'grayscale opacity-50' : ''}`} aria-hidden="true">
                                    {app.icon}
                                </div>
                                <div className="min-w-0">
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-1.5">
                                        <h3 className="text-base font-bold text-white m-0 truncate">{app.name}</h3>
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-lg border text-[10px] font-bold uppercase tracking-wider w-fit flex-shrink-0 gap-1.5 ${STATUS_STYLES[app.status]}`}>
                                            {app.status === 'Connected' && <CheckCircle2 size={11} aria-hidden="true" />}
                                            {app.status === 'Warning' && <AlertTriangle size={11} aria-hidden="true" />}
                                            {app.status}
                                        </span>
                                    </div>
                                    <div className="text-sm text-[#8899AA] flex flex-wrap items-center gap-x-3 gap-y-1">
                                        <span>{app.type}</span>
                                        <span className="text-[#334455]" aria-hidden="true">•</span>
                                        <span>
                                            Last Sync: <span className={`font-medium ${app.status === 'Warning' ? 'text-[#FFB800]' : 'text-white'}`}>{app.sync}</span>
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 pl-[4.75rem] sm:pl-0 flex-shrink-0">
                                {app.status !== 'Not Connected' ? (
                                    <>
                                        <Button
                                            variant="secondary"
                                            icon={<Settings size={15} aria-hidden="true" />}
                                            className="w-10 h-10 !p-0 justify-center border-[#1A2A3A] hover:border-[#334455] bg-[#060B14] flex-shrink-0"
                                            aria-label={`Configure ${app.name}`}
                                        />
                                        <Button
                                            variant="secondary"
                                            className="h-10 text-[#FF4444] hover:bg-[#FF4444]/5 hover:border-[#FF4444]/40 border-[#1A2A3A] bg-[#060B14]"
                                            aria-label={`Disconnect ${app.name}`}
                                        >
                                            Disconnect
                                        </Button>
                                    </>
                                ) : (
                                    <Button
                                        variant="primary"
                                        icon={<LinkIcon size={15} aria-hidden="true" />}
                                        className="h-10 shadow-[0_0_15px_rgba(0,102,255,0.15)]"
                                        aria-label={`Connect ${app.name}`}
                                    >
                                        Connect
                                    </Button>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>

                {/* Footer: API Access */}
                <footer className="p-5 md:p-6 border-t border-[#1A2A3A] bg-[#0A1420]/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="min-w-0">
                        <h3 className="text-sm font-bold text-white mb-1.5 flex items-center gap-2 m-0">
                            <ShieldCheck size={16} className="text-[#0066FF] flex-shrink-0" aria-hidden="true" />
                            Enterprise API Access
                        </h3>
                        <p className="text-xs text-[#8899AA] m-0 leading-relaxed">Use our REST API to build custom integrations with proprietary internal tools.</p>
                    </div>
                    <Button variant="secondary" icon={<ExternalLink size={16} aria-hidden="true" />} className="h-10 flex-shrink-0 hover:border-[#334455] bg-[#0D1928]">
                        API Documentation
                    </Button>
                </footer>
            </section>
        </main>
    );
}
