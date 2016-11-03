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

function saveTitleAuthor() {
  console.log("Save Title and Author");
  var vConfigFile = getFilename4TitleAuthor();
  var vOut = getValueDOM("outputTITLE");
  vOut += "\n"+getValueDOM("outputAUTHOR");
  vOut += "\n"+getValueDOM("inputSERVER");
  vOut += "\n"+getValueDOM("wikiARTICLE");
  vOut += "\n"+getValueDOM("inputWEBPROJECT");
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
        write2value("outputTITLE",vLines[0]);
        write2value("outputAUTHOR",vLines[1]);
        if (vLines[2]) {
          write2value("inputSERVER",vLines[2]);
        };
        if (vLines[3]) {
          write2value("wikiARTICLE",vLines[3]);
        };
        if (vLines[4]) {
          write2value("inputWEBPROJECT",vLines[4]);
        };
        setInput4Project("inputWEBPROJECT",'downloadWikiFILE');
        console.log('Config File \''+vConfigFile +' opened!');
      }
    });
  } else {
    console.log('Config File \''+vConfigFile +' does not exist!');
  }
};

function getFilename4TitleAuthor() {
  var vFilename = getInnerHTML("inputFILE");
  //alert("vFilename="+vFilename+"\n getFilename4TitleAuthor()");
  var vPath = getPathFromFilename(vFilename);
  var vName = getName4Filename(vFilename);
  var vSep = getPathSeparator();
  var vConfigFile = vPath+vSep+"config"+vSep+vName+".cfg";
  console.log("getFilename4TitleAuthor() vConfigFile="+vConfigFile);
  return vConfigFile;
};
