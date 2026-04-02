"use client";
import React from 'react';
import { FileBarChart, Download, Scale, FolderLock, FileText, Globe } from 'lucide-react';
import Link from 'next/link';

export default function AuditReportScreen() {
    return (
        <div className="min-h-screen p-6 max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3"><FileBarChart size={24} className="text-emerald-400" /> Statutory Audit Reports</h1>
                    <p className="text-[#8899AA] text-sm mt-1">Generate required reports for EU Pay Transparency Directive, UK Gender Pay Gap, and California Fair Pay Act.</p>
                </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* EU Directive */}
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 flex flex-col items-center text-center group hover:border-[#2A3A4A] transition-colors relative overflow-hidden">
                    <div className="absolute top-0 right-0 left-0 h-1 bg-blue-600/50"></div>
                    <div className="w-16 h-16 rounded-full bg-[#131B2B] border border-[#2A3A4A] flex items-center justify-center text-blue-400 mb-4 group-hover:scale-110 transition-transform">
                        <Globe size={28} />
                    </div>
                    <h3 className="text-white font-bold text-lg mb-2">EU Pay Transparency</h3>
                    <p className="text-[#8899AA] text-xs mb-6 max-w-xs">Generates joint assessment data for entities where unexplained gaps persist above 5%, per Article 9.</p>
                    <button className="w-full mt-auto bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 rounded-xl transition-colors shadow-lg flex justify-center items-center gap-2 text-sm">
                        <Download size={16} /> Extract CSV Data
                    </button>
                </div>

                {/* UK GPG */}
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 flex flex-col items-center text-center group hover:border-[#2A3A4A] transition-colors relative overflow-hidden">
                    <div className="absolute top-0 right-0 left-0 h-1 bg-rose-600/50"></div>
                    <div className="w-16 h-16 rounded-full bg-[#131B2B] border border-[#2A3A4A] flex items-center justify-center text-rose-400 mb-4 group-hover:scale-110 transition-transform">
                        <Scale size={28} />
                    </div>
                    <h3 className="text-white font-bold text-lg mb-2">UK Gender Pay Gap</h3>
                    <p className="text-[#8899AA] text-xs mb-6 max-w-xs">Pre-formatted submission for gov.uk portal containing mean/median pay and bonus quartiles.</p>
                    <button className="w-full mt-auto bg-rose-600 hover:bg-rose-500 text-white font-bold py-2.5 rounded-xl transition-colors shadow-lg flex justify-center items-center gap-2 text-sm">
                        <Download size={16} /> Download Gov CSV
                    </button>
                </div>

                {/* General Board Report */}
                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl p-6 flex flex-col items-center text-center group hover:border-[#2A3A4A] transition-colors relative overflow-hidden">
                    <div className="absolute top-0 right-0 left-0 h-1 bg-emerald-600/50"></div>
                    <div className="w-16 h-16 rounded-full bg-[#131B2B] border border-[#2A3A4A] flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
                        <FileText size={28} />
                    </div>
                    <h3 className="text-white font-bold text-lg mb-2">Board Audit Pack</h3>
                    <p className="text-[#8899AA] text-xs mb-6 max-w-xs">Comprehensive PDF visualization covering compa-ratio health, CEO pay ratio, and unadjusted gaps.</p>
                    <button className="w-full mt-auto bg-[#131B2B] hover:bg-[#1A2A3A] border border-[#2A3A4A] text-white font-bold py-2.5 rounded-xl transition-colors flex justify-center items-center gap-2 text-sm">
                        <FileText size={16} /> Build PDF Deck
                    </button>
                </div>
            </div>

            <div className="bg-[#131B2B] border border-[#2A3A4A] p-6 rounded-2xl flex items-start gap-4 mt-8">
                <FolderLock className="text-[#556677] shrink-0 w-8 h-8" />
                <div>
                    <h3 className="text-white font-bold mb-1">Data Privacy & Auditing Note</h3>
                    <p className="text-[#8899AA] text-sm leading-relaxed">
                        Exported datasets undergo automated pseudonymization where required by local GDPR interpretations.
                        Raw salary extracts containing personally identifiable information (PII) are permanently logged in the
                        system audit trail when generated by a Super Admin or HRBP.
                    </p>
                </div>
            </div>
        </div>
    );
}
