//#################################################
//# JS ArticleGenerator                           #
//# University of Koblenz-Landau                  #
//# File:  loadtable.js                           #
//# email: niehaus@uni-landau.de                  #
//# created               02.06.2015,             #
//# last modifications    27.01.2016,             #
//# Author:  Engelbert Niehaus                    #
//# GNU Public License 1999-2016                  #
//#################################################
//---------------------------------------------

function loadAppendRow() {
	//appends the content of table body (without rows) to the DOM ID pAppendID
	//defines the TableID
	var vTable = top.vCurrentTable;
	var vTableID vTable["ID"] = ;
	vTable["OutTable"] = pOutTable.replace(/___TABLEID___/g,vTableID);
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
	setTimeout("window.frames['iLoadTable'].location = 'tables/"+vTable["pRowFile"]+".html'",200);
};

