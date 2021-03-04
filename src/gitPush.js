const vscode = require('vscode');
const { execSync } = require('child_process');
const execute = require('./execute');

function validateCommitMessage(message) {
	return message !== undefined && message !== null && message.trim() !== ''
}

async function gitPush() {
  await execute('git', ['add','.']);
  const commitMessage = await vscode.window.showInputBox({
    ignoreFocusOut: true,
    prompt: 'Git commit message ?',
    validateInput: commitMessage => !validateCommitMessage(commitMessage)
      ? `You can't commit with an empty commit message. Write something or press ESC to cancel.`
      : undefined
  });
  await execute('git', ['commit', '-m', commitMessage]);
  const branch = await execute('git', ['rev-parse', '--abbrev-ref', 'HEAD']);
  const data = await execute('git', ['push', 'origin', `HEAD:refs/for/${branch.toString().replace(/\s+/, '')}`]);
  vscode.window.showInformationMessage('提交成功',data);
}

module.exports = gitPush;