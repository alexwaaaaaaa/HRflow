"use client";

import React, { useState } from 'react';
import {
    MapPin, Search, Calendar, Save, CheckCircle2, ChevronRight
} from 'lucide-react';

export default function FieldVisitRequest() {
    return (
        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-4xl mx-auto space-y-6">

                {/* Header */}
                <div className="mb-8 border-b border-[#1A2A3A] pb-6">
                    <h1 className="text-2xl font-bold text-white mb-2">Log Field Visit</h1>
                    <p className="text-sm text-[#8899AA]">Submit official out-of-office client visits or site travel for attendance marking.</p>
                </div>

                <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-6 mb-6">
                    <h2 className="text-lg font-bold text-white mb-6 border-b border-[#1A2A3A] pb-4 flex items-center">
                        <MapPin size={18} className="mr-2 text-[#FFB800]" /> Visit Details
                    </h2>

                    <div className="grid grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className="block text-sm font-bold text-[#8899AA] mb-2 cursor-pointer">Date of Visit</label>
                            <input
                                type="date"
                                className="w-full bg-[#060B14] border border-[#2A3A4A] text-white rounded-lg p-3 outline-none focus:border-[#0066FF] transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-[#8899AA] mb-2 cursor-pointer">Client / Site Name</label>
                            <input
                                type="text"
                                placeholder="e.g. Acme Corp Headquarters"
                                className="w-full bg-[#060B14] border border-[#2A3A4A] text-white rounded-lg p-3 outline-none focus:border-[#0066FF] transition-colors"
                            />
                        </div>
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-bold text-[#8899AA] mb-2 cursor-pointer">Meeting Location</label>
                        <div className="relative">
                            <Search size={16} className="absolute left-3 top-3.5 text-[#556677]" />
                            <input
                                type="text"
                                placeholder="Search address to tag location..."
                                className="w-full bg-[#060B14] border border-[#2A3A4A] text-white rounded-lg pl-10 pr-3 py-3 outline-none focus:border-[#0066FF] transition-colors"
                            />
                        </div>
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-bold text-[#8899AA] mb-2 cursor-pointer">Agenda / Remarks</label>
                        <textarea
                            rows={3}
                            placeholder="Brief description of the visit..."
                            className="w-full bg-[#060B14] border border-[#2A3A4A] text-white rounded-lg p-3 outline-none focus:border-[#0066FF] transition-colors resize-none"
                        ></textarea>
                    </div>

                    <div className="flex justify-end pt-4 border-t border-[#1A2A3A]">
                        <button className="px-6 py-2.5 bg-[#FFB800] text-[#060B14] font-bold text-sm rounded-lg hover:bg-[#e6a600] transition-colors shadow-[0_0_15px_rgba(255,184,0,0.3)]">
                            Submit Log
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}
