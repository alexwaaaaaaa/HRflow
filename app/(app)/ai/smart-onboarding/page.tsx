"use client";

import { Sparkles, Calendar, CheckCircle2, Circle, PlayCircle, Monitor, Briefcase, Mail, Send, Target, RefreshCcw } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { seededFloats } from "@/lib/random";

// ─── Seeded decorative values ────────────────────────────────────────────────

// Use seeded floats for any decorative random-looking values
const [PLAN_PROGRESS] = seededFloats(7011, 1).map((v) => Math.round(30 + v * 40)); // 30–70%

// ─── Page ────────────────────────────────────────────────────────────────────

export default function SmartOnboardingAIPage() {
  return (
        <Page
      title="Smart Onboarding AI"
      subtitle="Dynamic, hyper-personalized 30/60/90 day onboarding plans generated for each new hire based on role, seniority, and team objectives."
      breadcrumbs={[
        { label: "AI", href: "/ai/smart-onboarding" },
        { label: "Smart Onboarding" },
      ]}
      maxWidth="1300px"
      actions={
        <>








          <Button variant="secondary">Template Library</Button>
          <Button icon={<Send size={14} />}>Launch Plan</Button>
        </>
      }
    >
      {/* Candidate Context */}
      <Card padding="lg" className="mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          <div className="flex items-center gap-6">
            <div
              aria-hidden="true"
              className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1A2A3A] to-[#0A1420] border border-[#2A3A4A] flex items-center justify-center text-xl font-bold text-white shrink-0"
            >
              SD
            </div>
            <div>
              <div className="text-xs text-[#8899AA] uppercase tracking-wider mb-1 font-semibold">Incoming Hire</div>
              <h2 className="text-xl font-bold text-white mb-1">Siddharth Desai</h2>
              <div className="flex flex-wrap items-center gap-3 text-sm text-[#8899AA]">
                <span>Senior Frontend Engineer</span>
                <span className="w-1 h-1 rounded-full bg-[#445566]" aria-hidden="true" />
                <span>Joining: Oct 24, 2023</span>
              </div>
            </div>
          </div>

          <Card padding="md" className="border-pink-500/30 w-full md:w-96 shrink-0">
            <div className="flex items-start gap-3">
              <div className="bg-pink-500/10 p-2 rounded-lg text-pink-400 shrink-0">
                <Sparkles size={18} aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-white text-sm font-medium mb-1">AI Personalization Status</h3>
                <p className="text-xs text-[#8899AA] leading-relaxed">
                  Plan customized based on: <strong>Seniority Level (L4)</strong>, <strong>React/Next.js stack</strong>, and current team objective: <strong>&quot;Checkout Flow Revamp Q4&quot;</strong>.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Generation Parameters */}
        <Card padding="lg" className="flex flex-col gap-6">
          <div>
            <h3 className="text-white font-semibold mb-1">Generation Context</h3>
            <p className="text-xs text-[#8899AA]">Sources AI used to build this plan</p>
          </div>
          <div className="space-y-4">
            <Card padding="sm" className="flex items-center gap-3">
              <Briefcase size={16} className="text-[#8899AA]" aria-hidden="true" />
              <div>
                <div className="text-xs font-semibold text-white">Job Description Parsed</div>
                <div className="text-[10px] text-[#8899AA]">Frontend architecture, API integration</div>
              </div>
            </Card>
            <Card padding="sm" className="flex items-center gap-3">
              <Monitor size={16} className="text-[#8899AA]" aria-hidden="true" />
              <div>
                <div className="text-xs font-semibold text-white">Tech Stack Detected</div>
                <div className="text-[10px] text-[#8899AA]">React, Typescript, Tailwind, Jest</div>
              </div>
            </Card>
            <Card padding="sm" className="border-l-4 border-l-pink-500 flex items-center gap-3">
              <Target size={16} className="text-pink-400" aria-hidden="true" />
              <div>
                <div className="text-xs font-semibold text-white">Active Team OKR Sync</div>
                <div className="text-[10px] text-pink-400 font-medium">Injecting &quot;Checkout Flow&quot; domain context</div>
              </div>
            </Card>
          </div>
          <div className="mt-auto pt-4 border-t border-[#1A2A3A]">
            <Button variant="secondary" size="sm" className="w-full" icon={<RefreshCcw size={14} />}>
              Regenerate Plan
            </Button>
          </div>
        </Card>

        {/* Timeline Plan */}
        <Card padding="lg" className="lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-white font-semibold">The 30/60/90 Day Path</h3>
            <div className="flex bg-[#1A2A3A] rounded-lg p-1" role="group" aria-label="Timeline view">
              {["Week 1", "Day 30", "Day 60", "Day 90"].map((t) => (
                <Button key={t} variant={t === "Week 1" ? "secondary" : "ghost"} size="sm">{t}</Button>
              ))}
            </div>
          </div>

          <div className="relative pl-6 border-l-2 border-[#1A2A3A] space-y-6 pb-2">
            {/* Task 1 */}
            <div className="relative">
              <span className="absolute -left-[31px] bg-[#1A2A3A] border border-[#2A3A4A] w-4 h-4 rounded-full flex items-center justify-center" aria-hidden="true">
                <span className="w-1.5 h-1.5 bg-pink-400 rounded-full" />
              </span>
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xs text-[#8899AA] mb-1 font-mono">Day 1-2</div>
                  <h5 className="text-sm font-medium text-white mb-2">System Access & Dev Environment Setup</h5>
                </div>
                <Badge variant="info">IT Auto-Provisioned</Badge>
              </div>
              <Card padding="sm" className="mt-2 space-y-2">
                <div className="flex items-center gap-2 text-xs text-[#8899AA]">
                  <CheckCircle2 size={14} className="text-emerald-500" aria-hidden="true" /> Okta SSO Account Created
                </div>
                <div className="flex items-center gap-2 text-xs text-[#8899AA]">
                  <CheckCircle2 size={14} className="text-emerald-500" aria-hidden="true" /> GitHub Repo Access (Frontend-Core) Granted
                </div>
                <div className="flex items-center gap-2 text-xs text-[#8899AA]">
                  <Circle size={14} aria-hidden="true" /> Local environment build (Guide attached)
                </div>
              </Card>
            </div>

            {/* Task 2 */}
            <div className="relative">
              <span className="absolute -left-[31px] bg-[#1A2A3A] border border-[#2A3A4A] w-4 h-4 rounded-full flex items-center justify-center" aria-hidden="true" />
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xs text-pink-400 mb-1 font-mono flex items-center gap-1.5">
                    <Sparkles size={12} aria-hidden="true" /> Day 3-4 (AI Injected)
                  </div>
                  <h5 className="text-sm font-medium text-white mb-2">Deep Dive: Checkout Architecture</h5>
                </div>
                <Badge variant="ai">Team OKR specific</Badge>
              </div>
              <Card padding="sm" className="border-pink-500/20 mt-2 space-y-3">
                <p className="text-xs text-white/80 leading-relaxed">
                  Review the specific technical debt tickets regarding the payment gateway integration. Schedule a 45min context sync with <strong>Vikram (Tech Lead)</strong>.
                </p>
                <div className="flex gap-2">
                  <Button variant="secondary" size="sm" icon={<PlayCircle size={14} />}>Watch Architecture Video</Button>
                  <Button variant="secondary" size="sm" icon={<Calendar size={14} />}>Auto-Schedule Sync</Button>
                </div>
              </Card>
            </div>

            {/* Task 3 */}
            <div className="relative">
              <span className="absolute -left-[31px] bg-[#1A2A3A] border border-[#2A3A4A] w-4 h-4 rounded-full flex items-center justify-center" aria-hidden="true" />
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xs text-slate-400 mb-1 font-mono">Day 5</div>
                  <h5 className="text-sm font-medium text-slate-400 mb-2">Deliver &quot;First Good Issue&quot; PR</h5>
                </div>
              </div>
              <Card padding="sm" className="mt-2 border-slate-800/50">
                <p className="text-xs text-slate-400">AI has pre-selected a low-risk UI bug ticket (JIRA-892) related to the cart dropdown to familiarize Siddharth with the CI/CD pipeline.</p>
              </Card>
            </div>
          </div>

          {/* Plan progress (seeded) */}
          <div className="mt-4 pt-4 border-t border-[#1A2A3A]">
            <div className="flex justify-between text-xs text-[#8899AA] mb-2">
              <span>Plan Progress</span>
              <span>{PLAN_PROGRESS}%</span>
            </div>
            <div
              role="progressbar"
              aria-valuenow={PLAN_PROGRESS}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Onboarding plan progress"
              className="w-full h-1.5 bg-[#1A2A3A] rounded-full overflow-hidden"
            >
              <div className="bg-pink-500 h-full rounded-full" style={{ width: `${PLAN_PROGRESS}%` }} />
            </div>
          </div>
        </Card>
      </div>

      {/* Automation Tools */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card padding="md" className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-[#1A2A3A] p-2.5 rounded-xl text-[#8899AA]">
              <Mail size={20} aria-hidden="true" />
            </div>
            <div>
              <h4 className="text-white font-medium text-sm">Welcome Email Sequence</h4>
              <p className="text-xs text-[#8899AA] mt-1">Ready to send (Day -3)</p>
            </div>
          </div>
          <Button variant="secondary" size="sm">Preview</Button>
        </Card>

        <Card padding="md" className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-[#1A2A3A] p-2.5 rounded-xl text-[#8899AA]">
              <Briefcase size={20} aria-hidden="true" />
            </div>
            <div>
              <h4 className="text-white font-medium text-sm">Manager Check-in Blueprint</h4>
              <p className="text-xs text-[#8899AA] mt-1">Generated discussion points for Day 10</p>
            </div>
          </div>
          <Button variant="secondary" size="sm">Assign to Manager</Button>
        </Card>
      </div>
    

        

        

            
        </Page>
    );
}
