function convertFile() {
  var vHash = {};
  if (vHashTPL) {
    console.log("vHashTPL exists!");
  } else {
    console.log("Error: vHashTPL does not exist");
  }
  if (convertChecker(vHash,vHashTPL)) {
    saveTitleAuthor();
    //alert("saveTitleAuthor() finished");
    runPandocShell(vHash);
  };
};
function runPandocShell(pHash) {
  var vID = ["inputFORMAT","inputFILE","outputFILE","bibFILE","cslFILE","mathjaxDIR","revealDIR"];
  for (var i=0;i<vID.length;i++) {
    pHash[vID[i]] = getValueDOM(vID[i]);
  };
  pHash["inputDIR"] = getPath4Filename(getInnerHTML("inputFILE"));

  //alert("runPandocShell(pHash) now execute "+pHash["inputFILE"]);
  executePanDocCMD(pHash);
};

function initShellScript(pHash) {
  var vPath = getPath4Filename(pHash["inputFILE"]);
  pHash['filename'] = vPath + "/callpandoc.sh";
  pHash['commands'] = "#!/bin/sh";
  pHash['done'] = "0";
  if (getOperatingSystem() == "Windows") {
    pHash['filename'] = vPath + "\\callpandoc.bat";
    pHash['commands'] = "@echo off\necho 'PanDoc Command Batch File'";
  };
};

function saveShellScript(pShellHash) {
  //get ProjectPath if the path is defined
  var vFileName = pShellHash["filename"];
  //save script to filename in pShellHash
  saveFile(vFileName,pShellHash["commands"]);
  alert("PanDoc-Script: "+vFilename+" saved");
};

