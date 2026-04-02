"use client";
import React, { useState } from 'react';
import { TerminalSquare, Play, RefreshCw, Send, CheckCircle2, ChevronDown } from 'lucide-react';

export default function SandboxTestingPage() {
    return (
        <div className="flex h-[calc(100vh-80px)] overflow-hidden bg-[#060D1A]">
            {/* Sidebar nav / endpoint list */}
            <div className="w-64 border-r border-[#1A2A3A] bg-[#0A1420] overflow-y-auto shrink-0 flex flex-col">
                <div className="p-4 border-b border-[#1A2A3A] bg-[#0A1420]">
                    <h3 className="text-xs font-bold text-[#556677] uppercase tracking-wider mb-2">Endpoint Group</h3>
                    <select className="w-full bg-[#060D1A] border border-[#1A2A3A] rounded text-sm text-white p-2 outline-none">
                        <option>Employees</option>
                        <option>Payroll</option>
                        <option>Time & Attendance</option>
                    </select>
                </div>
                <div className="p-2 space-y-1">
                    {[
                        { method: 'GET', name: 'List Employees', route: '/employees', active: true },
                        { method: 'POST', name: 'Create Employee', route: '/employees', active: false },
                        { method: 'GET', name: 'Get Employee', route: '/employees/:id', active: false },
                        { method: 'PATCH', name: 'Update Employee', route: '/employees/:id', active: false },
                        { method: 'DEL', name: 'Terminate', route: '/employees/:id/terminate', active: false },
                    ].map((ep, i) => (
                        <button key={i} className={`w-full flex flex-col text-left p-2 rounded transition-colors ${ep.active ? 'bg-[#131B2B] border border-[#2A3A4A]' : 'hover:bg-[#0D1928] border border-transparent'}`}>
                            <div className="flex items-center gap-2 mb-1">
                                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${ep.method === 'GET' ? 'bg-emerald-500/10 text-emerald-400' : ep.method === 'POST' ? 'bg-amber-500/10 text-amber-400' : ep.method === 'DEL' ? 'bg-rose-500/10 text-rose-400' : 'bg-blue-500/10 text-blue-400'}`}>{ep.method}</span>
                                <span className="text-sm font-bold text-white truncate">{ep.name}</span>
                            </div>
                            <span className="text-xs font-mono text-[#556677] truncate">{ep.route}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Interactive Area */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Top Action Bar */}
                <div className="h-16 border-b border-[#1A2A3A] bg-[#0A1420] px-4 flex items-center gap-4 shrink-0 overflow-x-auto">
                    <div className="flex items-center border border-[#2A3A4A] rounded-lg overflow-hidden shrink-0">
                        <div className="bg-[#131B2B] px-3 py-2 text-sm font-bold text-emerald-400 font-mono border-r border-[#2A3A4A]">GET</div>
                        <div className="bg-[#060D1A] px-3 py-2 text-sm font-mono text-white flex-1 min-w-[300px]">https://api.sandbox.kaarya.com/v2/employees</div>
                    </div>
                    <button className="bg-amber-600 hover:bg-amber-500 text-white px-6 py-2 rounded-lg font-bold text-sm transition-colors flex items-center gap-2 shrink-0">
                        <Send size={16} /> Send Request
                    </button>
                    <div className="ml-auto text-xs text-[#556677] font-mono shrink-0 whitespace-nowrap">
                        Using key: sk_test_***
                    </div>
                </div>

                <div className="flex-1 overflow-hidden grid grid-rows-2 md:grid-rows-1 md:grid-cols-2">

                    {/* Request Pane */}
                    <div className="border-b md:border-b-0 md:border-r border-[#1A2A3A] bg-[#0A1420] flex flex-col min-h-0">
                        <div className="flex text-sm border-b border-[#1A2A3A]">
                            <button className="px-4 py-2 text-white border-b-2 border-amber-500 bg-[#131B2B] font-medium font-mono">Params</button>
                            <button className="px-4 py-2 text-[#556677] hover:bg-[#0D1928] hover:text-[#8899AA] transition-colors font-mono">Headers</button>
                            <button className="px-4 py-2 text-[#556677] hover:bg-[#0D1928] hover:text-[#8899AA] transition-colors font-mono">Body</button>
                        </div>
                        <div className="flex-1 p-4 overflow-y-auto bg-[#060D1A]">
                            <table className="w-full text-left text-sm text-white font-mono">
                                <thead>
                                    <tr className="text-[#556677] border-b border-[#1A2A3A]">
                                        <th className="pb-2 w-1/3">Key</th>
                                        <th className="pb-2 2/3">Value</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#1A2A3A]">
                                    <tr>
                                        <td className="py-2"><input type="text" defaultValue="limit" className="bg-transparent border-none outline-none w-full text-[#8899AA]" /></td>
                                        <td className="py-2"><input type="text" defaultValue="5" className="bg-transparent border-none outline-none w-full text-indigo-300" /></td>
                                    </tr>
                                    <tr>
                                        <td className="py-2"><input type="text" placeholder="Key" className="bg-transparent border-none outline-none w-full text-[#556677]" /></td>
                                        <td className="py-2"><input type="text" placeholder="Value" className="bg-transparent border-none outline-none w-full" /></td>
                                    </tr>
                                    <tr className="border-b border-[#1A2A3A]">
                                        <td colSpan={2} className="py-2"><button className="text-xs text-[#556677] hover:text-white">Add Param</button></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Response Pane */}
                    <div className="bg-[#0A1420] flex flex-col min-h-0">
                        <div className="flex items-center justify-between text-sm border-b border-[#1A2A3A] px-4 py-2 bg-[#131B2B]">
                            <div className="flex items-center gap-4 text-xs font-mono">
                                <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-emerald-400" /> <span className="text-emerald-400 font-bold">200 OK</span></span>
                                <span className="text-[#8899AA]">Time: 84 ms</span>
                                <span className="text-[#8899AA]">Size: 1.2 KB</span>
                            </div>
                            <div className="flex gap-2">
                                <button className="text-[#556677] hover:text-white text-xs">Copy</button>
                            </div>
                        </div>
                        <div className="flex-1 overflow-y-auto p-4 bg-[#060D1A]">
                            <pre className="font-mono text-sm leading-relaxed"><span className="text-sky-300">{`{`}</span>{`
  `}<span className="text-rose-300">"data"</span><span className="text-[#8899AA]">:</span> <span className="text-amber-300">{`[`}</span>{`
    `}<span className="text-purple-300">{`{`}</span>{`
      `}<span className="text-rose-300">"id"</span><span className="text-[#8899AA]">:</span> <span className="text-emerald-300">"emp_sb_9x2b"</span>{`,
      `}<span className="text-rose-300">"first_name"</span><span className="text-[#8899AA]">:</span> <span className="text-emerald-300">"John"</span>{`,
      `}<span className="text-rose-300">"last_name"</span><span className="text-[#8899AA]">:</span> <span className="text-emerald-300">"Doe (Sandbox)"</span>{`,
      `}<span className="text-rose-300">"status"</span><span className="text-[#8899AA]">:</span> <span className="text-emerald-300">"active"</span>{`
    `}<span className="text-purple-300">{`}`}</span>{`,
    ...
  `}<span className="text-amber-300">{`]`}</span>{`,
  `}<span className="text-rose-300">"meta"</span><span className="text-[#8899AA]">:</span> <span className="text-amber-300">{`{`}</span>{`
    `}<span className="text-rose-300">"total_count"</span><span className="text-[#8899AA]">:</span> <span className="text-orange-400">12</span>{`,
    `}<span className="text-rose-300">"limit"</span><span className="text-[#8899AA]">:</span> <span className="text-orange-400">5</span>{`
  `}<span className="text-amber-300">{`}`}</span>{`
`}<span className="text-sky-300">{`}`}</span></pre>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
