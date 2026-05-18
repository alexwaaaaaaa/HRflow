"use client";

import Page from "@/components/ui/Page";

import React, { useState } from "react";
import { MapPin, Plus, Edit2, ToggleLeft } from "lucide-react";
import Link from "next/link";

const LOCATIONS = [
    { name: "Mumbai HQ", address: "Andheri, Mumbai", radius: 200, employees: 312, methods: "GPS + WiFi + Bio", active: true },
    { name: "Bengaluru Office", address: "Koramangala, Bengaluru", radius: 150, employees: 218, methods: "GPS + Bio", active: true },
    { name: "Pune Office", address: "Hinjewadi, Pune", radius: 200, employees: 156, methods: "GPS + WiFi", active: true },
    { name: "Delhi Office", address: "Connaught Place, Delhi", radius: 100, employees: 98, methods: "GPS", active: true },
    { name: "Chennai Office", address: "OMR, Chennai", radius: 200, employees: 63, methods: "GPS + Bio", active: true },
];

export default function GeofenceLocations() {
    const [locs, setLocs] = useState(LOCATIONS);

    return (
        <Page
            title="Office Locations & Geofences"
            breadcrumbs={[{ label: "Attendance", href: "/attendance/dashboard" }, { label: "Geofence", href: "/attendance/geofence" }, { label: "Locations" }]}
            maxWidth="1200px"
        >

        <div className="p-6 md:p-8 max-w-[1200px] mx-auto text-white">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold">Office Locations & Geofences</h2>
                    <p className="text-sm text-[#8899AA] mt-1">{locs.length} locations configured • 847 employees assigned</p>
                </div>
                <Link href="/attendance/geofence/setup"
                    className="px-4 py-2 bg-[#00E5A0] text-[#060B14] text-sm font-bold rounded-lg hover:bg-[#00c98d] flex items-center gap-2">
                    <Plus className="w-4 h-4" /> Add Location
                </Link>
            </div>

            {/* MAP OVERVIEW */}
            <div className="w-full h-[260px] bg-[#0D1928] border border-[#1A2A3A] rounded-2xl flex items-center justify-center mb-6 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-[#0066FF] to-[#00E5A0]" />
                {[
                    { x: "20%", y: "55%", color: "#00E5A0", label: "Mumbai HQ", radius: 200 },
                    { x: "55%", y: "65%", color: "#0066FF", label: "Bengaluru", radius: 150 },
                    { x: "38%", y: "55%", color: "#FFB800", label: "Pune", radius: 200 },
                    { x: "38%", y: "30%", color: "#9B59B6", label: "Delhi", radius: 100 },
                    { x: "50%", y: "70%", color: "#FF6B35", label: "Chennai", radius: 200 },
                ].map((p, i) => (
                    <div key={i} className="absolute flex flex-col items-center" style={{ left: p.x, top: p.y }}>
                        <div className="w-5 h-5 rounded-full border-2 border-white shadow-lg" style={{ backgroundColor: p.color }} />
                        <p className="text-[10px] text-white bg-black/70 px-1.5 py-0.5 rounded mt-0.5">{p.label}</p>
                    </div>
                ))}
                <p className="text-sm text-[#445566]">India Office Locations Map</p>
            </div>

            {/* TABLE */}
            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-[#0A1420] text-[#8899AA] text-xs">
                            <tr>
                                <th className="px-5 py-3 text-left font-medium">Location Name</th>
                                <th className="px-5 py-3 text-left font-medium">Address</th>
                                <th className="px-5 py-3 text-center font-medium">Radius</th>
                                <th className="px-5 py-3 text-center font-medium">Employees</th>
                                <th className="px-5 py-3 text-left font-medium">Check-in Methods</th>
                                <th className="px-5 py-3 text-center font-medium">Status</th>
                                <th className="px-5 py-3 text-center font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1A2A3A]">
                            {locs.map((loc, i) => (
                                <tr key={i} className="hover:bg-[#1A2A3A]/40 transition-colors">
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-2">
                                            <MapPin className="w-4 h-4 text-[#00E5A0]" />
                                            <span className="font-medium">{loc.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-5 py-4 text-[#8899AA]">{loc.address}</td>
                                    <td className="px-5 py-4 text-center">
                                        <span className="bg-[#1A2A3A] px-2.5 py-1 rounded-full text-xs">{loc.radius}m</span>
                                    </td>
                                    <td className="px-5 py-4 text-center">{loc.employees}</td>
                                    <td className="px-5 py-4 text-[#8899AA] text-xs">{loc.methods}</td>
                                    <td className="px-5 py-4 text-center">
                                        <span className="bg-[#00E5A0]/10 text-[#00E5A0] text-xs px-2.5 py-1 rounded-full border border-[#00E5A0]/30">✅ Active</span>
                                    </td>
                                    <td className="px-5 py-4">
                                        <div className="flex items-center justify-center gap-2">
                                            <button className="p-1.5 hover:bg-[#1A2A3A] rounded-lg"><Edit2 className="w-3.5 h-3.5 text-[#8899AA]" /></button>
                                            <button onClick={() => setLocs(l => l.map((x, j) => j === i ? { ...x, active: !x.active } : x))}
                                                className="p-1.5 hover:bg-[#FFB800]/10 rounded-lg"><ToggleLeft className="w-3.5 h-3.5 text-[#FFB800]" /></button>
                                        </div>
                                    </td>
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
