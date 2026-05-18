"use client";

import { Send, ShieldCheck, FileSearch, Building2 } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function BGVInitiation() {
    return (
        <Page
            title="Initiate Background Verification"
            subtitle="Select vendor packages and trigger BGV post offer acceptance"
            breadcrumbs={[
                { label: "Recruitment", href: "/recruitment/dashboard" },
                { label: "BGV", href: "/recruitment/bgv/status" },
                { label: "Initiate" },
            ]}
            maxWidth="900px"
        >
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {/* Configuration side */}
                <div className="space-y-6">
                    <div>
                        <label className="mb-2 block text-sm font-semibold text-white">
                            Selected Candidate
                        </label>
                        <Card padding="md" className="flex items-center gap-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#0066FF] to-[#00E5A0] text-sm font-bold shadow-lg">
                                RS
                            </div>
                            <div>
                                <h4 className="font-bold text-white">Rahul Sharma</h4>
                                <p className="text-xs text-[#8899AA]">Senior Frontend Engineer · Offer Accepted</p>
                            </div>
                        </Card>
                    </div>

                    <div>
                        <div className="mb-2 flex items-end justify-between">
                            <label htmlFor="vendor-select" className="block text-sm font-semibold text-white">
                                Select Partner Vendor
                            </label>
                            <span className="text-xs font-bold text-[#00E5A0]">API Connected</span>
                        </div>
                        <select
                            id="vendor-select"
                            className="h-12 w-full rounded-xl border border-[#1A2A3A] bg-[#060B14] px-4 text-sm font-medium text-white focus:border-[#0066FF] focus:outline-none"
                        >
                            <option>AuthBridge Solutions</option>
                            <option>FirstAdvantage India</option>
                            <option>HireRight Global</option>
                        </select>
                    </div>

                    <fieldset>
                        <legend className="mb-3 text-sm font-semibold text-white">
                            Choose Verification Package
                        </legend>
                        <div className="space-y-3">
                            <label className="flex cursor-pointer items-start gap-4 rounded-xl border border-[#0066FF] bg-[#0066FF]/5 p-4 shadow-[0_0_15px_rgba(0,102,255,0.1)] transition-colors">
                                <input
                                    type="radio"
                                    name="pkg"
                                    defaultChecked
                                    className="mt-1 h-4 w-4 accent-[#0066FF]"
                                />
                                <div>
                                    <h4 className="flex items-center gap-2 font-bold text-white">
                                        Standard Technical{" "}
                                        <span className="rounded bg-[#1A2A3A] px-2 py-0.5 text-[10px] text-[#8899AA]">
                                            SDE L1-L3
                                        </span>
                                    </h4>
                                    <p className="mt-1 text-xs text-[#8899AA]">
                                        ID (Aadhar/PAN), Academic, Last 2 Employers, Criminal Court Records.
                                    </p>
                                    <p className="mt-2 text-xs font-bold text-white">
                                        TAT: 5-7 Working Days · ₹2,500
                                    </p>
                                </div>
                            </label>

                            <label className="flex cursor-pointer items-start gap-4 rounded-xl border border-[#1A2A3A] bg-[#0D1928] p-4 transition-colors hover:border-[#2A3A4A]">
                                <input
                                    type="radio"
                                    name="pkg"
                                    className="mt-1 h-4 w-4 accent-[#0066FF]"
                                />
                                <div>
                                    <h4 className="flex items-center gap-2 font-bold text-white">
                                        Executive Check{" "}
                                        <span className="rounded bg-[#1A2A3A] px-2 py-0.5 text-[10px] text-[#8899AA]">
                                            Leadership
                                        </span>
                                    </h4>
                                    <p className="mt-1 text-xs text-[#8899AA]">
                                        All Standard + Global Database Check, Directorship Search, Credit/CIBIL.
                                    </p>
                                    <p className="mt-2 text-xs font-bold text-white">
                                        TAT: 10-12 Working Days · ₹6,500
                                    </p>
                                </div>
                            </label>
                        </div>
                    </fieldset>
                </div>

                {/* Preview & Action Side */}
                <Card padding="lg" className="flex flex-col justify-between">
                    <div>
                        <h3 className="mb-6 font-semibold text-white">Initiation Summary</h3>
                        <div className="space-y-5">
                            <div className="flex items-start gap-3">
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1A2A3A] text-[#9B59B6]">
                                    <ShieldCheck size={14} aria-hidden="true" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-white">Data Consent Link</p>
                                    <p className="mt-1 text-xs leading-relaxed text-[#8899AA]">
                                        An automated email and SMS will be sent to the candidate requesting
                                        data consent and document uploads on the vendor portal.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1A2A3A] text-[#0066FF]">
                                    <FileSearch size={14} aria-hidden="true" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-white">Pre-filled Data</p>
                                    <p className="mt-1 text-xs leading-relaxed text-[#8899AA]">
                                        Basic details (Name, Dob, Email, Phone, Resume) will be securely
                                        synced to AuthBridge via API.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1A2A3A] text-[#FFB800]">
                                    <Building2 size={14} aria-hidden="true" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-white">Compliance</p>
                                    <p className="mt-1 text-xs leading-relaxed text-[#8899AA]">
                                        This initiation complies with the GDPR/DPDP rules configured in
                                        Module 10.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 border-t border-[#1A2A3A] pt-6">
                        <Button
                            variant="primary"
                            size="lg"
                            icon={<Send size={16} aria-hidden="true" />}
                            className="w-full justify-center"
                        >
                            Initiate BGV Request
                        </Button>
                    </div>
                </Card>
            </div>
        </Page>
    );
}
