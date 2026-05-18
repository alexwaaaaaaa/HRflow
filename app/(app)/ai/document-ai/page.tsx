"use client";

import { ArrowLeft, CheckCircle, AlertTriangle, XCircle, Search, ShieldCheck, Maximize2 } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";

// ─── Static data ────────────────────────────────────────────────────────────

const DOC_INFO = {
  id: "DOC-1002",
  type: "Form 16 (Income Tax)",
  employee: "Arif Khan",
  uploadedAt: "Today, 10:42 AM IST",
  score: 65,
  status: "Flagged for Review",
};

// ─── Page ────────────────────────────────────────────────────────────────────

export default function DocumentAIDetailPage() {
  return (
    <Page
      title={DOC_INFO.type}
      subtitle={`Employee: ${DOC_INFO.employee} • ${DOC_INFO.id} • ${DOC_INFO.uploadedAt}`}
      breadcrumbs={[
        { label: "AI", href: "/ai/smart-onboarding" },
        { label: "Document Intelligence", href: "/ai/document-intelligence" },
        { label: DOC_INFO.id },
      ]}
      maxWidth="1300px"
      actions={
        <>
          <Button variant="danger">Reject Document</Button>
          <Button icon={<ShieldCheck size={14} />}>Force Approve</Button>
        </>
      }
    >
      {/* Back link */}
      <Link href="/ai/document-intelligence" className="flex items-center gap-2 text-[#8899AA] hover:text-white transition-colors w-fit mb-6">
        <ArrowLeft size={18} aria-hidden="true" />
        <span className="text-sm font-medium">Back to Document Queue</span>
      </Link>

      {/* Status badge */}
      <div className="flex items-center gap-3 mb-6">
        <Badge variant="warning">{DOC_INFO.status}</Badge>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Document Viewer */}
        <Card padding="none" className="flex flex-col">
          <div className="bg-[#0A1420] border-b border-[#1A2A3A] px-4 py-3 flex justify-between items-center shrink-0">
            <span className="text-sm text-white font-medium">Page 1/2</span>
            <div className="flex gap-2 text-[#8899AA]">
              <button type="button" className="p-1.5 hover:bg-[#1A2A3A] rounded transition-colors" aria-label="Search in document">
                <Search size={16} aria-hidden="true" />
              </button>
              <button type="button" className="p-1.5 hover:bg-[#1A2A3A] rounded transition-colors" aria-label="Maximize document">
                <Maximize2 size={16} aria-hidden="true" />
              </button>
            </div>
          </div>
          <div className="flex-1 bg-[#131B2B] p-8 flex items-center justify-center overflow-auto min-h-[400px]">
            {/* Mock PDF Document */}
            <div className="w-full max-w-[600px] aspect-[1/1.4] bg-white shadow-2xl relative">
              <div className="p-10 flex flex-col gap-6 text-black/80 font-serif text-[10px] leading-tight opacity-50">
                <div className="text-center font-bold text-lg mb-4">FORM NO. 16</div>
                <div className="grid grid-cols-2 gap-4 border border-black/20 p-4 relative">
                  <div>
                    <strong>Name of Employer:</strong> TechCorp India Pvt Ltd<br />
                    <strong>Address:</strong> Bangalore, 560001
                  </div>
                  <div className="relative">
                    <div className="absolute -inset-2 border-2 border-amber-500 bg-amber-500/10 z-10" title="Entity match failed (Expected: Kaarya)" />
                    <strong>PAN of Employer:</strong> ABCDE1234F<br />
                    <strong>TAN of Employer:</strong> BLRT12345E
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 border border-black/20 p-4 relative">
                  <div>
                    <strong>Name of Employee:</strong> {DOC_INFO.employee}<br />
                    <strong>Address:</strong> MG Road, Pune
                  </div>
                  <div className="relative">
                    <div className="absolute -inset-2 border-2 border-red-500 bg-red-500/10 z-10" title="Format mismatch against NSDL regex" />
                    <strong>PAN of Employee:</strong> AX12B9Y<br />
                    <strong>Emp ID:</strong> 44021
                  </div>
                </div>
                <div className="border border-black/20 mt-4 h-32 flex items-center justify-center bg-black/5">
                  [ Financial Data Table Extract ]
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* AI Analysis */}
        <div className="flex flex-col gap-4">
          {/* Confidence Score */}
          <Card padding="md" className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-full border-4 border-amber-500 flex items-center justify-center shrink-0">
              <span className="text-2xl font-black text-amber-500">{DOC_INFO.score}</span>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-1">Confidence Score</h3>
              <p className="text-xs text-[#8899AA]">The Document AI model flagged 3 discrete anomalies requiring human verification before this document can be committed to the vault.</p>
            </div>
          </Card>

          {/* Diagnostics */}
          <Card padding="none" className="flex flex-col flex-1">
            <div className="px-6 py-4 border-b border-[#1A2A3A] bg-[#0A1420]">
              <h3 className="text-sm font-semibold text-white">Extraction Diagnostics</h3>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {/* Issue 1 */}
              <Card padding="none" className="border-red-500/30 overflow-hidden">
                <div className="p-4 border-b border-red-500/20 bg-red-500/5 flex justify-between items-center">
                  <h4 className="text-red-400 font-medium text-sm flex items-center gap-2">
                    <XCircle size={16} aria-hidden="true" /> Data Format Mismatch
                  </h4>
                  <span className="text-xs text-[#8899AA]">High Priority</span>
                </div>
                <div className="p-4">
                  <p className="text-xs text-[#8899AA] mb-4">
                    The extracted Employee PAN <strong>&quot;AX12B9Y&quot;</strong> does not conform to the standard Indian PAN format and differs from the master DB.
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-[#0A1420] border border-[#2A3A4A] rounded text-sm text-white px-3 py-2 flex justify-between">
                      <span>AX12B9Y</span>
                      <Badge variant="danger">Extracted</Badge>
                    </div>
                    <ArrowLeft size={16} className="text-[#445566]" aria-hidden="true" />
                    <div className="flex-1 bg-emerald-500/10 border border-emerald-500/30 rounded text-sm text-emerald-400 px-3 py-2 flex justify-between">
                      <span>ABCDE1234F</span>
                      <span className="text-xs">Master DB</span>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Button variant="secondary" size="sm">Approve Correction</Button>
                  </div>
                </div>
              </Card>

              {/* Issue 2 */}
              <Card padding="none" className="border-amber-500/30 overflow-hidden">
                <div className="p-4 border-b border-amber-500/20 bg-amber-500/5 flex justify-between items-center">
                  <h4 className="text-amber-500 font-medium text-sm flex items-center gap-2">
                    <AlertTriangle size={16} aria-hidden="true" /> Entity Name Variance
                  </h4>
                  <span className="text-xs text-[#8899AA]">Medium Priority</span>
                </div>
                <div className="p-4">
                  <p className="text-xs text-[#8899AA] mb-4">
                    Employer name extracted as <strong>&quot;TechCorp India Pvt Ltd&quot;</strong>, which does not match the active organization entity &quot;Kaarya Inc&quot;.
                  </p>
                  <label className="flex items-center gap-2 text-sm text-[#8899AA] cursor-pointer hover:text-white transition-colors">
                    <input type="checkbox" className="rounded bg-[#0A1420] border-[#2A3A4A] cursor-pointer" />
                    Mark as valid prior employment
                  </label>
                </div>
              </Card>

              {/* Issue 3 */}
              <Card padding="none" className="border-amber-500/30 overflow-hidden">
                <div className="p-4 border-b border-amber-500/20 bg-amber-500/5 flex justify-between items-center">
                  <h4 className="text-amber-500 font-medium text-sm flex items-center gap-2">
                    <AlertTriangle size={16} aria-hidden="true" /> Missing Authentication
                  </h4>
                  <span className="text-xs text-[#8899AA]">Medium Priority</span>
                </div>
                <div className="p-4">
                  <p className="text-xs text-[#8899AA]">The document lacks an identifiable physical signature, digital signature certificate (DSC) stamp, or company seal.</p>
                </div>
              </Card>

              {/* Valid Fields */}
              <Card padding="md" className="border-emerald-500/20 opacity-70">
                <h4 className="text-emerald-500 font-medium text-xs uppercase tracking-wider mb-2 flex items-center gap-2">
                  <CheckCircle size={14} aria-hidden="true" /> 12 Fields Validated
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs text-[#8899AA]">
                  <div className="flex justify-between border-b border-[#1A2A3A] pb-1"><span>Document Type</span><span className="text-white">Form 16</span></div>
                  <div className="flex justify-between border-b border-[#1A2A3A] pb-1"><span>Employee Name</span><span className="text-white">Arif Khan</span></div>
                  <div className="flex justify-between border-b border-[#1A2A3A] pb-1"><span>Assessment Year</span><span className="text-white">2023-24</span></div>
                  <div className="flex justify-between border-b border-[#1A2A3A] pb-1"><span>Total Income</span><span className="text-white">₹14,50,000</span></div>
                </div>
              </Card>
            </div>
          </Card>
        </div>
      </div>
    </Page>
  );
}
