# Architect README

This extension adds the ability to right-click on a folder and build a sub-folder containing files and folders listed out in a config. This is ideal if you find yourself following a pattern like with certain component architectures.

## How it works

1. Create a config with an array of paths to be built
2. Set the `name` option to `true` if you want to use the special string `ARCHITECT_NAME` to be replaced through an input dialog
3. Right-click on a folder and choose `Architect` to build your paths

## Config

Options:

- `name`: Boolean - for string replacement in the paths. If this is set to `true` then replace part of your path with `ARCHITECT_NAME`.
- `paths`: Array[String] - an array of strings representing the paths to be created.

## Example Config

```
module.exports = {
  paths: [
    "Component/Component.js",
    "Component/index.js",
    "Component/styles.js"
  ]
};
```

With name set to `true`:

```
module.exports = {
  name: true,
  paths: [
    "ARCHITECT_NAME/ARCHITECT_NAME.js",
    "ARCHITECT_NAME/index.js",
    "ARCHITECT_NAME/styles.js"
  ]
};
```

## Issues

Log all issues here: [https://github.com/connorholyday/architect/issues]()

## Release Notes

### 1.0.0

Initial release of Architect
