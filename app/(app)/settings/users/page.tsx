"use client";

import { Mail, MoreVertical, Shield, XCircle } from "lucide-react";

import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge, type BadgeVariant } from "@/components/ui/Badge";
import DataTable, { type Column } from "@/components/ui/DataTable";

// ─────────────────────────────────────────────────────────────────────────────
// Types & static data (module scope — keeps the page render fn pure)
// ─────────────────────────────────────────────────────────────────────────────

type Role = "Super Admin" | "HR Admin" | "Payroll Admin" | "Manager" | "Employee";
type Status = "Active" | "Invited" | "Deactivated";

interface User {
    id: number;
    name: string;
    email: string;
    role: Role;
    status: Status;
    last: string;
    avatar: string;
}

const USERS: User[] = [
    { id: 1, name: "Priya Sharma", email: "priya.sharma@kaarya.io", role: "Super Admin", status: "Active", last: "2 mins ago", avatar: "PS" },
    { id: 2, name: "Vikram Desai", email: "vikram.desai@kaarya.io", role: "HR Admin", status: "Active", last: "1 hr ago", avatar: "VD" },
    { id: 3, name: "Aditi Menon", email: "aditi.menon@kaarya.io", role: "Payroll Admin", status: "Active", last: "3 hrs ago", avatar: "AM" },
    { id: 4, name: "Rohan Kapoor", email: "rohan.kapoor@kaarya.io", role: "Manager", status: "Active", last: "Yesterday", avatar: "RK" },
    { id: 5, name: "Kavita Singh", email: "kavita.singh@kaarya.io", role: "Employee", status: "Invited", last: "Never", avatar: "KS" },
    { id: 6, name: "Arjun Nair", email: "arjun.nair@kaarya.io", role: "Employee", status: "Deactivated", last: "30 days ago", avatar: "AN" },
];

const ROLE_VARIANT: Record<Role, BadgeVariant> = {
    "Super Admin": "purple",
    "HR Admin": "info",
    "Payroll Admin": "info",
    Manager: "success",
    Employee: "neutral",
};

const STATUS_VARIANT: Record<Status, BadgeVariant> = {
    Active: "success",
    Invited: "info",
    Deactivated: "neutral",
};

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

/**
 * Convert a human-readable "last active" string into a sortable millis-ago
 * number. Smaller value = more recent. "Never" sorts last (Infinity).
 *
 * Supports the formats currently used in the mocked dataset:
 *   "2 mins ago" / "1 hr ago" / "Yesterday" / "30 days ago" / "Never".
 */
export function parseLastActive(value: string): number {
    if (!value) return Infinity;
    const v = value.trim();
    if (v.toLowerCase() === "never") return Infinity;
    if (v.toLowerCase() === "yesterday") return DAY;

    const match = v.match(/^(\d+)\s+(min|mins|minute|minutes|hr|hrs|hour|hours|day|days)\s+ago$/i);
    if (!match) return Infinity;
    const n = Number(match[1]);
    const unit = match[2].toLowerCase();
    if (unit.startsWith("min")) return n * MINUTE;
    if (unit.startsWith("hr") || unit.startsWith("hour")) return n * HOUR;
    if (unit.startsWith("day")) return n * DAY;
    return Infinity;
}

// ─────────────────────────────────────────────────────────────────────────────
// Cell components (module scope — react/no-unstable-nested-components)
// ─────────────────────────────────────────────────────────────────────────────

