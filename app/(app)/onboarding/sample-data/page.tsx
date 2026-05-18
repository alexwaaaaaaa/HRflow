"use client";
import React, { useState } from "react";
import { Database, DownloadCloud, Sparkles, CheckCircle2, ChevronRight } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

// ─── Static data ─────────────────────────────────────────────────────────────

const SAMPLE_ITEMS = [
    { label: "50 Active Employees in 5 Depts" },
    { label: "3 Months of Payroll History" },
    { label: "Pending & Approved Leaves" },
    { label: "Sample Policies & Documents" },
    { label: "Compliance Challans (Mock)" },
    { label: "Configured Shift Policies" },
] as const;

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SampleDataLoadScreen() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleLoadData = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSuccess(true);
        }, 3000);
    };

    return (
        <Page
            title="Explore with Demo Data"
            subtitle="Not ready to import your real data? Populate your workspace with 50 fictional employees, past payroll runs, and sample leave requests to see Kaarya in action immediately."
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Onboarding", href: "/onboarding/dashboard" },
                { label: "Sample Data", href: "/onboarding/sample-data" },
            ]}
        >
            <div className="max-w-2xl mx-auto">
                <Card padding="lg" className="relative overflow-hidden">
                    {/* Background blobs */}
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/5 blur-[100px] rounded-full pointer-events-none" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none" />

                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-6">
                            <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                                <Database size={32} aria-hidden="true" />
                            </div>
                            {!loading && !success && (
                                <Button variant="secondary" size="sm">
                                    Skip <ChevronRight size={14} aria-hidden="true" />
                                </Button>
                            )}
                        </div>

                        {/* What gets added */}
                        <div className="bg-[#060D1A] border border-[#1A2A3A] rounded-xl p-5 mb-8">
                            <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">What gets added?</h3>
                            <div className="grid grid-cols-2 gap-4">
                                {SAMPLE_ITEMS.map((item) => (
                                    <div key={item.label} className="flex items-center gap-3 text-sm text-[#CCDDEE]">
                                        <CheckCircle2 size={16} className="text-emerald-500 shrink-0" aria-hidden="true" />
                                        <span>{item.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            {success ? (
                                <Button href="/dashboard" className="flex-1 justify-center">
                                    Go to Dashboard <ChevronRight size={20} aria-hidden="true" />
                                </Button>
                            ) : (
                                <Button
                                    onClick={handleLoadData}
                                    disabled={loading}
                                    isLoading={loading}
                                    loadingText="Loading Sandbox Data..."
                                    icon={<DownloadCloud size={20} aria-hidden="true" />}
                                    className="flex-1 justify-center"
                                >
                                    Load Sample Data
                                </Button>
                            )}
                        </div>

                        {!loading && !success && (
                            <div className="mt-6 flex items-start gap-3 p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                                <Sparkles className="text-amber-400 shrink-0" size={20} aria-hidden="true" />
                                <p className="text-xs text-amber-500/90 leading-relaxed">
                                    <strong>Note:</strong> You can wipe this demo data at any time from Settings &gt; Danger Zone with a single click once you&apos;re ready to import your real organization data.
                                </p>
                            </div>
                        )}

                        {success && (
                            <div className="mt-6 flex justify-center">
                                <span className="flex items-center gap-2 text-emerald-400 font-bold bg-emerald-500/10 px-4 py-2 rounded-full border border-emerald-500/20">
                                    <CheckCircle2 size={16} aria-hidden="true" /> Data loaded successfully!
                                </span>
                            </div>
                        )}
                    </div>
                </Card>
            </div>
        </Page>
    );
}
