"use client";

import React from 'react';
import { Activity, Search, Filter, Download, User, Clock, Shield, Settings, FileText, Trash2, Plus } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function SettingsAuditLogPage() {
    const logs = [
        { id: 1, user: 'Priya Sharma', action: 'Updated Role Permissions', target: 'HR Admin Role', category: 'Access', time: '2 mins ago', ip: '103.21.45.78', icon: Shield },
        { id: 2, user: 'Vikram Desai', action: 'Created Workflow', target: 'Exit Clearance (WF-004)', category: 'Workflows', time: '15 mins ago', ip: '103.21.45.80', icon: Plus },
        { id: 3, user: 'System', action: 'Data Export Triggered', target: 'Employee Master (CSV)', category: 'Data', time: '1 hr ago', ip: 'system', icon: Download },
        { id: 4, user: 'Priya Sharma', action: 'Deactivated User', target: 'Arjun Nair', category: 'Access', time: '3 hrs ago', ip: '103.21.45.78', icon: Trash2 },
        { id: 5, user: 'Aditi Menon', action: 'Modified Email Template', target: 'TPL-ONB-01 (Welcome Email)', category: 'Templates', time: '5 hrs ago', ip: '49.207.11.23', icon: FileText },
        { id: 6, user: 'System', action: 'API Key Rotated', target: 'Production — Payroll Sync', category: 'Security', time: 'Yesterday', ip: 'system', icon: Settings },
    ];

    return (
        <div className="p-6 md:p-8 animate-fade-in max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight mb-2 flex items-center gap-3">
                        <Activity size={28} className="text-indigo-400" /> Settings Audit Log
                    </h1>
                    <p className="text-[#8899AA] text-sm max-w-2xl">
                        Immutable record of all administrative actions taken within the Settings module.
                    </p>
                </div>
                <div className="flex gap-3">
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl flex items-center px-3 py-1.5 w-64 hidden md:flex">
                        <Search size={16} className="text-[#8899AA]" />
                        <input type="text" placeholder="Search actions..." className="bg-transparent border-none outline-none text-white text-sm ml-2 w-full" />
                    </div>
                    <Button variant="secondary" className="border-[#2A3A4A] text-white"><Filter size={16} className="mr-2" /> Filter</Button>
                    <Button variant="secondary" className="border-[#2A3A4A] text-white"><Download size={16} className="mr-2" /> Export</Button>
                </div>
            </div>

            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className="border-b border-[#1A2A3A] bg-[#131B2B]">
                                <th className="p-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Actor</th>
                                <th className="p-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Action</th>
                                <th className="p-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Target</th>
                                <th className="p-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Category</th>
                                <th className="p-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Timestamp</th>
                                <th className="p-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">IP Address</th>
                            </tr>
                        </thead>
                        <tbody>
                            {logs.map((log) => {
                                const Icon = log.icon;
                                return (
                                    <tr key={log.id} className="border-b border-[#1A2A3A] hover:bg-[#131B2B] transition-colors">
                                        <td className="p-4">
                                            <div className="flex items-center gap-2 text-sm">
                                                {log.user === 'System'
                                                    ? <div className="w-7 h-7 rounded-full bg-[#1A2A3A] flex items-center justify-center"><Settings size={12} className="text-[#8899AA]" /></div>
                                                    : <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-[10px] font-bold text-white">{log.user.split(' ').map(n => n[0]).join('')}</div>
                                                }
                                                <span className="text-white font-medium">{log.user}</span>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className="text-sm text-white flex items-center gap-1.5"><Icon size={14} className="text-indigo-400" /> {log.action}</span>
                                        </td>
                                        <td className="p-4 text-sm text-[#8899AA]">{log.target}</td>
                                        <td className="p-4"><span className="bg-[#1A2A3A] text-[#8899AA] border border-[#2A3A4A] px-2 py-0.5 rounded text-xs">{log.category}</span></td>
                                        <td className="p-4 text-sm text-[#8899AA] flex items-center gap-1.5"><Clock size={12} /> {log.time}</td>
                                        <td className="p-4 text-xs text-[#445566] font-mono">{log.ip}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
