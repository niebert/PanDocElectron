// This library contains functions that cannot be browserified

function X_download4MediaWiki(pArticle,pWikiServer,pCallBack) {
  var vArrSRV = pWikiServer.split(".");
  var vWikiID = "enwikipedia";
  var vArticle = pArticle || "Swarm intelligence"
  if (vArrSRV.length >1) {
    if (vArrSRV[1] == "wikipedia") {
      vArrSRV[1] = "wiki"; // necessary because of site_map "WikiID" encoding (see "js/wtf_wikipedia.js" )
    };
    vWikiID = vArrSRV[0] + vArrSRV[1];
    if (site_map[vWikiID]) {
      console.log("Start download '"+vArticle+"' from MediaWiki '"+pWikiServer+"'");
      wtf.from_api(vArticle, vWikiID, pCallBack);
    } else {
      alert("ERROR: Download from '"+pWikiServer+"' stopped, because WikiID '"+vWikiID+"' is not defined!");
    }
  };
};

function download4MediaWiki(pArticle,pWikiServer,pCallBack) {
  var vArrSRV = pWikiServer.split(".");
  var vWikiID = "enwikipedia";
  if (vArrSRV.length >1) {
    vWikiID = vArrSRV[0] + vArrSRV[1];
  };
  var vArticle = pArticle || "Swarm intelligence"
  wtf.from_api(vArticle, vWikiID, pCallBack);
};

function wtf_callback_demo(markup){// Callback function after success
  console.log("LOG (PlainText result): "+wtf.plaintext(markup));
  // store markup result in textarea
  document.getElementById("wikimarkup").value = markup;
  // store JSON parse result in textarea
  var data = wtf.parse(markup);
  document.getElementById("wikijson").value = JSON.stringify(data,null,4);
};
