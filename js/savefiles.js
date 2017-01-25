
function saveLocalStorageValue(pID) {
  localStorage.setItem(pID,document.getElementById(pID).value);
  console.log("LocalStorage Save: ["+pID+"]");
};

function loadLocalStorageValue(pID) {
  if (localStorage.getItem(pID) === null) {
    console.log("Local Storage Variable ["+pID+"] was not set!");
  } else {
    write2value(pID, localStorage.getItem(pID));
    console.log("LocalStorage Load: ["+pID+"]");
  };
};

function saveLocalStorageInnerHTML(pID) {
  localStorage.setItem(pID,document.getElementById(pID).innerHTML);
  console.log("LocalStorage Save: ["+pID+"]");
};

function loadLocalStorageInnerHTML(pID) {
  if (localStorage.getItem(pID) === null) {
    console.log("Local Storage Variable ["+pID+"] was not set!");
  } else {
    write2innerHTML(pID, localStorage.getItem(pID));
    console.log("LocalStorage Load: ["+pID+"]");
  };
};

function loadJSON(pFilename) {
  var vJSON;
  var vContent;
  if (checkFileExists(pFilename)) {
    var vContent = getFileContent(pFilename);
    vJSON = JSON.parse(vContent);
    console.log("JSON File '"+pFilename+"' parsed in loadJSON()-Call");
  } else {
    console.log("loadJSON('"+pFilename+"') - File does not exist");
  };
  return vJSON;
};

function saveJSON(pFilename,pJSON) {
  if (pJSON) {
    var vContent = JSON.stringify(pJSON);
    saveFile(pFilename,vContent);
    console.log("saveJSON('"+pFilename+"')");
  } else {
    console.log("ERROR: in saveJSON('"+pFilename+"') pJSON does not exist!");
  }
};

function copyFile(pSource,pDestination) {
  var vPerfomCopy = true;
  if (checkFileExists(pDestination)) {
    //alert("Create Error: File exists \n"+pDestination);
    vPerfomCopy = confirm("File exists! Do you want to overwrite the file?\n"+pDestination);
  } else {
    console.log("Try to copy '"+pSource+"' to '"+pDestination+"'");
  };
  if (vPerfomCopy) {
    console.log("Perfom COPY");
    fs.createReadStream(pSource).pipe(fs.createWriteStream(pDestination));
  };
};

function X_copyFile(pSource,pDestination) {
  if (checkFileExists(pDestination)) {
    alert("Create Error: File exists \n"+pDestination);
  } else {
    //var fs = require('fs');
    //fs.createReadStream(pSource).pipe(fs.createWriteStream(pDestination));
    var vCommand = "cp \""+pSource+"\" \""+pDestination+"\"";
    if (getOperatingSystem() == "Windows") {
      vCommand = "copy \""+pSource+"\" \""+pDestination+"\"";
    };
    var vParams=[pSource,pDestination];
    execFileCommand(vCommand,vParams);
    console.log("execFile: "+vCommand+" "+vParams.join(" "));
  };
};

function saveBinary(pFilename,pData) {
  fs.writeFile(pFilename, pData,  "binary",function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log("Binary file '"+pFilename+"' was saved!");
    }
  });
};

function loadEditorInContent(pFilename) {
  var vFilename = pFilename || getValueDOM("inputFILE");
  var vContent = getFileContent(vFilename);
  write2value("inputEDITOR",vContent);
};


function saveEditorOutContent() {
  saveEditorContent(getValueDOM("outputFILE"),"outputEDITOR");
};

function saveEditorContent(pFilename,pID) {
  var vInputFile = pFilename || getValueDOM("inputFILE");
  var vID = pID || "inputEDITOR";
  var vInputFormat = getValueDOM("inputFORMAT");
  if (vInputFile=="") {
    alert("Error: Input Filename is not defined!");
  } else if (vInputFormat == "pdf") {
    alert("Error: Input File is PDF. Saving file is not supported!");
  } else {
    saveFile(vInputFile,getValueDOM(vID));
    alert("Editor File saved!\n"+vInputFile);
  }
}

function saveFile2AppDir (pFilename,pContent) {
  var vSep = getPathSeparator();
  var vFilename="."+vSep+pFilename;
  fs.writeFile(vFilename, pContent, (err) => {
    if (err) throw err;
    console.log('File: \''+pFilename+'\' saved to application directory!');
    //alert("Dirname: "+__dirname)
  });
}

function saveFile(pFilename,pContent) {
 //alert(typeof(pFilename));
 fs.writeFile(pFilename, pContent, (err) => {
   if (err) throw err;
   console.log('Filename \''+pFilename+'\' saved!');
   //alert("Dirname: "+__dirname)
 });
}
