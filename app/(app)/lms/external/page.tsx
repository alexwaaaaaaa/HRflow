"use client";
import React, { useState } from "react";
import { Plus, UploadCloud, Link as LinkIcon, XCircle, Search,
} from "lucide-react";
import Page from "@/components/ui/Page";
import Card, { CardHeader, CardTitle } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

interface ExternalLog {
    id: number;
    title: string;
    type: string;
    provider: string;
    date: string;
    status: "approved" | "pending" | "rejected";
}

const EXTERNAL_LOGS: ExternalLog[] = [
    { id: 1, title: "AWS Certified Solutions Architect", type: "Certification", provider: "Amazon Web Services", date: "Aug 15, 2025", status: "approved" },
    { id: 2, title: "React Advanced Conference 2025", type: "Conference", provider: "React Day", date: "Sep 20, 2025", status: "pending" },
    { id: 3, title: "Agile Scrum Master", type: "Course", provider: "Scrum.org", date: "Feb 10, 2025", status: "rejected" },
];

const STATUS_VARIANT: Record<ExternalLog["status"], "success" | "warning" | "danger"> = {
    approved: "success",
    pending: "warning",
    rejected: "danger",
};

const STATUS_LABEL: Record<ExternalLog["status"], string> = {
    approved: "Approved",
    pending: "Pending Review",
    rejected: "Rejected",
};

const LOG_COLUMNS: Column<ExternalLog>[] = [
    {
        key: "title",
        label: "Training Title",
        render: (log) => <span className="font-semibold text-white">{log.title}</span>,
        sortable: true,
        sortValue: (log) => log.title,
    },
    {
        key: "type",
        label: "Type",
        render: (log) => <span className="text-sm text-[#8899AA]">{log.type}</span>,
    },
    {
        key: "provider",
        label: "Provider",
        render: (log) => <span className="text-sm text-[#8899AA]">{log.provider}</span>,
        hideOnMobile: true,
    },
    {
        key: "date",
        label: "Completion Date",
        render: (log) => <span className="text-sm text-[#8899AA]">{log.date}</span>,
        hideOnMobile: true,
    },
    {
        key: "status",
        label: "Status",
        render: (log) => (
            <Badge variant={STATUS_VARIANT[log.status]}>{STATUS_LABEL[log.status]}</Badge>
        ),
    },
    {
        key: "actions",
        label: "",
        align: "right",
        render: () => (
            <Button variant="ghost" size="sm">View Details</Button>
        ),
    },
];

