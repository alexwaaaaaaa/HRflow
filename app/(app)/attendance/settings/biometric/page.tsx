"use client";

import Page from "@/components/ui/Page";

import React from 'react';
import {
    Fingerprint, Usb, Cpu, RefreshCw, HardDrive
} from 'lucide-react';

export default function BiometricIntegration() {
    const devices = [
        { id: 'BIO-BLR-01', name: 'Main Entrance Scanner', ip: '192.168.1.104', type: 'Essl X990', location: 'Bengaluru HSR', status: 'Online', lastSync: '2 mins ago', logs: '4,521' },
        { id: 'BIO-MUM-02', name: 'Server Room Auth', ip: '10.0.4.55', type: 'ZKTeco F18', location: 'Mumbai HO', status: 'Offline', lastSync: '14 hrs ago', logs: '124' },
        { id: 'BIO-DEL-01', name: 'Staff Gate A', ip: '10.1.2.99', type: 'Matrix COSEC', location: 'Delhi Sales Hub', status: 'Online', lastSync: '1 min ago', logs: '890' },
    ];

    return (
        <Page
            title="Biometric Device Integration"
            subtitle="Manage connected ESSl, ZKTeco, Matrix devices and sync raw attendance logs."
            breadcrumbs={[{ label: "Attendance", href: "/attendance/dashboard" }, { label: "Settings", href: "/attendance/settings" }, { label: "Biometric" }]}
            maxWidth="900px"
        >

        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-6xl mx-auto space-y-6">

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-white mb-1">Biometric Device Integration</h1>
                        <p className="text-sm text-[#8899AA]">Manage connected ESSl, ZKTeco, Matrix devices and sync raw attendance logs.</p>
                    </div>
                    <div className="flex space-x-3">
                        <button className="px-4 py-2 border border-[#1A2A3A] bg-[#0A1420] text-sm font-semibold rounded-lg hover:bg-[#1A2A3A] transition-colors flex items-center text-white">
                            <Usb size={16} className="mr-2" /> Add Device
                        </button>
                        <button className="px-4 py-2 bg-[#0066FF] text-white font-bold text-sm rounded-lg hover:bg-[#0052cc] transition-colors flex items-center shadow-[0_0_15px_rgba(0,102,255,0.3)]">
                            <RefreshCw size={16} className="mr-2" /> Force Sync All
                        </button>
                    </div>
                </div>

                {/* Dashboard Stats */}
                <div className="grid grid-cols-3 gap-6">
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-5 shadow-sm overflow-hidden relative">
                        <div className="absolute right-0 top-0 mt-4 mr-4 text-[#00E5A0]/20"><Cpu size={64} /></div>
                        <h3 className="text-sm font-medium text-[#8899AA] mb-2 relative z-10">Connected Devices</h3>
                        <div className="text-3xl font-black text-white relative z-10">
                            2 <span className="text-lg text-[#556677]">/ 3 Online</span>
                        </div>
                    </div>
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-5 shadow-sm overflow-hidden relative">
                        <div className="absolute right-0 top-0 mt-4 mr-4 text-[#0066FF]/20"><HardDrive size={64} /></div>
                        <h3 className="text-sm font-medium text-[#8899AA] mb-2 relative z-10">Raw Logs Synced (Today)</h3>
                        <div className="text-3xl font-black text-white relative z-10">
                            1,452 <span className="text-xs font-bold text-[#00E5A0] ml-2">Punches verified</span>
                        </div>
                    </div>
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-5 shadow-sm flex items-center justify-between">
                        <div>
                            <h3 className="text-sm font-medium text-[#8899AA] mb-2">Background Worker</h3>
                            <div className="flex items-center text-sm font-bold text-[#00E5A0]">
                                <div className="w-2 h-2 rounded-full bg-[#00E5A0] animate-pulse mr-2"></div> Running (Interval: 15m)
                            </div>
                        </div>
                        <button className="text-xs font-bold text-[#8899AA] border border-[#2A3A4A] bg-[#060B14] px-3 py-1.5 rounded hover:text-white transition-colors">Configure</button>
                    </div>
                </div>

                {/* Devices List */}
                <h3 className="text-lg font-bold text-white pt-2">Enrolled Hardware</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {devices.map(dev => (
                        <div key={dev.id} className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl overflow-hidden hover:border-[#2A3A4A] transition-colors relative">

                            {/* Device Header */}
                            <div className="p-5 border-b border-[#1A2A3A]">
                                <div className="flex justify-between items-start mb-3">
                                    <div className="flex items-center space-x-3">
                                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${dev.status === 'Online' ? 'bg-[#00E5A0]/10 border-[#00E5A0]/30 text-[#00E5A0]' : 'bg-[#FF4444]/10 border-[#FF4444]/30 text-[#FF4444]'
                                            }`}>
                                            <Fingerprint size={20} />
                                        </div>
                                        <div>
                                            <h4 className="text-base font-bold text-white leading-tight">{dev.name}</h4>
                                            <div className="text-xs font-mono text-[#8899AA]">{dev.ip}</div>
                                        </div>
                                    </div>
                                </div>

                                <span className={`px-2 py-0.5 text-[10px] font-black uppercase tracking-wider rounded border ${dev.status === 'Online' ? 'bg-[#00E5A0]/10 text-[#00E5A0] border-[#00E5A0]/30' : 'bg-[#FF4444]/10 text-[#FF4444] border-[#FF4444]/30'
                                    }`}>
                                    {dev.status}
                                </span>
                            </div>

                            {/* Device Info */}
                            <div className="p-5 space-y-4 text-sm text-[#8899AA]">
                                <div className="flex justify-between border-b border-[#1A2A3A] pb-2">
                                    <span>Brand / Model</span>
                                    <span className="font-bold text-white">{dev.type}</span>
                                </div>
                                <div className="flex justify-between border-b border-[#1A2A3A] pb-2">
                                    <span>Branch Location</span>
                                    <span className="font-bold text-white">{dev.location}</span>
                                </div>
                                <div className="flex justify-between border-b border-[#1A2A3A] pb-2">
                                    <span>Unprocessed Logs</span>
                                    <span className="font-bold text-white">{dev.logs} records</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Last Heartbeat</span>
                                    <span className={`font-bold ${dev.status === 'Online' ? 'text-[#00E5A0]' : 'text-[#FF4444]'}`}>{dev.lastSync}</span>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center text-xs font-bold border-t border-[#1A2A3A] divide-x divide-[#1A2A3A]">
                                <button className="flex-1 py-3 text-center text-[#0066FF] hover:bg-[#0066FF]/5 transition-colors">Sync Now</button>
                                <button className="flex-1 py-3 text-center text-[#8899AA] hover:text-white hover:bg-[#1A2A3A]/30 transition-colors">Edit Config</button>
                                <button className="flex-1 py-3 text-center text-[#FF4444] hover:bg-[#FF4444]/5 transition-colors">Disconnect</button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* DB Logs Concept */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-6 mt-8">
                    <h3 className="text-sm font-bold text-white mb-4 flex items-center"><HardDrive size={16} className="mr-2 text-[#8899AA]" /> Latest Raw Feed</h3>
                    <div className="bg-[#060B14] rounded-lg border border-[#1A2A3A] p-4 text-xs font-mono text-[#00E5A0] space-y-2 h-40 overflow-y-auto overflow-x-hidden">
                        <div>[2024-11-06 09:14:22] SYNC: Pulled 14 logs from 192.168.1.104 (BIO-BLR-01)</div>
                        <div>[2024-11-06 09:14:22] PARSER: UID 401 mapped to EMP124 (Rohan Sharma) -{'>'} PUNCH_IN</div>
                        <div>[2024-11-06 09:14:22] PARSER: UID 112 mapped to EMP044 (Aditi Jain) -{'>'} PUNCH_IN</div>
                        <div className="text-[#FFB800]">[2024-11-06 09:14:23] WARN: UID 999 not found in AD map. Skipped.</div>
                        <div>[2024-11-06 09:14:23] SYNC: Process completed. 13 records pushed to cloud.</div>
                        <div className="text-[#556677]">[2024-11-06 09:14:23] Sleeping until next cycle...</div>
                    </div>
                </div>

            </div>
        </div>
    
        </Page>
        );
}
