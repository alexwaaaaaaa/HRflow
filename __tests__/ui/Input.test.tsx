/**
 * Vitest specs for the `<Input>` primitive.
 *
 * Covers the accessibility contract documented in components/ui/Input.tsx:
 *   - auto-id when no id prop is supplied
 *   - label binds to input via htmlFor / id
 *   - aria-invalid + role="alert" on error state
 *   - aria-describedby points to error id when error is set
 *   - aria-describedby points to hint id when hint is set without error
 *   - hint is hidden when error is set
 *   - left/right elements render and don't break the input
 *   - external aria-describedby is preserved alongside hint/error id
 */

import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";

import Input from "@/components/ui/Input";

describe("<Input />", () => {
    it("renders a plain input without label, hint, or error", () => {
        render(<Input placeholder="Type something" />);
        const input = screen.getByPlaceholderText("Type something");
        expect(input).toBeInTheDocument();
        expect(input).not.toHaveAttribute("aria-invalid");
        expect(input).not.toHaveAttribute("aria-describedby");
    });

    it("auto-generates an id when none is provided and binds the label to it", () => {
        render(<Input label="Email" />);
        const input = screen.getByLabelText("Email");
        expect(input).toBeInTheDocument();
        expect(input.id).toBeTruthy();
        // The id must be a non-empty string so `<label htmlFor>` resolves.
        expect(input.id.length).toBeGreaterThan(0);
    });

    it("uses the consumer-supplied id when provided", () => {
        render(<Input id="email-field" label="Email" />);
        const input = screen.getByLabelText("Email");
        expect(input.id).toBe("email-field");
    });

    it("renders the hint and binds it via aria-describedby", () => {
        render(<Input label="Email" hint="We never share your email" />);
        const input = screen.getByLabelText("Email");
        const describedBy = input.getAttribute("aria-describedby");
        expect(describedBy).toBeTruthy();
        const hint = document.getElementById(describedBy as string);
        expect(hint).toHaveTextContent("We never share your email");
    });

    it("renders the error and sets aria-invalid + role='alert'", () => {
        render(<Input label="Email" error="Email is required" />);
        const input = screen.getByLabelText("Email");

        expect(input).toHaveAttribute("aria-invalid", "true");

        const alert = screen.getByRole("alert");
        expect(alert).toHaveTextContent("Email is required");

        const describedBy = input.getAttribute("aria-describedby");
        expect(describedBy).toBe(alert.id);
    });

    it("hides the hint when an error is also set", () => {
        render(
            <Input
                label="Email"
                hint="We never share your email"
                error="Email is required"
            />,
        );
        expect(screen.queryByText("We never share your email")).not.toBeInTheDocument();
        expect(screen.getByText("Email is required")).toBeInTheDocument();
    });

    it("renders left and right elements without breaking input access", async () => {
        const user = userEvent.setup();
        render(
            <Input
                label="Search"
                leftElement={<span data-testid="left-icon">L</span>}
                rightElement={<span data-testid="right-icon">R</span>}
            />,
        );
        expect(screen.getByTestId("left-icon")).toBeInTheDocument();
        expect(screen.getByTestId("right-icon")).toBeInTheDocument();

        const input = screen.getByLabelText("Search");
        await user.type(input, "hello");
        expect(input).toHaveValue("hello");
    });

    it("preserves an external aria-describedby alongside the hint id", () => {
        render(
            <Input
                label="Email"
                hint="Helper text"
                aria-describedby="external-helper"
            />,
        );
        const input = screen.getByLabelText("Email");
        const describedBy = input.getAttribute("aria-describedby")?.split(" ") ?? [];
        expect(describedBy).toContain("external-helper");
        // Plus the auto-generated hint id
        expect(describedBy.length).toBe(2);
    });

    it("preserves an external aria-describedby alongside the error id", () => {
        render(
            <Input
                label="Email"
                error="Invalid"
                aria-describedby="external-helper"
            />,
        );
        const input = screen.getByLabelText("Email");
        const describedBy = input.getAttribute("aria-describedby")?.split(" ") ?? [];
        expect(describedBy).toContain("external-helper");
        expect(describedBy.length).toBe(2);
    });

    it("forwards ref to the underlying input element", () => {
        const ref = { current: null as HTMLInputElement | null };
        render(<Input ref={ref} label="Email" />);
        expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });

    it("merges custom className with default styling", () => {
        render(<Input label="Email" className="custom-class" />);
        const input = screen.getByLabelText("Email");
        expect(input.className).toContain("custom-class");
    });
});
