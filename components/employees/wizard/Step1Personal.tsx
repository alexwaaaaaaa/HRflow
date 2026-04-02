"use client";

import { useState, useEffect } from "react";
import { AlertCircle } from "lucide-react";

interface Props {
    data: Record<string, unknown>;
    onUpdate: (d: Record<string, unknown>) => void;
}

function FormRow({ children }: { children: React.ReactNode }) {
    return <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>{children}</div>;
}

function Field({ label, hint, required, children }: { label: string; hint?: string; required?: boolean; children: React.ReactNode }) {
    return (
        <div>
            <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#8899AA", marginBottom: 8 }}>
                {label} {required && <span style={{ color: "#FF4444" }}>*</span>}
            </label>
            {children}
            {hint && <div style={{ fontSize: 11, color: "#445566", marginTop: 6 }}>{hint}</div>}
        </div>
    );
}

const inputStyle = {
    width: "100%", height: 40, background: "#0D1928", border: "1px solid #1A2A3A",
    borderRadius: 8, padding: "0 12px", fontSize: 14, color: "#FFFFFF", outline: "none",
    boxSizing: "border-box" as const, transition: "border-color 0.2s"
};

export default function Step1Personal({ data, onUpdate }: Props) {
    const [pan, setPan] = useState((data.pan as string) || "");
    const [panValid, setPanValid] = useState<null | boolean>(null);

    useEffect(() => {
        if (pan.length === 10) {
            const valid = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan);
            setPanValid(valid);
        } else {
            setPanValid(null);
        }
    }, [pan]);

    const handlePanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value.toUpperCase().slice(0, 10);
        setPan(val);
        onUpdate({ pan: val });
    };

    return (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 420px", gap: 32, alignItems: "start" }}>

            {/* LEFT — Form */}
            <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 28 }}>
                <h2 style={{ fontSize: 20, fontWeight: 600, color: "#FFFFFF", margin: "0 0 4px" }}>Personal Information</h2>
                <p style={{ fontSize: 13, color: "#445566", margin: "0 0 24px" }}>Fields marked <span style={{ color: "#FF4444" }}>*</span> are required</p>

                {/* Name row */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 20 }}>
                    <Field label="First Name" required>
                        <input style={inputStyle} placeholder="Rahul"
                            onFocus={e => e.target.style.borderColor = "#00E5A0"}
                            onBlur={e => e.target.style.borderColor = "#1A2A3A"} />
                    </Field>
                    <Field label="Middle Name">
                        <input style={inputStyle} placeholder="Kumar"
                            onFocus={e => e.target.style.borderColor = "#00E5A0"}
                            onBlur={e => e.target.style.borderColor = "#1A2A3A"} />
                    </Field>
                    <Field label="Last Name" required>
                        <input style={inputStyle} placeholder="Sharma"
                            onFocus={e => e.target.style.borderColor = "#00E5A0"}
                            onBlur={e => e.target.style.borderColor = "#1A2A3A"} />
                    </Field>
                </div>

                <FormRow>
                    <Field label="Date of Birth" required hint="Age auto-calculated from DOB">
                        <input type="date" style={inputStyle}
                            onFocus={e => e.target.style.borderColor = "#00E5A0"}
                            onBlur={e => e.target.style.borderColor = "#1A2A3A"} />
                    </Field>
                    <Field label="Gender" required>
                        <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
                            {["Male", "Female", "Other", "Prefer not to say"].map(g => (
                                <label key={g} style={{ cursor: "pointer" }}>
                                    <input type="radio" name="gender" value={g} style={{ display: "none" }} onChange={() => onUpdate({ gender: g })} />
                                    <span style={{
                                        display: "block", padding: "6px 12px", borderRadius: 20, fontSize: 12,
                                        background: "#1A2A3A", border: "1px solid #1A2A3A", color: "#8899AA",
                                        cursor: "pointer", transition: "all 0.15s"
                                    }}>{g.split(" ")[0]}</span>
                                </label>
                            ))}
                        </div>
                    </Field>
                </FormRow>

                <FormRow>
                    <Field label="Personal Email" required>
                        <input type="email" style={inputStyle} placeholder="rahul@gmail.com"
                            onFocus={e => e.target.style.borderColor = "#00E5A0"}
                            onBlur={e => e.target.style.borderColor = "#1A2A3A"} />
                    </Field>
                    <Field label="Work Email" hint="Auto-generate: rahul.sharma@company.com">
                        <input style={inputStyle} placeholder="rahul.sharma@techcorp.com"
                            onFocus={e => e.target.style.borderColor = "#00E5A0"}
                            onBlur={e => e.target.style.borderColor = "#1A2A3A"} />
                    </Field>
                </FormRow>

                <FormRow>
                    <Field label="Mobile Number" required>
                        <div style={{ display: "flex", gap: 8 }}>
                            <div style={{ width: 56, height: 40, background: "#0A1420", border: "1px solid #1A2A3A", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, color: "#8899AA", flexShrink: 0 }}>+91</div>
                            <input style={{ ...inputStyle, flex: 1 }} placeholder="98765 43210" maxLength={10}
                                onFocus={e => e.target.style.borderColor = "#00E5A0"}
                                onBlur={e => e.target.style.borderColor = "#1A2A3A"} />
                        </div>
                    </Field>
                    <Field label="Alternate Phone">
                        <div style={{ display: "flex", gap: 8 }}>
                            <div style={{ width: 56, height: 40, background: "#0A1420", border: "1px solid #1A2A3A", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, color: "#8899AA", flexShrink: 0 }}>+91</div>
                            <input style={{ ...inputStyle, flex: 1 }} placeholder="Optional"
                                onFocus={e => e.target.style.borderColor = "#00E5A0"}
                                onBlur={e => e.target.style.borderColor = "#1A2A3A"} />
                        </div>
                    </Field>
                </FormRow>

                {/* Divider */}
                <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "24px 0 20px" }}>
                    <div style={{ flex: 1, height: 1, background: "#1A2A3A" }} />
                    <span style={{ fontSize: 11, color: "#445566", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase" }}>Identity Documents</span>
                    <div style={{ flex: 1, height: 1, background: "#1A2A3A" }} />
                </div>

                <FormRow>
                    <Field label="PAN Number" required hint="Format: AAAAA9999A — mandatory for salary > ₹2.5L/year">
                        <div style={{ position: "relative" }}>
                            <input
                                value={pan}
                                onChange={handlePanChange}
                                style={{ ...inputStyle, paddingRight: 36, borderColor: panValid === false ? "#FF4444" : panValid === true ? "#00E5A0" : "#1A2A3A" }}
                                placeholder="AAACT1234C"
                                onFocus={e => e.target.style.borderColor = panValid === false ? "#FF4444" : "#00E5A0"}
                                onBlur={e => e.target.style.borderColor = panValid === false ? "#FF4444" : panValid === true ? "#00E5A0" : "#1A2A3A"}
                            />
                            {panValid === true && <div style={{ position: "absolute", right: 12, top: 12, color: "#00E5A0" }}>✓</div>}
                            {panValid === false && <AlertCircle size={16} color="#FF4444" style={{ position: "absolute", right: 12, top: 12 }} />}
                        </div>
                        {panValid === false && <div style={{ fontSize: 11, color: "#FF4444", marginTop: 4 }}>Invalid PAN format. Expected: AAAAA9999A</div>}
                    </Field>
                    <Field label="Aadhaar Number" hint="Enter last 4 digits only (masked for security — DPDP Act)">
                        <input style={inputStyle} placeholder="XXXX-XXXX-5678" maxLength={19}
                            onFocus={e => e.target.style.borderColor = "#00E5A0"}
                            onBlur={e => e.target.style.borderColor = "#1A2A3A"} />
                        <div style={{ fontSize: 11, color: "#FFB800", marginTop: 4, display: "flex", alignItems: "center", gap: 4 }}>
                            ⚠ Aadhaar consent required by law before collection
                        </div>
                    </Field>
                </FormRow>

                <FormRow>
                    <Field label="Blood Group">
                        <select style={{ ...inputStyle, appearance: "none" }}
                            onFocus={e => e.target.style.borderColor = "#00E5A0"}
                            onBlur={e => e.target.style.borderColor = "#1A2A3A"}>
                            <option value="">Select Blood Group</option>
                            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(bg => <option key={bg}>{bg}</option>)}
                        </select>
                    </Field>
                    <Field label="Nationality">
                        <input style={inputStyle} defaultValue="Indian"
                            onFocus={e => e.target.style.borderColor = "#00E5A0"}
                            onBlur={e => e.target.style.borderColor = "#1A2A3A"} />
                    </Field>
                </FormRow>

                {/* Emergency Contact */}
                <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "24px 0 20px" }}>
                    <div style={{ flex: 1, height: 1, background: "#1A2A3A" }} />
                    <span style={{ fontSize: 11, color: "#445566", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase" }}>Emergency Contact</span>
                    <div style={{ flex: 1, height: 1, background: "#1A2A3A" }} />
                </div>

                <FormRow>
                    <Field label="Contact Name" required>
                        <input style={inputStyle} placeholder="Emergency contact name"
                            onFocus={e => e.target.style.borderColor = "#00E5A0"}
                            onBlur={e => e.target.style.borderColor = "#1A2A3A"} />
                    </Field>
                    <Field label="Relationship">
                        <select style={{ ...inputStyle, appearance: "none" }}
                            onFocus={e => e.target.style.borderColor = "#00E5A0"}
                            onBlur={e => e.target.style.borderColor = "#1A2A3A"}>
                            {["Spouse", "Parent", "Sibling", "Friend", "Other"].map(r => <option key={r}>{r}</option>)}
                        </select>
                    </Field>
                </FormRow>

                <FormRow>
                    <Field label="Contact Phone" required>
                        <div style={{ display: "flex", gap: 8 }}>
                            <div style={{ width: 56, height: 40, background: "#0A1420", border: "1px solid #1A2A3A", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, color: "#8899AA", flexShrink: 0 }}>+91</div>
                            <input style={{ ...inputStyle, flex: 1 }} placeholder="Emergency phone"
                                onFocus={e => e.target.style.borderColor = "#00E5A0"}
                                onBlur={e => e.target.style.borderColor = "#1A2A3A"} />
                        </div>
                    </Field>
                    <Field label="Contact Email">
                        <input type="email" style={inputStyle} placeholder="emergency@email.com"
                            onFocus={e => e.target.style.borderColor = "#00E5A0"}
                            onBlur={e => e.target.style.borderColor = "#1A2A3A"} />
                    </Field>
                </FormRow>
            </div>

            {/* RIGHT — Preview + Tips */}
            <div style={{ position: "sticky", top: 24, display: "flex", flexDirection: "column", gap: 16 }}>
                {/* Employee preview card */}
                <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 24 }}>
                    <h3 style={{ fontSize: 14, fontWeight: 600, color: "#FFFFFF", margin: "0 0 20px" }}>New Employee Preview</h3>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, padding: "20px 0" }}>
                        <div style={{ width: 80, height: 80, borderRadius: "50%", background: "rgba(0,102,255,0.15)", border: "2px dashed #1A2A3A", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <span style={{ fontSize: 28, color: "#445566" }}>👤</span>
                        </div>
                        <div style={{ textAlign: "center" }}>
                            <div style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF" }}>Rahul Kumar Sharma</div>
                            <div style={{ fontSize: 13, color: "#8899AA" }}>EMP ID: Will be assigned: EMP1248</div>
                            <div style={{ fontSize: 12, color: "#445566", marginTop: 4 }}>PAN: AAACT****C • Aadhaar: --5678</div>
                        </div>
                    </div>
                </div>

                {/* Tips */}
                <div style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 20 }}>
                    <h3 style={{ fontSize: 13, fontWeight: 600, color: "#8899AA", margin: "0 0 12px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Tips</h3>
                    {[
                        { q: "Why do we need PAN?", a: "Income Tax Act requirement for salary > ₹2.5L p.a. Mandatory for TDS deduction." },
                        { q: "Aadhaar consent note", a: "Per DPDP Act 2023, written consent is required before collecting Aadhaar data." },
                        { q: "What is EMP ID?", a: "Auto-generated sequential ID (e.g. EMP1248). Prefix is configurable in Settings." },
                    ].map(({ q, a }, i) => (
                        <details key={i} style={{ marginBottom: 8 }}>
                            <summary style={{ fontSize: 13, color: "#8899AA", cursor: "pointer", padding: "8px 0", borderBottom: "1px solid #1A2A3A" }}>
                                {q}
                            </summary>
                            <div style={{ fontSize: 12, color: "#445566", padding: "8px 0 4px" }}>{a}</div>
                        </details>
                    ))}
                </div>
            </div>
        </div>
    );
}
