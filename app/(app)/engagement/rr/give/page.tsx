"use client";

import Page from "@/components/ui/Page";
import React, { useState } from 'react';
import { Search, Medal, CheckCircle2, Zap, Star, Shield, Users, Heart, Lightbulb, Send, Eye, EyeOff, ArrowRight
} from 'lucide-react';
import { useRouter } from 'next/navigation';

const BADGES = [
    { id: 'innovator', name: 'Innovator', icon: Lightbulb, color: '#FFB020', bg: 'bg-[#FFB020]/10', border: 'border-[#FFB020]/30' },
    { id: 'team_player', name: 'Team Player', icon: Users, color: '#33E6FF', bg: 'bg-[#33E6FF]/10', border: 'border-[#33E6FF]/30' },
    { id: 'problem_solver', name: 'Problem Solver', icon: Zap, color: '#9D00FF', bg: 'bg-[#9D00FF]/10', border: 'border-[#9D00FF]/30' },
    { id: 'customer_hero', name: 'Customer Hero', icon: Heart, color: '#FF4444', bg: 'bg-[#FF4444]/10', border: 'border-[#FF4444]/30' },
    { id: 'above_beyond', name: 'Above & Beyond', icon: Star, color: '#00E5A0', bg: 'bg-[#00E5A0]/10', border: 'border-[#00E5A0]/30' },
    { id: 'integrity', name: 'Integrity', icon: Shield, color: '#8899AA', bg: 'bg-[#8899AA]/10', border: 'border-[#8899AA]/30' },
];

const POINTS_OPTIONS = [10, 25, 50, 100];

