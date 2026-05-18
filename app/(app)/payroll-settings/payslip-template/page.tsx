"use client";

import { useState } from "react";
import { Save, Eye, Palette, Layout, Settings2, Smartphone } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

// migrated: immersive-ui

type Theme = "Corporate" | "Modern" | "Minimal";
type Password = "DOB" | "PAN" | "None";

interface Sections {
    header: boolean;
    employee: boolean;
    attendance: boolean;
    earnings: boolean;
    deductions: boolean;
    netPay: boolean;
    ytd: boolean;
    leave: boolean;
    qr: boolean;
    signature: boolean;
    bank: boolean;
    footer: boolean;
}

const SECTION_LABELS: Record<keyof Sections, string> = {
    header: "Company Header",
    employee: "Employee Info",
    attendance: "Attendance Summary",
    earnings: "Earnings Table",
    deductions: "Deductions Table",
    netPay: "Net Pay Box",
    ytd: "YTD Summary",
    leave: "Leave Balance",
    qr: "QR Verification",
    signature: "Digital Signature",
    bank: "Bank Details (Masked)",
    footer: "Legal Footer",
};

const THEMES: Theme[] = ["Corporate", "Modern", "Minimal"];
const PASSWORDS: { key: Password; label: string }[] = [
    { key: "DOB", label: "DDMMYYYY" },
    { key: "PAN", label: "PAN Last 4" },
    { key: "None", label: "None" },
];

