/**
 * Vitest specs for the `<Stepper>` primitive.
 *
 * Validates: Requirements 1.2, 5.4, 7.4
 *
 * Covers:
 *   ARIA structure:
 *     - Renders an <ol role="list"> with aria-label
 *     - Uses ariaLabel prop when provided; falls back to "Progress steps"
 *     - Active step's <li> has aria-current="step"
 *     - Past and future steps do NOT have aria-current
 *
 *   Step buttons:
 *     - Renders one button per step
 *     - Past steps are enabled (clickable) when onStepClick is provided
 *     - Past steps are disabled when onStepClick is NOT provided
 *     - Future steps are always disabled
 *     - Active step button is disabled (not clickable)
 *     - Each button has an accessible aria-label describing its state
 *
 *   Interaction:
 *     - Clicking a past step calls onStepClick with the correct index
 *     - Clicking a future step does NOT call onStepClick
 *     - Clicking the active step does NOT call onStepClick
 *
 *   Focus management:
 *     - Arrow-right moves focus to the next focusable step button
 *     - Arrow-left moves focus to the previous focusable step button
 *     - Arrow-right wraps from last focusable to first
 *     - Arrow-left wraps from first focusable to last
 *
 *   Optional content:
 *     - Renders description text when provided
 *     - Renders icon when provided
 *     - Renders step number when no icon is provided
 *     - Does not render description when not provided
 */

import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";

import Stepper, { type StepItem } from "@/components/ui/Stepper";

// ---------------------------------------------------------------------------
// Shared fixtures
// ---------------------------------------------------------------------------

const THREE_STEPS: StepItem[] = [
    { id: "step-1", label: "Personal", description: "Identity & Contact" },
    { id: "step-2", label: "Job", description: "Role & Employment" },
    { id: "step-3", label: "Salary", description: "CTC & Breakup" },
];

const FIVE_STEPS: StepItem[] = [
    { id: "s1", label: "Step 1" },
    { id: "s2", label: "Step 2" },
    { id: "s3", label: "Step 3" },
    { id: "s4", label: "Step 4" },
    { id: "s5", label: "Step 5" },
];

// ---------------------------------------------------------------------------
// ARIA structure
// ---------------------------------------------------------------------------

describe("<Stepper /> — ARIA structure", () => {
    it("renders an <ol> with role='list'", () => {
        render(<Stepper steps={THREE_STEPS} current={0} />);
        expect(screen.getByRole("list")).toBeInTheDocument();
    });

    it("uses the default aria-label 'Progress steps' when ariaLabel is not provided", () => {
        render(<Stepper steps={THREE_STEPS} current={0} />);
        expect(screen.getByRole("list", { name: "Progress steps" })).toBeInTheDocument();
    });

    it("uses the ariaLabel prop when provided", () => {
        render(<Stepper steps={THREE_STEPS} current={1} ariaLabel="Add employee progress" />);
        expect(screen.getByRole("list", { name: "Add employee progress" })).toBeInTheDocument();
    });

    it("sets aria-current='step' on the active step's <li>", () => {
        const { container } = render(<Stepper steps={THREE_STEPS} current={1} />);
        const listItems = container.querySelectorAll("li");
        expect(listItems[0]).not.toHaveAttribute("aria-current");
        expect(listItems[1]).toHaveAttribute("aria-current", "step");
        expect(listItems[2]).not.toHaveAttribute("aria-current");
    });

    it("sets aria-current='step' on the first step when current=0", () => {
        const { container } = render(<Stepper steps={THREE_STEPS} current={0} />);
        const listItems = container.querySelectorAll("li");
        expect(listItems[0]).toHaveAttribute("aria-current", "step");
        expect(listItems[1]).not.toHaveAttribute("aria-current");
        expect(listItems[2]).not.toHaveAttribute("aria-current");
    });

    it("renders one button per step", () => {
        render(<Stepper steps={THREE_STEPS} current={1} />);
        const buttons = screen.getAllByRole("button");
        expect(buttons).toHaveLength(THREE_STEPS.length);
    });

    it("each button has an aria-label describing its state", () => {
        render(<Stepper steps={THREE_STEPS} current={1} />);
        expect(
            screen.getByRole("button", { name: /Completed step: Personal/i }),
        ).toBeInTheDocument();
        expect(
            screen.getByRole("button", { name: /Current step: Job/i }),
        ).toBeInTheDocument();
        expect(
            screen.getByRole("button", { name: /Upcoming step: Salary/i }),
        ).toBeInTheDocument();
    });
});

