"use client";
import {
    BookOpen, Search, Book, Monitor, Shield, FileText,
    ChevronRight, Star, Lightbulb,
} from "lucide-react";
import Link from "next/link";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

const CATEGORIES = [
    { name: "IT & Hardware", icon: Monitor, count: 45, color: "#33E6FF" },
    { name: "HR & Policies", icon: Book, count: 32, color: "#9D00FF" },
    { name: "InfoSec & Compliance", icon: Shield, count: 18, color: "#00E5A0" },
    { name: "Guides & How-tos", icon: FileText, count: 104, color: "#FFB020" },
] as const;

const POPULAR_ARTICLES = [
    { id: 1, title: "How to configure VPN on strict home networks", views: "12k", category: "IT Support" },
    { id: 2, title: "Understanding your flexible benefits claim process", views: "8.4k", category: "HR Policies" },
    { id: 3, title: "Password rotation rules & 2FA Setup", views: "7.1k", category: "InfoSec" },
    { id: 4, title: "Booking meeting rooms via the Outlook plugin", views: "5k", category: "Guides" },
];

const RECOMMENDED = [
    {
        id: 5,
        title: "Onboarding Checklist FAQ (For New Joiners)",
        desc: "Quick answers to the most common questions on your first week.",
        cat: "HR Policies",
    },
    {
        id: 6,
        title: "Step-by-step: Accessing your Digital Payslip via Portal",
        desc: "Detailed guide on where to find, download, and read your monthly compensation breakdown.",
        cat: "Guides",
    },
];

const POPULAR_SEARCHES = ["VPN issues", "Apply Leave", "Payslip"] as const;

export default function KnowledgeBasePage() {
    return (
        <Page
            title="Knowledge Base"
            subtitle="Search through our exhaustive knowledge base for self-service resolutions before raising a ticket."
            breadcrumbs={[
                { label: "Helpdesk", href: "/helpdesk/dashboard" },
                { label: "Knowledge Base" },
            ]}
            maxWidth="1200px"
            fullBleed={false}
        >
            <div className="space-y-10">
                {/* Search Hero */}
                <Card padding="lg">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="mb-2 text-2xl font-bold text-white">How can we help you today?</h2>
                        <p className="mb-6 text-[#8899AA]">
                            Search articles, guides, and policies before raising a ticket.
                        </p>
                        <div className="group relative">
                            <Search
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#445566] transition-colors group-focus-within:text-[#00E5A0]"
                                size={20}
                                aria-hidden="true"
                            />
                            <input
                                type="search"
                                placeholder="Search articles, guides, policies..."
                                aria-label="Search knowledge base"
                                className="w-full rounded-2xl border-2 border-[#2A3A4A] bg-[#1A2A3A] py-4 pl-12 pr-32 text-lg text-white outline-none transition-colors hover:border-[#445566] focus:border-[#00E5A0]"
                            />
                            <Button className="absolute right-2 top-1/2 -translate-y-1/2">
                                Search
                            </Button>
                        </div>
                        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm text-[#8899AA]">
                            <span>Popular searches:</span>
                            {POPULAR_SEARCHES.map((s) => (
                                <button
                                    key={s}
                                    type="button"
                                    className="rounded bg-[#1A2A3A] px-2 py-1 transition-colors hover:text-white"
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    </div>
                </Card>

                <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
                    {/* Main Content */}
                    <div className="space-y-10 lg:col-span-2">
                        {/* Browse Categories */}
                        <section>
                            <h2 className="mb-6 flex items-center gap-2 text-xl font-bold text-white">
                                <BookOpen size={20} className="text-[#33E6FF]" aria-hidden="true" />
                                Browse Categories
                            </h2>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                {CATEGORIES.map((cat) => {
                                    const Icon = cat.icon;
                                    return (
                                        <Card key={cat.name} padding="lg" className="group cursor-pointer">
                                            <div className="flex items-start gap-4">
                                                <div
                                                    className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#1A2A3A] bg-[#0A1420]"
                                                    style={{ color: cat.color }}
                                                >
                                                    <Icon size={24} aria-hidden="true" />
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="mb-1 text-lg font-bold text-white transition-colors group-hover:text-[#00E5A0]">
                                                        {cat.name}
                                                    </h3>
                                                    <p className="text-sm text-[#8899AA]">{cat.count} articles</p>
                                                </div>
                                            </div>
                                        </Card>
                                    );
                                })}
                            </div>
                        </section>

                        {/* Recommended */}
                        <section>
                            <h2 className="mb-6 flex items-center gap-2 text-xl font-bold text-white">
                                <Lightbulb size={20} className="text-[#FFB020]" aria-hidden="true" />
                                Recommended for You
                            </h2>
                            <div className="space-y-4">
                                {RECOMMENDED.map((article) => (
                                    <Link
                                        href={`/helpdesk/kb/${article.id}`}
                                        key={article.id}
                                        className="group block"
                                    >
                                        <Card padding="lg" className="transition-colors hover:border-[#00E5A0]/50">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <span className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-[#33E6FF]">
                                                        {article.cat}
                                                    </span>
                                                    <h3 className="mb-2 text-lg font-bold text-white transition-colors group-hover:text-[#00E5A0]">
                                                        {article.title}
                                                    </h3>
                                                    <p className="text-sm text-[#8899AA]">{article.desc}</p>
                                                </div>
                                                <ChevronRight
                                                    size={20}
                                                    className="mt-6 shrink-0 text-[#445566] transition-colors group-hover:text-[#00E5A0]"
                                                    aria-hidden="true"
                                                />
                                            </div>
                                        </Card>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Right Sidebar */}
                    <div className="space-y-8">
                        <Card padding="lg">
                            <h3 className="mb-4 flex items-center gap-2 border-b border-[#1A2A3A] pb-4 font-bold text-white">
                                <Star size={18} className="text-[#FFB020]" aria-hidden="true" />
                                Most Popular Articles
                            </h3>
                            <div className="space-y-4">
                                {POPULAR_ARTICLES.map((article, i) => (
                                    <div key={article.id} className="group flex cursor-pointer gap-4">
                                        <span className="shrink-0 text-2xl font-black text-[#1A2A3A] transition-colors group-hover:text-[#2A3A4A]">
                                            0{i + 1}
                                        </span>
                                        <div>
                                            <h4 className="mb-1 text-sm font-semibold leading-snug text-white transition-colors group-hover:text-[#00E5A0]">
                                                {article.title}
                                            </h4>
                                            <div className="flex items-center gap-3 text-xs text-[#445566]">
                                                <span>{article.category}</span>
                                                <span className="h-1 w-1 rounded-full bg-[#445566]" aria-hidden="true" />
                                                <span>{article.views} views</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        <Card padding="lg">
                            <h3 className="mb-2 text-lg font-bold text-white">Still need help?</h3>
                            <p className="mb-6 text-sm text-[#8899AA]">
                                If you couldn&apos;t find the answer you were looking for, our human agents
                                are ready to assist you.
                            </p>
                            <Link href="/helpdesk/raise">
                                <Button variant="secondary" className="w-full">
                                    Raise a Ticket
                                </Button>
                            </Link>
                        </Card>
                    </div>
                </div>
            </div>
        </Page>
    );
}
