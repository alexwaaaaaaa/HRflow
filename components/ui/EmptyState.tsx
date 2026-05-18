"use client";

import React from 'react';
import Link from 'next/link';

// ─── Types ────────────────────────────────────────────────────────────────────
interface EmptyStateAction {
    label: string;
    href?: string;
    onClick?: () => void;
    icon?: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'ghost';
}

interface EmptyStateProps {
    illustration: React.ReactNode;
    badge?: string;
    badgeColor?: 'indigo' | 'emerald' | 'amber' | 'rose' | 'sky' | 'purple' | 'slate' | 'violet' | 'orange' | 'pink';
    title: string;
    description: string;
    primaryAction?: EmptyStateAction;
    secondaryAction?: EmptyStateAction;
    tips?: string[];
    accentColor?: string; // tailwind gradient stop e.g. "indigo"
}

// ─── Static badge color map — avoids template-literal Tailwind classes (Tailwind v4 JIT trap)
const BADGE_DOT_CLASSES: Record<string, string> = {
    indigo: 'w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse',
    emerald: 'w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse',
    amber: 'w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse',
    rose: 'w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse',
    sky: 'w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse',
    purple: 'w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse',
    slate: 'w-1.5 h-1.5 rounded-full bg-slate-400 animate-pulse',
    violet: 'w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse',
    orange: 'w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse',
    pink: 'w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse',
};

// ─── Dot Grid Background ───────────────────────────────────────────────────────
function DotGrid() {
    return (
        <svg
            className="absolute inset-0 w-full h-full opacity-[0.04]"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
                <pattern id="dots" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="1.5" fill="#fff" />
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
    );
}

// ─── Action Button ─────────────────────────────────────────────────────────────
function ActionButton({ action }: { action: EmptyStateAction }) {
    const base = 'inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 select-none';
    const variants = {
        primary: 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:-translate-y-0.5 active:translate-y-0',
        secondary: 'bg-[#131B2B] hover:bg-[#1A2A3A] text-white border border-[#2A3A4A] hover:border-[#3A4A5A] hover:-translate-y-0.5 active:translate-y-0',
        ghost: 'text-[#8899AA] hover:text-white hover:bg-[#131B2B] hover:-translate-y-0.5 active:translate-y-0',
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

// ─── Main EmptyState Component ─────────────────────────────────────────────────
export function EmptyState({
    illustration,
    badge,
    badgeColor = 'indigo',
    title,
    description,
    primaryAction,
    secondaryAction,
    tips,
}: EmptyStateProps) {
    return (
        <div className="relative min-h-[calc(100vh-88px)] flex items-center justify-center bg-[#060D1A] overflow-hidden">

            {/* Ambient glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-indigo-600/5 blur-[120px]" />
                <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] rounded-full bg-purple-600/5 blur-[80px]" />
            </div>

            {/* Dot grid */}
            <DotGrid />

            {/* Card */}
            <div className="relative z-10 flex flex-col items-center text-center max-w-lg w-full px-6 py-4 animate-fade-in">

                {/* Badge */}
                {badge && (
                    <div className="mb-6 inline-flex items-center gap-2 bg-[#0D1928] border border-[#1A2A3A] px-4 py-1.5 rounded-full text-[11px] font-semibold text-[#8899AA] uppercase tracking-widest">
                        <span className={BADGE_DOT_CLASSES[badgeColor ?? 'indigo'] ?? BADGE_DOT_CLASSES.indigo} />
                        {badge}
                    </div>
                )}

                {/* Illustration */}
                <div className="mb-8 relative">
                    <div className="absolute inset-0 bg-indigo-500/10 rounded-full blur-2xl scale-150 -z-10" />
                    {illustration}
                </div>

                {/* Text */}
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight leading-tight">
                    {title}
                </h2>
                <p className="text-[#8899AA] text-sm md:text-base leading-relaxed max-w-sm mb-8">
                    {description}
                </p>

                {/* Actions */}
                {(primaryAction || secondaryAction) && (
                    <div className="flex flex-wrap gap-3 justify-center mb-8">
                        {primaryAction && <ActionButton action={{ ...primaryAction, variant: 'primary' }} />}
                        {secondaryAction && <ActionButton action={{ ...secondaryAction, variant: 'secondary' }} />}
                    </div>
                )}

                {/* Tips */}
                {tips && tips.length > 0 && (
                    <div className="w-full bg-[#0D1928]/80 border border-[#1A2A3A] rounded-2xl p-5 backdrop-blur-sm text-left">
                        <div className="text-[10px] font-bold text-[#445566] uppercase tracking-widest mb-3">Quick Tips</div>
                        <ul className="space-y-2">
                            {tips.map((tip, i) => (
                                <li key={i} className="flex items-start gap-2.5 text-xs text-[#8899AA] leading-relaxed">
                                    <span className="mt-0.5 w-4 h-4 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-[9px] font-bold text-indigo-400 shrink-0">{i + 1}</span>
                                    {tip}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}

export default EmptyState;
