"use client";
import React, { useState } from 'react';
import { ShieldCheck, Search, Download, Eye, AlertTriangle, Lock, User, Database, FileText, Trash2, Edit3, LogIn, LogOut, Settings, Filter, ChevronDown } from 'lucide-react';
import Link from 'next/link';

const EVENT_TYPES = ['All', 'Login', 'Data Change', 'Permission', 'Export', 'Delete', 'Settings', 'API'];
const SEVERITY_LEVELS = ['All', 'Critical', 'High', 'Medium', 'Low', 'Info'];

const AUDIT_LOGS = [
    { id: 'AUD-8821', timestamp: '10 Mar 2026, 08:02 AM', actor: 'Priya Mehta', actorRole: 'Super Admin', action: 'Bulk Export', resource: 'Employee Records', details: 'Exported 1,247 employee records to CSV', severity: 'High', ip: '103.21.45.12', status: 'Success', type: 'Export', icon: Download },
    { id: 'AUD-8820', timestamp: '10 Mar 2026, 07:58 AM', actor: 'Rahul Sharma', actorRole: 'HR Admin', action: 'Login', resource: 'Auth System', details: 'Successful 2FA login from new device (iPhone 15)', severity: 'Medium', ip: '49.36.12.98', status: 'Success', type: 'Login', icon: LogIn },
    { id: 'AUD-8819', timestamp: '10 Mar 2026, 07:45 AM', actor: 'System Bot', actorRole: 'Automation', action: 'Salary Updated', resource: 'Employee: EMP-0124', details: 'CTC revised from ₹18L to ₹21L — Auto increment cycle', severity: 'Critical', ip: 'Internal', status: 'Success', type: 'Data Change', icon: Edit3 },
    { id: 'AUD-8818', timestamp: '10 Mar 2026, 07:30 AM', actor: 'Anil Kumar', actorRole: 'Finance Admin', action: 'Role Assigned', resource: 'Payroll Module', details: 'Granted "Payroll Approver" permission to Meena Joshi', severity: 'High', ip: '122.167.10.44', status: 'Success', type: 'Permission', icon: Lock },
    { id: 'AUD-8817', timestamp: '10 Mar 2026, 07:15 AM', actor: 'Unknown', actorRole: '—', action: 'Failed Login', resource: 'Auth System', details: '5 consecutive failed login attempts — Account locked', severity: 'Critical', ip: '185.220.101.34', status: 'Blocked', type: 'Login', icon: AlertTriangle },
    { id: 'AUD-8816', timestamp: '10 Mar 2026, 06:50 AM', actor: 'Priya Mehta', actorRole: 'Super Admin', action: 'Policy Deleted', resource: 'Leave Policies', details: 'Deleted "Compensatory Leave Policy v1" — replaced by v2', severity: 'High', ip: '103.21.45.12', status: 'Success', type: 'Delete', icon: Trash2 },
    { id: 'AUD-8815', timestamp: '10 Mar 2026, 06:30 AM', actor: 'API Gateway', actorRole: 'System', action: 'API Rate Limit Hit', resource: '/api/v2/employees', details: 'Rate limit exceeded — integration "ZohoCRM" throttled', severity: 'Medium', ip: '34.100.20.1', status: 'Throttled', type: 'API', icon: Database },
    { id: 'AUD-8814', timestamp: '10 Mar 2026, 06:10 AM', actor: 'Karan Mehta', actorRole: 'Manager', action: 'Settings Changed', resource: 'Attendance Policy', details: 'Grace period changed from 10 min to 30 min — Bengaluru office', severity: 'Low', ip: '117.55.12.9', status: 'Success', type: 'Settings', icon: Settings },
    { id: 'AUD-8813', timestamp: '10 Mar 2026, 05:55 AM', actor: 'Meena Joshi', actorRole: 'HR Admin', action: 'Document Accessed', resource: 'Employee EMP-0087', details: 'Viewed sensitive PAN card document — DPDP compliant access', severity: 'Medium', ip: '103.5.8.22', status: 'Success', type: 'Data Change', icon: FileText },
    { id: 'AUD-8812', timestamp: '10 Mar 2026, 05:40 AM', actor: 'Priya Mehta', actorRole: 'Super Admin', action: 'Logout', resource: 'Auth System', details: 'Session ended after 4h 22m — normal logout', severity: 'Info', ip: '103.21.45.12', status: 'Success', type: 'Login', icon: LogOut },
    { id: 'AUD-8811', timestamp: '10 Mar 2026, 04:30 AM', actor: 'System Cron', actorRole: 'Automation', action: 'Data Backup', resource: 'All Schemas', details: 'Nightly full backup completed — 99.8GB stored to S3', severity: 'Info', ip: 'Internal', status: 'Success', type: 'Settings', icon: Database },
    { id: 'AUD-8810', timestamp: '10 Mar 2026, 03:00 AM', actor: 'ops-admin-02', actorRole: 'Ops Admin', action: 'Tenant Provisioned', resource: 'ORG-D881 (Global Finance Ltd)', details: 'New tenant provisioned in ap-south-1 region', severity: 'High', ip: '122.10.45.1', status: 'Success', type: 'Data Change', icon: Edit3 },
];