export default function GiveRecognitionScreen() {
    const router = useRouter();
    const [selectedBadge, setSelectedBadge] = useState<string | null>(null);
    const [selectedPoints, setSelectedPoints] = useState<number>(25);
    const [message, setMessage] = useState('');
    const [visibility, setVisibility] = useState('public');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            router.push('/engagement/rr/feed');
        }, 1500);
    };

    return (
        <Page
            title="Give Recognition"
            subtitle="Appreciate your peers, award points, and celebrate their contributions."
            breadcrumbs={[{ label: "Engagement", href: "/engagement" }, { label: "Rr", href: "/engagement/rr" }, { label: "Give" }]}
            maxWidth="1200px"
        >

        <div className="p-6 max-w-[1200px] mx-auto min-h-[calc(100vh-80px)]">

            <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-white mb-2 flex items-center gap-3">
                    <Medal size={32} className="text-[#33E6FF]" /> Give Recognition
                </h1>
                <p className="text-[#8899AA]">Appreciate your peers, award points, and celebrate their contributions.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                <div className="col-span-1 lg:col-span-2">
                    <form onSubmit={handleSubmit} className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-3xl p-8 shadow-xl space-y-8">

                        {/* Search Employee */}
                        <div>
                            <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#1A2A3A] text-xs font-bold text-[#8899AA]">1</span>
                                Who do you want to recognize?
                            </h3>
                            <div className="relative">
                                <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#445566]" />
                                <input
                                    type="text"
                                    placeholder="Search by name or email..."
                                    className="w-full bg-[#152336] border border-[#2A3A4A] rounded-xl pl-12 pr-4 py-3.5 text-white placeholder:text-[#445566] focus:outline-none focus:border-[#33E6FF] transition-colors"
                                />
                            </div>
                            {/* Mock selection */}
                            <div className="mt-3 flex items-center gap-3 p-3 bg-[#1A2A3A]/50 border border-[#33E6FF]/30 rounded-xl w-max">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#33E6FF] to-blue-500 flex items-center justify-center text-white font-bold">
                                    JD
                                </div>
                                <div>
                                    <p className="text-white text-sm font-bold">John Doe</p>
                                    <p className="text-[#8899AA] text-xs">Senior Product Designer</p>
                                </div>
                            </div>
                        </div>

                        {/* Select Badge */}
                        <div>
                            <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#1A2A3A] text-xs font-bold text-[#8899AA]">2</span>
                                Select a Core Value Badge
                            </h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                {BADGES.map(badge => {
                                    const Icon = badge.icon;
                                    const isSelected = selectedBadge === badge.id;
                                    return (


                                        <label
                                            key={badge.id}
                                            className={`cursor-pointer rounded-2xl flex flex-col items-center justify-center p-6 border-2 transition-all duration-300 relative overflow-hidden ${isSelected ? 'border-[#33E6FF] bg-[#1A2A3A]' : 'border-[#2A3A4A] bg-[#152336] hover:border-[#445566]'}`}
                                        >
                                            <input
                                                type="radio"
                                                name="badge"
                                                value={badge.id}
                                                className="sr-only"
                                                onChange={() => setSelectedBadge(badge.id)}
                                            />
                                            {isSelected && <div className="absolute top-2 right-2 text-[#33E6FF]"><CheckCircle2 size={16} fill="currentColor" className="text-[#0F1C2E]" /></div>}
                                            <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-3 ${badge.bg} ${badge.border} shadow-lg`}>
                                                <Icon size={24} color={badge.color} />
                                            </div>
                                            <span className={`text-sm font-bold text-center ${isSelected ? 'text-white' : 'text-[#8899AA]'}`}>{badge.name}</span>
                                        </label>
                                    
            )
                                })}
                            </div>
                        </div>

                        {/* Add Points */}
                        <div>
                            <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#1A2A3A] text-xs font-bold text-[#8899AA]">3</span>
                                Add Reward Points <span className="text-xs font-medium text-[#445566] ml-2">(Balance: 4,250 pts)</span>
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {POINTS_OPTIONS.map(pts => (
                                    <button
                                        type="button"
                                        key={pts}
                                        onClick={() => setSelectedPoints(pts)}
                                        className={`px-6 py-2.5 rounded-xl font-bold text-sm border-2 transition-colors ${selectedPoints === pts ? 'bg-[#00E5A0]/10 border-[#00E5A0] text-[#00E5A0]' : 'bg-[#152336] border-[#2A3A4A] text-[#8899AA] hover:border-[#445566]'}`}
                                    >
                                        +{pts} pts
                                    </button>
                                ))}
                                <div className="relative shrink-0">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8899AA] text-sm">+</span>
                                    <input
                                        type="number"
                                        placeholder="Custom..."
                                        className="w-28 bg-[#152336] border border-[#2A3A4A] rounded-xl pl-7 pr-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#00E5A0]"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Write Message */}
                        <div>
                            <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#1A2A3A] text-xs font-bold text-[#8899AA]">4</span>
                                Write your appreciation
                            </h3>
                            <div className="border border-[#2A3A4A] rounded-2xl bg-[#152336] overflow-hidden focus-within:border-[#33E6FF] transition-colors">
                                <div className="p-3 border-b border-[#2A3A4A] flex gap-2 bg-[#1A2A3A]">
                                    <button type="button" className="p-1.5 text-[#8899AA] hover:text-white rounded"><b className="font-serif">B</b></button>
                                    <button type="button" className="p-1.5 text-[#8899AA] hover:text-white rounded"><i className="font-serif italic">I</i></button>
                                    <div className="w-px h-6 bg-[#2A3A4A] mx-1 mt-0.5"></div>
                                    <button type="button" className="text-xs font-semibold px-2 py-1 bg-[#2A3A4A] text-[#8899AA] rounded hover:text-white">GIF</button>
                                    <button type="button" className="text-xs font-semibold px-2 py-1 bg-[#2A3A4A] text-[#8899AA] rounded hover:text-white">Emoji</button>
                                </div>
                                <textarea
                                    rows={4}
                                    placeholder="Tell everyone what John did that was so amazing..."
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    className="w-full bg-transparent border-none p-4 text-white placeholder:text-[#445566] focus:ring-0 resize-none outline-none"
                                ></textarea>
                            </div>
                        </div>

                        {/* Submit Area */}
                        <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-[#1A2A3A] gap-4">
                            <div className="flex items-center gap-4 border border-[#2A3A4A] bg-[#152336] p-1.5 rounded-xl">
                                <button type="button" onClick={() => setVisibility('public')} className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${visibility === 'public' ? 'bg-[#33E6FF]/10 text-[#33E6FF]' : 'text-[#8899AA] hover:text-white'}`}>
                                    <Eye size={16} /> Public Feed
                                </button>
                                <button type="button" onClick={() => setVisibility('private')} className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${visibility === 'private' ? 'bg-[#1A2A3A] border border-[#2A3A4A] text-white' : 'text-[#8899AA] hover:text-white'}`}>
                                    <EyeOff size={16} /> Private
                                </button>
                            </div>

                            <button
                                type="submit"
                                disabled={!selectedBadge || isSubmitting}
                                className={`px-8 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${!selectedBadge ? 'bg-[#1A2A3A] text-[#445566] cursor-not-allowed' : 'bg-[#33E6FF] text-[#0A1420] hover:bg-[#29b8cc] hover:shadow-[0_0_20px_rgba(51,230,255,0.3)]'}`}
                            >
                                {isSubmitting ? (
                                    <span className="w-5 h-5 border-2 border-[#0A1420]/30 border-t-[#0A1420] rounded-full animate-spin"></span>
                                ) : (
                                    <><Send size={18} /> Send Recognition</>
                                )}
                            </button>
                        </div>

                    </form>
                </div>

                {/* Right Column: Preview */}
                <div className="col-span-1 border border-[#2A3A4A] rounded-3xl bg-[#0F1C2E] p-6 shadow-xl h-max sticky top-24 hidden lg:block">
                    <h3 className="text-white font-bold mb-6 flex items-center gap-2">
                        <Eye size={18} className="text-[#8899AA]" /> Live Preview
                    </h3>

                    {(selectedBadge || message) ? (
                        <div className="bg-[#152336] border border-[#2A3A4A] rounded-2xl p-6 shadow-2xl relative overflow-hidden">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-[#1A2A3A] flex items-center justify-center text-xs font-bold text-white">You</div>
                                    <ArrowRight size={14} className="text-[#445566]" />
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#33E6FF] to-blue-500 flex items-center justify-center text-xs font-bold text-white">JD</div>
                                </div>
                                {selectedPoints > 0 && (
                                    <span className="bg-[#00E5A0]/10 text-[#00E5A0] text-xs font-bold px-2 py-1 rounded">+{selectedPoints} pts</span>
                                )}
                            </div>

                            {selectedBadge && (
                                <div className="flex items-center gap-2 mb-3">
                                    {BADGES.filter(b => b.id === selectedBadge).map(b => (
                                        <div key={b.id} className={`flex items-center gap-1.5 px-3 py-1 ${b.bg} ${b.border} border rounded-full`}>
                                            <b.icon size={12} color={b.color} />
                                            <span className="text-xs font-bold" style={{ color: b.color }}>{b.name}</span>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <p className="text-white text-sm whitespace-pre-wrap">{message || <span className="text-[#445566] italic">Your appreciation message will appear here...</span>}</p>
                        </div>
                    ) : (
                        <div className="border border-dashed border-[#2A3A4A] rounded-2xl flex flex-col items-center justify-center p-12 text-center text-[#445566]">
                            <Medal size={48} strokeWidth={1} className="mb-4 opacity-50" />
                            <p className="text-sm">Select a badge to preview your recognition card.</p>
                        </div>
                    )}

                    <div className="mt-8 pt-6 border-t border-[#1A2A3A]">
                        <h4 className="text-sm font-bold text-[#8899AA] mb-4 uppercase tracking-wider">Guidelines</h4>
                        <ul className="text-sm text-[#445566] space-y-3">
                            <li className="flex gap-2"><CheckCircle2 size={16} className="text-[#00E5A0] shrink-0" /> Be specific about what they did well.</li>
                            <li className="flex gap-2"><CheckCircle2 size={16} className="text-[#00E5A0] shrink-0" /> Tie it back to company core values.</li>
                            <li className="flex gap-2"><CheckCircle2 size={16} className="text-[#00E5A0] shrink-0" /> Avoid generic "good job" messages.</li>
                        </ul>
                    </div>
                </div>

            </div>

        </div>
    
        </Page>
    );
}
