"use client";

import Page from "@/components/ui/Page";
import React, { useState, useRef } from 'react';
import {
    FileEdit, Users, Calendar, Plus, Trash2, GripVertical, CheckCircle2, ChevronRight, CheckSquare, AlignLeft, ChevronDown, Clock
} from 'lucide-react';
import { useRouter } from 'next/navigation';

const QUESTION_TYPES = [
    { id: 'rating', name: 'Rating Scale (1-5)', icon: StarIcon },
    { id: 'choice', name: 'Multiple Choice', icon: CheckSquare },
    { id: 'text', name: 'Short Text', icon: AlignLeft },
    { id: 'long_text', name: 'Long Answer', icon: AlignLeft },
    { id: 'enps', name: 'eNPS Score (0-10)', icon: FileEdit },
];

export default function CreateSurveyScreen() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('build');
    const [surveyTitle, setSurveyTitle] = useState('New Q4 Feedback Survey');
    const [surveyDesc, setSurveyDesc] = useState('Help us improve the workplace by sharing your honest feedback.');

    const [questions, setQuestions] = useState([
        { id: 1, type: 'rating', text: 'How would you rate your work-life balance currently?', required: true, options: [] },
        { id: 2, type: 'choice', text: 'Which benefits are most important to you?', required: true, options: ['Health Insurance', 'Flexible Hours', 'Stock Options', 'Learning Budget'] },
    ]);

    const [audience, setAudience] = useState('All Employees');
    const [isAnonymous, setIsAnonymous] = useState(true);
    const [isPublishing, setIsPublishing] = useState(false);
    const nextIdRef = useRef(1000);

    const handleAddQuestion = (typeId: string) => {
        // Use a monotonically-increasing ref instead of `Date.now()` —
        // pure under React 19 strict mode and immune to clock skew /
        // duplicate IDs when two questions are added in the same ms.
        nextIdRef.current += 1;
        const newQ = {
            id: nextIdRef.current,
            type: typeId,
            text: '',
            required: false,
            options: typeId === 'choice' ? ['Option 1'] : [],
        };
        setQuestions([...questions, newQ]);
    };

    const removeQuestion = (id: number) => {
        setQuestions(questions.filter(q => q.id !== id));
    };

    const publishSurvey = (e: React.FormEvent) => {
        e.preventDefault();
        setIsPublishing(true);
        setTimeout(() => {
            setIsPublishing(false);
            router.push('/engagement/surveys/dashboard');
        }, 1500);
    };

    return (
        <Page
            title="Target Audience"
            subtitle="Who should receive this survey?"
            breadcrumbs={[{ label: "Engagement", href: "/engagement" }, { label: "Surveys", href: "/engagement/surveys" }, { label: "Create" }]}
            maxWidth="1200px"
        >

        <div className="p-6 max-w-[1200px] mx-auto min-h-[calc(100vh-80px)] font-sans">

            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-white mb-2 flex items-center gap-3">
                        <FileEdit size={32} className="text-[#33E6FF]" />
                        <input
                            type="text"
                            value={surveyTitle}
                            onChange={(e) => setSurveyTitle(e.target.value)}
                            className="bg-transparent border-none p-0 text-3xl font-extrabold focus:outline-none focus:ring-0 text-white w-full sm:w-[400px] border-b border-transparent focus:border-[#33E6FF] transition-colors"
                        />
                    </h1>
                    <input
                        type="text"
                        value={surveyDesc}
                        onChange={(e) => setSurveyDesc(e.target.value)}
                        className="bg-transparent border-none p-0 text-[#8899AA] w-full max-w-[600px] focus:outline-none focus:ring-0 border-b border-transparent focus:border-[#33E6FF] transition-colors"
                    />
                </div>
                <div className="flex items-center gap-3 shrink-0">
                    <button className="px-5 py-2.5 bg-[#1A2A3A] text-white border border-[#2A3A4A] font-bold rounded-xl hover:bg-[#2A3A4A] transition-colors">
                        Save Draft
                    </button>
                    <button
                        onClick={publishSurvey}
                        disabled={isPublishing || questions.length === 0}
                        className="px-6 py-2.5 bg-[#00E5A0] text-[#0A1420] font-bold rounded-xl hover:bg-[#00c98d] transition-colors shadow-[0_5px_15px_rgba(0,229,160,0.2)] flex items-center gap-2 disabled:opacity-50"
                    >
                        {isPublishing ? <span className="w-5 h-5 border-2 border-[#0A1420]/30 border-t-[#0A1420] rounded-full animate-spin"></span> : <><CheckCircle2 size={18} /> Publish Survey</>}
                    </button>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 items-start">

                {/* Sidebar Tabs */}
                <div className="w-full lg:w-[260px] shrink-0 sticky top-6">
                    <div className="bg-[#0F1C2E] border border-[#1A2A3A] rounded-3xl p-4 shadow-xl flex flex-col gap-2">
                        {[
                            { id: 'build', name: 'Builder', icon: FileEdit },
                            { id: 'audience', name: 'Audience & Settings', icon: Users },
                            { id: 'schedule', name: 'Schedule', icon: Calendar },
                        ].map(tab => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${activeTab === tab.id ? 'bg-[#33E6FF]/10 text-[#33E6FF] font-bold shadow-md' : 'text-[#8899AA] hover:bg-[#1A2A3A] hover:text-white font-medium'}`}
                                >
                                    <span className="flex items-center gap-3"><Icon size={18} /> {tab.name}</span>
                                    {activeTab === tab.id && <ChevronRight size={16} />}
                                </button>
                            )
                        })}
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 w-full relative">

                    {activeTab === 'build' && (
                        <div className="animate-in fade-in slide-in-from-right-4 space-y-6">
                            {/* Question List */}
                            <div className="space-y-4">
                                {questions.map((q, index) => (
                                    <div key={q.id} className="bg-[#0F1C2E] border border-[#2A3A4A] rounded-3xl p-6 shadow-xl relative group focus-within:border-[#33E6FF] transition-colors">
                                        <div className="absolute top-1/2 -left-3 -translate-y-1/2 p-1.5 bg-[#152336] border border-[#2A3A4A] rounded cursor-grab opacity-0 group-hover:opacity-100 transition-opacity">
                                            <GripVertical size={16} className="text-[#8899AA]" />
                                        </div>

                                        <div className="flex items-start justify-between gap-4 mb-4">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <span className="text-[#33E6FF] font-black text-lg">Q{index + 1}.</span>
                                                    <span className="px-2 py-0.5 rounded bg-[#1A2A3A] border border-[#2A3A4A] text-xs font-bold text-[#8899AA] uppercase tracking-wider">
                                                        {QUESTION_TYPES.find(qt => qt.id === q.type)?.name}
                                                    </span>
                                                </div>
                                                <input
                                                    type="text"
                                                    value={q.text}
                                                    onChange={(e) => {
                                                        const updated = questions.map(quest => quest.id === q.id ? { ...quest, text: e.target.value } : quest);
                                                        setQuestions(updated);
                                                    }}
                                                    placeholder="Enter your question here..."
                                                    className="w-full bg-transparent border-none p-0 text-white text-lg focus:outline-none focus:ring-0 placeholder:text-[#445566]"
                                                />
                                            </div>
                                        </div>

                                        {/* Dynamic Fields based on type */}
                                        <div className="pl-[38px]">
                                            {q.type === 'rating' && (
                                                <div className="flex items-center gap-4 text-[#445566]">
                                                    {[1, 2, 3, 4, 5].map(star => <StarIcon key={star} size={24} />)}
                                                </div>
                                            )}

                                            {q.type === 'choice' && (
                                                <div className="space-y-2">
                                                    {q.options.map((opt, oIndex) => (
                                                        <div key={oIndex} className="flex items-center gap-3">
                                                            <div className="w-4 h-4 rounded-full border-2 border-[#445566]"></div>
                                                            <input
                                                                type="text" value={opt}
                                                                onChange={(e) => {
                                                                    const updatedOps = [...q.options];
                                                                    updatedOps[oIndex] = e.target.value;
                                                                    const updated = questions.map(quest => quest.id === q.id ? { ...quest, options: updatedOps } : quest);
                                                                    setQuestions(updated);
                                                                }}
                                                                className="bg-transparent border-none p-0 text-[#CCDDEE] text-sm focus:outline-none focus:ring-0 w-full max-w-[300px]"
                                                            />
                                                        </div>
                                                    ))}
                                                    <button
                                                        onClick={() => {
                                                            const updatedOps = [...q.options, `Option ${q.options.length + 1}`];
                                                            const updated = questions.map(quest => quest.id === q.id ? { ...quest, options: updatedOps } : quest);
                                                            setQuestions(updated);
                                                        }}
                                                        className="text-[#33E6FF] text-sm font-bold flex items-center gap-1 mt-2 hover:underline"
                                                    >
                                                        <Plus size={14} /> Add Option
                                                    </button>
                                                </div>
                                            )}

                                            {['text', 'long_text'].includes(q.type) && (
                                                <div className="w-full border-b-2 border-dashed border-[#2A3A4A] py-2 text-[#445566] text-sm">
                                                    Respondent will type answer here...
                                                </div>
                                            )}
                                        </div>

                                        {/* Bottom Bar */}
                                        <div className="mt-6 pt-4 border-t border-[#1A2A3A] flex justify-between items-center">
                                            <label className="flex items-center gap-2 cursor-pointer">
                                                <div className={`w-10 h-6 rounded-full p-1 transition-colors ${q.required ? 'bg-[#33E6FF]' : 'bg-[#1A2A3A]'}`}>
                                                    <div className={`w-4 h-4 rounded-full bg-white transition-transform ${q.required ? 'translate-x-4' : 'translate-x-0'}`}></div>
                                                </div>
                                                <span className="text-sm font-bold text-[#8899AA]">Required</span>
                                            </label>
                                            <button onClick={() => removeQuestion(q.id)} className="text-[#8899AA] hover:text-[#FF4444] p-2 rounded-lg hover:bg-[#FF4444]/10 transition-colors">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Add Question Menu */}
                            <div className="bg-[#0A1420] border-2 border-dashed border-[#2A3A4A] rounded-3xl p-6 text-center">
                                <h3 className="text-white font-bold mb-4">Add a new question</h3>
                                <div className="flex flex-wrap items-center justify-center gap-3">
                                    {QUESTION_TYPES.map(qt => {
                                        const Icon = qt.icon;
                                        return (


                                            <button
                                                key={qt.id}
                                                onClick={() => handleAddQuestion(qt.id)}
                                                className="px-4 py-2.5 bg-[#152336] border border-[#2A3A4A] rounded-xl text-sm font-bold text-[#CCDDEE] hover:border-[#33E6FF] hover:text-[#33E6FF] transition-colors flex items-center gap-2"
                                            >
                                                <Icon size={16} /> {qt.name}
                                            </button>
                                        
        
)
                                    })}
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'audience' && (
                        <div className="animate-in fade-in slide-in-from-right-4 space-y-6">
                            <div className="bg-[#0F1C2E] border border-[#2A3A4A] rounded-3xl p-8 shadow-xl space-y-8">

                                <div>
                                    <h2 className="text-xl font-bold text-white mb-2">Target Audience</h2>
                                    <p className="text-[#8899AA] text-sm mb-4">Who should receive this survey?</p>

                                    <div className="relative">
                                        <button className="w-full flex items-center justify-between bg-[#152336] border border-[#2A3A4A] rounded-xl px-4 py-3 text-white text-left focus:border-[#33E6FF]">
                                            <span className="font-bold">{audience}</span>
                                            <ChevronDown size={18} className="text-[#8899AA]" />
                                        </button>
                                    </div>
                                    <div className="mt-4 flex gap-2">
                                        {['All Employees', 'Engineering', 'New Hires (last 30 days)'].map(aud => (
                                            <button
                                                key={aud} onClick={() => setAudience(aud)}
                                                className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${audience === aud ? 'bg-[#33E6FF]/10 border-[#33E6FF] text-[#33E6FF]' : 'bg-[#1A2A3A] border-[#2A3A4A] text-[#8899AA] hover:text-white'}`}
                                            >
                                                {aud}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="h-px w-full bg-[#1A2A3A]"></div>

                                <div>
                                    <h2 className="text-xl font-bold text-white mb-2">Anonymity & Privacy</h2>
                                    <p className="text-[#8899AA] text-sm mb-6">Configure how responses are tracked.</p>

                                    <div className="space-y-4">
                                        <label className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-colors ${isAnonymous ? 'border-[#33E6FF] bg-[#33E6FF]/5' : 'border-[#2A3A4A] bg-[#152336]'}`}>
                                            <input type="radio" name="anon" className="sr-only" checked={isAnonymous} onChange={() => setIsAnonymous(true)} />
                                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${isAnonymous ? 'border-[#33E6FF]' : 'border-[#445566]'}`}>
                                                {isAnonymous && <div className="w-3 h-3 rounded-full bg-[#33E6FF]"></div>}
                                            </div>
                                            <div>
                                                <h4 className={`font-bold mb-1 ${isAnonymous ? 'text-white' : 'text-[#CCDDEE]'}`}>Fully Anonymous</h4>
                                                <p className="text-[#8899AA] text-sm">HR and managers cannot link responses back to individuals. Best for honest feedback.</p>
                                            </div>
                                        </label>

                                        <label className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-colors ${!isAnonymous ? 'border-[#FFB020] bg-[#FFB020]/5' : 'border-[#2A3A4A] bg-[#152336]'}`}>
                                            <input type="radio" name="anon" className="sr-only" checked={!isAnonymous} onChange={() => setIsAnonymous(false)} />
                                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${!isAnonymous ? 'border-[#FFB020]' : 'border-[#445566]'}`}>
                                                {!isAnonymous && <div className="w-3 h-3 rounded-full bg-[#FFB020]"></div>}
                                            </div>
                                            <div>
                                                <h4 className={`font-bold mb-1 ${!isAnonymous ? 'text-white' : 'text-[#CCDDEE]'}`}>Identifiable Responses</h4>
                                                <p className="text-[#8899AA] text-sm">Responses are linked to employee profiles. Requires user consent before taking survey.</p>
                                            </div>
                                        </label>
                                    </div>
                                </div>

                            </div>
                        </div>
                    )}

                    {activeTab === 'schedule' && (
                        <div className="animate-in fade-in slide-in-from-right-4 space-y-6">
                            <div className="bg-[#0F1C2E] border border-[#2A3A4A] rounded-3xl p-8 shadow-xl">
                                <h2 className="text-xl font-bold text-white mb-6">Delivery Schedule</h2>

                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-bold text-[#8899AA] uppercase tracking-wider mb-2">Launch Date</label>
                                            <div className="relative">
                                                <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#445566]" />
                                                <input type="date" className="w-full bg-[#152336] border border-[#2A3A4A] rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-[#33E6FF]" />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-[#8899AA] uppercase tracking-wider mb-2">Launch Time</label>
                                            <div className="relative">
                                                <Clock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#445566]" />
                                                <input type="time" className="w-full bg-[#152336] border border-[#2A3A4A] rounded-xl pl-12 pr-4 py-3 text-white focus:outline-none focus:border-[#33E6FF]" />
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-[#8899AA] uppercase tracking-wider mb-2">Duration / Deadline</label>
                                        <select className="w-full bg-[#152336] border border-[#2A3A4A] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#33E6FF] appearance-none">
                                            <option>Remains open for 1 week</option>
                                            <option>Remains open for 2 weeks</option>
                                            <option>Remains open for 1 month</option>
                                            <option>Custom deadline...</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                </div>

            </div>
        </div>
    
        </Page>
    );
}

function StarIcon(props: any) {
    return <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>;
}
