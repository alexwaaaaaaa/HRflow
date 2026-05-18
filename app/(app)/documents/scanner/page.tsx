"use client";

import Page from "@/components/ui/Page";
import Image from "next/image";

import React, { useState } from 'react';
import {
    ScanLine, Camera, UploadCloud, RefreshCw, Layers, Crop, CheckCircle2, FileText
} from 'lucide-react';

export default function DocumentScannerScreen() {
    const [scanState, setScanState] = useState('idle'); // idle, scanning, optimizing, review

    const handleCameraClick = () => {
        setScanState('scanning');
        setTimeout(() => setScanState('optimizing'), 1500);
        setTimeout(() => setScanState('review'), 3000);
    };

    return (
        <Page
            title="Mobile/Web Document Scanner"
            subtitle="Auto-crop, enhance, and digitize physical documents using device camera."
            breadcrumbs={[{ label: "Documents", href: "/documents" }, { label: "Scanner" }]}
            maxWidth="900px"
        >

        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200 flex flex-col items-center">

            <div className="max-w-4xl w-full text-center mb-8">
                <h1 className="text-2xl font-bold text-white mb-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <ScanLine className="text-amber-500" size={32} />
                    Mobile/Web Document Scanner
                </h1>
                <p className="text-sm text-[#8899AA]">Auto-crop, enhance, and digitize physical documents using device camera.</p>
            </div>

            <div className="w-full max-w-2xl bg-[#0A1420] border border-[#1A2A3A] rounded-2xl shadow-2xl overflow-hidden flex flex-col">

                {/* Camera Viewport Area */}
                <div className="bg-black relative aspect-[3/4] sm:aspect-video w-full flex items-center justify-center overflow-hidden">
                    {scanState === 'idle' && (
                        <div className="text-center p-8 z-10">
                            <div className="w-20 h-20 rounded-full bg-amber-500/20 border border-amber-500/50 flex items-center justify-center text-amber-500 mx-auto mb-4 animate-pulse">
                                <Camera size={32} />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">Camera Access Required</h3>
                            <p className="text-sm text-[#8899AA] max-w-xs mx-auto mb-6">Position the physical document clearly within the frame on a contrasting background.</p>
                            <button
                                onClick={handleCameraClick}
                                className="px-6 py-2.5 bg-amber-500 text-[#060B14] font-bold rounded-lg hover:bg-amber-400 transition-colors shadow-[0_0_20px_rgba(245,158,11,0.3)]">
                                Start Scanning
                            </button>
                        </div>
                    )}

                    {/* Simulated Camera Feed */}
                    {scanState !== 'idle' && (
                        <div className="absolute inset-0 bg-[#1A2A3A]/20">
                            {/* Document bounding box tracking simulation */}
                            <div className="absolute inset-8 border-2 border-amber-500 rounded-lg flex flex-col justify-between p-1">
                                <div className="flex justify-between w-full h-4">
                                    <div className="w-4 h-full border-t-4 border-l-4 border-amber-500"></div>
                                    <div className="w-4 h-full border-t-4 border-r-4 border-amber-500"></div>
                                </div>
                                <div className="flex justify-between w-full h-4">
                                    <div className="w-4 h-full border-b-4 border-l-4 border-amber-500"></div>
                                    <div className="w-4 h-full border-b-4 border-r-4 border-amber-500"></div>
                                </div>
                            </div>

                            {/* Scanning Animation */}
                            {(scanState === 'scanning' || scanState === 'optimizing') && (
                                <div className="absolute top-0 left-0 w-full h-1 bg-[#00E5A0] shadow-[0_0_15px_#00E5A0] animate-scan"></div>
                            )}

                            {scanState === 'optimizing' && (
                                <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-20 backdrop-blur-sm">
                                    <div className="text-center">
                                        <RefreshCw size={32} className="text-[#00E5A0] animate-spin mx-auto mb-4" />
                                        <div className="text-white font-bold">Optimizing...</div>
                                        <div className="text-xs text-[#8899AA] mt-1">Applying B&W Magic Filter & Auto-Crop</div>
                                    </div>
                                </div>
                            )}

                            {scanState === 'review' && (
                                <Image src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" alt="scanned document" className="w-full h-full object-cover opacity-80" width={400} height={300} />
                            )}
                        </div>
                    )}
                </div>

                {/* Controls Area */}
                <div className="p-4 sm:p-6 bg-[#0D1928] border-t border-[#1A2A3A]">
                    {scanState === 'review' ? (
                        <div>
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h3 className="font-bold text-white text-lg">Scanned Document 1</h3>
                                    <p className="text-xs text-[#00E5A0] font-semibold">Auto-enhanced (B&W)</p>
                                </div>
                                <div className="flex gap-2">
                                    <button className="p-2 border border-[#2A3A4A] bg-[#1A2A3A] rounded text-[#8899AA] hover:text-white transition-colors" title="Retake">
                                        <RefreshCw size={18} />
                                    </button>
                                    <button className="p-2 border border-[#2A3A4A] bg-[#1A2A3A] rounded text-[#8899AA] hover:text-white transition-colors" title="Adjust Crop">
                                        <Crop size={18} />
                                    </button>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3">
                                <button className="flex-1 py-3 border-2 border-dashed border-[#1A2A3A] rounded-lg text-sm font-bold text-[#8899AA] hover:border-[#2A3A4A] hover:text-white transition-colors flex items-center justify-center gap-2">
                                    <Layers size={18} /> Add Page
                                </button>
                                <button className="flex-1 py-3 bg-[#0066FF] text-white rounded-lg font-bold text-sm hover:bg-[#0052cc] transition-colors flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(0,102,255,0.3)]">
                                    <CheckCircle2 size={18} /> Save as PDF
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 gap-4">
                            <button className="py-3 border border-[#1A2A3A] bg-[#060B14] rounded-lg text-sm font-semibold text-[#556677] hover:text-white flex items-center justify-center gap-2 cursor-not-allowed opacity-50">
                                <FileText size={16} /> Batch Mode (Off)
                            </button>
                            <button className="py-3 border border-[#1A2A3A] bg-[#060B14] rounded-lg text-sm font-semibold text-[#8899AA] hover:border-[#0066FF] hover:text-white transition-colors flex items-center justify-center gap-2">
                                <UploadCloud size={16} /> Upload Instead
                            </button>
                        </div>
                    )}
                </div>

            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes scan {
                    0% { top: 0%; transform: translateY(0); }
                    50% { top: 100%; transform: translateY(-100%); }
                    100% { top: 0%; transform: translateY(0); }
                }
                .animate-scan {
                    animation: scan 2s linear infinite;
                }
            `}} />
        </div>
    
        </Page>
    );
}
