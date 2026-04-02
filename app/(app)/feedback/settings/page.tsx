"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Settings, ChevronRight, ChevronDown, Save } from "lucide-react";

const REVIEW_TYPES = ["360 Mid-Year", "360 Annual", "Peer Review Only", "Manager Review Only", "Self Assessment"];
const ANONYMITY_OPTIONS = ["Full Anonymity", "Attribute Reviewer Type Only", "No Anonymity"];
const MIN_REVIEWERS = ["2", "3", "4", "5"];

export default function FeedbackSettingsScreen() {
    const [reviewType, setReviewType] = useState(REVIEW_TYPES[0]);
    const [anonymity, setAnonymity] = useState(ANONYMITY_OPTIONS[0]);
    const [minReviewers, setMinReviewers] = useState("3");
    const [selfReview, setSelfReview] = useState(true);
    const [managerApproval, setManagerApproval] = useState(true);
    const [publicKudos, setPublicKudos] = useState(true);
    const [continuousFeedback, setContinuousFeedback] = useState(true);

    const Toggle = ({ on, setOn, id, label, desc }: { on: boolean; setOn: (v: boolean) => void; id: string; label: string; desc?: string }) => (
        <div className="flex items-start justify-between py-4 border-b border-[#1A2A3A] last:border-0 gap-4">
            <div>
                <label htmlFor={id} className="text-sm text-white cursor-pointer font-medium">{label}</label>
                {desc && <p className="text-xs text-[#8899AA] mt-0.5">{desc}</p>}
            </div>
            <button
                id={id}
                type="button"
                role="switch"
                aria-checked={on}
                onClick={() => setOn(!on)}
                className={`shrink-0 relative w-11 h-6 rounded-full transition-colors ${on ? "bg-[#9D00FF]" : "bg-[#1A2A3A]"}`}
            >
                <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${on ? "translate-x-5" : "translate-x-0"}`} aria-hidden="true" />
                <span className="sr-only">{on ? "Enabled" : "Disabled"}</span>
            </button>
        </div>
    );

    const SelectField = ({ id, label, value, options, onChange, desc }: {
        id: string; label: string; value: string; options: string[]; onChange: (v: string) => void; desc?: string;
    }) => (
        <div className="flex items-start justify-between py-4 border-b border-[#1A2A3A] last:border-0 gap-4">
            <div>
                <label htmlFor={id} className="text-sm text-white font-medium">{label}</label>
                {desc && <p className="text-xs text-[#8899AA] mt-0.5">{desc}</p>}
            </div>
            <div className="relative shrink-0">
                <select
                    id={id}
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    className="bg-[#0A1420] border border-[#1A2A3A] text-white text-sm rounded-lg px-3 py-1.5 pr-7 focus:outline-none focus:border-[#9D00FF] appearance-none cursor-pointer"
                >
                    {options.map(o => <option key={o}>{o}</option>)}
                </select>
                <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-[#445566] pointer-events-none" aria-hidden="true" />
            </div>
        </div>
    );

    return (
        <main className="min-h-screen bg-[#060B14] text-white pb-16 font-sans">
            <div className="sticky top-0 z-30 bg-[#060B14]/90 backdrop-blur border-b border-[#1A2A3A] px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Link href="/feedback/dashboard" className="text-[#8899AA] hover:text-white" aria-label="Back">
                        <ChevronRight size={18} className="rotate-180" aria-hidden="true" />
                    </Link>
                    <span className="text-base font-semibold">360° Feedback Settings</span>
                </div>
                <button type="button" className="flex items-center gap-2 bg-[#9D00FF] text-white font-bold text-sm px-5 py-2 rounded-lg hover:bg-[#8300d4] transition-colors">
                    <Save size={14} aria-hidden="true" /> Save Settings
                </button>
            </div>

            <div className="max-w-2xl mx-auto px-6 py-8 space-y-6">

                <section className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6" aria-labelledby="review-settings-heading">
                    <h2 id="review-settings-heading" className="text-base font-semibold text-white mb-1 flex items-center gap-2">
                        <Settings size={15} className="text-[#9D00FF]" aria-hidden="true" /> Review Configuration
                    </h2>
                    <p className="text-xs text-[#8899AA] mb-4">Define how feedback cycles are structured.</p>
                    <div>
                        <SelectField id="default-review-type" label="Default Review Type" value={reviewType} options={REVIEW_TYPES} onChange={setReviewType} />
                        <SelectField id="anonymity-setting" label="Reviewer Anonymity" desc="Controls whether reviewer identity is visible to the recipient." value={anonymity} options={ANONYMITY_OPTIONS} onChange={setAnonymity} />
                        <SelectField id="min-reviewers" label="Minimum Reviewers Required" value={minReviewers} options={MIN_REVIEWERS} onChange={setMinReviewers} />
                    </div>
                </section>

                <section className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6" aria-labelledby="behavior-settings-heading">
                    <h2 id="behavior-settings-heading" className="text-base font-semibold text-white mb-1">Feature Toggles</h2>
                    <p className="text-xs text-[#8899AA] mb-4">Enable or disable feedback features organization-wide.</p>
                    <div>
                        <Toggle on={selfReview} setOn={setSelfReview} id="self-review" label="Self-Assessment" desc="Allow employees to rate themselves during 360 cycles" />
                        <Toggle on={managerApproval} setOn={setManagerApproval} id="manager-approval" label="Manager Reviewer Approval" desc="Manager must approve reviewer list before cycle begins" />
                        <Toggle on={publicKudos} setOn={setPublicKudos} id="public-kudos" label="Public Kudos Wall" desc="Make kudos visible to all employees" />
                        <Toggle on={continuousFeedback} setOn={setContinuousFeedback} id="continuous-feedback" label="Continuous Feedback" desc="Allow employees to give/receive feedback outside formal cycles" />
                    </div>
                </section>

                <section className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6" aria-labelledby="permissions-heading">
                    <h2 id="permissions-heading" className="text-base font-semibold text-white mb-4">Role Permissions</h2>
                    <table className="w-full text-sm" aria-label="360 Feedback permissions by role">
                        <thead>
                            <tr className="border-b border-[#1A2A3A] text-xs text-[#8899AA] uppercase tracking-wider">
                                <th scope="col" className="py-2 text-left">Action</th>
                                <th scope="col" className="py-2 text-center">Employee</th>
                                <th scope="col" className="py-2 text-center">Manager</th>
                                <th scope="col" className="py-2 text-center">HR Admin</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1A2A3A]">
                            {[
                                ["Request Feedback", true, true, true],
                                ["Give Feedback", true, true, true],
                                ["View Own 360 Report", true, true, true],
                                ["View Others' Reports", false, true, true],
                                ["Create Feedback Cycle", false, false, true],
                                ["Manage Kudos", true, true, true],
                            ].map(([action, emp, mgr, hr]) => (
                                <tr key={String(action)} className="hover:bg-[#152336] transition-colors">
                                    <td className="py-3 text-white">{action}</td>
                                    <td className="py-3 text-center">{emp ? "✅" : "—"}</td>
                                    <td className="py-3 text-center">{mgr ? "✅" : "—"}</td>
                                    <td className="py-3 text-center">{hr ? "✅" : "—"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>

            </div>
        </main>
    );
}
