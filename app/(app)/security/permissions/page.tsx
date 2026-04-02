"use client";
import React from 'react';
import { Search, Filter, Key, Check, X, Shield, Users } from 'lucide-react';

export default function PermissionAuditScreen() {
    return (
        <div className="min-h-screen p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
                <div>
                    <h1 className="text-2xl font-bold text-white mb-1">Access Rights Audit</h1>
                    <p className="text-[#8899AA] text-sm">Review who has access to what. Ensure the principle of least privilege is enforced.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="bg-[#131B2B] hover:bg-[#1A2A3A] border border-[#2A3A4A] text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors flex items-center gap-2">
                        <Users size={16} /> Manage Roles
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

                {/* Search & Filter */}
                <div className="lg:col-span-1 space-y-4">
                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-5">
                        <div className="relative mb-6">
                            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#556677]" />
                            <input type="text" placeholder="Search employee..." className="bg-[#131B2B] border border-[#2A3A4A] rounded-lg pl-9 pr-4 py-2.5 text-sm text-white focus:border-indigo-500 outline-none w-full transition-colors" />
                        </div>

                        <h3 className="text-xs font-bold text-[#8899AA] uppercase tracking-wider mb-3">Filter by Base Role</h3>
                        <div className="space-y-2">
                            {['Super Admin', 'HR Admin', 'Finance Lead', 'Manager', 'Employee'].map((role, i) => (
                                <label key={i} className="flex items-center gap-3 p-2 rounded hover:bg-[#131B2B] cursor-pointer">
                                    <input type="checkbox" className="rounded border-[#3A4A5A] text-indigo-500 bg-[#1A2A3A]" />
                                    <span className="text-sm text-white">{role}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Audit Table */}
                <div className="lg:col-span-3 bg-[#0A1420] border border-[#1A2A3A] rounded-2xl flex flex-col overflow-hidden">
                    <div className="p-5 border-b border-[#1A2A3A] bg-[#060D1A] flex justify-between items-center">
                        <h2 className="text-lg font-bold text-white flex items-center gap-2"><Key size={18} className="text-[#556677]" /> Effective Permissions Matrix</h2>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm whitespace-nowrap">
                            <thead className="bg-[#131B2B] text-[#8899AA] text-xs uppercase tracking-wider">
                                <tr>
                                    <th className="px-6 py-4 font-bold border-b border-[#1A2A3A] sticky left-0 bg-[#131B2B] z-10">User</th>
                                    <th className="px-6 py-4 font-bold border-b border-[#1A2A3A]">View Payroll</th>
                                    <th className="px-6 py-4 font-bold border-b border-[#1A2A3A]">Run Payroll</th>
                                    <th className="px-6 py-4 font-bold border-b border-[#1A2A3A]">Manage Grievance</th>
                                    <th className="px-6 py-4 font-bold border-b border-[#1A2A3A]">Edit Roles</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#1A2A3A]">
                                {[
                                    { user: 'Meera Venkatesh', sub: 'Super Admin', pr: true, run: true, grv: true, role: true },
                                    { user: 'Rahul Sharma', sub: 'Finance Lead', pr: true, run: true, grv: false, role: false },
                                    { user: 'Sanjay Dutt', sub: 'Legal Counsel (Custom)', pr: false, run: false, grv: true, role: false },
                                    { user: 'Aditi Krishnan', sub: 'Manager', pr: false, run: false, grv: false, role: false },
                                ].map((row, i) => (
                                    <tr key={i} className="hover:bg-[#1A2A3A]/50 transition-colors">
                                        <td className="px-6 py-4 sticky left-0 bg-[#0A1420] border-r border-[#1A2A3A]">
                                            <div className="font-bold text-white">{row.user}</div>
                                            <div className="text-[10px] text-indigo-400 mt-0.5">{row.sub}</div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            {row.pr ? <Check size={16} className="text-emerald-400 mx-auto" /> : <X size={16} className="text-[#3A4A5A] mx-auto" />}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            {row.run ? <Check size={16} className="text-emerald-400 mx-auto" /> : <X size={16} className="text-[#3A4A5A] mx-auto" />}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            {row.grv ? <Check size={16} className="text-emerald-400 mx-auto" /> : <X size={16} className="text-[#3A4A5A] mx-auto" />}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            {row.role ? <Shield size={16} className="text-amber-400 mx-auto" /> : <X size={16} className="text-[#3A4A5A] mx-auto" />}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
}
