"use client";

import Page from "@/components/ui/Page";

import React, { useState } from "react";
import { MapPin, Camera, Download } from "lucide-react";

const FV_LOG = [
    { id: 1, name: "Vikram Singh", dept: "Sales", avatar: "VS", date: "12 Nov", client: "XYZ Corp", location: "BKC, Mumbai", checkIn: "09:15 AM", checkOut: "06:30 PM", distance: "12 km", status: "Completed" },
    { id: 2, name: "Ravi Kumar", dept: "Sales", avatar: "RK", date: "12 Nov", client: "ABC Industries", location: "Andheri, Mumbai", checkIn: "10:00 AM", checkOut: "05:00 PM", distance: "8 km", status: "Ongoing" },
    { id: 3, name: "Sneha Rao", dept: "Ops", avatar: "SR", date: "11 Nov", client: "PQR Ltd.", location: "Powai, Mumbai", checkIn: "09:30 AM", checkOut: "04:00 PM", distance: "15 km", status: "Completed" },
    { id: 4, name: "Amit Sharma", dept: "Mktg", avatar: "AS", date: "11 Nov", client: "LMN Brands", location: "Worli, Mumbai", checkIn: "11:00 AM", checkOut: "07:00 PM", distance: "6 km", status: "Completed" },
    { id: 5, name: "Pooja Nair", dept: "Finance", avatar: "PN", date: "08 Nov", client: "CA Firm Visit", location: "Fort, Mumbai", checkIn: "10:30 AM", checkOut: "01:30 PM", distance: "4 km", status: "Completed" },
];

export default function FieldVisitLog() {
    const [preview, setPreview] = useState<number | null>(null);

    return (
        <Page
            title="Field Visit Log"
            subtitle="Location-stamped client/field visits • November 2024"
            breadcrumbs={[{ label: "Attendance", href: "/attendance/dashboard" }, { label: "Field Visit", href: "/attendance/field-visit" }, { label: "Log" }]}
            maxWidth="1200px"
        >

        <div className="p-6 md:p-8 max-w-[1200px] mx-auto text-white">
            <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
                <div>
                    <h2 className="text-2xl font-bold">Field Visit Log</h2>
                    <p className="text-sm text-[#8899AA] mt-1">Location-stamped client/field visits • November 2024</p>
                </div>
                <div className="flex gap-3">
                    <input type="month" defaultValue="2024-11" className="bg-[#0D1928] border border-[#1A2A3A] text-sm text-white rounded-xl px-4 py-2 focus:outline-none focus:border-[#00E5A0]" />
                    <button className="px-4 py-2 bg-[#1A2A3A] text-sm text-white rounded-xl flex items-center gap-2 hover:bg-[#2A3A4A]"><Download className="w-4 h-4" />Export</button>
                </div>
            </div>

            {/* KPI */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                {[
                    { label: "Total Field Visits (Nov)", val: "38", color: "#00E5A0" },
                    { label: "Employees on Field Today", val: "6", color: "#0066FF" },
                    { label: "Avg km per visit", val: "9.8 km", color: "#FFB800" },
                ].map((k, i) => (
                    <div key={i} className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-5">
                        <p className="text-xs text-[#8899AA] mb-1">{k.label}</p>
                        <p className="text-2xl font-bold" style={{ color: k.color }}>{k.val}</p>
                    </div>
                ))}
            </div>

            {/* TABLE */}
            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-[#0A1420] text-[#8899AA] text-xs">
                            <tr>
                                <th className="px-5 py-3 text-left">Employee</th>
                                <th className="px-5 py-3 text-left">Date</th>
                                <th className="px-5 py-3 text-left">Client/Purpose</th>
                                <th className="px-5 py-3 text-left">Location</th>
                                <th className="px-5 py-3 text-center">Check-in</th>
                                <th className="px-5 py-3 text-center">Check-out</th>
                                <th className="px-5 py-3 text-center">Distance</th>
                                <th className="px-5 py-3 text-center">Status</th>
                                <th className="px-5 py-3 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1A2A3A]">
                            {FV_LOG.map((row, i) => (
                                <tr key={i} className="hover:bg-[#1A2A3A]/50 transition-colors">
                                    <td className="px-5 py-3">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-[#1A2A3A] flex items-center justify-center text-[10px] font-bold text-[#8899AA]">{row.avatar}</div>
                                            <div>
                                                <p className="font-medium">{row.name}</p>
                                                <p className="text-xs text-[#445566]">{row.dept}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-5 py-3 text-[#8899AA]">{row.date}</td>
                                    <td className="px-5 py-3 font-medium">{row.client}</td>
                                    <td className="px-5 py-3">
                                        <span className="text-sm text-[#8899AA] flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-[#0066FF]" />{row.location}</span>
                                    </td>
                                    <td className="px-5 py-3 text-center text-[#00E5A0]">{row.checkIn}</td>
                                    <td className="px-5 py-3 text-center text-[#8899AA]">{row.checkOut}</td>
                                    <td className="px-5 py-3 text-center text-[#FFB800]">{row.distance}</td>
                                    <td className="px-5 py-3 text-center">
                                        <span className={`text-xs px-2 py-0.5 rounded-full ${row.status === "Ongoing" ? "bg-[#0066FF]/10 text-[#0066FF] border border-[#0066FF]/30" : "bg-[#00E5A0]/10 text-[#00E5A0] border border-[#00E5A0]/30"}`}>{row.status}</span>
                                    </td>
                                    <td className="px-5 py-3 text-center">
                                        <button onClick={() => setPreview(row.id)} className="text-xs text-[#0066FF] hover:underline flex items-center gap-1 mx-auto">
                                            <Camera className="w-3.5 h-3.5" /> Selfie
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* SELFIE MODAL */}
            {preview !== null && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={() => setPreview(null)}>
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-8 max-w-sm w-full mx-4">
                        <h3 className="text-lg font-semibold mb-4">Field Visit Proof — {FV_LOG.find(r => r.id === preview)?.name}</h3>
                        <div className="w-full h-52 bg-[#1A2A3A] rounded-xl flex items-center justify-center mb-3">
                            <p className="text-[#445566]">📷 Selfie at {FV_LOG.find(r => r.id === preview)?.location}</p>
                        </div>
                        <p className="text-xs text-[#8899AA]">📍 Location verified • GPS timestamp confirmed</p>
                        <button onClick={() => setPreview(null)} className="mt-4 w-full py-2 border border-[#1A2A3A] text-sm text-[#8899AA] rounded-xl hover:bg-[#1A2A3A]">Close</button>
                    </div>
                </div>
            )}
        </div>
    
        </Page>
        );
}
