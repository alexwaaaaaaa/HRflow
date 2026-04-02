"use client";
import React, { useState } from 'react';
import {
    Zap, Search, Filter, CheckCircle2, XCircle, Clock, Gift, Medal, User, Plus
} from 'lucide-react';

const TEAM_MEMBERS = [
    { id: 1, name: "Jessica Kim", role: "Senior Engineer", points: 1250, recent: "Innovator Badge" },
    { id: 2, name: "Michael Chen", role: "DevOps Lead", points: 980, recent: "None" },
    { id: 3, name: "Emma Wilson", role: "Marketing Spec", points: 845, recent: "Team Player" },
    { id: 4, name: "David Rodriguez", role: "Designer", points: 620, recent: "None" },
    { id: 5, name: "Alex Patel", role: "Product Manager", points: 1400, recent: "Leader" },
];

const PAST_AWARDS = [
    { id: 101, to: "Jessica Kim", reason: "Critical bug fix over weekend", points: 200, date: "Oct 20, 2023", status: "Approved" },
    { id: 102, to: "Emma Wilson", reason: "Outstanding presentation at All-Hands", points: 150, date: "Oct 12, 2023", status: "Approved" },
    { id: 103, to: "Michael Chen", reason: "Successful infrastructure migration", points: 300, date: "Sep 28, 2023", status: "Pending HR Approval" },
];

