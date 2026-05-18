"use client";
import React, { useState } from "react";
import { Play, Volume2, Maximize, ChevronRight } from "lucide-react";
import Link from "next/link";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";

export default function WelcomeVideoScreen() {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <Page
            title="Welcome to Kaarya"
            subtitle="In just 2 minutes, our founders will show you how to configure your workspace for maximum efficiency."
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Onboarding", href: "/onboarding/dashboard" },
                { label: "Welcome", href: "/onboarding/welcome" },
            ]}
            actions={
                <Link
                    href="/onboarding/checklist"
                    className="text-[#556677] hover:text-white text-sm font-bold flex items-center gap-1 transition-colors"
                >
                    Skip Video <ChevronRight size={14} aria-hidden="true" />
                </Link>
            }
        >
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Video Player */}
                <Card padding="none" className="overflow-hidden shadow-2xl shadow-indigo-500/5">
                    <div className="relative group aspect-video">
                        {/* Thumbnail/Poster */}
                        <div
                            className={`absolute inset-0 bg-gradient-to-br from-indigo-900/40 to-[#0A1420] flex items-center justify-center transition-opacity duration-500 ${
                                isPlaying ? "opacity-0 pointer-events-none" : "opacity-100"
                            }`}
                        >
                            {/* Dot pattern background */}
                            <div
                                className="absolute inset-0 opacity-20"
                                style={{
                                    backgroundImage:
                                        "radial-gradient(circle, #4F46E5 1px, transparent 1px)",
                                    backgroundSize: "20px 20px",
                                }}
                            />

                            <button
                                type="button"
                                onClick={() => setIsPlaying(true)}
                                aria-label="Play welcome video"
                                className="w-20 h-20 bg-white text-indigo-600 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:scale-110 transition-transform relative z-10"
                            >
                                <Play size={32} className="ml-2" fill="currentColor" aria-hidden="true" />
                            </button>
                        </div>

                        {/* Playing State */}
                        {isPlaying && (
                            <div className="absolute inset-0 bg-[#131B2B] flex items-center justify-center">
                                <span className="text-[#556677] font-mono text-sm animate-pulse">Video Stream Active...</span>
                            </div>
                        )}

                        {/* Custom Controls */}
                        <div
                            className={`absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-4 flex flex-col gap-2 transition-opacity duration-300 ${
                                isPlaying ? "opacity-0 group-hover:opacity-100" : ""
                            }`}
                        >
                            <div className="w-full h-1.5 bg-white/20 rounded-full cursor-pointer relative" aria-label="Video progress">
                                <div className="absolute left-0 top-0 bottom-0 w-1/3 bg-indigo-500 rounded-full" />
                                <div className="absolute left-1/3 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow" />
                            </div>
                            <div className="flex justify-between items-center text-white">
                                <div className="flex items-center gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsPlaying(!isPlaying)}
                                        aria-label={isPlaying ? "Pause video" : "Play video"}
                                    >
                                        <Play size={20} fill={isPlaying ? "none" : "currentColor"} className={isPlaying ? "hidden" : ""} aria-hidden="true" />
                                    </button>
                                    <span className="text-xs font-mono">0:45 / 2:30</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <button type="button" aria-label="Toggle volume">
                                        <Volume2 size={20} aria-hidden="true" />
                                    </button>
                                    <button type="button" aria-label="Fullscreen">
                                        <Maximize size={20} aria-hidden="true" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>

                <div className="flex justify-center">
                    <Link
                        href="/onboarding/checklist"
                        className="bg-white text-[#060D1A] px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-gray-100 transition-colors shadow-lg"
                    >
                        Continue to Workspace Setup <ChevronRight size={20} aria-hidden="true" />
                    </Link>
                </div>
            </div>
        </Page>
    );
}
