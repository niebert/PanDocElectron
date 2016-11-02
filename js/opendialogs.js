function checkPathExists(pPath) {
  const pathExists = require('path-exists');
  var vRet = false;
  var vMsg = 'Path not found \''+pPath+'\' - please check path!';
  pathExists(pPath).then(exists => {
    vMsg = 'Path \''+pPath+'\' found!';
    vRet = true;
  });
  console.log(vMsg);
  return false;
};

function X_checkPathExists(pPath) {
  var path = require('path');
  if (path.existsSync(pPath)) { //Depricated function
    console.log('checkPathExists(): Found \''+pPath+'\' Path');
    return true;
  } else {
    return false;
  };
};

function checkFileExists(pFile) {
  if (fs.existsSync(pFile)) {
    console.log('checkFileExists(): Found \''+pFile+'\' File');
    return true;
  } else {
    return false;
  }
};

function openWikiInBrowser() {
  var vServer = getValueDOM("inputSERVER");
  var vWikiArticle = getValueDOM("wikiARTICLE");
  var vURL = "https://"+vServer+"/wiki/"+vWikiArticle;
  openBrowserURL(vURL);
};

function openMediaInWindow() {
  var vPath = getProjectDir(getValueDOM("inputWEBPROJECT"));
  var vSep = getPathSeparator();
  var vFilename = vPath + vSep + "download_"+getValueDOM('wikiARTICLE')+".html";
  openFileInWindow(vFilename);
};

function openBrowserURL(pURL) {
  const {shell} = require('electron');
  shell.openExternal(pURL);
};

function openFileInBrowser(pFilename) {
  const {shell} = require('electron');
  console.log("openFileInBrowser('"+pFilename+"')");
  shell.openExternal(pFilename);
};

function openFileInWindow(pFilename) {
  console.log("openFileInWindow('"+pFilename+"')");
  window.open(pFilename);
};

function X_openFileInBrowser(pFilename) {
  const {shell} = require('electron');
  if (getOperatingSystem() == "Windows") {
    pFilename = "file://localhost/"+replaceString(pFilename,"\\","/");
  } else {
    pFilename = "file://"+pFilename;
  };
  shell.openExternal(pFilename);
};

function openInputFile (pPath) {
  pPath = getProjectDir(pPath);
  openFile("inputFILE","inputEDITOR",pPath);
};

function openBIBFile (pPath) {
  //pPath = getProjectDir(pPath);
  var vSep = getPathSeparator();
  pPath = getSoftwareDir("bib"+vSep+pPath);
  openFile("bibFILE","",pPath)
};

function openCSLFile (pPath) {
  var vSep = getPathSeparator();
  pPath = getSoftwareDir("bib"+vSep+pPath);
  openFile("cslFILE","",pPath)
};

function getFileContent (pFilename) {
  var vReturn =  fs.readFileSync(pFilename,'utf8');
  console.log('get Content of \''+pFilename+'\'');
  return vReturn;
};

function pathLinux2Win(pPath) {
  var vOS = getOperatingSystem();
  if (vOS == "Windows") {
    pPath = replaceString(pPath,"/","\\");
  } else {
    pPath = replaceString(pPath,"\\","/");
  };
  return pPath;
};

function openCMDFile (pFolderID,pPath,pHashTPL) {
  openTPLFile (pFolderID,pPath,pHashTPL);
};

function openREFFile (pFolderID,pPath,pHashTPL) {
  openTPLFile(pFolderID,pPath,pHashTPL);
};

function openTPLFile (pFolderID,pPath,pHashTPL) {
  //makedirpath(pPath);
  //pPath = pathLinux2Win(pPath);
  //pPath = getSoftwareDir(pPath);
  pPath = getProjectDir(pPath);
  dialog.showOpenDialog({defaultPath: pPath},function (fileNames) {
    if (fileNames === undefined) return;
    var fileName = fileNames[0];
    if (fileName) {
      write2innerHTML(pFolderID, fileName);
      vHashTPL[pFolderID] = fileName;
    };
 });
};

function openDirectory(pFolderID,pDefaultPath) {
  //dialog.showOpenDialog({ properties: [ 'openFile', 'openDirectory', 'multiSelections' ]})
  var vFolder =dialog.showOpenDialog({ defaultPath: pDefaultPath , properties: [ 'openDirectory' ]});
  if (vFolder) {
    write2innerHTML(pFolderID,vFolder);
    vHashTPL[pFolderID] = vFolder;
  }
};

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
};

function copyFile2Editor (pID,pFilename) {
  fs.readFile(pFilename, 'utf-8', function (err, data) {
    write2value(pID, data);
    console.log('\''+pFilename+'\' opened!');
  });
};
