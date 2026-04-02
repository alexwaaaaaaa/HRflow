"use client";

import React, { useState } from 'react';
import { Shield, Search, Plus, CheckSquare, Square, Save, Users } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function RolePermissionPage() {
    const [selectedRole, setSelectedRole] = useState('HR Admin');

    const roles = [
        { name: 'Super Admin', users: 1, color: 'text-amber-400' },
        { name: 'HR Admin', users: 2, color: 'text-indigo-400' },
        { name: 'Payroll Admin', users: 1, color: 'text-emerald-400' },
        { name: 'Manager', users: 8, color: 'text-blue-400' },
        { name: 'Employee', users: 245, color: 'text-[#8899AA]' },
    ];

    const modules = [
        { name: 'Employee Directory', permissions: { view: true, create: true, edit: true, delete: false, export: true } },
        { name: 'Payroll Engine', permissions: { view: true, create: false, edit: false, delete: false, export: false } },
        { name: 'Leave Management', permissions: { view: true, create: true, edit: true, delete: false, export: true } },
        { name: 'Recruitment (ATS)', permissions: { view: true, create: true, edit: true, delete: true, export: true } },
        { name: 'Performance Reviews', permissions: { view: true, create: true, edit: true, delete: false, export: false } },
        { name: 'AI & Chatbot', permissions: { view: true, create: false, edit: false, delete: false, export: false } },
        { name: 'System Settings', permissions: { view: false, create: false, edit: false, delete: false, export: false } },
    ];

    const permKeys = ['view', 'create', 'edit', 'delete', 'export'] as const;

    return (
        <div className="p-6 md:p-8 animate-fade-in max-w-7xl mx-auto flex flex-col h-[calc(100vh-80px)]">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4 shrink-0">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight mb-2 flex items-center gap-3">
                        <Shield size={28} className="text-indigo-400" /> Roles & Permissions
                    </h1>
                    <p className="text-[#8899AA] text-sm max-w-2xl">
                        Define granular access control for each role across all Kaarya modules.
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button variant="secondary" className="border-[#2A3A4A] text-white"><Plus size={16} className="mr-2" /> New Role</Button>
                    <Button className="bg-indigo-600 hover:bg-indigo-500 text-white border-none py-2 px-6"><Save size={16} className="mr-2" /> Save Changes</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 flex-1 overflow-hidden">
                {/* Role Sidebar */}
                <div className="lg:col-span-1 space-y-2 shrink-0">
                    <h3 className="text-xs font-semibold text-[#445566] uppercase tracking-wider mb-3 px-2">Defined Roles</h3>
                    {roles.map((role) => (
                        <button
                            key={role.name}
                            onClick={() => setSelectedRole(role.name)}
                            className={`flex items-center justify-between w-full p-3 rounded-xl transition-colors text-sm font-medium ${selectedRole === role.name
                                    ? 'bg-[#1A2A3A] text-white border border-[#2A3A4A]'
                                    : 'text-[#8899AA] hover:bg-[#131B2B] hover:text-white border border-transparent'
                                }`}
                        >
                            <span className="flex items-center gap-3">
                                <Shield size={16} className={selectedRole === role.name ? role.color : ''} />
                                {role.name}
                            </span>
                            <span className="bg-[#0A1420] text-[#8899AA] px-2 py-0.5 rounded text-xs border border-[#1A2A3A] flex items-center gap-1">
                                <Users size={10} /> {role.users}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Permission Matrix */}
                <div className="lg:col-span-3 bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden flex flex-col h-full">
                    <div className="p-4 border-b border-[#1A2A3A] bg-[#131B2B] shrink-0">
                        <h2 className="text-white font-medium">{selectedRole} — Module Permissions</h2>
                        <p className="text-xs text-[#8899AA] mt-0.5">Toggle capabilities for each module below.</p>
                    </div>
                    <div className="flex-1 overflow-auto">
                        <table className="w-full text-left border-collapse min-w-[600px]">
                            <thead>
                                <tr className="border-b border-[#1A2A3A] bg-[#0A1420]/50 sticky top-0 z-10">
                                    <th className="p-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Module</th>
                                    {permKeys.map(p => (
                                        <th key={p} className="p-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider text-center">{p}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {modules.map((mod, idx) => (
                                    <tr key={idx} className="border-b border-[#1A2A3A] hover:bg-[#131B2B] transition-colors">
                                        <td className="p-4 text-sm text-white font-medium">{mod.name}</td>
                                        {permKeys.map(p => (
                                            <td key={p} className="p-4 text-center">
                                                <button className="inline-block transition-transform hover:scale-110">
                                                    {mod.permissions[p]
                                                        ? <CheckSquare size={20} className="text-indigo-400" />
                                                        : <Square size={20} className="text-[#2A3A4A] hover:text-[#445566]" />
                                                    }
                                                </button>
                                            </td>
                                        ))}
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
