"use client";

import { useState } from "react";
import { MessageSquare, ThumbsUp, Send, Star, Plus } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const FEED_ITEMS = [
  { id: 1, from: "Rajesh Kumar", fromRole: "Manager", to: "Anjali Singh", type: "appreciation", msg: "Outstanding work on the Q3 client pitch. Your presentation skills really stood out!", date: "Today, 9:45 AM", likes: 8, avatar: "RK" },
  { id: 2, from: "Priya Nair", fromRole: "Peer", to: "Rahul Sharma", type: "appreciation", msg: "Rahul, your code review feedback was incredibly detailed and helped me learn a ton!", date: "Yesterday, 3:20 PM", likes: 5, avatar: "PN" },
  { id: 3, from: "Suresh Rao", fromRole: "Manager", to: "Deepak Mehta", type: "constructive", msg: "Deepak, would love to see more proactive communication on blockers before sprint demos.", date: "02 Mar", likes: 1, avatar: "SR" },
  { id: 4, from: "Anjali Singh", fromRole: "Peer", to: "Meena Reddy", type: "appreciation", msg: "Meena, the onboarding playbook you created has been a game changer for the entire HR team!", date: "01 Mar", likes: 12, avatar: "AS" },
];

const FEEDBACK_TYPE_VARIANT = {
  appreciation: "success",
  constructive: "warning",
} as const;

