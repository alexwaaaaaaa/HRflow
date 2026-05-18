"use client";

import { AlertTriangle, CheckCircle2, Cpu, Database, RefreshCw, Server, Wifi } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

// ─────────────────────────────────────────────────────────────────────────────
// Types & static data
// ─────────────────────────────────────────────────────────────────────────────

type ServiceStatus = "Operational" | "Degraded";

interface ServiceEntry {
    name: string;
    status: ServiceStatus;
    uptime: string;
    latency: string;
    icon: LucideIcon;
}

const SERVICES: ServiceEntry[] = [
    { name: "API Gateway", status: "Operational", uptime: "99.99%", latency: "42ms", icon: Wifi },
    { name: "PostgreSQL (Primary)", status: "Operational", uptime: "99.98%", latency: "8ms", icon: Database },
    { name: "Redis Cache", status: "Operational", uptime: "99.99%", latency: "1ms", icon: Cpu },
    { name: "Worker Queue (BullMQ)", status: "Degraded", uptime: "99.5%", latency: "120ms", icon: Server },
    { name: "Search Engine (Elastic)", status: "Operational", uptime: "99.97%", latency: "15ms", icon: Database },
    { name: "File Storage (S3)", status: "Operational", uptime: "100%", latency: "35ms", icon: Server },
];

const STATUS_VARIANT: Record<ServiceStatus, "success" | "warning"> = {
    Operational: "success",
    Degraded: "warning",
};

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────────────────

function ServiceCard({ svc }: { svc: ServiceEntry }) {
    const Icon = svc.icon;
    const isDegraded = svc.status === "Degraded";
    return (
        <Card padding="md" className={isDegraded ? "border-amber-500/30" : ""}>
            <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${isDegraded ? "bg-amber-500/10 text-amber-400" : "bg-[#1A2A3A] text-[#8899AA]"}`}>
                        <Icon size={18} aria-hidden="true" />
                    </div>
                    <h3 className="text-white font-medium text-sm">{svc.name}</h3>
                </div>
                <Badge variant={STATUS_VARIANT[svc.status]}>
                    {isDegraded ? <AlertTriangle size={10} aria-hidden="true" /> : <CheckCircle2 size={10} aria-hidden="true" />}
                    {svc.status}
                </Badge>
            </div>
            <dl className="grid grid-cols-2 gap-3">
                <div className="bg-[#131B2B] border border-[#2A3A4A] rounded-lg p-2.5">
                    <dt className="text-[10px] text-[#445566] uppercase tracking-wider font-semibold">Uptime</dt>
                    <dd className="text-white font-bold text-sm">{svc.uptime}</dd>
                </div>
                <div className="bg-[#131B2B] border border-[#2A3A4A] rounded-lg p-2.5">
                    <dt className="text-[10px] text-[#445566] uppercase tracking-wider font-semibold">Avg Latency</dt>
                    <dd className="text-white font-bold text-sm">{svc.latency}</dd>
                </div>
            </dl>
        </Card>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function SystemHealthPage() {
    return (
        <Page
            title="System Health"
            subtitle="Real-time operational status of all Kaarya infrastructure components."
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Settings", href: "/settings" },
                { label: "System" },
                { label: "Health" },
            ]}
            maxWidth="1200px"
            actions={
                <Button variant="secondary" icon={<RefreshCw size={16} aria-hidden="true" />}>Refresh</Button>
            }
        >
            <div className="space-y-8">
                {/* Overall Status */}
                <Card padding="lg" className="border-emerald-500/20 bg-emerald-500/10">
                    <div className="flex items-center gap-4">
                        <CheckCircle2 size={32} className="text-emerald-400 shrink-0" aria-hidden="true" />
                        <div>
                            <div className="text-white font-semibold text-lg">All Systems Operational</div>
                            <div className="text-sm text-emerald-400/80">Last checked: 30 seconds ago · Overall Uptime (30d): 99.97%</div>
                        </div>
                    </div>
                </Card>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {SERVICES.map((svc) => (
                        <ServiceCard key={svc.name} svc={svc} />
                    ))}
                </div>

                {/* Incident History */}
                <Card padding="md">
                    <h3 className="text-white font-medium mb-4">Recent Incidents (Last 7 Days)</h3>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3 text-sm">
                            <AlertTriangle size={14} className="text-amber-400 shrink-0" aria-hidden="true" />
                            <span className="text-white">Worker Queue latency spike (120ms+)</span>
                            <span className="text-[#445566] ml-auto text-xs">2 hrs ago · Investigating</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                            <CheckCircle2 size={14} className="text-emerald-400 shrink-0" aria-hidden="true" />
                            <span className="text-[#8899AA]">Scheduled maintenance — Redis cluster upgrade</span>
                            <span className="text-[#445566] ml-auto text-xs">3 days ago · Resolved</span>
                        </div>
                    </div>
                </Card>
            </div>
        </Page>
    );
}
