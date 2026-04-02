"use client";

import React, { useState } from 'react';
import { Mail, Plus, Search, Filter, Edit2, Copy, Trash2, Eye, Send, Code, Save } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function EmailTemplateSettingsPage() {
    const [activeCategory, setActiveCategory] = useState('Onboarding');

    const categories = ['Onboarding', 'Leave & Attendance', 'Payroll', 'Performance', 'System Alerts'];

    const templates = [
        { id: 'TPL-ONB-01', name: 'Welcome Email (New Hire)', subject: 'Welcome to Kaarya, {{first_name}}! 🚀', status: 'Active', category: 'Onboarding', lastUpdated: '2 days ago' },
        { id: 'TPL-ONB-02', name: 'IT Provisioning Request', subject: 'Action Required: IT Setup for {{full_name}}', status: 'Active', category: 'Onboarding', lastUpdated: '1 month ago' },
        { id: 'TPL-ONB-03', name: 'Manager Introduction', subject: 'Your new team member is joining soon', status: 'Draft', category: 'Onboarding', lastUpdated: 'Just now' },
    ];

    return (
        <div className="p-6 md:p-8 animate-fade-in max-w-7xl mx-auto flex flex-col h-[calc(100vh-80px)]">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4 shrink-0">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight mb-2 flex items-center gap-3">
                        <Mail size={28} className="text-indigo-400" /> Email Templates
                    </h1>
                    <p className="text-[#8899AA] text-sm max-w-2xl">
                        Design and manage system-generated email communications with dynamic variables.
                    </p>
                </div>
                <div className="flex gap-3">
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl flex items-center px-3 py-1.5 focus-within:border-indigo-500/50 transition-colors w-64 hidden md:flex">
                        <Search size={16} className="text-[#8899AA]" />
                        <input type="text" placeholder="Search templates..." className="bg-transparent border-none outline-none text-white text-sm ml-2 w-full" />
                    </div>
                    <Button className="bg-indigo-600 hover:bg-indigo-500 text-white border-none py-2 px-6">
                        <Plus size={16} className="mr-2" /> Create Template
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 flex-1 overflow-hidden">

                {/* Categories Sidebar */}
                <div className="lg:col-span-1 flex flex-col gap-2 shrink-0">
                    <h3 className="text-xs font-semibold text-[#445566] uppercase tracking-wider mb-2 px-2">Categories</h3>
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`flex items-center justify-between w-full p-3 rounded-xl transition-colors text-sm font-medium ${activeCategory === cat
                                ? 'bg-[#1A2A3A] text-white border border-[#2A3A4A]'
                                : 'text-[#8899AA] hover:bg-[#131B2B] hover:text-white border border-transparent'
                                }`}
                        >
                            {cat}
                            {cat === 'Onboarding' && <span className="bg-[#0A1420] text-[#8899AA] px-2 py-0.5 rounded text-xs border border-[#1A2A3A]">3</span>}
                        </button>
                    ))}
                </div>

                {/* Templates List Area */}
                <div className="lg:col-span-3 bg-[#0D1928] border border-[#1A2A3A] rounded-2xl flex flex-col h-full overflow-hidden">

                    {/* List Header */}
                    <div className="p-4 border-b border-[#1A2A3A] bg-[#131B2B] flex justify-between items-center shrink-0">
                        <h2 className="text-white font-medium">{activeCategory} Templates</h2>
                        <Button variant="secondary" className="border-[#2A3A4A] text-xs h-auto py-1.5">
                            <Filter size={14} className="mr-2" /> Filter List
                        </Button>
                    </div>

                    {/* Table/List */}
                    <div className="flex-1 overflow-y-auto w-full">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-[#1A2A3A] bg-[#0A1420]/50">
                                    <th className="p-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Template Name</th>
                                    <th className="p-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Subject Line Focus</th>
                                    <th className="p-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Status</th>
                                    <th className="p-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {templates.map((tpl) => (
                                    <tr key={tpl.id} className="border-b border-[#1A2A3A] hover:bg-[#131B2B] transition-colors group">
                                        <td className="p-4">
                                            <div className="flex flex-col">
                                                <span className="text-white font-medium text-sm mb-1">{tpl.name}</span>
                                                <span className="text-xs text-[#445566] font-mono">{tpl.id}</span>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="text-sm text-[#8899AA] truncate max-w-[250px]" title={tpl.subject}>
                                                {/* Highlight variables */}
                                                {tpl.subject.split(/(\{\{.*?\}\})/).map((part, i) =>
                                                    part.startsWith('{{') ? <span key={i} className="text-indigo-400 bg-indigo-500/10 px-1 rounded font-mono text-[10px]">{part}</span> : part
                                                )}
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-2.5 py-1 rounded text-xs font-medium border ${tpl.status === 'Active'
                                                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                                : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                                                }`}>
                                                {tpl.status}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button className="p-1.5 bg-[#1A2A3A] hover:bg-[#2A3A4A] border border-[#2A3A4A] rounded-lg text-[#8899AA] hover:text-white transition-colors" title="Edit Template">
                                                    <Edit2 size={14} />
                                                </button>
                                                <button className="p-1.5 bg-[#1A2A3A] hover:bg-[#2A3A4A] border border-[#2A3A4A] rounded-lg text-[#8899AA] hover:text-white transition-colors" title="Preview">
                                                    <Eye size={14} />
                                                </button>
                                                <button className="p-1.5 bg-[#1A2A3A] hover:bg-[#2A3A4A] border border-[#2A3A4A] rounded-lg text-[#8899AA] hover:text-white transition-colors" title="Send Test">
                                                    <Send size={14} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Editor Split View Placeholder */}
                    <div className="h-64 border-t border-[#1A2A3A] bg-[#0A1420] p-4 flex flex-col">
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex flex-col">
                                <span className="text-white text-sm font-medium">Quick Editor: Welcome Email (New Hire)</span>
                                <span className="text-[#445566] text-xs">Supports HTML and Liquid templating</span>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="secondary" className="border-[#2A3A4A] text-xs h-auto py-1"><Code size={14} className="mr-1.5" /> HTML Snippets</Button>
                                <Button className="bg-indigo-600 hover:bg-indigo-500 text-white border-none text-xs h-auto py-1"><Save size={14} className="mr-1.5" /> Save Draft</Button>
                            </div>
                        </div>
                        <div className="flex-1 bg-[#131B2B] border border-[#2A3A4A] rounded-xl p-3 font-mono text-xs text-[#8899AA] overflow-y-auto leading-relaxed">
                            <span className="text-pink-400">&lt;div</span> <span className="text-yellow-400">className</span>=<span className="text-green-400">&quot;welcome-container&quot;</span><span className="text-pink-400">&gt;</span><br />
                            &nbsp;&nbsp;<span className="text-pink-400">&lt;h1&gt;</span>Welcome aboard, <span className="text-indigo-400 bg-indigo-500/10 px-1 rounded">{"{{first_name}}"}</span>!<span className="text-pink-400">&lt;/h1&gt;</span><br />
                            &nbsp;&nbsp;<span className="text-pink-400">&lt;p&gt;</span>We are thrilled to have you join the <span className="text-indigo-400 bg-indigo-500/10 px-1 rounded">{"{{department_name}}"}</span> team starting <span className="text-indigo-400 bg-indigo-500/10 px-1 rounded">{"{{joining_date}}"}</span>.<span className="text-pink-400">&lt;/p&gt;</span><br />
                            &nbsp;&nbsp;<span className="text-pink-400">&lt;p&gt;</span>Your manager, <span className="text-indigo-400 bg-indigo-500/10 px-1 rounded">{"{{manager_name}}"}</span>, will connect with you shortly.<span className="text-pink-400">&lt;/p&gt;</span><br />
                            <span className="text-pink-400">&lt;/div&gt;</span>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}
