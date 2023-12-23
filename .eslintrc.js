module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: "eslint:recommended",
  plugins: ["prettier"],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "no-unused-vars": "warn",
    "prettier/prettier": [
      "warn",
      {
        "printWidth": 120,
        "tabWidth": 2,
        "singleQuote": true,
        "arrowParens": "avoid",
        "semi": false,
        "trailingComma": "none",
        "endOfLine": "lf",
        "useTabs": false,
        "jsxSingleQuote": false
      }
    ]
  },
};
