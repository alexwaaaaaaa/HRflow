// migrated: immersive-ui — live webinar experience; Page shell intentionally omitted
"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
    Users, MessageSquare, Hand, MicOff, Video, Share, Settings, Expand, Play, Heart, ThumbsUp,
} from "lucide-react";
import Button from "@/components/ui/Button";

export default function WebinarLiveScreen() {
    const [chatOpen, setChatOpen] = useState(true);

    return (
        <div className="flex flex-col h-[calc(100vh-80px)] bg-[#0A1420] overflow-hidden">
            {/* Top Bar */}
            <div className="h-14 bg-[#0F1C2E] border-b border-[#1A2A3A] px-4 flex justify-between items-center shrink-0 z-10">
                <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 bg-[#FF4444] rounded-full animate-pulse" aria-hidden="true" />
                    <h1 className="text-white font-bold text-sm md:text-base">Advanced React Patterns: Live Q&amp;A</h1>
                    <span className="bg-[#1A2A3A] text-[#8899AA] text-xs font-semibold px-2 py-0.5 rounded ml-2" aria-label="Session time: 42 minutes 15 seconds">42:15</span>
                </div>
                <div className="flex items-center gap-4">
                    <div className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-[#8899AA] bg-[#1A2A3A] px-3 py-1.5 rounded-lg border border-[#2A3A4A]">
                        <Users size={14} className="text-[#33E6FF]" aria-hidden="true" />
                        <span>1,245 Attendees</span>
                    </div>
                    <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => setChatOpen(!chatOpen)}
                        aria-label={chatOpen ? "Close chat" : "Open chat"}
                        aria-expanded={chatOpen}
                        aria-controls="chat-panel"
                    >
                        <MessageSquare size={18} aria-hidden="true" />
                    </Button>
                    <Button variant="danger" size="sm">Leave</Button>
                </div>
            </div>

            <div className="flex flex-1 min-h-0 relative">
                {/* Main Stage */}
                <div className="flex-1 flex flex-col p-4 gap-4 bg-[#050B14] overflow-hidden">
                    {/* Primary Video Feed */}
                    <div className="flex-1 rounded-2xl overflow-hidden bg-black border border-[#1A2A3A] relative group">
                        { }
                        <Image
                            src="https://images.unsplash.com/photo-1515378960530-7c0da6231faa?auto=format&fit=crop&q=80&w=2000"
                            alt="Screen share: Kent C. Dodds presenting"
                            width={2000}
                            height={1333}
                            className="w-full h-full object-cover opacity-80"
                        />
                        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur text-white text-xs font-bold px-3 py-1.5 rounded-lg border border-white/10">
                            Kent C. Dodds&apos; Screen
                        </div>

                        {/* Controls Overlay */}
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-[#0F1C2E]/90 backdrop-blur-md px-6 py-3 rounded-2xl border border-[#2A3A4A]/50 shadow-2xl opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
                            <Button variant="secondary" size="sm" aria-label="Toggle microphone">
                                <MicOff size={18} aria-hidden="true" />
                            </Button>
                            <Button variant="secondary" size="sm" aria-label="Toggle camera">
                                <Video size={18} aria-hidden="true" />
                            </Button>
                            <div className="w-px h-8 bg-[#2A3A4A] mx-2" aria-hidden="true" />
                            <Button variant="secondary" size="sm" aria-label="Share screen">
                                <Share size={18} className="text-[#33E6FF]" aria-hidden="true" />
                            </Button>
                            <Button variant="secondary" size="sm" aria-label="Raise hand" className="relative">
                                <Hand size={18} className="text-[#FFB020]" aria-hidden="true" />
                                <span className="absolute -top-1 -right-1 flex h-3 w-3" aria-hidden="true">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFB020] opacity-75" />
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-[#FFB020]" />
                                </span>
                            </Button>
                        </div>

                        <div className="absolute bottom-4 right-4 flex gap-2">
                            <Button variant="secondary" size="sm" aria-label="Settings">
                                <Settings size={16} aria-hidden="true" />
                            </Button>
                            <Button variant="secondary" size="sm" aria-label="Fullscreen">
                                <Expand size={16} aria-hidden="true" />
                            </Button>
                        </div>
                    </div>

                    {/* PIP / Other Participants */}
                    <div className="h-32 shrink-0 flex gap-4 overflow-x-auto pb-2" role="list" aria-label="Participants">
                        <div className="w-48 rounded-xl overflow-hidden bg-[#1A2A3A] border-2 border-[#33E6FF] relative shadow-[0_0_15px_rgba(51,230,255,0.2)] shrink-0" role="listitem">
                            { }
                            <Image src="https://i.pravatar.cc/150?u=a04258" alt="Kent C. Dodds (Host)" width={150} height={150} className="w-full h-full object-cover" />
                            <div className="absolute bottom-2 left-2 bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded border border-white/10 flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 bg-[#00E5A0] rounded-full" aria-hidden="true" /> Kent C. (Host)
                            </div>
                        </div>
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="w-48 rounded-xl overflow-hidden bg-[#1A2A3A] border-2 border-[#1A2A3A] relative shrink-0" role="listitem">
                                { }
                                <Image src={`https://i.pravatar.cc/150?u=${i + 10}`} alt={`Participant ${i}`} width={150} height={150} className="w-full h-full object-cover opacity-80" />
                                <div className="absolute top-2 right-2 bg-black/50 p-1 rounded-full">
                                    <MicOff size={12} className="text-[#FF4444]" aria-hidden="true" />
                                </div>
                                <div className="absolute bottom-2 left-2 bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded border border-white/10">
                                    Camilla {i}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Sidebar: Chat & Q&A */}
                {chatOpen && (
                    <div
                        id="chat-panel"
                        className="w-80 md:w-96 bg-[#0F1C2E] border-l border-[#1A2A3A] flex flex-col z-20 absolute inset-y-0 right-0 lg:static shadow-2xl lg:shadow-none transition-transform duration-300"
                        role="complementary"
                        aria-label="Chat and Q&A panel"
                    >
                        <div className="flex border-b border-[#1A2A3A] shrink-0" role="tablist" aria-label="Chat tabs">
                            <button
                                type="button"
                                role="tab"
                                aria-selected
                                className="flex-1 py-4 text-sm font-semibold border-b-2 border-[#33E6FF] text-[#33E6FF] bg-[#1A2A3A]/30"
                            >
                                Live Chat
                            </button>
                            <button
                                type="button"
                                role="tab"
                                aria-selected={false}
                                className="flex-1 py-4 text-sm font-semibold border-b-2 border-transparent text-[#8899AA] hover:text-white"
                            >
                                Q&amp;A <span className="text-xs bg-[#FF4444] text-white px-1.5 rounded-full ml-1" aria-label="3 questions">3</span>
                            </button>
                            <button
                                type="button"
                                role="tab"
                                aria-selected={false}
                                className="flex-1 py-4 text-sm font-semibold border-b-2 border-transparent text-[#8899AA] hover:text-white"
                            >
                                Polls
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm" aria-live="polite" aria-label="Chat messages">
                            <div className="flex items-start gap-3">
                                { }
                                <Image src="https://i.pravatar.cc/150?u=12" width={32} height={32} className="w-8 h-8 rounded-full" alt="Alex M." />
                                <div>
                                    <p className="font-semibold text-white text-xs mb-0.5">Alex M. <span className="text-[#445566] font-normal ml-2">10:05 AM</span></p>
                                    <p className="text-[#8899AA]">Is the recording going to be available after?</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 bg-[#33E6FF]/20 text-[#33E6FF] rounded-full flex items-center justify-center font-bold text-xs border border-[#33E6FF]/30" aria-hidden="true">M</div>
                                <div>
                                    <p className="font-semibold text-[#33E6FF] text-xs mb-0.5">Moderator <span className="text-[#445566] font-normal ml-2">10:06 AM</span></p>
                                    <p className="text-white">Yes, Alex! It will be uploaded to the LMS library within 24 hours.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                { }
                                <Image src="https://i.pravatar.cc/150?u=8" width={32} height={32} className="w-8 h-8 rounded-full" alt="David L." />
                                <div>
                                    <p className="font-semibold text-white text-xs mb-0.5">David L. <span className="text-[#445566] font-normal ml-2">10:12 AM</span></p>
                                    <p className="text-[#8899AA]">The explanation of React Server Components was super clear.</p>
                                </div>
                            </div>
                        </div>

                        {/* Reaction Bar */}
                        <div className="p-2 border-t border-[#1A2A3A] flex justify-center gap-2 bg-[#0A1420]" role="toolbar" aria-label="Reactions">
                            <Button variant="ghost" size="sm" aria-label="Clap reaction" className="w-10 h-10 rounded-full">
                                <span aria-hidden="true">👏</span>
                            </Button>
                            <Button variant="ghost" size="sm" aria-label="Heart reaction" className="w-10 h-10 rounded-full">
                                <Heart size={20} className="text-[#FF4444]" fill="currentColor" aria-hidden="true" />
                            </Button>
                            <Button variant="ghost" size="sm" aria-label="Thumbs up reaction" className="w-10 h-10 rounded-full">
                                <ThumbsUp size={20} className="text-[#FFB020]" fill="currentColor" aria-hidden="true" />
                            </Button>
                            <Button variant="ghost" size="sm" aria-label="Rocket reaction" className="w-10 h-10 rounded-full">
                                <span aria-hidden="true">🚀</span>
                            </Button>
                        </div>

                        {/* Chat Input */}
                        <div className="p-4 border-t border-[#1A2A3A] bg-[#0F1C2E] shrink-0">
                            <div className="relative">
                                <label htmlFor="chat-input" className="sr-only">Type a message</label>
                                <input
                                    id="chat-input"
                                    type="text"
                                    placeholder="Type a message…"
                                    className="w-full bg-[#1A2A3A] border border-[#2A3A4A] text-white text-sm rounded-xl pl-4 pr-10 py-3 focus:outline-none focus:border-[#33E6FF] transition-colors"
                                />
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    type="submit"
                                    aria-label="Send message"
                                    className="absolute right-2 top-1/2 -translate-y-1/2"
                                >
                                    <Play size={16} fill="currentColor" aria-hidden="true" />
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
