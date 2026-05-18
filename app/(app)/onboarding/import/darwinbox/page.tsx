"use client";
import React from "react";
import { UploadCloud, Link as LinkIcon, ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function ImportFromDarwinboxScreen() {
    return (
        <Page
            title="Import from Darwinbox"
            subtitle="Securely migrate your enterprise employee data, custom fields, and complex org structures natively to Kaarya."
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Onboarding", href: "/onboarding/dashboard" },
                { label: "Import from Darwinbox", href: "/onboarding/import/darwinbox" },
            ]}
        >
            <Card padding="lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Method 1: API */}
                    <div className="bg-[#060D1A] border border-sky-500/30 rounded-xl p-6 relative group overflow-hidden hover:border-sky-400 transition-colors cursor-pointer">
                        <div className="absolute inset-0 bg-sky-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute top-4 right-4 bg-sky-500/20 text-sky-400 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                            Recommended
                        </div>

                        <div className="w-12 h-12 bg-sky-500/10 rounded-xl flex items-center justify-center text-sky-400 mb-6 border border-sky-500/20">
                            <LinkIcon size={24} aria-hidden="true" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Direct API Sync</h3>
                        <p className="text-[#8899AA] text-sm mb-6">
                            Provide your Darwinbox tenant URL and API credentials to sync vast amounts of data seamlessly in the background.
                        </p>

                        <Button className="w-full justify-center" style={{ backgroundColor: "#0284c7" }}>
                            Connect Account <ArrowRight size={16} aria-hidden="true" />
                        </Button>

                        <p className="mt-4 text-xs flex items-center justify-center gap-1 text-[#556677] font-medium">
                            <ShieldCheck size={14} className="text-emerald-500" aria-hidden="true" /> Enterprise Grade Security
                        </p>
                    </div>

                    {/* Method 2: CSV */}
                    <div className="bg-[#060D1A] border border-[#2A3A4A] rounded-xl p-6 relative group hover:border-[#3A4A5A] transition-colors cursor-pointer flex flex-col justify-between">
                        <div>
                            <div className="w-12 h-12 bg-[#131B2B] rounded-xl flex items-center justify-center text-[#8899AA] mb-6 border border-[#2A3A4A]">
                                <UploadCloud size={24} aria-hidden="true" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Upload Data Exports</h3>
                            <p className="text-[#8899AA] text-sm mb-6">
                                Export your Data Studio reports from Darwinbox and map them to Kaarya&apos;s unified schema.
                            </p>
                        </div>

                        <div>
                            <Link
                                href="/onboarding/import/mapping"
                                className="w-full bg-[#131B2B] hover:bg-[#1A2A3A] border border-[#2A3A4A] text-white px-4 py-3 rounded-lg font-bold flex justify-center items-center gap-2 transition-colors mb-4"
                            >
                                Upload CSV/ZIP <UploadCloud size={16} aria-hidden="true" />
                            </Link>
                            <a href="#" className="text-xs text-sky-400 hover:text-sky-300 font-bold flex items-center justify-center gap-1">
                                View Darwinbox Export Guide
                            </a>
                        </div>
                    </div>
                </div>
            </Card>
        </Page>
    );
}
