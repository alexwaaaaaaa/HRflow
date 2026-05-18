"use client";

import { useState } from "react";
import {
  MessageSquareDot,
  Download,
  Star,
  Filter,
  TrendingUp,
  ThumbsUp,
  ThumbsDown,
  Eye,
  Smile,
  Meh,
  Frown,
  Building2,
  User,
} from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

// migrated: immersive-ui

type Sentiment = "Positive" | "Neutral" | "Negative";

interface FeedbackItem {
  id: string;
  org: string;
  orgId: string;
  user: string;
  role: string;
  date: string;
  rating: number;
  sentiment: Sentiment;
  category: string;
  subject: string;
  body: string;
  nps: number;
  tags: string[];
  plan: string;
}

const CATEGORIES = ["All", "Product", "Support", "Onboarding", "Pricing", "Performance", "Other"];
const SENTIMENTS = ["All", "Positive", "Neutral", "Negative"];
const RATINGS = ["All", "5 Stars", "4 Stars", "3 Stars", "2 Stars", "1 Star"];

const RAW_FEEDBACK: FeedbackItem[] = [
  { id: "FB-4421", org: "TechCorp India Pvt Ltd", orgId: "ORG-A981", user: "Anita Kulkarni", role: "HR Manager", date: "10 Mar 2026", rating: 5, sentiment: "Positive", category: "Product", subject: "Payroll automation is a game changer", body: "We used to spend 3 days on payroll. Now it takes 2 hours. The CTC breakup calculator and real-time validation is unmatched. Best HRMS decision we made.", nps: 10, tags: ["Payroll", "Automation"], plan: "Enterprise" },
  { id: "FB-4420", org: "Green Valley Foods", orgId: "ORG-B442", user: "Ravi Shankar", role: "Founder & CEO", date: "10 Mar 2026", rating: 4, sentiment: "Positive", category: "Onboarding", subject: "Onboarding was smooth, minor hiccups in bank verification", body: "Overall onboarding was great. The team was helpful. The only issue was penny drop sometimes fails silently without a clear error message.", nps: 8, tags: ["Onboarding", "Bank Verification"], plan: "Growth" },
  { id: "FB-4419", org: "Sunrise Logistics", orgId: "ORG-C119", user: "Pooja Reddy", role: "HR Head", date: "09 Mar 2026", rating: 2, sentiment: "Negative", category: "Support", subject: "Support response time is too slow", body: "We raised a critical payroll issue at 8 AM and got a response at 6 PM. For payroll critical issues this is unacceptable. We expect <2hr SLA for Sev-1 tickets.", nps: 3, tags: ["Support", "SLA"], plan: "Growth" },
  { id: "FB-4418", org: "MegaBuild Construction", orgId: "ORG-D771", user: "Vikram Nair", role: "Admin", date: "09 Mar 2026", rating: 3, sentiment: "Neutral", category: "Pricing", subject: "Good product but pricing per-employee is steep for us", body: "We have 800 contract workers who we need on the platform for attendance only. Paying full per-seat price for part-timers doesn't make sense. A lighter plan for gig workers would help.", nps: 6, tags: ["Pricing", "Contract Workers"], plan: "Growth" },
  { id: "FB-4417", org: "BlueWave Analytics", orgId: "ORG-E553", user: "Shruti Bose", role: "CTO", date: "08 Mar 2026", rating: 5, sentiment: "Positive", category: "Product", subject: "API documentation is excellent — integration was 2 days", body: "Our Salesforce + HRFlow integration took only 2 days. The API docs are clear, the sandbox is reliable, and webhooks work exactly as described. 10/10 developer experience.", nps: 10, tags: ["API", "Integration"], plan: "Enterprise" },
  { id: "FB-4416", org: "Kiran Mills Ltd", orgId: "ORG-F334", user: "Deepa Agrawal", role: "HR Admin", date: "08 Mar 2026", rating: 1, sentiment: "Negative", category: "Performance", subject: "Dashboard loads very slowly on low-bandwidth connections", body: "Our factory floors have poor internet. The dashboard sometimes takes 15-20 seconds to load on 2G connections. This leads to daily frustration for our plant HR teams.", nps: 2, tags: ["Performance", "Mobile", "Low Bandwidth"], plan: "Starter" },
];

