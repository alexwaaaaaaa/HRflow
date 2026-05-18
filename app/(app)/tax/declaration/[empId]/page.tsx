"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, Download } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { ChartWrapper } from "@/components/ui/ChartMountGate";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const PROJECTED_TDS = [
    { month: "Apr", val: 1811 }, { month: "May", val: 1811 }, { month: "Jun", val: 1811 },
    { month: "Jul", val: 1811 }, { month: "Aug", val: 1811 }, { month: "Sep", val: 1811 },
    { month: "Oct", val: 1811 }, { month: "Nov", val: 1811 }, { month: "Dec", val: 1812 },
    { month: "Jan", val: 1812 }, { month: "Feb", val: 1812 }, { month: "Mar", val: 1812 },
];

// ── Sub-components (module-scope) ─────────────────────────────────────────────
function DeclarationCard({ title, subtitle, href, linkText, status, statusVariant, hint }: {
    title: string;
    subtitle: string;
    href: string;
    linkText: string;
    status?: string;
    statusVariant?: "success" | "warning";
    hint?: string;
}) {
    return (
        <Card padding="lg" className="hover:border-[#0066FF] transition-colors">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-base font-semibold text-white mb-2">{title}</h3>
                    <p className="text-xs text-[#8899AA]">{subtitle}</p>
                </div>
                <Link href={href} className="text-xs text-[#0066FF] flex items-center gap-1 hover:underline">
                    {linkText} <ChevronRight size={14} />
                </Link>
            </div>
            {status && (
                <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-[#1A2A3A] rounded-full overflow-hidden">
                        <div className={`h-full ${statusVariant === "success" ? "w-full bg-[#00E5A0]" : "w-[72%] bg-[#FFB800]"}`} />
                    </div>
                    <span className={`text-xs font-semibold ${statusVariant === "success" ? "text-[#00E5A0]" : "text-white"}`}>{status}</span>
                </div>
            )}
            {hint && (
                <div className="mt-2 text-xs text-[#FFB800] bg-[#FFB800]/10 px-2 py-1 rounded inline-block">{hint}</div>
            )}
        </Card>
    );
}

export default function EmployeeTaxDeclaration() {
    return (
        <Page
            title="Rahul Kumar Sharma"
            subtitle="FY 2024-25 Tax Declaration • Old Regime"
            breadcrumbs={[
                { label: "Tax", href: "/tax" },
                { label: "Declaration" },
            ]}
            maxWidth="1200px"
            actions={
                <Button variant="secondary" icon={<Download size={14} />} href="/tax/form-12bb/EMP-0848">Download Form 12BB</Button>
            }
        >
            <div className="space-y-6">
                {/* Employee Header */}
                <Card padding="lg">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-[#1A2A3A] flex items-center justify-center text-white text-lg font-semibold" aria-hidden="true">RK</div>
                        <div>
                            <div className="flex items-center gap-3 mb-1">
                                <Badge variant="info">EMP-0848</Badge>
                                <Badge variant="neutral">Engineering</Badge>
                                <span className="text-xs text-[#8899AA]">
                                    Tax Regime: <span className="text-white font-medium">Old Regime</span>
                                    <Link href="/tax/regime-selector/EMP-0848" className="text-[#0066FF] ml-2 hover:underline">Switch?</Link>
                                </span>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Declaration Progress */}
                <Card padding="lg">
                    <h3 className="text-base font-semibold text-white mb-4">Declaration Progress</h3>
                    <div className="w-full h-2 bg-[#1A2A3A] rounded-full overflow-hidden mb-4" role="progressbar" aria-valuenow={70} aria-valuemin={0} aria-valuemax={100} aria-label="70% declaration progress">
                        <div className="w-[70%] h-full bg-[#00E5A0]" />
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <Badge variant="success" dot>80C: ₹1,50,000 / ₹1,50,000</Badge>
                        <Badge variant="warning" dot>80D: ₹18,000 / ₹25,000</Badge>
                        <Badge variant="success" dot>HRA: ₹2,40,000</Badge>
                        <Badge variant="neutral">Home Loan: Not declared</Badge>
                        <Badge variant="neutral">Other: ₹0</Badge>
                    </div>
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-[760px_1fr] gap-8">
                    {/* Left side: Sections */}
                    <div className="flex flex-col gap-4">
                        <DeclarationCard
                            title="80C Investments"
                            subtitle="PPF: ₹50K | LIC: ₹30K | ELSS: ₹40K | PF(auto): ₹57.6K"
                            href="/tax/80c/EMP-0848"
                            linkText="View/Edit"
                            status="Total: ₹1,50,000 ✅"
                            statusVariant="success"
                        />
                        <DeclarationCard
                            title="80D Health Insurance"
                            subtitle="Health Insurance: ₹18,000"
                            href="/tax/80d/EMP-0848"
                            linkText="View/Edit"
                            status="Total: ₹18,000"
                            statusVariant="warning"
                            hint="💡 ₹7,000 more eligible for deduction"
                        />
                        <DeclarationCard
                            title="House Rent Allowance (HRA)"
                            subtitle="Monthly rent: ₹25,000 | Landlord PAN: ABCDE1234F"
                            href="/tax/hra/EMP-0848"
                            linkText="Edit HRA"
                            status="Exemption computed: ₹2,40,000/year"
                            statusVariant="success"
                        />

                        {/* Home Loan - dashed border */}
                        <Card padding="lg" className="border-dashed border-[#445566] hover:border-[#0066FF] transition-colors">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="text-base font-semibold text-white mb-1">Home Loan Interest (Section 24b)</h3>
                                    <p className="text-xs text-[#8899AA]">Eligible for interest paid (max ₹2,00,000)</p>
                                </div>
                                <Button variant="outline" size="sm" href="/tax/home-loan/EMP-0848">Declare Home Loan</Button>
                            </div>
                        </Card>

                        {/* Other Deductions */}
                        <div className="grid grid-cols-2 gap-4">
                            <Card padding="md">
                                <div className="flex justify-between items-start mb-3">
                                    <h3 className="text-sm font-semibold text-white">NPS 80CCD(1B)</h3>
                                    <Link href="/tax/nps/EMP-0848"><ChevronRight size={16} className="text-[#0066FF]" /></Link>
                                </div>
                                <Badge variant="success">Additional ₹50K deduction available</Badge>
                            </Card>
                            <Card padding="md">
                                <div className="flex justify-between items-start mb-3">
                                    <h3 className="text-sm font-semibold text-white">Other Deductions</h3>
                                    <Link href="/tax/other-deductions/EMP-0848" className="text-xs text-[#0066FF]">View All</Link>
                                </div>
                                <p className="text-xs text-[#8899AA]">80E, 80G, 80U, 80TTA etc.</p>
                            </Card>
                        </div>
                    </div>

                    {/* Right side: Sticky Summary */}
                    <div className="lg:sticky lg:top-6 lg:self-start flex flex-col gap-6">
                        <Card padding="lg">
                            <h3 className="text-base font-semibold text-white mb-5">Your Tax Summary — FY 2024-25</h3>

                            {/* Computation preview */}
                            <div className="bg-[#060B14] border border-[#1A2A3A] rounded-xl p-4 font-mono text-xs mb-6">
                                <div className="flex justify-between text-[#8899AA] mb-2"><span>Annual CTC:</span><span>₹12,00,000</span></div>
                                <div className="flex justify-between text-[#FF4444] mb-1"><span>- Std. Deduct:</span><span>-₹50,000</span></div>
                                <div className="flex justify-between text-[#FF4444] mb-1"><span>- 80C Invest:</span><span>-₹1,50,000</span></div>
                                <div className="flex justify-between text-[#FF4444] mb-1"><span>- 80D Insure:</span><span>-₹18,000</span></div>
                                <div className="flex justify-between text-[#FF4444] mb-3"><span>- HRA Exempt:</span><span>-₹2,40,000</span></div>
                                <div className="border-t border-[#1A2A3A] mb-3" />
                                <div className="flex justify-between text-white font-semibold mb-4 text-sm"><span>Taxable Inc:</span><span>₹5,42,000</span></div>
                                <div className="text-[#8899AA] mb-2">TAX COMPUTE:</div>
                                <div className="flex justify-between text-[#8899AA] mb-1"><span>Up to ₹2.5L:</span><span>₹0</span></div>
                                <div className="flex justify-between text-[#8899AA] mb-1"><span>₹2.5L–₹5L:</span><span>₹12,500</span></div>
                                <div className="flex justify-between text-[#8899AA] mb-1"><span>₹5L–₹5.42L:</span><span>₹8,400</span></div>
                                <div className="flex justify-between text-white mb-1"><span>Subtotal:</span><span>₹20,900</span></div>
                                <div className="flex justify-between text-white mb-3"><span>4% Cess:</span><span>₹836</span></div>
                                <div className="border-t border-dashed border-[#1A2A3A] mb-3" />
                                <div className="flex justify-between text-white font-bold text-sm mb-1"><span>ANNUAL TAX:</span><span>₹21,736</span></div>
                                <div className="flex justify-between text-[#00E5A0] font-bold text-sm"><span>MONTHLY TDS:</span><span>₹1,811</span></div>
                            </div>

                            {/* Projected TDS Chart */}
                            <div>
                                <p className="text-xs text-[#8899AA] mb-3">Projected Monthly TDS Deduction</p>
                                <div className="h-[120px] w-full">
                                    <ChartWrapper height={120}>
                                        <BarChart data={PROJECTED_TDS} margin={{ top: 0, right: 0, left: -30, bottom: 0 }}>
                                            <XAxis dataKey="month" stroke="#445566" fontSize={10} tickLine={false} axisLine={false} />
                                            <YAxis stroke="#445566" fontSize={10} tickLine={false} axisLine={false} />
                                            <Tooltip cursor={{ fill: "rgba(255,255,255,0.05)" }} contentStyle={{ background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 8 }} />
                                            <Bar dataKey="val" fill="#0066FF" radius={[2, 2, 0, 0]} />
                                        </BarChart>
                                    </ChartWrapper>
                                </div>
                            </div>

                            <Button variant="outline" className="w-full" href="/tax/regime-selector/EMP-0848">Compare with New Regime →</Button>
                        </Card>

                        <div className="flex flex-col gap-3">
                            <Button className="w-full h-12">Submit Declaration</Button>
                            <Button variant="secondary" className="w-full h-12">Save Draft</Button>
                        </div>
                    </div>
                </div>
            </div>
        </Page>
    );
}
