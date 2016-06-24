function getOperatingSystem() {
  // Origine of Code
  // http://www.javascripter.net/faq/operatin.htm
  // This script sets OSName variable as follows:
  // "Windows"    for all versions of Windows
  // "MacOS"      for all versions of Macintosh OS
  // "Linux"      for all versions of Linux
  // "UNIX"       for all other UNIX flavors
  // "Unknown OS" indicates failure to detect the OS

  var OSName="Unknown OS";
  //--Recognition of Windows is not consistent--
  OSName="Linux";
  if (navigator.appVersion.indexOf("Win")!=-1) {
    OSName="Windows";
  } else if (navigator.appVersion.indexOf("Mac")!=-1) {
    OSName="MacOSX";
  } else if (navigator.appVersion.indexOf("X11")!=-1) {
    //OSName="Unix";
    OSName="Linux";
  } else if (navigator.appVersion.indexOf("Linux")!=-1) {
    OSName="Linux";
  };
  //alert(OSName);
  return OSName
}

function getPathSeparator() {
  var vSepNode = document.getElementById("separatorPATH");
  var vSelectOSNode = document.getElementById("selectOS");
  var vSep = "";;
  var vOS = getOperatingSystem();
  if (!vSepNode) {
    alert("vSepNode ID='separatorPATH' does not exist! getPathSeparator()-Call");
    vSep = determinePathSeparator();
    setRadioOS(vOS);
  } else {
    vSep = vSepNode.innerHTML;
    if (vSep == "") {
      vSep = determinePathSeparator();
      setRadioOS(vOS);
      vSepNode.innerHTML = vSep;
    } else {
      vSep = vSepNode.innerHTML;
    };
  };
  return vSep;
};

function determinePathSeparator() {
  var vOS = getOperatingSystem();
  var vPathSeparator = "/";
  if (vOS=="Windows") {
    vPathSeparator = "\\";
  };
  return vPathSeparator;
}

function setRadioOS(pOS) {
  var vOSRadio = document.getElementsByClassName("selectOS");
  //alert("vOSRadio.length="+vOSRadio.length);
  for (var i = 0; i < vOSRadio.length; i++) {
    if (vOSRadio[i].value == pOS) {
      vOSRadio[i].checked = "checked";
    };
  };
};

function setOS(pOS) {
  clickOS(pOS);
  setRadioOS(pOS);
};

function clickOS(pOS) {
  document.getElementById("setOS").innerHTML = pOS;
  var vSep = "/";
  if (pOS == "Windows") {
    vSep = "\\";
  };
  //alert("clickOS() OS="+pOS+" vSep="+vSep);
  document.getElementById("separatorPATH").innerHTML = vSep;
  //write2value("separatorPATH",vSep);
};
