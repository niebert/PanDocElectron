

function createImageSlide(pOutFile,pCount,pTemplate) {
  console.log("Create "+pCount+" AudioSlides for "+pOutFile);
  //alert("Create "+pCount+" AudioSlides for "+pOutFile);
  var i = 0;
  var vSep = getPathSeparator();
  //var vPathPrefix = "." + vSep + "images" + vSep + "img";
  var vOutSlides = "";
  var vPresentation = getFileContent (pTemplate);
  //var vSlideTPL     = getFileContent ('tpl/audioslides/defslide.html');
  var vDefSlide = 'defslide.html';
  if (isChecked("checkAudioPlayer")) {
    vDefSlide = "defslideplayer.html";
  };
  var vSlideTPL     = getFileContent (getMainDir()+vSep+'tpl'+vSep+'audioslides'+vSep+vDefSlide);
  //alert("after TPL and LOOP with getFileContent()");
  write2value("inputEDITOR",vPresentation);
  write2value("inputLOOP",vSlideTPL);
  //alert("write2value finished");
  var vCount = parseInt(pCount);
  while ((i<vCount) && (i < 200)) {
    vSlide = vSlideTPL;
    vSlide = replaceString(vSlide,"___NR___",i);
    //vSlide = replaceBG_COLOR(vSlide);
    //alert("vSlide="+vSlide);
    vOutSlides +=vSlide;
    i++;
  };
  //write2value("inputLOOP",vOutSlides);
  //Replace in vPresentation ___DZ_SLIDES___ with the vOutSlides);
  vPresentation = replaceSlides(vPresentation,vOutSlides);
  // Replace ___BG_COLOR___ and ___BG_COLOR_SLIDE___ tag in templates
  vPresentation = replaceBG_COLOR(vPresentation);
  write2value("outputEDITOR",vPresentation);
  saveFile(getInnerHTML("outputFILE"),vPresentation);
  alert("Convert "+pCount+" AudioSlides - Done:\nCopy your audio comments as MP3-File into folder '/audio' of your PanDoc Project!\n(e.g. audio0.mp3 for title slide, audio1.mp3 for slide 1,..." );
};

function replaceBG_COLOR(pContent) {
  var vColorBG = getValueDOM("colorBG");
  pContent = replaceString(pContent,"___BG_COLOR___",vColorBG);
  pContent = replaceString(pContent,"___BG_COLOR_SLIDE___",vColorBG);
  return pContent;
}

function insertAudioTags(pHash) {
  var vFilename = pHash["inputFILE"];
  if (pHash["inputFORMAT"] == "html") {
    console.log("Insert Audio-Tag - inputFORMAT='html'");
    //copyFile2Editor ("inputEDITOR",pHash["inputFILE"]);
    //copyFile2Editor ("outputEDITOR",pHash["inputFILE"]);
    fs.readFile(vFilename, 'utf-8', function (err, data) {
      write2value("inputEDITOR", data);
      data = replaceBG_COLOR(data);
      data = replaceAudioTag(data);
      console.log('Audio Tags in \''+vFilename+'\' inserted!');
      write2value("outputEDITOR", data);
      saveFile(pHash["outputFILE"],data);
    });
  } else {
    alert("ERROR: Insert Audio-Tags not possible for ["+vInFORMAT+"]");
  };
};

function replaceAudioTag(pContent) {
  if (fileTypeIsReveal(pContent)) {
    var vUseRecorder = confirm("Do you want to use the Audio Recorder in RevealJS?");
    pContent = convertReveal2AudioSlide(pContent,vUseRecorder);
    console.log("AUDIO='Reveal' Audioplayer to RevealJS");
  } else {
    pContent = convertDZ2AudioSlide(pContent);
    console.log("AUDIO='DZSlides' Audioplayer to non-Reveal presentation");
  };
  //write2value("outputEDITOR",pContent);
  return pContent;
};

function convertReveal2AudioSlide(pContent,pUseRecorder) {
  pContent = replaceString(pContent,"//__AUDIOPLAYER__//","");
  if (pUseRecorder) {
    pContent = replaceString(pContent,"//__AUDIORECORDER__//","");
  };
  var vStartPage=0;
  pContent = addAudioReveal(pContent,vStartPage);
  return pContent;
};

