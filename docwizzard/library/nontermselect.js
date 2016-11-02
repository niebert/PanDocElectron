//#################################################
//# JS ArticleGenerator                           #
//# University of Koblenz-Landau                  #
//# File:  paperselect.js                         #
//# email: niehaus@uni-landau.de                  #
//# created               02.06.2015,             #
//# last modifications    27.01.2016,             #
//# Author:  Engelbert Niehaus                    #
//# GNU Public License 1999-2016                  #
//#################################################
function loadQueryString() {
	var vQueryString = getQueryString();
	var vNode = null;
	for (var iID in vQueryString) {
		vNode = document.getElementById(iID);
		if (vNode) {
			vNode.innerHTML = vQueryString[iID];
		};
	}
};
//-------------------
function getQueryString () {
	var query_string = {};
 	var query = window.location.search.substring(1);
 	var vars = query.split("&");
 	for (var i=0;i<vars.length;i++) {
	 	var pair = vars[i].split("=");
			 // If first entry with this name
	 	 if (typeof query_string[pair[0]] === "undefined") {
		 		query_string[pair[0]] = decodeURIComponent(pair[1]);
			 	// If second entry with this name
	 	} else if (typeof query_string[pair[0]] === "string") {
		 	var arr = [ query_string[pair[0]],decodeURIComponent(pair[1]) ];
		 	query_string[pair[0]] = arr;
			 // If third or later entry with this name
	 	} else {
		 	query_string[pair[0]].push(decodeURIComponent(pair[1]));
	 	}
 }
 	return query_string;
};
function saveWizzardFile() {
	console.log("Save Wizzard File: "+getInnerHTML("inputFILE"));
	var vFilename=getInnerHTML("inputFILE");
	var vContent = getValueDOM("taSOURCE");
	fs.writeFile(vFilename, vContent, (err) => {
		if (err) throw err;
		console.log('File: \''+vFilename+'\' saved to application directory!');
		//alert("Dirname: "+__dirname)
	});
};
//---------------------------------------------
function checkLink(pURL)
{
    var http = new XMLHttpRequest();
    http.open('HEAD', pURL, false);
    http.send();
    alert("http.status="+http.status)
    return http.status!=404;
};
//---------------------------------------------
function nextCount(pTableID) {
	var vReturn = 0;
	if (pTableID) {
		if (vTableHash[pTableID]) {
			if (vTableHash[pTableID]["Count"]) {
				vTableHash[pTableID]["Count"]++;
			} else {
				vTableHash[pTableID]["Count"]=1;
			}
		} else {
			vTableHash[pTableID] = {};
			vTableHash[pTableID]["Count"] = 1;
		};
		vReturn = vTableHash[pTableID]["Count"];
	} else {
		top.vCount++;
		vReturn = top.vCount;
	};
	return vReturn;
};
//---------------------------------------------
function setReplaceNONTERM(pNonTerm) {
	var vNonTermDef = document.getElementById("edit_"+pNonTerm).value;
	vHashNT[pNonTerm] = vNonTermDef;
	replaceNonTerm(pNonTerm,vNonTermDef);
	setWizzard("EDITOR");
}
//---------------------------------------------
function replaceNONTERMs(pString)
{
	var vSource = pString.replace(/___COUNT___/g,vCount);
	for (var i=0;i<5;i++) {
		vSource = replaceLoop(vSource);
	};
	vSource = replaceEDITLIST(vSource);
	return vSource;
};
//---------------------------------------------
function replaceEDITLIST(pSource)
{
	var vReplace = "";
	for (var iNonTerm in vHashNT) {
		vReplace = vHashNT[iNonTerm];
		eval("pSource = pSource.replace(/\\b"+iNonTerm+"\\b/g,vReplace);");
	};
	return pSource;
};
//---------------------------------------------
function getLanguageArray() {
	var x = document.getElementById("OUTLANGUAGE");
	var vLanguageArray = [];
	var i;
	for (i = 0; i < x.length; i++) {
			vLanguageArray.push(x.options[i].value);
	};
	return vLanguageArray;
};
//---------------------------------------------
function setLoopDefs(pLoopType)
{
	// alert("pLoopType="+pLoopType);
	//pLoopType: FORMAT_ENUMERATE FORMAT_ITEMIZE FORMAT_COMMA_AND
	var i = document.getElementById("OUTFORMAT").selectedIndex;
	var vOutFormat = vFormatArray[i];
	//alert(vOutFormat);
	var vLoopType = pLoopType.replace(/FORMAT_/g,vOutFormat);
	//vLoopType: ENUMERATE ITEMIZE COMMA_AND
	//alert("selIndex="+i+" "+vLoopType);
	i = document.getElementById("OUTLANGUAGE").selectedIndex;
	var vLanguageArray = getLanguageArray();
	var vOutLanguage = vLanguageArray[i].toUpperCase();
	console.log("Output Language: "+vOutLanguage);
	for (var iID in vLoopID) {
		//alert(pLoopType+" - "+"iID="+iID);
		// vLoopID is an Hash defined in paperselect_jq.html;
		// iID: LOOP_BEGIN LOOP_AFTER_FIRST LOOP__ITEM LOOP_BEFORE_LAST LOOP_END
		var vNode = document.getElementById(vLoopType+"_"+iID);
		if (vNode) {
			vLoopID[iID] = vNode.value;
			//alert("vNode["+iID+"].value="+vNode.value);
		} else {
			vLoopType = pLoopType.replace(/FORMAT_/g,vOutLanguage+"_");
			vNode = document.getElementById(vLoopType+"_"+iID);
			if (vNode) {
				vLoopID[iID] = vNode.value;
			} else {
				vLoopType = pLoopType.replace(/FORMAT_/g,"");
				vNode = document.getElementById(vLoopType+"_"+iID);
				if (vNode) {
					vLoopID[iID] = vNode.value;
				} else {
					alert("ID="+pLoopType+"_"+iID+" is undefined");
				};
			};
		};
	};
};
//---------------------------------------------
function replaceLoop(pString)
{
	var vSource = pString;
	for (var iID in vLoopID) {
		var vReplace = vLoopID[iID];
		//alert(iID+"="+vReplace);
		eval("vSource = vSource.replace(/\\b"+iID+"\\b/g,vReplace);");
	};
	return vSource;
};
//---------------------------------------------
function getNonTerm(pURL) {
	if (pURL) {
		return (extractName(pURL)).toUpperCase();
	} else {
		console.log("getNonTerm(pURL) with undefined URL");
		return "NT_UNDEFINED";
	};
};
//---------------------------------------------
function replaceNonTerm(pNonTerm,pReplace) {
	var vSource = top.document.getElementById("taSOURCE").value;
	//eval("vSource = vSource.replace(/ "+pNonTerm+" /g,pReplace);");
	eval("vSource = vSource.replace(/\\b"+pNonTerm+"\\b/g,pReplace);");
	vSource = replaceNONTERMs(vSource);
	document.getElementById("taSOURCE").value = vSource;
	var vSourceHTML = marked(vSource);
	document.getElementById("DISPLAY").innerHTML = vSourceHTML;
	document.getElementById("EDITOR").innerHTML = linkedNonTerms(vSourceHTML);
};
//---------------------------------------------
function linkedNonTerms(pStr) {
	//var vMatches = pStr.match(/([A-Z][A-Z]+_[A-Z][_A-Z]+)/g);
	//Create a CSS JQuery Call for all matches
	return pStr.replace(/([A-Z][A-Z]+_[A-Z][_A-Z]+)/g, ' <a class="blueNTbutton" href="loader/$1.html" target="iLoader"> $1 <\/a> ');
	//return pStr.replace(/([A-Z][A-Z]+_[A-Z][_A-Z]+)/g, '<a href="loader/$1.html" target="iLoader"><table border=1 bgcolor="#CACACA"><tr><td> $1 </td></tr></table><\/a>');
	//return pStr.replace(/([A-Z][A-Z]+_[A-Z][_A-Z]+)/g, "<button onclick=\"setLoaderURL('loader/$1.html')\">$1<\/button>");
};

