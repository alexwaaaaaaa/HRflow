"use client";

import { Plus, Send, History } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

// migrated: immersive-ui

interface ReleaseVersion {
  id: string;
  ver: string;
  title: string;
  date: string;
}

const HISTORY: ReleaseVersion[] = [
  { id: "v1", ver: "v2.4.0", title: "Start of Month Fixes", date: "Oct 01, 2026" },
  { id: "v2", ver: "v2.3.9", title: "DPDP Compliance Patch", date: "Sep 15, 2026" },
  { id: "v3", ver: "v2.3.8", title: "Payroll Engine Overhaul", date: "Aug 28, 2026" },
];

export default function ReleaseNotesPage() {
  return (
    <Page
      title="Changelog & Release Notes"
      subtitle="Publish platform updates, new features, and bug fixes to the global changelog."
      breadcrumbs={[
        { label: "Super Admin", href: "/super-admin/dashboard" },
        { label: "Release Notes" },
      ]}
      maxWidth="1100px"
      actions={
        <Button variant="primary" icon={<Plus size={16} />}>
          Draft New Release List
        </Button>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Draft editor */}
        <div className="md:col-span-2">
          <Card padding="lg" className="relative">
            <div className="absolute top-0 right-0 px-4 py-2 bg-indigo-500/10 text-indigo-400 font-bold text-xs uppercase tracking-wider rounded-bl-2xl rounded-tr-2xl border-b border-l border-indigo-500/30">
              Current Draft (v2.4.1)
            </div>

            <div className="space-y-4 pt-4">
              <div>
                <label htmlFor="release-title" className="sr-only">Release title</label>
                <input
                  id="release-title"
                  type="text"
                  defaultValue="October 2026 Platform Update Release"
                  className="w-full bg-transparent text-2xl font-bold text-white outline-none border-b border-transparent focus:border-[#2A3A4A] pb-2 transition-colors"
                />
              </div>

              <div>
                <label htmlFor="release-body" className="sr-only">Release notes body</label>
                <textarea
                  id="release-body"
                  className="w-full h-48 bg-[#131B2B] border border-[#2A3A4A] text-[#8899AA] text-sm rounded-xl p-4 outline-none resize-none focus:border-indigo-500 transition-colors"
                  defaultValue={"### 🚀 New Features\n- AI Performance Reviews (Beta) is now rolling out to select tenants.\n- Added detailed IP Whitelisting capabilities under Security Settings.\n\n### 🐛 Bug Fixes\n- Fixed an issue where Form 16 Part B generation would timeout on large batches.\n- Resolved calendar rendering artifact in Night Mode."}
                />
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-[#1A2A3A]">
                <span className="text-xs text-[#556677] font-mono">Last autosaved 2 mins ago</span>
                <Button variant="primary" icon={<Send size={16} />}>
                  Publish to Changelog
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Published history */}
        <Card padding="none">
          <div className="p-5 border-b border-[#1A2A3A] flex items-center gap-2">
            <History size={18} className="text-[#556677]" aria-hidden="true" />
            <h3 className="font-bold text-white text-sm">Published History</h3>
          </div>
          <div className="divide-y divide-[#1A2A3A]">
            {HISTORY.map((ver) => (
              <div key={ver.id} className="p-4 hover:bg-[#131B2B] transition-colors cursor-pointer">
                <div className="flex justify-between items-start mb-1">
                  <div className="font-bold text-white text-sm truncate">{ver.title}</div>
                  <Badge variant="success">{ver.ver}</Badge>
                </div>
                <div className="text-xs text-[#556677]">{ver.date}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Page>
  );
}
