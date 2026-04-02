export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen w-full" style={{ background: "#060B14" }}>
            {children}
        </div>
    );
}
