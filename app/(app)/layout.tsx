"use client";

import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import { useEffect, useState } from "react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    const [marginLeft, setMarginLeft] = useState(240);

    useEffect(() => {
        // Read initial value from localStorage
        const isMini = localStorage.getItem('sidebar_mini') === 'true';
        setMarginLeft(isMini ? 48 : 240);

        // Listen for CSS custom property changes via a MutationObserver on :root
        const observer = new MutationObserver(() => {
            const val = getComputedStyle(document.documentElement)
                .getPropertyValue('--sidebar-width')
                .trim();
            if (val) setMarginLeft(parseInt(val));
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['style'] });
        return () => observer.disconnect();
    }, []);

    return (
        <div className="min-h-screen" style={{ background: "#04080f" }}>
            <Sidebar />
            <div style={{ marginLeft, display: "flex", flexDirection: "column", minHeight: "100vh", background: "#04080f", transition: "margin-left 200ms ease" }}>
                <Header />
                <main style={{ flex: 1 }}>
                    {children}
                </main>
            </div>
        </div>
    );
}
