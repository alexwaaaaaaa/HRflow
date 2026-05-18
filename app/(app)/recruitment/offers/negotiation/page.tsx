"use client";

import { FileText, X, ArrowRight } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function OfferNegotiation() {
    return (
        <Page
            title="Negotiation Thread"
            subtitle="Candidate: Amit Patel (Backend Engineer)"
            breadcrumbs={[
                { label: "Recruitment", href: "/recruitment/dashboard" },
                { label: "Offers" },
                { label: "Negotiation" },
            ]}
            maxWidth="1200px"
        >
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_400px]">
                {/* Chat */}
                <Card padding="none" className="flex flex-col overflow-hidden">
                    {/* Message History */}
                    <div className="flex-1 space-y-6 overflow-y-auto p-6">
                        {/* HR Message */}
                        <div className="flex flex-col items-end">
                            <div className="max-w-[80%] rounded-t-2xl rounded-bl-2xl rounded-br-sm border border-[#1A2A3A] bg-[#0D1928] p-4 text-white">
                                <div className="mb-3 flex items-center gap-2 rounded-xl border border-[#2A3A4A] bg-[#1A2A3A] p-3 text-xs">
                                    <FileText size={16} className="text-[#00E5A0]" aria-hidden="true" />
                                    <div>
                                        <p className="font-bold text-[#00E5A0]">V1 Offer Generated</p>
                                        <p className="text-[#8899AA]">CTC: ₹28,00,000 + ₹1L Joining Bonus</p>
                                    </div>
                                </div>
                                <p className="text-sm leading-relaxed">
                                    Hi Amit, congratulations again on successfully passing our interview
                                    rounds! Attached is the V1 offer for your review. Please let me know
                                    if you have any questions.
                                </p>
                            </div>
                            <span className="mt-1 pr-1 text-[10px] text-[#445566]">
                                Priya Nair (You) · 16 Mar, 10:00 AM
                            </span>
                        </div>

                        {/* Candidate Reply */}
                        <div className="flex flex-col items-start">
                            <div className="max-w-[80%] rounded-t-2xl rounded-bl-sm rounded-br-2xl border border-[#2A3A4A] bg-[#1A2A3A] p-4 text-white">
                                <p className="text-sm leading-relaxed">
                                    Hi Priya, thank you for the offer. I am really excited about joining
                                    TechCorp. However, I currently have another offer for ₹32 LPA.
                                    <br />
                                    <br />
                                    Is there any room to match this base salary? I am willing to forego
                                    the joining bonus if the base compensation can be adjusted.
                                </p>
                            </div>
                            <span className="mt-1 pl-1 text-[10px] text-[#445566]">
                                Amit Patel (Candidate) · 16 Mar, 11:30 AM
                            </span>
                        </div>
                    </div>

                    {/* Input Area */}
                    <div className="border-t border-[#1A2A3A] bg-[#0A1420] p-4">
                        <div className="flex items-center gap-2">
                            <input
                                placeholder="Type your reply…"
                                aria-label="Reply message"
                                className="h-12 flex-1 rounded-xl border border-[#1A2A3A] bg-[#060B14] px-4 text-sm text-white focus:border-[#0066FF] focus:outline-none"
                            />
                            <Button>Send</Button>
                        </div>
                    </div>
                </Card>

                {/* Negotiation Toolkit */}
                <div className="space-y-6">
                    <Card padding="lg">
                        <h3 className="mb-4 font-bold text-white">Counter Offer Request</h3>
                        <div className="space-y-4">
                            <Card padding="md" variant="elevated">
                                <p className="mb-2 text-xs font-bold uppercase text-[#8899AA]">
                                    Original Offer (V1)
                                </p>
                                <p className="text-xl font-bold text-white">₹ 28,00,000</p>
                                <p className="mt-1 text-xs text-[#00E5A0]">+ ₹1,00,000 Joining</p>
                            </Card>

                            <div className="flex justify-center">
                                <ArrowRight size={16} className="text-[#445566]" aria-hidden="true" />
                            </div>

                            <div className="rounded-2xl border-2 border-dashed border-[#FFB800]/50 bg-[#1A2A3A] p-4">
                                <p className="mb-2 text-xs font-bold uppercase text-[#FFB800]">
                                    Candidate Request
                                </p>
                                <p className="text-xl font-bold text-white">₹ 32,00,000</p>
                                <p className="mt-1 text-xs text-[#FF4444]">Refuses Joining</p>
                            </div>
                        </div>
                    </Card>

                    <Card padding="lg">
                        <h3 className="mb-4 font-bold text-white">Budget Limits</h3>
                        <div className="mb-6 space-y-4">
                            <div>
                                <div className="mb-1.5 flex justify-between text-xs">
                                    <span className="text-[#8899AA]">Band Limit (SDE-2)</span>
                                    <span className="font-medium text-white">₹ 25L - ₹ 35L</span>
                                </div>
                                <div
                                    className="h-1.5 w-full overflow-hidden rounded-full bg-[#1A2A3A]"
                                    role="progressbar"
                                    aria-valuenow={80}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                    aria-label="Budget utilization"
                                >
                                    <div
                                        className="h-full bg-gradient-to-r from-[#00E5A0] to-[#FFB800]"
                                        style={{ width: "80%" }}
                                    />
                                </div>
                            </div>
                            <div className="rounded-lg border border-[#FFB800]/20 bg-[#FFB800]/10 p-3 text-xs leading-relaxed text-[#FFB800]">
                                Requested CTC (₹32L) is within the SDE-2 band limit, but exceeds the
                                Hiring Manager&apos;s approved budget of ₹30L. Revision requires VP Approval.
                            </div>
                        </div>

                        <div className="space-y-3">
                            <Button
                                icon={<FileText size={16} aria-hidden="true" />}
                                className="w-full justify-center"
                            >
                                Draft Revision (V2)
                            </Button>
                            <Button
                                variant="outline"
                                icon={<X size={16} aria-hidden="true" />}
                                className="w-full justify-center"
                            >
                                Reject Counter Offer
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
        </Page>
    );
}
