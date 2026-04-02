"use client";
import React, { useState } from 'react';
import { Keyboard, ArrowLeft, Search } from 'lucide-react';
import Link from 'next/link';

const SHORTCUTS = [
    {
        category: 'Navigation', items: [
            { keys: ['G', 'D'], desc: 'Go to Dashboard' },
            { keys: ['G', 'E'], desc: 'Go to Employees' },
            { keys: ['G', 'P'], desc: 'Go to Payroll' },
            { keys: ['G', 'L'], desc: 'Go to Leave' },
            { keys: ['G', 'R'], desc: 'Go to Reports' },
            { keys: ['G', 'S'], desc: 'Go to Settings' },
        ]
    },
    {
        category: 'Actions', items: [
            { keys: ['Ctrl/⌘', 'K'], desc: 'Open Command Palette' },
            { keys: ['Ctrl/⌘', 'N'], desc: 'New Employee' },
            { keys: ['Ctrl/⌘', 'S'], desc: 'Save Changes' },
            { keys: ['Ctrl/⌘', 'Z'], desc: 'Undo Last Action' },
            { keys: ['Ctrl/⌘', 'Enter'], desc: 'Submit / Confirm' },
            { keys: ['Esc'], desc: 'Close Modal / Cancel' },
        ]
    },
    {
        category: 'Payroll', items: [
            { keys: ['Alt', 'P'], desc: 'Run Payroll' },
            { keys: ['Alt', 'S'], desc: 'Salary Revision Wizard' },
            { keys: ['Alt', 'E'], desc: 'Export Payroll Report' },
            { keys: ['Alt', 'F'], desc: 'Generate Full & Final' },
        ]
    },
    {
        category: 'Leave & Attendance', items: [
            { keys: ['Alt', 'L'], desc: 'Apply Leave' },
            { keys: ['Alt', 'A'], desc: 'Attendance Overview' },
            { keys: ['Alt', 'R'], desc: 'Regularize Attendance' },
        ]
    },
    {
        category: 'General', items: [
            { keys: ['?'], desc: 'Show This Shortcuts Guide' },
            { keys: ['Ctrl/⌘', '/'], desc: 'Focus Search Bar' },
            { keys: ['F5'], desc: 'Refresh Current View' },
            { keys: ['Alt', '←'], desc: 'Go Back' },
            { keys: ['Alt', '→'], desc: 'Go Forward' },
        ]
    },
];

export default function KeyboardShortcutsScreen() {
    const [search, setSearch] = useState('');
    const filtered = SHORTCUTS.map(section => ({
        ...section,
        items: section.items.filter(item => !search || item.desc.toLowerCase().includes(search.toLowerCase()) || item.keys.join(' ').toLowerCase().includes(search.toLowerCase()))
    })).filter(s => s.items.length);

    return (
        <div className="min-h-screen p-6 max-w-4xl mx-auto space-y-6">
            <Link href="/help" className="text-[#556677] hover:text-white text-sm font-bold flex items-center gap-1 mb-2"><ArrowLeft size={14} /> Help Center</Link>
            <div>
                <h1 className="text-2xl font-bold text-white flex items-center gap-3"><Keyboard size={22} className="text-teal-400" /> Keyboard Shortcuts</h1>
                <p className="text-[#8899AA] text-sm mt-1">50+ shortcuts to work 3x faster across HRFlow</p>
            </div>

            <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#556677]" />
                <input type="text" placeholder="Search shortcuts..." value={search} onChange={e => setSearch(e.target.value)}
                    className="w-full bg-[#0A1420] border border-[#1A2A3A] rounded-xl pl-10 pr-4 py-2.5 text-white text-sm focus:border-teal-500 outline-none transition-colors" />
            </div>

            <div className="grid md:grid-cols-2 gap-5">
                {filtered.map(section => (
                    <div key={section.category} className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl overflow-hidden">
                        <div className="p-4 border-b border-[#1A2A3A] bg-[#060D1A]">
                            <h3 className="text-teal-400 font-bold text-sm">{section.category}</h3>
                        </div>
                        <div className="divide-y divide-[#1A2A3A]">
                            {section.items.map((item, i) => (
                                <div key={i} className="flex items-center justify-between p-4 hover:bg-[#131B2B] transition-colors">
                                    <span className="text-[#AABBCC] text-sm">{item.desc}</span>
                                    <div className="flex items-center gap-1 shrink-0 ml-4">
                                        {item.keys.map((key, ki) => (
                                            <React.Fragment key={ki}>
                                                {ki > 0 && <span className="text-[#445566] text-xs">+</span>}
                                                <kbd className="bg-[#1A2A3A] border border-[#2A3A4A] text-white text-xs font-bold px-2.5 py-1 rounded-lg font-mono">{key}</kbd>
                                            </React.Fragment>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
