/**
 * Design tokens — single source of truth for colours, spacing, radii, etc.
 *
 * Usage:
 *   import { tokens } from "@/lib/theme/tokens";
 *   <div style={{ background: tokens.color.bg.card }}>
 *
 * Why this exists:
 *   The codebase currently has 7,178 inline `style={{ background: "#0D1928" }}`
 *   occurrences. A token map gives us:
 *     - one place to change the palette (whitelabel-ready)
 *     - typed access (autocomplete + refactor safety)
 *     - migration path: replace literals with `tokens.color.bg.card` over time
 *
 * Whitelabel:
 *   At runtime, `applyTheme()` writes the palette to `document.documentElement`
 *   as CSS variables. Tenants can override their accent / brand colours per-org.
 */

export const tokens = {
    color: {
        bg: {
            base: "#04080f",
            sidebar: "#070d18",
            card: "#0b1422",
            elevated: "#0f1c2e",
            overlay: "#060c17",
        },
        border: {
            default: "#162030",
            subtle: "#0e1a28",
            focus: "#00e5a0",
            hover: "#1e3048",
        },
        accent: {
            green: "#00e5a0",
            green2: "#00c98c",
            blue: "#3b82f6",
            purple: "#8b5cf6",
            cyan: "#06b6d4",
        },
        semantic: {
            success: "#00e5a0",
            warning: "#f59e0b",
            error: "#ef4444",
            info: "#3b82f6",
        },
        text: {
            primary: "#f0f4f8",
            secondary: "#7a8fa6",
            muted: "#3d5166",
            disabled: "#2a3a4a",
        },
    },
    radius: {
        sm: "6px",
        md: "10px",
        lg: "14px",
        xl: "18px",
        "2xl": "24px",
    },
    shadow: {
        card: "0 1px 3px rgba(0,0,0,0.4), 0 4px 16px rgba(0,0,0,0.3)",
        elevated: "0 4px 24px rgba(0,0,0,0.5), 0 1px 4px rgba(0,0,0,0.4)",
        glowGreen: "0 0 20px rgba(0,229,160,0.15), 0 0 40px rgba(0,229,160,0.06)",
        glowBlue: "0 0 20px rgba(59,130,246,0.15), 0 0 40px rgba(59,130,246,0.06)",
    },
    transition: {
        fast: "150ms cubic-bezier(0.4,0,0.2,1)",
        base: "200ms cubic-bezier(0.4,0,0.2,1)",
        slow: "300ms cubic-bezier(0.4,0,0.2,1)",
        spring: "400ms cubic-bezier(0.34,1.56,0.64,1)",
    },
} as const;

export type Tokens = typeof tokens;

/**
 * Theme variants — different "looks" of the same shape. The default is the
 * dark theme that ships today. Whitelabel themes can override any subset.
 */
export type ThemeName = "default" | "light" | string;

export interface ThemeOverride {
    color?: {
        accent?: { green?: string; blue?: string };
        bg?: Partial<Tokens["color"]["bg"]>;
    };
}

/**
 * Apply a theme by writing CSS variables to :root. The variables are then
 * consumed by Tailwind utility classes like `text-[var(--theme-accent-green)]`
 * or directly via `style={{ color: "var(--theme-accent-green)" }}`.
 *
 * No-op on server.
 */
export function applyTheme(_name: ThemeName, override?: ThemeOverride): void {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    const accent = override?.color?.accent;
    if (accent?.green) root.style.setProperty("--theme-accent-green", accent.green);
    if (accent?.blue) root.style.setProperty("--theme-accent-blue", accent.blue);
    const bg = override?.color?.bg;
    if (bg?.base) root.style.setProperty("--theme-bg-base", bg.base);
    if (bg?.card) root.style.setProperty("--theme-bg-card", bg.card);
    if (bg?.sidebar) root.style.setProperty("--theme-bg-sidebar", bg.sidebar);
}
