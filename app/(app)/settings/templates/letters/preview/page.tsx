"use client";

import { Download, Printer } from "lucide-react";
import Page from "@/components/ui/Page";
import Button from "@/components/ui/Button";

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function LetterPreviewPage() {
    return (
        <Page
            title="Letter Preview"
            subtitle="Template: Offer Letter (Standard) — LTR-001"
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Settings", href: "/settings" },
                { label: "Templates" },
                { label: "Letters", href: "/settings/templates/letters" },
                { label: "Preview" },
            ]}
            maxWidth="900px"
            actions={
                <div className="flex gap-3">
                    <Button variant="secondary" href="/settings/templates/letters">← Back</Button>
                    <Button variant="secondary" icon={<Printer size={16} aria-hidden="true" />}>Print</Button>
                    <Button icon={<Download size={16} aria-hidden="true" />}>Download PDF</Button>
                </div>
            }
        >
            {/* A4 Letter Preview */}
            <div
                className="bg-white rounded-xl shadow-2xl p-12 md:p-16 text-gray-900 max-w-[210mm] mx-auto"
                style={{ minHeight: "297mm" }}
                aria-label="Letter preview"
            >
                <div className="flex justify-between items-start mb-12">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">KAARYA</h2>
                        <p className="text-xs text-gray-500 mt-1">Kaarya Finserve Pvt. Ltd.</p>
                    </div>
                    <div className="text-right text-xs text-gray-500">
                        <p>Level 4, Innov8 Coworking</p>
                        <p>Koramangala 1A Block</p>
                        <p>Bengaluru, 560034</p>
                    </div>
                </div>

                <p className="text-sm text-gray-500 mb-6">
                    Date: <strong className="text-gray-900 bg-yellow-100 px-1">{"{{current_date}}"}</strong>
                </p>

                <h3 className="text-lg font-bold text-gray-900 mb-6 text-center uppercase tracking-wider">Offer of Employment</h3>

                <div className="text-sm leading-relaxed text-gray-700 space-y-4">
                    <p>Dear <strong className="text-gray-900 bg-yellow-100 px-1">{"{{candidate_name}}"}</strong>,</p>
                    <p>
                        We are pleased to extend this offer of employment for the position of{" "}
                        <strong className="text-gray-900 bg-yellow-100 px-1">{"{{designation}}"}</strong> in the{" "}
                        <strong className="text-gray-900 bg-yellow-100 px-1">{"{{department}}"}</strong> department at Kaarya Finserve Pvt. Ltd., reporting to{" "}
                        <strong className="text-gray-900 bg-yellow-100 px-1">{"{{manager_name}}"}</strong>.
                    </p>
                    <p>
                        Your suggested start date is <strong className="text-gray-900 bg-yellow-100 px-1">{"{{joining_date}}"}</strong>. Your annual Cost to Company (CTC) will be{" "}
                        <strong className="text-gray-900 bg-yellow-100 px-1">{"{{ctc_amount}}"}</strong>, as per the attached Annexure A.
                    </p>
                    <p>
                        This offer is contingent upon successful completion of background verification. Please sign and return this letter by{" "}
                        <strong className="text-gray-900 bg-yellow-100 px-1">{"{{expiry_date}}"}</strong>.
                    </p>
                    <p className="pt-8">Sincerely,</p>
                    <p className="font-semibold text-gray-900">
                        _________________________<br />
                        Head of Human Resources<br />
                        Kaarya Finserve Pvt. Ltd.
                    </p>
                </div>
            </div>
        </Page>
    );
}
