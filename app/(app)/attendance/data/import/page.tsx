"use client";

import Page from "@/components/ui/Page";

import React, { useState } from 'react';
import {
    UploadCloud, FileSpreadsheet, Download, AlertCircle, Play
} from 'lucide-react';

export default function AttendanceBulkImport() {
    const [dragActive, setDragActive] = useState(false);
    const [isUploaded, setIsUploaded] = useState(false);

    return (
        <Page
            title="Bulk Attendance Import"
            subtitle="Upload raw punch logs or legacy attendance summaries via CSV/Excel."
            breadcrumbs={[{ label: "Attendance", href: "/attendance/dashboard" }, { label: "Data", href: "/attendance/data" }, { label: "Import" }]}
            maxWidth="900px"
        >

        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200">
            <div className="max-w-4xl mx-auto space-y-6">

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-white mb-1">Bulk Attendance Import</h1>
                        <p className="text-sm text-[#8899AA]">Upload raw punch logs or legacy attendance summaries via CSV/Excel.</p>
                    </div>
                </div>

                {/* Upload Area */}
                {!isUploaded ? (
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl p-8 relative overflow-hidden">

                        {/* Background Decoration */}
                        <div className="absolute top-0 right-0 p-8 opacity-5">
                            <FileSpreadsheet size={120} />
                        </div>

                        <div className="relative z-10 grid grid-cols-2 gap-10">

                            {/* Left: Drag & Drop */}
                            <div>
                                <h2 className="text-base font-bold text-white mb-4">Upload File</h2>
                                <div
                                    className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer ${dragActive ? 'border-[#0066FF] bg-[#0066FF]/5' : 'border-[#2A3A4A] bg-[#060B14] hover:border-[#556677]'
                                        }`}
                                    onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                                    onDragLeave={() => setDragActive(false)}
                                    onDrop={(e) => { e.preventDefault(); setDragActive(false); setIsUploaded(true); }}
                                    onClick={() => setIsUploaded(true)}
                                >
                                    <div className="w-16 h-16 bg-[#1A2A3A] rounded-full flex items-center justify-center mx-auto mb-4 text-[#0066FF]">
                                        <UploadCloud size={32} />
                                    </div>
                                    <h3 className="text-sm font-bold text-white mb-1">Drag and drop file here</h3>
                                    <p className="text-xs text-[#8899AA] mb-4">Supported formats: .CSV, .XLSX</p>
                                    <button className="px-5 py-2 bg-[#1A2A3A] text-white text-sm font-bold rounded hover:bg-[#2A3A4A] transition-colors">
                                        Browse Files
                                    </button>
                                </div>
                            </div>

                            {/* Right: Instructions & Template */}
                            <div className="flex flex-col justify-center border-l border-[#1A2A3A] pl-10">
                                <h3 className="text-sm font-bold text-white mb-4 flex items-center">
                                    <AlertCircle size={16} className="text-[#FFB800] mr-2" />
                                    Import Guidelines
                                </h3>

                                <ul className="text-xs text-[#8899AA] space-y-3 mb-6">
                                    <li className="flex items-start"><div className="w-1.5 h-1.5 rounded-full bg-[#556677] mt-1.5 mr-2 shrink-0"></div> Ensure Employee IDs match exactly with the system.</li>
                                    <li className="flex items-start"><div className="w-1.5 h-1.5 rounded-full bg-[#556677] mt-1.5 mr-2 shrink-0"></div> Date format must be DD-MM-YYYY or YYYY-MM-DD.</li>
                                    <li className="flex items-start"><div className="w-1.5 h-1.5 rounded-full bg-[#556677] mt-1.5 mr-2 shrink-0"></div> Maximum length: 10,000 rows per file.</li>
                                </ul>

                                <button className="w-full py-3 bg-[#060B14] hover:bg-[#1A2A3A] border border-[#2A3A4A] text-[#00E5A0] font-bold text-sm rounded-lg transition-colors flex justify-center items-center">
                                    <Download size={18} className="mr-2" /> Download Excel Template
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    /* Post-Upload State (Preview & Validate) */
                    <div className="bg-[#0D1928] border border-[#1A2A3A] rounded-xl overflow-hidden">

                        {/* File summary header */}
                        <div className="p-6 border-b border-[#1A2A3A] bg-[#0A1420] flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div className="p-3 bg-[#00E5A0]/10 text-[#00E5A0] rounded-lg border border-[#00E5A0]/30">
                                    <FileSpreadsheet size={24} />
                                </div>
                                <div>
                                    <h2 className="text-base font-bold text-white">nov_attendance_raw.csv</h2>
                                    <div className="text-xs text-[#8899AA] mt-1">Uploaded just now • 1.2 MB</div>
                                </div>
                            </div>

                            <div className="flex items-center space-x-8">
                                <div className="text-center">
                                    <div className="text-2xl font-black text-white">4,052</div>
                                    <div className="text-[10px] font-bold text-[#8899AA] uppercase tracking-wider mt-1">Total Rows</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-black text-[#00E5A0]">4,048</div>
                                    <div className="text-[10px] font-bold text-[#8899AA] uppercase tracking-wider mt-1">Valid Records</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-black text-[#FF4444]">4</div>
                                    <div className="text-[10px] font-bold text-[#8899AA] uppercase tracking-wider mt-1">Errors Found</div>
                                </div>
                            </div>
                        </div>

                        {/* Validation Issues */}
                        <div className="p-6 border-b border-[#1A2A3A]">
                            <h3 className="text-sm font-bold text-white mb-3">Fix Data Errors before Import</h3>

                            <div className="space-y-2">
                                <div className="flex items-start bg-[#FF4444]/5 border border-[#FF4444]/20 rounded-lg p-3">
                                    <div className="text-[#FF4444] font-bold text-xs bg-[#FF4444]/10 px-2 py-1 rounded mr-3 mt-0.5">Row 45</div>
                                    <div>
                                        <div className="text-sm text-slate-300 font-medium">Invalid Employee ID 'EMP999'</div>
                                        <div className="text-xs text-[#8899AA] mt-1 font-mono">"EMP999", "04-11-2024", "09:00", ...</div>
                                    </div>
                                    <button className="ml-auto text-xs text-[#0066FF] font-bold hover:text-white transition-colors">Edit Row</button>
                                </div>

                                <div className="flex items-start bg-[#FF4444]/5 border border-[#FF4444]/20 rounded-lg p-3">
                                    <div className="text-[#FF4444] font-bold text-xs bg-[#FF4444]/10 px-2 py-1 rounded mr-3 mt-0.5">Row 112</div>
                                    <div>
                                        <div className="text-sm text-slate-300 font-medium">Malformed Date format '11/04/24'</div>
                                        <div className="text-xs text-[#8899AA] mt-1 font-mono">"EMP082", "11/04/24", "08:45", ...</div>
                                    </div>
                                    <button className="ml-auto text-xs text-[#0066FF] font-bold hover:text-white transition-colors">Edit Row</button>
                                </div>

                                <button className="w-full mt-2 py-2 text-xs font-bold text-[#8899AA] border border-dashed border-[#2A3A4A] rounded hover:border-[#556677] hover:text-white transition-colors">
                                    Skip all 4 error rows
                                </button>
                            </div>
                        </div>

                        {/* Importer Actions */}
                        <div className="p-6 bg-[#060B14] flex justify-between items-center">
                            <button
                                onClick={() => setIsUploaded(false)}
                                className="text-sm font-bold text-[#8899AA] hover:text-white transition-colors"
                            >
                                Cancel & Re-upload
                            </button>

                            <button className="px-6 py-2.5 bg-[#0066FF] text-white font-bold text-sm rounded-lg shadow-lg shadow-[#0066FF]/20 flex items-center opacity-50 cursor-not-allowed">
                                <Play size={16} className="mr-2" fill="white" /> Execute Dry-Run Map
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    
        </Page>
        );
}
