import infra from "./build/eslint-plugin-infra/index.js";

export default [
  {
    plugins: { infra },
    rules: {
      "infra/strict-const": ['off']
    }
  }
];
