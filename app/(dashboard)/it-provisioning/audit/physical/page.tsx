"use client";

import { QrCode, Smartphone, MapPin, Check, AlertCircle, RefreshCw } from "lucide-react";
import Button from "@/components/ui/Button";

export default function PhysicalAuditScreen() {
    return (
        <main className="px-8 py-6 pb-16 animate-fade-in relative max-w-5xl mx-auto min-h-screen">
            {/* page-level CSS for scanner animation */}
            <style>{`
                @keyframes hrflow-scan {
                    0%   { top: 0;    box-shadow: 0  5px 15px #00E5A0; }
                    50%  { top: calc(100% - 4px); box-shadow: 0 -5px 15px #00E5A0; }
                    100% { top: 0;    box-shadow: 0  5px 15px #00E5A0; }
                }
                .animate-scanner-line {
                    animation: hrflow-scan 3s infinite linear;
                }
            `}</style>

            {/* Page Header */}
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 border-b border-[#1A2A3A] pb-6 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white m-0 tracking-tight">Physical Asset Scanner</h1>
                    <p className="text-sm text-[#8899AA] mt-1.5">Scan QR codes or Barcodes to verify physical inventory</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#8899AA] bg-[#0D1928] border border-[#1A2A3A] px-4 py-2 rounded-xl shadow-sm">
                    <MapPin size={14} className="text-[#0066FF]" aria-hidden="true" />
                    <span>Location: <span className="text-white font-semibold">Headquarters (Floor 3)</span></span>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                {/* Left: Scanner Interface */}
                <section className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 md:p-8 flex flex-col items-center justify-center shadow-sm" aria-labelledby="scanner-heading">
                    <h2 id="scanner-heading" className="text-lg font-bold text-white mb-6 w-full">Asset Scanner</h2>

                    <figure className="w-full flex flex-col items-center" role="img" aria-label="QR Code Scanner viewfinder">
                        <div className="relative w-60 h-60 border-2 border-[#0066FF]/60 rounded-3xl overflow-hidden mb-6 flex items-center justify-center bg-black shadow-[0_0_30px_rgba(0,102,255,0.2)]">
                            {/* Simulated Camera Feed */}
                            <div
                                className="absolute inset-0 opacity-10"
                                style={{
                                    backgroundImage: 'linear-gradient(45deg, #111 25%, transparent 25%, transparent 75%, #111 75%, #111), linear-gradient(45deg, #111 25%, transparent 25%, transparent 75%, #111 75%, #111)',
                                    backgroundSize: '10px 10px',
                                    backgroundPosition: '0 0, 5px 5px'
                                }}
                                aria-hidden="true"
                            ></div>

                            {/* Scanning Line Animation */}
                            <div className="absolute left-0 w-full h-1 bg-[#00E5A0] animate-scanner-line z-10" aria-hidden="true"></div>

                            <QrCode size={48} className="text-[#334455] relative z-10" aria-hidden="true" />

                            {/* Scanner Corner Brackets */}
                            <div className="absolute top-4 left-4 w-8 h-8 border-t-4 border-l-4 border-[#00E5A0] rounded-tl-lg z-20" aria-hidden="true"></div>
                            <div className="absolute top-4 right-4 w-8 h-8 border-t-4 border-r-4 border-[#00E5A0] rounded-tr-lg z-20" aria-hidden="true"></div>
                            <div className="absolute bottom-4 left-4 w-8 h-8 border-b-4 border-l-4 border-[#00E5A0] rounded-bl-lg z-20" aria-hidden="true"></div>
                            <div className="absolute bottom-4 right-4 w-8 h-8 border-b-4 border-r-4 border-[#00E5A0] rounded-br-lg z-20" aria-hidden="true"></div>
                        </div>
                        <figcaption className="text-xs text-[#8899AA] mb-6 text-center">Point the scanner at a QR or barcode label</figcaption>
                    </figure>

                    <div className="flex items-center gap-3 w-full">
                        <Button variant="secondary" className="flex-1 h-10 hover:border-[#334455]" icon={<Smartphone size={16} aria-hidden="true" />}>Use Camera</Button>
                        <Button variant="secondary" className="flex-1 h-10 hover:border-[#334455]" icon={<QrCode size={16} aria-hidden="true" />}>Manual Entry</Button>
                    </div>
                </section>

                {/* Right: Scan Results */}
                <section className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 md:p-8 relative overflow-hidden flex flex-col shadow-sm" aria-labelledby="scan-results-heading">
                    <h2 id="scan-results-heading" className="text-lg font-bold text-white mb-6 m-0">Last Scanned Item</h2>

                    {/* Simulating a successful scan */}
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-[#00E5A0]/10 border border-[#00E5A0]/30 mb-6 relative z-10" role="status" aria-live="polite">
                        <div className="w-12 h-12 rounded-full bg-[#00E5A0] flex items-center justify-center text-[#060B14] shrink-0 shadow-[0_0_15px_rgba(0,229,160,0.3)]" aria-hidden="true">
                            <Check size={22} strokeWidth={3} />
                        </div>
                        <div className="min-w-0">
                            <div className="text-[#00E5A0] font-bold text-xs mb-1 uppercase tracking-wider">Asset Verified</div>
                            <div className="text-white font-bold text-lg truncate">Dell Ultrasharp 32&quot; Monitor</div>
                            <div className="text-xs text-[#8899AA] mt-0.5">ID: AST-042 · Assignee: John Doe</div>
                        </div>
                    </div>

                    <dl className="space-y-0 relative z-10 flex-grow mb-6">
                        {[
                            { label: "Expected Location", value: "Headquarters (Floor 3)", color: "text-white" },
                            { label: "Status", value: "In Use", color: "text-[#00E5A0]" },
                            { label: "Last Audited", value: "March 1, 2026", color: "text-white" },
                        ].map(d => (
                            <div key={d.label} className="flex justify-between items-center py-3 border-b border-[#1A2A3A] last:border-b-0">
                                <dt className="text-[#8899AA] text-sm font-medium">{d.label}</dt>
                                <dd className={`text-sm font-bold ${d.color}`}>{d.value}</dd>
                            </div>
                        ))}
                    </dl>

                    <div className="flex gap-3 relative z-10">
                        <Button
                            variant="secondary"
                            className="flex-1 h-10 text-[#FFB800] border-[#FFB800]/30 hover:bg-[#FFB800]/10 hover:border-[#FFB800]/50"
                            icon={<AlertCircle size={16} aria-hidden="true" />}
                        >
                            Flag Issue
                        </Button>
                        <Button
                            variant="primary"
                            className="flex-1 h-10 shadow-[0_0_15px_rgba(0,102,255,0.15)]"
                            icon={<RefreshCw size={16} aria-hidden="true" />}
                        >
                            Next Scan
                        </Button>
                    </div>

                    {/* Background decoration */}
                    <div className="absolute -bottom-10 -right-10 opacity-[0.02] pointer-events-none" aria-hidden="true">
                        <QrCode size={200} />
                    </div>
                </section>
            </div>
        </main>
    );
}
