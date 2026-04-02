"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, AlertCircle, Loader2 } from "lucide-react";
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

export default function LoginForm() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [formState, setFormState] = useState<FormState>("idle");
    const [shake, setShake] = useState(false);

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
        // Simulate API call — replace with real auth call
        await new Promise((r) => setTimeout(r, 800));
        setFormState("success");
        router.push("/dashboard");
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className={cn("w-full", shake && "animate-shake")}
            noValidate
        >
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
                    <label
                        htmlFor="password"
                        style={{ fontSize: "12px", fontWeight: 500, color: "#8899AA" }}
                        className="block mb-1.5"
                    >
                        Password
                    </label>
                    <div className="relative">
                        <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className={cn(
                                "w-full h-10 px-3 pr-10 rounded-lg text-sm outline-none transition-all duration-200 placeholder:text-[#445566]",
                                errors.password ? "border-[#FF4444]" : "border-[#1A2A3A] focus:border-[#00E5A0]"
                            )}
                            style={{ background: "#0D1928", border: `1px solid ${errors.password ? "#FF4444" : "#1A2A3A"}`, color: "#FFFFFF" }}
                            {...register("password")}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#445566] hover:text-[#8899AA] transition-colors"
                        >
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                    </div>
                    {errors.password && (
                        <p className="mt-1 text-xs" style={{ color: "#FF4444" }}>
                            {errors.password.message}
                        </p>
                    )}
                </div>

                {/* Remember + Forgot row */}
                <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            {...register("remember")}
                            className="rounded"
                            style={{ accentColor: "#00E5A0" }}
                        />
                        <span style={{ fontSize: 14, color: "#8899AA" }}>Remember me</span>
                    </label>
                    <a href="/forgot-password" style={{ fontSize: 14, color: "#0066FF" }}>
                        Forgot password?
                    </a>
                </div>

                {/* Error banner */}
                {formState === "error" && (
                    <div
                        className="flex items-start gap-3 rounded-lg p-3"
                        style={{
                            background: "rgba(255,68,68,0.1)",
                            border: "1px solid #FF4444",
                        }}
                    >
                        <AlertCircle size={16} style={{ color: "#FF4444", marginTop: 1, flexShrink: 0 }} />
                        <p style={{ fontSize: 13, color: "#FF4444" }}>
                            Invalid email or password. 2 attempts remaining.
                        </p>
                    </div>
                )}

                {/* Sign In button */}
                <button
                    type="submit"
                    disabled={formState === "loading"}
                    className="w-full h-12 rounded-lg font-semibold text-sm transition-all duration-150 flex items-center justify-center gap-2 mt-1 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                    style={{
                        background: formState === "success" ? "#00E5A0" : "#00E5A0",
                        color: "#060B14",
                    }}
                >
                    {formState === "loading" ? (
                        <>
                            <Loader2 size={16} className="animate-spin" />
                            Signing in...
                        </>
                    ) : (
                        "Sign In"
                    )}
                </button>

                {/* Divider */}
                <div className="flex items-center gap-3">
                    <div className="flex-1 h-px" style={{ background: "#1A2A3A" }} />
                    <span style={{ fontSize: 14, color: "#445566" }}>or continue with</span>
                    <div className="flex-1 h-px" style={{ background: "#1A2A3A" }} />
                </div>

                {/* SSO buttons */}
                <div className="flex gap-3">
                    <a
                        href="/sso/google"
                        className="flex-1 h-10 rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition-all duration-150 hover:bg-[#242F3F]"
                        style={{
                            background: "#1A2A3A",
                            color: "#FFFFFF",
                            border: "1px solid #1A2A3A",
                        }}
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                        Google Workspace
                    </a>
                    <a
                        href="/sso/microsoft"
                        className="flex-1 h-10 rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition-all duration-150 hover:bg-[#242F3F]"
                        style={{
                            background: "#1A2A3A",
                            color: "#FFFFFF",
                            border: "1px solid #1A2A3A",
                        }}
                    >
                        <svg width="16" height="16" viewBox="0 0 23 23" fill="none">
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
