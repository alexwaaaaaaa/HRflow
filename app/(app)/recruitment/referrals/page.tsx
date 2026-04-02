"use client";
import React, { useState } from "react";
import { UserPlus, Gift, TrendingUp, Search, UploadCloud, ChevronRight, CheckCircle2, Clock } from "lucide-react";

const MY_REFERRALS = [
    { id: 1, name: "Sneha Reddy", role: "Product Manager", stage: "Interview", date: "12 Mar 2025", bonus: "₹ 50,000", status: "pending" },
    { id: 2, name: "Karan Johar", role: "UX Designer", stage: "Hired", date: "01 Feb 2025", bonus: "₹ 40,000", status: "paid" },
    { id: 3, name: "Varun Dhawan", role: "Backend Engineer", stage: "Screening", date: "15 Mar 2025", bonus: "₹ 50,000", status: "pending" },
];

export default function EmployeeReferralPortal() {
    return (
        <div className="p-6 md:p-8 max-w-[1200px] mx-auto text-white">
            <div className="mb-8">
                <h1 className="text-3xl font-bold mb-1">Employee Referral Portal</h1>
                <p className="text-sm text-[#8899AA]">Refer great talent, help us grow, and earn rewards!</p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-br from-[#0066FF] to-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 relative overflow-hidden group">
                    <UserPlus size={48} className="absolute -right-2 -bottom-2 text-white/5 group-hover:scale-110 transition-transform" />
                    <p className="text-sm font-medium text-white/80 mb-2">Total Referrals</p>
                    <p className="text-4xl font-black text-white">8</p>
                </div>
                <div className="bg-gradient-to-br from-[#00E5A0] to-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 relative overflow-hidden group">
                    <TrendingUp size={48} className="absolute -right-2 -bottom-2 text-[#060B14]/10 group-hover:scale-110 transition-transform" />
                    <p className="text-sm font-medium text-[#060B14]/70 mb-2">Successful Hires</p>
                    <p className="text-4xl font-black text-[#060B14]">2</p>
                </div>
                <div className="bg-gradient-to-br from-[#FFB800] to-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 relative overflow-hidden group">
                    <Gift size={48} className="absolute -right-2 -bottom-2 text-[#060B14]/10 group-hover:scale-110 transition-transform" />
                    <p className="text-sm font-medium text-[#060B14]/70 mb-2">Total Bonus Earned</p>
                    <p className="text-4xl font-black text-[#060B14]">₹ 80,000</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Submit New Referral Form */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <h3 className="font-bold text-lg mb-6 flex items-center gap-2"><PlusIcon /> Submit a New Referral</h3>

                    <div className="space-y-5">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-[#8899AA] mb-1.5">First Name</label>
                                <input className="w-full h-10 bg-[#060B14] border border-[#1A2A3A] rounded-xl px-3 text-sm text-white focus:outline-none focus:border-[#0066FF]" />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-[#8899AA] mb-1.5">Last Name</label>
                                <input className="w-full h-10 bg-[#060B14] border border-[#1A2A3A] rounded-xl px-3 text-sm text-white focus:outline-none focus:border-[#0066FF]" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-[#8899AA] mb-1.5">Email Address</label>
                            <input type="email" className="w-full h-10 bg-[#060B14] border border-[#1A2A3A] rounded-xl px-3 text-sm text-white focus:outline-none focus:border-[#0066FF]" />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-[#8899AA] mb-1.5">Applying For (Select Job)</label>
                            <select className="w-full h-10 bg-[#060B14] border border-[#1A2A3A] rounded-xl px-3 text-sm text-white focus:outline-none border-r-8 border-transparent">
                                <option>Senior Frontend Engineer (₹ 50,000 Bonus)</option>
                                <option>Product Marketing Manager (₹ 40,000 Bonus)</option>
                                <option>Backend DevOps Lead (₹ 75,000 Bonus)</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-[#8899AA] mb-1.5">Upload Resume</label>
                            <div className="w-full h-24 bg-[#060B14] border-2 border-dashed border-[#1A2A3A] rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-[#0066FF] transition-colors group">
                                <UploadCloud size={20} className="text-[#445566] group-hover:text-[#0066FF] mb-2" />
                                <span className="text-xs text-[#8899AA] font-medium group-hover:text-white">Drag & Drop or Browse (PDF, DOCX)</span>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-[#8899AA] mb-1.5">How do you know them? (Optional)</label>
                            <textarea rows={2} className="w-full bg-[#060B14] border border-[#1A2A3A] rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#0066FF] resize-none" />
                        </div>

                        <button className="w-full h-12 bg-[#00E5A0] text-[#060B14] font-bold text-sm rounded-xl hover:bg-[#00c98d] transition-colors mt-2">
                            Submit Referral
                        </button>
                    </div>
                </div>

                {/* My Referrals Tracking */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl flex flex-col">
                    <div className="p-6 border-b border-[#1A2A3A] flex justify-between items-center">
                        <h3 className="font-bold text-lg">My Referrals</h3>
                        <div className="relative">
                            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#445566]" />
                            <input placeholder="Search..." className="h-9 w-[200px] bg-[#060B14] border border-[#1A2A3A] rounded-lg pl-9 pr-3 text-xs text-white focus:outline-none" />
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto divide-y divide-[#1A2A3A]">
                        {MY_REFERRALS.map(ref => (
                            <div key={ref.id} className="p-6 hover:bg-[#1A2A3A]/30 transition-colors">
                                <div className="flex justify-between items-start mb-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-[#1A2A3A] flex items-center justify-center font-bold text-sm text-white">
                                            {ref.name.split(" ").map(n => n[0]).join("")}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white text-base">{ref.name}</h4>
                                            <p className="text-xs text-[#8899AA]">{ref.role}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-bold text-[#00E5A0]">{ref.bonus}</p>
                                        <p className="text-[10px] text-[#8899AA]">Potential Bonus</p>
                                    </div>
                                </div>

                                {/* Stage Tracker */}
                                <div className="mt-4">
                                    <div className="flex items-center justify-between text-xs mb-2">
                                        <span className="font-medium text-[#0066FF]">{ref.stage}</span>
                                        <span className="text-[#445566]">{ref.date}</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-[#1A2A3A] rounded-full overflow-hidden flex">
                                        {/* Extremely basic visual logic for stages */}
                                        <div className={`h-full ${ref.stage !== 'Applied' ? 'bg-[#0066FF] w-1/4' : 'bg-[#0066FF] w-full'}`} />
                                        <div className={`h-full ${ref.stage === 'Interview' || ref.stage === 'Hired' ? 'bg-[#0066FF] w-1/4' : 'bg-transparent w-1/4'}`} />
                                        <div className={`h-full ${ref.stage === 'Hired' ? 'bg-[#00E5A0] w-1/2' : 'bg-transparent w-1/2'}`} />
                                    </div>
                                </div>

                                {ref.status === "paid" && (
                                    <div className="mt-4 flex items-center gap-1.5 text-xs text-[#00E5A0] bg-[#00E5A0]/10 px-3 py-1.5 rounded-lg w-fit font-bold">
                                        <CheckCircle2 size={14} /> Bonus Paid Out via Payroll (Feb 2025)
                                    </div>
                                )}
                                {ref.status === "pending" && ref.stage === "Hired" && (
                                    <div className="mt-4 flex items-center gap-1.5 text-xs text-[#FFB800] bg-[#FFB800]/10 px-3 py-1.5 rounded-lg w-fit font-bold">
                                        <Clock size={14} /> Bonus Pending (Subject to 90-day retention)
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

function PlusIcon() {
    return <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#00E5A0]"><line x1="12" x2="12" y1="5" y2="19" /><line x1="5" x2="19" y1="12" y2="12" /></svg>;
}
