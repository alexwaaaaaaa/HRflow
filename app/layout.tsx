import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HRFlow — India's Most Intelligent HRMS",
  description:
    "HRFlow is India's most intelligent HRMS SaaS platform. Manage payroll, compliance, and your workforce effortlessly.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
