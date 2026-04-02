"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    Users, ChevronRight, UserPlus, UploadCloud, CheckCircle2, ShieldAlert, Trash2, Edit2
} from "lucide-react";

const DEPENDENTS = [
    { id: "DEP-01", name: "Rohan Sharma", relation: "Spouse", dob: "14 May 1990", gender: "Male", status: "Active", cover: "GMC, GTL Nominee" },
    { id: "DEP-02", name: "Aarav Sharma", relation: "Son", dob: "22 Aug 2018", gender: "Male", status: "Active", cover: "GMC" },
    { id: "DEP-03", name: "Suresh Sharma", relation: "Father-in-law", dob: "05 Jan 1960", gender: "Male", status: "Pending Verification", cover: "Voluntary Parents Cover" },
];

export default function DependentManagementScreen() {
    return (
        <div className="min-h-screen bg-[#0B1221] text-white p-8 font-sans">
            <div className="flex items-center gap-2 text-sm text-[#8899AA] mb-6">
                <Link href="/finance/dashboard" className="hover:text-white transition-colors">Finance</Link>
                <ChevronRight className="w-4 h-4" />
                <Link href="/finance/insurance/policy" className="hover:text-white transition-colors">Insurance</Link>
                <ChevronRight className="w-4 h-4" />
                <span className="text-white">Dependents</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <Users className="w-8 h-8 text-pink-400" />
                        Manage Dependents
                    </h1>
                    <p className="text-sm text-[#8899AA] mt-1">Add or remove family members covered under your employer insurance plans.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-6 py-2 bg-pink-500 hover:bg-pink-600 text-white text-sm font-semibold rounded-lg transition-colors shadow-[0_0_15px_rgba(236,72,153,0.3)]">
                        <UserPlus className="w-4 h-4" />
                        Add Dependent
                    </button>
                </div>
            </div>

            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden">
                <div className="p-4 border-b border-[#1A2A3A] flex justify-between items-center text-sm text-[#8899AA]">
                    <div className="flex items-center gap-2">
                        <span className="font-bold text-white">3</span> Family Members Registered
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#1A2A3A]/50 text-[#8899AA] text-xs uppercase tracking-wider">
                                <th className="p-4 font-medium">Dependent Name</th>
                                <th className="p-4 font-medium">Relationship / Gender</th>
                                <th className="p-4 font-medium">Date of Birth</th>
                                <th className="p-4 font-medium">Active Coverage</th>
                                <th className="p-4 font-medium text-center">KYC Status</th>
                                <th className="p-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm divide-y divide-[#1A2A3A]">
                            {DEPENDENTS.map((dep) => (
                                <tr key={dep.id} className="hover:bg-[#1A2A3A]/30 transition-colors">
                                    <td className="p-4">
                                        <div className="text-white font-medium">{dep.name}</div>
                                        <div className="text-xs text-[#8899AA] mt-1 font-mono">{dep.id}</div>
                                    </td>
                                    <td className="p-4">
                                        <span className="text-white bg-[#1A2A3A] px-2 py-1 rounded-md text-xs">{dep.relation}</span>
                                        <div className="text-[#8899AA] text-xs mt-1">{dep.gender}</div>
                                    </td>
                                    <td className="p-4">
                                        <span className="text-white">{dep.dob}</span>
                                    </td>
                                    <td className="p-4">
                                        <span className="text-indigo-400 font-medium">{dep.cover}</span>
                                    </td>
                                    <td className="p-4 text-center">
                                        {dep.status === 'Active' ? (
                                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded text-xs font-medium border border-emerald-500/20">
                                                <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Verified
                                            </span>
                                        ) : (
                                            <div className="flex flex-col items-center">
                                                <span className="inline-flex items-center gap-1 px-2 py-1 bg-amber-500/10 text-amber-500 rounded text-xs font-medium border border-amber-500/20">
                                                    Pending KYC
                                                </span>
                                                <button className="text-[10px] text-pink-400 mt-1 flex items-center gap-1 hover:text-pink-300">
                                                    <UploadCloud className="w-3 h-3" /> Upload Aadhaar
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="flex items-center justify-end gap-3 text-[#8899AA]">
                                            <button className="hover:text-white transition-colors" title="Edit Info">
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button className="hover:text-pink-400 transition-colors" title="Remove Dependent">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Note Section */}
            <div className="mt-6 flex items-start gap-3 p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl max-w-4xl text-sm">
                <ShieldAlert className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                <div>
                    <p className="text-indigo-400 font-bold mb-1">Addition/Deletion Rules</p>
                    <p className="text-[#8899AA]">
                        Dependents can only be added during the annual <strong>Open Enrollment Window</strong> (Oct 15 - Oct 31), except for specific life events (marriage, birth of a child) where additions are allowed within 30 days of the event via the <Link href="/finance/insurance/endorsements" className="text-white underline decoration-dashed">Endorsements portal</Link>.
                    </p>
                </div>
            </div>

        </div>
    );
}
