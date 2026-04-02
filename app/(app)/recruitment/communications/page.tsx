"use client";
import React, { useState } from "react";
import { Search, Filter, Phone, Video, Send, MoreVertical, Building2, UserCircle2, Clock, Calendar, Edit3, FileText, Paperclip, ChevronDown } from "lucide-react";

const CONTACTS = [
    { id: 1, name: "Rahul Sharma", role: "Sr. Frontend Eng", time: "10:45 AM", status: "unread", msg: "Hi Priya, thanks for reaching out. Yes, I am available for..." },
    { id: 2, name: "Anjali Singh", role: "Product Marketing", time: "Yesterday", status: "read", msg: "Could you confirm the time for tomorrow's technical round?" },
    { id: 3, name: "Vikram Reddy", role: "Sr. Frontend Eng", time: "12 Mar", status: "read", msg: "I have attached the assignment file as requested." },
    { id: 4, name: "Neha Gupta", role: "HR Business Partner", time: "10 Mar", status: "draft", msg: "Draft: Offer Negotiation Follow-up" },
    { id: 5, name: "Karan Patel", role: "Backend Engineer", time: "05 Mar", status: "read", msg: "Thanks for the update. Looking forward to the results." },
];

export default function CandidateCommunication() {
    const [msg, setMsg] = useState("");

    return (
        <div className="flex h-[calc(100vh-64px)] overflow-hidden text-white bg-[#060B14]">

            {/* Sidebar Inbox */}
            <div className="w-[340px] border-r border-[#1A2A3A] flex flex-col bg-[#0D1928]">
                <div className="p-4 border-b border-[#1A2A3A] flex gap-2 shrink-0">
                    <div className="relative flex-1">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#445566]" />
                        <input placeholder="Search messages..." className="w-full h-10 bg-[#060B14] border border-[#1A2A3A] rounded-xl pl-9 px-3 text-sm text-white focus:outline-none focus:border-[#0066FF] transition-colors" />
                    </div>
                    <button className="w-10 h-10 bg-[#0066FF] text-white rounded-xl flex items-center justify-center hover:bg-[#0052cc] transition-colors"><Edit3 size={16} /></button>
                </div>

                <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-[#1A2A3A]">
                    {CONTACTS.map((c, i) => (
                        <div key={c.id} className={`p-4 border-b border-[#1A2A3A] cursor-pointer transition-colors hover:bg-[#1A2A3A]/50 ${i === 0 ? 'bg-[#1A2A3A]/30 border-l-2 border-l-[#0066FF]' : 'border-l-2 border-l-transparent'}`}>
                            <div className="flex justify-between items-start mb-1">
                                <h4 className={`text-sm ${c.status === 'unread' ? 'font-bold text-white' : 'font-medium text-[#8899AA]'}`}>{c.name}</h4>
                                <span className="text-[10px] text-[#445566]">{c.time}</span>
                            </div>
                            <p className="text-[11px] text-[#00E5A0] mb-1">{c.role}</p>
                            <p className={`text-xs truncate ${c.status === 'unread' ? 'text-white' : 'text-[#445566]'}`}>{c.msg}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col bg-[#0A1420]">
                {/* Chat Header */}
                <div className="h-[72px] border-b border-[#1A2A3A] flex items-center justify-between px-6 shrink-0 bg-[#0D1928]">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#1A2A3A] rounded-full flex items-center justify-center font-bold text-sm text-white">RS</div>
                        <div>
                            <h3 className="font-bold text-white">Rahul Sharma</h3>
                            <p className="text-xs text-[#8899AA]">Candidate · Senior Frontend Engineer</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button className="h-9 px-3 bg-[#1A2A3A] hover:bg-[#2A3A4A] rounded-lg text-xs font-semibold text-white flex items-center gap-2 transition-colors"><Video size={14} /> Meet</button>
                        <button className="h-9 px-3 bg-[#1A2A3A] hover:bg-[#2A3A4A] rounded-lg text-xs font-semibold text-white flex items-center gap-2 transition-colors"><FileText size={14} /> Profile</button>
                    </div>
                </div>

                {/* Message History */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-[#1A2A3A]">
                    {/* Date Divider */}
                    <div className="flex items-center justify-center my-4">
                        <div className="bg-[#1A2A3A] px-3 py-1 rounded-full text-[10px] text-[#8899AA] font-bold">14 March 2025</div>
                    </div>

                    {/* HR Outbound Msg */}
                    <div className="flex flex-col items-end">
                        <div className="bg-[#0066FF] text-white p-4 rounded-t-2xl rounded-bl-2xl rounded-br-sm max-w-[70%]">
                            <p className="text-sm leading-relaxed mb-3">
                                Hi Rahul, <br /><br />
                                Thank you for taking the time to speak with our engineering team yesterday. We were really impressed with your technical background and experience at TechCorp.<br /><br />
                                We would like to invite you for a final culture-fit round with our VP of Engineering this Thursday. Please let me know if 2:00 PM works for you?
                            </p>
                            <div className="flex items-center gap-2 text-xs bg-[#0052cc] p-2 rounded-lg inline-flex">
                                <Calendar size={14} /> Final Interview Invite.ics
                            </div>
                        </div>
                        <span className="text-[10px] text-[#445566] mt-1 pr-1">You · 09:30 AM</span>
                    </div>

                    {/* Candidate Reply */}
                    <div className="flex flex-col items-start mt-6">
                        <div className="bg-[#1A2A3A] text-white p-4 rounded-t-2xl rounded-br-2xl rounded-bl-sm max-w-[70%] border border-[#2A3A4A]">
                            <p className="text-sm leading-relaxed">
                                Hi Priya, <br /><br />
                                Thanks for reaching out. Yes, I am available for the culture-fit round this Thursday at 2:00 PM. <br /><br />
                                Looking forward to the conversation!
                            </p>
                        </div>
                        <span className="text-[10px] text-[#445566] mt-1 pl-1">Rahul Sharma · 10:45 AM</span>
                    </div>
                </div>

                {/* Message Input */}
                <div className="p-4 bg-[#0D1928] border-t border-[#1A2A3A] shrink-0">
                    <div className="bg-[#060B14] border border-[#1A2A3A] rounded-xl flex items-end p-2 transition-colors focus-within:border-[#0066FF]">
                        <button className="p-2 text-[#8899AA] hover:text-white transition-colors shrink-0"><Paperclip size={18} /></button>
                        <textarea
                            value={msg} onChange={e => setMsg(e.target.value)}
                            placeholder="Type a message or use / for templates..."
                            className="flex-1 bg-transparent resize-none p-2 text-sm text-white focus:outline-none max-h-32 min-h-[44px]"
                            rows={1}
                        />
                        <div className="flex items-center gap-2 shrink-0 p-1">
                            <button className="px-3 h-8 bg-[#1A2A3A] text-xs font-semibold text-[#8899AA] hover:text-white rounded-lg transition-colors flex items-center gap-1">Templates <ChevronDown size={12} /></button>
                            <button className="h-8 w-8 bg-[#0066FF] hover:bg-[#0052cc] rounded-lg flex items-center justify-center text-white transition-colors"><Send size={14} className="ml-0.5" /></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
