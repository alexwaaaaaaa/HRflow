"use client";

import { Building2, CheckCircle2, Filter, Plus, RotateCcw, Search, Smartphone } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge, type BadgeVariant } from "@/components/ui/Badge";

// ─────────────────────────────────────────────────────────────────────────────
// Types & static data
// ─────────────────────────────────────────────────────────────────────────────

type TemplateStatus = "Approved" | "Pending Meta Review";

interface WaTemplate {
    id: string;
    name: string;
    category: string;
    status: TemplateStatus;
    content: string;
    language: string;
}

const TEMPLATES: WaTemplate[] = [
    { id: "WA-ONB-01", name: "Interview Reminder", category: "Recruitment", status: "Approved", content: "Hi {{candidate_name}}, friendly reminder of your interview for {{role_name}} at Kaarya tomorrow at {{time}}. Reply \"CONFIRM\" to acknowledge.", language: "en_US" },
    { id: "WA-LV-02", name: "Leave Approved Alert", category: "Leave & Attendance", status: "Approved", content: "Your leave request for {{days}} days from {{start_date}} has been approved by {{manager_name}}.", language: "en_IN" },
    { id: "WA-PAY-01", name: "Payslip Generated", category: "Payroll", status: "Pending Meta Review", content: "Hi {{first_name}}, your payslip for the month of {{month_year}} is now available. View it securely here: {{link}}.", language: "en_US" },
];

const STATUS_VARIANT: Record<TemplateStatus, BadgeVariant> = {
    Approved: "success",
    "Pending Meta Review": "warning",
};

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────────────────

function TemplateCard({ tpl }: { tpl: WaTemplate }) {
    return (
        <Card padding="md" className="hover:border-[#25D366]/30 transition-colors cursor-pointer group">
            <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                    <h3 className="text-white font-medium text-sm">{tpl.name}</h3>
                    <span className="text-xs text-[#445566] font-mono bg-[#0A1420] px-2 py-0.5 rounded border border-[#1A2A3A]">{tpl.id}</span>
                    <span className="text-[10px] text-[#8899AA] uppercase tracking-wider">{tpl.language}</span>
                </div>
                <Badge variant={STATUS_VARIANT[tpl.status]}>{tpl.status}</Badge>
            </div>
            <div className="text-sm text-[#c0c6cc] leading-relaxed relative pl-4 border-l-2 border-[#1A2A3A]">
                {tpl.content.split(/(\{\{.*?\}\})/).map((part, i) =>
                    part.startsWith("{{")
                        ? <span key={i} className="text-[#25D366] font-medium">{part}</span>
                        : part
                )}
            </div>
            <div className="mt-4 pt-3 border-t border-[#1A2A3A] flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-xs text-[#8899AA]">Category: {tpl.category}</span>
                <div className="flex gap-4 text-xs font-medium">
                    <button className="text-indigo-400 hover:text-indigo-300">View Parameters</button>
                    <button className="text-[#8899AA] hover:text-white">Duplicate</button>
                </div>
            </div>
        </Card>
    );
}

function PhonePreview() {
    return (
        <div className="flex flex-col items-center justify-center p-6 h-full">
            <h3 className="text-white font-semibold mb-6 flex items-center gap-2">
                <Smartphone size={18} className="text-[#8899AA]" aria-hidden="true" /> Device Preview
            </h3>
            <div className="w-[280px] h-[580px] bg-[#0A1420] rounded-[3rem] border-[8px] border-[#1A2A3A] shadow-2xl relative flex flex-col overflow-hidden" aria-label="WhatsApp message preview">
                <div className="absolute top-0 inset-x-0 h-6 bg-[#1A2A3A] rounded-b-xl w-32 mx-auto z-20" aria-hidden="true" />
                <div className="bg-[#075E54] h-16 w-full flex items-end px-4 pb-3 shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center" aria-hidden="true">
                            <Building2 size={16} className="text-[#075E54]" />
                        </div>
                        <div className="text-white">
                            <div className="text-sm font-semibold">Kaarya HR</div>
                            <div className="text-[10px] opacity-80 flex items-center gap-1">
                                <CheckCircle2 size={10} aria-hidden="true" /> Official Business Account
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex-1 bg-[#efeae2] p-4 flex flex-col gap-4 overflow-y-auto">
                    <div className="bg-[#dcf8c6] self-start rounded-xl rounded-tl-none p-3 shadow-sm max-w-[90%]">
                        <p className="text-[#111111] text-sm leading-relaxed">
                            Hi <strong>Aarav Patel</strong>, friendly reminder of your interview for <strong>Senior Developer</strong> at Kaarya tomorrow at <strong>10:30 AM</strong>. Reply &ldquo;CONFIRM&rdquo; to acknowledge.
                        </p>
                        <div className="text-[9px] text-gray-500 text-right mt-1">10:42 AM</div>
                    </div>
                    <div className="bg-white self-end rounded-xl rounded-tr-none p-3 shadow-sm max-w-[80%]">
                        <p className="text-[#111111] text-sm">CONFIRM</p>
                        <div className="text-[9px] text-gray-500 text-right mt-1">10:45 AM</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function WhatsAppTemplateSettingsPage() {
    return (
        <Page
            title="WhatsApp Templates"
            subtitle="Manage transactional WhatsApp Business API templates. All structural changes must be approved by Meta before they can be sent to users."
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Settings", href: "/settings" },
                { label: "Templates" },
                { label: "WhatsApp" },
            ]}
            maxWidth="1300px"
            actions={
                <div className="flex gap-3">








                    <Button variant="secondary" icon={<RotateCcw size={16} aria-hidden="true" />}>Sync with Meta</Button>
                    <Button icon={<Plus size={16} aria-hidden="true" />}>New Template</Button>
                </div>
            }
        >
            <div className="space-y-6">
                {/* Provider Context */}
                <Card padding="md">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <div className="bg-[#0A1420] border border-[#2A3A4A] p-2 rounded-lg text-[#8899AA]">
                                <Building2 size={20} aria-hidden="true" />
                            </div>
                            <div>
                                <div className="text-white font-medium text-sm">WABA ID: 105829471928471</div>
                                <div className="text-xs text-[#8899AA] flex items-center gap-2 mt-0.5">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" /> Connected to Kaarya HR (Phone: +91 98765 43210)
                                </div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-sm font-bold text-white">Quality Rating: High</div>
                            <div className="text-xs text-[#8899AA] mt-0.5">Tier 2 (10k msgs/day)</div>
                        </div>
                    </div>
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Templates List */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="flex gap-3">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8899AA]" size={14} aria-hidden="true" />
                                <input
                                    type="search"
                                    placeholder="Search message content…"
                                    aria-label="Search WhatsApp templates"
                                    className="w-full pl-9 pr-3 py-2 bg-[#060D1A] border border-[#1A2A3A] rounded-lg text-sm text-white focus:border-[#25D366] outline-none"
                                />
                            </div>
                            <Button variant="secondary" size="sm" icon={<Filter size={14} aria-hidden="true" />}>All Categories</Button>
                        </div>
                        {TEMPLATES.map((tpl) => (
                            <TemplateCard key={tpl.id} tpl={tpl} />
                        ))}
                    </div>

                    {/* Mobile Preview */}
                    <Card padding="none" className="lg:col-span-1">
                        <PhonePreview />
                    </Card>
                </div>
            </div>
        

        

        

            
        </Page>
    );
}
