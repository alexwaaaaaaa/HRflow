"use client";

import React, { useState } from "react";
import {
    MapPin, Plus, Trash2, Edit2, Wifi, Navigation,
    CheckCircle2, AlertCircle, ChevronRight, Users, Search
} from "lucide-react";

interface Location {
    id: number;
    name: string;
    address: string;
    radius: number;
    employees: number;
    type: "office" | "client" | "warehouse";
    active: boolean;
}

const INITIAL_LOCATIONS: Location[] = [
    { id: 1, name: "Mumbai HQ", address: "Plot 45, Andheri Ind. Area, Mumbai — 400058", radius: 200, employees: 312, type: "office", active: true },
    { id: 2, name: "Bengaluru Office", address: "Prestige Tech Park, Outer Ring Road, BLR", radius: 150, employees: 218, type: "office", active: true },
    { id: 3, name: "Pune Office", address: "Hinjewadi Phase 2, IT Park, Pune — 411057", radius: 200, employees: 156, type: "office", active: true },
    { id: 4, name: "Delhi NCR Office", address: "Cybercity, Gurugram, Haryana — 122002", radius: 250, employees: 89, type: "office", active: false },
    { id: 5, name: "Chennai Warehouse", address: "Ambattur Industrial Estate, Chennai — 600058", radius: 100, employees: 44, type: "warehouse", active: true },
];

const TYPE_MAP = {
    office: { label: "Office", color: "#00E5A0" },
    client: { label: "Client", color: "#0066FF" },
    warehouse: { label: "Warehouse", color: "#FFB800" },
};

