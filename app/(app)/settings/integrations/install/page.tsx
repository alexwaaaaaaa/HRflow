"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Blocks, CheckCircle2, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

// migrated: immersive-ui — OAuth install flow; intentional full-screen centered card, no Page shell

export default function InstallIntegrationPage() {
    const [step, setStep] = useState(1);
    const router = useRouter();

    useEffect(() => {
        if (step === 2) {
            const timer = setTimeout(() => setStep(3), 2000);
            return () => clearTimeout(timer);
        }
    }, [step]);

    return (
        <div className="min-h-screen bg-[#060D1A] flex items-center justify-center p-6">
            <Card padding="lg" className="w-full max-w-lg shadow-2xl">
                <div className="flex items-center justify-center gap-6 mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white text-2xl font-black shadow-lg shadow-purple-500/20" aria-hidden="true">
                        K
                    </div>
                    <div className="flex gap-2 items-center text-[#556677]" aria-hidden="true">
                        <span className="w-2 h-2 rounded-full bg-[#1A2A3A]" />
                        <span className="w-2 h-2 rounded-full bg-[#1A2A3A]" />
                        <span className="w-2 h-2 rounded-full bg-[#1A2A3A]" />
                    </div>
                    <div className="w-16 h-16 rounded-2xl bg-[#060D1A] border border-[#1A2A3A] flex items-center justify-center" aria-hidden="true">
                        <Blocks className="text-blue-500" size={32} />
                    </div>
                </div>

                {step === 1 && (
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-white mb-2">Connect Jira Software</h2>
                        <p className="text-sm text-[#8899AA] mb-8 leading-relaxed px-4">
                            Jira is requesting access to your Kaarya workspace. It will be able to read Employee Profiles and write Performance goal status.
                        </p>
                        <div className="space-y-4">
                            <Button className="w-full" onClick={() => setStep(2)}>
                                Authorize Application
                            </Button>
                            <Button
                                variant="ghost"
                                className="w-full"
                                onClick={() => router.back()}
                            >
                                Cancel Integration
                            </Button>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="text-center py-6">
                        <Loader2 className="animate-spin text-blue-500 mx-auto mb-4" size={40} aria-hidden="true" />
                        <h2 className="text-lg font-bold text-white mb-1">Exchanging Tokens…</h2>
                        <p className="text-sm text-[#556677]">Establishing secure connection.</p>
                    </div>
                )}

                {step === 3 && (
                    <div className="text-center">
                        <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-emerald-500/50">
                            <CheckCircle2 className="text-emerald-400" size={32} aria-hidden="true" />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">Integration Success!</h2>
                        <p className="text-sm text-[#8899AA] mb-8 leading-relaxed px-4">
                            Jira Software has been successfully connected to your Kaarya workspace. You can now map projects.
                        </p>
                        <Button
                            className="w-full"
                            onClick={() => router.push("/settings/integrations")}
                            iconRight={<ArrowRight size={16} aria-hidden="true" />}
                        >
                            Go to App Settings
                        </Button>
                    </div>
                )}
            </Card>
        </div>
    );
}
