"use client";
import React, { useState } from "react";
import {
    Users, MessageSquare, Hand, MicOff, Video, Share, Settings, Expand, Play, X, Heart, ThumbsUp
} from "lucide-react";

export default function WebinarLiveScreen() {
    const [chatOpen, setChatOpen] = useState(true);

    return (
        <div className="flex flex-col h-[calc(100vh-80px)] bg-[#0A1420] overflow-hidden">

            {/* Top Bar */}
            <div className="h-14 bg-[#0F1C2E] border-b border-[#1A2A3A] px-4 flex justify-between items-center shrink-0 z-10">
                <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 bg-[#FF4444] rounded-full animate-pulse"></span>
                    <h1 className="text-white font-bold text-sm md:text-base">Advanced React Patterns: Live Q&A</h1>
                    <span className="bg-[#1A2A3A] text-[#8899AA] text-xs font-semibold px-2 py-0.5 rounded ml-2">42:15</span>
                </div>
                <div className="flex items-center gap-4">
                    <div className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-[#8899AA] bg-[#1A2A3A] px-3 py-1.5 rounded-lg border border-[#2A3A4A]">
                        <Users size={14} className="text-[#33E6FF]" /> 1,245 Attendees
                    </div>
                    <button className="text-[#8899AA] hover:text-white transition-colors" onClick={() => setChatOpen(!chatOpen)}>
                        <MessageSquare size={20} />
                    </button>
                    <button className="bg-[#FF4444] text-white px-4 py-1.5 rounded-lg text-sm font-bold shadow-lg shadow-[#FF4444]/20 hover:bg-red-600 transition-colors">
                        Leave
                    </button>
                </div>
            </div>

            <div className="flex flex-1 min-h-0 relative">

                {/* Main Stage */}
                <div className="flex-1 flex flex-col p-4 gap-4 bg-[#050B14] overflow-hidden">

                    {/* Primary Video Feed */}
                    <div className="flex-1 rounded-2xl overflow-hidden bg-black border border-[#1A2A3A] relative group">
                        <img src="https://images.unsplash.com/photo-1515378960530-7c0da6231faa?auto=format&fit=crop&q=80&w=2000" alt="Screen Share" className="w-full h-full object-cover opacity-80" />
                        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur text-white text-xs font-bold px-3 py-1.5 rounded-lg border border-white/10">
                            Kent C. Dodds' Screen
                        </div>

                        {/* Controls Overlay */}
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-[#0F1C2E]/90 backdrop-blur-md px-6 py-3 rounded-2xl border border-[#2A3A4A]/50 shadow-2xl opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
                            <button className="w-12 h-12 rounded-full bg-[#1A2A3A] hover:bg-[#FF4444] text-white flex items-center justify-center transition-colors border border-transparent hover:border-red-400">
                                <MicOff size={20} />
                            </button>
                            <button className="w-12 h-12 rounded-full bg-[#1A2A3A] hover:bg-[#FF4444] text-white flex items-center justify-center transition-colors border border-transparent hover:border-red-400">
                                <Video size={20} />
                            </button>
                            <div className="w-px h-8 bg-[#2A3A4A] mx-2"></div>
                            <button className="w-12 h-12 rounded-full bg-[#1A2A3A] text-white flex items-center justify-center hover:bg-[#2A3A4A] transition-colors border border-[#2A3A4A]">
                                <Share size={20} className="text-[#33E6FF]" />
                            </button>
                            <button className="w-12 h-12 rounded-full bg-[#152336] text-[#FFB020] flex items-center justify-center hover:bg-[#1A2A3A] focus:bg-[#FFB020]/20 transition-colors border border-[#2A3A4A] relative">
                                <Hand size={20} />
                                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFB020] opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-[#FFB020]"></span>
                                </span>
                            </button>
                        </div>

                        <div className="absolute bottom-4 right-4 flex gap-2">
                            <button className="p-2 bg-black/50 hover:bg-black/80 rounded border border-white/10 text-white backdrop-blur"><Settings size={18} /></button>
                            <button className="p-2 bg-black/50 hover:bg-black/80 rounded border border-white/10 text-white backdrop-blur"><Expand size={18} /></button>
                        </div>
                    </div>

                    {/* PIP / Other Participants */}
                    <div className="h-32 shrink-0 flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                        <div className="w-48 rounded-xl overflow-hidden bg-[#1A2A3A] border-2 border-[#33E6FF] relative shadow-[0_0_15px_rgba(51,230,255,0.2)] shrink-0">
                            <img src="https://i.pravatar.cc/150?u=a04258" alt="Kent" className="w-full h-full object-cover" />
                            <div className="absolute bottom-2 left-2 bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded border border-white/10 flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 bg-[#00E5A0] rounded-full"></span> Kent C. (Host)
                            </div>
                        </div>
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="w-48 rounded-xl overflow-hidden bg-[#1A2A3A] border-2 border-[#1A2A3A] relative shrink-0">
                                <img src={`https://i.pravatar.cc/150?u=${i + 10}`} alt={`Participant ${i}`} className="w-full h-full object-cover opacity-80" />
                                <div className="absolute top-2 right-2 bg-black/50 p-1 rounded-full"><MicOff size={12} className="text-[#FF4444]" /></div>
                                <div className="absolute bottom-2 left-2 bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded border border-white/10">
                                    Camilla {i}
                                </div>
                            </div>
                        ))}
                    </div>

                </div>

                {/* Right Sidebar: Chat & Q&A */}
                {chatOpen && (
                    <div className="w-80 md:w-96 bg-[#0F1C2E] border-l border-[#1A2A3A] flex flex-col z-20 absolute inset-y-0 right-0 lg:static shadow-2xl lg:shadow-none transition-transform duration-300">
                        <div className="flex border-b border-[#1A2A3A] shrink-0">
                            <button className="flex-1 py-4 text-sm font-semibold border-b-2 border-[#33E6FF] text-[#33E6FF] bg-[#1A2A3A]/30">Live Chat</button>
                            <button className="flex-1 py-4 text-sm font-semibold border-b-2 border-transparent text-[#8899AA] hover:text-white">Q&A <span className="text-xs bg-[#FF4444] text-white px-1.5 rounded-full ml-1">3</span></button>
                            <button className="flex-1 py-4 text-sm font-semibold border-b-2 border-transparent text-[#8899AA] hover:text-white">Polls</button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm">
                            {/* Chat messages */}
                            <div className="flex flex-col gap-4">
                                <div className="flex items-start gap-3">
                                    <img src="https://i.pravatar.cc/150?u=12" className="w-8 h-8 rounded-full" alt="avatar" />
                                    <div>
                                        <p className="font-semibold text-white text-xs mb-0.5">Alex M. <span className="text-[#445566] font-normal ml-2">10:05 AM</span></p>
                                        <p className="text-[#8899AA]">Is the recording going to be available after?</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 bg-[#33E6FF]/20 text-[#33E6FF] rounded-full flex items-center justify-center font-bold text-xs border border-[#33E6FF]/30">M</div>
                                    <div>
                                        <p className="font-semibold text-[#33E6FF] text-xs mb-0.5">Moderator <span className="text-[#445566] font-normal ml-2">10:06 AM</span></p>
                                        <p className="text-white">Yes, Alex! It will be uploaded to the LMS library within 24 hours.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <img src="https://i.pravatar.cc/150?u=8" className="w-8 h-8 rounded-full" alt="avatar" />
                                    <div>
                                        <p className="font-semibold text-white text-xs mb-0.5">David L. <span className="text-[#445566] font-normal ml-2">10:12 AM</span></p>
                                        <p className="text-[#8899AA]">The explanation of React Server Components was super clear. <span className="text-lg ml-1">🤯</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Reaction Bar */}
                        <div className="p-2 border-t border-[#1A2A3A] flex justify-center gap-2 bg-[#0A1420]">
                            <button className="w-10 h-10 rounded-full hover:bg-[#1A2A3A] flex items-center justify-center text-xl hover:scale-125 transition-transform">👏</button>
                            <button className="w-10 h-10 rounded-full hover:bg-[#1A2A3A] flex items-center justify-center text-xl hover:scale-125 transition-transform"><Heart size={20} className="text-[#FF4444]" fill="currentColor" /></button>
                            <button className="w-10 h-10 rounded-full hover:bg-[#1A2A3A] flex items-center justify-center text-xl hover:scale-125 transition-transform"><ThumbsUp size={20} className="text-[#FFB020]" fill="currentColor" /></button>
                            <button className="w-10 h-10 rounded-full hover:bg-[#1A2A3A] flex items-center justify-center text-xl hover:scale-125 transition-transform">🚀</button>
                        </div>

                        {/* Chat Input */}
                        <div className="p-4 border-t border-[#1A2A3A] bg-[#0F1C2E] shrink-0">
                            <div className="relative">
                                <input type="text" placeholder="Type a message..." className="w-full bg-[#1A2A3A] border border-[#2A3A4A] text-white text-sm rounded-xl pl-4 pr-10 py-3 focus:outline-none focus:border-[#33E6FF] transition-colors" />
                                <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-[#33E6FF] hover:bg-[#33E6FF]/10 rounded-lg transition-colors">
                                    <Play size={16} fill="currentColor" />
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
