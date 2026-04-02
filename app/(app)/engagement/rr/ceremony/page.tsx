"use client";
import React, { useState } from 'react';
import {
    Trophy, Search, Calendar, Users, MapPin, Plus, Share2, Video, CheckCircle2, ChevronRight, Download
} from 'lucide-react';
import Link from 'next/link';

const UPCOMING_EVENTS = [
    { id: 1, title: "Annual Excellence Awards 2023", date: "Dec 15, 2023 • 6:00 PM", location: "Grand Hyatt, San Francisco", type: "In-Person", attendees: 450, status: "Planning" },
    { id: 2, title: "Q3 Townhall & Spot Awards", date: "Oct 30, 2023 • 10:00 AM", location: "Zoom Webinar", type: "Virtual", attendees: 1200, status: "Invites Sent" },
];

const PAST_EVENTS = [
    { id: 101, title: "Summer Team Retreat & Awards", date: "Jul 20, 2023", awardsGiven: 45, type: "Hybrid" },
    { id: 102, title: "Q2 Spot Awards Recognition", date: "Jul 10, 2023", awardsGiven: 120, type: "Virtual" },
];

export default function AwardCeremonyScreen() {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div className="p-6 max-w-[1200px] mx-auto min-h-[calc(100vh-80px)] font-sans">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-white mb-2 flex items-center gap-3">
                        <Trophy size={32} className="text-[#9D00FF]" /> Award Ceremonies
                    </h1>
                    <p className="text-[#8899AA]">Manage company-wide award events, townhalls, and recognition ceremonies.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-5 py-2.5 bg-[#9D00FF] text-white font-bold rounded-xl hover:bg-[#8000cc] transition-colors flex items-center gap-2 shadow-[0_5px_15px_rgba(157,0,255,0.2)]">
                        <Plus size={18} /> Plan New Event
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Main Content */}
                <div className="col-span-1 lg:col-span-2 space-y-8">

                    {/* Upcoming Events */}
                    <div className="bg-[#0F1C2E] border border-[#2A3A4A] rounded-3xl shadow-xl overflow-hidden">
                        <div className="p-6 border-b border-[#1A2A3A] flex justify-between items-center bg-[#0A1420]">
                            <h2 className="text-lg font-bold text-white flex items-center gap-2">
                                <span className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#9D00FF] opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-[#9D00FF]"></span>
                                </span>
                                Upcoming Ceremonies
                            </h2>
                        </div>

                        <div className="divide-y divide-[#1A2A3A]">
                            {UPCOMING_EVENTS.map(event => (
                                <div key={event.id} className="p-6 hover:bg-[#152336] transition-colors group cursor-pointer">
                                    <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-4">
                                        <div>
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="text-xl font-bold text-white group-hover:text-[#9D00FF] transition-colors">{event.title}</h3>
                                                <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded border ${event.type === 'Virtual' ? 'bg-[#33E6FF]/10 text-[#33E6FF] border-[#33E6FF]/20' : 'bg-[#FFB020]/10 text-[#FFB020] border-[#FFB020]/20'}`}>
                                                    {event.type}
                                                </span>
                                            </div>
                                            <p className="text-sm text-[#8899AA] flex items-center gap-1.5 mb-1"><Calendar size={14} /> {event.date}</p>
                                            <p className="text-sm text-[#8899AA] flex items-center gap-1.5">
                                                {event.type === 'Virtual' ? <Video size={14} /> : <MapPin size={14} />}
                                                <span className="text-white">{event.location}</span>
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full ${event.status === 'Planning' ? 'bg-[#FFB020]/10 text-[#FFB020]' : 'bg-[#00E5A0]/10 text-[#00E5A0]'}`}>
                                                {event.status}
                                            </span>
                                            <div className="bg-[#1A2A3A] p-2 rounded-lg text-[#8899AA] group-hover:bg-[#9D00FF] group-hover:text-white transition-colors">
                                                <ChevronRight size={20} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between border-t border-[#1A2A3A] pt-4 mt-2">
                                        <div className="flex items-center gap-2 text-sm text-[#8899AA]">
                                            <Users size={16} /> <span className="text-white font-bold">{event.attendees}</span> confirmed RC/RSVP
                                        </div>
                                        <div className="flex gap-2">
                                            <button className="text-xs font-bold px-3 py-1.5 border border-[#2A3A4A] rounded-lg text-[#CCDDEE] hover:text-white hover:bg-[#1A2A3A] transition-colors flex items-center gap-1.5">
                                                <Share2 size={14} /> Share Invites
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Past Events */}
                    <div className="bg-[#0F1C2E] border border-[#2A3A4A] rounded-3xl shadow-xl overflow-hidden">
                        <div className="p-6 border-b border-[#1A2A3A] flex justify-between items-center">
                            <h2 className="text-lg font-bold text-white">Past Events Gallery</h2>
                            <div className="relative">
                                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#445566]" />
                                <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search past events..." className="w-56 bg-[#152336] border border-[#2A3A4A] rounded-lg pl-9 pr-4 py-2 text-white text-sm focus:outline-none focus:border-[#9D00FF]" />
                            </div>
                        </div>

                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-[#0A1420] border-b border-[#1A2A3A]">
                                    <th className="p-4 text-xs font-bold text-[#8899AA] uppercase tracking-wider">Event Name</th>
                                    <th className="p-4 text-xs font-bold text-[#8899AA] uppercase tracking-wider">Date</th>
                                    <th className="p-4 text-xs font-bold text-[#8899AA] uppercase tracking-wider text-right">Awards Presented</th>
                                    <th className="p-4 w-12 text-center text-[#8899AA]"><Download size={16} /></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#1A2A3A]">
                                {PAST_EVENTS.map(event => (
                                    <tr key={event.id} className="hover:bg-[#1A2A3A]/50 transition-colors group cursor-pointer">
                                        <td className="p-4 font-bold text-white text-sm">{event.title}</td>
                                        <td className="p-4 text-sm text-[#CCDDEE]">{event.date}</td>
                                        <td className="p-4 text-sm font-bold text-[#00E5A0] text-right">{event.awardsGiven}</td>
                                        <td className="p-4 text-center">
                                            <button className="text-[#445566] hover:text-[#9D00FF] transition-colors">
                                                <Download size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>

                {/* Sidebar */}
                <div className="col-span-1 space-y-6">

                    <div className="bg-[#0F1C2E] border border-[#2A3A4A] rounded-3xl p-6 shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#9D00FF]/10 rounded-full blur-[40px] pointer-events-none"></div>
                        <h3 className="text-white font-bold mb-4 relative z-10">Event Playbooks</h3>
                        <p className="text-sm text-[#8899AA] mb-4 relative z-10">Use these templates to quickly plan and execute world-class recognition events.</p>

                        <div className="space-y-3 relative z-10">
                            {['Annual Townhall Template', 'Quarterly Spot Awards Run-of-Show', 'Budget Calculator (Excel)'].map((doc, i) => (
                                <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-[#2A3A4A] bg-[#152336] hover:border-[#9D00FF]/50 transition-colors cursor-pointer group">
                                    <span className="text-sm font-medium text-[#CCDDEE] group-hover:text-white transition-colors">{doc}</span>
                                    <Download size={16} className="text-[#445566] group-hover:text-[#9D00FF] transition-colors" />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-[#0F1C2E] border border-[#2A3A4A] rounded-3xl p-6 shadow-xl text-center">
                        <div className="w-16 h-16 rounded-full bg-[#1A2A3A] flex items-center justify-center mx-auto mb-4 border border-[#2A3A4A]">
                            <Trophy size={32} className="text-[#FFB020]" />
                        </div>
                        <h3 className="text-white font-bold mb-2">Automate Award Certificates</h3>
                        <p className="text-sm text-[#8899AA] mb-6">Connect your HRIS to automatically generate and email branded certificates to winners during the event.</p>
                        <button className="w-full py-2.5 bg-[#152336] border border-[#2A3A4A] text-white font-bold rounded-xl hover:bg-[#1A2A3A] transition-colors hover:border-[#FFB020] hover:text-[#FFB020]">
                            Configure Certificates
                        </button>
                    </div>

                </div>

            </div>
        </div>
    );
}
