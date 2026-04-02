"use client";

import React, { useState, useEffect } from 'react';
import { ResponsiveContainer } from 'recharts';

interface ChartWrapperProps {
    children: React.ReactNode;
    height?: string;
}

export default function ChartWrapper({
    children,
    height = "h-64 md:h-80 lg:h-96"
}: ChartWrapperProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className={`w-full rounded-lg animate-pulse bg-[#1A2A3A] ${height}`} />;
    }

    return (
        <div className={`w-full ${height}`}>
            <ResponsiveContainer width="100%" height="100%">
                {/* @ts-ignore - Recharts ResponsiveContainer types can be tricky with children */}
                {children}
            </ResponsiveContainer>
        </div>
    );
}
