/**
 * @fileoverview Require maybeEmbroider function imported and called in ember-cli-build.js
 * @author Stanislav Dunajcan
 */
"use strict";
const path = require('path');

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
function isRequireCall(node) {
  return (
    node.callee.name === "require" &&
    node.arguments.length === 1 &&
    node.arguments[0].value === "@embroider/test-setup"
  );
}

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    messages: {
      error: "maybeEmbroider isn't called!",
    },
    type: "problem", // `problem`, `suggestion`, or `layout`
    docs: {
      description:
        "Require maybeEmbroider function imported and called in ember-cli-build.js",
      recommended: false,
      url: null,
    },
    fixable: null,
    schema: [],
  },

  create(context) {
    const fullFileName = context.getFilename();
    const fileName = path.basename(fullFileName);
    if (fileName !== "ember-cli-build.js") {
      return {};
    }

    let funcName;
    let testSetupName;
    let maybeEmbroiderCalled = false;

    return {
      CallExpression(node) {
        // get imported function name
        if (
          isRequireCall(node) &&
          node.parent &&
          node.parent.type === "VariableDeclarator"
        ) {
          if (node.parent.id.type === "Identifier") {
            testSetupName = node.parent.id.name;
          } else if (node.parent.id.type === "ObjectPattern") {
            const prop = node.parent.id.properties.find(
              (p) => p.key.name === "maybeEmbroider"
            );
            if (prop) {
              funcName = prop.value.name;
            }
          }
        }

        // check maybeEmbroider is called
        if (funcName) {
          if (node.callee.name === funcName) {
            maybeEmbroiderCalled = true;
          }
        } else if (testSetupName) {
          if (
            node.callee.object &&
            node.callee.object.name === testSetupName &&
            node.callee.property.name === "maybeEmbroider"
          ) {
            maybeEmbroiderCalled = true;
          }
        }
      },
      onCodePathEnd: function (codePath, node) {
        // at the end of the program checking if maybeEmbroider function was called.
        if (node.type === "Program" && !maybeEmbroiderCalled) {
          context.report({
            node,
            messageId: "error",
          });
        }
      },
    };  
  },
};
