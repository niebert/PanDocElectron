function setWizzard(pButtonID) {
	console.log(pButtonID);
	var vPages = ["EDITLIST","DISPLAY","PAPERDATA","SELECTOR","EDITOR"];
	//alert("setPage for ID="+pButtonID+" vPages.length="+vPages.length);
	var i=0;
	for (i=0;i<vPages.length;i++) {
		setColorDefault("b"+vPages[i]);
		hide(vPages[i]+"Page");
	};
	show(pButtonID+"Page");
	setColorSelected("b"+pButtonID);
}

function setPage(pButtonID) {
	var vPages = ["bConvert","bNew","bWebInput","bMediaDownload","bBibliography","bSettings","bEditor","bTemplates"];
	//alert("setPage for ID="+pButtonID+" vPages.length="+vPages.length);
	var i=0;
	for (i=0;i<vPages.length;i++) {
		setColorDefault(vPages[i]);
		hide(vPages[i]+"Page");
	};
	show(pButtonID+"Page");
	setColorSelected(pButtonID);
}

function showEditPath(pID) {
	document.getElementById('EDIT'+pID+'CMD').value = document.getElementById(pID+'CMD').innerHTML;
	hide('P'+pID+'CMD');
	show('PEDIT'+pID+'CMD');
}

function hideEditPath(pID) {
	document.getElementById(pID+'CMD').innerHTML = document.getElementById('EDIT'+pID+'CMD').value;
	hide('PEDIT'+pID+'CMD');
	show('P'+pID+'CMD');
}
function setColorSelected(pButtonID) {
	setButtonColor(pButtonID,"#3D8CD1");
}
function setColorDefault(pButtonID) {
	setButtonColor(pButtonID,"black");
}
function setButtonColor(pID,pColor) {
	var vNode = document.getElementById(pID);
	if (vNode) {
		vNode.style.color = pColor;
	} else {
		console.log("setButtonColor()-Call pID="+pID+" does not exist!");
	}
}

function toggle(pID) {
	var vNode = document.getElementById(pID);
	if (vNode) {
		if (vNode.style.display == "none") {
			show(pID);
		} else {
			hide(pID);
		}
	} else {
		console.log("toggle('"+pID+"') Error - DOM Node ["+pID+"] does not exist");
	}
}

function toggleCheck(pID,pChecked) {
	if (pChecked) {
		show(pID,"block");
	} else {
		hide(pID);
	}
}
function hide(pID) {
	var vNode = document.getElementById(pID);
	if (vNode) {
		vNode.style.display = "none";
		vNode.style.visibility = "hidden";
	} else {
		console.log("hide()-Call pID="+pID+" does not exist!");
	}
};

function hideNode(pNode) {
	if (pNode) {
		pNode.style.display = "none";
		pNode.style.visibility = "hidden";
	} else {
		console.log("hideNode()-Call pNode does not exist!");
	}
};
function hideElementNode(pNode) {
	if (pNode) vNode.style.visibility = "hidden";
};
function hideElement(pID) {
	var vNode = document.getElementById(pID);
	if (vNode) {
		vNode.style.visibility = "hidden";
	} else {
		alert("hideElement()-Call pID="+pID+" was undefined");
	}
};
function showElement(pID) {
    show(pID,"inline");
}
function showNode(pNode,pDisplay) {
	var vDisplay = pDisplay || "inline";
	if (pNode) {
		pNode.style.display = vDisplay;
		//pNode.style.display = "inline"; // "block"
		pNode.style.visibility = "visible";
	};
};
function show(pID,pDisplay) {
	var vNode = document.getElementById(pID);
	this.showNode(vNode,pDisplay);
};
