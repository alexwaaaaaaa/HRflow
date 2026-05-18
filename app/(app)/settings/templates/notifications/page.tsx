"use client";

import { useState } from "react";
import { Code2, Eye } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

// ─────────────────────────────────────────────────────────────────────────────
// Types & static data
// ─────────────────────────────────────────────────────────────────────────────

type ViewMode = "editor" | "preview";

const TEMPLATE_LIST = ["Welcome Email", "Payslip Ready", "Leave Approved", "Password Reset"];

const EDITOR_CODE = `<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
  <h2>Hi {{employee.first_name}},</h2>
  <p>Your salary slip for the month of <strong>{{month_year}}</strong> has been generated.</p>
  <div style="padding: 20px; background: #f4f4f5; border-radius: 8px;">
    <p>Net Pay: <strong>₹ {{payroll.net_pay}}</strong></p>
    <p>Credited To: {{employee.bank_accountMasked}}</p>
  </div>
  <a href="{{app_url}}/payroll/my-slips">Download Payslip</a>
</div>`;

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function NotificationTemplatePage() {
    const [view, setView] = useState<ViewMode>("editor");
    const [activeTemplate, setActiveTemplate] = useState("Payslip Ready");

    return (
        <Page
            title="Notification Templates"
            subtitle="Design rich email and push templates using Handlebars syntax."
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Settings", href: "/settings" },
                { label: "Templates" },
                { label: "Notifications" },
            ]}
            maxWidth="1100px"
            actions={
                <div className="flex gap-2" role="group" aria-label="View mode">
                    <Button
                        variant={view === "editor" ? "primary" : "secondary"}
                        size="sm"
                        onClick={() => setView("editor")}
                        icon={<Code2 size={16} aria-hidden="true" />}
                    >
                        Edit Code
                    </Button>
                    <Button
                        variant={view === "preview" ? "primary" : "secondary"}
                        size="sm"
                        onClick={() => setView("preview")}
                        icon={<Eye size={16} aria-hidden="true" />}
                    >
                        Preview
                    </Button>
                </div>
            }
        >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Template Library */}
                <nav aria-label="Template library" className="col-span-1">
                    <h3 className="text-xs font-bold text-[#8899AA] uppercase tracking-wider mb-4">Template Library</h3>
                    <ul className="space-y-2">
                        {TEMPLATE_LIST.map((t) => (
                            <li key={t}>
                                <button
                                    onClick={() => setActiveTemplate(t)}
                                    aria-current={activeTemplate === t ? "page" : undefined}
                                    className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-colors border ${
                                        activeTemplate === t
                                            ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 font-bold"
                                            : "bg-[#0A1420] border-[#1A2A3A] hover:border-[#2A3A4A] text-[#CCDDEE]"
                                    }`}
                                >
                                    {t}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Editor / Preview */}
                <Card padding="none" className="col-span-1 md:col-span-3 overflow-hidden flex flex-col h-[600px]">
                    <div className="flex border-b border-[#1A2A3A] p-2 bg-[#060D1A]">
                        <div className="flex-1 px-4 py-2">
                            <label htmlFor="subject-line" className="text-xs text-[#556677] uppercase font-bold tracking-wider">Subject Line</label>
                            <input
                                id="subject-line"
                                type="text"
                                defaultValue="Your Salary Slip for {{month_year}} is Ready!"
                                className="w-full bg-transparent text-white font-medium outline-none mt-1 text-sm"
                            />
                        </div>
                    </div>

                    <div className="flex-1 overflow-hidden">
                        {view === "editor" ? (
                            <textarea
                                aria-label="Template HTML editor"
                                className="w-full h-full bg-[#060D1A] text-[#CCDDEE] p-6 font-mono text-sm resize-none outline-none"
                                defaultValue={EDITOR_CODE}
                            />
                        ) : (
                            <div className="w-full h-full bg-white p-10 overflow-auto">
                                <div style={{ fontFamily: "sans-serif", maxWidth: "600px", margin: "0 auto", color: "#333" }}>
                                    <h2>Hi Anjali,</h2>
                                    <p>Your salary slip for the month of <strong>October 2024</strong> has been generated and is ready for download.</p>
                                    <div style={{ padding: "20px", background: "#f4f4f5", borderRadius: "8px" }}>
                                        <p>Net Pay: <strong>₹ 84,500</strong></p>
                                        <p>Credited To: ********4829</p>
                                    </div>
                                    <a href="#" style={{ display: "inline-block", padding: "12px 24px", background: "#10b981", color: "white", textDecoration: "none", borderRadius: "6px", marginTop: "20px" }}>
                                        Download Payslip
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>
                </Card>
            </div>
        </Page>
    );
}