function executePanDocCMD(pHash) {
  initShellScript(pHash);
  var vShellHash = pHash;
  var vPandoc_CMD = getValueDOM("pandocCMD");
  var vInFORMAT  = pHash["inputFORMAT"];
  var vOutFORMAT = pHash["outputFORMAT"];
  var vPanOutFORMAT = pHash["pandocOUTFORMAT"];
  var vInputFilter = "";
  var vAdditionParams = "";
  if (document.getElementById("inputFILTERUSE").checked) {
    vInputFilter = document.getElementById("inputFILTER").value;
  };
  if (document.getElementById("inputPARAMSUSE").checked) {
    vAdditionParams = " "+document.getElementById("inputPARAMS").value+" ";
  };
  var vCMD_pre = vPandoc_CMD+" -f "+vInFORMAT+vInputFilter;
  var vCMD = vPandoc_CMD+" -f "+vInFORMAT+vInputFilter+" -t "+vPanOutFORMAT;
  var vCMD_post = " " + vAdditionParams;
  vCMD_post += " "+pHash["inputFILE"]+" -o "+pHash["outputFILE"];
  vCMD_post += getBibCMD(pHash);
  vCMD_post += getTitleAuthorCMD(pHash);
  vCMD += vCMD_post;
  switch (vOutFORMAT) {
    case "audioslides":
      //-----CONVERT AUDIOSLIDES-------
      var vCount = getValueDOM("slidecount")
      var vInputPDF = getInnerHTML("inputFILE");
      if (vInFORMAT == "pdf") {
        //alert("Input Format is PDF ");
        convertPDF2PNG(vInputPDF,vCount,vShellHash);
      } else {
        var vMSG = "No PDF-Input:\n Please copy your slides into folder '/images' of your project";
        vMSG += "\n(e.g. img0.png for title slide img1.png for first slide,...)";
        vMSG += "\nIf you select 16 Slides, title slide is 'img0.png' and last image is 'img15.png'.";
        vMSG += "\nYou can use LibreOffice HTML-Export into '/images' to create the files 'img0.png',...";
        alert(vMSG);
      };
      createImageSlide(pHash["outputFILE"],vCount,pHash["template"]);
    break;
    case "latex":
      runShellCommand(vCMD);
      console.log(vCMD);
      alert("PanDoc Processing for Format '"+vOutFORMAT+"' done!");
    break;
    case "html":
      var vProjectDir = getPathFromFilename(pHash["inputFILE"]);
      var vSep = getPathSeparator();
      copyFile(pHash["reference"],vProjectDir+vSep+"pandoc.css");
      vCMD += " -s -S --toc  -c pandoc.css";
      runShellCommand(vCMD,vShellHash);
      console.log(vCMD);
      alert("PanDoc Processing for Format '"+vOutFORMAT+"' done!");
    break;
    case "odt":
       vCMD += " -S --reference-odt "+pHash["reference"];
       //vCMD += " --template=\""+pHash["template"]+"\"";
       runShellCommand(vCMD,vShellHash);
       console.log(vCMD);
       alert("PanDoc Processing for Format '"+vOutFORMAT+"' done!");
     break;
     case "pdf":
        vCMD = vCMD_pre + " --latex-engine=xelatex " + vCMD_post;
        //vCMD += " --template=\""+pHash["template"]+"\"";
        runShellCommand(vCMD,vShellHash);
        console.log(vCMD);
        alert("PanDoc Processing for Format '"+vOutFORMAT+"' done!");
      break;
     case "odt2col":
      vCMD += " -S --reference-odt "+pHash["reference"]
      //vCMD += " --template=\""+pHash["template"]+"\"";
      runShellCommand(vCMD,vShellHash);
      console.log(vCMD);
      alert("PanDoc Processing for Format '"+vOutFORMAT+"' done!");
    break;
    case "docx":
      vCMD += " -S --reference-docx "+pHash["reference"];
      //vCMD += " --template=\""+pHash["template"]+"\"";
      runShellCommand(vCMD,vShellHash);
      console.log(vCMD);
      alert("PanDoc Processing for Format '"+vOutFORMAT+"' done!");
    break;
    case "docx2col":
      vCMD += " -S --reference-docx "+pHash["reference"];
      //vCMD += " --template=\""+pHash["template"]+"\"";
      runShellCommand(vCMD,vShellHash);
      console.log(vCMD);
      alert("PanDoc Processing for Format '"+vOutFORMAT+"' done!");
    break;
    case "reveal":
        //variable revealjs-url="../../reveal" mathjax-url="../../mathjax"
      vCMD += getRevealCMD(pHash);
      console.log("getRevealCMD() finished");
      vCMD += " --standalone --section-divs";
      vCMD += " --template=\""+pHash["template"]+"\"";
      //saveFile()
      console.log("Start PanDoc REVEAL");
      runShellCommand(vCMD,vShellHash);
      console.log(vCMD);
      //var vOutContent = getFileContent(pHash["outputFILE"]);
      //vOutContent = replaceString(vOutContent,"___REVEAL___",pHash["revealCMD"]);
      //vOutContent = replaceString(vOutContent,"___MATHJAX___",pHash["mathjaxCMD"]);
      //saveFile(pHash["outputFILE"],vOutContent);
      //copyFile2Editor("outputEDITOR",pHash["outputFILE"]);
      //write2value("outputEDITOR",vOutContent);
      alert("PanDoc Processing for Format '"+vOutFORMAT+"' done!");
        break;
    default:
      // perform default task
      runShellCommand(vCMD,vShellHash);
      console.log(vCMD);
      alert("PanDoc Processing for Format '"+vOutFORMAT+"' done!");
      //alert("Perform PanDoc Default")
      //alert("pandoc -f "+vInFORMAT+" -t "+vPanOutFORMAT);
  };
  saveShellScript(vShellHash);
};

function getTitleAuthorCMD(pHash) {
  var vReturn = "";
  var vTitle = getValueDOM("outputTITLE");
  //vTitle = replaceString(vTitle,"\"","''");
  console.log("vTitle='"+vTitle+"'");
  var vAuthor = getValueDOM("outputAUTHOR");
  console.log("vAuthor='"+vAuthor+"'");
  //vAuthor = replaceString(vAuthor,"\"","''");
  if (vTitle != "") {
    vReturn += "  --variable title=\""+vTitle+"\"";
  };
  if (vAuthor != "") {
    vReturn += "  --variable author=\""+vAuthor+"\"";
  }
  return vReturn;
};

