"use client";

import { useEffect } from "react";

/**
 * Last-resort error boundary. Renders its own <html>/<body> because by the
 * time it triggers, the root layout itself has failed.
 */
export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
         
        console.error("[global-error]", error);
    }, [error]);

    return (
        <html lang="en">
            <body
                style={{
                    margin: 0,
                    backgroundColor: "#04080f",
                    color: "#f0f4f8",
                    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "2rem",
                }}
            >
                <div
                    style={{
                        maxWidth: 480,
                        width: "100%",
                        background: "#0D1928",
                        border: "1px solid #1A2A3A",
                        borderRadius: 16,
                        padding: 32,
                    }}
                >
                    <h1 style={{ fontSize: 22, fontWeight: 600, margin: 0 }}>
                        Application crashed
                    </h1>
                    <p style={{ marginTop: 8, color: "#7a8fa6", fontSize: 14 }}>
                        HRflow encountered a fatal error and could not recover. Reload the
                        page to try again. If this keeps happening, contact support.
                    </p>
                    {error.digest && (
                        <p
                            style={{
                                marginTop: 16,
                                background: "#04080f",
                                padding: "8px 12px",
                                borderRadius: 8,
                                fontFamily: "ui-monospace, SFMono-Regular, monospace",
                                fontSize: 12,
                                color: "#3d5166",
                            }}
                        >
                            ref: {error.digest}
                        </p>
                    )}
                    <button
                        type="button"
                        onClick={reset}
                        style={{
                            marginTop: 24,
                            background: "#00e5a0",
                            color: "#04080f",
                            border: "none",
                            borderRadius: 10,
                            padding: "10px 20px",
                            fontSize: 14,
                            fontWeight: 600,
                            cursor: "pointer",
                        }}
                    >
                        Try again
                    </button>
                </div>
            </body>
        </html>
    );
}
