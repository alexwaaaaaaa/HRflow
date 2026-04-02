"use client";

import React, { useState } from 'react';
import { Sparkles, Send, Paperclip, MoreVertical, ThumbsUp, ThumbsDown, User, Bot, RefreshCcw } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function AIChatbotPage() {
    const [message, setMessage] = useState('');
    const [chats, setChats] = useState([
        { id: 1, type: 'bot', text: 'Hi Rahul! I am Kaarya AI. How can I assist you with HR operations today?' },
        { id: 2, type: 'user', text: 'Can you show me a summary of next month\'s payroll variations?' },
        { id: 3, type: 'bot', text: 'Certainly. For November, there is a **4.2% overall increase** in payroll due to standard annual increments in the Engineering team. Additionally, 12 employees have submitted travel expense claims over ₹50,000 which are pending approval.\n\nWould you like me to generate a detailed variation report or approve the standard increments?' },
    ]);

    const handleSend = () => {
        if (!message.trim()) return;
        setChats([...chats, { id: chats.length + 1, type: 'user', text: message }]);
        setMessage('');
        // Mock response
        setTimeout(() => {
            setChats(prev => [...prev, { id: prev.length + 1, type: 'bot', text: 'I am analyzing your request...' }]);
        }, 600);
    };

    return (
        <div className="flex h-[calc(100vh-80px)] overflow-hidden bg-[#0A1420] animate-fade-in relative">

            {/* Sidebar Chat History */}
            <div className="w-64 border-r border-[#1A2A3A] bg-[#0D1928] hidden md:flex flex-col">
                <div className="p-4 flex items-center justify-between border-b border-[#1A2A3A]">
                    <span className="text-white font-medium flex items-center gap-2">
                        <Sparkles size={16} className="text-indigo-400" /> Kaarya Chat
                    </span>
                    <button className="text-[#8899AA] hover:text-white transition-colors">
                        <RefreshCcw size={16} />
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto p-3 space-y-1">
                    <div className="text-xs font-semibold text-[#445566] uppercase tracking-wider mb-2 px-3 mt-4">Today</div>
                    <button className="w-full text-left px-3 py-2 rounded-lg bg-[#1A2A3A] text-white text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                        Payroll Variations Nov
                    </button>
                    <button className="w-full text-left px-3 py-2 rounded-lg text-[#8899AA] hover:bg-[#131B2B] hover:text-white transition-colors text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                        Candidate Feedback Sync
                    </button>
                    <div className="text-xs font-semibold text-[#445566] uppercase tracking-wider mb-2 px-3 mt-6">Yesterday</div>
                    <button className="w-full text-left px-3 py-2 rounded-lg text-[#8899AA] hover:bg-[#131B2B] hover:text-white transition-colors text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                        Compliance Updates APAC
                    </button>
                </div>
                <div className="p-4 border-t border-[#1A2A3A] bg-[#131B2B]">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold text-xs">
                            RS
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-medium text-white">Rahul Sharma</span>
                            <span className="text-xs text-indigo-400">HR Admin</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col relative">

                {/* Header */}
                <div className="h-14 border-b border-[#1A2A3A] bg-[#0D1928] flex items-center justify-between px-6 shrink-0 z-10">
                    <div className="flex items-center gap-3">
                        <div className="bg-indigo-500/20 p-1.5 rounded-lg border border-indigo-500/30">
                            <Bot size={20} className="text-indigo-400" />
                        </div>
                        <div>
                            <h2 className="text-white font-medium">Kaarya Assistant</h2>
                            <p className="text-[#8899AA] text-xs">AI Model v4.2 • Stable</p>
                        </div>
                    </div>
                    <button className="text-[#8899AA] hover:text-white transition-colors p-2 rounded-lg hover:bg-[#1A2A3A]">
                        <MoreVertical size={18} />
                    </button>
                </div>

                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8 scroll-smooth">
                    {chats.map((chat) => (
                        <div key={chat.id} className={`flex gap-4 max-w-4xl mx-auto ${chat.type === 'user' ? 'flex-row-reverse' : ''}`}>
                            <div className="shrink-0 mt-1">
                                {chat.type === 'user' ? (
                                    <div className="w-8 h-8 rounded-full bg-[#1A2A3A] border border-[#2A3A4A] flex items-center justify-center">
                                        <User size={16} className="text-[#8899AA]" />
                                    </div>
                                ) : (
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                                        <Sparkles size={16} className="text-white" />
                                    </div>
                                )}
                            </div>
                            <div className={`flex flex-col ${chat.type === 'user' ? 'items-end' : 'items-start'}`}>
                                <div className={`px-5 py-3.5 rounded-2xl max-w-2xl shadow-sm ${chat.type === 'user'
                                        ? 'bg-[#1A2A3A] text-white rounded-tr-none'
                                        : 'bg-transparent text-[#E2E8F0] border border-[#1A2A3A] rounded-tl-none leading-relaxed'
                                    }`}>
                                    {/* Super simple markdown parsing for mock up */}
                                    {chat.text.split('\n\n').map((paragraph, i) => (
                                        <p key={i} className={i > 0 ? 'mt-3' : ''} dangerouslySetInnerHTML={{
                                            __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
                                        }} />
                                    ))}
                                </div>
                                {chat.type === 'bot' && (
                                    <div className="flex items-center gap-2 mt-2 ml-1">
                                        <button className="text-[#445566] hover:text-emerald-400 transition-colors p-1">
                                            <ThumbsUp size={14} />
                                        </button>
                                        <button className="text-[#445566] hover:text-red-400 transition-colors p-1">
                                            <ThumbsDown size={14} />
                                        </button>
                                        <button className="text-[#445566] hover:text-[#8899AA] transition-colors p-1 ml-2">
                                            <RefreshCcw size={14} />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Input Area */}
                <div className="p-4 md:p-6 bg-gradient-to-t from-[#0A1420] via-[#0A1420] to-transparent shrink-0">
                    <div className="max-w-4xl mx-auto relative group">
                        <div className="absolute inset-x-0 -bottom-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-8 blur-xl opacity-20 -z-10 group-focus-within:opacity-40 transition-opacity duration-500" />
                        <div className="bg-[#0D1928] border border-[#2A3A4A] group-focus-within:border-indigo-500/50 rounded-2xl flex items-end p-2 shadow-2xl transition-colors duration-300">
                            <button className="p-3 text-[#8899AA] hover:text-white transition-colors">
                                <Paperclip size={20} />
                            </button>
                            <textarea
                                placeholder="Message Kaarya AI..."
                                className="flex-1 bg-transparent border-none outline-none text-white text-base px-2 py-3 placeholder:text-[#445566] resize-none h-12 max-h-32 focus:h-20 transition-all duration-200"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSend();
                                    }
                                }}
                            />
                            <Button
                                className={`p-3 h-auto rounded-xl border-none flex items-center justify-center transition-all ${message.trim() ? 'bg-indigo-600 hover:bg-indigo-500 text-white' : 'bg-[#1A2A3A] text-[#445566]'}`}
                                onClick={handleSend}
                            >
                                <Send size={18} className={message.trim() ? "translate-x-0.5 -translate-y-0.5" : ""} />
                            </Button>
                        </div>
                        <div className="text-center mt-3 text-xs text-[#445566]">
                            Kaarya AI can make mistakes. Verify important HR decisions.
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
