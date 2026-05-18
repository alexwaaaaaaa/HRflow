"use client";

import Page from "@/components/ui/Page";

import React from 'react';
import {
    MapPin, Search, Plus, Map as MapIcon,
    Wifi, Users, Edit3, Trash2
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function GeofenceLocations() {
    const router = useRouter();

    const locations = [
        { id: 1, name: 'Mumbai Head Office', address: 'Bandra Kurla Complex, Mumbai', radius: '100m', ips: 2, users: 450, status: 'Active' },
        { id: 2, name: 'Bengaluru Branch (HSR)', address: 'Sector 2, HSR Layout, BLR', radius: '50m', ips: 1, users: 120, status: 'Active' },
        { id: 3, name: 'Delhi Sales Hub', address: 'Connaught Place, New Delhi', radius: '150m', ips: 0, users: 45, status: 'Active' },
        { id: 4, name: 'Warehouse Facility', address: 'Peenya Industrial Area, BLR', radius: '500m', ips: 0, users: 312, status: 'Inactive' },
    ];

    return (
        <Page
            title="Geofenced Locations"
            subtitle="Manage permitted physical perimeters for mobile attendance check-ins."
            breadcrumbs={[{ label: "Attendance", href: "/attendance/dashboard" }, { label: "Settings", href: "/attendance/settings" }, { label: "Geofence" }]}
            maxWidth="900px"
        >

        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-6xl mx-auto space-y-6">

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-white mb-1">Geofenced Locations</h1>
                        <p className="text-sm text-[#8899AA]">Manage permitted physical perimeters for mobile attendance check-ins.</p>
                    </div>
                    <button
                        onClick={() => router.push('/attendance/settings/geofence/new')}
                        className="px-4 py-2 bg-[#0066FF] text-white font-bold text-sm rounded-lg hover:bg-[#0052cc] transition-colors flex items-center shadow-[0_0_15px_rgba(0,102,255,0.3)]"
                    >
                        <Plus size={16} className="mr-2" /> Add Location
                    </button>
                </div>

                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl overflow-hidden shadow-lg">
                    {/* Toolbar */}
                    <div className="p-4 border-b border-[#1A2A3A] flex justify-between items-center bg-[#0A1420]">
                        <div className="relative w-64">
                            <Search size={16} className="absolute left-3 top-2.5 text-[#556677]" />
                            <input
                                type="text"
                                placeholder="Search locations..."
                                className="w-full bg-[#060B14] border border-[#1A2A3A] text-sm text-white rounded-lg pl-9 pr-3 py-2 outline-none focus:border-[#0066FF]"
                            />
                        </div>
                        <div className="flex space-x-4 text-sm text-[#8899AA] font-bold">
                            <span>Total Active: <span className="text-white">3</span></span>
                            <span>Total Users: <span className="text-white">615</span></span>
                        </div>
                    </div>

                    {/* Table */}
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-[#0A1420] border-b border-[#1A2A3A]">
                            <tr>
                                <th className="px-6 py-4 font-bold text-xs text-[#8899AA] uppercase tracking-wider">Location Name & Address</th>
                                <th className="px-6 py-4 font-bold text-xs text-[#8899AA] uppercase tracking-wider">Perimeter Radius</th>
                                <th className="px-6 py-4 font-bold text-xs text-[#8899AA] uppercase tracking-wider">Restrictions</th>
                                <th className="px-6 py-4 font-bold text-xs text-[#8899AA] uppercase tracking-wider">Assigned Users</th>
                                <th className="px-6 py-4 font-bold text-xs text-[#8899AA] uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 font-bold text-xs text-[#8899AA] uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1A2A3A]">
                            {locations.map((loc) => (
                                <tr key={loc.id} className="hover:bg-[#1A2A3A]/30 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-10 rounded-lg bg-[#1A2A3A] flex items-center justify-center text-[#0066FF] border border-[#2A3A4A]">
                                                <MapPin size={20} />
                                            </div>
                                            <div>
                                                <div className="font-bold text-white text-base mb-0.5">{loc.name}</div>
                                                <div className="text-xs text-[#8899AA]">{loc.address}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center text-white font-mono bg-[#060B14] px-2 py-1 rounded border border-[#2A3A4A] inline-flex">
                                            <MapIcon size={14} className="mr-2 text-[#556677]" /> {loc.radius}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        {loc.ips > 0 ? (
                                            <span className="flex items-center text-xs font-bold text-[#FFB800] bg-[#FFB800]/10 border border-[#FFB800]/20 px-2 py-1 rounded inline-flex">
                                                <Wifi size={12} className="mr-1.5" /> IP Locked ({loc.ips})
                                            </span>
                                        ) : (
                                            <span className="text-xs text-[#556677]">GPS Only</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="flex items-center text-sm font-bold text-white">
                                            <Users size={14} className="mr-2 text-[#8899AA]" /> {loc.users}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 text-[10px] font-black uppercase tracking-wider rounded border ${loc.status === 'Active' ? 'bg-[#00E5A0]/10 text-[#00E5A0] border-[#00E5A0]/30' : 'bg-[#1A2A3A] text-[#8899AA] border-[#2A3A4A]'
                                            }`}>
                                            {loc.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end space-x-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                                            <button className="p-2 text-[#8899AA] hover:text-[#0066FF] hover:bg-[#0066FF]/10 rounded transition-colors" title="Edit">
                                                <Edit3 size={16} />
                                            </button>
                                            <button className="p-2 text-[#8899AA] hover:text-[#FF4444] hover:bg-[#FF4444]/10 rounded transition-colors" title="Delete">
                                                <Trash2 size={16} />
                                            </button>
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
