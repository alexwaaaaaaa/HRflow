"use client";
import React, { useState } from 'react';
import {
    Settings, Save, CheckCircle2, DollarSign, Gift, Star, Clock, AlertTriangle, Users, ToggleLeft, ToggleRight
} from 'lucide-react';

export default function RRAdminScreen() {
    const [activeTab, setActiveTab] = useState('settings');
    const [isSaving, setIsSaving] = useState(false);
    const [showSavedMsg, setShowSavedMsg] = useState(false);

    // Form State
    const [settings, setSettings] = useState({
        pointValue: 0.10, // $0.10 per point
        autoApproveLimit: 200,
        monthlyBudgetPerManager: 5000,
        enablePeerNomination: true,
        enableSpotAwards: true,
        autoAnniversaryPoints: true,
        autoBirthdayPoints: true,
        birthdayPoints: 500,
        allowNegativeBalance: false
    });

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            setShowSavedMsg(true);
            setTimeout(() => setShowSavedMsg(false), 3000);
        }, 1500);
    };

    const toggleSetting = (key: keyof typeof settings) => {
        setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="p-6 max-w-[1200px] mx-auto min-h-[calc(100vh-80px)] font-sans">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-white mb-2 flex items-center gap-3">
                        <Settings size={32} className="text-[#33E6FF]" /> R&R Administration
                    </h1>
                    <p className="text-[#8899AA]">Configure points value, budgets, and automated recognition rules.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="px-6 py-2.5 bg-[#33E6FF] text-[#0A1420] font-bold rounded-xl hover:bg-[#29b8cc] transition-colors flex items-center gap-2 shadow-[0_5px_15px_rgba(51,230,255,0.2)] disabled:opacity-70"
                    >
                        {isSaving ? <span className="w-5 h-5 border-2 border-[#0A1420]/30 border-t-[#0A1420] rounded-full animate-spin"></span> : <><Save size={18} /> Save Changes</>}
                    </button>
                </div>
            </div>

            {showSavedMsg && (
                <div className="mb-6 bg-[#00E5A0]/10 border border-[#00E5A0] text-[#00E5A0] px-4 py-3 rounded-xl flex items-center justify-between shadow-[0_0_15px_rgba(0,229,160,0.1)] animate-in slide-in-from-top-4">
                    <span className="flex items-center gap-2 font-bold"><CheckCircle2 size={18} /> Settings updated successfully!</span>
                </div>
            )}

            <div className="flex flex-col lg:flex-row gap-8 items-start">

                {/* Sidebar Navigation */}
                <div className="w-full lg:w-[280px] shrink-0 sticky top-6">
                    <div className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-3xl p-4 shadow-xl flex flex-col gap-2">
                        {[
                            { id: 'settings', name: 'General Settings', icon: Settings },
                            { id: 'budget', name: 'Budgets & Limits', icon: DollarSign },
                            { id: 'automation', name: 'Automations', icon: Clock },
                            { id: 'programs', name: 'Programs', icon: Gift },
                        ].map(tab => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === tab.id ? 'bg-[#33E6FF]/10 text-[#33E6FF] font-bold border border-[#33E6FF]/30' : 'text-[#8899AA] hover:bg-[#1A2A3A] hover:text-white font-medium border border-transparent'}`}
                                >
                                    <Icon size={18} className={activeTab === tab.id ? 'text-[#33E6FF]' : 'text-[#445566]'} />
                                    {tab.name}
                                </button>
                            )
                        })}
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 w-full relative">
                    <form onSubmit={handleSave} className="bg-[#0F1C2E] border border-[#2A3A4A] rounded-3xl p-8 shadow-xl min-h-[500px]">

                        {activeTab === 'settings' && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
                                <div>
                                    <h2 className="text-xl font-bold text-white mb-6 border-b border-[#2A3A4A] pb-4">General Configuration</h2>
                                    <div className="space-y-6">

                                        {/* Point Value */}
                                        <div className="bg-[#152336] border border-[#1A2A3A] rounded-2xl p-6">
                                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                                                <div>
                                                    <h3 className="text-white font-bold mb-1">Point Conversion Value</h3>
                                                    <p className="text-[#8899AA] text-sm">Set the real-world currency value of a single point.</p>
                                                </div>
                                                <div className="relative">
                                                    <DollarSign size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#445566]" />
                                                    <input
                                                        type="number" step="0.01" value={settings.pointValue} onChange={(e) => setSettings({ ...settings, pointValue: parseFloat(e.target.value) })}
                                                        className="w-32 bg-[#1A2A3A] border border-[#2A3A4A] rounded-xl pl-9 pr-4 py-2 font-mono text-white focus:outline-none focus:border-[#33E6FF]"
                                                    />
                                                </div>
                                            </div>
                                            <div className="bg-[#0A1420] p-4 rounded-xl border border-[#1A2A3A] text-sm text-[#CCDDEE] flex items-center gap-2">
                                                <AlertTriangle size={16} className="text-[#FFB020]" />
                                                1,000 points currently equals <strong>${(settings.pointValue * 1000).toFixed(2)}</strong>.
                                            </div>
                                        </div>

                                        {/* Allow Negative Balance */}
                                        <div className="flex items-center justify-between p-4 bg-[#152336] border border-[#1A2A3A] rounded-2xl">
                                            <div>
                                                <h3 className="text-white font-bold mb-1">Allow Negative Wallet Balance</h3>
                                                <p className="text-[#8899AA] text-sm">Employees can redeem rewards even if lacking points (Not recommended).</p>
                                            </div>
                                            <button type="button" onClick={() => toggleSetting('allowNegativeBalance')} className="text-[#33E6FF]">
                                                {settings.allowNegativeBalance ? <ToggleRight size={40} className="text-[#FF4444]" /> : <ToggleLeft size={40} className="text-[#445566]" />}
                                            </button>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'budget' && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
                                <div>
                                    <h2 className="text-xl font-bold text-white mb-6 border-b border-[#2A3A4A] pb-4">Budgets & Limits</h2>
                                    <div className="space-y-6">

                                        {/* Spot Award Limit */}
                                        <div className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-[#152336] border border-[#1A2A3A] rounded-2xl gap-4">
                                            <div>
                                                <h3 className="text-white font-bold mb-1">Manager Quarterly Budget</h3>
                                                <p className="text-[#8899AA] text-sm">Points given to managers for Spot Awards per quarter.</p>
                                            </div>
                                            <div className="relative">
                                                <Star size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#445566]" />
                                                <input
                                                    type="number" value={settings.monthlyBudgetPerManager} onChange={(e) => setSettings({ ...settings, monthlyBudgetPerManager: parseInt(e.target.value) })}
                                                    className="w-40 bg-[#1A2A3A] border border-[#2A3A4A] rounded-xl pl-9 pr-4 py-3 font-mono text-white focus:outline-none focus:border-[#00E5A0]"
                                                />
                                            </div>
                                        </div>

                                        {/* Auto-Approve Limit */}
                                        <div className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-[#152336] border border-[#1A2A3A] rounded-2xl gap-4">
                                            <div>
                                                <h3 className="text-white font-bold mb-1">Auto-Approval Limit</h3>
                                                <p className="text-[#8899AA] text-sm">Awards under this point value are approved automatically without HR intervention.</p>
                                            </div>
                                            <div className="relative">
                                                <CheckCircle2 size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#445566]" />
                                                <input
                                                    type="number" value={settings.autoApproveLimit} onChange={(e) => setSettings({ ...settings, autoApproveLimit: parseInt(e.target.value) })}
                                                    className="w-40 bg-[#1A2A3A] border border-[#2A3A4A] rounded-xl pl-9 pr-4 py-3 font-mono text-white focus:outline-none focus:border-[#33E6FF]"
                                                />
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'automation' && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
                                <div>
                                    <h2 className="text-xl font-bold text-white mb-6 border-b border-[#2A3A4A] pb-4">Automated Points Grants</h2>
                                    <div className="space-y-4">

                                        {/* Anniversaries */}
                                        <div className="p-6 bg-[#152336] border border-[#1A2A3A] rounded-2xl">
                                            <div className="flex items-center justify-between mb-4">
                                                <div>
                                                    <h3 className="text-white font-bold mb-1 flex items-center gap-2"><Clock size={16} className="text-[#33E6FF]" /> Work Anniversaries</h3>
                                                    <p className="text-[#8899AA] text-sm">Automatically grant points on work anniversaries.</p>
                                                </div>
                                                <button type="button" onClick={() => toggleSetting('autoAnniversaryPoints')} className="text-[#33E6FF]">
                                                    {settings.autoAnniversaryPoints ? <ToggleRight size={40} className="text-[#00E5A0]" /> : <ToggleLeft size={40} className="text-[#445566]" />}
                                                </button>
                                            </div>
                                            <div className={`p-4 bg-[#0A1420] border border-[#1A2A3A] rounded-xl flex items-center justify-between transition-opacity ${settings.autoAnniversaryPoints ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
                                                <span className="text-[#8899AA] text-sm">Configuration is handled via <span className="text-[#33E6FF]">Anniversary Matrix</span> rules.</span>
                                            </div>
                                        </div>

                                        {/* Birthdays */}
                                        <div className="p-6 bg-[#152336] border border-[#1A2A3A] rounded-2xl">
                                            <div className="flex items-center justify-between mb-4">
                                                <div>
                                                    <h3 className="text-white font-bold mb-1 flex items-center gap-2"><Gift size={16} className="text-[#FF4444]" /> Employee Birthdays</h3>
                                                    <p className="text-[#8899AA] text-sm">Automatically grant fixed points on user birthdays.</p>
                                                </div>
                                                <button type="button" onClick={() => toggleSetting('autoBirthdayPoints')} className="text-[#33E6FF]">
                                                    {settings.autoBirthdayPoints ? <ToggleRight size={40} className="text-[#00E5A0]" /> : <ToggleLeft size={40} className="text-[#445566]" />}
                                                </button>
                                            </div>

                                            <div className={`transition-opacity ${settings.autoBirthdayPoints ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
                                                <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-[#0A1420] border border-[#1A2A3A] rounded-xl gap-4">
                                                    <span className="text-[#8899AA] text-sm font-bold">Points Granted</span>
                                                    <div className="relative">
                                                        <Star size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#445566]" />
                                                        <input
                                                            type="number" disabled={!settings.autoBirthdayPoints} value={settings.birthdayPoints} onChange={(e) => setSettings({ ...settings, birthdayPoints: parseInt(e.target.value) })}
                                                            className="w-32 bg-[#1A2A3A] border border-[#2A3A4A] rounded-xl pl-9 pr-4 py-2 font-mono text-white focus:outline-none focus:border-[#FF4444]"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'programs' && (
                            <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
                                <div>
                                    <h2 className="text-xl font-bold text-white mb-6 border-b border-[#2A3A4A] pb-4">Program Rules</h2>
                                    <div className="space-y-4">

                                        {/* Peer Nomination */}
                                        <div className="flex items-center justify-between p-6 bg-[#152336] border border-[#1A2A3A] rounded-2xl">
                                            <div>
                                                <h3 className="text-white font-bold mb-1 flex items-center gap-2"><Users size={16} className="text-[#9D00FF]" /> Peer Nominations</h3>
                                                <p className="text-[#8899AA] text-sm max-w-md">Allow employees to nominate each other for major company awards (e.g., Employee of the Month).</p>
                                            </div>
                                            <button type="button" onClick={() => toggleSetting('enablePeerNomination')} className="text-[#33E6FF]">
                                                {settings.enablePeerNomination ? <ToggleRight size={40} className="text-[#00E5A0]" /> : <ToggleLeft size={40} className="text-[#445566]" />}
                                            </button>
                                        </div>

                                        {/* Spot Awards */}
                                        <div className="flex items-center justify-between p-6 bg-[#152336] border border-[#1A2A3A] rounded-2xl">
                                            <div>
                                                <h3 className="text-white font-bold mb-1 flex items-center gap-2"><Star size={16} className="text-[#FFB020]" /> Spot Awards</h3>
                                                <p className="text-[#8899AA] text-sm max-w-md">Allow managers to instantly distribute points to their team members for exceptional work.</p>
                                            </div>
                                            <button type="button" onClick={() => toggleSetting('enableSpotAwards')} className="text-[#33E6FF]">
                                                {settings.enableSpotAwards ? <ToggleRight size={40} className="text-[#00E5A0]" /> : <ToggleLeft size={40} className="text-[#445566]" />}
                                            </button>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        )}

                    </form>
                </div>

            </div>
        </div>
    );
}
