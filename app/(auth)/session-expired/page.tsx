import { Clock, FileText, ShieldCheck } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

export default function SessionExpiredPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#060B14] px-4 animate-fade-in">
            <div className="w-full max-w-[440px]">
                <Card variant="elevated" padding="lg">
                    {/* Logo */}
                    <div className="flex items-center justify-center gap-2 mb-6">
                        <div className="w-7 h-7 rounded-full bg-[#00E5A0] flex items-center justify-center">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#060B14" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <span className="text-xl font-bold text-[#00E5A0]">HRFlow</span>
                    </div>

                    <div className="flex justify-center mb-6">
                        <div className="bg-[rgba(255,184,0,0.1)] rounded-2xl p-5">
                            <Clock size={44} color="#FFB800" aria-hidden="true" />
                        </div>
                    </div>

                    <h1 className="text-[26px] font-bold text-white text-center m-0">Session Expired</h1>
                    <p className="text-sm text-[#8899AA] text-center mt-2 mb-6">
                        Your session has timed out after 30 minutes of inactivity. Please sign in again to continue.
                    </p>

                    {/* Last activity */}
                    <Card variant="default" padding="sm" className="flex flex-col gap-2 mb-6">
                        <div className="flex items-center gap-2 text-xs text-[#8899AA]">
                            <Clock size={12} aria-hidden="true" /> Last active on: 12/11/2024 at 10:30 AM
                        </div>
                        <div className="flex items-center gap-2 text-sm text-white">
                            <FileText size={14} aria-hidden="true" /> You were working on: Payroll - November 2024
                        </div>
                    </Card>

                    {/* Buttons */}
                    <div className="flex flex-col gap-3 mb-6">
                        <a href="/login">
                            <Button size="lg" className="w-full">Sign In Again</Button>
                        </a>
                        <Button variant="ghost" size="lg" className="w-full">Continue as Different User</Button>
                    </div>

                    <div className="flex items-center justify-center gap-1.5 text-[#445566] text-xs">
                        <ShieldCheck size={12} aria-hidden="true" /> For security, all unsaved changes may be lost.
                    </div>
                </Card>
            </div>
        </div>
    );
}
