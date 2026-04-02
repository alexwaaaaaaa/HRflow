"use client";
import React from 'react';
import { Grid, HelpCircle, Download, FileSpreadsheet } from 'lucide-react';

export default function NineBoxGridScreen() {
    // Logic for a standard 9-box
    // 3x3 grid: X = Performance (Low, Medium, High), Y = Potential (Low, Medium, High)

    const BOXES = [
        // Top Row (High Potential)
        { id: '1', title: 'Enigma / Rough Diamond', desc: 'High Potential, Low Perf.', color: 'border-amber-500/30 bg-amber-500/5', hc: 4 },
        { id: '2', title: 'Future Star', desc: 'High Potential, Med Perf.', color: 'border-emerald-500/30 bg-emerald-500/5', hc: 12 },
        { id: '3', title: 'Consistent Star', desc: 'High Potential, High Perf.', color: 'border-emerald-500/50 bg-emerald-500/10 shadow-[0_0_15px_rgba(16,185,129,0.15)]', hc: 8 },

        // Middle Row (Medium Potential)
        { id: '4', title: 'Dilemma', desc: 'Med Potential, Low Perf.', color: 'border-rose-500/30 bg-rose-500/5', hc: 3 },
        { id: '5', title: 'Core Player', desc: 'Med Potential, Med Perf.', color: 'border-amber-500/30 bg-amber-500/5', hc: 45 },
        { id: '6', title: 'High Performer', desc: 'Med Potential, High Perf.', color: 'border-emerald-500/30 bg-emerald-500/5', hc: 22 },

        // Bottom Row (Low Potential)
        { id: '7', title: 'Underperformer', desc: 'Low Potential, Low Perf.', color: 'border-rose-500/50 bg-rose-500/10', hc: 5 },
        { id: '8', title: 'Effective Worker', desc: 'Low Potential, Med Perf.', color: 'border-amber-500/30 bg-amber-500/5', hc: 28 },
        { id: '9', title: 'Trusted Professional', desc: 'Low Potential, High Perf.', color: 'border-amber-500/30 bg-amber-500/5', hc: 15 },
    ];

    return (
        <div className="min-h-screen p-6 max-w-6xl mx-auto space-y-6">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3"><Grid size={24} className="text-emerald-400" /> Executive 9-Box Grid</h1>
                    <p className="text-[#8899AA] text-sm mt-1">Holistic view of employee performance vs. potential based on Q3 Calibration Cycle.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="bg-[#131B2B] hover:bg-[#1A2A3A] border border-[#2A3A4A] text-white px-4 py-2.5 rounded-xl text-sm font-bold transition-colors flex items-center gap-2">
                        <FileSpreadsheet size={16} /> Export View
                    </button>
                </div>
            </div>

            <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-8 relative flex shadow-2xl">

                {/* Y-Axis Label */}
                <div className="flex flex-col items-center justify-center pr-6 border-r border-[#1A2A3A] mr-6">
                    <div className="text-[#8899AA] font-bold tracking-widest uppercase transform -rotate-180" style={{ writingMode: 'vertical-rl' }}>
                        Potential (Learning Agility) &rarr;
                    </div>
                </div>

                <div className="flex-1 flex flex-col">
                    {/* Grid layout */}
                    <div className="grid grid-cols-3 grid-rows-3 gap-4 flex-1 mb-6 min-h-[500px]">
                        {BOXES.map((b) => (
                            <div key={b.id} className={`border rounded-xl p-4 flex flex-col relative transition-colors cursor-pointer hover:border-white/50 group ${b.color}`}>
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-white font-bold text-sm leading-tight pr-4">{b.title}</h3>
                                    <span className="text-[#8899AA] text-[10px] bg-[#131B2B] border border-[#2A3A4A] px-1.5 py-0.5 rounded">{b.id}</span>
                                </div>
                                <p className="text-[#556677] text-[10px] hidden md:block">{b.desc}</p>

                                <div className="mt-auto pt-4 flex items-end justify-between">
                                    <div className="text-xs font-bold text-[#8899AA] group-hover:text-white transition-colors">Hover to view {b.hc}</div>
                                    <div className="text-3xl font-black text-white/90">{b.hc}</div>
                                </div>

                                {/* Mock floating tooltips - visually represented within the box for this UI */}
                                {b.id === '3' && (
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center -space-x-2">
                                        <div className="w-8 h-8 rounded-full border-2 border-[#0A1420] bg-emerald-500 flex items-center justify-center text-[10px] font-bold text-white shadow-lg">ER</div>
                                        <div className="w-8 h-8 rounded-full border-2 border-[#0A1420] bg-indigo-500 flex items-center justify-center text-[10px] font-bold text-white shadow-lg">AP</div>
                                        <div className="w-8 h-8 rounded-full border-2 border-[#0A1420] bg-amber-500 flex items-center justify-center text-[10px] font-bold text-white shadow-lg">RK</div>
                                        <div className="w-8 h-8 rounded-full border-2 border-[#0A1420] bg-[#1A2A3A] flex items-center justify-center text-[10px] font-bold text-[#8899AA] shadow-lg">+5</div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* X-Axis Label */}
                    <div className="pt-4 border-t border-[#1A2A3A] text-center">
                        <div className="text-[#8899AA] font-bold tracking-widest uppercase">
                            Performance (Results) &rarr;
                        </div>
                        <div className="flex justify-between px-[16%] text-xs text-[#556677] mt-2 font-bold uppercase">
                            <span>Below Expectation</span>
                            <span>Meets Expectation</span>
                            <span>Exceeds Expectation</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-[#131B2B] border border-[#2A3A4A] rounded-xl p-4 flex gap-3 text-sm">
                <HelpCircle className="text-emerald-400 shrink-0 mt-0.5" size={18} />
                <div className="text-[#AABBCC]">
                    <strong className="text-white block mb-1">Calibration Note</strong>
                    This 9-box grid is automatically populated using the latest performance review cycle data and Manager Potential assessment scores. Talent mapped in the top-right box (Consistent Stars) should be actively managed into succession plans for critical roles.
                </div>
            </div>
        </div>
    );
}
