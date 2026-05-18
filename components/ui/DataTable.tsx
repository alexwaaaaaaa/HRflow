"use client";

import { useMemo, useState, type ReactNode } from "react";
import { ChevronUp, ChevronDown, Search } from "lucide-react";

/**
 * Generic table component used across HRflow.
 *
 * Features:
 *   - Mobile responsive: collapses to stacked cards below `mobileBreakpoint`
 *   - Optional sortable columns
 *   - Optional search box
 *   - Empty state with custom message + action
 *   - Loading state with skeleton rows
 *   - Keyboard-accessible row hover/focus
 *
 * Backend-agnostic — pass in pre-fetched rows. For server-side
 * pagination, drive the `data` prop from `useQuery` and lift sort/search
 * state via `controlledSort` / `onSortChange`.
 */

export interface Column<T> {
    /** Stable identifier — used as React key + ARIA labelling. */
    key: string;
    /** Header label. */
    label: string;
    /** Cell renderer. */
    render: (row: T, index: number) => ReactNode;
    /** Whether the column is sortable. */
    sortable?: boolean;
    /** Sort accessor — what value to compare. Defaults to `(r) => r[key]`. */
    sortValue?: (row: T) => string | number;
    /** Tailwind width class, e.g. `w-32`. */
    width?: string;
    /** Right-align numeric columns. */
    align?: "left" | "right" | "center";
    /** Hide on mobile (still rendered in stacked card). */
    hideOnMobile?: boolean;
}

interface DataTableProps<T> {
    data: T[];
    columns: Column<T>[];
    /** Stable row identifier for React keys + accessibility. */
    rowKey: (row: T) => string | number;
    isLoading?: boolean;
    /** Optional row click — adds `cursor-pointer` and Enter/Space keybindings. */
    onRowClick?: (row: T) => void;
    /** Empty state. */
    emptyTitle?: string;
    emptyDescription?: string;
    emptyAction?: ReactNode;
    /** Search box. When provided, filters by stringifying every cell. */
    searchable?: boolean;
    searchPlaceholder?: string;
    /** Custom search predicate (overrides default stringify-all). */
    searchPredicate?: (row: T, query: string) => boolean;
    /** ARIA label for screen readers. */
    "aria-label"?: string;
}

