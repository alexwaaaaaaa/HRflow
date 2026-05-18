"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronUp, AlertOctagon } from 'lucide-react';

export interface ErrorAction {
    label: string;
    href?: string;
    onClick?: () => void;
    icon?: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'ghost';
}

export interface ErrorStateProps {
    errorCode?: string;
    illustration?: React.ReactNode;
    title: string;
    description: string;
    primaryAction?: ErrorAction;
    secondaryAction?: ErrorAction;
    technicalDetails?: string;
    colorScheme?: 'red' | 'amber' | 'orange' | 'rose';
}

// ─── Glitch Background Effect ───────────────────────────────────────────────
function GlitchGrid({ colorClass }: { colorClass: string }) {
    return (
        <svg
            className="absolute inset-0 w-full h-full opacity-[0.03]"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <pattern id="errorGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" className={colorClass} />
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#errorGrid)" />
        </svg>
    );
}

// ─── Static color palette map — avoids template-literal Tailwind classes (Tailwind v4 JIT trap)
const COLOR_PALETTE = {
    red: {
        glow: 'bg-red-600/5',
        iconBg: 'bg-red-500/10',
        iconBorder: 'border-2 border-red-500/30',
        iconPing: 'border border-red-500/20',
        iconText: 'text-red-400',
        codeBorder1: 'border-2 border-red-500/20',
        codeBorder2: 'border-2 border-red-500/20',
        primaryBtn: 'bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-500/20 hover:-translate-y-0.5',
    },
    amber: {
        glow: 'bg-amber-600/5',
        iconBg: 'bg-amber-500/10',
        iconBorder: 'border-2 border-amber-500/30',
        iconPing: 'border border-amber-500/20',
        iconText: 'text-amber-400',
        codeBorder1: 'border-2 border-amber-500/20',
        codeBorder2: 'border-2 border-amber-500/20',
        primaryBtn: 'bg-amber-600 hover:bg-amber-500 text-slate-900 shadow-lg shadow-amber-500/20 hover:-translate-y-0.5',
    },
    orange: {
        glow: 'bg-orange-600/5',
        iconBg: 'bg-orange-500/10',
        iconBorder: 'border-2 border-orange-500/30',
        iconPing: 'border border-orange-500/20',
        iconText: 'text-orange-400',
        codeBorder1: 'border-2 border-orange-500/20',
        codeBorder2: 'border-2 border-orange-500/20',
        primaryBtn: 'bg-orange-600 hover:bg-orange-500 text-white shadow-lg shadow-orange-500/20 hover:-translate-y-0.5',
    },
    rose: {
        glow: 'bg-rose-600/5',
        iconBg: 'bg-rose-500/10',
        iconBorder: 'border-2 border-rose-500/30',
        iconPing: 'border border-rose-500/20',
        iconText: 'text-rose-400',
        codeBorder1: 'border-2 border-rose-500/20',
        codeBorder2: 'border-2 border-rose-500/20',
        primaryBtn: 'bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-500/20 hover:-translate-y-0.5',
    },
} as const;

// ─── Action Button ─────────────────────────────────────────────────────────────
function ActionButton({ action, colorScheme }: { action: ErrorAction, colorScheme: keyof typeof COLOR_PALETTE }) {
    const base = 'inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 select-none';

    const variants = {
        primary: COLOR_PALETTE[colorScheme].primaryBtn,
        secondary: `bg-[#131B2B] hover:bg-[#1A2A3A] text-white border border-[#2A3A4A] hover:border-[#3A4A5A] hover:-translate-y-0.5`,
        ghost: `text-[#8899AA] hover:text-white hover:bg-[#131B2B] hover:-translate-y-0.5`,
    };

    const cls = `${base} ${variants[action.variant ?? 'primary']}`;

    if (action.href) {
        return (
            <Link href={action.href} className={cls}>
                {action.icon && <span className="shrink-0">{action.icon}</span>}
                {action.label}
            </Link>
        );
    }
    return (
        <button onClick={action.onClick} className={cls}>
            {action.icon && <span className="shrink-0">{action.icon}</span>}
            {action.label}
        </button>
    );
}

