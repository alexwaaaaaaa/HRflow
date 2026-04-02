"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
    ChevronRight,
    Info,
    MapPin,
    FileCheck,
    AlertTriangle,
    Upload,
    CheckCircle2,
    Lightbulb,
    Building2,
    Home,
    Users
} from "lucide-react";

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

    // HRA Calculation Methods
    const methodA = hraReceived * 12; // Actual HRA received
    const methodB = (isMetro ? 0.5 : 0.4) * (basicPay * 12); // 50% or 40% of Basic
    const methodC = Math.max(0, annualRent - (0.1 * (basicPay * 12))); // Rent paid - 10% of Basic

    const hraExempt = ownHouse ? 0 : Math.min(methodA, methodB, methodC);
    const hraTaxable = (hraReceived * 12) - hraExempt;
    const taxSaved = hraExempt * 0.22;

    // Optimization calculation logic
    const targetRentForMethodC = Math.ceil((19000 + 3800) / 100) * 100; // rough approx for when Method C = Method A

    return (
        <div className="min-h-screen bg-[#0A1420] text-slate-200 font-sans p-6 pb-24">
            {/* HEADER */}
            <div className="mb-8">
                <div className="flex items-center gap-2 text-sm text-slate-400 mb-2">
                    <Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
                    <ChevronRight className="w-4 h-4" />
                    <Link href="/tax/declarations" className="hover:text-white transition-colors">Declarations</Link>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-slate-200">HRA Declaration</span>
                </div>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">HRA Exemption Declaration</h1>
                        <p className="text-slate-400">House Rent Allowance tax exemption under Section 10(13A)</p>
                    </div>
                    <div className="bg-[#00E5A0]/10 border border-[#00E5A0]/20 px-4 py-3 rounded-lg flex items-center gap-3">
                        <Info className="w-5 h-5 text-[#00E5A0]" />
                        <p className="text-sm font-medium text-[#00E5A0]">HRA is your largest potential tax exemption. Declare accurately.</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">

                {/* LEFT PANEL: HRA FORM (640px equivalent) */}
                <div className="xl:col-span-7 space-y-6">

                    {/* SECTION 1: RENTAL DETAILS */}
                    <div className={`bg-[#1A2A3A] rounded-xl border overflow-hidden ${ownHouse ? 'border-white/5 opacity-70' : 'border-white/10'}`}>
                        <div className="p-5 border-b border-white/5 bg-[#0A1420]/30 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-[#0066FF]/20 text-[#0066FF] flex items-center justify-center">
                                <Home className="w-5 h-5" />
                            </div>
                            <h3 className="font-bold text-white text-lg">Rental Information</h3>
                        </div>

                        <div className="p-6 space-y-6">
                            <div>
                                <label className="block text-xs font-medium text-slate-400 mb-2">Currently renting accommodation?</label>
                                <div className="flex items-center gap-2 bg-[#0A1420] p-1 rounded-lg border border-white/5 w-fit">
                                    <button className={`px-4 py-1.5 text-xs font-bold rounded ${!ownHouse ? 'bg-[#0066FF] text-white' : 'text-slate-400 hover:text-white transition-colors'}`} onClick={() => setOwnHouse(false)}>Yes</button>
                                    <button className={`px-4 py-1.5 text-xs font-bold rounded ${ownHouse ? 'bg-[#0066FF] text-white' : 'text-slate-400 hover:text-white transition-colors'}`} onClick={() => setOwnHouse(true)}>No (Own House)</button>
                                </div>
                                {ownHouse && (
                                    <p className="mt-3 text-sm text-yellow-500 flex items-center gap-2">
                                        <AlertTriangle className="w-4 h-4" /> HRA exemption is not allowed if you are not paying rent. HRA will be fully taxable.
                                    </p>
                                )}
                            </div>

                            {!ownHouse && (
                                <>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="md:col-span-2">
                                            <label className="block text-xs font-medium text-slate-400 mb-1.5">Rental Address (Flat/Door No & Street)</label>
                                            <input type="text" defaultValue="204, Green Meadows Apts, Indiranagar 4th Cross" className="w-full bg-[#0A1420] border border-white/10 rounded-lg p-2.5 text-sm text-slate-200 focus:outline-none focus:border-[#0066FF]" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-slate-400 mb-1.5">City</label>
                                            <select
                                                value={city}
                                                onChange={(e) => setCity(e.target.value)}
                                                className="w-full bg-[#0A1420] border border-white/10 rounded-lg p-2.5 text-sm text-slate-200 focus:outline-none focus:border-[#0066FF] appearance-none"
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
                                            <label className="block text-xs font-medium text-slate-400 mb-1.5">PIN Code</label>
                                            <input type="text" defaultValue="560038" className="w-full bg-[#0A1420] border border-white/10 rounded-lg p-2.5 text-sm text-slate-200 focus:outline-none focus:border-[#0066FF]" />
                                        </div>
                                    </div>

                                    <div className="bg-[#0066FF]/5 border border-[#0066FF]/20 rounded-lg p-3 text-sm flex items-center gap-2 text-[#0066FF]">
                                        <Building2 className="w-4 h-4" />
                                        <span><b>{isMetro ? 'Metro' : 'Non-Metro'} City</b> — HRA exemption calculated at {isMetro ? '50%' : '40%'} of Basic Pay</span>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                                        <div>
                                            <label className="block text-xs font-medium text-slate-400 mb-1.5">Monthly Rent Paid</label>
                                            <div className="relative">
                                                <span className="absolute left-3 top-2.5 text-slate-400">₹</span>
                                                <input
                                                    type="number"
                                                    value={rent}
                                                    onChange={(e) => setRent(Number(e.target.value))}
                                                    className="w-full bg-[#0A1420] border border-white/10 rounded-lg pl-8 p-2.5 text-sm text-white focus:outline-none focus:border-[#0066FF]"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-slate-400 mb-1.5">Annual Rent (Auto-calculated)</label>
                                            <div className="relative">
                                                <span className="absolute left-3 top-2.5 text-slate-400">₹</span>
                                                <input type="text" value={annualRent.toLocaleString('en-IN')} readOnly className="w-full bg-[#0A1420] border border-transparent rounded-lg pl-8 p-2.5 text-sm text-slate-400" />
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* SECTION 2: LANDLORD DETAILS */}
                    {!ownHouse && (
                        <div className="bg-[#1A2A3A] rounded-xl border border-white/10 overflow-hidden">
                            <div className="p-5 border-b border-white/5 bg-[#0A1420]/30 flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-[#FFB800]/20 text-[#FFB800] flex items-center justify-center">
                                    <Users className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-white text-lg">Landlord Information</h3>
                                    {requirePAN && <p className="text-xs text-[#FFB800] font-medium mt-0.5">Mandatory as annual rent &gt; ₹1,00,000</p>}
                                </div>
                            </div>

                            <div className="p-6 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-medium text-slate-400 mb-1.5">Landlord Name</label>
                                        <input type="text" defaultValue="Ramesh Iyer" className="w-full bg-[#0A1420] border border-white/10 rounded-lg p-2.5 text-sm text-slate-200 focus:outline-none focus:border-[#0066FF]" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-slate-400 mb-1.5">Landlord PAN <span className={requirePAN ? "text-red-400" : ""}>{requirePAN ? "*" : ""}</span></label>
                                        <div className="relative">
                                            <input type="text" defaultValue="ABCPI1234D" className="w-full bg-[#0A1420] border border-white/10 rounded-lg p-2.5 text-sm font-mono tracking-wider text-slate-200 focus:outline-none focus:border-[#00E5A0]" />
                                            <div className="absolute right-3 top-3 text-[#00E5A0]">
                                                <CheckCircle2 className="w-4 h-4" />
                                            </div>
                                        </div>
                                        {requirePAN && <p className="text-[10px] text-slate-500 mt-1">Valid PAN format detected</p>}
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-xs font-medium text-slate-400 mb-1.5">Landlord Address</label>
                                        <input type="text" defaultValue="42, Indiranagar, Bangalore 560008" className="w-full bg-[#0A1420] border border-white/10 rounded-lg p-2.5 text-sm text-slate-200 focus:outline-none focus:border-[#0066FF]" />
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-white/5 grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <h4 className="text-sm font-bold text-slate-300 mb-2">Rent Agreement</h4>
                                        <div className="flex items-center justify-between p-3 border border-white/10 bg-[#0A1420] rounded-lg">
                                            <div className="flex items-center gap-2">
                                                <FileCheck className="w-4 h-4 text-[#00E5A0]" />
                                                <div>
                                                    <span className="text-sm text-slate-300 block">Agreement_24.pdf</span>
                                                    <span className="text-[10px] text-slate-500 block">Valid: 01/04/24 - 31/03/25</span>
                                                </div>
                                            </div>
                                            <span className="text-xs font-bold text-[#00E5A0]">Uploaded</span>
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-slate-300 mb-2 flex items-center justify-between">
                                            Rent Receipts
                                            <span className="text-[10px] text-yellow-500 px-1.5 py-0.5 bg-yellow-500/10 rounded">Recommended</span>
                                        </h4>
                                        <button className="w-full p-3 border border-dashed border-white/20 text-[#0066FF] hover:bg-[#0066FF]/5 rounded-lg text-sm flex items-center justify-center gap-2 transition-colors font-medium">
                                            <Upload className="w-4 h-4" /> Upload Monthly Receipts (8/12)
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* SECTION 4: MULTIPLE CITIES */}
                    <div className="bg-[#1A2A3A] rounded-xl border border-white/10 p-6 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-white/5 text-slate-400 flex items-center justify-center">
                                <MapPin className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-bold text-white text-base">Did you live in different cities this year?</h3>
                                <p className="text-xs text-slate-400">Add period-wise rent if you relocated during the FY.</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 bg-[#0A1420] p-1 rounded-lg border border-white/5 w-fit">
                            <button className={`px-4 py-1.5 text-xs font-bold rounded ${multipCity ? 'bg-[#0066FF] text-white' : 'text-slate-400 hover:text-white transition-colors'}`} onClick={() => setMultipCity(true)}>Yes</button>
                            <button className={`px-4 py-1.5 text-xs font-bold rounded ${!multipCity ? 'bg-[#0066FF] text-white' : 'text-slate-400 hover:text-white transition-colors'}`} onClick={() => setMultipCity(false)}>No</button>
                        </div>
                    </div>
                </div>

                {/* RIGHT PANEL: HRA CALCULATION (544px equivalent) */}
                <div className="xl:col-span-5 space-y-6">

                    {/* CALCULATION CARD */}
                    <div className="bg-[#1A2A3A] rounded-xl border border-white/10 overflow-hidden shadow-xl sticky top-6">
                        <div className="p-5 border-b border-white/5 bg-[#0A1420]/30">
                            <h3 className="font-bold text-white text-lg">Your HRA Exemption Calculation</h3>
                        </div>

                        <div className="p-6">
                            {/* Auto-filled stats */}
                            <div className="flex items-center justify-between bg-[#0A1420] rounded-lg p-3 text-sm border border-white/5 mb-6">
                                <div className="text-center">
                                    <p className="text-xs text-slate-500 mb-0.5">Monthly Basic</p>
                                    <p className="font-bold text-white font-mono">₹{basicPay.toLocaleString('en-IN')}</p>
                                </div>
                                <div className="text-center border-l border-white/10 pl-4">
                                    <p className="text-xs text-slate-500 mb-0.5">HRA Received</p>
                                    <p className="font-bold text-white font-mono">₹{hraReceived.toLocaleString('en-IN')}</p>
                                </div>
                                <div className="text-center border-l border-white/10 pl-4">
                                    <p className="text-xs text-slate-500 mb-0.5">Rent Paid</p>
                                    <p className="font-bold text-white font-mono">₹{rent.toLocaleString('en-IN')}</p>
                                </div>
                            </div>

                            {/* Three Method Table */}
                            <div className="space-y-1 mb-6 text-sm">
                                <div className="flex font-bold text-xs text-slate-500 mb-2 px-3">
                                    <div className="flex-1">Method</div>
                                    <div className="w-24 text-right">Monthly</div>
                                    <div className="w-24 text-right">Annual</div>
                                </div>

                                <div className={`flex items-center px-3 py-2 rounded-lg ${methodA === hraExempt && !ownHouse ? 'bg-[#00E5A0]/10 border border-[#00E5A0]/30 text-[#00E5A0]' : 'text-slate-300'}`}>
                                    <div className="flex-1 font-medium text-xs">A: Actual HRA received</div>
                                    <div className="w-24 text-right font-mono">₹{hraReceived.toLocaleString('en-IN')}</div>
                                    <div className="w-24 text-right font-mono font-bold">₹{methodA.toLocaleString('en-IN')}</div>
                                </div>

                                <div className={`flex items-center px-3 py-2 rounded-lg transition-colors ${methodB === hraExempt && !ownHouse ? 'bg-[#00E5A0]/10 border border-[#00E5A0]/30 text-[#00E5A0]' : 'text-slate-300'}`}>
                                    <div className="flex-1 font-medium text-xs">B: {isMetro ? '50%' : '40%'} of Basic Pay</div>
                                    <div className="w-24 text-right font-mono">₹{((isMetro ? 0.5 : 0.4) * basicPay).toLocaleString('en-IN')}</div>
                                    <div className="w-24 text-right font-mono font-bold">₹{methodB.toLocaleString('en-IN')}</div>
                                </div>

                                <div className={`flex items-center px-3 py-2 rounded-lg transition-colors ${methodC === hraExempt && !ownHouse ? 'bg-[#00E5A0]/10 border border-[#00E5A0]/30 text-[#00E5A0]' : 'text-slate-300'}`}>
                                    <div className="flex-1 font-medium text-xs">C: Rent paid - 10% of Basic</div>
                                    <div className="w-24 text-right font-mono">₹{Math.max(0, rent - (0.1 * basicPay)).toLocaleString('en-IN')}</div>
                                    <div className="w-24 text-right font-mono font-bold">₹{methodC.toLocaleString('en-IN')}</div>
                                </div>
                            </div>

                            {/* Results */}
                            <div className="bg-[#0A1420] rounded-xl p-4 border border-white/5 space-y-3">
                                <div className="flex justify-between items-center text-sm pb-3 border-b border-white/5">
                                    <span className="text-slate-300">HRA Exempt &nbsp;<span className="text-[10px] text-slate-500">(Minimum of A, B, C)</span></span>
                                    <span className="font-bold text-[#00E5A0] font-mono text-lg">₹{hraExempt.toLocaleString('en-IN')}<span className="text-xs text-slate-500 font-sans">/yr</span></span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-slate-400">HRA Taxable &nbsp;<span className="text-[10px] text-slate-500">(Added to gross)</span></span>
                                    <span className="font-mono text-slate-300">₹{hraTaxable.toLocaleString('en-IN')}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm pt-2">
                                    <span className="text-white font-bold">Tax Saved (22% slab)</span>
                                    <span className="font-mono text-white font-bold">₹{taxSaved.toLocaleString('en-IN')}<span className="text-xs text-slate-400 font-sans">/yr</span></span>
                                </div>
                            </div>

                            {/* AI OPTIMIZATION TIP */}
                            {!ownHouse && methodC === hraExempt && targetRentForMethodC > rent && (
                                <div className="mt-6 bg-[#0E1B26] border border-[#00E5A0]/20 rounded-lg p-4">
                                    <h4 className="flex items-center gap-2 text-[#00E5A0] font-bold text-sm mb-2">
                                        <Lightbulb className="w-4 h-4" /> HRA Optimizer Insight
                                    </h4>
                                    <p className="text-xs text-slate-300 leading-relaxed mb-3">
                                        Your limiting factor is Method C. If you pay <b>₹{(targetRentForMethodC - rent).toLocaleString('en-IN')}</b> more rent/month, you would save an additional <b>₹{((targetRentForMethodC - rent) * 12 * 0.22).toLocaleString('en-IN')}</b> in taxes per year.
                                    </p>
                                    <p className="text-xs text-slate-400 italic border-l-2 border-slate-700 pl-2">
                                        "Your current rent is optimally placed relative to your salary for tax saving."
                                    </p>
                                </div>
                            )}
                            {ownHouse && (
                                <div className="mt-6 bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-center">
                                    <AlertTriangle className="w-6 h-6 text-red-400 mx-auto mb-2" />
                                    <h4 className="font-bold text-red-400 text-sm mb-1">0% HRA Exemption Found</h4>
                                    <p className="text-xs text-slate-300 leading-relaxed">
                                        As you have declared owning/living in your own house, your entire HRA component (₹{hraReceived * 12}/yr) will be fully taxable.
                                    </p>
                                </div>
                            )}

                            {/* NOTES */}
                            <div className="mt-6 space-y-2">
                                {!isMetro && (
                                    <p className="text-[11px] text-yellow-500/80 flex items-start gap-1.5 leading-tight">
                                        <AlertTriangle className="w-3.5 h-3.5 shrink-0" /> Bangalore is classified as a non-metro city under HRA rules (40% of Basic Pay limit).
                                    </p>
                                )}
                                {requirePAN && (
                                    <p className="text-[11px] text-yellow-500/80 flex items-start gap-1.5 leading-tight">
                                        <AlertTriangle className="w-3.5 h-3.5 shrink-0" /> Annual rent exceeds ₹1,00,000. Landlord PAN is strictly mandatory for claiming exemption.
                                    </p>
                                )}
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
