"use client";

import {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
    type KeyboardEvent,
} from "react";
import { useRouter } from "next/navigation";
import {
    Search, X, ArrowRight, LayoutDashboard, Users, IndianRupee,
    Clock, Calendar, Briefcase, Target, BookOpen, FileText,
    Settings, HelpCircle, Shield, BarChart2, Zap,
} from "lucide-react";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";

// ─────────────────────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────────────────────

interface CommandItem {
    id: string;
    label: string;
    description?: string;
    href: string;
    icon: typeof LayoutDashboard;
    group: string;
    keywords?: string[];
}

const COMMANDS: CommandItem[] = [
    // Core
    { id: "dashboard",        label: "Dashboard",           href: "/dashboard",                  icon: LayoutDashboard, group: "Core" },
    { id: "employees",        label: "Employees",           href: "/employees",                  icon: Users,           group: "Core" },
    { id: "add-employee",     label: "Add Employee",        href: "/employees/add",              icon: Users,           group: "Core", keywords: ["new", "hire", "onboard"] },
    { id: "directory",        label: "Employee Directory",  href: "/employees/directory",        icon: Users,           group: "Core" },
    { id: "import-employees", label: "Import Employees",    href: "/employees/import",           icon: Users,           group: "Core", keywords: ["bulk", "csv", "upload"] },
    // Payroll
    { id: "payroll",          label: "Payroll Dashboard",   href: "/payroll/dashboard",          icon: IndianRupee,     group: "Payroll" },
    { id: "run-payroll",      label: "Run Payroll",         href: "/payroll/run/select-month",   icon: IndianRupee,     group: "Payroll", keywords: ["process", "disburse"] },
    { id: "payslips",         label: "Payslips",            href: "/payroll/payslips/bulk",      icon: IndianRupee,     group: "Payroll" },
    { id: "ctc-revision",     label: "CTC Revision",        href: "/payroll/ctc-revision",       icon: IndianRupee,     group: "Payroll", keywords: ["salary", "hike", "increment"] },
    { id: "form-16",          label: "Form 16",             href: "/tax/form-16",                icon: FileText,        group: "Payroll", keywords: ["tds", "tax"] },
    // Attendance
    { id: "attendance",       label: "Attendance",          href: "/attendance/dashboard",       icon: Clock,           group: "Attendance" },
    { id: "live-attendance",  label: "Live Attendance",     href: "/attendance/live",            icon: Clock,           group: "Attendance" },
    { id: "regularization",   label: "Regularization",      href: "/attendance/regularization",  icon: Clock,           group: "Attendance" },
    // Leave
    { id: "leave",            label: "Leave Dashboard",     href: "/leave/dashboard",            icon: Calendar,        group: "Leave" },
    { id: "apply-leave",      label: "Apply Leave",         href: "/my-leave/apply",             icon: Calendar,        group: "Leave", keywords: ["request", "off"] },
    { id: "leave-approvals",  label: "Leave Approvals",     href: "/leave/approvals",            icon: Calendar,        group: "Leave" },
    // Recruitment
    { id: "recruitment",      label: "Recruitment",         href: "/recruitment/dashboard",      icon: Briefcase,       group: "Talent" },
    { id: "jobs",             label: "Job Postings",        href: "/recruitment/jobs",           icon: Briefcase,       group: "Talent" },
    { id: "candidates",       label: "Candidates",          href: "/recruitment/candidates",     icon: Briefcase,       group: "Talent" },
    // Performance
    { id: "performance",      label: "Performance",         href: "/performance/dashboard",      icon: Target,          group: "Talent" },
    { id: "goals",            label: "Goal Setting",        href: "/performance/goals/set",      icon: Target,          group: "Talent" },
    // LMS
    { id: "lms",              label: "Learning",            href: "/lms/dashboard",              icon: BookOpen,        group: "Talent" },
    // Compliance
    { id: "compliance",       label: "Compliance",          href: "/compliance/dashboard",       icon: Shield,          group: "Compliance" },
    { id: "pf-challan",       label: "PF Challan",          href: "/compliance/pf-challan",      icon: Shield,          group: "Compliance", keywords: ["provident fund", "epfo"] },
    { id: "esi-challan",      label: "ESI Challan",         href: "/compliance/esi-challan",     icon: Shield,          group: "Compliance", keywords: ["esic"] },
    { id: "tds-return",       label: "TDS Return 24Q",      href: "/compliance/tds-return-24q",  icon: Shield,          group: "Compliance" },
    // Reports
    { id: "reports",          label: "Reports",             href: "/reports/dashboard",          icon: BarChart2,       group: "Reports" },
    { id: "report-builder",   label: "Custom Report Builder", href: "/reports/builder",          icon: BarChart2,       group: "Reports" },
    // AI
    { id: "ai-copilot",       label: "HR Copilot",          href: "/ai/hr-copilot",              icon: Zap,             group: "AI", keywords: ["chat", "assistant", "ai"] },
    { id: "nl-query",         label: "Natural Language Query", href: "/ai/nl-query",             icon: Zap,             group: "AI", keywords: ["ask", "search", "ai"] },
    // Settings
    { id: "settings",         label: "Settings",            href: "/settings",                   icon: Settings,        group: "Settings" },
    { id: "roles",            label: "Role Permissions",    href: "/settings/roles",             icon: Settings,        group: "Settings" },
    { id: "integrations",     label: "Integrations",        href: "/settings/integrations",      icon: Settings,        group: "Settings" },
    { id: "help",             label: "Help Center",         href: "/help",                       icon: HelpCircle,      group: "Help" },
    { id: "shortcuts",        label: "Keyboard Shortcuts",  href: "/help/shortcuts",             icon: HelpCircle,      group: "Help" },
];

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

