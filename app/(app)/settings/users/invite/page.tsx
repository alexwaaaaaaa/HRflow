"use client";

import React, { useState } from 'react';
import { UserPlus, Mail, Send, X, Shield, Plus, Trash2 } from 'lucide-react';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function InviteUserPage() {
    const [invites, setInvites] = useState([{ email: '', role: 'Employee' }]);

    const addRow = () => setInvites([...invites, { email: '', role: 'Employee' }]);
    const removeRow = (idx: number) => setInvites(invites.filter((_, i) => i !== idx));

    const roles = ['Super Admin', 'HR Admin', 'Payroll Admin', 'Manager', 'Employee'];

    return (
        <div className="p-6 md:p-8 animate-fade-in max-w-3xl mx-auto">
            <Link href="/settings/users" className="text-[#8899AA] hover:text-white text-sm mb-6 inline-block">&larr; Back to Users</Link>

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white tracking-tight mb-2 flex items-center gap-3">
                    <UserPlus size={28} className="text-indigo-400" /> Invite Users
                </h1>
                <p className="text-[#8899AA] text-sm">
                    Send email invitations. Invitees will receive a link to set up their Kaarya account with the assigned role.
                </p>
            </div>

            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 space-y-4">
                {invites.map((inv, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                        <div className="flex-1 relative">
                            <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#445566]" />
                            <input
                                type="email"
                                placeholder="colleague@company.com"
                                value={inv.email}
                                onChange={(e) => { const n = [...invites]; n[idx].email = e.target.value; setInvites(n); }}
                                className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:border-indigo-500 outline-none transition-colors"
                            />
                        </div>
                        <div className="w-48 relative">
                            <Shield size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#445566]" />
                            <select
                                value={inv.role}
                                onChange={(e) => { const n = [...invites]; n[idx].role = e.target.value; setInvites(n); }}
                                className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl pl-9 pr-4 py-2.5 text-sm text-white focus:border-indigo-500 outline-none appearance-none cursor-pointer"
                            >
                                {roles.map(r => <option key={r} value={r}>{r}</option>)}
                            </select>
                        </div>
                        {invites.length > 1 && (
                            <button onClick={() => removeRow(idx)} className="text-[#445566] hover:text-red-400 transition-colors p-2">
                                <Trash2 size={16} />
                            </button>
                        )}
                    </div>
                ))}
                <button onClick={addRow} className="text-indigo-400 hover:text-indigo-300 text-sm font-medium flex items-center gap-1.5 mt-2">
                    <Plus size={16} /> Add another invite
                </button>
            </div>

            <div className="mt-6 flex justify-between items-center">
                <p className="text-xs text-[#445566]">
                    {invites.filter(i => i.email.includes('@')).length} valid invite(s) ready
                </p>
                <Button className="bg-indigo-600 hover:bg-indigo-500 text-white border-none py-2.5 px-8">
                    <Send size={16} className="mr-2" /> Send Invitations
                </Button>
            </div>
        </div>
    );
}