export function ErrorState({
    errorCode,
    illustration,
    title,
    description,
    primaryAction,
    secondaryAction,
    technicalDetails,
    colorScheme = 'red'
}: ErrorStateProps) {
    const [showDetails, setShowDetails] = useState(false);
    const palette = COLOR_PALETTE[colorScheme];

    return (
        <div className="relative min-h-[calc(100vh-88px)] flex items-center justify-center bg-[#060D1A] overflow-hidden">
            {/* Ambient Danger Glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div className={`absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full ${palette.glow} blur-[120px]`} />
            </div>

            {/* Grid */}
            <GlitchGrid colorClass={palette.iconText} />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center text-center max-w-2xl w-full px-6 py-8 animate-fade-in">

                {/* Visual / Error Code */}
                <div className="mb-8 relative flex items-center justify-center">
                    <div className={`absolute inset-0 ${palette.iconBg} rounded-full blur-2xl scale-150 -z-10`} />
                    {illustration ? (
                        illustration
                    ) : (
                        errorCode ? (
                            <div className="relative">
                                <h1 className="text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-red-500/20 drop-shadow-2xl opacity-90 tracking-tighter">
                                    {errorCode}
                                </h1>
                                <div className={`absolute -inset-4 ${palette.codeBorder1} rounded-[3rem] rotate-3 animate-pulse -z-10`} />
                                <div className={`absolute -inset-4 ${palette.codeBorder2} rounded-[3rem] -rotate-6 animate-pulse -z-10`} style={{ animationDelay: '1s' }} />
                            </div>
                        ) : (
                            <div className={`w-32 h-32 rounded-full ${palette.iconBg} ${palette.iconBorder} flex items-center justify-center relative`}>
                                <div className={`absolute inset-0 rounded-full ${palette.iconPing} animate-ping`} />
                                <AlertOctagon size={64} className={palette.iconText} />
                            </div>
                        )
                    )}
                </div>

                {/* Copy */}
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight leading-tight">
                    {title}
                </h2>
                <p className="text-[#8899AA] text-base md:text-lg leading-relaxed max-w-md mb-10">
                    {description}
                </p>

                {/* Actions */}
                {(primaryAction || secondaryAction) && (
                    <div className="flex flex-wrap gap-4 justify-center mb-10 w-full sm:w-auto">
                        {primaryAction && <ActionButton action={{ ...primaryAction, variant: 'primary' }} colorScheme={colorScheme} />}
                        {secondaryAction && <ActionButton action={{ ...secondaryAction, variant: 'secondary' }} colorScheme={colorScheme} />}
                    </div>
                )}

                {/* Tech Details Expander */}
                {technicalDetails && (
                    <div className="w-full max-w-lg mt-4">
                        <button
                            onClick={() => setShowDetails(!showDetails)}
                            className="flex items-center justify-center gap-2 text-xs font-semibold text-[#445566] hover:text-[#8899AA] transition-colors mx-auto"
                        >
                            {showDetails ? 'Hide Technical Details' : 'Show Technical Details'}
                            {showDetails ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                        </button>

                        {showDetails && (
                            <div className="mt-4 p-4 bg-[#0A1420] border border-[#1A2A3A] rounded-xl text-left overflow-hidden">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-2 h-2 rounded-full bg-red-500" />
                                    <span className="text-xs font-mono text-[#8899AA]">Error Trace</span>
                                </div>
                                <pre className="text-[10px] md:text-xs font-mono text-[#445566] whitespace-pre-wrap break-all h-max max-h-48 overflow-y-auto custom-scrollbar">
                                    {technicalDetails}
                                </pre>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ErrorState;
