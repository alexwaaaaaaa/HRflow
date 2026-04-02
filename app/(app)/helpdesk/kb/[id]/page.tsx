"use client";
import React, { useState } from "react";
import {
    ArrowLeft, ThumbsUp, ThumbsDown, Book, Calendar, Eye, FileText
} from "lucide-react";
import Link from "next/link";

export default function ArticleDetail() {
    const [feedback, setFeedback] = useState<"up" | "down" | null>(null);

    return (
        <div className="min-h-screen bg-[#0A1420] text-white">

            {/* Article Header */}
            <div className="bg-[#0F1C2E] border-b border-[#1A2A3A] py-12 px-6">
                <div className="max-w-[800px] mx-auto">
                    <Link href="/helpdesk/kb" className="inline-flex items-center gap-2 text-sm text-[#8899AA] hover:text-white transition-colors mb-6 font-medium">
                        <ArrowLeft size={16} /> Back to Knowledge Base
                    </Link>

                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-[#33E6FF] bg-[#33E6FF]/10 border border-[#33E6FF]/20 px-2 py-1 rounded">IT Support</span>
                    </div>

                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">How to configure VPN on strict home networks</h1>

                    <div className="flex flex-wrap items-center gap-6 text-sm text-[#445566] font-medium border-t border-[#1A2A3A] pt-4">
                        <div className="flex items-center gap-2">
                            <Book size={16} className="text-[#8899AA]" />
                            <span>5 min read</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar size={16} className="text-[#8899AA]" />
                            <span>Updated Mar 10, 2026</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Eye size={16} className="text-[#8899AA]" />
                            <span>12.4k views</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-[800px] mx-auto px-6 py-12">

                {/* Article Body */}
                <div className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-p:text-[#8899AA] prose-a:text-[#33E6FF] prose-strong:text-white prose-code:text-[#FFB020] prose-code:bg-[#1A2A3A] prose-code:px-1 prose-code:rounded">
                    <p>If you are working remotely from a network with strict firewall rules (like some public Wi-Fi or certain ISPs), the standard TechCorp VPN client might fail to establish a connection using the default UDP protocol.</p>

                    <h2>Prerequisites</h2>
                    <ul>
                        <li>Active TechCorp Employee ID and Password.</li>
                        <li>Microsoft Authenticator app installed on your mobile device.</li>
                        <li>Cisco AnyConnect Secure Mobility Client (v4.10 or higher).</li>
                    </ul>

                    <h2>Step-by-Step Configuration (TCP Fallback)</h2>
                    <ol>
                        <li>Open the <strong>Cisco AnyConnect</strong> client from your system tray or Applications folder.</li>
                        <li>Instead of connecting immediately, click the <strong>Gear icon</strong> (Settings) in the bottom-left corner.</li>
                        <li>Navigate to the <strong>Preferences</strong> tab.</li>
                        <li>Check the box that says <strong>"Allow local (LAN) access when using VPN (if configured)"</strong>. This often resolves conflict with local routers.</li>
                        <li>Uncheck <strong>"Block connections to untrusted servers"</strong> (only temporarily, if you suspect a certificate issue on the guest network).</li>
                        <li>Close the Settings window. In the connection drop-down, manually type: <code>vpn-tcp.techcorp.internal</code> instead of the default gateway.</li>
                        <li>Click <strong>Connect</strong>. Enter your credentials and approve the 2FA prompt on your phone.</li>
                    </ol>

                    <div className="bg-[#FFB020]/10 border-l-4 border-[#FFB020] p-4 rounded-r-xl my-8">
                        <h4 className="text-[#FFB020] font-bold mt-0 mb-2">Note on Speed</h4>
                        <p className="mb-0 text-[#8899AA] text-base">Using TCP instead of UDP is more reliable on strict networks but can introduce slight latency. We recommend reverting to the default <code>vpn.techcorp.internal</code> when you return to a standard network.</p>
                    </div>

                    <h2>Still having issues?</h2>
                    <p>If you followed these steps and are still encountering the <em>"Secure Gateway Unreachable"</em> error, please collect your logs and <Link href="/helpdesk/raise">raise a ticket</Link>. Attach the DART bundle to expedite troubleshooting.</p>
                </div>

                {/* Feedback Section */}
                <div className="mt-16 pt-8 border-t border-[#1A2A3A] flex flex-col items-center">
                    <h3 className="text-xl font-bold text-white mb-6">Was this article helpful?</h3>

                    <div className="flex gap-4 mb-4">
                        <button
                            onClick={() => setFeedback("up")}
                            className={`flex items-center gap-2 px-6 py-3 rounded-xl border font-semibold transition-all ${feedback === "up" ? 'bg-[#00E5A0] text-[#0A1420] border-[#00E5A0]' : 'bg-[#1A2A3A] text-white border-[#2A3A4A] hover:border-[#00E5A0] hover:text-[#00E5A0]'
                                }`}
                        >
                            <ThumbsUp size={18} /> Yes
                        </button>
                        <button
                            onClick={() => setFeedback("down")}
                            className={`flex items-center gap-2 px-6 py-3 rounded-xl border font-semibold transition-all ${feedback === "down" ? 'bg-[#FF4444] text-white border-[#FF4444]' : 'bg-[#1A2A3A] text-white border-[#2A3A4A] hover:border-[#FF4444] hover:text-[#FF4444]'
                                }`}
                        >
                            <ThumbsDown size={18} /> No
                        </button>
                    </div>

                    {feedback === "down" && (
                        <div className="w-full max-w-md mt-4 animate-in fade-in slide-in-from-top-4">
                            <textarea
                                placeholder="How can we improve this article? (Optional)"
                                className="w-full bg-[#0F1C2E] border border-[#2A3A4A] rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[#FF4444] min-h-[80px]"
                            ></textarea>
                            <button className="mt-2 w-full py-2 bg-[#1A2A3A] text-white rounded-lg hover:bg-[#2A3A4A] transition-colors text-sm font-semibold">
                                Submit Feedback
                            </button>
                        </div>
                    )}

                    {feedback === "up" && (
                        <span className="text-[#00E5A0] text-sm animate-in fade-in">Thanks for your feedback!</span>
                    )}
                </div>

            </div>
        </div>
    );
}
