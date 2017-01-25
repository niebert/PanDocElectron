
function appendDirectoryInput(pID,pTitle,pTemplate,pFolderID,pPathDefault,pButtonTitle,pTPL) {
  var vReplaceHash = {};
  vInnerHTMLID.push(pFolderID);
  vReplaceHash["FOLDERID"]    = pFolderID;
  vReplaceHash["BUTTONTITLE"] = pButtonTitle;
  vReplaceHash["TITLE"] = pTitle;
  vReplaceHash["PATHDEFAULT"] = pPathDefault;
  appendTemplateHash(pID,pTemplate,vReplaceHash,pTPL);
};

function appendTemplateInput(pID,pOutputFORMAT,pTemplate,pPath,pExt,pHashTPL,pTPL) {
  var vTPLID = pOutputFORMAT+"TPL";
  if (pTemplate.indexOf("referencefile")>0) {
    vTPLID = pOutputFORMAT+"REF";
  };
  vInnerHTMLID.push(vTPLID);
  var vReplaceHash = {};
  var vSep = getPathSeparator();
  var vDefaultName = "tpldefault";
  if ((pOutputFORMAT=="odt") && (pTemplate == "template.html")) {
    vDefaultName = "content"
  };
  if (pOutputFORMAT=="DEFAULT") {
    vDefaultName = pExt+vSep+"input";
  };
  vReplaceHash["FORMAT"] = pOutputFORMAT;
  vReplaceHash["TYPE"]   = pOutputFORMAT.toUpperCase();
  vReplaceHash["TPLDEFAULT"] = pPath+vSep+"tpl"+vSep+pOutputFORMAT+vSep+vDefaultName+"."+pExt;
  if (pHashTPL[vTPLID]) {
    //alert("Template: "+vTPLID+" exists!\n"+pHashTPL[vTPLID]);
  } else {
    //alert("Template: "+vTPLID+" does not exist!");
    pHashTPL[vTPLID] = vReplaceHash["TPLDEFAULT"];
  };
  appendTemplateHash(pID,pTemplate,vReplaceHash,pTPL);
};

function appendTemplateHash(pID,pTemplate,pReplaceHash,pTPL) {
  var vContent = "Error: Template "+pTemplate+" undefined";
  //} else {
  if (pTPL) {
      vContent = pTPL;
      for (iID in pReplaceHash) {
        vContent = replaceString(vContent,"___"+iID+"___", pReplaceHash[iID]);
      };
      //alert("REPLACED ["+pID+"]: \n"+vContent);
      append2innerHTML(pID,vContent);
      //console.log('['+pID+'] Template File \''+pTemplate+'\' loaded!');
  };
};

function X_appendTemplateHash(pID,pTemplate,pReplaceHash) {
  var vContent = "Error: Template "+pTemplate+" undefined";
  //} else {
  fs.readFile(pTemplate, 'utf-8', function (err, tpldata) {
      //alert("Template: "+pTemplate+" load\n"+tpldata);
      vContent = tpldata;
      for (iID in pReplaceHash) {
        vContent = replaceString(vContent,"___"+iID+"___", pReplaceHash[iID]);
      };
      //alert("REPLACED ["+pID+"]: \n"+vContent);
      append2innerHTML(pID,vContent);
      console.log('Template File \''+pTemplate+' loaded!');
  });
};

