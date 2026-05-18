"use client";

import { useState } from "react";
import { CheckSquare, Plus, Save, Shield, Square, Users } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";

// ─────────────────────────────────────────────────────────────────────────────
// Types & static data
// ─────────────────────────────────────────────────────────────────────────────

type PermKey = "view" | "create" | "edit" | "delete" | "export";

interface RoleDef {
    name: string;
    users: number;
    color: string;
}

interface ModulePerm {
    name: string;
    permissions: Record<PermKey, boolean>;
}

const ROLES: RoleDef[] = [
    { name: "Super Admin", users: 1, color: "text-amber-400" },
    { name: "HR Admin", users: 2, color: "text-indigo-400" },
    { name: "Payroll Admin", users: 1, color: "text-emerald-400" },
    { name: "Manager", users: 8, color: "text-blue-400" },
    { name: "Employee", users: 245, color: "text-[#8899AA]" },
];

const MODULES: ModulePerm[] = [
    { name: "Employee Directory", permissions: { view: true, create: true, edit: true, delete: false, export: true } },
    { name: "Payroll Engine", permissions: { view: true, create: false, edit: false, delete: false, export: false } },
    { name: "Leave Management", permissions: { view: true, create: true, edit: true, delete: false, export: true } },
    { name: "Recruitment (ATS)", permissions: { view: true, create: true, edit: true, delete: true, export: true } },
    { name: "Performance Reviews", permissions: { view: true, create: true, edit: true, delete: false, export: false } },
    { name: "AI & Chatbot", permissions: { view: true, create: false, edit: false, delete: false, export: false } },
    { name: "System Settings", permissions: { view: false, create: false, edit: false, delete: false, export: false } },
];

const PERM_KEYS: PermKey[] = ["view", "create", "edit", "delete", "export"];

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────────────────

function RoleButton({ role, selected, onSelect }: { role: RoleDef; selected: boolean; onSelect: () => void }) {
    return (
        <button
            onClick={onSelect}
            aria-pressed={selected}
            className={`flex items-center justify-between w-full p-3 rounded-xl transition-colors text-sm font-medium ${
                selected
                    ? "bg-[#1A2A3A] text-white border border-[#2A3A4A]"
                    : "text-[#8899AA] hover:bg-[#131B2B] hover:text-white border border-transparent"
            }`}
        >
            <span className="flex items-center gap-3">
                <Shield size={16} className={selected ? role.color : ""} aria-hidden="true" />
                {role.name}
            </span>
            <span className="bg-[#0A1420] text-[#8899AA] px-2 py-0.5 rounded text-xs border border-[#1A2A3A] flex items-center gap-1">
                <Users size={10} aria-hidden="true" /> {role.users}
            </span>
        </button>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function RolePermissionPage() {
    const [selectedRole, setSelectedRole] = useState("HR Admin");
    const toast = useToast();

    const handleSave = async () => {
        // TODO: replace with real mutation
        await new Promise((r) => setTimeout(r, 500));
        toast.show({ variant: "success", title: "Permissions saved", description: `${selectedRole} permissions have been updated.` });
    };

    return (
        <Page
            title="Roles & Permissions"
            subtitle="Define granular access control for each role across all Kaarya modules."
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Settings", href: "/settings" },
                { label: "Roles" },
            ]}
            maxWidth="1200px"
            actions={
                <div className="flex gap-3">
                    <Button variant="secondary" icon={<Plus size={16} aria-hidden="true" />}>New Role</Button>
                    <Button onClick={handleSave} icon={<Save size={16} aria-hidden="true" />}>Save Changes</Button>
                </div>
            }
        >
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Role Sidebar */}
                <nav aria-label="Roles" className="lg:col-span-1">
                    <h3 className="text-xs font-semibold text-[#445566] uppercase tracking-wider mb-3 px-2">Defined Roles</h3>
                    <ul className="space-y-2">
                        {ROLES.map((role) => (
                            <li key={role.name}>
                                <RoleButton
                                    role={role}
                                    selected={selectedRole === role.name}
                                    onSelect={() => setSelectedRole(role.name)}
                                />
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Permission Matrix */}
                <div className="lg:col-span-3">
                    <Card padding="none">
                        <div className="p-4 border-b border-[#1A2A3A] bg-[#131B2B]">
                            <h2 className="text-white font-medium">{selectedRole} — Module Permissions</h2>
                            <p className="text-xs text-[#8899AA] mt-0.5">Toggle capabilities for each module below.</p>
                        </div>
                        <div className="overflow-auto">
                            <table className="w-full text-left border-collapse min-w-[600px]" aria-label={`${selectedRole} permissions matrix`}>
                                <thead>
                                    <tr className="border-b border-[#1A2A3A] bg-[#0A1420]/50">
                                        <th scope="col" className="p-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Module</th>
                                        {PERM_KEYS.map((p) => (
                                            <th key={p} scope="col" className="p-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider text-center capitalize">{p}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {MODULES.map((mod) => (
                                        <tr key={mod.name} className="border-b border-[#1A2A3A] hover:bg-[#131B2B] transition-colors">
                                            <td className="p-4 text-sm text-white font-medium">{mod.name}</td>
                                            {PERM_KEYS.map((p) => (
                                                <td key={p} className="p-4 text-center">
                                                    <button
                                                        aria-label={`${mod.permissions[p] ? "Revoke" : "Grant"} ${p} for ${mod.name}`}
                                                        aria-pressed={mod.permissions[p]}
                                                        className="inline-block transition-transform hover:scale-110"
                                                    >
                                                        {mod.permissions[p]
                                                            ? <CheckSquare size={20} className="text-indigo-400" aria-hidden="true" />
                                                            : <Square size={20} className="text-[#2A3A4A] hover:text-[#445566]" aria-hidden="true" />
                                                        }
                                                    </button>
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </div>
            </div>
        </Page>
    );
}
