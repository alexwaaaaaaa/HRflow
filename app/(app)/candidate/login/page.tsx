"use client";
import React from 'react';
import { ArrowRight, Github, Linkedin } from 'lucide-react';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function CandidateLoginScreen() {
    return (
        <div className="min-h-screen bg-[#0A1420] flex">
            {/* Left side art/branding */}
            <div className="hidden lg:flex flex-1 bg-indigo-600/10 border-r border-[#1A2A3A] relative overflow-hidden flex-col justify-between p-12">
                <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-500/20 blur-[120px] rounded-full pointer-events-none" aria-hidden="true" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" aria-hidden="true" />

                <div className="z-10">
                    <h1 className="text-3xl font-black text-white flex items-center gap-2">
                        <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center text-white font-bold" aria-hidden="true">H</div>
                        HRFlow Careers
                    </h1>
                </div>

                <div className="z-10 max-w-md">
                    <h2 className="text-4xl font-bold text-white mb-6 leading-tight">Join a team building the future of work.</h2>
                    <p className="text-indigo-200 text-lg">Manage your applications, track interview status, and access your offers — all from your candidate portal.</p>
                </div>

                <div className="z-10">
                    <div className="flex gap-2" aria-hidden="true">
                        <div className="w-2 h-2 rounded-full bg-indigo-400"></div>
                        <div className="w-2 h-2 rounded-full bg-indigo-400/30"></div>
                        <div className="w-2 h-2 rounded-full bg-indigo-400/30"></div>
                    </div>
                </div>
            </div>

            {/* Login Form */}
            <div className="flex-1 flex flex-col justify-center items-center p-6 relative">
                <div className="w-full max-w-md space-y-8 relative z-10">
                    <div className="text-center lg:text-left">
                        <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
                        <p className="text-[#8899AA]">Sign in to continue your application journey.</p>
                    </div>

                    <div className="space-y-4">
                        <Button variant="secondary" size="md" className="w-full">
                            <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
                                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            Continue with Google
                        </Button>
                        <Button variant="secondary" size="md" className="w-full">
                            <Linkedin size={20} className="text-[#0A66C2]" aria-hidden="true" />
                            Continue with LinkedIn
                        </Button>
                        <Button variant="secondary" size="md" className="w-full">
                            <Github size={20} aria-hidden="true" />
                            Continue with GitHub
                        </Button>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex-1 h-px bg-[#2A3A4A]"></div>
                        <div className="text-[#556677] text-xs font-bold uppercase tracking-wider">OR EMAIL</div>
                        <div className="flex-1 h-px bg-[#2A3A4A]"></div>
                    </div>

                    <form className="space-y-4">
                        <div>
                            <label htmlFor="candidate-email" className="block text-[#8899AA] text-xs font-bold mb-2">Email Address</label>
                            <input
                                id="candidate-email"
                                type="email"
                                placeholder="jane@example.com"
                                className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl px-4 py-3 text-white focus:border-indigo-500 outline-none transition-colors"
                            />
                        </div>
                        <Link href="/candidate/profile" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 mt-6 block text-center">
                            Send Magic Link <ArrowRight size={18} aria-hidden="true" />
                        </Link>
                    </form>

                    <p className="text-[#556677] text-xs text-center mt-8">
                        By continuing, you agree to our <span className="text-white underline cursor-pointer">Terms of Service</span> and <span className="text-white underline cursor-pointer">Privacy Policy</span>.
                    </p>
                </div>
            </div>
        </div>
    );
}
