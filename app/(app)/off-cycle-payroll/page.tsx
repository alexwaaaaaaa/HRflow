"use client";

import Page from "@/components/ui/Page";

import React, { useState } from "react";
import { Calculator, Calendar, Plus, Info } from "lucide-react";

export default function OffCyclePayrollPage() {
    const [selectedEmployees, _setSelectedEmployees] = useState([
        { id: 'EMP347', name: 'Ravi Chandran', type: 'Joining Bonus', amount: '₹50,000', tds: '₹10,000', net: '₹40,000', notes: 'As per offer' },
        { id: 'EMP348', name: 'Anitha Kumar', type: 'Relocation', amount: '₹30,000', tds: '₹0', net: '₹30,000', notes: 'Tax exempt (sec 17)' }
    ]);

    return (
        <Page
            title="Off-Cycle Payroll"
            subtitle="Process special payments outside regular payroll cycle"
            breadcrumbs={[{ label: "Off Cycle Payroll" }]}
            maxWidth="1400px"
        >

        <div className="min-h-screen bg-[#060B14] text-white p-6 font-sans">
            <div className="max-w-7xl mx-auto space-y-6">

                {/* Page Header */}
                <div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Off-Cycle Payroll</h2>
                    <p className="text-gray-400 text-sm mt-1">Process special payments outside regular payroll cycle</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                    <div className="lg:col-span-8 flex flex-col gap-6">
                        {/* Payment Config Card */}
                        <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl p-6 space-y-5">
                            <h3 className="text-lg font-semibold text-white mb-4">Payment Configuration</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Payment Type</label>
                                    <select className="w-full bg-[#060B14] border border-[#1A2A3A] text-white rounded-lg px-4 py-2.5 outline-none focus:border-[#00E5A0]">
                                        <option>Joining Bonus</option>
                                        <option>Relocation</option>
                                        <option>Spot Award</option>
                                        <option>Advance Recovery</option>
                                        <option>FnF Supplement</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Payment Date</label>
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
                                        <input type="date" defaultValue="2025-03-20" className="w-full bg-[#060B14] border border-[#1A2A3A] text-white rounded-lg pl-10 pr-4 py-2.5 outline-none focus:border-[#00E5A0] [color-scheme:dark]" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Payment Month (for TDS)</label>
                                    <select className="w-full bg-[#060B14] border border-[#1A2A3A] text-white rounded-lg px-4 py-2.5 outline-none focus:border-[#00E5A0]">
                                        <option>March 2025</option>
                                        <option>April 2025</option>
                                    </select>
                                </div>
                            </div>

                            <div className="pt-2">
                                <label className="block text-sm font-medium text-gray-400 mb-3">Tax Treatment</label>
                                <div className="flex items-center gap-6">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="radio" name="tax" defaultChecked className="text-[#00E5A0] bg-[#060B14] border-[#1A2A3A] focus:ring-[#00E5A0]" />
                                        <span className="text-sm">Fully Taxable</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="radio" name="tax" className="text-[#00E5A0] bg-[#060B14] border-[#1A2A3A] focus:ring-[#00E5A0]" />
                                        <span className="text-sm">Partially Taxable</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="radio" name="tax" className="text-[#00E5A0] bg-[#060B14] border-[#1A2A3A] focus:ring-[#00E5A0]" />
                                        <span className="text-sm">Exempt</span>
                                    </label>
                                </div>
                            </div>

                            <div className="pt-2">
                                <label className="block text-sm font-medium text-gray-400 mb-2">TDS Processing</label>
                                <select className="w-full md:w-1/3 bg-[#060B14] border border-[#1A2A3A] text-white rounded-lg px-4 py-2.5 outline-none focus:border-[#00E5A0]">
                                    <option>20% (based on annual rate)</option>
                                    <option>Custom Override</option>
                                </select>
                            </div>
                        </div>

                        {/* Employee Selection Table */}
                        <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl overflow-hidden">
                            <div className="p-5 border-b border-[#1A2A3A] flex justify-between items-center bg-[#060B14]">
                                <h3 className="text-lg font-semibold text-white">Employee Breakdown</h3>
                                <span className="text-sm text-gray-400 bg-[#1A2A3A] px-3 py-1 rounded-full">{selectedEmployees.length} Selected</span>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm whitespace-nowrap">
                                    <thead className="bg-[#0A1420] text-gray-400 border-b border-[#1A2A3A]">
                                        <tr>
                                            <th className="px-4 py-3 text-center w-12"><input type="checkbox" defaultChecked className="rounded border-[#1A2A3A] bg-[#060B14] text-[#00E5A0]" /></th>
                                            <th className="px-4 py-3 font-medium">Name</th>
                                            <th className="px-4 py-3 font-medium">EMP ID</th>
                                            <th className="px-4 py-3 font-medium">Payment Type</th>
                                            <th className="px-4 py-3 font-medium">Amount</th>
                                            <th className="px-4 py-3 font-medium">TDS</th>
                                            <th className="px-4 py-3 font-medium">Net Payout</th>
                                            <th className="px-4 py-3 font-medium">Notes</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#1A2A3A]">
                                        {selectedEmployees.map((emp, idx) => (
                                            <tr key={idx} className={idx === 0 ? "bg-[#00E5A0]/5" : "hover:bg-[#1A2A3A]/30"}>
                                                <td className="px-4 py-3 text-center"><input type="checkbox" defaultChecked className="rounded border-[#1A2A3A] bg-[#060B14] text-[#00E5A0]" /></td>
                                                <td className="px-4 py-3 font-medium">{emp.name}</td>
                                                <td className="px-4 py-3 text-gray-400">{emp.id}</td>
                                                <td className="px-4 py-3 text-gray-300">{emp.type}</td>
                                                <td className="px-4 py-3 font-medium">{emp.amount}</td>
                                                <td className="px-4 py-3 text-[#FF4444]">{emp.tds}</td>
                                                <td className="px-4 py-3 font-bold text-[#00E5A0]">{emp.net}</td>
                                                <td className="px-4 py-3 text-gray-400">{emp.notes}</td>
                                            </tr>
                                        ))}
                                        <tr className="hover:bg-[#1A2A3A]/30 transition-colors cursor-pointer group border-t border-dashed border-[#1A2A3A]">
                                            <td className="px-4 py-4 text-center"></td>
                                            <td colSpan={7} className="px-4 py-4 text-[#00E5A0] font-medium group-hover:text-[#00E5A0]/80">
                                                <span className="flex items-center gap-2"><Plus className="w-4 h-4" /> Add Employee</span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <button className="w-full sm:w-auto self-end bg-[#00E5A0] hover:bg-[#00E5A0]/90 text-black px-6 py-3 rounded-lg font-bold transition-colors shadow-lg shadow-[#00E5A0]/20 text-sm">
                            Process Off-Cycle Payment
                        </button>
                    </div>

                    {/* Right Panel - Tax Impact Estimator */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl p-6 sticky top-6">
                            <div className="flex items-center gap-3 border-b border-[#1A2A3A] pb-4 mb-4">
                                <div className="p-2.5 bg-[#0066FF]/10 rounded-lg">
                                    <Calculator className="w-5 h-5 text-[#0066FF]" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white">Tax Impact Estimator</h3>
                                    <p className="text-xs text-gray-400">For Ravi Chandran (Selected)</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-400">Annual Income (without bonus)</span>
                                    <span className="font-medium">₹9,00,000</span>
                                </div>

                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-400">With ₹50,000 bonus</span>
                                    <span className="font-semibold text-white">₹9,50,000</span>
                                </div>

                                <div className="h-px bg-[#1A2A3A] my-2"></div>

                                <div className="flex justify-between items-center text-sm text-[#FF4444]">
                                    <span>Calculated TDS for this bonus</span>
                                    <span className="font-medium mt-1">₹10,000</span>
                                </div>

                                <div className="bg-[#060B14] border border-[#1A2A3A] rounded-lg p-4 mt-6">
                                    <div className="flex gap-3">
                                        <Info className="w-5 h-5 text-[#00E5A0] shrink-0" />
                                        <div className="space-y-1">
                                            <p className="text-sm font-medium text-[#00E5A0]">No tax slab change</p>
                                            <p className="text-xs text-gray-400 leading-relaxed">Employee remains in the 20% tax bracket. No further TDS adjustment is needed for the rest of the financial year.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    
        </Page>
    );
}
