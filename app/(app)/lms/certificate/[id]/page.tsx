"use client";
import React from "react";
import {
    Download, Share2, Award, ExternalLink, ShieldCheck, DownloadCloud, Linkedin
} from "lucide-react";
import { useParams } from "next/navigation";

export default function CertificateScreen() {
    const params = useParams();

    return (
        <div className="p-6 max-w-[1400px] mx-auto min-h-[calc(100vh-80px)] flex flex-col md:flex-row gap-8 items-start">

            {/* Certificate Display Area */}
            <div className="flex-1 w-full bg-[#0F1C2E] border border-[#1A2A3A] rounded-2xl p-6 md:p-10 shadow-xl overflow-hidden relative">
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-[#33E6FF]/5 to-transparent pointer-events-none"></div>

                {/* The Certificate Artboard */}
                <div className="aspect-[1.414/1] w-full max-w-4xl mx-auto bg-white rounded-lg shadow-2xl relative overflow-hidden border-8 border-double border-gray-200">
                    {/* Corner decorations */}
                    <div className="absolute top-0 left-0 w-32 h-32 border-t-8 border-l-8 border-blue-800 rounded-tl-lg pointer-events-none opacity-20"></div>
                    <div className="absolute bottom-0 right-0 w-32 h-32 border-b-8 border-r-8 border-blue-800 rounded-br-lg pointer-events-none opacity-20"></div>

                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-50 pointer-events-none"></div>

                    <div className="w-full h-full flex flex-col items-center justify-center p-12 lg:p-20 text-center relative z-10">

                        <div className="mb-8 flex items-center justify-center">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-blue-600"></div>
                                <span className="text-2xl font-black text-gray-900 tracking-tighter">TechCorp<span className="text-blue-600">.</span></span>
                            </div>
                        </div>

                        <p className="text-gray-500 uppercase tracking-[0.3em] text-sm font-semibold mb-6">Certificate of Completion</p>
                        <p className="text-gray-400 italic mb-4">This is to certify that</p>

                        <h1 className="text-4xl lg:text-6xl font-serif text-gray-900 mb-6 italic border-b-2 border-blue-100 pb-2 inline-block px-10">
                            Arjun Kumar
                        </h1>

                        <p className="text-gray-500 mb-2">has successfully completed the formal curriculum and demonstrated proficiency in</p>

                        <h2 className="text-2xl lg:text-3xl font-bold text-blue-900 mb-12">
                            Advanced React Patterns & Architecture
                        </h2>

                        <div className="flex justify-between w-full max-w-2xl mt-auto items-end">
                            <div className="text-center">
                                <p className="text-gray-900 font-medium whitespace-nowrap">Sarah Drasner</p>
                                <div className="w-32 h-px bg-gray-400 my-1 mx-auto"></div>
                                <p className="text-xs text-gray-500 uppercase">Instructor</p>
                            </div>

                            <div className="w-24 h-24 relative flex items-center justify-center shrink-0">
                                <ShieldCheck size={80} className="text-emerald-500 opacity-20 absolute" />
                                <Award size={48} className="text-emerald-600 relative z-10" />
                            </div>

                            <div className="text-center">
                                <p className="text-gray-900 font-mono text-sm tracking-widest whitespace-nowrap">Oct 24, 2025</p>
                                <div className="w-32 h-px bg-gray-400 my-1 mx-auto"></div>
                                <p className="text-xs text-gray-500 uppercase">Date</p>
                            </div>
                        </div>

                    </div>
                </div>
                {/* End Artboard */}

            </div>

            {/* Action panel */}
            <div className="w-full md:w-80 lg:w-96 shrink-0 space-y-6">

                <div className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-2xl p-6 shadow-xl">
                    <h3 className="font-bold text-white text-xl mb-2">Share your success</h3>
                    <p className="text-sm text-[#8899AA] mb-6 leading-relaxed">Add this certificate to your LinkedIn profile to showcase your skills to your network and recruiters.</p>

                    <button className="w-full py-3 mb-3 bg-[#0077b5] hover:bg-[#006097] text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg">
                        <Linkedin size={20} /> Add to LinkedIn profile
                    </button>

                    <div className="grid grid-cols-2 gap-3">
                        <button className="py-2.5 bg-[#1A2A3A] border border-[#2A3A4A] text-white font-medium rounded-xl hover:bg-[#2A3A4A] transition-colors flex items-center justify-center gap-2">
                            <DownloadCloud size={18} className="text-[#33E6FF]" /> PDF
                        </button>
                        <button className="py-2.5 bg-[#1A2A3A] border border-[#2A3A4A] text-white font-medium rounded-xl hover:bg-[#2A3A4A] transition-colors flex items-center justify-center gap-2">
                            <DownloadCloud size={18} className="text-[#33E6FF]" /> Image
                        </button>
                    </div>
                </div>

                <div className="bg-[#152336] border border-[#2A3A4A] rounded-2xl p-6 shadow-xl">
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
                                <input type="text" readOnly value="https://techcorplms.com/verify/TC-REACT-089921" className="flex-1 bg-[#0A1420] border border-[#1A2A3A] text-xs text-[#8899AA] px-2 py-1.5 rounded truncate outline-none" />
                                <button className="p-1.5 bg-[#1A2A3A] rounded hover:bg-[#2A3A4A] text-white transition-colors"><Share2 size={16} /></button>
                            </div>
                        </li>
                    </ul>
                </div>

            </div>

        </div>
    );
}
