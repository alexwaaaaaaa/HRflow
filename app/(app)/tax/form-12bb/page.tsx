"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    FileText,
    Download,
    Send,
    CheckCircle2,
    AlertCircle,
    XCircle,
    Clock,
    ChevronRight,
    Printer,
    Edit2,
} from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

// ── Sub-components (module-scope) ─────────────────────────────────────────────
function EditButton({ href }: { href: string }) {
    return (
        <Link
            href={href}
            className="bg-[#0A1420] text-[#c8d8e8] p-1.5 rounded-md hover:bg-[#0066FF] hover:text-white transition-colors shadow shadow-black border border-white/10"
            title="Edit Declaration"
        >
            <Edit2 className="w-3.5 h-3.5" aria-hidden="true" />
        </Link>
    );
}

export default function Form12BBPage() {
    const [signature, setSignature] = useState("");

    return (
        <Page
            title="Form 12BB — Investment Declaration"
            subtitle="Statement of particulars to be furnished by the employee (Rule 26C)"
            breadcrumbs={[
                { label: "Tax", href: "/tax/dashboard" },
                { label: "Form 12BB" },
            ]}
            maxWidth="1400px"
            actions={
                <>
                    <Badge variant="info">FY 2024-25</Badge>
                    <Button variant="secondary" icon={<Download className="w-4 h-4" />}>
                        Blank Form
                    </Button>
                </>
            }
        >
            <div className="flex flex-col xl:flex-row gap-6">
                {/* Left Panel - Form 12BB Document */}
                <div className="flex-1 max-w-[800px] bg-white text-slate-900 rounded-xl overflow-hidden shadow-2xl relative">
                    {/* Internal Form Header */}
                    <div className="p-10 pb-6 border-b border-slate-300">
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold tracking-widest text-black mb-2">FORM NO. 12BB</h2>
                            <p className="text-sm font-medium text-slate-700 uppercase">[See rule 26C]</p>
                            <h3 className="text-lg font-bold text-black mt-4 uppercase">
                                STATEMENT SHOWING PARTICULARS OF CLAIMS BY AN EMPLOYEE FOR DEDUCTION OF TAX UNDER SECTION 192
                            </h3>
                        </div>

                        <div className="bg-slate-50 border border-slate-200 p-6 text-sm grid grid-cols-2 gap-y-4 gap-x-8 mb-6">
                            <div>
                                <span className="block text-slate-500 text-xs uppercase tracking-wider mb-1">
                                    1. Name and address of the employee
                                </span>
                                <span className="font-bold text-black">Arjun Mehta</span>
                                <br />
                                <span className="text-slate-700">Flat 401, Ozone Residenza, Haralur Road, Bangalore, 560102</span>
                            </div>
                            <div>
                                <span className="block text-slate-500 text-xs uppercase tracking-wider mb-1">
                                    2. Permanent Account Number of the employee
                                </span>
                                <span className="font-bold text-black font-mono tracking-widest">AAAPZ****A</span>
                            </div>
                            <div>
                                <span className="block text-slate-500 text-xs uppercase tracking-wider mb-1">3. Financial Year</span>
                                <span className="font-bold text-black">2024-2025</span>
                            </div>
                            <div>
                                <span className="block text-slate-500 text-xs uppercase tracking-wider mb-1">
                                    4. Name and address of the employer
                                </span>
                                <span className="font-bold text-black">HRFlow Technologies Pvt. Ltd.</span>
                                <br />
                                <span className="text-slate-700">100 Feet Road, Indiranagar, Bangalore</span>
                            </div>
                        </div>

                        <p className="font-medium text-sm text-slate-800">
                            I, <span className="font-bold border-b border-black px-4">Arjun Mehta</span>, do hereby declare the
                            following particulars for the year ending 31st March,{" "}
                            <span className="font-bold">2025</span>:
                        </p>
                    </div>

                    <div className="p-10 pt-6">
                        <table className="w-full text-sm border-collapse border border-slate-300 mb-8">
                            <thead>
                                <tr className="bg-slate-100 uppercase text-xs font-bold text-slate-800">
                                    <th className="border border-slate-300 p-3 text-left w-12 text-center">Sl. No.</th>
                                    <th className="border border-slate-300 p-3 text-left">Nature of Claim</th>
                                    <th className="border border-slate-300 p-3 text-right w-32">Amount (Rs.)</th>
                                    <th className="border border-slate-300 p-3 text-left w-64">Evidence/Particulars</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* HRA */}
                                <tr className="group hover:bg-slate-50 transition-colors">
                                    <td className="border border-slate-300 p-3 text-center align-top relative">
                                        1.
                                        <div className="absolute top-3 -left-10 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <EditButton href="/tax/declarations" />
                                        </div>
                                    </td>
                                    <td className="border border-slate-300 p-3 align-top font-bold">
                                        House Rent Allowance:
                                        <div className="font-normal text-slate-600 mt-2 pl-4 text-xs italic">
                                            <p>(i) Rent paid to landlord</p>
                                            <p>(ii) Name of landlord: Ramesh Iyer</p>
                                            <p>(iii) Address: 42, Indiranagar, Bangalore - 38</p>
                                            <p>(iv) PAN of landlord: ABCPI1234D</p>
                                        </div>
                                    </td>
                                    <td className="border border-slate-300 p-3 text-right font-mono font-medium align-top">2,16,000</td>
                                    <td className="border border-slate-300 p-3 align-top text-xs text-slate-600">
                                        Rent Agreement Attached
                                        <br />
                                        PAN Attached
                                    </td>
                                </tr>

                                {/* LTA */}
                                <tr className="group hover:bg-slate-50 transition-colors">
                                    <td className="border border-slate-300 p-3 text-center align-top relative">
                                        2.
                                        <div className="absolute top-3 -left-10 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <EditButton href="/tax/declarations" />
                                        </div>
                                    </td>
                                    <td className="border border-slate-300 p-3 align-top font-bold">
                                        Leave Travel Concessions or Assistance
                                        <div className="font-normal text-slate-600 mt-2 pl-4 text-xs italic">
                                            <p>(i) Air/Rail fare for family</p>
                                        </div>
                                    </td>
                                    <td className="border border-slate-300 p-3 text-right font-mono font-medium align-top">50,000</td>
                                    <td className="border border-slate-300 p-3 align-top text-xs text-slate-600">
                                        Block 2022-25
                                        <br />
                                        Air Tickets Attached
                                    </td>
                                </tr>

                                {/* Home Loan */}
                                <tr className="group hover:bg-slate-50 transition-colors">
                                    <td className="border border-slate-300 p-3 text-center align-top relative">
                                        3.
                                        <div className="absolute top-3 -left-10 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <EditButton href="/tax/declarations" />
                                        </div>
                                    </td>
                                    <td className="border border-slate-300 p-3 align-top font-bold">
                                        Deduction of interest on borrowing (Sec 24)
                                        <div className="font-normal text-slate-600 mt-2 pl-4 text-xs italic">
                                            <p>(i) Interest payable/paid</p>
                                            <p>(ii) Name of lender: -</p>
                                            <p>(iii) Address: -</p>
                                            <p>(iv) PAN of lender: -</p>
                                        </div>
                                    </td>
                                    <td className="border border-slate-300 p-3 text-right font-mono font-medium align-top">Nil</td>
                                    <td className="border border-slate-300 p-3 align-top text-xs text-slate-600">-</td>
                                </tr>

                                {/* Chapter VI-A */}
                                <tr>
                                    <td className="border border-slate-300 p-3 text-center align-top">4.</td>
                                    <td className="border border-slate-300 p-3 align-top font-bold" colSpan={3}>
                                        Deduction under Chapter VI-A
                                    </td>
                                </tr>
                                <tr className="group hover:bg-slate-50 transition-colors text-xs">
                                    <td className="border border-slate-300 p-3 text-center border-t-0" />
                                    <td className="border border-slate-300 p-3 align-top pl-8 relative">
                                        <div className="absolute top-2 -left-6 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <EditButton href="/tax/declarations" />
                                        </div>
                                        <span className="font-semibold">(A) Section 80C, 80CCC and 80CCD</span>
                                        <ul className="list-disc pl-5 mt-1 text-slate-600 italic">
                                            <li>EPF (Auto)</li>
                                            <li>Public Provident Fund</li>
                                            <li>Mutual Fund (ELSS)</li>
                                        </ul>
                                    </td>
                                    <td className="border border-slate-300 p-3 text-right font-mono align-bottom">
                                        <br />
                                        21,600
                                        <br />
                                        50,000
                                        <br />
                                        38,400
                                    </td>
                                    <td className="border border-slate-300 p-3 align-bottom text-slate-600">
                                        <br />
                                        Employer Info
                                        <br />
                                        SBI Statement
                                        <br />
                                        Axis Statement
                                    </td>
                                </tr>
                                <tr className="group hover:bg-slate-50 transition-colors text-xs">
                                    <td className="border border-slate-300 p-3 text-center border-t-0" />
                                    <td className="border border-slate-300 p-3 align-top pl-8 relative">
                                        <div className="absolute top-2 -left-6 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <EditButton href="/tax/declarations" />
                                        </div>
                                        <span className="font-semibold">(B) Other sections (e.g. 80D, 80E, 80G)</span>
                                        <ul className="list-disc pl-5 mt-1 text-slate-600 italic">
                                            <li>80D - Health Insurance (Self)</li>
                                            <li>80D - Health Insurance (Parents)</li>
                                        </ul>
                                    </td>
                                    <td className="border border-slate-300 p-3 text-right font-mono align-bottom">
                                        <br />
                                        15,000
                                        <br />
                                        12,000
                                    </td>
                                    <td className="border border-slate-300 p-3 align-bottom text-slate-600">
                                        <br />
                                        Star Health Policy
                                        <br />
                                        HDFC Ergo Policy
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        {/* Signature Block */}
                        <div className="mt-12 bg-slate-50 p-6 border border-slate-200 rounded text-sm relative">
                            <h4 className="font-bold text-lg mb-4 text-center">VERIFICATION</h4>
                            <p className="text-justify leading-relaxed text-slate-800">
                                I, <strong>Arjun Mehta</strong>, son/daughter of{" "}
                                <span className="border-b border-black w-32 inline-block" /> do hereby certify that the information
                                given above is complete and correct.
                            </p>

                            <div className="flex justify-between mt-12 items-end">
                                <div>
                                    <p className="mb-2">
                                        Place: <strong>Bangalore</strong>
                                    </p>
                                    <p>
                                        Date: <strong>15/01/2025</strong>
                                    </p>
                                </div>
                                <div className="text-center">
                                    {signature ? (
                                        <div className="h-16 w-48 mb-2 flex items-center justify-center border-b border-black text-2xl font-serif text-blue-900">
                                            {signature}
                                        </div>
                                    ) : (
                                        <button
                                            type="button"
                                            className="h-16 w-48 mb-2 border border-dashed border-slate-300 bg-white flex flex-col items-center justify-center text-xs text-slate-400 rounded cursor-pointer hover:border-[#0066FF] hover:bg-blue-50 transition-colors"
                                            onClick={() => setSignature("A. Mehta")}
                                        >
                                            <span>Click to sign</span>
                                        </button>
                                    )}
                                    <p className="font-bold">(Signature of the employee)</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Rail */}
                <div className="w-full xl:w-[424px] space-y-6">
                    {/* Status Card */}
                    <Card padding="lg">
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <FileText className="w-5 h-5 text-[#0066FF]" aria-hidden="true" /> Form 12BB Status
                        </h3>

                        <div className="bg-[#0A1420] rounded-lg p-4 mb-5 border border-white/5">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-[#445566] text-sm">Current Status</span>
                                <Badge variant="warning">Draft</Badge>
                            </div>
                            <p className="text-xs text-[#445566]">Last saved: 15/01/2025 at 4:30 PM</p>
                        </div>

                        <div className="mb-6">
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-[#c8d8e8]">Completeness</span>
                                <span className="font-bold text-white">87%</span>
                            </div>
                            <div
                                className="h-2 bg-[#0A1420] rounded-full overflow-hidden"
                                role="progressbar"
                                aria-valuenow={87}
                                aria-valuemin={0}
                                aria-valuemax={100}
                                aria-label="Form completeness"
                            >
                                <div className="h-full bg-[#00E5A0] rounded-full w-[87%]" />
                            </div>
                            <p className="text-xs text-[#00E5A0] mt-2 flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3" aria-hidden="true" /> 6 of 7 sections complete
                            </p>
                            {!signature && (
                                <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                                    <AlertCircle className="w-3 h-3" aria-hidden="true" /> Signature required before submission
                                </p>
                            )}
                        </div>

                        <div className="grid gap-3">
                            <Button variant="secondary" className="w-full" icon={<Printer className="w-4 h-4" />}>
                                Preview Form
                            </Button>
                            <div className="flex gap-3">
                                <Button variant="outline" className="flex-1">Save Draft</Button>
                                <Button
                                    disabled={!signature}
                                    className="flex-1"
                                    icon={<Send className="w-4 h-4" />}
                                >
                                    Submit Form
                                </Button>
                            </div>
                        </div>
                    </Card>

                    {/* Proof Status */}
                    <Card padding="lg">
                        <h3 className="text-base font-bold text-white mb-4">Proof Status Overview</h3>
                        <div className="space-y-3">
                            {[
                                { label: "80C Investments", status: "warning", text: "3/4 Uploaded", Icon: AlertCircle },
                                { label: "80D Health", status: "success", text: "2/2 Uploaded", Icon: CheckCircle2 },
                                { label: "HRA Exemption", status: "success", text: "2/2 Uploaded", Icon: CheckCircle2 },
                                { label: "Section 10(5) LTA", status: "danger", text: "0/1 Pending", Icon: XCircle },
                            ].map((item) => (
                                <div
                                    key={item.label}
                                    className="flex items-center justify-between p-3 rounded-lg bg-[#0A1420] border border-white/5"
                                >
                                    <span className="text-sm font-medium text-[#c8d8e8]">{item.label}</span>
                                    <Badge variant={item.status as "warning" | "success" | "danger"}>
                                        <item.Icon className="w-3 h-3 mr-1 inline" aria-hidden="true" />
                                        {item.text}
                                    </Badge>
                                </div>
                            ))}
                        </div>
                        <Button variant="ghost" className="w-full mt-5 text-sm font-medium text-[#0066FF]" iconRight={<ChevronRight className="w-4 h-4" />}>
                            Upload Missing Proofs
                        </Button>
                    </Card>

                    {/* History */}
                    <Card padding="lg">
                        <h3 className="text-base font-bold text-white mb-4">Submission History</h3>
                        <div className="relative border-l border-white/10 ml-3 pl-5 space-y-6">
                            {[
                                { fy: "FY 2023-24", date: "Submitted 20/01/2024" },
                                { fy: "FY 2022-23", date: "Submitted 18/01/2023" },
                            ].map((item) => (
                                <div key={item.fy} className="relative">
                                    <div className="absolute -left-[25px] top-1 w-2.5 h-2.5 rounded-full bg-[#00E5A0] ring-4 ring-[#1A2A3A]" aria-hidden="true" />
                                    <h4 className="text-sm font-bold text-[#c8d8e8]">{item.fy}</h4>
                                    <p className="text-xs text-[#445566] mt-1 flex items-center gap-1">
                                        <Clock className="w-3 h-3" aria-hidden="true" /> {item.date}
                                    </p>
                                    <div className="mt-2 text-xs text-[#00E5A0] font-medium flex items-center gap-1">
                                        <span className="bg-[#00E5A0]/10 px-2 py-1 rounded">✅ Accepted by HR</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        </Page>
    );
}
