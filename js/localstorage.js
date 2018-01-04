
function loadConfigLS(pConfig) {
  if (typeof(localStorage.getItem("PDE_config")) !== undefined) {
    var vJSONstring = localStorage.getItem("PDE_config");
    if(vJSONstring) {
      try {
        var vConfig = JSON.parse(vJSONstring);
        writeConfigDOM(vConfig);
        if (pConfig) {
          pConfig = vConfig;
        }
      } catch(e) {
        alert("ERROR: loadConfigLS()"+e); // error in the above string (in this case, yes)!
      }
    };
  };
}

function saveConfigLS(pConfigJSON) {
  var vJSON = pConfigJSON || getConfigDOM();
  var vJSONstring = JSON.stringify(vJSON);
  localStorage.setItem("PDE_config",vJSONstring);
}



function loadDOMLS(pConfig,pID,pDefault) {
  if (typeof(localStorage.getItem(pID)) !== undefined) {
    var vValue = localStorage.getItem(pID);
    if (vValue != "") {
      $("#"+pID).val(vValue);
      pConfig[pID] = vValue;
    } else {
      $("#"+pID).val(pDefault);
      pConfig[pID] = pDefault;
    }
  };
}

function saveDOMLS(pConfig,pID) {
  localStorage.setItem(pID,$("#"+pID).val());
  pConfig[pID] = $("#"+pID).val();
}

function loadInnerLS(pConfig,pID,pDefault) {
  if (typeof(localStorage.getItem(pID)) !== undefined) {
    var vValue = localStorage.getItem(pID);
    if (vValue != "") {
      $("#"+pID).html(vValue);
      pConfig[pID] = vValue;
    } else {
      $("#"+pID).html(pDefault);
      pConfig[pID] = pDefault;
    }
  };
};

function saveInnerLS(pConfig) {
  localStorage.setItem(pID,$("#"+pID).html());
  pConfig[pID] = $("#"+pID).html();
}