export default function SpotAwardManagerScreen() {
    const [activeTab, setActiveTab] = useState('give');
    const [selectedUser, setSelectedUser] = useState<number | null>(null);
    const [points, setPoints] = useState<number>(100);
    const [reason, setReason] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const budget = { total: 5000, used: 2150, remaining: 2850 };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setActiveTab('history');
            setSelectedUser(null);
            setReason('');
            setPoints(100);
        }, 1500);
    };

    return (
        <div className="p-6 max-w-[1200px] mx-auto min-h-[calc(100vh-80px)] font-sans">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-white mb-2 flex items-center gap-3">
                        <Zap size={32} className="text-[#FFB020]" fill="currentColor" /> Spot Award Manager
                    </h1>
                    <p className="text-[#8899AA]">Instantly recognize exceptional performance within your team.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Column: Form & History */}
                <div className="col-span-1 lg:col-span-2 space-y-6">

                    <div className="flex items-center gap-4 border-b border-[#2A3A4A]">
                        <button
                            onClick={() => setActiveTab('give')}
                            className={`px-4 py-3 font-bold text-sm border-b-2 transition-colors ${activeTab === 'give' ? 'text-[#FFB020] border-[#FFB020]' : 'text-[#8899AA] border-transparent hover:text-white'}`}
                        >
                            Give Spot Award
                        </button>
                        <button
                            onClick={() => setActiveTab('history')}
                            className={`px-4 py-3 font-bold text-sm border-b-2 transition-colors ${activeTab === 'history' ? 'text-[#33E6FF] border-[#33E6FF]' : 'text-[#8899AA] border-transparent hover:text-white'}`}
                        >
                            Award History
                        </button>
                    </div>

                    {activeTab === 'give' && (
                        <form onSubmit={handleSubmit} className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-3xl p-6 shadow-xl space-y-8">

                            {/* Step 1: Select Team Member */}
                            <div>
                                <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#1A2A3A] text-xs font-bold text-[#FFB020]">1</span>
                                    Select Team Member
                                </h3>
                                <div className="relative mb-4">
                                    <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#445566]" />
                                    <input type="text" placeholder="Search team members..." className="w-full bg-[#152336] border border-[#2A3A4A] rounded-xl pl-11 pr-4 py-3 text-white placeholder:text-[#445566] focus:outline-none focus:border-[#FFB020]" />
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[240px] overflow-y-auto pr-2 custom-scrollbar">
                                    {TEAM_MEMBERS.map(user => (
                                        <label key={user.id} className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all ${selectedUser === user.id ? 'bg-[#FFB020]/10 border-[#FFB020]' : 'bg-[#152336] border-[#2A3A4A] hover:border-[#445566]'}`}>
                                            <input type="radio" name="user" className="sr-only" checked={selectedUser === user.id} onChange={() => setSelectedUser(user.id)} />
                                            <div className="w-10 h-10 rounded-full bg-[#1A2A3A] flex items-center justify-center text-white font-bold">{user.name.charAt(0)}</div>
                                            <div className="flex-1 min-w-0">
                                                <p className={`text-sm font-bold truncate ${selectedUser === user.id ? 'text-white' : 'text-[#CCDDEE]'}`}>{user.name}</p>
                                                <p className="text-xs text-[#8899AA] truncate">{user.role}</p>
                                            </div>
                                            {selectedUser === user.id && <CheckCircle2 size={18} className="text-[#FFB020]" />}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Step 2: Points */}
                            <div>
                                <div className="flex justify-between items-end mb-4">
                                    <h3 className="text-white font-bold flex items-center gap-2">
                                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#1A2A3A] text-xs font-bold text-[#FFB020]">2</span>
                                        Award Amount
                                    </h3>
                                    <span className="text-xs font-bold text-[#8899AA]">Available Budget: <span className="text-[#00E5A0]">{budget.remaining} pts</span></span>
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    {[50, 100, 200, 500].map(pts => (
                                        <button
                                            key={pts} type="button" onClick={() => setPoints(pts)}
                                            className={`px-6 py-3 rounded-xl font-bold text-sm border-2 transition-colors ${points === pts ? 'bg-[#FFB020]/10 border-[#FFB020] text-[#FFB020]' : 'bg-[#152336] border-[#2A3A4A] text-[#8899AA] hover:border-[#445566]'}`}
                                        >
                                            {pts} pts
                                        </button>
                                    ))}
                                    <div className="relative flex-1 min-w-[120px]">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8899AA] font-bold">Custom</span>
                                        <input type="number" value={points} onChange={(e) => setPoints(Number(e.target.value))} className="w-full bg-[#152336] border border-[#2A3A4A] rounded-xl pl-20 pr-4 py-3 text-white font-bold focus:outline-none focus:border-[#FFB020]" />
                                    </div>
                                </div>
                            </div>

                            {/* Step 3: Reason */}
                            <div>
                                <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#1A2A3A] text-xs font-bold text-[#FFB020]">3</span>
                                    Reason for Spot Award
                                </h3>
                                <textarea
                                    rows={4}
                                    value={reason} onChange={(e) => setReason(e.target.value)}
                                    placeholder="Describe the exceptional contribution..."
                                    className="w-full bg-[#152336] border border-[#2A3A4A] rounded-xl p-4 text-white placeholder:text-[#445566] focus:outline-none focus:border-[#FFB020] resize-none"
                                ></textarea>
                            </div>

                            {/* Submit */}
                            <div className="pt-6 border-t border-[#1A2A3A] flex justify-end">
                                <button
                                    type="submit"
                                    disabled={!selectedUser || !reason || isSubmitting}
                                    className={`px-8 py-3.5 rounded-xl font-bold flex items-center gap-2 transition-all ${(!selectedUser || !reason) ? 'bg-[#1A2A3A] text-[#445566] cursor-not-allowed' : 'bg-[#FFB020] text-[#0A1420] hover:bg-[#ffba33] shadow-[0_0_20px_rgba(255,176,32,0.3)]'}`}
                                >
                                    {isSubmitting ? <span className="w-5 h-5 border-2 border-[#0A1420]/30 border-t-[#0A1420] rounded-full animate-spin"></span> : <><Zap size={18} fill="currentColor" /> Issue Award</>}
                                </button>
                            </div>

                        </form>
                    )}

                    {activeTab === 'history' && (
                        <div className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-3xl overflow-hidden shadow-xl">
                            <div className="p-4 border-b border-[#1A2A3A] bg-[#0A1420] flex justify-between items-center">
                                <h3 className="text-white font-bold text-sm">Past Awards Given</h3>
                                <button className="text-[#8899AA] hover:text-white p-2 border border-[#2A3A4A] rounded-lg bg-[#152336]"><Filter size={16} /></button>
                            </div>
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-[#152336] border-b border-[#2A3A4A]">
                                        <th className="p-4 text-xs font-bold text-[#8899AA] uppercase tracking-wider">Recipient</th>
                                        <th className="p-4 text-xs font-bold text-[#8899AA] uppercase tracking-wider">Reason</th>
                                        <th className="p-4 text-xs font-bold text-[#8899AA] uppercase tracking-wider">Date</th>
                                        <th className="p-4 text-xs font-bold text-[#8899AA] uppercase tracking-wider text-right">Points</th>
                                        <th className="p-4 text-xs font-bold text-[#8899AA] uppercase tracking-wider text-right">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#1A2A3A]">
                                    {PAST_AWARDS.map(award => (
                                        <tr key={award.id} className="hover:bg-[#1A2A3A]/50 transition-colors">
                                            <td className="p-4 text-sm font-bold text-white">{award.to}</td>
                                            <td className="p-4 text-sm text-[#CCDDEE] max-w-[200px] truncate">{award.reason}</td>
                                            <td className="p-4 text-sm text-[#8899AA]">{award.date}</td>
                                            <td className="p-4 text-sm font-bold text-[#00E5A0] text-right font-mono">+{award.points}</td>
                                            <td className="p-4 text-right">
                                                <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider ${award.status === 'Approved' ? 'bg-[#00E5A0]/10 text-[#00E5A0]' : 'bg-[#FFB020]/10 text-[#FFB020]'}`}>
                                                    {award.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Right Column: Budget Widget */}
                <div className="col-span-1 space-y-6">

                    {/* Manager Budget */}
                    <div className="bg-[#0F1C2E] border border-[#2A3A4A] rounded-3xl p-6 shadow-xl relative overflow-hidden group">
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#FFB020]/10 rounded-full blur-[40px] pointer-events-none group-hover:bg-[#FFB020]/20 transition-all"></div>

                        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2 relative z-10">
                            <Gift size={20} className="text-[#FFB020]" /> Q4 Spot Award Budget
                        </h3>

                        <div className="flex flex-col items-center justify-center mb-6 relative z-10">
                            <div className="relative w-40 h-40">
                                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                    <circle cx="50" cy="50" r="45" fill="none" stroke="#1A2A3A" strokeWidth="8" />
                                    <circle cx="50" cy="50" r="45" fill="none" stroke="#FFB020" strokeWidth="8" strokeDasharray={`${(budget.remaining / budget.total) * 283} 283`} strokeLinecap="round" className="transition-all duration-1000" />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-2xl font-black text-white font-mono">{budget.remaining}</span>
                                    <span className="text-[10px] text-[#8899AA] font-bold uppercase tracking-wide">pts left</span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3 relative z-10 p-4 bg-[#152336] rounded-2xl border border-[#1A2A3A]">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-[#8899AA]">Total Allocated</span>
                                <span className="font-bold text-white font-mono">{budget.total} pts</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-[#8899AA]">Used</span>
                                <span className="font-bold text-[#FF4444] font-mono">{budget.used} pts</span>
                            </div>
                        </div>

                        <p className="text-xs text-[#445566] text-center mt-6">Budget resets on Jan 1, 2024</p>
                    </div>

                    {/* Approval Guidelines */}
                    <div className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-3xl p-6 shadow-xl">
                        <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Guidelines</h3>
                        <ul className="text-sm text-[#8899AA] space-y-3">
                            <li className="flex gap-2"><CheckCircle2 size={16} className="text-[#00E5A0] shrink-0" /> Awards under 200 points are auto-approved.</li>
                            <li className="flex gap-2"><XCircle size={16} className="text-[#FF4444] shrink-0" /> Avoid giving multiple spot awards to the same person in one quarter.</li>
                            <li className="flex gap-2"><Clock size={16} className="text-[#33E6FF] shrink-0" /> Awards &gt; 200 pts require HR review (SLA: 24h).</li>
                        </ul>
                    </div>

                </div>

            </div>
        </div>
    );
}
