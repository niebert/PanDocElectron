//#################################################
//# JS ArticleGenerator                           #
//# University of Koblenz-Landau                  #
//# File:  loader.js                              #
//# email: niehaus@uni-landau.de                  #
//# created               02.06.2015,             #
//# last modifications    27.01.2016,             #
//# Author:  Engelbert Niehaus                    #
//# GNU Public License 1999-2016                  #
//#################################################
var vOkButton = "<input type=\"button\" value=\" OK \" nonterm=\"NONTERM_DEF\" onclick=\"top.setNonTermEdit(this.getAttribute('nonterm'))\">";
top.vCount++;
var vCount = top.vCount;
var vPaperData = document.getElementById("PAPERDATA");
if (!vPaperData) {
	var vBody = document.getElementsByTagName("body")[0];
	if (!vBody) {
		alert("Document contains no body tag - loader.js:18");
	};
	vPaperData = document.createElement("PAPERDATA");
	vBody.appendChild(vPaperData);
};
var vNode = document.getElementById("SELECTOR");
//alert("SELECTOR");
var vSelNode = document.getElementById("edit_NONTERM_DEF");
if (vSelNode) {
	//alert("Edit NON_TERMDEF");
	top.vLoaderURL = document.location.href;
	top.append2innerHTML("ulPAPERDATA","<li>"+top.vLoaderURL+"</li>\n");
	var vNonTerm = top.getNonTerm(top.vLoaderURL);
	vEditNode = vSelNode.cloneNode(true);
	vEditNode.id = vNonTerm + vCount;
	vEditNode.className = vNonTerm;
	var vLabel = vEditNode.getAttribute("label") || vNonTerm;
	vLabel += ": ";
	var vB = document.createElement("B");
	vB.innerHTML = vLabel;
	vPaperData.appendChild(vB);
	vPaperData.appendChild(vEditNode);
	//var vOkNode = createButtonOK(vNonTerm);
	var vOkNode = document.createElement("button");
	vOkNode.innerHTML = " OK ";
	//vNode.appendChild(vOkNode);
	// -----Append OK Button----
	//vNode.innerHTML += vOkButton;
};
var vSelectContent = "";
if (vNode) {
	//top.write2innerHTML("SELECTOR",vNode.innerHTML+vOkButton,top.vCount);
	top.write2innerHTML("SELECTOR",vNode.innerHTML,top.vCount);
	if (vNode.innerHTML != "") {
		//alert("Set Tab to Select");
		vSelectContent = "SELECT";
	};
};
vNode = document.getElementById("EDITLIST");
//alert("EDITLIST");
if (vNode) {
	top.append2innerHTML("EDITLIST",vNode.innerHTML);
};
vNode = document.getElementById("PAPERDATA");
//alert("PAPERDATA");
if (vNode) {
	top.append2innerHTML("PAPERDATA",vNode.innerHTML);
};
vNode = document.getElementById("EDITOR");
//alert("EDITOR");
if (vNode) {
	top.append2innerHTML("EDITOR",vNode.innerHTML);
};
vNode = document.getElementById("DISPLAY");
//alert("DISPLAY");
if (vNode) {
	top.append2innerHTML("DISPLAY",vNode.innerHTML);
};
//alert("taSOURCE");
if (vNode) {
	top.append2value("taSOURCE",vNode.innerHTML);
};

function createButtonOK(pNonTerm) {
	var vOkNode = document.createElement("input");
	vOkNode.setAttribute("type","button");
	vOkNode.setAttribute("nonterm",pNonTerm);
	vOkNode.setAttribute("value","  OK  ");
	vOkNode.setAttribute("onclick","top.setNonTermEdit(this.getAttribute('nonterm'))");
	vOkNode.id = "ok_"+vNonTerm + vCount;
	vOkNode.className = "ok_"+vNonTerm;
	return vOkNode;
};

function setWizzard(pTab) {
	top.setWizzard(pTab);
};

var vTab = "EDITOR";
vNode = document.getElementById("WIZZARD");

if (vNode) {
		vTab = vNode.innerHTML;
		console.log("show Tab='"+vTab+"'");
};

setTimeout("setWizzard('"+vTab+"')",700);
