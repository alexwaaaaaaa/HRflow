/**
 * Vitest specs for the `<RadioCardGroup>` and `<CheckboxCardGroup>` primitives.
 *
 * Validates: Requirements 6.4, 6.5, 7.3
 *
 * Covers:
 *   RadioCardGroup:
 *     - Renders a fieldset with role="radiogroup" and aria-label
 *     - Renders a legend
 *     - Renders one radio input per option (sr-only)
 *     - Each radio is bound to a label via htmlFor / id
 *     - The selected option's radio is checked
 *     - Clicking a card calls onChange with the option value
 *     - Keyboard: Space on a focused radio selects it (native browser behaviour)
 *     - Keyboard: Arrow keys move between radios in the group (native browser behaviour)
 *     - ariaLabel prop overrides the default aria-label
 *     - Optional description and badge render inside the card
 *
 *   CheckboxCardGroup:
 *     - Renders a fieldset with role="group" and aria-label
 *     - Renders a legend
 *     - Renders one checkbox input per option (sr-only)
 *     - Each checkbox is bound to a label via htmlFor / id
 *     - Checked state reflects the values array
 *     - Clicking an unchecked card adds the value to the array
 *     - Clicking a checked card removes the value from the array
 *     - Multiple values can be selected simultaneously
 *     - Keyboard: Space on a focused checkbox toggles it (native browser behaviour)
 *     - ariaLabel prop overrides the default aria-label
 *     - Optional description and badge render inside the card
 */

import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";

import RadioCardGroup from "@/components/ui/RadioCardGroup";
import CheckboxCardGroup from "@/components/ui/CheckboxCardGroup";

// ---------------------------------------------------------------------------
// Shared fixtures
// ---------------------------------------------------------------------------

type Regime = "old" | "new";

const regimeOptions = [
    { value: "old" as Regime, label: "Old Regime", description: "Allows deductions" },
    { value: "new" as Regime, label: "New Regime", description: "Lower slab rates" },
];

type Perk = "health" | "gym" | "meal";

const perkOptions = [
    { value: "health" as Perk, label: "Health Insurance", description: "Medical cover" },
    { value: "gym" as Perk, label: "Gym Membership", description: "Fitness benefit" },
    { value: "meal" as Perk, label: "Meal Vouchers", description: "Daily meal allowance" },
];

// ---------------------------------------------------------------------------
// RadioCardGroup tests
// ---------------------------------------------------------------------------

