"use client";

import Page from "@/components/ui/Page";

import { useState, useEffect } from "react";
import { RefreshCw, Download, Printer } from "lucide-react";
import { seededFloats } from "@/lib/random";

const LOCATIONS = ["Mumbai HQ — Gate 1", "Mumbai HQ — Gate 2", "Pune Office", "Bengaluru Office"];

const QR_LOG = [
    { name: "Priya Mehta", time: "09:02 AM", location: "Mumbai HQ Gate 1", status: "✅ Success" },
    { name: "Rohan Desai", time: "09:05 AM", location: "Mumbai HQ Gate 1", status: "✅ Success" },
    { name: "Suresh Kumar", time: "09:12 AM", location: "Pune Office", status: "✅ Success" },
    { name: "Ananya Patel", time: "09:15 AM", location: "Bengaluru", status: "✅ Success" },
    { name: "Vikram Singh", time: "09:22 AM", location: "Mumbai HQ Gate 2", status: "⚠️ Geofence miss" },
];

export default function QRCodeAttendance() {
    const [selectedLoc, setSelectedLoc] = useState(0);
    const [countdown, setCountdown] = useState(300); // 5 mins

    // Stable seeded QR cell pattern — deterministic per location
    const qrCells = seededFloats(selectedLoc + 1, 100);

    useEffect(() => {
        const t = setInterval(() => {
            setCountdown(c => {
                if (c <= 1) { return 300; }
                return c - 1;
            });
        }, 1000);
        return () => clearInterval(t);
    }, []);

    const minsLeft = Math.floor(countdown / 60);
    const secsLeft = countdown % 60;
    const progress = (countdown / 300) * 100;

    return (
        <Page
            title="QR Code Attendance Setup"
            subtitle="Generate and manage location-based QR codes for attendance marking"
            breadcrumbs={[{ label: "Attendance", href: "/attendance/dashboard" }, { label: "Qr" }]}
            maxWidth="1200px"
        >

        <div className="p-6 md:p-8 max-w-[1200px] mx-auto text-white">
            <h2 className="text-2xl font-bold mb-1">QR Code Attendance Setup</h2>
            <p className="text-sm text-[#8899AA] mb-6">Generate and manage location-based QR codes for attendance marking</p>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* LEFT — QR */}
                <div className="flex-1">
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                        {/* Location Tabs */}
                        <div className="flex gap-1 flex-wrap mb-6">
                            {LOCATIONS.map((loc, i) => (
                                <button key={i} onClick={() => { setSelectedLoc(i); setCountdown(300); }}
                                    className={`px-3 py-1.5 text-xs rounded-xl transition-colors ${selectedLoc === i ? "bg-[#00E5A0] text-[#060B14] font-semibold" : "bg-[#060B14] border border-[#1A2A3A] text-[#8899AA] hover:text-white"}`}>
                                    {loc.split("—")[0].trim()}
                                </button>
                            ))}
                        </div>

                        {/* QR Display */}
                        <div className="flex flex-col items-center mb-6">
                            <div className="w-52 h-52 bg-white rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-[#00E5A0]/10">
                                <div className="w-full h-full p-4">
                                    {/* Simulated QR pattern */}
                                    <div className="grid grid-cols-10 gap-0.5 w-full h-full">
                                        {qrCells.map((v, i) => (
                                            <div key={i} className="rounded-sm" style={{ backgroundColor: v > 0.5 ? "#000" : "#fff" }} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <p className="text-base font-semibold mb-1">{LOCATIONS[selectedLoc]}</p>
                            <div className="flex items-center gap-2 text-sm text-[#8899AA]">
                                <RefreshCw className="w-3.5 h-3.5" />
                                QR refreshes in: <span className="text-[#00E5A0] font-semibold">{minsLeft}:{secsLeft.toString().padStart(2, "0")}</span>
                            </div>
                            {/* Progress bar */}
                            <div className="w-full max-w-[200px] h-1 bg-[#1A2A3A] rounded-full mt-2">
                                <div className="h-1 bg-[#00E5A0] rounded-full transition-all" style={{ width: `${progress}%` }} />
                            </div>
                        </div>

                        <div className="flex gap-3 justify-center">
                            <button onClick={() => setCountdown(300)}
                                className="px-4 py-2 bg-[#1A2A3A] text-sm text-white rounded-xl hover:bg-[#2A3A4A] flex items-center gap-2">
                                <RefreshCw className="w-4 h-4" /> Regenerate
                            </button>
                            <button className="px-4 py-2 bg-[#0066FF]/10 text-[#0066FF] border border-[#0066FF]/30 text-sm rounded-xl hover:bg-[#0066FF]/20 flex items-center gap-2">
                                <Download className="w-4 h-4" /> Download
                            </button>
                            <button className="px-4 py-2 bg-[#0D1928] border border-[#1A2A3A] text-sm text-[#8899AA] rounded-xl hover:bg-[#1A2A3A] flex items-center gap-2">
                                <Printer className="w-4 h-4" /> Print All
                            </button>
                        </div>
                    </div>
                </div>

                {/* RIGHT — Settings + Log */}
                <div className="w-full lg:w-[380px] shrink-0 space-y-4">
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                        <h3 className="text-lg font-semibold mb-4">QR Code Security</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-sm font-medium">Time-based rotation</p>
                                    <p className="text-xs text-[#8899AA]">Auto-refresh interval</p>
                                </div>
                                <select className="bg-[#060B14] border border-[#1A2A3A] rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#00E5A0]">
                                    <option>Every 5 min</option><option>Every 2 min</option><option>Every 10 min</option>
                                </select>
                            </div>
                            {[
                                { label: "Geofence verify", sub: "Employee must be within 200m", on: true },
                                { label: "Face recognition", sub: "AI-powered verification (beta)", on: false },
                            ].map((s, i) => (
                                <div key={i} className="flex justify-between items-center">
                                    <div>
                                        <p className="text-sm font-medium">{s.label}</p>
                                        <p className="text-xs text-[#8899AA]">{s.sub}</p>
                                    </div>
                                    <div className={`w-10 h-5 rounded-full cursor-pointer relative ${s.on ? "bg-[#00E5A0]" : "bg-[#1A2A3A]"}`}>
                                        <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${s.on ? "translate-x-5" : "translate-x-0.5"}`} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                        <h3 className="text-lg font-semibold mb-4">Today&apos;s QR Check-ins</h3>
                        <div className="space-y-3">
                            {QR_LOG.map((log, i) => (
                                <div key={i} className="flex justify-between items-center text-sm">
                                    <div>
                                        <p className="font-medium">{log.name}</p>
                                        <p className="text-xs text-[#8899AA]">{log.time} • {log.location.split(" ").slice(-2).join(" ")}</p>
                                    </div>
                                    <span className={`text-xs ${log.status.includes("miss") ? "text-[#FFB800]" : "text-[#00E5A0]"}`}>{log.status}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    
        </Page>
        );
}
