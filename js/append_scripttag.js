function append_scripttag(pURL, pOnLoadCall) {
    // Call in body, so that head-tag is closed
    var script = document.createElement('script');
    script.src = url; //source
    if (pOnLoadCall) {
      script.onload = pOnLoadCall;
    };
    document.head.appendChild(script);
}

function callOnLoad {
  // call this script when 
}
