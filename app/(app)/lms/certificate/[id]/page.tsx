"use client";
import React from "react";
import { Share2, Award, ShieldCheck, DownloadCloud, Linkedin } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function CertificateScreen() {
    return (
        <Page
            title="Certificate of Completion"
            subtitle="Advanced React Patterns & Architecture"
            breadcrumbs={[
                { label: "LMS", href: "/lms/dashboard" },
                { label: "Certificates", href: "/lms/certificate" },
                { label: "TC-REACT-089921" },
            ]}
            maxWidth="1400px"
        >
            <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* Certificate Display Area */}
                <div className="flex-1 w-full">
                    <Card padding="lg" variant="elevated" className="overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-[#33E6FF]/5 to-transparent pointer-events-none" aria-hidden="true" />

                        {/* The Certificate Artboard */}
                        <div className="aspect-[1.414/1] w-full max-w-4xl mx-auto bg-white rounded-lg shadow-2xl relative overflow-hidden border-8 border-double border-gray-200">
                            <div className="absolute top-0 left-0 w-32 h-32 border-t-8 border-l-8 border-blue-800 rounded-tl-lg pointer-events-none opacity-20" aria-hidden="true" />
                            <div className="absolute bottom-0 right-0 w-32 h-32 border-b-8 border-r-8 border-blue-800 rounded-br-lg pointer-events-none opacity-20" aria-hidden="true" />

                            <div className="w-full h-full flex flex-col items-center justify-center p-12 lg:p-20 text-center relative z-10">
                                <div className="mb-8 flex items-center justify-center">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-blue-600" aria-hidden="true" />
                                        <span className="text-2xl font-black text-gray-900 tracking-tighter">
                                            TechCorp<span className="text-blue-600">.</span>
                                        </span>
                                    </div>
                                </div>

                                <p className="text-gray-500 uppercase tracking-[0.3em] text-sm font-semibold mb-6">Certificate of Completion</p>
                                <p className="text-gray-400 italic mb-4">This is to certify that</p>

                                <h2 className="text-4xl lg:text-6xl font-serif text-gray-900 mb-6 italic border-b-2 border-blue-100 pb-2 inline-block px-10">
                                    Arjun Kumar
                                </h2>

                                <p className="text-gray-500 mb-2">has successfully completed the formal curriculum and demonstrated proficiency in</p>

                                <h3 className="text-2xl lg:text-3xl font-bold text-blue-900 mb-12">
                                    Advanced React Patterns &amp; Architecture
                                </h3>

                                <div className="flex justify-between w-full max-w-2xl mt-auto items-end">
                                    <div className="text-center">
                                        <p className="text-gray-900 font-medium whitespace-nowrap">Sarah Drasner</p>
                                        <div className="w-32 h-px bg-gray-400 my-1 mx-auto" />
                                        <p className="text-xs text-gray-500 uppercase">Instructor</p>
                                    </div>

                                    <div className="w-24 h-24 relative flex items-center justify-center shrink-0" aria-hidden="true">
                                        <ShieldCheck size={80} className="text-emerald-500 opacity-20 absolute" />
                                        <Award size={48} className="text-emerald-600 relative z-10" />
                                    </div>

                                    <div className="text-center">
                                        <p className="text-gray-900 font-mono text-sm tracking-widest whitespace-nowrap">Oct 24, 2025</p>
                                        <div className="w-32 h-px bg-gray-400 my-1 mx-auto" />
                                        <p className="text-xs text-gray-500 uppercase">Date</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Action panel */}
                <div className="w-full md:w-80 lg:w-96 shrink-0 space-y-6">
                    <Card padding="lg">
                        <h3 className="font-bold text-white text-xl mb-2">Share your success</h3>
                        <p className="text-sm text-[#8899AA] mb-6 leading-relaxed">
                            Add this certificate to your LinkedIn profile to showcase your skills to your network and recruiters.
                        </p>
                        <Button
                            variant="primary"
                            className="w-full justify-center mb-3 bg-[#0077b5] hover:bg-[#006097]"
                            icon={<Linkedin size={18} aria-hidden="true" />}
                        >
                            Add to LinkedIn profile
                        </Button>
                        <div className="grid grid-cols-2 gap-3">
                            <Button variant="secondary" className="justify-center" icon={<DownloadCloud size={16} className="text-[#33E6FF]" aria-hidden="true" />}>
                                PDF
                            </Button>
                            <Button variant="secondary" className="justify-center" icon={<DownloadCloud size={16} className="text-[#33E6FF]" aria-hidden="true" />}>
                                Image
                            </Button>
                        </div>
                    </Card>

                    <Card padding="lg" variant="elevated">
                        <h4 className="font-bold text-white mb-4 uppercase tracking-wider text-xs border-b border-[#2A3A4A] pb-2">Credential Info</h4>
                        <ul className="space-y-4 text-sm">
                            <li>
                                <span className="block text-[#8899AA] text-xs uppercase tracking-wider mb-1">Recipient</span>
                                <span className="text-white font-medium">Arjun Kumar</span>
                            </li>
                            <li>
                                <span className="block text-[#8899AA] text-xs uppercase tracking-wider mb-1">Issue Date</span>
                                <span className="text-white font-medium">October 24, 2025</span>
                            </li>
                            <li>
                                <span className="block text-[#8899AA] text-xs uppercase tracking-wider mb-1">Credential ID</span>
                                <span className="text-white font-mono font-medium tracking-widest bg-[#0A1420] px-2 py-1 rounded border border-[#1A2A3A]">TC-REACT-089921</span>
                            </li>
                            <li>
                                <span className="block text-[#8899AA] text-xs uppercase tracking-wider mb-1">Public URL</span>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        readOnly
                                        value="https://techcorplms.com/verify/TC-REACT-089921"
                                        aria-label="Public verification URL"
                                        className="flex-1 bg-[#0A1420] border border-[#1A2A3A] text-xs text-[#8899AA] px-2 py-1.5 rounded truncate outline-none"
                                    />
                                    <Button variant="secondary" size="sm" aria-label="Copy URL">
                                        <Share2 size={14} aria-hidden="true" />
                                    </Button>
                                </div>
                            </li>
                        </ul>
                    </Card>
                </div>
            </div>
        </Page>
    );
}