export default function ExternalTrainingScreen() {
    const [showModal, setShowModal] = useState(false);

    return (
        <Page
            title="External Learning & Certifications"
            subtitle="Log your self-paced learning, external courses, and professional certifications to earn XP and update your skill matrix"
            breadcrumbs={[{ label: "LMS", href: "/lms/dashboard" }, { label: "External" }]}
            maxWidth="1200px"
            actions={
                <Button variant="primary" icon={<Plus size={16} />} onClick={() => setShowModal(true)}>
                    Log External Training
                </Button>
            }
        >
            <Card padding="none">
                <CardHeader className="p-6 border-b border-[#1A2A3A]">
                    <CardTitle>Your Logged Learning</CardTitle>
                    <div className="relative">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#445566]" aria-hidden="true" />
                        <input
                            type="search"
                            placeholder="Search logs…"
                            aria-label="Search training logs"
                            className="bg-[#0A1420] border border-[#2A3A4A] rounded-xl pl-9 pr-4 py-2 text-white text-sm focus:outline-none focus:border-[#33E6FF]"
                        />
                    </div>
                </CardHeader>
                <div className="p-4">
                    <DataTable<ExternalLog>
                        data={EXTERNAL_LOGS}
                        columns={LOG_COLUMNS}
                        rowKey={(log) => log.id}
                        aria-label="External training logs"
                        emptyTitle="No training logs"
                        emptyDescription="Log your first external training to get started"
                    />
                </div>
            </Card>

            {/* Log Training Modal */}
            {showModal && (
                <div
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-title"
                >
                    <div className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
                        <div className="p-6 border-b border-[#1A2A3A] flex justify-between items-center sticky top-0 bg-[#0F1C2E] z-10">
                            <h2 id="modal-title" className="text-2xl font-bold text-white">Log External Training</h2>
                            <Button variant="ghost" size="sm" onClick={() => setShowModal(false)} aria-label="Close modal">
                                <XCircle size={22} aria-hidden="true" />
                            </Button>
                        </div>

                        <div className="p-6 space-y-6">
                            <div>
                                <label htmlFor="ext-title" className="block text-sm font-semibold text-white mb-2">
                                    Training/Certification Title <span className="text-[#FF4444]" aria-hidden="true">*</span>
                                </label>
                                <input
                                    id="ext-title"
                                    type="text"
                                    required
                                    className="w-full bg-[#0A1420] border border-[#2A3A4A] text-white rounded-xl p-3 focus:outline-none focus:border-purple-500 transition-colors"
                                    placeholder="e.g. AWS Solutions Architect Prof."
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="ext-provider" className="block text-sm font-semibold text-white mb-2">
                                        Provider/Institution <span className="text-[#FF4444]" aria-hidden="true">*</span>
                                    </label>
                                    <input
                                        id="ext-provider"
                                        type="text"
                                        required
                                        className="w-full bg-[#0A1420] border border-[#2A3A4A] text-white rounded-xl p-3 focus:outline-none focus:border-purple-500 transition-colors"
                                        placeholder="e.g. Amazon"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="ext-date" className="block text-sm font-semibold text-white mb-2">
                                        Completion Date <span className="text-[#FF4444]" aria-hidden="true">*</span>
                                    </label>
                                    <input
                                        id="ext-date"
                                        type="date"
                                        required
                                        className="w-full bg-[#0A1420] border border-[#2A3A4A] text-white rounded-xl p-3 focus:outline-none focus:border-purple-500 transition-colors [color-scheme:dark]"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="ext-type" className="block text-sm font-semibold text-white mb-2">Learning Type</label>
                                    <select
                                        id="ext-type"
                                        className="w-full bg-[#0A1420] border border-[#2A3A4A] text-white rounded-xl p-3 focus:outline-none focus:border-purple-500 transition-colors appearance-none"
                                    >
                                        <option>Certification</option>
                                        <option>Online Course (Coursera, Udemy)</option>
                                        <option>Conference / Seminar</option>
                                        <option>Degree / Diploma</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="ext-hours" className="block text-sm font-semibold text-white mb-2">Time Spent (Hours)</label>
                                    <input
                                        id="ext-hours"
                                        type="number"
                                        min={0}
                                        className="w-full bg-[#0A1420] border border-[#2A3A4A] text-white rounded-xl p-3 focus:outline-none focus:border-purple-500 transition-colors"
                                        placeholder="24"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-white mb-2">
                                    Proof of Completion <span className="text-[#FF4444]" aria-hidden="true">*</span>
                                </label>
                                <p className="text-xs text-[#8899AA] mb-3">Upload a certificate PDF/image OR provide a verification link.</p>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <label
                                        htmlFor="ext-file"
                                        className="flex-1 border-2 border-dashed border-[#2A3A4A] bg-[#0A1420] hover:border-purple-500 hover:bg-purple-500/5 transition-colors rounded-xl flex flex-col items-center justify-center p-6 cursor-pointer group"
                                    >
                                        <UploadCloud size={24} className="text-[#8899AA] group-hover:text-purple-400 mb-2" aria-hidden="true" />
                                        <span className="text-sm font-semibold text-white">Upload File</span>
                                        <span className="text-[10px] text-[#8899AA]">PDF, PNG, JPG (Max 5MB)</span>
                                        <input id="ext-file" type="file" accept=".pdf,.png,.jpg,.jpeg" className="sr-only" />
                                    </label>
                                    <div className="flex items-center justify-center text-xs font-bold text-[#445566] uppercase">OR</div>
                                    <div className="flex-1">
                                        <label htmlFor="ext-url" className="sr-only">Credential URL</label>
                                        <div className="relative h-full flex items-center">
                                            <LinkIcon size={16} className="absolute left-3 text-[#445566]" aria-hidden="true" />
                                            <input
                                                id="ext-url"
                                                type="url"
                                                placeholder="Paste credential URL…"
                                                className="w-full h-full min-h-[100px] bg-[#0A1420] border border-[#2A3A4A] text-white text-sm rounded-xl pl-9 pr-4 py-3 focus:outline-none focus:border-purple-500 transition-colors"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="ext-skills" className="block text-sm font-semibold text-white mb-2">Skills Associated</label>
                                <input
                                    id="ext-skills"
                                    type="text"
                                    className="w-full bg-[#0A1420] border border-[#2A3A4A] text-white rounded-xl p-3 focus:outline-none focus:border-purple-500 transition-colors"
                                    placeholder="e.g. React, Node.js, Leadership (comma separated)"
                                />
                            </div>
                        </div>

                        <div className="p-6 border-t border-[#1A2A3A] bg-[#152336] flex justify-end gap-3 sticky bottom-0">
                            <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
                            <Button variant="primary" onClick={() => setShowModal(false)}>Submit for Review</Button>
                        </div>
                    </div>
                </div>
            )}
        </Page>
    );
}
