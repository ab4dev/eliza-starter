import jsPlugin from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
//import sortKeysPlugin from "eslint-plugin-sort-keys";
import prettierPlugin from "eslint-plugin-prettier";
import jsoncParser from "jsonc-eslint-parser";
import globals from "globals";

// Destructure the recommended config from @eslint/js
const { configs: jsConfigs } = jsPlugin;

export default [
  //
  // 1) A basic "ignore" config object (global ignore patterns)
  //
  {
    ignores: [
      "**/node_modules/**",
      "**/dist/**",
      // Ignore any legacy .eslintrc.* if present
      ".eslintrc.*"
    ]
  },

  //
  // 2) Main config for .ts and .js files
  //
  {
    // Only apply these rules to .ts, .js, etc. (NOT .json)
    files: ["**/*.ts", "**/*.js", "**/*.cjs", "**/*.mjs"],

    // languageOptions => parserOptions + environment
    languageOptions: {
      // Start from ESLint's recommended ES config
      ...jsConfigs.recommended.languageOptions,

      // Add Node.js environment globals
      globals: {
        ...globals.node
      },

      // Use the TypeScript parser for typed linting
      parser: tsParser,

      // Provide typed config so TS rules have type info
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: ["./tsconfig.json"],
        tsconfigRootDir: "."
      }
    },

    // Register plugins
    plugins: {
      "@typescript-eslint": tsPlugin,
      //"sort-keys": sortKeysPlugin,
      "prettier": prettierPlugin
    },

    // Merge recommended sets + Prettier + your custom rules
    rules: {
      // ESLint "recommended" from @eslint/js
      ...jsConfigs.recommended.rules,

      // TS ESLint recommended sets
      ...tsPlugin.configs.recommended.rules,
      ...tsPlugin.configs["recommended-requiring-type-checking"].rules,

      // Prettier recommended
      ...prettierPlugin.configs.recommended.rules,

      // ----- Your custom rules -----
      "@typescript-eslint/explicit-function-return-type": "error",
      "@typescript-eslint/explicit-member-accessibility": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/member-ordering": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-unused-vars": "warn",

      "id-length": [
        "error",
        {
          exceptions: ["_"],
          min: 2
        }
      ],
      "linebreak-style": 0,
      "no-console": "error",
      "no-restricted-syntax": [
        "error",
        {
          message: "Please use brackets on if blocks",
          selector: "IfStatement > ExpressionStatement > AssignmentExpression"
        },
        {
          message: "Please use brackets on if blocks",
          selector: "IfStatement > ThrowStatement"
        }
      ],

      // Prettier styling with your custom overrides
      "prettier/prettier": [
        "error",
        {
          endOfLine: "auto",
          printWidth: 150
        }
      ],

      // Sort keys plugin
      //"sort-keys": "off",
      //"sort-keys/sort-keys-fix": "warn"
    }
  },

  //
  // 3) Override for test files
  //
  {
    files: ["**/test/**", "**/*.spec.ts", "**/*.e2e-spec.ts"],
    rules: {
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "no-console": "off"
    }
  },

  //
  // 4) Override for JSON files (to avoid typed TS rules)
  //
  {
    files: ["**/*.json", "**/*.json5"],
    languageOptions: {
      // Use the JSONC parser for .json
      parser: jsoncParser
    },
    rules: {
      // Blanket-disable all TS rules so they don't error on "requires type info"
      "@typescript-eslint/*": "off",

      // Keep your "sort-keys" fix if you like
      //"sort-keys/sort-keys-fix": "warn"
    }
  }
];
