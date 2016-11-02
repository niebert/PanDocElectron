//#################################################
//# JS ArticleGenerator                           #
//# University of Koblenz-Landau                  #
//# File:  string.js                              #
//# email: niehaus@uni-landau.de                  #
//# created               02.06.2015,             #
//# last modifications    27.01.2016,             #
//# Author:  Engelbert Niehaus                    #
//# GNU Public License 1999-2016                  #
//#################################################
//---------------------------------------------
function extractName(pURL)
// "documentation/technischedoc/startnavigator.html?parameters..."
// "documentation/technischedoc/startnavigator.html"  remove parameters
// "startnavigator.html"   remove the path before last "/"
{
	// pURL conatins a last symbol which is NOT the Slash "/"
        var vN=0;
        top.vDomainPrefix = '';
		var lvURL = removeParameters(pURL);
        vN = lvURL.lastIndexOf("/");
        if (vN >= 0) {
                pURL = lvURL.substring(vN+1,lvURL.length);
        };
        var vNameArray = pURL.split(".");
    //alert("string.js:224 - extractPath() = "+lvURL);
	return vNameArray[0];
};
//---------------------------------------------
function removeParameters(pURL)
// if the URL "pURL" contains a parameter, then the parameter after the "?"
// will be removed, e.g. "mypath/navigator.html?objectset=documentation/object_set.html"
// was converted into "mypath/navigator.html"
{
        var vN = pURL.lastIndexOf("?");
        var lvURL = pURL;
        if (vN >= 0)
                lvURL = pURL.substring(0, vN);
	return lvURL;
};
//---------------------------------------------
