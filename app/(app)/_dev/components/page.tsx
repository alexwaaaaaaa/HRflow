"use client";

/**
 * Component playground (dev-only).
 *
 * Lightweight alternative to Storybook — renders every primitive in every
 * variant on a single page so designers / devs can verify the design
 * system end-to-end. Hidden behind the `/_dev` route group so we can
 * exclude it from production builds with a simple route filter.
 *
 * Add new components below as they are introduced. Keep stories small
 * and focused — one section per primitive.
 */

import { useState } from "react";
import {
    Save, AlertTriangle, CheckCircle, Info, Bell, Search, ChevronRight,
} from "lucide-react";

import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import Input from "@/components/ui/Input";
import { PolicyRow, Toggle, SettingsToggle, SettingsSelect } from "@/components/ui/PolicyForm";
import { useToast } from "@/components/ui/Toast";

export default function ComponentPlayground() {
    const toast = useToast();
    const [toggleA, setToggleA] = useState(true);
    const [toggleB, setToggleB] = useState(false);
    const [policyText, setPolicyText] = useState("15");
    const [policyToggle, setPolicyToggle] = useState(true);
    const [select, setSelect] = useState("Weekly");
    const [inputVal, setInputVal] = useState("");

    return (
        <div className="mx-auto max-w-5xl space-y-12 p-8 text-white">
            <header>
                <h1 className="text-3xl font-bold tracking-tight">Component Playground</h1>
                <p className="mt-2 text-sm text-[#7a8fa6]">
                    Live preview of every UI primitive. Edit `app/(app)/_dev/components/page.tsx`
                    to add new variants as components ship.
                </p>
            </header>

            {/* Buttons */}
            <Section title="Buttons" id="buttons">
                <div className="flex flex-wrap items-center gap-3">
                    <Button variant="primary">Primary</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="danger">Danger</Button>
                    <Button variant="outline">Outline</Button>
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                    <Button size="sm">Small</Button>
                    <Button size="md">Medium</Button>
                    <Button size="lg">Large</Button>
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                    <Button icon={<Save size={14} />}>With icon</Button>
                    <Button isLoading loadingText="Saving…">Submit</Button>
                    <Button disabled>Disabled</Button>
                </div>
            </Section>

            {/* Badges */}
            <Section title="Badges" id="badges">
                <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="success">Success</Badge>
                    <Badge variant="warning">Warning</Badge>
                    <Badge variant="danger">Danger</Badge>
                    <Badge variant="info">Info</Badge>
                    <Badge variant="purple">Purple</Badge>
                    <Badge variant="neutral">Neutral</Badge>
                    <Badge variant="ai">AI</Badge>
                </div>
            </Section>

            {/* Inputs */}
            <Section title="Inputs" id="inputs">
                <div className="grid max-w-md gap-4">
                    <Input id="empty" label="Empty" placeholder="Type here…" />
                    <Input
                        id="filled"
                        label="With value"
                        value={inputVal}
                        onChange={(e) => setInputVal(e.target.value)}
                        placeholder="Type to try"
                    />
                    <Input
                        id="error"
                        label="With error"
                        defaultValue="invalid@"
                        error="Email format is invalid"
                    />
                    <Input id="disabled" label="Disabled" placeholder="Cannot edit" disabled />
                </div>
            </Section>

            {/* Toggle */}
            <Section title="Toggles" id="toggles">
                <div className="flex flex-wrap items-center gap-6">
                    <div className="flex items-center gap-3">
                        <Toggle on={toggleA} onChange={() => setToggleA((v) => !v)} label="Sample A" />
                        <span className="text-sm text-[#7a8fa6]">{toggleA ? "On" : "Off"}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Toggle on={toggleB} onChange={() => setToggleB((v) => !v)} label="Sample B" />
                        <span className="text-sm text-[#7a8fa6]">{toggleB ? "On" : "Off"}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Toggle on={false} onChange={() => {}} disabled label="Disabled" />
                        <span className="text-sm text-[#7a8fa6]">Disabled</span>
                    </div>
                </div>
            </Section>

            {/* PolicyRow / SettingsToggle / SettingsSelect */}
            <Section title="Settings rows" id="settings">
                <div className="rounded-2xl border border-[#1A2A3A] bg-[#0D1928] p-6">
                    <PolicyRow
                        label="Grace period (minutes)"
                        desc="Allowed buffer after shift start before marking late"
                        value={policyText}
                        onChange={(v) => setPolicyText(String(v))}
                    />
                    <PolicyRow
                        label="Late after"
                        type="time"
                        value="09:15"
                        onChange={() => {}}
                    />
                    <PolicyRow
                        label="Enable half-day deduction rule"
                        value={policyToggle}
                        type="toggle"
                        onChange={(v) => setPolicyToggle(Boolean(v))}
                    />
                </div>
                <div className="mt-4 rounded-2xl border border-[#1A2A3A] bg-[#0D1928] p-6">
                    <SettingsToggle
                        id="dev-toggle-1"
                        label="Send check-in reminders"
                        on={toggleA}
                        onChange={setToggleA}
                    />
                    <SettingsSelect
                        id="dev-select-1"
                        label="Cadence"
                        value={select}
                        options={["Weekly", "Bi-weekly", "Monthly"]}
                        onChange={setSelect}
                    />
                </div>
            </Section>

            {/* Toast */}
            <Section title="Toasts" id="toasts">
                <div className="flex flex-wrap gap-3">
                    <Button variant="ghost" onClick={() => toast.show({ variant: "success", title: "Saved!", description: "Your changes have been saved." })}>
                        Show success
                    </Button>
                    <Button variant="ghost" onClick={() => toast.show({ variant: "warning", title: "Heads up", description: "PF challan due in 3 days." })}>
                        Show warning
                    </Button>
                    <Button variant="ghost" onClick={() => toast.show({ variant: "danger", title: "Failed", description: "Could not connect to server." })}>
                        Show danger
                    </Button>
                    <Button variant="ghost" onClick={() => toast.show({ variant: "info", title: "Info", description: "New circular published." })}>
                        Show info
                    </Button>
                </div>
            </Section>

            {/* Theme tokens preview */}
            <Section title="Theme tokens" id="theme">
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    {THEME_SWATCHES.map((s) => (
                        <div key={s.name} className="rounded-xl border border-[#162030] bg-[#0b1422] p-4">
                            <div className="mb-3 h-12 w-full rounded-lg" style={{ background: s.value }} />
                            <p className="text-[12px] font-semibold text-white">{s.name}</p>
                            <p className="font-mono text-[10px] text-[#7a8fa6]">{s.value}</p>
                        </div>
                    ))}
                </div>
            </Section>

            {/* Iconography sample */}
            <Section title="Iconography" id="icons">
                <div className="grid grid-cols-3 gap-3 md:grid-cols-6">
                    {[Save, AlertTriangle, CheckCircle, Info, Bell, Search, ChevronRight].map((Icon, i) => (
                        <div key={i} className="flex items-center justify-center rounded-lg border border-[#162030] bg-[#0b1422] py-4">
                            <Icon size={20} className="text-[#7a8fa6]" />
                        </div>
                    ))}
                </div>
            </Section>
        </div>
    );
}

const THEME_SWATCHES = [
    { name: "bg-base", value: "#04080f" },
    { name: "bg-card", value: "#0b1422" },
    { name: "border", value: "#162030" },
    { name: "accent-green", value: "#00e5a0" },
    { name: "accent-blue", value: "#3b82f6" },
    { name: "warning", value: "#f59e0b" },
    { name: "error", value: "#ef4444" },
    { name: "text-primary", value: "#f0f4f8" },
];

function Section({
    title,
    id,
    children,
}: {
    title: string;
    id: string;
    children: React.ReactNode;
}) {
    return (
        <section
            id={id}
            aria-labelledby={`${id}-heading`}
            className="rounded-2xl border border-[#162030] bg-[#0b1422] p-6"
        >
            <h2 id={`${id}-heading`} className="mb-4 text-lg font-semibold text-white">
                {title}
            </h2>
            {children}
        </section>
    );
}
