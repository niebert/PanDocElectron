function executePanDocCMD(pInFORMAT,pOutFORMAT,pHash) {
  if (pOutFORMAT =="audioslides") {
    if (pInFORMAT == "pdf") {
      alert("Input Format is PDF ")
      convertPDF2PNG(pHash["inputPDF"],pHash["slidecount"]);
      createImageSlide(pHash["outputFILE"],pHash["slidecount"]);
    } else {
      alert("Input Format '"+pInFORMAT+"' for Output Format '"+pOutFORMAT+"' " );
    }
  } else {
    alert("pandoc -f "+pInFORMAT+" -t "+pOutFORMAT);
  }
}

function convertPDF2PNG(pInputPDF,pCount) {
  var i = 0;
  var vNodeCMD = document.getElementById("command");
  while (i<pCount) {
    alert("Create Image "+i+" from PDF");
    vNodeCMD.innerHTML="PDF2PNG: Convert Slide "+i;
  }
}
// The following hash defines the extension for the Output Format
