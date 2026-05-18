"use client";

import { Plus, X } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

// ─────────────────────────────────────────────────────────────────────────────
// Types & static data
// ─────────────────────────────────────────────────────────────────────────────

interface ReminderRule {
    title: string;
    active: boolean;
    stages: string[];
}

const REMINDER_RULES: ReminderRule[] = [
    { title: "Manager Leave Approvals", active: true, stages: ["24 hrs before", "12 hrs before", "Escalate at 0 hrs"] },
    { title: "Incomplete Timesheets", active: true, stages: ["Every Friday 5PM", "Monday 9AM"] },
    { title: "Candidate Interview Feedback", active: false, stages: ["1 hr post-interview", "24 hrs post-interview"] },
];

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────────────────

function ReminderCard({ rule }: { rule: ReminderRule }) {
    const toggleId = `reminder-${rule.title.replace(/\s+/g, "-").toLowerCase()}`;
    return (
        <Card padding="lg" className={rule.active ? "" : "opacity-60 hover:opacity-100 transition-opacity"}>
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-bold text-white">{rule.title}</h3>
                <div className="relative shrink-0">
                    <input type="checkbox" id={toggleId} className="sr-only peer" defaultChecked={rule.active} />
                    <label
                        htmlFor={toggleId}
                        className="w-11 h-6 bg-[#131B2B] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-500 border border-[#2A3A4A] transition-colors block cursor-pointer"
                    />
                </div>
            </div>

            <h4 className="text-xs font-bold text-[#8899AA] uppercase tracking-wider mb-3">Escalation Stages</h4>
            <div className="flex flex-wrap gap-2">
                {rule.stages.map((stage, j) => (
                    <div key={j} className="flex items-center gap-2 bg-[#060D1A] border border-[#1A2A3A] px-3 py-1.5 rounded-lg text-sm text-[#CCDDEE]">
                        <span className="w-5 h-5 rounded-full bg-[#131B2B] flex items-center justify-center text-xs font-bold font-mono text-[#8899AA] border border-[#2A3A4A]" aria-hidden="true">{j + 1}</span>
                        {stage}
                        <Button variant="ghost" size="sm" aria-label={`Remove stage: ${stage}`} icon={<X size={14} aria-hidden="true" />} />
                    </div>
                ))}
                <Button variant="outline" size="sm" icon={<Plus size={14} aria-hidden="true" />}>Add Stage</Button>
            </div>
        </Card>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function ReminderSetupPage() {
    return (
        <Page
            title="Automated Reminders"
            subtitle="Setup multi-stage nudges for pending approvals and tasks."
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Settings", href: "/settings" },
                { label: "Notifications", href: "/settings/notifications" },
                { label: "Reminders" },
            ]}
            maxWidth="900px"
            actions={
                <Button icon={<Plus size={16} aria-hidden="true" />





}>New Rule</Button>
            }
        >
            <div className="space-y-6">
                {REMINDER_RULES.map((rule) => (
                    <ReminderCard key={rule.title} rule={rule} />
                ))}
            </div>
        

        

        

        </Page>
    );
}
