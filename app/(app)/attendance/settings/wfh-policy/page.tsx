"use client";

import React, { useState } from "react";
import { Save } from "lucide-react";

function Toggle({ on, onChange }: { on: boolean; onChange: () => void }) {
    return (
        <button onClick={onChange} className={`w-10 h-5 rounded-full relative transition-colors ${on ? "bg-[#00E5A0]" : "bg-[#1A2A3A]"}`}>
            <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${on ? "translate-x-5" : "translate-x-0.5"}`} />
        </button>
    );
}

export default function WFHPolicy() {
    const [saved, setSaved] = useState(false);
    const [p, setP] = useState({
        maxDaysWeek: "2",
        maxDaysMonth: "8",
        requireApproval: true,
        locationCheck: true,
        checkInTime: "09:00",
        checkOutTime: "18:00",
        productivityTools: true,
        noWFHMonday: true,
        noWFHFriday: false,
        minTenure: "3",
        eligibleRoles: ["Engineering", "Marketing", "Finance"],
        nonEligibleRoles: ["Operations", "Field Sales"],
    });

    const ROLES = ["Engineering", "Sales", "Marketing", "Finance", "HR", "Operations", "Field Sales"];

    const toggleRole = (role: string) => {
        if (p.eligibleRoles.includes(role)) {
            setP(prev => ({ ...prev, eligibleRoles: prev.eligibleRoles.filter(r => r !== role), nonEligibleRoles: [...prev.nonEligibleRoles, role] }));
        } else {
            setP(prev => ({ ...prev, nonEligibleRoles: prev.nonEligibleRoles.filter(r => r !== role), eligibleRoles: [...prev.eligibleRoles, role] }));
        }
    };

    return (
        <div className="p-6 md:p-8 max-w-[900px] mx-auto text-white">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold">WFH Policy Settings</h2>
                    <p className="text-sm text-[#8899AA]">Configure work-from-home rules for your organization</p>
                </div>
                <button onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000); }}
                    className={`px-4 py-2 text-sm font-bold rounded-xl flex items-center gap-2 ${saved ? "bg-[#00E5A0]/20 text-[#00E5A0] border border-[#00E5A0]/30" : "bg-[#00E5A0] text-[#060B14] hover:bg-[#00c98d]"}`}>
                    <Save className="w-4 h-4" />{saved ? "Saved ✅" : "Save Policy"}
                </button>
            </div>

            <div className="space-y-4">
                {/* WFH Limits */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 space-y-4">
                    <h3 className="font-semibold text-lg">WFH Limits</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs text-[#8899AA] block mb-1">Max WFH days per week</label>
                            <input value={p.maxDaysWeek} onChange={e => setP(prev => ({ ...prev, maxDaysWeek: e.target.value }))}
                                className="w-full bg-[#060B14] border border-[#1A2A3A] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#00E5A0]" />
                        </div>
                        <div>
                            <label className="text-xs text-[#8899AA] block mb-1">Max WFH days per month</label>
                            <input value={p.maxDaysMonth} onChange={e => setP(prev => ({ ...prev, maxDaysMonth: e.target.value }))}
                                className="w-full bg-[#060B14] border border-[#1A2A3A] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#00E5A0]" />
                        </div>
                        <div>
                            <label className="text-xs text-[#8899AA] block mb-1">Min tenure for WFH eligibility (months)</label>
                            <input value={p.minTenure} onChange={e => setP(prev => ({ ...prev, minTenure: e.target.value }))}
                                className="w-full bg-[#060B14] border border-[#1A2A3A] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#00E5A0]" />
                        </div>
                    </div>
                </div>

                {/* Rules */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 space-y-3">
                    <h3 className="font-semibold text-lg">WFH Rules</h3>
                    {([
                        { label: "Require manager approval", field: "requireApproval" as const },
                        { label: "Location check on WFH days", field: "locationCheck" as const },
                        { label: "No WFH on Mondays", field: "noWFHMonday" as const },
                        { label: "No WFH on Fridays", field: "noWFHFriday" as const },
                        { label: "Productivity tools required", field: "productivityTools" as const },
                    ] as const).map(item => (
                        <div key={item.field} className="flex justify-between items-center py-2 border-b border-[#1A2A3A] last:border-0">
                            <span className="text-sm">{item.label}</span>
                            <Toggle on={Boolean(p[item.field])} onChange={() => setP(prev => ({ ...prev, [item.field]: !prev[item.field] }))} />
                        </div>
                    ))}
                </div>

                {/* Eligible Roles */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <h3 className="font-semibold text-lg mb-2">Eligible Departments</h3>
                    <p className="text-xs text-[#8899AA] mb-4">Click to toggle WFH eligibility per department</p>
                    <div className="flex gap-3 flex-wrap">
                        {ROLES.map(role => {
                            const eligible = p.eligibleRoles.includes(role);
                            return (
                                <button key={role} onClick={() => toggleRole(role)}
                                    className={`px-4 py-2 text-sm rounded-xl border transition-colors ${eligible ? "bg-[#00E5A0]/10 border-[#00E5A0]/30 text-[#00E5A0]" : "bg-[#FF4444]/10 border-[#FF4444]/30 text-[#FF4444]"}`}>
                                    {eligible ? "✅" : "❌"} {role}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