function getMathJaxCMD(pHash) {
  //var vReturn = "";
  var mathjaxDIR = pHash["mathjaxDIR"];
  var vInputDir = pHash["inputDIR"];
  if (mathjaxDIR != "") {
    mathjaxDIR = getRelativePath(vInputDir,mathjaxDIR);
  } else {
    mathjaxDIR = "http://cdn.mathjax.org/mathjax/latest";
  };
  pHash["mathjaxCMD"] = mathjaxDIR;
  //vReturn += "  --variable mathjax-url= "+mathjaxDIR;
  return "  --mathjax  --variable mathjaxpath=\""+mathjaxDIR+"\"";
  //return "  --mathjax";
};

function getRevealCMD(pHash) {
  var vReturn = getMathJaxCMD(pHash);
  var revealDIR = pHash["revealDIR"];
  var vInputDir = pHash["inputDIR"];
  if (revealDIR != "") {
    revealDIR = getRelativePath(vInputDir,revealDIR);
  } else {
    revealDIR = "http://lab.hakim.se/reveal-js";
  };
  vReturn += "  --variable revealpath="+revealDIR;
  vReturn += "  --variable theme="+getValueDOM("themeREVEAL");
  pHash["revealCMD"] = revealDIR;
  return vReturn;
};

function getBibCMD(pHash) {
  var bibFILE = pHash["bibFILE"];
  var cslFILE = pHash["cslFILE"];
  var vInputDir = pHash["inputDIR"];
  var vReturn = "";
  var vBibExist
  if (bibFILE != "") {
    if (pHash["outputFORMAT"] == "latex") {
      vReturn += " --natbib"
    };
    bibFILE = getRelativePath(vInputDir,bibFILE);
    vReturn += "  --bibliography  "+bibFILE;
    if (cslFILE != "") {
      cslFILE = getRelativePath(vInputDir,cslFILE);
      vReturn += "  --csl "+cslFILE;
    };
  } else {
    if (cslFILE != "") {
      alert("WARNING: CSL Citation Style File defined without defining a BibTeX-File.\nCSL-File is ignored!");
    };
  };
  //alert("getBibCMD(pHash)="+vReturn);
  return vReturn;
}

function convertChecker(pHash,pHashTPL) {
  var vReturn = true;
  //alert("check input set, convertChecker()  pre command exec");
  var vInputFile = getInnerHTML("inputFILE");
  if (!vInputFile) {
    vReturn = false;
    alert("ERROR: PanDoc Input File was not defined!\n    convertChecker():656");
  } else if (vInputFile == "") {
    vReturn = false;
    alert("Error: Input File was not defined!\nCall: convertChecker():659");
  } else {
    pHash["inputFILE"] = vInputFile;
    var vExt = getExtensionOfFilename(vInputFile);
    pHash["Extension"] = vExt;
    vInputFormat = getValueDOM("inputFORMAT");
    pHash["inputFORMAT"] = vInputFormat;
    //alert("Check Format with Extension="+vExt+" inputFORMAT="+pHash["inputFORMAT"]);
    if (vExt !== vExtHash[vInputFormat]) {
      vReturn = confirm("Please check, if input Format ''"+pHash["inputFORMAT"]+"' is correct'!");
    };
    var vOutFormat = getValueDOM("outputFORMAT")
    pHash["outputFORMAT"] = vOutFormat;
    if (pHashTPL[vOutFormat+"TPL"]) {
      pHash["template"] = pHashTPL[vOutFormat+"TPL"]
    } else  {
      var vSep = getPathSeparator();
      pHash["template"] = "." + vSep+ "tpl"+vSep+"pandoctemplates"+vSep+"default."+vOutFormat;
    };
    console.log("Template: "+pHash["template"]);
    setPandocOutFormat(pHash,pHashTPL);
  };
  console.log("convertChecker() inputFORMAT="+pHash["inputFORMAT"]);
  return vReturn;
}

