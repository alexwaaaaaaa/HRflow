"use client";
import React, { useState } from "react";
import {
    Network, Search, Filter, Download, UserPlus, Target, ChevronRight
} from "lucide-react";

// Mock Data
const SKILLS = ['React', 'Node.js', 'System Design', 'AWS', 'GraphQL', 'Docker', 'Testing', 'Agile'];
const TEAM = [
    { id: 1, name: "Arjun Kumar", role: "SDE II", avatar: "https://i.pravatar.cc/150?u=1", scores: [5, 4, 3, 2, 4, 3, 5, 4] },
    { id: 2, name: "Riya Sharma", role: "SDE I", avatar: "https://i.pravatar.cc/150?u=2", scores: [4, 3, 2, 1, 3, 2, 3, 3] },
    { id: 3, name: "Vikram Singh", role: "Sr. SDE", avatar: "https://i.pravatar.cc/150?u=3", scores: [5, 5, 5, 4, 5, 4, 4, 5] },
    { id: 4, name: "Sneha Patel", role: "SDE II", avatar: "https://i.pravatar.cc/150?u=4", scores: [3, 5, 4, 4, 3, 5, 4, 4] },
    { id: 5, name: "Rahul Dev", role: "Tech Lead", avatar: "https://i.pravatar.cc/150?u=5", scores: [5, 5, 5, 5, 4, 5, 5, 5] },
];

const getColorForScore = (score: number) => {
    if (score === 5) return 'bg-[#00E5A0] text-[#0A1420] border-[#00E5A0]'; // Expert
    if (score === 4) return 'bg-[#33E6FF] text-[#0A1420] border-[#33E6FF]'; // Advanced
    if (score === 3) return 'bg-[#FFB020] text-[#0A1420] border-[#FFB020]'; // Intermediate
    if (score === 2) return 'bg-[#FF4444] text-white border-[#FF4444]'; // Beginner
    return 'bg-[#1A2A3A] text-[#8899AA] border-[#2A3A4A]'; // None
};

export default function SkillMatrixScreen() {
    return (
        <div className="p-6 max-w-[1400px] mx-auto min-h-[calc(100vh-80px)]">

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                        <Network size={28} className="text-[#33E6FF]" /> Team Skill Matrix
                    </h1>
                    <p className="text-[#8899AA]">Visualize your team's capabilities, identify experts, and spot skill gaps.</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 border border-[#2A3A4A] bg-[#0F1C2E] text-white rounded-xl font-medium hover:bg-[#1A2A3A] transition-colors flex items-center gap-2">
                        <Download size={18} className="text-[#8899AA]" /> Export
                    </button>
                    <button className="px-5 py-2 bg-[#152336] text-white border border-[#2A3A4A] font-bold rounded-xl hover:bg-[#1A2A3A] transition-colors flex items-center gap-2">
                        <UserPlus size={18} className="text-[#33E6FF]" /> Add Member
                    </button>
                </div>
            </div>

            <div className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-2xl shadow-xl overflow-hidden mb-8">
                <div className="p-6 border-b border-[#1A2A3A] flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-[#0A1420]">
                    <div className="flex gap-2 text-xs font-semibold text-[#8899AA]">
                        <span className="flex items-center gap-1.5"><div className="w-3 h-3 rounded bg-[#00E5A0]"></div> Expert (5)</span>
                        <span className="flex items-center gap-1.5 ml-3"><div className="w-3 h-3 rounded bg-[#33E6FF]"></div> Advanced (4)</span>
                        <span className="flex items-center gap-1.5 ml-3"><div className="w-3 h-3 rounded bg-[#FFB020]"></div> Intermediate (3)</span>
                        <span className="flex items-center gap-1.5 ml-3"><div className="w-3 h-3 rounded bg-[#FF4444]"></div> Beginner (1-2)</span>
                    </div>
                    <div className="flex gap-3">
                        <div className="relative">
                            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#445566]" />
                            <input type="text" placeholder="Search..." className="bg-[#1A2A3A] border border-[#2A3A4A] rounded-lg pl-9 pr-4 py-1.5 text-white text-sm focus:outline-none focus:border-[#33E6FF]" />
                        </div>
                        <button className="p-1.5 bg-[#1A2A3A] border border-[#2A3A4A] text-[#8899AA] rounded-lg hover:text-white transition-colors"><Filter size={18} /></button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[1000px]">
                        <thead>
                            <tr className="text-xs uppercase tracking-wider text-[#8899AA] border-b border-[#1A2A3A]">
                                <th className="p-4 font-semibold sticky left-0 bg-[#0F1C2E] min-w-[200px] z-10 border-r border-[#1A2A3A]">Team Member</th>
                                {SKILLS.map((skill, i) => (
                                    <th key={i} className="p-4 font-semibold text-center w-24">
                                        <div className="transform -rotate-45 origin-bottom-left absolute translate-y-6 translate-x-2 w-max text-xs">{skill}</div>
                                        <div className="h-20"></div>
                                    </th>
                                ))}
                                <th className="p-4 font-semibold text-center">Avg Score</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1A2A3A]">
                            {TEAM.map(member => {
                                const avg = (member.scores.reduce((a, b) => a + b, 0) / member.scores.length).toFixed(1);
                                return (
                                    <tr key={member.id} className="hover:bg-[#152336] transition-colors group">
                                        <td className="p-4 sticky left-0 bg-[#0F1C2E] group-hover:bg-[#152336] border-r border-[#1A2A3A] z-10">
                                            <div className="flex items-center gap-3">
                                                <img src={member.avatar} className="w-8 h-8 rounded-full border border-[#2A3A4A]" alt="avatar" />
                                                <div>
                                                    <p className="font-semibold text-white text-sm">{member.name}</p>
                                                    <p className="text-[10px] text-[#8899AA]">{member.role}</p>
                                                </div>
                                            </div>
                                        </td>
                                        {member.scores.map((score, i) => (
                                            <td key={i} className="p-2 text-center">
                                                <div className={`mx-auto w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm border-2 shadow-sm transition-transform hover:scale-110 cursor-pointer ${getColorForScore(score)}`}>
                                                    {score}
                                                </div>
                                            </td>
                                        ))}
                                        <td className="p-4 text-center">
                                            <span className="font-bold text-white bg-[#1A2A3A] px-3 py-1.5 rounded-lg border border-[#2A3A4A]">{avg}</span>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
}
