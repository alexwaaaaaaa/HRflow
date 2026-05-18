"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Check } from 'lucide-react';
import { seedRandom } from '@/lib/random';

export interface SuccessAction {
    label: string;
    href?: string;
    onClick?: () => void;
    icon?: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'ghost';
}

export interface SuccessStateProps {
    illustration?: React.ReactNode;
    title: string;
    description: string;
    primaryAction?: SuccessAction;
    secondaryAction?: SuccessAction;
    metrics?: { label: string; value: string | number }[];
    confetti?: boolean;
}

// ─── Simple Particle Confetti Effect ──────────────────────────────────────────
function ConfettiCanvas() {
    const [particles, setParticles] = useState<{ x: number; y: number; r: number; c: string; v: number; a: number; d: number }[]>([]);

    useEffect(() => {
        const colors = ['#00E5A0', '#6366f1', '#a78bfa', '#f59e0b', '#38bdf8'];
        // Use seedRandom for deterministic initial positions — React 19 purity contract
        const rng = seedRandom(0xc0ffee);
        const p = Array.from({ length: 60 }).map(() => ({
            x: rng() * 100, // %
            y: -10 - rng() * 20, // start above
            r: 3 + rng() * 5, // radius
            c: colors[Math.floor(rng() * colors.length)],
            v: 1 + rng() * 3, // velocity
            a: rng() * 360, // angle
            d: -2 + rng() * 4 // drift
        }));
        // eslint-disable-next-line react-hooks/set-state-in-effect -- one-shot init from random source
        setParticles(p);

        let animationFrameId: number;
        // Use a separate rng for the reset positions during animation (event-driven, not render-time)
        const resetRng = seedRandom(0xdeadbeef);

        const animate = () => {
            setParticles(current => current.map(particle => {
                let ny = particle.y + particle.v;
                let nx = particle.x + (particle.d * 0.1);
                const na = particle.a + 2;
                if (ny > 120) {
                    ny = -10;
                    nx = resetRng() * 100;
                }
                return { ...particle, y: ny, x: nx, a: na };
            }));
            animationFrameId = requestAnimationFrame(animate);
        };

        animate();
        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0 opacity-40">
            {particles.map((p, i) => (
                <div
                    key={i}
                    className="absolute rounded-sm"
                    style={{
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        width: `${p.r}px`,
                        height: `${p.r}px`,
                        backgroundColor: p.c,
                        transform: `rotate(${p.a}deg)`,
                        boxShadow: `0 0 ${p.r * 2}px ${p.c}`,
                    }}
                />
            ))}
        </div>
    );
}

// ─── Top Checkmark Animation ──────────────────────────────────────────────────
function AnimatedCheckmark() {
    return (
        <div className="relative flex items-center justify-center w-24 h-24 mb-10">
            <div className="absolute inset-0 bg-[#00E5A0]/20 rounded-full blur-xl scale-150 animate-pulse" />

            {/* Outer spinning dashed ring */}
            <svg className="absolute inset-0 w-full h-full text-[#00E5A0]/30 animate-spin-slow" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="10 6" />
            </svg>

            {/* Inner solid ring */}
            <div className="absolute inset-2 border-2 border-[#00E5A0]/50 rounded-full" />

            {/* Center backdrop */}
            <div className="absolute inset-4 bg-gradient-to-tr from-[#00E5A0] to-emerald-400 rounded-full shadow-[0_0_30px_rgba(0,229,160,0.4)] flex items-center justify-center scale-up-center">
                <Check size={32} strokeWidth={3} className="text-[#060D1A]" />
            </div>

            {/* Sparkles */}
            <div className="absolute top-1 -right-2 w-2 h-2 rounded-full bg-white shadow-[0_0_10px_white] animate-ping" />
            <div className="absolute bottom-2 -left-3 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_white] animate-pulse" style={{ animationDelay: '0.5s' }} />
        </div>
    );
}

// ─── Action Button ─────────────────────────────────────────────────────────────
function ActionButton({ action }: { action: SuccessAction }) {
    const base = 'inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 select-none';

    // Primary success uses #00E5A0 (Bright Emerald) with dark text, or Indigo for secondary brand fit
    const variants = {
        primary: `bg-[#00E5A0] hover:bg-emerald-400 text-[#060D1A] shadow-lg shadow-[#00E5A0]/20 hover:-translate-y-0.5`,
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

// ─── Main SuccessState Component ───────────────────────────────────────────────
export function SuccessState({
    illustration,
    title,
    description,
    primaryAction,
    secondaryAction,
    metrics,
    confetti = true
}: SuccessStateProps) {
    return (
        <div className="relative min-h-[calc(100vh-88px)] flex items-center justify-center bg-[#060D1A] overflow-hidden">

            {/* Ambient Background Glow */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[500px] rounded-full bg-[#00E5A0]/5 blur-[100px]" />
            </div>

            {/* Confetti Overlay */}
            {confetti && <ConfettiCanvas />}

            {/* Content Container */}
            <div className="relative z-10 flex flex-col items-center text-center max-w-xl w-full px-6 py-8 animate-fade-in">

                {/* Visual */}
                {illustration ? (
                    <div className="mb-10 scale-up-center p-4 bg-[#0D1928]/80 backdrop-blur-md border border-[#1A2A3A] rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
                        {illustration}
                    </div>
                ) : (
                    <AnimatedCheckmark />
                )}

                {/* Typography */}
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight leading-tight drop-shadow-sm">
                    {title}
                </h2>
                <p className="text-[#8899AA] text-base md:text-lg leading-relaxed max-w-md mb-10">
                    {description}
                </p>

                {/* Optional Metrics/Data Display */}
                {metrics && metrics.length > 0 && (
                    <div className="w-full flex flex-wrap justify-center gap-4 mb-10">
                        {metrics.map((m, i) => (
                            <div key={i} className="bg-[#0A1420]/80 backdrop-blur-sm border border-[#1A2A3A] rounded-xl px-5 py-3 min-w-[120px]">
                                <div className="text-[10px] font-bold text-[#8899AA] uppercase tracking-wider mb-1">{m.label}</div>
                                <div className="text-xl font-bold text-white whitespace-nowrap">{m.value}</div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Actions */}
                {(primaryAction || secondaryAction) && (
                    <div className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto">
                        {primaryAction && <ActionButton action={{ ...primaryAction, variant: 'primary' }} />}
                        {secondaryAction && <ActionButton action={{ ...secondaryAction, variant: 'secondary' }} />}
                    </div>
                )}
            </div>

            {/* Standard Global Styling for animations (if not already in globals.css) */}
            <style jsx global>{`
                @keyframes scale-up-center {
                    0% { transform: scale(0.5); opacity: 0; }
                    80% { transform: scale(1.05); opacity: 1; }
                    100% { transform: scale(1); opacity: 1; }
                }
                .scale-up-center {
                    animation: scale-up-center 0.6s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
                }
            `}</style>
        </div>
    );
}

export default SuccessState;