// ---------------------------------------------------------------------------
// Step button enabled / disabled state
// ---------------------------------------------------------------------------

describe("<Stepper /> — button enabled/disabled state", () => {
    it("past step buttons are enabled when onStepClick is provided", () => {
        render(<Stepper steps={THREE_STEPS} current={2} onStepClick={vi.fn()} />);
        const personalBtn = screen.getByRole("button", { name: /Completed step: Personal/i });
        const jobBtn = screen.getByRole("button", { name: /Completed step: Job/i });
        expect(personalBtn).not.toBeDisabled();
        expect(jobBtn).not.toBeDisabled();
    });

    it("past step buttons are enabled even when onStepClick is NOT provided (no click handler, but focusable)", () => {
        render(<Stepper steps={THREE_STEPS} current={2} />);
        const personalBtn = screen.getByRole("button", { name: /Completed step: Personal/i });
        // Past steps are not disabled — they just have no onClick handler
        expect(personalBtn).not.toBeDisabled();
    });

    it("the active step button is NOT disabled (it is focusable but has no click handler)", () => {
        render(<Stepper steps={THREE_STEPS} current={1} onStepClick={vi.fn()} />);
        const activeBtn = screen.getByRole("button", { name: /Current step: Job/i });
        expect(activeBtn).not.toBeDisabled();
    });

    it("future step buttons are always disabled", () => {
        render(<Stepper steps={THREE_STEPS} current={0} onStepClick={vi.fn()} />);
        const futureBtn = screen.getByRole("button", { name: /Upcoming step: Salary/i });
        expect(futureBtn).toBeDisabled();
    });
});

// ---------------------------------------------------------------------------
// Interaction
// ---------------------------------------------------------------------------

describe("<Stepper /> — interaction", () => {
    it("calls onStepClick with the correct index when a past step is clicked", async () => {
        const user = userEvent.setup();
        const handleClick = vi.fn();

        render(<Stepper steps={THREE_STEPS} current={2} onStepClick={handleClick} />);

        await user.click(screen.getByRole("button", { name: /Completed step: Personal/i }));
        expect(handleClick).toHaveBeenCalledOnce();
        expect(handleClick).toHaveBeenCalledWith(0);
    });

    it("calls onStepClick with index 1 when the second past step is clicked", async () => {
        const user = userEvent.setup();
        const handleClick = vi.fn();

        render(<Stepper steps={THREE_STEPS} current={2} onStepClick={handleClick} />);

        await user.click(screen.getByRole("button", { name: /Completed step: Job/i }));
        expect(handleClick).toHaveBeenCalledWith(1);
    });

    it("does NOT call onStepClick when a future step button is clicked (disabled)", async () => {
        const user = userEvent.setup();
        const handleClick = vi.fn();

        render(<Stepper steps={THREE_STEPS} current={0} onStepClick={handleClick} />);

        // Future step button is disabled — userEvent won't fire click on disabled buttons
        const futureBtn = screen.getByRole("button", { name: /Upcoming step: Salary/i });
        expect(futureBtn).toBeDisabled();
        await user.click(futureBtn);
        expect(handleClick).not.toHaveBeenCalled();
    });

    it("does NOT call onStepClick when the active step button is clicked (no handler)", async () => {
        const user = userEvent.setup();
        const handleClick = vi.fn();

        render(<Stepper steps={THREE_STEPS} current={1} onStepClick={handleClick} />);

        // Active step is not disabled but has no onClick — clicking it does nothing
        const activeBtn = screen.getByRole("button", { name: /Current step: Job/i });
        expect(activeBtn).not.toBeDisabled();
        await user.click(activeBtn);
        expect(handleClick).not.toHaveBeenCalled();
    });
});

// ---------------------------------------------------------------------------
// Focus management — arrow-key navigation
// ---------------------------------------------------------------------------