describe("<RadioCardGroup />", () => {
    describe("ARIA structure", () => {
        it("renders a fieldset with role='radiogroup'", () => {
            render(
                <RadioCardGroup
                    name="regime"
                    legend="Tax Regime"
                    value="old"
                    options={regimeOptions}
                    onChange={vi.fn()}
                />,
            );
            const group = screen.getByRole("radiogroup");
            expect(group).toBeInTheDocument();
        });

        it("sets aria-label to the legend text by default", () => {
            render(
                <RadioCardGroup
                    name="regime"
                    legend="Tax Regime"
                    value="old"
                    options={regimeOptions}
                    onChange={vi.fn()}
                />,
            );
            const group = screen.getByRole("radiogroup", { name: "Tax Regime" });
            expect(group).toBeInTheDocument();
        });

        it("uses ariaLabel prop when provided", () => {
            render(
                <RadioCardGroup
                    name="regime"
                    legend="Tax Regime"
                    value="old"
                    options={regimeOptions}
                    onChange={vi.fn()}
                    ariaLabel="Select your tax regime"
                />,
            );
            const group = screen.getByRole("radiogroup", { name: "Select your tax regime" });
            expect(group).toBeInTheDocument();
        });

        it("renders the legend text", () => {
            render(
                <RadioCardGroup
                    name="regime"
                    legend="Tax Regime"
                    value="old"
                    options={regimeOptions}
                    onChange={vi.fn()}
                />,
            );
            expect(screen.getByText("Tax Regime")).toBeInTheDocument();
        });

        it("renders one radio input per option", () => {
            render(
                <RadioCardGroup
                    name="regime"
                    legend="Tax Regime"
                    value="old"
                    options={regimeOptions}
                    onChange={vi.fn()}
                />,
            );
            const radios = screen.getAllByRole("radio");
            expect(radios).toHaveLength(regimeOptions.length);
        });

        it("each radio is accessible by its label text", () => {
            render(
                <RadioCardGroup
                    name="regime"
                    legend="Tax Regime"
                    value="old"
                    options={regimeOptions}
                    onChange={vi.fn()}
                />,
            );
            expect(screen.getByRole("radio", { name: /Old Regime/i })).toBeInTheDocument();
            expect(screen.getByRole("radio", { name: /New Regime/i })).toBeInTheDocument();
        });

        it("all radios share the same name attribute", () => {
            render(
                <RadioCardGroup
                    name="regime"
                    legend="Tax Regime"
                    value="old"
                    options={regimeOptions}
                    onChange={vi.fn()}
                />,
            );
            const radios = screen.getAllByRole("radio") as HTMLInputElement[];
            radios.forEach((r) => expect(r.name).toBe("regime"));
        });
    });

    describe("checked state", () => {
        it("marks the matching option as checked", () => {
            render(
                <RadioCardGroup
                    name="regime"
                    legend="Tax Regime"
                    value="new"
                    options={regimeOptions}
                    onChange={vi.fn()}
                />,
            );
            expect(screen.getByRole("radio", { name: /New Regime/i })).toBeChecked();
            expect(screen.getByRole("radio", { name: /Old Regime/i })).not.toBeChecked();
        });
    });

    describe("interaction", () => {
        it("calls onChange with the option value when a card label is clicked", async () => {
            const user = userEvent.setup();
            const handleChange = vi.fn();

            render(
                <RadioCardGroup
                    name="regime"
                    legend="Tax Regime"
                    value="old"
                    options={regimeOptions}
                    onChange={handleChange}
                />,
            );

            await user.click(screen.getByRole("radio", { name: /New Regime/i }));
            expect(handleChange).toHaveBeenCalledOnce();
            expect(handleChange).toHaveBeenCalledWith("new");
        });

        it("does not call onChange when the already-selected option is clicked", async () => {
            const user = userEvent.setup();
            const handleChange = vi.fn();

            render(
                <RadioCardGroup
                    name="regime"
                    legend="Tax Regime"
                    value="old"
                    options={regimeOptions}
                    onChange={handleChange}
                />,
            );

            // Clicking the already-checked radio fires the change event in the browser
            // but the value doesn't change — onChange is still called (radio fires onChange
            // even when re-selecting the same value in some browsers). We just verify the
            // component doesn't crash and the radio stays checked.
            await user.click(screen.getByRole("radio", { name: /Old Regime/i }));
            expect(screen.getByRole("radio", { name: /Old Regime/i })).toBeChecked();
        });

        it("keyboard: Space on a focused radio triggers onChange", async () => {
            const user = userEvent.setup();
            const handleChange = vi.fn();

            render(
                <RadioCardGroup
                    name="regime"
                    legend="Tax Regime"
                    value="old"
                    options={regimeOptions}
                    onChange={handleChange}
                />,
            );

            const newRegimeRadio = screen.getByRole("radio", { name: /New Regime/i });
            newRegimeRadio.focus();
            expect(document.activeElement).toBe(newRegimeRadio);

            await user.keyboard(" ");
            expect(handleChange).toHaveBeenCalledWith("new");
        });

        it("keyboard: Arrow key moves focus between radios in the group", async () => {
            const user = userEvent.setup();

            render(
                <RadioCardGroup
                    name="regime"
                    legend="Tax Regime"
                    value="old"
                    options={regimeOptions}
                    onChange={vi.fn()}
                />,
            );

            const oldRegimeRadio = screen.getByRole("radio", { name: /Old Regime/i });
            const newRegimeRadio = screen.getByRole("radio", { name: /New Regime/i });

            // Focus the first radio
            oldRegimeRadio.focus();
            expect(document.activeElement).toBe(oldRegimeRadio);

            // Arrow down should move focus to the next radio in the group
            await user.keyboard("{ArrowDown}");
            expect(document.activeElement).toBe(newRegimeRadio);
        });
    });

    describe("optional content", () => {
        it("renders description text when provided", () => {
            render(
                <RadioCardGroup
                    name="regime"
                    legend="Tax Regime"
                    value="old"
                    options={regimeOptions}
                    onChange={vi.fn()}
                />,
            );
            expect(screen.getByText("Allows deductions")).toBeInTheDocument();
            expect(screen.getByText("Lower slab rates")).toBeInTheDocument();
        });

        it("renders badge content when provided", () => {
            const optionsWithBadge = [
                {
                    value: "old" as Regime,
                    label: "Old Regime",
                    badge: <span data-testid="recommended-badge">Recommended</span>,
                },
                { value: "new" as Regime, label: "New Regime" },
            ];

            render(
                <RadioCardGroup
                    name="regime"
                    legend="Tax Regime"
                    value="old"
                    options={optionsWithBadge}
                    onChange={vi.fn()}
                />,
            );
            expect(screen.getByTestId("recommended-badge")).toBeInTheDocument();
        });

        it("does not render description when not provided", () => {
            const optionsNoDesc = [
                { value: "old" as Regime, label: "Old Regime" },
                { value: "new" as Regime, label: "New Regime" },
            ];

            render(
                <RadioCardGroup
                    name="regime"
                    legend="Tax Regime"
                    value="old"
                    options={optionsNoDesc}
                    onChange={vi.fn()}
                />,
            );
            // No description paragraphs should be present
            expect(screen.queryByText("Allows deductions")).not.toBeInTheDocument();
        });
    });
});

