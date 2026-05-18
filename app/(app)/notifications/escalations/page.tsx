"use client";

import { AlertTriangle, ArrowUpRight, Clock } from "lucide-react";
import Page from "@/components/ui/Page";
import Card, { CardHeader, CardTitle } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export default function EscalationNotificationPage() {
    return (
        <Page
            title="Active Escalations & Alerts"
            subtitle="High priority incidents requiring immediate managerial intervention"
            breadcrumbs={[
                { label: "Notifications", href: "/notifications" },
                { label: "Escalations" },
            ]}
            maxWidth="1000px"
        >
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div className="space-y-4 md:col-span-2">
                    {/* High Priority */}
                    <Card padding="lg" className="border-rose-500/30 bg-gradient-to-br from-rose-500/10 to-[#0A1420]">
                        <div className="mb-4 flex items-start justify-between">
                            <div className="flex items-center gap-2">
                                <Badge variant="danger">L3 Escalation</Badge>
                                <span className="flex items-center gap-1 text-xs text-[#8899AA]">
                                    <Clock size={12} aria-hidden="true" /> 14 mins breached
                                </span>
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                aria-label="Open escalation details"
                                icon={<ArrowUpRight size={16} aria-hidden="true" />}
                            />
                        </div>
                        <h3 className="mb-2 text-lg font-bold text-white">
                            Payroll API Gateway Down
                        </h3>
                        <p className="mb-4 text-sm text-[#CCDDEE]">
                            The salary processing webhook has returned 503 errors for 3 consecutive
                            retries. Finance team is blocked.
                        </p>
                        <div className="flex gap-3">
                            <Button variant="danger" size="sm">
                                Acknowledge
                            </Button>
                            <Button variant="secondary" size="sm">
                                Route to DevOps
                            </Button>
                        </div>
                    </Card>

                    {/* Medium Priority */}
                    <Card padding="lg" className="border-amber-500/20">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <AlertTriangle
                                    className="text-amber-500"
                                    size={16}
                                    aria-hidden="true"
                                />
                                Pending FnF Grievance
                            </CardTitle>
                            <span className="text-xs text-[#556677]">SLA: 4 hrs left</span>
                        </CardHeader>
                        <p className="mb-4 text-sm text-[#8899AA]">
                            Former employee EMP-192 raised an urgent dispute regarding Notice Period
                            recovery.
                        </p>
                        <Button variant="ghost" size="sm">
                            View Ticket Details
                        </Button>
                    </Card>
                </div>

                {/* Duty Roster */}
                <div>
                    <Card padding="lg">
                        <CardHeader>
                            <CardTitle>Duty Roster</CardTitle>
                        </CardHeader>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-[#8899AA]">Primary On-Call</span>
                                <span className="flex items-center gap-1 text-emerald-400">
                                    <span
                                        className="h-2 w-2 rounded-full bg-emerald-400"
                                        aria-hidden="true"
                                    />
                                    Ajiit K.
                                </span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-[#8899AA]">Secondary</span>
                                <span className="text-white">Neha S.</span>
                            </div>
                            <div className="h-px w-full bg-[#1A2A3A]" />
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-[#8899AA]">Escalation Level</span>
                                <span className="font-mono text-white">Level 2 (Active)</span>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </Page>
    );
}
