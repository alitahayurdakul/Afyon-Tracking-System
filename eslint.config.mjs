import tsParser from "@typescript-eslint/parser";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import prettierPlugin from "eslint-plugin-prettier";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import react from "eslint-plugin-react";

export default [
  { ignores: ["**/.next/**", "src/utils/enum/**"] },

  {
    files: ["src/**/*.{js,jsx,ts,tsx}"],

    plugins: {
      "@typescript-eslint": tsPlugin,
      "simple-import-sort": simpleImportSort,
      prettier: prettierPlugin,
      react,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
        project: "./tsconfig.json",
      },
    },
    rules: {
      "simple-import-sort/imports": [
        "warn",
        {
          groups: [
            ["^react$", "^next", "^[a-z]"],
            ["^@"],
            ["^@/"],
            ["^~"],
            ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
            ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
            ["\\.png$", "\\.svg$"],
            ["^\\u0000"],
            ["^.+\\.s?css$"],
          ],
        },
      ],
      "simple-import-sort/exports": "warn",
      "react/no-unknown-property": "off",
      "@typescript-eslint/no-unnecessary-type-constraint": "off",
      "no-duplicate-imports": "error",
      "no-unused-vars": [
        "warn",
        { ignoreRestSiblings: true, varsIgnorePattern: "^_" },
      ],
      "react/react-in-jsx-scope": "off",
      "@next/next/no-img-element": "off",
    },
  },
];