"use client";

import Page from "@/components/ui/Page";

import { useState } from "react";
import { Search, SlidersHorizontal, ChevronDown } from "lucide-react";
import Link from "next/link";

const FILTERS = [
  {
    title: "DEPARTMENT",
    items: [
      { label: "Engineering", count: 320, checked: true },
      { label: "Sales", count: 180, checked: false },
      { label: "Operations", count: 172, checked: false },
      { label: "Marketing", count: 95, checked: false },
      { label: "HR", count: 42, checked: false },
      { label: "Finance", count: 38, checked: false },
    ],
  },
  {
    title: "LOCATION",
    items: [
      { label: "Mumbai", count: 312, checked: true },
      { label: "Bengaluru", count: 218, checked: false },
      { label: "Pune", count: 156, checked: false },
      { label: "Delhi", count: 98, checked: false },
      { label: "Chennai", count: 63, checked: false },
    ],
  },
  {
    title: "EMPLOYMENT TYPE",
    items: [
      { label: "Full-time", count: 724, checked: true },
      { label: "Contract", count: 89, checked: false },
      { label: "Intern", count: 34, checked: false },
    ],
  },
];

const EMPLOYEES = [
  {
    id: "EMP-0001",
    name: "Priya Mehta",
    dept: "HR",
    desig: "HR Manager",
    loc: "Mumbai",
    status: "Active",
  },
  {
    id: "EMP-0002",
    name: "Rohan Desai",
    dept: "Finance",
    desig: "Finance Manager",
    loc: "Mumbai",
    status: "Active",
  },
  {
    id: "EMP-0003",
    name: "Rahul Sharma",
    dept: "Engineering",
    desig: "Sr. SWE",
    loc: "Pune",
    status: "Active",
  },
  {
    id: "EMP-0006",
    name: "Kavya Reddy",
    dept: "Engineering",
    desig: "Tech Lead",
    loc: "Bengaluru",
    status: "Active",
  },
];

