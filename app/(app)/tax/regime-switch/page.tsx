"use client";

import React, { useState } from "react";
import {
    CheckCircle2,
    XCircle,
    Search,
    ArrowRightLeft,
    AlertTriangle,
} from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export default function RegimeSwitchApprovals() {
    const [activeFilter, setActiveFilter] = useState<"pending" | "processed">("pending");

    return (
        <Page
            title="Tax Regime Switch Requests"
            subtitle="Manage employee requests to change tax regimes mid-year before payroll cutoff."
            breadcrumbs={[
                { label: "Tax", href: "/tax/dashboard" },
                { label: "Regime Switch" },
            ]}
            maxWidth="1400px"
        >
            <div className="space-y-6">
                {/* Info Banner */}
                <Card padding="md" className="flex items-start gap-3">
                    <AlertTriangle size={20} className="text-[#FFB800] mt-0.5 shrink-0" aria-hidden="true" />
                    <div className="text-sm">
                        <h4 className="font-bold text-white mb-1">Important Rule</h4>
                        <p className="text-[#8899AA]">
                            The CBDT allows an employee to change their chosen tax regime (Old to New or New to Old) during the
                            financial year. However, the employer may restrict this to once a year to prevent payroll computation
                            complications. Ensure you review the TDS recalculation before approving.
                        </p>
                    </div>
                </Card>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card padding="md" className="text-center border-b-2 border-[#1A2A3A]">
                        <p className="text-xs text-[#8899AA] font-semibold uppercase tracking-wider mb-1">Total Requests</p>
                        <p className="text-2xl font-black text-white">42</p>
                    </Card>
                    <Card padding="md" className="text-center border-b-2 border-[#FFB800] bg-[#FFB800]/5">
                        <p className="text-xs text-[#FFB800] font-semibold uppercase tracking-wider mb-1">Pending Approval</p>
                        <p className="text-2xl font-black text-[#FFB800]">12</p>
                    </Card>
                    <Card padding="md" className="text-center border-b-2 border-[#00E5A0] bg-[#00E5A0]/5">
                        <p className="text-xs text-[#00E5A0] font-semibold uppercase tracking-wider mb-1">Approved</p>
                        <p className="text-2xl font-black text-[#00E5A0]">28</p>
                    </Card>
                    <Card padding="md" className="text-center border-b-2 border-red-400 bg-red-400/5">
                        <p className="text-xs text-red-400 font-semibold uppercase tracking-wider mb-1">Rejected</p>
                        <p className="text-2xl font-black text-red-400">2</p>
                    </Card>
                </div>

                {/* Table */}
                <Card padding="none">
                    <div className="p-4 border-b border-[#1A2A3A] flex justify-between items-center bg-[#0A1420]">
                        <div className="flex space-x-2">
                            <Button
                                variant={activeFilter === "pending" ? "secondary" : "ghost"}
                                size="sm"
                                onClick={() => setActiveFilter("pending")}
                            >
                                Pending (12)
                            </Button>
                            <Button
                                variant={activeFilter === "processed" ? "secondary" : "ghost"}
                                size="sm"
                                onClick={() => setActiveFilter("processed")}
                            >
                                Processed (30)
                            </Button>
                        </div>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search Name..."
                                aria-label="Search employees"
                                className="bg-[#060B14] border border-[#1A2A3A] px-4 py-1.5 pl-9 rounded-lg text-sm text-white focus:outline-none focus:border-[#FFB800] w-64"
                            />
                            <Search size={16} className="absolute left-3 top-2.5 text-[#8899AA]" aria-hidden="true" />
                        </div>
                    </div>

                    <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-3 border-b border-[#1A2A3A] text-xs font-bold text-[#8899AA] uppercase tracking-wider bg-[#060B14]">
                        <div className="col-span-3">Employee Details</div>
                        <div className="col-span-2">Regime Change</div>
                        <div className="col-span-3">TDS Impact (Per Month)</div>
                        <div className="col-span-2">Reason</div>
                        <div className="col-span-2 text-right">Actions</div>
                    </div>

                    <div className="divide-y divide-[#1A2A3A]">
                        {/* Request 1: New -> Old */}
                        <div className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-[#1A2A3A]/30 transition-colors bg-[#060B14]/40">
                            <div className="col-span-3">
                                <div className="text-sm font-bold text-white mb-0.5">Rahul Verma</div>
                                <div className="text-xs text-[#8899AA]">EMP103 • Requested: 12 Jan</div>
                            </div>
                            <div className="col-span-2 flex items-center space-x-2">
                                <span className="text-xs font-bold text-[#445566]">New</span>
                                <ArrowRightLeft size={14} className="text-[#445566]" aria-hidden="true" />
                                <Badge variant="success">Old</Badge>
                            </div>
                            <div className="col-span-3">
                                <div className="flex items-center space-x-2 text-sm">
                                    <span className="text-[#445566] line-through">₹12,500</span>
                                    <ArrowRightLeft size={12} className="text-[#445566]" aria-hidden="true" />
                                    <span className="font-bold text-[#FFB800]">₹10,200</span>
                                </div>
                                <div className="text-[10px] text-[#00E5A0] mt-0.5">-₹2,300 (Take-home increases)</div>
                            </div>
                            <div className="col-span-2">
                                <p className="text-xs text-[#8899AA] line-clamp-2">
                                    Bought a new house, want to claim home loan interest deduction.
                                </p>
                            </div>
                            <div className="col-span-2 flex justify-end space-x-2">
                                <Button variant="ghost" size="sm" aria-label="Approve Rahul Verma regime switch">
                                    <CheckCircle2 size={16} className="text-[#00E5A0]" aria-hidden="true" />
                                </Button>
                                <Button variant="ghost" size="sm" aria-label="Reject Rahul Verma regime switch">
                                    <XCircle size={16} className="text-red-400" aria-hidden="true" />
                                </Button>
                            </div>
                        </div>

                        {/* Request 2: Old -> New */}
                        <div className="grid grid-cols-12 gap-4 px-6 py-4 items-start hover:bg-[#1A2A3A]/30 transition-colors bg-[#060B14]/40">
                            <div className="col-span-3">
                                <div className="text-sm font-bold text-white mb-0.5">Sneha Gupta</div>
                                <div className="text-xs text-[#8899AA]">EMP415 • Requested: 14 Jan</div>
                            </div>
                            <div className="col-span-2 flex items-center space-x-2">
                                <span className="text-xs font-bold text-[#445566]">Old</span>
                                <ArrowRightLeft size={14} className="text-[#445566]" aria-hidden="true" />
                                <Badge variant="info">New</Badge>
                            </div>
                            <div className="col-span-3">
                                <div className="flex items-center space-x-2 text-sm">
                                    <span className="text-[#445566] line-through">₹8,400</span>
                                    <ArrowRightLeft size={12} className="text-[#445566]" aria-hidden="true" />
                                    <span className="font-bold text-red-400">₹14,500</span>
                                </div>
                                <div className="text-[10px] text-red-400 mt-0.5">Arrears to be deducted: ₹12,200</div>
                                <div className="mt-2">
                                    <Badge variant="warning">
                                        <AlertTriangle size={12} className="mr-1 inline" aria-hidden="true" />
                                        Significant TDS spike
                                    </Badge>
                                </div>
                            </div>
                            <div className="col-span-2">
                                <p className="text-xs text-[#8899AA] line-clamp-2">
                                    Could not invest the planned 80C amount. Better to switch to new regime.
                                </p>
                            </div>
                            <div className="col-span-2 flex justify-end space-x-2">
                                <Button size="sm">Approve</Button>
                                <Button variant="danger" size="sm">Reject</Button>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </Page>
    );
}
