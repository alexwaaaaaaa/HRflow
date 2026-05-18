"use client";
import { useState } from "react";
import { ArrowLeft, ThumbsUp, ThumbsDown, Book, Calendar, Eye } from "lucide-react";
import Link from "next/link";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export default function ArticleDetailPage() {
    const [feedback, setFeedback] = useState<"up" | "down" | null>(null);

    return (
        <Page
            title="How to configure VPN on strict home networks"
            breadcrumbs={[
                { label: "Helpdesk", href: "/helpdesk/dashboard" },
                { label: "Knowledge Base", href: "/helpdesk/kb" },
                { label: "Article" },
            ]}
            maxWidth="800px"
        >
            <div className="space-y-8">
                {/* Article Meta */}
                <Card padding="md">
                    <div className="mb-4 flex items-center gap-3">
                        <Badge variant="info">IT Support</Badge>
                    </div>
                    <div className="flex flex-wrap items-center gap-6 border-t border-[#1A2A3A] pt-4 text-sm font-medium text-[#445566]">
                        <div className="flex items-center gap-2">
                            <Book size={16} className="text-[#8899AA]" aria-hidden="true" />
                            <span>5 min read</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Calendar size={16} className="text-[#8899AA]" aria-hidden="true" />
                            <span>Updated Mar 10, 2026</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Eye size={16} className="text-[#8899AA]" aria-hidden="true" />
                            <span>12.4k views</span>
                        </div>
                    </div>
                </Card>

                {/* Article Body */}
                <Card padding="lg">
                    <div className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-p:text-[#8899AA] prose-a:text-[#33E6FF] prose-strong:text-white prose-code:rounded prose-code:bg-[#1A2A3A] prose-code:px-1 prose-code:text-[#FFB020]">
                        <p>
                            If you are working remotely from a network with strict firewall rules (like
                            some public Wi-Fi or certain ISPs), the standard TechCorp VPN client might
                            fail to establish a connection using the default UDP protocol.
                        </p>

                        <h2>Prerequisites</h2>
                        <ul>
                            <li>Active TechCorp Employee ID and Password.</li>
                            <li>Microsoft Authenticator app installed on your mobile device.</li>
                            <li>Cisco AnyConnect Secure Mobility Client (v4.10 or higher).</li>
                        </ul>

                        <h2>Step-by-Step Configuration (TCP Fallback)</h2>
                        <ol>
                            <li>
                                Open the <strong>Cisco AnyConnect</strong> client from your system tray or
                                Applications folder.
                            </li>
                            <li>
                                Instead of connecting immediately, click the <strong>Gear icon</strong>{" "}
                                (Settings) in the bottom-left corner.
                            </li>
                            <li>
                                Navigate to the <strong>Preferences</strong> tab.
                            </li>
                            <li>
                                Check the box that says{" "}
                                <strong>
                                    &quot;Allow local (LAN) access when using VPN (if configured)&quot;
                                </strong>
                                . This often resolves conflict with local routers.
                            </li>
                            <li>
                                Uncheck{" "}
                                <strong>&quot;Block connections to untrusted servers&quot;</strong> (only
                                temporarily, if you suspect a certificate issue on the guest network).
                            </li>
                            <li>
                                Close the Settings window. In the connection drop-down, manually type:{" "}
                                <code>vpn-tcp.techcorp.internal</code> instead of the default gateway.
                            </li>
                            <li>
                                Click <strong>Connect</strong>. Enter your credentials and approve the 2FA
                                prompt on your phone.
                            </li>
                        </ol>

                        <div className="my-8 rounded-r-xl border-l-4 border-[#FFB020] bg-[#FFB020]/10 p-4">
                            <h4 className="mb-2 mt-0 font-bold text-[#FFB020]">Note on Speed</h4>
                            <p className="mb-0 text-base text-[#8899AA]">
                                Using TCP instead of UDP is more reliable on strict networks but can
                                introduce slight latency. We recommend reverting to the default{" "}
                                <code>vpn.techcorp.internal</code> when you return to a standard network.
                            </p>
                        </div>

                        <h2>Still having issues?</h2>
                        <p>
                            If you followed these steps and are still encountering the{" "}
                            <em>&quot;Secure Gateway Unreachable&quot;</em> error, please collect your
                            logs and{" "}
                            <Link href="/helpdesk/raise">raise a ticket</Link>. Attach the DART bundle to
                            expedite troubleshooting.
                        </p>
                    </div>
                </Card>

                {/* Feedback Section */}
                <Card padding="lg">
                    <div className="flex flex-col items-center text-center">
                        <h3 className="mb-6 text-xl font-bold text-white">Was this article helpful?</h3>
                        <div className="mb-4 flex gap-4">
                            <Button
                                variant={feedback === "up" ? "primary" : "secondary"}
                                icon={<ThumbsUp size={18} aria-hidden="true" />}
                                onClick={() => setFeedback("up")}
                            >
                                Yes
                            </Button>
                            <Button
                                variant={feedback === "down" ? "danger" : "secondary"}
                                icon={<ThumbsDown size={18} aria-hidden="true" />}
                                onClick={() => setFeedback("down")}
                            >
                                No
                            </Button>
                        </div>

                        {feedback === "down" && (
                            <div className="w-full max-w-md">
                                <textarea
                                    placeholder="How can we improve this article? (Optional)"
                                    aria-label="Improvement feedback"
                                    className="min-h-[80px] w-full rounded-xl border border-[#2A3A4A] bg-[#0F1C2E] p-3 text-sm text-white outline-none focus:border-[#FF4444]"
                                />
                                <Button variant="secondary" className="mt-2 w-full">
                                    Submit Feedback
                                </Button>
                            </div>
                        )}

                        {feedback === "up" && (
                            <span className="text-sm text-[#00E5A0]">Thanks for your feedback!</span>
                        )}
                    </div>
                </Card>

                {/* Back Link */}
                <Link
                    href="/helpdesk/kb"
                    className="inline-flex items-center gap-2 text-sm font-medium text-[#8899AA] transition-colors hover:text-white"
                >
                    <ArrowLeft size={16} aria-hidden="true" /> Back to Knowledge Base
                </Link>
            </div>
        </Page>
    );
}