const severityConfig: Record<string, { bg: string; text: string; border: string }> = {
    Critical: { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/20' },
    High: { bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/20' },
    Medium: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/20' },
    Low: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20' },
    Info: { bg: 'bg-[#1A2A3A]', text: 'text-[#8899AA]', border: 'border-[#2A3A4A]' },
};

const statusConfig: Record<string, { bg: string; text: string }> = {
    Success: { bg: 'bg-emerald-500/10', text: 'text-emerald-400' },
    Blocked: { bg: 'bg-red-500/10', text: 'text-red-400' },
    Throttled: { bg: 'bg-amber-500/10', text: 'text-amber-400' },
};

export default function AuditLogsScreen() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedType, setSelectedType] = useState('All');
    const [selectedSeverity, setSelectedSeverity] = useState('All');
    const [expandedRow, setExpandedRow] = useState<string | null>(null);

    const filtered = AUDIT_LOGS.filter(log => {
        const q = searchQuery.toLowerCase();
        const matchesSearch = !q ||
            log.actor.toLowerCase().includes(q) ||
            log.action.toLowerCase().includes(q) ||
            log.id.toLowerCase().includes(q) ||
            log.details.toLowerCase().includes(q);
        const matchesType = selectedType === 'All' || log.type === selectedType;
        const matchesSeverity = selectedSeverity === 'All' || log.severity === selectedSeverity;
        return matchesSearch && matchesType && matchesSeverity;
    });

    return (
        <div className="min-h-screen p-6 max-w-[1400px] mx-auto space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <Link href="/super-admin/dashboard" className="text-[#556677] hover:text-white text-sm font-bold transition-colors inline-block mb-3">
                        ← Back to Dashboard
                    </Link>
                    <h1 className="text-2xl font-bold text-white mb-1 flex items-center gap-3">
                        <ShieldCheck size={24} className="text-indigo-400" />
                        Platform Audit Logs
                    </h1>
                    <p className="text-[#8899AA] text-sm">Immutable, cryptographically-signed trail of every user action, system event, and data change across all tenants.</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 bg-[#131B2B] hover:bg-[#1A2A3A] border border-[#2A3A4A] text-white font-bold px-4 py-2.5 rounded-xl text-sm transition-colors">
                        <Filter size={16} />
                        Advanced Filters
                    </button>
                    <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-4 py-2.5 rounded-xl text-sm transition-colors">
                        <Download size={16} />
                        Export SOC2 Log
                    </button>
                </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: 'Total Events (24h)', value: '8,821', color: 'text-white', sub: '+12% from yesterday' },
                    { label: 'Critical Alerts', value: '2', color: 'text-red-400', sub: 'Requires attention' },
                    { label: 'Unique Actors', value: '47', color: 'text-indigo-400', sub: 'Across all roles' },
                    { label: 'Blocked Attempts', value: '12', color: 'text-orange-400', sub: 'Auto-blocked by WAF' },
                ].map(stat => (
                    <div key={stat.label} className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-5">
                        <div className={`text-3xl font-black mb-1 ${stat.color}`}>{stat.value}</div>
                        <div className="text-xs text-[#8899AA] font-bold uppercase tracking-wider mb-1">{stat.label}</div>
                        <div className="text-[10px] text-[#445566]">{stat.sub}</div>
                    </div>
                ))}
            </div>

            {/* Filter + Table */}
            <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl overflow-hidden">
                {/* Toolbar */}
                <div className="p-4 border-b border-[#1A2A3A] flex flex-wrap gap-3 items-center bg-[#060D1A]">
                    <div className="relative flex-1 min-w-[220px]">
                        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#556677]" />
                        <input
                            type="text"
                            placeholder="Search by actor, action, event ID..."
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:border-indigo-500 outline-none transition-colors"
                        />
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                        {EVENT_TYPES.map(type => (
                            <button
                                key={type}
                                onClick={() => setSelectedType(type)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${selectedType === type ? 'bg-indigo-600 text-white' : 'bg-[#131B2B] text-[#8899AA] hover:text-white border border-[#2A3A4A]'}`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                    <div className="relative">
                        <select
                            value={selectedSeverity}
                            onChange={e => setSelectedSeverity(e.target.value)}
                            className="bg-[#131B2B] border border-[#2A3A4A] rounded-lg px-3 py-2 text-sm text-white focus:border-indigo-500 outline-none appearance-none pr-8 cursor-pointer"
                        >
                            {SEVERITY_LEVELS.map(s => <option key={s} value={s}>{s === 'All' ? 'All Severities' : s}</option>)}
                        </select>
                        <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-[#556677] pointer-events-none" />
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-[#060D1A] text-[#8899AA] text-xs uppercase tracking-wider">
                            <tr>
                                <th className="px-5 py-4 font-bold border-b border-[#1A2A3A]">Event ID</th>
                                <th className="px-5 py-4 font-bold border-b border-[#1A2A3A]">Timestamp</th>
                                <th className="px-5 py-4 font-bold border-b border-[#1A2A3A]">Actor</th>
                                <th className="px-5 py-4 font-bold border-b border-[#1A2A3A]">Action</th>
                                <th className="px-5 py-4 font-bold border-b border-[#1A2A3A]">Resource</th>
                                <th className="px-5 py-4 font-bold border-b border-[#1A2A3A]">Severity</th>
                                <th className="px-5 py-4 font-bold border-b border-[#1A2A3A]">Status</th>
                                <th className="px-5 py-4 font-bold border-b border-[#1A2A3A] text-right">View</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1A2A3A]">
                            {filtered.map((log) => {
                                const sev = severityConfig[log.severity] ?? severityConfig['Info'];
                                const sta = statusConfig[log.status] ?? statusConfig['Success'];
                                const Icon = log.icon;
                                const isExpanded = expandedRow === log.id;
                                return (
                                    <React.Fragment key={log.id}>
                                        <tr className="hover:bg-[#131B2B] transition-colors group cursor-pointer" onClick={() => setExpandedRow(isExpanded ? null : log.id)}>
                                            <td className="px-5 py-4">
                                                <span className="font-mono text-xs text-[#8899AA]">{log.id}</span>
                                            </td>
                                            <td className="px-5 py-4">
                                                <div className="text-white text-xs font-medium">{log.timestamp}</div>
                                                <div className="text-[#556677] text-[10px] font-mono">{log.ip}</div>
                                            </td>
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-7 h-7 rounded-full bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-[10px] font-bold text-indigo-400 shrink-0">
                                                        {log.actor.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                                    </div>
                                                    <div>
                                                        <div className="text-white font-semibold text-xs">{log.actor}</div>
                                                        <div className="text-[#556677] text-[10px]">{log.actorRole}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-2">
                                                    <Icon size={13} className="text-[#8899AA] shrink-0" />
                                                    <span className="text-white font-semibold text-xs">{log.action}</span>
                                                </div>
                                            </td>
                                            <td className="px-5 py-4">
                                                <span className="text-[#8899AA] text-xs">{log.resource}</span>
                                            </td>
                                            <td className="px-5 py-4">
                                                <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider border ${sev.bg} ${sev.text} ${sev.border}`}>
                                                    {log.severity}
                                                </span>
                                            </td>
                                            <td className="px-5 py-4">
                                                <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${sta.bg} ${sta.text}`}>
                                                    {log.status}
                                                </span>
                                            </td>
                                            <td className="px-5 py-4 text-right">
                                                <button className="text-indigo-400 hover:text-indigo-300 text-xs font-bold flex items-center gap-1 ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <Eye size={13} /> {isExpanded ? 'Collapse' : 'Expand'}
                                                </button>
                                            </td>
                                        </tr>
                                        {isExpanded && (
                                            <tr className="bg-indigo-500/5 border-b border-[#1A2A3A]">
                                                <td colSpan={8} className="px-8 py-4">
                                                    <div className="flex flex-wrap gap-6">
                                                        <div>
                                                            <div className="text-[10px] text-[#556677] uppercase font-bold mb-1">Full Details</div>
                                                            <div className="text-sm text-white">{log.details}</div>
                                                        </div>
                                                        <div>
                                                            <div className="text-[10px] text-[#556677] uppercase font-bold mb-1">IP Address</div>
                                                            <div className="text-sm text-indigo-400 font-mono">{log.ip}</div>
                                                        </div>
                                                        <div>
                                                            <div className="text-[10px] text-[#556677] uppercase font-bold mb-1">Event Type</div>
                                                            <div className="text-sm text-white">{log.type}</div>
                                                        </div>
                                                        <button className="ml-auto self-start text-xs text-[#8899AA] hover:text-white border border-[#2A3A4A] rounded-lg px-3 py-1.5 transition-colors">
                                                            Download Raw JSON
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </React.Fragment>
                                );
                            })}
                        </tbody>
                    </table>

                    {filtered.length === 0 && (
                        <div className="text-center py-16 text-[#8899AA]">
                            <ShieldCheck size={36} className="mx-auto mb-3 opacity-30" />
                            <p className="font-semibold">No audit events match your filters</p>
                            <p className="text-xs mt-1">Try adjusting your search or filters</p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="px-5 py-4 border-t border-[#1A2A3A] flex items-center justify-between bg-[#060D1A]">
                    <span className="text-xs text-[#556677]">🔒 Append-only ledger. Cryptographically signed. Cannot be altered.</span>
                    <div className="flex gap-1">
                        {[1, 2, 3, '…', 88].map((p, i) => (
                            <button key={i} className={`w-8 h-8 rounded-lg text-xs font-bold transition-colors ${p === 1 ? 'bg-indigo-600 text-white' : 'bg-[#131B2B] text-[#8899AA] hover:text-white border border-[#2A3A4A]'}`}>
                                {p}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
