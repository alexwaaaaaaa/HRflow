"use client";
import React, { useState } from "react";
import { ArrowLeft, Search, Filter, MoreHorizontal, MessageSquare, Calendar, Star, Phone, Mail } from "lucide-react";

// Kanban Columns
const STAGES = [
    { id: "applied", label: "Applied", color: "#445566" },
    { id: "screening", label: "Screening", color: "#0066FF" },
    { id: "interview", label: "Interview", color: "#9B59B6" },
    { id: "offer", label: "Offer", color: "#FFB800" },
    { id: "hired", label: "Hired", color: "#00E5A0" },
];

const INIT_CANDS = [
    { id: "c1", name: "Rahul Sharma", role: "Sr. Frontend Eng", stage: "screening", exp: "5 Yrs", rating: 4, match: 88, source: "LinkedIn" },
    { id: "c2", name: "Anjali Singh", role: "Sr. Frontend Eng", stage: "applied", exp: "4 Yrs", rating: 0, match: 72, source: "Careers Page" },
    { id: "c3", name: "Vikram Reddy", role: "Sr. Frontend Eng", stage: "interview", exp: "6 Yrs", rating: 5, match: 95, source: "Referral" },
    { id: "c4", name: "Neha Gupta", role: "Sr. Frontend Eng", stage: "offer", exp: "5 Yrs", rating: 4, match: 90, source: "LinkedIn" },
    { id: "c5", name: "Karan Patel", role: "Sr. Frontend Eng", stage: "screening", exp: "3 Yrs", rating: 3, match: 65, source: "Indeed" },
    { id: "c6", name: "Suresh Rao", role: "Sr. Frontend Eng", stage: "applied", exp: "7 Yrs", rating: 0, match: 82, source: "LinkedIn" },
];

