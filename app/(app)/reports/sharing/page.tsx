"use client";

import { Share2, Copy, Users, Lock, ShieldAlert, Mail } from "lucide-react";

import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

// ─── Static data (module scope) ───────────────────────────────────────────────

interface SharedUser {
    id: string;
    initials: string;
    name: string;
    email: string;
    role: "Owner" | "Can View" | "Can Edit";
    isGroup?: boolean;
    groupCount?: number;
}

const SHARED_USERS: SharedUser[] = [
    {
        id: "sr",
        initials: "SR",
        name: "Sneha Rao (You)",
        email: "sneha@acmecorp.com",
        role: "Owner",
    },
    {
        id: "rm",
        initials: "RM",
        name: "Rajiv Mehta",
        email: "rajiv.m@acmecorp.com",
        role: "Can View",
    },
    {
        id: "hr-group",
        initials: "",
        name: "HR Leadership Group",
        email: "12 Members",
        role: "Can Edit",
        isGroup: true,
        groupCount: 12,
    },
];

// ─── Sub-components (module scope) ────────────────────────────────────────────

function UserAvatar({ user }: { user: SharedUser }) {
    if (user.isGroup) {
        return (
            <div className="w-10 h-10 rounded-full bg-[#1A2A3A] border border-[#2A3A4A] text-white flex items-center justify-center">
                <Users size={16} aria-hidden="true" />
            </div>
        );
    }
    const colorClass = user.id === "sr" ? "bg-indigo-500/20 text-indigo-400" : "bg-emerald-500/20 text-emerald-400";
    return (
        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${colorClass}`}>
            {user.initials}
        </div>
    );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ReportSharingPage() {
    return (
        <Page
            title="Share Report Configuration"
            subtitle="Control access and share report configurations with your team."
            breadcrumbs={[
                { label: "Reports", href: "/reports/dashboard" },
                { label: "Saved", href: "/reports/saved" },
                { label: "Share Access" },
            ]}
            maxWidth="720px"
            actions={
                <Button icon={<Share2 size={14} aria-hidden="true" />}>Share</Button>
            }
        >
            <div className="space-y-6">
                {/* Report info */}
                <Card padding="lg">
                    <div className="flex items-start gap-4 mb-6 pb-6 border-b border-[#1A2A3A]">
                        <div className="p-3 bg-[#1A2A3A] rounded-xl text-white shrink-0">
                            <span className="font-bold text-xl">D&amp;I</span>
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-white">
                                Diversity &amp; Inclusion (D&amp;I) Tracker
                            </h2>
                            <p className="text-sm text-[#8899AA] mt-1">
                                Contains sensitive demographic and PII data.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {/* Private link */}
                        <div>
                            <label
                                htmlFor="share-link"
                                className="flex items-center gap-2 text-sm font-medium text-[#8899AA] mb-2"
                            >
                                <Lock size={14} className="text-emerald-400" aria-hidden="true" />
                                Private Link
                            </label>
                            <div className="flex items-center gap-2">
                                <input
                                    id="share-link"
                                    type="text"
                                    readOnly
                                    value="https://hrflow.acme.co/reports/view/req_88192a"
                                    className="flex-1 bg-[#0B1221] border border-[#2A3A4A] text-[#8899AA] rounded-lg px-4 py-3 text-sm focus:outline-none"
                                />
                                <Button
                                    variant="secondary"
                                    icon={<Copy size={14} aria-hidden="true" />}
                                    aria-label="Copy share link"
                                >
                                    Copy
                                </Button>
                            </div>
                        </div>

                        {/* Invite people */}
                        <div>
                            <label htmlFor="invite-email" className="block text-sm font-medium text-[#8899AA] mb-2">
                                Invite People
                            </label>
                            <div className="flex gap-2">
                                <div className="relative flex-1">
                                    <Mail
                                        size={14}
                                        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#8899AA]"
                                        aria-hidden="true"
                                    />
                                    <input
                                        id="invite-email"
                                        type="email"
                                        placeholder="Add email addresses or department aliases…"
                                        className="w-full bg-[#1A2A3A] border border-[#2A3A4A] text-white rounded-lg pl-9 pr-4 py-2.5 text-sm focus:border-[#00e5a0] focus:outline-none transition-colors"
                                    />
                                </div>
                                <label htmlFor="invite-role" className="sr-only">
                                    Access level
                                </label>
                                <select
                                    id="invite-role"
                                    className="bg-[#1A2A3A] border border-[#2A3A4A] text-white rounded-lg px-3 py-2.5 text-sm focus:outline-none w-32"
                                >
                                    <option>Can View</option>
                                    <option>Can Edit</option>
                                </select>
                                <Button>Invite</Button>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* People with access */}
                <Card padding="lg">
                    <h3 className="text-sm font-bold text-white mb-4">People with access</h3>
                    <ul className="space-y-4" aria-label="Users with access">
                        {SHARED_USERS.map((user) => (
                            <li key={user.id} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <UserAvatar user={user} />
                                    <div>
                                        <p className="text-sm font-bold text-white">{user.name}</p>
                                        <p className="text-xs text-[#8899AA]">{user.email}</p>
                                    </div>
                                </div>
                                {user.role === "Owner" ? (
                                    <span className="text-xs text-[#8899AA]">Owner</span>
                                ) : (
                                    <>
                                        <label htmlFor={`role-${user.id}`} className="sr-only">
                                            Access level for {user.name}
                                        </label>
                                        <select
                                            id={`role-${user.id}`}
                                            defaultValue={user.role}
                                            className="bg-transparent border-none text-[#8899AA] text-xs focus:outline-none cursor-pointer"
                                        >
                                            <option>Can View</option>
                                            <option>Can Edit</option>
                                            <option>Remove</option>
                                        </select>
                                    </>
                                )}
                            </li>
                        ))}
                    </ul>
                </Card>

                {/* Data masking notice */}
                <div className="flex items-start gap-3 p-4 bg-pink-500/10 border border-pink-500/20 rounded-xl">
                    <ShieldAlert size={18} className="text-pink-400 shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                        <p className="text-pink-400 font-bold mb-1">Data Masking Active</p>
                        <p className="text-sm text-[#8899AA]">
                            Since this report contains PII, users with &ldquo;Can View&rdquo; access will see masked
                            compensation fields based on their Role-Based Access Control (RBAC) permissions.
                        </p>
                    </div>
                </div>
            </div>
        </Page>
    );
}
