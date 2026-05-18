"use client";

import { useState } from "react";
import { AlertTriangle, Save, ToggleLeft, ToggleRight } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function MaintenanceModePage() {
    const [isMaintenanceOn, setIsMaintenanceOn] = useState(false);
    const toast = useToast();

    const handleSave = async () => {
        // TODO: replace with real mutation
        await new Promise((r) => setTimeout(r, 500));
        toast.show({ variant: "success", title: "Maintenance settings saved" });
    };

    return (
        <Page
            title="Maintenance Mode"
            subtitle="When enabled, all non-admin users will be redirected to a maintenance page. API calls will return 503."
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Settings", href: "/settings" },
                { label: "System", href: "/settings/system/health" },
                { label: "Maintenance" },
            ]}
            maxWidth="800px"
        >
            <div className="space-y-6">
                {/* Big Toggle */}
                <Card padding="lg" className={`text-center transition-all ${isMaintenanceOn ? "border-red-500/30 bg-red-500/5" : ""}`}>
                    <button
                        onClick={() => setIsMaintenanceOn(!isMaintenanceOn)}
                        aria-pressed={isMaintenanceOn}
                        aria-label={`Maintenance mode is ${isMaintenanceOn ? "on" : "off"}. Click to toggle.`}
                        className="inline-block transition-transform hover:scale-105 mb-4"
                    >
                        {isMaintenanceOn
                            ? <ToggleRight size={64} className="text-red-400" aria-hidden="true" />
                            : <ToggleLeft size={64} className="text-[#2A3A4A]" aria-hidden="true" />
                        }
                    </button>
                    <div className={`text-xl font-bold mb-2 ${isMaintenanceOn ? "text-red-400" : "text-white"}`}>
                        Maintenance Mode is {isMaintenanceOn ? "ON" : "OFF"}
                    </div>
                    <p className="text-sm text-[#8899AA]">
                        {isMaintenanceOn
                            ? "All non-admin users are currently locked out. Disable this to restore access."
                            : "The platform is accessible to all users. Toggle to enable maintenance window."
                        }
                    </p>
                </Card>

                {isMaintenanceOn && (
                    <Card padding="md" className="border-red-500/20 bg-red-500/5">
                        <div className="flex items-start gap-3">
                            <AlertTriangle size={18} className="text-red-400 shrink-0 mt-0.5" aria-hidden="true" />
                            <p className="text-sm text-red-300">
                                <strong>Warning:</strong> 245 active users will be disconnected. Scheduled cron jobs and webhooks will be paused.
                            </p>
                        </div>
                    </Card>
                )}

                {/* Configuration */}
                <Card padding="lg">
                    <h3 className="text-white font-medium mb-6">Maintenance Window Settings</h3>
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1.5">
                                <label htmlFor="maint-start" className="text-xs font-medium text-[#8899AA]">Scheduled Start</label>
                                <input
                                    id="maint-start"
                                    type="datetime-local"
                                    className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-indigo-500"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label htmlFor="maint-duration" className="text-xs font-medium text-[#8899AA]">Estimated Duration</label>
                                <select
                                    id="maint-duration"
                                    className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl px-4 py-2.5 text-sm text-white outline-none appearance-none cursor-pointer"
                                >
                                    <option>30 minutes</option>
                                    <option>1 hour</option>
                                    <option>2 hours</option>
                                    <option>4 hours</option>
                                    <option>Custom</option>
                                </select>
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <label htmlFor="maint-message" className="text-xs font-medium text-[#8899AA]">Custom Message (shown to users)</label>
                            <textarea
                                id="maint-message"
                                rows={3}
                                defaultValue="We're performing scheduled maintenance to improve your experience. We'll be back shortly!"
                                className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl px-4 py-3 text-sm text-white outline-none resize-none focus:border-indigo-500"
                            />
                        </div>
                        <div className="flex justify-end">
                            <Button onClick={handleSave} icon={<Save size={16} aria-hidden="true" />}>Save Settings</Button>
                        </div>
                    </div>
                </Card>
            </div>
        </Page>
    );
}