function score(item: CommandItem, q: string): number {
    const lq = q.toLowerCase();
    const label = item.label.toLowerCase();
    const desc = (item.description ?? "").toLowerCase();
    const kw = (item.keywords ?? []).join(" ").toLowerCase();
    if (label === lq) return 100;
    if (label.startsWith(lq)) return 80;
    if (label.includes(lq)) return 60;
    if (desc.includes(lq) || kw.includes(lq)) return 40;
    return 0;
}

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

interface CommandPaletteProps {
    open: boolean;
    onClose: () => void;
}

export default function CommandPalette({ open, onClose }: CommandPaletteProps) {
    const router = useRouter();
    const [query, setQuery] = useState("");
    const [activeIdx, setActiveIdx] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLUListElement>(null);
    const debouncedQuery = useDebouncedValue(query, 80);

    const results = useMemo<CommandItem[]>(() => {
        if (!debouncedQuery.trim()) return COMMANDS.slice(0, 8);
        return COMMANDS
            .map((item) => ({ item, s: score(item, debouncedQuery) }))
            .filter(({ s }) => s > 0)
            .sort((a, b) => b.s - a.s)
            .map(({ item }) => item)
            .slice(0, 12);
    }, [debouncedQuery]);

    // Reset state when opened.
    useEffect(() => {
        if (open) {
            setQuery("");
            setActiveIdx(0);
            setTimeout(() => inputRef.current?.focus(), 10);
        }
    }, [open]);

    // Clamp active index when results change.
    useEffect(() => {
        setActiveIdx((i) => Math.min(i, Math.max(results.length - 1, 0)));
    }, [results]);

    const navigate = useCallback(
        (href: string) => {
            onClose();
            router.push(href);
        },
        [onClose, router]
    );

    const handleKeyDown = useCallback(
        (e: KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "ArrowDown") {
                e.preventDefault();
                setActiveIdx((i) => Math.min(i + 1, results.length - 1));
            } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setActiveIdx((i) => Math.max(i - 1, 0));
            } else if (e.key === "Enter") {
                e.preventDefault();
                const item = results[activeIdx];
                if (item) navigate(item.href);
            } else if (e.key === "Escape") {
                onClose();
            }
        },
        [results, activeIdx, navigate, onClose]
    );

    // Scroll active item into view.
    useEffect(() => {
        const el = listRef.current?.children[activeIdx] as HTMLElement | undefined;
        el?.scrollIntoView({ block: "nearest" });
    }, [activeIdx]);

    if (!open) return null;

    // Group results for display.
    const grouped = results.reduce<Record<string, CommandItem[]>>((acc, item) => {
        (acc[item.group] ??= []).push(item);
        return acc;
    }, {});

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 z-[9998] bg-black/60 backdrop-blur-sm"
                aria-hidden="true"
                onClick={onClose}
            />

            {/* Panel */}
            <div
                role="dialog"
                aria-modal="true"
                aria-label="Command palette"
                className="fixed left-1/2 top-[15vh] z-[9999] w-full max-w-xl -translate-x-1/2 rounded-2xl border border-[#1e3048] bg-[#070d18] shadow-[0_24px_80px_rgba(0,0,0,0.8)] animate-scale-in"
            >
                {/* Search input */}
                <div className="flex items-center gap-3 border-b border-[#162030] px-4 py-3">
                    <Search size={16} className="shrink-0 text-[#7a8fa6]" aria-hidden="true" />
                    <input
                        ref={inputRef}
                        type="search"
                        role="combobox"
                        aria-expanded={results.length > 0}
                        aria-controls="cmd-listbox"
                        aria-activedescendant={results[activeIdx] ? `cmd-item-${results[activeIdx].id}` : undefined}
                        aria-autocomplete="list"
                        value={query}
                        onChange={(e) => { setQuery(e.target.value); setActiveIdx(0); }}
                        onKeyDown={handleKeyDown}
                        placeholder="Search pages, actions, employees…"
                        className="flex-1 bg-transparent text-[14px] text-[#f0f4f8] placeholder:text-[#7a8fa6] outline-none"
                        autoComplete="off"
                        spellCheck={false}
                    />
                    {query && (
                        <button
                            type="button"
                            aria-label="Clear search"
                            onClick={() => { setQuery(""); inputRef.current?.focus(); }}
                            className="text-[#7a8fa6] hover:text-[#7a8fa6] transition-colors"
                        >
                            <X size={14} />
                        </button>
                    )}
                    <kbd className="hidden rounded border border-[#162030] bg-[#0b1422] px-1.5 py-0.5 text-[10px] text-[#7a8fa6] sm:block">
                        ESC
                    </kbd>
                </div>

                {/* Results */}
                <ul
                    id="cmd-listbox"
                    ref={listRef}
                    role="listbox"
                    aria-label="Search results"
                    className="max-h-[60vh] overflow-y-auto py-2"
                >
                    {results.length === 0 ? (
                        <li className="px-4 py-8 text-center text-[13px] text-[#7a8fa6]">
                            No results for &ldquo;{query}&rdquo;
                        </li>
                    ) : (
                        Object.entries(grouped).map(([group, items]) => (
                            <li key={group} role="presentation">
                                <p className="px-4 pb-1 pt-3 text-[10px] font-semibold uppercase tracking-widest text-[#2a3a4a]">
                                    {group}
                                </p>
                                <ul role="group" aria-label={group}>
                                    {items.map((item) => {
                                        const globalIdx = results.indexOf(item);
                                        const isActive = globalIdx === activeIdx;
                                        const Icon = item.icon;
                                        return (
                                            <li
                                                key={item.id}
                                                id={`cmd-item-${item.id}`}
                                                role="option"
                                                aria-selected={isActive}
                                                onMouseEnter={() => setActiveIdx(globalIdx)}
                                                onClick={() => navigate(item.href)}
                                                className={`mx-2 flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 transition-colors ${
                                                    isActive
                                                        ? "bg-[rgba(0,229,160,0.1)] text-[#00e5a0]"
                                                        : "text-[#c8d8e8] hover:bg-[rgba(255,255,255,0.04)]"
                                                }`}
                                            >
                                                <div
                                                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg"
                                                    style={{
                                                        background: isActive
                                                            ? "rgba(0,229,160,0.15)"
                                                            : "rgba(255,255,255,0.05)",
                                                    }}
                                                >
                                                    <Icon
                                                        size={14}
                                                        style={{ color: isActive ? "#00e5a0" : "#7a8fa6" }}
                                                        aria-hidden="true"
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="truncate text-[13px] font-medium">
                                                        {item.label}
                                                    </p>
                                                    {item.description && (
                                                        <p className="truncate text-[11px] text-[#7a8fa6]">
                                                            {item.description}
                                                        </p>
                                                    )}
                                                </div>
                                                {isActive && (
                                                    <ArrowRight size={13} className="shrink-0 text-[#00e5a0]" aria-hidden="true" />
                                                )}
                                            </li>
                                        );
                                    })}
                                </ul>
                            </li>
                        ))
                    )}
                </ul>

                {/* Footer */}
                <div className="flex items-center gap-4 border-t border-[#162030] px-4 py-2.5">
                    {[
                        { keys: ["↑", "↓"], label: "navigate" },
                        { keys: ["↵"], label: "open" },
                        { keys: ["esc"], label: "close" },
                    ].map(({ keys, label }) => (
                        <span key={label} className="flex items-center gap-1 text-[10px] text-[#2a3a4a]">
                            {keys.map((k) => (
                                <kbd
                                    key={k}
                                    className="rounded border border-[#162030] bg-[#0b1422] px-1 py-0.5 font-mono text-[10px]"
                                >
                                    {k}
                                </kbd>
                            ))}
                            <span>{label}</span>
                        </span>
                    ))}
                </div>
            </div>
        </>
    );
}
