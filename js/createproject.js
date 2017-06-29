function startWizzard() {
  console.log("START: "+vWizzard);
  // and load the docwizzard.html of the app.
  var vSep = getPathSeparator(); // is on Linux/Mac "/" on Windows "Backslash"
  //var vPathMain = app.getPath('documents')+vSep+"PanDoc"+vSep+"tpl"+vSep+"DOCwizzard"+vSep;
  var vPathMain = `file://${__dirname}/docwizzard/`;
  var vWizzard = vPathMain + "docwizzard.html";
  vWizzard += "?inputFILE="+getInnerHTML("inputFILE");
  vWizzard += "&bibFILE="+getInnerHTML("bibFILE");
  vWizzard += "&cslFILE="+getInnerHTML("cslFILE");
  window.open(vWizzard,"_blank","_blank", "width=1000,height=700"); //1048, height: 720
};

function downloadInputFile(pDownloadType) {
  if (pDownloadType == "projects") {
    downloadWikiInput();
  } else {
    downloadWebInput();
  }
};

function setWikiDomain(pDomain) {
  //vLanguage="en" pDomain=".wikipedia.org"
  var vLanguage = getValueDOM("sWikiLanguage");
  setWikiURL(vLanguage,pDomain);
};

function setWikiLanguage(pLanguage) {
  //pLanguage="en" vDomain=".wikipedia.org"
  var vDomain = getValueDOM("sWikiDomain");
  setWikiURL(pLanguage,vDomain);
};

function setWikiURL(pLanguage,pDomain) {
  write2value("inputSERVER",pLanguage+pDomain)
};

function downloadWikiInput() {
  // This is the main function called, when user presses
  // the download Button "Wiki-Download"
  var vSep = getPathSeparator();
  var vProjectDir = getProjectDir(getValueDOM("inputWEBPROJECT"));
  setInputFormat("mediawiki");
  setOutputFormat();
  var bot = require('nodemw');

  // pass configuration object
  var client = new bot({
      server: getValueDOM('inputSERVER'),  // 'en.wikipedia.org' host name of MediaWiki-powered site
      path: getValueDOM('pathAPI'),        // '/w',  path to api.php script
      debug: false                        // is more verbose when set to true
    });
    client.getArticle(getValueDOM('wikiARTICLE'), function(err, data) {
      // error handling
      if (err) {
        console.error(err);
        return;
      };
      if (data) {
        makeProjectDirs(vProjectDir); //audio, video, config, images
        makedirpath(vProjectDir);
        var vPath = getProjectDir(getValueDOM("inputWEBPROJECT"));
        var vFileBase = getValueDOM('wikiARTICLE');
        vFileBase = filenameCorrection(vFileBase);
        var vFilename = vFileBase + ".wiki";
        var vFileSource =  vFileBase + "_source.wiki";
        var vFileJSON = vPath + vSep + "config" + vSep + vFileBase + "_wiki.json"
        var vInputFile = vPath + vSep + vFilename;
        write2innerHTML("inputFILE",vInputFile);
        var vOutFile = createOutputFile(vInputFile,getValueDOM("outputFORMAT"));
        write2innerHTML("outputFILE",vOutFile);
        //save Source File of Wiki
        saveFile(vPath + vSep + vFileSource,data);
        // convert the media links in the Wiki Source
        var vWikiJSON = {};
        vWikiJSON["url"] = getValueDOM('inputSERVER')+"/wiki/"+getValueDOM('wikiARTICLE');
        var now = new Date();
        vWikiJSON["date"] = now.toJSON();
        data = convertWiki2Local(data,vWikiJSON);
        data = replaceWikiMath(data);
        saveJSON(vFileJSON,vWikiJSON);
        write2value("inputEDITOR",data);
        console.log("Write Wiki Content of '"+getValueDOM('wikiARTICLE')+"' to Path '"+vPath+"'");
        saveFile(vInputFile,data);
        alert("Wiki Article from '"+getValueDOM('wikiARTICLE')+"' downloaded from http://"+getValueDOM('inputSERVER')+getValueDOM('pathAPI'));
      } else {
        alert("DOWNLOAD WARNING: Wiki Article from '"+getValueDOM('wikiARTICLE')+"' could not be downloaded from http://"+getValueDOM('inputSERVER')+getValueDOM('pathAPI'));
      };

    });
};

