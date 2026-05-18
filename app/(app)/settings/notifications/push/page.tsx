"use client";

import { Key, RefreshCcw, Smartphone } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useToast } from "@/components/ui/Toast";

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function PushNotificationSetupPage() {
    const toast = useToast();

    const handleSave = async () => {
        // TODO: replace with real mutation
        await new Promise((r) => setTimeout(r, 500));
        toast.show({ variant: "success", title: "Push notification settings saved" });
    };

    return (
        <Page
            title="Push Notification Setup"
            subtitle="Configure Firebase Cloud Messaging (FCM) or APNs for mobile alerts."
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Settings", href: "/settings" },
                { label: "Notifications", href: "/settings/notifications" },
                { label: "Push" },
            ]}
            maxWidth="700px"
        >
            <Card padding="lg">
                <div className="space-y-6">
                    {/* FCM Status */}
                    <div className="flex items-center gap-4 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                        <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                            <RefreshCcw size={20} aria-hidden="true" />
                        </div>
                        <div className="flex-1">
                            <h4 className="text-white text-sm font-bold">FCM Connected Successfully</h4>
                            <p className="text-xs text-emerald-400/80">Project ID: kaarya-mobile-prod-889a</p>
                        </div>
                        <Badge variant="success" dot>Connected</Badge>
                        <Button variant="secondary" size="sm">Disconnect</Button>
                    </div>

                    {/* APNs Config */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold text-white border-b border-[#1A2A3A] pb-2">Apple Push Notification service (APNs)</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="apns-key-id" className="block text-xs text-[#8899AA] mb-1">Key ID</label>
                                <input
                                    id="apns-key-id"
                                    type="text"
                                    placeholder="e.g. 5A92942XX"
                                    className="w-full bg-[#060D1A] border border-[#1A2A3A] rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-emerald-500"
                                />
                            </div>
                            <div>
                                <label htmlFor="apns-team-id" className="block text-xs text-[#8899AA] mb-1">Team ID</label>
                                <input
                                    id="apns-team-id"
                                    type="text"
                                    placeholder="e.g. ABC123DEF"
                                    className="w-full bg-[#060D1A] border border-[#1A2A3A] rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-emerald-500"
                                />
                            </div>
                            <div className="col-span-1 md:col-span-2">
                                <label htmlFor="apns-auth-key" className="block text-xs text-[#8899AA] mb-1">Auth Key (.p8 file)</label>
                                <div className="w-full border-2 border-dashed border-[#1A2A3A] rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:border-[#2A3A4A] hover:bg-[#131B2B]/50 transition-all">
                                    <Key className="text-[#556677] mb-2" size={24} aria-hidden="true" />
                                    <span className="text-sm text-white font-medium">Upload AuthKey_XX.p8</span>
                                    <span className="text-xs text-[#556677] mt-1">Securely hosted in AWS KMS</span>
                                    <input id="apns-auth-key" type="file" accept=".p8" className="sr-only" aria-label="Upload APNs auth key" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 flex justify-end">
                        <Button onClick={handleSave} icon={<Smartphone size={16} aria-hidden="true" />}>Save Configurations</Button>
                    </div>
                </div>
            </Card>
        </Page>
    );
}
