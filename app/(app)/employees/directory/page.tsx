"use client";

import { useState } from "react";
import { Search, MapPin, Phone, Mail, MessageCircle, Grid2X2, List } from "lucide-react";
import Link from "next/link";

const DEPARTMENTS = [
    { name: "All", count: 847 },
    { name: "Engineering", count: 320 },
    { name: "Sales", count: 180 },
    { name: "Operations", count: 172 },
    { name: "Marketing", count: 95 },
    { name: "HR", count: 42 },
    { name: "Finance", count: 38 },
];

const EMPLOYEES = [
    { id: "EMP-0001", name: "Priya Mehta", desig: "HR Manager", dept: "HR", loc: "Mumbai", online: true, color: "#7C3AED" },
    { id: "EMP-0002", name: "Rohan Desai", desig: "Finance Manager", dept: "Finance", loc: "Mumbai", online: false, color: "#0066FF" },
    { id: "EMP-0003", name: "Rahul Sharma", desig: "Sr. Software Engineer", dept: "Engineering", loc: "Pune", online: true, color: "#00E5A0" },
    { id: "EMP-0004", name: "Ananya Patel", desig: "Product Manager", dept: "Product", loc: "Bengaluru", online: true, color: "#F59E0B" },
    { id: "EMP-0005", name: "Vikram Singh", desig: "Sales Manager", dept: "Sales", loc: "Delhi", online: false, color: "#EF4444" },
    { id: "EMP-0006", name: "Kavya Reddy", desig: "Tech Lead", dept: "Engineering", loc: "Bengaluru", online: true, color: "#06B6D4" },
    { id: "EMP-0007", name: "Suresh Nair", desig: "Ops Executive", dept: "Operations", loc: "Chennai", online: false, color: "#8B5CF6" },
    { id: "EMP-0008", name: "Pooja Iyer", desig: "Marketing Lead", dept: "Marketing", loc: "Mumbai", online: true, color: "#EC4899" },
    { id: "EMP-0009", name: "Amit Kumar", desig: "Sales Executive", dept: "Sales", loc: "Delhi", online: false, color: "#10B981" },
    { id: "EMP-0010", name: "Sneha Rao", desig: "Software Engineer", dept: "Engineering", loc: "Hyderabad", online: true, color: "#F97316" },
    { id: "EMP-0011", name: "Karan Mehta", desig: "Staff SWE", dept: "Engineering", loc: "Bengaluru", online: true, color: "#6366F1" },
    { id: "EMP-0012", name: "Divya Nair", desig: "UX Designer", dept: "Product", loc: "Pune", online: false, color: "#14B8A6" },
];

