"use client";

import { useState } from "react";
import { CheckCircle2, ArrowRight, Mail, UploadCloud, AlertCircle } from "lucide-react";
import Link from "next/link";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

const STEPS = [
  { id: 1, label: "Candidate Info", desc: "Select individual or bulk" },
  { id: 2, label: "Check Package", desc: "Select verification items" },
  { id: 3, label: "Information Input", desc: "Who provides data?" },
  { id: 4, label: "Review & Submit", desc: "Final confirmation" },
] as const;

type PackageType = "standard" | "comprehensive" | "executive" | "custom";

const PACKAGE_PRICE: Record<PackageType, string> = {
  standard: "₹1,500",
  comprehensive: "₹3,200",
  executive: "₹5,800",
  custom: "Variable",
};

const PACKAGES: { id: PackageType; title: string; price: string; features: string[] }[] = [
  {
    id: "standard",
    title: "Standard Package",
    price: "₹1,500",
    features: ["ID Verification", "Current Address", "Highest Education"],
  },
  {
    id: "comprehensive",
    title: "Comprehensive",
    price: "₹3,200",
    features: ["Standard + Perm Address", "Criminal / Court Records", "Past 2 Employments"],
  },
  {
    id: "executive",
    title: "Executive",
    price: "₹5,800",
    features: ["Comprehensive + Global DBD", "Credit History Check", "Director Setup Check"],
  },
  {
    id: "custom",
    title: "Custom Select",
    price: "Variable",
    features: ["Handpick specific checks", "Tailored for specific roles"],
  },
];

