"use client";

import React, { useState } from 'react';
import {
    Search, Filter, Clock, MapPin, Monitor, Smartphone,
    Wifi, CheckCircle2, AlertCircle, XCircle, RefreshCw, LogOut
} from 'lucide-react';

export default function DailyAttendanceLive() {
    // Mock Data
    const liveLog = [
        { id: '1', name: 'Vikram Singh', empId: 'EMP001', dept: 'Engineering', shift: '09:00 - 18:00', inTime: '08:55 AM', outTime: '--', status: 'Present', type: 'On-time', location: 'Bengaluru Office', device: 'Biometric', ip: '192.168.1.104' },
        { id: '2', name: 'Sneha Gupta', empId: 'EMP042', dept: 'Sales', shift: '10:00 - 19:00', inTime: '10:15 AM', outTime: '--', status: 'Present', type: 'Late', location: 'Client Visit (Mumbai)', device: 'Mobile App', ip: 'Geofenced' },
        { id: '3', name: 'Rahul Sharma', empId: 'EMP088', dept: 'Marketing', shift: '09:00 - 18:00', inTime: '09:05 AM', outTime: '--', status: 'Present', type: 'On-time', location: 'WFH - Delhi', device: 'Web Portal', ip: '122.161.45.22' },
        { id: '4', name: 'Priya Desai', empId: 'EMP105', dept: 'Engineering', shift: '09:00 - 18:00', inTime: '--', outTime: '--', status: 'Absent', type: '--', location: '--', device: '--', ip: '--' },
        { id: '5', name: 'Amit Kumar', empId: 'EMP156', dept: 'Operations', shift: '08:00 - 17:00', inTime: '07:50 AM', outTime: '05:05 PM', status: 'Checked Out', type: 'Early Leaver', location: 'Bengaluru Office', device: 'Biometric', ip: '192.168.1.105' },
        { id: '6', name: 'Neha Reddy', empId: 'EMP201', dept: 'HR', shift: '09:00 - 18:00', inTime: '09:45 AM', outTime: '--', status: 'Present', type: 'Late', location: 'Bengaluru Office', device: 'Biometric', ip: '192.168.1.104' },
    ];

    return (
        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200 flex flex-col h-screen overflow-hidden">
            <div className="max-w-7xl mx-auto w-full flex flex-col flex-1">

                {/* Header */}
                <div className="flex justify-between items-center mb-6 shrink-0">
                    <div>
                        <h1 className="text-2xl font-bold text-white mb-1 flex items-center">
                            <span className="w-2.5 h-2.5 bg-[#00E5A0] rounded-full animate-pulse mr-3 shadow-[0_0_10px_#00E5A0]"></span>
                            Daily Live Attendance
                        </h1>
                        <p className="text-sm text-[#8899AA]">Real-time stream of check-ins and check-outs across all locations.</p>
                    </div>
                    <div className="flex space-x-3">
                        <div className="bg-[#0A1420] border border-[#1A2A3A] px-4 py-2 rounded-lg flex items-center">
                            <RefreshCw size={14} className="text-[#8899AA] mr-2" />
                            <span className="text-xs font-semibold text-white">Last synced: Just now</span>
                        </div>
                        <button className="px-4 py-2 bg-[#1A2A3A] border border-[#2A3A4A] text-white text-sm font-semibold rounded-lg hover:bg-[#2A3A4A] transition-colors flex items-center">
                            <LogOut size={16} className="mr-2" /> Export Log
                        </button>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-4 mb-6 shrink-0 flex justify-between items-center">
                    <div className="flex space-x-4 flex-1">
                        <div className="relative flex-1 max-w-sm">
                            <Search size={16} className="absolute left-3 top-2.5 text-[#8899AA]" />
                            <input
                                type="text"
                                placeholder="Search employee, ID, or location..."
                                className="w-full bg-[#060B14] border border-[#1A2A3A] text-sm text-white rounded-lg pl-9 pr-4 py-2 focus:outline-none focus:border-[#0066FF] transition-colors"
                            />
                        </div>
                        <select className="bg-[#060B14] border border-[#1A2A3A] text-sm text-[#8899AA] rounded-lg px-3 py-2 outline-none">
                            <option>All Departments</option>
                            <option>Engineering</option>
                            <option>Sales</option>
                        </select>
                        <select className="bg-[#060B14] border border-[#1A2A3A] text-sm text-[#8899AA] rounded-lg px-3 py-2 outline-none">
                            <option>All Statuses</option>
                            <option>Present</option>
                            <option>Late</option>
                            <option>Absent</option>
                        </select>
                        <select className="bg-[#060B14] border border-[#1A2A3A] text-sm text-[#8899AA] rounded-lg px-3 py-2 outline-none">
                            <option>All Devices</option>
                            <option>Biometric</option>
                            <option>Mobile App</option>
                            <option>Web Portal</option>
                        </select>
                    </div>
                    <button className="p-2 bg-[#1A2A3A] rounded text-[#8899AA] hover:text-white transition-colors">
                        <Filter size={18} />
                    </button>
                </div>

                {/* Table */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl flex-1 flex flex-col overflow-hidden">
                    <div className="overflow-x-auto overflow-y-auto flex-1 h-0">
                        <table className="w-full text-left text-sm whitespace-nowrap">
                            <thead className="bg-[#0A1420] sticky top-0 z-10">
                                <tr>
                                    <th className="px-6 py-4 font-bold text-xs text-[#8899AA] uppercase tracking-wider border-b border-[#1A2A3A]">Employee</th>
                                    <th className="px-6 py-4 font-bold text-xs text-[#8899AA] uppercase tracking-wider border-b border-[#1A2A3A]">Shift</th>
                                    <th className="px-6 py-4 font-bold text-xs text-[#8899AA] uppercase tracking-wider border-b border-[#1A2A3A]">In Time</th>
                                    <th className="px-6 py-4 font-bold text-xs text-[#8899AA] uppercase tracking-wider border-b border-[#1A2A3A]">Out Time</th>
                                    <th className="px-6 py-4 font-bold text-xs text-[#8899AA] uppercase tracking-wider border-b border-[#1A2A3A]">Punctuality</th>
                                    <th className="px-6 py-4 font-bold text-xs text-[#8899AA] uppercase tracking-wider border-b border-[#1A2A3A]">Location / Method</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#1A2A3A]">
                                {liveLog.map((log) => (
                                    <tr key={log.id} className="hover:bg-[#1A2A3A]/30 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-8 h-8 rounded-full bg-[#1A2A3A] flex items-center justify-center text-xs font-bold text-white border border-[#2A3A4A]">
                                                    {log.name.split(' ').map(n => n[0]).join('')}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-white">{log.name}</div>
                                                    <div className="text-xs text-[#8899AA]">{log.empId} • {log.dept}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-slate-300 bg-[#1A2A3A] px-2 py-1 rounded text-xs font-mono border border-[#2A3A4A]">
                                                {log.shift}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {log.inTime !== '--' ? (
                                                <div className="flex items-center text-white font-bold">
                                                    <Clock size={14} className="mr-1.5 text-[#00E5A0]" /> {log.inTime}
                                                </div>
                                            ) : <span className="text-[#445566]">--</span>}
                                        </td>
                                        <td className="px-6 py-4">
                                            {log.outTime !== '--' ? (
                                                <div className="flex items-center text-slate-300 font-bold">
                                                    <Clock size={14} className="mr-1.5 text-[#8899AA]" /> {log.outTime}
                                                </div>
                                            ) : <span className="text-[#445566]">--</span>}
                                        </td>
                                        <td className="px-6 py-4">
                                            <StatusBadge type={log.type} />
                                        </td>
                                        <td className="px-6 py-4">
                                            {log.location !== '--' ? (
                                                <div>
                                                    <div className="flex items-center text-sm text-slate-300 mb-1">
                                                        <MapPin size={12} className="mr-1.5 text-[#8899AA]" /> {log.location}
                                                    </div>
                                                    <div className="flex items-center text-[10px] text-[#556677] space-x-2">
                                                        <span className="flex items-center">
                                                            {log.device === 'Biometric' ? <Monitor size={10} className="mr-1" /> :
                                                                log.device === 'Mobile App' ? <Smartphone size={10} className="mr-1" /> :
                                                                    <Wifi size={10} className="mr-1" />}
                                                            {log.device}
                                                        </span>
                                                        <span>•</span>
                                                        <span className="font-mono">{log.ip}</span>
                                                    </div>
                                                </div>
                                            ) : <span className="text-[#445566]">--</span>}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {/* Pagination */}
                    <div className="p-4 border-t border-[#1A2A3A] bg-[#0A1420] flex justify-between items-center text-sm text-[#8899AA]">
                        <div>Showing 6 of 412 logs today</div>
                        <div className="flex space-x-2">
                            <button className="px-3 py-1 border border-[#1A2A3A] rounded hover:bg-[#1A2A3A] disabled:opacity-50">Prev</button>
                            <button className="px-3 py-1 bg-[#1A2A3A] text-white rounded">1</button>
                            <button className="px-3 py-1 border border-[#1A2A3A] rounded hover:bg-[#1A2A3A]">2</button>
                            <button className="px-3 py-1 border border-[#1A2A3A] rounded hover:bg-[#1A2A3A]">Next</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

function StatusBadge({ type }: { type: string }) {
    if (type === 'On-time') {
        return <span className="inline-flex items-center px-2 py-1 rounded bg-[#00E5A0]/10 border border-[#00E5A0]/20 text-[#00E5A0] text-xs font-bold"><CheckCircle2 size={12} className="mr-1" /> On Time</span>;
    }
    if (type === 'Late') {
        return <span className="inline-flex items-center px-2 py-1 rounded bg-[#FFB800]/10 border border-[#FFB800]/20 text-[#FFB800] text-xs font-bold"><AlertCircle size={12} className="mr-1" /> Late Active</span>;
    }
    if (type === 'Early Leaver') {
        return <span className="inline-flex items-center px-2 py-1 rounded bg-[#0066FF]/10 border border-[#0066FF]/20 text-[#0066FF] text-xs font-bold"><AlertCircle size={12} className="mr-1" /> Early Out</span>;
    }
    return <span className="inline-flex items-center px-2 py-1 rounded bg-[#1A2A3A] border border-[#2A3A4A] text-[#8899AA] text-xs font-bold"><XCircle size={12} className="mr-1" /> Absent</span>;
}
