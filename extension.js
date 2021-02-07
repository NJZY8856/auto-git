// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const { execFile,execSync } = require('child_process');
const util = require('util');

const execFilePromise = util.promisify(execFile);
const branch = execSync('git rev-parse --abbrev-ref HEAD').toString().replace(/\s+/, '')

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

async function execGitAdd() {
  return new Promise(() => {
    return  execFilePromise('git', ['add', '.']);
  }).then(() => {
    return  execFilePromise('git', ['commit', '-m','gitAutoCommit'])
  }
  ).then(() => {
    return execFilePromise('git', ['push', '-u', 'origin', branch] );
  }).catch((err) => {
		console.log(err);
		vscode.window.showInformationMessage(err);
})
}

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "auto-git" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('auto-git.helloWorld', function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from auto-git!');
	});

	let autoGit = vscode.commands.registerCommand('auto-git.autoCommit', function() {
		vscode.window.showInformationMessage('menu menu');
		execGitAdd();
		vscode.window.showInformationMessage('提交成功')
	})

	context.subscriptions.push(disposable);
	context.subscriptions.push(autoGit);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
