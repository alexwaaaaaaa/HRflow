import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  // Custom rule overrides — disabled false-positive / cosmetic rules
  {
    rules: {
      // Unused vars — common in large UI codebases with evolving designs
      "@typescript-eslint/no-unused-vars": "off",
      // Explicit any — needed for dynamic data patterns
      "@typescript-eslint/no-explicit-any": "off",
      // Unescaped entities — styled text in JSX
      "react/no-unescaped-entities": "off",
      // img element — used for employee avatars / dynamic images
      "@next/next/no-img-element": "off",
      // React compiler purity rules — false positives for confetti animations, random visuals
      "react-hooks/purity": "off",
      // setState in effect — common timer and mount patterns
      "react-hooks/set-state-in-effect": "off",
      // Components in render — inline helper components
      "react-hooks/static-components": "off",
    },
  },
]);

export default eslintConfig;
