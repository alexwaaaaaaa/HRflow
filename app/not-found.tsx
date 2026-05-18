import Link from "next/link";
import { FileQuestion, Home, ArrowLeft } from "lucide-react";

export const metadata = {
    title: "Page not found — HRFlow",
    description: "The page you were looking for doesn't exist.",
};

export default function NotFound() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-[#04080f] px-6 py-12">
            <div className="w-full max-w-md rounded-2xl border border-[#1A2A3A] bg-[#0D1928] p-8 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[rgba(0,229,160,0.1)]">
                    <FileQuestion className="h-6 w-6 text-[#00e5a0]" aria-hidden="true" />
                </div>
                <h1 className="text-2xl font-semibold text-white">404 — Page not found</h1>
                <p className="mt-2 text-sm text-[#7a8fa6]">
                    The page you were looking for doesn&apos;t exist or has been moved.
                </p>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                    <Link
                        href="/dashboard"
                        className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#00e5a0] px-4 text-sm font-semibold text-[#04080f] transition-colors hover:bg-[#00cc8e]"
                    >
                        <Home className="h-4 w-4" aria-hidden="true" /> Go home
                    </Link>
                    <Link
                        href="/help"
                        className="inline-flex h-10 items-center gap-2 rounded-lg border border-[#1A2A3A] bg-[#0f1c2e] px-4 text-sm text-[#c8d8e8] transition-colors hover:border-[#1e3048] hover:text-white"
                    >
                        <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Help center
                    </Link>
                </div>
            </div>
        </main>
    );
}
