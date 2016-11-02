function replaceConfig() {
  var vBody = document.getElementById("pagebody");
  if (vBody) {
    var vText = vBody.innerHTML;
    //search and replaceString
    vText = vText.replace(/PanDocElectron/g,"BlaBlaElectron")
    vBody.innerHTML = vText;
    console.log("Replace Words in Page Body");
  } else {
    console.log("innerHTML of Page Body does not exist");
  };
};

// setTimeout("replaceConfig",2000);
