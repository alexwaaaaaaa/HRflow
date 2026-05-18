"use client";
import React from "react";
import { ServerCrash, AlertTriangle, FileWarning, CheckCircle2, ChevronRight, Download } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function ValidationReportScreen() {
    return (
        <Page
            title="Pre-Import Validation Check"
            subtitle="We scanned 1,248 records against Kaarya's strict payroll and compliance rules. Please resolve these issues before completing the import."
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Onboarding", href: "/onboarding/dashboard" },
                { label: "Validation Report", href: "/onboarding/import/validation" },
            ]}
            actions={
                <>
                    <Button variant="secondary" icon={<Download size={16} aria-hidden="true" />}>
                        Export Error log
                    </Button>
                    <Button href="/onboarding/import/progress" variant="danger">
                        Import Valid Records Only <ChevronRight size={16} aria-hidden="true" />
                    </Button>
                </>
            }
        >
            <div className="space-y-8">
                {/* Scorecard */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-[#060D1A] border border-emerald-500/30 rounded-xl p-5 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/10 blur-xl rounded-full" />
                        <CheckCircle2 className="text-emerald-500 mb-2" size={24} aria-hidden="true" />
                        <div className="text-3xl font-black text-white mb-1">1,210</div>
                        <div className="text-xs text-[#8899AA] font-bold uppercase tracking-wider">Ready to Import</div>
                    </div>
                    <div className="bg-[#060D1A] border border-rose-500/30 rounded-xl p-5 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-rose-500/10 blur-xl rounded-full" />
                        <ServerCrash className="text-rose-500 mb-2" size={24} aria-hidden="true" />
                        <div className="text-3xl font-black text-white mb-1">14</div>
                        <div className="text-xs text-[#8899AA] font-bold uppercase tracking-wider">Critical Errors</div>
                    </div>
                    <div className="bg-[#060D1A] border border-amber-500/30 rounded-xl p-5 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-amber-500/10 blur-xl rounded-full" />
                        <AlertTriangle className="text-amber-500 mb-2" size={24} aria-hidden="true" />
                        <div className="text-3xl font-black text-white mb-1">24</div>
                        <div className="text-xs text-[#8899AA] font-bold uppercase tracking-wider">Warnings</div>
                    </div>
                    <Card className="flex flex-col justify-center">
                        <div className="text-sm text-white font-bold mb-2">Quality Score</div>
                        <div className="flex items-center gap-3">
                            <div
                                className="flex-1 h-3 bg-[#131B2B] rounded-full overflow-hidden"
                                role="progressbar"
                                aria-valuenow={96}
                                aria-valuemin={0}
                                aria-valuemax={100}
                                aria-label="Data quality score: 96%"
                            >
                                <div className="h-full bg-emerald-500 w-[96%]" />
                            </div>
                            <span className="text-emerald-400 font-black">96%</span>
                        </div>
                    </Card>
                </div>

                {/* Error List */}
                <Card padding="none" className="overflow-hidden">
                    <div className="p-4 border-b border-[#1A2A3A] bg-[#060D1A] flex items-center gap-6">
                        <button
                            type="button"
                            className="text-sm font-bold text-white border-b-2 border-rose-500 pb-1 -mb-4"
                            aria-current="true"
                        >
                            Critical Errors (14)
                        </button>
                        <button
                            type="button"
                            className="text-sm font-bold text-[#556677] hover:text-[#8899AA] transition-colors"
                        >
                            Warnings (24)
                        </button>
                    </div>

                    <div className="divide-y divide-[#1A2A3A]">
                        {/* Error Item 1 */}
                        <div className="p-6 bg-rose-500/5 hover:bg-rose-500/10 transition-colors">
                            <div className="flex items-start gap-4">
                                <div className="mt-1 bg-rose-500/20 p-2 rounded-lg text-rose-400 shrink-0">
                                    <FileWarning size={20} aria-hidden="true" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-white font-bold text-base mb-1">Missing IFCS Codes for Salary Accounts</h4>
                                    <p className="text-sm text-[#8899AA] mb-4">
                                        8 employees have a Bank Account Number but no IFSC Code. Production payroll will fail for these users.
                                    </p>

                                    <div className="bg-[#060D1A] border border-[#1A2A3A] rounded-lg overflow-hidden">
                                        <table className="w-full text-left text-sm">
                                            <thead className="bg-[#131B2B] text-xs uppercase tracking-wider text-[#556677]">
                                                <tr>
                                                    <th scope="col" className="px-4 py-2 font-medium w-32">Row #</th>
                                                    <th scope="col" className="px-4 py-2 font-medium">Employee Name</th>
                                                    <th scope="col" className="px-4 py-2 font-medium">Bank Name</th>
                                                    <th scope="col" className="px-4 py-2 font-medium">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-[#1A2A3A] text-[#CCDDEE]">
                                                <tr>
                                                    <td className="px-4 py-3 font-mono text-[#8899AA]">Row 42</td>
                                                    <td className="px-4 py-3 font-medium text-white">Aditi Verma</td>
                                                    <td className="px-4 py-3">HDFC Bank</td>
                                                    <td className="px-4 py-3">
                                                        <label htmlFor="ifsc-row42" className="sr-only">Enter IFSC for Aditi Verma</label>
                                                        <input
                                                            id="ifsc-row42"
                                                            type="text"
                                                            placeholder="Enter IFSC"
                                                            className="bg-[#0A1420] border border-rose-500/50 rounded px-2 py-1 text-xs text-white max-w-[120px] outline-none focus:border-rose-400"
                                                        />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="px-4 py-3 font-mono text-[#8899AA]">Row 108</td>
                                                    <td className="px-4 py-3 font-medium text-white">Suresh Menon</td>
                                                    <td className="px-4 py-3">ICICI Bank</td>
                                                    <td className="px-4 py-3">
                                                        <label htmlFor="ifsc-row108" className="sr-only">Enter IFSC for Suresh Menon</label>
                                                        <input
                                                            id="ifsc-row108"
                                                            type="text"
                                                            placeholder="Enter IFSC"
                                                            className="bg-[#0A1420] border border-rose-500/50 rounded px-2 py-1 text-xs text-white max-w-[120px] outline-none focus:border-rose-400"
                                                        />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colSpan={4} className="px-4 py-2 text-center text-xs text-indigo-400 hover:text-indigo-300 font-bold cursor-pointer">
                                                        View 6 more...
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Error Item 2 */}
                        <div className="p-6 bg-rose-500/5 hover:bg-rose-500/10 transition-colors">
                            <div className="flex items-start gap-4">
                                <div className="mt-1 bg-rose-500/20 p-2 rounded-lg text-rose-400 shrink-0">
                                    <AlertTriangle size={20} aria-hidden="true" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-white font-bold text-base mb-1">Invalid PAN Format</h4>
                                    <p className="text-sm text-[#8899AA] mb-4">
                                        6 employees have PAN numbers that do not match the required Indian format (5 letters, 4 numbers, 1 letter).
                                    </p>
                                    <Button variant="secondary">Edit in Bulk Editor</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        </Page>
    );
}
