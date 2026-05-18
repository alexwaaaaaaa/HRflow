"use client";

import Page from "@/components/ui/Page";

import React, { useState } from "react";
import { Save } from "lucide-react";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function WeekendPolicy() {
    const [weekends, setWeekends] = useState(["Saturday", "Sunday"]);
    const [altSaturday, setAltSaturday] = useState(true);
    const [saved, setSaved] = useState(false);

    const toggle = (d: string) => {
        setWeekends(prev => prev.includes(d) ? prev.filter(x => x !== d) : [...prev, d]);
    };

    return (
        <Page
            title="Weekend Policy"
            subtitle="Configure working & non-working days"
            breadcrumbs={[{ label: "Attendance", href: "/attendance/dashboard" }, { label: "Settings", href: "/attendance/settings" }, { label: "Weekend" }]}
            maxWidth="900px"
        >

        <div className="p-6 md:p-8 max-w-[820px] mx-auto text-white">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold">Weekend Policy</h2>
                    <p className="text-sm text-[#8899AA]">Configure working & non-working days</p>
                </div>
                <button onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000); }}
                    className={`px-4 py-2 text-sm font-bold rounded-xl flex items-center gap-2 transition-colors ${saved ? "bg-[#00E5A0]/20 text-[#00E5A0] border border-[#00E5A0]/30" : "bg-[#00E5A0] text-[#060B14] hover:bg-[#00c98d]"}`}>
                    <Save className="w-4 h-4" />{saved ? "Saved ✅" : "Save Policy"}
                </button>
            </div>

            {/* WEEK DISPLAY */}
            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 mb-5">
                <h3 className="text-lg font-semibold mb-4">Working Days Configuration</h3>
                <div className="grid grid-cols-7 gap-2 mb-4">
                    {DAYS.map(d => {
                        const isWeekend = weekends.includes(d);
                        return (
                            <div key={d} className="flex flex-col items-center gap-2">
                                <button onClick={() => toggle(d)}
                                    className={`w-full aspect-square rounded-xl font-semibold text-xs transition-all ${isWeekend ? "bg-[#FF4444]/10 border border-[#FF4444]/30 text-[#FF4444]" : "bg-[#00E5A0]/10 border border-[#00E5A0]/30 text-[#00E5A0]"}`}>
                                    {d.slice(0, 3)}
                                </button>
                                <span className={`text-[10px] ${isWeekend ? "text-[#FF4444]" : "text-[#00E5A0]"}`}>{isWeekend ? "Off" : "Work"}</span>
                            </div>
                        );
                    })}
                </div>
                <p className="text-xs text-[#8899AA]">Click days to toggle. Green = Working, Red = Off/Weekend.</p>
            </div>

            {/* ALTERNATE SATURDAYS */}
            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 mb-5">
                <h3 className="text-lg font-semibold mb-4">Alternate Saturday Policy</h3>
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <p className="text-sm font-medium">Enable Alternate Saturday</p>
                        <p className="text-xs text-[#8899AA]">Some Saturdays working, some off (1st/3rd = off, 2nd/4th = working)</p>
                    </div>
                    <button onClick={() => setAltSaturday(a => !a)}
                        className={`w-10 h-5 rounded-full relative transition-colors ${altSaturday ? "bg-[#00E5A0]" : "bg-[#1A2A3A]"}`}>
                        <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${altSaturday ? "translate-x-5" : "translate-x-0.5"}`} />
                    </button>
                </div>
                {altSaturday && (
                    <div className="grid grid-cols-4 gap-3">
                        {["1st Saturday", "2nd Saturday", "3rd Saturday", "4th Saturday"].map((s, i) => {
                            const isOff = i % 2 === 0;
                            return (
                                <div key={i} className={`rounded-xl px-4 py-3 text-center ${isOff ? "bg-[#FF4444]/10 border border-[#FF4444]/30" : "bg-[#00E5A0]/10 border border-[#00E5A0]/30"}`}>
                                    <p className="text-xs font-medium mb-0.5">{s}</p>
                                    <p className={`text-[11px] ${isOff ? "text-[#FF4444]" : "text-[#00E5A0]"}`}>{isOff ? "Off" : "Working"}</p>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* DEPARTMENT EXCEPTIONS */}
            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                <h3 className="text-lg font-semibold mb-4">Department Overrides</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="text-[#8899AA] text-xs">
                            <tr>
                                <th className="text-left py-2">Department</th>
                                <th className="text-center py-2">Apply Default Policy</th>
                                <th className="text-left py-2">Custom Weekend</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1A2A3A]">
                            {[
                                { dept: "Engineering", default: true, custom: null },
                                { dept: "Operations", default: false, custom: "Sunday only" },
                                { dept: "Sales", default: false, custom: "Sunday only" },
                                { dept: "Marketing", default: true, custom: null },
                            ].map((row, i) => (
                                <tr key={i}>
                                    <td className="py-3 font-medium">{row.dept}</td>
                                    <td className="py-3 text-center">
                                        <input type="checkbox" defaultChecked={row.default} className="accent-[#00E5A0] w-4 h-4" />
                                    </td>
                                    <td className="py-3 text-[#8899AA]">{row.custom || "—"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    
        </Page>
        );
}
