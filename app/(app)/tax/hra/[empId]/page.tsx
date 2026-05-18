"use client";

import React, { useState } from "react";
import { Plus, Calculator, Save } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function HRADeclaration() {
    const [metro, setMetro] = useState(true);
    const [rent, setRent] = useState("25,000");
    const [landlordName, setLandlordName] = useState("Mr. Vivek Deshmukh");
    const [landlordPan, setLandlordPan] = useState("XYZA9876Q");
    const [landlordAddress, setLandlordAddress] = useState("B-10, Vasant Vihar, Pune");

    // Calculation — byte-identical to pre-migration
    const basicSalary = 600000;
    const hraReceived = 300000;
    const annualRent = parseInt(rent.replace(/,/g, "")) * 12 || 0;

    const condition1 = hraReceived;
    const condition2 = annualRent - 0.1 * basicSalary;
    const condition3 = metro ? 0.5 * basicSalary : 0.4 * basicSalary;

    const exemptedHRA = Math.max(0, Math.min(condition1, condition2, condition3));

    return (
        <Page
            title="House Rent Allowance (HRA)"
            subtitle="Declare rent paid to claim tax exemption"
            breadcrumbs={[
                { label: "Tax", href: "/tax/declaration/EMP-0848" },
                { label: "HRA Declaration" },
            ]}
            maxWidth="1000px"
        >
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8">
                {/* Form Area */}
                <div className="flex flex-col gap-6">
                    <Card padding="lg">
                        <h3 className="text-base font-semibold text-white mb-5">Rental Details — Apr 2024 to Mar 2025</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                            <div>
                                <label htmlFor="monthly-rent" className="block text-sm text-[#8899AA] mb-2">
                                    Monthly Rent Paid <span className="text-red-400">*</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8899AA] text-sm">₹</span>
                                    <input
                                        id="monthly-rent"
                                        type="text"
                                        value={rent}
                                        onChange={(e) => setRent(e.target.value)}
                                        className="w-full h-11 bg-[#060B14] border border-[#1A2A3A] rounded-lg text-white text-sm pl-7 pr-3 outline-none focus:border-[#00E5A0]"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm text-[#8899AA] mb-2">
                                    City Type <span className="text-red-400">*</span>
                                </label>
                                <div className="flex bg-[#060B14] border border-[#1A2A3A] rounded-lg overflow-hidden h-11">
                                    <button
                                        type="button"
                                        onClick={() => setMetro(true)}
                                        className={`flex-1 text-sm border-none transition-colors ${
                                            metro ? "bg-[#1A2A3A] text-white font-semibold" : "text-[#8899AA] hover:text-white"
                                        }`}
                                    >
                                        Metro
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setMetro(false)}
                                        className={`flex-1 text-sm border-none transition-colors ${
                                            !metro ? "bg-[#1A2A3A] text-white font-semibold" : "text-[#8899AA] hover:text-white"
                                        }`}
                                    >
                                        Non-Metro
                                    </button>
                                </div>
                                <p className="text-xs text-[#8899AA] mt-1">Metro = Delhi, Mumbai, Kolkata, Chennai</p>
                            </div>
                        </div>

                        {annualRent > 100000 && (
                            <div className="bg-[#FFB800]/5 border border-[#FFB800]/20 rounded-lg p-4 mb-5">
                                <p className="text-xs text-[#FFB800] font-semibold mb-3">
                                    ⚠️ PAN of Landlord is mandatory as annual rent exceeds ₹1,00,000
                                </p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="landlord-name" className="block text-xs text-[#8899AA] mb-1.5">
                                            Landlord Name
                                        </label>
                                        <input
                                            id="landlord-name"
                                            type="text"
                                            value={landlordName}
                                            onChange={(e) => setLandlordName(e.target.value)}
                                            className="w-full h-10 bg-[#0D1928] border border-[#1A2A3A] rounded-lg text-white text-sm px-3 outline-none focus:border-[#00E5A0]"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="landlord-pan" className="block text-xs text-[#8899AA] mb-1.5">
                                            Landlord PAN
                                        </label>
                                        <input
                                            id="landlord-pan"
                                            type="text"
                                            value={landlordPan}
                                            onChange={(e) => setLandlordPan(e.target.value.toUpperCase())}
                                            maxLength={10}
                                            className="w-full h-10 bg-[#0D1928] border border-[#1A2A3A] rounded-lg text-white text-sm px-3 outline-none focus:border-[#00E5A0] uppercase"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label htmlFor="landlord-address" className="block text-xs text-[#8899AA] mb-1.5">
                                            Landlord Address
                                        </label>
                                        <input
                                            id="landlord-address"
                                            type="text"
                                            value={landlordAddress}
                                            onChange={(e) => setLandlordAddress(e.target.value)}
                                            className="w-full h-10 bg-[#0D1928] border border-[#1A2A3A] rounded-lg text-white text-sm px-3 outline-none focus:border-[#00E5A0]"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        <Button variant="outline" className="w-full" icon={<Plus size={16} />}>
                            Add Multiple Rental Periods (e.g. rent changed midway)
                        </Button>
                    </Card>
                </div>

                {/* Sticky Summary */}
                <div className="lg:sticky lg:top-6 lg:self-start">
                    <Card padding="lg">
                        <div className="flex items-center gap-2 mb-5">
                            <Calculator size={18} className="text-[#00E5A0]" aria-hidden="true" />
                            <h3 className="text-base font-semibold text-white">HRA Exemption Calc</h3>
                        </div>

                        <p className="text-xs text-[#8899AA] mb-4 leading-relaxed">
                            Under section 10(13A), exemption is least of the following:
                        </p>

                        <div className="flex flex-col gap-3 mb-5 border-b border-[#1A2A3A] pb-5">
                            <div className="flex justify-between text-sm">
                                <span className="text-[#8899AA]">1. Actual HRA Received</span>
                                <span className="text-white">₹{condition1.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-[#8899AA]">2. Rent Paid - 10% Basic</span>
                                <span className={condition2 <= 0 ? "text-red-400" : "text-white"}>
                                    {condition2 <= 0 ? "₹0" : `₹${condition2.toLocaleString()}`}
                                </span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-[#8899AA]">3. {metro ? "50%" : "40%"} of Basic Salary</span>
                                <span className="text-white">₹{condition3.toLocaleString()}</span>
                            </div>
                        </div>

                        <div className="flex justify-between items-center mb-6">
                            <span className="text-sm font-semibold text-white">Exempted HRA</span>
                            <span className="text-xl font-bold text-[#00E5A0]">₹{exemptedHRA.toLocaleString()}</span>
                        </div>

                        <Button className="w-full" icon={<Save size={16} />}>
                            Save HRA Declaration
                        </Button>
                    </Card>
                </div>
            </div>
        </Page>
    );
}
