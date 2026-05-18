"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  ChevronRight, Search, Bell, HelpCircle, ChevronDown,
  User, Wallet, Settings, LogOut, X, CheckCircle,
  AlertTriangle, Info, Zap, Command
} from "lucide-react";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { clearSession } from "@/lib/auth/session";
import CommandPalette from "@/components/ui/CommandPalette";

const NOTIFICATIONS = [
  { id: 1, type: "approval", icon: CheckCircle, color: "#00e5a0", title: "Leave Approved", desc: "Priya Sharma's 3-day CL approved", time: "2m ago", unread: true, href: "/leave/approvals" },
  { id: 2, type: "alert",    icon: AlertTriangle, color: "#f59e0b", title: "Payroll Anomaly", desc: "3 salary outliers detected in run", time: "15m ago", unread: true, href: "/payroll/run/anomaly" },
  { id: 3, type: "info",     icon: Info,          color: "#3b82f6", title: "Gazette Update", desc: "New PF circular effective Apr 2025", time: "1h ago", unread: true, href: "/compliance/gazette-monitor" },
  { id: 4, type: "system",   icon: Zap,           color: "#8b5cf6", title: "Payslips Ready", desc: "March 2025 payslips generated", time: "2h ago", unread: false, href: "/payroll/payslips/bulk" },
];

const ROUTE_LABELS: Record<string, string> = {
  // Core
  dashboard: "Dashboard",
  employees: "Employees",
  "my-profile": "My Profile",
  "my-leave": "My Leave",
  ess: "Self-Service",
  "self-service": "Self-Service",
  "org-chart": "Org & Structure",
  notifications: "Notifications",
  "notice-board": "Notice Board",

  // Time
  attendance: "Attendance",
  leave: "Leave",
  "leave-encashment": "Leave Encashment",
  hybrid: "Hybrid Work",

  // Payroll
  payroll: "Payroll",
  "payroll-settings": "Payroll Settings",
  "payroll-benchmarking": "Payroll Benchmarking",
  "payroll-comparison": "Payroll Comparison",
  "payroll-error-detail": "Payroll Error",
  "payroll-exception": "Payroll Exception",
  "payroll-health": "Payroll Health",
  "payroll-reports": "Payroll Reports",
  "payroll-rollback": "Payroll Rollback",
  "payroll-simulation": "Payroll Simulation",
  "payslip-customization": "Payslip Templates",
  "off-cycle-payroll": "Off-cycle Payroll",
  "zero-payroll": "Zero Payroll",
  "ctc-letters": "CTC Letters",
  "commission-setup": "Commission Setup",
  "incentive-setup": "Incentive Setup",
  "incentive-payment": "Incentive Payment",
  "variable-pay-setup": "Variable Pay",
  "multi-bank-disbursement": "Multi-bank Disbursement",
  "negative-net-pay": "Negative Net Pay",
  "statutory-bonus": "Statutory Bonus",
  "gratuity-provision": "Gratuity Provision",

  // Tax & Finance
  tax: "Tax & TDS",
  finance: "Finance",
  reimbursements: "Reimbursements",
  fbp: "Flexi Benefits",
  "pay-equity": "Pay Equity",

  // Talent
  recruitment: "Recruitment",
  candidate: "Candidate Portal",
  performance: "Performance",
  lms: "Learning",
  engagement: "Engagement",
  feedback: "360° Feedback",
  okr: "OKRs",
  succession: "Succession",
  "workforce-analytics": "Workforce Analytics",
  onboarding: "Onboarding",
  offboarding: "Offboarding",
  fnf: "FnF Settlement",

  // Compliance & Admin
  compliance: "Compliance",
  bgv: "Background Checks",
  documents: "Documents",
  it: "IT",
  "it-provisioning": "IT Provisioning",
  assets: "Assets",
  contractor: "Contractors",
  grievances: "Grievances",
  security: "Security",
  helpdesk: "Helpdesk",

  // Reports & AI
  reports: "Reports",
  ai: "AI Insights",

  // Enterprise
  "multi-entity": "Multi-Entity",
  global: "Global Payroll",
  projects: "Projects",
  developer: "Developer Portal",
  "super-admin": "Super Admin",

  // Settings
  settings: "Settings",
  help: "Help Center",
};

function getBreadcrumb(pathname: string) {
  const parts = pathname.split("/").filter(Boolean);
  // If we're on /dashboard itself, just return one crumb
  if (parts.length === 0 || (parts.length === 1 && parts[0] === "dashboard")) {
    return [{ label: "Dashboard", href: "/dashboard" }];
  }
  const crumbs = [{ label: "Dashboard", href: "/dashboard" }];
  let acc = "";
  for (const part of parts) {
    acc += `/${part}`;
    if (acc === "/dashboard") continue; // skip duplicate dashboard crumb
    const label = ROUTE_LABELS[part] ?? part.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
    crumbs.push({ label, href: acc });
  }
  return crumbs;
}

