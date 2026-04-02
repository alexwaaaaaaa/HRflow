"use client";
import React, { useState } from 'react';
import {
    ArrowLeft, Search, User, Laptop, Calendar, MessageSquare, CheckCircle2
} from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function AssetAssignmentScreen() {
    const [assetId, setAssetId] = useState('');
    const [employee, setEmployee] = useState('');
    const [date, setDate] = useState('');
    const [condition, setCondition] = useState('Excellent');
    const [notes, setNotes] = useState('');
    const [isTemporary, setIsTemporary] = useState(false);
    const [returnDate, setReturnDate] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Assigning asset:', { assetId, employee, date, condition, notes, isTemporary, returnDate });
    };

    return (
        <div className="p-6 max-w-[800px] mx-auto min-h-[calc(100vh-80px)] font-sans">

            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <Link href="/it/assets" className="p-2 border border-[#2A3A4A] bg-[#1A2A3A] text-[#8899AA] rounded-xl hover:bg-[#2A3A4A] hover:text-white transition-colors">
                    <ArrowLeft size={20} />
                </Link>
                <div>
                    <h1 className="text-3xl font-extrabold text-white mb-2">Assign Asset</h1>
                    <p className="text-[#8899AA]">Allocate hardware to an employee and record its condition.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">

                <div className="bg-[#0F1C2E] border border-[#2A3A4A] rounded-3xl p-6 md:p-8 shadow-xl space-y-6">

                    {/* Asset Selection */}
                    <div>
                        <label className="block text-xs font-bold text-[#8899AA] uppercase tracking-wider mb-2 flex items-center gap-2"><Laptop size={14} /> Select Asset</label>
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8899AA]" size={18} />
                            <input
                                type="text"
                                placeholder="Search by Asset ID, Name, or Serial..."
                                value={assetId}
                                onChange={e => setAssetId(e.target.value)}
                                className="w-full bg-[#1A2A3A] border border-[#2A3A4A] text-white text-sm rounded-xl pl-12 pr-4 py-3.5 focus:outline-none focus:border-[#33E6FF] transition-colors"
                                required
                            />
                        </div>
                        <p className="text-xs text-[#8899AA] mt-2">Only displaying 'Available' assets in the unassigned pool.</p>
                    </div>

                    {/* Employee Selection */}
                    <div>
                        <label className="block text-xs font-bold text-[#8899AA] uppercase tracking-wider mb-2 flex items-center gap-2"><User size={14} /> Assign To Employee</label>
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8899AA]" size={18} />
                            <input
                                type="text"
                                placeholder="Search by Employee Name or Email..."
                                value={employee}
                                onChange={e => setEmployee(e.target.value)}
                                className="w-full bg-[#1A2A3A] border border-[#2A3A4A] text-white text-sm rounded-xl pl-12 pr-4 py-3.5 focus:outline-none focus:border-[#33E6FF] transition-colors"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Date */}
                        <div>
                            <label className="block text-xs font-bold text-[#8899AA] uppercase tracking-wider mb-2 flex items-center gap-2"><Calendar size={14} /> Assignment Date</label>
                            <input
                                type="date"
                                value={date}
                                onChange={e => setDate(e.target.value)}
                                className="w-full bg-[#1A2A3A] border border-[#2A3A4A] text-white text-sm rounded-xl px-4 py-3.5 focus:outline-none focus:border-[#33E6FF] transition-colors"
                                required
                            />
                        </div>

                        {/* Condition */}
                        <div>
                            <label className="block text-xs font-bold text-[#8899AA] uppercase tracking-wider mb-2 flex items-center gap-2"><CheckCircle2 size={14} /> Asset Condition</label>
                            <select
                                value={condition}
                                onChange={e => setCondition(e.target.value)}
                                className="w-full bg-[#1A2A3A] border border-[#2A3A4A] text-white text-sm rounded-xl px-4 py-3.5 focus:outline-none focus:border-[#33E6FF] transition-colors appearance-none cursor-pointer"
                            >
                                <option>Excellent (New)</option>
                                <option>Good (Slight Wear)</option>
                                <option>Fair (Visible Wear)</option>
                            </select>
                        </div>
                    </div>

                    {/* Temporary Assignment Toggle */}
                    <div className="pt-4 border-t border-[#1A2A3A]">
                        <label className="flex items-center gap-3 cursor-pointer mb-4">
                            <input
                                type="checkbox"
                                checked={isTemporary}
                                onChange={e => setIsTemporary(e.target.checked)}
                                className="w-5 h-5 rounded bg-[#1A2A3A] border border-[#2A3A4A] text-[#33E6FF] focus:ring-[#33E6FF] focus:ring-offset-[#1A2A3A] focus:ring-1"
                            />
                            <span className="text-white font-bold text-sm">This is a temporary assignment / Loaner</span>
                        </label>

                        {isTemporary && (
                            <div className="pl-8 animate-in slide-in-from-top-2">
                                <label className="block text-xs font-bold text-[#8899AA] uppercase tracking-wider mb-2">Expected Return Date</label>
                                <input
                                    type="date"
                                    value={returnDate}
                                    onChange={e => setReturnDate(e.target.value)}
                                    className="w-full md:w-1/2 bg-[#1A2A3A] border border-[#2A3A4A] text-white text-sm rounded-xl px-4 py-3 focus:outline-none focus:border-[#33E6FF] transition-colors"
                                    required={isTemporary}
                                />
                                <p className="text-xs text-[#FFB020] mt-2">Employee will receive an automated reminder 3 days before this date.</p>
                            </div>
                        )}
                    </div>

                    {/* Notes */}
                    <div className="pt-4 border-t border-[#1A2A3A]">
                        <label className="block text-xs font-bold text-[#8899AA] uppercase tracking-wider mb-2 flex items-center gap-2"><MessageSquare size={14} /> Additional Notes</label>
                        <textarea
                            rows={4}
                            placeholder="Any scratches, missing accessories, or special instructions..."
                            value={notes}
                            onChange={e => setNotes(e.target.value)}
                            className="w-full bg-[#1A2A3A] border border-[#2A3A4A] text-white text-sm rounded-xl px-4 py-3.5 focus:outline-none focus:border-[#33E6FF] transition-colors resize-none"
                        ></textarea>
                    </div>

                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-4 mt-8 pt-4">
                    <Link href="/it/assets" className="px-6 py-3 font-bold text-[#8899AA] hover:text-white transition-colors">
                        Cancel
                    </Link>
                    <button type="submit" className="px-8 py-3 bg-[#33E6FF] text-[#0A1420] font-bold rounded-xl hover:bg-[#29b8cc] transition-colors shadow-[0_5px_15px_rgba(51,230,255,0.2)]">
                        Assign to Employee
                    </button>
                </div>

            </form>
        </div>
    );
}
