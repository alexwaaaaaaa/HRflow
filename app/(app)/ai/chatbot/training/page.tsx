"use client";

import React, { useState } from 'react';
import { UploadCloud, File, Trash2, CheckCircle, Clock, Zap, Target, Search } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function ChatbotTrainingPage() {
    const [isTraining, setIsTraining] = useState(false);

    const documents = [
        { id: 1, name: 'Employee Handbook 2024.pdf', size: '2.4 MB', tokens: '42K', status: 'Indexed', date: 'Oct 12' },
        { id: 2, name: 'Leave Policy Rev 3.docx', size: '850 KB', tokens: '14K', status: 'Indexed', date: 'Oct 15' },
        { id: 3, name: 'Q3 Townhall Transcript.txt', size: '120 KB', tokens: '8K', status: 'Queued', date: 'Today' },
        { id: 4, name: 'Expense Guidelines v2.pdf', size: '1.1 MB', tokens: '22K', status: 'Error', date: 'Yesterday' },
    ];

    const startTraining = () => {
        setIsTraining(true);
        setTimeout(() => setIsTraining(false), 3000);
    };

    return (
        <div className="p-6 md:p-8 animate-fade-in max-w-7xl mx-auto">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight mb-2 flex items-center gap-3">
                        <Target size={28} className="text-emerald-400" /> AI Knowledge Base & Training
                    </h1>
                    <p className="text-[#8899AA] text-sm max-w-2xl">
                        Upload company documents, policies, and transcripts to fine-tune the Kaarya AI assistant. The model continuously learns from your specific organizational context.
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button variant="secondary" className="border-[#2A3A4A] text-white">
                        <Search size={16} className="mr-2" /> Test Model
                    </Button>
                    <Button
                        onClick={startTraining}
                        disabled={isTraining}
                        className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white border-none min-w-[160px]"
                    >
                        {isTraining ? (
                            <span className="flex items-center gap-2">
                                <Zap size={16} className="animate-pulse" /> Training...
                            </span>
                        ) : (
                            <span className="flex items-center gap-2">
                                <Zap size={16} /> Run Fine-tuning
                            </span>
                        )}
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                {/* Stats */}
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 flex flex-col justify-between">
                    <div>
                        <div className="text-[#8899AA] text-sm font-medium uppercase tracking-wider mb-4">Current Knowledge Scope</div>
                        <div className="text-4xl font-bold text-white mb-1">
                            842 <span className="text-xl text-[#8899AA] font-normal">Docs</span>
                        </div>
                        <div className="text-emerald-400 text-sm font-medium">+12 added this week</div>
                    </div>
                    <div className="mt-8">
                        <div className="flex justify-between text-sm mb-2">
                            <span className="text-[#8899AA]">Vector Database Capacity</span>
                            <span className="text-white font-medium">32%</span>
                        </div>
                        <div className="w-full bg-[#1A2A3A] rounded-full h-2">
                            <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '32%' }}></div>
                        </div>
                    </div>
                </div>

                {/* Upload Zone */}
                <div className="lg:col-span-2 bg-[#0D1928] border-2 border-dashed border-[#2A3A4A] hover:border-emerald-500/50 transition-colors rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer group relative overflow-hidden">
                    <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="bg-[#1A2A3A] group-hover:bg-emerald-500/10 p-4 rounded-full mb-4 transition-colors">
                        <UploadCloud size={32} className="text-[#8899AA] group-hover:text-emerald-400 transition-colors" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">Drag & Drop documents here</h3>
                    <p className="text-[#8899AA] text-sm max-w-md mx-auto mb-6">
                        Supported formats: PDF, DOCX, TXT, CSV. Max file size: 50MB. All data is encrypted and completely sandboxed to your organization.
                    </p>
                    <Button variant="secondary" className="border-emerald-500/30 text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 z-10 w-48">
                        Browse Files
                    </Button>
                </div>
            </div>

            {/* Document List */}
            <h3 className="text-lg font-semibold text-white mb-4">Training Queue & History</h3>
            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-[#0A1420] border-b border-[#1A2A3A]">
                            <th className="px-6 py-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Document Name</th>
                            <th className="px-6 py-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Size</th>
                            <th className="px-6 py-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Tokens</th>
                            <th className="px-6 py-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Added</th>
                            <th className="px-6 py-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1A2A3A]">
                        {documents.map((doc, i) => (
                            <tr key={i} className="hover:bg-[#131B2B] transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <File size={16} className="text-[#8899AA]" />
                                        <span className="text-sm font-medium text-white group-hover:text-emerald-400 transition-colors">{doc.name}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-[#8899AA]">{doc.size}</td>
                                <td className="px-6 py-4 text-sm text-[#445566]">{doc.tokens}</td>
                                <td className="px-6 py-4">
                                    {doc.status === 'Indexed' && <span className="text-emerald-400 text-xs font-medium flex items-center gap-1.5"><CheckCircle size={14} /> Indexed</span>}
                                    {doc.status === 'Queued' && <span className="text-amber-400 text-xs font-medium flex items-center gap-1.5"><Clock size={14} /> Queued</span>}
                                    {doc.status === 'Error' && <span className="text-red-400 text-xs font-medium flex items-center gap-1.5"><ThTrash2 size={14} /> Extraction Error</span>}
                                </td>
                                <td className="px-6 py-4 text-sm text-[#8899AA]">{doc.date}</td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-[#8899AA] hover:text-red-400 transition-colors p-2 rounded-lg hover:bg-red-500/10 opacity-0 group-hover:opacity-100">
                                        <Trash2 size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
}

const ThTrash2 = Trash2; // Helper since I typed ThTrash2 above
