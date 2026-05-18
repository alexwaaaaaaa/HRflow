"use client";

import { useState } from "react";
import { ShieldAlert, Database, Trash2, History, AlertCircle } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

export default function DataRetentionPage() {
    const [empRec, setEmpRec] = useState("7 years");
    const [payRec, setPayRec] = useState("8 years");
    const [auditLog, setAuditLog] = useState("3 years");
    const [autoDel, setAutoDel] = useState(false);

    return (
        <div className="px-16 py-12 max-w-[840px] animate-fade-in">
            <h2 className="text-2xl font-semibold text-white m-0">Data Retention Policy</h2>
            <p className="text-sm text-[#8899AA] mt-1">Configure how long HRFlow stores your company data (DPDPA 2023 Compliance).</p>

            {/* Notice */}
            <div className="flex items-start gap-3 mt-8 mb-8 rounded-xl p-4 bg-[rgba(0,102,255,0.1)] border border-[rgba(0,102,255,0.3)]">
                <ShieldAlert size={20} color="#0066FF" className="flex-shrink-0 mt-0.5" aria-hidden="true" />
                <div className="text-sm text-white leading-relaxed">
                    <strong className="block mb-1">Digital Personal Data Protection Act, 2023</strong>
                    You must delete employee personal data once the purpose of collection is served or the employee withdraws consent, unless retention is required by another law.
                </div>
            </div>

            <div className="grid grid-cols-3 gap-6 mb-8">
                {/* Card 1 */}
                <Card variant="default" padding="md">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="p-1.5 rounded-lg bg-[rgba(0,229,160,0.1)]">
                            <Database size={18} color="#00E5A0" aria-hidden="true" />
                        </div>
                        <div className="text-sm font-semibold text-white">Employee Records</div>
                    </div>
                    <div className="text-xs text-[#8899AA] mb-3 min-h-9">Profile data, documents, performance reviews after exit.</div>
                    <label htmlFor="emp-retention" className="sr-only">Employee records retention period</label>
                    <select
                        id="emp-retention"
                        value={empRec}
                        onChange={(e) => setEmpRec(e.target.value)}
                        className="w-full h-10 px-3 rounded-lg text-sm bg-[#060B14] border border-[#1A2A3A] text-white outline-none focus:border-[#00E5A0] transition-colors"
                    >
                        <option>1 year</option>
                        <option>3 years</option>
                        <option>5 years</option>
                        <option>7 years</option>
                        <option>Indefinitely</option>
                    </select>
                </Card>

                {/* Card 2 */}
                <Card variant="default" padding="md">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="p-1.5 rounded-lg bg-[rgba(0,102,255,0.1)]">
                            <History size={18} color="#0066FF" aria-hidden="true" />
                        </div>
                        <div className="text-sm font-semibold text-white">Payroll Records</div>
                    </div>
                    <div className="text-xs text-[#8899AA] mb-3 min-h-9">Payslips, PF, ESI, tax declarations and statutory filings.</div>
                    <label htmlFor="pay-retention" className="sr-only">Payroll records retention period</label>
                    <select
                        id="pay-retention"
                        value={payRec}
                        onChange={(e) => setPayRec(e.target.value)}
                        className="w-full h-10 px-3 rounded-lg text-sm bg-[#060B14] border border-[#1A2A3A] text-white outline-none focus:border-[#00E5A0] transition-colors"
                    >
                        <option>3 years</option>
                        <option>5 years</option>
                        <option>8 years (Req by IT Act)</option>
                        <option>Indefinitely</option>
                    </select>
                </Card>

                {/* Card 3 */}
                <Card variant="default" padding="md">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="p-1.5 rounded-lg bg-[rgba(255,184,0,0.1)]">
                            <ShieldAlert size={18} color="#FFB800" aria-hidden="true" />
                        </div>
                        <div className="text-sm font-semibold text-white">Audit Logs</div>
                    </div>
                    <div className="text-xs text-[#8899AA] mb-3 min-h-9">Login history, IP addresses, system-level changes.</div>
                    <label htmlFor="audit-retention" className="sr-only">Audit log retention period</label>
                    <select
                        id="audit-retention"
                        value={auditLog}
                        onChange={(e) => setAuditLog(e.target.value)}
                        className="w-full h-10 px-3 rounded-lg text-sm bg-[#060B14] border border-[#1A2A3A] text-white outline-none focus:border-[#00E5A0] transition-colors"
                    >
                        <option>1 year</option>
                        <option>3 years</option>
                        <option>5 years</option>
                    </select>
                </Card>
            </div>

            <h3 className="text-lg font-semibold text-white m-0 mb-4">Deletion Procedure</h3>

            <Card variant="default" padding="none" className="overflow-hidden">
                <div className="flex items-center justify-between p-5 border-b border-[#1A2A3A]">
                    <div className="flex items-start gap-4">
                        <div className="p-2.5 rounded-full bg-[rgba(255,68,68,0.1)]">
                            <Trash2 size={24} color="#FF4444" aria-hidden="true" />
                        </div>
                        <div>
                            <div className="text-base font-semibold text-white mb-1">Automated Hard Deletion</div>
                            <div className="text-[13px] text-[#8899AA]">
                                Once the retention period expires, permanently delete data.<br />
                                A 30-day notice is sent to Super Admins before deletion.
                            </div>
                        </div>
                    </div>
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setAutoDel(!autoDel)}
                        className="relative w-11 h-6 p-0 border-0 rounded-full transition-colors flex-shrink-0"
                        style={{ background: autoDel ? "#FF4444" : "#1A2A3A" }}
                        aria-pressed={autoDel}
                        aria-label="Toggle automated hard deletion"
                    >
                        <span
                            className="absolute top-[3px] w-[18px] h-[18px] rounded-full bg-white transition-all duration-200"
                            style={{ left: autoDel ? 23 : 3 }}
                        />
                    </Button>
                </div>

                {autoDel ? (
                    <div className="p-5 text-sm text-white bg-[rgba(255,68,68,0.05)] animate-fade-in flex items-center gap-2">
                        <AlertCircle size={16} color="#FF4444" aria-hidden="true" /> Data will be irreversibly deleted upon expiration. No backups will be retained.
                    </div>
                ) : (
                    <div className="p-5 text-sm text-[#8899AA]">
                        Data will be archived and retained until a Super Admin initiates manual deletion.
                    </div>
                )}
            </Card>
        </div>
    );
}
