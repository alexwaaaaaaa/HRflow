import type { Metadata, Viewport } from "next";
import { DM_Sans } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import Providers from "@/components/providers/Providers";
import "./globals.css";

/**
 * DM Sans is loaded via `next/font` so it gets self-hosted, preloaded,
 * and bundled with the app — eliminating the render-blocking
 * `@import` that previously sat in `globals.css` and avoiding any FOIT.
 *
 * `display: "swap"` ensures the page never blocks on font load; we render
 * a system fallback first and swap when the web font arrives.
 */
const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? "https://hrflow.example.com"
  ),
  title: {
    default: "HRFlow — India's Most Intelligent HRMS",
    template: "%s · HRFlow",
  },
  description:
    "HRFlow is India's most intelligent HRMS SaaS platform. Manage payroll, compliance, attendance, and your workforce effortlessly.",
  applicationName: "HRFlow",
  authors: [{ name: "HRFlow Technologies" }],
  generator: "Next.js",
  keywords: [
    "HRMS",
    "Payroll",
    "Compliance",
    "Attendance",
    "Recruitment",
    "Performance",
    "India HR software",
  ],
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.svg",
  },
  openGraph: {
    type: "website",
    siteName: "HRFlow",
    title: "HRFlow — India's Most Intelligent HRMS",
    description:
      "Manage payroll, compliance, attendance, and your workforce effortlessly.",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "HRFlow — India's Most Intelligent HRMS",
    description:
      "Manage payroll, compliance, attendance, and your workforce effortlessly.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#04080f" },
    { media: "(prefers-color-scheme: light)", color: "#04080f" },
  ],
  colorScheme: "dark",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();
  return (
    <html lang={locale} className={dmSans.variable}>
      <body className="font-sans antialiased">
        {/* Skip-to-content link for keyboard / screen-reader users */}
        <a
          href="#main-content"
          className="sr-only z-[9999] focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:rounded-md focus:bg-[#00e5a0] focus:px-3 focus:py-2 focus:text-sm focus:font-semibold focus:text-[#04080f]"
        >
          Skip to main content
        </a>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
