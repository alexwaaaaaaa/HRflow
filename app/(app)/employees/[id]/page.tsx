"use client";

import Link from "next/link";
import { PROFILE, Card, DataGrid } from "./shared";

export default function OverviewTab() {
    return (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 400px", gap: 24 }}>
            <div>
                <Card title="Personal Information" editAction={() => { }}>
                    <DataGrid items={[
                        ["Full Name", PROFILE.name],
                        ["EMP ID", PROFILE.id],
                        ["Date of Birth", `${PROFILE.dob} (Age ${PROFILE.age})`],
                        ["Gender", PROFILE.gender],
                        ["Personal Email", PROFILE.personal],
                        ["Work Email", PROFILE.email],
                        ["Mobile", PROFILE.mobile],
                        ["Blood Group", PROFILE.blood],
                        ["PAN", PROFILE.pan],
                        ["Aadhaar", PROFILE.aadhaar],
                    ]} />
                </Card>
                <Card title="Job Information" editAction={() => { }}>
                    <DataGrid items={[
                        ["Designation", PROFILE.designation],
                        ["Department", PROFILE.dept],
                        ["Work Location", PROFILE.location],
                        ["Employment Type", PROFILE.empType],
                        ["Work Mode", PROFILE.workMode],
                        ["Reporting Manager", PROFILE.manager],
                        ["Grade / Level", PROFILE.grade],
                        ["Date of Joining", PROFILE.doj],
                        ["Notice Period", PROFILE.notice],
                        ["CTC", PROFILE.ctc],
                    ]} />
                </Card>
            </div>
            <div>
                {/* Health Score */}
                <Card title="Employee Health">
                    <div style={{ display: "flex", gap: 20, justifyContent: "center", marginBottom: 16 }}>
                        {[
                            { label: "Attendance", val: "94%", color: "#00E5A0" },
                            { label: "Performance", val: "4.2/5", color: "#0066FF" },
                            { label: "Engagement", val: "72%", color: "#FFB800" },
                        ].map(({ label, val, color }) => (
                            <div key={label} style={{ textAlign: "center" }}>
                                <div style={{ width: 64, height: 64, borderRadius: "50%", background: `${color}15`, border: `3px solid ${color}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 8px" }}>
                                    <span style={{ fontSize: 12, fontWeight: 700, color }}>{val}</span>
                                </div>
                                <div style={{ fontSize: 11, color: "#445566" }}>{label}</div>
                            </div>
                        ))}
                    </div>
                    <div style={{ fontSize: 11, color: "#445566", textAlign: "center" }}>Updated today</div>
                </Card>

                {/* Quick stats */}
                <Card title="Quick Stats">
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                        {[
                            { label: "Leaves Used", val: "12/24" },
                            { label: "Regularizations", val: "2 pending" },
                            { label: "Documents", val: "4/5 uploaded" },
                            { label: "PF Balance", val: "₹2,14,000 ≈" },
                        ].map(({ label, val }) => (
                            <div key={label} style={{ padding: "12px 14px", background: "#0A1420", borderRadius: 10, border: "1px solid #1A2A3A" }}>
                                <div style={{ fontSize: 11, color: "#445566", marginBottom: 4 }}>{label}</div>
                                <div style={{ fontSize: 15, fontWeight: 600, color: "#FFFFFF" }}>{val}</div>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Recent activity */}
                <Card title="Recent Activity">
                    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                        {[
                            { dot: "#00E5A0", text: "Salary revision +11.1%", date: "Oct 2024" },
                            { dot: "#FFB800", text: "Annual Appraisal: 4.2/5", date: "Mar 2024" },
                            { dot: "#0066FF", text: "Manager changed to Karan Mehta", date: "Jun 2024" },
                            { dot: "#00E5A0", text: "Probation confirmed", date: "Dec 2021" },
                            { dot: "#00E5A0", text: "Joined as Software Engineer L3", date: "Jun 2021" },
                        ].map(({ dot, text, date }, i) => (
                            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "10px 0", borderBottom: i < 4 ? "1px solid #0A1420" : "none" }}>
                                <div style={{ width: 8, height: 8, borderRadius: "50%", background: dot, marginTop: 5, flexShrink: 0 }} />
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: 13, color: "#FFFFFF" }}>{text}</div>
                                    <div style={{ fontSize: 11, color: "#445566" }}>{date}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Link href={`/employees/${PROFILE.id}/timeline`} style={{ fontSize: 12, color: "#0066FF", background: "none", border: "none", cursor: "pointer", marginTop: 8, display: "inline-block" }}>View Full Timeline →</Link>
                </Card>
            </div>
        </div>
    );
}
