"use client";

import { useState } from "react";
import { ArrowRight, Search, CheckCircle2 } from "lucide-react";
import Button from "@/components/ui/Button";

// --- Types & Interfaces ---
interface AssetOption {
    id: string;
    name: string;
    type: string;
    condition: "New" | "Good" | "Fair" | "Requires Repair";
}

// --- Mock Data ---
const AVAILABLE_ASSETS: AssetOption[] = [
    { id: "AST-042", name: "Dell UltraSharp 32\" 4K", type: "Monitor", condition: "New" },
    { id: "AST-089", name: "MacBook Air M2 15\"", type: "Laptop", condition: "Good" },
    { id: "AST-112", name: "Logitech MX Master 3S", type: "Accessory", condition: "New" },
];

export default function AssetAssignmentScreen() {
    const [step, setStep] = useState<1 | 2 | 3>(1);
    const [selectedAssetId, setSelectedAssetId] = useState<string>("AST-089");
    const [searchQuery, setSearchQuery] = useState("");

    const handleNextStep = () => {
        if (step < 3) setStep((prev) => (prev + 1) as 1 | 2 | 3);
    };

    return (
        <main className="px-8 py-6 pb-16 animate-fade-in relative max-w-5xl mx-auto min-h-screen">

            {/* Header */}
            <header className="text-center mb-10 mt-4">
                <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Assign Asset</h1>
                <p className="text-sm text-[#8899AA]">Allocate available hardware or software licenses to an employee</p>
            </header>

            {/* Stepper Navigation */}
            <nav aria-label="Assignment Progress" className="flex justify-center mb-12">
                <ol className="flex items-center">
                    {/* Step 1 */}
                    <li className={`flex flex-col items-center relative z-10 ${step >= 1 ? 'text-[#00E5A0]' : 'text-[#445566]'}`}>
                        <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 transition-all ${step > 1 ? 'bg-[#00E5A0]/10 border-2 border-[#00E5A0]' : step === 1 ? 'bg-[#00E5A0]/20 border-2 border-[#00E5A0] shadow-[0_0_15px_rgba(0,229,160,0.3)]' : 'bg-[#060B14] border-2 border-[#1A2A3A]'}`}
                            aria-current={step === 1 ? "step" : undefined}
                        >
                            {step > 1 ? <CheckCircle2 size={20} aria-label="Completed Step 1" /> : "1"}
                        </div>
                        <span className="text-sm font-semibold tracking-wide">Select Asset</span>
                    </li>

                    <li className={`w-24 sm:w-32 h-0.5 mx-2 sm:mx-4 transition-colors duration-300 ${step >= 2 ? 'bg-[#00E5A0]' : 'bg-[#1A2A3A]'}`} aria-hidden="true"></li>

                    {/* Step 2 */}
                    <li className={`flex flex-col items-center relative z-10 ${step >= 2 ? 'text-[#00E5A0]' : 'text-[#445566]'}`}>
                        <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 transition-all ${step > 2 ? 'bg-[#00E5A0]/10 border-2 border-[#00E5A0]' : step === 2 ? 'bg-[#00E5A0]/20 border-2 border-[#00E5A0] shadow-[0_0_15px_rgba(0,229,160,0.3)]' : 'bg-[#060B14] border-2 border-[#1A2A3A]'}`}
                            aria-current={step === 2 ? "step" : undefined}
                        >
                            {step > 2 ? <CheckCircle2 size={20} aria-label="Completed Step 2" /> : "2"}
                        </div>
                        <span className="text-sm font-semibold tracking-wide">Select Employee</span>
                    </li>

                    <li className={`w-24 sm:w-32 h-0.5 mx-2 sm:mx-4 transition-colors duration-300 ${step >= 3 ? 'bg-[#00E5A0]' : 'bg-[#1A2A3A]'}`} aria-hidden="true"></li>

                    {/* Step 3 */}
                    <li className={`flex flex-col items-center relative z-10 ${step >= 3 ? 'text-[#00E5A0]' : 'text-[#445566]'}`}>
                        <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 transition-all ${step === 3 ? 'bg-[#00E5A0]/20 border-2 border-[#00E5A0] shadow-[0_0_15px_rgba(0,229,160,0.3)]' : 'bg-[#060B14] border-2 border-[#1A2A3A]'}`}
                            aria-current={step === 3 ? "step" : undefined}
                        >
                            {step > 3 ? <CheckCircle2 size={20} aria-label="Completed Step 3" /> : "3"}
                        </div>
                        <span className="text-sm font-semibold tracking-wide">Confirm</span>
                    </li>
                </ol>
            </nav>

            {/* Step 1 Content: Asset Selection */}
            {step === 1 && (
                <section className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl shadow-sm overflow-hidden" aria-labelledby="step-title">
                    <header className="p-6 md:p-8 border-b border-[#1A2A3A] bg-[#0A1420]/50">
                        <h2 id="step-title" className="text-xl font-bold text-white m-0">Select an Available Asset</h2>
                    </header>

                    <div className="p-6 md:p-8">
                        <div className="relative mb-6">
                            <label htmlFor="search-asset" className="sr-only">Search available assets</label>
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#445566]" size={18} aria-hidden="true" />
                            <input
                                id="search-asset"
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search by ID, name, or category..."
                                className="w-full h-12 bg-[#060B14] border border-[#1A2A3A] rounded-xl pl-11 pr-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#0066FF] focus:border-[#0066FF] transition-colors placeholder-[#445566]"
                            />
                        </div>

                        {/* Asset List */}
                        <fieldset className="space-y-3">
                            <legend className="sr-only">Available Assets List</legend>
                            {AVAILABLE_ASSETS.map((asset) => {
                                const isSelected = selectedAssetId === asset.id;
                                return (
                                    <label
                                        key={asset.id}
                                        className={`flex items-center justify-between p-4 rounded-xl border transition-all cursor-pointer select-none group focus-within:ring-2 focus-within:ring-[#0066FF] ${isSelected
                                                ? 'bg-[#0066FF]/5 border-[#0066FF] shadow-[0_0_10px_rgba(0,102,255,0.1)]'
                                                : 'bg-[#060B14] border-[#1A2A3A] hover:border-[#334455] hover:bg-[#1A2A3A]/30'
                                            }`}
                                    >
                                        <div className="flex-grow flex items-center gap-4">
                                            <div className="sr-only">
                                                <input
                                                    type="radio"
                                                    name="assigned-asset"
                                                    value={asset.id}
                                                    checked={isSelected}
                                                    onChange={() => setSelectedAssetId(asset.id)}
                                                    className="sr-only"
                                                />
                                            </div>
                                            <div>
                                                <div className={`font-semibold mb-1 transition-colors ${isSelected ? 'text-[#0066FF]' : 'text-white'}`}>
                                                    {asset.name}
                                                </div>
                                                <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-[#8899AA]">
                                                    <span className="font-mono bg-[#1A2A3A] px-1.5 py-0.5 rounded text-white/80">{asset.id}</span>
                                                    <span aria-hidden="true" className="text-[#445566]">•</span>
                                                    <span>{asset.type}</span>
                                                    <span aria-hidden="true" className="text-[#445566]">•</span>
                                                    <span className="flex items-center gap-1">
                                                        Condition:
                                                        <span className={asset.condition === 'Requires Repair' ? 'text-[#FF4444]' : 'text-[#00E5A0]'}>
                                                            {asset.condition}
                                                        </span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Custom Radio Button */}
                                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${isSelected
                                                ? 'border-[#0066FF] bg-[#0066FF]'
                                                : 'border-[#445566] group-hover:border-[#8899AA]'
                                            }`}>
                                            {isSelected && <div className="w-2 h-2 bg-white rounded-full"></div>}
                                        </div>
                                    </label>
                                );
                            })}
                        </fieldset>

                        <footer className="flex justify-end mt-8 border-t border-[#1A2A3A] pt-6 gap-3">
                            <Button variant="secondary" className="px-6 h-11">Cancel</Button>
                            <Button variant="primary" className="px-6 h-11" onClick={handleNextStep}>
                                Next: Select Employee <ArrowRight size={16} className="ml-1" />
                            </Button>
                        </footer>
                    </div>
                </section>
            )}

            {/* Steps 2 & 3 would go here */}

        </main>
    );
}