function UserCell({ user }: { user: User }) {
    const isInactive = user.status === "Deactivated";
    return (
        <div className="flex items-center gap-3">
            <div
                aria-hidden="true"
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                    isInactive
                        ? "bg-[#1A2A3A] text-[#c8d8e8]"
                        : "bg-gradient-to-br from-indigo-500 to-purple-600 text-white"
                }`}
            >
                {user.avatar}
            </div>
            <div className="min-w-0">
                <p className="truncate text-sm font-medium text-white">{user.name}</p>
                <p className="truncate text-xs text-[#8899AA]">{user.email}</p>
            </div>
        </div>
    );
}

function RoleBadge({ role }: { role: Role }) {
    return (
        <span className="inline-flex items-center gap-1.5">
            {role === "Super Admin" && (
                <Shield size={12} className="text-amber-400" aria-hidden="true" />
            )}
            <Badge variant={ROLE_VARIANT[role]}>{role}</Badge>
        </span>
    );
}

function StatusBadge({ status }: { status: Status }) {
    return (
        <Badge
            variant={STATUS_VARIANT[status]}
            dot={status === "Active"}
        >
            {status === "Invited" && <Mail size={11} aria-hidden="true" />}
            {status === "Deactivated" && <XCircle size={11} aria-hidden="true" />}
            {status}
        </Badge>
    );
}

function LastActive({ value }: { value: string }) {
    return <span className="text-sm text-[#8899AA]">{value}</span>;
}

function RowMenu({ user }: { user: User }) {
    return (
        <button
            type="button"
            aria-label={`Actions for ${user.name}`}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[#7a8fa6] transition-colors hover:bg-[#1A2A3A] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00e5a0]"
        >
            <MoreVertical size={16} aria-hidden="true" />
        </button>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// Columns
// ─────────────────────────────────────────────────────────────────────────────

const COLUMNS: Column<User>[] = [
    {
        key: "user",
        label: "User",
        render: (u) => <UserCell user={u} />,
        sortable: true,
        sortValue: (u) => u.name,
    },
    {
        key: "role",
        label: "Role",
        render: (u) => <RoleBadge role={u.role} />,
        sortable: true,
        sortValue: (u) => u.role,
    },
    {
        key: "status",
        label: "Status",
        render: (u) => <StatusBadge status={u.status} />,
        sortable: true,
        sortValue: (u) => u.status,
    },
    {
        key: "last",
        label: "Last active",
        render: (u) => <LastActive value={u.last} />,
        sortable: true,
        sortValue: (u) => parseLastActive(u.last),
    },
    {
        key: "actions",
        label: "",
        align: "right",
        width: "w-12",
        render: (u) => <RowMenu user={u} />,
    },
];

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function UsersListPage() {
    const totalCount = USERS.length;
    const activeCount = USERS.filter((u) => u.status === "Active").length;
    const invitedCount = USERS.filter((u) => u.status === "Invited").length;
    const deactivatedCount = USERS.filter((u) => u.status === "Deactivated").length;

    const stats = [
        { label: "Total Users", value: String(totalCount) },
        { label: "Active", value: String(activeCount) },
        { label: "Pending Invites", value: String(invitedCount) },
        { label: "Deactivated", value: String(deactivatedCount) },
    ];

    return (
        <Page
            title="Users"
            subtitle="Manage user accounts, roles, and access to the Kaarya platform."
            breadcrumbs={[
                { label: "Home", href: "/" },
                { label: "Settings", href: "/settings" },
                { label: "Users" },
            ]}
            maxWidth="1280px"
            actions={
                <Button href="/settings/users/invite">+ Invite user</Button>
            }
        >
            <div className="space-y-6">
                {/* Stat tiles */}
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    {stats.map((s) => (
                        <Card key={s.label} padding="md">
                            <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-[#8899AA]">
                                {s.label}
                            </div>
                            <div className="text-2xl font-bold text-white">{s.value}</div>
                        </Card>
                    ))}
                </div>

                {/* Users table */}
                <Card padding="none">
                    <DataTable<User>
                        data={USERS}
                        columns={COLUMNS}
                        rowKey={(u) => u.id}
                        searchable
                        searchPlaceholder="Search users…"
                        aria-label="Platform users"
                        emptyTitle="No users yet"
                        emptyDescription="Invite your team to get started."
                        emptyAction={
                            <Button size="sm" href="/settings/users/invite">+ Invite user</Button>
                        }
                    />
                </Card>
            </div>
        </Page>
    );
}
