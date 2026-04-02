"use client";

import React from 'react';
import {
    Calendar, Download, Filter, Search, MapPin, Home,
    PieChart, MonitorSmartphone
} from 'lucide-react';

export default function WfhVsOfficeReport() {
    const data = [
        { id: 1, empName: 'Rohan Sharma', empId: 'EMP124', wfh: 12, office: 8, field: 2, compliance: '85%', status: 'Compliant' },
        { id: 2, empName: 'Aditi Jain', empId: 'EMP044', wfh: 18, office: 4, field: 0, compliance: '40%', status: 'Violation (Min 8 Office)' },
        { id: 3, empName: 'Manoj Kumar', empId: 'EMP189', wfh: 0, office: 22, field: 0, compliance: '100%', status: 'Compliant' },
        { id: 4, empName: 'Priya Desai', empId: 'EMP082', wfh: 10, office: 10, field: 2, compliance: '100%', status: 'Compliant' },
    ];

    return (
        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-[1400px] mx-auto space-y-6">

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-white mb-1">WFH vs Office Delivery</h1>
                        <p className="text-sm text-[#8899AA]">Track hybrid work compliance and location-based attendance metrics.</p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <div className="bg-[#0D1928] border border-[#1A2A3A] px-3 py-2 rounded-lg flex items-center space-x-2 text-sm text-[#8899AA]">
                            <Calendar size={16} />
                            <span>Current Month (Nov 2024)</span>
                        </div>
                        <button className="px-4 py-2 border border-[#1A2A3A] bg-[#0A1420] text-sm font-semibold rounded-lg hover:bg-[#1A2A3A] transition-colors flex items-center text-white">
                            <Download size={16} className="mr-2 text-[#00E5A0]" /> Export CSV
                        </button>
                    </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-4 gap-6">
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-5 shadow-sm">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center text-[#8899AA]">
                                <Home size={18} className="mr-2" />
                                <h3 className="text-sm font-medium">Remote Work</h3>
                            </div>
                            <span className="text-xs font-bold bg-[#0066FF]/10 text-[#0066FF] px-2 py-1 rounded">34% of workforce</span>
                        </div>
                        <div className="text-3xl font-black text-white">412<span className="text-sm font-medium text-[#556677] ml-2">days logged</span></div>
                    </div>

                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-5 shadow-sm">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center text-[#8899AA]">
                                <MapPin size={18} className="mr-2" />
                                <h3 className="text-sm font-medium">In-Office</h3>
                            </div>
                            <span className="text-xs font-bold bg-[#00E5A0]/10 text-[#00E5A0] px-2 py-1 rounded">62% of workforce</span>
                        </div>
                        <div className="text-3xl font-black text-white">845<span className="text-sm font-medium text-[#556677] ml-2">days logged</span></div>
                    </div>

                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-5 shadow-sm border-l-4 border-l-[#FF4444]">
                        <div className="flex items-center text-[#FF4444] mb-4">
                            <MonitorSmartphone size={18} className="mr-2" />
                            <h3 className="text-sm font-medium">Hybrid Policy Violations</h3>
                        </div>
                        <div className="text-3xl font-black text-[#FF4444]">14 <span className="text-sm font-bold text-[#8899AA] font-normal tracking-wide">employees</span></div>
                        <p className="text-[10px] text-[#556677] mt-1">Failed to meet minimum 8 days/month in office.</p>
                    </div>

                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-5 shadow-sm flex flex-col justify-center">
                        <div className="text-sm font-bold text-[#8899AA] mb-3">Location Distribution</div>
                        <div className="h-4 bg-[#1A2A3A] rounded-full overflow-hidden flex">
                            <div className="bg-[#00E5A0]" style={{ width: '62%' }}></div>
                            <div className="bg-[#0066FF]" style={{ width: '34%' }}></div>
                            <div className="bg-[#FFB800]" style={{ width: '4%' }}></div>
                        </div>
                        <div className="flex justify-between text-[10px] text-[#556677] mt-2 font-bold">
                            <span>OFFICE 62%</span>
                            <span>WFH 34%</span>
                            <span>FIELD 4%</span>
                        </div>
                    </div>
                </div>

                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl overflow-hidden shadow-lg">
                    {/* Toolbar */}
                    <div className="p-4 border-b border-[#1A2A3A] flex justify-between items-center bg-[#0A1420]">
                        <div className="relative w-72">
                            <Search size={16} className="absolute left-3 top-2.5 text-[#556677]" />
                            <input
                                type="text"
                                placeholder="Search employees..."
                                className="w-full bg-[#060B14] border border-[#1A2A3A] text-sm text-white rounded-lg pl-9 pr-3 py-2 outline-none focus:border-[#0066FF]"
                            />
                        </div>
                        <div className="flex space-x-3">
                            <select className="bg-[#060B14] border border-[#1A2A3A] text-sm text-white rounded-lg px-3 py-2 outline-none w-48">
                                <option>Status: Violations</option>
                                <option>Status: All</option>
                            </select>
                            <button className="px-3 py-2 bg-[#060B14] border border-[#1A2A3A] rounded-lg text-[#8899AA] hover:text-white transition-colors">
                                <Filter size={16} />
                            </button>
                        </div>
                    </div>

                    {/* Table */}
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-[#0A1420] border-b border-[#1A2A3A]">
                            <tr>
                                <th className="px-6 py-4 font-bold text-xs text-[#8899AA] uppercase tracking-wider">Employee</th>
                                <th className="px-6 py-4 font-bold text-xs text-[#8899AA] uppercase tracking-wider">Office Days</th>
                                <th className="px-6 py-4 font-bold text-xs text-[#8899AA] uppercase tracking-wider">WFH Days</th>
                                <th className="px-6 py-4 font-bold text-xs text-[#8899AA] uppercase tracking-wider">Field Visits</th>
                                <th className="px-6 py-4 font-bold text-xs text-[#8899AA] uppercase tracking-wider">Policy Compliance</th>
                                <th className="px-6 py-4 font-bold text-xs text-[#8899AA] uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1A2A3A]">
                            {data.map((row) => (
                                <tr key={row.id} className="hover:bg-[#1A2A3A]/30 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-white mb-0.5">{row.empName}</div>
                                        <div className="text-xs text-[#8899AA]">{row.empId}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-black text-[#00E5A0]">{row.office}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-black text-[#0066FF]">{row.wfh}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="font-black text-[#FFB800]">{row.field}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="w-32 bg-[#1A2A3A] rounded-full h-1.5 overflow-hidden">
                                            <div
                                                className={`h-full ${row.status.includes('Violation') ? 'bg-[#FF4444]' : 'bg-[#00E5A0]'}`}
                                                style={{ width: row.compliance }}
                                            ></div>
                                        </div>
                                        <div className="text-[10px] text-[#8899AA] mt-1 font-bold">{row.compliance} Met</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 text-[10px] font-black uppercase tracking-wider rounded border ${row.status === 'Compliant' ? 'bg-[#00E5A0]/10 text-[#00E5A0] border-[#00E5A0]/30' :
                                                'bg-[#FF4444]/10 text-[#FF4444] border-[#FF4444]/30'
                                            }`}>
                                            {row.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
}