function setPandocOutFormat(pHash,pHashTPL) {
  var vOutFormat = pHash["outputFORMAT"]
  switch (vOutFormat) {
    case "html":
      pHash["pandocOUTFORMAT"]=vOutFormat;
      pHash["reference"] = pHashTPL[vOutFormat+"REF"];
    break;
    case "odt":
      pHash["pandocOUTFORMAT"]=vOutFormat;
      pHash["reference"] = pHashTPL[vOutFormat+"REF"];
    break;
    case "odt2col":
      pHash["pandocOUTFORMAT"]="odt";
      pHash["reference"] = pHashTPL[vOutFormat+"REF"];
    break;
    case "docx":
      pHash["pandocOUTFORMAT"]=vOutFormat;
      pHash["reference"] = pHashTPL[vOutFormat+"REF"];
    break;
    case "docx2col":
      pHash["pandocOUTFORMAT"]="docx";
      pHash["reference"] = pHashTPL[vOutFormat+"REF"];
    break;
    case "dzslides":
      pHash["pandocOUTFORMAT"]=vOutFormat;
      pHash["reference"] = pHashTPL[vOutFormat+"REF"];
    break;
    case "reveal":
      //pHash["pandocOUTFORMAT"]="revealjs";
      // OutFormat must be html5 otherwise the wrong template will be used
      pHash["pandocOUTFORMAT"]="html5";
    break;
    default:
      //pHash["referenceODT"] = "";
      //pHash["referenceODT"] = "";
      pHash["pandocOUTFORMAT"] = vOutFormat;
  };
}

function createImageSlide(pOutFile,pCount,pTemplate) {
  console.log("Create "+pCount+" AudioSlides for "+pOutFile);
  alert("Create "+pCount+" AudioSlides for "+pOutFile);
  var i = 0;
  var vSep = getPathSeparator();
  var vPathPrefix = "." + vSep + "images" + vSep + "img";
  var vOutSlides = "";
  var vPresentation = getFileContent (pTemplate);
  var vSlideTPL     = getFileContent ('./tpl/audioslides/defslide.html');
  //alert("after TPL and LOOP with getFileContent()");
  write2value("inputEDITOR",vPresentation);
  write2value("inputLOOP",vSlideTPL);
  //alert("write2value finished");
  var vCount = parseInt(pCount);
  while ((i<vCount) && (i < 200)) {
    vSlide = vSlideTPL;
    vSlide = replaceString(vSlide,"___NR___",i);
    //alert("vSlide="+vSlide);
    vOutSlides +=vSlide;
    i++;
  };
  //write2value("inputLOOP",vOutSlides);
  vPresentation =  replaceString(vPresentation,"___DZ_SLIDES___",vOutSlides);
  write2value("inputEDITOR",vPresentation);
  saveFile(getInnerHTML("outputFILE"),vPresentation);
  alert("Convert Finished:\nCopy your audio comments as MP3-File into folder '/audio' of your PanDoc Project!\n(e.g. audio0.mp3 for title slide, audio1.mp3 for slide 1,..." );
};
function convertPDF2PNG(pInputPDF,pCount,pShellHash) {
  var vExt = getExtensionOfFilename(pInputPDF);
  vExt = vExt.toUpperCase();
  if (vExt != "PDF") {
    alert("WARNING: Input file is not an PDF document!");
  } else {
    var vPath = getPathFromFilename(pInputPDF);
    var vSep = getPathSeparator();
    vPath += vSep + "images" + vSep + "img";
    var i = 0;
    var vOutPNG = vPath +i+".png";
    alert("Remark: Converting all slides could take up to "+pCount+" minutes!");
    console.log("convertPDF2PNG(pInputPDF,"+pCount+")");
    var vIM_CMD = getValueDOM("imagemagickCMD");
    var vCount = parseInt(pCount);
    while ((i<vCount) && (i < 200)) {
      vOutPNG = vPath +i+".png";
      i++;
      //vNode.value += ">";
      //setTimeout("document.getElementById('pandocprogress').value += 'o'",100);
      //alert("Create Image "+i+" from PDF");
      // convert -density 300 -depth 8 -quality 85 ${FilePDF}[${COUNTER}] outtmp.png
      var vCMD = vIM_CMD+" -density 300 -depth 8 -quality 85 "+pInputPDF+"["+i+"] " + vOutPNG;
      //alert(vCMD);
      runShellCommand(vCMD,pShellHash);
    };
    alert("Generating "+pCount+" PNG Files from PDF done!");
  }
}
// The following hash defines the extension for the Output Format
