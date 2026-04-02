"use client";
import React, { useState } from 'react';
import { Users, Filter, Download, ArrowUpRight, Plus, Activity } from 'lucide-react';
import Link from 'next/link';

export default function HeadcountForecastScreen() {
    const [view, setView] = useState('dept');

    return (
        <div className="min-h-screen p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3"><Users size={24} className="text-indigo-400" /> Headcount Forecasting</h1>
                    <p className="text-[#8899AA] text-sm mt-1">Predictive models showing expected organizational size based on hiring and attrition trends.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="bg-[#131B2B] hover:bg-[#1A2A3A] border border-[#2A3A4A] text-white px-4 py-2.5 rounded-xl text-sm font-bold transition-colors flex items-center gap-2">
                        <Download size={16} /> Export Data
                    </button>
                </div>
            </div>

            <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6">
                <div className="flex items-center justify-between border-b border-[#1A2A3A] pb-4 mb-6">
                    <h3 className="text-white font-bold flex items-center gap-2"><Activity size={18} className="text-indigo-400" /> Projected Growth Curve (Next 12 Months)</h3>
                    <div className="flex bg-[#131B2B] border border-[#2A3A4A] rounded-lg p-1">
                        <button onClick={() => setView('dept')} className={`px-3 py-1 text-xs font-bold rounded ${view === 'dept' ? 'bg-[#2A3A4A] text-white' : 'text-[#8899AA] hover:text-white'}`}>By Department</button>
                        <button onClick={() => setView('loc')} className={`px-3 py-1 text-xs font-bold rounded ${view === 'loc' ? 'bg-[#2A3A4A] text-white' : 'text-[#8899AA] hover:text-white'}`}>By Location</button>
                    </div>
                </div>

                {/* Placeholder for complex chart (using grid/flex as mock) */}
                <div className="h-72 w-full flex items-end justify-between gap-1 pt-10 relative">
                    {/* Grid lines */}
                    <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                        {[500, 400, 300, 200, 100, 0].map(val => (
                            <div key={val} className="w-full h-px bg-[#1A2A3A] relative">
                                <span className="absolute -top-2 -left-8 text-[10px] text-[#556677] w-6 text-right">{val}</span>
                            </div>
                        ))}
                    </div>

                    {/* Bars */}
                    {[
                        { m: 'Nov', ext: 350, new: 15 },
                        { m: 'Dec', ext: 360, new: 10 },
                        { m: 'Jan', ext: 365, new: 25 },
                        { m: 'Feb', ext: 385, new: 30 },
                        { m: 'Mar', ext: 410, new: 15 },
                        { m: 'Apr', ext: 420, new: 20 },
                        { m: 'May', ext: 435, new: 25 },
                        { m: 'Jun', ext: 455, new: 10 },
                        { m: 'Jul', ext: 460, new: 15 },
                    ].map((d, i) => {
                        const total = d.ext + d.new;
                        const hPct = (total / 500) * 100;
                        const extPct = (d.ext / total) * 100;
                        const newPct = (d.new / total) * 100;

                        return (
                            <div key={i} className="w-full max-w-[40px] flex flex-col items-center group relative z-10 h-full justify-end">
                                <div className="absolute -top-8 bg-[#1A2A3A] border border-[#2A3A4A] text-white text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity z-20 whitespace-nowrap">
                                    {total} Total
                                </div>
                                <div className="w-full flex flex-col justify-end overflow-hidden rounded-t group-hover:opacity-80 transition-opacity" style={{ height: `${hPct}%` }}>
                                    <div className="w-full bg-indigo-400" style={{ height: `${newPct}%` }}></div>
                                    <div className="w-full bg-indigo-600" style={{ height: `${extPct}%` }}></div>
                                </div>
                                <div className="text-[10px] text-[#8899AA] mt-2 font-bold uppercase">{d.m}</div>
                            </div>
                        )
                    })}
                </div>

                <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t border-[#1A2A3A] text-xs">
                    <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-indigo-600"></div> <span className="text-[#8899AA]">Existing Base (Net of Attrition)</span></div>
                    <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-indigo-400"></div> <span className="text-[#8899AA]">Projected New Hires</span></div>
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6">
                    <h3 className="text-white font-bold border-b border-[#1A2A3A] pb-3 mb-4">Department Level Breakdown (Month 12)</h3>
                    <div className="space-y-4 pt-2">
                        {[
                            { n: 'Engineering', curr: 180, fcast: 240, color: 'indigo' },
                            { n: 'Sales & Marketing', curr: 85, fcast: 120, color: 'blue' },
                            { n: 'Operations', curr: 60, fcast: 75, color: 'emerald' },
                            { n: 'G&A', curr: 25, fcast: 30, color: 'purple' },
                        ].map((d, i) => (
                            <div key={i}>
                                <div className="flex justify-between text-sm mb-1.5 font-bold">
                                    <span className="text-white">{d.n}</span>
                                    <span className={`text-${d.color}-400 flex items-center gap-1`}><ArrowUpRight size={14} /> {d.fcast} (+{d.fcast - d.curr})</span>
                                </div>
                                <div className="w-full h-2 bg-[#131B2B] rounded-full overflow-hidden relative">
                                    {/* Current base */}
                                    <div className={`absolute top-0 left-0 bottom-0 bg-${d.color}-600`} style={{ width: `${(d.curr / 300) * 100}%` }}></div>
                                    {/* Forecasted addition */}
                                    <div className={`absolute top-0 bottom-0 bg-${d.color}-400/50`} style={{ left: `${(d.curr / 300) * 100}%`, width: `${((d.fcast - d.curr) / 300) * 100}%` }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6">
                    <h3 className="text-white font-bold border-b border-[#1A2A3A] pb-3 mb-4">Model Parameters & Assumptions</h3>
                    <div className="space-y-4 text-sm">
                        <div className="flex items-center justify-between p-3 bg-[#131B2B] rounded-xl border border-[#2A3A4A]">
                            <div>
                                <div className="text-white font-bold mb-0.5">Base Attrition Target</div>
                                <div className="text-[#8899AA] text-xs">Annualized rolling average applied to forecast.</div>
                            </div>
                            <div className="text-white font-mono bg-[#1A2A3A] px-3 py-1 rounded">12.5%</div>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-[#131B2B] rounded-xl border border-[#2A3A4A]">
                            <div>
                                <div className="text-white font-bold mb-0.5">Average Time to Fill</div>
                                <div className="text-[#8899AA] text-xs">Current organizational hiring velocity.</div>
                            </div>
                            <div className="text-white font-mono bg-[#1A2A3A] px-3 py-1 rounded">42 Days</div>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-[#131B2B] rounded-xl border border-[#2A3A4A]">
                            <div>
                                <div className="text-white font-bold mb-0.5">Offer Acceptance Rate</div>
                                <div className="text-[#8899AA] text-xs">Used to project pipeline requirements.</div>
                            </div>
                            <div className="text-white font-mono bg-[#1A2A3A] px-3 py-1 rounded">78.0%</div>
                        </div>

                        <Link href="/workforce-analytics/scenarios" className="w-full block text-center text-indigo-400 hover:text-indigo-300 font-bold text-sm mt-4 transition-colors">
                            Adjust Parameters in Scenario Planner &rarr;
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
