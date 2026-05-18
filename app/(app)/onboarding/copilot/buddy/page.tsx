"use client";
import React, { useState } from "react";
import { Bot, UserPlus, FileText, CheckCircle2, ArrowRight } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function BuddyAutoAssignScreen() {
    const [isAssigning, setIsAssigning] = useState(false);
    const [assigned, setAssigned] = useState(false);

    const handleAutoAssign = () => {
        setIsAssigning(true);
        setTimeout(() => {
            setIsAssigning(false);
            setAssigned(true);
        }, 3000);
    };

    return (
        <Page
            title="AI Buddy Assignment"
            subtitle="Kaarya Copilot matches new hires with experienced peers based on role, location, shared skills, and personality traits."
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Onboarding", href: "/onboarding/dashboard" },
                { label: "Copilot", href: "/onboarding/copilot/buddy" },
            ]}
            maxWidth="900px"
        >
            <div className="text-center mb-10">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl mx-auto flex items-center justify-center mb-4 border border-indigo-400/30 shadow-xl shadow-indigo-500/20 relative">
                    <Bot className="text-white z-10" size={28} aria-hidden="true" />
                    <div className="absolute top-0 right-0 w-2 h-2 rounded-full bg-emerald-400 animate-ping" aria-hidden="true" />
                </div>
            </div>

            <Card className="relative overflow-hidden shadow-2xl">
                <div className="flex flex-col md:flex-row gap-12 items-center relative z-10">

                    {/* Source Information */}
                    <div className="flex-1 space-y-6 w-full">
                        <Card variant="elevated">
                            <h3 className="text-sm font-bold text-[#8899AA] uppercase tracking-wider mb-4 flex items-center gap-2">
                                <UserPlus size={16} aria-hidden="true" /> New Hires (This Week)
                            </h3>

                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold border border-indigo-500/30">AJ</div>
                                    <div>
                                        <div className="text-white font-bold text-sm">Arjun Joshi</div>
                                        <div className="text-xs text-[#556677]">Frontend Engineer • BLR</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-rose-500/20 flex items-center justify-center text-rose-400 font-bold border border-rose-500/30">SM</div>
                                    <div>
                                        <div className="text-white font-bold text-sm">Sneha Menon</div>
                                        <div className="text-xs text-[#556677]">Product Manager • HYD</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 opacity-50">
                                    <div className="w-10 h-10 rounded-full bg-[#131B2B] flex items-center justify-center text-[#556677] font-bold border border-[#2A3A4A]">+4</div>
                                    <div className="text-xs font-bold text-[#556677]">More joining soon</div>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Action Center */}
                    <div className="flex flex-col items-center">
                        {!assigned ? (
                            <Button
                                onClick={handleAutoAssign}
                                disabled={isAssigning}
                                isLoading={isAssigning}
                                loadingText="Running Copilot..."
                                icon={<Bot size={24} aria-hidden="true" />}
                                size="lg"
                                className="w-48 flex-col h-auto py-4 gap-2"
                            >
                                Auto-Assign Buddies
                            </Button>
                        ) : (
                            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500/50 text-emerald-400 flex items-center justify-center">
                                <CheckCircle2 size={32} aria-hidden="true" />
                            </div>
                        )}
                    </div>

                    {/* Result Information */}
                    <div className="flex-1 space-y-6 w-full">
                        <Card variant="elevated" className={`transition-opacity duration-500 ${assigned ? "opacity-100" : "opacity-40"}`}>
                            <h3 className="text-sm font-bold text-[#8899AA] uppercase tracking-wider mb-4 flex items-center gap-2">
                                <FileText size={16} aria-hidden="true" /> Copilot Matches
                            </h3>

                            {!assigned && !isAssigning && (
                                <div className="h-32 flex items-center justify-center text-xs text-[#556677] border-2 border-dashed border-[#1A2A3A] rounded-lg">
                                    Click assign to view matches
                                </div>
                            )}

                            {isAssigning && (
                                <div className="space-y-4">
                                    <div className="h-10 bg-[#131B2B] rounded animate-pulse" />
                                    <div className="h-10 bg-[#131B2B] rounded animate-pulse w-4/5" />
                                </div>
                            )}

                            {assigned && (
                                <div className="space-y-4 text-sm">
                                    <div className="bg-[#131B2B] border border-emerald-500/30 p-3 rounded-lg">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-white font-bold">Arjun Joshi</span>
                                            <ArrowRight size={14} className="text-[#556677] mx-2" aria-hidden="true" />
                                            <span className="text-emerald-400 font-bold">Rahul T. (Sr. SDE)</span>
                                        </div>
                                        <div className="text-[10px] text-[#8899AA] bg-emerald-500/10 px-2 py-1 rounded inline-block">
                                            Matched via: Same Team (Frontend) &amp; Location (BLR)
                                        </div>
                                    </div>
                                    <div className="bg-[#131B2B] border border-emerald-500/30 p-3 rounded-lg">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-white font-bold">Sneha Menon</span>
                                            <ArrowRight size={14} className="text-[#556677] mx-2" aria-hidden="true" />
                                            <span className="text-emerald-400 font-bold">Priya K. (Product Lead)</span>
                                        </div>
                                        <div className="text-[10px] text-[#8899AA] bg-emerald-500/10 px-2 py-1 rounded inline-block">
                                            Matched via: Cross-functional interest (Design)
                                        </div>
                                    </div>
                                </div>
                            )}
                        </Card>
                    </div>
                </div>
            </Card>

            {assigned && (
                <div className="mt-8 text-center">
                    <Button variant="ghost">
                        Approve &amp; Send Emails
                    </Button>
                </div>
            )}
        </Page>
    );
}
