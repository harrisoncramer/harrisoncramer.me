module.exports = {
  settings: {
    react: {
      version: "detect",
    },
  },
  globals: {
    __PATH_PREFIX__: false,
    ___emitter: false,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  extends: ["eslint:recommended", "plugin:prettier/recommended"],
  overrides: [
    // Typescript
    {
      files: ["*.ts", "*.tsx"],
      env: {
        browser: true,
        es2021: true,
      },
      excludedFiles: ["*.test.js", "gatsby-node.js", "gatsby-config.js"],
      extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:react/recommended",
      ],
      parser: "@typescript-eslint/parser",
      plugins: ["react", "@typescript-eslint"],
      rules: {
        "react/no-unescaped-entities": "off",
      },
    },
    // Gatsby + ESLint
    {
      files: [".eslintrc.js", "gatsby-node.js", "gatsby-config.js"],
      env: {
        node: true,
      },
    },
  ],
}
