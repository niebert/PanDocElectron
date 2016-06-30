
function downloadInputFile(pPath) {
  //alert("Download Input File and Convert Source File to MarkDown");
  var vPath = getProjectDir(getValueDOM("inputWEBPROJECT"));
  makedirpath(vPath);
  makeProjectDirs(vPath); //audio, video, config, images
  //alert("URL: "+getValueDOM("inputURL")+"\nDownload File: "+getValueDOM("downloadWebFILE")+"\nWeb Project: "+getValueDOM("inputWEBPROJECT"));

  var vCommand ="pandoc -s -r html "+getValueDOM("inputURL")+" -o "+getValueDOM("downloadWebFILE");
  console.log(vCommand);
  var vAnswer = true;
  if (checkFileExists(getValueDOM("downloadWebFILE"))) {
    vAnswer = confirm("Warning Download will overwrite existing File!")
  };
  if (vAnswer) {
    runShellCommand(vCommand);
    vInputFile = getValueDOM("downloadWebFILE");
    copyFile2Editor ("inputEDITOR",vInputFile);
    write2innerHTML("inputFILE",vInputFile);
    alert("Download URL: "+getValueDOM("inputURL")+"\nto Web Project: "+getValueDOM("inputWEBPROJECT"));
  }
};

function setInput4WebDownload() {
  var vSep = getPathSeparator();
  var vProjectName = document.getElementById("inputPROJECT").value;
  var vDownloadFile = getProjectDir()+vSep+vProjectName+vSep+vProjectName+"_web.md";
  document.getElementById("downloadWebFILE").innerHTML = vDownloadFile;
};

function createProject() {
  var vSep = getPathSeparator();
  var vName = getValueDOM("inputNEWPROJECT");
  var vPath = getValueDOM("projectmainDIR")+vSep+vName;
  var vInFormat = getValueDOM("inputFORMAT");
  var vExt = vExtHash[vInFormat];
  // vFilename is the new Input Filename for the new project
  var vFilename = vPath+vSep+vName+"."+vExt;
  // vFile
  if (confirm("Do you want to create the following project?\nProject Folder: "+vName+"/\nFilename: "+vName+"."+vExt)) {
    makedirpath(vPath);
    //openFile (vFilenameID,"inputEDITOR",pPath)
    var vDir = getValueDOM("projectmainDIR")+vSep+"tpl"+vSep+"DEFAULT"+vSep;
    // vDefaultFile: Copy from this default Source File for new Project
    var vDefaultFile = vDir + "md" + vSep +"input.md";
    var vInFormat = getValueDOM("inputFORMAT");
    var vOutFormat = getValueDOM("outputFORMAT");
    //alert("NEW Output Format="+vOutFormat);
    //alert("NEW Output Format="+vOutFormat);
    //alert("NEW Input Format="+vInFormat);
    switch (vInFormat) {
      case "markdown": // not "md" - which is the extension
        //alert("MD Create Project createProject():436:index.html");
        vDefaultFile = vDir + vInFormat + vSep +"default."+vInFormat;
        //copyFile2Editor("inputEDITOR",vDefaultFile);
        copyFile(vDefaultFile,vFilename);
        break;
      case "mediawiki":
        //alert("WIKI Create Project createProject():441:index.html");
        vDefaultFile = vDir + "wiki" + vSep +"default.wiki";
        //copyFile2Editor("inputEDITOR",vFilename);
        copyFile(vDefaultFile,vFilename);
        break;
      case "pdf":
          //alert("MD Create Project createProject():436:index.html");
          vDefaultFile = vDir + vInFormat + vSep +"default."+vInFormat;
          copyFile(vDefaultFile,vFilename);
          break;
      default:
        alert("Default ["+vInFormat+"] Create Project createProject():441:index.html");
        vDefaultFile = getInnerHTML("DEFAULTTPL");
        //alert(vDefaultFile);
        runShellCommand("pandoc -f markdown -t "+vInFormat+" "+vDefaultFile+" -o "+vFilename);
    };
    makeProjectDirs(vPath); //audio, video, config, images
    //setInput4Project('inputNEWPROJECT','inputNEWFILE');
    write2innerHTML("inputFILE",vFilename);
    write2value("inputEDITOR","");
    //changedOutFormat(getValueDOM(outputFORMAT));
    var vOutFilename = getPathFromFilename(vFilename)+vSep+vName+"_"+vOutFormat+"."+vExtHash[vOutFormat];
    write2innerHTML("outputFILE",vOutFilename);
    //setFormat4Input();
    //write2value("inputFORMAT",)
    alert("Project: "+vName+" created!\nInput Format: "+vInFormat+"\nOutput Format: "+vOutFormat);
    setPage("bConvert");
  } else {
    // Do nothing!
    alert("Project Create: CANCEL Operation")
  }
}
