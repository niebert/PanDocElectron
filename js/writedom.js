function write2innerHTML(pID,pContent) {
  document.getElementById(pID).innerHTML=pContent;
}
function write2value(pID,pContent) {
  document.getElementById(pID).value=pContent;
}
function append2innerHTML(pID,pContent) {
  document.getElementById(pID).innerHTML+=pContent;
}
function append2value(pID,pContent) {
  document.getElementById(pID).value+=pContent;
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
