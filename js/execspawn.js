function updateSoftware() {
  vAnswer = confirm("Do want to update PanDocElectron with GIT!");
  if (vAnswer) {
    //runShellCommand("cd \""+__dirname+"\"; git update");
    alert("Update of PanDocElectron was performed with GIT.\nPlease restart PanDocElectron");
  } else {
    alert("CANCEL: Updating Software was cancelled!");
  };
};

function updateTemplates() {
  vAnswer = confirm("Do want to update the Templates PanDoc with GIT!");
  if (vAnswer) {
    //runShellCommand("cd \""+__dirname+"\"; git update");
    // get Templates Dirname
    // run git pull origin master
    alert("Updated the PanDoc Templates was successful with GIT.");
  } else {
    alert("CANCEL: Updating Templates was cancelled!");
  };
}


function whichPath(pCommand,pDOM,pDefaultCommand) {
  var vDefaultCommand = pDefaultCommand || pCommand;
  var vNode = document.getElementById(pDOM);
  if (vNode) {
    const child = exec("/usr/bin/which "+pCommand,
     (error, stdout, stderr) => {
       console.log(`stdout: ${stdout}`);
       //alert(`stdout: ${stdout}`);
       if (error !== null) {
         console.log(`exec error: ${error}`);
         //alert("Settings Error:\nCommand '"+pCommand+"' not found or no permission.\nPlease install '"+pCommand+"'!");
         vNode.innerHTML = vDefaultCommand;
       } else {
         if (`${stdout}` != "") {
           vNode.innerHTML = `${stdout}`;
           console.log("'"+pCommand+"' was successful");
         } else {
           alert("Command '"+pCommand+"' is undefined!\nwhichPath():555 - index.html");
           vNode.innerHTML = vDefaultCommand;
           }
       }
    });
  } else {
    alert("DOM Node ["+pDOM+"] is undefined");
  };
}

function callPandoc (pShellHash) {
  console.log("callPandoc() dummy call with no operation yet");
};

function X_callPandoc (pShellHash) {
  const exec = require('child_process').exec;
  var vShellCMD = "/bin/sh ";
  //vShellCMD = "";
  if (getOperatingSystem() == "Windows") {
    vShellCMD = "";
  };
  exec(pShellHash['filename'], (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    };
    console.log(`stdout: ${stdout}`);
  });

}

function execCommand (pCommand) {
  const exec = require('child_process').exec;
  exec(pCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`execCommand() Error: ${error}`);
      return;
    };
    console.log(`execCommand()-Call: ${stdout}`);
  });
}

function runShellCommand (pCommand,pShellHash) {
  //pCommand="ls -a";
  if (pShellHash) {
    pShellHash["savefile"] += "Y";
    pShellHash["commands"] +="\n"+pCommand;
  } else {
    console.log("pShellHash['command'] not appended for ''"+ pCommand+"'");
  };
  console.log("runShellCommand: "+ pCommand);
  const child = exec(pCommand,
   (error, stdout, stderr) => {
     console.log(`stdout: ${stdout}`);
     //alert(`stdout: ${stdout}`);
     if (error !== null) {
       console.log(`exec error: ${error}`);
     } else {
       console.log("'"+pCommand+"' was successful");
     }
 });
}


function execFileCommand(pExecutable,pParamArray) {
  //var child = require('child_process').execFile;
  //var pExecutable = "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe";
  const execFile = require('child_process').execFile;

  const child = execFile(pExecutable, pParamArray, (error, stdout, stderr) => {
      if (error) {
          console.error('stderr', stderr);
          throw error;
      };
      console.log('stdout', stdout);
  });
}

function spawnCommand(pExecutable,pParamArray) {
  //var child = require('child_process').execFile;
  var spawn = require('child_process').spawn;
  //var pExecutable = "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe";

  spawn(pExecutable, pParamArray, function(err, data) {
      console.log(err)
      console.log(data.toString());
    });
}
