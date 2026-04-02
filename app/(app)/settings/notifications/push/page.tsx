"use client";
import React from 'react';
import { Smartphone, RefreshCcw, Key } from 'lucide-react';

export default function PushNotificationSetupPage() {
    return (
        <div className="min-h-screen p-6 max-w-3xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                        <Smartphone className="text-emerald-500" />
                        Push Notification Setup
                    </h1>
                    <p className="text-sm text-[#8899AA] mt-1">Configure Firebase Cloud Messaging (FCM) or APNs for mobile alerts.</p>
                </div>
            </div>

            <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl p-6 space-y-6">
                <div className="flex items-center gap-4 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                        <RefreshCcw size={20} />
                    </div>
                    <div>
                        <h4 className="text-white text-sm font-bold">FCM Connected Successfully</h4>
                        <p className="text-xs text-emerald-400/80">Project ID: kaarya-mobile-prod-889a</p>
                    </div>
                    <button className="ml-auto text-xs font-bold text-[#8899AA] hover:text-white px-3 py-1.5 border border-[#2A3A4A] bg-[#131B2B] rounded">Disconnect</button>
                </div>

                <div className="space-y-4">
                    <h3 className="text-sm font-bold text-white border-b border-[#1A2A3A] pb-2">Apple Push Notification service (APNs)</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs text-[#8899AA] mb-1">Key ID</label>
                            <input type="text" placeholder="e.g. 5A92942XX" className="w-full bg-[#060D1A] border border-[#1A2A3A] rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-emerald-500" />
                        </div>
                        <div>
                            <label className="block text-xs text-[#8899AA] mb-1">Team ID</label>
                            <input type="text" placeholder="e.g. ABC123DEF" className="w-full bg-[#060D1A] border border-[#1A2A3A] rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-emerald-500" />
                        </div>
                        <div className="col-span-1 md:col-span-2">
                            <label className="block text-xs text-[#8899AA] mb-1">Auth Key (.p8 file)</label>
                            <div className="w-full border-2 border-dashed border-[#1A2A3A] rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:border-[#2A3A4A] hover:bg-[#131B2B]/50 transition-all">
                                <Key className="text-[#556677] mb-2" size={24} />
                                <span className="text-sm text-white font-medium">Upload AuthKey_XX.p8</span>
                                <span className="text-xs text-[#556677] mt-1">Securely hosted in AWS KMS</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-4 flex justify-end">
                    <button className="bg-emerald-500 hover:bg-emerald-400 text-[#060D1A] px-6 py-2 rounded-lg font-bold text-sm transition-colors shadow-lg shadow-emerald-500/20">
                        Save Configurations
                    </button>
                </div>
            </div>
        </div>
    );
}
