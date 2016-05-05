var remote = require('remote');
var dialog = remote.require('dialog');

function openFile () {
 dialog.showOpenDialog(function (fileNames) {
  if (fileNames === undefined) return;
  var fileName = fileNames[0];
  fs.readFile(fileName, 'utf-8', function (err, data) {
    document.getElementById("inputEDITOR").value = data;
  });
 });
}

function saveFile () {
 fs.writeFile('message.txt', 'Hello Node.js', (err) => {
   if (err) throw err;
   console.log('It\'s saved!');
 });
}

function runShellCommand () {
 const child = exec('ls -la',
   (error, stdout, stderr) => {
     console.log(`stdout: ${stdout}`);
     alert(`stdout: ${stdout}`);
     console.log(`stderr: ${stderr}`);
     if (error !== null) {
       console.log(`exec error: ${error}`);
     }
 });
}