function setLoaderURL(pURL){
	//alert("pURL="+pURL);
	top.vLoadURL = pURL;
    document.getElementById('iLoader').contentWindow.document.location.href = pURL;
};

function setNonTermEdit(pNonTerm) {
	//var vEdit$( "#edit_NONTERM_DEF" ).value;
	//alert(top.vLoaderURL);
	var vNonTerm = top.getNonTerm(top.vLoaderURL);
	alert("vNonTerm="+vNonTerm+" pAttrib="+pNonTerm);
};

function showSelector() {
	setWizzard('SELECTOR');
	//$( "#tabs" ).hide();
};

function hideSelector() {
	setWizzard('EDITOR');
	//$( "#divSELECTOR" ).hide();
	//$( "#tabs" ).show();
};
function createSelection(pGRAMMAR,pNONTERM) {
	var vDOMList = document.getElementsByClassName(pNONTERM);
	var vOut = "";
	for (var i=0;i<vDOMList.length;i++) {
		var vSelName = vDOMList[i].getAttribute("selname");
		var vID = vDOMList[i].getAttribute("id");
		vOut +="<input type=\"radio\" name=\"rSelInput\" value=\""+vID+"\">"+ vSelName+"<br>\n";
	};
	vOut +="<input type=\"button\" name=\"bSelInput\" value=\"   OK   \"><br>\n";
	var vOutDOM = document.getElementById("SELECTION");
	vOutDOM.innerHTML = vOut;
	//write2Value("taSOURCE",vOut);
};
//---------------------------------------------
