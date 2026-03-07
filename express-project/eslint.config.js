import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      "no-unused-vars": ["error", 
        { 
          argsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_"
        }],
    },
  },
]);
/**
 * Runtime Environment : Browser : window, document document.getElementById("background").innerHTML= "Hello World!"
 *                       Node    :  process, __dirname, etc
 *                       Both: console
 */
