"use client";

import { Sparkles, Target, ChevronRight, BookOpen, Award, User as UserIcon } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { seededFloats } from "@/lib/random";

// ─── Seeded decorative values ────────────────────────────────────────────────

const [PROMO_READINESS] = seededFloats(7003, 1).map((v) => Math.round(60 + v * 30)); // 60–90%

// ─── Page ────────────────────────────────────────────────────────────────────

export default function CareerPathAIPage() {
  return (
        <Page
      title="Career Path AI"
      subtitle="Dynamic skill-gap analysis and vertical/lateral movement forecasting. Connects current employee competencies to future organizational needs."
      breadcrumbs={[
        { label: "AI", href: "/ai/smart-onboarding" },
        { label: "Career Path" },
      ]}
      maxWidth="1300px"
      actions={
        <>








          <Button variant="secondary">Organization Skill Matrix</Button>
          <Button icon={<UserIcon size={14} />}>Employee Search</Button>
        </>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Employee Context Sidebar */}
        <Card padding="lg" className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <div
              aria-hidden="true"
              className="w-16 h-16 rounded-full bg-gradient-to-br from-[#1A2A3A] to-[#0A1420] border border-[#2A3A4A] flex items-center justify-center text-xl font-bold text-white shrink-0"
            >
              SR
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Sneha Rao</h2>
              <div className="text-sm text-[#8899AA]">Product Designer (L3)</div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="text-xs text-[#8899AA] uppercase tracking-wider mb-2 font-semibold flex justify-between">
                Verified Skills <span className="text-purple-400">14</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {["Figma", "UI Prototyping", "Usability Testing"].map((skill) => (
                  <span key={skill} className="bg-[#131B2B] border border-[#2A3A4A] text-white text-xs px-2.5 py-1 rounded">
                    {skill}
                  </span>
                ))}
                <span className="bg-[#1A2A3A] border border-[#2A3A4A] text-[#8899AA] text-xs px-2.5 py-1 rounded">+ 11 more</span>
              </div>
            </div>

            <Card padding="sm" className="border-purple-500/30">
              <div className="text-xs text-[#8899AA] uppercase tracking-wider mb-1 font-semibold">Promotion Readiness</div>
              <div className="flex items-end gap-2 mb-2">
                <span className="text-2xl font-bold text-white">{PROMO_READINESS}%</span>
                <span className="text-xs text-purple-400 mb-1">To L4 (Senior)</span>
              </div>
              <div
                role="progressbar"
                aria-valuenow={PROMO_READINESS}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Promotion readiness"
                className="w-full h-1.5 bg-[#1A2A3A] rounded-full overflow-hidden"
              >
                <div className="bg-purple-500 h-full rounded-full" style={{ width: `${PROMO_READINESS}%` }} />
              </div>
            </Card>

            <div>
              <div className="text-xs text-[#8899AA] uppercase tracking-wider mb-2 font-semibold">Key Trajectory Gaps</div>
              <ul className="space-y-2 text-xs text-[#8899AA]">
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 rounded-full bg-red-400 mt-1.5 shrink-0" aria-hidden="true" />
                  <span>Lacks formal mentorship experience (Required for L4)</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1 h-1 rounded-full bg-amber-500 mt-1.5 shrink-0" aria-hidden="true" />
                  <span>Strategic roadmap planning undefined in recent reviews</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        {/* AI Path Visualizer */}
        <Card padding="none" className="lg:col-span-3 flex flex-col">
          <div className="p-6 border-b border-[#1A2A3A] bg-[#0A1420] flex justify-between items-center">
            <div>
              <h3 className="text-white font-semibold flex items-center gap-2">
                <Sparkles size={18} className="text-purple-400" aria-hidden="true" /> Career Trajectory Models
              </h3>
              <p className="text-xs text-[#8899AA] mt-1">AI-generated paths based on org structure and historical promotion data</p>
            </div>
            <div className="flex bg-[#1A2A3A] rounded-lg p-1" role="group" aria-label="Path type">
              <Button variant="secondary" size="sm">Vertical (Management)</Button>
              <Button variant="ghost" size="sm">Lateral (IC / Pivot)</Button>
            </div>
          </div>

          <div className="flex-1 p-8 space-y-12">
            {/* Current State */}
            <div className="flex items-center gap-6 relative">
              <div className="absolute left-[80px] top-[72px] w-0.5 h-16 bg-[#2A3A4A]" aria-hidden="true" />
              <div className="w-[160px] bg-[#1A2A3A] border-2 border-purple-500/30 text-center p-3 rounded-xl shrink-0 z-10">
                <div className="text-[10px] text-purple-400 font-bold uppercase tracking-wider mb-1">Current Role</div>
                <div className="text-sm font-bold text-white mb-0.5">Product Designer</div>
                <div className="text-xs text-[#8899AA]">Level 3</div>
              </div>
            </div>

            {/* Primary Path */}
            <div className="flex items-start gap-6 relative">
              <div className="w-[160px] bg-[#131B2B] border border-purple-500 text-center p-3 rounded-xl shrink-0 z-10">
                <div className="text-[10px] text-purple-400 font-bold uppercase tracking-wider mb-1">Primary Path</div>
                <div className="text-sm font-bold text-white mb-0.5">Design Manager</div>
                <div className="text-xs text-[#8899AA] mb-2">Level 4</div>
                <Badge variant="purple">Target: 18 months</Badge>
              </div>

              <div className="flex-1 bg-gradient-to-r from-purple-500/10 to-transparent border border-purple-500/20 rounded-xl p-5">
                <h4 className="text-white text-sm font-medium mb-3">AI Intervention Plan to get to Design Manager</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card padding="sm">
                    <div className="flex items-center gap-2 mb-2">
                      <Award size={14} className="text-amber-500" aria-hidden="true" />
                      <span className="text-xs font-semibold text-white">L&D Requirement</span>
                    </div>
                    <p className="text-[10px] text-[#8899AA]">Enroll in "Leadership for Creatives" internal workshop (Q3 Schedule).</p>
                  </Card>
                  <Card padding="sm">
                    <div className="flex items-center gap-2 mb-2">
                      <BookOpen size={14} className="text-blue-400" aria-hidden="true" />
                      <span className="text-xs font-semibold text-white">Project Assignment</span>
                    </div>
                    <p className="text-[10px] text-[#8899AA]">Assign as lead coordinator for the impending Rebranding sprint.</p>
                  </Card>
                  <Card padding="sm" className="md:col-span-2">
                    <div className="flex items-center gap-2 mb-2">
                      <Target size={14} className="text-emerald-400" aria-hidden="true" />
                      <span className="text-xs font-semibold text-white">Mentorship Link</span>
                    </div>
                    <p className="text-[10px] text-[#8899AA]">
                      Suggest formal 1:1s with <strong>David Chen (VP Design)</strong> to bridge strategic gap. AI predicts 85% compatibility.
                    </p>
                    <Button variant="secondary" size="sm" className="mt-2">Draft Intro Email</Button>
                  </Card>
                </div>
              </div>
            </div>

            {/* Lateral Option */}
            <div className="flex items-start gap-6 opacity-60 hover:opacity-100 transition-opacity">
              <div className="w-[160px] bg-[#0A1420] border border-[#2A3A4A] text-center p-3 rounded-xl shrink-0 z-10">
                <div className="text-[10px] text-[#8899AA] font-bold uppercase tracking-wider mb-1">Pivot Option</div>
                <div className="text-sm font-bold text-white mb-0.5">UX Researcher</div>
                <div className="text-xs text-[#8899AA]">Lateral Move</div>
              </div>
              <Card padding="md" className="flex-1 flex items-center justify-between">
                <div>
                  <h4 className="text-white text-sm font-medium mb-1">Strong competency overlap detected (88%)</h4>
                  <p className="text-xs text-[#8899AA]">Requires advanced qualification in Data Analytics & A/B testing frameworks.</p>
                </div>
                <ChevronRight size={16} className="text-[#445566]" aria-hidden="true" />
              </Card>
            </div>
          </div>
        </Card>
      </div>
    

        

        

            
        </Page>
    );
}
