"use client";

import { useState } from "react";
import { Mail, Shield, Trash2, Check, Clock } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function InviteTeamPage() {
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("HR Admin");
    const [invites, setInvites] = useState([
        { id: 1, email: "priya@techcorp.in", role: "Super Admin", status: "Joined", date: "Today, 10:00 AM" },
        { id: 2, email: "rahul.m@techcorp.in", role: "Payroll Admin", status: "Pending", date: "Today, 11:30 AM" },
    ]);

    const handleInvite = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        setInvites([{ id: Date.now(), email, role, status: "Sending", date: "Just now" }, ...invites]);
        setTimeout(() => {
            setInvites(curr => curr.map(i => i.email === email ? { ...i, status: "Pending" } : i));
        }, 1500);
        setEmail("");
    };

    return (
        <div style={{ padding: "48px 64px", maxWidth: 840 }} className="animate-fade-in">
            <h2 style={{ fontSize: 24, fontWeight: 600, color: "#FFFFFF", margin: 0 }}>Invite Your HR Team</h2>
            <p style={{ fontSize: 14, color: "#8899AA", marginTop: 4 }}>Add co-admins, payroll managers, and HR executives to help you set up.</p>

            {/* Invite Form */}
            <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 24, marginTop: 32, marginBottom: 32 }}>
                <form onSubmit={handleInvite} className="flex gap-4 items-end">
                    <div className="flex-1">
                        <Input label="Email Address *" type="email" placeholder="colleague@company.com" value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className="w-64">
                        <label style={{ fontSize: 12, fontWeight: 500, color: "#9ca3af", marginBottom: 6, display: "block" }}>Role Access *</label>
                        <select value={role} onChange={e => setRole(e.target.value)} className="w-full h-10 px-3 rounded-lg text-sm bg-[#060B14] border border-[#1A2A3A] text-white outline-none focus:border-[#00E5A0]">
                            <option>Super Admin</option>
                            <option>HR Admin</option>
                            <option>Payroll Admin</option>
                            <option>HR Executive</option>
                        </select>
                    </div>
                    <Button type="submit" className="h-10 px-6 gap-2"><Mail size={16} /> Send Invite</Button>
                </form>

                <div className="flex gap-4 mt-6 p-4 rounded-lg bg-[#060B14] border border-[#1A2A3A]">
                    <Shield size={20} color="#0066FF" className="flex-shrink-0" />
                    <div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: "#FFFFFF", marginBottom: 4 }}>What can {role}s do?</div>
                        <div style={{ fontSize: 12, color: "#8899AA", lineHeight: 1.5 }}>
                            {role === "Super Admin" && "Full access to all settings, billing, and complete directory. Can delete company data."}
                            {role === "HR Admin" && "Can manage employees, leaves, and attendance. Cannot view payroll or billing."}
                            {role === "Payroll Admin" && "Can process payroll, view salaries, and manage statutory compliance. Cannot edit employee org details."}
                            {role === "HR Executive" && "Read-only access to employee directory. Can approve basic leaves based on workflow."}
                        </div>
                    </div>
                </div>
            </div>

            {/* Invites List */}
            <h3 style={{ fontSize: 16, color: "#FFFFFF", margin: 0, marginBottom: 16 }}>Team Members ({invites.length})</h3>

            <div className="rounded-xl border border-[#1A2A3A] overflow-hidden bg-[#0D1928]">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-[#0A1420] border-b border-[#1A2A3A]">
                            <th className="px-5 py-3 text-xs font-semibold text-[#8899AA] uppercase">User</th>
                            <th className="px-5 py-3 text-xs font-semibold text-[#8899AA] uppercase">Role</th>
                            <th className="px-5 py-3 text-xs font-semibold text-[#8899AA] uppercase">Status</th>
                            <th className="px-5 py-3 text-xs font-semibold text-[#8899AA] uppercase right">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invites.map((inv) => (
                            <tr key={inv.id} className="border-b border-[#1A2A3A] last:border-0 hover:bg-[#1A2A3A] transition-colors">
                                <td className="px-5 py-4">
                                    <div style={{ fontSize: 14, fontWeight: 500, color: "#FFFFFF" }}>{inv.email}</div>
                                    <div style={{ fontSize: 12, color: "#8899AA", marginTop: 2 }}>Added {inv.date}</div>
                                </td>
                                <td className="px-5 py-4">
                                    <span className="inline-block px-2.5 py-1 rounded text-xs font-medium" style={{ background: "rgba(0,102,255,0.1)", color: "#0066FF", border: "1px solid rgba(0,102,255,0.2)" }}>
                                        {inv.role}
                                    </span>
                                </td>
                                <td className="px-5 py-4">
                                    <div className="flex items-center gap-1.5">
                                        {inv.status === "Joined" && <Check size={14} color="#00E5A0" />}
                                        {inv.status === "Pending" && <Clock size={14} color="#FFB800" />}
                                        {inv.status === "Sending" && <div className="w-3 h-3 rounded-full border-2 border-[#8899AA] border-t-[#FFFFFF] animate-spin" />}
                                        <span style={{ fontSize: 13, color: inv.status === "Joined" ? "#00E5A0" : inv.status === "Pending" ? "#FFB800" : "#8899AA" }}>
                                            {inv.status}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-5 py-4 text-right">
                                    {inv.status === "Pending" && (
                                        <button className="text-xs text-[#0066FF] hover:underline mr-4">Resend</button>
                                    )}
                                    {inv.role !== "Super Admin" && (
                                        <button onClick={() => setInvites(invites.filter(i => i.id !== inv.id))} className="text-[#8899AA] hover:text-[#FF4444] transition-colors">
                                            <Trash2 size={16} />
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
}
