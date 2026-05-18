import AuthedShell from "@/components/dashboard/AuthedShell";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return <AuthedShell>{children}</AuthedShell>;
}
