/**
 * @fileoverview Require maybeEmbroider function imported and called in ember-cli-build.js
 * @author Stanislav Dunajcan
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/maybeembroider-required"),
  RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parserOptions: { ecmaVersion: 2020, sourceType: "module" },
});
ruleTester.run("maybeembroider-required", rule, {
  valid: [
    {
      filename: 'some/path/ember-cli-build.js',
      code: `const { maybeEmbroider } = require("@embroider/test-setup");
      maybeEmbroider();`
    },
    {
      filename: 'some/path/ember-cli-build.js',
      code: `const { maybeEmbroider: me } = require("@embroider/test-setup");
      me();`
    },
    {
      filename: 'some/path/ember-cli-build.js',
      code: `const testSetup = require("@embroider/test-setup");
      testSetup.maybeEmbroider();`
    },
    {
      filename: 'some/path/some-file.js',
      code: `const a = 1;`
    },
  ],

  invalid: [
    {
      // imported but not called
      filename: 'some/path/ember-cli-build.js',
      code: `const { maybeEmbroider } = require("@embroider/test-setup");`,
      errors: ['maybeEmbroider isn\'t called!'],
    },
    {
      // not imported but called
      filename: 'some/path/ember-cli-build.js',
      code: `maybeEmbroider();`,
      errors: ['maybeEmbroider isn\'t called!'],
    },
    {
      // imported with alias but called by maybeEmbroider
      filename: 'some/path/ember-cli-build.js',
      code: `const { maybeEmbroider: me } = require("@embroider/test-setup");
      maybeEmbroider();`,
      errors: ['maybeEmbroider isn\'t called!'],
    },
  ],
});