function addAudioReveal(pData,pStartPage) {
    var vSearch = /(<section[^>]+)>/gi;
    var vResult;
    var vCount = 0;
    var vTagInsert = "";
    while (vResult = vSearch.exec(pData)) {
          vTagInsert = " data-audio-src=\"audio/audio"+vCount+".mp3\" ";
          if (vCount >= pStartPage) {
            pData = replaceString(pData,vResult[1],vResult[1]+vTagInsert);
            console.log("Audio Tag "+vCount+" inserted: '"+vResult[1]+"'");
          };
          vCount++;
    };
    return pData;
};

function fileTypeIsReveal(pContent) {
  var vIsReveal = false;
  var vResult = pContent.match(/\/\/__AUDIOPLAYER__\/\//g);
  //var vMatches = 0;
  if(vResult) {
    //for(i=0;i<vResult .length;++i)
    //  console.log("fileTypeIsReveal() "+i+": "+vResult[i]);
    //  vMatches++;
    //};
    vIsReveal = true;
  };
  vResult = pContent.match(/\/\/__AUDIORECORDER__\/\//g);
  if(vResult) {
    vIsReveal = true;
  };
  vResult = pContent.match(/\/reveal\/css\/theme\//g);
  if(vResult) {
    vIsReveal = true;
  };
  return vIsReveal;
};

function convertDZ2AudioSlide(pData) {
  var vSearch = /(<section[^>]+>)/gi;
  var vResult;
  var vCount = 0;
  var vSep = getPathSeparator();
  var vAudioTag  = getFileContent (getMainDir()+vSep+'tpl'+vSep+'audioslides'+vSep+"defaudiotag.html");
  //alert(vPresentation.substr(0,300));
  var vDefSlide = "defslide.html";
  var vTagInsert = "";
  while (vResult = vSearch.exec(pData)) {
        vTagInsert = replaceString(vAudioTag,"___NR___",vCount);
        pData = replaceString(pData,vResult[1],vResult[1]+vTagInsert);
        console.log("Audio Tag "+vCount+" inserted: '"+vResult[1]+"'");
        vCount++;
  };
  return pData;
};

function copyDemoAudio(pHash) {
  console.log("Copy Demo Audio Files");
  var vSep = getPathSeparator();
  var vAudioDemo = getMainDir()+vSep+'tpl'+vSep+'audioslides'+vSep+"audiodefault.mp3";
  var vProjectDir = getPathFromFilename(pHash["inputFILE"]);
  var vAudioDir = vProjectDir + vSep +"audio" + vSep;
  if (!checkFileExists(vAudioDir+"audio0.mp3")) {
    copyFile(vAudioDemo,vAudioDir+"audio0.mp3");
    console.log("Copy audio0.mp3 to '"+vAudioDir+"'");
  } else {
    console.log("copyDemoAudio() - Audio File audio0.mp3 exists");
  };
};

function replaceSlides(pPresentation,pOutSlides) {
  var vOutSlides = pOutSlides || "Undefined Slides for DZ-Slides";
  var vPresentation =  pPresentation || "Undefined Main Template ___DZ_SLIDES___";
  var revealDIR = getRevealRelativeDIR();
  console.log("Reveal-Dir for  DZSlides for "+revealDIR);
  var mathjaxDIR = getMathJaxRelativeDIR();
  console.log("MathJax-Dir for  DZSlides for "+mathjaxDIR);
  vPresentation =  replaceString(vPresentation,"___DZ_SLIDES___",vOutSlides);
  vPresentation =  replaceString(vPresentation,"___REVEAL___",revealDIR);
  vPresentation =  replaceString(vPresentation,"___MATHJAX___",mathjaxDIR);
  vPresentation =  replaceString(vPresentation,"___THEME___",getValueDOM("themeREVEAL"));
  return vPresentation;
}

function createDZSlides(pOutFile,pTemplate) {
  console.log("Create DZSlides for "+pOutFile);
  //alert("pOutFile='"+pOutFile+"'");
  alert("Create DZSlides with Audio Comments for "+pOutFile);
  var i = 0;
  var vSep = getPathSeparator();
  var vPresentation = getFileContent (pTemplate);
  //alert(vPresentation.substr(0,300));
  var vDefSlide = "defslide.html";
  if (isChecked("checkAudioPlayer")) {
    vDefSlide = "defslideplayer.html";
    console.log("Use Template '"+vDefSlide+"' with Audio Player in Slides");
  } else {
    console.log("Audio Player is not visible");
  };
  var vSlideTPL     = getFileContent (getMainDir()+vSep+'tpl'+vSep+'dzslides'+vSep+vDefSlide);
  var vOutSlides    = getFileContent (pOutFile);
  //alert("vOutSlides:\n"+vOutSlides.substr(0,400));
  //alert("vSlideTPL:\n"+vSlideTPL);
  var vSlideArray = vOutSlides.split("</section>");
  //alert("after TPL and LOOP with getFileContent()");
  //write2value("inputEDITOR",vPresentation);
  write2value("inputLOOP",vSlideTPL);
  //alert("write2value finished");
  vOutSlides = vSlideArray[0];
  i = 1;
  while ((i<vSlideArray.length) && (i < 200)) {
    vSlide = vSlideTPL;
    vSlide = replaceString(vSlide,"___NR___",i);
    //alert("vSlide="+vSlide);
    vOutSlides +=vSlide + vSlideArray[i];
    i++;
  };
  //write2value("inputLOOP",vOutSlides);
  //write2value("inputLOOP",vOutSlides);
  vPresentation = replaceSlides(vPresentation,vOutSlides);
  write2value("outputEDITOR",vPresentation);
  saveFile(pOutFile,vPresentation);
  //saveFile("pOutFile.html",vPresentation);
  //saveTestFile();
  alert("Convert Finished:\nCopy your audio comments as MP3-File into folder '/audio' of your PanDoc Project!\n(e.g. audio0.mp3 for title slide, audio1.mp3 for slide 1,... (Software: e.g. Audacity)" );
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
    deleteAllImages(vPath,pCount);
    var vPathPlayer = vPath + "player";
    var i = 0;
    var vOutPNG = vPath +i+".png";
    var vOutPlayerPNG = vPathPlayer +i+".png";
    var vCount = parseInt(pCount);
    var vShowPlayer = false;
    if (isChecked("checkAudioPlayer")) {
      vShowPlayer = true;
      console.log("convertPDF2PNG() - Create Margins of PNG Slides for Audio Player");
    } else {
      console.log("convertPDF2PNG() - AudioPlayer hidden no margins necessary");
    };
    var vPDFstartpage = parseInt(getValueDOM("PDFstartpage")) || 0;
    alert("Remark: Converting PDF slide for file '"+getNameExt4Filename(pInputPDF)+"' from page " +vPDFstartpage + " to page "+(vPDFstartpage+vCount-1)+" could take up to "+pCount+" minutes!");
    console.log("convertPDF2PNG(pInputPDF,"+pCount+") with PDF startpage "+vPDFstartpage);
    var vIM_CMD = getCMD("imagemagickCMD");
    var vCMD = "";
    while ((i<vCount) && (i < 200)) {
      vOutPNG = vPath +i+".png";
      vOutPlayerPNG = vPathPlayer +i+".png";
      vPDFpage = i + vPDFstartpage;
      //vNode.value += ">";
      //setTimeout("document.getElementById('pandocprogress').value += 'o'",100);
      //alert("Create Image "+i+" from PDF");
      // convert -density 300 -depth 8 -quality 85 ${FilePDF}[${COUNTER}] outtmp.png
      //  "convert -size 3750x2812 xc:white input.png -gravity north -composite output.png".
      //deleteFile(vOutPNG);
      vCMD = vIM_CMD+" -density 300 -depth 8 -quality 85 "+pInputPDF+"["+vPDFpage+"] " + vOutPNG;
      pShellHash["executeable"] = vIM_CMD;
      pShellHash["paramarray"] = ["-density","300", "-depth","8", "-quality","85", pInputPDF+"["+i+"]", vOutPNG];
      //alert(vCMD);
      runShellCommand(vCMD,pShellHash);
      i++;
    };
    alert("Generating "+pCount+" PNG Files from PDF done!");
  }
}