function setDefaultValues(pHashTPL) {
  var vSep = getPathSeparator(); // is on Linux/Mac "/" on Windows "Backslash"
  if (vSep == "\\") {
    // alert("Windows setDefaultValues()");
  };
  var vPathMain = app.getPath('documents')+vSep+"PanDoc";
  // Clone PanDoc repository if necessary
  var vMathJax = vPathMain + vSep + "mathjax" + vSep + "MathJax.js";
  if (checkFileExists(vMathJax)) {
    console.log("PanDoc Folder cloned");
  } else {
    var vAns = confirm("PanDoc Folder is missing!\nDo you want to download the PanDoc Folder?");
    if (vAns == true) {
      var vGIT_CMD  = getValueDOM("EDITgitCMD");
      execCommand(vGIT_CMD + " clone https://github.com/niebert/PanDoc.git " + app.getPath('documents'));
    } else {
      console.log("PanDoc folder not downloaded!");
    };
  };
  //----Set all Directory s
  write2innerHTML("projectmainDIR",vPathMain);
  write2innerHTML("currentworkingDIR",process.cwd());
  //setInput4WebDownload();
  setInput4Project('inputNEWPROJECT','inputNEWFILE');
  //setInput4Project('inputWEBPROJECT','downloadWebFILE',"md");
  setInput4Project('inputWEBPROJECT','downloadWikiFILE',"wiki");
  // set vPath to Template Path and init the templates to default filenames
  //var vPath = app.getPath('documents')+vSep+"PanDoc";
  //require('path');
  //var vPath = fs.realpathSync('.'); // __dirname not working
  var vPath = vPandocDocs;
  //alert("vPath="+vPath);
  //var vPath = app.getPath('home')+vSep+"ownCloudLD"+vSep+"PanDoc";

  // Reading from App-Dir is not supported in packager
  //var vTPL_HTML = fs.readFileSync('./html/template.html', 'utf8');
  //var vREF_HTML = fs.readFileSync('./html/referencefile.html', 'utf8');
  //var vDIR_HTML = fs.readFileSync('./html/defaultfolder.html', 'utf8');
  var vTPL_HTML = document.getElementById("tplTPL").value;
  var vREF_HTML = document.getElementById("tplREF").value;
  var vDIR_HTML = document.getElementById("tplDIR").value;
  var vCHECKDIR_HTML = document.getElementById("tplCHECKDIR").value;

  var vhtml ="html"+vSep;
  appendTemplateInput("tabletemplates","DEFAULT",vhtml+'template.html',vPath,"md",pHashTPL,vTPL_HTML);
  appendTemplateInput("tabletemplates","reveal",vhtml+'template.html',vPath,"html",pHashTPL,vTPL_HTML);
  appendTemplateInput("tabletemplates","audioslides",vhtml+'template.html',vPath,"html",pHashTPL,vTPL_HTML);
  appendTemplateInput("tabletemplates","dzslides",vhtml+'template.html',vPath,"html",pHashTPL,vTPL_HTML);
  appendTemplateInput("tabletemplates","latex",vhtml+'template.html',vPath,"tex",pHashTPL,vTPL_HTML);
  appendTemplateInput("tabletemplates","odt",vhtml+'template.html',vPath,"xml",pHashTPL,vTPL_HTML);
  appendTemplateInput("tabletemplates","odt",vhtml+'referencefile.html',vPath,"odt",pHashTPL,vREF_HTML);
  appendTemplateInput("tabletemplates","odt2col",vhtml+'referencefile.html',vPath,"odt",pHashTPL,vREF_HTML);
  appendTemplateInput("tabletemplates","docx",vhtml+'referencefile.html',vPath,"docx",pHashTPL,vREF_HTML);
  appendTemplateInput("tabletemplates","docx2col",vhtml+'referencefile.html',vPath,"docx",pHashTPL,vREF_HTML);
  appendTemplateInput("tabletemplates","html",vhtml+'referencefile.html',vPath,"css",pHashTPL,vREF_HTML);
  //alert(app.getPath('documents'))
  appendDirectoryInput("tablefolders","Reveal",vhtml+"defaultfolder.html","revealDIR",vPathMain+vSep+"reveal","Reveal Folder ",vDIR_HTML,vInnerHTMLID);
  appendDirectoryInput("tablefolders","MathJax",vhtml+"checkboxfolder.html","mathjaxDIR",vPathMain+vSep+"mathjax","MathJax Folder ",vCHECKDIR_HTML,vInnerHTMLID);
  //copyFile2Editor ("audioslideMAIN",getInnerHTML("tplFILEaudioslides"));
  //copyFile2Editor ("inputLOOP",__dirname+'/tpl/imgslides/audiosection.txt');
  document.getElementById("inputNEWFORMAT").innerHTML = document.getElementById("inputFORMAT").innerHTML;
  setColorSelected("bConvert");
  var vOS = getOperatingSystem();
  setOS(vOS);
  switch (vOS) {
    //case "MacOSX":
    case "Windows":
      //alert("Windows");
      var vSep = vSep;
      var vWinOS = vPathMain + vSep+ "WinOS"  + vSep;
      write2innerHTML("pandocCMD",vWinOS + "PanDoc_Win" + vSep + "pandoc.exe");
      write2innerHTML("imagemagickCMD",vWinOS + "ImageMagick_Win" + vSep + "convert.exe");
      write2innerHTML("wgetCMD",vWinOS + "wget_Win" + vSep + "bin"+ vSep + "wget.exe");
      write2innerHTML("gitCMD","git.exe");
      break;
    case "MacOSX":
      //alert("MacOSX");
      whichPath("pandoc","pandocCMD","/usr/local/bin/pandoc");
      whichPath("convert","imagemagickCMD","/usr/local/bin/convert");
      whichPath("wget","wgetCMD","/usr/local/bin/wget")
      whichPath("git","gitCMD","/usr/local/bin/git")
      break;
    case "Linux":
      //alert("Linux");
      whichPath("pandoc","pandocCMD");
      whichPath("convert","imagemagickCMD");
      whichPath("wget","wgetCMD");
      whichPath("git","gitCMD");
      break;
    default:

  }
}

function initLocalStorage() {

}
