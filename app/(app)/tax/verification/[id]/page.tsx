"use client";

import React, { useState } from "react";
import {
    CheckCircle2,
    ShieldCheck,
    ChevronLeft,
    ChevronRight,
    X,
    Maximize2,
    Download,
    Printer,
    MessageSquare,
    Copy,
    Send,
    Check,
} from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

// ── Sub-components (module-scope) ─────────────────────────────────────────────
function RowComp({ field, dec, prf }: { field: string; dec: string; prf: string }) {
    return (
        <div className="grid grid-cols-4 items-center px-4 py-3 text-sm text-white hover:bg-[#1A2A3A]/30 transition-colors">
            <div className="col-span-1 text-[#8899AA]">{field}</div>
            <div className="col-span-1 font-medium">{dec}</div>
            <div className="col-span-1 font-medium flex items-center gap-1">
                {prf} <CheckCircle2 size={12} className="text-[#00E5A0]" aria-hidden="true" />
            </div>
            <div className="col-span-1 text-right flex justify-end">
                <div className="w-5 h-5 rounded bg-[#00E5A0]/10 flex items-center justify-center border border-[#00E5A0]/20">
                    <CheckCircle2 size={12} className="text-[#00E5A0]" aria-hidden="true" />
                </div>
            </div>
        </div>
    );
}

