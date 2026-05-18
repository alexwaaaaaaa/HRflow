"use client";

import { TrendingDown, Users, Activity, Filter, AlertCircle, ShieldCheck, Mail } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import ChartWrapper from "@/components/ui/ChartWrapper";
import ClientOnly from "@/components/ui/ClientOnly";
import { seededFloats } from "@/lib/random";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";

// ─── Static data ────────────────────────────────────────────────────────────

const BURNOUT_DATA = [
  { month: "Jun", score: 82 }, { month: "Jul", score: 78 },
  { month: "Aug", score: 75 }, { month: "Sep", score: 68 },
  { month: "Oct", score: 62 }, { month: "Nov", score: 58 },
];

const TEAM_RADAR = [
  { subject: "Workload", A: 45, fullMark: 100 },
  { subject: "Autonomy", A: 85, fullMark: 100 },
  { subject: "Recognition", A: 70, fullMark: 100 },
  { subject: "Peer Support", A: 90, fullMark: 100 },
  { subject: "Clarity", A: 65, fullMark: 100 },
];

// Seeded decorative values for wellness score ring
const [WELLNESS_SCORE] = seededFloats(7013, 1).map(() => 58); // Fixed at 58 for stable display

const INTERVENTIONS = [
  {
    title: '"Meeting-Free" Thursdays',
    desc: "Data indicates the average IC spends 22 hours/week on Zoom. Implementing a global block on Thursdays is modeled to increase deep-work capacity by 14%.",
    icon: Users,
    iconClass: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    action: "Draft Policy Rule",
    actionVariant: "secondary" as const,
  },
  {
    title: "Automated PTO Nudges",
    desc: "452 employees have accrued maximum leave balances. The AI suggests pushing highly targeted Slack notifications suggesting long weekends to managers.",
    icon: Activity,
    iconClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    action: "Activate Copilot Workflow",
    actionVariant: "primary" as const,
  },
  {
    title: "Review On-Call Rotation",
    desc: "PagerDuty integration highlights 3 individuals bearing 60% of SEV-1 incident load over the last quarter. Re-distribute load to prevent imminent attrition.",
    icon: ShieldCheck,
    iconClass: "bg-rose-500/10 text-rose-400 border-rose-500/20",
    action: "View On-Call Analytics",
    actionVariant: "danger" as const,
  },
];

// ─── Page ────────────────────────────────────────────────────────────────────

