// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const { rejects } = require('assert');
const gitPush = require('./src/gitPush');

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

	let autoGit = vscode.commands.registerCommand('auto-git.autoCommit', async function() {
		vscode.window.showInformationMessage('menu menu');
		await gitPush();
		vscode.window.showInformationMessage('提交成功');
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
