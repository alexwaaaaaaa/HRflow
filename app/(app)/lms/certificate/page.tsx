"use client";
import React from "react";
import { Award, Download, Share2, ExternalLink, ArrowRight } from "lucide-react";
import Link from "next/link";
import Page from "@/components/ui/Page";
import Button from "@/components/ui/Button";

interface Cert {
    id: string;
    course: string;
    issuer: string;
    date: string;
    gradientClass: string;
    textColorClass: string;
}

const MY_CERTS: Cert[] = [
    {
        id: "TC-REACT-089921",
        course: "Advanced React Patterns & Architecture",
        issuer: "TechCorp LMS",
        date: "Oct 24, 2025",
        gradientClass: "from-blue-600 to-indigo-600",
        textColorClass: "text-blue-400",
    },
    {
        id: "TC-NODE-044512",
        course: "Node.js Microservices Masterclass",
        issuer: "TechCorp LMS",
        date: "Aug 11, 2025",
        gradientClass: "from-emerald-600 to-teal-600",
        textColorClass: "text-emerald-400",
    },
    {
        id: "TC-SEC-022001",
        course: "Cybersecurity Fundamentals for Engineers",
        issuer: "TechCorp LMS",
        date: "Jun 3, 2025",
        gradientClass: "from-amber-600 to-orange-600",
        textColorClass: "text-amber-400",
    },
];

function CertCard({ cert }: { cert: Cert }) {
    return (
        <Link
            href={`/lms/certificate/${cert.id}`}
            className="group bg-[#0A1420] border border-[#1A2A3A] hover:border-[#2A3A4A] rounded-2xl overflow-hidden transition-all hover:bg-[#0D1928] block flex flex-col"
        >
            <div className={`h-20 bg-gradient-to-br ${cert.gradientClass} flex items-center justify-center`}>
                <Award size={32} className="text-white opacity-80" aria-hidden="true" />
            </div>
            <div className="p-5">
                <h3 className="text-white font-bold text-sm mb-1 line-clamp-2">{cert.course}</h3>
                <p className="text-[#8899AA] text-xs mb-3">{cert.issuer} · {cert.date}</p>
                <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-mono ${cert.textColorClass} bg-[#1A2A3A] px-2 py-0.5 rounded`}>
                        {cert.id}
                    </span>
                </div>
                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-[#1A2A3A]">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => e.preventDefault()}
                        aria-label={`Download PDF for ${cert.course}`}
                        icon={<Download size={12} aria-hidden="true" />}
                    >
                        PDF
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => e.preventDefault()}
                        aria-label={`Share ${cert.course} certificate`}
                        icon={<Share2 size={12} aria-hidden="true" />}
                    >
                        Share
                    </Button>
                    <span className={`ml-auto text-xs font-bold flex items-center gap-1 ${cert.textColorClass}`}>
                        View <ExternalLink size={10} aria-hidden="true" />
                    </span>
                </div>
            </div>
        </Link>
    );
}

export default function MyCertificatesPage() {
    return (
        <Page
            title="My Certificates"
            subtitle={`${MY_CERTS.length} certificates earned`}
            breadcrumbs={[{ label: "LMS", href: "/lms/dashboard" }, { label: "Certificates" }]}
            maxWidth="1000px"
            actions={
                <Button variant="secondary" iconRight={<ArrowRight size={14} />} href="/lms/library">Browse Courses</Button>
            }
        >
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {MY_CERTS.map((cert) => (
                    <CertCard key={cert.id} cert={cert} />
                ))}
            </div>
        </Page>
    );
}
