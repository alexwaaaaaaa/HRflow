"use client";
import React from 'react';
import { Receipt, ArrowRight, TrendingUp, Clock, CheckCircle2, AlertCircle, PlusCircle } from 'lucide-react';
import Link from 'next/link';

const STATS = [
    { label: 'Pending Claims', value: '₹2,84,500', sub: '14 claims awaiting approval', color: 'text-amber-400', icon: Clock },
    { label: 'Approved (This Month)', value: '₹9,12,000', sub: '67 claims processed', color: 'text-emerald-400', icon: CheckCircle2 },
    { label: 'Rejected', value: '₹45,000', sub: '3 claims returned', color: 'text-red-400', icon: AlertCircle },
    { label: 'Annual Limit Used', value: '64%', sub: '₹5.4L of ₹8.4L used', color: 'text-indigo-400', icon: TrendingUp },
];

const RECENT_CLAIMS = [
    { id: 'RMB-441', emp: 'Anita Kulkarni', avatar: 'AK', type: 'Medical', amount: '₹12,400', date: '09 Mar', status: 'Pending' },
    { id: 'RMB-440', emp: 'Rahul Sharma', avatar: 'RS', type: 'LTA', amount: '₹45,000', date: '08 Mar', status: 'Approved' },
    { id: 'RMB-438', emp: 'Vijay Kumar', avatar: 'VK', type: 'Internet', amount: '₹1,800', date: '07 Mar', status: 'Approved' },
    { id: 'RMB-435', emp: 'Deepa Agrawal', avatar: 'DA', type: 'Fuel', amount: '₹8,500', date: '06 Mar', status: 'Rejected' },
    { id: 'RMB-432', emp: 'Meena Joshi', avatar: 'MJ', type: 'Medical', amount: '₹22,000', date: '05 Mar', status: 'Pending' },
];

const STATUS_CFG: Record<string, string> = {
    Pending: 'bg-amber-500/10 text-amber-400',
    Approved: 'bg-emerald-500/10 text-emerald-400',
    Rejected: 'bg-red-500/10 text-red-400',
};

const NAV = [
    { label: 'Policy Setup', href: '/reimbursements/policy', desc: 'Configure categories & limits' },
    { label: 'Submit Claim', href: '/reimbursements/claim', desc: 'New reimbursement request' },
    { label: 'Approvals Queue', href: '/reimbursements/approvals', desc: '14 pending approval' },
    { label: 'Balance Tracker', href: '/reimbursements/balance', desc: 'Employee-wise limits' },
    { label: 'LTA Claims', href: '/reimbursements/lta', desc: 'Leave Travel Allowance' },
    { label: 'Medical Claims', href: '/reimbursements/medical', desc: 'Hospitalization & OPD' },
    { label: 'Reports', href: '/reimbursements/reports', desc: 'Monthly & annual summaries' },
];

export default function ReimbursementDashboard() {
    return (
        <div className="min-h-screen p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3"><Receipt size={24} className="text-violet-400" /> Reimbursements</h1>
                    <p className="text-[#8899AA] text-sm mt-1">Manage employee expense claims, LTA, medical, and all benefit reimbursements</p>
                </div>
                <Link href="/reimbursements/claim" className="flex items-center gap-2 bg-violet-600 hover:bg-violet-500 text-white font-bold px-4 py-2.5 rounded-xl text-sm transition-colors">
                    <PlusCircle size={16} /> New Claim
                </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {STATS.map(stat => {
                    const Icon = stat.icon;
                    return (
                        <div key={stat.label} className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-5">
                            <div className="flex items-center gap-2 mb-1">
                                <Icon size={16} className={stat.color} />
                                <div className={`text-2xl font-black ${stat.color}`}>{stat.value}</div>
                            </div>
                            <div className="text-xs text-[#8899AA] font-bold uppercase tracking-wider">{stat.label}</div>
                            <div className="text-[10px] text-[#445566] mt-1">{stat.sub}</div>
                        </div>
                    );
                })}
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                {/* Quick Nav */}
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl overflow-hidden">
                    <div className="p-4 border-b border-[#1A2A3A] text-white font-bold text-sm">Quick Navigation</div>
                    <div className="divide-y divide-[#1A2A3A]">
                        {NAV.map(n => (
                            <Link key={n.href} href={n.href} className="flex items-center gap-3 p-4 hover:bg-[#131B2B] transition-colors group">
                                <div className="flex-1">
                                    <div className="text-white font-semibold text-sm group-hover:text-violet-300 transition-colors">{n.label}</div>
                                    <div className="text-[#556677] text-xs">{n.desc}</div>
                                </div>
                                <ArrowRight size={14} className="text-[#445566] group-hover:text-violet-400 transition-colors shrink-0" />
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Recent Claims */}
                <div className="md:col-span-2 bg-[#0A1420] border border-[#1A2A3A] rounded-2xl overflow-hidden">
                    <div className="p-4 border-b border-[#1A2A3A] flex items-center justify-between">
                        <span className="text-white font-bold text-sm">Recent Claims</span>
                        <Link href="/reimbursements/approvals" className="text-violet-400 text-xs font-bold hover:text-violet-300 transition-colors">View All</Link>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-[#060D1A] text-[#8899AA] text-xs uppercase">
                                <tr>
                                    <th className="px-5 py-3 text-left font-bold border-b border-[#1A2A3A]">Employee</th>
                                    <th className="px-5 py-3 text-left font-bold border-b border-[#1A2A3A]">Type</th>
                                    <th className="px-5 py-3 text-left font-bold border-b border-[#1A2A3A]">Amount</th>
                                    <th className="px-5 py-3 text-left font-bold border-b border-[#1A2A3A]">Date</th>
                                    <th className="px-5 py-3 text-left font-bold border-b border-[#1A2A3A]">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#1A2A3A]">
                                {RECENT_CLAIMS.map(c => (
                                    <tr key={c.id} className="hover:bg-[#131B2B] transition-colors">
                                        <td className="px-5 py-4 flex items-center gap-2">
                                            <div className="w-7 h-7 rounded-full bg-violet-500/15 border border-violet-500/30 flex items-center justify-center text-[10px] font-bold text-violet-400">{c.avatar}</div>
                                            <div>
                                                <div className="text-white text-xs font-semibold">{c.emp}</div>
                                                <div className="text-[#556677] text-[10px]">{c.id}</div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4 text-[#AABBCC] text-xs">{c.type}</td>
                                        <td className="px-5 py-4 text-white font-bold text-xs">{c.amount}</td>
                                        <td className="px-5 py-4 text-[#556677] text-xs">{c.date}</td>
                                        <td className="px-5 py-4"><span className={`text-[10px] font-bold px-2 py-0.5 rounded ${STATUS_CFG[c.status]}`}>{c.status}</span></td>
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
