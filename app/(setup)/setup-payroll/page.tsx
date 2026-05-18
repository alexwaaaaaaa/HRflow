"use client";

import { useState } from "react";
import { Calendar } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

interface ToggleProps {
    checked: boolean;
    onChange: (c: boolean) => void;
    label: string;
}

function Toggle({ checked, onChange, label }: ToggleProps) {
    return (
        <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onChange(!checked)}
            className="relative w-11 h-6 p-0 border-0 rounded-full transition-colors flex-shrink-0"
            style={{ background: checked ? "#00E5A0" : "#1A2A3A" }}
            aria-pressed={checked}
            aria-label={label}
        >
            <span
                className="absolute top-[3px] w-[18px] h-[18px] rounded-full bg-white transition-all duration-200"
                style={{ left: checked ? 23 : 3 }}
            />
        </Button>
    );
}

export default function PayrollSettingsPage() {
    const [startMonth, setStartMonth] = useState("April");
    const [overtime, setOvertime] = useState(false);
    const [autoArrears, setAutoArrears] = useState(true);
    const [arrearsInMonth, setArrearsInMonth] = useState(true);

    const MONTHS = ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"];

    return (
        <div className="px-16 py-12 max-w-[840px] animate-fade-in">
            <h2 className="text-2xl font-semibold text-white m-0">Fiscal Year &amp; Payroll Settings</h2>
            <p className="text-sm text-[#8899AA] mt-1">These settings affect all salary calculations and compliance filings.</p>

            {/* Section 1 */}
            <Card variant="default" padding="md" className="mt-8 mb-4">
                <div className="flex items-center gap-3 mb-6">
                    <Calendar size={20} color="#00E5A0" aria-hidden="true" />
                    <h3 className="text-lg text-white m-0">Financial / Fiscal Year</h3>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-6">
                    <div>
                        <label htmlFor="fiscal-start" className="block text-xs font-medium text-[#9ca3af] mb-1.5">Fiscal Year Start *</label>
                        <select
                            id="fiscal-start"
                            value={startMonth}
                            onChange={(e) => setStartMonth(e.target.value)}
                            className="w-full h-10 px-3 rounded-lg text-sm bg-[#060B14] border border-[#1A2A3A] text-white outline-none focus:border-[#00E5A0] transition-colors"
                        >
                            <option>April</option>
                            <option>January</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="fiscal-end" className="block text-xs font-medium text-[#9ca3af] mb-1.5">Fiscal Year End</label>
                        <input
                            id="fiscal-end"
                            value={startMonth === "April" ? "March" : "December"}
                            readOnly
                            className="w-full h-10 px-3 rounded-lg text-sm bg-[#060B14] border border-[#1A2A3A] text-[#8899AA] outline-none"
                        />
                    </div>
                </div>

                <div className="flex gap-1 mb-6" role="img" aria-label="Fiscal year month visualization">
                    {(startMonth === "April" ? MONTHS : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]).map((m, i) => (
                        <div
                            key={m}
                            className="flex-1 text-center py-1.5 rounded text-xs font-semibold"
                            style={{
                                background: i < 9 && startMonth === "April" ? "rgba(0,229,160,0.15)" : "#1A2A3A",
                                color: i < 9 && startMonth === "April" ? "#00E5A0" : "#8899AA",
                            }}
                        >
                            {m}
                        </div>
                    ))}
                </div>

                <div className="inline-block px-3 py-1.5 rounded-full text-xs font-medium bg-[#1A2A3A] text-white">
                    Tax Year: FY 2024-25 (AY 2025-26)
                </div>
            </Card>

            {/* Section 2 */}
            <Card variant="default" padding="md" className="mb-4">
                <h3 className="text-base font-semibold text-white m-0 mb-4">Payroll Cycle</h3>
                <div className="flex flex-col gap-5">
                    <fieldset>
                        <legend className="block text-xs font-medium text-[#9ca3af] mb-2">Payroll Frequency *</legend>
                        <div className="flex gap-6">
                            <label className="flex items-center gap-2 text-sm text-white cursor-pointer">
                                <input type="radio" name="freq" defaultChecked className="accent-[#00E5A0]" /> Monthly
                            </label>
                            <label className="flex items-center gap-2 text-sm text-white cursor-pointer">
                                <input type="radio" name="freq" className="accent-[#00E5A0]" /> Semi-monthly
                            </label>
                            <label className="flex items-center gap-2 text-sm text-white cursor-pointer">
                                <input type="radio" name="freq" className="accent-[#00E5A0]" /> Bi-weekly
                            </label>
                        </div>
                    </fieldset>

                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label htmlFor="month-cutoff" className="block text-xs font-medium text-[#8899AA] mb-1.5">Month-end Cut-off</label>
                            <select id="month-cutoff" className="w-full h-10 px-3 rounded-lg text-sm bg-[#060B14] border border-[#1A2A3A] text-white outline-none focus:border-[#00E5A0] transition-colors">
                                <option>Last working day</option>
                                <option>25th</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="attendance-cutoff" className="block text-xs font-medium text-[#8899AA] mb-1.5">Attendance Cut-off</label>
                            <select id="attendance-cutoff" className="w-full h-10 px-3 rounded-lg text-sm bg-[#060B14] border border-[#1A2A3A] text-white outline-none focus:border-[#00E5A0] transition-colors">
                                <option>Last working day</option>
                                <option>25th</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="payroll-processing" className="block text-xs font-medium text-[#8899AA] mb-1.5">Payroll Processing</label>
                            <select id="payroll-processing" className="w-full h-10 px-3 rounded-lg text-sm bg-[#060B14] border border-[#1A2A3A] text-white outline-none focus:border-[#00E5A0] transition-colors">
                                <option>Last day of month</option>
                            </select>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Section 3 */}
            <Card variant="default" padding="md" className="mb-4">
                <h3 className="text-base font-semibold text-white m-0 mb-4">Salary Configuration</h3>
                <div className="flex flex-col gap-5">
                    <fieldset>
                        <legend className="block text-xs font-medium text-[#9ca3af] mb-2">Salary Calculation Basis *</legend>
                        <div className="flex flex-col gap-3">
                            <label className="flex items-center gap-2 text-sm text-white cursor-pointer">
                                <input type="radio" name="calc" defaultChecked className="accent-[#00E5A0]" /> Per calendar day (actual days in month)
                            </label>
                            <label className="flex items-center gap-2 text-sm text-white cursor-pointer">
                                <input type="radio" name="calc" className="accent-[#00E5A0]" /> Per working day (26 days fixed)
                            </label>
                            <label className="flex items-center gap-2 text-sm text-white cursor-pointer">
                                <input type="radio" name="calc" className="accent-[#00E5A0]" /> Per working day (30 days fixed)
                            </label>
                        </div>
                    </fieldset>

                    <div className="grid grid-cols-2 gap-4">
                        <fieldset>
                            <legend className="block text-xs font-medium text-[#9ca3af] mb-2">Working Days per Week *</legend>
                            <div className="flex gap-4">
                                <label className="flex items-center gap-2 text-sm text-white cursor-pointer">
                                    <input type="radio" name="week" defaultChecked className="accent-[#00E5A0]" /> 5 days
                                </label>
                                <label className="flex items-center gap-2 text-sm text-white cursor-pointer">
                                    <input type="radio" name="week" className="accent-[#00E5A0]" /> 5.5 days
                                </label>
                                <label className="flex items-center gap-2 text-sm text-white cursor-pointer">
                                    <input type="radio" name="week" className="accent-[#00E5A0]" /> 6 days
                                </label>
                            </div>
                        </fieldset>
                        <fieldset>
                            <legend className="block text-xs font-medium text-[#9ca3af] mb-2">Week-off Days *</legend>
                            <div className="flex gap-4">
                                <label className="flex items-center gap-2 text-sm text-white cursor-pointer">
                                    <input type="checkbox" defaultChecked className="accent-[#00E5A0]" /> Saturday
                                </label>
                                <label className="flex items-center gap-2 text-sm text-white cursor-pointer">
                                    <input type="checkbox" defaultChecked className="accent-[#00E5A0]" /> Sunday
                                </label>
                            </div>
                        </fieldset>
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-lg bg-[#060B14] border border-[#1A2A3A]">
                        <div className="text-sm font-medium text-white">Overtime Calculation</div>
                        <Toggle checked={overtime} onChange={setOvertime} label="Toggle overtime calculation" />
                    </div>
                </div>
            </Card>

            <div className="grid grid-cols-2 gap-4">
                {/* Section 4 */}
                <Card variant="default" padding="md">
                    <h3 className="text-base font-semibold text-white m-0 mb-4">Rounding Rules</h3>
                    <div className="flex flex-col gap-4">
                        <div>
                            <label htmlFor="salary-rounding" className="block text-xs text-[#8899AA] mb-1.5">Salary Rounding</label>
                            <select id="salary-rounding" className="w-full h-9 px-3 rounded-lg text-sm bg-[#060B14] border border-[#1A2A3A] text-white outline-none focus:border-[#00E5A0] transition-colors">
                                <option>Round to nearest ₹1</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="tds-rounding" className="block text-xs text-[#8899AA] mb-1.5">TDS Rounding</label>
                            <select id="tds-rounding" className="w-full h-9 px-3 rounded-lg text-sm bg-[#060B14] border border-[#1A2A3A] text-white outline-none focus:border-[#00E5A0] transition-colors">
                                <option>Round up to ₹1</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="pf-rounding" className="block text-xs text-[#8899AA] mb-1.5">PF Rounding</label>
                            <select id="pf-rounding" className="w-full h-9 px-3 rounded-lg text-sm bg-[#060B14] border border-[#1A2A3A] text-white outline-none focus:border-[#00E5A0] transition-colors">
                                <option>Round up</option>
                            </select>
                        </div>
                    </div>
                </Card>

                {/* Section 5 */}
                <Card variant="default" padding="md">
                    <h3 className="text-base font-semibold text-white m-0 mb-4">Arrears &amp; FnF</h3>
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-white">Auto-calculate salary arrears?</span>
                            <Toggle checked={autoArrears} onChange={setAutoArrears} label="Toggle auto-calculate arrears" />
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-white">Include arrears in same month?</span>
                            <Toggle checked={arrearsInMonth} onChange={setArrearsInMonth} label="Toggle include arrears in same month" />
                        </div>
                        <div>
                            <label htmlFor="fnf-days" className="block text-xs text-[#8899AA] mb-1.5">FnF settlement processing days</label>
                            <input id="fnf-days" value="30 days" readOnly className="w-full h-9 px-3 rounded-lg text-sm bg-[#060B14] border border-[#1A2A3A] text-white outline-none" />
                        </div>
                        <div>
                            <label htmlFor="notice-period" className="block text-xs text-[#8899AA] mb-1.5">Notice Period (Default)</label>
                            <input id="notice-period" value="30 days" readOnly className="w-full h-9 px-3 rounded-lg text-sm bg-[#060B14] border border-[#1A2A3A] text-white outline-none" />
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}
