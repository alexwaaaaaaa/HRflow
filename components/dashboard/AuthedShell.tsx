"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";

const SIDEBAR_FULL_WIDTH = 240;
const SIDEBAR_MINI_WIDTH = 48;
const STORAGE_KEY = "sidebar_mini";
const SIDEBAR_WIDTH_VAR = "--sidebar-width";

/**
 * Shared authenticated shell used by both `(app)` and `(dashboard)` route
 * groups so the sidebar / content offset stays consistent regardless of which
 * group the page lives in.
 *
 * Source of truth for sidebar width:
 *   1. `localStorage["sidebar_mini"]` is read on mount (no SSR flash).
 *   2. The Sidebar component is expected to set the CSS custom property
 *      `--sidebar-width` on `:root` whenever the user toggles mini mode; we
 *      mirror that into local state via a MutationObserver so the content
 *      area animates in lockstep.
 *
 * Previously `(dashboard)/layout.tsx` hardcoded `marginLeft: 240` while
 * `(app)/layout.tsx` used the dynamic value, so toggling mini mode broke the
 * dashboard pages. This shell unifies both.
 */
export default function AuthedShell({ children }: { children: React.ReactNode }) {
    const [marginLeft, setMarginLeft] = useState(SIDEBAR_FULL_WIDTH);

    useEffect(() => {
        // Initial read — avoid SSR mismatch by only running client-side.
        try {
            const isMini = window.localStorage.getItem(STORAGE_KEY) === "true";
            // eslint-disable-next-line react-hooks/set-state-in-effect -- mount-only sync from localStorage
            setMarginLeft(isMini ? SIDEBAR_MINI_WIDTH : SIDEBAR_FULL_WIDTH);
        } catch {
            /* localStorage may be blocked (private browsing) — ignore */
        }

        // React to sidebar mode changes broadcast via the CSS variable.
        const sync = () => {
            const raw = getComputedStyle(document.documentElement)
                .getPropertyValue(SIDEBAR_WIDTH_VAR)
                .trim();
            if (!raw) return;
            const next = parseInt(raw, 10);
            if (!Number.isNaN(next)) setMarginLeft(next);
        };

        const observer = new MutationObserver(sync);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["style"],
        });

        // Fire once after observer attached, in case the variable was set early.
        sync();

        return () => observer.disconnect();
    }, []);

    return (
        <div className="min-h-screen" style={{ background: "#04080f" }}>
            <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-[#0A1420] focus:text-white focus:border focus:border-[#00e5a0] focus:rounded-lg focus:font-bold focus:text-sm"
            >
                Skip to main content
            </a>
            <Sidebar />
            <div
                style={{
                    marginLeft,
                    display: "flex",
                    flexDirection: "column",
                    minHeight: "100vh",
                    background: "#04080f",
                    transition: "margin-left 200ms ease",
                }}
            >
                <Header />
                <main id="main-content" tabIndex={-1} style={{ flex: 1 }}>
                    {children}
                </main>
            </div>
        </div>
    );
}
