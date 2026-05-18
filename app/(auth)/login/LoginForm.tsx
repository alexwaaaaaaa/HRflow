"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import { setDemoSession } from "@/lib/auth/session";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const schema = z.object({
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    remember: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof schema>;

type FormState = "idle" | "loading" | "error" | "success";

const SAFE_NEXT = /^\/[^/].*/;

export default function LoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [showPassword, setShowPassword] = useState(false);
    const [formState, setFormState] = useState<FormState>("idle");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(schema),
        defaultValues: { remember: false },
    });

    const onSubmit = async (_data: LoginFormData) => {
        setFormState("loading");
        setErrorMessage(null);
        try {
            // Simulated API call — replace with real auth integration.
            await new Promise((r) => setTimeout(r, 700));
            setDemoSession();
            setFormState("success");

            // Honour ?next= only if it points to a same-origin pathname,
            // never an absolute URL or protocol-relative path (open redirect guard).
            const next = searchParams.get("next");
            const dest = next && SAFE_NEXT.test(next) ? next : "/dashboard";
            router.push(dest);
        } catch {
            setFormState("error");
            setErrorMessage("Sign-in failed. Please try again.");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full" noValidate>
            <div className="flex flex-col gap-4">
                <Input
                    id="email"
                    label="Work Email"
                    type="email"
                    placeholder="you@company.com"
                    error={errors.email?.message}
                    {...register("email")}
                />

                <div className="w-full">
                    <label htmlFor="password" className="block mb-1.5 text-xs font-medium text-[#8899AA]">
                        Password
                    </label>
                    <div className="relative">
                        <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            aria-invalid={!!errors.password}
                            aria-describedby={errors.password ? "password-error" : undefined}
                            className={cn(
                                "w-full h-10 px-3 pr-10 rounded-lg text-sm outline-none transition-all duration-200 placeholder:text-[#445566] bg-[#0D1928] text-white border",
                                errors.password
                                    ? "border-[#FF4444] focus:border-[#FF4444]"
                                    : "border-[#1A2A3A] focus:border-[#00E5A0]"
                            )}
                            {...register("password")}
                        />
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowPassword((v) => !v)}
                            aria-label={showPassword ? "Hide password" : "Show password"}
                            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0 border-0 bg-transparent text-[#445566] hover:text-[#8899AA]"
                        >
                            {showPassword ? <EyeOff size={16} aria-hidden="true" /> : <Eye size={16} aria-hidden="true" />}
                        </Button>
                    </div>
                    {errors.password && (
                        <p id="password-error" className="mt-1 text-xs text-[#FF4444]">
                            {errors.password.message}
                        </p>
                    )}
                </div>

                <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            {...register("remember")}
                            className="rounded"
                            style={{ accentColor: "#00E5A0" }}
                        />
                        <span className="text-sm text-[#8899AA]">Remember me</span>
                    </label>
                    <a href="/forgot-password" className="text-sm text-[#0066FF] hover:underline">
                        Forgot password?
                    </a>
                </div>

                {formState === "error" && (
                    <div
                        role="alert"
                        className="flex items-start gap-3 rounded-lg p-3 bg-[rgba(255,68,68,0.1)] border border-[#FF4444]"
                    >
                        <AlertCircle size={16} className="text-[#FF4444] mt-0.5 shrink-0" />
                        <p className="text-[13px] text-[#FF4444]">
                            {errorMessage ?? "Invalid email or password."}
                        </p>
                    </div>
                )}

                <Button
                    type="submit"
                    size="lg"
                    className="w-full mt-1"
                    disabled={formState === "loading"}
                    isLoading={formState === "loading"}
                    loadingText="Signing in..."
                >
                    Sign In
                </Button>

                <div className="flex items-center gap-3">
                    <div className="flex-1 h-px bg-[#1A2A3A]" />
                    <span className="text-sm text-[#445566]">or continue with</span>
                    <div className="flex-1 h-px bg-[#1A2A3A]" />
                </div>

                <div className="flex gap-3">
                    <a
                        href="/sso/google"
                        className="flex-1 h-10 rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition-colors hover:bg-[#242F3F] bg-[#1A2A3A] text-white border border-[#1A2A3A]"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <path
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                fill="#4285F4"
                            />
                            <path
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                fill="#34A853"
                            />
                            <path
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                fill="#FBBC05"
                            />
                            <path
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                fill="#EA4335"
                            />
                        </svg>
                        Google Workspace
                    </a>
                    <a
                        href="/sso/microsoft"
                        className="flex-1 h-10 rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition-colors hover:bg-[#242F3F] bg-[#1A2A3A] text-white border border-[#1A2A3A]"
                    >
                        <svg width="16" height="16" viewBox="0 0 23 23" fill="none" aria-hidden="true">
                            <rect x="1" y="1" width="9.5" height="9.5" fill="#F25022" />
                            <rect x="12.5" y="1" width="9.5" height="9.5" fill="#7FBA00" />
                            <rect x="1" y="12.5" width="9.5" height="9.5" fill="#00A4EF" />
                            <rect x="12.5" y="12.5" width="9.5" height="9.5" fill="#FFB900" />
                        </svg>
                        Microsoft 365
                    </a>
                </div>
            </div>
        </form>
    );
}