function FeedbackCard({
  item,
  liked,
  onLike,
}: {
  item: (typeof FEED_ITEMS)[0];
  liked: boolean;
  onLike: () => void;
}) {
  return (
    <Card padding="md" className={item.type === "appreciation" ? "border-[#00E5A0]/20" : "border-[#FFB800]/20"}>
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-[#1A2A3A] flex items-center justify-center text-xs font-bold text-[#8899AA] shrink-0">
          {item.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-sm font-semibold text-white">{item.from}</span>
            <span className="text-[10px] text-[#445566]">{item.fromRole}</span>
            <span className="text-[10px] text-[#445566]">→</span>
            <span
              className="text-sm font-semibold"
              style={{ color: item.type === "appreciation" ? "#00E5A0" : "#FFB800" }}
            >
              {item.to}
            </span>
          </div>
          <div className="mb-1">
            <Badge variant={FEEDBACK_TYPE_VARIANT[item.type as keyof typeof FEEDBACK_TYPE_VARIANT]}>
              {item.type === "appreciation" ? "Appreciation" : "Constructive"}
            </Badge>
          </div>
          <p className="text-sm text-[#8899AA] mt-2 leading-relaxed">{item.msg}</p>
          <div className="flex items-center gap-3 mt-3">
            <span className="text-[11px] text-[#445566]">{item.date}</span>
            <button
              onClick={onLike}
              className={`flex items-center gap-1 text-[11px] transition-colors ${
                liked ? "text-[#0066FF]" : "text-[#445566] hover:text-[#8899AA]"
              }`}
              aria-label={`${liked ? "Unlike" : "Like"} feedback from ${item.from}`}
              aria-pressed={liked}
            >
              <ThumbsUp size={12} aria-hidden="true" /> {item.likes + (liked ? 1 : 0)}
            </button>
            <button className="flex items-center gap-1 text-[11px] text-[#445566] hover:text-[#8899AA] transition-colors">
              <MessageSquare size={12} aria-hidden="true" /> Reply
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default function ContinuousFeedback() {
  const [feedItems, setFeedItems] = useState(FEED_ITEMS);
  const [showForm, setShowForm] = useState(false);
  const [toEmp, setToEmp] = useState("");
  const [feedType, setFeedType] = useState<"appreciation" | "constructive">("appreciation");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [sending, setSending] = useState(false);
  const [liked, setLiked] = useState<number[]>([]);

  function sendFeedback() {
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setFeedItems((prev) => [
        {
          id: prev.length + 1,
          from: "You",
          fromRole: "Peer",
          to: toEmp,
          type: feedType,
          msg: message,
          date: "Just now",
          likes: 0,
          avatar: "ME",
        },
        ...prev,
      ]);
      setShowForm(false);
      setMessage("");
      setToEmp("");
      setRating(0);
    }, 1500);
  }

  return (
    <Page
      title="Continuous Feedback"
      subtitle="Real-time peer and manager feedback across the organisation"
      breadcrumbs={[
        { label: "Performance", href: "/performance/dashboard" },
        { label: "Feedback" },
      ]}
      maxWidth="900px"
      actions={
        <Button
          icon={<Plus size={14} aria-hidden="true" />}
          onClick={() => setShowForm((v) => !v)}
        >
          Give Feedback
        </Button>
      }
    >
      {/* Give feedback form */}
      {showForm && (
        <Card padding="md" className="mb-6 border-[#00E5A0]/30">
          <h3 className="font-semibold mb-4 text-white">Give Feedback</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            <div>
              <label htmlFor="feedback-to" className="block text-xs text-[#8899AA] mb-1">
                To *
              </label>
              <input
                id="feedback-to"
                value={toEmp}
                onChange={(e) => setToEmp(e.target.value)}
                placeholder="Employee name"
                className="w-full h-9 bg-[#060B14] border border-[#1A2A3A] rounded-xl px-3 text-sm text-white placeholder-[#445566] focus:outline-none focus:border-[#00E5A0]"
              />
            </div>
            <div>
              <label className="block text-xs text-[#8899AA] mb-1">Type</label>
              <div className="flex gap-2" role="group" aria-label="Feedback type">
                {(["appreciation", "constructive"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setFeedType(t)}
                    aria-pressed={feedType === t}
                    className={`flex-1 h-9 text-xs capitalize rounded-xl border transition-all ${
                      feedType === t
                        ? t === "appreciation"
                          ? "border-[#00E5A0]/50 bg-[#00E5A0]/10 text-[#00E5A0]"
                          : "border-[#FFB800]/50 bg-[#FFB800]/10 text-[#FFB800]"
                        : "border-[#1A2A3A] text-[#8899AA]"
                    }`}
                  >
                    {t === "appreciation" ? "Appreciation" : "Constructive"}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="feedback-message" className="block text-xs text-[#8899AA] mb-1">
              Message *
            </label>
            <textarea
              id="feedback-message"
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Share specific, actionable feedback..."
              className="w-full bg-[#060B14] border border-[#1A2A3A] rounded-xl px-3 py-2.5 text-sm text-white placeholder-[#445566] focus:outline-none focus:border-[#00E5A0] resize-none"
            />
          </div>
          <div className="mb-4">
            <label className="block text-xs text-[#8899AA] mb-1.5">Optional Rating</label>
            <div className="flex gap-1" role="group" aria-label="Optional star rating">
              {[1, 2, 3, 4, 5].map((s) => (
                <button
                  key={s}
                  onMouseEnter={() => setHover(s)}
                  onMouseLeave={() => setHover(0)}
                  onClick={() => setRating(s)}
                  aria-label={`${s} star${s !== 1 ? "s" : ""}`}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    size={20}
                    style={{
                      color: s <= (hover || rating) ? "#FFB800" : "#1A2A3A",
                      fill: s <= (hover || rating) ? "#FFB800" : "#1A2A3A",
                    }}
                    aria-hidden="true"
                  />
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="secondary" onClick={() => setShowForm(false)}>
              Cancel
            </Button>
            <Button
              className="flex-1"
              onClick={sendFeedback}
              disabled={!toEmp || !message || sending}
              isLoading={sending}
              loadingText="Sending..."
              icon={<Send size={13} aria-hidden="true" />}
            >
              Send Feedback
            </Button>
          </div>
        </Card>
      )}

      {/* Feed */}
      <div className="space-y-4">
        {feedItems.map((item) => (
          <FeedbackCard
            key={item.id}
            item={item}
            liked={liked.includes(item.id)}
            onLike={() =>
              setLiked((prev) =>
                prev.includes(item.id) ? prev.filter((i) => i !== item.id) : [...prev, item.id]
              )
            }
          />
        ))}
      </div>
    </Page>
  );
}
