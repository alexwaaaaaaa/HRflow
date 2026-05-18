"use client";

import React, { useState } from "react";
import {
    Info,
    MapPin,
    FileCheck,
    AlertTriangle,
    Upload,
    CheckCircle2,
    Lightbulb,
    Building2,
    Home,
    Users,
} from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export default function HRAPage() {
    const [rent, setRent] = useState(18000);
    const [city, setCity] = useState("Bangalore");
    const [ownHouse, setOwnHouse] = useState(false);
    const [multipCity, setMultipCity] = useState(false);

    const basicPay = 38000;
    const hraReceived = 19000;

    const isMetro = ["Mumbai", "Delhi", "Kolkata", "Chennai"].includes(city);
    const annualRent = rent * 12;
    const requirePAN = annualRent > 100000;

    // HRA Calculation Methods — byte-identical to pre-migration
    const methodA = hraReceived * 12;
    const methodB = (isMetro ? 0.5 : 0.4) * (basicPay * 12);
    const methodC = Math.max(0, annualRent - 0.1 * (basicPay * 12));

    const hraExempt = ownHouse ? 0 : Math.min(methodA, methodB, methodC);
    const hraTaxable = hraReceived * 12 - hraExempt;
    const taxSaved = hraExempt * 0.22;

    const targetRentForMethodC = Math.ceil((19000 + 3800) / 100) * 100;

    return (
        <Page
            title="HRA Exemption Declaration"
            subtitle="House Rent Allowance tax exemption under Section 10(13A)"
            breadcrumbs={[
                { label: "Tax", href: "/tax/declarations" },
                { label: "HRA Declaration" },
            ]}
            maxWidth="1400px"
            actions={
                <Card variant="bare" className="border border-[#00E5A0]/20 bg-[#00E5A0]/10 px-4 py-3 rounded-lg flex items-center gap-3">
                    <Info className="w-5 h-5 text-[#00E5A0]" aria-hidden="true" />
                    <p className="text-sm font-medium text-[#00E5A0]">HRA is your largest potential tax exemption. Declare accurately.</p>
                </Card>
            }
        >
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
                {/* Left Panel */}
                <div className="xl:col-span-7 space-y-6">
                    {/* Rental Information */}
                    <Card padding="none" className={ownHouse ? "opacity-70" : ""}>
                        <div className="p-5 border-b border-[#1A2A3A] bg-[#0A1420]/30 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-[#0066FF]/20 text-[#0066FF] flex items-center justify-center">
                                <Home className="w-5 h-5" aria-hidden="true" />
                            </div>
                            <h3 className="font-bold text-white text-lg">Rental Information</h3>
                        </div>
                        <div className="p-6 space-y-6">
                            <div>
                                <label className="block text-xs font-medium text-[#8899AA] mb-2">
                                    Currently renting accommodation?
                                </label>
                                <div className="flex items-center gap-2 bg-[#0A1420] p-1 rounded-lg border border-white/5 w-fit">
                                    <Button
                                        variant={!ownHouse ? "primary" : "ghost"}
                                        size="sm"
                                        onClick={() => setOwnHouse(false)}
                                    >
                                        Yes
                                    </Button>
                                    <Button
                                        variant={ownHouse ? "primary" : "ghost"}
                                        size="sm"
                                        onClick={() => setOwnHouse(true)}
                                    >
                                        No (Own House)
                                    </Button>
                                </div>
                                {ownHouse && (
                                    <p className="mt-3 text-sm text-[#FFB800] flex items-center gap-2">
                                        <AlertTriangle className="w-4 h-4" aria-hidden="true" />
                                        HRA exemption is not allowed if you are not paying rent. HRA will be fully taxable.
                                    </p>
                                )}
                            </div>

                            {!ownHouse && (
                                <>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="md:col-span-2">
                                            <label htmlFor="rental-address" className="block text-xs font-medium text-[#8899AA] mb-1.5">
                                                Rental Address (Flat/Door No & Street)
                                            </label>
                                            <input
                                                id="rental-address"
                                                type="text"
                                                defaultValue="204, Green Meadows Apts, Indiranagar 4th Cross"
                                                className="w-full bg-[#0A1420] border border-white/10 rounded-lg p-2.5 text-sm text-[#c8d8e8] focus:outline-none focus:border-[#0066FF]"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="city-select" className="block text-xs font-medium text-[#8899AA] mb-1.5">
                                                City
                                            </label>
                                            <select
                                                id="city-select"
                                                value={city}
                                                onChange={(e) => setCity(e.target.value)}
                                                className="w-full bg-[#0A1420] border border-white/10 rounded-lg p-2.5 text-sm text-[#c8d8e8] focus:outline-none focus:border-[#0066FF] appearance-none"
                                            >
                                                <option>Bangalore</option>
                                                <option>Mumbai</option>
                                                <option>Delhi</option>
                                                <option>Kolkata</option>
                                                <option>Chennai</option>
                                                <option>Hyderabad</option>
                                                <option>Pune</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor="pin-code" className="block text-xs font-medium text-[#8899AA] mb-1.5">
                                                PIN Code
                                            </label>
                                            <input
                                                id="pin-code"
                                                type="text"
                                                defaultValue="560038"
                                                className="w-full bg-[#0A1420] border border-white/10 rounded-lg p-2.5 text-sm text-[#c8d8e8] focus:outline-none focus:border-[#0066FF]"
                                            />
                                        </div>
                                    </div>

                                    <Card variant="bare" className="bg-[#0066FF]/5 border border-[#0066FF]/20 rounded-lg p-3 text-sm flex items-center gap-2 text-[#0066FF]">
                                        <Building2 className="w-4 h-4" aria-hidden="true" />
                                        <span>
                                            <b>{isMetro ? "Metro" : "Non-Metro"} City</b> — HRA exemption calculated at{" "}
                                            {isMetro ? "50%" : "40%"} of Basic Pay
                                        </span>
                                    </Card>

                                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                                        <div>
                                            <label htmlFor="monthly-rent" className="block text-xs font-medium text-[#8899AA] mb-1.5">
                                                Monthly Rent Paid
                                            </label>
                                            <div className="relative">
                                                <span className="absolute left-3 top-2.5 text-[#8899AA]">₹</span>
                                                <input
                                                    id="monthly-rent"
                                                    type="number"
                                                    value={rent}
                                                    onChange={(e) => setRent(Number(e.target.value))}
                                                    className="w-full bg-[#0A1420] border border-white/10 rounded-lg pl-8 p-2.5 text-sm text-white focus:outline-none focus:border-[#0066FF]"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label htmlFor="annual-rent" className="block text-xs font-medium text-[#8899AA] mb-1.5">
                                                Annual Rent (Auto-calculated)
                                            </label>
                                            <div className="relative">
                                                <span className="absolute left-3 top-2.5 text-[#8899AA]">₹</span>
                                                <input
                                                    id="annual-rent"
                                                    type="text"
                                                    value={annualRent.toLocaleString("en-IN")}
                                                    readOnly
                                                    className="w-full bg-[#0A1420] border border-transparent rounded-lg pl-8 p-2.5 text-sm text-[#445566]"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </Card>

                    {/* Landlord Details */}
                    {!ownHouse && (
                        <Card padding="none">
                            <div className="p-5 border-b border-[#1A2A3A] bg-[#0A1420]/30 flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-[#FFB800]/20 text-[#FFB800] flex items-center justify-center">
                                    <Users className="w-5 h-5" aria-hidden="true" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-white text-lg">Landlord Information</h3>
                                    {requirePAN && (
                                        <p className="text-xs text-[#FFB800] font-medium mt-0.5">
                                            Mandatory as annual rent &gt; ₹1,00,000
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="p-6 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="landlord-name" className="block text-xs font-medium text-[#8899AA] mb-1.5">
                                            Landlord Name
                                        </label>
                                        <input
                                            id="landlord-name"
                                            type="text"
                                            defaultValue="Ramesh Iyer"
                                            className="w-full bg-[#0A1420] border border-white/10 rounded-lg p-2.5 text-sm text-[#c8d8e8] focus:outline-none focus:border-[#0066FF]"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="landlord-pan" className="block text-xs font-medium text-[#8899AA] mb-1.5">
                                            Landlord PAN{" "}
                                            {requirePAN && <span className="text-red-400">*</span>}
                                        </label>
                                        <div className="relative">
                                            <input
                                                id="landlord-pan"
                                                type="text"
                                                defaultValue="ABCPI1234D"
                                                className="w-full bg-[#0A1420] border border-white/10 rounded-lg p-2.5 text-sm font-mono tracking-wider text-[#c8d8e8] focus:outline-none focus:border-[#00E5A0]"
                                            />
                                            <div className="absolute right-3 top-3 text-[#00E5A0]">
                                                <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                                            </div>
                                        </div>
                                        {requirePAN && (
                                            <p className="text-[10px] text-[#445566] mt-1">Valid PAN format detected</p>
                                        )}
                                    </div>
                                    <div className="md:col-span-2">
                                        <label htmlFor="landlord-address" className="block text-xs font-medium text-[#8899AA] mb-1.5">
                                            Landlord Address
                                        </label>
                                        <input
                                            id="landlord-address"
                                            type="text"
                                            defaultValue="42, Indiranagar, Bangalore 560008"
                                            className="w-full bg-[#0A1420] border border-white/10 rounded-lg p-2.5 text-sm text-[#c8d8e8] focus:outline-none focus:border-[#0066FF]"
                                        />
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-white/5 grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <h4 className="text-sm font-bold text-[#c8d8e8] mb-2">Rent Agreement</h4>
                                        <div className="flex items-center justify-between p-3 border border-white/10 bg-[#0A1420] rounded-lg">
                                            <div className="flex items-center gap-2">
                                                <FileCheck className="w-4 h-4 text-[#00E5A0]" aria-hidden="true" />
                                                <div>
                                                    <span className="text-sm text-[#c8d8e8] block">Agreement_24.pdf</span>
                                                    <span className="text-[10px] text-[#445566] block">Valid: 01/04/24 - 31/03/25</span>
                                                </div>
                                            </div>
                                            <span className="text-xs font-bold text-[#00E5A0]">Uploaded</span>
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-[#c8d8e8] mb-2 flex items-center justify-between">
                                            Rent Receipts
                                            <Badge variant="warning">Recommended</Badge>
                                        </h4>
                                        <Button variant="secondary" className="w-full" icon={<Upload className="w-4 h-4" />}>
                                            Upload Monthly Receipts (8/12)
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    )}

                    {/* Multiple Cities */}
                    <Card padding="lg" className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-white/5 text-[#445566] flex items-center justify-center">
                                <MapPin className="w-5 h-5" aria-hidden="true" />
                            </div>
                            <div>
                                <h3 className="font-bold text-white text-base">Did you live in different cities this year?</h3>
                                <p className="text-xs text-[#445566]">Add period-wise rent if you relocated during the FY.</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 bg-[#0A1420] p-1 rounded-lg border border-white/5 w-fit">
                            <Button
                                variant={multipCity ? "primary" : "ghost"}
                                size="sm"
                                onClick={() => setMultipCity(true)}
                            >
                                Yes
                            </Button>
                            <Button
                                variant={!multipCity ? "primary" : "ghost"}
                                size="sm"
                                onClick={() => setMultipCity(false)}
                            >
                                No
                            </Button>
                        </div>
                    </Card>
                </div>

                {/* Right Panel: HRA Calculation */}
                <div className="xl:col-span-5">
                    <Card padding="lg" className="lg:sticky lg:top-6">
                        <h3 className="font-bold text-white text-lg mb-4">Your HRA Exemption Calculation</h3>

                        {/* Auto-filled stats */}
                        <div className="flex items-center justify-between bg-[#0A1420] rounded-lg p-3 text-sm border border-white/5 mb-6">
                            <div className="text-center">
                                <p className="text-xs text-[#445566] mb-0.5">Monthly Basic</p>
                                <p className="font-bold text-white font-mono">₹{basicPay.toLocaleString("en-IN")}</p>
                            </div>
                            <div className="text-center border-l border-white/10 pl-4">
                                <p className="text-xs text-[#445566] mb-0.5">HRA Received</p>
                                <p className="font-bold text-white font-mono">₹{hraReceived.toLocaleString("en-IN")}</p>
                            </div>
                            <div className="text-center border-l border-white/10 pl-4">
                                <p className="text-xs text-[#445566] mb-0.5">Rent Paid</p>
                                <p className="font-bold text-white font-mono">₹{rent.toLocaleString("en-IN")}</p>
                            </div>
                        </div>

                        {/* Three Method Table */}
                        <div className="space-y-1 mb-6 text-sm">
                            <div className="flex font-bold text-xs text-[#445566] mb-2 px-3">
                                <div className="flex-1">Method</div>
                                <div className="w-24 text-right">Monthly</div>
                                <div className="w-24 text-right">Annual</div>
                            </div>

                            {[
                                {
                                    label: "A: Actual HRA received",
                                    monthly: hraReceived,
                                    annual: methodA,
                                    isMin: methodA === hraExempt && !ownHouse,
                                },
                                {
                                    label: `B: ${isMetro ? "50%" : "40%"} of Basic Pay`,
                                    monthly: (isMetro ? 0.5 : 0.4) * basicPay,
                                    annual: methodB,
                                    isMin: methodB === hraExempt && !ownHouse,
                                },
                                {
                                    label: "C: Rent paid - 10% of Basic",
                                    monthly: Math.max(0, rent - 0.1 * basicPay),
                                    annual: methodC,
                                    isMin: methodC === hraExempt && !ownHouse,
                                },
                            ].map((row) => (
                                <div
                                    key={row.label}
                                    className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
                                        row.isMin
                                            ? "bg-[#00E5A0]/10 border border-[#00E5A0]/30 text-[#00E5A0]"
                                            : "text-[#c8d8e8]"
                                    }`}
                                >
                                    <div className="flex-1 font-medium text-xs">{row.label}</div>
                                    <div className="w-24 text-right font-mono">₹{row.monthly.toLocaleString("en-IN")}</div>
                                    <div className="w-24 text-right font-mono font-bold">₹{row.annual.toLocaleString("en-IN")}</div>
                                </div>
                            ))}
                        </div>

                        {/* Results */}
                        <div className="bg-[#0A1420] rounded-xl p-4 border border-white/5 space-y-3">
                            <div className="flex justify-between items-center text-sm pb-3 border-b border-white/5">
                                <span className="text-[#c8d8e8]">
                                    HRA Exempt{" "}
                                    <span className="text-[10px] text-[#445566]">(Minimum of A, B, C)</span>
                                </span>
                                <span className="font-bold text-[#00E5A0] font-mono text-lg">
                                    ₹{hraExempt.toLocaleString("en-IN")}
                                    <span className="text-xs text-[#445566] font-sans">/yr</span>
                                </span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-[#445566]">
                                    HRA Taxable{" "}
                                    <span className="text-[10px]">(Added to gross)</span>
                                </span>
                                <span className="font-mono text-[#c8d8e8]">₹{hraTaxable.toLocaleString("en-IN")}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm pt-2">
                                <span className="text-white font-bold">Tax Saved (22% slab)</span>
                                <span className="font-mono text-white font-bold">
                                    ₹{taxSaved.toLocaleString("en-IN")}
                                    <span className="text-xs text-[#445566] font-sans">/yr</span>
                                </span>
                            </div>
                        </div>

                        {/* AI Optimization Tip */}
                        {!ownHouse && methodC === hraExempt && targetRentForMethodC > rent && (
                            <Card variant="bare" className="mt-6 bg-[#0E1B26] border border-[#00E5A0]/20 rounded-lg p-4">
                                <h4 className="flex items-center gap-2 text-[#00E5A0] font-bold text-sm mb-2">
                                    <Lightbulb className="w-4 h-4" aria-hidden="true" /> HRA Optimizer Insight
                                </h4>
                                <p className="text-xs text-[#c8d8e8] leading-relaxed mb-3">
                                    Your limiting factor is Method C. If you pay{" "}
                                    <b>₹{(targetRentForMethodC - rent).toLocaleString("en-IN")}</b> more rent/month, you would save an
                                    additional{" "}
                                    <b>₹{((targetRentForMethodC - rent) * 12 * 0.22).toLocaleString("en-IN")}</b> in taxes per year.
                                </p>
                            </Card>
                        )}

                        {ownHouse && (
                            <Card variant="bare" className="mt-6 bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-center">
                                <AlertTriangle className="w-6 h-6 text-red-400 mx-auto mb-2" aria-hidden="true" />
                                <h4 className="font-bold text-red-400 text-sm mb-1">0% HRA Exemption Found</h4>
                                <p className="text-xs text-[#c8d8e8] leading-relaxed">
                                    As you have declared owning/living in your own house, your entire HRA component (₹
                                    {(hraReceived * 12).toLocaleString("en-IN")}/yr) will be fully taxable.
                                </p>
                            </Card>
                        )}

                        {/* Notes */}
                        <div className="mt-6 space-y-2">
                            {!isMetro && (
                                <p className="text-[11px] text-[#FFB800]/80 flex items-start gap-1.5 leading-tight">
                                    <AlertTriangle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                                    Bangalore is classified as a non-metro city under HRA rules (40% of Basic Pay limit).
                                </p>
                            )}
                            {requirePAN && (
                                <p className="text-[11px] text-[#FFB800]/80 flex items-start gap-1.5 leading-tight">
                                    <AlertTriangle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                                    Annual rent exceeds ₹1,00,000. Landlord PAN is strictly mandatory for claiming exemption.
                                </p>
                            )}
                        </div>

                        <Button className="w-full mt-6">Save HRA Declaration</Button>
                    </Card>
                </div>
            </div>
        </Page>
    );
}
