"use client";

import React, { useState } from 'react';
import {
    Folder, FileText, Search, Filter, MoreVertical, UploadCloud,
    FolderPlus, Lock, Clock, Users, Star, LayoutGrid, List
} from 'lucide-react';
import Link from 'next/link';

const FOLDERS = [
    { id: 'F01', name: 'Corporate Policies', files: 24, size: '4.2 MB', access: 'All Employees', color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
    { id: 'F02', name: 'Employee Records', files: 1240, size: '2.1 GB', access: 'HR Admin Only', color: 'text-rose-500', bg: 'bg-rose-500/10' },
    { id: 'F03', name: 'Offer Letters', files: 342, size: '156 MB', access: 'Recruitment', color: 'text-amber-500', bg: 'bg-amber-500/10' },
    { id: 'F04', name: 'Compliance Docs', files: 89, size: '12 MB', access: 'Legal & HR', color: 'text-[#00E5A0]', bg: 'bg-[#00E5A0]/10' },
];

const RECENT_FILES = [
    { id: 'DOC-1024', name: 'Q3_Townhall_Deck.pdf', type: 'PDF', size: '4.5 MB', owner: 'Rahul S.', date: 'Today, 10:30 AM', starred: true },
    { id: 'DOC-1023', name: 'Employee_Handbook_v3.pdf', type: 'PDF', size: '2.1 MB', owner: 'HR Team', date: 'Yesterday, 04:15 PM', starred: true },
    { id: 'DOC-1022', name: 'Salary_Revision_Letter_Template.docx', type: 'DOCX', size: '156 KB', owner: 'Priya P.', date: '12 Nov 2024', starred: false },
    { id: 'DOC-1021', name: 'PF_Registration_Ack.pdf', type: 'PDF', size: '890 KB', owner: 'Finance', date: '10 Nov 2024', starred: false },
    { id: 'DOC-1020', name: 'Leave_Policy_2025_Draft.docx', type: 'DOCX', size: '210 KB', owner: 'Amit Singh', date: '08 Nov 2024', starred: false },
];

export default function DocumentRepositoryScreen() {
    const [view, setView] = useState('grid');

    return (
        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200 flex flex-col">
            <div className="max-w-[1400px] mx-auto w-full flex-1 flex flex-col">

                {/* Header */}
                <div className="flex justify-between items-center mb-6 shrink-0">
                    <div>
                        <h1 className="text-2xl font-bold text-white mb-1">Company Documents</h1>
                        <p className="text-sm text-[#8899AA]">Secure, centralized repository for all HR and company files.</p>
                    </div>
                    <div className="flex space-x-3">
                        <Link href="/documents/upload" className="px-4 py-2 border border-[#1A2A3A] bg-[#0A1420] text-sm font-semibold rounded-lg hover:bg-[#1A2A3A] transition-colors flex items-center text-white shadow-sm">
                            <UploadCloud size={16} className="mr-2 text-[#00E5A0]" /> Upload File
                        </Link>
                        <button className="px-4 py-2 bg-[#0066FF] text-white font-bold text-sm rounded-lg hover:bg-[#0052cc] transition-colors shadow-[0_0_15px_rgba(0,102,255,0.3)] flex items-center gap-2">
                            <FolderPlus size={16} /> New Folder
                        </button>
                    </div>
                </div>

                {/* Search & Toolbar */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-3 mb-8 shrink-0 flex justify-between items-center shadow-sm">
                    <div className="flex items-center space-x-3 w-1/2">
                        <div className="relative w-full max-w-md">
                            <Search size={16} className="absolute left-3 top-2.5 text-[#556677]" />
                            <input
                                type="text"
                                placeholder="Search files, folders, content..."
                                className="bg-[#060B14] border border-[#1A2A3A] text-sm text-white rounded-lg pl-9 pr-3 py-2 outline-none focus:border-[#0066FF] w-full transition-colors"
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex bg-[#060B14] p-1 rounded-lg border border-[#1A2A3A]">
                            <button onClick={() => setView('grid')} className={`p-1.5 rounded ${view === 'grid' ? 'bg-[#1A2A3A] text-white' : 'text-[#556677] hover:text-white'}`}><LayoutGrid size={16} /></button>
                            <button onClick={() => setView('list')} className={`p-1.5 rounded ${view === 'list' ? 'bg-[#1A2A3A] text-white' : 'text-[#556677] hover:text-white'}`}><List size={16} /></button>
                        </div>
                        <button className="px-3 py-2 bg-[#060B14] border border-[#1A2A3A] rounded-lg text-sm text-[#8899AA] hover:text-white transition-colors flex items-center">
                            <Filter size={16} className="mr-2" /> Filter
                        </button>
                    </div>
                </div>

                {/* Categories / Folders */}
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-base font-bold text-white uppercase tracking-wider">Quick Access Folders</h2>
                        <Link href="/documents/categories" className="text-sm font-semibold text-[#0066FF] hover:underline">View All</Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        {FOLDERS.map(f => (
                            <div key={f.id} className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl p-5 hover:border-[#2A3A4A] cursor-pointer transition-colors group">
                                <div className="flex justify-between items-start mb-4">
                                    <div className={`w-10 h-10 rounded-lg ${f.bg} flex items-center justify-center`}>
                                        <Folder className={f.color} size={20} fill="currentColor" fillOpacity={0.2} />
                                    </div>
                                    <button className="text-[#556677] hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"><MoreVertical size={16} /></button>
                                </div>
                                <h3 className="font-bold text-white text-base mb-1 truncate">{f.name}</h3>
                                <div className="flex items-center gap-3 text-xs text-[#8899AA]">
                                    <span>{f.files} files</span>
                                    <span>•</span>
                                    <span>{f.size}</span>
                                </div>
                                <div className="mt-4 pt-4 border-t border-[#1A2A3A] flex items-center gap-1.5 text-[10px] uppercase font-bold text-[#556677]">
                                    {f.access === 'All Employees' ? <Users size={12} /> : <Lock size={12} />}
                                    {f.access}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Files */}
                <div className="flex-1 flex flex-col min-h-0 bg-[#0A1420] border border-[#1A2A3A] rounded-xl shadow-lg pb-4">
                    <div className="p-5 border-b border-[#1A2A3A] bg-[#0D1928] sticky top-0 z-10 flex justify-between items-center">
                        <h2 className="text-base font-bold text-white uppercase tracking-wider">Recent Files</h2>
                    </div>

                    <div className="flex-1 overflow-auto custom-scrollbar">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-[#060B14]">
                                <tr>
                                    <th className="p-3 w-10"></th>
                                    <th className="p-3 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Name</th>
                                    <th className="p-3 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Owner</th>
                                    <th className="p-3 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Last Modified</th>
                                    <th className="p-3 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Size</th>
                                    <th className="p-3 text-xs font-semibold text-[#8899AA] uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#1A2A3A]">
                                {RECENT_FILES.map(file => (
                                    <tr key={file.id} className="hover:bg-[#1A2A3A]/30 transition-colors group cursor-pointer">
                                        <td className="p-3 text-center">
                                            <Star size={16} className={`mx-auto ${file.starred ? 'text-amber-500 fill-amber-500' : 'text-[#2A3A4A] group-hover:text-[#556677]'}`} />
                                        </td>
                                        <td className="p-3">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-8 h-8 rounded shrink-0 flex items-center justify-center font-bold text-[10px] 
                                                    ${file.type === 'PDF' ? 'bg-rose-500/10 text-rose-500' : 'bg-[#0066FF]/10 text-[#0066FF]'}`}>
                                                    {file.type}
                                                </div>
                                                <span className="font-semibold text-white text-sm group-hover:text-[#0066FF] transition-colors">{file.name}</span>
                                            </div>
                                        </td>
                                        <td className="p-3 text-sm text-slate-300">{file.owner}</td>
                                        <td className="p-3 text-sm text-[#8899AA]">{file.date}</td>
                                        <td className="p-3 text-sm text-[#8899AA]">{file.size}</td>
                                        <td className="p-3 text-right">
                                            <button className="p-1.5 text-[#556677] hover:bg-[#2A3A4A] hover:text-white rounded transition-colors opacity-0 group-hover:opacity-100">
                                                <MoreVertical size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
}
