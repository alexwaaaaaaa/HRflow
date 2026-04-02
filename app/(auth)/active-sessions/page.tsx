"use client";

import { useState } from "react";
import { Shield, Monitor, MapPin, Wifi, Clock, AlertTriangle, Trash2 } from "lucide-react";
import Button from "@/components/ui/Button";

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

    return (
        <div className="min-h-screen p-8" style={{ background: "#060B14" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>
                {/* Header */}
                <div className="flex items-center gap-3 mb-2">
                    <Shield size={28} color="#00E5A0" />
                    <h1 style={{ fontSize: 28, fontWeight: 700, color: "#FFFFFF", margin: 0 }}>Active Sessions</h1>
                </div>
                <p style={{ fontSize: 14, color: "#8899AA", marginBottom: 24 }}>Manage all devices where you&apos;re currently signed in</p>

                {/* Suspicious alert */}
                {sessions.some((s) => s.suspicious) && (
                    <div className="flex items-center gap-4 rounded-xl px-5 py-4 mb-6 justify-between" style={{ background: "rgba(255,68,68,0.08)", border: "1px solid #FF4444" }}>
                        <div className="flex items-center gap-3">
                            <AlertTriangle size={18} color="#FF4444" />
                            <p style={{ fontSize: 14, color: "#FFFFFF", margin: 0 }}>New login detected from an unrecognized device in Bengaluru. Was this you?</p>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="secondary" size="sm">Yes, it was me</Button>
                            <Button variant="danger" size="sm">No, revoke access</Button>
                        </div>
                    </div>
                )}

                {/* Current session */}
                <div className="rounded-2xl p-6 mb-4" style={{ background: "#0D1928", border: "1px solid #00E5A0" }}>
                    <div className="flex items-center gap-3 mb-4">
                        <span style={{ background: "rgba(0,229,160,0.15)", color: "#00E5A0", borderRadius: 20, padding: "3px 10px", fontSize: 12, fontWeight: 500 }}>Current Session</span>
                        <span style={{ background: "#1A2A3A", color: "#FFFFFF", borderRadius: 20, padding: "3px 10px", fontSize: 12, fontWeight: 500 }}>This Device</span>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                        {[
                            { icon: <Monitor size={16} />, value: "MacBook Pro Chrome" },
                            { icon: <MapPin size={16} />, value: "Mumbai, Maharashtra" },
                            { icon: <Clock size={16} />, value: "Active now" },
                            { icon: <Wifi size={16} />, value: "103.21.xx.xx" },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-2" style={{ color: i === 2 ? "#00E5A0" : "#8899AA", fontSize: 14 }}>
                                {item.icon}
                                <span style={{ color: "#FFFFFF" }}>{item.value}</span>
                                {i === 2 && <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#00E5A0" }} />}
                            </div>
                        ))}
                    </div>
                    <p className="mt-3" style={{ fontSize: 12, color: "#445566" }}>This is your current active session</p>
                </div>

                {/* Other sessions */}
                <div className="flex items-center justify-between mb-4">
                    <h3 style={{ fontSize: 16, fontWeight: 600, color: "#FFFFFF", margin: 0 }}>Other Active Sessions ({sessions.length})</h3>
                    <Button variant="danger" size="sm" onClick={() => setShowRevokeAll(true)}>Revoke All Other Sessions</Button>
                </div>

                <div className="flex flex-col gap-3">
                    {sessions.length === 0 && (
                        <div className="rounded-xl p-8 text-center" style={{ background: "#0D1928", border: "1px solid #1A2A3A" }}>
                            <p style={{ color: "#8899AA", fontSize: 14 }}>No other active sessions</p>
                        </div>
                    )}
                    {sessions.map((session) => (
                        <div key={session.id}
                            className={`rounded-xl p-5 transition-all duration-300 ${revoking === session.id ? "opacity-50" : ""}`}
                            style={{ background: "#0D1928", border: `1px solid ${session.suspicious ? "#FFB800" : "#1A2A3A"}`, animation: session.suspicious ? "pulse-border 2s ease-in-out infinite" : "none" }}>
                            <div className="flex items-center justify-between">
                                <div className="grid grid-cols-4 gap-4 flex-1">
                                    {[
                                        { icon: <Monitor size={14} />, value: `${session.device} ${session.browser}` },
                                        { icon: <MapPin size={14} />, value: session.location },
                                        { icon: <Clock size={14} />, value: session.lastActive },
                                        { icon: <Wifi size={14} />, value: session.ip },
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-2" style={{ color: "#8899AA", fontSize: 13 }}>
                                            {item.icon}
                                            <span style={{ color: "#FFFFFF" }}>{item.value}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex items-center gap-2 ml-4">
                                    {session.suspicious && (
                                        <span style={{ background: "rgba(255,184,0,0.15)", color: "#FFB800", borderRadius: 20, padding: "3px 10px", fontSize: 11 }}>⚠ Suspicious</span>
                                    )}
                                    <Button variant="danger" size="sm" isLoading={revoking === session.id} loadingText="Revoking..."
                                        onClick={() => handleRevoke(session.id)}>
                                        <Trash2 size={13} /> Revoke
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Revoke All modal */}
                {showRevokeAll && (
                    <div className="fixed inset-0 flex items-center justify-center z-50" style={{ background: "rgba(6,11,20,0.8)" }}>
                        <div className="animate-fade-in" style={{ width: 400, background: "#0D1928", border: "1px solid #1A2A3A", borderRadius: 16, padding: 32 }}>
                            <h3 style={{ fontSize: 18, fontWeight: 600, color: "#FFFFFF", margin: 0, marginBottom: 8 }}>Revoke all other sessions?</h3>
                            <p style={{ fontSize: 14, color: "#8899AA", marginBottom: 24 }}>You&apos;ll be signed out of all other devices immediately.</p>
                            <div className="flex gap-3">
                                <Button variant="secondary" className="flex-1" onClick={() => setShowRevokeAll(false)}>Cancel</Button>
                                <Button variant="danger" className="flex-1" onClick={() => { setSessions([]); setShowRevokeAll(false); }}>Revoke All</Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
