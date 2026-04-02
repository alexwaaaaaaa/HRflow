"use client";
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, ArrowLeft, Send, Paperclip, Smile, Bot, User } from 'lucide-react';
import Link from 'next/link';

const INITIAL_MESSAGES = [
    { id: 1, from: 'bot', text: 'Hi! 👋 I\'m HRFlow Support. How can I help you today?', time: '08:22 AM' },
    { id: 2, from: 'bot', text: 'You can ask me about payroll processing, compliance, employee setup, leave policies, and more.', time: '08:22 AM' },
];

const QUICK_ACTIONS = ['Run Payroll Help', 'PF/ESI Query', 'Add Employee', 'Leave Policy Setup', 'Raise a Ticket'];

export default function ChatSupportScreen() {
    const [messages, setMessages] = useState(INITIAL_MESSAGES);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, isTyping]);

    const sendMessage = (text?: string) => {
        const msg = text || input;
        if (!msg.trim()) return;
        const newId = messages.length + 1;
        setMessages(prev => [...prev, { id: newId, from: 'user', text: msg, time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) }]);
        setInput('');
        setIsTyping(true);
        setTimeout(() => {
            setIsTyping(false);
            setMessages(prev => [...prev, { id: newId + 1, from: 'bot', text: `Thanks for your message about "${msg.slice(0, 40)}…" — our team will respond within 3 minutes. In the meantime, check our Knowledge Base for instant answers.`, time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) }]);
        }, 2000);
    };

    return (
        <div className="h-screen flex flex-col p-6 max-w-4xl mx-auto">
            <Link href="/help" className="text-[#556677] hover:text-white text-sm font-bold flex items-center gap-1 mb-4"><ArrowLeft size={14} /> Help Center</Link>
            <div className="flex-1 flex flex-col bg-[#0A1420] border border-[#1A2A3A] rounded-2xl overflow-hidden">
                {/* Header */}
                <div className="p-5 border-b border-[#1A2A3A] flex items-center gap-3 bg-[#060D1A]">
                    <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                            <Bot size={20} className="text-white" />
                        </div>
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#060D1A]" />
                    </div>
                    <div>
                        <div className="text-white font-bold text-sm">HRFlow Support</div>
                        <div className="text-emerald-400 text-xs font-semibold flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" /> Online — Avg reply: 3 min
                        </div>
                    </div>
                    <div className="ml-auto flex items-center gap-2 text-xs text-[#556677]">
                        <MessageCircle size={14} /> Live Chat
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-5 space-y-4">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex items-end gap-3 ${msg.from === 'user' ? 'flex-row-reverse' : ''}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.from === 'bot' ? 'bg-gradient-to-br from-blue-500 to-indigo-600' : 'bg-gradient-to-br from-emerald-500 to-teal-600'}`}>
                                {msg.from === 'bot' ? <Bot size={14} className="text-white" /> : <User size={14} className="text-white" />}
                            </div>
                            <div className={`max-w-xs md:max-w-md ${msg.from === 'user' ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                                <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${msg.from === 'bot' ? 'bg-[#131B2B] text-white rounded-tl-none' : 'bg-indigo-600 text-white rounded-tr-none'}`}>
                                    {msg.text}
                                </div>
                                <span className="text-[#445566] text-[10px] px-1">{msg.time}</span>
                            </div>
                        </div>
                    ))}
                    {isTyping && (
                        <div className="flex items-end gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                                <Bot size={14} className="text-white" />
                            </div>
                            <div className="bg-[#131B2B] px-4 py-3 rounded-2xl rounded-tl-none flex items-center gap-1">
                                <span className="w-2 h-2 bg-[#556677] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                <span className="w-2 h-2 bg-[#556677] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                <span className="w-2 h-2 bg-[#556677] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                            </div>
                        </div>
                    )}
                    <div ref={bottomRef} />
                </div>

                {/* Quick Actions */}
                <div className="px-5 py-3 border-t border-[#1A2A3A] flex flex-wrap gap-2">
                    {QUICK_ACTIONS.map(a => (
                        <button key={a} onClick={() => sendMessage(a)} className="text-xs font-bold text-indigo-400 border border-indigo-500/30 bg-indigo-500/5 hover:bg-indigo-500/10 px-3 py-1.5 rounded-full transition-colors">{a}</button>
                    ))}
                </div>

                {/* Input */}
                <div className="p-4 border-t border-[#1A2A3A] flex items-center gap-3 bg-[#060D1A]">
                    <button className="text-[#445566] hover:text-white transition-colors"><Paperclip size={18} /></button>
                    <input type="text" placeholder="Type your message..." value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMessage()}
                        className="flex-1 bg-[#131B2B] border border-[#2A3A4A] rounded-xl px-4 py-2.5 text-white text-sm focus:border-indigo-500 outline-none transition-colors" />
                    <button className="text-[#445566] hover:text-white transition-colors"><Smile size={18} /></button>
                    <button onClick={() => sendMessage()} disabled={!input.trim()} className="w-10 h-10 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white rounded-xl flex items-center justify-center transition-colors">
                        <Send size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
}