export default function PayslipTemplatePage() {
    const [theme, setTheme] = useState<Theme>("Modern");
    const [sections, setSections] = useState<Sections>({
        header: true, employee: true, attendance: true, earnings: true,
        deductions: true, netPay: true, ytd: true, leave: false,
        qr: false, signature: true, bank: false, footer: true,
    });
    const [language, setLanguage] = useState("English");
    const [password, setPassword] = useState<Password>("PAN");
    const [zoom, setZoom] = useState(75);

    const toggleSection = (key: keyof Sections) => {
        setSections((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <Page
            title="Payslip Template Customization"
            subtitle="Design the perfect payslip layout with company branding and specific inclusions."
            breadcrumbs={[
                { label: "Payroll", href: "/payroll/dashboard" },
                { label: "Settings", href: "/payroll-settings" },
                { label: "Payslip Template" },
            ]}
            maxWidth="1200px"
            actions={
                <>
                    <Button variant="secondary" icon={<Smartphone size={14} aria-hidden="true" />}>Send Sample</Button>
                    <Button icon={<Save size={14} aria-hidden="true" />}>Save Template</Button>
                </>
            }
        >
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Config Panel */}
                <div className="space-y-6">
                    {/* Themes */}
                    <Card padding="lg">
                        <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                            <Palette size={14} className="text-[#00E5A0]" aria-hidden="true" /> Base Theme
                        </h3>
                        <div className="flex gap-3" role="radiogroup" aria-label="Payslip theme">
                            {THEMES.map((t) => (
                                <label key={t} className="flex-1 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="theme"
                                        value={t}
                                        checked={theme === t}
                                        onChange={() => setTheme(t)}
                                        className="sr-only"
                                    />
                                    <div className={`h-20 rounded-xl border-2 flex flex-col items-center justify-center gap-2 transition-all ${theme === t ? "border-[#00E5A0] bg-[#00E5A0]/10" : "border-[#1A2A3A] bg-[#0D1928]"}`}>
                                        <Layout size={18} className={theme === t ? "text-[#00E5A0]" : "text-[#8899AA]"} aria-hidden="true" />
                                        <span className={`text-xs font-medium ${theme === t ? "text-white" : "text-[#8899AA]"}`}>{t}</span>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </Card>

                    {/* Content Sections */}
                    <Card padding="lg">
                        <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                            <Settings2 size={14} className="text-[#FFB800]" aria-hidden="true" /> Content Sections
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                            {(Object.keys(SECTION_LABELS) as (keyof Sections)[]).map((key) => (
                                <label key={key} className="flex items-center gap-2 cursor-pointer text-xs">
                                    <input
                                        type="checkbox"
                                        checked={sections[key]}
                                        onChange={() => toggleSection(key)}
                                        className="accent-[#00E5A0] w-3.5 h-3.5"
                                    />
                                    <span className={sections[key] ? "text-white" : "text-[#8899AA]"}>{SECTION_LABELS[key]}</span>
                                </label>
                            ))}
                        </div>
                    </Card>

                    {/* Advanced */}
                    <Card padding="lg">
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="payslip-lang" className="block text-xs text-[#8899AA] mb-2 font-medium">Payslip Language</label>
                                <select
                                    id="payslip-lang"
                                    value={language}
                                    onChange={(e) => setLanguage(e.target.value)}
                                    className="w-full h-10 bg-[#0D1928] border border-[#1A2A3A] rounded-lg text-white px-3 text-sm outline-none focus:border-[#00E5A0]"
                                >
                                    <option value="English">English</option>
                                    <option value="Hindi">Hindi (Regional)</option>
                                    <option value="Bilingual">Bilingual (English + Hindi)</option>
                                </select>
                            </div>
                            <div>
                                <p className="text-xs text-[#8899AA] mb-2 font-medium">PDF Protection Password</p>
                                <div className="flex gap-2" role="radiogroup" aria-label="PDF password type">
                                    {PASSWORDS.map((p) => (
                                        <label key={p.key} className="flex-1 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="password"
                                                value={p.key}
                                                checked={password === p.key}
                                                onChange={() => setPassword(p.key)}
                                                className="sr-only"
                                            />
                                            <div className={`h-9 rounded-lg border text-xs text-center flex items-center justify-center transition-all ${password === p.key ? "border-[#0066FF] bg-[#0066FF]/10 text-[#0066FF]" : "border-[#1A2A3A] bg-[#0D1928] text-[#8899AA]"}`}>
                                                {p.label}
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Live Preview */}
                <div className="xl:col-span-2 bg-[#E8ECEF] rounded-xl overflow-hidden flex flex-col">
                    <div className="bg-white border-b border-[#DDD] px-6 py-3 flex justify-between items-center">
                        <div className="text-[#333] text-sm font-semibold flex items-center gap-2">
                            <Eye size={14} className="text-[#0066FF]" aria-hidden="true" /> Live Render Preview
                        </div>
                        <div className="flex items-center gap-2 text-xs text-[#666]">
                            Zoom:
                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={() => setZoom((z) => Math.max(50, z - 10))}
                                aria-label="Zoom out"
                            >-</Button>
                            <span className="w-10 text-center">{zoom}%</span>
                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={() => setZoom((z) => Math.min(100, z + 10))}
                                aria-label="Zoom in"
                            >+</Button>
                        </div>
                    </div>

                    <div className="flex-1 flex justify-center items-start p-8 overflow-auto">
                        <div
                            className="bg-white shadow-xl text-[#333] font-sans"
                            style={{
                                width: "210mm",
                                minHeight: "297mm",
                                padding: "20mm 15mm",
                                transform: `scale(${zoom / 100})`,
                                transformOrigin: "top center",
                                transition: "transform 0.2s ease-out",
                                fontFamily: theme === "Modern" ? "Inter, sans-serif" : "inherit",
                            }}
                            aria-label="Payslip preview"
                        >
                            {sections.header && (
                                <div className="flex justify-between border-b-2 pb-4 mb-5" style={{ borderColor: theme === "Corporate" ? "#0033A0" : "#EEE" }}>
                                    <div>
                                        <div className="text-2xl font-black" style={{ color: theme === "Corporate" ? "#0033A0" : "#111" }}>HRFLOW CORP.</div>
                                        <div className="text-[10px] text-[#666] mt-1">123 Tech Park, Mahadevapura, Bengaluru, Karnataka 560048</div>
                                    </div>
                                    <div className="text-right mt-1">
                                        <div className="text-lg font-semibold text-[#444]">PAYSLIP</div>
                                        <div className="text-xs text-[#666]">For the month of Mar 2025</div>
                                    </div>
                                </div>
                            )}

                            {sections.employee && (
                                <div className="flex gap-8 mb-5 text-xs">
                                    <div className="flex-1 grid grid-cols-2 gap-y-2 gap-x-1">
                                        <span className="text-[#666]">Employee Name:</span> <strong>Kavya Nair</strong>
                                        <span className="text-[#666]">Employee ID:</span> <strong>EMP-0091</strong>
                                        <span className="text-[#666]">Designation:</span> <strong>Senior Product Designer</strong>
                                        <span className="text-[#666]">Department:</span> <strong>Product</strong>
                                    </div>
                                    <div className="flex-1 grid grid-cols-2 gap-y-2 gap-x-1">
                                        <span className="text-[#666]">Date Of Joining:</span> <strong>12 Nov 2022</strong>
                                        <span className="text-[#666]">UAN Number:</span> <strong>10087643219</strong>
                                        <span className="text-[#666]">PF Number:</span> <strong>MH/BAN/12345/000/0091</strong>
                                    </div>
                                </div>
                            )}

                            {sections.netPay && (
                                <div className="flex justify-between items-center p-4 mb-6 rounded-lg" style={{ background: theme === "Modern" ? "#E8F5E9" : "transparent", border: theme === "Modern" ? "none" : "2px solid #333" }}>
                                    <div>
                                        <div className="text-xs text-[#555]">Net Payable (A - B)</div>
                                        <div className="text-[10px] italic text-[#666] mt-1">Rupees Eighty-Five Thousand Three Hundred and Thirty-Three Only</div>
                                    </div>
                                    <div className="text-2xl font-bold text-[#111]">₹85,333.00</div>
                                </div>
                            )}

                            {sections.footer && (
                                <div className="text-center text-[9px] text-[#999] mt-8">
                                    This is a system generated payslip and does not require a physical signature.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Page>
    );
}