function convertWiki2Local(pContent,pWikiJSON) {
  var vMediaArray = parseWiki4Media(pContent);
  createMediaWikiJSON(vMediaArray,pWikiJSON);
  downloadWikiMedia(vMediaArray);
  pContent = convertMediaLink4Wiki(pContent,vMediaArray);
  pContent = replaceWikiLinks(pContent,pWikiJSON);
  return pContent;
};

function createMediaWikiJSON(pMediaArray,pWikiJSON) {
  var vMediaFile = "";
  var vSubDir = "";
  var vLocalID = "";
  checkWikiJSON(pWikiJSON,"media")
  for (var i = 0; i < pMediaArray.length; i++) {
    vSubDir = getMediaSubDir(pMediaArray[i]);
    vMediaFile = convertWikiMedia2File(pMediaArray[i]);
    vLocalID = vSubDir + "/" + vMediaFile
    //pWikiJSON[vMediaArray[i]] = vLocalID;
    pWikiJSON["media"][vLocalID] = pMediaArray[i];
  };
};

function convertWiki2Online(pContent) {
  var vMediaArray = parseWiki4Media(pContent);
  downloadWikiMedia(vMediaArray);
  pContent = convertMediaLink4WikiOnline(pContent,vMediaArray);
  pContent = replaceWikiLinks(pContent);
  return pContent;
};

function downloadWikiMedia (pMediaArray) {
  var vProjectDir = getProjectDir(getValueDOM("inputWEBPROJECT"));
  var vMediaURL = getValueDOM("inputMEDIA");
  for (var i = 0; i < pMediaArray.length; i++) {
    checkMediaFile(vProjectDir,vMediaURL+pMediaArray[i],pMediaArray[i]);
  };
  createdDownloadMediaDIV(pMediaArray,vMediaURL);
  createdDownloadMediaFile(pMediaArray,vMediaURL,vProjectDir);
};


function filenameCorrection(pFilename) {
  pFilename = replaceString(pFilename,"-","_");
  pFilename = pFilename.replace(/Ä/g,"Ae");
  pFilename = pFilename.replace(/Ö/g,"Oe");
  pFilename = pFilename.replace(/Ü/g,"Ue");
  pFilename = pFilename.replace(/ä/g,"ae");
  pFilename = pFilename.replace(/ö/g,"oe");
  pFilename = pFilename.replace(/ü/g,"ue");
  pFilename = pFilename.replace(/ß/g,"ss");
  pFilename = pFilename.replace(/[^A-Za-z\/0-9_\.]/g,"_");
  pFilename = pFilename.replace(/_[_]+/g,"_");
  pFilename = pFilename.replace(/[_]+\./g,".");
  return pFilename;
};

function parseWiki4Media(pWikiText) {
  var vMediaArray = [];
  //var vSearch = /\[(File|Datei|Image):([^\|]*)/;
  var vSearch = /\[(?:File|Image|Datei):([^\|\]]+)/g;
  // \[            # "["
  // (?:            # non-capturing group
  //  File|Image|Datei        #   "File" or "Image" or "Datei"
  // )              # end non-capturing group
  //:             # ":"
  //(              # group 1
  //  [^\|]+      #   any character except "|" or "]" at least once
  // )              # end group 1 - this will be the image's name
  var vResult;
  var vCount =0;
  while (vResult = vSearch.exec(pWikiText)) {
    vCount++;
    vMediaArray.push(vResult[1]);
    console.log("Media "+vCount+": '" + vResult[1] + "' found");
  };
  return vMediaArray;
};

function checkWikiJSON(pWikiJSON,pHashID) {
  if (pWikiJSON[pHashID]) {
    console.log("WikiJSON['"+pHashID+"']  exists!");
  } else {
    pWikiJSON[pHashID] = {};
  };
};

