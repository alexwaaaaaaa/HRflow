"use client";

import Page from "@/components/ui/Page";
import React, { useState } from 'react';
import { BarChart2 } from 'lucide-react';

export default function CompaRatioScreen() {
    const [view, setView] = useState('dept');

    return (
        <Page
            title="Compa-Ratio Analytics"
            subtitle="Analyze employee salaries relative to the midpoint of their assigned pay bands."
            breadcrumbs={[{ label: "Pay Equity", href: "/pay-equity" }, { label: "Compa Ratio" }]}
            maxWidth="1400px"
        >

        <div className="min-h-screen p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3"><BarChart2 size={24} className="text-sky-400" /> Compa-Ratio Analytics</h1>
                    <p className="text-[#8899AA] text-sm mt-1">Analyze employee salaries relative to the midpoint of their assigned pay bands.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="bg-sky-600 hover:bg-sky-500 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors shadow-[0_0_15px_rgba(56,189,248,0.3)]">
                        Recalculate Bounds
                    </button>
                </div>
            </div>

            <div className="flex gap-2 p-1 bg-[#060D1A] border border-[#1A2A3A] rounded-xl w-fit mb-6">
                {[
                    { id: 'dept', label: 'By Department' },
                    { id: 'level', label: 'By Job Level' },
                    { id: 'outliers', label: 'Red-Circle Outliers' },
                ].map(t => (
                    <button key={t.id} onClick={() => setView(t.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-colors ${view === t.id ? 'bg-[#131B2B] text-white border border-[#2A3A4A] shadow-sm' : 'text-[#8899AA] hover:text-white'}`}>
                        {t.label}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 relative overflow-hidden">
                    <div className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-2">Org Median CR</div>
                    <div className="text-3xl font-black text-white mb-1">0.98</div>
                    <div className="text-[#556677] text-[10px]">Healthy Range: 0.90 - 1.10</div>
                </div>
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 relative overflow-hidden">
                    <div className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-2">Employees &lt; 0.80 (Green Circle)</div>
                    <div className="text-3xl font-black text-sky-400 mb-1">45</div>
                    <div className="text-[#556677] text-[10px]">Priced below minimum band</div>
                </div>
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 relative overflow-hidden">
                    <div className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-2">Employees &gt; 1.20 (Red Circle)</div>
                    <div className="text-3xl font-black text-amber-400 mb-1">12</div>
                    <div className="text-[#556677] text-[10px]">Priced above maximum band</div>
                </div>
            </div>

            <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl overflow-hidden shadow-lg animate-in fade-in">
                <div className="p-5 border-b border-[#1A2A3A] bg-[#060D1A] flex justify-between items-center">
                    <h3 className="text-white font-bold text-lg">Distribution by {view === 'dept' ? 'Department' : 'Level'}</h3>
                </div>

                <div className="p-6">
                    <div className="h-64 flex items-end justify-around gap-2 relative pt-8">
                        {/* Target Midpoint Line (Y=1.0) */}
                        <div className="absolute left-0 right-0 border-b border-dashed border-emerald-500/50 z-0 flex justify-end" style={{ bottom: '50%' }}>
                            <span className="text-emerald-400 font-mono text-[10px] -mt-5 bg-[#060D1A] px-1">TARGET 1.0 (Midpoint)</span>
                        </div>

                        {/* Distribution Line (Y=0.8 - Y=1.2 range) */}
                        <div className="absolute left-0 right-0 border-b border-[#1A2A3A] z-0" style={{ bottom: '10%' }}></div>
                        <div className="absolute left-0 right-0 border-b border-[#1A2A3A] z-0" style={{ bottom: '90%' }}></div>

                        {[
                            { name: 'Engineering', avg: 1.04, min: 0.85, max: 1.25 },
                            { name: 'Product', avg: 0.98, min: 0.82, max: 1.15 },
                            { name: 'Sales', avg: 1.05, min: 0.90, max: 1.35 },
                            { name: 'Marketing', avg: 0.92, min: 0.75, max: 1.05 },
                            { name: 'Finance', avg: 0.96, min: 0.88, max: 1.10 },
                            { name: 'HR / Ops', avg: 0.88, min: 0.70, max: 1.00 },
                        ].map((d, i) => {
                            // Map 0.6 - 1.4 to 0% - 100% height (range = 0.8)
                            const mapToPercent = (val: number) => Math.max(0, Math.min(100, ((val - 0.6) / 0.8) * 100));

                            const bottom = mapToPercent(d.min);
                            const top = mapToPercent(d.max);
                            const height = top - bottom;
                            const avgPos = mapToPercent(d.avg);

                            return (


                                <div key={i} className="relative h-full w-16 group flex flex-col items-center justify-end z-10">
                                    {/* Range Box (Min-Max) */}
                                    <div className="absolute w-6 bg-sky-500/20 border-x border-[#2A3A4A] rounded-sm transition-all hover:bg-sky-500/30 cursor-crosshair"
                                        style={{ bottom: `${bottom}%`, height: `${height}%` }}>
                                    </div>

                                    {/* Average Marker */}
                                    <div className="absolute w-10 h-1 bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)] z-20"
                                        style={{ bottom: `${avgPos}%` }}>
                                    </div>

                                    <div className="absolute -bottom-8 text-xs font-bold text-[#8899AA] rotate-45 transform origin-top-left group-hover:text-white transition-colors">{d.name}</div>

                                    {/* Tooltip */}
                                    <div className="absolute -top-12 bg-[#1A2A3A] border border-[#2A3A4A] text-white text-[10px] p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-30 pointer-events-none">
                                        Avg CR: {d.avg.toFixed(2)}<br />
                                        Range: {d.min.toFixed(2)} - {d.max.toFixed(2)}
                                    </div>
                                </div>
                            
        
);
                        })}
                    </div>
                </div>
                <div className="mt-8 p-4 border-t border-[#1A2A3A] bg-[#060D1A] flex justify-between text-xs text-[#556677]">
                    <button className="hover:text-white transition-colors">See Detailed Table</button>
                    <span>*Box represents minimum to maximum CR. White line is average.</span>
                </div>
            </div>
        </div>
    
        </Page>
    );
}
