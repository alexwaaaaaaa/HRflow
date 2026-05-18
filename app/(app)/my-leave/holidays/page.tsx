"use client";

import { Calendar, MapPin } from "lucide-react";
import Page from "@/components/ui/Page";
import DataTable, { type Column } from "@/components/ui/DataTable";
import { Badge } from "@/components/ui/Badge";

interface Holiday {
    id: number;
    date: string;
    day: string;
    name: string;
    type: "Mandatory" | "Restricted";
    locations: string;
}

const HOLIDAYS: Holiday[] = [
    { id: 1, date: "01 Jan 2024", day: "Monday", name: "New Year's Day", type: "Mandatory", locations: "All Locations" },
    { id: 2, date: "26 Jan 2024", day: "Friday", name: "Republic Day", type: "Mandatory", locations: "All Locations" },
    { id: 3, date: "25 Mar 2024", day: "Monday", name: "Holi", type: "Mandatory", locations: "All Locations" },
    { id: 4, date: "11 Apr 2024", day: "Thursday", name: "Eid al-Fitr", type: "Mandatory", locations: "All Locations" },
    { id: 5, date: "15 Aug 2024", day: "Thursday", name: "Independence Day", type: "Mandatory", locations: "All Locations" },
    { id: 6, date: "31 Oct 2024", day: "Thursday", name: "Diwali", type: "Mandatory", locations: "All Locations" },
    { id: 7, date: "25 Dec 2024", day: "Wednesday", name: "Christmas Day", type: "Mandatory", locations: "All Locations" },
];

const COLUMNS: Column<Holiday>[] = [
    {
        key: "date",
        label: "Date",
        sortable: true,
        sortValue: (h) => h.date,
        render: (h) => (
            <div>
                <p className="font-semibold text-white">{h.date}</p>
                <p className="text-xs text-[#8899AA]">{h.day}</p>
            </div>
        ),
    },
    {
        key: "name",
        label: "Holiday",
        sortable: true,
        render: (h) => <span className="font-semibold text-[#3b82f6]">{h.name}</span>,
    },
    {
        key: "type",
        label: "Type",
        render: (h) => <Badge variant="success">{h.type}</Badge>,
    },
    {
        key: "locations",
        label: "Locations",
        render: (h) => (
            <span className="inline-flex items-center gap-1 text-[#7a8fa6]">
                <MapPin size={12} className="opacity-50" aria-hidden="true" />
                {h.locations}
            </span>
        ),
        hideOnMobile: false,
    },
];

export default function HolidayCalendarPage() {
    return (
        <Page
            title="2024 Holiday calendar"
            subtitle="Official public holidays and company off days"
            breadcrumbs={[
                { label: "My Leave", href: "/my-leave" },
                { label: "Holidays" },
            ]}
            maxWidth="1100px"
            actions={
                <span className="inline-flex items-center gap-2 rounded-xl border border-[#1A2A3A] bg-[#0A1420] px-3 py-2">
                    <MapPin size={14} className="text-[#3b82f6]" aria-hidden="true" />
                    <span>
                        <span className="block text-[10px] font-semibold uppercase tracking-wider text-[#8899AA]">
                            Your location
                        </span>
                        <span className="block text-sm font-semibold text-white">Bangalore, India</span>
                    </span>
                </span>
            }
        >
            <DataTable<Holiday>
                data={HOLIDAYS}
                columns={COLUMNS}
                rowKey={(h) => h.id}
                searchable
                searchPlaceholder="Search holiday by name…"
                emptyTitle="No holidays match your search"
                aria-label={`${HOLIDAYS.length} holidays in 2024`}
            />
            <p className="mt-4 inline-flex items-center gap-2 text-sm text-[#8899AA]">
                <Calendar size={14} className="text-[#FFB800]" aria-hidden="true" />
                {HOLIDAYS.length} holidays listed for 2024
            </p>
        </Page>
    );
}
