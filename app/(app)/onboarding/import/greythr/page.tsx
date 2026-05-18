"use client";
import React from "react";
import { UploadCloud, Link as LinkIcon, ArrowRight } from "lucide-react";
import Link from "next/link";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function ImportFromGreytHRScreen() {
    return (
        <Page
            title="Import from GreytHR"
            subtitle="Bring your existing payroll configurations, tax declarations, and employee records from GreytHR effortlessly."
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Onboarding", href: "/onboarding/dashboard" },
                { label: "Import from GreytHR", href: "/onboarding/import/greythr" },
            ]}
        >
            <Card padding="lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Method 1: API */}
                    <div className="bg-[#060D1A] border border-blue-500/30 rounded-xl p-6 relative group overflow-hidden hover:border-blue-400 transition-colors cursor-pointer">
                        <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute top-4 right-4 bg-blue-500/20 text-blue-400 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                            Recommended
                        </div>

                        <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400 mb-6 border border-blue-500/20">
                            <LinkIcon size={24} aria-hidden="true" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">GreytHR API Sync</h3>
                        <p className="text-[#8899AA] text-sm mb-6">
                            Use your GreytHR domain and API token to automate the migration of active employees, salaries, and YTD tax data.
                        </p>

                        <Button className="w-full justify-center" style={{ backgroundColor: "#2563eb" }}>
                            Connect Account <ArrowRight size={16} aria-hidden="true" />
                        </Button>
                    </div>

                    {/* Method 2: CSV */}
                    <div className="bg-[#060D1A] border border-[#2A3A4A] rounded-xl p-6 relative group hover:border-[#3A4A5A] transition-colors cursor-pointer flex flex-col justify-between">
                        <div>
                            <div className="w-12 h-12 bg-[#131B2B] rounded-xl flex items-center justify-center text-[#8899AA] mb-6 border border-[#2A3A4A]">
                                <UploadCloud size={24} aria-hidden="true" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Upload Data Exports</h3>
                            <p className="text-[#8899AA] text-sm mb-6">
                                Export the &quot;Employee Master&quot; and &quot;Payroll Summary&quot; reports from GreytHR and upload them here.
                            </p>
                        </div>

                        <div>
                            <Link
                                href="/onboarding/import/mapping"
                                className="w-full bg-[#131B2B] hover:bg-[#1A2A3A] border border-[#2A3A4A] text-white px-4 py-3 rounded-lg font-bold flex justify-center items-center gap-2 transition-colors mb-4"
                            >
                                Upload Excel Files <UploadCloud size={16} aria-hidden="true" />
                            </Link>
                            <a href="#" className="text-xs text-blue-400 hover:text-blue-300 font-bold flex items-center justify-center gap-1">
                                Supported GreytHR Report Formats
                            </a>
                        </div>
                    </div>
                </div>
            </Card>
        </Page>
    );
}
