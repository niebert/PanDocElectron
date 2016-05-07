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
