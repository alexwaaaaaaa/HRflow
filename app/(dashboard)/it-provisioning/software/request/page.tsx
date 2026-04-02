"use client";

import { Send, Clock, Search, ChevronRight, CheckCircle2 } from "lucide-react";
import Button from "@/components/ui/Button";

// --- Mock Data ---
const SOFTWARE_CATALOG = [
    { id: "sw-figma", name: "Figma", desc: "Design & Prototyping", icon: "✨", popular: true },
    { id: "sw-notion", name: "Notion", desc: "Workspace & Docs", icon: "📓", popular: true },
    { id: "sw-cursor", name: "Cursor AI", desc: "AI Code Editor", icon: "💻", popular: false },
    { id: "sw-grammarly", name: "Grammarly", desc: "Writing Assistant", icon: "✍️", popular: false },
    { id: "sw-zoom", name: "Zoom Pro", desc: "Video Conferencing", icon: "🎥", popular: false },
];

export default function SoftwareRequestEmployeeScreen() {
    return (
        <main className="px-8 py-6 pb-16 animate-fade-in relative max-w-5xl mx-auto min-h-screen pt-12 md:pt-16">
            {/* Page Header */}
            <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 border-b border-[#1A2A3A] pb-6">
                <div>
                    <h1 className="text-3xl font-bold text-white m-0 tracking-tight">Request Software</h1>
                    <p className="text-sm text-[#8899AA] mt-1.5">Need access to a tool? Submit a request to the IT team.</p>
                </div>
                <Button variant="secondary" icon={<Clock size={16} />} className="h-10 px-4 shadow-sm hover:border-[#334455] transition-all">
                    My Past Requests
                </Button>
            </header>

            <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
                {/* Available Catalog Section */}
                <section className="w-full md:w-5/12 lg:w-1/3 flex flex-col border-b md:border-b-0 md:border-r border-[#1A2A3A] pb-8 md:pb-0 md:pr-8 lg:pr-12" aria-labelledby="catalog-heading">
                    <h2 id="catalog-heading" className="text-lg font-bold text-white mb-6">Software Catalog</h2>

                    <div className="relative mb-6">
                        <label htmlFor="search-catalog" className="sr-only">Search tools</label>
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#445566]" size={16} aria-hidden="true" />
                        <input
                            id="search-catalog"
                            type="search"
                            placeholder="Search tools..."
                            className="w-full h-11 bg-[#060B14] border border-[#1A2A3A] rounded-xl pl-10 pr-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#0066FF] focus:border-[#0066FF] transition-all shadow-sm placeholder-[#445566]"
                        />
                    </div>

                    <div className="flex-grow overflow-y-auto max-h-[500px] custom-scrollbar -mr-2 pr-2">
                        <ul className="space-y-3 m-0 p-0 list-none">
                            {SOFTWARE_CATALOG.map((sw, i) => {
                                const isSelected = i === 0;
                                return (
                                    <li key={sw.id}>
                                        <button
                                            type="button"
                                            className={`w-full text-left p-4 rounded-xl border flex items-center justify-between transition-all group focus:outline-none focus:ring-2 focus:ring-[#0066FF] focus:ring-offset-2 focus:ring-offset-[#0D1928] ${isSelected
                                                    ? 'bg-[#0066FF]/10 border-[#0066FF] ring-1 ring-[#0066FF] shadow-[0_0_15px_rgba(0,102,255,0.1)]'
                                                    : 'bg-[#0D1928] border-[#1A2A3A] hover:border-[#334455] hover:bg-[#1A2A3A]/30'
                                                }`}
                                            aria-pressed={isSelected}
                                            aria-label={`Select ${sw.name}`}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="text-2xl flex-shrink-0 w-10 h-10 flex items-center justify-center bg-[#060B14] rounded-lg border border-[#1A2A3A]" aria-hidden="true">
                                                    {sw.icon}
                                                </div>
                                                <div>
                                                    <div className="text-sm font-bold text-white flex items-center gap-2 mb-0.5">
                                                        {sw.name}
                                                        {sw.popular && (
                                                            <span className="text-[9px] uppercase tracking-wider bg-[#FFB800] text-[#060B14] px-1.5 py-0.5 rounded font-black shadow-sm">Popular</span>
                                                        )}
                                                    </div>
                                                    <div className="text-xs text-[#8899AA]">{sw.desc}</div>
                                                </div>
                                            </div>
                                            <ChevronRight size={18} className={`transition-transform duration-200 ${isSelected ? 'text-[#0066FF] translate-x-1' : 'text-[#445566] group-hover:text-[#8899AA]'}`} aria-hidden="true" />
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </section>

                {/* Request Form Section */}
                <section className="w-full md:w-7/12 lg:w-2/3 flex flex-col" aria-labelledby="request-heading">
                    <h2 id="request-heading" className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                        Request Details: <span className="text-[#0066FF] max-w-xs truncate">Figma</span>
                    </h2>

                    <form
                        className="bg-[#0D1928] border border-[#1A2A3A] rounded-2xl p-6 md:p-8 space-y-7 shadow-sm"
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="license-type" className="block text-sm font-semibold text-[#8899AA] mb-2">
                                    License Type Needed <span className="text-[#FF4444]" aria-hidden="true">*</span>
                                    <span className="sr-only">Required</span>
                                </label>
                                <div className="relative">
                                    <select
                                        id="license-type"
                                        required
                                        className="w-full h-11 bg-[#060B14] border border-[#1A2A3A] rounded-xl px-4 pr-10 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#0066FF] focus:border-[#0066FF] transition-colors appearance-none shadow-sm cursor-pointer"
                                    >
                                        <option value="" disabled>Select a license type...</option>
                                        <option value="view">View Only (Free)</option>
                                        <option value="dev">Dev Mode (Paid)</option>
                                        <option value="edit">Full Editor (Paid)</option>
                                    </select>
                                    <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-[#8899AA]">
                                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="justification" className="block text-sm font-semibold text-[#8899AA] mb-2">
                                    Business Justification <span className="text-[#FF4444]" aria-hidden="true">*</span>
                                    <span className="sr-only">Required</span>
                                </label>
                                <textarea
                                    id="justification"
                                    required
                                    placeholder="Explain why you need this software for your work... (e.g., Working on the Q3 Marketing Campaign UI)"
                                    className="w-full h-32 bg-[#060B14] border border-[#1A2A3A] rounded-xl p-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#0066FF] focus:border-[#0066FF] transition-colors resize-none shadow-sm placeholder-[#445566]"
                                ></textarea>
                            </div>

                            <fieldset className="p-0 m-0 border-0">
                                <legend className="block text-sm font-semibold text-[#8899AA] mb-3">Duration Needed</legend>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <label className="flex items-center gap-3 cursor-pointer group p-3 rounded-lg border border-[#1A2A3A] bg-[#0A1420] hover:border-[#334455] transition-colors flex-1">
                                        <div className="relative flex items-center justify-center">
                                            <input
                                                type="radio"
                                                name="duration"
                                                value="permanent"
                                                className="peer appearance-none w-4 h-4 rounded-full border border-[#445566] checked:border-[#0066FF] bg-[#060B14] transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0066FF] focus:ring-offset-2 focus:ring-offset-[#0A1420]"
                                                defaultChecked
                                            />
                                            <div className="absolute w-2 h-2 rounded-full bg-[#0066FF] scale-0 peer-checked:scale-100 transition-transform pointer-events-none"></div>
                                        </div>
                                        <span className="text-sm text-white font-medium select-none">Permanent <span className="text-[#8899AA] font-normal block text-xs mt-0.5">Role requirement</span></span>
                                    </label>
                                    <label className="flex items-center gap-3 cursor-pointer group p-3 rounded-lg border border-[#1A2A3A] bg-[#0A1420] hover:border-[#334455] transition-colors flex-1">
                                        <div className="relative flex items-center justify-center">
                                            <input
                                                type="radio"
                                                name="duration"
                                                value="temporary"
                                                className="peer appearance-none w-4 h-4 rounded-full border border-[#445566] checked:border-[#0066FF] bg-[#060B14] transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0066FF] focus:ring-offset-2 focus:ring-offset-[#0A1420]"
                                            />
                                            <div className="absolute w-2 h-2 rounded-full bg-[#0066FF] scale-0 peer-checked:scale-100 transition-transform pointer-events-none"></div>
                                        </div>
                                        <span className="text-sm text-white font-medium select-none">Temporary <span className="text-[#8899AA] font-normal block text-xs mt-0.5">Project specific</span></span>
                                    </label>
                                </div>
                            </fieldset>
                        </div>

                        <div className="bg-[#0A1420] border border-[#1A2A3A] rounded-xl p-4 flex gap-3 shadow-inner">
                            <CheckCircle2 className="text-[#00E5A0] flex-shrink-0 mt-0.5" size={18} aria-hidden="true" />
                            <p className="text-xs text-[#8899AA] leading-relaxed m-0">
                                <strong>Approval Workflow:</strong> Your manager (David Miller) → IT Admin → Provisioning.<br />
                                <em>Note: Paid licenses require additional Finance approval.</em>
                            </p>
                        </div>

                        <Button type="submit" variant="primary" icon={<Send size={16} />} className="w-full h-12 font-bold shadow-[0_0_20px_rgba(0,102,255,0.2)]">
                            Submit Request
                        </Button>
                    </form>
                </section>
            </div>
        </main>
    );
}
