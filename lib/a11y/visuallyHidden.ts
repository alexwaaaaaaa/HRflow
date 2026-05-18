/**
 * Tailwind class string for visually hidden but screen-reader-accessible content.
 *
 * Use cases:
 *   - Labelling icon-only buttons: `<span className={srOnly}>Close menu</span>`
 *   - Live regions for status announcements
 *   - Form helper text consumed by AT but not rendered visually
 *
 * Equivalent to Bootstrap's `.sr-only` / `.visually-hidden`. We can't use
 * `display: none` because screen readers ignore display:none nodes.
 *
 * Tailwind already ships `sr-only`; this constant exists so our custom
 * components reference a single named token rather than memorising the
 * class. Use whichever the team finds clearer.
 */
export const srOnly =
    "absolute h-px w-px overflow-hidden whitespace-nowrap border-0 p-0 [clip:rect(0,0,0,0)]";
