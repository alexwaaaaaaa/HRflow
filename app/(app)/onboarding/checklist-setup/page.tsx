"use client";
import React, { useState } from "react";
import {
    Plus, GripVertical, Settings2, Trash2, Edit3, Lock, Users,
    CheckSquare, FileText, Link as LinkIcon, AlertCircle, LayoutGrid, Calendar
} from "lucide-react";

// Mock Data
const PHASES = [
    { id: "p1", name: "Pre-boarding", duration: "Before Day 1", active: true },
    { id: "p2", name: "Day 1 Setup", duration: "Day 1", active: true },
    { id: "p3", name: "First Week", duration: "Days 2-7", active: true },
    { id: "p4", name: "First 30 Days", duration: "Days 8-30", active: true },
    { id: "p5", name: "60-90 Days", duration: "Days 31-90", active: false },
];

const TASKS = [
    { id: 1, phase: "p1", title: "Sign Offer Letter & NDA", type: "Document", assignee: "Candidate", required: true },
    { id: 2, phase: "p1", title: "Submit Bank Setup Details", type: "Form", assignee: "Candidate", required: true },
    { id: 3, phase: "p1", title: "Trigger BG Verification", type: "Action", assignee: "HR Admin", required: true },
    { id: 4, phase: "p2", title: "IT Laptop Provisioning", type: "Hardware", assignee: "IT Support", required: true },
    { id: 5, phase: "p2", title: "Welcome Breakfast", type: "Meeting", assignee: "Manager", required: false },
    { id: 6, phase: "p2", title: "Email Account Setup", type: "IT Task", assignee: "IT Support", required: true },
    { id: 7, phase: "p3", title: "Team Introduction Call", type: "Meeting", assignee: "Manager", required: true },
    { id: 8, phase: "p3", title: "Assign Product Buddy", type: "Action", assignee: "Manager", required: true },
    { id: 9, phase: "p4", title: "Complete Mandatory Sec Compliance", type: "Training", assignee: "Candidate", required: true },
    { id: 10, phase: "p4", title: "30-Day Check-in Review", type: "Meeting", assignee: "HR Admin", required: true },
];

