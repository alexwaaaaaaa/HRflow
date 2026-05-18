"use client";

import Page from "@/components/ui/Page";

import React, { useState } from 'react';
import {
    UploadCloud, File, X, CheckCircle2, AlertCircle, ChevronLeft, Lock
} from 'lucide-react';
import Link from 'next/link';

export default function DocumentUploadScreen() {
    const [dragActive, setDragActive] = useState(false);
    const [files, _setFiles] = useState([
        { name: 'Offer_Letter_Signed_RahulS.pdf', size: '2.4 MB', status: 'completed', prog: 100 },
        { name: 'Aadhaar_Card_Scan.jpg', size: '850 KB', status: 'uploading', prog: 65 },
        { name: 'Salary_Slips_Archive.zip', size: '15.2 MB', status: 'error', prog: 20 },
    ]);

    const handleDrag = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    return (
        <Page
            title="Upload Documents"
            subtitle="Securely upload files to the HR repository. Max size 50MB per file."
            breadcrumbs={[{ label: "Documents", href: "/documents" }, { label: "Upload" }]}
            maxWidth="800px"
        >

        <div className="min-h-screen bg-[#060B14] p-6 font-sans text-slate-200 flex items-center justify-center">
            <div className="max-w-3xl w-full">

                <div className="mb-6">
                    <Link href="/documents/repository" className="inline-flex items-center text-sm text-[#8899AA] hover:text-white mb-4 transition-colors">
                        <ChevronLeft size={16} className="mr-1" /> Back to Repository
                    </Link>
                    <h1 className="text-2xl font-bold text-white mb-1">Upload Documents</h1>
                    <p className="text-sm text-[#8899AA]">Securely upload files to the HR repository. Max size 50MB per file.</p>
                </div>

                <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-2xl shadow-xl overflow-hidden">

                    {/* Settings / Metadata Pre-upload */}
                    <div className="p-6 border-b border-[#1A2A3A] bg-[#0D1928] grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-[#8899AA] uppercase tracking-wider mb-2">Destination Folder</label>
                            <select className="bg-[#060B14] border border-[#1A2A3A] text-sm text-white rounded-lg px-3 py-2.5 w-full outline-none focus:border-[#0066FF] transition-colors">
                                <option>Employee Records / Rahul Sharma</option>
                                <option>Corporate Policies</option>
                                <option>Compliance Docs</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-[#8899AA] uppercase tracking-wider mb-2">Access Control</label>
                            <div className="relative">
                                <Lock size={14} className="absolute left-3 top-3 text-[#556677]" />
                                <select className="bg-[#060B14] border border-[#1A2A3A] text-sm text-white rounded-lg pl-9 pr-3 py-2.5 w-full outline-none focus:border-[#0066FF] transition-colors">
                                    <option>HR & Admins Only (Restricted)</option>
                                    <option>Specific Employee (Rahul Sharma)</option>
                                    <option>All Employees (Public)</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="p-6">
                        {/* Dropzone */}
                        <div
                            className={`border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center text-center transition-all cursor-pointer mb-8
                                ${dragActive ? 'border-[#0066FF] bg-[#0066FF]/5' : 'border-[#2A3A4A] hover:border-[#556677] bg-[#060B14]'}`}
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={(e) => { e.preventDefault(); setDragActive(false); }}
                        >
                            <div className="w-16 h-16 rounded-full bg-[#1A2A3A] flex items-center justify-center mb-4 text-[#0066FF]">
                                <UploadCloud size={32} />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">Drag & Drop files here</h3>
                            <p className="text-sm text-[#8899AA] mb-6">Supported formats: PDF, DOCX, XLSX, JPG, PNG, ZIP</p>
                            <button className="px-5 py-2.5 bg-[#1A2A3A] border border-[#2A3A4A] text-white font-semibold text-sm rounded-lg hover:bg-[#2A3A4A] transition-colors">
                                Browse Files
                            </button>
                        </div>

                        {/* File Queue */}
                        <div>
                            <h4 className="text-sm font-bold text-white mb-4">Upload Queue ({files.length})</h4>
                            <div className="space-y-3">
                                {files.map((file, i) => (
                                    <div key={i} className="flex items-center gap-4 p-3 rounded-lg border border-[#1A2A3A] bg-[#060B14]">
                                        <div className="w-10 h-10 rounded shrink-0 bg-[#0A1420] flex items-center justify-center text-[#556677]">
                                            <File size={20} />
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-center mb-1.5">
                                                <span className="text-sm font-semibold text-white truncate pr-4">{file.name}</span>
                                                <span className="text-xs text-[#8899AA]">{file.size}</span>
                                            </div>

                                            <div className="flex items-center gap-3">
                                                <div className="flex-1 h-1.5 bg-[#1A2A3A] rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full rounded-full transition-all duration-300
                                                            ${file.status === 'completed' ? 'bg-[#00E5A0]' :
                                                                file.status === 'error' ? 'bg-rose-500' : 'bg-[#0066FF]'}`}
                                                        style={{ width: `${file.prog}%` }}
                                                    ></div>
                                                </div>
                                                <span className="text-[10px] font-bold uppercase tracking-wider w-16 text-right">
                                                    {file.status === 'completed' && <span className="text-[#00E5A0] flex items-center justify-end gap-1"><CheckCircle2 size={12} /> Done</span>}
                                                    {file.status === 'error' && <span className="text-rose-500 flex items-center justify-end gap-1"><AlertCircle size={12} /> Failed</span>}
                                                    {file.status === 'uploading' && <span className="text-[#0066FF]">{file.prog}%</span>}
                                                </span>
                                            </div>
                                        </div>

                                        <button className="p-1.5 text-[#556677] hover:text-rose-500 hover:bg-rose-500/10 rounded transition-colors shrink-0">
                                            <X size={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Submit Actions */}
                        <div className="mt-8 flex justify-end gap-3">
                            <button className="px-5 py-2.5 rounded-lg font-semibold text-sm text-[#8899AA] hover:bg-[#1A2A3A] hover:text-white transition-colors">
                                Cancel
                            </button>
                            <button className="px-6 py-2.5 bg-[#0066FF] text-white rounded-lg font-bold text-sm hover:bg-[#0052cc] transition-colors shadow-[0_0_15px_rgba(0,102,255,0.3)]">
                                Confirm Uploads
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    
        </Page>
    );
}
