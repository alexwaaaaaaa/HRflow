"use client";

import React, { useState } from 'react';
import {
    QrCode, Download, Settings, RefreshCw, Printer, AlertCircle, Maximize2
} from 'lucide-react';

export default function QRCodeAttendance() {
    return (
        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-5xl mx-auto space-y-6">

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-white mb-1">QR Code Attendance Kiosk</h1>
                        <p className="text-sm text-[#8899AA]">Generate dynamic or static QR codes for employees to scan via the HRflow mobile app.</p>
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-8">

                    {/* Left: QR Display Generator */}
                    <div className="col-span-12 md:col-span-7 bg-[#0D1928] border border-[#1A2A3A] rounded-xl flex flex-col justify-center items-center py-16 relative overflow-hidden">
                        {/* Background effect */}
                        <div className="absolute inset-0 bg-[#0066FF]/5 pointer-events-none"></div>
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#0066FF]/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>

                        <div className="relative z-10 text-center">
                            <h2 className="text-xl font-bold text-white mb-2 tracking-wide">MUMBAI HQ KIOSK</h2>
                            <p className="text-sm text-[#8899AA] mb-8">Scan with HRflow Employee App to check-in</p>

                            {/* The QR Code Container */}
                            <div className="bg-white p-4 rounded-2xl shadow-[0_0_40px_rgba(0,102,255,0.2)] inline-block relative group">
                                <QrCode size={240} className="text-[#060B14]" strokeWidth={1} />
                                {/* Scanning animation line */}
                                <div className="absolute left-0 right-0 h-1 bg-[#00E5A0] shadow-[0_0_10px_#00E5A0] opacity-70 animate-scan"></div>

                                <button className="absolute top-2 right-2 p-1.5 bg-[#060B14] rounded-lg text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Maximize2 size={16} />
                                </button>
                            </div>

                            {/* Timer for dynamic QR */}
                            <div className="mt-8 flex flex-col items-center">
                                <div className="text-xs font-bold text-[#8899AA] uppercase tracking-widest mb-2 flex items-center">
                                    <RefreshCw size={12} className="mr-1.5 animate-spin" /> Code refreshes in <span className="text-[#00E5A0] ml-1">14s</span>
                                </div>
                                <div className="w-48 h-1 bg-[#1A2A3A] rounded-full overflow-hidden">
                                    <div className="h-full bg-[#00E5A0] w-2/3 transition-all duration-1000"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Settings & Actions */}
                    <div className="col-span-12 md:col-span-5 space-y-6">

                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-6">
                            <h3 className="text-base font-bold text-white mb-4 border-b border-[#1A2A3A] pb-2 flex items-center">
                                <Settings size={18} className="mr-2 text-[#0066FF]" /> Kiosk Preferences
                            </h3>

                            <div className="space-y-5">
                                <div>
                                    <label className="block text-sm font-bold text-[#8899AA] mb-2">Select Location</label>
                                    <select className="w-full bg-[#060B14] border border-[#2A3A4A] text-white rounded-lg p-3 outline-none focus:border-[#0066FF] transition-colors">
                                        <option>Mumbai HQ (Lobby)</option>
                                        <option>Bengaluru Delivery Center</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-[#8899AA] mb-2">QR Code Mode</label>
                                    <div className="grid grid-cols-2 gap-3">
                                        <label className="border border-[#0066FF] bg-[#0066FF]/10 text-[#0066FF] rounded-lg p-3 cursor-pointer text-center group">
                                            <input type="radio" name="mode" className="sr-only" defaultChecked />
                                            <div className="text-sm font-bold">Dynamic</div>
                                            <div className="text-[10px] mt-1 opacity-80">Rotates every 30s</div>
                                        </label>
                                        <label className="border border-[#2A3A4A] bg-[#060B14] text-[#8899AA] hover:text-white rounded-lg p-3 cursor-pointer text-center transition-colors">
                                            <input type="radio" name="mode" className="sr-only" />
                                            <div className="text-sm font-bold">Static</div>
                                            <div className="text-[10px] mt-1 opacity-80">Printable Poster</div>
                                        </label>
                                    </div>
                                    <div className="mt-2 text-xs text-[#FFB800] bg-[#FFB800]/10 border border-[#FFB800]/20 rounded p-2 flex items-start">
                                        <AlertCircle size={14} className="mr-2 shrink-0 mt-0.5" />
                                        Dynamic mode prevents proxy attendance (buddy punching). Keep this web page open on a tablet at the reception.
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Static Actions */}
                        <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-6">
                            <h3 className="text-sm font-bold text-[#8899AA] mb-4">Static Code Distribution</h3>
                            <div className="space-y-3">
                                <button className="w-full py-3 bg-[#060B14] hover:bg-[#1A2A3A] border border-[#2A3A4A] text-white font-bold text-sm rounded-lg transition-colors flex justify-center items-center opacity-50 cursor-not-allowed" disabled title="Only available in Static Mode">
                                    <Download size={18} className="mr-2" /> Download Hi-Res PNG
                                </button>
                                <button className="w-full py-3 bg-[#060B14] hover:bg-[#1A2A3A] border border-[#2A3A4A] text-white font-bold text-sm rounded-lg transition-colors flex justify-center items-center opacity-50 cursor-not-allowed" disabled title="Only available in Static Mode">
                                    <Printer size={18} className="mr-2" /> Print PDF Poster
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Simple CSS animation injected for the scan line */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes scan {
                    0% { top: 10%; opacity: 0; }
                    10% { opacity: 0.8; }
                    90% { opacity: 0.8; }
                    100% { top: 90%; opacity: 0; }
                }
                .animate-scan {
                    animation: scan 2s cubic-bezier(0.53, 0.21, 0.29, 0.67) infinite;
                }
            `}} />
        </div>
    );
}
