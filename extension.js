const vscode = require("vscode");
const fs = require("fs");
const path = require("path");

function mkdirpath(dirPath) {
  if (!fs.accessSync(dirPath, fs.constants.R_OK | fs.constants.W_OK)) {
    try {
      fs.mkdirSync(dirPath);
    } catch (e) {
      mkdirpath(path.dirname(dirPath));
      mkdirpath(dirPath);
    }
  }
}

async function architect(uri) {
  const fsPath = (uri && uri.fsPath) || undefined;
  let folder;
  let hasInitialPath = false;

  if (fsPath) {
    folder = path.dirname(fsPath);
    hasInitialPath = true;
  } else {
    folder = await vscode.window.showInputBox({
      prompt: "Architect to",
      value: vscode.workspace.workspaceFolders[0].uri.fsPath
    });
  }

  if (!folder) {
    throw new Error("No folder");
  }

  if (!hasInitialPath) {
    mkdirpath(folder);
  }

  fs.writeFile(
    folder + "/testing-architect.js",
    "",
    {
      flag: "wx"
    },
    err => {
      if (err) throw err;
    }
  );

  vscode.window.showInformationMessage(folder);
}

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    "extension.architect",
    architect
  );

  context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate
};