export default function EmployeeDirectory() {
    const [activeDept, setActiveDept] = useState("All");
    const [search, setSearch] = useState("");
    const [view, setView] = useState<"grid" | "list">("grid");
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    const filtered = EMPLOYEES.filter(e =>
        (activeDept === "All" || e.dept === activeDept) &&
        (e.name.toLowerCase().includes(search.toLowerCase()) || e.desig.toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <div className="animate-fade-in" style={{ paddingBottom: 60 }}>
            {/* Header */}
            <div style={{ padding: "32px 32px 24px", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                <div>
                    <h1 style={{ fontSize: 32, fontWeight: 700, color: "#FFFFFF", margin: "0 0 8px" }}>Employee Directory</h1>
                    <div style={{ fontSize: 14, color: "#8899AA" }}>847 total · Find and connect with your team</div>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                    {(["grid", "list"] as const).map(v => (
                        <button key={v} onClick={() => setView(v)} style={{ width: 36, height: 36, border: "1px solid #1A2A3A", borderRadius: 8, background: view === v ? "rgba(0,229,160,0.1)" : "transparent", color: view === v ? "#00E5A0" : "#8899AA", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            {v === "grid" ? <Grid2X2 size={16} /> : <List size={16} />}
                        </button>
                    ))}
                </div>
            </div>

            <div style={{ display: "flex", gap: 0, padding: "0 32px" }}>
                {/* Left Dept Sidebar */}
                <div style={{ width: 200, flexShrink: 0, marginRight: 24 }}>
                    <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: "16px 0", position: "sticky", top: 24 }}>
                        <div style={{ fontSize: 11, fontWeight: 600, color: "#445566", textTransform: "uppercase", letterSpacing: "0.08em", padding: "0 16px", marginBottom: 12 }}>Department</div>
                        {DEPARTMENTS.map(d => (
                            <button key={d.name} onClick={() => setActiveDept(d.name)} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 16px", background: activeDept === d.name ? "rgba(0,229,160,0.05)" : "transparent", border: "none", borderLeft: activeDept === d.name ? "2px solid #00E5A0" : "2px solid transparent", color: activeDept === d.name ? "#00E5A0" : "#8899AA", fontSize: 14, cursor: "pointer", textAlign: "left" }}>
                                {d.name}
                                <span style={{ fontSize: 12, color: "#445566" }}>{d.count}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Right: Search + Grid */}
                <div style={{ flex: 1 }}>
                    <div style={{ position: "relative", marginBottom: 20 }}>
                        <Search size={16} color="#8899AA" style={{ position: "absolute", left: 14, top: 12 }} />
                        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or designation..." style={{ width: "100%", height: 40, background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 10, padding: "0 14px 0 40px", color: "#FFFFFF", fontSize: 14, outline: "none", boxSizing: "border-box" }} className="focus:border-[#00E5A0]" />
                    </div>

                    {view === "grid" ? (
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
                            {filtered.map(emp => (
                                <div key={emp.id} style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 20, position: "relative", overflow: "hidden", cursor: "pointer" }} className="hover:border-[#445566] transition-colors group" onMouseEnter={() => setHoveredId(emp.id)} onMouseLeave={() => setHoveredId(null)}>
                                    {/* Online dot */}
                                    <div style={{ position: "absolute", top: 16, right: 16, width: 8, height: 8, borderRadius: "50%", background: emp.online ? "#00E5A0" : "#445566" }} />

                                    <div style={{ width: 64, height: 64, borderRadius: "50%", background: `${emp.color}20`, color: emp.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 700, margin: "0 auto 16px" }}>
                                        {emp.name.split(" ").map(n => n[0]).join("")}
                                    </div>
                                    <div style={{ textAlign: "center" }}>
                                        <div style={{ fontSize: 15, fontWeight: 600, color: "#FFFFFF", marginBottom: 4 }}>{emp.name}</div>
                                        <div style={{ fontSize: 12, color: "#8899AA", marginBottom: 8 }}>{emp.desig}</div>
                                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 4, fontSize: 12, color: "#445566" }}>
                                            <MapPin size={11} /> {emp.loc}
                                        </div>
                                    </div>

                                    {/* Hover overlay */}
                                    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "#060B14ee", padding: "16px", display: "flex", justifyContent: "center", gap: 16, transform: hoveredId === emp.id ? "translateY(0)" : "translateY(100%)", transition: "transform 0.2s ease" }}>
                                        <Link href={`/employees/${emp.id}`} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#00E5A0", textDecoration: "none" }}>View Profile</Link>
                                        <button style={{ background: "none", border: "none", color: "#8899AA", cursor: "pointer" }} title="Call"><Phone size={16} /></button>
                                        <button style={{ background: "none", border: "none", color: "#8899AA", cursor: "pointer" }} title="Email"><Mail size={16} /></button>
                                        <button style={{ background: "none", border: "none", color: "#8899AA", cursor: "pointer" }} title="WhatsApp"><MessageCircle size={16} /></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, overflow: "hidden" }}>
                            {filtered.map((emp, i) => (
                                <Link href={`/employees/${emp.id}`} key={emp.id} style={{ display: "flex", alignItems: "center", padding: "16px 24px", borderBottom: i < filtered.length - 1 ? "1px solid #1A2A3A" : "none", textDecoration: "none", gap: 16 }} className="hover:bg-[#1A2A3A] transition-colors">
                                    <div style={{ width: 40, height: 40, borderRadius: "50%", background: `${emp.color}20`, color: emp.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, flexShrink: 0 }}>{emp.name.split(" ").map(n => n[0]).join("")}</div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: 14, fontWeight: 600, color: "#FFFFFF" }}>{emp.name}</div>
                                        <div style={{ fontSize: 13, color: "#8899AA" }}>{emp.desig} · {emp.dept}</div>
                                    </div>
                                    <div style={{ fontSize: 12, color: "#445566", display: "flex", alignItems: "center", gap: 4 }}><MapPin size={11} />{emp.loc}</div>
                                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: emp.online ? "#00E5A0" : "#445566", flexShrink: 0 }} />
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
