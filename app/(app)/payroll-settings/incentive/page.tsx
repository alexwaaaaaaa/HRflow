"use client";

import { Plus, Calendar, Gift, Settings, PlayCircle, Star, Zap, Save } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

// migrated: immersive-ui

interface IncentivePlan {
    name: string;
    type: string;
    amount: string;
    icon: React.ComponentType<{ size?: number; className?: string }>;
    color: string;
    status: boolean;
    auto: boolean;
}

const PLANS: IncentivePlan[] = [
    { name: "Perfect Attendance Incentive", type: "Monthly", amount: "₹2,500 fixed", icon: Calendar, color: "#00E5A0", status: true, auto: true },
    { name: "Employee Referral Bonus", type: "On Event", amount: "₹15,000 fixed", icon: Gift, color: "#FFB800", status: true, auto: false },
    { name: "Productivity Bonus Q1", type: "Quarterly", amount: "10% of Basic", icon: Zap, color: "#44AAFF", status: true, auto: false },
];

export default function IncentiveSetupPage() {
    return (
        <Page
            title="Incentive Plans"
            subtitle="Manage non-sales incentives like attendance, referrals, and spot awards."
            breadcrumbs={[
                { label: "Payroll", href: "/payroll/dashboard" },
                { label: "Settings", href: "/payroll-settings" },
                { label: "Incentive Plans" },
            ]}
            maxWidth="1200px"
            actions={
                <Button icon={<Plus size={14} aria-hidden="true" />}>Add New Plan</Button>
            }
        >
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Plans List */}
                <div className="xl:col-span-2 space-y-4">
                    {PLANS.map((plan) => (
                        <Card key={plan.name} padding="md">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div
                                        className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                                        style={{ background: `${plan.color}20`, color: plan.color }}
                                        aria-hidden="true"
                                    >
                                        <plan.icon size={18} />
                                    </div>
                                    <div>
                                        <div className="text-base font-medium text-white mb-1">{plan.name}</div>
                                        <div className="flex items-center gap-3 text-xs text-[#8899AA]">
                                            <span>{plan.type}</span>
                                            <span className="w-1 h-1 bg-[#3A4A5A] rounded-full" aria-hidden="true" />
                                            <span className="text-white">{plan.amount}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 shrink-0">
                                    {plan.auto ? (
                                        <Badge variant="success">
                                            <PlayCircle size={11} className="mr-1" aria-hidden="true" /> Auto-Trigger
                                        </Badge>
                                    ) : (
                                        <Badge variant="neutral">Manual Appr.</Badge>
                                    )}
                                    <div
                                        className={`w-10 h-6 rounded-full flex items-center p-0.5 ${plan.status ? "bg-[#00E5A0]" : "bg-[#2A3A4A]"}`}
                                        role="switch"
                                        aria-checked={plan.status}
                                        aria-label={`${plan.name} enabled`}
                                    >
                                        <div className={`w-5 h-5 rounded-full transition-transform ${plan.status ? "bg-[#060B14] translate-x-4" : "bg-white"}`} />
                                    </div>
                                    <Button variant="ghost" size="sm" aria-label={`Configure ${plan.name}`}>
                                        <Settings size={16} aria-hidden="true" />
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Plan Builder */}
                <div>
                    <Card padding="lg" className="sticky top-6">
                        <h3 className="text-base font-semibold text-white mb-5">Create / Edit Plan</h3>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="plan-name" className="block text-xs text-[#8899AA] mb-2">Plan Name</label>
                                <input
                                    id="plan-name"
                                    type="text"
                                    defaultValue="Perfect Attendance Incentive"
                                    className="w-full h-9 bg-[#0D1928] border border-[#1A2A3A] rounded-lg text-white px-3 text-sm outline-none focus:border-[#00E5A0]"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label htmlFor="plan-type" className="block text-xs text-[#8899AA] mb-2">Type</label>
                                    <select
                                        id="plan-type"
                                        className="w-full h-9 bg-[#0D1928] border border-[#1A2A3A] rounded-lg text-white px-3 text-sm outline-none focus:border-[#00E5A0]"
                                    >
                                        <option>Attendance</option>
                                        <option>Referral</option>
                                        <option>Productivity</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="plan-freq" className="block text-xs text-[#8899AA] mb-2">Frequency</label>
                                    <select
                                        id="plan-freq"
                                        className="w-full h-9 bg-[#0D1928] border border-[#1A2A3A] rounded-lg text-white px-3 text-sm outline-none focus:border-[#00E5A0]"
                                    >
                                        <option>Monthly</option>
                                        <option>On Event</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <p className="text-xs text-[#8899AA] mb-2">Payout Rule / Trigger</p>
                                <div className="bg-[#1A2A3A] rounded-lg p-3 text-xs border border-[#2A3A4A]">
                                    When <span className="text-[#00E5A0]">[Loss of Pay Days]</span> equals <span className="text-[#00E5A0]">0</span> for entire month.
                                </div>
                            </div>
                            <div>
                                <p className="text-xs text-[#8899AA] mb-2">Amount Calculation</p>
                                <div className="flex items-center gap-2">
                                    <select
                                        aria-label="Amount type"
                                        className="w-32 h-9 bg-[#0D1928] border border-[#1A2A3A] rounded-lg text-white px-2 text-xs outline-none focus:border-[#00E5A0]"
                                    >
                                        <option>Fixed Amount</option>
                                        <option>% of Basic</option>
                                    </select>
                                    <span className="text-[#8899AA] text-sm" aria-hidden="true">₹</span>
                                    <input
                                        type="text"
                                        defaultValue="2500"
                                        aria-label="Amount value"
                                        className="flex-1 h-9 bg-[#0D1928] border border-[#1A2A3A] rounded-lg text-white px-3 text-sm outline-none focus:border-[#00E5A0]"
                                    />
                                </div>
                            </div>

                            {/* Portal Preview */}
                            <div className="mt-3 bg-gradient-to-br from-[#0A1A2A] to-[#002233] border border-[#00E5A0]/30 rounded-xl p-4">
                                <div className="flex items-center gap-2 mb-2 text-[#00E5A0] text-[10px] font-semibold uppercase tracking-wider">
                                    <Star size={12} className="fill-[#00E5A0]" aria-hidden="true" /> Employee Portal Preview
                                </div>
                                <p className="text-sm font-medium leading-relaxed text-white">
                                    🎉 Congratulations! You earned a ₹2,500 <span className="text-[#00E5A0]">Attendance Bonus</span> this month! Keep up the great streak.
                                </p>
                            </div>

                            <Button variant="secondary" className="w-full mt-2" icon={<Save size={14} aria-hidden="true" />}>
                                Save Plan Configurations
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
        </Page>
    );
}
