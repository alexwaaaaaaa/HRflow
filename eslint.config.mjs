import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import unusedImports from "eslint-plugin-unused-imports";

/**
 * ESLint config for HRflow.
 *
 * Philosophy: rules that catch REAL bugs are kept on (as warnings to keep
 * the build green during the cleanup migration). Cosmetic noise rules are off.
 *
 * The rules below were previously blanket-disabled. They now run as warnings
 * so the team has visibility into genuine problems (impure renders, dynamic
 * components, etc.) without breaking CI. Convert to "error" once the legacy
 * pages are migrated.
 */
const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "coverage/**",
    "playwright-report/**",
    "test-results/**",
    "next-env.d.ts",
  ]),
  {
    plugins: { "unused-imports": unusedImports },
    rules: {
      // --- Cosmetic, low-signal — kept off ---
      "@typescript-eslint/no-unused-vars": "off",
      "unused-imports/no-unused-imports": "warn",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-explicit-any": "off",
      "react/no-unescaped-entities": "off",
      "@next/next/no-img-element": "off",

      // --- React 19 compiler / purity rules — surfaced as warnings ---
      // These DO catch real bugs (Math.random in render, components defined
      // inside render, setState in useEffect timing issues). Keep them
      // visible so devs can fix per-page during the migration.
      "react-hooks/purity": "warn",
      "react-hooks/set-state-in-effect": "warn",
      "react-hooks/static-components": "warn",
    },
  },
  // Test files: relax some rules
  {
    files: ["**/*.test.ts", "**/*.test.tsx", "**/__tests__/**/*"],
    rules: {
      "react-hooks/purity": "off",
      "react-hooks/static-components": "off",
    },
  },
]);

export default eslintConfig;
