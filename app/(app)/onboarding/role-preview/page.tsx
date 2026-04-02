"use client";
import React, { useState } from 'react';
import { Eye, Shield, Check, Users, MonitorSmartphone, BadgeIndianRupee } from 'lucide-react';

export default function RoleBasedPlanPreviewScreen() {
    const [selectedRole, setSelectedRole] = useState('employee');

    const roles = [
        { id: 'admin', label: 'Super Admin', icon: <Shield size={16} /> },
        { id: 'manager', label: 'People Manager', icon: <Users size={16} /> },
        { id: 'employee', label: 'Standard Employee', icon: <MonitorSmartphone size={16} /> },
    ];

    return (
        <div className="min-h-screen p-6 max-w-6xl mx-auto space-y-8">
            <div className="text-center mb-10">
                <h1 className="text-3xl font-black text-white mb-2">Preview Role Permissions</h1>
                <p className="text-[#8899AA] text-base max-w-xl mx-auto">
                    Kaarya adapts its interface based on who is logged in. See exactly what your team members will experience before inviting them.
                </p>
            </div>

            {/* Role Switcher */}
            <div className="flex justify-center mb-8">
                <div className="bg-[#0A1420] border border-[#1A2A3A] p-1.5 rounded-xl inline-flex gap-1 shadow-xl">
                    {roles.map(r => (
                        <button
                            key={r.id}
                            onClick={() => setSelectedRole(r.id)}
                            className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${selectedRole === r.id ? 'bg-[#131B2B] text-white shadow-sm border border-[#2A3A4A]' : 'text-[#556677] hover:text-[#8899AA]'}`}
                        >
                            {r.icon} {r.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Mock Dashboard Preview Container */}
            <div className="bg-[#060D1A] border border-[#2A3A4A] rounded-2xl overflow-hidden shadow-2xl relative max-w-5xl mx-auto animate-fade-in ring-4 ring-[#0A1420]">
                {/* Browser-like header */}
                <div className="bg-[#0A1420] border-b border-[#1A2A3A] px-4 py-3 flex items-center gap-4">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-rose-500/50" />
                        <div className="w-3 h-3 rounded-full bg-amber-500/50" />
                        <div className="w-3 h-3 rounded-full bg-emerald-500/50" />
                    </div>
                    <div className="bg-[#131B2B] border border-[#2A3A4A] rounded-md px-3 py-1 text-[10px] text-[#556677] font-mono flex items-center gap-2 max-w-sm w-full mx-auto justify-center">
                        <Eye size={12} className="text-indigo-400" /> Previewing as: {roles.find(r => r.id === selectedRole)?.label}
                    </div>
                </div>

                {/* Simplified App Shell Preview inside */}
                <div className="flex h-[600px] pointer-events-none opacity-90">

                    {/* Mock Sidebar */}
                    <div className="w-48 border-r border-[#1A2A3A] bg-[#0A1420] p-4 flex flex-col gap-2">
                        <div className="h-6 w-24 bg-[#131B2B] rounded mb-6" />

                        {/* Common items */}
                        <div className="h-8 w-full bg-indigo-500/20 border border-indigo-500/20 rounded-lg" />
                        <div className="h-8 w-full bg-[#131B2B] rounded-lg" />
                        <div className="h-8 w-full bg-[#131B2B] rounded-lg" />

                        {/* Manager items */}
                        {(selectedRole === 'manager' || selectedRole === 'admin') && (
                            <>
                                <div className="mt-4 text-[10px] font-bold text-[#556677] uppercase">My Team</div>
                                <div className="h-8 w-full bg-[#131B2B] rounded-lg" />
                                <div className="h-8 w-full bg-[#131B2B] rounded-lg" />
                            </>
                        )}

                        {/* Admin items */}
                        {selectedRole === 'admin' && (
                            <>
                                <div className="mt-4 text-[10px] font-bold text-[#556677] uppercase">Company</div>
                                <div className="h-8 w-full bg-[#131B2B] rounded-lg" />
                                <div className="h-8 w-full bg-[#131B2B] rounded-lg" />
                                <div className="h-8 w-full bg-[#131B2B] rounded-lg" />
                            </>
                        )}
                    </div>

                    {/* Mock Content Area */}
                    <div className="flex-1 p-8 bg-[#060D1A]">
                        {selectedRole === 'employee' && (
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
                        {(selectedRole === 'manager' || selectedRole === 'admin') && (
                            <div className="space-y-6">
                                <div className="flex justify-between items-center mb-8">
                                    <div className="h-8 w-64 bg-[#131B2B] rounded-lg" />
                                    <div className="h-8 w-32 bg-indigo-600 rounded-lg" />
                                </div>
                                <div className="grid grid-cols-4 gap-4">
                                    <div className="h-24 bg-[#0A1420] border border-[#1A2A3A] rounded-xl" />
                                    <div className="h-24 bg-[#0A1420] border border-[#1A2A3A] rounded-xl" />
                                    <div className="h-24 bg-[#0A1420] border border-[#1A2A3A] rounded-xl" />
                                    <div className="h-24 bg-[#0A1420] border border-[#1A2A3A] rounded-xl" />
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
                        {selectedRole === 'employee' && (
                            <>
                                <li className="flex items-start gap-2"><Check size={16} className="text-emerald-400 mt-0.5" /> View own payslips</li>
                                <li className="flex items-start gap-2"><Check size={16} className="text-emerald-400 mt-0.5" /> Request time off</li>
                                <li className="flex items-start gap-2"><Check size={16} className="text-emerald-400 mt-0.5" /> Submit expense claims</li>
                                <li className="flex items-start gap-2 text-[#556677]"><Shield size={16} className="mt-0.5" /> No team visibility</li>
                            </>
                        )}
                        {selectedRole === 'manager' && (
                            <>
                                <li className="flex items-start gap-2"><Check size={16} className="text-emerald-400 mt-0.5" /> Approve leaves & expenses</li>
                                <li className="flex items-start gap-2"><Check size={16} className="text-emerald-400 mt-0.5" /> View direct reports' attendance</li>
                                <li className="flex items-start gap-2"><Check size={16} className="text-emerald-400 mt-0.5" /> Conduct performance reviews</li>
                                <li className="flex items-start gap-2 text-[#556677]"><Shield size={16} className="mt-0.5" /> Cannot edit core company settings</li>
                            </>
                        )}
                        {selectedRole === 'admin' && (
                            <>
                                <li className="flex items-start gap-2"><Check size={16} className="text-indigo-400 mt-0.5" /> Run Payroll & file taxes</li>
                                <li className="flex items-start gap-2"><Check size={16} className="text-indigo-400 mt-0.5" /> Manage all billing & settings</li>
                                <li className="flex items-start gap-2"><Check size={16} className="text-indigo-400 mt-0.5" /> Full org visibility & audit logs</li>
                                <li className="flex items-start gap-2"><Shield size={16} className="text-rose-400 mt-0.5" /> Unrestricted Access</li>
                            </>
                        )}
                    </ul>
                </div>
            </div>

            <div className="flex justify-center mt-8">
                <button className="bg-[#1A2A3A] hover:bg-[#2A3A4A] text-white px-8 py-3 rounded-xl font-bold transition-colors">
                    Looks Good, Continue
                </button>
            </div>
        </div>
    );
}
