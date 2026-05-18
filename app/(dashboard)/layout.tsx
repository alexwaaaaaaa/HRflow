import AuthedShell from "@/components/dashboard/AuthedShell";

export const metadata = {
    title: "HR Dashboard — HRFlow",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return <AuthedShell>{children}</AuthedShell>;
}
