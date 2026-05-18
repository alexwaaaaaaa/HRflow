"use client";

import Page from "@/components/ui/Page";
import React, { useState } from 'react';
import { Activity, ChevronDown, ChevronUp, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function WebhookLogsPage() {
    const [expanded, setExpanded] = useState<number | null>(1); // default expand first log

    const logs = [
        { id: 1, event: 'employee.terminated', date: 'Oct 14, 14:32:01', status: 200, time: '142ms' },
        { id: 2, event: 'leave.approved', date: 'Oct 14, 12:05:40', status: 502, time: '3040ms', error: 'Bad Gateway' },
        { id: 3, event: 'leave.approved', date: 'Oct 14, 12:02:11', status: 502, time: '3012ms', error: 'Bad Gateway' },
        { id: 4, event: 'employee.created', date: 'Oct 13, 09:15:00', status: 200, time: '88ms' },
    ];

    // Stable per-log payload IDs so the JSON preview doesn't flicker on re-render.
    // Real backend will return real event IDs.
    const stableEvtId = (id: number) => `evt_${id.toString(36).padStart(9, '0')}`;

    return (
        <Page
            title="Webhook Delivery Logs"
            subtitle="Inspect HTTP requests and responses for the last 7 days."
            breadcrumbs={[{ label: "Developer", href: "/developer" }, { label: "Webhooks", href: "/developer/webhooks" }, { label: "Logs" }]}
            maxWidth="1100px"
        >

        <div className="min-h-screen p-6 max-w-5xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                        <Activity className="text-sky-400" />
                        Webhook Delivery Logs
                    </h1>
                    <p className="text-sm text-[#8899AA] mt-1">Inspect HTTP requests and responses for the last 7 days.</p>
                </div>
            </div>

            <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl overflow-hidden">
                <div className="flex flex-col">
                    {/* Header */}
                    <div className="grid grid-cols-12 gap-4 border-b border-[#1A2A3A] bg-[#060D1A] p-4 text-xs font-bold text-[#556677] uppercase tracking-wider">
                        <div className="col-span-1 border-r border-[#1A2A3A]">Status</div>
                        <div className="col-span-4">Event Type</div>
                        <div className="col-span-4">Date/Time</div>
                        <div className="col-span-3 text-right">Duration</div>
                    </div>

                    {/* Rows */}
                    <div className="divide-y divide-[#1A2A3A]">
                        {logs.map(log => (
                            <React.Fragment key={log.id}>
                                <div
                                    className={`grid grid-cols-12 gap-4 p-4 text-sm items-center cursor-pointer transition-colors ${expanded === log.id ? 'bg-[#131B2B]' : 'hover:bg-[#0D1928] bg-[#0A1420]'}`}
                                    onClick={() => setExpanded(expanded === log.id ? null : log.id)}
                                >
                                    <div className="col-span-1">
                                        <span className={`px-2 py-1 rounded text-xs font-mono font-bold ${log.status === 200 ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'}`}>
                                            {log.status}
                                        </span>
                                    </div>
                                    <div className="col-span-4 font-mono text-[#CCDDEE]">{log.event}</div>
                                    <div className="col-span-4 text-[#8899AA]">{log.date}</div>
                                    <div className="col-span-3 text-right flex items-center justify-end gap-2 text-[#8899AA]">
                                        {log.time}
                                        {expanded === log.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                    </div>
                                </div>

                                {/* Expanded Details */}
                                {expanded === log.id && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 bg-[#060D1A] border-b border-[#1A2A3A] border-t-0 p-0 text-sm">

                                        {/* Request Body */}
                                        <div className="p-4 border-r border-[#1A2A3A]">
                                            <h4 className="text-xs font-bold text-[#556677] uppercase tracking-wider mb-2 flex items-center gap-2">
                                                Request Payload
                                            </h4>
                                            <pre className="bg-[#0A1420] border border-[#1A2A3A] p-4 rounded-lg font-mono text-xs text-indigo-300 overflow-x-auto h-48">
                                                {JSON.stringify({
                                                    "id": stableEvtId(log.id),
                                                    "event_type": log.event,
                                                    "created_at": "2024-10-14T14:32:01Z",
                                                    "data": {
                                                        "employee_id": "emp_01928",
                                                        "details": "..."
                                                    }
                                                }, null, 2)}
                                            </pre>
                                        </div>

                                        {/* Response Body */}
                                        <div className="p-4">
                                            <h4 className="text-xs font-bold text-[#556677] uppercase tracking-wider mb-2 flex items-center gap-2">
                                                Response from your server
                                                {log.status === 200 ? <CheckCircle2 size={14} className="text-emerald-400" /> : <AlertCircle size={14} className="text-rose-400" />}
                                            </h4>
                                            {log.status === 200 ? (
                                                <pre className="bg-[#0A1420] border border-[#1A2A3A] p-4 rounded-lg font-mono text-xs text-emerald-300 overflow-x-auto h-48">
                                                    {JSON.stringify({ "success": true, "message": "Received" }, null, 2)}
                                                </pre>
                                            ) : (
                                                <pre className="bg-[#0A1420] border border-[#1A2A3A] p-4 rounded-lg font-mono text-xs text-rose-300 overflow-x-auto h-48">
                                                    {`<html>
  <head><title>502 Bad Gateway</title></head>
  <body>
    <center><h1>502 Bad Gateway</h1></center>
    <hr><center>nginx/1.24.0</center>
  </body>
</html>`}
                                                </pre>
                                            )}

                                            {log.status !== 200 && (
                                                <div className="mt-3 flex justify-end">
                                                    <button className="bg-[#1A2A3A] hover:bg-[#2A3A4A] text-white text-xs px-3 py-1.5 rounded transition-colors">Retry Ping</button>
                                                </div>
                                            )}
                                        </div>

                                    </div>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    
        </Page>
    );
}
