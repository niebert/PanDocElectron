function getDefaultConfig() {
  return getInnerHTML("projectmainDIR")+"/"+"default.cfg"
};

function loadConfig(pConfigFile) {
  var vConfigFile = pConfigFile || getDefaultConfig();
  // simnply load config file into the innerHTML of DIV node 'divconfig'
  fs.readFile(vConfigFile, 'utf-8', function (err, data) {
    // Throw Error if file does not exist
    if (err) {
      alert("ERROR: '"+vConfigFile+"' open file was not successful!\n(e.g. File does not exist)");
    } else {
      write2innerHTML("divconfig", data);
      console.log('Config File \''+vConfigFile+'\' loaded!');
      //--- update the select input with the loaded values  from selectInputFORMAT and selectOutputFORMAT---
      write2value("inputFORMAT",getInnerHTML("selectInputFORMAT"));
      write2value("outputFORMAT",getInnerHTML("selectOutputFORMAT"));
    };
  });
}

function saveConfig (pConfigFile) {
  var vConfigFile = pConfigFile || getDefaultConfig();
  // simply write the innerHTML of DIV node 'divconfig' into file
  //--- update the selected formats write to innerHTML of selectInputFORMAT and selectOutputFORMAT before saving---
  write2innerHTML("selectInputFORMAT",getValueDOM("inputFORMAT"));
  write2innerHTML("selectOutputFORMAT",getValueDOM("outputFORMAT"));
  var vContent=document.getElementById("divconfig").innerHTML;
  fs.writeFile(vConfigFile, vContent, (err) => {
  //fs.writeFile(vConfigFile, vContent, (err) => {
   if (err) throw err;
   console.log('Config File \''+vConfigFile+'\' saved!');
 });
}

//----defined in index.html-----
//var vDOMID = ["outputTITLE","outputAUTHOR","inputSERVER","wikiARTICLE","inputWEBPROJECT"];
//var vInnerHTMLID = [];

function loadTitleAuthor() {
  //loadTitleAuthorCFG();
  loadTitleAuthorJSON();
};

function saveTitleAuthor() {
  //saveTitleAuthorCFG();
  saveTitleAuthorJSON();
};

function loadTitleAuthorJSON() {
  console.log("Load Title and Author JSON");
  var vConfigFile = getFilename4TitleAuthor(".json");
  if (checkFileExists(vConfigFile)) {
    fs.readFile(vConfigFile , 'utf-8', function (err, data) {
      // check if the cfg-File with Title and Author exists
      if (data) {
        var vJSON = JSON.parse(data);
        var vType = 'DOMID';
        for (var iID in vJSON[vType]) {
          write2value(iID,vJSON[vType][iID]);
        };
        vType = 'InnerHTMLID';
        for (var iID in vJSON[vType]) {
          write2innerHTML(iID,vJSON[vType][iID]);
        };
        setInput4Project("inputWEBPROJECT",'downloadWikiFILE');
        console.log('Config JSON File \''+vConfigFile +' opened!');
      }
    });
  } else {
    console.log('Config JSON File \''+vConfigFile +' does not exist!');
    loadTitleAuthorCFG();
  }
};

function saveTitleAuthorJSON() {
  console.log("Save Title and Author");
  var vConfigFile = getFilename4TitleAuthor(".json");
  var vJSON = {};
  var vType = 'DOMID';
  vJSON[vType] = {};
  for (var i = 0; i < vDOMID.length; i++) {
    vJSON[vType][vDOMID[i]] = getValueDOM(vDOMID[i]);
  };
  vType = 'InnerHTMLID';
  vJSON[vType] = {};
  for (var i = 0; i < vInnerHTMLID.length; i++) {
    vJSON[vType][vInnerHTMLID[i]] = getInnerHTML(vInnerHTMLID[i]);
  };
  var vOut = JSON.stringify(vJSON);
  saveFile(vConfigFile, vOut);
};

function loadTitleAuthorCFG() {
  console.log("Load Title and Author");
  var vConfigFile = getFilename4TitleAuthor();
  if (checkFileExists(vConfigFile)) {
    fs.readFile(vConfigFile , 'utf-8', function (err, data) {
      // check if the cfg-File with Title and Author exists
      if (data) {
        var vLines = data.split("\n");
        for (var i = 0; i < vDOMID.length; i++) {
          if (vLines[i]) {
            write2value(vDOMID[i],vLines[i]);
          };
        };
        for (var i = 0; i < vInnerHTMLID.length; i++) {
          if (vLines[i+vDOMID.length]) {
            write2innerHTML(vInnerHTMLID[i],vLines[i+vDOMID.length]);
          };
        };
        setInput4Project("inputWEBPROJECT",'downloadWikiFILE');
        console.log('Config File \''+vConfigFile +' opened!');
      }
    });
  } else {
    console.log('Config File \''+vConfigFile +' does not exist!');
  }
};


function saveTitleAuthorCFG() {
  console.log("Save Title and Author");
  var vConfigFile = getFilename4TitleAuthor();
  var vCR = "";
  var vOut = ""
  for (var i = 0; i < vDOMID.length; i++) {
    vOut += vCR + getValueDOM(vDOMID[i]);
    vCR = "\n";
  };
  for (var i = 0; i < vInnerHTMLID.length; i++) {
    vOut += vCR + getInnerHTML(vInnerHTMLID[i]);
    vCR = "\n";
  };
  saveFile(vConfigFile, vOut);
};


function loadTitleAuthor() {
  console.log("Load Title and Author");
  var vConfigFile = getFilename4TitleAuthor();
  if (checkFileExists(vConfigFile)) {
    fs.readFile(vConfigFile , 'utf-8', function (err, data) {
      // check if the cfg-File with Title and Author exists
      if (data) {
        var vLines = data.split("\n");
        for (var i = 0; i < vDOMID.length; i++) {
          if (vLines[i]) {
            write2value(vDOMID[i],vLines[i]);
          };
        };
        for (var i = 0; i < vInnerHTMLID.length; i++) {
          if (vLines[i+vDOMID.length]) {
            write2innerHTML(vInnerHTMLID[i],vLines[i+vDOMID.length]);
          };
        };
        setInput4Project("inputWEBPROJECT",'downloadWikiFILE');
        console.log('Config File \''+vConfigFile +' opened!');
      }
    });
  } else {
    console.log('Config File \''+vConfigFile +' does not exist!');
  }
};

function getFilename4TitleAuthor(pExt) {
  var vExt = pExt || ".cfg";
  var vFilename = getInnerHTML("inputFILE");
  //alert("vFilename="+vFilename+"\n getFilename4TitleAuthor()");
  var vPath = getPathFromFilename(vFilename);
  var vName = getName4Filename(vFilename);
  var vSep = getPathSeparator();
  var vConfigFile = vPath+vSep+"config"+vSep+vName+vExt;
  console.log("getFilename4TitleAuthor('"+vExt+"') vConfigFile="+vConfigFile);
  return vConfigFile;
};
