# eslint-plugin-emberobserver

The addon is part of an initiative to implement showing embroider compatibility for addons in emberobserver.
To check if the addon is embroider compatible there need to be two checks:
1. check if ember-cli-build.js call maybeEmbroider function
2. check if tests ember-safe and ember-optimised passed

This addon solves the first point. maybeembroider-required rule will check if maybeEmbroider function is called in ember-cli-build.js

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-emberobserver`:

```sh
npm install eslint-plugin-emberobserver --save-dev
```

## Usage

Add `emberobserver` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "emberobserver"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "emberobserver/maybeembroider-required": "error"
    }
}
```

## Supported Rules

* Fill in provided rules here


