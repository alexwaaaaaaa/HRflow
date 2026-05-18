"use client";

import Page from "@/components/ui/Page";

import React from "react";
import Link from "next/link";
import { ChevronRight, Download, Filter, TrendingUp, Calendar
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import ChartWrapper from '@/components/ui/ChartWrapper';

const FORECAST_DATA = [
    { month: 'Q1 (Act)', headcount: 1100 },
    { month: 'Q2 (Act)', headcount: 1150 },
    { month: 'Q3 (Act)', headcount: 1200 },
    { month: 'Q4 (Act)', headcount: 1245 },
    { month: 'Q1 26 (Fcst)', headcount: 1300 },
    { month: 'Q2 26 (Fcst)', headcount: 1350 },
    { month: 'Q3 26 (Fcst)', headcount: 1410 },
    { month: 'Q4 26 (Fcst)', headcount: 1480 },
];

export default function HeadcountForecastScreen() {
    return (
        <Page
            title="Headcount Forecasting"
            subtitle="Net additions vs baseline"
            breadcrumbs={[{ label: "Org Chart", href: "/org-chart" }, { label: "Planning", href: "/org-chart/planning" }, { label: "Forecast" }]}
            maxWidth="1200px"
        >

        <div className="min-h-screen bg-[#0B1221] text-white p-8 font-sans flex flex-col h-screen overflow-hidden">
            <div className="flex items-center justify-between mb-8 flex-shrink-0">
                <div>
                    <div className="flex items-center gap-2 text-sm text-[#8899AA] mb-2">
                        <Link href="/dashboard" className="hover:text-white transition-colors">Org & Structure</Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-white">Planning</span>
                    </div>
                    <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <div className="p-2 bg-purple-500/10 rounded-xl border border-purple-500/20">
                            <TrendingUp className="w-6 h-6 text-purple-500" />
                        </div>
                        Headcount Forecasting
                    </h1>
                </div>

                <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 px-4 py-2 bg-[#1A2A3A] hover:bg-[#2A3A4A] border border-[#2A3A4A] text-white rounded-lg transition-colors text-sm font-medium">
                        <Filter className="w-4 h-4" /> Attributes
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white text-sm font-semibold rounded-lg transition-colors shadow-[0_4px_15px_rgba(168,85,247,0.3)]">
                        <Download className="w-4 h-4" /> Export Model
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 flex-shrink-0">
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 border-l-4 border-l-purple-500">
                    <h3 className="text-[#8899AA] text-sm font-medium mb-1">Projected EOY Headcount</h3>
                    <div className="text-3xl font-bold text-white mb-2">1,480</div>
                    <p className="text-xs text-purple-400">Target for FY 2026</p>
                </div>
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <h3 className="text-[#8899AA] text-sm font-medium mb-1">Implied YoY Growth</h3>
                    <div className="text-3xl font-bold text-white mb-2">18.8%</div>
                    <p className="text-xs text-[#8899AA]">Net additions vs baseline</p>
                </div>
                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6">
                    <h3 className="text-[#8899AA] text-sm font-medium mb-1">Required Gross Hires</h3>
                    <div className="text-3xl font-bold text-amber-500 mb-2">~450</div>
                    <p className="text-xs text-[#8899AA]">Factoring estimated 12% attrition</p>
                </div>
            </div>

            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 flex flex-col flex-1 min-h-0">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-purple-400" /> Forward Looking Trajectory (8 Quarters)
                    </h3>
                    <div className="bg-[#1A2A3A] p-1 rounded-lg border border-[#2A3A4A] flex text-xs">
                        <button className="px-3 py-1 bg-[#2A3A4A] text-white rounded shadow">Optimistic (+20%)</button>
                        <button className="px-3 py-1 text-[#8899AA] hover:text-white rounded">Base Case (+15%)</button>
                    </div>
                </div>

                <div className="flex-1 w-full min-h-0">
                    <ChartWrapper height="h-full">
                        <AreaChart data={FORECAST_DATA} margin={{ top: 20, right: 30, left: -20, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorHC" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#1A2A3A" vertical={false} />
                            <XAxis dataKey="month" stroke="#8899AA" fontSize={11} />
                            <YAxis stroke="#8899AA" fontSize={11} domain={['dataMin - 100', 'dataMax + 100']} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#0B1221', border: '1px solid #2A3A4A', borderRadius: '8px' }}
                                itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                            />
                            {/* Visual marker for Actual vs Forecast boundary - simulated with strokeDasharray */}
                            <Area
                                type="stepAfter"
                                dataKey="headcount"
                                stroke="#a855f7"
                                strokeWidth={3}
                                fillOpacity={1}
                                fill="url(#colorHC)"
                            />
                        </AreaChart>
                    </ChartWrapper>
                </div>
            </div>
        </div>
    
        </Page>
    );
}
