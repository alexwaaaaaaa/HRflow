"use client";

import { Calculator, Save, AlertTriangle, RefreshCw, HandCoins } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

// migrated: immersive-ui

export default function ArrearsComputationSettings() {
    return (
        <Page
            title="Arrears Computation Settings"
            subtitle="Configure how backdated salary revisions and LOP reversals are calculated."
            breadcrumbs={[
                { label: "Payroll", href: "/payroll/dashboard" },
                { label: "Settings", href: "/payroll-settings" },
                { label: "Arrears Logic" },
            ]}
            maxWidth="800px"
            actions={
                <Button icon={<Save size={14} aria-hidden="true" />}>Save Logic</Button>
            }
        >
            <div className="space-y-6">
                {/* Backdated CTC Increments */}
                <Card padding="lg">
                    <div className="flex items-center gap-3 mb-4">
                        <HandCoins size={18} className="text-[#00E5A0]" aria-hidden="true" />
                        <h2 className="text-base font-semibold text-white">Backdated CTC Increments</h2>
                    </div>

                    <fieldset className="space-y-4">
                        <legend className="sr-only">Backdated CTC increment calculation method</legend>
                        <label className="flex items-start gap-3 p-4 bg-[#00E5A0]/5 border border-[#00E5A0] rounded-xl cursor-pointer">
                            <input type="radio" name="ctc_arrear" defaultChecked className="mt-1 accent-[#00E5A0]" />
                            <div>
                                <div className="text-sm font-semibold text-white mb-1">Component-wise Difference Projection</div>
                                <div className="text-xs text-[#8899AA] leading-relaxed">Calculate the exact difference between Old CTC and New CTC for each individual component (Basic, HRA, etc.) for the elapsed months.</div>
                            </div>
                        </label>
                        <label className="flex items-start gap-3 p-4 bg-[#060B14] border border-[#1A2A3A] rounded-xl cursor-pointer">
                            <input type="radio" name="ctc_arrear" className="mt-1 accent-[#00E5A0]" />
                            <div>
                                <div className="text-sm font-semibold text-white mb-1">Lump Sum Special Arrear Element</div>
                                <div className="text-xs text-[#8899AA] leading-relaxed">Post the total difference amount as a single taxable line item called &quot;Income Arrears&quot; without distributing into components.</div>
                            </div>
                        </label>
                    </fieldset>

                    <div className="mt-5 pt-5 border-t border-[#1A2A3A]">
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" defaultChecked className="accent-[#00E5A0] w-4 h-4" />
                            <span className="text-sm text-white font-medium">Recalculate PT &amp; PF on backdated arrears</span>
                        </label>
                    </div>
                </Card>

                {/* Tax Treatment */}
                <Card padding="lg">
                    <div className="flex items-center gap-3 mb-4">
                        <Calculator size={18} className="text-[#0066FF]" aria-hidden="true" />
                        <h2 className="text-base font-semibold text-white">Tax (Section 89) Treatment</h2>
                    </div>

                    <div className="flex items-start gap-3 mb-5">
                        <AlertTriangle size={16} className="text-[#FFB800] shrink-0 mt-0.5" aria-hidden="true" />
                        <p className="text-xs text-[#8899AA] leading-relaxed">
                            Arrears spanning across different financial years require Section 89(1) tax relief calculation. How should the system handle cross-financial year arrears?
                        </p>
                    </div>

                    <label htmlFor="sec89-treatment" className="sr-only">Section 89 treatment for cross-FY arrears</label>
                    <select
                        id="sec89-treatment"
                        className="w-full h-10 bg-[#060B14] border border-[#1A2A3A] rounded-lg px-3 text-white text-sm outline-none focus:border-[#00E5A0]"
                    >
                        <option>Deduct TDS strictly in current year (Let employee claim Sec 89)</option>
                        <option>Auto-compute Sec 89(1) relief and adjust current TDS</option>
                        <option>Require Manual Intervention for cross-FY arrears</option>
                    </select>
                </Card>

                {/* Automation Rules */}
                <Card padding="lg">
                    <div className="flex items-center gap-3 mb-4">
                        <RefreshCw size={18} className="text-[#FFB800]" aria-hidden="true" />
                        <h2 className="text-base font-semibold text-white">System Automation</h2>
                    </div>

                    <div className="space-y-4">
                        <label className="flex items-start gap-3 cursor-pointer">
                            <input type="checkbox" defaultChecked className="accent-[#00E5A0] mt-1 w-4 h-4" />
                            <div>
                                <div className="text-sm font-medium text-white mb-1">Auto-process pending arrears in standard payroll run</div>
                                <div className="text-xs text-[#8899AA]">If disabled, arrears must be processed in an off-cycle run.</div>
                            </div>
                        </label>
                        <label className="flex items-start gap-3 cursor-pointer">
                            <input type="checkbox" defaultChecked className="accent-[#00E5A0] mt-1 w-4 h-4" />
                            <div>
                                <div className="text-sm font-medium text-white mb-1">Auto-generate arrears on retroactive LOP deletion</div>
                                <div className="text-xs text-[#8899AA]">Generate standard &quot;LOP Reversal&quot; positive adjustment automatically when admin deletes historical attendance markings.</div>
                            </div>
                        </label>
                    </div>
                </Card>
            </div>
        </Page>
    );
}
