//#################################################
//# JS ArticleGenerator                           #
//# University of Koblenz-Landau                  #
//# File:  replacer.js                            #
//# email: niehaus@uni-landau.de                  #
//# created               02.06.2015,             #
//# last modifications    27.01.2016,             #
//# Author:  Engelbert Niehaus                    #
//# GNU Public License 1999-2016                  #
//#################################################
function overwriteLoop() {
	//var vIDs = new Array("LOOP_BEGIN","LOOP_AFTER_FIRST","LOOP__ITEM","LOOP_BEFORE_LAST","LOOP_END");
	//alert("vIDs.length="+vIDs.length);
	var vLoopDef = document.getElementById("LOOPTYPE");
	if (vLoopDef) {
		top.setLoopDefs(vLoopDef.innerHTML);
	};
};

function injectSource() {
	overwriteLoop();
	var vNonTerm = top.getNonTerm(document.location.href);
	var vReplace = document.getElementById("DISPLAY").innerHTML;
	//alert("injectSource("+vNonTerm+")");
	//alert(top.iLoadLoop.document.getElementById("LATEX_ITEMIZE_LOOP_BEGIN").value);
	var vReplace = document.getElementById("DISPLAY").innerHTML;
	top.replaceNonTerm(vNonTerm,vReplace);
	//top.compareLoadURL();
	top.setWizzard("EDITOR");
};

setTimeout("injectSource()",700);
