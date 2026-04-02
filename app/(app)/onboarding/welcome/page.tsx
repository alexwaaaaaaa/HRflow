"use client";
import React, { useState } from 'react';
import { Play, Volume2, Maximize, SkipForward, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function WelcomeVideoScreen() {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <div className="min-h-screen bg-[#060D1A] flex flex-col">
            {/* Minimal Header */}
            <div className="h-16 px-8 flex items-center justify-between border-b border-[#1A2A3A]">
                <div className="flex items-center gap-2 text-white font-bold tracking-tight">
                    <div className="w-6 h-6 rounded bg-indigo-600 flex items-center justify-center text-xs">K</div>
                    Kaarya Setup
                </div>
                <Link href="/onboarding/checklist" className="text-[#556677] hover:text-white text-sm font-bold flex items-center gap-1 transition-colors">
                    Skip Video <SkipForward size={14} />
                </Link>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center p-6 max-w-5xl mx-auto w-full">

                <div className="text-center mb-10 animate-fade-in">
                    <h1 className="text-4xl font-black text-white mb-4">Welcome to Kaarya! 👋</h1>
                    <p className="text-[#8899AA] text-lg max-w-2xl mx-auto">
                        In just 2 minutes, our founders will show you how to configure your workspace for maximum efficiency.
                    </p>
                </div>

                {/* Video Player Mockup */}
                <div className="w-full aspect-video bg-[#0A1420] border border-[#1A2A3A] rounded-2xl overflow-hidden relative group shadow-2xl shadow-indigo-500/5 animate-fade-in-up">

                    {/* Thumbnail/Poster */}
                    <div className={`absolute inset-0 bg-gradient-to-br from-indigo-900/40 to-[#0A1420] flex items-center justify-center transition-opacity duration-500 ${isPlaying ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                        {/* Fake Video bg texture */}
                        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\\"20\\" height=\\"20\\" viewBox=\\"0 0 20 20\\" xmlns=\\"http://www.w3.org/2000/svg\\"%3E%3Cg fill=\\"%234F46E5\\" fill-opacity=\\"0.4\\" fill-rule=\\"evenodd\\"%3E%3Ccircle cx=\\"3\\" cy=\\"3\\" r=\\"3\\"/%3E%3Ccircle cx=\\"13\\" cy=\\"13\\" r=\\"3\\"/%3E%3C/g%3E%3C/svg%3E")', backgroundSize: '20px 20px' }}></div>

                        <button
                            onClick={() => setIsPlaying(true)}
                            className="w-20 h-20 bg-white text-indigo-600 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:scale-110 transition-transform relative z-10"
                        >
                            <Play size={32} className="ml-2" fill="currentColor" />
                        </button>
                    </div>

                    {/* Playing State Mockup */}
                    {isPlaying && (
                        <div className="absolute inset-0 bg-[#131B2B] flex items-center justify-center">
                            <span className="text-[#556677] font-mono text-sm animate-pulse">Video Stream Active...</span>
                        </div>
                    )}

                    {/* Custom Controls */}
                    <div className={`absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-4 flex flex-col gap-2 transition-opacity duration-300 ${isPlaying ? 'opacity-0 group-hover:opacity-100' : ''}`}>
                        <div className="w-full h-1.5 bg-white/20 rounded-full cursor-pointer relative">
                            <div className="absolute left-0 top-0 bottom-0 w-1/3 bg-indigo-500 rounded-full" />
                            <div className="absolute left-1/3 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow" />
                        </div>
                        <div className="flex justify-between items-center text-white">
                            <div className="flex items-center gap-4">
                                <button onClick={() => setIsPlaying(!isPlaying)}><Play size={20} fill={isPlaying ? "none" : "currentColor"} className={isPlaying ? "hidden" : ""} /></button>
                                <span className="text-xs font-mono">0:45 / 2:30</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <button><Volume2 size={20} /></button>
                                <button><Maximize size={20} /></button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-10 mb-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    <Link href="/onboarding/checklist" className="bg-white text-[#060D1A] px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-gray-100 transition-colors shadow-lg">
                        Continue to Workspace Setup <ChevronRight size={20} />
                    </Link>
                </div>

            </div>
        </div>
    );
}
