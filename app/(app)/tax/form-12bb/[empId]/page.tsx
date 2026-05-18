"use client";

import React from "react";
import { Download, Printer, Share2, FileSignature, CheckCircle2 } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function Form12BBDeclaration() {
    return (
        <Page
            title="Form 12BB"
            subtitle="Rahul Kumar Sharma — FY 2024-25"
            breadcrumbs={[
                { label: "Tax", href: "/tax/declaration/EMP-0848" },
                { label: "Form 12BB" },
            ]}
            maxWidth="900px"
            actions={
                <>
                    <Button variant="secondary" icon={<Printer size={14} />}>Print</Button>
                    <Button variant="secondary" icon={<Share2 size={14} />}>Share</Button>
                    <Button icon={<Download size={14} />}>PDF</Button>
                </>
            }
        >
            <div className="space-y-6">
                {/* Simulated Paper A4 */}
                <Card padding="none" className="overflow-hidden">
                    <div className="bg-white text-black p-12 font-sans">
                        <div className="text-center mb-8">
                            <h2 className="text-xl font-bold mb-1">FORM NO. 12BB</h2>
                            <div className="text-sm">(See rule 26C)</div>
                            <div className="text-sm font-semibold mt-3">
                                Statement showing particulars of claims by an employee for deduction of tax under section 192
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm mb-8">
                            <div className="flex flex-col gap-1 border-b border-slate-200 pb-2">
                                <span className="font-semibold">1. Name and address of the employee:</span>
                            </div>
                            <div>
                                <div className="font-bold">Rahul Kumar Sharma</div>
                                <div>A-204, Green Valley Apts, Kothrud, Pune 411038</div>
                            </div>
                            <div className="flex flex-col gap-1 border-b border-slate-200 pb-2">
                                <span className="font-semibold">2. Permanent Account Number of the employee:</span>
                            </div>
                            <div className="font-bold">ABCDE1234F</div>
                            <div className="flex flex-col gap-1 border-b border-slate-200 pb-2">
                                <span className="font-semibold">3. Financial year:</span>
                            </div>
                            <div className="font-bold">2024-2025</div>
                        </div>

                        <table className="w-full border-collapse border border-black text-sm">
                            <thead>
                                <tr>
                                    <th className="border border-black p-2 text-left w-10">Sl. No.</th>
                                    <th className="border border-black p-2 text-left">Nature of claim</th>
                                    <th className="border border-black p-2 text-right w-28">Amount (Rs.)</th>
                                    <th className="border border-black p-2 text-left">Evidence / particulars</th>
                                </tr>
                                <tr className="text-xs italic bg-slate-50">
                                    <td className="border border-black p-1 text-center">(1)</td>
                                    <td className="border border-black p-1 text-center">(2)</td>
                                    <td className="border border-black p-1 text-center">(3)</td>
                                    <td className="border border-black p-1 text-center">(4)</td>
                                </tr>
                            </thead>
                            <tbody>
                                {/* HRA */}
                                <tr>
                                    <td className="border border-black p-2 align-top">(1)</td>
                                    <td className="border border-black p-2 align-top">
                                        <div className="font-semibold mb-2">House Rent Allowance</div>
                                        <div>(i) Rent paid to the landlord</div>
                                        <div>(ii) Name of the landlord</div>
                                        <div>(iii) Address of the landlord</div>
                                        <div>(iv) Permanent Account Number of the landlord</div>
                                    </td>
                                    <td className="border border-black p-2 align-top text-right">
                                        <br />3,00,000
                                    </td>
                                    <td className="border border-black p-2 align-top">
                                        <br />
                                        <div className="border-b border-dotted border-black pb-1 mb-1">Mr. Vivek Deshmukh</div>
                                        <div className="border-b border-dotted border-black pb-1 mb-1">B-10, Vasant Vihar, Pune</div>
                                        <div className="border-b border-dotted border-black pb-1 mb-1">XYZA9876Q</div>
                                        Rent Receipts Attached
                                    </td>
                                </tr>

                                {/* LTA */}
                                <tr>
                                    <td className="border border-black p-2 align-top">(2)</td>
                                    <td className="border border-black p-2 align-top">
                                        <div className="font-semibold">Leave travel concessions or assistance</div>
                                    </td>
                                    <td className="border border-black p-2 align-top text-right">NIL</td>
                                    <td className="border border-black p-2 align-top">—</td>
                                </tr>

                                {/* Home Loan */}
                                <tr>
                                    <td className="border border-black p-2 align-top">(3)</td>
                                    <td className="border border-black p-2 align-top">
                                        <div className="font-semibold mb-2">Deduction of interest on borrowing</div>
                                        <div>(i) Interest payable/paid to the lender</div>
                                        <div>(ii) Name of the lender</div>
                                        <div>(iii) Address of the lender</div>
                                        <div>(iv) Permanent Account Number of the lender</div>
                                    </td>
                                    <td className="border border-black p-2 align-top text-right">NIL</td>
                                    <td className="border border-black p-2 align-top">—</td>
                                </tr>

                                {/* Chapter VI-A */}
                                <tr>
                                    <td className="border border-black p-2 align-top">(4)</td>
                                    <td className="border border-black p-2 align-top">
                                        <div className="font-semibold mb-2">Chapter VI-A Deductions</div>
                                        <div className="font-semibold">(A) Section 80C, 80CCC and 80CCD</div>
                                        <div className="pl-4">- Public Provident Fund (PPF)</div>
                                        <div className="pl-4">- Life Insurance Premium</div>
                                        <div className="pl-4">- ELSS Mutual Funds</div>
                                        <div className="font-semibold mt-2">(B) Other sections under Chapter VI-A</div>
                                        <div className="pl-4">- Section 80D (Health Insurance)</div>
                                    </td>
                                    <td className="border border-black p-2 align-top text-right">
                                        <br />
                                        <br />
                                        50,000
                                        <br />
                                        30,000
                                        <br />
                                        40,000
                                        <br />
                                        <br />
                                        18,000
                                    </td>
                                    <td className="border border-black p-2 align-top">
                                        <br />
                                        <br />
                                        Receipt Attached
                                        <br />
                                        Policy Document
                                        <br />
                                        Account Statement
                                        <br />
                                        <br />
                                        Policy &amp; Premium Receipt
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <div className="mt-12 mb-6 text-center font-bold text-lg">Verification</div>
                        <div className="text-sm leading-relaxed text-justify">
                            I, <strong>Rahul Kumar Sharma</strong>, son/daughter of <strong>Suresh Sharma</strong> do hereby certify
                            that the information given above is complete and correct.
                        </div>

                        <div className="flex justify-between mt-12">
                            <div>
                                <div className="mb-2">
                                    Place: <strong>Pune</strong>
                                </div>
                                <div>
                                    Date: <strong>{new Date().toLocaleDateString("en-IN")}</strong>
                                </div>
                            </div>
                            <div className="text-center w-64">
                                <div className="h-16 border-b border-black relative flex items-center justify-center">
                                    <div className="flex items-center gap-2 text-[#00E5A0]">
                                        <FileSignature size={32} aria-hidden="true" />
                                        <span className="text-xs font-bold border border-[#00E5A0] px-2 py-0.5 rounded -rotate-6">
                                            Digitally Signed
                                        </span>
                                    </div>
                                </div>
                                <div className="mt-2">(Signature of employee)</div>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Action Bar */}
                <div className="flex justify-end gap-4">
                    <Button variant="secondary" icon={<CheckCircle2 size={16} />}>
                        Mark as Verified by HR
                    </Button>
                    <Button>Send to Employee for e-Sign</Button>
                </div>
            </div>
        </Page>
    );
}
