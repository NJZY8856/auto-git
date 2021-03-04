const vscode = require('vscode');
const excute = require('./execute');

async function gitmergeWithoutCommit() {
  await excute('git', ['pull']);
  const branches = await excute('git', ['branch']);
  const branchesArr = branches.split(' ');
  const selected = vscode.window.showQuickPick(branchesArr);
  await excute('git',['merge', `origin/${selected}`, '--no-f', '--no-commit']);
}


module.exports = gitmergeWithoutCommit;