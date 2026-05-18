"use client";
import React from "react";
import { ArrowRight, UploadCloud, Link as LinkIcon, Edit3 } from "lucide-react";
import Link from "next/link";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";

export default function AddEmployeesGuideScreen() {
    return (
        <Page
            title="Add Employees Guide"
            subtitle="Whether you have 10 employees or 10,000, Kaarya offers multiple ways to ingest your workforce data securely."
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Onboarding", href: "/onboarding/dashboard" },
                { label: "Guide", href: "/onboarding/checklist" },
                { label: "Add Employees", href: "/onboarding/guide/add-employees" },
            ]}
            maxWidth="1200px"
            actions={
                <Link href="/onboarding/checklist" className="text-[#556677] hover:text-white text-sm font-bold transition-colors">
                    Save &amp; Exit
                </Link>
            }
        >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Option 1: Bulk Import */}
                <Link
                    href="/onboarding/import"
                    className="bg-[#0A1420] border border-[#1A2A3A] hover:border-indigo-500/50 rounded-2xl p-8 transition-all group flex flex-col h-full hover:-translate-y-1 shadow-xl hover:shadow-indigo-500/10"
                >
                    <div className="w-16 h-16 bg-[#131B2B] rounded-2xl flex items-center justify-center text-indigo-400 mb-6 border border-[#2A3A4A] group-hover:bg-indigo-500/10 group-hover:border-indigo-500/30 transition-colors">
                        <UploadCloud size={32} aria-hidden="true" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Bulk Import (CSV/Excel)</h3>
                    <p className="text-[#8899AA] text-sm mb-8 flex-1">
                        Download our perfectly formatted template, fill in your team&apos;s details, and upload it in one go. Best for mid-sized teams.
                    </p>
                    <div className="text-indigo-400 text-sm font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
                        Start Bulk Import <ArrowRight size={16} aria-hidden="true" />
                    </div>
                </Link>

                {/* Option 2: Connect HRMS */}
                <Link
                    href="/onboarding/import/darwinbox"
                    className="bg-[#0A1420] border border-sky-500/30 rounded-2xl p-8 transition-all group flex flex-col h-full relative overflow-hidden shadow-xl shadow-sky-500/10"
                >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/5 blur-2xl rounded-full" aria-hidden="true" />
                    <div className="absolute top-4 right-4 bg-sky-500/20 text-sky-400 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Fastest</div>

                    <div className="w-16 h-16 bg-sky-500/10 rounded-2xl flex items-center justify-center text-sky-400 mb-6 border border-sky-500/20 relative z-10">
                        <LinkIcon size={32} aria-hidden="true" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 relative z-10">Connect HRMS / ATS</h3>
                    <p className="text-[#8899AA] text-sm mb-8 flex-1 relative z-10">
                        Migrating from Keka, Darwinbox, or GreytHR? Simply authenticate and we&apos;ll sync your entire org hierarchy and data automatically.
                    </p>
                    <div className="text-sky-400 text-sm font-bold flex items-center gap-2 group-hover:gap-3 transition-all relative z-10">
                        Connect System <ArrowRight size={16} aria-hidden="true" />
                    </div>
                </Link>

                {/* Option 3: Add Manually */}
                <Card className="flex flex-col h-full cursor-pointer hover:border-[#3A4A5A] transition-colors group">
                    <div className="w-16 h-16 bg-[#131B2B] rounded-2xl flex items-center justify-center text-[#8899AA] mb-6 border border-[#2A3A4A] transition-colors">
                        <Edit3 size={32} aria-hidden="true" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Add Manually</h3>
                    <p className="text-[#8899AA] text-sm mb-8 flex-1">
                        Add employees one by one through a quick form. Good for founders just starting out with their first few hires.
                    </p>
                    <div className="text-[#556677] group-hover:text-white text-sm font-bold flex items-center gap-2 transition-colors">
                        Open Form <ArrowRight size={16} aria-hidden="true" />
                    </div>
                </Card>

            </div>
        </Page>
    );
}
