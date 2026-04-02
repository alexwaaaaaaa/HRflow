"use client";

import { Save, X, Image, UploadCloud } from "lucide-react";
import Button from "@/components/ui/Button";

export default function AddAssetScreen() {
    return (
        <main className="px-8 py-6 pb-16 animate-fade-in relative max-w-4xl mx-auto min-h-screen">
            {/* Page Header */}
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 pb-6 border-b border-[#1A2A3A] gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white m-0 tracking-tight">Add New Asset</h1>
                    <p className="text-sm text-[#8899AA] mt-1.5">Register new hardware, software, or accessories to the centralized inventory</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="secondary" icon={<X size={16} />}>Cancel</Button>
                    <Button variant="primary" icon={<Save size={16} />} type="submit" form="add-asset-form">Save Asset</Button>
                </div>
            </header>

            <form id="add-asset-form" className="space-y-8" onSubmit={(e) => e.preventDefault()} aria-label="Add Asset Form">

                {/* Basic Details */}
                <fieldset className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl shadow-sm">
                    <legend className="sr-only">Basic Information</legend>
                    <header className="p-6 border-b border-[#1A2A3A] bg-[#0A1420]/50 rounded-t-2xl">
                        <h2 className="text-lg font-bold text-white m-0">Basic Information</h2>
                    </header>
                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label htmlFor="asset-type" className="block text-sm font-medium text-[#8899AA]">Asset Type <span className="text-[#FF4444]" aria-label="required">*</span></label>
                            <select
                                id="asset-type"
                                className="w-full h-11 bg-[#060B14] border border-[#1A2A3A] rounded-xl px-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#0066FF] focus:border-[#0066FF] transition-colors appearance-none"
                                required
                            >
                                <option value="" disabled selected>Select asset type</option>
                                <option value="hardware">Hardware</option>
                                <option value="software">Software License</option>
                                <option value="accessory">Accessories</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="asset-category" className="block text-sm font-medium text-[#8899AA]">Category <span className="text-[#FF4444]" aria-label="required">*</span></label>
                            <select
                                id="asset-category"
                                className="w-full h-11 bg-[#060B14] border border-[#1A2A3A] rounded-xl px-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#0066FF] focus:border-[#0066FF] transition-colors appearance-none"
                                required
                            >
                                <option value="" disabled selected>Select category</option>
                                <option value="laptop">Laptop</option>
                                <option value="monitor">Monitor</option>
                                <option value="mobile">Mobile Device</option>
                                <option value="server">Server</option>
                                <option value="networking">Networking</option>
                            </select>
                        </div>
                        <div className="md:col-span-2 space-y-2">
                            <label htmlFor="asset-name" className="block text-sm font-medium text-[#8899AA]">Asset Name / Model <span className="text-[#FF4444]" aria-label="required">*</span></label>
                            <input
                                id="asset-name"
                                type="text"
                                required
                                placeholder="e.g. MacBook Pro 16-inch M3 Max"
                                className="w-full h-11 bg-[#060B14] border border-[#1A2A3A] rounded-xl px-4 text-sm text-white placeholder-[#445566] focus:outline-none focus:ring-1 focus:ring-[#0066FF] focus:border-[#0066FF] transition-colors"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="asset-tag" className="block text-sm font-medium text-[#8899AA]">Asset Tag / ID</label>
                            <input
                                id="asset-tag"
                                type="text"
                                value="AST-1246"
                                readOnly
                                aria-readonly="true"
                                aria-describedby="asset-tag-help"
                                className="w-full h-11 bg-[#0A1420] border border-[#1A2A3A] rounded-xl px-4 text-sm text-[#8899AA] cursor-not-allowed opacity-80"
                            />
                            <p id="asset-tag-help" className="text-xs text-[#445566]">Auto-generated tracking ID</p>
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="serial-number" className="block text-sm font-medium text-[#8899AA]">Serial Number <span className="text-[#FF4444]" aria-label="required">*</span></label>
                            <input
                                id="serial-number"
                                type="text"
                                required
                                placeholder="Enter manufacturer serial #"
                                className="w-full h-11 bg-[#060B14] border border-[#1A2A3A] rounded-xl px-4 text-sm text-white placeholder-[#445566] focus:outline-none focus:ring-1 focus:ring-[#0066FF] focus:border-[#0066FF] transition-colors"
                            />
                        </div>
                    </div>
                </fieldset>

                {/* Procurement Details */}
                <fieldset className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl shadow-sm">
                    <legend className="sr-only">Procurement Details</legend>
                    <header className="p-6 border-b border-[#1A2A3A] bg-[#0A1420]/50 rounded-t-2xl">
                        <h2 className="text-lg font-bold text-white m-0">Procurement Details</h2>
                    </header>
                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label htmlFor="purchase-date" className="block text-sm font-medium text-[#8899AA]">Purchase Date</label>
                            <input
                                id="purchase-date"
                                type="date"
                                className="w-full h-11 bg-[#060B14] border border-[#1A2A3A] rounded-xl px-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#0066FF] focus:border-[#0066FF] transition-colors [color-scheme:dark]"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="purchase-cost" className="block text-sm font-medium text-[#8899AA]">Purchase Cost (₹)</label>
                            <input
                                id="purchase-cost"
                                type="number"
                                min="0"
                                step="0.01"
                                placeholder="e.g. 150000"
                                className="w-full h-11 bg-[#060B14] border border-[#1A2A3A] rounded-xl px-4 text-sm text-white placeholder-[#445566] focus:outline-none focus:ring-1 focus:ring-[#0066FF] focus:border-[#0066FF] transition-colors"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="vendor-name" className="block text-sm font-medium text-[#8899AA]">Vendor/Supplier</label>
                            <input
                                id="vendor-name"
                                type="text"
                                placeholder="Enter vendor name"
                                className="w-full h-11 bg-[#060B14] border border-[#1A2A3A] rounded-xl px-4 text-sm text-white placeholder-[#445566] focus:outline-none focus:ring-1 focus:ring-[#0066FF] focus:border-[#0066FF] transition-colors"
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="warranty-expiry" className="block text-sm font-medium text-[#8899AA]">Warranty Expiry Date</label>
                            <input
                                id="warranty-expiry"
                                type="date"
                                className="w-full h-11 bg-[#060B14] border border-[#1A2A3A] rounded-xl px-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#0066FF] focus:border-[#0066FF] transition-colors [color-scheme:dark]"
                            />
                        </div>
                    </div>
                </fieldset>

                {/* Additional Info / Photos */}
                <fieldset className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl shadow-sm">
                    <legend className="sr-only">Photos and Documents</legend>
                    <header className="p-6 border-b border-[#1A2A3A] bg-[#0A1420]/50 rounded-t-2xl">
                        <h2 className="text-lg font-bold text-white m-0">Photos & Documents</h2>
                    </header>
                    <div className="p-6">
                        <label
                            htmlFor="file-upload"
                            className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-[#1A2A3A] rounded-xl cursor-pointer bg-[#060B14] hover:bg-[#1A2A3A]/20 hover:border-[#0066FF] transition-colors focus-within:ring-2 focus-within:ring-[#0066FF] focus-within:border-transparent outline-none group"
                        >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <span className="w-12 h-12 rounded-full bg-[#0D1928] border border-[#1A2A3A] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <UploadCloud size={24} className="text-[#8899AA] group-hover:text-[#0066FF] transition-colors" aria-hidden="true" />
                                </span>
                                <p className="text-sm font-medium text-white mb-1"><span className="text-[#0066FF]">Click to upload</span> or drag and drop</p>
                                <p className="text-xs text-[#445566]">SVG, PNG, JPG or PDF (MAX. 5MB)</p>
                            </div>
                            <input id="file-upload" type="file" className="sr-only" multiple accept=".pdf,image/*" />
                        </label>
                    </div>
                </fieldset>

                <footer className="flex justify-end gap-3 pt-4 border-t border-[#1A2A3A] mt-8 pt-8">
                    <Button variant="secondary" className="px-8">Cancel</Button>
                    <Button variant="primary" className="px-8" type="submit">Save Asset</Button>
                </footer>
            </form>
        </main>
    );
}
