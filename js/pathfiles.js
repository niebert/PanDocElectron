function getMainDir() {
  // i.e. /home/user/Documente/Pandoc
  var vMainDir = getValueDOM("projectmainDIR");
  console.log("getMainDir() - '"+vMainDir +"'");
  return vMainDir;

}

function getScriptPath() {
  // __dirname is not available in the generated packages of
  // PanDocElectron with electron-packager-interactive
  var vFilename = document.location.href;
  var vPath = "undefined";
  vFilename = replaceString(vFilename,"file://","");
  vPath = getPath4Filename(vFilename);
  var vSep = getPathSeparator();
  if (vSep == "\\") {
    vPath = replaceString(vPath,"/","\\");
  };
  return vPath;
};

function getInputFilePath() {
  var vInputFile = getInnerHTML("inputFILE");
  var vReturn = "";
  if (!vInputFile) {
    vReturn = false;
    alert("ERROR: PanDoc Input File was not defined!\n    convertChecker():656");
  } else if (vInputFile == "") {
    vReturn = false;
    alert("Error: Input File was not defined!\nCall: convertChecker():659");
  } else {
    var vFilename = vInputFile;
    vReturn = getPath4Filename(vInputFile);
  };
  return vReturn;
};

function makedirpath(pPathDir) {
  var mkdirp = require('mkdirp');
  mkdirp(pPathDir, function(err) {
    // full path exists including all subdirectories unless there was an error
    //alert("Directory="+pPathDir+" already exists!");
  });
}
function getExtensionOfFilename(pFilename) {
  var re = /(?:\.([^.]+))?$/;
  // re.exec("/path.file/project/output.dzslides.html")[1];  returns  "html"
  return re.exec(pFilename)[1];   // "html"
}
function removeExtension(pFilename) {
  var vReturn = pFilename;
  if (pFilename.indexOf('.')>0) {
    vReturn = pFilename.substr(0, pFilename.lastIndexOf('.'));
  };
  return vReturn;
};
function getPathFromFilename(pFilename) {
  return getPath4Filename(pFilename);
}
function getPath4Filename(pFilename) {
  var vSep = getPathSeparator();
  return pFilename.substr(0, pFilename.lastIndexOf(vSep));
};
function getNameExt4Filename(pFilename) {
  var vSep = getPathSeparator();
  return pFilename.substr(pFilename.lastIndexOf(vSep)+1,pFilename.length);
};
function getName4Filename(pFilename) {
  return removeExtension(getNameExt4Filename(pFilename));
};
function getImageMagicCMD() {
  return (getValueDOM("imagemagickCMD"));
};
function getProjectDir(pProject) {
  var vSep = getPathSeparator();
  var vProject = "";
  if (pProject) {
    vProject = vSep+pProject;
  };
  return (getValueDOM("projectmainDIR")+vProject);
}
function getSoftwareDir(pProject) {
  var vSep = getPathSeparator();
  var vProject = "";
  if (pProject) {
    vProject = vSep+pProject;
  };
  return ("."+vProject);
}
/**
 * Souce: https://gist.github.com/eriwen/1211656
 * Given a source directory and a target filename, return the relative
 * file path from source to target.
 * @param source {String} directory path to start from for traversal
 * @param target {String} directory path and filename to seek from source
 * @return Relative path (e.g. "../../style.css") as {String}
 */
function getRelativePath(source, target) {
  var vSep = getPathSeparator();
  //var sep = (source.indexOf("/") !== -1) ? "/" : "\\",
  var sep = getPathSeparator(),
		targetArr = target.split(sep),
		sourceArr = source.split(sep),
		filename = targetArr.pop(),
		targetPath = targetArr.join(sep),
		relativePath = "";

	while (targetPath.indexOf(sourceArr.join(sep)) === -1) {
		sourceArr.pop();
		relativePath += ".." + sep;
	}

	var relPathArr = targetArr.slice(sourceArr.length);
	relPathArr.length && (relativePath += relPathArr.join(sep) + sep);

	return relativePath + filename;
};
function makeProjectDirs(pPath){
  // Creates all subdirectories for a project
  var vSep = getPathSeparator();
  makedirpath(pPath+vSep+"config");
  makedirpath(pPath+vSep+"audio");
  makedirpath(pPath+vSep+"video");
  makedirpath(pPath+vSep+"images");
}
