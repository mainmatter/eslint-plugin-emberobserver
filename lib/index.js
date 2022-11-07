/**
 * @fileoverview Includes rule which checks for maybeEmbroider function called in ember-cli-build.js
 * @author Stanislav Dunajcan
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const requireIndex = require("requireindex");

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------


// import all rules in lib/rules
module.exports.rules = requireIndex(__dirname + "/rules");



// import processors
module.exports.processors = {
  // add your processors here
};

