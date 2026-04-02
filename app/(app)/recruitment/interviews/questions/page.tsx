"use client";
import React, { useState } from "react";
import { Search, Plus, List, Filter, Edit3, Trash2 } from "lucide-react";

const CATEGORIES = ["React", "System Design", "Behavioral", "Algorithms", "Leadership"];

const QUESTIONS = [
    { id: 1, title: "Explain the Virtual DOM and Reconciliation process in React.", cat: "React", hard: "Medium", used: 145 },
    { id: 2, title: "Design a URL shortener service like Bitly.", cat: "System Design", hard: "Hard", used: 89 },
    { id: 3, title: "Tell me about a time you failed and how you handled it.", cat: "Behavioral", hard: "Easy", used: 312 },
    { id: 4, title: "How do you manage cross-team dependencies and resolve technical disagreements?", cat: "Leadership", hard: "Medium", used: 45 },
    { id: 5, title: "Reverse a linked list in O(1) space complexity.", cat: "Algorithms", hard: "Medium", used: 210 },
];

const DIFF_COLORS: Record<string, string> = {
    Easy: "#00E5A0", Medium: "#FFB800", Hard: "#FF4444"
};

export default function InterviewQuestionBank() {
    const [search, setSearch] = useState("");

    return (
        <div className="p-6 md:p-8 max-w-[1200px] mx-auto text-white">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-1">Interview Question Bank</h1>
                    <p className="text-sm text-[#8899AA]">Standardize interviews with a centralized repository of approved questions</p>
                </div>
                <button className="h-10 px-4 bg-[#00E5A0] text-[#060B14] text-sm font-bold rounded-xl hover:bg-[#00c98d] flex items-center gap-2 transition-colors">
                    <Plus size={14} /> Add Question
                </button>
            </div>

            <div className="flex gap-4 mb-6">
                <div className="relative flex-1 max-w-md">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#445566]" />
                    <input
                        value={search} onChange={e => setSearch(e.target.value)}
                        placeholder="Search questions..."
                        className="w-full h-10 bg-[#0D1928] border border-[#1A2A3A] rounded-xl pl-9 px-3 text-sm text-white focus:outline-none focus:border-[#0066FF]"
                    />
                </div>
                <div className="flex gap-2">
                    {["All", ...CATEGORIES.slice(0, 3)].map(c => (
                        <button key={c} className={`h-10 px-4 text-xs font-semibold border rounded-xl transition-all ${c === 'All' ? 'bg-[#1A2A3A] border-[#2A3A4A] text-white' : 'bg-[#0D1928] border-[#1A2A3A] text-[#8899AA] hover:border-[#2A3A4A]'}`}>
                            {c}
                        </button>
                    ))}
                    <button className="h-10 w-10 border border-[#1A2A3A] rounded-xl flex items-center justify-center text-[#8899AA]"><Plus size={14} /></button>
                </div>
                <button className="h-10 px-4 bg-[#0D1928] border border-[#1A2A3A] text-[#8899AA] text-sm rounded-xl hover:bg-[#1A2A3A] flex items-center gap-2 ml-auto">
                    <Filter size={14} /> Filters
                </button>
            </div>

            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-[#0A1420] text-[#8899AA] text-xs">
                        <tr>
                            <th className="px-6 py-4 font-medium w-1/2">Question</th>
                            <th className="px-6 py-4 font-medium">Category</th>
                            <th className="px-6 py-4 font-medium text-center">Difficulty</th>
                            <th className="px-6 py-4 font-medium text-center">Usage Count</th>
                            <th className="px-6 py-4 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1A2A3A]">
                        {QUESTIONS.filter(q => q.title.toLowerCase().includes(search.toLowerCase())).map(q => (
                            <tr key={q.id} className="hover:bg-[#1A2A3A]/30 transition-colors group">
                                <td className="px-6 py-4">
                                    <p className="font-medium text-white">{q.title}</p>
                                </td>
                                <td className="px-6 py-4 text-[#8899AA] text-xs">
                                    <span className="bg-[#1A2A3A] px-2.5 py-1 rounded text-white">{q.cat}</span>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <span style={{ color: DIFF_COLORS[q.hard] }} className="text-xs font-bold bg-[#1A2A3A]/50 px-2 py-0.5 rounded">{q.hard}</span>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <span className="text-xs font-semibold text-white">{q.used} times</span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="w-8 h-8 rounded-lg flex items-center justify-center text-[#8899AA] hover:bg-[#1A2A3A] hover:text-white"><Edit3 size={14} /></button>
                                        <button className="w-8 h-8 rounded-lg flex items-center justify-center text-[#8899AA] hover:bg-[#FF4444]/10 hover:text-[#FF4444]"><Trash2 size={14} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
