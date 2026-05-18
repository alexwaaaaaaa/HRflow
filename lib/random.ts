/**
 * Deterministic pseudo-random helpers for use in render.
 *
 * `Math.random()` and `Date.now()` are impure — calling them during render
 * violates React 19's purity contract and produces flicker on re-render.
 *
 * The functions below are pure given a seed: same seed → same output.
 * For visual fillers (decorative bars, mock QR cells, confetti positions),
 * derive a stable seed from a key (index, id, etc.) and pass it in.
 *
 * For genuinely-random values that should change *between* renders (e.g.
 * confetti regenerated when a button is clicked), bump a `seed` state
 * variable on the action and pass `seed` here.
 */

/**
 * Mulberry32 — small, fast, statistically-decent 32-bit PRNG.
 * Returns a function that produces deterministic floats in [0, 1).
 */
export function seedRandom(seed: number): () => number {
    let s = seed >>> 0;
    return function next() {
        s = (s + 0x6d2b79f5) >>> 0;
        let t = s;
        t = Math.imul(t ^ (t >>> 15), t | 1);
        t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

/**
 * Generate `count` deterministic floats in [0, 1) from a seed.
 * Useful for sized arrays of decorative values.
 */
export function seededFloats(seed: number, count: number): number[] {
    const rng = seedRandom(seed);
    return Array.from({ length: count }, () => rng());
}

/**
 * Pick a deterministic element from an array based on a seed.
 */
export function seededPick<T>(seed: number, items: readonly T[]): T {
    const rng = seedRandom(seed);
    return items[Math.floor(rng() * items.length)] as T;
}
