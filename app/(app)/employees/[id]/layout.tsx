"use client";

import { use } from "react";
import { Edit2, ChevronDown, MoreHorizontal, FileText } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
    { name: "Overview", path: "" },
    { name: "Job & Salary", path: "/job-and-salary" },
    { name: "Documents", path: "/documents" },
    { name: "Attendance", path: "/attendance" },
    { name: "Leave", path: "/leave" },
    { name: "Payroll", path: "/payroll" },
    { name: "Performance", path: "/performance" },
    { name: "Timeline", path: "/timeline" },
];

const PROFILE = {
    name: "Rahul Kumar Sharma", initials: "RK", id: "EMP001",
    designation: "Senior Software Engineer", dept: "Engineering", status: "Active",
    doj: "01/06/2021", manager: "Karan Mehta", location: "Bengaluru",
    email: "rahul.sharma@techcorp.com", personal: "rahul@gmail.com",
    mobile: "+91 98765 43210", pan: "AAACT****C", aadhaar: "--5678",
    dob: "15/08/1996", age: 28, gender: "Male", blood: "B+",
    empType: "Full-Time", workMode: "Hybrid", grade: "L3",
    ctc: "₹18,00,000", joinConfirm: "01/12/2021", notice: "60 days",
};

export default function EmployeeProfileLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ id: string }>;
}) {
    const resolvedParams = use(params);
    const pathname = usePathname();
    const basePath = `/employees/${resolvedParams.id}`;

    return (
        <div style={{ paddingBottom: 80 }} className="animate-fade-in">
            {/* Profile Header */}
            <div style={{
                background: "linear-gradient(135deg, #060B14 0%, rgba(0,229,160,0.06) 100%)",
                borderBottom: "1px solid #1A2A3A", padding: "24px 32px", position: "relative"
            }}>
                {/* Breadcrumb */}
                <div style={{ fontSize: 12, color: "#445566", marginBottom: 16 }}>
                    <Link href="/employees" style={{ color: "#8899AA", textDecoration: "none" }}>Employees</Link>
                    {" / "}
                    <span style={{ color: "#FFFFFF" }}>{PROFILE.name}</span>
                </div>

                <div style={{ display: "flex", alignItems: "flex-start", gap: 20 }}>
                    {/* Avatar */}
                    <div style={{ width: 80, height: 80, borderRadius: "50%", background: "rgba(0,102,255,0.15)", border: "3px solid #00E5A0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, fontWeight: 700, color: "#0066FF", flexShrink: 0 }}>
                        {PROFILE.initials}
                    </div>

                    {/* Name + info */}
                    <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
                            <h1 style={{ fontSize: 28, fontWeight: 700, color: "#FFFFFF", margin: 0 }}>{PROFILE.name}</h1>
                            <span style={{ background: "rgba(0,229,160,0.1)", color: "#00E5A0", padding: "4px 12px", borderRadius: 20, fontSize: 13, fontWeight: 600 }}>Active</span>
                        </div>
                        <div style={{ fontSize: 15, color: "#8899AA", marginBottom: 12 }}>
                            {PROFILE.designation} • <span style={{ background: "#1A2A3A", color: "#8899AA", padding: "2px 8px", borderRadius: 6, fontSize: 13 }}>{PROFILE.dept}</span>
                        </div>
                        <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
                            {[
                                { icon: "🪪", val: PROFILE.id },
                                { icon: "📅", val: `Joined: ${PROFILE.doj}` },
                                { icon: "👤", val: `Reports to: ${PROFILE.manager}` },
                                { icon: "📍", val: PROFILE.location },
                                { icon: "💼", val: PROFILE.grade },
                            ].map(({ icon, val }) => (
                                <span key={val} style={{ fontSize: 13, color: "#8899AA", display: "flex", alignItems: "center", gap: 6 }}>
                                    <span>{icon}</span> {val}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Actions */}
                    <div style={{ display: "flex", gap: 10, flexShrink: 0 }}>
                        <Link href={`/employees/${resolvedParams.id}/edit`}>
                            <button style={{ height: 38, padding: "0 16px", background: "#1A2A3A", border: "1px solid #1A2A3A", borderRadius: 8, fontSize: 13, color: "#FFFFFF", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, transition: "all 0.2s" }} className="hover:border-[#445566]">
                                <Edit2 size={14} /> Edit
                            </button>
                        </Link>
                        <button style={{ height: 38, padding: "0 16px", background: "#1A2A3A", border: "1px solid #1A2A3A", borderRadius: 8, fontSize: 13, color: "#FFFFFF", cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
                            <FileText size={14} /> Generate Documents <ChevronDown size={13} />
                        </button>
                        <button style={{ height: 38, padding: "0 12px", background: "#1A2A3A", border: "1px solid #1A2A3A", borderRadius: 8, cursor: "pointer" }}>
                            <MoreHorizontal size={16} color="#8899AA" />
                        </button>
                    </div>
                </div>

                {/* Tab nav */}
                <div style={{ display: "flex", gap: 0, marginTop: 24, borderBottom: "none" }}>
                    {TABS.map((tab) => {
                        const targetPath = `${basePath}${tab.path}`;
                        const isActive = pathname === targetPath || (tab.path === "" && pathname === basePath);
                        return (
                            <Link href={targetPath} key={tab.name} style={{ textDecoration: "none" }}>
                                <div
                                    style={{
                                        padding: "10px 20px", fontSize: 14, fontWeight: 500, background: "transparent",
                                        borderBottom: `2px solid ${isActive ? "#00E5A0" : "transparent"}`,
                                        color: isActive ? "#FFFFFF" : "#8899AA", cursor: "pointer", transition: "all 0.2s"
                                    }}
                                    className="hover:text-white">
                                    {tab.name}
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>

            {/* Tab Content */}
            <div style={{ padding: "28px 32px" }} className="animate-fade-in">
                {children}
            </div>
        </div>
    );
}
