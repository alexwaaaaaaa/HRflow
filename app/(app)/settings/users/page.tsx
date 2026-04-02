"use client";

import React, { useState } from 'react';
import { Users, Search, Plus, Filter, MoreVertical, Shield, Mail, CheckCircle2, XCircle, Clock } from 'lucide-react';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function UsersListPage() {
    const users = [
        { id: 1, name: 'Priya Sharma', email: 'priya.sharma@kaarya.io', role: 'Super Admin', status: 'Active', last: '2 mins ago', avatar: 'PS' },
        { id: 2, name: 'Vikram Desai', email: 'vikram.desai@kaarya.io', role: 'HR Admin', status: 'Active', last: '1 hr ago', avatar: 'VD' },
        { id: 3, name: 'Aditi Menon', email: 'aditi.menon@kaarya.io', role: 'Payroll Admin', status: 'Active', last: '3 hrs ago', avatar: 'AM' },
        { id: 4, name: 'Rohan Kapoor', email: 'rohan.kapoor@kaarya.io', role: 'Manager', status: 'Active', last: 'Yesterday', avatar: 'RK' },
        { id: 5, name: 'Kavita Singh', email: 'kavita.singh@kaarya.io', role: 'Employee', status: 'Invited', last: 'Never', avatar: 'KS' },
        { id: 6, name: 'Arjun Nair', email: 'arjun.nair@kaarya.io', role: 'Employee', status: 'Deactivated', last: '30 days ago', avatar: 'AN' },
    ];

    return (
        <div className="p-6 md:p-8 animate-fade-in max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight mb-2 flex items-center gap-3">
                        <Users size={28} className="text-indigo-400" /> Platform Users
                    </h1>
                    <p className="text-[#8899AA] text-sm max-w-2xl">
                        Manage user accounts, roles, and access to the Kaarya platform.
                    </p>
                </div>
                <div className="flex gap-3">
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl flex items-center px-3 py-1.5 focus-within:border-indigo-500/50 transition-colors w-64 hidden md:flex">
                        <Search size={16} className="text-[#8899AA]" />
                        <input type="text" placeholder="Search users..." className="bg-transparent border-none outline-none text-white text-sm ml-2 w-full" />
                    </div>
                    <Link href="/settings/users/invite">
                        <Button className="bg-indigo-600 hover:bg-indigo-500 text-white border-none py-2 px-6">
                            <Plus size={16} className="mr-2" /> Invite User
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[
                    { label: 'Total Users', value: '6' },
                    { label: 'Active', value: '4' },
                    { label: 'Pending Invites', value: '1' },
                    { label: 'Deactivated', value: '1' },
                ].map((s, i) => (
                    <div key={i} className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-4">
                        <div className="text-xs text-[#8899AA] uppercase tracking-wider font-semibold mb-1">{s.label}</div>
                        <div className="text-2xl font-bold text-white">{s.value}</div>
                    </div>
                ))}
            </div>

            {/* Users Table */}
            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[700px]">
                        <thead>
                            <tr className="border-b border-[#1A2A3A] bg-[#131B2B]">
                                <th className="p-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">User</th>
                                <th className="p-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Role</th>
                                <th className="p-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Status</th>
                                <th className="p-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Last Active</th>
                                <th className="p-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider w-16"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id} className="border-b border-[#1A2A3A] hover:bg-[#131B2B] transition-colors group">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${user.status === 'Deactivated' ? 'bg-[#1A2A3A] text-[#445566]' : 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white'
                                                }`}>{user.avatar}</div>
                                            <div>
                                                <div className="text-white font-medium text-sm">{user.name}</div>
                                                <div className="text-xs text-[#8899AA]">{user.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-1.5">
                                            {user.role === 'Super Admin' && <Shield size={12} className="text-amber-400" />}
                                            <span className="text-sm text-white">{user.role}</span>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-2.5 py-1 rounded text-xs font-medium border flex items-center gap-1 w-fit ${user.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                                                user.status === 'Invited' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                                                    'bg-[#1A2A3A] text-[#8899AA] border-[#2A3A4A]'
                                            }`}>
                                            {user.status === 'Active' && <CheckCircle2 size={12} />}
                                            {user.status === 'Invited' && <Mail size={12} />}
                                            {user.status === 'Deactivated' && <XCircle size={12} />}
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <span className="text-sm text-[#8899AA] flex items-center gap-1.5">
                                            <Clock size={12} /> {user.last}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <button className="text-[#445566] hover:text-white transition-colors opacity-0 group-hover:opacity-100">
                                            <MoreVertical size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
