function replaceConfig() {
  var vBody = document.getElementById("pagebody");
  if (vBody) {
    var vText = vBody.innerHTML;
    //search and replaceString
    //vText = vText.replace(/PanDocElectron/g,"BlaBlaElectron")
    vBody.innerHTML = vText
  };
}

setTimeout("replacePageBody",2000);
