"use strict";

module.exports = {
  root: true,
  parser: "@babel/eslint-parser",
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
    babelOptions: {
      plugins: [
        [
          // eslint-disable-next-line node/no-unpublished-require
          require.resolve("@babel/plugin-proposal-decorators"),
          { legacy: true },
        ],
      ],
    },
    requireConfigFile: false,
  },
  extends: [
    "eslint:recommended",
    "plugin:eslint-plugin/recommended",
    "plugin:node/recommended",
  ],
  env: {
    node: true,
    es6: true,
  },
};