export default function SearchEmployees() {
  const [search, setSearch] = useState("");
  const [focused, setFocused] = useState(false);

  return (
    <Page
      title="Find Employees"
      breadcrumbs={[{ label: "Employees", href: "/employees" }, { label: "Search" }]}
      maxWidth="1200px"
    >
      <div style={{ paddingBottom: 60 }} className="animate-fade-in">
        {/* HERO */}
        <div style={{ padding: "32px 32px 0" }}>
          <div
            style={{
              background: "#0D1928",
              border: "1px solid #1A2A3A",
              borderRadius: 20,
              padding: 32,
              textAlign: "center",
            }}
          >
            <h2 style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF", marginBottom: 20 }}>
              Find Employees
            </h2>

            <div style={{ position: "relative", maxWidth: 700, margin: "0 auto" }}>
              <div style={{ position: "absolute", left: 16, top: 16, color: "#8899AA" }}>
                <Search size={20} />
              </div>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setTimeout(() => setFocused(false), 200)}
                placeholder="Search by name, employee ID, email, phone, designation, skill..."
                style={{
                  width: "100%",
                  height: 52,
                  background: "#060B14",
                  border: "1px solid #1A2A3A",
                  borderRadius: 12,
                  padding: "0 50px",
                  fontSize: 15,
                  color: "#FFFFFF",
                  outline: "none",
                }}
                className="transition-all focus:border-[#00E5A0] focus:shadow-[0_0_0_4px_rgba(0,229,160,0.1)]"
                id="page-61"
                aria-label="Search by name, employee ID, email, phone, designation, skill..."
              />
              <div
                style={{
                  position: "absolute",
                  right: 12,
                  top: 14,
                  background: "#445566",
                  color: "#8899AA",
                  fontSize: 12,
                  padding: "3px 8px",
                  borderRadius: 6,
                  fontWeight: 600,
                }}
              >
                ⌘K
              </div>
              {focused && (
                <div
                  style={{
                    position: "absolute",
                    top: 60,
                    left: 0,
                    right: 0,
                    background: "#0D1928",
                    border: "1px solid #1A2A3A",
                    borderRadius: 12,
                    padding: 16,
                    textAlign: "left",
                    zIndex: 10,
                    boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
                  }}
                >
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: "#8899AA",
                      marginBottom: 12,
                      textTransform: "uppercase",
                    }}
                  >
                    Recent Searches
                  </div>
                  <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
                    {["Rahul Sharma", "EMP-0847", "Product Managers"].map((t) => (
                      
                      <button
                        key={t}
                        style={{
                          background: "#1A2A3A",
                          border: "none",
                          color: "#FFFFFF",
                          padding: "6px 12px",
                          borderRadius: 20,
                          fontSize: 13,
                          cursor: "pointer",
                        }}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: "#8899AA",
                      marginBottom: 12,
                      textTransform: "uppercase",
                    }}
                  >
                    Quick Filters
                  </div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {[
                      "Active Employees",
                      "Engineers",
                      "Mumbai Office",
                      "On Notice",
                      "Joined Last 30 Days",
                    ].map((t) => (
                      
                      <button
                        key={t}
                        style={{
                          background: "transparent",
                          border: "1px solid #445566",
                          color: "#8899AA",
                          padding: "6px 12px",
                          borderRadius: 20,
                          fontSize: 13,
                          cursor: "pointer",
                        }}
                        className="hover:border-[#00E5A0] hover:text-[#00E5A0]"
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* MAIN CONTENT 2-COL */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "320px 1fr",
            gap: 32,
            padding: "24px 32px",
          }}
        >
          {/* LEFT - FILTERS */}
          <div style={{ position: "sticky", top: 24, alignSelf: "start" }}>
            <div
              style={{
                background: "#0D1928",
                border: "1px solid #1A2A3A",
                borderRadius: 16,
                padding: "20px 24px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 20,
                }}
              >
                <h3
                  style={{
                    fontSize: 16,
                    fontWeight: 600,
                    color: "#FFFFFF",
                    margin: 0,
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <SlidersHorizontal size={16} color="#00E5A0" /> Filters
                  <span
                    style={{
                      background: "#00E5A0",
                      color: "#060B14",
                      fontSize: 10,
                      padding: "2px 6px",
                      borderRadius: 10,
                      fontWeight: 700,
                    }}
                  >
                    2
                  </span>
                </h3>
                
                <button
                  style={{
                    color: "#FF4444",
                    fontSize: 13,
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Reset All
                </button>
              </div>

              {FILTERS.map((f, idx) => (
                <div
                  key={f.title}
                  style={{ borderTop: idx > 0 ? "1px solid #1A2A3A" : "none", padding: "16px 0" }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: 12,
                      fontWeight: 600,
                      color: "#8899AA",
                      marginBottom: 12,
                      cursor: "pointer",
                    }}
                  >
                    {f.title} <ChevronDown size={14} />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {f.items.map((item) => (
                      <label
                        key={item.label}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          cursor: "pointer",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <input
                            type="checkbox"
                            defaultChecked={item.checked}
                            style={{ accentColor: "#00E5A0", width: 14, height: 14 }}
                          />
                          <span
                            style={{ fontSize: 14, color: item.checked ? "#FFFFFF" : "#8899AA" }}
                          >
                            {item.label}
                          </span>
                        </div>
                        <span style={{ fontSize: 12, color: "#445566" }}>{item.count}</span>
                      </label>
                    ))}
                  </div>
                  {f.items.length > 4 && (
                    
                    <button
                      style={{
                        fontSize: 12,
                        color: "#0066FF",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        marginTop: 8,
                        padding: 0,
                      }}
                    >
                      Show more +
                    </button>
                  )}
                </div>
              ))}

              <div style={{ borderTop: "1px solid #1A2A3A", padding: "16px 0" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#8899AA",
                    marginBottom: 16,
                  }}
                >
                  SALARY RANGE <ChevronDown size={14} />
                </div>
                <div
                  style={{
                    height: 4,
                    background: "#1A2A3A",
                    borderRadius: 4,
                    position: "relative",
                    marginBottom: 20,
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      left: "20%",
                      right: "30%",
                      height: "100%",
                      background: "#00E5A0",
                      borderRadius: 4,
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      left: "20%",
                      top: -6,
                      width: 16,
                      height: 16,
                      borderRadius: "50%",
                      background: "#FFFFFF",
                      border: "2px solid #00E5A0",
                      marginLeft: -8,
                      cursor: "grab",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      left: "70%",
                      top: -6,
                      width: 16,
                      height: 16,
                      borderRadius: "50%",
                      background: "#FFFFFF",
                      border: "2px solid #00E5A0",
                      marginLeft: -8,
                      cursor: "grab",
                    }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: 12,
                    color: "#8899AA",
                  }}
                >
                  <span>₹3,00,000</span>
                  <span>₹20,00,000</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT - RESULTS */}
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <div style={{ fontSize: 14, color: "#8899AA" }}>
                Showing <span style={{ color: "#FFFFFF", fontWeight: 600 }}>847</span> employees
                found
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <label htmlFor="page-161" style={{ fontSize: 13, color: "#445566" }}>
                  Sort by:
                </label>
                <select
                  style={{
                    background: "#0D1928",
                    border: "1px solid #1A2A3A",
                    color: "#FFFFFF",
                    padding: "6px 12px",
                    borderRadius: 8,
                    fontSize: 13,
                    outline: "none",
                  }}
                  id="page-161"
                >
                  <option>Relevance</option>
                  <option>Name A-Z</option>
                  <option>Joining Date</option>
                  <option>Salary (High to Low)</option>
                </select>
              </div>
            </div>

            <div
              style={{
                background: "#0D1928",
                border: "1px solid #1A2A3A",
                borderRadius: 16,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "220px 100px 140px 160px 120px 100px 80px",
                  padding: "12px 20px",
                  background: "#0A1420",
                  borderBottom: "1px solid #1A2A3A",
                  fontSize: 12,
                  fontWeight: 500,
                  color: "#8899AA",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                <div>Employee</div>
                <div>ID</div>
                <div>Department</div>
                <div>Designation</div>
                <div>Location</div>
                <div>Status</div>
                <div style={{ textAlign: "right" }}>Action</div>
              </div>
              {EMPLOYEES.map((emp, i) => (
                <Link
                  href="/employees/EMP001"
                  key={i}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "220px 100px 140px 160px 120px 100px 80px",
                    padding: "12px 20px",
                    borderBottom: i < EMPLOYEES.length - 1 ? "1px solid #1A2A3A" : "none",
                    alignItems: "center",
                    textDecoration: "none",
                  }}
                  className="group transition-colors hover:bg-[#1A2A3A]"
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: "50%",
                        background: `hsl(${i * 60}, 70%, 15%)`,
                        color: `hsl(${i * 60}, 70%, 50%)`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 12,
                        fontWeight: 700,
                      }}
                    >
                      {emp.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#FFFFFF" }}>
                      {emp.name}
                    </div>
                  </div>
                  <div style={{ fontSize: 14, color: "#8899AA", fontFamily: "monospace" }}>
                    {emp.id}
                  </div>
                  <div style={{ fontSize: 14, color: "#FFFFFF" }}>{emp.dept}</div>
                  <div style={{ fontSize: 13, color: "#8899AA" }}>{emp.desig}</div>
                  <div style={{ fontSize: 13, color: "#8899AA" }}>{emp.loc}</div>
                  <div>
                    <span
                      style={{
                        fontSize: 11,
                        background: "rgba(0,229,160,0.1)",
                        color: "#00E5A0",
                        padding: "4px 8px",
                        borderRadius: 20,
                        fontWeight: 500,
                      }}
                    >
                      {emp.status}
                    </span>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <span
                      style={{ color: "#0066FF", fontSize: 13 }}
                      className="opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      View →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}
