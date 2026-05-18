"use client";

import { useState } from "react";
import { ShieldCheck, Plus } from "lucide-react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

const STATES = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
    "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
    "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi (NCT)"
];

export default function CompanyTaxPage() {
    const [pan, setPan] = useState("");
    const [gst, setGst] = useState("");
    const [panVerified, setPanVerified] = useState(false);
    const [multiLocation, setMultiLocation] = useState(false);

    const handleVerifyPan = () => {
        if (pan.length === 10) {
            setTimeout(() => setPanVerified(true), 600);
        }
    };

    return (
        <div className="px-16 py-12 max-w-[880px] animate-fade-in">
            <h2 className="text-2xl font-semibold text-white m-0">Address, GST &amp; Tax Details</h2>
            <p className="text-sm text-[#8899AA] mt-1">Required for statutory filings, payslips and compliance reports.</p>

            {/* Section 1 */}
            <h3 className="text-lg text-white mt-8 mb-4">Registered Office Address</h3>
            <div className="flex flex-col gap-4">
                <Input label="Address Line 1 *" placeholder="Plot No. 45, Andheri Industrial Area" />
                <Input label="Address Line 2" placeholder="Building B, 3rd Floor" />
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Input label="City / Town *" placeholder="Mumbai" />
                    <Input label="District" placeholder="Mumbai Suburban" />
                    <div>
                        <label htmlFor="state" className="block text-xs font-medium text-[#9ca3af] mb-1.5">State *</label>
                        <select id="state" className="w-full h-10 px-3 rounded-lg text-sm bg-[#0D1928] border border-[#1A2A3A] text-white outline-none focus:border-[#00E5A0] transition-colors">
                            <option value="" disabled>Select State</option>
                            {STATES.map(s => <option key={s}>{s}</option>)}
                        </select>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input label="PIN Code *" placeholder="400053" maxLength={6} />
                    <div>
                        <label htmlFor="country" className="block text-xs font-medium text-[#9ca3af] mb-1.5">Country</label>
                        <input id="country" value="India" readOnly className="w-full h-10 px-3 rounded-lg text-sm bg-[#060B14] border border-[#1A2A3A] text-[#8899AA] outline-none" />
                    </div>
                </div>
                <div>
                    <Button variant="ghost" size="sm" className="mt-2">
                        <Plus size={16} aria-hidden="true" /> Add Corporate / Branch Office Address
                    </Button>
                </div>
            </div>

            <div className="h-px bg-[#1A2A3A] my-8" />

            {/* Section 2 */}
            <h3 className="text-lg text-white mb-4">Tax Identifiers</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                    <Input label="PAN Number *" placeholder="AAACT1234C" value={pan} onChange={(e) => setPan(e.target.value.toUpperCase())} maxLength={10} />
                    <div className="flex items-center justify-between mt-2">
                        {panVerified ? (
                            <span className="flex items-center gap-1 text-xs text-[#00E5A0] animate-fade-in">
                                <ShieldCheck size={14} aria-hidden="true" /> Valid PAN
                            </span>
                        ) : (
                            <Button variant="ghost" size="sm" onClick={handleVerifyPan} type="button">
                                Verify PAN →
                            </Button>
                        )}
                    </div>
                </div>
                <div>
                    <Input label="TAN Number" placeholder="MUMB12345A" />
                    <div className="text-xs text-[#445566] mt-1">Tax Deduction Account Number</div>
                </div>

                <div>
                    <Input label="GST Number" placeholder="27AAACT1234C1ZK" value={gst} onChange={(e) => setGst(e.target.value.toUpperCase())} maxLength={15} />
                    <div className="flex items-center justify-between mt-2">
                        {gst.length >= 2 ? <span className="text-xs text-[#8899AA]">State code: {gst.substring(0, 2)}</span> : <span />}
                        <Button variant="ghost" size="sm" type="button">Verify GST →</Button>
                    </div>
                </div>
                <Input label="MSME Registration (if any)" placeholder="UDYAM-MH-12-0123456" />

                <div className="col-span-2">
                    <label htmlFor="nature-of-business" className="block text-xs font-medium text-[#9ca3af] mb-1.5">Nature of Business (for GST)</label>
                    <select id="nature-of-business" className="w-full h-10 px-3 rounded-lg text-sm bg-[#0D1928] border border-[#1A2A3A] text-white outline-none focus:border-[#00E5A0] transition-colors">
                        <option>Manufacturer</option>
                        <option>Trader</option>
                        <option>Service Provider</option>
                        <option>Both Goods &amp; Services</option>
                    </select>
                </div>
            </div>

            <div className="h-px bg-[#1A2A3A] my-8" />

            {/* Section 3 */}
            <h3 className="text-lg text-white mb-4">Multi-location Setup</h3>
            <div className="flex items-center justify-between rounded-lg p-4 bg-[#0D1928] border border-[#1A2A3A] mb-4">
                <div>
                    <div className="text-sm font-medium text-white">Does your company have multiple offices/branches?</div>
                    <div className="text-xs text-[#8899AA]">Enable this if you have GST registrations in different states</div>
                </div>
                <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setMultiLocation(!multiLocation)}
                    className="relative w-10 h-[22px] p-0 border-0 rounded-full transition-colors"
                    style={{ background: multiLocation ? "#00E5A0" : "#1A2A3A" }}
                    aria-pressed={multiLocation}
                    aria-label="Toggle multi-location setup"
                >
                    <span
                        className="absolute top-[3px] w-4 h-4 rounded-full bg-white transition-all duration-200"
                        style={{ left: multiLocation ? 21 : 3 }}
                    />
                </Button>
            </div>

            {multiLocation && (
                <div className="animate-fade-in mb-8">
                    <Card variant="default" padding="none" className="overflow-hidden mb-3">
                        <div className="grid grid-cols-4 gap-4 px-4 py-2 bg-[#0A1420] border-b border-[#1A2A3A] text-xs font-medium text-[#8899AA] uppercase tracking-wide">
                            <div>Location Name</div><div>City</div><div>State</div><div>GST Number</div>
                        </div>
                        <div className="grid grid-cols-4 gap-4 px-4 py-3 bg-[#0D1928] text-sm text-white items-center">
                            <div>Corporate HQ</div><div>Mumbai</div><div>Maharashtra</div><div>27AAACT1234C1ZK</div>
                        </div>
                    </Card>
                    <Button variant="secondary" size="sm" className="mt-2 text-sm">
                        <Plus size={16} aria-hidden="true" /> Add Location
                    </Button>
                </div>
            )}

        </div>
    );
}
