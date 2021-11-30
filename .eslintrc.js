module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["prettier", "@typescript-eslint"],
  env: {
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: "module",
  },
  extends: [
    "eslint:recommended",
    "prettier",
    "plugin:@typescript-eslint/recommended",
  ],
  rules: {
    "prettier/prettier": "error",
  },
  ignorePatterns: ["lib/**"],
};