export default function GeofenceSetup() {
    const [locations, setLocations] = useState<Location[]>(INITIAL_LOCATIONS);
    const [selected, setSelected] = useState<Location | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [radius, setRadius] = useState(200);
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [locType, setLocType] = useState<"office" | "client" | "warehouse">("office");
    const [useMap, setUseMap] = useState(false);
    const [saving, setSaving] = useState(false);
    const [search, setSearch] = useState("");

    function saveLocation() {
        if (!name.trim()) return;
        setSaving(true);
        setTimeout(() => {
            setLocations(prev => [...prev, {
                id: prev.length + 1, name, address, radius, employees: 0, type: locType, active: true
            }]);
            setSaving(false);
            setShowForm(false);
            setName(""); setAddress("");
        }, 1200);
    }

    function toggleActive(id: number) {
        setLocations(prev => prev.map(l => l.id === id ? { ...l, active: !l.active } : l));
    }

    function deleteLocation(id: number) {
        setLocations(prev => prev.filter(l => l.id !== id));
        if (selected?.id === id) setSelected(null);
    }

    const filtered = locations.filter(l =>
        l.name.toLowerCase().includes(search.toLowerCase()) ||
        l.address.toLowerCase().includes(search.toLowerCase())
    );

    const totalEmployees = locations.filter(l => l.active).reduce((s, l) => s + l.employees, 0);

    return (
        <div className="p-6 md:p-8 max-w-[1200px] mx-auto text-white">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-1">Geofence Setup</h1>
                    <p className="text-sm text-[#8899AA]">Define location boundaries for mobile attendance check-in</p>
                </div>
                <button onClick={() => { setShowForm(!showForm); setSelected(null); }}
                    className="flex items-center gap-2 h-10 px-4 bg-[#00E5A0] text-[#060B14] text-sm font-semibold rounded-xl hover:bg-[#00c98d] transition-colors">
                    <Plus size={16} /> Add Location
                </button>
            </div>

            {/* KPI bar */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                {[
                    { label: "Active Zones", value: locations.filter(l => l.active).length, color: "#00E5A0", icon: <Wifi size={16} /> },
                    { label: "Inactive Zones", value: locations.filter(l => !l.active).length, color: "#8899AA", icon: <AlertCircle size={16} /> },
                    { label: "Covered Employees", value: totalEmployees, color: "#0066FF", icon: <Users size={16} /> },
                ].map(k => (
                    <div key={k.label} className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-4 flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: k.color + "18", color: k.color }}>{k.icon}</div>
                        <div>
                            <p className="text-xl font-bold text-white">{k.value}</p>
                            <p className="text-xs text-[#8899AA]">{k.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                {/* LEFT — Locations List */}
                <div className="flex-1 space-y-4">
                    {/* Search */}
                    <div className="relative">
                        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#445566]" />
                        <input value={search} onChange={e => setSearch(e.target.value)}
                            placeholder="Search office locations..."
                            className="w-full h-10 bg-[#0D1928] border border-[#1A2A3A] rounded-xl pl-9 pr-4 text-sm text-white placeholder-[#445566] focus:outline-none focus:border-[#00E5A0] transition-colors" />
                    </div>

                    {/* Location cards */}
                    <div className="space-y-3">
                        {filtered.map(loc => {
                            const typ = TYPE_MAP[loc.type];
                            const isSelected = selected?.id === loc.id;
                            return (
                                <div key={loc.id}
                                    className={`bg-[#0D1928] border rounded-xl p-4 cursor-pointer transition-all hover:border-[#2A3A4A] ${isSelected ? "border-[#00E5A0]/50 shadow-[0_0_0_1px_rgba(0,229,160,0.2)]" : "border-[#1A2A3A]"}`}
                                    onClick={() => setSelected(loc)}
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex items-start gap-3 min-w-0">
                                            <div className="w-9 h-9 rounded-lg bg-[#1A2A3A] flex items-center justify-center shrink-0 mt-0.5">
                                                <MapPin size={16} style={{ color: typ.color }} />
                                            </div>
                                            <div className="min-w-0">
                                                <div className="flex items-center gap-2 mb-0.5">
                                                    <p className="font-semibold text-sm text-white">{loc.name}</p>
                                                    <span className="text-[9px] px-1.5 py-0.5 rounded font-medium" style={{ background: typ.color + "18", color: typ.color }}>{typ.label}</span>
                                                    {!loc.active && <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#FF4444]/10 text-[#FF4444] font-medium">Inactive</span>}
                                                </div>
                                                <p className="text-[11px] text-[#8899AA] truncate">{loc.address}</p>
                                                <div className="flex items-center gap-3 mt-1.5 text-[10px] text-[#445566]">
                                                    <span className="flex items-center gap-1"><Navigation size={10} /> {loc.radius}m radius</span>
                                                    <span className="flex items-center gap-1"><Users size={10} /> {loc.employees} employees</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1 shrink-0">
                                            {/* Toggle active */}
                                            <button onClick={(e) => { e.stopPropagation(); toggleActive(loc.id); }}
                                                className={`w-9 h-5 rounded-full transition-colors relative ${loc.active ? "bg-[#00E5A0]" : "bg-[#1A2A3A]"}`}>
                                                <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform ${loc.active ? "translate-x-4" : "translate-x-0.5"}`} />
                                            </button>
                                            <button onClick={(e) => { e.stopPropagation(); setSelected(loc); setShowForm(false); }}
                                                className="p-1.5 hover:bg-[#1A2A3A] rounded-lg text-[#8899AA] hover:text-white transition-colors">
                                                <Edit2 size={13} />
                                            </button>
                                            <button onClick={(e) => { e.stopPropagation(); deleteLocation(loc.id); }}
                                                className="p-1.5 hover:bg-[#FF4444]/10 rounded-lg text-[#8899AA] hover:text-[#FF4444] transition-colors">
                                                <Trash2 size={13} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* RIGHT — Add form or location detail */}
                <div className="w-full lg:w-[360px] shrink-0">
                    {showForm && (
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 space-y-4">
                            <h3 className="text-lg font-semibold">Add New Location</h3>
                            <div>
                                <label className="block text-xs text-[#8899AA] mb-1.5">Location Name *</label>
                                <input value={name} onChange={e => setName(e.target.value)} placeholder="Hyderabad Office"
                                    className="w-full h-10 bg-[#060B14] border border-[#1A2A3A] rounded-xl px-3 text-sm text-white placeholder-[#445566] focus:outline-none focus:border-[#00E5A0] transition-colors" />
                            </div>
                            <div>
                                <label className="block text-xs text-[#8899AA] mb-1.5">Address *</label>
                                <textarea rows={2} value={address} onChange={e => setAddress(e.target.value)}
                                    placeholder="Building, Street, City, Pin..."
                                    className="w-full bg-[#060B14] border border-[#1A2A3A] rounded-xl px-3 py-2.5 text-sm text-white placeholder-[#445566] focus:outline-none focus:border-[#00E5A0] resize-none transition-colors" />
                            </div>
                            <div>
                                <label className="block text-xs text-[#8899AA] mb-1.5">Location Type</label>
                                <div className="flex gap-2">
                                    {(["office", "client", "warehouse"] as const).map(t => (
                                        <button key={t} onClick={() => setLocType(t)}
                                            className={`flex-1 h-9 text-xs capitalize rounded-lg border transition-all ${locType === t ? "border-[#00E5A0]/50 bg-[#00E5A0]/10 text-[#00E5A0]" : "border-[#1A2A3A] text-[#8899AA] hover:bg-[#1A2A3A]"}`}>
                                            {t}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center justify-between mb-1.5">
                                    <label className="text-xs text-[#8899AA]">Check-in Radius</label>
                                    <span className="text-xs font-semibold text-[#00E5A0]">{radius}m</span>
                                </div>
                                <input type="range" min={50} max={500} step={25} value={radius} onChange={e => setRadius(+e.target.value)}
                                    className="w-full accent-[#00E5A0]" />
                                <div className="flex justify-between text-[10px] text-[#445566] mt-1">
                                    <span>50m</span><span>275m</span><span>500m</span>
                                </div>
                            </div>
                            {/* Map placeholder */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label className="text-xs text-[#8899AA]">Pin on Map</label>
                                    <button onClick={() => setUseMap(m => !m)}
                                        className={`w-9 h-5 rounded-full transition-colors relative ${useMap ? "bg-[#00E5A0]" : "bg-[#1A2A3A]"}`}>
                                        <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform ${useMap ? "translate-x-4" : "translate-x-0.5"}`} />
                                    </button>
                                </div>
                                {useMap && (
                                    <div className="w-full h-40 bg-[#060B14] border border-[#1A2A3A] rounded-xl flex items-center justify-center">
                                        <div className="text-center">
                                            <MapPin className="w-8 h-8 text-[#445566] mx-auto mb-1.5" />
                                            <p className="text-xs text-[#8899AA]">Google Maps integration</p>
                                            <p className="text-[10px] text-[#445566]">Click to drop pin · Radius circle shown</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="flex gap-3">
                                <button onClick={() => setShowForm(false)} className="flex-1 h-10 bg-transparent border border-[#1A2A3A] text-sm text-white rounded-xl hover:bg-[#1A2A3A] transition-colors">
                                    Cancel
                                </button>
                                <button onClick={saveLocation} disabled={!name.trim() || saving}
                                    className="flex-1 h-10 bg-[#00E5A0] text-[#060B14] text-sm font-semibold rounded-xl hover:bg-[#00c98d] transition-colors disabled:opacity-50">
                                    {saving ? "Saving..." : "Save Location"}
                                </button>
                            </div>
                        </div>
                    )}

                    {selected && !showForm && (
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 space-y-4">
                            <div className="flex items-start justify-between">
                                <div>
                                    <h3 className="text-base font-semibold text-white">{selected.name}</h3>
                                    <p className="text-xs text-[#8899AA] mt-1">{selected.address}</p>
                                </div>
                                <div className="flex items-center gap-1.5 text-[11px] px-2 py-1 rounded-full" style={{ background: selected.active ? "rgba(0,229,160,0.1)" : "rgba(255,68,68,0.1)", color: selected.active ? "#00E5A0" : "#FF4444" }}>
                                    {selected.active ? <CheckCircle2 size={11} /> : <AlertCircle size={11} />}
                                    {selected.active ? "Active" : "Inactive"}
                                </div>
                            </div>
                            <div className="w-full h-48 bg-[#060B14] border border-[#1A2A3A] rounded-xl flex items-center justify-center relative overflow-hidden">
                                {/* Simulated map with animated radius circle */}
                                <div className="absolute w-24 h-24 rounded-full border-2 border-[#00E5A0]/30 bg-[#00E5A0]/5 animate-ping" />
                                <div className="absolute w-16 h-16 rounded-full border border-[#00E5A0]/50 bg-[#00E5A0]/10" />
                                <div className="absolute w-4 h-4 rounded-full bg-[#00E5A0] flex items-center justify-center">
                                    <MapPin size={10} className="text-[#060B14]" />
                                </div>
                                <p className="absolute bottom-3 text-[10px] text-[#445566]">Geofence radius: {selected.radius}m</p>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    { label: "Radius", value: `${selected.radius}m` },
                                    { label: "Employees", value: selected.employees },
                                    { label: "Type", value: TYPE_MAP[selected.type].label },
                                    { label: "Mode", value: selected.active ? "Active" : "Paused" },
                                ].map(d => (
                                    <div key={d.label} className="bg-[#0A1420] rounded-xl p-3">
                                        <p className="text-[10px] text-[#445566] mb-0.5">{d.label}</p>
                                        <p className="text-sm font-semibold text-white">{d.value}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="flex gap-2">
                                <button className="flex-1 h-9 bg-[#1A2A3A] text-sm text-white rounded-xl hover:bg-[#243040] transition-colors flex items-center justify-center gap-1.5">
                                    <Edit2 size={13} /> Edit
                                </button>
                                <button className="flex-1 h-9 bg-[#FF4444]/10 text-sm text-[#FF4444] rounded-xl hover:bg-[#FF4444]/20 transition-colors flex items-center justify-center gap-1.5"
                                    onClick={() => deleteLocation(selected.id)}>
                                    <Trash2 size={13} /> Delete
                                </button>
                            </div>
                        </div>
                    )}

                    {!showForm && !selected && (
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-8 text-center">
                            <MapPin size={36} className="text-[#445566] mx-auto mb-3" />
                            <p className="text-sm text-[#8899AA]">Select a location to view details or click Add Location</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