function StepItem({
  num,
  title,
  desc,
  active,
  done,
}: {
  num: number;
  title: string;
  desc: string;
  active: boolean;
  done: boolean;
}) {
  return (
    <li className="flex gap-3" aria-current={active ? "step" : undefined}>
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-sm font-bold transition-colors ${
          done
            ? "border-[#00E5A0] bg-[#00E5A0] text-[#060B14]"
            : active
            ? "border-[#0066FF] bg-[#0066FF] text-white shadow-[0_0_10px_rgba(0,102,255,0.5)]"
            : "border-[#2A3A4A] bg-transparent text-[#556677]"
        }`}
      >
        {done ? <CheckCircle2 size={16} aria-hidden="true" /> : num}
      </div>
      <div>
        <h4 className={`mb-0.5 text-sm font-bold ${active || done ? "text-white" : "text-[#556677]"}`}>
          {title}
        </h4>
        <p className={`text-xs ${active ? "text-[#8899AA]" : "text-[#445566]"}`}>{desc}</p>
      </div>
    </li>
  );
}

function PackageCard({
  pkg,
  selected,
  onClick,
}: {
  pkg: (typeof PACKAGES)[number];
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      role="radio"
      aria-checked={selected}
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onClick(); } }}
      className={`relative cursor-pointer rounded-xl border-2 bg-[#060B14] p-4 transition-all ${
        selected
          ? "border-[#0066FF] shadow-[0_0_15px_rgba(0,102,255,0.15)]"
          : "border-[#1A2A3A] hover:border-[#2A3A4A]"
      }`}
    >
      {selected && (
        <div className="absolute right-2 top-2 text-[#0066FF]">
          <CheckCircle2 size={20} aria-hidden="true" />
        </div>
      )}
      <h4 className={`mb-1 text-base font-bold ${selected ? "text-[#0066FF]" : "text-white"}`}>
        {pkg.title}
      </h4>
      <div className="mb-3 text-lg font-black text-white">{pkg.price}</div>
      <ul className="space-y-1.5 text-xs text-[#8899AA]">
        {pkg.features.map((f) => (
          <li key={f} className="flex items-start gap-1.5">
            <ArrowRight size={12} className="mt-0.5 shrink-0 text-[#556677]" aria-hidden="true" />
            <span>{f}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function BGVInitiatePage() {
  const [step, setStep] = useState(1);
  const [selectedCandidate, setSelectedCandidate] = useState("");
  const [packageType, setPackageType] = useState<PackageType>("standard");

  return (
        <Page
      title="Initiate BGV"
      subtitle="Start background checks for new hires or existing employees."
      breadcrumbs={[
        { label: "BGV", href: "/bgv/dashboard" },
        { label: "Initiate" },
      ]}
      maxWidth="900px"
    >






      <Card padding="none" className="overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Sidebar steps */}
          <div className="w-full shrink-0 border-b border-[#1A2A3A] bg-[#0D1928] p-6 md:w-64 md:border-b-0 md:border-r">
            <ol className="space-y-6" aria-label="BGV initiation steps">
              {STEPS.map((s) => (
                <StepItem
                  key={s.id}
                  num={s.id}
                  title={s.label}
                  desc={s.desc}
                  active={step === s.id}
                  done={step > s.id}
                />
              ))}
            </ol>
          </div>

          {/* Content */}
          <div className="flex min-h-[500px] flex-1 flex-col p-6 md:p-8">
            {step === 1 && (
              <div className="flex-1">
                <h2 className="mb-6 text-xl font-bold text-white">Select Candidate</h2>
                <div className="space-y-5">
                  <div className="cursor-pointer rounded-xl border border-[#1A2A3A] bg-[#060B14] p-4 transition-colors hover:border-[#0066FF]">
                    <label className="flex w-full cursor-pointer items-center gap-3">
                      <input type="radio" name="cand_mode" defaultChecked className="h-4 w-4 accent-[#0066FF]" />
                      <div className="flex-1">
                        <div className="font-bold text-slate-200">Existing Employee / Pre-joined Candidate</div>
                        <div className="mt-1 text-xs text-[#8899AA]">Select from the HR database</div>
                      </div>
                    </label>
                    <div className="mt-4 pl-7">
                      <label htmlFor="candidate-select" className="sr-only">Select candidate</label>
                      <select
                        id="candidate-select"
                        value={selectedCandidate}
                        onChange={(e) => setSelectedCandidate(e.target.value)}
                        className="w-full rounded-lg border border-[#2A3A4A] bg-[#1A2A3A] px-3 py-2 text-sm text-white outline-none focus:border-[#0066FF]"
                      >
                        <option value="">-- Select Candidate --</option>
                        <option value="rahul">Rahul Sharma (SDE II - Offer Accepted)</option>
                        <option value="priya">Priya Patel (Product Manager - Internal)</option>
                      </select>
                    </div>
                  </div>

                  <div className="cursor-not-allowed rounded-xl border border-[#1A2A3A] bg-[#060B14] p-4 opacity-60">
                    <label className="flex w-full cursor-not-allowed items-center gap-3">
                      <input type="radio" name="cand_mode" disabled className="h-4 w-4 accent-[#0066FF]" />
                      <div className="flex-1">
                        <div className="font-bold text-slate-200">Bulk Initiation</div>
                        <div className="mt-1 text-xs text-[#8899AA]">Upload CSV for multiple candidates</div>
                      </div>
                      <span className="rounded bg-[#1A2A3A] px-2 py-0.5 text-[10px] font-bold text-[#8899AA]">
                        COMING SOON
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="flex-1">
                <h2 className="mb-6 text-xl font-bold text-white">Select BGV Package</h2>
                <fieldset>
                  <legend className="sr-only">Select verification package</legend>
                  <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2" role="radiogroup" aria-label="BGV packages">
                    {PACKAGES.map((pkg) => (
                      <PackageCard
                        key={pkg.id}
                        pkg={pkg}
                        selected={packageType === pkg.id}
                        onClick={() => setPackageType(pkg.id)}
                      />
                    ))}
                  </div>
                </fieldset>

                {packageType === "custom" && (
                  <Card padding="md">
                    <h4 className="mb-3 text-sm font-bold text-white">Select Checks</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      {["ID Verification", "Address (Current)", "Address (Permanent)", "Education", "Employment History", "Criminal Check"].map((check) => (
                        <label key={check} className="flex cursor-pointer items-center gap-2">
                          <input type="checkbox" className="accent-[#0066FF]" defaultChecked={check === "ID Verification"} />
                          <span className="text-slate-300">{check}</span>
                        </label>
                      ))}
                    </div>
                  </Card>
                )}
              </div>
            )}

            {step === 3 && (
              <div className="flex-1">
                <h2 className="mb-2 text-xl font-bold text-white">Information Input Mode</h2>
                <p className="mb-6 text-sm text-[#8899AA]">
                  How will the vendor receive the required documents and data?
                </p>
                <div className="space-y-4">
                  <div className="relative cursor-pointer rounded-xl border-2 border-[#0066FF] bg-[#0066FF]/5 p-4">
                    <div className="absolute right-3 top-3 text-[#0066FF]">
                      <CheckCircle2 size={20} aria-hidden="true" />
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#0066FF]/20 text-[#0066FF]">
                        <Mail size={20} aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="mb-1 text-base font-bold text-white">
                          Send Link to Candidate (Recommended)
                        </h3>
                        <p className="text-sm text-[#8899AA]">
                          Candidate will receive an email/SMS link from the vendor to securely upload documents and fill details directly.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="cursor-pointer rounded-xl border border-[#1A2A3A] bg-[#060B14] p-4 transition-colors hover:border-[#556677]">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#1A2A3A] text-[#8899AA]">
                        <UploadCloud size={20} aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="mb-1 text-base font-bold text-white">HR Uploads Documents</h3>
                        <p className="text-sm text-[#8899AA]">
                          HR manually enters data and uploads scanned documents collected from candidate.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="flex-1">
                <h2 className="mb-6 text-xl font-bold text-white">Review &amp; Submit</h2>
                <Card padding="md" className="mb-6">
                  <h3 className="mb-4 border-b border-[#1A2A3A] pb-2 text-sm font-semibold uppercase tracking-wider text-[#8899AA]">
                    Initiation Summary
                  </h3>
                  <dl className="grid grid-cols-2 gap-y-4 text-sm">
                    <div>
                      <dt className="mb-1 text-xs text-[#556677]">Candidate</dt>
                      <dd className="font-bold text-white">Rahul Sharma (SDE II)</dd>
                    </div>
                    <div>
                      <dt className="mb-1 text-xs text-[#556677]">Selected Package</dt>
                      <dd className="font-bold capitalize text-white">{packageType} Package</dd>
                    </div>
                    <div>
                      <dt className="mb-1 text-xs text-[#556677]">Data Collection</dt>
                      <dd className="font-bold text-white">Direct Link to Candidate</dd>
                    </div>
                    <div>
                      <dt className="mb-1 text-xs text-[#556677]">Vendor</dt>
                      <dd className="font-bold text-white">FirstAdvantage</dd>
                    </div>
                  </dl>
                </Card>

                <div className="flex items-start gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-500/90">
                  <AlertCircle size={20} className="mt-0.5 shrink-0" aria-hidden="true" />
                  <div>
                    Submission will deduct 1 credit ({PACKAGE_PRICE[packageType]}) from your vendor balance. An email will be dispatched immediately to the candidate.
                  </div>
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="mt-auto flex items-center justify-between border-t border-[#1A2A3A] pt-4">
              <Button
                variant="secondary"
                onClick={() => setStep(step - 1)}
                disabled={step === 1}
              >
                Back
              </Button>

              {step < 4 ? (
                <Button
                  onClick={() => setStep(step + 1)}
                  icon={<ArrowRight size={16} aria-hidden="true" />}
                >
                  Continue
                </Button>
              ) : (
                <Link href="/bgv/status">
                  <Button icon={<CheckCircle2 size={16} aria-hidden="true" />}>
                    Confirm &amp; Initiate
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </Card>
    

        

        

        </Page>
    );
}
