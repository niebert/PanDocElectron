function deleteFile(filepath){
  fs.exists(filepath, function(exists) {
      if(exists) {
          // File exists deletings
          fs.unlink(filepath,function(err){
              if(err){
                  //alert("An error ocurred updating the file"+ err.message);
                  console.log(err);
                  return;
              }
          });
          console.log("DELETED: "+filepath);
      } else {
          //console.log(filepath+" doesn't exist, cannot delete");
      }
  });
}

function deleteAllImages(pPath,pCount) {
  var i=0;
  var vOutPNG = "";
  while ((i<pCount) && (i < 200)) {
    vOutPNG = pPath +i+".png";
    deleteFile(vOutPNG);
    i++;
  }
}
//alert("Include deletefiles.js");
