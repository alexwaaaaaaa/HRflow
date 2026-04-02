"use client";
import React, { useState } from 'react';
import { Sparkles, Calendar, DollarSign, Target, Award, Users, ChevronRight } from 'lucide-react';

export default function FeatureDiscoveryScreen() {
    const [selectedFeature, setSelectedFeature] = useState('performance');

    const features = [
        { id: 'performance', icon: <Target size={24} />, title: 'Performance & OKRs', desc: 'Align teams with continuous feedback, goal tracking, and 360° reviews.', color: 'text-sky-400', bg: 'bg-sky-500/10' },
        { id: 'payroll', icon: <DollarSign size={24} />, title: 'Automated Payroll', desc: 'Execute 1-click payroll with built-in compliance for PF, ESI, and PT.', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
        { id: 'leave', icon: <Calendar size={24} />, title: 'Time & Attendance', desc: 'Geofenced clock-ins, complex shift scheduling, and smart leave policies.', color: 'text-amber-400', bg: 'bg-amber-500/10' },
        { id: 'rewards', icon: <Award size={24} />, title: 'Rewards & Recognition', desc: 'Boost morale with peer-to-peer recognition, leaderboards, and instant badges.', color: 'text-purple-400', bg: 'bg-purple-500/10' },
        { id: 'recruitment', icon: <Users size={24} />, title: 'Applicant Tracking', desc: 'Manage your entire hiring pipeline from job posting to offer rollout.', color: 'text-rose-400', bg: 'bg-rose-500/10' },
    ];

    return (
        <div className="min-h-screen p-6 max-w-6xl mx-auto space-y-8">
            <div className="text-center mb-12">
                <div className="w-16 h-16 bg-indigo-500/10 rounded-2xl mx-auto flex items-center justify-center mb-4 border border-indigo-500/20 shadow-xl">
                    <Sparkles className="text-indigo-400" size={28} />
                </div>
                <h1 className="text-3xl font-black text-white mb-3">Discover the Power of Kaarya</h1>
                <p className="text-[#8899AA] text-base max-w-2xl mx-auto">
                    You've finished the core setup. Explore the premium modules designed to scale your performance and culture.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Feature List */}
                <div className="col-span-1 space-y-3">
                    {features.map((feature) => (
                        <button
                            key={feature.id}
                            onClick={() => setSelectedFeature(feature.id)}
                            className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-4 ${selectedFeature === feature.id
                                    ? 'bg-[#131B2B] border-[#3A4A5A] shadow-lg translate-x-2'
                                    : 'bg-[#0A1420] border-[#1A2A3A] hover:bg-[#060D1A] hover:border-[#2A3A4A]'
                                }`}
                        >
                            <div className={`mt-1 w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${feature.bg} ${feature.color}`}>
                                {feature.icon}
                            </div>
                            <div>
                                <h3 className={`font-bold mb-1 ${selectedFeature === feature.id ? 'text-white' : 'text-[#CCDDEE]'}`}>{feature.title}</h3>
                                <p className={`text-xs ${selectedFeature === feature.id ? 'text-[#8899AA]' : 'text-[#556677]'}`}>{feature.desc}</p>
                            </div>
                        </button>
                    ))}
                </div>

                {/* Feature Preview Area */}
                <div className="col-span-1 lg:col-span-2">
                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl h-[500px] flex flex-col overflow-hidden relative group">

                        {/* Dynamic Backgrounds based on selection */}
                        {selectedFeature === 'performance' && <div className="absolute inset-0 bg-gradient-to-br from-sky-900/20 to-transparent opacity-50" />}
                        {selectedFeature === 'payroll' && <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 to-transparent opacity-50" />}
                        {selectedFeature === 'leave' && <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 to-transparent opacity-50" />}
                        {selectedFeature === 'rewards' && <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-transparent opacity-50" />}
                        {selectedFeature === 'recruitment' && <div className="absolute inset-0 bg-gradient-to-br from-rose-900/20 to-transparent opacity-50" />}

                        <div className="flex-1 p-8 flex flex-col justify-center items-center text-center relative z-10 transition-opacity animate-in fade-in duration-500" key={selectedFeature}>

                            {/* Mockup SVG Visuals would go here. Using a placeholder container for now. */}
                            <div className="w-full max-w-md h-64 bg-[#060D1A] border border-[#2A3A4A] rounded-xl shadow-2xl mb-8 flex items-center justify-center overflow-hidden relative">
                                {/* Just a decorative element to make the box look like a software UI */}
                                <div className="absolute top-0 inset-x-0 h-8 bg-[#131B2B] border-b border-[#2A3A4A] flex items-center px-3 gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500/50" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50" />
                                </div>
                                <span className="text-[#556677] font-mono text-sm tracking-widest mt-4">Interactive Preview Area</span>
                            </div>

                            <h2 className="text-2xl font-black text-white mb-3">
                                {features.find(f => f.id === selectedFeature)?.title}
                            </h2>
                            <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-lg font-bold flex items-center gap-2 transition-colors">
                                Enable Module <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
