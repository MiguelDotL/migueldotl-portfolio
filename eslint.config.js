import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default tseslint.config(
    {
        ignores: [
            "dist",
            "build",
            "storybook-static",
            "coverage",
            "node_modules",
            "public/404.html",
            "scripts/**",
            "*.config.js",
            "*.config.ts"
        ]
    },
    {
        extends: [
            js.configs.recommended,
            ...tseslint.configs.recommended,
            react.configs.flat.recommended,
            react.configs.flat["jsx-runtime"]
        ],
        files: ["src/**/*.{ts,tsx}"],
        languageOptions: {
            ecmaVersion: 2022,
            globals: { ...globals.browser, ...globals.node },
            parserOptions: { ecmaFeatures: { jsx: true } }
        },
        settings: { react: { version: "detect" } },
        plugins: {
            "react-hooks": reactHooks,
            "react-refresh": reactRefresh
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            "react-refresh/only-export-components": [
                "warn",
                { allowConstantExport: true }
            ],
            "react/prop-types": "off",
            "react/no-unescaped-entities": "off"
        }
    },
    {
        files: ["src/**/*.test.{ts,tsx}", "src/**/*.stories.{ts,tsx}"],
        languageOptions: {
            globals: { ...globals.browser, ...globals.node }
        },
        rules: {
            "react-refresh/only-export-components": "off"
        }
    }
);