function replaceWikiLinks(pWikiText,pWikiJSON) {
  var vLinkArray = getWikiLinks(pWikiText);
  var vURL,Title,vLink,vLocalLink;
  var vPipePos = 0;
  checkWikiJSON(pWikiJSON,"links");
  for (var i = 0; i < vLinkArray.length; i++) {
    vLink = vLinkArray[i];
    vPipePos = vLink.indexOf("|");
    if (vPipePos>0) {
      vURL = vLink.substr(0,vPipePos);
      vTitle = vLink.substr(vPipePos+1,vLink.length);
    } else {
      vURL = vLink;
      vTitle = vLink;
    };
    vURL = getWikiDisplayURL(vURL);
    vLocalLink = vURL+" "+vTitle;
    pWikiText = replaceString(pWikiText,"[["+vLink+"]]","["+vLocalLink+"]");
    // for reverse replacement to online Wikipedia or Wikiversity store replacement in WikiJSON
    pWikiJSON["links"][vLocalLink] = "["+vLink+"]";
  };
  return pWikiText
};

function replaceWikiMath(pWikiText) {
  pWikiText = pWikiText.replace(/\\R /g,"\\mathbb R ");
  pWikiText = pWikiText.replace(/\\R</g,"\\mathbb R<");
  pWikiText = pWikiText.replace(/\\R\s/g,"\\mathbb R ");
  //pWikiText = replaceString(pWikiText,'\\','\mathbb R \\');
  return pWikiText;
};

function getLinks2SquareBrackets(pWikiText) {
  // Wiki Links are enclosed with double square brackets [[link]]
  // Type of enclose Links
  // (1) [[Linear Algebra]] internal Wiki Link (Default)
  // (2) [[Linear Algebra|Definition of Linear Algebra]] [[link|linktext]]
  // (3) [[File:filename.ext]] Media File Video, Image, Audio - File|Datei|Image

  var vLinkArray = [];
  var vSearch = /\[\[([^\]]+)\]\]/g;
  // \[\[         # "[["
  //(             # group 1
  //  [^\[]+    #   any character except the closing square bracket "]"
  // )            # end group 1 - this will be the image's name
  // \]\]         # "]]"
  var vResult;
  var vCount =0;
  while (vResult = vSearch.exec(pWikiText)) {
    vCount++;
    vLinkArray.push(vResult[1]);
    console.log("Wiki-Double Square Bracket Link "+vCount+": '[[" + vResult[1] + "]]' found");
  };
  return vLinkArray;
};

function extractLinkArray2MediaLink(pLinkArray) {
  var vMediaArray = [];
  var vLink  = "";
  var vResult;
  for (var i = 0; i < pLinkArray.length; i++) {
    vLink  = pLinkArray[i];
    vSearch = /(File|Datei|Image):([^\|]*)/;
    vResult = vSearch.exec(vLink);
    if(vResult == true) {
      vMediaArray.push(vLink);
      console.log("MediaLink '" + vMediaLink + "'");
    };
  };
  return vMediaArray;
}

function getWikiLinks(pWikiText) {
  // Wiki Links are open with ""
  var vLinkArray = [];
  //var vSearch = /\[(File|Datei|Image):([^\|]*)/;
  var vSearch = /\[\[([^\[\]\:]+)\]\]/g;
  // \[\[         # "[["
  //(             # group 1
  //  [^\[\]]+    #   any character except "[" and "]" ":" at least once
  // )            # end group 1 - this will be the image's name
  // \]\]         # "]]"
  var vResult;
  var vCount =0;
  while (vResult = vSearch.exec(pWikiText)) {
    vCount++;
    vLinkArray.push(vResult[1]);
    console.log("Wiki-Link "+vCount+": '" + vResult[1] + "' found");
  };
  return vLinkArray;
}

