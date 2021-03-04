const vscode = require('vscode');
const { execFile,execSync } = require('child_process');

function validateCommitMessage(message) {
	return message !== undefined && message !== null && message.trim() !== ''
}

async function gitPush() {
  return new Promise((resolve, reject) => {
		vscode.window.showInformationMessage('8888999')
		execFile('git', ['add', '.'],(error, stdout, stderr) => {
			if (error) {
					console.error( 'stderr',  stderr);
					reject(stdout);
			}
			resolve(stdout);
		});
  }).then(async (resolve, reject) => {
		vscode.window.showInformationMessage('8889999877')
		const commitMessage = await vscode.window.showInputBox({
      ignoreFocusOut: true,
      prompt: 'Git commit message ?',
      validateInput: commitMessage => !validateCommitMessage(commitMessage)
        ? `You can't commit with an empty commit message. Write something or press ESC to cancel.`
        : undefined
		})
		vscode.window.showInformationMessage('888',commitMessage)
    execFile('git', ['commit', '-m',commitMessage],(error, stdout, stderr) => {
			if(error) {
				reject(stderr);
			}
			resolve(stdout);
		});
  }
  ).then((resolve, reject) => {
		const branch = execSync('git rev-parse --abbrev-ref HEAD').toString().replace(/\s+/, '');
		execFile('git', ['push', 'origin', `HEAD:refs/for/${branch}`],(error, stdout, stderr) => {
			if(error) {
				reject(stderr);
			}
			resolve(stdout);
		})
  }).catch((err) => {
		console.log(err);
		vscode.window.showInformationMessage(err);
});
}

module.exports = gitPush;