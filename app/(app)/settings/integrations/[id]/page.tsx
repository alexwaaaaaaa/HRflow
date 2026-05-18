"use client";

import { Database, KeySquare, RefreshCw, ShieldCheck } from "lucide-react";
import Link from "next/link";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

// ─────────────────────────────────────────────────────────────────────────────
// Types & static data
// ─────────────────────────────────────────────────────────────────────────────

interface EventSetting {
    title: string;
    desc: string;
    active: boolean;
}

const EVENT_SETTINGS: EventSetting[] = [
    { title: "Leave Approvals", desc: "Forward manager approval requests to DM.", active: true },
    { title: "Org Announcements", desc: "Post company-wide memos to #general.", active: true },
    { title: "Onboarding Alerts", desc: "Notify IT in #it-provisioning when a new hire is added.", active: true },
    { title: "Daily Attendance Digest", desc: "Send summary of missing punches to managers.", active: false },
];

const SLASH_COMMANDS = [
    { cmd: "/kaarya leave", desc: "Check balances and apply for time off." },
    { cmd: "/kaarya peers", desc: "Search for a colleague's contact info." },
];

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────────────────

function EventRow({ setting }: { setting: EventSetting }) {
    return (
        <div className="flex justify-between items-center p-5 hover:bg-[#131B2B] transition-colors border-b border-[#1A2A3A] last:border-b-0">
            <div>
                <h4 className="text-sm font-bold text-white">{setting.title}</h4>
                <p className="text-xs text-[#8899AA] mt-1">{setting.desc}</p>
            </div>
            <div className="relative shrink-0 ml-4">
                <input
                    type="checkbox"
                    id={`event-${setting.title}`}
                    className="sr-only peer"
                    defaultChecked={setting.active}
                    aria-label={setting.title}
                />
                <label
                    htmlFor={`event-${setting.title}`}
                    className="w-11 h-6 bg-[#131B2B] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600 border border-[#2A3A4A] transition-colors block cursor-pointer"
                />
            </div>
        </div>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function IntegrationDetailPage() {
    return (
        <Page
            title="Slack"
            subtitle="Communication & Workflows"
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Settings", href: "/settings" },
                { label: "Integrations", href: "/settings/integrations" },
                { label: "Slack" },
            ]}
            maxWidth="1100px"
            actions={
                <div className="flex items-center gap-3">
                    <Badge variant="success" dot>Connected</Badge>
                    <Button variant="secondary">Pause Sync</Button>
                </div>
            }
        >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="col-span-1 md:col-span-2 space-y-6">
                    {/* Event Forwarding */}
                    <Card padding="none">
                        <div className="p-5 border-b border-[#1A2A3A] bg-[#0D1928]">
                            <h3 className="text-white font-bold text-lg">Event Forwarding</h3>
                        </div>
                        <div>
                            {EVENT_SETTINGS.map((s) => (
                                <EventRow key={s.title} setting={s} />
                            ))}
                        </div>
                    </Card>

                    {/* Slash Commands */}
                    <Card padding="lg">
                        <h3 className="text-base font-bold text-white mb-2">Command Mapping (Slash Commands)</h3>
                        <p className="text-[#8899AA] text-sm mb-4">Allow your employees to interact with Kaarya directly from Slack using slash commands.</p>
                        <div className="space-y-3 font-mono text-sm">
                            {SLASH_COMMANDS.map((cmd) => (
                                <div key={cmd.cmd} className="flex items-center gap-4 bg-[#060D1A] p-3 rounded-lg border border-[#1A2A3A]">
                                    <span className="text-purple-400 w-32 shrink-0">{cmd.cmd}</span>
                                    <span className="text-[#CCDDEE]">{cmd.desc}</span>
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* Logs Link */}
                    <div className="text-center">
                        <Link href="/settings/integrations/1/logs" className="text-indigo-400 hover:text-indigo-300 text-sm font-medium">
                            View Integration Logs →
                        </Link>
                    </div>
                </div>

                <div className="col-span-1 space-y-6">
                    {/* Connection Details */}
                    <Card padding="md">
                        <h4 className="text-xs font-bold text-[#556677] uppercase tracking-wider mb-4">Connection Details</h4>
                        <dl className="space-y-4 text-sm">
                            <div className="flex justify-between items-center border-b border-[#1A2A3A] pb-3">
                                <dt className="text-[#8899AA] flex items-center gap-2"><KeySquare size={14} aria-hidden="true" /> Client ID</dt>
                                <dd className="text-white font-mono">T9U8V7W…</dd>
                            </div>
                            <div className="flex justify-between items-center border-b border-[#1A2A3A] pb-3">
                                <dt className="text-[#8899AA] flex items-center gap-2"><RefreshCw size={14} aria-hidden="true" /> Last Sync</dt>
                                <dd className="text-emerald-400 text-xs">A few seconds ago</dd>
                            </div>
                            <div className="flex justify-between items-center">
                                <dt className="text-[#8899AA] flex items-center gap-2"><Database size={14} aria-hidden="true" /> App Workspace</dt>
                                <dd className="text-white font-mono">kaarya-hq</dd>
                            </div>
                        </dl>
                    </Card>

                    {/* OAuth Scopes */}
                    <Card padding="md" className="border-emerald-500/20 bg-gradient-to-br from-[#0A1420] to-emerald-900/10">
                        <ShieldCheck className="text-emerald-400 mb-3" size={24} aria-hidden="true" />
                        <h4 className="text-white font-bold text-sm mb-1">OAuth Scopes Verified</h4>
                        <p className="text-xs text-[#8899AA]">This integration only has access to channels you explicitly invite it to. It cannot read your DMs.</p>
                    </Card>

                    {/* Danger Zone */}
                    <Card padding="md" className="border-red-500/20">
                        <h4 className="text-red-500 font-bold text-sm mb-2">Danger Zone</h4>
                        <p className="text-xs text-[#8899AA] mb-4">Uninstalling this app will revoke its tokens immediately.</p>
                        <Button variant="danger" className="w-full">Uninstall Slack</Button>
                    </Card>
                </div>
            </div>
        </Page>
    );
}