export default function JobKanbanBoard() {
    const [cands, setCands] = useState(INIT_CANDS);

    // Simple Drag & Drop state
    const [draggedItem, setDraggedItem] = useState<string | null>(null);

    const handleDragStart = (e: React.DragEvent, id: string) => {
        setDraggedItem(id);
        e.dataTransfer.effectAllowed = "move";
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault(); // Necessary to allow dropping
    };

    const handleDrop = (e: React.DragEvent, stageId: string) => {
        e.preventDefault();
        if (draggedItem) {
            setCands(prev => prev.map(c => c.id === draggedItem ? { ...c, stage: stageId } : c));
            setDraggedItem(null);
        }
    };

    return (
        <div className="flex flex-col h-[calc(100vh-64px)] overflow-hidden text-white">
            {/* Header */}
            <div className="p-6 md:p-8 shrink-0 flex items-center justify-between border-b border-[#1A2A3A]">
                <div className="flex items-center gap-4">
                    <button className="w-10 h-10 bg-[#0D1928] border border-[#1A2A3A] hover:bg-[#1A2A3A] rounded-xl flex items-center justify-center text-[#8899AA] transition-colors"><ArrowLeft size={16} /></button>
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <h1 className="text-2xl font-bold">Senior Frontend Engineer</h1>
                            <span className="px-2.5 py-1 text-[10px] font-bold rounded-full bg-[#00E5A0]/10 text-[#00E5A0]">Active</span>
                        </div>
                        <p className="text-sm text-[#8899AA]">Bengaluru, Hybrid · Engineering · Posted 12 Mar 2025</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <div className="relative">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#445566]" />
                        <input placeholder="Search candidate..." className="w-56 h-10 bg-[#0D1928] border border-[#1A2A3A] rounded-xl pl-9 px-3 text-sm text-white focus:outline-none focus:border-[#0066FF]" />
                    </div>
                    <button className="h-10 px-4 bg-[#0D1928] border border-[#1A2A3A] text-[#8899AA] text-sm rounded-xl hover:bg-[#1A2A3A] flex items-center gap-2 transition-colors">
                        <Filter size={14} /> Filter
                    </button>
                    <button className="h-10 w-10 bg-[#0D1928] border border-[#1A2A3A] text-[#8899AA] rounded-xl flex items-center justify-center hover:bg-[#1A2A3A] transition-colors"><MoreHorizontal size={16} /></button>
                </div>
            </div>

            {/* Kanban Board Area */}
            <div className="flex-1 overflow-x-auto p-6 md:p-8 flex gap-6 items-start scrollbar-thin scrollbar-thumb-[#1A2A3A] scrollbar-track-transparent">
                {STAGES.map(stage => {
                    const stageCands = cands.filter(c => c.stage === stage.id);
                    return (
                        <div key={stage.id}
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, stage.id)}
                            className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl w-[300px] shrink-0 flex flex-col h-full max-h-full">

                            {/* Column Header */}
                            <div className="p-4 border-b border-[#1A2A3A] flex items-center gap-3">
                                <div className="w-3 h-3 rounded-full" style={{ background: stage.color }} />
                                <h3 className="font-semibold text-sm flex-1">{stage.label}</h3>
                                <span className="bg-[#1A2A3A] text-[#8899AA] text-xs font-bold px-2 py-0.5 rounded-full">{stageCands.length}</span>
                            </div>

                            {/* Cards Container */}
                            <div className="p-3 flex-1 overflow-y-auto space-y-3 scrollbar-thin scrollbar-thumb-[#1A2A3A] scrollbar-track-transparent">
                                {stageCands.map(cand => (
                                    <div key={cand.id}
                                        draggable
                                        onDragStart={(e) => handleDragStart(e, cand.id)}
                                        className="bg-[#0A1420] border border-[#1A2A3A] hover:border-[#2A3A4A] rounded-xl p-4 cursor-grab active:cursor-grabbing transition-all hover:shadow-[0_4px_20px_rgba(0,0,0,0.2)]">

                                        <div className="flex justify-between items-start mb-3">
                                            <div>
                                                <p className="font-semibold text-white text-sm">{cand.name}</p>
                                                <p className="text-[11px] text-[#8899AA] mt-0.5">{cand.exp} · {cand.source}</p>
                                            </div>
                                            <div className="w-8 h-8 rounded-lg bg-[#1A2A3A] text-[9px] font-bold text-[#0066FF] flex flex-col items-center justify-center shrink-0">
                                                <span>{cand.match}%</span>
                                                <span className="scale-[0.8] font-normal opacity-80 leading-none">Match</span>
                                            </div>
                                        </div>

                                        {cand.rating > 0 && (
                                            <div className="flex gap-0.5 mb-3">
                                                {[1, 2, 3, 4, 5].map(s => (
                                                    <Star key={s} size={10} style={{ color: s <= cand.rating ? "#FFB800" : "#1A2A3A", fill: s <= cand.rating ? "#FFB800" : "#1A2A3A" }} />
                                                ))}
                                            </div>
                                        )}

                                        <div className="flex items-center gap-2 pt-3 border-t border-[#1A2A3A]">
                                            <button className="flex-1 h-7 rounded-lg bg-[#1A2A3A] hover:bg-[#2A3A4A] flex items-center justify-center text-[#8899AA] hover:text-white transition-colors"><Mail size={12} /></button>
                                            <button className="flex-1 h-7 rounded-lg bg-[#1A2A3A] hover:bg-[#2A3A4A] flex items-center justify-center text-[#8899AA] hover:text-white transition-colors"><Phone size={12} /></button>
                                            <button className="flex-1 h-7 rounded-lg bg-[#1A2A3A] hover:bg-[#2A3A4A] flex items-center justify-center text-[#8899AA] hover:text-white transition-colors"><Calendar size={12} /></button>
                                        </div>
                                    </div>
                                ))}
                                {stageCands.length === 0 && (
                                    <div className="p-4 border-2 border-dashed border-[#1A2A3A] rounded-xl text-center">
                                        <p className="text-xs text-[#445566]">No candidates in {stage.label}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
