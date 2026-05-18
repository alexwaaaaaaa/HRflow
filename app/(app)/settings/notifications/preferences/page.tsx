"use client";

import { Mail, Monitor, Sliders, Smartphone } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

// ─────────────────────────────────────────────────────────────────────────────
// Types & static data
// ─────────────────────────────────────────────────────────────────────────────

interface PrefGroup {
    cat: string;
    items: string[];
}

const PREFS: PrefGroup[] = [
    { cat: "Payroll & Compensation", items: ["Salary Slips", "Tax Declarations", "Expense Reimbursements"] },
    { cat: "Leave & Attendance", items: ["Leave Approvals", "Shift Changes", "Attendance Regularisation"] },
    { cat: "Performance & OKR", items: ["Goal Updates", "Review Cycles", "Continuous Feedback"] },
    { cat: "Company Engagement", items: ["Announcements", "R&R Spot Awards", "Surveys"] },
];

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────────────────

function ChannelToggle({ id, label, icon: Icon, color, defaultChecked }: {
    id: string;
    label: string;
    icon: typeof Mail;
    color: string;
    defaultChecked: boolean;
}) {
    return (
        <label htmlFor={id} className="flex items-center gap-2 cursor-pointer group">
            <div className="relative">
                <input type="checkbox" id={id} className="sr-only peer" defaultChecked={defaultChecked} />
                <div className="w-10 h-6 bg-[#131B2B] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-500 border border-[#2A3A4A] transition-colors" />
            </div>
            <span className={`text-xs text-[#8899AA] flex items-center gap-1 group-hover:text-white transition-colors ${color}`}>
                <Icon size={14} aria-hidden="true" /> {label}
            </span>
        </label>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function NotificationPreferencesDetailPage() {
    const toast = useToast();

    const handleSave = async () => {
        // TODO: replace with real mutation
        await new Promise((r) => setTimeout(r, 400));
        toast.show({ variant: "success", title: "Preferences saved" });
    };

    return (
        <Page
            title="Notification Routing Preferences"
            subtitle="Control how and where different types of alerts are delivered."
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Settings", href: "/settings" },
                { label: "Notifications", href: "/settings/notifications" },
                { label: "Preferences" },
            ]}
            maxWidth="900px"
            actions={
                <Button onClick={handleSave} icon={<Sliders size={16} aria-hidden="true" />}>Save Changes</Button>
            }
        >
            <div className="space-y-8">
                {PREFS.map((group, idx) => (
                    <Card key={idx} padding="none">
                        <div className="bg-[#0D1928] px-6 py-4 border-b border-[#1A2A3A]">
                            <h3 className="font-bold text-white">{group.cat}</h3>
                        </div>
                        <div className="divide-y divide-[#1A2A3A]">
                            {group.items.map((item, i) => (
                                <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-6 gap-4">
                                    <h4 className="text-sm font-medium text-[#CCDDEE]">{item}</h4>
                                    <div className="flex gap-4">
                                        <ChannelToggle
                                            id={`${idx}-${i}-email`}
                                            label="Email"
                                            icon={Mail}
                                            color=""
                                            defaultChecked={i !== 2}
                                        />
                                        <ChannelToggle
                                            id={`${idx}-${i}-push`}
                                            label="Push"
                                            icon={Smartphone}
                                            color=""
                                            defaultChecked={i === 0}
                                        />
                                        <ChannelToggle
                                            id={`${idx}-${i}-inapp`}
                                            label="In-App"
                                            icon={Monitor}
                                            color=""
                                            defaultChecked
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                ))}
            </div>
        </Page>
    );
}
