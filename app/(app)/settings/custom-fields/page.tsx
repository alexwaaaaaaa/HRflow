"use client";

import React, { useState } from 'react';
import { Database, Plus, Search, Filter, Trash2, GripVertical, ToggleLeft, ToggleRight, Type, Hash, Calendar, List, MoreVertical } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function CustomFieldsPage() {
    const fields = [
        { id: 'CF-001', label: 'Blood Group', fieldType: 'Dropdown', entity: 'Employee', required: true, active: true, options: 'A+, A-, B+, B-, O+, O-, AB+, AB-' },
        { id: 'CF-002', label: 'Emergency Contact Relation', fieldType: 'Text', entity: 'Employee', required: true, active: true, options: '' },
        { id: 'CF-003', label: 'T-Shirt Size', fieldType: 'Dropdown', entity: 'Employee', required: false, active: true, options: 'XS, S, M, L, XL, XXL' },
        { id: 'CF-004', label: 'Project Code', fieldType: 'Text', entity: 'Attendance', required: false, active: true, options: '' },
        { id: 'CF-005', label: 'Exit Interview Score', fieldType: 'Number', entity: 'Separation', required: false, active: false, options: '' },
    ];

    const typeIcons: Record<string, any> = { Text: Type, Number: Hash, Dropdown: List, Date: Calendar };

    return (
        <div className="p-6 md:p-8 animate-fade-in max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight mb-2 flex items-center gap-3">
                        <Database size={28} className="text-indigo-400" /> Custom Fields
                    </h1>
                    <p className="text-[#8899AA] text-sm max-w-2xl">
                        Extend Kaarya's data model by adding custom fields to employees, leave, payroll, and other entities.
                    </p>
                </div>
                <Button className="bg-indigo-600 hover:bg-indigo-500 text-white border-none py-2 px-6">
                    <Plus size={16} className="mr-2" /> Add Custom Field
                </Button>
            </div>

            <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[750px]">
                        <thead>
                            <tr className="border-b border-[#1A2A3A] bg-[#131B2B]">
                                <th className="p-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider w-8"></th>
                                <th className="p-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Field Label</th>
                                <th className="p-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Type</th>
                                <th className="p-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Entity</th>
                                <th className="p-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Required</th>
                                <th className="p-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Status</th>
                                <th className="p-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider w-16"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {fields.map((f) => {
                                const Icon = typeIcons[f.fieldType] || Type;
                                return (
                                    <tr key={f.id} className="border-b border-[#1A2A3A] hover:bg-[#131B2B] transition-colors group">
                                        <td className="p-4 text-[#445566] cursor-grab"><GripVertical size={16} /></td>
                                        <td className="p-4">
                                            <div className="text-white font-medium text-sm">{f.label}</div>
                                            <div className="text-[10px] text-[#445566] font-mono">{f.id}</div>
                                        </td>
                                        <td className="p-4">
                                            <span className="flex items-center gap-1.5 text-sm text-[#8899AA]">
                                                <Icon size={14} className="text-indigo-400" /> {f.fieldType}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <span className="bg-[#1A2A3A] text-white border border-[#2A3A4A] px-2.5 py-1 rounded text-xs">{f.entity}</span>
                                        </td>
                                        <td className="p-4 text-sm text-[#8899AA]">{f.required ? 'Yes' : 'No'}</td>
                                        <td className="p-4">
                                            {f.active
                                                ? <ToggleRight size={24} className="text-indigo-400 cursor-pointer" />
                                                : <ToggleLeft size={24} className="text-[#2A3A4A] cursor-pointer" />
                                            }
                                        </td>
                                        <td className="p-4">
                                            <button className="text-[#445566] hover:text-white opacity-0 group-hover:opacity-100 transition-all"><MoreVertical size={16} /></button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