function convertMediaLink4Wiki(pWikiText,pMediaArray) {
  var vReplaceLink;
  var vMediaFile;
  var vSubDir;

  pWikiText = pWikiText.replace(/\[(File|Image|Datei):/gi,"[File:");

  for (var i = 0; i < pMediaArray.length; i++) {
    vSubDir = getMediaSubDir(pMediaArray[i]);
    vMediaFile = convertWikiMedia2File(pMediaArray[i]);
    vReplaceLink = vSubDir + "/" + vMediaFile;
    pWikiText = replaceString(pWikiText,"File:"+pMediaArray[i],"File:"+vReplaceLink);
  };
  return pWikiText;
};

function convertMediaLink4WikiOnline(pWikiText,pMediaArray) {
  var vReplaceLink;
  var vMediaFile;
  var vPathArray;

  pWikiText = pWikiText.replace(/\[(File|Image|Datei):/gi,"[File:");

  for (var i = 0; i < pMediaArray.length; i++) {
    vPathArray = (pMediaArray[i]).split("/");
    vMediaFile = vPathArray[vPathArray.length-1];
    var vFileSplit = vMediaFile.split("|");
    vMediaFile = vFileSplit[0];
    vReplaceLink = vMediaFile + "|mini|" + vMediaFile;
    pWikiText = replaceString(pWikiText,"File:"+pMediaArray[i],"File:"+vReplaceLink);
  };
  return pWikiText;
};

function getWikiDisplayURL(pArticle) {
  var vArticle = pArticle || getValueDOM('wikiARTICLE')
  vArticle = replaceString(vArticle," ","_");
  return "https://"+getValueDOM('inputSERVER')+"/wiki/"+vArticle;
}

function createdDownloadMediaDIV(pMediaArray,pMediaURL) {
  var vURL=getWikiDisplayURL();
  var vDownloaded = "<hr><b>Download Media Files for URL: <a href='#' onclick=\"openFileInBrowser('"+vURL+"')\">"+vURL+"</a></b>";
  vDownloaded +="\n<ul>";
  // https://en.wikipedia.org/wiki/My_article#/media/File:My_image.jpg
  for (var i = 0; i < pMediaArray.length; i++) {
    //vDownloaded +="\n("+(i+1)+") "+pMediaArray[i];
    vDownloaded +="\n  <li>";
    vDownloaded += "("+(i+1)+") <a href='#' onclick=\"openFileInBrowser('"+pMediaURL+pMediaArray[i]+"')\">"+pMediaArray[i]+"</a>";
    vDownloaded +="\n  </li>";
  };
  vDownloaded +="\n</ul><hr>";
  write2innerHTML("divMediaWikiDOWNLOAD",vDownloaded);
};

function createdDownloadMediaFile(pMediaArray,pMediaURL) {
  var vURL=getWikiDisplayURL();
  var vDownloaded = "<b>Download Media Files for URL: <a href='"+vURL+"' target='_blank'>"+vURL+"</a></b>";
  var pMediaURL = getValueDOM("inputMEDIA");
  vDownloaded +="\n<ul>";
  // https://en.wikipedia.org/wiki/My_article#/media/File:My_image.jpg
  var vProjectDir = getProjectDir(getValueDOM("inputWEBPROJECT"));
  for (var i = 0; i < pMediaArray.length; i++) {
    //vDownloaded +="\n("+(i+1)+") "+pMediaArray[i];
    vDownloaded +="\n  <li>";
    vDownloaded += "("+(i+1)+") <a href='"+pMediaURL+pMediaArray[i]+"' target='_blank'>"+pMediaArray[i]+"</a>";
    vDownloaded += " Local File: "+getMediaSubDir(pMediaArray[i])+"/"+filenameCorrection(pMediaArray[i]);
    vDownloaded +="\n  </li>";
  };
  vDownloaded +="\n</ul>";
  vDownloaded = wrapperHTML(vDownloaded);
  var vProjectDir = getProjectDir(getValueDOM("inputWEBPROJECT"));
  saveLogWiki(vProjectDir,vDownloaded);
};

function splitURL(pURL) {
  var vHash = {};
  var vArrURL = pURL.split('://');
  vHash["url"] = pURL;
  vHash["protocol"] = vArrURL[0];
  var vSlashPos = vArrURL[1].indexOf("/");
  if (vSlashPos >0) {
    vHash["server"] =  vArrURL[1].substr(0,vSlashPos-1);
    vHash["path"] = vArrURL[1].substr(vSlashPos,vArrURL[1].length);
  } else {
    vHash["server"] =  vArrURL[1];
    vHash["path"] = "";
  };
  return vHash;
};

function wrapperHTML(pContent) {
  var vOut = "<html><head><title>Download Wiki Media</title></head><body>";
  vOut += pContent;
  vOut += "</hr>Download the media files for article. If list is empty, Wiki-Article contains no media files";
  vOut += "</body></html>";
  return vOut;
};

function checkMediaFile(pProjectDir,pMediaFullURL,pMediaLink) {
};

function X_checkMediaFile(pProjectDir,pMediaFullURL,pMediaLink) {
  //var vWebpageMedia = getContentHTTPS(pMediaFullURL);
  var vSep = getPathSeparator();
  var vHashURL = splitURL(pMediaFullURL);
  var vDownloadPage = "";
  if (vHashURL["protocol"] == "https") {
    vDownloadPage = getContentHTTPS(vHashURL);
  } else {
    vDownloadPage = getContentHTTP(vHashURL);
  };
  //saveFile(pProjectDir+vSep+pMediaLink,vDownloadPage);
  var vURL = extractDownloadURL(vDownloadPage);
  if (vURL != "") {
    downloadMedia(pProjectDir,vURL,pMediaLink)
  }
};

function extractDownloadURL(pDownloadPage) {
  var vURL = "";
  var vSearch = /(?:<div class="fullMedia"><a href=")([^"]+)/g;
  // \[            # "["
  // (?:            # non-capturing group
  //  <div class="fullMedia"><a href="       #   prefix link
  // )              # end non-capturing group
  //(              # group 1
  //  [^"]+      #   any character except """ at least once
  // )              # end group 1 - this will be the image's name
  var vResult = vSearch.exec(pDownloadPage);
  if (vResult && vResult.length > 0) {
    vURL = vResult[1];
  };
  console.log("extractDownloadURL()='"+vURL+"'");
  return vURL;
}

function getContentHTTP(pHashURL) {
  var http = require('http');
  var vOut = "";
  http.get(pHashURL['url'], function(res) {
    console.log("Got HTTP response: " + res.statusCode);
    var bodyarr = [];

    res.on('data', function(chunk){
      bodyarr.push(chunk);
    });
    res.on('end', function(){
      vOut += bodyarr.join('').toString();
    });
  }).on('error', function(e) {
    console.log("Got error: " + e.message);
  });
  return vOut;
};

function getContentHTTPS(pHashURL) {
  var https = require('https');
  var vOut = "";
  https.get(pHashURL['url'], function(res) {
    console.log("Got HTTPS response: " + res.statusCode);
    var bodyarr = [];

    res.on('data', function(chunk){
      bodyarr.push(chunk);
    });
    res.on('end', function(){
      vOut += bodyarr.join('').toString();
    });
  }).on('error', function(e) {
    console.log("Got error: " + e.message);
  });
  console.log(vOut);
  return vOut;
}

function downloadMedia(pProjectDir,pURL,pMediaLink) {
  var vMediaLink = convertWikiMedia2URL(pMediaLink);
  var vMediaFile = convertWikiMedia2File(pMediaLink);
  var vSep = getPathSeparator();
  var vWGET_File  = pURL + "/" +vMediaLink;
  var vSubDir = getMediaSubDir(vMediaLink);
  var vWGET_CMD = getCMD("wgetCMD");
  runShellCommand(vWGET_CMD + " -O " + pProjectDir + vSep + vSubDir + vSep + vMediaFile+" "+vWGET_File);
}

function getMediaSubDir(pMediaLink) {
  var vExt = getExtensionOfFilename(pMediaLink);
  var vSubDir ="images"
  switch (vExt) {
    case "mp3":
        vSubDir = "audio"
    break;
    case "mid":
        vSubDir = "audio"
    break;
    case "ogg":
        vSubDir = "video"
    break;
    case "webm":
        vSubDir = "video"
    break;
    default:
        vSubDir = "images"
  };
  return vSubDir;
}

function saveLogWiki(pProjectDir, pDownloaded) {
  var vSep = getPathSeparator();
  var vLogFile = pProjectDir + vSep + getLogFilename();
  saveFile(vLogFile,pDownloaded);
};

function getLogFilename() {
  return "download_"+getValueDOM('wikiARTICLE')+".html";
};

function convertWikiMedia2File(pMediaLink) {
  pMediaLink = convertWikiMedia2URL(pMediaLink);
  pMediaLink = pMediaLink.replace(/[^A-Za-z_\-0-9\.]/g,"_");
  //console.log("Media File: '"+pMediaLink+"'");
  return pMediaLink;
};

function convertWikiMedia2URL(pMediaLink) {
  pMediaLink = pMediaLink.replace(/[ \t]+$/,"");
  pMediaLink = pMediaLink.replace(/ /g,"_");
  //console.log("MediaLink: '"+pMediaLink+"'");
  return pMediaLink;
};

// Depricated Download via pandoc Download
function downloadWebInput() {
  //alert("Download Input File and Convert Source File to MarkDown");
  var vPandoc_CMD = getValueDOM("pandocCMD");
  var vShellHash = {};
  var vInputFile = getValueDOM("downloadWebFILE");
  vShellHash["inputFILE"] = vInputFile;
  write2innerHTML("inputFILE",vShellHash["inputFILE"]);
  console.log("downloadWebInput('markdown'):41");
  setInputFormat("markdown");
  var vOutFile = createOutputFile(vInputFile,pOutputFORMAT);
  write2innerHTML("outputFILE",vOutFile);
  initShellScript(vShellHash);
  vShellHash["executeable"] = vPandoc_CMD;
  console.log("downloadWebInput():41");
  var vSep = getPathSeparator();
  var vPath = getProjectDir(getValueDOM("inputWEBPROJECT"));
  makedirpath(vPath);
  makeProjectDirs(vPath); //audio, video, config, images
  //alert("URL: "+getValueDOM("inputURL")+"\nDownload File: "+getValueDOM("downloadWebFILE")+"\nWeb Project: "+getValueDOM("inputWEBPROJECT"));

  var vCommand = vPandoc_CMD + " -s -r html "+getValueDOM("inputURL")+" -o "+getValueDOM("downloadWebFILE");
  pushArgsCMD(vShellHash,"-s");
  pushArgsCMD(vShellHash,"-r");
  pushArgsCMD(vShellHash,getValueDOM("inputURL"));
  pushArgsCMD(vShellHash,"-o");
  getValueDOM("downloadWebFILE")
  console.log(vCommand);
  var vAnswer = true;
  if (checkFileExists(getValueDOM("downloadWebFILE"))) {
    vAnswer = confirm("Warning Download will overwrite existing File!")
  };
  if (vAnswer) {
    runShellCommand(vCommand,vShellHash);
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

function createProject(pCallWizzard) {
  var vPandoc_CMD = getValueDOM("pandocCMD");
  var vSep = getPathSeparator();
  var vName = getValueDOM("inputNEWPROJECT");
  var vPath = getValueDOM("projectmainDIR")+vSep+vName;
  var vInFormat = getValueDOM("inputFORMAT");
  var vExt = vExtHash[vInFormat];
  // vFilename is the new Input Filename for the new project
  var vFilename = vPath+vSep+vName+"."+vExt;
  var vShellHash = {};
  var vContent = "";
  vShellHash["inputFILE"] = vFilename;
  vShellHash['savefile'] = "N";
  initShellScript(vShellHash);
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
        vDefaultFile = vDir + "md" + vSep +"input.md";
        //copyFile2Editor("inputEDITOR",vDefaultFile);
        copyFile(vDefaultFile,vFilename);
        vContent = getFileContent(vDefaultFile);
        write2value("inputEDITOR",vContent);
        break;
      case "mediawiki":
        //alert("WIKI Create Project createProject():441:index.html");
        vDefaultFile = vDir + "wiki" + vSep +"input.wiki";
        //copyFile2Editor("inputEDITOR",vFilename);
        copyFile(vDefaultFile,vFilename);
        vContent = getFileContent(vDefaultFile);
        write2value("inputEDITOR",vContent);
        break;
      case "pdf":
          //alert("MD Create Project createProject():436:index.html");
          vDefaultFile = vDir + "pdf" + vSep +"input.pdf";
          copyFile(vDefaultFile,vFilename);
          break;
      default:
        alert("Default ["+vInFormat+"] Create Project createProject():441:index.html");
        vDefaultFile = getInnerHTML("DEFAULTTPL");
        //alert(vDefaultFile);
        runShellCommand(vPandoc_CMD+" -f markdown -t "+vInFormat+" "+vDefaultFile+" -o "+vFilename,vShellHash);
        setTimeout("loadEditorInContent('"+vFilename+"')",5000);
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
    if (pCallWizzard) {
      pCallWizzard();
    };
  } else {
    // Do nothing!
    alert("Project Create: CANCEL Operation")
  }
}
