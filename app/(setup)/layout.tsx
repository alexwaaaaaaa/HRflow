import WizardShell from "@/components/setup/WizardShell";

export const metadata = {
    title: "Company Setup — HRFlow",
};

export default function SetupLayout({ children }: { children: React.ReactNode }) {
    return <WizardShell>{children}</WizardShell>;
}
