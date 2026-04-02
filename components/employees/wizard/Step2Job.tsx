"use client";

const inputStyle = {
    width: "100%", height: 40, background: "#0D1928", border: "1px solid #1A2A3A",
    borderRadius: 8, padding: "0 12px", fontSize: 14, color: "#FFFFFF", outline: "none",
    boxSizing: "border-box" as const, transition: "border-color 0.2s", appearance: "none" as const
};

function Field({ label, hint, required, children, cols }: { label: string; hint?: string; required?: boolean; children: React.ReactNode; cols?: number }) {
    return (
        <div style={cols ? { gridColumn: `span ${cols}` } : {}}>
            <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#8899AA", marginBottom: 8 }}>
                {label} {required && <span style={{ color: "#FF4444" }}>*</span>}
            </label>
            {children}
            {hint && <div style={{ fontSize: 11, color: "#445566", marginTop: 6 }}>{hint}</div>}
        </div>
    );
}

export default function Step2Job({ data, onUpdate }: { data: Record<string, unknown>; onUpdate: (d: Record<string, unknown>) => void }) {
    return (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 32, alignItems: "start" }}>
            {/* LEFT — Form */}
            <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 28 }}>
                <h2 style={{ fontSize: 20, fontWeight: 600, color: "#FFFFFF", margin: "0 0 4px" }}>Job & Employment Details</h2>
                <p style={{ fontSize: 13, color: "#445566", margin: "0 0 24px" }}>Define the employee&apos;s role, reporting structure, and employment terms</p>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
                    <Field label="Designation" required hint="Grade auto-fills from designation selection">
                        <select style={inputStyle}
                            onFocus={e => e.target.style.borderColor = "#00E5A0"}
                            onBlur={e => e.target.style.borderColor = "#1A2A3A"}>
                            <option value="">Search designation...</option>
                            {["Junior Software Engineer", "Software Engineer", "Senior Software Engineer", "Tech Lead", "Engineering Manager", "Product Manager", "HR Business Partner", "Finance Analyst", "Sales Executive", "Sales Manager"].map(d => <option key={d}>{d}</option>)}
                        </select>
                    </Field>
                    <Field label="Grade" hint="L3: ₹8L – ₹15L CTC range">
                        <div style={{ height: 40, background: "#0A1420", border: "1px solid #1A2A3A", borderRadius: 8, display: "flex", alignItems: "center", paddingLeft: 12, fontSize: 14 }}>
                            <span style={{ background: "rgba(0,102,255,0.1)", color: "#0066FF", padding: "2px 8px", borderRadius: 6, fontSize: 12, fontWeight: 600 }}>L3</span>
                            <span style={{ fontSize: 13, color: "#445566", marginLeft: 10 }}>Auto-assigned</span>
                        </div>
                    </Field>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
                    <Field label="Department" required>
                        <select style={inputStyle}
                            onFocus={e => e.target.style.borderColor = "#00E5A0"}
                            onBlur={e => e.target.style.borderColor = "#1A2A3A"}>
                            <option value="">Select Department</option>
                            {["Engineering", "Product", "Human Resources", "Finance", "Sales", "Operations", "Legal", "Admin", "Marketing"].map(d => <option key={d}>{d}</option>)}
                        </select>
                    </Field>
                    <Field label="Sub-department">
                        <input style={inputStyle} placeholder="Optional" onFocus={e => e.target.style.borderColor = "#00E5A0"} onBlur={e => e.target.style.borderColor = "#1A2A3A"} />
                    </Field>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
                    <Field label="Work Location" required>
                        <select style={inputStyle} onFocus={e => e.target.style.borderColor = "#00E5A0"} onBlur={e => e.target.style.borderColor = "#1A2A3A"}>
                            {["Mumbai HQ", "Bengaluru Office", "Delhi NCR", "Hyderabad", "Pune", "Remote"].map(l => <option key={l}>{l}</option>)}
                        </select>
                    </Field>
                    <Field label="Cost Center">
                        <select style={inputStyle} onFocus={e => e.target.style.borderColor = "#00E5A0"} onBlur={e => e.target.style.borderColor = "#1A2A3A"}>
                            {["CC-TECH-001", "CC-PROD-002", "CC-HR-003", "CC-FIN-004", "CC-SALES-005"].map(c => <option key={c}>{c}</option>)}
                        </select>
                    </Field>
                </div>

                <Field label="Reporting Manager" required hint="Defines org chart hierarchy">
                    <div style={{ position: "relative" }}>
                        <input style={inputStyle} placeholder="Search by name or designation"
                            onFocus={e => e.target.style.borderColor = "#00E5A0"}
                            onBlur={e => e.target.style.borderColor = "#1A2A3A"} />
                    </div>
                    {/* Manager preview */}
                    <div style={{ marginTop: 8, padding: "10px 14px", background: "#0A1420", borderRadius: 8, border: "1px solid #1A2A3A", display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(0,229,160,0.15)", border: "1.5px solid rgba(0,229,160,0.4)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#00E5A0" }}>KM</div>
                        <div>
                            <div style={{ fontSize: 13, fontWeight: 600, color: "#FFFFFF" }}>Karan Mehta</div>
                            <div style={{ fontSize: 11, color: "#445566" }}>Engineering Manager · L5</div>
                        </div>
                        <div style={{ marginLeft: "auto", fontSize: 11, color: "#00E5A0" }}>→ Reports to this person</div>
                    </div>
                </Field>

                <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "24px 0 20px" }}>
                    <div style={{ flex: 1, height: 1, background: "#1A2A3A" }} />
                    <span style={{ fontSize: 11, color: "#445566", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase" }}>Employment Terms</span>
                    <div style={{ flex: 1, height: 1, background: "#1A2A3A" }} />
                </div>

                <div style={{ marginBottom: 20 }}>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#8899AA", marginBottom: 10 }}>Employment Type <span style={{ color: "#FF4444" }}>*</span></label>
                    <div style={{ display: "flex", gap: 8 }}>
                        {["Full-Time", "Part-Time", "Contract", "Intern"].map(t => (
                            <label key={t} style={{ cursor: "pointer" }}>
                                <input type="radio" name="empType" value={t} style={{ display: "none" }} />
                                <span style={{ display: "block", padding: "8px 16px", borderRadius: 8, fontSize: 13, background: t === "Full-Time" ? "rgba(0,229,160,0.1)" : "#1A2A3A", border: `1px solid ${t === "Full-Time" ? "#00E5A0" : "#1A2A3A"}`, color: t === "Full-Time" ? "#00E5A0" : "#8899AA", cursor: "pointer", transition: "all 0.15s" }}>
                                    {t}
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
                    <Field label="Work Arrangement">
                        <div style={{ display: "flex", gap: 8 }}>
                            {["Office", "WFH", "Hybrid"].map(t => (
                                <label key={t} style={{ cursor: "pointer" }}>
                                    <input type="radio" name="workMode" value={t} style={{ display: "none" }} />
                                    <span style={{ display: "block", padding: "8px 14px", borderRadius: 8, fontSize: 13, background: "#1A2A3A", border: "1px solid #1A2A3A", color: "#8899AA", cursor: "pointer" }}>
                                        {t}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </Field>
                    <Field label="Employee Category">
                        <select style={inputStyle} onFocus={e => e.target.style.borderColor = "#00E5A0"} onBlur={e => e.target.style.borderColor = "#1A2A3A"}>
                            {["Senior Management", "Middle Management", "Executive", "Staff", "Trainee"].map(c => <option key={c}>{c}</option>)}
                        </select>
                    </Field>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
                    <Field label="Date of Joining" required>
                        <input type="date" style={inputStyle} onFocus={e => e.target.style.borderColor = "#00E5A0"} onBlur={e => e.target.style.borderColor = "#1A2A3A"} />
                    </Field>
                    <Field label="Confirmation Date" hint="Auto-calculated: DOJ + 6 months probation">
                        <input type="date" style={{ ...inputStyle, color: "#445566" }} onFocus={e => e.target.style.borderColor = "#00E5A0"} onBlur={e => e.target.style.borderColor = "#1A2A3A"} />
                    </Field>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                    <Field label="Probation Period">
                        <div style={{ display: "flex", gap: 8 }}>
                            <input type="number" defaultValue={6} style={{ ...inputStyle, width: 80 }} onFocus={e => e.target.style.borderColor = "#00E5A0"} onBlur={e => e.target.style.borderColor = "#1A2A3A"} />
                            <select style={{ ...inputStyle, flex: 1 }} onFocus={e => e.target.style.borderColor = "#00E5A0"} onBlur={e => e.target.style.borderColor = "#1A2A3A"}>
                                <option>Months</option><option>Days</option>
                            </select>
                        </div>
                    </Field>
                    <Field label="Notice Period">
                        <div style={{ display: "flex", gap: 8 }}>
                            <input type="number" defaultValue={60} style={{ ...inputStyle, width: 80 }} onFocus={e => e.target.style.borderColor = "#00E5A0"} onBlur={e => e.target.style.borderColor = "#1A2A3A"} />
                            <select style={{ ...inputStyle, flex: 1 }} onFocus={e => e.target.style.borderColor = "#00E5A0"} onBlur={e => e.target.style.borderColor = "#1A2A3A"}>
                                <option>Days</option><option>Months</option>
                            </select>
                        </div>
                    </Field>
                </div>
            </div>

            {/* RIGHT — Org chart preview */}
            <div style={{ position: "sticky", top: 24, background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 24 }}>
                <h3 style={{ fontSize: 14, fontWeight: 600, color: "#FFFFFF", margin: "0 0 20px" }}>Org Position Preview</h3>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
                    {/* Manager */}
                    <div style={{ padding: "12px 16px", background: "#0A1420", border: "1px solid #1A2A3A", borderRadius: 10, textAlign: "center", width: "100%", maxWidth: 220 }}>
                        <div style={{ fontSize: 13, fontWeight: 600, color: "#FFFFFF" }}>Karan Mehta</div>
                        <div style={{ fontSize: 11, color: "#445566" }}>Engineering Manager · L5</div>
                    </div>
                    <div style={{ width: 2, height: 24, background: "#1A2A3A" }} />
                    <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#1A2A3A" }} />
                    <div style={{ width: 2, height: 12, background: "#1A2A3A" }} />
                    {/* New employee */}
                    <div style={{ padding: "12px 16px", background: "rgba(0,229,160,0.08)", border: "2px solid #00E5A0", borderRadius: 10, textAlign: "center", width: "100%", maxWidth: 220 }}>
                        <div style={{ fontSize: 13, fontWeight: 600, color: "#00E5A0" }}>Rahul Kumar Sharma</div>
                        <div style={{ fontSize: 11, color: "#8899AA" }}>Senior Software Engineer · L3</div>
                        <div style={{ fontSize: 10, color: "#00E5A0", marginTop: 4, fontWeight: 500 }}>✦ New Employee</div>
                    </div>
                    <div style={{ width: 2, height: 16, background: "#1A2A3A" }} />
                    <div style={{ fontSize: 11, color: "#445566" }}>No direct reports</div>
                </div>

                <div style={{ marginTop: 20, padding: "12px 14px", background: "#0A1420", borderRadius: 10, border: "1px solid #1A2A3A" }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: "#FFFFFF" }}>Engineering &bull; 342 employees</div>
                    <div style={{ fontSize: 11, color: "#445566", marginTop: 2 }}>This will be: 343rd member</div>
                </div>
            </div>
        </div>
    );
}
