"use client";

import Page from "@/components/ui/Page";
import React, { useState } from 'react';
import {
    Users, Search, Star, Award, ChevronRight, CheckCircle2, UserPlus, Info
} from 'lucide-react';

const TEAM_MEMBERS = [
    { id: 1, name: "Michael Chen", role: "DevOps Lead", dept: "Engineering" },
    { id: 2, name: "Emma Wilson", role: "Marketing Spec", dept: "Marketing" },
    { id: 3, name: "David Rodriguez", role: "Designer", dept: "Design" },
    { id: 4, name: "Jessica Kim", role: "Senior Engineer", dept: "Engineering" },
    { id: 5, name: "Alex Patel", role: "Product Manager", dept: "Product" },
];

const PREVIOUS_NOMINATIONS = [
    { id: 101, nominee: "Emma Wilson", category: "Employee of the Month", status: "Review pending", date: "Oct 24, 2023" },
    { id: 102, nominee: "Alex Patel", category: "Culture Champion", status: "Approved", date: "Sep 15, 2023" },
];

export default function PeerNominationScreen() {
    const [activeStep, setActiveStep] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedNominee, setSelectedNominee] = useState<number | null>(null);
    const [evidence, setEvidence] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const CATEGORIES = [
        { id: 'eom', name: 'Employee of the Month', icon: Star, color: '#FFB020', desc: "Consistently going above and beyond in their role." },
        { id: 'culture', name: 'Culture Champion', icon: Users, color: '#33E6FF', desc: "Embodying the company core values every day." },
        { id: 'innovation', name: 'Innovation Award', icon: Award, color: '#9D00FF', desc: "Developing a creative solution to a complex problem." },
    ];

    const handleNext = () => {
        if (activeStep < 3) setActiveStep(activeStep + 1);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setActiveStep(4); // Success step
        }, 1500);
    };

    return (
        <Page
            title="Peer Nomination"
            subtitle="Nominate your colleagues for major awards and recognition programs."
            breadcrumbs={[{ label: "Engagement", href: "/engagement" }, { label: "Rr", href: "/engagement/rr" }, { label: "Nominate" }]}
            maxWidth="1200px"
        >

        <div className="p-6 max-w-[1200px] mx-auto min-h-[calc(100vh-80px)] font-sans">

            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-white mb-2 flex items-center gap-3">
                    <UserPlus size={32} className="text-[#33E6FF]" /> Peer Nomination
                </h1>
                <p className="text-[#8899AA]">Nominate your colleagues for major awards and recognition programs.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Column: Form Setup */}
                <div className="col-span-1 lg:col-span-2 space-y-8">

                    {activeStep < 4 ? (
                        <div className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-3xl p-8 shadow-xl">
                            {/* Progress Header */}
                            <div className="flex items-center justify-between mb-8 relative">
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-[#1A2A3A] z-0"></div>
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-[#33E6FF] z-0 transition-all duration-500" style={{ width: `${((activeStep - 1) / 2) * 100}%` }}></div>

                                {[1, 2, 3].map(step => (
                                    <div key={step} className="relative z-10 flex flex-col items-center gap-2">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-colors ${activeStep >= step ? 'bg-[#33E6FF] border-[#33E6FF] text-[#0A1420] shadow-[0_0_15px_rgba(51,230,255,0.4)]' : 'bg-[#152336] border-[#2A3A4A] text-[#8899AA]'}`}>
                                            {activeStep > step ? <CheckCircle2 size={20} /> : step}
                                        </div>
                                        <span className={`text-xs font-bold uppercase tracking-wider hidden sm:block ${activeStep >= step ? 'text-[#33E6FF]' : 'text-[#8899AA]'}`}>
                                            {step === 1 ? 'Category' : step === 2 ? 'Nominee' : 'Evidence'}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* Step Content */}
                            <div className="min-h-[300px]">
                                {activeStep === 1 && (
                                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
                                        <h2 className="text-xl font-bold text-white mb-6">What are you nominating them for?</h2>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            {CATEGORIES.map(cat => {
                                                const Icon = cat.icon;
                                                const isSelected = selectedCategory === cat.id;
                                                return (


                                                    <label key={cat.id} className={`cursor-pointer border-2 rounded-2xl p-6 transition-all ${isSelected ? 'border-[#33E6FF] bg-[#1A2A3A]' : 'border-[#2A3A4A] bg-[#152336] hover:border-[#445566]'}`}>
                                                        <input type="radio" name="category" className="sr-only" checked={isSelected} onChange={() => setSelectedCategory(cat.id)} />
                                                        <Icon size={32} color={cat.color} className="mb-4" />
                                                        <h3 className={`font-bold text-sm mb-2 ${isSelected ? 'text-white' : 'text-[#CCDDEE]'}`}>{cat.name}</h3>
                                                        <p className="text-xs text-[#8899AA] leading-relaxed">{cat.desc}</p>
                                                    </label>
                                                
            )
                                            })}
                                        </div>
                                        <div className="flex justify-end pt-8">
                                            <button onClick={handleNext} disabled={!selectedCategory} className={`px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-colors ${!selectedCategory ? 'bg-[#1A2A3A] text-[#445566] cursor-not-allowed' : 'bg-[#33E6FF] text-[#0A1420] hover:bg-[#29b8cc]'}`}>
                                                Next Step <ChevronRight size={18} />
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {activeStep === 2 && (
                                    <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
                                        <h2 className="text-xl font-bold text-white mb-6">Who deserves this award?</h2>
                                        <div className="relative mb-6">
                                            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#445566]" />
                                            <input type="text" placeholder="Search by name, role, or department..." className="w-full bg-[#152336] border border-[#2A3A4A] rounded-xl pl-12 pr-4 py-4 text-white placeholder:text-[#445566] focus:outline-none focus:border-[#33E6FF]" />
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                                            {TEAM_MEMBERS.map(user => (
                                                <label key={user.id} className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${selectedNominee === user.id ? 'bg-[#33E6FF]/10 border-[#33E6FF]' : 'bg-[#152336] border-[#2A3A4A] hover:border-[#445566]'}`}>
                                                    <input type="radio" name="nominee" className="sr-only" checked={selectedNominee === user.id} onChange={() => setSelectedNominee(user.id)} />
                                                    <div className="w-12 h-12 rounded-full border-2 border-[#152336] bg-gradient-to-tr from-[#33E6FF] to-blue-500 flex items-center justify-center text-white font-bold">{user.name.charAt(0)}</div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className={`text-base font-bold truncate ${selectedNominee === user.id ? 'text-white' : 'text-[#CCDDEE]'}`}>{user.name}</p>
                                                        <p className="text-xs text-[#8899AA] truncate">{user.role} • {user.dept}</p>
                                                    </div>
                                                    {selectedNominee === user.id && <CheckCircle2 size={20} className="text-[#33E6FF]" />}
                                                </label>
                                            ))}
                                        </div>
                                        <div className="flex justify-between pt-8">
                                            <button onClick={() => setActiveStep(1)} className="px-6 py-3 rounded-xl font-bold text-[#8899AA] hover:text-white transition-colors bg-[#1A2A3A]">Back</button>
                                            <button onClick={handleNext} disabled={!selectedNominee} className={`px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-colors ${!selectedNominee ? 'bg-[#1A2A3A] text-[#445566] cursor-not-allowed' : 'bg-[#33E6FF] text-[#0A1420] hover:bg-[#29b8cc]'}`}>
                                                Next Step <ChevronRight size={18} />
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {activeStep === 3 && (
                                    <form onSubmit={handleSubmit} className="space-y-4 animate-in fade-in slide-in-from-right-4">
                                        <h2 className="text-xl font-bold text-white mb-2">Provide your evidence</h2>
                                        <p className="text-[#8899AA] text-sm mb-6">Tell the committee why {TEAM_MEMBERS.find(m => m.id === selectedNominee)?.name} deserves the {CATEGORIES.find(c => c.id === selectedCategory)?.name}. Be specific and provide concrete examples.</p>

                                        <div className="space-y-3">
                                            <label className="text-sm font-bold text-white">Detailed Justification</label>
                                            <textarea
                                                rows={6}
                                                required
                                                value={evidence}
                                                onChange={(e) => setEvidence(e.target.value)}
                                                placeholder="In Q3, they single-handedly restructured the database which improved query speeds by 40%..."
                                                className="w-full bg-[#152336] border border-[#2A3A4A] rounded-xl p-4 text-white placeholder:text-[#445566] focus:outline-none focus:border-[#33E6FF] resize-none"
                                            ></textarea>
                                        </div>

                                        <div className="p-4 bg-[#33E6FF]/10 border border-[#33E6FF]/20 rounded-xl flex gap-3 text-sm mt-6">
                                            <Info size={18} className="text-[#33E6FF] shrink-0 mt-0.5" />
                                            <p className="text-[#CCDDEE]">The awards committee reviews all nominations on the last Friday of every month. You will be notified if your nominee is selected.</p>
                                        </div>

                                        <div className="flex justify-between pt-8">
                                            <button type="button" onClick={() => setActiveStep(2)} className="px-6 py-3 rounded-xl font-bold text-[#8899AA] hover:text-white transition-colors bg-[#1A2A3A]">Back</button>
                                            <button type="submit" disabled={!evidence || isSubmitting} className={`px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-colors ${!evidence ? 'bg-[#1A2A3A] text-[#445566] cursor-not-allowed' : 'bg-[#00E5A0] text-[#0A1420] hover:bg-[#00c98d] shadow-[0_5px_15px_rgba(0,229,160,0.3)]'}`}>
                                                {isSubmitting ? <span className="w-5 h-5 border-2 border-[#0A1420]/30 border-t-[#0A1420] rounded-full animate-spin"></span> : 'Submit Nomination'}
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-3xl p-12 shadow-xl text-center flex flex-col items-center animate-in zoom-in-95 duration-500">
                            <div className="w-24 h-24 bg-[#00E5A0]/20 rounded-full flex items-center justify-center mb-6">
                                <CheckCircle2 size={48} className="text-[#00E5A0]" />
                            </div>
                            <h2 className="text-3xl font-black text-white mb-4">Nomination Submitted!</h2>
                            <p className="text-[#8899AA] text-lg max-w-md mx-auto mb-8">Thank you for recognizing {TEAM_MEMBERS.find(m => m.id === selectedNominee)?.name}. The committee will review your submission shortly.</p>
                            <button
                                onClick={() => { setActiveStep(1); setSelectedCategory(null); setSelectedNominee(null); setEvidence(''); }}
                                className="px-8 py-3.5 bg-[#1A2A3A] border border-[#2A3A4A] text-white font-bold rounded-xl hover:bg-[#2A3A4A] transition-colors"
                            >
                                Nominate Someone Else
                            </button>
                        </div>
                    )}
                </div>

                {/* Right Sidebar: My Nominations */}
                <div className="col-span-1 space-y-6">
                    <div className="bg-[#0F1C2E] border border-[#2A3A4A] rounded-3xl p-6 shadow-xl">
                        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                            <Star size={20} className="text-[#FFB020]" /> My Past Nominations
                        </h3>

                        <div className="space-y-4">
                            {PREVIOUS_NOMINATIONS.map(nom => (
                                <div key={nom.id} className="p-4 rounded-2xl border border-[#1A2A3A] bg-[#152336] hover:border-[#33E6FF]/30 transition-colors">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-sm font-bold text-white">{nom.nominee}</span>
                                        <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded ${nom.status === 'Approved' ? 'bg-[#00E5A0]/10 text-[#00E5A0]' : 'bg-[#FFB020]/10 text-[#FFB020]'}`}>
                                            {nom.status}
                                        </span>
                                    </div>
                                    <p className="text-xs text-[#33E6FF] font-medium mb-3">{nom.category}</p>
                                    <p className="text-[10px] font-bold text-[#8899AA] tracking-wider uppercase">Submitted: {nom.date}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    
        </Page>
    );
}
