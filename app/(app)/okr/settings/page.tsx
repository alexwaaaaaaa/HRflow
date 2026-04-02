"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Settings, ChevronRight, Save, ChevronDown } from "lucide-react";

const CADENCES = ["Weekly", "Bi-weekly", "Monthly"];
const SCALES = ["0–100%", "Milestones", "Binary (Done/Not Done)"];
const VISIBILITIES = ["Everyone", "Managers Only", "Owner Only"];

export default function OKRSettingsScreen() {
    const [cadence, setCadence] = useState("Weekly");
    const [scale, setScale] = useState("0–100%");
    const [visibility, setVisibility] = useState("Everyone");
    const [autoClose, setAutoClose] = useState(true);
    const [reminders, setReminders] = useState(true);
    const [cascading, setCascading] = useState(true);

    const Toggle = ({ on, setOn, id, label }: { on: boolean; setOn: (v: boolean) => void; id: string; label: string }) => (
        <div className="flex items-center justify-between py-4 border-b border-[#1A2A3A] last:border-0">
            <label htmlFor={id} className="text-sm text-white cursor-pointer">{label}</label>
            <button
                id={id}
                type="button"
                role="switch"
                aria-checked={on}
                onClick={() => setOn(!on)}
                className={`relative w-11 h-6 rounded-full transition-colors ${on ? "bg-[#00E5A0]" : "bg-[#1A2A3A]"}`}
            >
                <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${on ? "translate-x-5" : "translate-x-0"}`}
                    aria-hidden="true"
                />
                <span className="sr-only">{on ? "Enabled" : "Disabled"}</span>
            </button>
        </div>
    );

    const SelectField = ({ id, label, value, options, onChange }: {
        id: string; label: string; value: string; options: string[]; onChange: (v: string) => void
    }) => (
        <div className="flex items-center justify-between py-4 border-b border-[#1A2A3A] last:border-0">
            <label htmlFor={id} className="text-sm text-white">{label}</label>
            <div className="relative">
                <select
                    id={id}
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    className="bg-[#0A1420] border border-[#1A2A3A] text-white text-sm rounded-lg px-3 py-1.5 pr-7 focus:outline-none focus:border-[#00E5A0] appearance-none cursor-pointer"
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
                    <Link href="/okr/dashboard" className="text-[#8899AA] hover:text-white" aria-label="Back to OKR Dashboard">
                        <ChevronRight size={18} className="rotate-180" aria-hidden="true" />
                    </Link>
                    <span className="text-base font-semibold">OKR Settings</span>
                </div>
                <button type="button" className="flex items-center gap-2 bg-[#00E5A0] text-[#060B14] font-bold text-sm px-5 py-2 rounded-lg hover:bg-[#00c98d] transition-colors">
                    <Save size={14} aria-hidden="true" /> Save Settings
                </button>
            </div>

            <div className="max-w-2xl mx-auto px-6 py-8 space-y-6">

                {/* Cycle Configuration */}
                <section className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6" aria-labelledby="cycle-config-heading">
                    <h2 id="cycle-config-heading" className="text-base font-semibold text-white mb-1 flex items-center gap-2">
                        <Settings size={16} className="text-[#00E5A0]" aria-hidden="true" /> Cycle Configuration
                    </h2>
                    <p className="text-xs text-[#8899AA] mb-4">Control how OKR cycles are managed across the organization.</p>
                    <div className="divide-y divide-[#1A2A3A]">
                        <SelectField id="checkin-cadence" label="Check-in Cadence" value={cadence} options={CADENCES} onChange={setCadence} />
                        <SelectField id="scoring-scale" label="Scoring Scale" value={scale} options={SCALES} onChange={setScale} />
                        <SelectField id="okr-visibility" label="Default Visibility" value={visibility} options={VISIBILITIES} onChange={setVisibility} />
                    </div>
                </section>

                {/* Behavior Settings */}
                <section className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6" aria-labelledby="behavior-heading">
                    <h2 id="behavior-heading" className="text-base font-semibold text-white mb-1">Behavior Settings</h2>
                    <p className="text-xs text-[#8899AA] mb-4">Automation and notification preferences.</p>
                    <div>
                        <Toggle on={reminders} setOn={setReminders} id="checkin-reminders" label="Send check-in reminders to OKR owners" />
                        <Toggle on={cascading} setOn={setCascading} id="cascading-enabled" label="Enable cascading alignment from Company → Dept → Team" />
                        <Toggle on={autoClose} setOn={setAutoClose} id="auto-close" label="Auto-close OKRs at end of cycle with final score" />
                    </div>
                </section>

                {/* Permissions */}
                <section className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6" aria-labelledby="permissions-heading">
                    <h2 id="permissions-heading" className="text-base font-semibold text-white mb-4">Permissions</h2>
                    <table className="w-full text-sm" aria-label="OKR permissions by role">
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
                                ["Create OKRs", true, true, true],
                                ["Edit OKRs", true, true, true],
                                ["Delete OKRs", false, true, true],
                                ["Approve OKRs", false, true, true],
                                ["View All Dept OKRs", false, false, true],
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
