/**
 * Generic loading shell used by `loading.tsx` files at each route boundary.
 *
 * Renders a non-interactive skeleton that mirrors the typical page chrome
 * (header strip + KPI row + main panel), so the layout doesn't reflow when
 * the real content streams in.
 *
 * Pure server component — no hooks, no client JS.
 */
export default function RouteLoading() {
    return (
        <div role="status" aria-live="polite" className="px-6 py-6 md:px-8">
            <span className="sr-only">Loading…</span>

            {/* Title + subtitle */}
            <div className="mb-6">
                <div className="skeleton h-7 w-56" />
                <div className="skeleton mt-2 h-4 w-80" />
            </div>

            {/* KPI strip */}
            <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-5">
                {[0, 1, 2, 3, 4].map((i) => (
                    <div key={i} className="rounded-2xl border border-[#162030] bg-[#0b1422] p-5">
                        <div className="skeleton h-3 w-20" />
                        <div className="skeleton mt-3 h-8 w-24" />
                        <div className="skeleton mt-3 h-3 w-32" />
                    </div>
                ))}
            </div>

            {/* Body */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="space-y-4 lg:col-span-2">
                    <div className="rounded-2xl border border-[#162030] bg-[#0b1422] p-6">
                        <div className="skeleton mb-4 h-5 w-44" />
                        <div className="skeleton h-48 w-full" />
                    </div>
                    <div className="rounded-2xl border border-[#162030] bg-[#0b1422] p-6">
                        <div className="skeleton mb-4 h-5 w-44" />
                        <div className="space-y-2">
                            {[0, 1, 2, 3, 4].map((i) => (
                                <div key={i} className="skeleton h-10 w-full" />
                            ))}
                        </div>
                    </div>
                </div>
                <div className="space-y-4">
                    <div className="rounded-2xl border border-[#162030] bg-[#0b1422] p-6">
                        <div className="skeleton mb-4 h-5 w-32" />
                        <div className="skeleton h-32 w-full" />
                    </div>
                    <div className="rounded-2xl border border-[#162030] bg-[#0b1422] p-6">
                        <div className="skeleton mb-4 h-5 w-32" />
                        <div className="skeleton h-32 w-full" />
                    </div>
                </div>
            </div>
        </div>
    );
}
