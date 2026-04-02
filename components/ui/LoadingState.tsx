"use client";

import React, { useState, useEffect } from 'react';

export interface LoadingStateProps {
    variant?: 'spinner' | 'progress' | 'ripple' | 'skeleton' | 'metrics';
    title?: string;
    description?: string;
    progress?: number; // 0-100
    icon?: React.ReactNode;
    colorScheme?: 'indigo' | 'emerald' | 'amber' | 'rose' | 'sky';
    estimatedTimeLeft?: string;
    steps?: { label: string; active?: boolean; completed?: boolean }[];
}

export function LoadingState({
    variant = 'spinner',
    title = 'Loading...',
    description = 'Please wait while we process your request.',
    progress,
    icon,
    colorScheme = 'indigo',
    estimatedTimeLeft,
    steps
}: LoadingStateProps) {

    // Auto-progress simulator for demo purposes when progress is not provided
    const [simulatedProgress, setSimulatedProgress] = useState(0);
    useEffect(() => {
        if (variant !== 'progress' && variant !== 'metrics') return;
        if (progress !== undefined) return;

        const interval = setInterval(() => {
            setSimulatedProgress(old => {
                if (old >= 98) return old;
                // Slower as it gets closer to 100
                return old + (Math.random() * (100 - old) * 0.1);
            });
        }, 800);
        return () => clearInterval(interval);
    }, [variant, progress]);

    const displayProgress = progress !== undefined ? progress : simulatedProgress;

    // Theme colors mapping
    const themeColors = {
        indigo: { stroke: '#6366f1', fill: 'bg-indigo-600', text: 'text-indigo-500', glow: 'bg-indigo-500/20' },
        emerald: { stroke: '#10b981', fill: 'bg-emerald-500', text: 'text-emerald-500', glow: 'bg-emerald-500/20' },
        amber: { stroke: '#f59e0b', fill: 'bg-amber-500', text: 'text-amber-500', glow: 'bg-amber-500/20' },
        rose: { stroke: '#f43f5e', fill: 'bg-rose-500', text: 'text-rose-500', glow: 'bg-rose-500/20' },
        sky: { stroke: '#0ea5e9', fill: 'bg-sky-500', text: 'text-sky-500', glow: 'bg-sky-500/20' }
    };

    const theme = themeColors[colorScheme];

    // Skeleton Layout
    if (variant === 'skeleton') {
        return (
            <div className="w-full h-full p-6 animate-pulse">
                {title && <h2 className="text-xl font-bold text-white mb-6">{title}</h2>}
                <div className="flex gap-4 mb-8">
                    <div className="w-1/4 h-24 bg-[#131B2B] rounded-xl" />
                    <div className="w-1/4 h-24 bg-[#131B2B] rounded-xl" />
                    <div className="w-1/4 h-24 bg-[#131B2B] rounded-xl" />
                    <div className="w-1/4 h-24 bg-[#131B2B] rounded-xl" />
                </div>
                <div className="flex gap-6">
                    <div className="w-2/3 space-y-4">
                        <div className="w-full h-64 bg-[#131B2B] rounded-xl" />
                        <div className="w-full h-40 bg-[#1A2A3A] rounded-xl" />
                    </div>
                    <div className="w-1/3 space-y-4">
                        <div className="w-full h-32 bg-[#131B2B] rounded-xl" />
                        <div className="w-full h-32 bg-[#131B2B] rounded-xl" />
                        <div className="w-full h-32 bg-[#131B2B] rounded-xl" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="relative min-h-[calc(100vh-88px)] flex items-center justify-center bg-[#060D1A] overflow-hidden">

            {/* Ambient Background Glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div className={`absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[500px] rounded-full ${theme.glow} blur-[120px]`} />
            </div>

            <div className="relative z-10 flex flex-col items-center text-center max-w-lg w-full px-6 py-8">

                {/* Visual Indicator */}
                <div className="mb-10 relative flex items-center justify-center">

                    {/* Ripple Variant */}
                    {variant === 'ripple' && (
                        <div className="relative w-32 h-32 flex items-center justify-center">
                            <div className={`absolute inset-0 rounded-full border-2 border-current ${theme.text} animate-ping opacity-75`} />
                            <div className={`absolute inset-4 rounded-full border-2 border-current ${theme.text} animate-ping opacity-50`} style={{ animationDelay: '0.5s' }} />
                            <div className={`absolute inset-8 rounded-full border-2 border-current ${theme.text} animate-ping opacity-25`} style={{ animationDelay: '1s' }} />
                            <div className={`w-16 h-16 rounded-full ${theme.fill} flex items-center justify-center text-white z-10 shadow-[0_0_30px_currentColor] ${theme.text}`}>
                                {icon}
                            </div>
                        </div>
                    )}

                    {/* Progress Circle Variant */}
                    {variant === 'progress' && (
                        <div className="relative w-32 h-32">
                            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="45" fill="none" stroke="#1A2A3A" strokeWidth="6" />
                                <circle
                                    cx="50" cy="50" r="45" fill="none" stroke={theme.stroke} strokeWidth="6"
                                    strokeLinecap="round" strokeDasharray="283"
                                    strokeDashoffset={283 - (displayProgress / 100) * 283}
                                    className="transition-all duration-300 ease-out"
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                {icon ? (
                                    <div className={`${theme.text}`}>{icon}</div>
                                ) : (
                                    <span className={`text-xl font-bold text-white`}>{Math.round(displayProgress)}%</span>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Spinner Variant */}
                    {variant === 'spinner' && (
                        <div className="relative w-24 h-24">
                            <svg className={`w-full h-full animate-spin-slow ${theme.text}`} viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="4" strokeDasharray="70 200" strokeLinecap="round" />
                                <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="40 100" className="opacity-50" />
                            </svg>
                            {icon && (
                                <div className="absolute inset-0 flex items-center justify-center text-white opacity-80 animate-pulse">
                                    {icon}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Metrics/Blocks Variant (for heavy processing) */}
                    {variant === 'metrics' && (
                        <div className="flex gap-2 mb-4">
                            {[0, 1, 2, 3, 4].map(i => (
                                <div key={i} className={`w-4 h-16 rounded-sm bg-[#1A2A3A] relative overflow-hidden`}>
                                    <div
                                        className={`absolute bottom-0 w-full ${theme.fill} transition-all duration-300`}
                                        style={{ height: `${Math.min(100, Math.max(0, (displayProgress - i * 20) * 5))}%` }}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Text Content */}
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-wide">
                    {title}
                </h2>
                <p className="text-[#8899AA] text-sm md:text-base leading-relaxed max-w-sm">
                    {description}
                </p>

                {/* Sub-Progress Display */}
                {estimatedTimeLeft && (
                    <div className="mt-6 flex items-center gap-2 text-xs font-mono text-[#445566] bg-[#0A1420] px-3 py-1.5 rounded-full border border-[#1A2A3A]">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                        Estimated time remaining: {estimatedTimeLeft}
                    </div>
                )}

                {/* Processing Steps Logic */}
                {steps && steps.length > 0 && (
                    <div className="w-full mt-10 space-y-3 text-left bg-[#0D1928] border border-[#1A2A3A] p-5 rounded-2xl">
                        {steps.map((step, idx) => (
                            <div key={idx} className={`flex items-center gap-3 text-sm ${step.completed ? 'text-emerald-400' : step.active ? 'text-white' : 'text-[#445566]'}`}>
                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${step.completed ? 'border-emerald-500 bg-emerald-500/20' : step.active ? `${theme.text} ${theme.glow}` : 'border-[#2A3A4A]'}`}>
                                    {step.completed && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>}
                                </div>
                                <span className={step.active ? 'font-medium' : ''}>{step.label}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Minimal CSS inject for specific animations not in Tailwind by default */}
            <style jsx global>{`
                .animate-spin-slow {
                    animation: spin 3s linear infinite;
                }
            `}</style>
        </div>
    );
}

export default LoadingState;
