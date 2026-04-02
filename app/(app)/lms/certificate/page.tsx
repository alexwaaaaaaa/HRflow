"use client";
import React from 'react';
import { Award, Download, Share2, ExternalLink, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const MY_CERTS = [
    {
        id: 'TC-REACT-089921',
        course: 'Advanced React Patterns & Architecture',
        issuer: 'TechCorp LMS',
        date: 'Oct 24, 2025',
        color: 'from-blue-600 to-indigo-600',
        textColor: 'text-blue-400',
    },
    {
        id: 'TC-NODE-044512',
        course: 'Node.js Microservices Masterclass',
        issuer: 'TechCorp LMS',
        date: 'Aug 11, 2025',
        color: 'from-emerald-600 to-teal-600',
        textColor: 'text-emerald-400',
    },
    {
        id: 'TC-SEC-022001',
        course: 'Cybersecurity Fundamentals for Engineers',
        issuer: 'TechCorp LMS',
        date: 'Jun 3, 2025',
        color: 'from-amber-600 to-orange-600',
        textColor: 'text-amber-400',
    },
];

export default function MyCertificatesPage() {
    return (
        <div className="min-h-screen p-6 max-w-5xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                        <Award size={24} className="text-amber-400" /> My Certificates
                    </h1>
                    <p className="text-[#8899AA] text-sm mt-1">{MY_CERTS.length} certificates earned</p>
                </div>
                <Link
                    href="/lms/dashboard"
                    className="text-sm text-[#8899AA] hover:text-white flex items-center gap-1 transition-colors"
                >
                    Browse Courses <ArrowRight size={14} />
                </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {MY_CERTS.map(cert => (
                    <Link
                        key={cert.id}
                        href={`/lms/certificate/${cert.id}`}
                        className="group bg-[#0A1420] border border-[#1A2A3A] hover:border-[#2A3A4A] rounded-2xl overflow-hidden transition-all hover:bg-[#0D1928]"
                    >
                        {/* gradient banner */}
                        <div className={`h-20 bg-gradient-to-br ${cert.color} flex items-center justify-center`}>
                            <Award size={32} className="text-white opacity-80" />
                        </div>
                        <div className="p-5">
                            <h3 className="text-white font-bold text-sm mb-1 line-clamp-2">{cert.course}</h3>
                            <p className="text-[#8899AA] text-xs mb-3">{cert.issuer} · {cert.date}</p>
                            <div className="flex items-center gap-2">
                                <span className={`text-[10px] font-mono ${cert.textColor} bg-[#1A2A3A] px-2 py-0.5 rounded`}>
                                    {cert.id}
                                </span>
                            </div>
                            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-[#1A2A3A]">
                                <button
                                    onClick={e => e.preventDefault()}
                                    className="flex items-center gap-1 text-[#556677] hover:text-white transition-colors text-xs"
                                >
                                    <Download size={12} /> PDF
                                </button>
                                <button
                                    onClick={e => e.preventDefault()}
                                    className="flex items-center gap-1 text-[#556677] hover:text-white transition-colors text-xs"
                                >
                                    <Share2 size={12} /> Share
                                </button>
                                <span className={`ml-auto text-xs font-bold flex items-center gap-1 ${cert.textColor}`}>
                                    View <ExternalLink size={10} />
                                </span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
