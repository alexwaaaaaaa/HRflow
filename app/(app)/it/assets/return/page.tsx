"use client";
import React, { useState } from 'react';
import {
    ArrowLeft, Search, User, Laptop, Calendar, MessageSquare, AlertTriangle, ShieldCheck, CheckCircle2
} from 'lucide-react';
import Link from 'next/link';

export default function AssetReturnScreen() {
    const [assetId, setAssetId] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [condition, setCondition] = useState('Good');
    const [notes, setNotes] = useState('');
    const [action, setAction] = useState('Pool');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Returning asset:', { assetId, returnDate, condition, notes, action });
    };

    return (
        <div className="p-6 max-w-[800px] mx-auto min-h-[calc(100vh-80px)] font-sans">

            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <Link href="/it/assets" className="p-2 border border-[#2A3A4A] bg-[#1A2A3A] text-[#8899AA] rounded-xl hover:bg-[#2A3A4A] hover:text-white transition-colors">
                    <ArrowLeft size={20} />
                </Link>
                <div>
                    <h1 className="text-3xl font-extrabold text-white mb-2">Process Asset Return</h1>
                    <p className="text-[#8899AA]">Record an asset returned by an employee and update its status.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">

                <div className="bg-[#0F1C2E] border border-[#2A3A4A] rounded-3xl p-6 md:p-8 shadow-xl space-y-6">

                    {/* Asset Selection */}
                    <div>
                        <label className="block text-xs font-bold text-[#8899AA] uppercase tracking-wider mb-2 flex items-center gap-2"><Laptop size={14} /> Asset to Return</label>
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8899AA]" size={18} />
                            <input
                                type="text"
                                placeholder="Search by Asset ID or Assigned Employee..."
                                value={assetId}
                                onChange={e => setAssetId(e.target.value)}
                                className="w-full bg-[#1A2A3A] border border-[#2A3A4A] text-white text-sm rounded-xl pl-12 pr-4 py-3.5 focus:outline-none focus:border-[#FFB020] transition-colors"
                                required
                            />
                        </div>
                        <p className="text-xs text-[#8899AA] mt-2">Displays currently 'Assigned' assets.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Date */}
                        <div>
                            <label className="block text-xs font-bold text-[#8899AA] uppercase tracking-wider mb-2 flex items-center gap-2"><Calendar size={14} /> Return Date</label>
                            <input
                                type="date"
                                value={returnDate}
                                onChange={e => setReturnDate(e.target.value)}
                                className="w-full bg-[#1A2A3A] border border-[#2A3A4A] text-white text-sm rounded-xl px-4 py-3.5 focus:outline-none focus:border-[#FFB020] transition-colors"
                                required
                            />
                        </div>

                        {/* Condition Check */}
                        <div>
                            <label className="block text-xs font-bold text-[#8899AA] uppercase tracking-wider mb-2 flex items-center gap-2"><ShieldCheck size={14} /> Condition Upon Return</label>
                            <select
                                value={condition}
                                onChange={e => setCondition(e.target.value)}
                                className="w-full bg-[#1A2A3A] border border-[#2A3A4A] text-white text-sm rounded-xl px-4 py-3.5 focus:outline-none focus:border-[#FFB020] transition-colors appearance-none cursor-pointer"
                            >
                                <option>Good (Normal Wear)</option>
                                <option>Damaged (Needs Repair)</option>
                                <option>Lost / Stolen</option>
                            </select>
                        </div>
                    </div>

                    {/* Next Action Selection */}
                    <div className="pt-4 border-t border-[#1A2A3A]">
                        <label className="block text-xs font-bold text-[#8899AA] uppercase tracking-wider mb-4">Post-Return Action</label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {[
                                { id: 'Pool', label: 'Return to Pool', desc: 'Ready for reassignment' },
                                { id: 'Repair', label: 'Send to Repair', desc: 'Log maint. ticket' },
                                { id: 'WriteOff', label: 'Write-off', desc: 'Depreciate & dispose' }
                            ].map(act => (
                                <button
                                    key={act.id}
                                    type="button"
                                    onClick={() => setAction(act.id)}
                                    className={`text-left p-4 rounded-xl border transition-all ${action === act.id
                                        ? act.id === 'Repair' ? 'bg-[#FFB020]/10 border-[#FFB020]' : act.id === 'WriteOff' ? 'bg-[#FF4444]/10 border-[#FF4444]' : 'bg-[#00E5A0]/10 border-[#00E5A0]'
                                        : 'bg-[#1A2A3A] border-[#2A3A4A] text-[#8899AA] hover:border-[#445566]'
                                        }`}
                                >
                                    <div className="flex items-center justify-between mb-1">
                                        <span className={`font-bold text-sm ${action === act.id ? 'text-white' : ''}`}>{act.label}</span>
                                        {action === act.id && <CheckCircle2 size={16} className={act.id === 'Repair' ? 'text-[#FFB020]' : act.id === 'WriteOff' ? 'text-[#FF4444]' : 'text-[#00E5A0]'} />}
                                    </div>
                                    <p className={`text-[10px] ${action === act.id ? 'text-[#8899AA]' : 'text-[#445566]'}`}>{act.desc}</p>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Notes */}
                    <div className="pt-4 border-t border-[#1A2A3A]">
                        <label className="block text-xs font-bold text-[#8899AA] uppercase tracking-wider mb-2 flex items-center gap-2"><MessageSquare size={14} /> Inspection Notes</label>
                        <textarea
                            rows={4}
                            placeholder="Detail any damages, missing chargers, or reasons for write-off..."
                            value={notes}
                            onChange={e => setNotes(e.target.value)}
                            className="w-full bg-[#1A2A3A] border border-[#2A3A4A] text-white text-sm rounded-xl px-4 py-3.5 focus:outline-none focus:border-[#FFB020] transition-colors resize-none"
                        ></textarea>
                        {(condition === 'Damaged' || condition === 'Lost / Stolen') && action === 'Pool' && (
                            <p className="text-xs text-[#FF4444] mt-2 flex items-start gap-1">
                                <AlertTriangle size={14} className="shrink-0 mt-0.5" />
                                Warning: You marked the asset as {condition} but selected "Return to Pool". Consider sending it to repair.
                            </p>
                        )}
                    </div>

                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-4 mt-8 pt-4">
                    <Link href="/it/assets" className="px-6 py-3 font-bold text-[#8899AA] hover:text-white transition-colors">
                        Cancel
                    </Link>
                    <button type="submit" className="px-8 py-3 bg-[#FFB020] text-[#0A1420] font-bold rounded-xl hover:bg-[#eacc41] transition-colors shadow-[0_5px_15px_rgba(255,176,32,0.2)]">
                        Complete Return Process
                    </button>
                </div>

            </form>
        </div>
    );
}
