"use client";

import { X, Search, UserPlus, FileText, Download, Upload, Calculator, Send, Zap, ChevronRight } from "lucide-react";
import Button from "@/components/ui/Button";

export default function QuickActionsModal() {
    const categories = [
        {
            name: "Employee Management",
            actions: [
                { i: UserPlus, l: "Add New Employee", d: "Onboard a new hire", c: "#00E5A0" },
                { i: Upload, l: "Bulk Import", d: "Upload CSV template", c: "#0066FF" },
                { i: Zap, l: "Change Employment Status", d: "Convert intern to full-time", c: "#8899AA" }
            ]
        },
        {
            name: "Payroll & Finance",
            actions: [
                { i: FileText, l: "Generate Payslip", d: "Create ad-hoc payslip", c: "#FFB800" },
                { i: Calculator, l: "Run Full & Final", d: "Process exit settlement", c: "#FF4444" },
                { i: Download, l: "Download Form 16", d: "Get tax documents", c: "#00E5A0" }
            ]
        },
        {
            name: "Communication",
            actions: [
                { i: Send, l: "New Announcement", d: "Company-wide blast", c: "#0066FF" },
                { i: Zap, l: "Request Feedback", d: "Send pulse survey", c: "#8899AA" }
            ]
        }
    ];

    return (
        <div style={{ padding: "24px 32px", paddingBottom: 64 }} className="animate-fade-in relative min-h-[calc(100vh-64px)] overflow-hidden">

            {/* Background Dim (simulating modal on page) */}
            <div className="absolute inset-0 bg-[#060B14] opacity-50 z-0 pointer-events-none" />

            {/* Drawer Container */}
            <div className="absolute top-0 right-0 bottom-0 w-[480px] bg-[#0A1420] border-l border-[#1A2A3A] shadow-[-10px_0_40px_rgba(0,0,0,0.5)] z-10 flex flex-col transform transition-transform duration-300">

                {/* Header */}
                <div className="p-6 border-b border-[#1A2A3A] flex justify-between items-center bg-[#0D1928]">
                    <h2 style={{ fontSize: 20, fontWeight: 600, color: "#FFFFFF", margin: 0 }}>Quick Actions</h2>
                    <button className="w-8 h-8 rounded-full flex items-center justify-center bg-[#1A2A3A] hover:bg-[#445566] text-white transition-colors">
                        <X size={16} />
                    </button>
                </div>

                {/* Search */}
                <div className="p-6 pb-2">
                    <div className="relative">
                        <Search size={18} color="#8899AA" className="absolute left-4 top-1/2 -translate-y-1/2" />
                        <input autoFocus type="text" placeholder="Search actions..." className="w-full h-12 bg-[#060B14] border border-[#1A2A3A] rounded-xl pl-12 pr-4 text-white focus:border-[#00E5A0] outline-none transition-colors" />
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-6">
                    {categories.map((cat, i) => (
                        <div key={i}>
                            <h3 style={{ fontSize: 13, fontWeight: 700, color: "#445566", textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>{cat.name}</h3>
                            <div className="flex flex-col gap-2">
                                {cat.actions.map((act, j) => {
                                    const Icon = act.i;
                                    return (
                                        <button key={j} className="flex items-center p-3 rounded-xl hover:bg-[#1A2A3A] border border-transparent hover:border-[#445566] transition-all group text-left w-full">
                                            <div className="w-10 h-10 rounded bg-[#060B14] border border-[#1A2A3A] flex items-center justify-center flex-shrink-0 group-hover:border-[rgba(0,229,160,0.5)] transition-colors">
                                                <Icon size={18} color={act.c} />
                                            </div>
                                            <div className="ml-4 flex-1">
                                                <div style={{ fontSize: 14, fontWeight: 600, color: "#FFFFFF" }} className="group-hover:text-[#00E5A0] transition-colors">{act.l}</div>
                                                <div style={{ fontSize: 12, color: "#8899AA", marginTop: 2 }}>{act.d}</div>
                                            </div>
                                            <ChevronRight size={16} color="#445566" className="group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    )
                                })}
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}