export default function DataTable<T>({
    data,
    columns,
    rowKey,
    isLoading,
    onRowClick,
    emptyTitle = "No records",
    emptyDescription,
    emptyAction,
    searchable,
    searchPlaceholder = "Search…",
    searchPredicate,
    "aria-label": ariaLabel,
}: DataTableProps<T>) {
    const [query, setQuery] = useState("");
    const [sortKey, setSortKey] = useState<string | null>(null);
    const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

    const filtered = useMemo(() => {
        if (!searchable || !query.trim()) return data;
        const q = query.toLowerCase();
        if (searchPredicate) return data.filter((r) => searchPredicate(r, q));
        return data.filter((r) =>
            JSON.stringify(r).toLowerCase().includes(q)
        );
    }, [data, query, searchable, searchPredicate]);

    const sorted = useMemo(() => {
        if (!sortKey) return filtered;
        const col = columns.find((c) => c.key === sortKey);
        if (!col) return filtered;
        const accessor =
            col.sortValue ?? ((r: T) => (r as Record<string, unknown>)[sortKey] as string | number);
        const out = [...filtered].sort((a, b) => {
            const va = accessor(a);
            const vb = accessor(b);
            if (va === vb) return 0;
            return va > vb ? 1 : -1;
        });
        return sortDir === "asc" ? out : out.reverse();
    }, [filtered, sortKey, sortDir, columns]);

    const toggleSort = (key: string) => {
        if (sortKey === key) {
            setSortDir((d) => (d === "asc" ? "desc" : "asc"));
        } else {
            setSortKey(key);
            setSortDir("asc");
        }
    };

    const handleRowKeyDown = (e: React.KeyboardEvent, row: T) => {
        if (!onRowClick) return;
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onRowClick(row);
        }
    };

    return (
        <div>
            {searchable && (
                <div className="relative mb-3">
                    <Search
                        size={14}
                        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#7a8fa6]"
                        aria-hidden="true"
                    />
                    <input
                        type="search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder={searchPlaceholder}
                        aria-label={searchPlaceholder}
                        className="h-10 w-full rounded-lg border border-[#1A2A3A] bg-[#060B14] pl-9 pr-3 text-sm text-white outline-none placeholder:text-[#7a8fa6] transition-colors focus:border-[#00e5a0]"
                    />
                </div>
            )}

            {/* Desktop table */}
            <div className="hidden overflow-hidden rounded-2xl border border-[#1A2A3A] bg-[#0D1928] md:block">
                <table className="w-full" aria-label={ariaLabel}>
                    <thead>
                        <tr className="border-b border-[#1A2A3A] bg-[#070d18]">
                            {columns.map((col) => (
                                <th
                                    key={col.key}
                                    scope="col"
                                    className={`px-4 py-3 text-[10px] font-semibold uppercase tracking-wider text-[#7a8fa6] ${
                                        col.align === "right"
                                            ? "text-right"
                                            : col.align === "center"
                                            ? "text-center"
                                            : "text-left"
                                    } ${col.width ?? ""}`}
                                >
                                    {col.sortable ? (
                                        <button
                                            type="button"
                                            onClick={() => toggleSort(col.key)}
                                            className="inline-flex items-center gap-1 transition-colors hover:text-[#c8d8e8]"
                                            aria-label={`Sort by ${col.label}`}
                                        >
                                            {col.label}
                                            {sortKey === col.key &&
                                                (sortDir === "asc" ? (
                                                    <ChevronUp size={11} aria-hidden="true" />
                                                ) : (
                                                    <ChevronDown size={11} aria-hidden="true" />
                                                ))}
                                        </button>
                                    ) : (
                                        col.label
                                    )}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            Array.from({ length: 5 }).map((_, i) => (
                                <tr key={`skel-${i}`} className="border-b border-[#0e1a28]">
                                    {columns.map((c) => (
                                        <td key={c.key} className="px-4 py-3">
                                            <div className="skeleton h-4 w-3/4" />
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : sorted.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={columns.length}
                                    className="px-4 py-16 text-center"
                                >
                                    <p className="text-sm font-medium text-[#c8d8e8]">{emptyTitle}</p>
                                    {emptyDescription && (
                                        <p className="mt-1 text-xs text-[#7a8fa6]">
                                            {emptyDescription}
                                        </p>
                                    )}
                                    {emptyAction && <div className="mt-4">{emptyAction}</div>}
                                </td>
                            </tr>
                        ) : (
                            sorted.map((row, i) => (
                                <tr
                                    key={rowKey(row)}
                                    onClick={onRowClick ? () => onRowClick(row) : undefined}
                                    onKeyDown={(e) => handleRowKeyDown(e, row)}
                                    tabIndex={onRowClick ? 0 : undefined}
                                    role={onRowClick ? "button" : undefined}
                                    className={`border-b border-[#0e1a28] transition-colors last:border-b-0 hover:bg-[rgba(255,255,255,0.015)] focus-visible:bg-[rgba(0,229,160,0.08)] focus-visible:outline-none ${
                                        onRowClick ? "cursor-pointer" : ""
                                    }`}
                                >
                                    {columns.map((col) => (
                                        <td
                                            key={col.key}
                                            className={`px-4 py-3 text-[13px] text-[#c8d8e8] ${
                                                col.align === "right"
                                                    ? "text-right"
                                                    : col.align === "center"
                                                    ? "text-center"
                                                    : "text-left"
                                            }`}
                                        >
                                            {col.render(row, i)}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Mobile cards */}
            <div className="space-y-2 md:hidden" role="list">
                {isLoading ? (
                    Array.from({ length: 5 }).map((_, i) => (
                        <div
                            key={`skel-m-${i}`}
                            className="rounded-2xl border border-[#1A2A3A] bg-[#0D1928] p-4"
                        >
                            <div className="skeleton mb-2 h-4 w-1/2" />
                            <div className="skeleton mb-2 h-3 w-1/3" />
                            <div className="skeleton h-3 w-2/3" />
                        </div>
                    ))
                ) : sorted.length === 0 ? (
                    <div className="rounded-2xl border border-[#1A2A3A] bg-[#0D1928] p-8 text-center">
                        <p className="text-sm font-medium text-[#c8d8e8]">{emptyTitle}</p>
                        {emptyDescription && (
                            <p className="mt-1 text-xs text-[#7a8fa6]">{emptyDescription}</p>
                        )}
                        {emptyAction && <div className="mt-4">{emptyAction}</div>}
                    </div>
                ) : (
                    sorted.map((row, i) => (
                        <div
                            key={rowKey(row)}
                            role="listitem"
                            tabIndex={onRowClick ? 0 : undefined}
                            onClick={onRowClick ? () => onRowClick(row) : undefined}
                            onKeyDown={(e) => handleRowKeyDown(e, row)}
                            className={`rounded-2xl border border-[#1A2A3A] bg-[#0D1928] p-4 transition-colors hover:bg-[rgba(255,255,255,0.02)] focus-visible:border-[#00e5a0] focus-visible:outline-none ${
                                onRowClick ? "cursor-pointer" : ""
                            }`}
                        >
                            <dl className="space-y-1.5">
                                {columns.map((col) => (
                                    <div
                                        key={col.key}
                                        className="flex justify-between gap-3 text-[13px]"
                                    >
                                        <dt className="text-[11px] font-medium uppercase tracking-wide text-[#7a8fa6]">
                                            {col.label}
                                        </dt>
                                        <dd className="min-w-0 text-right text-[#c8d8e8]">
                                            {col.render(row, i)}
                                        </dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
