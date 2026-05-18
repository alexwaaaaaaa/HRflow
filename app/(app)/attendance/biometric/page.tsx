"use client";

import Page from "@/components/ui/Page";

import React, { useState } from "react";
import { Wifi, WifiOff, RefreshCw, Plus, AlertTriangle } from "lucide-react";

const DEVICES = [
    { id: "BIO-001", loc: "Mumbai HQ Gate 1", model: "ZKTeco F22", sync: "2 min ago", status: "Online", emp: 312, battery: null },
    { id: "BIO-002", loc: "Mumbai HQ Gate 2", model: "ZKTeco F22", sync: "2 min ago", status: "LowBattery", emp: 312, battery: 15 },
    { id: "BIO-003", loc: "Pune Office", model: "eSSL X990", sync: "5 min ago", status: "Online", emp: 156, battery: null },
    { id: "BIO-004", loc: "Bengaluru Office", model: "Suprema BioLite", sync: "4 days ago", status: "Offline", emp: 218, battery: null },
    { id: "BIO-005", loc: "Chennai Office", model: "ZKTeco K40", sync: "8 min ago", status: "Online", emp: 63, battery: null },
];

const STATUS_CFG: Record<string, { cls: string; label: string; icon: React.ReactNode }> = {
    Online: { cls: "bg-[#00E5A0]/10 text-[#00E5A0] border border-[#00E5A0]/30", label: "✅ Online", icon: <Wifi className="w-4 h-4 text-[#00E5A0]" /> },
    LowBattery: { cls: "bg-[#FFB800]/10 text-[#FFB800] border border-[#FFB800]/30", label: "⚠️ Low Battery", icon: <Wifi className="w-4 h-4 text-[#FFB800]" /> },
    Offline: { cls: "bg-[#FF4444]/10 text-[#FF4444] border border-[#FF4444]/30", label: "❌ Offline", icon: <WifiOff className="w-4 h-4 text-[#FF4444]" /> },
};

export default function BiometricIntegration() {
    const [devices] = useState(DEVICES);
    const [syncing, setSyncing] = useState(false);

    return (
        <Page
            title="Biometric Device Integration"
            breadcrumbs={[{ label: "Attendance", href: "/attendance/dashboard" }, { label: "Biometric" }]}
            maxWidth="1200px"
        >

        <div className="p-6 md:p-8 max-w-[1200px] mx-auto text-white">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold">Biometric Device Integration</h2>
                    <p className="text-sm text-[#8899AA] mt-1">{devices.length} devices configured • Last sync: 2 min ago</p>
                </div>
                <button onClick={() => { setSyncing(true); setTimeout(() => setSyncing(false), 2000); }}
                    className="px-4 py-2 bg-[#0066FF]/10 text-[#0066FF] border border-[#0066FF]/30 text-sm font-semibold rounded-lg flex items-center gap-2 hover:bg-[#0066FF]/20">
                    <RefreshCw className={`w-4 h-4 ${syncing ? "animate-spin" : ""}`} /> Sync Now
                </button>
            </div>

            {/* OFFLINE ALERT */}
            <div className="bg-[#FF4444]/5 border border-[#FF4444]/30 rounded-xl px-5 py-4 mb-6 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-[#FF4444] shrink-0 mt-0.5" />
                <div>
                    <p className="text-sm font-medium text-[#FF4444]">BIO-004 — Bengaluru Office is OFFLINE since 08/11/2024</p>
                    <p className="text-sm text-[#8899AA]">218 employees may not be able to mark biometric attendance.</p>
                    <button className="text-xs text-[#0066FF] hover:underline mt-1">Troubleshoot →</button>
                </div>
            </div>

            {/* DEVICE CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {devices.map((d, i) => {
                    const cfg = STATUS_CFG[d.status];
                    return (
                        <div key={i} className={`bg-[#0D1928] border rounded-2xl p-5 ${d.status === "Offline" ? "border-[#FF4444]/30" : "border-[#1A2A3A]"}`}>
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-2">{cfg.icon}<span className="font-semibold">{d.id}</span></div>
                                <span className={`text-xs px-2 py-0.5 rounded-full ${cfg.cls}`}>{cfg.label}</span>
                            </div>
                            <p className="text-sm text-[#8899AA] mb-0.5">📍 {d.loc}</p>
                            <p className="text-xs text-[#445566] mb-0.5">Model: {d.model}</p>
                            <p className="text-xs text-[#445566] mb-0.5">Last sync: {d.sync}</p>
                            <p className="text-sm font-medium text-[#00E5A0] mt-2">{d.emp} employees mapped</p>
                            {d.battery && <p className="text-xs text-[#FFB800] mt-1">🔋 Battery: {d.battery}%</p>}
                        </div>
                    );
                })}

                {/* Add device card */}
                <div className="border-2 border-dashed border-[#1A2A3A] rounded-2xl p-5 flex items-center justify-center hover:border-[#00E5A0]/50 cursor-pointer group">
                    <div className="text-center">
                        <Plus className="w-8 h-8 text-[#445566] mx-auto mb-2 group-hover:text-[#00E5A0]" />
                        <p className="text-sm text-[#8899AA] group-hover:text-white">Add Device</p>
                    </div>
                </div>
            </div>

            {/* ADD DEVICE FORM */}
            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                <h3 className="text-lg font-semibold mb-5">Setup New Device</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                    {[
                        { label: "Device Name", ph: "BIO-006" },
                        { label: "Brand", ph: "ZKTeco / eSSL / Suprema" },
                        { label: "Model", ph: "F22 / X990 / BioLite" },
                        { label: "IP Address", ph: "192.168.1.100" },
                        { label: "Port", ph: "4370" },
                        { label: "Location", ph: "Select office..." },
                    ].map(f => (
                        <div key={f.label}>
                            <label className="text-xs text-[#8899AA] block mb-1">{f.label}</label>
                            <input placeholder={f.ph} className="w-full bg-[#060B14] border border-[#1A2A3A] rounded-xl px-3 py-2.5 text-sm text-white placeholder-[#445566] focus:outline-none focus:border-[#00E5A0]" />
                        </div>
                    ))}
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 bg-[#1A2A3A] text-sm text-white rounded-xl hover:bg-[#2A3A4A]">Test Connection</button>
                    <button className="px-4 py-2 bg-[#00E5A0] text-[#060B14] text-sm font-bold rounded-xl hover:bg-[#00c98d]">Add Device</button>
                </div>
            </div>

            {/* SYNC SETTINGS */}
            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 mt-4">
                <h3 className="text-lg font-semibold mb-4">Sync Settings</h3>
                <div className="flex items-center gap-4">
                    <label className="text-sm text-[#8899AA]">Sync Frequency:</label>
                    <select className="bg-[#060B14] border border-[#1A2A3A] rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#00E5A0]">
                        <option>Every 5 min</option><option>Every 15 min</option><option>Every 30 min</option><option>Manual only</option>
                    </select>
                </div>
            </div>
        </div>
    
        </Page>
        );
}
