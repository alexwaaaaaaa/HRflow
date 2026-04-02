"use client";

import { Check, X, Clock, Search, Filter, ShieldAlert, MessageSquare } from "lucide-react";
import Button from "@/components/ui/Button";

// --- Mock Data ---
const PENDING_REQUESTS = [
    { id: "req-1", name: "John Doe", title: "Frontend Eng", req: "Cursor AI", date: "2 hrs ago", status: "awaiting_it", avatar: "J" },
    { id: "req-2", name: "Sarah Smith", title: "Marketing", req: "Canva Pro", date: "5 hrs ago", status: "awaiting_it", avatar: "S" },
    { id: "req-3", name: "Mike Ross", title: "Legal", req: "LexisNexis", date: "1 day ago", status: "manager_approved", avatar: "M" },
];

export default function SoftwareApprovalScreen() {
    return (
        <main className="px-8 py-6 pb-16 animate-fade-in relative max-w-7xl mx-auto min-h-screen">
            {/* Page Header */}
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4 border-b border-[#1A2A3A] pb-6">
                <div>
                    <h1 className="text-3xl font-bold text-white m-0 tracking-tight">Access Approvals</h1>
                    <p className="text-sm text-[#8899AA] mt-1.5">Review pending software and IT access requests</p>
                </div>
                <div className="flex gap-2">
                    <span className="px-4 py-2 bg-[#0D1928] border border-[#1A2A3A] rounded-xl text-sm font-semibold flex items-center gap-2 shadow-sm text-white" aria-live="polite">
                        <Clock className="text-[#0066FF]" size={16} aria-hidden="true" />
                        {PENDING_REQUESTS.length} Pending Review
                    </span>
                </div>
            </header>

            <div className="flex flex-col lg:flex-row gap-6 lg:h-[75vh]">
                {/* List Column */}
                <section className="w-full lg:w-5/12 xl:w-1/3 bg-[#0D1928] border border-[#1A2A3A] rounded-2xl flex flex-col overflow-hidden shadow-sm" aria-labelledby="requests-heading">
                    <h2 id="requests-heading" className="sr-only">Pending Requests List</h2>
                    <header className="p-4 border-b border-[#1A2A3A] flex gap-3 bg-[#0A1420]/50">
                        <div className="relative flex-grow">
                            <label htmlFor="search-requests" className="sr-only">Search requests</label>
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#445566]" size={16} aria-hidden="true" />
                            <input
                                id="search-requests"
                                type="search"
                                placeholder="Search requests..."
                                className="w-full h-10 bg-[#060B14] border border-[#1A2A3A] rounded-xl pl-10 pr-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#0066FF] focus:border-[#0066FF] transition-all placeholder-[#445566]"
                            />
                        </div>
                        <Button variant="secondary" className="h-10 px-3 hover:border-[#334455]" aria-label="Filter requests">
                            <Filter size={16} aria-hidden="true" />
                        </Button>
                    </header>
                    <div className="flex-grow overflow-y-auto custom-scrollbar">
                        <ul className="divide-y divide-[#1A2A3A] m-0 p-0 list-none">
                            {PENDING_REQUESTS.map((item, i) => {
                                const isSelected = i === 0;
                                return (
                                    <li key={item.id}>
                                        <button
                                            type="button"
                                            className={`w-full text-left p-5 flex gap-4 transition-all focus:outline-none focus:bg-[#1A2A3A]/40 
                                                ${isSelected
                                                    ? 'bg-[#1A2A3A]/50 border-l-4 border-l-[#0066FF]'
                                                    : 'hover:bg-[#1A2A3A]/30 border-l-4 border-l-transparent'
                                                }`}
                                            aria-pressed={isSelected}
                                            aria-label={`View request from ${item.name} for ${item.req}`}
                                        >
                                            <div className="w-10 h-10 rounded-full bg-[#1A2A3A] border border-[#334455] flex justify-center items-center font-bold text-white flex-shrink-0 shadow-inner" aria-hidden="true">
                                                {item.avatar}
                                            </div>
                                            <div className="flex-grow">
                                                <div className="flex justify-between items-start mb-1.5">
                                                    <div className="font-bold text-white text-sm">
                                                        {item.name} <span className="text-[#8899AA] font-normal text-xs ml-1 whitespace-nowrap hidden sm:inline-block md:hidden 2xl:inline-block">• {item.title}</span>
                                                    </div>
                                                    <div className="text-xs text-[#8899AA] font-medium whitespace-nowrap">{item.date}</div>
                                                </div>
                                                <div className="text-sm font-semibold text-[#00E5A0] mb-2">Req: {item.req}</div>
                                                <div className="inline-flex text-[10px] font-bold uppercase tracking-wider text-[#0066FF] bg-[#0066FF]/10 px-2 py-0.5 rounded border border-[#0066FF]/20">
                                                    Awaiting IT Approval
                                                </div>
                                            </div>
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </section>

                {/* Details Column */}
                <section className="w-full lg:w-7/12 xl:w-2/3 bg-[#0D1928] border border-[#1A2A3A] rounded-2xl flex flex-col relative overflow-hidden shadow-sm flex-grow" aria-labelledby="detail-heading">
                    <div className="flex-grow overflow-y-auto p-6 md:p-8 custom-scrollbar">
                        <header className="flex items-center gap-5 mb-8">
                            <div className="w-16 h-16 rounded-full bg-[#1A2A3A] border-2 border-[#334455] flex justify-center items-center font-bold text-2xl text-white shadow-inner" aria-hidden="true">
                                J
                            </div>
                            <div>
                                <h1 id="detail-heading" className="text-2xl font-bold text-white m-0">John Doe</h1>
                                <p className="text-sm text-[#8899AA] mt-1">Frontend Engineer • Engineering Department</p>
                            </div>
                        </header>

                        <div className="p-6 rounded-xl bg-[#0A1420] border border-[#1A2A3A] mb-8 relative shadow-sm">
                            <div className="absolute top-4 right-4 opacity-10 text-6xl pointer-events-none select-none" aria-hidden="true">💻</div>
                            <h2 className="text-xs font-bold text-[#8899AA] uppercase tracking-wider mb-3">Request Details</h2>
                            <div className="text-xl font-bold text-white mb-3">Cursor AI - Pro Plan</div>
                            <div className="text-xs font-mono text-[#00E5A0] border border-[#00E5A0]/20 bg-[#00E5A0]/10 inline-flex px-2.5 py-1 rounded font-medium">
                                Cost: ₹1,600 / month
                            </div>

                            <div className="mt-6 border-t border-[#1A2A3A] pt-5">
                                <h3 className="font-semibold text-white text-sm mb-2">Business Justification:</h3>
                                <p className="text-sm text-[#8899AA] leading-relaxed italic m-0">
                                    "I need the Pro plan for Cursor AI to leverage advanced AI capabilities like codebase indexing and fast GPT-4 requests, which will significantly speed up the frontend development for the new HR dashboard project."
                                </p>
                            </div>
                        </div>

                        <div className="mb-4">
                            <h2 className="text-xs font-bold text-[#8899AA] uppercase tracking-wider mb-5 border-b border-[#1A2A3A] pb-3">Approval Workflow</h2>

                            {/* Accessible Stepper */}
                            <ol className="relative border-l-2 border-[#334455] ml-3.5 space-y-8 list-none p-0 m-0">
                                <li className="relative pl-8">
                                    <div className="absolute w-6 h-6 bg-[#00E5A0] rounded-full -left-[13px] top-0 flex items-center justify-center ring-4 ring-[#0D1928] shadow-sm">
                                        <Check size={12} className="text-[#060B14] font-bold" aria-hidden="true" />
                                    </div>
                                    <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl p-4 shadow-sm inline-block min-w-[250px]">
                                        <div className="flex items-center gap-3 mb-1">
                                            <div className="w-6 h-6 rounded-full bg-[#1A2A3A] flex items-center justify-center text-xs text-white font-bold" aria-hidden="true">A</div>
                                            <h3 className="text-sm font-bold text-white m-0">Manager Approved</h3>
                                        </div>
                                        <p className="text-xs text-[#8899AA] m-0 pl-9">Alex Manager • 2 hours ago</p>
                                    </div>
                                </li>
                                <li className="relative pl-8">
                                    <div className="absolute w-6 h-6 bg-[#0066FF] rounded-full -left-[13px] top-0 flex items-center justify-center ring-4 ring-[#0D1928] shadow-[0_0_10px_rgba(0,102,255,0.4)]">
                                        <div className="w-2 h-2 bg-white rounded-full"></div>
                                    </div>
                                    <div className="bg-[#0066FF]/5 border border-[#0066FF]/30 rounded-xl p-4 shadow-sm inline-block min-w-[250px]">
                                        <h3 className="text-sm font-bold text-[#0066FF] m-0 mb-1">IT Administrator</h3>
                                        <p className="text-xs text-[#8899AA] m-0">Pending your action</p>
                                    </div>
                                </li>
                            </ol>
                        </div>
                    </div>

                    {/* Action Area */}
                    <form
                        className="p-5 md:p-6 bg-[#0A1420] border-t border-[#1A2A3A] rounded-b-2xl mt-auto"
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex-grow relative">
                                <label htmlFor="approval-comment" className="sr-only">Add comment to requester</label>
                                <MessageSquare size={16} className="absolute left-4 top-3.5 text-[#445566]" aria-hidden="true" />
                                <textarea
                                    id="approval-comment"
                                    placeholder="Add an optional comment to the requester..."
                                    className="w-full h-12 bg-[#060B14] border border-[#1A2A3A] rounded-xl pl-11 pr-4 py-3 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#0066FF] focus:border-[#0066FF] transition-all resize-none placeholder-[#445566]"
                                ></textarea>
                            </div>
                            <div className="flex gap-3 sm:flex-shrink-0">
                                <Button
                                    type="button"
                                    variant="secondary"
                                    className="h-12 w-12 !p-0 flex items-center justify-center border-[#FF4444]/30 hover:border-[#FF4444] hover:bg-[#FF4444]/10 text-[#FF4444] transition-all focus:ring-2 focus:ring-[#FF4444]"
                                    aria-label="Reject Request"
                                    title="Reject Request"
                                >
                                    <X size={20} aria-hidden="true" />
                                </Button>
                                <Button
                                    type="submit"
                                    variant="primary"
                                    icon={<Check size={18} aria-hidden="true" />}
                                    className="h-12 px-6 font-bold bg-[#00E5A0] hover:bg-[#00E5A0]/90 text-black border-transparent shadow-[0_0_15px_rgba(0,229,160,0.2)] focus:ring-2 focus:ring-[#00E5A0]"
                                >
                                    Provision & Approve
                                </Button>
                            </div>
                        </div>
                    </form>
                </section>
            </div>
        </main>
    );
}
