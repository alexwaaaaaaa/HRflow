"use client";

import { HeartPulse, CheckCircle2, TrendingUp } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function WellnessAlertPage() {
    return (
        <Page
            title="Wellness Alerts"
            subtitle="Your health and wellness achievements and streaks"
            breadcrumbs={[
                { label: "Notifications", href: "/notifications" },
                { label: "Wellness" },
            ]}
            maxWidth="600px"
        >
            <div className="flex justify-center">
                <Card
                    padding="lg"
                    className="w-full max-w-lg border-emerald-500/30 bg-gradient-to-br from-[#0A1420] to-emerald-900/10 text-center shadow-[0_20px_50px_rgba(16,185,129,0.1)]"
                >
                    <div className="relative mb-6">
                        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/20">
                            <HeartPulse
                                className="text-emerald-400"
                                size={40}
                                aria-hidden="true"
                            />
                        </div>
                    </div>

                    <h2 className="mb-2 text-3xl font-black tracking-tight text-white">
                        Step Goal Reached!
                    </h2>
                    <p className="mx-auto mb-8 max-w-sm text-base leading-relaxed text-[#8899AA]">
                        Amazing job! You hit your streak of 10,000 steps for 5 consecutive days.
                        Your physical wellness score is going up.
                    </p>

                    <div className="mb-8 flex items-center justify-between rounded-xl border border-[#1A2A3A] bg-[#060D1A] p-4">
                        <div className="text-left">
                            <p className="mb-1 text-xs font-bold uppercase tracking-wider text-[#556677]">
                                Kaarya Points
                            </p>
                            <p className="flex items-center gap-2 text-xl font-bold text-white">
                                <TrendingUp
                                    size={16}
                                    className="text-emerald-400"
                                    aria-hidden="true"
                                />
                                +250
                            </p>
                        </div>
                        <div className="hidden text-left sm:block">
                            <p className="mb-1 text-xs font-bold uppercase tracking-wider text-[#556677]">
                                Weekly Streak
                            </p>
                            <p className="text-xl font-bold text-white">5 Days</p>
                        </div>
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-[#060D1A]">
                            <CheckCircle2 size={24} aria-hidden="true" />
                        </div>
                    </div>

                    <div className="flex justify-center gap-3">
                        <Button variant="primary" size="lg">
                            Claim Points
                        </Button>
                        <Button variant="secondary" size="lg">
                            Close
                        </Button>
                    </div>
                </Card>
            </div>
        </Page>
    );
}
