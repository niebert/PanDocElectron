var vCurrentPage = "";

function setPage(pButtonID) {
	var vPages = ["bGeneral","bScript","bWindows","bMacOSX","bLinux","bTutorial","bDeveloper"];
	//alert("setPage for ID="+pButtonID+" vPages.length="+vPages.length);
	var i=0;
	for (i=0;i<vPages.length;i++) {
		setColorDefault(vPages[i]);
		hide(vPages[i]+"Page");
	};
	if (vCurrentPage == pButtonID) {
		console.log("toggle Page '"+pButtonID+"'");
		pButtonID = "";
		vCurrentPage = "";
	} else {
		console.log("vCurrentPage='"+vCurrentPage+"' pButtonID='"+pButtonID+"'");
		vCurrentPage = pButtonID;
	};
	switch (pButtonID) {
		case "": //
			for (i=1;i<vPages.length;i++) {
				setColorDefault(vPages[i]);
				show(vPages[i]+"Download");
			};
		break;
		case "bGeneral":
			for (i=1;i<vPages.length;i++) {
				setColorDefault(vPages[i]);
				show(vPages[i]+"Download");
			};
		break;
		default:
			for (i=1;i<vPages.length;i++) {
				setColorDefault(vPages[i]);
				hide(vPages[i]+"Download");
			};

	};
	if (pButtonID != "") {
		show(pButtonID+"Page");
		show(pButtonID+"Download");
		setColorSelected(pButtonID);
	};
};

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
		alert("setButtonColor()-Call pID="+pID+" does not exist!");
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
		alert("hide()-Call pID="+pID+" does not exist!");
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
};
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
