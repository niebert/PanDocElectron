function executePanDocCMD(pHash) {
  var vInFORMAT  = getValueDOM("inputFORMAT");
  var vOutFORMAT = getValueDOM("outputFORMAT");
  var vPanOutFORMAT = pHash["pandocOUTFORMAT"];
  pHash["inputPDF"] = getInnerHTML("inputFILE");
  pHash["outputFILE"] = getInnerHTML("outputFILE");
  var vCount = getValueDOM("slidecount")
  switch (vOutFORMAT) {
    case "audioslides":
      if (vInFORMAT == "pdf") {
        alert("Input Format is PDF ");
        convertPDF2PNG(pHash["inputPDF"],vCount);
        createImageSlide(pHash["outputFILE"],vCount);
      } else {
        alert("Just create the AudioSlide Input Format '"+vInFORMAT+"' for Output Format '"+vPanOutFORMAT+"' " );
        createImageSlide(pHash["outputFILE"],vCount);
      };
      break;
    case "myOut":

        break;
    default:
      // perform default task
      alert("Perform PanDoc Default")
      alert("pandoc -f "+vInFORMAT+" -t "+vPanOutFORMAT);
  }
}
function createImageSlide(pOutFile,pCount) {
  console.log("Create "+pCount+" Slides with AudioSlides for "+pOutFile);
  alert("Create "+pCount+" Slides with AudioSlides for "+pOutFile);
  var i = 0;
  var vSep = getPathSeparator();
  var vPath += vSep + "images" + vSep + "img";
  while ((i<vCount) && (i < 200)) {

  }
}
function convertPDF2PNG(pInputPDF,pCount) {
  var vPath = getPathFromFilename(pInputPDF);
  var vSep = getPathSeparator();
  vPath += vSep + "images" + vSep + "img";
  var i = 0;
  var vOutPNG = vPath +i+".png";
  alert("Remark: Converting all slides could take up to "+pCount+" minutes!");
  console.log("convertPDF2PNG(pInputPDF,"+pCount+")");
  var vCount = parseInt(pCount);
  while ((i<vCount) && (i < 200)) {
    vOutPNG = vPath +i+".png";
    i++;
    //vNode.value += ">";
    //setTimeout("document.getElementById('pandocprogress').value += 'o'",100);
    //alert("Create Image "+i+" from PDF");
    // convert -density 300 -depth 8 -quality 85 ${FilePDF}[${COUNTER}] outtmp.png

    var vCMD = "convert -density 300 -depth 8 -quality 85 "+pInputPDF+"["+i+"] " + vOutPNG;
    //alert(vCMD);
    runShellCommand(vCMD);
  };
  alert("Generating "+pCount+" PNG Files from PDF done!");
}
// The following hash defines the extension for the Output Format