function NotificationDropdown({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const unread = NOTIFICATIONS.filter(n => n.unread).length;
  return (
    <div className="absolute right-0 top-full mt-2 w-[380px] rounded-[16px] border border-[#162030] bg-[#070d18] shadow-[0_20px_60px_rgba(0,0,0,0.7)] z-50 overflow-hidden animate-scale-in">
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#162030]">
        <div className="flex items-center gap-2">
          <Bell size={14} className="text-[#00e5a0]" />
          <span className="text-[13px] font-600 text-[#f0f4f8]">Notifications</span>
          {unread > 0 && (
            <span className="bg-[rgba(0,229,160,0.15)] text-[#00e5a0] text-[10px] font-700 px-1.5 py-0.5 rounded-full">{unread}</span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <Link href="/notifications" onClick={onClose} className="text-[11px] text-[#7a8fa6] hover:text-[#00e5a0] transition-colors">View all</Link>
          <button onClick={onClose} className="text-[#7a8fa6] hover:text-[#7a8fa6] transition-colors"><X size={13} /></button>
        </div>
      </div>
      <div className="divide-y divide-[#0e1a28]">
        {NOTIFICATIONS.map(n => (
          <button
            key={n.id}
            onClick={() => { router.push(n.href); onClose(); }}
            className={`w-full flex items-start gap-3 px-4 py-3 hover:bg-[rgba(255,255,255,0.02)] transition-colors text-left ${n.unread ? "bg-[rgba(255,255,255,0.01)]" : ""}`}
          >
            <div className="mt-0.5 shrink-0 w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `${n.color}15` }}>
              <n.icon size={13} style={{ color: n.color }} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className={`text-[12px] font-600 truncate ${n.unread ? "text-[#f0f4f8]" : "text-[#7a8fa6]"}`}>{n.title}</p>
                {n.unread && <div className="w-1.5 h-1.5 rounded-full bg-[#00e5a0] shrink-0" />}
              </div>
              <p className="text-[11px] text-[#7a8fa6] truncate mt-0.5">{n.desc}</p>
              <p className="text-[10px] text-[#556677] mt-1">{n.time}</p>
            </div>
          </button>
        ))}
      </div>
      <div className="px-4 py-2.5 border-t border-[#162030] flex items-center justify-between">
        <Link href="/notifications/preferences" onClick={onClose} className="text-[11px] text-[#7a8fa6] hover:text-[#7a8fa6] transition-colors flex items-center gap-1">
          <Settings size={10} /> Preferences
        </Link>
        <Link href="/notifications" onClick={onClose} className="text-[11px] text-[#00e5a0] hover:underline">
          All notifications →
        </Link>
      </div>
    </div>
  );
}

function ProfileDropdown({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const items = [
    { icon: User,       label: "My Profile",  href: "/my-profile",       desc: "Personal & job info" },
    { icon: Wallet,     label: "My Money",    href: "/self-service/money", desc: "Payslips, tax, EWA" },
    { icon: Settings,   label: "Settings",    href: "/settings",          desc: "Account preferences" },
    { icon: HelpCircle, label: "Help Center", href: "/help",              desc: "Docs & support" },
  ];
  return (
    <div className="absolute right-0 top-full mt-2 w-[260px] rounded-[16px] border border-[#162030] bg-[#070d18] shadow-[0_20px_60px_rgba(0,0,0,0.7)] z-50 overflow-hidden animate-scale-in">
      <div className="px-4 py-4 border-b border-[#162030] bg-[#0b1422]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[rgba(0,229,160,0.15)] border border-[rgba(0,229,160,0.3)] flex items-center justify-center text-[13px] font-700 text-[#00e5a0]">PM</div>
          <div>
            <p className="text-[13px] font-600 text-[#f0f4f8]">Priya Mehta</p>
            <p className="text-[11px] text-[#7a8fa6]">HR Admin · TechCorp Solutions</p>
          </div>
        </div>
      </div>
      <div className="p-1.5">
        {items.map(item => (
          <button key={item.href} onClick={() => { router.push(item.href); onClose(); }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-[8px] hover:bg-[rgba(255,255,255,0.04)] transition-colors text-left group">
            <div className="w-7 h-7 rounded-[8px] bg-[#0f1c2e] group-hover:bg-[#162030] flex items-center justify-center transition-colors">
              <item.icon size={13} className="text-[#7a8fa6] group-hover:text-[#00e5a0] transition-colors" />
            </div>
            <div>
              <p className="text-[12px] font-500 text-[#c8d8e8]">{item.label}</p>
              <p className="text-[10px] text-[#7a8fa6]">{item.desc}</p>
            </div>
          </button>
        ))}
      </div>
      <div className="p-1.5 border-t border-[#162030]">
        <button onClick={() => { clearSession(); router.push("/login"); onClose(); }}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-[8px] hover:bg-[rgba(239,68,68,0.08)] transition-colors text-left group">
          <div className="w-7 h-7 rounded-[8px] bg-[#0f1c2e] group-hover:bg-[rgba(239,68,68,0.12)] flex items-center justify-center transition-colors">
            <LogOut size={13} className="text-[#7a8fa6] group-hover:text-[#ef4444] transition-colors" />
          </div>
          <p className="text-[12px] font-500 text-[#7a8fa6] group-hover:text-[#ef4444] transition-colors">Sign Out</p>
        </button>
      </div>
    </div>
  );
}

export default function Header() {
  const pathname = usePathname();
  const _router = useRouter();
  const breadcrumbs = getBreadcrumb(pathname);
  const unreadCount = NOTIFICATIONS.filter(n => n.unread).length;

  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- close popovers when the user navigates
    setNotifOpen(false);
    setProfileOpen(false);
  }, [pathname]);

  // Global Cmd+K / Ctrl+K shortcut
  useEffect(() => {
    const handler = (e: globalThis.KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCmdOpen(o => !o);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  return (
    <header
      role="banner"
      className="sticky top-0 z-40 flex items-center justify-between px-6"
      style={{
        height: 60,
        background: "rgba(7,13,24,0.85)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid #162030",
      }}
    >
      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 min-w-0">
        {breadcrumbs.map((crumb, i) => (
          <span key={`${crumb.href}-${i}`} className="flex items-center gap-1.5 min-w-0">
            {i > 0 && <ChevronRight size={11} className="text-[#556677] shrink-0" />}
            {i === breadcrumbs.length - 1 ? (
              <span className="text-[13px] font-600 text-[#f0f4f8] truncate max-w-[200px]">{crumb.label}</span>
            ) : (
              <Link href={crumb.href} className="text-[13px] text-[#7a8fa6] hover:text-[#7a8fa6] transition-colors truncate max-w-[120px]">{crumb.label}</Link>
            )}
          </span>
        ))}
      </nav>

      {/* Search trigger — opens command palette */}
      <button
        type="button"
        aria-label="Open command palette (Cmd+K)"
        onClick={() => setCmdOpen(true)}
        className="relative flex h-9 w-[280px] items-center gap-2 rounded-[10px] border border-[#162030] bg-[#04080f] px-3 text-left text-[13px] text-[#7a8fa6] transition-all hover:border-[#1e3048] hover:text-[#c8d8e8] sm:w-[360px]"
      >
        <Search size={14} className="shrink-0" aria-hidden="true" />
        <span className="flex-1">Search employees, payroll, reports…</span>
        <div className="flex items-center gap-0.5">
          <Command size={10} aria-hidden="true" />
          <span className="text-[10px]">K</span>
        </div>
      </button>

      <CommandPalette open={cmdOpen} onClose={() => setCmdOpen(false)} />

      {/* Right actions */}
      <div className="flex items-center gap-0.5">
        <Link href="/help" aria-label="Help Center"
          className="w-8 h-8 rounded-[8px] flex items-center justify-center text-[#7a8fa6] hover:bg-[rgba(255,255,255,0.05)] hover:text-[#7a8fa6] transition-all">
          <HelpCircle size={16} />
        </Link>

        <div ref={notifRef} className="relative">
          <button
            onClick={() => { setNotifOpen(o => !o); setProfileOpen(false); }}
            aria-label={`Notifications (${unreadCount} unread)`}
            aria-expanded={notifOpen}
            className="relative w-8 h-8 rounded-[8px] flex items-center justify-center text-[#7a8fa6] hover:bg-[rgba(255,255,255,0.05)] hover:text-[#7a8fa6] transition-all"
          >
            <Bell size={16} />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-[#ef4444] rounded-full text-[9px] font-700 text-white flex items-center justify-center leading-none">
                {unreadCount}
              </span>
            )}
          </button>
          {notifOpen && <NotificationDropdown onClose={() => setNotifOpen(false)} />}
        </div>

        <div className="w-px h-5 bg-[#162030] mx-2" />

        <div ref={profileRef} className="relative">
          <button
            onClick={() => { setProfileOpen(o => !o); setNotifOpen(false); }}
            aria-label="User menu"
            aria-expanded={profileOpen}
            className="flex items-center gap-2 pl-1 pr-2 h-8 rounded-[8px] hover:bg-[rgba(255,255,255,0.05)] transition-all"
          >
            <div className="w-6 h-6 rounded-full bg-[rgba(0,229,160,0.15)] border border-[rgba(0,229,160,0.3)] flex items-center justify-center text-[10px] font-700 text-[#00e5a0]">
              PM
            </div>
            <span className="text-[12px] font-500 text-[#c8d8e8] hidden sm:block">Priya</span>
            <ChevronDown size={11} className={`text-[#7a8fa6] transition-transform duration-150 ${profileOpen ? "rotate-180" : ""}`} />
          </button>
          {profileOpen && <ProfileDropdown onClose={() => setProfileOpen(false)} />}
        </div>
      </div>
    </header>
  );
}
