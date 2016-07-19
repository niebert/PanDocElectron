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
    var vCommand = "cp";
    if (getOperatingSystem() == "Windows") {
      var vCommand = "copy "+pSource+" "+pDestination;
    };
    var vParams=[pSource,pDestination];
    execFileCommand(vCommand,vParams);
    console.log("execFile: "+vCommand+" "+vParams.join(" "));
  };
};

function saveEditorOutContent() {
  saveEditorContent(getValueDOM("outputFILE"),"outputEDITOR");
};

function saveEditorContent(pFilename,pID) {
  var vInputFile = pFilename || getValueDOM("inputFILE");
  var vID = pID || "inputEDITOR";
  var vInputFormat = getValueDOM("inputFORMAT");
  if (vInputFile=="") {
    alert("Error: Input Filename is not defined!");
  } else if (vInputFormat == "pdf") {
    alert("Error: Input File is PDF. Saving file is not supported!");
  } else {
    saveFile(vInputFile,getValueDOM(vID));
    alert("Editor File saved!\n"+vInputFile);
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
 //alert(typeof(pFilename));
 fs.writeFile(pFilename, pContent, (err) => {
   if (err) throw err;
   console.log('Filename \''+pFilename+'\' saved!');
   //alert("Dirname: "+__dirname)
 });
}
