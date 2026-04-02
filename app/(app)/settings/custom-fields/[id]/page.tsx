"use client";

import React from 'react';
import { Database, Save, ArrowLeft, Type, Hash, Calendar, List, ToggleRight } from 'lucide-react';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function CustomFieldsEmployeeFormPage() {
    const fields = [
        { label: 'Blood Group', type: 'Dropdown', value: 'O+', options: 'A+, A-, B+, B-, O+, O-, AB+, AB-', required: true },
        { label: 'Emergency Contact Relation', type: 'Text', value: 'Father', options: '', required: true },
        { label: 'T-Shirt Size', type: 'Dropdown', value: 'L', options: 'XS, S, M, L, XL, XXL', required: false },
    ];

    return (
        <div className="p-6 md:p-8 animate-fade-in max-w-3xl mx-auto">
            <Link href="/settings/custom-fields" className="text-[#8899AA] hover:text-white text-sm mb-6 inline-block">&larr; Back to Custom Fields</Link>

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white tracking-tight mb-2 flex items-center gap-3">
                    <Database size={28} className="text-indigo-400" /> Employee Custom Fields
                </h1>
                <p className="text-[#8899AA] text-sm">Preview how custom fields appear in the employee profile form.</p>
            </div>

            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 space-y-6">
                {fields.map((f, idx) => (
                    <div key={idx} className="space-y-1.5">
                        <label className="text-xs font-medium text-[#8899AA] ml-1 flex items-center gap-2">
                            {f.label}
                            {f.required && <span className="text-red-400">*</span>}
                            <span className="ml-auto text-[10px] text-[#445566] bg-[#1A2A3A] px-2 py-0.5 rounded">{f.type}</span>
                        </label>
                        {f.type === 'Dropdown' ? (
                            <select defaultValue={f.value} className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl px-4 py-2.5 text-sm text-white focus:border-indigo-500 outline-none appearance-none cursor-pointer">
                                {f.options.split(', ').map(o => <option key={o} value={o}>{o}</option>)}
                            </select>
                        ) : (
                            <input type="text" defaultValue={f.value} className="w-full bg-[#131B2B] border border-[#2A3A4A] rounded-xl px-4 py-2.5 text-sm text-white focus:border-indigo-500 outline-none transition-colors" />
                        )}
                    </div>
                ))}
            </div>

            <div className="mt-6 flex justify-end">
                <Button className="bg-indigo-600 hover:bg-indigo-500 text-white border-none py-2.5 px-8">
                    <Save size={16} className="mr-2" /> Save Fields
                </Button>
            </div>
        </div>
    );
}
