import AuthRightPanel from "@/components/auth/AuthRightPanel";
import LoginForm from "./LoginForm";

export default function LoginPage() {
    return (
        <div className="flex min-h-screen" style={{ minWidth: 1440 }}>
            {/* LEFT PANEL */}
            <div
                className="flex flex-col"
                style={{
                    width: 600,
                    minWidth: 600,
                    background: "#060B14",
                    padding: "40px 80px",
                    position: "relative",
                }}
            >
                {/* Logo */}
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                        <div
                            style={{
                                width: 32,
                                height: 32,
                                borderRadius: "50%",
                                background: "#00E5A0",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#060B14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <span style={{ fontSize: 24, fontWeight: 700, color: "#00E5A0" }}>HRFlow</span>
                    </div>
                    <span style={{ fontSize: 12, color: "#8899AA" }}>India&apos;s Most Intelligent HRMS</span>
                </div>

                {/* Main content — centered vertically */}
                <div className="flex-1 flex flex-col justify-center">
                    <h1 style={{ fontSize: 32, fontWeight: 700, color: "#FFFFFF", margin: 0 }}>
                        Welcome back
                    </h1>
                    <p style={{ fontSize: 14, color: "#8899AA", marginTop: 8, marginBottom: 32 }}>
                        Sign in to your HRFlow workspace
                    </p>

                    <LoginForm />

                    <p style={{ fontSize: 14, color: "#8899AA", marginTop: 24, textAlign: "center" }}>
                        New to HRFlow?{" "}
                        <a href="/company-setup/start" style={{ color: "#00E5A0" }}>
                            Request a Demo
                        </a>
                    </p>
                </div>

                {/* Footer */}
                <p
                    className="absolute"
                    style={{ bottom: 24, left: 0, right: 0, textAlign: "center", fontSize: 12, color: "#445566" }}
                >
                    © 2024 HRFlow Technologies Pvt. Ltd.
                </p>
            </div>

            {/* RIGHT PANEL */}
            <AuthRightPanel />
        </div>
    );
}
