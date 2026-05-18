"use client";

import { Gift, Cake, CalendarHeart, Sparkles } from "lucide-react";
import Page from "@/components/ui/Page";
import Card, { CardHeader, CardTitle } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export default function LifeEventsNotificationPage() {
    return (
        <Page
            title="Life Events & Celebrations"
            subtitle="Birthdays, anniversaries, and personal milestones across your team"
            breadcrumbs={[
                { label: "Notifications", href: "/notifications" },
                { label: "Life Events" },
            ]}
            maxWidth="900px"
        >
            <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {/* Birthday card */}
                    <Card
                        padding="lg"
                        className="border-[#1A2A3A] bg-gradient-to-br from-[#0A1420] to-pink-900/10 transition-colors hover:border-pink-500/30"
                    >
                        <div className="mb-6 flex items-start justify-between">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-tr from-pink-500 to-rose-400 text-white shadow-lg shadow-pink-500/20">
                                <Cake size={24} aria-hidden="true" />
                            </div>
                            <Badge variant="warning">Today</Badge>
                        </div>
                        <h3 className="mb-1 text-xl font-bold text-white">
                            Priya Sharma&apos;s Birthday
                        </h3>
                        <p className="mb-6 text-sm text-[#8899AA]">
                            Wish her a fantastic day! She is turning 28 today.
                        </p>
                        <div className="flex gap-3">
                            <Button
                                variant="secondary"
                                size="sm"
                                className="flex-1"
                                icon={<Sparkles size={14} aria-hidden="true" />}
                            >
                                Send Wishes
                            </Button>
                            <Button variant="outline" size="sm" className="flex-1">
                                Claim Team Gift
                            </Button>
                        </div>
                    </Card>

                    {/* Anniversary card */}
                    <Card
                        padding="lg"
                        className="border-[#1A2A3A] bg-gradient-to-br from-[#0A1420] to-indigo-900/10 transition-colors hover:border-indigo-500/30"
                    >
                        <div className="mb-6 flex items-start justify-between">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-500 to-blue-400 text-white shadow-lg shadow-indigo-500/20">
                                <CalendarHeart size={24} aria-hidden="true" />
                            </div>
                            <Badge variant="neutral">Tomorrow</Badge>
                        </div>
                        <h3 className="mb-1 text-xl font-bold text-white">
                            5 Year Work Anniversary
                        </h3>
                        <p className="mb-6 text-sm text-[#8899AA]">
                            Rohan Gupta joined Kaarya exactly 5 years ago. Time flies!
                        </p>
                        <Button
                            variant="secondary"
                            size="sm"
                            className="w-full"
                            icon={<Sparkles size={14} aria-hidden="true" />}
                        >
                            Send Kudobox
                        </Button>
                    </Card>
                </div>

                {/* Upcoming */}
                <Card padding="lg">
                    <CardHeader>
                        <CardTitle className="text-xs font-bold uppercase tracking-wider text-[#8899AA]">
                            Upcoming Next Week
                        </CardTitle>
                    </CardHeader>
                    <div className="space-y-3">
                        <div className="flex items-center gap-4 rounded-xl border border-[#1A2A3A] bg-[#0A1420] p-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#131B2B] text-[#556677]">
                                <Gift size={20} aria-hidden="true" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-white">
                                    New Arrival: Baby Girl (Anita Desai)
                                </p>
                                <p className="text-xs text-[#556677]">Oct 30, 2024</p>
                            </div>
                            <Button variant="outline" size="sm">
                                Remind Me
                            </Button>
                        </div>
                    </div>
                </Card>
            </div>
        </Page>
    );
}
