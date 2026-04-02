"use client";
import React, { useState } from "react";
import {
    FolderTree, Plus, Settings, AlertCircle, Search,
    ChevronRight, Edit2, Trash2, Users, CornerDownRight
} from "lucide-react";

export default function HelpdeskCategorySetup() {
    const [activeCategory, setActiveCategory] = useState("IT");

    return (
        <div className="p-6 max-w-[1400px] mx-auto min-h-[calc(100vh-80px)]">

            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 pb-6 border-b border-[#1A2A3A]">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                        <FolderTree size={28} className="text-[#33E6FF]" />
                        Helpdesk Categories & Routing
                    </h1>
                    <p className="text-[#8899AA] text-sm mt-1">Configure ticket categories, assign default agents, and set up auto-routing rules.</p>
                </div>
                <div className="flex gap-3 mt-4 md:mt-0">
                    <button className="px-5 py-2 bg-[#00E5A0] text-[#0A1420] rounded-lg hover:bg-[#00c98d] transition-colors text-sm font-semibold flex items-center gap-2">
                        <Plus size={16} /> New Category
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                {/* Categories Sidebar */}
                <div className="lg:col-span-1 space-y-4">
                    <div className="relative mb-4">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#445566]" size={16} />
                        <input
                            type="text"
                            placeholder="Search categories..."
                            className="w-full bg-[#0F1C2E] border border-[#1A2A3A] rounded-xl pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-[#33E6FF] transition-colors"
                        />
                    </div>

                    <div className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-2xl overflow-hidden">
                        <div className="p-4 bg-[#152336] border-b border-[#1A2A3A] flex justify-between items-center">
                            <h3 className="font-bold text-white text-sm">Parent Categories</h3>
                        </div>
                        <div className="divide-y divide-[#1A2A3A]">
                            {["IT Support", "HR & Payroll", "Facilities", "Legal & Compliance", "Finance"].map(cat => {
                                const isIT = cat === "IT Support";
                                const isActive = activeCategory === (isIT ? "IT" : cat);
                                return (
                                    <button
                                        key={cat}
                                        onClick={() => setActiveCategory(isIT ? "IT" : cat)}
                                        className={`w-full flex items-center justify-between p-4 transition-colors ${isActive ? 'bg-[#1A2A3A] border-l-2 border-l-[#33E6FF]' : 'hover:bg-[#1A2A3A]/50 border-l-2 border-l-transparent'
                                            }`}
                                    >
                                        <span className={`text-sm font-semibold ${isActive ? 'text-white' : 'text-[#8899AA]'}`}>{cat}</span>
                                        <ChevronRight size={16} className={isActive ? "text-[#33E6FF]" : "text-[#445566]"} />
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Configuration Canvas */}
                <div className="lg:col-span-3">
                    {activeCategory === "IT" ? (
                        <div className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-2xl overflow-hidden">

                            {/* Category Details */}
                            <div className="p-8 border-b border-[#1A2A3A] flex justify-between items-start">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <h2 className="text-2xl font-bold text-white">IT Support</h2>
                                        <span className="px-2 py-0.5 rounded bg-[#00E5A0]/10 text-[#00E5A0] text-[10px] uppercase font-bold tracking-wider border border-[#00E5A0]/20">Active</span>
                                    </div>
                                    <p className="text-[#8899AA] text-sm">Hardware, software access, network issues, and general tech support.</p>
                                </div>
                                <div className="flex gap-2">
                                    <button className="p-2 border border-[#2A3A4A] text-[#8899AA] hover:text-white rounded-lg transition-colors"><Edit2 size={16} /></button>
                                    <button className="p-2 border border-[#2A3A4A] text-[#8899AA] hover:text-[#FF4444] rounded-lg transition-colors"><Trash2 size={16} /></button>
                                </div>
                            </div>

                            <div className="p-8 space-y-8">

                                {/* Default Assignments */}
                                <div>
                                    <h3 className="text-sm font-bold tracking-wider text-[#8899AA] uppercase mb-4 flex items-center gap-2">
                                        <Users size={16} /> Default Assignments
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="bg-[#1A2A3A] p-4 rounded-xl border border-[#2A3A4A]">
                                            <span className="block text-xs text-[#8899AA] mb-2 font-medium">Default Assignee Group</span>
                                            <select className="w-full bg-[#0A1420] border border-[#2A3A4A] text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#33E6FF]">
                                                <option>IT L1 Support Desk</option>
                                                <option>IT L2 Advanced</option>
                                                <option>Network Admin Team</option>
                                            </select>
                                        </div>
                                        <div className="bg-[#1A2A3A] p-4 rounded-xl border border-[#2A3A4A]">
                                            <span className="block text-xs text-[#8899AA] mb-2 font-medium">Auto-apply SLA Policy</span>
                                            <select className="w-full bg-[#0A1420] border border-[#2A3A4A] text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#33E6FF]">
                                                <option>Standard 8h Resolution</option>
                                                <option>Critical 2h Resolution</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {/* Sub-categories */}
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-sm font-bold tracking-wider text-[#8899AA] uppercase flex items-center gap-2">
                                            <FolderTree size={16} /> Sub-Categories
                                        </h3>
                                        <button className="text-sm text-[#33E6FF] hover:underline font-semibold flex items-center gap-1"><Plus size={14} /> Add Sub-category</button>
                                    </div>

                                    <div className="border border-[#1A2A3A] rounded-xl overflow-hidden bg-[#0A1420]">
                                        <table className="w-full text-left border-collapse">
                                            <thead>
                                                <tr className="bg-[#1A2A3A] text-[#8899AA] text-xs uppercase tracking-wider font-medium">
                                                    <th className="p-3">Name</th>
                                                    <th className="p-3">Specific Assignee</th>
                                                    <th className="p-3 text-right">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-[#1A2A3A] text-sm text-white">
                                                {[
                                                    { name: "Hardware Issue", assignee: "IT Assets Team" },
                                                    { name: "Software License", assignee: "Amit Verma (Direct)" },
                                                    { name: "Network / VPN", assignee: "Network Admin Team" },
                                                ].map((sub, i) => (
                                                    <tr key={i} className="hover:bg-[#1A2A3A]/30 transition-colors">
                                                        <td className="p-3 flex items-center gap-2">
                                                            <CornerDownRight size={14} className="text-[#445566]" />
                                                            <span className="font-semibold">{sub.name}</span>
                                                        </td>
                                                        <td className="p-3 text-[#8899AA]">{sub.assignee}</td>
                                                        <td className="p-3 text-right">
                                                            <button className="text-[#445566] hover:text-white transition-colors"><Edit2 size={14} /></button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                {/* Auto-Routing Rules */}
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-sm font-bold tracking-wider text-[#8899AA] uppercase flex items-center gap-2">
                                            <Settings size={16} /> Keyword Auto-Routing
                                        </h3>
                                        <button className="text-sm text-[#00E5A0] hover:underline font-semibold flex items-center gap-1"><Plus size={14} /> Add Rule</button>
                                    </div>

                                    <div className="bg-[#1A2A3A] border border-[#2A3A4A] rounded-xl p-4 flex items-center justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 text-sm text-white font-medium mb-1">
                                                If description contains <span className="bg-[#33E6FF]/10 text-[#33E6FF] px-2 py-0.5 rounded border border-[#33E6FF]/20">'Jira', 'Confluence', 'Figma'</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-[#8899AA]">
                                                Then route to <span className="text-white bg-[#0A1420] px-2 py-0.5 rounded border border-[#2A3A4A]">Software License</span> sub-category
                                            </div>
                                        </div>
                                        <button className="text-[#445566] hover:text-[#FF4444] transition-colors"><Trash2 size={16} /></button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-[#445566] h-full bg-[#0F1C2E] border border-[#1A2A3A] rounded-2xl p-12">
                            <FolderTree size={64} className="mb-4 opacity-20" />
                            <h2 className="text-xl font-medium text-white mb-2">{activeCategory} Category Selected</h2>
                            <p className="text-sm">Mock view. Functionality mimics the IT Support configuration panel.</p>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}
