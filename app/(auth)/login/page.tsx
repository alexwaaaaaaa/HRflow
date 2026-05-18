import { Suspense } from "react";
import AuthRightPanel from "@/components/auth/AuthRightPanel";
import LoginForm from "./LoginForm";

export const metadata = {
    title: "Sign in — HRFlow",
    description: "Sign in to your HRFlow workspace.",
};

export default function LoginPage() {
    return (
        <div className="flex min-h-screen flex-col lg:flex-row">
            {/* ── Left panel — form ── */}
            <div className="flex w-full flex-col px-6 py-10 sm:px-12 lg:w-[520px] lg:min-w-[520px] lg:px-16 xl:w-[600px] xl:min-w-[600px] xl:px-20 bg-[#060B14]">
                {/* Logo */}
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-[#00E5A0] flex items-center justify-center flex-shrink-0">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                <path
                                    d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                                    stroke="#060B14"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
                        <span className="text-2xl font-bold text-[#00E5A0]">HRFlow</span>
                    </div>
                    <span className="text-xs text-[#8899AA]">India&apos;s Most Intelligent HRMS</span>
                </div>

                {/* Form — vertically centred on large screens */}
                <div className="flex flex-1 flex-col justify-center py-10">
                    <h1 className="text-3xl font-bold text-white">Welcome back</h1>
                    <p className="mt-2 mb-8 text-sm text-[#8899AA]">
                        Sign in to your HRFlow workspace
                    </p>

                    <Suspense
                        fallback={
                            <div className="h-[280px] w-full animate-pulse rounded-lg bg-[#0D1928]" />
                        }
                    >
                        <LoginForm />
                    </Suspense>

                    <p className="mt-6 text-center text-sm text-[#8899AA]">
                        New to HRFlow?{" "}
                        <a href="/company-setup/start" className="text-[#00E5A0] hover:underline">
                            Request a Demo
                        </a>
                    </p>
                </div>

                {/* Footer */}
                <p className="text-center text-xs text-[#445566]">
                    © {new Date().getFullYear()} HRFlow Technologies Pvt. Ltd.
                </p>
            </div>

            {/* ── Right panel — decorative (hidden on mobile) ── */}
            <div className="hidden flex-1 lg:flex">
                <AuthRightPanel />
            </div>
        </div>
    );
}
