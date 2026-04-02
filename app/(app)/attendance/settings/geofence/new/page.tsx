"use client";

import React, { useState } from 'react';
import {
    MapPin, Search, Crosshair, ChevronLeft, Plus, Trash2, Shield
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function GeofenceSetup() {
    const router = useRouter();
    const [radius, setRadius] = useState(100);
    const [locationName, setLocationName] = useState("Bengaluru HSR Layout Office");

    return (
        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200 flex flex-col h-screen">
            <div className="max-w-6xl mx-auto w-full flex flex-col flex-1">

                {/* Header */}
                <div className="flex justify-between items-center mb-6 shrink-0">
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => router.push('/attendance/settings/geofence')}
                            className="p-2 bg-[#0D1928] border border-[#1A2A3A] rounded-lg text-[#8899AA] hover:text-white transition-colors"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <div>
                            <h1 className="text-2xl font-bold text-white mb-1">Create Geofence Location</h1>
                            <p className="text-sm text-[#8899AA]">Define physical boundaries where employees are allowed to check-in.</p>
                        </div>
                    </div>
                    <div className="flex space-x-3">
                        <button className="px-5 py-2.5 border border-[#1A2A3A] bg-[#0A1420] text-sm font-semibold rounded-lg hover:bg-[#1A2A3A] transition-colors text-white">
                            Cancel
                        </button>
                        <button className="px-5 py-2.5 bg-[#00E5A0] text-[#060B14] font-bold text-sm rounded-lg hover:bg-[#00c98d] transition-colors shadow-[0_0_15px_rgba(0,229,160,0.3)]">
                            Save Location
                        </button>
                    </div>
                </div>

                <div className="flex flex-1 space-x-6 overflow-hidden min-h-0">

                    {/* Left Panel - Settings */}
                    <div className="w-[400px] bg-[#0D1928] border border-[#1A2A3A] rounded-xl flex flex-col overflow-y-auto">
                        <div className="p-6 space-y-6">

                            <div>
                                <label className="block text-sm font-bold text-[#8899AA] mb-2">Location Name</label>
                                <input
                                    type="text"
                                    value={locationName}
                                    onChange={e => setLocationName(e.target.value)}
                                    placeholder="e.g. Mumbai Andheri Branch"
                                    className="w-full bg-[#060B14] border border-[#2A3A4A] text-white rounded-lg p-3 outline-none focus:border-[#0066FF] transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-[#8899AA] mb-2">Search Address / Coordinates</label>
                                <div className="relative">
                                    <Search size={16} className="absolute left-3 top-3.5 text-[#556677]" />
                                    <input
                                        type="text"
                                        placeholder="Search to pin..."
                                        defaultValue="12.9141° N, 77.6309° E"
                                        className="w-full bg-[#060B14] border border-[#2A3A4A] text-white rounded-lg pl-10 pr-3 py-3 outline-none focus:border-[#0066FF] transition-colors"
                                    />
                                    <button className="absolute right-2 top-2 p-1.5 bg-[#1A2A3A] rounded text-[#00E5A0] hover:text-white transition-colors" title="My Current Location">
                                        <Crosshair size={14} />
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-[#8899AA] mb-2">Geofence Radius (Meters)</label>
                                <div className="flex items-center space-x-4">
                                    <input
                                        type="range"
                                        min="50" max="1000" step="10"
                                        value={radius}
                                        onChange={e => setRadius(parseInt(e.target.value))}
                                        className="flex-1 accent-[#0066FF] h-1.5 bg-[#1A2A3A] rounded-lg appearance-none cursor-pointer"
                                    />
                                    <div className="bg-[#060B14] border border-[#2A3A4A] rounded-lg px-3 py-2 w-20 text-center text-white font-mono font-bold text-sm">
                                        {radius}m
                                    </div>
                                </div>
                                <p className="text-xs text-[#556677] mt-2">Recommended: 100m for office buildings, 50m for tight control.</p>
                            </div>

                            <hr className="border-[#1A2A3A]" />

                            <div>
                                <h3 className="text-sm font-bold text-white mb-3 flex items-center">
                                    <Shield size={16} className="mr-2 text-[#00E5A0]" /> Restrictions
                                </h3>

                                <div className="space-y-3">
                                    <label className="flex items-start space-x-3 cursor-pointer group">
                                        <div className="relative flex items-center justify-center mt-0.5">
                                            <input type="checkbox" className="peer sr-only" defaultChecked />
                                            <div className="w-4 h-4 rounded bg-[#060B14] border border-[#2A3A4A] peer-checked:bg-[#0066FF] peer-checked:border-[#0066FF] transition-colors flex items-center justify-center">
                                                <svg className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                            </div>
                                        </div>
                                        <div>
                                            <span className="text-sm font-bold text-white group-hover:text-[#0066FF] transition-colors">Require Photo Verification</span>
                                            <p className="text-xs text-[#8899AA]">Employee must snap a selfie when punching in this zone.</p>
                                        </div>
                                    </label>

                                    <label className="flex items-start space-x-3 cursor-pointer group">
                                        <div className="relative flex items-center justify-center mt-0.5">
                                            <input type="checkbox" className="peer sr-only" />
                                            <div className="w-4 h-4 rounded bg-[#060B14] border border-[#2A3A4A] peer-checked:bg-[#0066FF] peer-checked:border-[#0066FF] transition-colors flex items-center justify-center">
                                                <svg className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                            </div>
                                        </div>
                                        <div>
                                            <span className="text-sm font-bold text-white group-hover:text-[#0066FF] transition-colors">IP Address Lock</span>
                                            <p className="text-xs text-[#8899AA]">Only allow punches from the office Wi-Fi network.</p>
                                        </div>
                                    </label>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Right Panel - Map Mock */}
                    <div className="flex-1 bg-[#060B14] border border-[#1A2A3A] rounded-xl overflow-hidden relative">
                        {/* Fake Map Background using CSS Grid pattern */}
                        <div className="absolute inset-0 opacity-10"
                            style={{ backgroundImage: 'linear-gradient(#2A3A4A 1px, transparent 1px), linear-gradient(90deg, #2A3A4A 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
                        </div>

                        {/* Map controls */}
                        <div className="absolute top-4 right-4 flex flex-col space-y-2">
                            <button className="w-10 h-10 bg-[#0D1928] border border-[#2A3A4A] rounded-lg shadow-lg flex items-center justify-center text-white hover:bg-[#1A2A3A] transition-colors font-bold text-lg">+</button>
                            <button className="w-10 h-10 bg-[#0D1928] border border-[#2A3A4A] rounded-lg shadow-lg flex items-center justify-center text-white hover:bg-[#1A2A3A] transition-colors font-bold text-lg">-</button>
                        </div>

                        {/* Geofence Overlay Concept */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="relative flex items-center justify-center">
                                {/* The Radius Circle */}
                                <div
                                    className="absolute rounded-full border border-[#0066FF] bg-[#0066FF]/10 transition-all duration-300"
                                    style={{ width: `${(radius / 100) * 80 + 100}px`, height: `${(radius / 100) * 80 + 100}px` }}
                                ></div>

                                {/* Center Pin */}
                                <div className="absolute -mt-6 filter drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">
                                    <MapPin size={32} fill="#0066FF" className="text-white" />
                                </div>
                                <div className="absolute bg-[#0066FF] w-2 h-2 rounded-full animate-ping"></div>
                            </div>
                        </div>

                        {/* Address tooltip */}
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-[#0D1928] border border-[#2A3A4A] py-2 px-4 rounded-xl shadow-xl flex items-center space-x-3">
                            <MapPin size={16} className="text-[#00E5A0]" />
                            <span className="text-sm font-medium text-white">12.9141° N, 77.6309° E (HSR Layout, Sector 2)</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
