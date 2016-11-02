//#################################################
//# JS ArticleGenerator                           #
//# University of Koblenz-Landau                  #
//# File:  tables.js                              #
//# email: niehaus@uni-landau.de                  #
//# created               02.06.2015,             #
//# last modifications    27.01.2016,             #
//# Author:  Engelbert Niehaus                    #
//# GNU Public License 1999-2016                  #
//#################################################
//---------------------------------------------

function loadTable(pTable) {
	vTableHash[pTableID] = pTable;
	//vCurrentTable = vTableHash[pTableID];
	setTimeout("window.frames['iLoadTable'].location = 'tables/TABLE.html'",200);
};

function loadAppendTable(pAppendID,pTableID,pRowFile,pOutTable,pOutRow,pTableContent) {
	//appends the content of table body (without rows) to the DOM ID pAppendID
	//defines the TableID
	var vTable = {}
	vTable["ID"] = pTableID;
	vTable["OutTable"] = pOutTable.replace(/___TABLEID___/g,"tab"+pTableID);
	// pOutTable contains the insert Template:
	//-----------------------------------
	//   Now we list all authors:
	//   <table>
	//   ___ALLROWS___
	//   </table>
	//   This was the list of authors.
	//-----------------------------------
	vTable["OutRow"] = pOutRow.replace(/___TABLEID___/g,pTableID);
	vTable["pRowFile"] = pRowFile; // e.g. loader/AUTHOR.html
	vTable["Out"] = "generated updated table content of "+pTableID;
	// The table table ID id e.g. "AUTHOR", the table ID is unique in the output
	// The row class is
	// defines the load file for adding rows e.g. "AUTHORROW.html"
	// ___ALLROWS___ will be replaced by loop concact strings over all rows
	// of the class class="AUTHORROW"
	// By pressing the [save] Button all non standard table contents are updated
	// in the display area of the content
	vTableHash[pTableID] = vTable;
	vCurrentTable = vTable;
	setTimeout("window.frames['iLoadTable'].location = 'tables/TABLE.html'",200);
};

function updateAllTableDisplay() {
	for (var iID in vTableHash) {
		updateTableDisplay(iID)
	};
};

function updateTableDisplay(pID) {
	if (vTableHash[pID]) {
		var vTable = vTableHash[pID];
		write2innerHTML(vTable["AppendID"],vTable["Out"]);
	} else {
		alert("Table with ID='"+pID+"' does not exist or was not loaded!");
	};
};


function clearTable(pTableID) {
	alert("tables.js:65 - clearTable('"+pTableID+"')");
};
function addRow(pTableID) {
	alert("tables.js:68 - addRow('"+pTableID+"')");
};


function deleteTableRow(tableID,pRowID) {
	deleteRow(tableID,tableID+"R"+pRowCount);
};

function deleteRow(tableID,pRowID) {
	try {
		var table = document.getElementById(tableID);
		var rowCount = table.rows.length;

		for(var i=0; i<rowCount; i++) {
			var row = table.rows[i];
			//var chkbox = row.cells[0].childNodes[0];
			//if(null != chkbox && true == chkbox.checked) {
			if(row.id == pRowID) {
				table.deleteRow(i);
				rowCount--;
				i--;
			}


		}
	} catch(e) {
		alert(e);
	}
};
