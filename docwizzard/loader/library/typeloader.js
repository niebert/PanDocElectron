//#################################################
//# JS ArticleGenerator                           #
//# University of Koblenz-Landau                  #
//# File:  typeloader.js                          #
//# email: niehaus@uni-landau.de                  #
//# created               02.06.2015,             #
//# last modifications    27.01.2016,             #
//# Author:  Engelbert Niehaus                    #
//# GNU Public License 1999-2016                  #
//#################################################


var vPaperType = top.getNonTerm(document.location.href);
top.document.getElementById("PAPERTYPE").innerHTML = vPaperType;
var vStr = document.getElementById("DISPLAY").innerHTML;
var vLinkStr = top.linkedNonTerms(vStr)
//vStr.replace(/([A-Z][A-Z]+_[A-Z][_A-Z]+)/g, '<a href="loader/$1.html" target="iLoader">$1<\/a>');
document.getElementById("EDITOR").innerHTML = vLinkStr;