function DecisionOption({
    icon,
    title,
    desc,
    onClick,
    selected,
    borderClass,
    bgClass,
}: {
    icon: React.ReactNode;
    title: string;
    desc: string;
    onClick: () => void;
    selected: boolean;
    borderClass: string;
    bgClass: string;
}) {
    return (
        <div
            className={`p-4 border rounded-xl cursor-pointer transition-all ${borderClass} ${
                selected ? bgClass.replace("hover:", "") : `bg-[#060B14] ${bgClass}`
            }`}
            onClick={onClick}
            role="radio"
            aria-checked={selected}
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") onClick();
            }}
        >
            <div className="flex items-start">
                <div className="mt-1 shrink-0 mr-3">
                    {selected ? (
                        <div className="w-4 h-4 rounded-full border-4 border-current" />
                    ) : (
                        <div className="w-4 h-4 rounded-full border-2 border-[#8899AA]" />
                    )}
                </div>
                <div>
                    <div className="text-sm font-bold text-white flex items-center gap-2">
                        {icon} {title}
                    </div>
                    <div className="text-xs text-[#8899AA] mt-1 pr-4">{desc}</div>
                </div>
            </div>
        </div>
    );
}

export default function ProofReviewDetail() {
    const router = useRouter();
    const params = useParams();
    const _empId = (params.id as string) || "EMP004";

    const [decision, setDecision] = useState<string | null>(null);
    const [rejectReason, setRejectReason] = useState<string>("");
    const [autoMessage, setAutoMessage] = useState<string>("");
    const [msgLang, setMsgLang] = useState<"en" | "hi">("en");

    const empData = {
        name: "Kavya Iyer",
        id: "EMP004",
        proofType: "80C — PPF Statement",
        date: "15/01/2025",
    };

    const generateRejectMessage = (reason: string, lang: "en" | "hi") => {
        if (!reason) {
            setAutoMessage("");
            return;
        }
        const reasons: Record<string, { en: string; hi: string }> = {
            amount_mismatch: {
                en: "Amount in document does not match declared amount.",
                hi: "दस्तावेज़ में दी गई राशि घोषित राशि से मेल नहीं खाती।",
            },
            unreadable: {
                en: "Document is blurry or unreadable.",
                hi: "दस्तावेज़ धुंधला है या पढ़ा नहीं जा सकता।",
            },
            wrong_fy: {
                en: "Document belongs to the wrong financial year.",
                hi: "दस्तावेज़ गलत वित्तीय वर्ष का है।",
            },
        };
        const r = reasons[reason] ?? reasons.amount_mismatch;
        if (lang === "en") {
            setAutoMessage(
                `Dear ${empData.name},\nWe have reviewed your investment proof for ${empData.proofType}. Unfortunately, we are unable to accept this proof because: ${r.en}\nPlease resubmit within 5 days with a valid document.\n\nRegards,\nHR Team`
            );
        } else {
            setAutoMessage(
                `प्रिय ${empData.name},\nहमने आपके ${empData.proofType} के निवेश प्रमाण की समीक्षा की है। दुर्भाग्य से, हम इस प्रमाण को स्वीकार करने में असमर्थ हैं क्योंकि: ${r.hi}\nकृपया 5 दिनों के भीतर एक वैध दस्तावेज़ के साथ फिर से जमा करें।\n\nसादर,\nHR टीम`
            );
        }
    };

    const handleRejectReasonChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const val = e.target.value;
        setRejectReason(val);
        if (val) generateRejectMessage(val, msgLang);
        else setAutoMessage("");
    };

    const handleLangToggle = (lang: "en" | "hi") => {
        setMsgLang(lang);
        if (rejectReason) generateRejectMessage(rejectReason, lang);
    };

    return (
        <Page
            title={`Proof Review — ${empData.name} (${empData.id})`}
            subtitle={`${empData.proofType} | Submitted: ${empData.date}`}
            breadcrumbs={[
                { label: "Tax", href: "/tax/verification" },
                { label: "Verification" },
            ]}
            maxWidth="1400px"
            fullBleed
            actions={
                <div className="flex items-center space-x-4">
                    <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => router.push("/tax/verification")}
                        icon={<ChevronLeft size={16} />}
                    >
                        Previous
                    </Button>
                    <span className="text-xs font-bold text-white px-3 bg-[#1A2A3A] py-1.5 rounded-lg">
                        Employee 45 of 202
                    </span>
                    <Button variant="secondary" size="sm" iconRight={<ChevronRight size={16} />}>
                        Next
                    </Button>
                </div>
            }
        >
            <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-260px)] min-h-[600px]">
                {/* Left - Document Viewer */}
                <div className="w-full lg:w-[680px] bg-[#0D1928] border border-[#1A2A3A] rounded-xl flex flex-col overflow-hidden shadow-lg">
                    <div className="h-12 border-b border-[#1A2A3A] bg-[#0A1420] flex items-center justify-between px-4">
                        <div className="flex items-center space-x-3 text-xs text-[#8899AA]">
                            <button type="button" className="hover:text-white transition-colors" aria-label="Zoom out">-</button>
                            <span className="font-mono text-[10px] w-8 text-center bg-[#060B14] py-0.5 rounded">100%</span>
                            <button type="button" className="hover:text-white transition-colors" aria-label="Zoom in">+</button>
                            <div className="w-px h-4 bg-[#1A2A3A] mx-1" aria-hidden="true" />
                            <span className="text-white">Page 1/1</span>
                        </div>
                        <div className="flex space-x-3 text-[#8899AA]">
                            <button type="button" className="hover:text-white transition-colors" aria-label="Maximize">
                                <Maximize2 size={16} aria-hidden="true" />
                            </button>
                            <button type="button" className="hover:text-white transition-colors" aria-label="Print">
                                <Printer size={16} aria-hidden="true" />
                            </button>
                            <button type="button" className="hover:text-white transition-colors" aria-label="Download">
                                <Download size={16} aria-hidden="true" />
                            </button>
                        </div>
                    </div>

                    {/* PDF Mock */}
                    <div className="flex-1 bg-[#060B14] p-8 overflow-auto flex justify-center items-start">
                        <div className="bg-white w-[500px] h-[700px] shadow-xl p-8 pb-16 relative">
                            <div className="mb-8 border-b-2 border-slate-300 pb-4">
                                <h2 className="text-2xl font-serif text-slate-800 font-bold tracking-tight">State Bank of India</h2>
                                <span className="text-slate-500 font-sans text-sm block mt-1">PPF Account Statement</span>
                                <span className="text-slate-400 font-sans text-xs">For the period 01/04/2024 to 31/03/2025</span>
                            </div>
                            <div className="grid grid-cols-2 gap-4 font-mono text-xs text-slate-700 mb-8">
                                <div><span className="font-bold">Name:</span> Kavya Iyer</div>
                                <div><span className="font-bold">Account:</span> SBPPF00445588</div>
                                <div><span className="font-bold">Branch:</span> Koramangala</div>
                                <div><span className="font-bold">Status:</span> ACTIVE</div>
                            </div>
                            <div className="border border-slate-200">
                                <div className="bg-slate-100 p-2 font-bold text-xs text-slate-700 grid grid-cols-4 border-b border-slate-200">
                                    <div className="col-span-1">Date</div>
                                    <div className="col-span-2">Narration</div>
                                    <div className="col-span-1 text-right">Credit</div>
                                </div>
                                <div className="p-2 text-xs font-mono text-slate-600 space-y-3">
                                    <div className="grid grid-cols-4 border-b border-slate-50 pb-2">
                                        <div className="col-span-1">10/04/2024</div>
                                        <div className="col-span-2">UPI CREDIT</div>
                                        <div className="col-span-1 text-right">30,000.00</div>
                                    </div>
                                    <div className="grid grid-cols-4 border-b border-slate-50 pb-2">
                                        <div className="col-span-1">15/09/2024</div>
                                        <div className="col-span-2">UPI CREDIT</div>
                                        <div className="col-span-1 text-right">25,000.00</div>
                                    </div>
                                    <div className="grid grid-cols-4 border-b border-slate-50 pb-2">
                                        <div className="col-span-1">30/11/2024</div>
                                        <div className="col-span-2">NEFT XFR</div>
                                        <div className="col-span-1 text-right">30,000.00</div>
                                    </div>
                                </div>
                                <div className="bg-slate-50 p-3 font-bold text-sm text-slate-800 flex justify-between border-t border-slate-300">
                                    <span>TOTAL DEPOSITS:</span>
                                    <span>₹85,000.00</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* AI Discovery Strip */}
                    <div className="p-4 bg-[#1A2A3A]/90 border-t border-[#2A3A4A] flex justify-between items-center text-sm">
                        <div className="flex items-center space-x-6">
                            <span className="px-2 py-1 bg-[#1A2A3A] rounded font-semibold text-white">PPF Statement</span>
                            <span className="flex items-center text-[#00E5A0] font-bold gap-1">
                                <ShieldCheck size={16} aria-hidden="true" /> AI Conf: 91/100
                            </span>
                        </div>
                        <div className="flex space-x-4 text-xs font-mono">
                            <span className="text-white">
                                Name: <span className="text-[#00E5A0]">Kavya Iyer</span>
                            </span>
                            <span className="text-white">
                                Amount: <span className="text-[#00E5A0]">₹85,000</span>
                            </span>
                            <span className="text-white">
                                FY: <span className="text-[#00E5A0]">2024-25</span>
                            </span>
                        </div>
                    </div>
                </div>

                {/* Right - Decision Panel */}
                <div className="flex-1 overflow-y-auto space-y-6">
                    {/* Details Comparison */}
                    <Card padding="lg">
                        <h3 className="text-sm font-bold text-white mb-4">Declaration vs Proof</h3>
                        <Card variant="bare" className="bg-[#060B14] rounded-lg border border-[#1A2A3A] overflow-hidden">
                            <div className="grid grid-cols-4 items-center bg-[#1A2A3A]/50 px-4 py-2 text-xs font-bold text-[#8899AA] border-b border-[#1A2A3A]">
                                <div className="col-span-1">Field</div>
                                <div className="col-span-1">Declared</div>
                                <div className="col-span-1">Proof Shows</div>
                                <div className="col-span-1 text-right">Match?</div>
                            </div>
                            <div className="divide-y divide-[#1A2A3A]">
                                <RowComp field="Section" dec="80C - PPF" prf="PPF" />
                                <RowComp field="Amount" dec="₹85,000" prf="₹85,000" />
                                <RowComp field="FY" dec="2024-25" prf="2024-25" />
                                <RowComp field="Name" dec="Kavya Iyer" prf="Kavya Iyer" />
                                <RowComp field="Doc Type" dec="Bank Statement" prf="SBI Statement" />
                            </div>
                        </Card>

                        <div className="mt-4 p-3 bg-[#00E5A0]/5 border border-[#00E5A0]/20 rounded-lg flex items-center gap-2">
                            <CheckCircle2 size={18} className="text-[#00E5A0]" aria-hidden="true" />
                            <span className="text-sm font-bold text-[#00E5A0]">Ready for approval — All details match</span>
                        </div>
                    </Card>

                    {/* HR Decision */}
                    <Card padding="lg">
                        <h3 className="text-sm font-bold text-white mb-4">HR Decision</h3>
                        <div role="radiogroup" aria-label="HR decision" className="space-y-3">
                            <DecisionOption
                                selected={decision === "approve"}
                                onClick={() => setDecision("approve")}
                                icon={<CheckCircle2 size={16} className={decision === "approve" ? "text-[#00E5A0]" : "text-[#8899AA]"} aria-hidden="true" />}
                                title="Approve"
                                desc="All details verified. Amount accepted as declared."
                                bgClass="hover:bg-[#00E5A0]/5"
                                borderClass={decision === "approve" ? "border-[#00E5A0]" : "border-[#1A2A3A]"}
                            />

                            <DecisionOption
                                selected={decision === "partial"}
                                onClick={() => setDecision("partial")}
                                icon={<Check size={16} className={decision === "partial" ? "text-[#FFB800]" : "text-[#8899AA]"} aria-hidden="true" />}
                                title="Approve with Reduced Amount"
                                desc="Accept partial amount if proof shows less than declared."
                                bgClass="hover:bg-[#FFB800]/5"
                                borderClass={decision === "partial" ? "border-[#FFB800]" : "border-[#1A2A3A]"}
                            />

                            {decision === "partial" && (
                                <div className="ml-8 mt-2 p-3 bg-[#060B14] border border-[#2A3A4A] rounded-lg">
                                    <label htmlFor="approved-amount" className="text-xs text-[#8899AA] block mb-1">
                                        Approved Amount
                                    </label>
                                    <div className="relative w-48">
                                        <span className="absolute left-3 top-2 text-[#8899AA] font-bold">₹</span>
                                        <input
                                            id="approved-amount"
                                            type="number"
                                            defaultValue={80000}
                                            className="w-full bg-[#1A2A3A] text-white text-sm font-bold px-3 py-2 pl-7 rounded focus:outline-none focus:border-[#FFB800] border border-transparent"
                                        />
                                    </div>
                                </div>
                            )}

                            <DecisionOption
                                selected={decision === "request_more"}
                                onClick={() => setDecision("request_more")}
                                icon={<MessageSquare size={16} className={decision === "request_more" ? "text-[#0066FF]" : "text-[#8899AA]"} aria-hidden="true" />}
                                title="Request Additional Proof"
                                desc="Need more documents to verify this declaration."
                                bgClass="hover:bg-[#0066FF]/5"
                                borderClass={decision === "request_more" ? "border-[#0066FF]" : "border-[#1A2A3A]"}
                            />

                            <DecisionOption
                                selected={decision === "reject"}
                                onClick={() => setDecision("reject")}
                                icon={<X size={16} className={decision === "reject" ? "text-red-400" : "text-[#8899AA]"} aria-hidden="true" />}
                                title="Reject"
                                desc="Proof does not meet requirements."
                                bgClass="hover:bg-red-400/5"
                                borderClass={decision === "reject" ? "border-red-400" : "border-[#1A2A3A]"}
                            />

                            {decision === "reject" && (
                                <div className="ml-8 mt-4 pt-4 border-t border-[#1A2A3A] space-y-4">
                                    <div>
                                        <label htmlFor="reject-reason" className="text-xs text-[#8899AA] font-bold block mb-1.5 uppercase">
                                            Rejection Reason
                                        </label>
                                        <select
                                            id="reject-reason"
                                            className="w-full bg-[#060B14] border border-[#2A3A4A] text-white text-sm rounded-lg p-2.5 outline-none focus:border-red-400"
                                            value={rejectReason}
                                            onChange={handleRejectReasonChange}
                                        >
                                            <option value="">Select a reason...</option>
                                            <option value="amount_mismatch">Amount mismatch</option>
                                            <option value="wrong_fy">Wrong financial year</option>
                                            <option value="unreadable">Document unreadable or blurry</option>
                                            <option value="invalid_doc">Not an acceptable proof type</option>
                                        </select>
                                    </div>

                                    {rejectReason && (
                                        <div className="bg-[#1A2A3A]/40 border border-[#2A3A4A] rounded-lg p-4 relative">
                                            <div className="absolute -top-3 left-4 bg-[#0D1928] px-2 text-[10px] font-bold text-[#00E5A0] uppercase tracking-wider flex items-center gap-1">
                                                <ShieldCheck size={12} aria-hidden="true" /> Smart Rejection Note
                                            </div>

                                            <div className="flex justify-end space-x-1 mb-2">
                                                <button
                                                    type="button"
                                                    onClick={() => handleLangToggle("en")}
                                                    className={`text-[10px] px-2 py-0.5 rounded font-bold transition-colors ${
                                                        msgLang === "en" ? "bg-red-400 text-white" : "bg-[#1A2A3A] text-[#8899AA]"
                                                    }`}
                                                >
                                                    English
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => handleLangToggle("hi")}
                                                    className={`text-[10px] px-2 py-0.5 rounded font-bold transition-colors ${
                                                        msgLang === "hi" ? "bg-red-400 text-white" : "bg-[#1A2A3A] text-[#8899AA]"
                                                    }`}
                                                >
                                                    Hindi
                                                </button>
                                            </div>

                                            <textarea
                                                aria-label="Rejection message"
                                                className="w-full bg-transparent text-sm text-[#c8d8e8] resize-none focus:outline-none min-h-[120px] font-mono leading-relaxed"
                                                value={autoMessage}
                                                onChange={(e) => setAutoMessage(e.target.value)}
                                            />

                                            <div className="flex justify-between items-center mt-3 pt-3 border-t border-[#2A3A4A]">
                                                <div className="text-xs text-[#8899AA]">
                                                    Resubmission window: <strong className="text-white">5 days</strong>
                                                </div>
                                                <div className="flex space-x-2">
                                                    <button type="button" className="text-[#8899AA] hover:text-white transition-colors" aria-label="Copy message">
                                                        <Copy size={14} aria-hidden="true" />
                                                    </button>
                                                    <button type="button" className="text-[#8899AA] hover:text-[#00E5A0] transition-colors" aria-label="Send via WhatsApp">
                                                        <Send size={14} aria-hidden="true" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </Card>

                    <div className="flex space-x-4">
                        <Button variant="secondary" className="flex-1">Save for Later</Button>
                        <Button
                            disabled={!decision || (decision === "reject" && !rejectReason)}
                            className="flex-1"
                        >
                            Submit Decision
                        </Button>
                    </div>
                </div>
            </div>
        </Page>
    );
}
