"use client";

import { useState } from "react";
import { Shield, Monitor, MapPin, Wifi, Clock, AlertTriangle, Trash2 } from "lucide-react";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import Card from "@/components/ui/Card";

interface Session {
    id: number;
    device: string;
    browser: string;
    location: string;
    ip: string;
    lastActive: string;
    suspicious?: boolean;
}

const OTHER_SESSIONS: Session[] = [
    { id: 2, device: "iPhone 14", browser: "Safari", location: "Pune, MH", ip: "49.37.xx.xx", lastActive: "2h ago" },
    { id: 3, device: "Windows PC", browser: "Chrome", location: "Delhi, DL", ip: "182.64.xx.xx", lastActive: "1 day ago" },
    { id: 4, device: "iPad Pro", browser: "Safari", location: "Bengaluru, KA", ip: "49.91.xx.xx", lastActive: "3 days ago", suspicious: true },
];

const SESSION_FIELDS = [
    { icon: Monitor, key: "device" as const },
    { icon: MapPin, key: "location" as const },
    { icon: Clock, key: "lastActive" as const },
    { icon: Wifi, key: "ip" as const },
] as const;

export default function ActiveSessionsPage() {
    const [sessions, setSessions] = useState<Session[]>(OTHER_SESSIONS);
    const [revoking, setRevoking] = useState<number | null>(null);
    const [showRevokeAll, setShowRevokeAll] = useState(false);

    const handleRevoke = async (id: number) => {
        setRevoking(id);
        await new Promise((r) => setTimeout(r, 1000));
        setSessions((s) => s.filter((x) => x.id !== id));
        setRevoking(null);
    };

    const CURRENT_SESSION_FIELDS: Array<{
        icon: typeof Monitor;
        value: string;
        highlight?: boolean;
    }> = [
        { icon: Monitor, value: "MacBook Pro Chrome" },
        { icon: MapPin, value: "Mumbai, Maharashtra" },
        { icon: Clock, value: "Active now", highlight: true },
        { icon: Wifi, value: "103.21.xx.xx" },
    ];

    return (
        <div className="min-h-screen p-8 bg-[#060B14]">
            <div className="max-w-[1200px] mx-auto">
                {/* Header */}
                <div className="flex items-center gap-3 mb-2">
                    <Shield size={28} color="#00E5A0" aria-hidden="true" />
                    <h1 className="text-[28px] font-bold text-white m-0">Active Sessions</h1>
                </div>
                <p className="text-sm text-[#8899AA] mb-6">Manage all devices where you&apos;re currently signed in</p>

                {/* Suspicious alert */}
                {sessions.some((s) => s.suspicious) && (
                    <div className="flex items-center gap-4 rounded-xl px-5 py-4 mb-6 justify-between bg-[rgba(255,68,68,0.08)] border border-[#FF4444]" role="alert">
                        <div className="flex items-center gap-3">
                            <AlertTriangle size={18} color="#FF4444" aria-hidden="true" />
                            <p className="text-sm text-white m-0">New login detected from an unrecognized device in Bengaluru. Was this you?</p>
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                            <Button variant="secondary" size="sm">Yes, it was me</Button>
                            <Button variant="danger" size="sm">No, revoke access</Button>
                        </div>
                    </div>
                )}

                {/* Current session */}
                <Card variant="default" padding="md" className="mb-4 border-[#00E5A0]">
                    <div className="flex items-center gap-3 mb-4">
                        <Badge variant="success">Current Session</Badge>
                        <Badge variant="neutral">This Device</Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {CURRENT_SESSION_FIELDS.map((item, i) => {
                            const Icon = item.icon;
                            return (
                                <div key={i} className="flex items-center gap-2 text-sm">
                                    <Icon size={16} className={item.highlight ? "text-[#00E5A0]" : "text-[#8899AA]"} aria-hidden="true" />
                                    <span className={item.highlight ? "text-[#00E5A0]" : "text-white"}>{item.value}</span>
                                    {item.highlight && <div className="w-1.5 h-1.5 rounded-full bg-[#00E5A0]" aria-hidden="true" />}
                                </div>
                            );
                        })}
                    </div>
                    <p className="mt-3 text-xs text-[#445566]">This is your current active session</p>
                </Card>

                {/* Other sessions */}
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-semibold text-white m-0">Other Active Sessions ({sessions.length})</h3>
                    <Button variant="danger" size="sm" onClick={() => setShowRevokeAll(true)}>Revoke All Other Sessions</Button>
                </div>

                <div className="flex flex-col gap-3">
                    {sessions.length === 0 && (
                        <Card variant="default" padding="md" className="text-center">
                            <p className="text-sm text-[#8899AA]">No other active sessions</p>
                        </Card>
                    )}
                    {sessions.map((session) => (
                        <Card
                            key={session.id}
                            variant="default"
                            padding="md"
                            className={`transition-all duration-300 ${revoking === session.id ? "opacity-50" : ""} ${session.suspicious ? "border-[#FFB800]" : ""}`}
                        >
                            <div className="flex items-center justify-between">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-1">
                                    {SESSION_FIELDS.map((field) => {
                                        const Icon = field.icon;
                                        return (
                                            <div key={field.key} className="flex items-center gap-2 text-sm text-[#8899AA]">
                                                <Icon size={14} aria-hidden="true" />
                                                <span className="text-white">{session[field.key]}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="flex items-center gap-2 ml-4 flex-shrink-0">
                                    {session.suspicious && (
                                        <Badge variant="warning">Suspicious</Badge>
                                    )}
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        isLoading={revoking === session.id}
                                        loadingText="Revoking..."
                                        onClick={() => handleRevoke(session.id)}
                                    >
                                        <Trash2 size={13} aria-hidden="true" /> Revoke
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Revoke All modal */}
                {showRevokeAll && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 bg-[rgba(6,11,20,0.8)]" role="dialog" aria-modal="true" aria-labelledby="revoke-all-title">
                        <div className="w-full max-w-[400px] animate-fade-in">
                            <Card variant="elevated" padding="lg">
                                <h3 id="revoke-all-title" className="text-lg font-semibold text-white m-0 mb-2">Revoke all other sessions?</h3>
                                <p className="text-sm text-[#8899AA] mb-6">You&apos;ll be signed out of all other devices immediately.</p>
                                <div className="flex gap-3">
                                    <Button variant="secondary" className="flex-1" onClick={() => setShowRevokeAll(false)}>Cancel</Button>
                                    <Button variant="danger" className="flex-1" onClick={() => { setSessions([]); setShowRevokeAll(false); }}>Revoke All</Button>
                                </div>
                            </Card>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
