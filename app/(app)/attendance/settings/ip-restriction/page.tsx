"use client";

import Page from "@/components/ui/Page";

import React, { useState } from "react";
import { Save, Shield, Plus, Trash2, CheckCircle2, XCircle } from "lucide-react";

const INITIAL_WHITELIST = [
    { id: 1, label: "Head Office - Mumbai", ip: "103.45.67.89", type: "Static", active: true },
    { id: 2, label: "Delhi Branch", ip: "202.16.45.0/24", type: "Range", active: true },
    { id: 3, label: "Pune Office", ip: "115.248.12.55", type: "Static", active: false },
];

function Toggle({ on, onChange }: { on: boolean; onChange: () => void }) {
    return (
        <button onClick={onChange} className={`w-10 h-5 rounded-full transition-colors relative ${on ? "bg-[#00E5A0]" : "bg-[#1A2A3A]"}`}>
            <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${on ? "translate-x-5" : "translate-x-0.5"}`} />
        </button>
    );
}

export default function IPRestriction() {
    const [whitelist, setWhitelist] = useState(INITIAL_WHITELIST);
    const [enabled, setEnabled] = useState(true);
    const [blockMsg, setBlockMsg] = useState("You are not on an approved network. Please connect to office WiFi.");
    const [saved, setSaved] = useState(false);
    const [showAdd, setShowAdd] = useState(false);
    const [newIp, setNewIp] = useState({ label: "", ip: "", type: "Static" });

    const toggleEntry = (id: number) => setWhitelist(w => w.map(e => e.id === id ? { ...e, active: !e.active } : e));
    const removeEntry = (id: number) => setWhitelist(w => w.filter(e => e.id !== id));
    const addEntry = () => {
        if (!newIp.ip || !newIp.label) return;
        setWhitelist(w => [...w, { id: Date.now(), ...newIp, active: true }]);
        setNewIp({ label: "", ip: "", type: "Static" });
        setShowAdd(false);
    };
    const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

    return (
        <Page
            title="Ip Restriction"
            breadcrumbs={[{ label: "Attendance", href: "/attendance/dashboard" }, { label: "Settings", href: "/attendance/settings" }, { label: "Ip Restriction" }]}
            maxWidth="900px"
        >

        <div className="p-6 md:p-8 max-w-[900px] mx-auto text-white">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold flex items-center gap-2"><Shield className="w-6 h-6 text-[#0066FF]" /> IP Restriction</h2>
                    <p className="text-sm text-[#8899AA] mt-1">Allow attendance marking only from approved IP addresses or networks</p>
                </div>
                <button onClick={save}
                    className={`px-4 py-2 text-sm font-bold rounded-xl flex items-center gap-2 ${saved ? "bg-[#00E5A0]/20 text-[#00E5A0] border border-[#00E5A0]/30" : "bg-[#00E5A0] text-[#060B14] hover:bg-[#00c98d]"}`}>
                    <Save className="w-4 h-4" /> {saved ? "Saved ✅" : "Save"}
                </button>
            </div>

            {/* Master Toggle */}
            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 mb-5">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="font-semibold">Enable IP Restriction</p>
                        <p className="text-xs text-[#8899AA] mt-1">When enabled, attendance can only be marked from whitelisted IPs</p>
                    </div>
                    <Toggle on={enabled} onChange={() => setEnabled(e => !e)} />
                </div>
                {enabled && (
                    <div className="mt-4 bg-[#0066FF]/5 border border-[#0066FF]/20 rounded-xl p-4">
                        <p className="text-xs font-medium text-[#0066FF] mb-2">Block Message (shown to restricted users)</p>
                        <input value={blockMsg} onChange={e => setBlockMsg(e.target.value)}
                            className="w-full bg-[#060B14] border border-[#1A2A3A] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#0066FF]" />
                    </div>
                )}
            </div>

            {/* Whitelist Table */}
            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden mb-4">
                <div className="flex items-center justify-between px-6 py-4 border-b border-[#1A2A3A]">
                    <h3 className="font-semibold">IP Whitelist ({whitelist.filter(e => e.active).length} active)</h3>
                    <button onClick={() => setShowAdd(s => !s)}
                        className="px-3 py-1.5 text-xs font-semibold bg-[#00E5A0]/10 text-[#00E5A0] border border-[#00E5A0]/30 rounded-lg flex items-center gap-1 hover:bg-[#00E5A0]/20">
                        <Plus className="w-3 h-3" /> Add IP
                    </button>
                </div>

                {showAdd && (
                    <div className="px-6 py-4 bg-[#060B14] border-b border-[#1A2A3A] flex gap-3 items-center">
                        <input value={newIp.label} onChange={e => setNewIp(p => ({ ...p, label: e.target.value }))} placeholder="Label (e.g. Branch Name)"
                            className="flex-1 bg-[#0D1928] border border-[#1A2A3A] rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-[#00E5A0]" />
                        <input value={newIp.ip} onChange={e => setNewIp(p => ({ ...p, ip: e.target.value }))} placeholder="IP or CIDR (e.g. 192.168.1.0/24)"
                            className="flex-1 bg-[#0D1928] border border-[#1A2A3A] rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-[#00E5A0]" />
                        <select value={newIp.type} onChange={e => setNewIp(p => ({ ...p, type: e.target.value }))}
                            className="bg-[#0D1928] border border-[#1A2A3A] rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none">
                            <option>Static</option><option>Range</option>
                        </select>
                        <button onClick={addEntry} className="px-3 py-1.5 text-xs font-semibold bg-[#00E5A0] text-[#060B14] rounded-lg hover:bg-[#00c98d]">Add</button>
                    </div>
                )}

                <table className="w-full text-sm">
                    <thead className="bg-[#0A1420] text-[#8899AA] text-xs">
                        <tr>
                            <th className="px-6 py-3 text-left">Label</th>
                            <th className="px-6 py-3 text-left">IP / Range</th>
                            <th className="px-6 py-3 text-center">Type</th>
                            <th className="px-6 py-3 text-center">Status</th>
                            <th className="px-6 py-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1A2A3A]">
                        {whitelist.map(e => (
                            <tr key={e.id} className="hover:bg-[#1A2A3A]/50 transition-colors">
                                <td className="px-6 py-3 font-medium">{e.label}</td>
                                <td className="px-6 py-3 font-mono text-sm text-[#00E5A0]">{e.ip}</td>
                                <td className="px-6 py-3 text-center">
                                    <span className="text-xs bg-[#1A2A3A] text-[#8899AA] px-2 py-0.5 rounded-full">{e.type}</span>
                                </td>
                                <td className="px-6 py-3 text-center">
                                    <div className="flex items-center justify-center gap-1">
                                        {e.active ? <CheckCircle2 className="w-4 h-4 text-[#00E5A0]" /> : <XCircle className="w-4 h-4 text-[#445566]" />}
                                        <span className={`text-xs ${e.active ? "text-[#00E5A0]" : "text-[#445566]"}`}>{e.active ? "Active" : "Inactive"}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-3 text-center">
                                    <div className="flex items-center justify-center gap-3">
                                        <Toggle on={e.active} onChange={() => toggleEntry(e.id)} />
                                        <button onClick={() => removeEntry(e.id)} className="text-[#FF4444] hover:text-red-400"><Trash2 className="w-4 h-4" /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <p className="text-xs text-[#445566]">💡 WFH and mobile attendance will bypass IP restriction when WFH mode is active for an employee.</p>
        </div>
    
        </Page>
        );
}
