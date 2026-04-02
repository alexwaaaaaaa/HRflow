"use client";

import { CheckCircle2, Circle, Clock, AlertTriangle, FileText, Upload, ListChecks } from "lucide-react";
import Button from "@/components/ui/Button";

export default function MyTasks() {
    const tasks = [
        { id: 1, type: "Onboarding", t: "Complete IT Asset Declaration", due: "Today", st: "Overdue", c: "#FF4444", icon: Upload },
        { id: 2, type: "Performance", t: "Submit Q3 Self-Appraisal", due: "Tomorrow", st: "Pending", c: "#FFB800", icon: FileText },
        { id: 3, type: "Compliance", t: "Anti-Money Laundering Training", due: "15 Nov 2024", st: "Pending", c: "#0066FF", icon: Clock },
        { id: 4, type: "HR", t: "Acknowledge New Leave Policy", due: "20 Nov 2024", st: "Pending", c: "#8899AA", icon: ListChecks },
        { id: 5, type: "Profile", t: "Update Emergency Contact Info", due: "-", st: "Done", c: "#00E5A0", icon: CheckCircle2 }
    ];

    return (
        <div style={{ padding: "24px 32px", paddingBottom: 64 }} className="animate-fade-in relative max-w-4xl mx-auto">

            {/* Header */}
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h1 style={{ fontSize: 32, fontWeight: 700, color: "#FFFFFF", margin: 0 }}>My Tasks</h1>
                    <p style={{ fontSize: 14, color: "#8899AA", marginTop: 4 }}>Action items requiring your attention</p>
                </div>
            </div>

            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden shadow-xl">

                <div className="grid grid-cols-3 divide-x divide-[#1A2A3A] border-b border-[#1A2A3A] bg-[#0A1420]">
                    <div className="p-6">
                        <div className="text-sm text-[#8899AA] mb-1 uppercase tracking-wide font-semibold">Total Pending</div>
                        <div className="text-3xl font-bold text-white">4</div>
                    </div>
                    <div className="p-6">
                        <div className="text-sm text-[#FF4444] mb-1 uppercase tracking-wide font-semibold flex items-center gap-1"><AlertTriangle size={14} /> Overdue</div>
                        <div className="text-3xl font-bold text-[#FF4444]">1</div>
                    </div>
                    <div className="p-6">
                        <div className="text-sm text-[#00E5A0] mb-1 uppercase tracking-wide font-semibold">Completed (30d)</div>
                        <div className="text-3xl font-bold text-[#00E5A0]">12</div>
                    </div>
                </div>

                <div className="p-2">
                    {tasks.map(t => {
                        const Icon = t.icon;
                        return (
                            <div key={t.id} className="flex items-center justify-between p-4 hover:bg-[#1A2A3A] rounded-xl transition-colors group">
                                <div className="flex items-center gap-4">
                                    <button className="text-[#445566] hover:text-[#00E5A0] transition-colors">
                                        {t.st === "Done" ? <CheckCircle2 size={24} color="#00E5A0" /> : <Circle size={24} />}
                                    </button>
                                    <div className="w-10 h-10 rounded-lg bg-[#060B14] border border-[#1A2A3A] flex items-center justify-center flex-shrink-0" style={{ color: t.c }}>
                                        <Icon size={18} />
                                    </div>
                                    <div>
                                        <div className={`text-base font-semibold mb-1 ${t.st === "Done" ? "text-[#8899AA] line-through" : "text-white group-hover:text-[#00E5A0] transition-colors"}`}>{t.t}</div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-[#1A2A3A] text-[#8899AA]">{t.type}</span>
                                            {t.st !== "Done" && (
                                                <span className={`text-xs ${t.st === "Overdue" ? "text-[#FF4444] font-semibold" : t.due === "Tomorrow" ? "text-[#FFB800]" : "text-[#445566]"}`}>
                                                    Due: {t.due}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {t.st !== "Done" && (
                                    <Button variant="secondary" className="h-9 opacity-0 group-hover:opacity-100 transition-opacity">Start Action</Button>
                                )}
                            </div>
                        )
                    })}
                </div>

            </div>

        </div>
    );
}
