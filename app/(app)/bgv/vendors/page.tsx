"use client";

import { CheckCircle2, Star, Zap, Activity, ArrowUpRight, Copy, Link as LinkIcon } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

interface Vendor {
  name: string;
  status: "Active" | "Inactive";
  apiStatus: "Connected" | "Disconnected";
  apiUptime: string;
  rating: number;
  costPerCheck: string;
  avgTat: string;
  checksMtd: number;
  logo: string;
}

const VENDORS: Vendor[] = [
  {
    name: "FirstAdvantage",
    status: "Active",
    apiStatus: "Connected",
    apiUptime: "99.9%",
    rating: 4.8,
    costPerCheck: "₹1,500 - ₹3,500",
    avgTat: "4.2 Days",
    checksMtd: 84,
    logo: "F",
  },
  {
    name: "Checkr",
    status: "Active",
    apiStatus: "Connected",
    apiUptime: "100%",
    rating: 4.9,
    costPerCheck: "₹1,200 - ₹3,000",
    avgTat: "3.8 Days",
    checksMtd: 120,
    logo: "C",
  },
  {
    name: "HireRight",
    status: "Inactive",
    apiStatus: "Disconnected",
    apiUptime: "-",
    rating: 4.5,
    costPerCheck: "₹2,000 - ₹5,000",
    avgTat: "5.1 Days",
    checksMtd: 0,
    logo: "H",
  },
];

export default function BGVVendorPage() {
  return (
    <Page
      title="Vendor Management"
      subtitle="Manage integrated BGV vendors, APIs, and performance metrics."
      breadcrumbs={[
        { label: "BGV", href: "/bgv/dashboard" },
        { label: "Vendors" },
      ]}
      maxWidth="1200px"
      actions={<Button>+ Add New Vendor</Button>}
    >
      <div className="space-y-6">
        {/* API health banner */}
        <Card padding="md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#00E5A0]/20 bg-[#00E5A0]/10">
                <Activity className="text-[#00E5A0]" size={24} aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">All APIs Operational</h3>
                <p className="text-sm text-[#8899AA]">2 active vendor webhooks are receiving real-time updates.</p>
              </div>
            </div>
            <Button variant="secondary" icon={<Zap size={16} className="text-amber-500" aria-hidden="true" />}>
              Test Connections
            </Button>
          </div>
        </Card>

        {/* Vendor cards */}
        <div className="space-y-6">
          {VENDORS.map((vendor) => (
            <Card
              key={vendor.name}
              padding="lg"
              className={vendor.status === "Inactive" ? "opacity-70" : ""}
            >
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                {/* Identity */}
                <div className="flex items-center gap-5 md:w-1/3">
                  <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-[#1A2A3A] bg-[#060B14] text-2xl font-black text-[#556677]">
                    {vendor.logo}
                  </div>
                  <div>
                    <h2 className="mb-1 flex items-center gap-2 text-xl font-bold text-white">
                      {vendor.name}
                      {vendor.status === "Active" && (
                        <CheckCircle2 size={16} className="text-[#00E5A0]" aria-hidden="true" />
                      )}
                    </h2>
                    <div className="flex items-center gap-4 text-xs font-semibold">
                      <Badge variant={vendor.status === "Active" ? "success" : "neutral"}>
                        {vendor.status}
                      </Badge>
                      <span
                        className={`flex items-center gap-1 ${vendor.apiStatus === "Connected" ? "text-[#0066FF]" : "text-[#8899AA]"}`}
                      >
                        <LinkIcon size={12} aria-hidden="true" /> {vendor.apiStatus}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-4 md:flex-1">
                  <div>
                    <div className="mb-1 text-xs uppercase tracking-wider text-[#556677]">Avg Rating</div>
                    <div className="flex items-center gap-1 text-base font-bold text-white">
                      {vendor.rating}{" "}
                      <Star size={14} className="fill-amber-500 text-amber-500" aria-hidden="true" />
                    </div>
                  </div>
                  <div>
                    <div className="mb-1 text-xs uppercase tracking-wider text-[#556677]">Avg TAT</div>
                    <div className="text-base font-bold text-white">{vendor.avgTat}</div>
                  </div>
                  <div>
                    <div className="mb-1 text-xs uppercase tracking-wider text-[#556677]">Checks MTD</div>
                    <div className="text-base font-bold text-white">{vendor.checksMtd}</div>
                  </div>
                  <div>
                    <div className="mb-1 text-xs uppercase tracking-wider text-[#556677]">Cost Range</div>
                    <div className="mt-0.5 text-sm font-bold text-white">{vendor.costPerCheck}</div>
                  </div>
                </div>

                {/* Action */}
                <div className="shrink-0">
                  <Button variant="secondary" icon={<ArrowUpRight size={16} className="text-[#8899AA]" aria-hidden="true" />}>
                    Configure
                  </Button>
                </div>
              </div>

              {vendor.status === "Active" && (
                <div className="mt-6 flex flex-wrap items-center gap-6 border-t border-[#1A2A3A] pt-5">
                  <div className="text-xs text-[#8899AA]">API Credentials:</div>
                  <div className="flex items-center gap-2 rounded-md border border-[#1A2A3A] bg-[#060B14] px-3 py-1.5">
                    <span className="font-mono text-xs text-[#556677]">Key:</span>
                    <span className="font-mono text-xs tracking-widest text-white">
                      sk_live_******************
                    </span>
                    <button
                      className="ml-2 text-[#8899AA] transition-colors hover:text-white"
                      aria-label="Copy API key"
                    >
                      <Copy size={14} aria-hidden="true" />
                    </button>
                  </div>
                  <div className="flex items-center gap-2 rounded-md border border-[#1A2A3A] bg-[#060B14] px-3 py-1.5">
                    <span className="font-mono text-xs text-[#556677]">Webhook:</span>
                    <span className="max-w-[200px] truncate font-mono text-xs text-white">
                      https://api.hrflow.com/v1/webhooks/{vendor.name.toLowerCase()}/callback
                    </span>
                    <button
                      className="ml-2 text-[#8899AA] transition-colors hover:text-white"
                      aria-label="Copy webhook URL"
                    >
                      <Copy size={14} aria-hidden="true" />
                    </button>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </Page>
  );
}
