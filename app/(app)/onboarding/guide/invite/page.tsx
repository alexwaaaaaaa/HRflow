"use client";
import React, { useState } from "react";
import { ArrowRight, CheckCircle2, Users, Send } from "lucide-react";
import Link from "next/link";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function InviteTeamGuideScreen() {
    const [step, setStep] = useState(1);

    return (
        <Page
            title="Team Invitation Setup"
            subtitle={`Step ${step} of 2 • Est. 2 mins`}
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Onboarding", href: "/onboarding/dashboard" },
                { label: "Guide", href: "/onboarding/go-live" },
                { label: "Invite Team", href: "/onboarding/guide/invite" },
            ]}
            maxWidth="1000px"
            actions={
                <Link href="/onboarding/go-live" className="text-[#556677] hover:text-white text-sm font-bold transition-colors">
                    Save &amp; Exit
                </Link>
            }
        >
            <Card className="relative overflow-hidden shadow-2xl">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/3 opacity-5 pointer-events-none" aria-hidden="true">
                    <Users size={400} strokeWidth={0.5} />
                </div>

                <div className="relative z-10 grid md:grid-cols-2 gap-12">

                    {/* Guide Content Side */}
                    <div>
                        {step === 1 && (
                            <div>
                                <h2 className="text-3xl font-black text-white mb-4">Customize Welcome Email</h2>
                                <p className="text-[#8899AA] mb-8">
                                    Personalize the message your team receives. Kaarya automatically injects their secure login link and password setup instructions.
                                </p>

                                <div className="space-y-4">
                                    <div>
                                        <label htmlFor="email-subject" className="text-xs font-bold text-[#8899AA] uppercase tracking-wider mb-2 block">
                                            Email Subject
                                        </label>
                                        <input
                                            id="email-subject"
                                            type="text"
                                            defaultValue="Welcome to Kaarya, your new HR portal!"
                                            className="w-full bg-[#060D1A] border border-[#2A3A4A] rounded-lg px-4 py-3 text-white focus:border-emerald-500 outline-none transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="custom-message" className="text-xs font-bold text-[#8899AA] uppercase tracking-wider mb-2 block">
                                            Custom Message (Optional)
                                        </label>
                                        <textarea
                                            id="custom-message"
                                            rows={4}
                                            defaultValue="Hi team, we are excited to launch Kaarya to manage all our HR, leave, and payroll operations in one place. Please set up your account via the link below."
                                            className="w-full bg-[#060D1A] border border-[#2A3A4A] rounded-lg px-4 py-3 text-[#CCDDEE] focus:border-emerald-500 outline-none transition-colors resize-none"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div>
                                <h2 className="text-3xl font-black text-white mb-4">Select Recipients</h2>
                                <p className="text-[#8899AA] mb-8">
                                    Choose who gets access right now. You can invite the entire company, or just a pilot group like managers or HR first.
                                </p>

                                <div className="space-y-3 mb-8">
                                    <div className="bg-[#131B2B] border border-emerald-500/50 rounded-xl p-4 flex gap-4 cursor-pointer hover:bg-[#1A2A3A] transition-colors">
                                        <div className="mt-1 text-emerald-400"><CheckCircle2 size={24} aria-hidden="true" /></div>
                                        <div>
                                            <h4 className="text-white font-bold mb-1 flex items-center gap-2">
                                                All Active Employees
                                                <span className="bg-[#0A1420] px-2 rounded-full text-xs text-[#8899AA]">1,210</span>
                                            </h4>
                                            <p className="text-sm text-[#8899AA]">Invite everyone loaded from the ATS migration.</p>
                                        </div>
                                    </div>
                                    <div className="bg-[#060D1A] border border-[#2A3A4A] rounded-xl p-4 flex gap-4 cursor-pointer hover:bg-[#131B2B] transition-colors opacity-60">
                                        <div className="mt-1 text-[#556677]">
                                            <div className="w-6 h-6 rounded-full border-2 border-[#556677]" aria-hidden="true" />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-bold mb-1 flex items-center gap-2">
                                                Managers &amp; HR Admins Only
                                                <span className="bg-[#1A2A3A] px-2 rounded-full text-xs text-[#8899AA]">145</span>
                                            </h4>
                                            <p className="text-sm text-[#556677]">Good for a soft launch to review reporting structures first.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg text-sm text-amber-500">
                                    Emails will be sent immediately upon clicking &ldquo;Blast Invites&rdquo; to <strong>1,210</strong> users.
                                </div>
                            </div>
                        )}

                        <div className="flex justify-between items-center pt-8 border-t border-[#1A2A3A] mt-8">
                            <Button
                                variant="ghost"
                                onClick={() => setStep(Math.max(1, step - 1))}
                                className={step === 1 ? "invisible" : ""}
                            >
                                Back
                            </Button>

                            {step < 2 ? (
                                <Button
                                    onClick={() => setStep(step + 1)}
                                    iconRight={<ArrowRight size={16} aria-hidden="true" />}
                                >
                                    Preview &amp; Next
                                </Button>
                            ) : (
                                <Button
                                    onClick={() => window.location.href = "/onboarding/go-live"}
                                    icon={<Send size={16} aria-hidden="true" />}
                                >
                                    Blast Invites
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* Email Preview Side */}
                    <div className="hidden md:block bg-white rounded-2xl p-6 shadow-2xl skew-y-1 transform transition-transform hover:skew-y-0 relative">
                        <div className="absolute -top-4 -right-4 bg-[#0A1420] text-emerald-400 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-xl border border-emerald-500/30">
                            Preview
                        </div>
                        <div className="border-b border-gray-100 pb-4 mb-4">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">K</div>
                                <span className="font-bold text-sm text-gray-800">Kaarya HR</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 leading-snug">Welcome to Kaarya, your new HR portal!</h3>
                        </div>
                        <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
                            <p>Hi {"{First_Name}"},</p>
                            <p>Hi team, we are excited to launch Kaarya to manage all our HR, leave, and payroll operations in one place. Please set up your account via the link below.</p>
                            <div className="py-4 text-center">
                                <span className="inline-block bg-[#0A1420] text-white px-6 py-3 rounded-lg font-bold w-full mx-auto">Activate Account</span>
                            </div>
                            <p className="text-xs text-gray-400">If you have any questions, reach out to your HR administrator.</p>
                        </div>
                    </div>

                </div>
            </Card>
        </Page>
    );
}
