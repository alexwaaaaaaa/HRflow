"use client";

import { useState } from "react";
import { Globe } from "lucide-react";
import Input from "@/components/ui/Input";
import Card from "@/components/ui/Card";

export default function CompanyDetailsPage() {
    const [legalName, setLegalName] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [companyType, setCompanyType] = useState("");
    const [industry, setIndustry] = useState("");
    const [size, setSize] = useState("");

    return (
        <div className="px-16 py-12 animate-fade-in flex gap-8">
            {/* Left Form Area */}
            <div className="flex-1 max-w-[720px]">
                <h2 className="text-2xl font-semibold text-white m-0">Tell us about your company</h2>
                <p className="text-sm text-[#8899AA] mt-1">This information will appear on payslips, letters and compliance filings.</p>

                <div className="mt-8">
                    {/* Section 1 */}
                    <div className="flex items-center gap-4 mb-6">
                        <h3 className="text-lg text-white m-0 whitespace-nowrap">Basic Information</h3>
                        <div className="flex-1 h-px bg-[#1A2A3A]" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <Input label="Company Legal Name *" placeholder="TechCorp Solutions Private Limited" value={legalName} onChange={(e) => setLegalName(e.target.value)} />
                            <div className="text-xs text-[#445566] mt-1">As registered with MCA / ROC</div>
                        </div>
                        <div>
                            <Input label="Company Display Name *" placeholder="TechCorp Solutions" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
                            <div className="text-xs text-[#445566] mt-1">Short name for UI and emails</div>
                        </div>

                        <div>
                            <label htmlFor="company-type" className="block text-xs font-medium text-[#9ca3af] mb-1.5">Company Type *</label>
                            <select
                                id="company-type"
                                className="w-full h-10 px-3 rounded-lg text-sm bg-[#0D1928] border border-[#1A2A3A] text-white outline-none focus:border-[#00E5A0] transition-colors"
                                value={companyType}
                                onChange={(e) => setCompanyType(e.target.value)}
                            >
                                <option value="" disabled>Select Type</option>
                                <option>Private Limited Company</option>
                                <option>Public Limited Company</option>
                                <option>Partnership Firm</option>
                                <option>LLP (Limited Liability Partnership)</option>
                                <option>Proprietorship</option>
                                <option>Trust / NGO / Section 8</option>
                                <option>Government / PSU</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="industry" className="block text-xs font-medium text-[#9ca3af] mb-1.5">Industry *</label>
                            <select
                                id="industry"
                                className="w-full h-10 px-3 rounded-lg text-sm bg-[#0D1928] border border-[#1A2A3A] text-white outline-none focus:border-[#00E5A0] transition-colors"
                                value={industry}
                                onChange={(e) => setIndustry(e.target.value)}
                            >
                                <option value="" disabled>Select Industry</option>
                                <optgroup label="Technology"><option>IT Services</option><option>Software Product</option><option>Startup</option></optgroup>
                                <optgroup label="Manufacturing"><option>Automotive</option><option>Pharma</option></optgroup>
                                <optgroup label="Services"><option>Banking/Finance</option><option>Healthcare</option></optgroup>
                            </select>
                        </div>

                        <Input type="number" label="Year of Incorporation" placeholder="2015" />

                        <div>
                            <label htmlFor="company-size" className="block text-xs font-medium text-[#9ca3af] mb-1.5">Company Size *</label>
                            <select
                                id="company-size"
                                className="w-full h-10 px-3 rounded-lg text-sm bg-[#0D1928] border border-[#1A2A3A] text-white outline-none focus:border-[#00E5A0] transition-colors"
                                value={size}
                                onChange={(e) => setSize(e.target.value)}
                            >
                                <option value="" disabled>Select Size</option>
                                <option>1-10</option><option>11-50</option><option>51-200</option>
                                <option>201-500</option><option>501-1000</option><option>1000+</option>
                            </select>
                        </div>

                        <div className="col-span-2 relative">
                            <Input label="Company Website" placeholder="https://www.techcorp.in" />
                            <Globe size={18} color="#8899AA" className="absolute left-3 top-[34px]" aria-hidden="true" />
                        </div>

                        <div className="col-span-2">
                            <label htmlFor="company-description" className="block text-xs font-medium text-[#9ca3af] mb-1.5">Company Description (Optional)</label>
                            <textarea
                                id="company-description"
                                rows={3}
                                placeholder="Brief description of your company..."
                                className="w-full p-3 rounded-lg text-sm bg-[#0D1928] border border-[#1A2A3A] text-white outline-none focus:border-[#00E5A0] transition-colors resize-none"
                            />
                            <div className="text-xs text-[#445566] text-right mt-1">0 / 500</div>
                        </div>
                    </div>

                    {/* Section 2 */}
                    <div className="flex items-center gap-4 mt-8 mb-6">
                        <h3 className="text-lg text-white m-0 whitespace-nowrap">Contact Information</h3>
                        <div className="flex-1 h-px bg-[#1A2A3A]" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-12">
                        <Input label="Primary Contact Name *" placeholder="Priya Mehta" />
                        <Input label="Designation" placeholder="HR Manager" />
                        <Input label="Work Email *" type="email" placeholder="priya@techcorp.in" />
                        <div>
                            <label htmlFor="work-mobile" className="block text-xs font-medium text-[#9ca3af] mb-1.5">Work Mobile *</label>
                            <div className="flex gap-2">
                                <div className="flex items-center gap-1 px-3 rounded-lg bg-[#0D1928] border border-[#1A2A3A] text-sm text-white h-10">🇮🇳 +91</div>
                                <input
                                    id="work-mobile"
                                    type="tel"
                                    placeholder="98765 43210"
                                    className="flex-1 h-10 px-3 rounded-lg text-sm bg-[#0D1928] border border-[#1A2A3A] text-white outline-none focus:border-[#00E5A0] transition-colors"
                                />
                            </div>
                        </div>
                        <Input label="Registered Email (for compliance)" type="email" placeholder="compliance@techcorp.in" />
                        <Input label="Support Email (for employees)" type="email" placeholder="hr@techcorp.in" />
                    </div>

                </div>
            </div>

            {/* Right Sticky Preview Area */}
            <div className="w-[320px] flex-shrink-0">
                <div className="sticky top-12">
                    <div className="text-xs text-[#8899AA] mb-2">Live Preview</div>
                    <Card variant="default" padding="md">
                        <div className="w-20 h-20 rounded-full bg-[#1A2A3A] border border-dashed border-[#445566] flex items-center justify-center text-[#8899AA] text-xs mb-4">Logo</div>
                        <div className="text-lg font-semibold text-white break-words">
                            {displayName || legalName || "Company Name"}
                        </div>
                        <div className="flex flex-wrap gap-2 mt-3">
                            {industry && <span className="bg-[rgba(0,102,255,0.1)] text-[#0066FF] px-3 py-1 rounded-full text-xs">{industry}</span>}
                            {size && <span className="bg-[rgba(136,153,170,0.1)] text-[#8899AA] px-3 py-1 rounded-full text-xs">{size} employees</span>}
                            {!industry && !size && <span className="bg-[rgba(136,153,170,0.1)] text-[#8899AA] px-3 py-1 rounded-full text-xs">Industry</span>}
                        </div>
                        <div className="text-xs text-[#445566] mt-6">This is how your company appears in HRFlow</div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
