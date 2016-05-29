
function checkPathExists(pPath) {
  var path = require('path');
  if (path.existsSync(pPath)) {
    console.log('Found \''+pPath+'\' Path');
    // do something
  };
}
function checkFileExists(pFile) {
  if (fs.existsSync(pFile)) {
    console.log('Found \''+pFile+'\' File');
    // do something
    return true;
  } else {
    return false;
  }
}
function openBrowserURL(pURL) {
  const {shell} = require('electron');
  shell.openExternal(pURL);
}
function openInputFile (pPath) {
  pPath = getProjectDir(pPath);
  openFile("inputFILE","inputEDITOR",pPath);
}
function openBIBFile (pPath) {
  //pPath = getProjectDir(pPath);
  var vSep = getPathSeparator();
  pPath = getSoftwareDir("bib"+vSep+pPath);
  openFile("bibFILE","",pPath)
}
function openCSLFile (pPath) {
  var vSep = getPathSeparator();
  pPath = getSoftwareDir("bib"+vSep+pPath);
  openFile("cslFILE","",pPath)
}
function getFileContent (pFilename) {
  var vReturn =  fs.readFileSync(pFilename,'utf8');
  console.log('get Content of \''+pFilename+'\'');
  return vReturn;
}
function openTPLFile (pFolderID,pPath,pHashTPL) {
  //makedirpath(pPath);
  pPath = getSoftwareDir(pPath);
  dialog.showOpenDialog({defaultPath: pPath},function (fileNames) {
    if (fileNames === undefined) return;
    var fileName = fileNames[0];
    if (fileName) {
      write2innerHTML(pFolderID, fileName);
      vHashTPL[pFolderID] = fileName;
    };
 });
}
function openREFFile (pFolderID,pPath,pHashTPL) {
  openTPLFile(pFolderID,pPath,pHashTPL);
}

function openDirectory(pFolderID,pDefaultPath) {
  //dialog.showOpenDialog({ properties: [ 'openFile', 'openDirectory', 'multiSelections' ]})
  var vFolder =dialog.showOpenDialog({ defaultPath: pDefaultPath , properties: [ 'openDirectory' ]});
  if (vFolder) {
    write2innerHTML(pFolderID,vFolder);
    vHashTPL[pFolderID] = vFolder;
  }
}
function openFile (pFilenameID,pTextAreaID,pPath) {
  openFileWriteDOM(pFilenameID,pTextAreaID,pPath);
};
function openFileWriteDOM (pFilenameID,pTextAreaID,pDefaultPath) {
  //alert("pPath="+pPath);
  //var vDefaultPath=app.getPath('downloads')}
  //var vDefaultPath=app.getPath('documents');
  //var vSep = getPathSeparator();
  //+vSep+pPath
  var vDefaultPath = pDefaultPath || getValueDOM("projectmainDIR");
  makedirpath(vDefaultPath);
  dialog.showOpenDialog({defaultPath: vDefaultPath},function (fileNames) {
    if (fileNames === undefined) return;
    var fileName = fileNames[0];
    write2innerHTML(pFilenameID, fileName);
    changedOutFormat(getValueDOM("outputFORMAT"));
    if (pTextAreaID!="") {
      copyFile2Editor(pTextAreaID,fileName);
    };
    if (pTextAreaID=="inputEDITOR") {
      loadTitleAuthor();
      autoSelectInputFormat();
    }
 });
}

function copyFile2Editor (pID,pFilename) {
  fs.readFile(pFilename, 'utf-8', function (err, data) {
    write2value(pID, data);
    console.log('\''+pFilename+'\' opened!');
  });
}
