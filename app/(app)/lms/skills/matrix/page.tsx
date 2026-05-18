"use client";
import React from "react";
import Image from "next/image";
import { Search, Filter, Download, UserPlus } from "lucide-react";
import Page from "@/components/ui/Page";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import DataTable, { type Column } from "@/components/ui/DataTable";

const SKILLS = ["React", "Node.js", "System Design", "AWS", "GraphQL", "Docker", "Testing", "Agile"] as const;

interface TeamMember {
    id: number;
    name: string;
    role: string;
    avatar: string;
    scores: number[];
}

const TEAM: TeamMember[] = [
    { id: 1, name: "Arjun Kumar", role: "SDE II", avatar: "https://i.pravatar.cc/150?u=1", scores: [5, 4, 3, 2, 4, 3, 5, 4] },
    { id: 2, name: "Riya Sharma", role: "SDE I", avatar: "https://i.pravatar.cc/150?u=2", scores: [4, 3, 2, 1, 3, 2, 3, 3] },
    { id: 3, name: "Vikram Singh", role: "Sr. SDE", avatar: "https://i.pravatar.cc/150?u=3", scores: [5, 5, 5, 4, 5, 4, 4, 5] },
    { id: 4, name: "Sneha Patel", role: "SDE II", avatar: "https://i.pravatar.cc/150?u=4", scores: [3, 5, 4, 4, 3, 5, 4, 4] },
    { id: 5, name: "Rahul Dev", role: "Tech Lead", avatar: "https://i.pravatar.cc/150?u=5", scores: [5, 5, 5, 5, 4, 5, 5, 5] },
];

// Static color map — no template literals
const SCORE_CLASSES: Record<number, string> = {
    5: "bg-[#00E5A0] text-[#0A1420] border-[#00E5A0]",
    4: "bg-[#33E6FF] text-[#0A1420] border-[#33E6FF]",
    3: "bg-[#FFB020] text-[#0A1420] border-[#FFB020]",
    2: "bg-[#FF4444] text-white border-[#FF4444]",
    1: "bg-[#1A2A3A] text-[#8899AA] border-[#2A3A4A]",
};

function getScoreClass(score: number): string {
    return SCORE_CLASSES[score] ?? "bg-[#1A2A3A] text-[#8899AA] border-[#2A3A4A]";
}

const MATRIX_COLUMNS: Column<TeamMember>[] = [
    {
        key: "member",
        label: "Team Member",
        render: (m) => (
            <div className="flex items-center gap-3">
                { }
                <Image src={m.avatar} width={32} height={32} className="w-8 h-8 rounded-full border border-[#2A3A4A]" alt={`${m.name} avatar`} />
                <div>
                    <p className="font-semibold text-white text-sm">{m.name}</p>
                    <p className="text-[10px] text-[#8899AA]">{m.role}</p>
                </div>
            </div>
        ),
        sortable: true,
        sortValue: (m) => m.name,
    },
    ...SKILLS.map((skill, skillIdx) => ({
        key: skill,
        label: skill,
        align: "center" as const,
        render: (m: TeamMember) => {
            const score = m.scores[skillIdx] ?? 0;
            return (
                <div
                    className={`mx-auto w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm border-2 shadow-sm transition-transform hover:scale-110 cursor-pointer ${getScoreClass(score)}`}
                    title={`${m.name}: ${skill} = ${score}/5`}
                >
                    {score}
                </div>
            );
        },
    })),
    {
        key: "avg",
        label: "Avg Score",
        align: "center" as const,
        render: (m) => {
            const avg = (m.scores.reduce((a, b) => a + b, 0) / m.scores.length).toFixed(1);
            return (
                <span className="font-bold text-white bg-[#1A2A3A] px-3 py-1.5 rounded-lg border border-[#2A3A4A]">{avg}</span>
            );
        },
        sortable: true,
        sortValue: (m) => m.scores.reduce((a, b) => a + b, 0) / m.scores.length,
    },
];

export default function SkillMatrixScreen() {
    return (
        <Page
            title="Team Skill Matrix"
            subtitle="Visualize your team's capabilities, identify experts, and spot skill gaps"
            breadcrumbs={[
                { label: "LMS", href: "/lms/dashboard" },
                { label: "Skills" },
                { label: "Matrix" },
            ]}
            maxWidth="1400px"
            actions={
                <>








                    <Button variant="secondary" icon={<Download size={16} />}>Export</Button>
                    <Button variant="secondary" icon={<UserPlus size={16} className="text-[#33E6FF]" />}>Add Member</Button>
                </>
            }
        >
            <Card padding="none" className="mb-8">
                <div className="p-6 border-b border-[#1A2A3A] flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-[#0A1420]">
                    <div className="flex flex-wrap gap-3 text-xs font-semibold text-[#8899AA]">
                        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-[#00E5A0]" aria-hidden="true" /> Expert (5)</span>
                        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-[#33E6FF]" aria-hidden="true" /> Advanced (4)</span>
                        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-[#FFB020]" aria-hidden="true" /> Intermediate (3)</span>
                        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-[#FF4444]" aria-hidden="true" /> Beginner (1–2)</span>
                    </div>
                    <div className="flex gap-3">
                        <div className="relative">
                            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#445566]" aria-hidden="true" />
                            <input
                                type="search"
                                placeholder="Search…"
                                aria-label="Search team members"
                                className="bg-[#1A2A3A] border border-[#2A3A4A] rounded-lg pl-9 pr-4 py-1.5 text-white text-sm focus:outline-none focus:border-[#33E6FF]"
                            />
                        </div>
                        <Button variant="secondary" size="sm" aria-label="Filter matrix">
                            <Filter size={16} aria-hidden="true" />
                        </Button>
                    </div>
                </div>
                <div className="p-4 overflow-x-auto">
                    <DataTable<TeamMember>
                        data={TEAM}
                        columns={MATRIX_COLUMNS}
                        rowKey={(m) => m.id}
                        aria-label="Team skill matrix"
                        emptyTitle="No team members"
                        emptyDescription="Add team members to see their skill matrix"
                    />
                </div>
            </Card>
        

        

        

            
        </Page>
    );
}
