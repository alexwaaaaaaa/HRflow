"use client";

import Link from "next/link";
import { ArrowLeft, Download, Mail, Printer } from "lucide-react";
import Page from "@/components/ui/Page";
import Button from "@/components/ui/Button";

export default function IndividualPayslipView() {
    return (
        <Page
            title="Payslip — November 2024"
            subtitle="Rahul Sharma · EMP-001"
            breadcrumbs={[
                { label: "Payroll", href: "/payroll" },
                { label: "Payslips", href: "/payroll/payslips/bulk" },
                { label: "EMP-001" },
            ]}
            maxWidth="1000px"
            actions={
                <>
                    <Button variant="secondary" icon={<Mail size={16} aria-hidden="true" />}>
                        Send Email
                    </Button>
                    <Button variant="secondary" icon={<Printer size={16} aria-hidden="true" />}>
                        Print
                    </Button>
                    <Button icon={<Download size={16} aria-hidden="true" />}>
                        Download PDF
                    </Button>
                </>
            }
        >
            {/* Back link */}
            <div className="mb-4">
                <Link
                    href="/payroll/payslips/bulk"
                    className="inline-flex items-center gap-1.5 text-sm text-[#8899AA] transition-colors hover:text-white"
                >
                    <ArrowLeft size={14} aria-hidden="true" /> Back to Payslips list
                </Link>
            </div>

            {/* Simulated Payslip Document */}
            <div
                className="rounded-lg bg-white p-12 shadow-[0_4px_24px_rgba(0,0,0,0.2)]"
                style={{ color: "#111827", fontFamily: "Arial, sans-serif", minHeight: 1000 }}
            >
                {/* Payslip Header */}
                <div className="mb-8 flex items-start justify-between border-b-2 border-gray-200 pb-6">
                    <div>
                        <div className="mb-2 text-2xl font-extrabold tracking-tight text-blue-600">
                            HRFLOW PRIVATE LIMITED
                        </div>
                        <div className="text-xs leading-relaxed text-gray-500">
                            12th Floor, Tech Park, Outer Ring Road<br />
                            Bengaluru, Karnataka 560103<br />
                            contact@hrflow.com
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="mb-1 text-3xl font-bold uppercase text-gray-900">Payslip</div>
                        <div className="text-base font-semibold text-gray-600">For the month of November 2024</div>
                    </div>
                </div>

                {/* Employee Info Grid */}
                <div className="mb-8 grid grid-cols-2 gap-8">
                    <table className="w-full text-xs">
                        <tbody>
                            <tr><td className="w-36 py-1 text-gray-500">Employee Name:</td><td className="py-1 font-semibold">Rahul Sharma</td></tr>
                            <tr><td className="py-1 text-gray-500">Employee ID:</td><td className="py-1 font-semibold">EMP-001</td></tr>
                            <tr><td className="py-1 text-gray-500">Designation:</td><td className="py-1 font-semibold">Frontend Developer</td></tr>
                            <tr><td className="py-1 text-gray-500">Department:</td><td className="py-1 font-semibold">Engineering</td></tr>
                            <tr><td className="py-1 text-gray-500">Date of Joining:</td><td className="py-1 font-semibold">15 May 2022</td></tr>
                        </tbody>
                    </table>
                    <table className="w-full text-xs">
                        <tbody>
                            <tr><td className="w-36 py-1 text-gray-500">Bank Name:</td><td className="py-1 font-semibold">HDFC Bank</td></tr>
                            <tr><td className="py-1 text-gray-500">Bank Account No:</td><td className="py-1 font-semibold">XXXXX4821</td></tr>
                            <tr><td className="py-1 text-gray-500">PAN Number:</td><td className="py-1 font-semibold">ABCDE1234F</td></tr>
                            <tr><td className="py-1 text-gray-500">UAN Number:</td><td className="py-1 font-semibold">101012345678</td></tr>
                            <tr><td className="py-1 text-gray-500">PF Account:</td><td className="py-1 font-semibold">MH/BAN/12345/000</td></tr>
                        </tbody>
                    </table>
                </div>

                {/* Attendance Summary */}
                <div className="mb-8 flex justify-between rounded-lg bg-gray-100 p-4">
                    <div className="flex-1 text-center">
                        <div className="mb-1 text-xs text-gray-500">Total Days</div>
                        <div className="text-sm font-bold">30</div>
                    </div>
                    <div className="w-px bg-gray-300" />
                    <div className="flex-1 text-center">
                        <div className="mb-1 text-xs text-gray-500">Paid Days</div>
                        <div className="text-sm font-bold">30</div>
                    </div>
                    <div className="w-px bg-gray-300" />
                    <div className="flex-1 text-center">
                        <div className="mb-1 text-xs text-gray-500">LOP Days</div>
                        <div className="text-sm font-bold">0</div>
                    </div>
                    <div className="w-px bg-gray-300" />
                    <div className="flex-1 text-center">
                        <div className="mb-1 text-xs text-gray-500">Leave Taken</div>
                        <div className="text-sm font-bold">1</div>
                    </div>
                </div>

                {/* Earnings & Deductions Tables */}
                <div className="mb-8 grid grid-cols-2 gap-8">
                    {/* Earnings */}
                    <div>
                        <div className="rounded-t bg-gray-200 px-3 py-2 text-sm font-bold">Earnings</div>
                        <table className="w-full border-collapse text-xs">
                            <tbody>
                                <tr className="border-b border-gray-100"><td className="p-3">Basic Salary</td><td className="p-3 text-right">₹ 40,000</td></tr>
                                <tr className="border-b border-gray-100"><td className="p-3">House Rent Allowance</td><td className="p-3 text-right">₹ 20,000</td></tr>
                                <tr className="border-b border-gray-100"><td className="p-3">Special Allowance</td><td className="p-3 text-right">₹ 32,100</td></tr>
                                <tr className="border-b border-gray-100"><td className="p-3">Leave Travel Allowance</td><td className="p-3 text-right">₹ 4,000</td></tr>
                                <tr className="border-b border-gray-100"><td className="p-3">Performance Bonus</td><td className="p-3 text-right">₹ 0</td></tr>
                            </tbody>
                            <tfoot>
                                <tr className="border-t-2 border-gray-200 font-bold">
                                    <td className="p-3">Total Earnings (A)</td>
                                    <td className="p-3 text-right">₹ 96,100</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>

                    {/* Deductions */}
                    <div>
                        <div className="rounded-t bg-gray-200 px-3 py-2 text-sm font-bold">Deductions</div>
                        <table className="w-full border-collapse text-xs">
                            <tbody>
                                <tr className="border-b border-gray-100"><td className="p-3">Provident Fund (EPF)</td><td className="p-3 text-right">₹ 1,800</td></tr>
                                <tr className="border-b border-gray-100"><td className="p-3">Professional Tax</td><td className="p-3 text-right">₹ 200</td></tr>
                                <tr className="border-b border-gray-100"><td className="p-3">Income Tax (TDS)</td><td className="p-3 text-right">₹ 8,600</td></tr>
                                <tr className="border-b border-gray-100"><td className="p-3">Labour Welfare Fund</td><td className="p-3 text-right">₹ 0</td></tr>
                                <tr className="border-b border-gray-100"><td className="p-3 text-white">.</td><td className="p-3 text-right" /></tr>
                            </tbody>
                            <tfoot>
                                <tr className="border-t-2 border-gray-200 font-bold">
                                    <td className="p-3">Total Deductions (B)</td>
                                    <td className="p-3 text-right">₹ 10,600</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>

                {/* Net Pay */}
                <div className="mb-8 flex items-center justify-between rounded-lg border border-green-200 bg-green-50 p-6">
                    <div>
                        <div className="mb-1 text-base font-bold text-green-800">Net Pay (A - B)</div>
                        <div className="text-xs capitalize text-green-700">
                            Eighty-five thousand five hundred rupees only
                        </div>
                    </div>
                    <div className="text-3xl font-extrabold text-green-800">₹ 85,500</div>
                </div>

                {/* Footer Notes */}
                <div className="mt-12 border-t border-gray-200 pt-4 text-center text-xs text-gray-400">
                    This is a computer generated document and does not require a signature.<br />
                    For any payroll discrepancies, please raise a ticket via HRFlow Helpdesk within 7 days.
                </div>
            </div>
        </Page>
    );
}
