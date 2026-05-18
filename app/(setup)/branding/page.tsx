"use client";

import { useState } from "react";
import { Upload, Trash2, CheckSquare } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

export default function BrandingPage() {
    const [logo, setLogo] = useState<string | null>(null);
    const [dragging, setDragging] = useState(false);
    const [primaryColor, setPrimaryColor] = useState("#00E5A0");
    const [secondaryColor, setSecondaryColor] = useState("#0066FF");

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragging(false);
        setLogo("uploaded");
    };

    const APPLY_TO_ITEMS = [
        "Payslips and salary documents",
        "Offer letters and appointment letters",
        "Employee portal header",
        "Email notifications",
    ];

    return (
        <div className="px-16 py-12 animate-fade-in flex gap-12">
            {/* Left Column */}
            <div className="flex-1 max-w-[600px]">
                <h2 className="text-2xl font-semibold text-white m-0">Logo &amp; Branding</h2>
                <p className="text-sm text-[#8899AA] mt-1">Your logo will appear on payslips, offer letters, and the employee portal.</p>

                <div className="mt-8">
                    {/* Section 1 */}
                    <h3 className="text-base text-white mb-4">Company Logo</h3>

                    {!logo ? (
                        <div
                            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                            onDragLeave={() => setDragging(false)}
                            onDrop={handleDrop}
                            onClick={() => setLogo("uploaded")}
                            role="button"
                            tabIndex={0}
                            aria-label="Upload company logo"
                            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setLogo("uploaded"); }}
                            className="h-[180px] rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all duration-200"
                            style={{
                                background: dragging ? "rgba(0,229,160,0.05)" : "#0D1928",
                                border: `2px dashed ${dragging ? "#00E5A0" : "#1A2A3A"}`,
                            }}
                        >
                            <Upload size={40} color={dragging ? "#00E5A0" : "#8899AA"} aria-hidden="true" />
                            <div className="text-base text-white mt-3">{dragging ? "Drop to upload" : "Drag & drop your logo here"}</div>
                            <div className="text-sm text-[#0066FF] mt-1">or click to browse</div>
                            <div className="text-xs text-[#445566] mt-2">PNG, JPG, SVG • Max 2MB • Recommended 200x200px</div>
                        </div>
                    ) : (
                        <Card variant="default" padding="md" className="flex gap-6 items-center animate-slide-in-right">
                            <div className="w-[120px] h-[120px] bg-[#060B14] rounded-xl border border-[#1A2A3A] flex items-center justify-center flex-shrink-0">
                                {/* Mock Logo image */}
                                <div className="w-[60px] h-[60px] rounded-full bg-gradient-to-br from-[#00E5A0] to-[#0066FF]" aria-label="Uploaded logo preview" />
                            </div>
                            <div>
                                <div className="flex items-center gap-4 mb-2">
                                    <span className="text-sm text-white font-medium">company_logo_hd.png</span>
                                    <span className="text-xs text-[#8899AA]">1.2 MB</span>
                                </div>
                                <div className="flex gap-3 mt-4">
                                    <Button variant="danger" size="sm" onClick={() => setLogo(null)}>
                                        <Trash2 size={14} aria-hidden="true" /> Remove
                                    </Button>
                                    <Button variant="ghost" size="sm">
                                        Replace Image
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    )}

                    {/* Section 2 */}
                    <h3 className="text-base text-white mt-8 mb-4">Brand Colors</h3>
                    <div className="flex gap-8 mb-6">
                        <div>
                            <label htmlFor="primary-color-text" className="block text-xs font-medium text-[#9ca3af] mb-1.5">Primary Brand Color</label>
                            <div className="flex items-center gap-3">
                                <input
                                    type="color"
                                    value={primaryColor}
                                    onChange={(e) => setPrimaryColor(e.target.value)}
                                    className="w-10 h-10 p-0 border-0 rounded-lg cursor-pointer bg-transparent"
                                    aria-label="Primary brand color picker"
                                />
                                <input
                                    id="primary-color-text"
                                    type="text"
                                    value={primaryColor}
                                    onChange={(e) => setPrimaryColor(e.target.value)}
                                    className="h-10 px-3 rounded-lg text-sm bg-[#0D1928] border border-[#1A2A3A] text-white outline-none focus:border-[#00E5A0] uppercase w-28"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="secondary-color-text" className="block text-xs font-medium text-[#9ca3af] mb-1.5">Secondary Brand Color</label>
                            <div className="flex items-center gap-3">
                                <input
                                    type="color"
                                    value={secondaryColor}
                                    onChange={(e) => setSecondaryColor(e.target.value)}
                                    className="w-10 h-10 p-0 border-0 rounded-lg cursor-pointer bg-transparent"
                                    aria-label="Secondary brand color picker"
                                />
                                <input
                                    id="secondary-color-text"
                                    type="text"
                                    value={secondaryColor}
                                    onChange={(e) => setSecondaryColor(e.target.value)}
                                    className="h-10 px-3 rounded-lg text-sm bg-[#0D1928] border border-[#1A2A3A] text-white outline-none focus:border-[#00E5A0] uppercase w-28"
                                />
                            </div>
                        </div>
                    </div>

                    <label className="block text-xs font-medium text-[#9ca3af] mb-2">Apply to:</label>
                    <div className="flex flex-col gap-3">
                        {APPLY_TO_ITEMS.map(item => (
                            <label key={item} className="flex items-center gap-3 cursor-pointer">
                                <div
                                    className="w-[18px] h-[18px] rounded flex items-center justify-center flex-shrink-0"
                                    style={{ background: primaryColor }}
                                    aria-hidden="true"
                                >
                                    <CheckSquare size={14} color="#060B14" />
                                </div>
                                <span className="text-sm text-white">{item}</span>
                            </label>
                        ))}
                    </div>

                    {/* Section 3 */}
                    <h3 className="text-base text-white mt-8 mb-4">Favicon</h3>
                    <div className="flex items-center gap-4">
                        <div
                            className="w-20 h-20 rounded-xl bg-[#0D1928] border-2 border-dashed border-[#1A2A3A] flex items-center justify-center cursor-pointer hover:border-[#00E5A0] transition-colors"
                            role="button"
                            tabIndex={0}
                            aria-label="Upload favicon"
                        >
                            <Upload size={24} color="#8899AA" aria-hidden="true" />
                        </div>
                        <div className="text-xs text-[#445566]">Used in browser tab</div>
                    </div>
                </div>
            </div>

            {/* Right Column Sticky Preview */}
            <div className="w-[440px] flex-shrink-0">
                <div className="sticky top-12">
                    <div className="text-sm font-semibold text-[#8899AA] mb-3">Live Preview</div>

                    {/* Payslip header preview */}
                    <div className="bg-white rounded-xl p-5 relative overflow-hidden mb-2">
                        <div className="flex justify-between items-start mb-6">
                            {logo ? (
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00E5A0] to-[#0066FF]" aria-label="Company logo" />
                            ) : (
                                <div className="w-12 h-12 bg-[#E5E7EB] rounded-lg" aria-hidden="true" />
                            )}
                            <div className="text-right">
                                <div className="text-sm font-semibold text-[#111827]">TechCorp Solutions Pvt. Ltd.</div>
                                <div className="text-xs text-[#6B7280] mt-0.5">Mumbai, Maharashtra</div>
                                <div className="text-[10px] text-[#9CA3AF] mt-0.5">GSTIN: 27AAACT1234C1ZK</div>
                            </div>
                        </div>
                        <div className="w-full h-1 absolute bottom-0 left-0" style={{ background: primaryColor }} />
                    </div>
                    <div className="text-[11px] text-[#8899AA] mt-2 mb-6 text-center">Sample Payslip Header</div>

                    {/* Sidebar preview */}
                    <div className="flex gap-4">
                        <div className="w-[120px] bg-[#0A1420] rounded-lg p-3 border border-[#1A2A3A]">
                            {logo ? (
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00E5A0] to-[#0066FF] mb-4" aria-hidden="true" />
                            ) : (
                                <div className="w-8 h-8 bg-[#1A2A3A] rounded-lg mb-4" aria-hidden="true" />
                            )}
                            <div className="h-7 rounded flex items-center pl-2 mb-1" style={{ background: `${primaryColor}20` }}>
                                <div className="w-20 h-1 rounded" style={{ background: primaryColor }} />
                            </div>
                            <div className="h-7 rounded flex items-center pl-2 mb-1 bg-transparent">
                                <div className="w-15 h-1 rounded bg-[#1A2A3A]" />
                            </div>
                            <div className="h-7 rounded flex items-center pl-2 bg-transparent">
                                <div className="w-[70px] h-1 rounded bg-[#1A2A3A]" />
                            </div>
                        </div>
                        <div className="flex-1 bg-[#060B14] rounded-lg border border-[#1A2A3A]" />
                    </div>
                    <div className="text-[11px] text-[#8899AA] mt-2 text-center">Sample Sidebar</div>
                </div>
            </div>
        </div>
    );
}
