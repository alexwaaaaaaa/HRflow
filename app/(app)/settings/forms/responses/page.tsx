"use client";

import { Clock, Download } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

// ─────────────────────────────────────────────────────────────────────────────
// Types & static data
// ─────────────────────────────────────────────────────────────────────────────

interface FormResponse {
    id: number;
    respondent: string;
    submitted: string;
    answers: Record<string, string>;
}

const RESPONSES: FormResponse[] = [
    {
        id: 1,
        respondent: "Kavya Singh",
        submitted: "Mar 5, 2024 — 2:30 PM",
        answers: {
            "Reason for Leaving": "Career Growth",
            "Rating (1-10)": "7",
            "Would Recommend?": "Yes",
            Feedback: "Great culture but limited L&D budget.",
        },
    },
    {
        id: 2,
        respondent: "Rohan Mehta",
        submitted: "Feb 28, 2024 — 11:00 AM",
        answers: {
            "Reason for Leaving": "Compensation",
            "Rating (1-10)": "5",
            "Would Recommend?": "Maybe",
            Feedback: "Pay was below market after 2 years.",
        },
    },
    {
        id: 3,
        respondent: "Aditi Sharma",
        submitted: "Feb 20, 2024 — 4:15 PM",
        answers: {
            "Reason for Leaving": "Manager",
            "Rating (1-10)": "4",
            "Would Recommend?": "No",
            Feedback: "Micromanagement was a serious issue.",
        },
    },
];

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────────────────

function ResponseCard({ response }: { response: FormResponse }) {
    const initials = response.respondent.split(" ").map((n) => n[0]).join("");
    return (
        <Card padding="md" className="hover:border-[#2A3A4A] transition-colors">
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                    <div
                        className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-[10px] font-bold text-white"
                        aria-hidden="true"
                    >
                        {initials}
                    </div>
                    <div>
                        <div className="text-white font-medium text-sm">{response.respondent}</div>
                        <div className="text-xs text-[#8899AA] flex items-center gap-1">
                            <Clock size={10} aria-hidden="true" /> {response.submitted}
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(response.answers).map(([q, a]) => (
                    <div key={q} className="bg-[#131B2B] border border-[#2A3A4A] rounded-lg p-3">
                        <p className="text-[10px] text-[#445566] uppercase tracking-wider font-semibold mb-1">{q}</p>
                        <p className="text-sm text-white">{a}</p>
                    </div>
                ))}
            </div>
        </Card>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function FormResponsePage() {
    return (
        <Page
            title="Exit Interview Responses"
            subtitle="42 total responses · Form: FRM-001"
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Settings", href: "/settings" },
                { label: "Forms", href: "/settings/forms" },
                { label: "Responses" },
            ]}
            maxWidth="1000px"
            actions={
                <div className="flex gap-2">






                    <Button variant="secondary" href="/settings/forms">← Back</Button>
                    <Button variant="secondary" icon={<Download size={16} aria-hidden="true" />}>Export All</Button>
                </div>
            }
        >
            <div className="space-y-4">
                {RESPONSES.map((res) => (
                    <ResponseCard key={res.id} response={res} />
                ))}
            </div>
        

        

        

        </Page>
    );
}
