"use client";

import { useState } from "react";
import { Shield, AlertTriangle, Heart, FileText, Users } from "lucide-react";
import Input from "@/components/ui/Input";
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

export default function StatutorySetupPage() {
    const [pfEnabled, setPfEnabled] = useState(true);
    const [esiEnabled, setEsiEnabled] = useState(true);
    const [ptEnabled, setPtEnabled] = useState(true);
    const [lwfEnabled, setLwfEnabled] = useState(false);
    const [pfInCtc, setPfInCtc] = useState(true);
    const [esiInCtc, setEsiInCtc] = useState(true);
    const [ptDeduct, setPtDeduct] = useState(true);

    return (
        <div className="px-16 py-12 max-w-[880px] animate-fade-in">
            <h2 className="text-2xl font-semibold text-white m-0">Statutory Compliance Setup</h2>
            <p className="text-sm text-[#8899AA] mt-1">Configure PF, ESI, Professional Tax and other statutory requirements.</p>

            {/* Warning Banner */}
            <div className="flex items-start gap-3 mt-8 mb-8 rounded-xl p-4 bg-[rgba(255,184,0,0.1)] border border-[rgba(255,184,0,0.3)]">
                <AlertTriangle size={20} color="#FFB800" className="flex-shrink-0 mt-0.5" aria-hidden="true" />
                <div className="text-sm text-white leading-relaxed">
                    Incorrect statutory configuration can result in penalties. Verify all details with your CA.
                </div>
            </div>

            {/* Section 1 - PF */}
            <Card
                variant="default"
                padding="md"
                className="mb-4 transition-opacity duration-200"
                style={{ opacity: pfEnabled ? 1 : 0.6 }}
            >
                <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                        <Shield size={22} color={pfEnabled ? "#00E5A0" : "#445566"} aria-hidden="true" />
                        <h3 className="text-lg text-white m-0">Provident Fund (PF)</h3>
                    </div>
                    <Toggle checked={pfEnabled} onChange={setPfEnabled} label="Toggle Provident Fund" />
                </div>

                <div className="grid grid-cols-2 gap-6" style={{ pointerEvents: pfEnabled ? "auto" : "none" }}>
                    <Input label="PF Registration Number *" placeholder="MH/MUM/0123456/000/0001234" />
                    <div>
                        <label htmlFor="pf-reg-date" className="block text-xs font-medium text-[#9ca3af] mb-1.5">PF Registration Date</label>
                        <input id="pf-reg-date" type="date" className="w-full h-10 px-3 rounded-lg text-sm bg-[#060B14] border border-[#1A2A3A] text-white outline-none focus:border-[#00E5A0] transition-colors" />
                    </div>
                    <div>
                        <label htmlFor="pf-emp-rate" className="block text-xs font-medium text-[#9ca3af] mb-1.5">PF Contribution Rate (Employee)</label>
                        <input id="pf-emp-rate" value="12%" readOnly className="w-full h-10 px-3 rounded-lg text-sm bg-[#060B14] border border-[#1A2A3A] text-[#8899AA] outline-none" />
                    </div>
                    <Input label="PF Contribution Rate (Employer)" defaultValue="12%" />

                    <div className="col-span-2">
                        <div className="flex items-center justify-between p-3 rounded-lg border border-[#1A2A3A] bg-[#0A1420] mt-2 mb-2">
                            <div>
                                <div className="text-[13px] text-white font-medium">PF Wage Limit</div>
                                <div className="text-xs text-[#8899AA]">Apply PF on actual salary or cap at statutory limit</div>
                            </div>
                            <label htmlFor="pf-wage-limit" className="sr-only">PF Wage Limit</label>
                            <select id="pf-wage-limit" className="h-8 px-2 rounded-md text-xs bg-[#060B14] border border-[#1A2A3A] text-white outline-none">
                                <option>Cap at ₹15,000</option>
                                <option>Apply on actual salary</option>
                            </select>
                        </div>

                        <div className="flex items-center justify-between p-3 rounded-lg border border-[#1A2A3A] bg-[#0A1420] mb-4">
                            <span className="text-[13px] text-white font-medium">Include PF in CTC?</span>
                            <Toggle checked={pfInCtc} onChange={setPfInCtc} label="Toggle include PF in CTC" />
                        </div>

                        <div className="flex gap-4 mb-2">
                            <div className="flex-1 p-2 rounded bg-black/20 border border-[#1A2A3A] text-xs text-[#8899AA] text-center">Admin Charges (0.5%)</div>
                            <div className="flex-1 p-2 rounded bg-black/20 border border-[#1A2A3A] text-xs text-[#8899AA] text-center">EDLI Charges (0.5%)</div>
                        </div>

                        <div className="rounded-md overflow-hidden flex h-6 mt-4" role="img" aria-label="PF contribution breakdown: Employee 12%, EPF 8.33%, EPS 3.67%">
                            <div className="bg-[#00E5A0] h-full flex items-center justify-center text-[10px] text-black font-semibold" style={{ width: "50%" }}>Employee: 12%</div>
                            <div className="bg-[#0066FF] h-full flex items-center justify-center text-[10px] text-white font-semibold" style={{ width: "34.7%" }}>EPF 8.33%</div>
                            <div className="bg-[#FFB800] h-full flex items-center justify-center text-[10px] text-black font-semibold" style={{ width: "15.3%" }}>EPS 3.67%</div>
                        </div>
                    </div>
                </div>
            </Card>

            {/* Section 2 - ESI */}
            <Card
                variant="default"
                padding="md"
                className="mb-4 transition-opacity duration-200"
                style={{ opacity: esiEnabled ? 1 : 0.6 }}
            >
                <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                        <Heart size={22} color={esiEnabled ? "#FF4444" : "#445566"} aria-hidden="true" />
                        <h3 className="text-lg text-white m-0">ESI (ESIC)</h3>
                    </div>
                    <Toggle checked={esiEnabled} onChange={setEsiEnabled} label="Toggle ESI" />
                </div>
                <div className="grid grid-cols-2 gap-6" style={{ pointerEvents: esiEnabled ? "auto" : "none" }}>
                    <Input label="ESIC Employer Code *" placeholder="31-12345-101" />
                    <div>
                        <label htmlFor="esi-reg-date" className="block text-xs font-medium text-[#9ca3af] mb-1.5">ESIC Registration Date</label>
                        <input id="esi-reg-date" type="date" className="w-full h-10 px-3 rounded-lg text-sm bg-[#060B14] border border-[#1A2A3A] text-white outline-none focus:border-[#00E5A0] transition-colors" />
                    </div>

                    <div className="col-span-2 grid grid-cols-3 gap-4">
                        <div>
                            <p className="text-xs text-[#8899AA]">ESI Wage Ceiling</p>
                            <p className="text-sm text-white mt-1">₹21,000/month</p>
                        </div>
                        <div>
                            <p className="text-xs text-[#8899AA]">Employee Contribution</p>
                            <p className="text-sm text-white mt-1">0.75%</p>
                        </div>
                        <div>
                            <p className="text-xs text-[#8899AA]">Employer Contribution</p>
                            <p className="text-sm text-white mt-1">3.25%</p>
                        </div>
                    </div>

                    <div className="col-span-2 flex items-center justify-between p-3 rounded-lg border border-[#1A2A3A] bg-[#0A1420]">
                        <span className="text-[13px] text-white font-medium">Include ESI in CTC?</span>
                        <Toggle checked={esiInCtc} onChange={setEsiInCtc} label="Toggle include ESI in CTC" />
                    </div>

                    <div className="col-span-2 text-xs text-[#8899AA]">Employees earning above ₹21,000/month are exempt from ESI.</div>
                </div>
            </Card>

            {/* Section 3 - PT */}
            <Card
                variant="default"
                padding="md"
                className="mb-4 transition-opacity duration-200"
                style={{ opacity: ptEnabled ? 1 : 0.6 }}
            >
                <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                        <FileText size={22} color={ptEnabled ? "#0066FF" : "#445566"} aria-hidden="true" />
                        <h3 className="text-lg text-white m-0">Professional Tax (PT)</h3>
                    </div>
                    <Toggle checked={ptEnabled} onChange={setPtEnabled} label="Toggle Professional Tax" />
                </div>
                <div className="flex flex-col gap-5" style={{ pointerEvents: ptEnabled ? "auto" : "none" }}>
                    <div>
                        <label htmlFor="pt-state" className="block text-xs font-medium text-[#9ca3af] mb-1.5">State *</label>
                        <input id="pt-state" value="Maharashtra" readOnly className="w-1/2 h-10 px-3 rounded-lg text-sm bg-[#060B14] border border-[#1A2A3A] text-white outline-none" />
                    </div>

                    <div className="rounded-lg border border-[#1A2A3A] overflow-hidden bg-[#0A1420]">
                        <div className="grid grid-cols-2 px-4 py-2 border-b border-[#1A2A3A] text-xs text-[#8899AA] uppercase">
                            <div>Monthly Salary Range</div><div>PT Amount</div>
                        </div>
                        <div className="text-sm text-white">
                            <div className="grid grid-cols-2 px-4 py-3 border-b border-[#1A2A3A]"><div>Up to ₹7,500</div><div>₹0</div></div>
                            <div className="grid grid-cols-2 px-4 py-3 border-b border-[#1A2A3A]"><div>₹7,501 – ₹10,000</div><div>₹175</div></div>
                            <div className="grid grid-cols-2 px-4 py-3"><div>₹10,001 and above</div><div>₹200 (₹300 in February)</div></div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="text-[13px] text-white">Deduct PT from salary?</span>
                        <Toggle checked={ptDeduct} onChange={setPtDeduct} label="Toggle deduct PT from salary" />
                    </div>
                    <a href="#" className="text-sm text-[#0066FF] hover:underline self-start">Add state-wise PT for other states</a>
                </div>
            </Card>

            {/* Section 4 - LWF */}
            <Card
                variant="default"
                padding="md"
                className="transition-opacity duration-200"
                style={{ opacity: lwfEnabled ? 1 : 0.6 }}
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Users size={22} color={lwfEnabled ? "#8899AA" : "#445566"} aria-hidden="true" />
                        <h3 className="text-lg text-white m-0">Labour Welfare Fund (LWF)</h3>
                    </div>
                    <Toggle checked={lwfEnabled} onChange={setLwfEnabled} label="Toggle Labour Welfare Fund" />
                </div>
            </Card>
        </div>
    );
}
