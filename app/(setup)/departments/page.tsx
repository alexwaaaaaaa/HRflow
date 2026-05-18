"use client";

import { useState } from "react";
import { Network, Pencil, Trash2, GripVertical, Download } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Card from "@/components/ui/Card";

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
        setItems([]);
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
        <div className="px-16 py-12 animate-fade-in">
            <h2 className="text-2xl font-semibold text-white m-0">Set Up Departments</h2>
            <p className="text-sm text-[#8899AA] mt-1">Create your company&apos;s department structure. You can add more later.</p>

            {/* Templates */}
            <div className="mt-6 mb-8 flex items-center gap-4 overflow-x-auto whitespace-nowrap pb-2">
                <span className="text-sm text-[#8899AA]">Start from a template:</span>
                {TEMPLATES.map(t => (
                    <Button
                        key={t}
                        variant={activeTemplate === t ? "ghost" : "secondary"}
                        size="sm"
                        onClick={() => handleTemplateClick(t)}
                        className="rounded-full"
                    >
                        {t}
                    </Button>
                ))}
            </div>

            <div className="flex gap-8">
                {/* Left Form */}
                <div className="flex-1 max-w-[560px]">
                    <Card variant="default" padding="md">
                        <h3 className="text-lg text-white m-0 mb-5">Add New Department</h3>

                        <form onSubmit={handleAdd} className="flex flex-col gap-4" aria-label="Add department">
                            <Input
                                label="Department Name *"
                                placeholder="Engineering"
                                value={newName}
                                onChange={(e) => { setNewName(e.target.value); if (!newCode) setNewCode(e.target.value.substring(0, 3).toUpperCase()); }}
                            />
                            <Input label="Department Code" placeholder="ENG" value={newCode} onChange={(e) => setNewCode(e.target.value.toUpperCase())} />

                            <div>
                                <label htmlFor="dept-head" className="block text-xs font-medium text-[#9ca3af] mb-1.5">Department Head</label>
                                <select id="dept-head" className="w-full h-10 px-3 rounded-lg text-sm bg-[#060B14] border border-[#1A2A3A] text-gray-400 outline-none focus:border-[#00E5A0] transition-colors">
                                    <option>Search employee...</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="parent-dept" className="block text-xs font-medium text-[#9ca3af] mb-1.5">Parent Department</label>
                                <select id="parent-dept" className="w-full h-10 px-3 rounded-lg text-sm bg-[#060B14] border border-[#1A2A3A] text-white outline-none focus:border-[#00E5A0] transition-colors">
                                    <option>None (Top Level)</option>
                                    {items.map(i => <option key={i.id}>{i.name}</option>)}
                                </select>
                            </div>

                            <Input label="Cost Center" placeholder="CC-001" />

                            <div>
                                <label htmlFor="dept-description" className="block text-xs font-medium text-[#9ca3af] mb-1.5">Description</label>
                                <textarea id="dept-description" rows={2} className="w-full p-3 rounded-lg text-sm bg-[#060B14] border border-[#1A2A3A] text-white outline-none focus:border-[#00E5A0] transition-colors resize-none" />
                            </div>

                            <div className="flex gap-3 mt-2">
                                <Button type="submit" className="flex-1">Add Department</Button>
                                <Button type="button" variant="ghost">Clear</Button>
                            </div>
                        </form>
                    </Card>
                </div>

                {/* Right List */}
                <div className="flex-1 max-w-[560px]">
                    <div className="flex items-center gap-2 mb-4">
                        <h3 className="text-lg text-white m-0">Departments Added</h3>
                        <span className="bg-[#1A2A3A] text-white text-xs font-semibold px-2 py-0.5 rounded-full">{items.length}</span>
                    </div>

                    <div className="flex flex-col gap-2">
                        {items.length === 0 ? (
                            <div className="bg-[#0D1928] border border-dashed border-[#1A2A3A] rounded-xl p-12 text-center">
                                <Network size={40} color="#445566" className="mx-auto mb-4" aria-hidden="true" />
                                <div className="text-sm text-[#8899AA]">No departments yet. Add your first department.</div>
                            </div>
                        ) : items.map((dept, idx) => (
                            <div
                                key={dept.id}
                                className="group flex items-center animate-slide-in-right bg-[#060B14] border border-[#1A2A3A] rounded-xl px-4 py-3"
                                style={{ animationDelay: `${idx * 0.05}s`, animationFillMode: "both" }}
                            >
                                <GripVertical size={16} color="#445566" className="cursor-grab mr-3 flex-shrink-0" aria-hidden="true" />
                                <div className="w-9 h-9 rounded-lg bg-[rgba(0,229,160,0.1)] flex items-center justify-center mr-3 flex-shrink-0">
                                    <Network size={18} color="#00E5A0" aria-hidden="true" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-semibold text-white">{dept.name} ({dept.code})</span>
                                        {dept.parent && <span className="text-[10px] bg-[#1A2A3A] text-[#8899AA] px-1.5 py-0.5 rounded">→ {dept.parent}</span>}
                                    </div>
                                    <div className="text-xs text-[#8899AA] mt-0.5">{dept.employees} Employees • {dept.head ? `Head: ${dept.head}` : "No Head assigned"}</div>
                                </div>
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2 flex-shrink-0">
                                    <Button variant="secondary" size="sm" className="w-8 h-8 p-0" aria-label={`Edit ${dept.name}`}>
                                        <Pencil size={14} aria-hidden="true" />
                                    </Button>
                                    <Button variant="danger" size="sm" className="w-8 h-8 p-0" onClick={() => handleDelete(dept.id)} aria-label={`Delete ${dept.name}`}>
                                        <Trash2 size={14} aria-hidden="true" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-4">
                        <Button variant="ghost" size="sm">
                            <Download size={16} aria-hidden="true" /> Import from Excel
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
