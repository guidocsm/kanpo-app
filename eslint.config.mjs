import nextPlugin from "@next/eslint-plugin-next"
import tsPlugin from "@typescript-eslint/eslint-plugin"
import tsParser from "@typescript-eslint/parser"
import importX from "eslint-plugin-import-x"
import reactPlugin from "eslint-plugin-react"
import reactHooks from "eslint-plugin-react-hooks"

const eslintConfig = [
  {
    ignores: [".next/**", "node_modules/**", "out/**", "build/**"],
  },
  {
    files: ["**/*.{js,jsx,ts,tsx,mjs,cjs}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      react: reactPlugin,
      "react-hooks": reactHooks,
      "@next/next": nextPlugin,
      "import-x": importX,
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "@typescript-eslint/no-unused-vars": "warn",
      "prefer-const": "error",
      "no-var": "error",
      curly: "error",
      "import-x/order": [
        "error",
        {
          groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
    },
    settings: {
      react: { version: "detect" },
    },
  },
]

export default eslintConfig