const SENTIMENT_ICON: Record<Sentiment, React.ReactNode> = {
  Positive: <Smile size={14} className="text-emerald-400" aria-hidden="true" />,
  Neutral: <Meh size={14} className="text-amber-400" aria-hidden="true" />,
  Negative: <Frown size={14} className="text-red-400" aria-hidden="true" />,
};

const SENTIMENT_VARIANT: Record<Sentiment, "success" | "warning" | "danger"> = {
  Positive: "success",
  Neutral: "warning",
  Negative: "danger",
};

const RATING_COLOR = (r: number) => (r >= 4 ? "text-emerald-400" : r === 3 ? "text-amber-400" : "text-red-400");

export default function FeedbackRawPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sentiment, setSentiment] = useState("All");
  const [rating, setRating] = useState("All");
  const [expanded, setExpanded] = useState<string | null>(null);

  const avgRating = (RAW_FEEDBACK.reduce((a, f) => a + f.rating, 0) / RAW_FEEDBACK.length).toFixed(1);
  const positiveCount = RAW_FEEDBACK.filter((f) => f.sentiment === "Positive").length;
  const negativeCount = RAW_FEEDBACK.filter((f) => f.sentiment === "Negative").length;
  const neutralCount = RAW_FEEDBACK.filter((f) => f.sentiment === "Neutral").length;
  const avgNps = Math.round(RAW_FEEDBACK.reduce((a, f) => a + f.nps, 0) / RAW_FEEDBACK.length);

  const filtered = RAW_FEEDBACK.filter((f) => {
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      f.org.toLowerCase().includes(q) ||
      f.subject.toLowerCase().includes(q) ||
      f.user.toLowerCase().includes(q) ||
      f.body.toLowerCase().includes(q);
    const matchCat = category === "All" || f.category === category;
    const matchSent = sentiment === "All" || f.sentiment === sentiment;
    const matchRating = rating === "All" || f.rating === parseInt(rating[0]);
    return matchSearch && matchCat && matchSent && matchRating;
  });

  return (
    <Page
      title="Raw Customer Feedback"
      subtitle="Unfiltered verbatim feedback from all tenants — ratings, NPS responses, and support feedback across the platform."
      breadcrumbs={[
        { label: "Super Admin", href: "/super-admin/dashboard" },
        { label: "Feedback Raw" },
      ]}
      maxWidth="1400px"
      actions={
        <>
          <Button variant="secondary" icon={<Filter size={16} />}>
            Advanced Filter
          </Button>
          <Button variant="primary" icon={<Download size={16} />}>
            Export to CSV
          </Button>
        </>
      }
    >
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card padding="md">
            <div className="flex items-center gap-2 mb-1">
              <Star size={16} className="text-amber-400" aria-hidden="true" />
              <div className="text-2xl font-black text-amber-400">{avgRating} / 5</div>
            </div>
            <div className="text-xs text-[#8899AA] font-bold uppercase tracking-wider mb-1">Avg Rating</div>
            <div className="text-[10px] text-[#445566]">Based on 1,292 responses</div>
          </Card>
          <Card padding="md">
            <div className="flex items-center gap-2 mb-1">
              <ThumbsUp size={16} className="text-emerald-400" aria-hidden="true" />
              <div className="text-2xl font-black text-emerald-400">{positiveCount}</div>
            </div>
            <div className="text-xs text-[#8899AA] font-bold uppercase tracking-wider mb-1">Positive Responses</div>
            <div className="text-[10px] text-[#445566]">{Math.round((positiveCount / RAW_FEEDBACK.length) * 100)}% of total</div>
          </Card>
          <Card padding="md">
            <div className="flex items-center gap-2 mb-1">
              <ThumbsDown size={16} className="text-red-400" aria-hidden="true" />
              <div className="text-2xl font-black text-red-400">{negativeCount}</div>
            </div>
            <div className="text-xs text-[#8899AA] font-bold uppercase tracking-wider mb-1">Negative Responses</div>
            <div className="text-[10px] text-[#445566]">{Math.round((negativeCount / RAW_FEEDBACK.length) * 100)}% of total</div>
          </Card>
          <Card padding="md">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp size={16} className={avgNps >= 7 ? "text-emerald-400" : "text-amber-400"} aria-hidden="true" />
              <div className={`text-2xl font-black ${avgNps >= 7 ? "text-emerald-400" : "text-amber-400"}`}>{avgNps}</div>
            </div>
            <div className="text-xs text-[#8899AA] font-bold uppercase tracking-wider mb-1">Avg NPS Score</div>
            <div className="text-[10px] text-[#445566]">{avgNps >= 7 ? "Good — Promoters majority" : "Needs improvement"}</div>
          </Card>
        </div>

        {/* Sentiment bar */}
        <Card padding="md">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-white text-sm">Sentiment Overview</h3>
            <span className="text-xs text-[#556677]">
              {RAW_FEEDBACK.length} responses from {new Set(RAW_FEEDBACK.map((f) => f.orgId)).size} tenants
            </span>
          </div>
          <div
            className="flex h-3 rounded-full overflow-hidden gap-0.5"
            role="img"
            aria-label={`Sentiment: ${positiveCount} positive, ${neutralCount} neutral, ${negativeCount} negative`}
          >
            <div style={{ width: `${(positiveCount / RAW_FEEDBACK.length) * 100}%` }} className="bg-emerald-500 rounded-l-full" />
            <div style={{ width: `${(neutralCount / RAW_FEEDBACK.length) * 100}%` }} className="bg-amber-500" />
            <div style={{ width: `${(negativeCount / RAW_FEEDBACK.length) * 100}%` }} className="bg-red-500 rounded-r-full" />
          </div>
          <div className="flex gap-6 mt-3 text-xs">
            <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" aria-hidden="true" /> Positive ({positiveCount})
            </span>
            <span className="flex items-center gap-1.5 text-amber-400 font-bold">
              <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" aria-hidden="true" /> Neutral ({neutralCount})
            </span>
            <span className="flex items-center gap-1.5 text-red-400 font-bold">
              <span className="w-2 h-2 rounded-full bg-red-500 inline-block" aria-hidden="true" /> Negative ({negativeCount})
            </span>
          </div>
        </Card>

        {/* Filters + Cards */}
        <Card padding="none">
          {/* Toolbar */}
          <div className="p-4 border-b border-[#1A2A3A] flex flex-wrap gap-3 items-center bg-[#060D1A]">
            <div className="relative flex-1 min-w-[200px]">
              <input
                type="search"
                placeholder="Search feedback, org, user..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Search feedback"
                className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-lg pl-4 pr-4 py-2 text-sm text-white focus:border-pink-500 outline-none transition-colors"
              />
            </div>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  aria-pressed={category === c}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    category === c ? "bg-pink-600 text-white" : "bg-[#131B2B] text-[#8899AA] hover:text-white border border-[#2A3A4A]"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
            <div>
              <label htmlFor="sentiment-filter" className="sr-only">Filter by sentiment</label>
              <select
                id="sentiment-filter"
                value={sentiment}
                onChange={(e) => setSentiment(e.target.value)}
                className="bg-[#131B2B] border border-[#2A3A4A] rounded-lg px-3 py-2 text-sm text-white focus:border-pink-500 outline-none cursor-pointer"
              >
                {SENTIMENTS.map((s) => (
                  <option key={s} value={s}>{s === "All" ? "All Sentiments" : s}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="rating-filter" className="sr-only">Filter by rating</label>
              <select
                id="rating-filter"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="bg-[#131B2B] border border-[#2A3A4A] rounded-lg px-3 py-2 text-sm text-white focus:border-pink-500 outline-none cursor-pointer"
              >
                {RATINGS.map((r) => (
                  <option key={r} value={r}>{r === "All" ? "All Ratings" : r}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Feedback list */}
          <div className="divide-y divide-[#1A2A3A]">
            {filtered.map((fb) => {
              const isExp = expanded === fb.id;
              return (
                <div key={fb.id} className="hover:bg-[#131B2B] transition-colors">
                  <div className="p-5 flex flex-col gap-3 cursor-pointer" onClick={() => setExpanded(isExp ? null : fb.id)}>
                    <div className="flex items-start gap-4">
                      <div
                        aria-hidden="true"
                        className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-xs font-bold text-pink-400 shrink-0"
                      >
                        {fb.org.split(" ").slice(0, 2).map((w) => w[0]).join("")}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-3 mb-1">
                          <span className="text-white font-bold text-sm">{fb.subject}</span>
                          <div className="flex" aria-label={`${fb.rating} out of 5 stars`}>
                            {[1, 2, 3, 4, 5].map((s) => (
                              <Star
                                key={s}
                                size={12}
                                className={s <= fb.rating ? "text-amber-400 fill-amber-400" : "text-[#2A3A4A]"}
                                aria-hidden="true"
                              />
                            ))}
                          </div>
                          <span className={`text-xs font-bold ${RATING_COLOR(fb.rating)}`}>{fb.rating}.0</span>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-[#556677]">
                          <span className="flex items-center gap-1">
                            <Building2 size={11} aria-hidden="true" /> {fb.org}
                          </span>
                          <span className="flex items-center gap-1">
                            <User size={11} aria-hidden="true" /> {fb.user} · {fb.role}
                          </span>
                          <span>{fb.date}</span>
                          <Badge variant="neutral">{fb.category}</Badge>
                          <Badge variant="neutral">{fb.plan}</Badge>
                          <span className="flex items-center gap-1">
                            {SENTIMENT_ICON[fb.sentiment]}
                            <Badge variant={SENTIMENT_VARIANT[fb.sentiment]}>{fb.sentiment}</Badge>
                          </span>
                          <span className="text-[#556677]">
                            NPS: <span className="text-white font-bold">{fb.nps}/10</span>
                          </span>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={<Eye size={16} />}
                        aria-label={`${isExp ? "Collapse" : "Expand"} feedback from ${fb.user}`}
                        className="shrink-0"
                      />
                    </div>

                    {isExp ? (
                      <div className="ml-14 space-y-3">
                        <p className="text-[#CCDDEE] text-sm leading-relaxed border-l-2 border-pink-500/40 pl-4 italic">
                          &ldquo;{fb.body}&rdquo;
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {fb.tags.map((tag) => (
                            <Badge key={tag} variant="purple">{tag}</Badge>
                          ))}
                        </div>
                        <div className="flex gap-3">
                          <Button variant="secondary" size="sm">Mark Resolved</Button>
                          <Button variant="secondary" size="sm">Assign to Team</Button>
                          <Button variant="ghost" size="sm">Add to Roadmap</Button>
                        </div>
                      </div>
                    ) : (
                      <p className="ml-14 text-[#8899AA] text-sm truncate">{fb.body}</p>
                    )}
                  </div>
                </div>
              );
            })}

            {filtered.length === 0 && (
              <div className="text-center py-16 text-[#8899AA]">
                <MessageSquareDot size={36} className="mx-auto mb-3 opacity-30" aria-hidden="true" />
                <p className="font-semibold">No feedback matches your filters</p>
                <p className="text-xs mt-1">Try clearing your search or changing filters</p>
              </div>
            )}
          </div>

          <div className="px-5 py-4 border-t border-[#1A2A3A] flex items-center justify-between bg-[#060D1A]">
            <span className="text-xs text-[#8899AA]">
              Showing {filtered.length} of {RAW_FEEDBACK.length} feedback responses
            </span>
          </div>
        </Card>
      </div>
    </Page>
  );
}
