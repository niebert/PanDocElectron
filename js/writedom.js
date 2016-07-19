function write2innerHTML(pID,pContent) {
  var vNode =document.getElementById(pID)
  if (vNode){
    vNode.innerHTML=pContent;
  } else {
    alert("Write DOM-Node 'innerHTML' with ID=["+pID+"] was undefined")
  }}
function write2value(pID,pContent) {
  var vNode =document.getElementById(pID)
  if (vNode){
    vNode.value=pContent;
  } else {
    alert("Write DOM-Node 'value' with ID=["+pID+"] was undefined")
  }
}
function append2innerHTML(pID,pContent) {
  var vNode =document.getElementById(pID)
  if (vNode){
    vNode.innerHTML+=pContent;
  } else {
    alert("Append DOM-Node 'innerHTML' with ID=["+pID+"] was undefined")
  }
}
function append2value(pID,pContent) {
  var vNode =document.getElementById(pID)
  if (vNode){
    vNode.value+=pContent;
  } else {
    alert("DOM-Node 'value' with ID=["+pID+"] was undefined")
  }
}
function replaceString(pString,pSearch,pReplace)
// replaces in the string "pString" multiple substrings "pSearch" by "pReplace"
{
	//alert("cstring.js - replaceString() "+pString);
	if (!pString) {
		alert("replaceString()-Call - pString not defined!");
	} else if (pString != '') {
    {
  	//alert("cstring.js - replaceString() "+pString);
  		var vHelpString = '';
      var vN = pString.indexOf(pSearch);
  		var vReturnString = '';
  		while (vN >= 0)
  		{
  			if (vN > 0)
  				vReturnString += pString.substring(0, vN);
  			vReturnString += pReplace;
              if (vN + pSearch.length < pString.length) {
  				pString = pString.substring(vN+pSearch.length, pString.length);
  			} else {
  				pString = ''
  			}
  			vN = pString.indexOf(pSearch);
  		};
  	};
  	return vReturnString + pString;
  }

};
function getValueDOM(pID) {
  var vNode = document.getElementById(pID);
  var vReturn = "";
  if (!vNode) {
    console.log("DOM Node ["+pID+"] does not exist!");
  } else {
    vReturn = vNode.value;
    if (!vReturn) {
      vReturn = getInnerHTML(pID);
    };
  }
  return vReturn;
};
function getInnerHTML(pID) {
  var vNode = document.getElementById(pID);
  var vReturn = "";
  if (!vNode) {
    console.log("DOM Node ["+pID+"] does not exist!");
  } else {
    vReturn = vNode.innerHTML;
    if (!vReturn) {
      vReturn = "";
      //alert("["+pID+"] Node is undefined");
    } else {
      //alert("["+pID+"] Node defined");
    };
  }
  return vReturn;
};
