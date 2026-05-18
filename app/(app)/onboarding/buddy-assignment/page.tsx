"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
    Users, Sparkles, UserPlus, CheckCircle2, Search
} from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

// ─── Static data ──────────────────────────────────────────────────────────────

const NEW_JOINERS = [
    { id: 1, name: "Arjun Mehta", role: "Frontend Dev", dept: "Engineering", assigned: false },
    { id: 2, name: "Sneha Rao", role: "Product Designer", dept: "Design", assigned: true, buddy: "Vikram Singh" },
    { id: 3, name: "Kabir Das", role: "Sales Executive", dept: "Sales", assigned: false },
    { id: 4, name: "Priya Singh", role: "Marketing Mngr", dept: "Marketing", assigned: false },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BuddyAssignment() {
    const [selectedJoiner, setSelectedJoiner] = useState(1);
    const [assigning, setAssigning] = useState(false);

    return (
        <Page
            title="Onboarding Buddy Assignment"
            subtitle="Match new joiners with experienced culture champions to guide their first 30 days."
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Onboarding", href: "/onboarding/dashboard" },
                { label: "Buddy Assignment", href: "/onboarding/buddy-assignment" },
            ]}
            maxWidth="1600px"
        >
            <div className="flex gap-6 min-h-[600px]">
                {/* Left: Joiner List */}
                <Card padding="none" className="w-[400px] shrink-0 flex flex-col">
                    <div className="p-4 border-b border-[#1A2A3A]">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8899AA]" size={16} aria-hidden="true" />
                            <input
                                id="joiner-search"
                                type="search"
                                placeholder="Search joiners..."
                                aria-label="Search joiners"
                                className="w-full pl-9 pr-4 py-2 bg-[#1A2A3A] border border-[#2A3A4A] rounded-lg text-sm text-white focus:outline-none focus:border-[#00E5A0] transition-colors"
                            />
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto p-3 space-y-2">
                        {NEW_JOINERS.map(joiner => (
                            <div
                                key={joiner.id}
                                onClick={() => setSelectedJoiner(joiner.id)}
                                role="button"
                                tabIndex={0}
                                aria-pressed={selectedJoiner === joiner.id}
                                onKeyDown={(e) => e.key === "Enter" && setSelectedJoiner(joiner.id)}
                                className={`p-4 rounded-xl border cursor-pointer transition-colors ${
                                    selectedJoiner === joiner.id
                                        ? "bg-[#1A2A3A] border-[#00E5A0]"
                                        : "bg-[#0A1420] border-[#1A2A3A] hover:border-[#2A3A4A]"
                                }`}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                                            selectedJoiner === joiner.id ? "bg-[#00E5A0] text-[#0A1420]" : "bg-[#1A2A3A] text-white"
                                        }`}>
                                            {joiner.name.split(" ").map(n => n[0]).join("")}
                                        </div>
                                        <div>
                                            <h3 className={`font-semibold text-sm ${selectedJoiner === joiner.id ? "text-white" : "text-gray-300"}`}>
                                                {joiner.name}
                                            </h3>
                                            <p className="text-xs text-[#8899AA]">{joiner.role} • {joiner.dept}</p>
                                        </div>
                                    </div>
                                    {joiner.assigned ? (
                                        <Badge variant="success">
                                            <CheckCircle2 size={12} aria-hidden="true" /> Assigned
                                        </Badge>
                                    ) : (
                                        <Badge variant="warning">Pending</Badge>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Right: AI Match Studio */}
                <Card className="flex-1 flex flex-col">
                    {selectedJoiner === 1 ? (
                        <>
                            <div className="flex items-center justify-between mb-8 pb-6 border-b border-[#1A2A3A]">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-full bg-[#1A2A3A] text-[#00E5A0] flex items-center justify-center font-bold text-2xl border border-[#2A3A4A]">
                                        AM
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold text-white">Arjun Mehta</h2>
                                        <p className="text-[#8899AA]">Frontend Developer • Engineering</p>
                                    </div>
                                </div>
                                <Button
                                    variant="secondary"
                                    icon={<Sparkles size={16} aria-hidden="true" />}
                                >
                                    Run AI Match
                                </Button>
                            </div>

                            <div className="mb-6">
                                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                    <Sparkles size={18} className="text-[#9D00FF]" aria-hidden="true" /> AI Recommended Buddies
                                </h3>
                                <div className="space-y-4">
                                    {/* Top Match */}
                                    <div className={`p-4 rounded-xl border transition-all ${assigning ? "bg-[#00E5A0]/10 border-[#00E5A0] shadow-[0_0_20px_rgba(0,229,160,0.1)]" : "bg-[#0A1420] border-[#33E6FF] hover:border-[#00E5A0]"}`}>
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-start gap-4">
                                                <div className="relative">
                                                    <Image
                                                        src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                                                        alt="Ravi Sharma"
                                                        className="w-12 h-12 rounded-full border-2 border-[#1A2A3A]"
                                                        width={48}
                                                        height={48}
                                                    />
                                                    <div className="absolute -bottom-1 -right-1 bg-[#33E6FF] text-[#0A1420] text-[10px] font-bold px-1.5 py-0.5 rounded border border-[#0F1C2E]">
                                                        98%
                                                    </div>
                                                </div>
                                                <div>
                                                    <h4 className="text-white font-bold text-[15px]">Ravi Sharma</h4>
                                                    <p className="text-xs text-[#8899AA] mb-2">Senior Frontend Eng • 4 yrs tenure</p>
                                                    <div className="flex gap-2 flex-wrap">
                                                        <Badge variant="info">Same Team</Badge>
                                                        <Badge variant="success">Has Capacity (0 active)</Badge>
                                                        <Badge variant="warning">High Rating (4.9/5)</Badge>
                                                    </div>
                                                </div>
                                            </div>
                                            <Button
                                                onClick={() => setAssigning(true)}
                                                variant={assigning ? "primary" : "secondary"}
                                                icon={assigning ? <CheckCircle2 size={16} aria-hidden="true" /> : <UserPlus size={16} aria-hidden="true" />}
                                            >
                                                {assigning ? "Assigned" : "Assign"}
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Second Match */}
                                    <div className="p-4 rounded-xl border border-[#1A2A3A] bg-[#0A1420] opacity-70 hover:opacity-100 hover:border-[#2A3A4A] transition-all">
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-start gap-4">
                                                <div className="relative">
                                                    <div className="w-12 h-12 rounded-full bg-[#1A2A3A] border-2 border-[#2A3A4A] flex items-center justify-center font-bold text-white">
                                                        DK
                                                    </div>
                                                    <div className="absolute -bottom-1 -right-1 bg-[#1A2A3A] text-[#8899AA] text-[10px] font-bold px-1.5 py-0.5 rounded border border-[#2A3A4A]">
                                                        85%
                                                    </div>
                                                </div>
                                                <div>
                                                    <h4 className="text-white font-bold text-[15px]">Deepak Kumar</h4>
                                                    <p className="text-xs text-[#8899AA] mb-2">Full Stack Dev • 2 yrs tenure</p>
                                                    <div className="flex gap-2">
                                                        <Badge variant="neutral">Same Department</Badge>
                                                    </div>
                                                </div>
                                            </div>
                                            <Button variant="secondary" icon={<UserPlus size={16} aria-hidden="true" />}>
                                                Assign
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="text-center mt-10">
                                <p className="text-sm text-[#445566]">Or browse the full directory to assign manually</p>
                                <Button variant="ghost" size="sm" className="mt-2">
                                    View All Employees
                                </Button>
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-[#445566]">
                            <Users size={64} className="mb-4 opacity-20" aria-hidden="true" />
                            <h2 className="text-xl font-medium text-white mb-2">Select a joiner</h2>
                            <p className="text-sm">Click on a new joiner from the list to view buddy recommendations.</p>
                        </div>
                    )}
                </Card>
            </div>
        </Page>
    );
}
