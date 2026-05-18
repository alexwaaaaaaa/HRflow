"use client";

import type { ReactNode } from "react";

/**
 * Standardised empty-state used inside cards / tables.
 * Larger illustrations + actions live in `EmptyState.tsx`; this is the
 * compact in-component variant.
 */
export default function EmptyTable({
    icon,
    title,
    description,
    action,
}: {
    icon?: ReactNode;
    title: string;
    description?: string;
    action?: ReactNode;
}) {
    return (
        <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
            {icon && (
                <div
                    className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[rgba(0,229,160,0.08)]"
                    aria-hidden="true"
                >
                    {icon}
                </div>
            )}
            <p className="text-sm font-semibold text-[#c8d8e8]">{title}</p>
            {description && (
                <p className="mt-1 max-w-sm text-xs text-[#7a8fa6]">{description}</p>
            )}
            {action && <div className="mt-4">{action}</div>}
        </div>
    );
}
