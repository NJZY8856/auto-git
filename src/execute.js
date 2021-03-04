const {spawn} = require('child_process');
const { workspace } = require('vscode');

const cwd = workspace.workspaceFolders[0].uri.fsPath

 async function execute(command, args) {
  return new Promise((resolve, reject) => {
    let stderr = '', stdout = ''

    try {
      const batch = spawn(command, args, { cwd })

      batch.stdout.on('data', function(data) {
        stdout += data.toString()
      })

      batch.stderr.on('data', data => stdout += data.toString())
      batch.stderr.on('data', data => stderr += data.toString())

      batch.on('close', function() {
        if (stderr !== '') return reject(stderr.trim())

        resolve(stdout)
      })
    }
    catch (err) {
      reject(err)
    }
  })
}

module.exports =execute;