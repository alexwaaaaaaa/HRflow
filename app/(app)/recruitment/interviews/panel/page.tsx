"use client";

import { Plus, MoveVertical, Save, Trash2, CheckSquare } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components (module scope)
// ─────────────────────────────────────────────────────────────────────────────

interface StageCardProps {
    number: number;
    defaultName: string;
    interviewers: Array<{ initials: string; name: string; color: string; shadow?: boolean }>;
    scorecard?: string;
}

function StageCard({ number, defaultName, interviewers, scorecard }: StageCardProps) {
    return (
        <Card padding="none" className="flex overflow-hidden">
            <div className="flex w-12 cursor-move items-center justify-center border-r border-[#1A2A3A] bg-[#0A1420] text-[#445566] transition-colors hover:text-white">
                <MoveVertical size={16} aria-hidden="true" />
            </div>
            <div className="flex-1 p-5">
                <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div
                            aria-hidden="true"
                            className="flex h-6 w-6 items-center justify-center rounded-full bg-[#1A2A3A] text-xs font-bold text-white"
                        >
                            {number}
                        </div>
                        <input
                            defaultValue={defaultName}
                            aria-label={`Stage ${number} name`}
                            className="border-b border-transparent bg-transparent text-lg font-bold text-white focus:border-[#0066FF] focus:outline-none"
                        />
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        icon={<Trash2 size={16} aria-hidden="true" />}
                        aria-label={`Delete stage ${number}`}
                        className="text-[#8899AA] hover:text-[#FF4444]"
                    />
                </div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                        <p className="mb-2 text-xs font-medium text-[#8899AA]">Assigned Interviewers</p>
                        <div className="flex flex-wrap gap-2">
                            {interviewers.map((iv) => (
                                <div
                                    key={iv.name}
                                    className={`flex items-center gap-2 rounded-lg bg-[#1A2A3A] px-3 py-1.5 text-sm ${iv.shadow ? "border border-[#00E5A0]" : ""}`}
                                >
                                    <div
                                        aria-hidden="true"
                                        className="flex h-4 w-4 items-center justify-center rounded-full text-[8px] font-bold"
                                        style={{ backgroundColor: iv.color }}
                                    >
                                        {iv.initials}
                                    </div>
                                    {iv.name}{" "}
                                    <button
                                        type="button"
                                        aria-label={`Remove ${iv.name}`}
                                        className="ml-1 text-[#445566]"
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                            <Button variant="ghost" size="sm" icon={<Plus size={14} aria-hidden="true" />}>
                                Add
                            </Button>
                        </div>
                    </div>
                    <div>
                        {scorecard ? (
                            <div>
                                <p className="mb-2 text-xs font-medium text-[#8899AA]">Feedback Scorecard</p>
                                <div className="flex items-center gap-2">
                                    <div className="flex h-9 flex-1 items-center gap-2 rounded-lg bg-[#1A2A3A] px-3 text-sm text-white">
                                        <CheckSquare size={14} className="text-[#00E5A0]" aria-hidden="true" />
                                        {scorecard}
                                    </div>
                                    <Button variant="ghost" size="sm">Change</Button>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <p className="mb-2 text-xs font-medium text-[#8899AA]">Duration & Tool</p>
                                <div className="flex gap-2">
                                    <select
                                        aria-label="Duration"
                                        className="h-9 flex-1 rounded-lg border border-[#1A2A3A] bg-[#060B14] px-2 text-sm text-white focus:outline-none"
                                    >
                                        <option>30 Minutes</option>
                                        <option>45 Minutes</option>
                                        <option>60 Minutes</option>
                                    </select>
                                    <select
                                        aria-label="Meeting tool"
                                        className="h-9 flex-1 rounded-lg border border-[#1A2A3A] bg-[#060B14] px-2 text-sm text-white focus:outline-none"
                                    >
                                        <option>Phone Call</option>
                                        <option>Google Meet</option>
                                    </select>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Card>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function InterviewPanelSetup() {
    return (
        <Page
            title="Interview Panel Setup"
            subtitle='Define the hiring stages and assign default interviewers for "Senior Frontend Engineer"'
            breadcrumbs={[
                { label: "Recruitment", href: "/recruitment/dashboard" },
                { label: "Interviews", href: "/recruitment/interviews" },
                { label: "Panel Setup" },
            ]}
            maxWidth="900px"
            actions={
                <Button icon={<Save size={14} aria-hidden="true" />





}>Save Template</Button>
            }
        >
            <div className="space-y-4">
                <StageCard
                    number={1}
                    defaultName="HR Screening"
                    interviewers={[{ initials: "PN", name: "Priya Nair", color: "#0066FF" }]}
                />
                <StageCard
                    number={2}
                    defaultName="Technical Round (React.js)"
                    interviewers={[
                        { initials: "AS", name: "Ankit Sharma", color: "#9B59B6" },
                        { initials: "NS", name: "Neha S. (Shadow)", color: "#FFB800", shadow: true },
                    ]}
                    scorecard="Frontend Tech Scorecard"
                />

                <button
                    type="button"
                    className="flex h-14 w-full items-center justify-center rounded-2xl border-2 border-dashed border-[#1A2A3A] font-bold text-[#8899AA] transition-colors hover:border-[#2A3A4A] hover:bg-[#1A2A3A]/30 hover:text-white"
                >
                    <Plus size={18} className="mr-2" aria-hidden="true" /> Add Interview Stage
                </button>
            </div>
        

        

        

        </Page>
    );
}
