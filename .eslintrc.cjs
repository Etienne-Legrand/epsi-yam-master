module.exports = {
  root: true,
  env: { browser: true, es2020: true, jest: true },
  extends: ["eslint:recommended", "plugin:react/recommended"],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@babel/eslint-parser",
  plugins: ["react"],
  rules: {
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "react/no-unescaped-entities": 0,
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
