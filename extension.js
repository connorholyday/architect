const vscode = require("vscode");
const fs = require("fs-extra");
const path = require("path");
const cosmiconfig = require("cosmiconfig");
const explorer = cosmiconfig("architect", { cache: false });

/**
 * @param {String} folder the folder to be built to
 * @param {Object} config config object containing the options and paths
 */
async function start(folder, config) {
  const { name, paths } = config;
  let value;

  if (name) {
    value = await vscode.window.showInputBox({
      prompt: "Please enter the desired name"
    });
  }

  paths.forEach(path => {
    const destination = value ? path.replace(/ARCHITECT_NAME/g, value) : path;

    fs.ensureFile(`${folder}/${destination}`);
  });
}

/**
 * @param {Object} uri VSCode URI object from context menu
 */
async function architect(uri) {
  const localConfig = await explorer.search(vscode.workspace.rootPath);

  if (localConfig === null || localConfig.isEmpty) {
    throw new Error(
      "Architect is missing a config, find out how: https://github.com/connorholyday/architect#config"
    );
  }

  try {
    const stat = await fs.lstat(uri.fsPath);

    if (stat.isFile()) {
      const { dir } = path.parse(uri.fsPath);
      start(dir, localConfig.config);
      return;
    }

    if (stat.isDirectory()) {
      start(uri.fsPath, localConfig.config);
      return;
    }
  } catch (err) {
    console.error(err);
  }
}

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  let disposable = vscode.commands.registerCommand(
    "extension.architect",
    architect
  );
  context.subscriptions.push(disposable);
}
exports.activate = activate;

function deactivate() {}

module.exports = {
  activate,
  deactivate
};
