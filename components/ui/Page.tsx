"use client";

import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

/**
 * Standard page shell used across HRflow modules.
 *
 * Provides a consistent header (breadcrumbs, title, subtitle, actions)
 * and a responsive content area with sensible padding on mobile/desktop.
 *
 * Replaces the hand-rolled headers that today vary across 1,098 pages.
 * Migrating each page to this shell removes ~30-50 lines of boilerplate
 * per page and gives us one place to evolve the page chrome.
 */

export interface Breadcrumb {
    label: string;
    href?: string;
}

interface PageProps {
    title: string;
    subtitle?: string;
    breadcrumbs?: Breadcrumb[];
    actions?: ReactNode;
    /** Optional max content width — defaults to "1200px" for readability. */
    maxWidth?: string | number;
    /** Render children full-bleed (no max-width / padding). */
    fullBleed?: boolean;
    children: ReactNode;
}

export default function Page({
    title,
    subtitle,
    breadcrumbs,
    actions,
    maxWidth = "1200px",
    fullBleed = false,
    children,
}: PageProps) {
    return (
        <div className="min-h-[calc(100vh-60px)]">
            <header
                className={`border-b border-[#1A2A3A] bg-[#060B14]/60 px-4 py-4 backdrop-blur md:px-8 md:py-6 ${
                    fullBleed ? "" : "sticky top-[60px] z-20"
                }`}
            >
                <div
                    className="mx-auto"
                    style={{ maxWidth: fullBleed ? "100%" : maxWidth }}
                >
                    {breadcrumbs && breadcrumbs.length > 0 && (
                        <nav
                            aria-label="Breadcrumb"
                            className="mb-2 flex flex-wrap items-center gap-1 text-xs text-[#7a8fa6]"
                        >
                            {breadcrumbs.map((b, i) => (
                                <span key={`${b.label}-${i}`} className="flex items-center gap-1">
                                    {i > 0 && (
                                        <ChevronRight
                                            size={11}
                                            className="text-[#2a3a4a]"
                                            aria-hidden="true"
                                        />
                                    )}
                                    {b.href && i < breadcrumbs.length - 1 ? (
                                        <Link
                                            href={b.href}
                                            className="transition-colors hover:text-[#7a8fa6]"
                                        >
                                            {b.label}
                                        </Link>
                                    ) : (
                                        <span
                                            className={
                                                i === breadcrumbs.length - 1
                                                    ? "text-[#c8d8e8]"
                                                    : ""
                                            }
                                        >
                                            {b.label}
                                        </span>
                                    )}
                                </span>
                            ))}
                        </nav>
                    )}

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="min-w-0">
                            <h1 className="truncate text-xl font-bold text-white sm:text-2xl">
                                {title}
                            </h1>
                            {subtitle && (
                                <p className="mt-1 text-sm text-[#7a8fa6]">{subtitle}</p>
                            )}
                        </div>
                        {actions && (
                            <div className="flex flex-wrap items-center gap-2">{actions}</div>
                        )}
                    </div>
                </div>
            </header>

            {fullBleed ? (
                children
            ) : (
                <div
                    className="mx-auto px-4 py-6 md:px-8 md:py-8"
                    style={{ maxWidth }}
                >
                    {children}
                </div>
            )}
        </div>
    );
}
