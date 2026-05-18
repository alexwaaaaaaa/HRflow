/**
 * Vitest specs for the `<FormField>` primitive.
 *
 * Validates: Requirements 7.1, 7.2, 7.3
 *
 * Covers:
 *   - Render with no error: renders label and input, no error message shown
 *   - Render with error: shows error message, input has aria-invalid="true"
 *   - Controlled state via RHF: typing updates the field value via react-hook-form Controller
 */

import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import FormField from "@/components/ui/FormField";

// ---------------------------------------------------------------------------
// Shared schema
// ---------------------------------------------------------------------------

const simpleSchema = z.object({
    email: z.string().email("Must be a valid email"),
});

type SimpleFormValues = z.infer<typeof simpleSchema>;

// ---------------------------------------------------------------------------
// Module-scope wrapper components (required by react-hooks/static-components)
// ---------------------------------------------------------------------------

function SimpleForm({ defaultValue = "" }: { defaultValue?: string }) {
    const { control } = useForm<SimpleFormValues>({
        defaultValues: { email: defaultValue },
    });
    return (
        <form>
            <FormField
                control={control}
                name="email"
                label="Email address"
                hint="We never share your email"
            />
        </form>
    );
}

function FormWithError() {
    const { control, setError } = useForm<SimpleFormValues>({
        defaultValues: { email: "" },
    });
    // Inject an error synchronously so it's present on first render
    setError("email", { message: "Email is required" });
    return (
        <form>
            <FormField control={control} name="email" label="Email address" />
        </form>
    );
}

function FormWithErrorAndHint() {
    const { control, setError } = useForm<SimpleFormValues>({
        defaultValues: { email: "" },
    });
    setError("email", { message: "Email is required" });
    return (
        <form>
            <FormField
                control={control}
                name="email"
                label="Email address"
                hint="We never share your email"
            />
        </form>
    );
}

function ValidatedForm() {
    const { control, handleSubmit } = useForm<SimpleFormValues>({
        resolver: zodResolver(simpleSchema),
        defaultValues: { email: "" },
    });
    return (
        <form onSubmit={handleSubmit(() => {})}>
            <FormField control={control} name="email" label="Email address" />
            <button type="submit">Submit</button>
        </form>
    );
}

function FormWithInputProps() {
    const { control } = useForm<SimpleFormValues>({
        defaultValues: { email: "" },
    });
    return (
        <form>
            <FormField
                control={control}
                name="email"
                label="Email address"
                inputProps={{ placeholder: "you@example.com", type: "email" }}
            />
        </form>
    );
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("<FormField />", () => {
    describe("render with no error", () => {
        it("renders the label and input", () => {
            render(<SimpleForm />);
            expect(screen.getByLabelText("Email address")).toBeInTheDocument();
        });

        it("does not show an error message when there is no error", () => {
            render(<SimpleForm />);
            expect(screen.queryByRole("alert")).not.toBeInTheDocument();
        });

        it("renders the hint text when provided", () => {
            render(<SimpleForm />);
            expect(screen.getByText("We never share your email")).toBeInTheDocument();
        });

        it("input does not have aria-invalid when there is no error", () => {
            render(<SimpleForm />);
            const input = screen.getByLabelText("Email address");
            expect(input).not.toHaveAttribute("aria-invalid", "true");
        });
    });

    describe("render with error", () => {
        it("shows the error message in a role='alert' element", () => {
            render(<FormWithError />);
            const alert = screen.getByRole("alert");
            expect(alert).toHaveTextContent("Email is required");
        });

        it("sets aria-invalid='true' on the input when there is an error", () => {
            render(<FormWithError />);
            const input = screen.getByLabelText("Email address");
            expect(input).toHaveAttribute("aria-invalid", "true");
        });

        it("hides the hint when an error is present", () => {
            render(<FormWithErrorAndHint />);
            expect(screen.queryByText("We never share your email")).not.toBeInTheDocument();
            expect(screen.getByRole("alert")).toHaveTextContent("Email is required");
        });

        it("shows error message after failed form submission", async () => {
            const user = userEvent.setup();
            render(<ValidatedForm />);

            // Submit without filling in the field — zod validation should fail
            await user.click(screen.getByRole("button", { name: "Submit" }));

            const alert = await screen.findByRole("alert");
            expect(alert).toHaveTextContent("Must be a valid email");

            const input = screen.getByLabelText("Email address");
            expect(input).toHaveAttribute("aria-invalid", "true");
        });
    });

    describe("controlled state via RHF", () => {
        it("reflects the default value in the input", () => {
            render(<SimpleForm defaultValue="hello@example.com" />);
            const input = screen.getByLabelText("Email address") as HTMLInputElement;
            expect(input.value).toBe("hello@example.com");
        });

        it("updates the field value as the user types", async () => {
            const user = userEvent.setup();
            render(<SimpleForm />);

            const input = screen.getByLabelText("Email address") as HTMLInputElement;
            await user.type(input, "test@example.com");

            expect(input.value).toBe("test@example.com");
        });

        it("retains focus on the input while typing", async () => {
            const user = userEvent.setup();
            render(<SimpleForm />);

            const input = screen.getByLabelText("Email address");
            await user.click(input);
            await user.type(input, "abc");

            expect(document.activeElement).toBe(input);
        });

        it("clears the error after the user types a valid value and resubmits", async () => {
            const user = userEvent.setup();
            render(<ValidatedForm />);

            // First submit with empty value to trigger error
            await user.click(screen.getByRole("button", { name: "Submit" }));
            expect(await screen.findByRole("alert")).toBeInTheDocument();

            // Now type a valid email
            const input = screen.getByLabelText("Email address");
            await user.clear(input);
            await user.type(input, "valid@example.com");

            // Resubmit — error should clear
            await user.click(screen.getByRole("button", { name: "Submit" }));
            expect(screen.queryByRole("alert")).not.toBeInTheDocument();
        });

        it("passes additional inputProps through to the underlying Input", () => {
            render(<FormWithInputProps />);
            const input = screen.getByLabelText("Email address") as HTMLInputElement;
            expect(input).toHaveAttribute("placeholder", "you@example.com");
            expect(input).toHaveAttribute("type", "email");
        });
    });
});