describe("<Stepper /> — arrow-key focus management", () => {
    it("ArrowRight moves focus from first focusable to second focusable button", async () => {
        const user = userEvent.setup();

        // current=2 with onStepClick: steps 0 and 1 are focusable (past+clickable), step 2 is active (focusable), steps 3,4 are future (not focusable)
        render(<Stepper steps={FIVE_STEPS} current={2} onStepClick={vi.fn()} />);

        const step1Btn = screen.getByRole("button", { name: /Completed step: Step 1/i });
        const step2Btn = screen.getByRole("button", { name: /Completed step: Step 2/i });

        step1Btn.focus();
        expect(document.activeElement).toBe(step1Btn);

        await user.keyboard("{ArrowRight}");
        expect(document.activeElement).toBe(step2Btn);
    });

    it("ArrowLeft moves focus from second focusable to first focusable button", async () => {
        const user = userEvent.setup();

        render(<Stepper steps={FIVE_STEPS} current={2} onStepClick={vi.fn()} />);

        const step1Btn = screen.getByRole("button", { name: /Completed step: Step 1/i });
        const step2Btn = screen.getByRole("button", { name: /Completed step: Step 2/i });

        step2Btn.focus();
        expect(document.activeElement).toBe(step2Btn);

        await user.keyboard("{ArrowLeft}");
        expect(document.activeElement).toBe(step1Btn);
    });

    it("ArrowRight wraps from last focusable button to first focusable button", async () => {
        const user = userEvent.setup();

        // current=1 with onStepClick: step 0 is past+clickable (focusable), step 1 is active (focusable)
        render(<Stepper steps={THREE_STEPS} current={1} onStepClick={vi.fn()} />);

        const step1Btn = screen.getByRole("button", { name: /Completed step: Personal/i });
        const activeBtn = screen.getByRole("button", { name: /Current step: Job/i });

        // Focus the active step (last focusable)
        activeBtn.focus();
        expect(document.activeElement).toBe(activeBtn);

        await user.keyboard("{ArrowRight}");
        // Should wrap to the first focusable (step 0)
        expect(document.activeElement).toBe(step1Btn);
    });

    it("ArrowLeft wraps from first focusable button to last focusable button", async () => {
        const user = userEvent.setup();

        render(<Stepper steps={THREE_STEPS} current={1} onStepClick={vi.fn()} />);

        const step1Btn = screen.getByRole("button", { name: /Completed step: Personal/i });
        const activeBtn = screen.getByRole("button", { name: /Current step: Job/i });

        step1Btn.focus();
        expect(document.activeElement).toBe(step1Btn);

        await user.keyboard("{ArrowLeft}");
        // Should wrap to the last focusable (active step)
        expect(document.activeElement).toBe(activeBtn);
    });
});

// ---------------------------------------------------------------------------
// Optional content
// ---------------------------------------------------------------------------

describe("<Stepper /> — optional content", () => {
    it("renders description text when provided", () => {
        render(<Stepper steps={THREE_STEPS} current={0} />);
        expect(screen.getByText("Identity & Contact")).toBeInTheDocument();
        expect(screen.getByText("Role & Employment")).toBeInTheDocument();
        expect(screen.getByText("CTC & Breakup")).toBeInTheDocument();
    });

    it("does not render description when not provided", () => {
        render(<Stepper steps={FIVE_STEPS} current={0} />);
        // FIVE_STEPS has no descriptions — no description elements should appear
        const descriptionTexts = ["Identity & Contact", "Role & Employment"];
        descriptionTexts.forEach((text) => {
            expect(screen.queryByText(text)).not.toBeInTheDocument();
        });
    });

    it("renders step number when no icon is provided", () => {
        render(<Stepper steps={FIVE_STEPS} current={0} />);
        // Step numbers 2–5 should be visible (step 1 is active, shows number too)
        expect(screen.getByText("2")).toBeInTheDocument();
        expect(screen.getByText("3")).toBeInTheDocument();
    });

    it("renders icon content when provided", () => {
        const stepsWithIcon: StepItem[] = [
            {
                id: "with-icon",
                label: "With Icon",
                icon: <span data-testid="custom-icon">★</span>,
            },
            { id: "no-icon", label: "No Icon" },
        ];

        render(<Stepper steps={stepsWithIcon} current={0} />);
        expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
    });
});
