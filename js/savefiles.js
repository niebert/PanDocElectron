function saveTestFile () {
  console.log("Call: saveTestFile() l.368 index.html");
  saveFile('./message.txt', 'Hello Node.js this is the File Content');
}
function copyFile(pSource,pDestination) {
  if (checkFileExists(pDestination)) {
    alert("Create Error: File exists \n"+pDestination);
  } else {
    //var fs = require('fs');
    //fs.createReadStream(pSource).pipe(fs.createWriteStream(pDestination));
    var vCommand = "cp "+pSource+" "+pDestination;
    if (getOperatingSystem() == "Windows") {
      var vCommand = "copy "+pSource+" "+pDestination;
    }
    runShellCommand(vCommand);
  };
};
function saveEditorContent(pFilename) {
  var vInputFile = getValueDOM("inputFILE");
  var vInputFormat = getValueDOM("inputFORMAT");
  if (vInputFile=="") {
    alert("Error: Input Filename is not defined!");
  } else if (vInputFormat == "pdf") {
    alert("Error: Input File is PDF. Saving file is not supported!");
  } else {
    saveFile(getInnerHTML("inputFILE"),getValueDOM("inputEDITOR"));
    alert("Input File saved!\n"+vInputFile);
  }
}

function saveFile2AppDir (pFilename,pContent) {
  var vSep = getPathSeparator();
  var vFilename="."+vSep+pFilename;
  fs.writeFile(vFilename, pContent, (err) => {
    if (err) throw err;
    console.log('File: \''+pFilename+'\' saved to application directory!');
    //alert("Dirname: "+__dirname)
  });
}

function saveFile(pFilename,pContent) {
 fs.writeFile(pFilename, pContent, (err) => {
   if (err) throw err;
   console.log('Filename \''+pFilename+'\' saved!');
   //alert("Dirname: "+__dirname)
 });
}
