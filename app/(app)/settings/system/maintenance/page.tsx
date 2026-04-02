"use client";

import React, { useState } from 'react';
import { ShieldOff, ToggleLeft, ToggleRight, AlertTriangle, Clock, Save } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function MaintenanceModePage() {
    const [isMaintenanceOn, setIsMaintenanceOn] = useState(false);

    return (
        <div className="p-6 md:p-8 animate-fade-in max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white tracking-tight mb-2 flex items-center gap-3">
                    <ShieldOff size={28} className="text-amber-400" /> Maintenance Mode
                </h1>
                <p className="text-[#8899AA] text-sm max-w-2xl">When enabled, all non-admin users will be redirected to a maintenance page. API calls will return 503.</p>
            </div>

            {/* Big Toggle */}
            <div className={`border rounded-2xl p-8 text-center transition-all mb-8 ${isMaintenanceOn ? 'bg-red-500/10 border-red-500/30' : 'bg-[#0D1928] border-[#1A2A3A]'
                }`}>
                <button onClick={() => setIsMaintenanceOn(!isMaintenanceOn)} className="inline-block transition-transform hover:scale-105 mb-4">
                    {isMaintenanceOn
                        ? <ToggleRight size={64} className="text-red-400" />
                        : <ToggleLeft size={64} className="text-[#2A3A4A]" />
                    }
                </button>
                <div className={`text-xl font-bold mb-2 ${isMaintenanceOn ? 'text-red-400' : 'text-white'}`}>
                    Maintenance Mode is {isMaintenanceOn ? 'ON' : 'OFF'}
                </div>
                <p className="text-sm text-[#8899AA]">
                    {isMaintenanceOn
                        ? 'All non-admin users are currently locked out. Disable this to restore access.'
                        : 'The platform is accessible to all users. Toggle to enable maintenance window.'
                    }
                </p>
            </div>

            {isMaintenanceOn && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-8 flex items-center gap-3 animate-fade-in">
                    <AlertTriangle size={18} className="text-red-400 shrink-0" />
                    <p className="text-sm text-red-300"><strong>Warning:</strong> 245 active users will be disconnected. Scheduled cron jobs and webhooks will be paused.</p>
                </div>
            )}

            {/* Configuration */}
            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 space-y-6">
                <h3 className="text-white font-medium">Maintenance Window Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                        <label className="text-xs font-medium text-[#8899AA] ml-1">Scheduled Start</label>
                        <input type="datetime-local" className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl px-4 py-2.5 text-sm text-white outline-none" style={{ colorScheme: 'dark' }} />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-xs font-medium text-[#8899AA] ml-1">Estimated Duration</label>
                        <select className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl px-4 py-2.5 text-sm text-white outline-none appearance-none cursor-pointer">
                            <option>30 minutes</option>
                            <option>1 hour</option>
                            <option>2 hours</option>
                            <option>4 hours</option>
                            <option>Custom</option>
                        </select>
                    </div>
                </div>
                <div className="space-y-1.5">
                    <label className="text-xs font-medium text-[#8899AA] ml-1">Custom Message (shown to users)</label>
                    <textarea rows={3} defaultValue="We're performing scheduled maintenance to improve your experience. We'll be back shortly!" className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl px-4 py-3 text-sm text-white outline-none resize-none" />
                </div>
                <div className="flex justify-end">
                    <Button className="bg-indigo-600 hover:bg-indigo-500 text-white border-none py-2 px-6"><Save size={16} className="mr-2" /> Save Settings</Button>
                </div>
            </div>
        </div>
    );
}
