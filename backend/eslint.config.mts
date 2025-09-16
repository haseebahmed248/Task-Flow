import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import prettier from "eslint-config-prettier"; //import prettier
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    ignores: ["node_modules", "dist", "build"], //replaces .eslintignore
    languageOptions: {
      globals: globals.node, // ackend, not browser
    },
    extends: [
      js.configs.recommended,          // ESLint core rules
      ...tseslint.configs.recommended, // TypeScript rules
      prettier,                        // Prettier integration
    ],
  },
]);
