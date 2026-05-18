"use client";
import React, { useState } from "react";
import { Eye, Shield, Check, Users, MonitorSmartphone } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

// ─── Static data ─────────────────────────────────────────────────────────────

type RoleId = "admin" | "manager" | "employee";

interface Role {
    id: RoleId;
    label: string;
    icon: React.ReactNode;
}

const ROLES: Role[] = [
    { id: "admin", label: "Super Admin", icon: <Shield size={16} aria-hidden="true" /> },
    { id: "manager", label: "People Manager", icon: <Users size={16} aria-hidden="true" /> },
    { id: "employee", label: "Standard Employee", icon: <MonitorSmartphone size={16} aria-hidden="true" /> },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function RoleBasedPlanPreviewScreen() {
    const [selectedRole, setSelectedRole] = useState<RoleId>("employee");

    const currentRole = ROLES.find((r) => r.id === selectedRole)!;

    return (
        <Page
            title="Preview Role Permissions"
            subtitle="Kaarya adapts its interface based on who is logged in. See exactly what your team members will experience before inviting them."
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Onboarding", href: "/onboarding/dashboard" },
                { label: "Role Preview", href: "/onboarding/role-preview" },
            ]}
        >
            <div className="space-y-8">
                {/* Role Switcher */}
                <div className="flex justify-center">
                    <div
                        className="bg-[#0A1420] border border-[#1A2A3A] p-1.5 rounded-xl inline-flex gap-1 shadow-xl"
                        role="radiogroup"
                        aria-label="Select role to preview"
                    >
                        {ROLES.map((r) => (
                            <button
                                key={r.id}
                                type="button"
                                onClick={() => setSelectedRole(r.id)}
                                role="radio"
                                aria-checked={selectedRole === r.id}
                                className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
                                    selectedRole === r.id
                                        ? "bg-[#131B2B] text-white shadow-sm border border-[#2A3A4A]"
                                        : "text-[#556677] hover:text-[#8899AA]"
                                }`}
                            >
                                {r.icon} {r.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Mock Dashboard Preview */}
                <Card padding="none" className="overflow-hidden shadow-2xl ring-4 ring-[#0A1420]">
                    {/* Browser-like header */}
                    <div className="bg-[#0A1420] border-b border-[#1A2A3A] px-4 py-3 flex items-center gap-4">
                        <div className="flex gap-2" aria-hidden="true">
                            <div className="w-3 h-3 rounded-full bg-rose-500/50" />
                            <div className="w-3 h-3 rounded-full bg-amber-500/50" />
                            <div className="w-3 h-3 rounded-full bg-emerald-500/50" />
                        </div>
                        <div className="bg-[#131B2B] border border-[#2A3A4A] rounded-md px-3 py-1 text-[10px] text-[#556677] font-mono flex items-center gap-2 max-w-sm w-full mx-auto justify-center">
                            <Eye size={12} className="text-indigo-400" aria-hidden="true" /> Previewing as: {currentRole.label}
                        </div>
                    </div>

                    {/* Simplified App Shell Preview */}
                    <div className="flex pointer-events-none opacity-90" style={{ height: "600px" }}>
                        {/* Mock Sidebar */}
                        <div className="w-48 border-r border-[#1A2A3A] bg-[#0A1420] p-4 flex flex-col gap-2" aria-hidden="true">
                            <div className="h-6 w-24 bg-[#131B2B] rounded mb-6" />
                            <div className="h-8 w-full bg-indigo-500/20 border border-indigo-500/20 rounded-lg" />
                            <div className="h-8 w-full bg-[#131B2B] rounded-lg" />
                            <div className="h-8 w-full bg-[#131B2B] rounded-lg" />

                            {(selectedRole === "manager" || selectedRole === "admin") && (
                                <>
                                    <div className="mt-4 text-[10px] font-bold text-[#556677] uppercase">My Team</div>
                                    <div className="h-8 w-full bg-[#131B2B] rounded-lg" />
                                    <div className="h-8 w-full bg-[#131B2B] rounded-lg" />
                                </>
                            )}

                            {selectedRole === "admin" && (
                                <>
                                    <div className="mt-4 text-[10px] font-bold text-[#556677] uppercase">Company</div>
                                    <div className="h-8 w-full bg-[#131B2B] rounded-lg" />
                                    <div className="h-8 w-full bg-[#131B2B] rounded-lg" />
                                    <div className="h-8 w-full bg-[#131B2B] rounded-lg" />
                                </>
                            )}
                        </div>

                        {/* Mock Content Area */}
                        <div className="flex-1 p-8 bg-[#060D1A]" aria-hidden="true">
                            {selectedRole === "employee" && (
                                <div className="space-y-6">
                                    <div className="h-8 w-64 bg-[#131B2B] rounded-lg mb-8" />
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="h-24 bg-emerald-500/10 border border-emerald-500/20 rounded-xl" />
                                        <div className="h-24 bg-[#131B2B] border border-[#1A2A3A] rounded-xl" />
                                        <div className="h-24 bg-[#131B2B] border border-[#1A2A3A] rounded-xl" />
                                    </div>
                                    <div className="h-64 w-full bg-[#131B2B] border border-[#1A2A3A] rounded-xl mt-8" />
                                </div>
                            )}
                            {(selectedRole === "manager" || selectedRole === "admin") && (
                                <div className="space-y-6">
                                    <div className="flex justify-between items-center mb-8">
                                        <div className="h-8 w-64 bg-[#131B2B] rounded-lg" />
                                        <div className="h-8 w-32 bg-indigo-600 rounded-lg" />
                                    </div>
                                    <div className="grid grid-cols-4 gap-4">
                                        {[1, 2, 3, 4].map((n) => (
                                            <div key={n} className="h-24 bg-[#0A1420] border border-[#1A2A3A] rounded-xl" />
                                        ))}
                                    </div>
                                    <div className="flex gap-6 mt-8">
                                        <div className="flex-1 h-96 bg-[#0A1420] border border-[#1A2A3A] rounded-xl" />
                                        <div className="w-72 h-96 bg-[#0A1420] border border-[#1A2A3A] rounded-xl" />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Overlay Context Card */}
                    <div className="absolute bottom-8 right-8 w-80 bg-white/10 backdrop-blur-3xl border border-white/20 p-5 rounded-2xl shadow-2xl">
                        <h4 className="text-white font-bold text-sm mb-2 drop-shadow-md">What they can do:</h4>
                        <ul className="space-y-2 text-sm text-[#CCDDEE] font-medium">
                            {selectedRole === "employee" && (
                                <>
                                    <li className="flex items-start gap-2"><Check size={16} className="text-emerald-400 mt-0.5" aria-hidden="true" /> View own payslips</li>
                                    <li className="flex items-start gap-2"><Check size={16} className="text-emerald-400 mt-0.5" aria-hidden="true" /> Request time off</li>
                                    <li className="flex items-start gap-2"><Check size={16} className="text-emerald-400 mt-0.5" aria-hidden="true" /> Submit expense claims</li>
                                    <li className="flex items-start gap-2 text-[#556677]"><Shield size={16} className="mt-0.5" aria-hidden="true" /> No team visibility</li>
                                </>
                            )}
                            {selectedRole === "manager" && (
                                <>
                                    <li className="flex items-start gap-2"><Check size={16} className="text-emerald-400 mt-0.5" aria-hidden="true" /> Approve leaves &amp; expenses</li>
                                    <li className="flex items-start gap-2"><Check size={16} className="text-emerald-400 mt-0.5" aria-hidden="true" /> View direct reports&apos; attendance</li>
                                    <li className="flex items-start gap-2"><Check size={16} className="text-emerald-400 mt-0.5" aria-hidden="true" /> Conduct performance reviews</li>
                                    <li className="flex items-start gap-2 text-[#556677]"><Shield size={16} className="mt-0.5" aria-hidden="true" /> Cannot edit core company settings</li>
                                </>
                            )}
                            {selectedRole === "admin" && (
                                <>
                                    <li className="flex items-start gap-2"><Check size={16} className="text-indigo-400 mt-0.5" aria-hidden="true" /> Run Payroll &amp; file taxes</li>
                                    <li className="flex items-start gap-2"><Check size={16} className="text-indigo-400 mt-0.5" aria-hidden="true" /> Manage all billing &amp; settings</li>
                                    <li className="flex items-start gap-2"><Check size={16} className="text-indigo-400 mt-0.5" aria-hidden="true" /> Full org visibility &amp; audit logs</li>
                                    <li className="flex items-start gap-2"><Shield size={16} className="text-rose-400 mt-0.5" aria-hidden="true" /> Unrestricted Access</li>
                                </>
                            )}
                        </ul>
                    </div>
                </Card>

                <div className="flex justify-center">
                    <Button variant="secondary">Looks Good, Continue</Button>
                </div>
            </div>
        </Page>
    );
}