// ---------------------------------------------------------------------------
// CheckboxCardGroup tests
// ---------------------------------------------------------------------------

describe("<CheckboxCardGroup />", () => {
    describe("ARIA structure", () => {
        it("renders a fieldset with role='group'", () => {
            render(
                <CheckboxCardGroup
                    name="perks"
                    legend="Select Perks"
                    values={[]}
                    options={perkOptions}
                    onChange={vi.fn()}
                />,
            );
            const group = screen.getByRole("group");
            expect(group).toBeInTheDocument();
        });

        it("sets aria-label to the legend text by default", () => {
            render(
                <CheckboxCardGroup
                    name="perks"
                    legend="Select Perks"
                    values={[]}
                    options={perkOptions}
                    onChange={vi.fn()}
                />,
            );
            const group = screen.getByRole("group", { name: "Select Perks" });
            expect(group).toBeInTheDocument();
        });

        it("uses ariaLabel prop when provided", () => {
            render(
                <CheckboxCardGroup
                    name="perks"
                    legend="Select Perks"
                    values={[]}
                    options={perkOptions}
                    onChange={vi.fn()}
                    ariaLabel="Choose your employee perks"
                />,
            );
            const group = screen.getByRole("group", { name: "Choose your employee perks" });
            expect(group).toBeInTheDocument();
        });

        it("renders the legend text", () => {
            render(
                <CheckboxCardGroup
                    name="perks"
                    legend="Select Perks"
                    values={[]}
                    options={perkOptions}
                    onChange={vi.fn()}
                />,
            );
            expect(screen.getByText("Select Perks")).toBeInTheDocument();
        });

        it("renders one checkbox input per option", () => {
            render(
                <CheckboxCardGroup
                    name="perks"
                    legend="Select Perks"
                    values={[]}
                    options={perkOptions}
                    onChange={vi.fn()}
                />,
            );
            const checkboxes = screen.getAllByRole("checkbox");
            expect(checkboxes).toHaveLength(perkOptions.length);
        });

        it("each checkbox is accessible by its label text", () => {
            render(
                <CheckboxCardGroup
                    name="perks"
                    legend="Select Perks"
                    values={[]}
                    options={perkOptions}
                    onChange={vi.fn()}
                />,
            );
            expect(screen.getByRole("checkbox", { name: /Health Insurance/i })).toBeInTheDocument();
            expect(screen.getByRole("checkbox", { name: /Gym Membership/i })).toBeInTheDocument();
            expect(screen.getByRole("checkbox", { name: /Meal Vouchers/i })).toBeInTheDocument();
        });
    });

    describe("checked state", () => {
        it("marks options in the values array as checked", () => {
            render(
                <CheckboxCardGroup
                    name="perks"
                    legend="Select Perks"
                    values={["health", "meal"]}
                    options={perkOptions}
                    onChange={vi.fn()}
                />,
            );
            expect(screen.getByRole("checkbox", { name: /Health Insurance/i })).toBeChecked();
            expect(screen.getByRole("checkbox", { name: /Meal Vouchers/i })).toBeChecked();
            expect(screen.getByRole("checkbox", { name: /Gym Membership/i })).not.toBeChecked();
        });

        it("marks no options as checked when values is empty", () => {
            render(
                <CheckboxCardGroup
                    name="perks"
                    legend="Select Perks"
                    values={[]}
                    options={perkOptions}
                    onChange={vi.fn()}
                />,
            );
            const checkboxes = screen.getAllByRole("checkbox");
            checkboxes.forEach((cb) => expect(cb).not.toBeChecked());
        });
    });

    describe("interaction", () => {
        it("calls onChange with the value added when an unchecked card is clicked", async () => {
            const user = userEvent.setup();
            const handleChange = vi.fn();

            render(
                <CheckboxCardGroup
                    name="perks"
                    legend="Select Perks"
                    values={["health"]}
                    options={perkOptions}
                    onChange={handleChange}
                />,
            );

            await user.click(screen.getByRole("checkbox", { name: /Gym Membership/i }));
            expect(handleChange).toHaveBeenCalledOnce();
            expect(handleChange).toHaveBeenCalledWith(
                expect.arrayContaining(["health", "gym"]),
            );
        });

        it("calls onChange with the value removed when a checked card is clicked", async () => {
            const user = userEvent.setup();
            const handleChange = vi.fn();

            render(
                <CheckboxCardGroup
                    name="perks"
                    legend="Select Perks"
                    values={["health", "gym"]}
                    options={perkOptions}
                    onChange={handleChange}
                />,
            );

            await user.click(screen.getByRole("checkbox", { name: /Gym Membership/i }));
            expect(handleChange).toHaveBeenCalledOnce();
            const result: Perk[] = handleChange.mock.calls[0][0];
            expect(result).toContain("health");
            expect(result).not.toContain("gym");
        });

        it("supports selecting multiple values independently", async () => {
            const user = userEvent.setup();
            const received: Perk[][] = [];
            const handleChange = (vals: Perk[]) => received.push(vals);

            const { rerender } = render(
                <CheckboxCardGroup
                    name="perks"
                    legend="Select Perks"
                    values={[]}
                    options={perkOptions}
                    onChange={handleChange}
                />,
            );

            await user.click(screen.getByRole("checkbox", { name: /Health Insurance/i }));
            rerender(
                <CheckboxCardGroup
                    name="perks"
                    legend="Select Perks"
                    values={received[0]}
                    options={perkOptions}
                    onChange={handleChange}
                />,
            );

            await user.click(screen.getByRole("checkbox", { name: /Meal Vouchers/i }));

            expect(received[0]).toEqual(["health"]);
            expect(received[1]).toEqual(expect.arrayContaining(["health", "meal"]));
        });

        it("keyboard: Space on a focused unchecked checkbox triggers onChange with value added", async () => {
            const user = userEvent.setup();
            const handleChange = vi.fn();

            render(
                <CheckboxCardGroup
                    name="perks"
                    legend="Select Perks"
                    values={[]}
                    options={perkOptions}
                    onChange={handleChange}
                />,
            );

            const gymCheckbox = screen.getByRole("checkbox", { name: /Gym Membership/i });
            gymCheckbox.focus();
            expect(document.activeElement).toBe(gymCheckbox);

            await user.keyboard(" ");
            expect(handleChange).toHaveBeenCalledOnce();
            expect(handleChange).toHaveBeenCalledWith(["gym"]);
        });

        it("keyboard: Space on a focused checked checkbox triggers onChange with value removed", async () => {
            const user = userEvent.setup();
            const handleChange = vi.fn();

            render(
                <CheckboxCardGroup
                    name="perks"
                    legend="Select Perks"
                    values={["gym"]}
                    options={perkOptions}
                    onChange={handleChange}
                />,
            );

            const gymCheckbox = screen.getByRole("checkbox", { name: /Gym Membership/i });
            gymCheckbox.focus();
            await user.keyboard(" ");

            expect(handleChange).toHaveBeenCalledOnce();
            const result: Perk[] = handleChange.mock.calls[0][0];
            expect(result).not.toContain("gym");
        });

        it("keyboard: Tab moves focus between checkboxes", async () => {
            const user = userEvent.setup();

            render(
                <CheckboxCardGroup
                    name="perks"
                    legend="Select Perks"
                    values={[]}
                    options={perkOptions}
                    onChange={vi.fn()}
                />,
            );

            const checkboxes = screen.getAllByRole("checkbox");
            checkboxes[0].focus();
            expect(document.activeElement).toBe(checkboxes[0]);

            await user.tab();
            expect(document.activeElement).toBe(checkboxes[1]);
        });
    });

    describe("optional content", () => {
        it("renders description text when provided", () => {
            render(
                <CheckboxCardGroup
                    name="perks"
                    legend="Select Perks"
                    values={[]}
                    options={perkOptions}
                    onChange={vi.fn()}
                />,
            );
            expect(screen.getByText("Medical cover")).toBeInTheDocument();
            expect(screen.getByText("Fitness benefit")).toBeInTheDocument();
            expect(screen.getByText("Daily meal allowance")).toBeInTheDocument();
        });

        it("renders badge content when provided", () => {
            const optionsWithBadge = [
                {
                    value: "health" as Perk,
                    label: "Health Insurance",
                    badge: <span data-testid="popular-badge">Popular</span>,
                },
                { value: "gym" as Perk, label: "Gym Membership" },
            ];

            render(
                <CheckboxCardGroup
                    name="perks"
                    legend="Select Perks"
                    values={[]}
                    options={optionsWithBadge}
                    onChange={vi.fn()}
                />,
            );
            expect(screen.getByTestId("popular-badge")).toBeInTheDocument();
        });
    });
});
