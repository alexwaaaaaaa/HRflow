"use client";

import { useState } from "react";
import { Mail, Shield, Trash2, Check, Clock } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

interface Invite {
    id: number;
    email: string;
    role: string;
    status: "Joined" | "Pending" | "Sending";
    date: string;
}

const INITIAL_INVITES: Invite[] = [
    { id: 1, email: "priya@techcorp.in", role: "Super Admin", status: "Joined", date: "Today, 10:00 AM" },
    { id: 2, email: "rahul.m@techcorp.in", role: "Payroll Admin", status: "Pending", date: "Today, 11:30 AM" },
];

const STATUS_VARIANT: Record<Invite["status"], "success" | "warning" | "neutral"> = {
    Joined: "success",
    Pending: "warning",
    Sending: "neutral",
};

const STATUS_ICON: Record<Invite["status"], React.ReactNode> = {
    Joined: <Check size={12} aria-hidden="true" />,
    Pending: <Clock size={12} aria-hidden="true" />,
    Sending: <div className="w-3 h-3 rounded-full border-2 border-[#8899AA] border-t-white animate-spin" aria-hidden="true" />,
};

export default function InviteTeamPage() {
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("HR Admin");
    const [invites, setInvites] = useState<Invite[]>(INITIAL_INVITES);

    const handleInvite = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        const newInvite: Invite = { id: Date.now(), email, role, status: "Sending", date: "Just now" };
        setInvites([newInvite, ...invites]);
        setTimeout(() => {
            setInvites((curr) => curr.map((i) => i.email === email ? { ...i, status: "Pending" } : i));
        }, 1500);
        setEmail("");
    };

    const handleRemove = (id: number) => setInvites(invites.filter((i) => i.id !== id));

    const columns: Column<Invite>[] = [
        {
            key: "email",
            label: "User",
            render: (r) => (
                <div>
                    <div className="text-sm font-medium text-white">{r.email}</div>
                    <div className="text-xs text-[#8899AA] mt-0.5">Added {r.date}</div>
                </div>
            ),
        },
        {
            key: "role",
            label: "Role",
            render: (r) => <Badge variant="info">{r.role}</Badge>,
        },
        {
            key: "status",
            label: "Status",
            render: (r) => (
                <div className="flex items-center gap-1.5">
                    {STATUS_ICON[r.status]}
                    <Badge variant={STATUS_VARIANT[r.status]}>{r.status}</Badge>
                </div>
            ),
        },
        {
            key: "id",
            label: "Action",
            render: (r) => (
                <div className="flex items-center gap-3 justify-end">
                    {r.status === "Pending" && (
                        <Button variant="ghost" size="sm">Resend</Button>
                    )}
                    {r.role !== "Super Admin" && (
                        <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleRemove(r.id)}
                            aria-label={`Remove ${r.email}`}
                        >
                            <Trash2 size={14} aria-hidden="true" />
                        </Button>
                    )}
                </div>
            ),
        },
    ];

    return (
        <div className="px-16 py-12 max-w-[840px] animate-fade-in">
            <h2 className="text-2xl font-semibold text-white m-0">Invite Your HR Team</h2>
            <p className="text-sm text-[#8899AA] mt-1">Add co-admins, payroll managers, and HR executives to help you set up.</p>

            {/* Invite Form */}
            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 mt-8 mb-8">
                <form onSubmit={handleInvite} className="flex gap-4 items-end" aria-label="Invite team member">
                    <div className="flex-1">
                        <Input label="Email Address *" type="email" placeholder="colleague@company.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="w-64">
                        <label htmlFor="invite-role" className="block text-xs font-medium text-[#9ca3af] mb-1.5">Role Access *</label>
                        <select
                            id="invite-role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="w-full h-10 px-3 rounded-lg text-sm bg-[#060B14] border border-[#1A2A3A] text-white outline-none focus:border-[#00E5A0] transition-colors"
                        >
                            <option>Super Admin</option>
                            <option>HR Admin</option>
                            <option>Payroll Admin</option>
                            <option>HR Executive</option>
                        </select>
                    </div>
                    <Button type="submit" className="h-10 px-6 gap-2">
                        <Mail size={16} aria-hidden="true" /> Send Invite
                    </Button>
                </form>

                <div className="flex gap-4 mt-6 p-4 rounded-lg bg-[#060B14] border border-[#1A2A3A]">
                    <Shield size={20} color="#0066FF" className="flex-shrink-0" aria-hidden="true" />
                    <div>
                        <div className="text-[13px] font-semibold text-white mb-1">What can {role}s do?</div>
                        <div className="text-xs text-[#8899AA] leading-relaxed">
                            {role === "Super Admin" && "Full access to all settings, billing, and complete directory. Can delete company data."}
                            {role === "HR Admin" && "Can manage employees, leaves, and attendance. Cannot view payroll or billing."}
                            {role === "Payroll Admin" && "Can process payroll, view salaries, and manage statutory compliance. Cannot edit employee org details."}
                            {role === "HR Executive" && "Read-only access to employee directory. Can approve basic leaves based on workflow."}
                        </div>
                    </div>
                </div>
            </div>

            {/* Invites List */}
            <h3 className="text-base font-semibold text-white m-0 mb-4">Team Members ({invites.length})</h3>

            <DataTable<Invite>
                data={invites}
                columns={columns}
                rowKey={(r) => r.id.toString()}
                aria-label="Invited team members"
                emptyTitle="No team members yet"
                emptyDescription="Invite your first team member using the form above."
            />
        </div>
    );
}
