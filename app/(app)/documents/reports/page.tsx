"use client";

import Page from "@/components/ui/Page";

import React from 'react';
import {
    FileText, Download, ChevronRight
} from 'lucide-react';
import ChartWrapper from '@/components/ui/ChartWrapper';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const STORAGE_DATA = [
    { name: 'Jan', size: 1.2 },
    { name: 'Feb', size: 1.5 },
    { name: 'Mar', size: 2.1 },
    { name: 'Apr', size: 2.8 },
    { name: 'May', size: 3.5 },
    { name: 'Jun', size: 4.2 },
];

export default function DocumentReportsScreen() {
    return (
        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-[1200px] mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-white mb-1 flex items-center gap-3">
                            <FileText className="text-[#00E5A0]" size={28} />
                            Document Reports & Analytics
                        </h1>
                        <p className="text-sm text-[#8899AA]">Track storage usage, document distribution, and system-wide file access.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <MetricCard title="Total Storage Used" value="4.2 TB" sub="Of 10 TB Quota" color="border-[#00E5A0]" text="text-[#00E5A0]" />
                    <MetricCard title="Total Files" value="124,592" sub="+1,200 this week" color="border-[#0066FF]" text="text-[#0066FF]" />
                    <MetricCard title="Documents Shared Externally" value="84" sub="Via public links" color="border-rose-500" text="text-rose-500" />
                    <MetricCard title="API Generations (MTD)" value="1,450" sub="System-generated docs" color="border-amber-500" text="text-amber-500" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    <div className="lg:col-span-2 bg-[#0A1420] border border-[#1A2A3A] rounded-xl p-6 shadow-lg">
                        <h3 className="font-bold text-white text-sm uppercase tracking-wider mb-6">Storage Growth (Last 6 Months)</h3>
                        <div className="h-64">
                            <ChartWrapper height="h-full">
                                <AreaChart data={STORAGE_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorSize" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#00E5A0" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#00E5A0" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#1A2A3A" vertical={false} />
                                    <XAxis dataKey="name" stroke="#556677" tick={{ fill: '#8899AA', fontSize: 12 }} axisLine={false} tickLine={false} />
                                    <YAxis stroke="#556677" tick={{ fill: '#8899AA', fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v} TB`} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#0D1928', borderColor: '#1A2A3A', borderRadius: '8px' }}
                                        itemStyle={{ color: '#fff' }}
                                        formatter={(value: any) => `${value} TB`}
                                        cursor={{ stroke: '#2A3A4A' }}
                                    />
                                    <Area type="monotone" dataKey="size" stroke="#00E5A0" fillOpacity={1} fill="url(#colorSize)" name="Storage Used" />
                                </AreaChart>
                            </ChartWrapper>
                        </div>
                    </div>

                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl p-6 shadow-lg">
                        <h3 className="font-bold text-white text-sm uppercase tracking-wider mb-6 flex items-center gap-2">
                            Quick Exports
                        </h3>
                        <div className="space-y-4">
                            <ExportOption title="Document Inventory List" desc="CSV of all files and their metadata." color="text-[#0066FF]" bg="bg-[#0066FF]/10" />
                            <ExportOption title="Orphaned Files Report" desc="Files without an active owner or mapped employee." color="text-amber-500" bg="bg-amber-500/10" />
                            <ExportOption title="Public Sharing Log" desc="List of all active public sharing links and access logs." color="text-rose-500" bg="bg-rose-500/10" />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

function MetricCard({ title, value, sub, color, text }: any) {
    return (
        <div className={`bg-[#0A1420] border-t-4 ${color} border-x border-b border-[#1A2A3A] rounded-b-xl rounded-t-sm p-6 shadow-lg`}>
            <h3 className="text-[#8899AA] text-xs font-bold uppercase tracking-wider mb-2">{title}</h3>
            <div className={`text-3xl font-black mb-1 ${text}`}>{value}</div>
            <div className="text-xs text-[#556677] font-medium">{sub}</div>
        </div>
    );
}

function ExportOption({ title, desc, color, bg }: any) {
    return (
        <Page
            title="Document Reports & Analytics"
            subtitle="Track storage usage, document distribution, and system-wide file access."
            breadcrumbs={[{ label: "Documents", href: "/documents" }, { label: "Reports" }]}
            maxWidth="1200px"
        >

        <div className="group border border-[#1A2A3A] rounded-xl p-4 bg-[#060B14] hover:border-[#2A3A4A] cursor-pointer transition-colors">
            <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${bg} ${color} shrink-0`}><Download size={18} /></div>
                <div>
                    <h4 className="font-bold text-white text-sm group-hover:text-[#0066FF] transition-colors">{title}</h4>
                    <p className="text-xs text-[#8899AA] mt-1 leading-relaxed">{desc}</p>
                </div>
            </div>
            <div className="mt-3 text-xs text-[#556677] font-bold uppercase tracking-wider flex items-center justify-end gap-1 group-hover:text-white transition-colors">
                Generate <ChevronRight size={14} />
            </div>
        </div>
    
        </Page>
    );
}