export default function WellnessScoreAIPage() {
  return (
        <Page
      title="Wellness & Burnout AI"
      subtitle="Privacy-first sentiment analysis derived from Slack/Teams metadata, overtime hours, and PTO utilization to predict systemic burnout risk."
      breadcrumbs={[
        { label: "AI", href: "/ai/smart-onboarding" },
        { label: "Wellness Score" },
      ]}
      maxWidth="1300px"
      actions={
        <>








          <Button variant="secondary" icon={<Filter size={14} />}>Global Organization</Button>
          <Button icon={<Mail size={14} />}>Trigger Pulse Survey</Button>
        </>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        {/* Global Score Card */}
        <Card padding="lg" className="border-rose-500/20 flex flex-col items-center text-center">
          <div className="text-[#8899AA] text-sm font-semibold uppercase tracking-widest mb-4">Org Wellness Index</div>
          <div className="relative w-40 h-40 mx-auto flex items-center justify-center mb-6">
            <svg className="w-full h-full transform -rotate-90" aria-hidden="true">
              <circle cx="80" cy="80" r="72" stroke="#1A2A3A" strokeWidth="10" fill="none" />
              <circle cx="80" cy="80" r="72" stroke="#f43f5e" strokeWidth="10" fill="none" strokeDasharray="452" strokeDashoffset="190" />
            </svg>
            <div
              className="absolute flex flex-col items-center justify-center"
              role="img"
              aria-label={`Wellness score: ${WELLNESS_SCORE} out of 100`}
            >
              <span className="text-4xl font-black text-rose-400">{WELLNESS_SCORE}</span>
              <span className="text-[#8899AA] text-xs font-bold mt-1">/ 100</span>
            </div>
          </div>
          <Badge variant="danger"><TrendingDown size={12} aria-hidden="true" className="inline mr-1" />Critical Drop Detected</Badge>
        </Card>

        {/* Trend Chart */}
        <Card padding="lg" className="lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-white font-semibold">6-Month Trajectory</h3>
              <p className="text-[#8899AA] text-xs mt-1">Sustained decline correlated with Q3 product launch goals</p>
            </div>
            <span className="flex items-center gap-2 text-xs text-rose-400 font-medium">
              <span className="w-3 h-3 rounded-full bg-rose-500" aria-hidden="true" /> Organizational Average
            </span>
          </div>
          <div className="h-[220px] w-full">
            <ClientOnly>
              <ChartWrapper height="h-full">
                <AreaChart data={BURNOUT_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRose" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1A2A3A" />
                  <XAxis dataKey="month" stroke="#445566" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis domain={[40, 100]} stroke="#445566" fontSize={12} tickLine={false} axisLine={false} />
                  <RechartsTooltip
                    contentStyle={{ backgroundColor: "#131B2B", borderColor: "#2A3A4A", borderRadius: "8px", color: "#fff" }}
                  />
                  <Area type="monotone" dataKey="score" stroke="#f43f5e" strokeWidth={3} fillOpacity={1} fill="url(#colorRose)" />
                </AreaChart>
              </ChartWrapper>
            </ClientOnly>
          </div>
        </Card>

        {/* Risk Factors Radar */}
        <Card padding="lg" className="flex flex-col justify-center">
          <h3 className="text-white font-semibold mb-2 text-center">Deficit Analysis: Engineering</h3>
          <div className="h-[220px] w-full mx-auto">
            <ClientOnly>
              <ChartWrapper height="h-full">
                <RadarChart cx="50%" cy="50%" outerRadius="65%" data={TEAM_RADAR}>
                  <PolarGrid stroke="#2A3A4A" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: "#8899AA", fontSize: 10 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                  <Radar name="Engineering" dataKey="A" stroke="#f43f5e" fill="#f43f5e" fillOpacity={0.3} />
                  <RechartsTooltip contentStyle={{ backgroundColor: "#131B2B", borderColor: "#2A3A4A", borderRadius: "8px" }} />
                </RadarChart>
              </ChartWrapper>
            </ClientOnly>
          </div>
        </Card>
      </div>

      {/* Critical Alert */}
      <Card padding="lg" className="mb-6 border-rose-500/30">
        <div className="flex items-start gap-4">
          <div className="bg-rose-500/20 p-2.5 rounded-xl border border-rose-500/30 shrink-0 text-rose-400 mt-1">
            <AlertCircle size={20} aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2">Critical Cohort Alert: Cloud Infrastructure Team</h3>
            <p className="text-[#8899AA] text-sm leading-relaxed mb-4 max-w-4xl">
              Continuous weekend commits + lack of PTO consumption over the last 90 days has driven the burnout probability for this 14-person team to <strong className="text-rose-400">88%</strong>. NLP sentiment on their Slack channel indicates severe workflow friction regarding CI/CD bottlenecks.
            </p>
            <div className="flex gap-3">
              <Button variant="danger" size="sm">View Team Drilldown</Button>
              <Button variant="secondary" size="sm">Schedule Mandatory Time-off Intervention</Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Interventions */}
      <h3 className="text-lg font-semibold text-white mb-4">Recommended Policy Adjustments</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {INTERVENTIONS.map((item) => (
          <Card key={item.title} padding="md" className="flex flex-col justify-between hover:bg-[#131B2B] transition-colors">
            <div>
              <div className={`w-fit p-2 rounded-lg mb-3 border ${item.iconClass}`}>
                <item.icon size={18} aria-hidden="true" />
              </div>
              <h4 className="text-white font-medium text-sm mb-2">{item.title}</h4>
              <p className="text-xs text-[#8899AA] leading-relaxed mb-4">{item.desc}</p>
            </div>
            <Button variant={item.actionVariant} size="sm" className="w-full">{item.action}</Button>
          </Card>
        ))}
      </div>
    

        

        

            
        </Page>
    );
}
