"use client";
import React, { useState } from "react";
import {
    Briefcase, Plus, UploadCloud, Link as LinkIcon, FileText, Calendar, CheckCircle2, Clock, XCircle, Search
} from "lucide-react";

const EXTERNAL_LOGS = [
    { id: 1, title: "AWS Certified Solutions Architect", type: "Certification", provider: "Amazon Web Services", date: "Aug 15, 2025", status: "approved" },
    { id: 2, title: "React Advanced Conference 2025", type: "Conference", provider: "React Day", date: "Sep 20, 2025", status: "pending" },
    { id: 3, title: "Agile Scrum Master", type: "Course", provider: "Scrum.org", date: "Feb 10, 2025", status: "rejected" },
];

export default function ExternalTrainingScreen() {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="p-6 max-w-[1200px] mx-auto min-h-[calc(100vh-80px)]">

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                        <Briefcase size={28} className="text-purple-400" /> External Learning & Certifications
                    </h1>
                    <p className="text-[#8899AA]">Log your self-paced learning, external courses, and professional certifications to earn XP and update your skill matrix.</p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="px-5 py-2.5 bg-[#00E5A0] text-[#0A1420] font-bold rounded-xl hover:bg-[#00c98d] transition-colors flex items-center gap-2 shadow-lg shadow-[#00E5A0]/20 shrink-0"
                >
                    <Plus size={20} /> Log External Training
                </button>
            </div>

            <div className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-2xl shadow-xl overflow-hidden mb-8">
                <div className="p-6 border-b border-[#1A2A3A] flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                    <h2 className="text-xl font-bold text-white">Your Logged Learning</h2>
                    <div className="relative">
                        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#445566]" />
                        <input type="text" placeholder="Search logs..." className="bg-[#0A1420] border border-[#2A3A4A] rounded-xl pl-10 pr-4 py-2 text-white text-sm focus:outline-none focus:border-[#33E6FF]" />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className="text-xs uppercase tracking-wider text-[#8899AA] bg-[#0A1420] border-b border-[#1A2A3A]">
                                <th className="p-4 font-semibold">Training Title</th>
                                <th className="p-4 font-semibold">Type</th>
                                <th className="p-4 font-semibold">Provider</th>
                                <th className="p-4 font-semibold">Completion Date</th>
                                <th className="p-4 font-semibold">Status</th>
                                <th className="p-4 text-right font-semibold">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1A2A3A]">
                            {EXTERNAL_LOGS.map(log => (
                                <tr key={log.id} className="hover:bg-[#152336] transition-colors group">
                                    <td className="p-4">
                                        <span className="font-semibold text-white group-hover:text-purple-400 transition-colors">{log.title}</span>
                                    </td>
                                    <td className="p-4 text-sm text-[#8899AA]">{log.type}</td>
                                    <td className="p-4 text-sm text-[#8899AA]">{log.provider}</td>
                                    <td className="p-4 text-sm text-[#8899AA]">{log.date}</td>
                                    <td className="p-4">
                                        {log.status === 'approved' && <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#00E5A0] bg-[#00E5A0]/10 border border-[#00E5A0]/20 px-2 py-0.5 rounded"><CheckCircle2 size={12} /> Approved</span>}
                                        {log.status === 'pending' && <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#FFB020] bg-[#FFB020]/10 border border-[#FFB020]/20 px-2 py-0.5 rounded"><Clock size={12} /> Pending Rev</span>}
                                        {log.status === 'rejected' && <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#FF4444] bg-[#FF4444]/10 border border-[#FF4444]/20 px-2 py-0.5 rounded"><XCircle size={12} /> Rejected</span>}
                                    </td>
                                    <td className="p-4 text-right">
                                        <button className="text-xs font-semibold text-[#33E6FF] hover:underline">View Details</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Upload Modal Overlay */}
            {showModal && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
                        <div className="p-6 border-b border-[#1A2A3A] flex justify-between items-center sticky top-0 bg-[#0F1C2E] z-10">
                            <h2 className="text-2xl font-bold text-white">Log External Training</h2>
                            <button onClick={() => setShowModal(false)} className="p-2 text-[#8899AA] hover:text-white hover:bg-[#1A2A3A] rounded-xl transition-colors">
                                <XCircle size={24} />
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            <div>
                                <label className="block text-sm font-semibold text-white mb-2">Training/Certification Title <span className="text-[#FF4444]">*</span></label>
                                <input type="text" className="w-full bg-[#0A1420] border border-[#2A3A4A] text-white rounded-xl p-3 focus:outline-none focus:border-purple-500 transition-colors" placeholder="e.g. AWS Solutions Architect Prof." />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-white mb-2">Provider/Institution <span className="text-[#FF4444]">*</span></label>
                                    <input type="text" className="w-full bg-[#0A1420] border border-[#2A3A4A] text-white rounded-xl p-3 focus:outline-none focus:border-purple-500 transition-colors" placeholder="e.g. Amazon" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-white mb-2">Completion Date <span className="text-[#FF4444]">*</span></label>
                                    <input type="date" className="w-full bg-[#0A1420] border border-[#2A3A4A] text-white rounded-xl p-3 focus:outline-none focus:border-purple-500 transition-colors [color-scheme:dark]" />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-white mb-2">Learning Type</label>
                                    <select className="w-full bg-[#0A1420] border border-[#2A3A4A] text-white rounded-xl p-3 focus:outline-none focus:border-purple-500 transition-colors appearance-none">
                                        <option>Certification</option>
                                        <option>Online Course (Coursera, Udemy)</option>
                                        <option>Conference / Seminar</option>
                                        <option>Degree / Diploma</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-white mb-2">Time Spent (Hours)</label>
                                    <input type="number" className="w-full bg-[#0A1420] border border-[#2A3A4A] text-white rounded-xl p-3 focus:outline-none focus:border-purple-500 transition-colors" placeholder="24" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-white mb-2">Proof of Completion <span className="text-[#FF4444]">*</span></label>
                                <p className="text-xs text-[#8899AA] mb-3">Upload a certificate PDF/image OR provide a verification link.</p>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <div className="flex-1 border-2 border-dashed border-[#2A3A4A] bg-[#0A1420] hover:border-purple-500 hover:bg-purple-500/5 transition-colors rounded-xl flex flex-col items-center justify-center p-6 cursor-pointer group">
                                        <UploadCloud size={24} className="text-[#8899AA] group-hover:text-purple-400 mb-2" />
                                        <span className="text-sm font-semibold text-white">Upload File</span>
                                        <span className="text-[10px] text-[#8899AA]">PDF, PNG, JPG (Max 5MB)</span>
                                    </div>
                                    <div className="flex items-center justify-center text-xs font-bold text-[#445566] uppercase">OR</div>
                                    <div className="flex-1">
                                        <div className="relative h-full flex items-center">
                                            <LinkIcon size={18} className="absolute left-3 text-[#445566]" />
                                            <input type="url" placeholder="Paste credential URL..." className="w-full h-full min-h-[100px] bg-[#0A1420] border border-[#2A3A4A] text-white text-sm rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-purple-500 transition-colors" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-white mb-2">Skills Associated</label>
                                <input type="text" className="w-full bg-[#0A1420] border border-[#2A3A4A] text-white rounded-xl p-3 focus:outline-none focus:border-purple-500 transition-colors" placeholder="e.g. React, Node.js, Leadership (comma separated)" />
                            </div>

                        </div>

                        <div className="p-6 border-t border-[#1A2A3A] bg-[#152336] flex justify-end gap-3 sticky bottom-0">
                            <button onClick={() => setShowModal(false)} className="px-6 py-2 border border-[#2A3A4A] text-white font-semibold rounded-xl hover:bg-[#1A2A3A] transition-colors">Cancel</button>
                            <button className="px-6 py-2 bg-purple-500 text-white font-bold rounded-xl hover:bg-purple-600 transition-colors shadow-lg shadow-purple-500/20" onClick={() => setShowModal(false)}>Submit for Review</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}
