"use client";

import { useState } from "react";
import { Network, Pencil, Trash2, GripVertical, Download } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

type Department = { id: string; name: string; code: string; parent?: string; head?: string; employees: number };

const DEPARTMENTS: Department[] = [
    { id: "1", name: "Engineering", code: "ENG", head: "Arjun Nair", employees: 0 },
    { id: "2", name: "Product Management", code: "PM", employees: 0 },
    { id: "3", name: "Design", code: "DES", employees: 0 },
    { id: "4", name: "Sales", code: "SALES", employees: 0 },
    { id: "5", name: "Marketing", code: "MKT", employees: 0 },
    { id: "6", name: "Human Resources", code: "HR", head: "Priya Mehta", employees: 0 },
];

const TEMPLATES = ["IT Company", "Manufacturing", "Retail", "Hospital", "Bank", "Startup"];

export default function DepartmentsPage() {
    const [items, setItems] = useState<Department[]>([]);
    const [activeTemplate, setActiveTemplate] = useState<string | null>(null);

    const [newName, setNewName] = useState("");
    const [newCode, setNewCode] = useState("");

    const handleTemplateClick = (t: string) => {
        setActiveTemplate(t);
        setItems([]); // clear to trigger stagger anim
        setTimeout(() => {
            setItems(DEPARTMENTS);
        }, 50);
    };

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newName) return;
        setItems([{ id: Date.now().toString(), name: newName, code: newCode || newName.substring(0, 3).toUpperCase(), employees: 0 }, ...items]);
        setNewName("");
        setNewCode("");
    };

    const handleDelete = (id: string) => setItems(items.filter((i) => i.id !== id));

    return (
        <div style={{ padding: "48px 64px" }} className="animate-fade-in">
            <h2 style={{ fontSize: 24, fontWeight: 600, color: "#FFFFFF", margin: 0 }}>Set Up Departments</h2>
            <p style={{ fontSize: 14, color: "#8899AA", marginTop: 4 }}>Create your company&apos;s department structure. You can add more later.</p>

            {/* Templates */}
            <div className="mt-6 mb-8 flex items-center gap-4 overflow-x-auto whitespace-nowrap pb-2 scrollbar-none">
                <span style={{ fontSize: 14, color: "#8899AA" }}>Start from a template:</span>
                {TEMPLATES.map(t => (
                    <button key={t} onClick={() => handleTemplateClick(t)} className="hover:border-[#00E5A0] hover:text-[#00E5A0] transition-colors"
                        style={{ background: "#0D1928", border: `1px solid ${activeTemplate === t ? "#00E5A0" : "#1A2A3A"}`, color: activeTemplate === t ? "#00E5A0" : "#FFFFFF", borderRadius: 20, padding: "6px 16px", fontSize: 14, cursor: "pointer" }}>
                        {t}
                    </button>
                ))}
            </div>

            <div className="flex gap-8">
                {/* Left Form */}
                <div style={{ flex: 1, maxWidth: 560 }}>
                    <form onSubmit={handleAdd} style={{ background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 24 }}>
                        <h3 style={{ fontSize: 18, color: "#FFFFFF", margin: 0, marginBottom: 20 }}>Add New Department</h3>

                        <div className="flex flex-col gap-4">
                            <Input label="Department Name *" placeholder="Engineering" value={newName} onChange={(e) => { setNewName(e.target.value); if (!newCode) setNewCode(e.target.value.substring(0, 3).toUpperCase()); }} />
                            <Input label="Department Code" placeholder="ENG" value={newCode} onChange={(e) => setNewCode(e.target.value.toUpperCase())} />

                            <div>
                                <label style={{ fontSize: 12, fontWeight: 500, color: "#9ca3af", marginBottom: 6, display: "block" }}>Department Head</label>
                                <select className="w-full h-10 px-3 rounded-lg text-sm bg-[#060B14] border border-[#1A2A3A] text-gray-400 outline-none focus:border-[#00E5A0]">
                                    <option>Search employee...</option>
                                </select>
                            </div>

                            <div>
                                <label style={{ fontSize: 12, fontWeight: 500, color: "#9ca3af", marginBottom: 6, display: "block" }}>Parent Department</label>
                                <select className="w-full h-10 px-3 rounded-lg text-sm bg-[#060B14] border border-[#1A2A3A] text-white outline-none focus:border-[#00E5A0]">
                                    <option>None (Top Level)</option>
                                    {items.map(i => <option key={i.id}>{i.name}</option>)}
                                </select>
                            </div>

                            <Input label="Cost Center" placeholder="CC-001" />

                            <div>
                                <label style={{ fontSize: 12, fontWeight: 500, color: "#9ca3af", marginBottom: 6, display: "block" }}>Description</label>
                                <textarea rows={2} className="w-full p-3 rounded-lg text-sm bg-[#060B14] border border-[#1A2A3A] text-white outline-none focus:border-[#00E5A0] resize-none"></textarea>
                            </div>

                            <div className="flex gap-3 mt-2">
                                <Button type="submit" className="flex-1">Add Department</Button>
                                <Button type="button" variant="ghost">Clear</Button>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Right List */}
                <div style={{ flex: 1, maxWidth: 560 }}>
                    <div className="flex items-center gap-2 mb-4">
                        <h3 style={{ fontSize: 18, color: "#FFFFFF", margin: 0 }}>Departments Added</h3>
                        <span style={{ background: "#1A2A3A", color: "#FFFFFF", fontSize: 12, fontWeight: 600, padding: "2px 8px", borderRadius: 12 }}>{items.length}</span>
                    </div>

                    <div className="flex flex-col gap-2">
                        {items.length === 0 ? (
                            <div style={{ background: "#0D1928", border: "1px dashed #1A2A3A", borderRadius: 12, padding: 48, textAlign: "center" }}>
                                <Network size={40} color="#445566" style={{ margin: "0 auto", marginBottom: 16 }} />
                                <div style={{ fontSize: 14, color: "#8899AA" }}>No departments yet. Add your first department.</div>
                            </div>
                        ) : items.map((dept, idx) => (
                            <div key={dept.id} className="group flex items-center animate-slide-in-right" style={{ animationDelay: `${idx * 0.05}s`, animationFillMode: "both", background: "#060B14", border: "1px solid #1A2A3A", borderRadius: 12, padding: "12px 16px" }}>
                                <GripVertical size={16} color="#445566" className="cursor-grab hover:text-white mr-3" />
                                <div style={{ width: 36, height: 36, borderRadius: 8, background: "rgba(0,229,160,0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginRight: 12 }}>
                                    <Network size={18} color="#00E5A0" />
                                </div>
                                <div className="flex-1">
                                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                        <span style={{ fontSize: 14, fontWeight: 600, color: "#FFFFFF" }}>{dept.name} ({dept.code})</span>
                                        {dept.parent && <span style={{ fontSize: 10, background: "#1A2A3A", color: "#8899AA", padding: "2px 6px", borderRadius: 4 }}>→ {dept.parent}</span>}
                                    </div>
                                    <div style={{ fontSize: 12, color: "#8899AA", marginTop: 2 }}>{dept.employees} Employees • {dept.head ? `Head: ${dept.head}` : "No Head assigned"}</div>
                                </div>
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                                    <button className="w-8 h-8 rounded bg-[#1A2A3A] flex items-center justify-center text-white hover:bg-[#0D1928]"><Pencil size={14} /></button>
                                    <button onClick={() => handleDelete(dept.id)} className="w-8 h-8 rounded bg-[rgba(255,68,68,0.1)] flex items-center justify-center text-[#FF4444] hover:bg-[#FF4444] hover:text-white"><Trash2 size={14} /></button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-4">
                        <Button variant="ghost" size="sm" className="pl-0"><Download size={16} className="mr-2" /> Import from Excel</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
