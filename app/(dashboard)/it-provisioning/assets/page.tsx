"use client";

import { useState } from "react";
import { Search, Filter, Plus, Monitor, Laptop, Smartphone, Download, AlertTriangle, CheckCircle2, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import Button from "@/components/ui/Button";

// --- Types & Interfaces ---
type AssetCategory = "Laptop" | "Monitor" | "Mobile";
type AssetStatus = "Assigned" | "In Stock" | "Maintenance" | "Decommissioned";

interface Asset {
    id: string;
    name: string;
    category: AssetCategory;
    assignee: string | null;
    status: AssetStatus;
    condition: string;
}

// --- Mock Data ---
const ASSETS_DATA: Asset[] = [
    { id: "AST-001", name: "MacBook Pro 16\" M2", category: "Laptop", assignee: "Sarah Connor", status: "Assigned", condition: "Good" },
    { id: "AST-002", name: "Dell UltraSharp 32\"", category: "Monitor", assignee: null, status: "In Stock", condition: "New" },
    { id: "AST-003", name: "iPhone 14 Pro", category: "Mobile", assignee: "John Connor", status: "Assigned", condition: "Fair" },
    { id: "AST-004", name: "Lenovo ThinkPad X1", category: "Laptop", assignee: null, status: "Maintenance", condition: "Requires Repair" },
    { id: "AST-005", name: "LG 27\" 4K Monitor", category: "Monitor", assignee: "Kyle Reese", status: "Assigned", condition: "Good" },
];

// --- Helper Components & Functions ---

function StatusBadge({ status }: { status: AssetStatus }) {
    let colorClass = "";
    switch (status) {
        case 'Assigned':
            colorClass = "text-[#00E5A0] bg-[#00E5A0]/10 border-[#00E5A0]/20";
            break;
        case 'In Stock':
            colorClass = "text-[#0066FF] bg-[#0066FF]/10 border-[#0066FF]/20";
            break;
        case 'Maintenance':
            colorClass = "text-[#FF4444] bg-[#FF4444]/10 border-[#FF4444]/20";
            break;
        default:
            colorClass = "text-[#8899AA] bg-[#8899AA]/10 border-[#8899AA]/20";
    }

    return (
        <span className={`inline-flex items-center px-2 py-1 rounded-md border text-xs font-semibold tracking-wide ${colorClass}`}>
            {status}
        </span>
    );
}

function CategoryIcon({ category }: { category: AssetCategory }) {
    switch (category) {
        case 'Laptop': return <Laptop size={16} className="text-[#8899AA]" aria-label="Laptop" />;
        case 'Monitor': return <Monitor size={16} className="text-[#8899AA]" aria-label="Monitor" />;
        case 'Mobile': return <Smartphone size={16} className="text-[#8899AA]" aria-label="Mobile Device" />;
        default: return <Monitor size={16} className="text-[#8899AA]" aria-label="Hardware" />;
    }
}

// --- Main Page Component ---
export default function AssetListScreen() {
    const [searchTerm, setSearchTerm] = useState("");
    const [isExporting, setIsExporting] = useState(false);

    const handleExport = () => {
        setIsExporting(true);
        setTimeout(() => setIsExporting(false), 1000);
    };

    return (
        <main className="px-8 py-6 pb-16 animate-fade-in relative max-w-7xl mx-auto min-h-screen">
            {/* Page Header */}
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white m-0 tracking-tight">Asset Inventory</h1>
                    <p className="text-sm text-[#8899AA] mt-1.5">Manage and track all hardware assets across the organization</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button
                        variant="secondary"
                        icon={isExporting ? <Clock size={16} className="animate-spin" /> : <Download size={16} />}
                        onClick={handleExport}
                        disabled={isExporting}
                    >
                        {isExporting ? 'Exporting...' : 'Export List'}
                    </Button>
                    <Button variant="primary" icon={<Plus size={16} />}>
                        Add Asset
                    </Button>
                </div>
            </header>

            {/* Toolbar / Filters */}
            <section aria-label="Filter Assets" className="flex flex-wrap items-center gap-4 mb-6">
                <div className="relative flex-grow max-w-md">
                    <label htmlFor="search-assets" className="sr-only">Search assets</label>
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#445566]" size={18} aria-hidden="true" />
                    <input
                        id="search-assets"
                        type="search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search by asset ID, name, or assignee..."
                        className="w-full h-11 bg-[#0D1928] border border-[#1A2A3A] rounded-xl pl-11 pr-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#0066FF] focus:border-[#0066FF] transition-all placeholder-[#445566]"
                    />
                </div>
                <Button variant="secondary" icon={<Filter size={16} />} aria-haspopup="true">Category</Button>
                <Button variant="secondary" icon={<Filter size={16} />} aria-haspopup="true">Status</Button>
            </section>

            {/* Data Table */}
            <section className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl overflow-hidden shadow-sm flex flex-col" aria-label="Assets List">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse cursor-default whitespace-nowrap">
                        <thead className="bg-[#0A1420] border-b border-[#1A2A3A]">
                            <tr>
                                <th scope="col" className="px-6 py-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Asset ID</th>
                                <th scope="col" className="px-6 py-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Asset Details</th>
                                <th scope="col" className="px-6 py-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Assignee</th>
                                <th scope="col" className="px-6 py-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Status</th>
                                <th scope="col" className="px-6 py-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider">Condition</th>
                                <th scope="col" className="px-6 py-4 text-xs font-semibold text-[#8899AA] uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1A2A3A]">
                            {ASSETS_DATA.map((asset) => (
                                <tr key={asset.id} className="hover:bg-[#1A2A3A]/40 transition-colors group focus-within:bg-[#1A2A3A]/60">
                                    <td className="px-6 py-4 text-sm font-medium text-white">{asset.id}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-lg bg-[#060B14] border border-[#1A2A3A] flex items-center justify-center flex-shrink-0">
                                                <CategoryIcon category={asset.category} />
                                            </div>
                                            <div>
                                                <div className="text-sm font-semibold text-white group-hover:text-[#00E5A0] transition-colors">{asset.name}</div>
                                                <div className="text-xs text-[#8899AA] mt-0.5">{asset.category}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm">
                                        {asset.assignee ? (
                                            <span className="text-[#E2E8F0] font-medium">{asset.assignee}</span>
                                        ) : (
                                            <span className="text-[#445566] italic">Unassigned</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <StatusBadge status={asset.status} />
                                    </td>
                                    <td className="px-6 py-4 text-sm text-[#8899AA]">{asset.condition}</td>
                                    <td className="px-6 py-4 text-right">
                                        <Button variant="secondary" className="h-8 text-xs font-medium focus:ring-2 focus:ring-[#0066FF]">View</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <footer className="px-6 py-4 border-t border-[#1A2A3A] flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#0A1420]/50">
                    <div className="text-sm text-[#8899AA]" aria-live="polite">
                        Showing <span className="font-medium text-white">1</span> to <span className="font-medium text-white">5</span> of <span className="font-medium text-white">1,245</span> assets
                    </div>
                    <nav className="flex items-center gap-2" aria-label="Pagination">
                        <Button variant="secondary" className="h-8 px-3" aria-label="Previous page">
                            <ChevronLeft size={16} className="mr-1" /> Prev
                        </Button>
                        <Button variant="secondary" className="h-8 px-3" aria-label="Next page">
                            Next <ChevronRight size={16} className="ml-1" />
                        </Button>
                    </nav>
                </footer>
            </section>
        </main>
    );
}
