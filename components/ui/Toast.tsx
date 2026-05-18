"use client";

import {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useRef,
    useState,
} from "react";
import { CheckCircle, AlertTriangle, AlertCircle, Info, X } from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// Public API
// ─────────────────────────────────────────────────────────────────────────────

export type ToastVariant = "success" | "warning" | "danger" | "info";

export interface Toast {
    id: string;
    variant: ToastVariant;
    title: string;
    description?: string;
    /** Auto-dismiss after this many milliseconds. 0 = sticky. */
    durationMs?: number;
}

interface ToastApi {
    show: (t: Omit<Toast, "id">) => string;
    dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastApi | null>(null);

/** Hook for any client component to surface toast messages. */
export function useToast(): ToastApi {
    const ctx = useContext(ToastContext);
    if (!ctx) {
        throw new Error("useToast must be used inside <ToastProvider>");
    }
    return ctx;
}

// ─────────────────────────────────────────────────────────────────────────────
// Provider + viewport
// ─────────────────────────────────────────────────────────────────────────────

const VARIANT_META: Record<
    ToastVariant,
    { icon: typeof CheckCircle; tint: string; bg: string; border: string }
> = {
    success: { icon: CheckCircle,   tint: "#00e5a0", bg: "rgba(0,229,160,0.08)",  border: "rgba(0,229,160,0.25)" },
    warning: { icon: AlertTriangle, tint: "#f59e0b", bg: "rgba(245,158,11,0.08)", border: "rgba(245,158,11,0.25)" },
    danger:  { icon: AlertCircle,   tint: "#ef4444", bg: "rgba(239,68,68,0.08)",  border: "rgba(239,68,68,0.25)" },
    info:    { icon: Info,          tint: "#3b82f6", bg: "rgba(59,130,246,0.08)", border: "rgba(59,130,246,0.25)" },
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);
    const timersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

    const dismiss = useCallback((id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
        const timer = timersRef.current.get(id);
        if (timer) {
            clearTimeout(timer);
            timersRef.current.delete(id);
        }
    }, []);

    const show = useCallback(
        ({ durationMs = 4500, ...t }: Omit<Toast, "id">) => {
            // crypto.randomUUID() is available in all modern browsers and Node 19+
            const id = crypto.randomUUID();

            setToasts((prev) => [...prev, { id, durationMs, ...t }]);

            if (durationMs > 0) {
                const timer = setTimeout(() => dismiss(id), durationMs);
                timersRef.current.set(id, timer);
            }
            return id;
        },
        [dismiss]
    );

    const api = useMemo<ToastApi>(() => ({ show, dismiss }), [show, dismiss]);

    return (
        <ToastContext.Provider value={api}>
            {children}

            {/* Live region — `polite` so it doesn't interrupt screen-reader speech. */}
            <div
                role="region"
                aria-label="Notifications"
                aria-live="polite"
                className="pointer-events-none fixed bottom-4 right-4 z-[9999] flex w-full max-w-sm flex-col gap-2"
            >
                {toasts.map((t) => {
                    const meta = VARIANT_META[t.variant];
                    const Icon = meta.icon;
                    return (
                        <div
                            key={t.id}
                            role="status"
                            className="pointer-events-auto flex items-start gap-3 rounded-xl border px-4 py-3 shadow-[0_4px_24px_rgba(0,0,0,0.5)] backdrop-blur-md animate-slide-in-right"
                            style={{
                                background: meta.bg,
                                borderColor: meta.border,
                                color: "#f0f4f8",
                            }}
                        >
                            <Icon
                                className="mt-0.5 h-4 w-4 shrink-0"
                                aria-hidden="true"
                                style={{ color: meta.tint }}
                            />
                            <div className="flex-1 min-w-0">
                                <p className="text-[13px] font-semibold" style={{ color: meta.tint }}>
                                    {t.title}
                                </p>
                                {t.description && (
                                    <p className="mt-0.5 text-[12px] text-[#c8d8e8]">{t.description}</p>
                                )}
                            </div>
                            <button
                                type="button"
                                aria-label="Dismiss notification"
                                onClick={() => dismiss(t.id)}
                                className="ml-1 shrink-0 rounded p-0.5 text-[#7a8fa6] transition-colors hover:text-white"
                            >
                                <X className="h-3.5 w-3.5" aria-hidden="true" />
                            </button>
                        </div>
                    );
                })}
            </div>
        </ToastContext.Provider>
    );
}