export default function ChecklistSetup() {
    const [selectedPhase, setSelectedPhase] = useState("p1");

    const activeTasks = TASKS.filter(t => t.phase === selectedPhase);

    return (
        <div className="p-6 max-w-[1600px] mx-auto h-[calc(100vh-80px)] flex flex-col">
            <div className="flex items-center justify-between mb-6 shrink-0">
                <div>
                    <h1 className="text-2xl font-bold text-white">Onboarding Workflow Builder</h1>
                    <p className="text-[#8899AA] text-sm mt-1">Configure automated task sequences and assignments per phase</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-4 py-2 bg-[#1A2A3A] text-white rounded-lg border border-[#2A3A4A] hover:bg-[#2A3A4A] transition-colors text-sm font-medium flex items-center gap-2">
                        <Settings2 size={16} /> Workflow Settings
                    </button>
                    <button className="px-4 py-2 bg-[#00E5A0] text-[#0A1420] rounded-lg hover:bg-[#00c98d] transition-colors text-sm font-semibold flex items-center gap-2">
                        <CheckSquare size={16} /> Publish Workflow
                    </button>
                </div>
            </div>

            <div className="flex gap-6 flex-1 min-h-0">
                {/* Left pane: Phases */}
                <div className="w-[300px] shrink-0 bg-[#0F1C2E] border border-[#1A2A3A] rounded-xl flex flex-col">
                    <div className="p-4 border-b border-[#1A2A3A] flex items-center justify-between">
                        <h2 className="text-white font-semibold">Journey Phases</h2>
                        <button className="p-1.5 text-[#00E5A0] hover:bg-[#00E5A0]/10 rounded-md transition-colors">
                            <Plus size={16} />
                        </button>
                    </div>
                    <div className="flex-1 overflow-y-auto p-3 space-y-2">
                        {PHASES.map((phase, i) => (
                            <div
                                key={phase.id}
                                onClick={() => setSelectedPhase(phase.id)}
                                className={`p-3 rounded-lg border cursor-pointer transition-all ${selectedPhase === phase.id ? 'bg-[#1A2A3A] border-[#00E5A0] shadow-[0_0_15px_rgba(0,229,160,0.1)]' : 'bg-transparent border-[#1A2A3A] hover:border-[#2A3A4A] hover:bg-[#1A2A3A]/50'}`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="cursor-grab text-[#445566] hover:text-[#8899AA]">
                                        <GripVertical size={16} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between">
                                            <span className={`text-[15px] font-semibold truncate ${selectedPhase === phase.id ? 'text-white' : 'text-[#8899AA]'}`}>
                                                {i + 1}. {phase.name}
                                            </span>
                                            {!phase.active && <Lock size={12} className="text-[#445566]" />}
                                        </div>
                                        <div className="text-xs text-[#445566] mt-0.5">{phase.duration}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right pane: Task Editor */}
                <div className="flex-1 bg-[#0F1C2E] border border-[#1A2A3A] rounded-xl flex flex-col overflow-hidden">
                    <div className="p-5 border-b border-[#1A2A3A] shrink-0 bg-[#152336]">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                                    {PHASES.find(p => p.id === selectedPhase)?.name}
                                </h2>
                                <p className="text-[#8899AA] text-xs mt-1">Configure tasks triggered during '{PHASES.find(p => p.id === selectedPhase)?.duration}'</p>
                            </div>
                            <button className="px-3 py-1.5 bg-[#00E5A0]/10 text-[#00E5A0] rounded-lg hover:bg-[#00E5A0]/20 transition-colors text-sm font-medium border border-[#00E5A0]/20 flex items-center gap-2">
                                <Plus size={14} /> Add Task
                            </button>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-5 space-y-3 bg-[#0A1420]/30 h-full">
                        {activeTasks.length > 0 ? activeTasks.map((task) => (
                            <div key={task.id} className="group flex items-start gap-4 p-4 rounded-xl border border-[#1A2A3A] bg-[#0F1C2E] hover:border-[#2A3A4A] transition-colors relative">
                                <div className="mt-1 flex gap-2">
                                    <div className="cursor-grab text-[#445566] hover:text-[#8899AA]">
                                        <GripVertical size={18} />
                                    </div>
                                    {task.type === 'Document' ? <FileText size={18} className="text-[#33E6FF]" /> :
                                        task.type === 'Form' ? <CheckSquare size={18} className="text-[#00E5A0]" /> :
                                            task.type === 'Meeting' ? <Calendar size={18} className="text-[#9D00FF]" /> :
                                                <LayoutGrid size={18} className="text-[#FFB020]" />}
                                </div>

                                <div className="flex-1 min-w-0 pr-12">
                                    <div className="flex items-center gap-3 mb-1.5">
                                        <h3 className="text-[15px] font-medium text-white group-hover:text-[#00E5A0] transition-colors">{task.title}</h3>
                                        {task.required && (
                                            <span className="text-[10px] font-bold tracking-wider text-[#FF4444] bg-[#FF4444]/10 px-2 py-0.5 rounded uppercase">Required</span>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-4 text-xs mt-2">
                                        <div className="flex items-center gap-1.5 text-[#8899AA] bg-[#1A2A3A] px-2 py-1 rounded">
                                            <Users size={12} className="text-[#445566]" />
                                            Assignee: <span className="text-white font-medium">{task.assignee}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-[#8899AA] bg-[#1A2A3A] px-2 py-1 rounded">
                                            <LinkIcon size={12} className="text-[#445566]" />
                                            Type: <span className="text-white font-medium">{task.type}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Actions Hover */}
                                <div className="absolute top-4 right-4 flex items-center gap-1 bg-[#0F1C2E] pl-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="p-2 text-[#8899AA] hover:text-[#00E5A0] hover:bg-[#00E5A0]/10 rounded-lg transition-colors">
                                        <Edit3 size={16} />
                                    </button>
                                    <button className="p-2 text-[#8899AA] hover:text-[#FF4444] hover:bg-[#FF4444]/10 rounded-lg transition-colors">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        )) : (
                            <div className="text-center py-20 px-4">
                                <div className="w-16 h-16 bg-[#1A2A3A] rounded-full flex items-center justify-center mx-auto mb-4">
                                    <AlertCircle size={24} className="text-[#445566]" />
                                </div>
                                <h3 className="text-white font-medium text-lg mb-1">No tasks in this phase</h3>
                                <p className="text-[#8899AA] text-sm">Click "Add Task" to create the first step for {PHASES.find(p => p.id === selectedPhase)?.name}.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
