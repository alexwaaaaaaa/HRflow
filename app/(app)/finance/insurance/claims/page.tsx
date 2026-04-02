"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    Activity, ChevronRight, Stethoscope, FileText, CheckCircle2, Clock, ShieldAlert, Plus
} from "lucide-react";

const CLAIMS = [
    { id: "CLM-881920", patient: "Rohan Sharma (Spouse)", type: "Cashless", amount: 150000, date: "15 Oct 2025", hospital: "Apollo Hospitals", status: "Approved", tag: "GMC" },
    { id: "CLM-881554", patient: "Ananya Sharma (Self)", type: "Reimbursement", amount: 12500, date: "02 Sep 2025", hospital: "Fortis Clinic", status: "Processing", tag: "GMC" },
    { id: "CLM-881021", patient: "Aarav Sharma (Child)", type: "Cashless", amount: 45000, date: "12 May 2025", hospital: "Max Super Specialty", status: "Rejected", tag: "GMC", reason: "OPD Not Covered" },
];

export default function ClaimsHistoryScreen() {
    return (
        <div className="min-h-screen bg-[#0B1221] text-white p-8 font-sans">
            <div className="flex items-center gap-2 text-sm text-[#8899AA] mb-6">
                <Link href="/finance/dashboard" className="hover:text-white transition-colors">Finance</Link>
                <ChevronRight className="w-4 h-4" />
                <Link href="/finance/insurance/policy" className="hover:text-white transition-colors">Insurance</Link>
                <ChevronRight className="w-4 h-4" />
                <span className="text-white">Claims History</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <Activity className="w-8 h-8 text-indigo-400" />
                        Claims Center
                    </h1>
                    <p className="text-sm text-[#8899AA] mt-1">Track the status of your cashless and reimbursement insurance claims.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-6 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-semibold rounded-lg transition-colors shadow-[0_0_15px_rgba(99,102,241,0.3)]">
                        <Plus className="w-4 h-4" />
                        File New Claim
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <p className="text-[#8899AA] text-sm font-medium mb-1">Total Claims Filed</p>
                    <h3 className="text-2xl font-bold text-white mb-1">3</h3>
                    <p className="text-xs text-[#8899AA]">Since Jan 2025</p>
                </div>
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <p className="text-[#8899AA] text-sm font-medium mb-1">Amount Approved (YTD)</p>
                    <h3 className="text-2xl font-bold text-emerald-400 mb-1">₹1,50,000</h3>
                    <p className="flex items-center gap-1 text-xs text-[#8899AA]">
                        Across 1 claim
                    </p>
                </div>
                <div className="bg-[#0D1928] border border-indigo-500/20 rounded-2xl p-6 bg-indigo-500/5">
                    <p className="text-[#8899AA] text-sm font-medium mb-1">In Processing</p>
                    <h3 className="text-2xl font-bold text-amber-400 mb-1">1</h3>
                    <p className="text-xs text-indigo-400/80">Pending TPA Review</p>
                </div>
            </div>

            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden">
                <div className="p-4 border-b border-[#1A2A3A] flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex gap-2">
                        <button className="px-4 py-2 bg-[#1A2A3A] text-white text-sm font-medium rounded-lg border border-[#2A3A4A]">All Claims</button>
                        <button className="px-4 py-2 bg-transparent text-[#8899AA] hover:text-white text-sm font-medium rounded-lg">Cashless</button>
                        <button className="px-4 py-2 bg-transparent text-[#8899AA] hover:text-white text-sm font-medium rounded-lg">Reimbursement</button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#1A2A3A]/50 text-[#8899AA] text-xs uppercase tracking-wider">
                                <th className="p-4 font-medium">Claim ID / Date</th>
                                <th className="p-4 font-medium">Patient / Hospital</th>
                                <th className="p-4 font-medium">Type</th>
                                <th className="p-4 font-medium text-right">Amount Claimed</th>
                                <th className="p-4 font-medium text-center">Status</th>
                                <th className="p-4 font-medium text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm divide-y divide-[#1A2A3A]">
                            {CLAIMS.map((claim) => (
                                <tr key={claim.id} className="hover:bg-[#1A2A3A]/30 transition-colors">
                                    <td className="p-4">
                                        <div className="font-mono text-indigo-400 font-medium">{claim.id}</div>
                                        <div className="text-xs text-[#8899AA] mt-1">{claim.date}</div>
                                    </td>
                                    <td className="p-4">
                                        <div className="text-white font-medium">{claim.patient}</div>
                                        <div className="text-[#8899AA] text-xs mt-0.5 flex items-center gap-1">
                                            <Stethoscope className="w-3 h-3" /> {claim.hospital}
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className="text-white">{claim.type}</span>
                                        <div className="text-[10px] text-[#8899AA] mt-0.5">{claim.tag}</div>
                                    </td>
                                    <td className="p-4 text-right text-white font-bold">
                                        ₹{claim.amount.toLocaleString()}
                                    </td>
                                    <td className="p-4 text-center">
                                        {claim.status === 'Approved' && (
                                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded text-xs font-medium">
                                                <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Settled
                                            </span>
                                        )}
                                        {claim.status === 'Processing' && (
                                            <span className="inline-flex items-center gap-1 px-2 py-1 bg-amber-500/10 text-amber-500 rounded text-xs font-medium">
                                                <Clock className="w-3 h-3 text-amber-500" /> Under Review
                                            </span>
                                        )}
                                        {claim.status === 'Rejected' && (
                                            <div className="flex flex-col items-center">
                                                <span className="inline-flex items-center gap-1 px-2 py-1 bg-pink-500/10 text-pink-400 rounded text-xs font-medium">
                                                    <ShieldAlert className="w-3 h-3 text-pink-400" /> Rejected
                                                </span>
                                                <span className="text-[10px] text-[#8899AA] mt-1" title={claim.reason}>{claim.reason}</span>
                                            </div>
                                        )}
                                    </td>
                                    <td className="p-4 text-center space-x-3">
                                        <Link href={`/finance/insurance/claims/tracking`} className="text-xs text-indigo-400 hover:text-indigo-300 font-medium">Track</Link>
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
