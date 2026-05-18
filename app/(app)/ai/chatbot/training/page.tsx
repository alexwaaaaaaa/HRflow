"use client";

import React, { useState } from "react";
import { UploadCloud, File, Trash2, CheckCircle, Clock, Zap, Target, Search } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

// ─── Types ───────────────────────────────────────────────────────────────────

interface TrainingDoc {
  id: number;
  name: string;
  size: string;
  tokens: string;
  status: "Indexed" | "Queued" | "Error";
  date: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────

const documents: TrainingDoc[] = [
  { id: 1, name: "Employee Handbook 2024.pdf", size: "2.4 MB", tokens: "42K", status: "Indexed", date: "Oct 12" },
  { id: 2, name: "Leave Policy Rev 3.docx", size: "850 KB", tokens: "14K", status: "Indexed", date: "Oct 15" },
  { id: 3, name: "Q3 Townhall Transcript.txt", size: "120 KB", tokens: "8K", status: "Queued", date: "Today" },
  { id: 4, name: "Expense Guidelines v2.pdf", size: "1.1 MB", tokens: "22K", status: "Error", date: "Yesterday" },
];

// ─── Sub-components (module scope) ──────────────────────────────────────────

function StatusCell({ status }: { status: TrainingDoc["status"] }) {
  if (status === "Indexed")
    return (
      <span className="text-emerald-400 text-xs font-medium flex items-center gap-1.5">
        <CheckCircle size={14} aria-hidden="true" /> Indexed
      </span>
    );
  if (status === "Queued")
    return (
      <span className="text-amber-400 text-xs font-medium flex items-center gap-1.5">
        <Clock size={14} aria-hidden="true" /> Queued
      </span>
    );
  return (
    <Badge variant="danger">Extraction Error</Badge>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function ChatbotTrainingPage() {
  const [isTraining, setIsTraining] = useState(false);

  const startTraining = () => {
    setIsTraining(true);
    setTimeout(() => setIsTraining(false), 3000);
  };

  return (
    <Page
      title="AI Knowledge Base & Training"
      subtitle="Upload company documents, policies, and transcripts to fine-tune the Kaarya AI assistant."
      breadcrumbs={[
        { label: "AI", href: "/ai/chatbot" },
        { label: "Chatbot", href: "/ai/chatbot" },
        { label: "Training" },
      ]}
      maxWidth="1300px"
      actions={
        <>
          <Button variant="secondary" icon={<Search size={16} aria-hidden="true" />}>
            Test Model
          </Button>
          <Button
            onClick={startTraining}
            disabled={isTraining}
            isLoading={isTraining}
            loadingText="Training..."
            icon={<Zap size={16} aria-hidden="true" />}
          >
            Run Fine-tuning
          </Button>
        </>
      }
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Stats */}
        <Card padding="lg" className="flex flex-col justify-between">
          <div>
            <div className="text-[#8899AA] text-sm font-medium uppercase tracking-wider mb-4">
              Current Knowledge Scope
            </div>
            <div className="text-4xl font-bold text-white mb-1">
              842 <span className="text-xl text-[#8899AA] font-normal">Docs</span>
            </div>
            <div className="text-emerald-400 text-sm font-medium">+12 added this week</div>
          </div>
          <div className="mt-8">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-[#8899AA]">Vector Database Capacity</span>
              <span className="text-white font-medium">32%</span>
            </div>
            <div
              role="progressbar"
              aria-valuenow={32}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Vector database capacity"
              className="w-full bg-[#1A2A3A] rounded-full h-2"
            >
              <div className="bg-emerald-500 h-2 rounded-full w-[32%]" />
            </div>
          </div>
        </Card>

        {/* Upload Zone */}
        <Card
          padding="lg"
          className="lg:col-span-2 border-2 border-dashed border-[#2A3A4A] hover:border-emerald-500/50 transition-colors flex flex-col items-center justify-center text-center cursor-pointer group relative overflow-hidden"
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity"
          />
          <div className="bg-[#1A2A3A] group-hover:bg-emerald-500/10 p-4 rounded-full mb-4 transition-colors">
            <UploadCloud
              size={32}
              className="text-[#8899AA] group-hover:text-emerald-400 transition-colors"
              aria-hidden="true"
            />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Drag &amp; Drop documents here</h3>
          <p className="text-[#8899AA] text-sm max-w-md mx-auto mb-6">
            Supported formats: PDF, DOCX, TXT, CSV. Max file size: 50MB. All data is encrypted and
            completely sandboxed to your organization.
          </p>
          <Button variant="secondary" className="border-emerald-500/30 text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 z-10 w-48">
            Browse Files
          </Button>
        </Card>
      </div>

      {/* Document List */}
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <Target size={20} className="text-emerald-400" aria-hidden="true" /> Training Queue &amp; History
      </h3>
      <Card padding="none" className="overflow-hidden">
        <table className="w-full text-left border-collapse" aria-label="Training documents">
          <thead>
            <tr className="bg-[#0A1420] border-b border-[#1A2A3A]">
              <th className="px-6 py-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">
                Document Name
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">
                Size
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">
                Tokens
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">
                Added
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1A2A3A]">
            {documents.map((doc) => (
              <tr key={doc.id} className="hover:bg-[#131B2B] transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <File size={16} className="text-[#8899AA]" aria-hidden="true" />
                    <span className="text-sm font-medium text-white group-hover:text-emerald-400 transition-colors">
                      {doc.name}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-[#8899AA]">{doc.size}</td>
                <td className="px-6 py-4 text-sm text-[#445566]">{doc.tokens}</td>
                <td className="px-6 py-4">
                  <StatusCell status={doc.status} />
                </td>
                <td className="px-6 py-4 text-sm text-[#8899AA]">{doc.date}</td>
                <td className="px-6 py-4 text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    aria-label={`Delete ${doc.name}`}
                    icon={<Trash2 size={16} aria-hidden="true" />}
                    className="opacity-0 group-hover:opacity-100 text-[#8899AA] hover:text-red-400 hover:bg-red-500/10"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </Page>
  );
}
