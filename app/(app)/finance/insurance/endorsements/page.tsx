"use client";

import { CheckCircle2, UploadCloud, AlertCircle, RefreshCw } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export default function InsuranceEndorsementPage() {
    return (
        <Page
            title="Policy Endorsements"
            subtitle="Request mid-term changes to your active insurance policy (e.g., adding a newborn, correcting name)."
            breadcrumbs={[
                { label: "Finance", href: "/finance/dashboard" },
                { label: "Insurance", href: "/finance/insurance/policy" },
                { label: "Endorsements" },
            ]}
            maxWidth="1000px"
        >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-6">
                    <Card padding="lg">
                        <h2 className="text-lg font-bold text-white mb-6">Submit New Request</h2>
                        <div className="space-y-6">
                            <div>
                                <label htmlFor="endorsement-type" className="block text-sm font-medium text-[#8899AA] mb-2">Endorsement Type</label>
                                <select
                                    id="endorsement-type"
                                    className="w-full bg-[#1A2A3A] border border-[#2A3A4A] text-white rounded-lg px-4 py-2.5 text-sm focus:border-amber-500 focus:outline-none"
                                >
                                    <option>Addition of New Born (Mid-term)</option>
                                    <option>Addition of Spouse (Marriage)</option>
                                    <option>Correction in Name/DOB/Gender</option>
                                    <option>Deletion of Dependent</option>
                                    <option>Change of Nominee (GTL)</option>
                                </select>
                            </div>

                            <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg text-sm" role="note">
                                <p className="text-amber-500 font-medium mb-1 flex items-center gap-2">
                                    <AlertCircle size={16} aria-hidden="true" /> Mid-term Addition Rule
                                </p>
                                <p className="text-amber-500/80 text-xs">
                                    Newborns can only be added within <strong>30 days</strong> from the date of birth. Please ensure you upload the hospital discharge summary or birth certificate.
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[#8899AA] mb-2">Dependent Details</label>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="dep-name" className="sr-only">Full Name</label>
                                        <input
                                            id="dep-name"
                                            type="text"
                                            placeholder="Full Name"
                                            className="w-full bg-[#1A2A3A] border border-[#2A3A4A] text-white rounded-lg px-4 py-2.5 text-sm focus:border-amber-500 focus:outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="dep-dob" className="sr-only">Date of Birth</label>
                                        <input
                                            id="dep-dob"
                                            type="date"
                                            aria-label="Date of birth"
                                            className="w-full bg-[#1A2A3A] border border-[#2A3A4A] text-white rounded-lg px-4 py-2.5 text-sm focus:border-amber-500 focus:outline-none"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[#8899AA] mb-2">Supporting Documents (PDF/JPG)</label>
                                <label
                                    htmlFor="endorsement-doc"
                                    className="border border-dashed border-[#2A3A4A] rounded-xl p-8 flex flex-col items-center justify-center bg-[#1A2A3A]/40 hover:bg-[#1A2A3A]/60 transition-colors cursor-pointer"
                                >
                                    <div className="w-12 h-12 bg-[#2A3A4A] rounded-full flex items-center justify-center mb-4">
                                        <UploadCloud size={24} className="text-amber-500" aria-hidden="true" />
                                    </div>
                                    <p className="text-white font-medium mb-1">Click to browse or drag file here</p>
                                    <p className="text-xs text-[#8899AA]">Max size 5MB. Acceptable: Birth Cert, Discharge Summary</p>
                                    <input id="endorsement-doc" type="file" accept=".pdf,.jpg,.jpeg,.png" className="sr-only" />
                                </label>
                            </div>

                            <Button className="w-full" icon={<RefreshCw size={20} />}>Submit to HR &amp; TPA</Button>
                        </div>
                    </Card>
                </div>

                {/* Past Requests Timeline */}
                <div className="md:col-span-1">
                    <Card padding="lg" className="sticky top-8">
                        <h3 className="text-sm font-bold text-white mb-6 uppercase tracking-wider">Past Requests</h3>
                        <ol className="relative border-l-2 border-[#1A2A3A] ml-2 space-y-6" aria-label="Past endorsement requests">
                            <li className="relative pl-6">
                                <div className="absolute -left-[9px] top-1 w-4 h-4 bg-pink-500 rounded-full ring-4 ring-[#0D1928]" aria-hidden="true" />
                                <h3 className="text-sm font-bold text-white mb-1">Name Correction (Spouse)</h3>
                                <Badge variant="danger" className="mb-1">Rejected by TPA</Badge>
                                <p className="text-xs text-[#8899AA] mb-2">Aadhaar scan was not clearly visible. Please resubmit.</p>
                                <span className="text-[10px] text-[#8899AA] font-mono block">12 Aug 2025</span>
                            </li>
                            <li className="relative pl-6">
                                <div className="absolute -left-[9px] top-1 w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center ring-4 ring-[#0D1928]" aria-hidden="true">
                                    <CheckCircle2 size={16} className="text-[#0D1928]" />
                                </div>
                                <h3 className="text-sm font-bold text-white mb-1">Addition of Spouse</h3>
                                <Badge variant="success" className="mb-1">Approved &amp; Active</Badge>
                                <p className="text-xs text-[#8899AA] mb-2">Marriage certificate verified. Premium adjusted post corporate buffer usage.</p>
                                <span className="text-[10px] text-[#8899AA] font-mono block">20 Jan 2025</span>
                            </li>
                        </ol>
                    </Card>
                </div>
            </div>
        </Page>
    );
}
