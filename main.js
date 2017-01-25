const electron = require('electron')
// Module to control application life.
//const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow
//----MENU---------
const Menu = electron.Menu
const app = electron.app
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 1048, height: 720})

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/index.html`)

  // Open the DevTools.
  //mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}


//--------MENU---------------------
let template = [{
  label: 'File',
  submenu: [{
    label: 'New',
    accelerator: 'CmdOrCtrl+N',
    click() {
      console.log("MENU CALL: New Project");
      mainWindow.webContents.send('menucall', 'setPage("bNew")');
    }
  }, {
    label: 'Open',
    accelerator: 'CmdOrCtrl+O',
    click() {
      console.log("MENU CALL: Open Input File");
      mainWindow.webContents.send('menucall', 'openInputFile("")');
    }
  }, {
    label: 'Load Config',
    click() {
      console.log("MENU CALL: Load Config");
      mainWindow.webContents.send('menucall', 'loadConfig()');
    }
  }, {
    type: 'separator'
  }, {
    label: 'Save Config',
    accelerator: 'CmdOrCtrl+S',
    click() {
      console.log("MENU CALL: Save Config");
      //mainWindow.webContents.send('menucall', 'vEProof__QID__.saveFile_Menu()');
      mainWindow.webContents.send('menucall', 'saveConfig()');
    }
  }, {
    label: 'Convert File',
    accelerator: 'Shift+CmdOrCtrl+C',
    //accelerator: 'CmdOrCtrl+Y',
    click() {
      console.log("MENU CALL: Convert File");
      //mainWindow.webContents.send('menucall', 'vEProof__QID__.saveAsOpenDialog()');
      mainWindow.webContents.send('menucall', 'convertFile()');
    }
  }, {
    label: 'Preferences',
    accelerator: 'Shift+CmdOrCtrl+P',
    click() {
      console.log("MENU CALL: Settings");
      mainWindow.webContents.send('menucall', 'setPage("bSettings")');
    }
  }, {
    label: 'Templates',
    accelerator: 'Shift+CmdOrCtrl+T',
    click() {
      console.log("MENU CALL: Templates");
      mainWindow.webContents.send('menucall', 'setPage("bTemplates")');
    }
  }, {
    type: 'separator'
  }, {
    label: 'Quit',
    accelerator: 'CmdOrCtrl+Q',
    role: 'quit'
  }]
}, {
  label: 'Edit',
  submenu: [{
    label: 'Undo',
    accelerator: 'CmdOrCtrl+Z',
    role: 'undo'
  }, {
    label: 'Redo',
    accelerator: 'Shift+CmdOrCtrl+Z',
    role: 'redo'
  }, {
    type: 'separator'
  }, {
    label: 'Cut',
    accelerator: 'CmdOrCtrl+X',
    role: 'cut'
  }, {
    label: 'Copy',
    accelerator: 'CmdOrCtrl+C',
    role: 'copy'
  }, {
    label: 'Paste',
    accelerator: 'CmdOrCtrl+V',
    role: 'paste'
  }, {
    label: 'Select All',
    accelerator: 'CmdOrCtrl+A',
    role: 'selectall'
  }]
}, {
  label: 'View',
  submenu: [{
    label: 'Reload',
    accelerator: 'CmdOrCtrl+R',
    click: function (item, focusedWindow) {
      if (focusedWindow) {
        // on reload, start fresh and close any old
        // open secondary windows
        if (focusedWindow.id === 1) {
          BrowserWindow.getAllWindows().forEach(function (win) {
            if (win.id > 1) {
              win.close()
            }
          })
        }
        focusedWindow.reload()
      }
    }
  }, {
    label: 'Toggle Full Screen',
    accelerator: (function () {
      if (process.platform === 'darwin') {
        return 'Ctrl+Command+F'
      } else {
        return 'F11'
      }
    })(),
    click: function (item, focusedWindow) {
      if (focusedWindow) {
        focusedWindow.setFullScreen(!focusedWindow.isFullScreen())
      }
    }
  }, {
    label: 'Toggle Developer Tools',
    accelerator: (function () {
      if (process.platform === 'darwin') {
        return 'Alt+Command+I'
      } else {
        return 'Ctrl+Shift+I'
      }
    })(),
    click: function (item, focusedWindow) {
      if (focusedWindow) {
        focusedWindow.toggleDevTools()
      }
    }
  }, {
    type: 'separator'
  }, {
    label: 'Wiki Download',
    click() {
      console.log("MENU CALL: Wiki-Download");
      mainWindow.webContents.send('menucall', "setPage('bWebInput')");
    }
  }, {
    label: 'Media Download',
    click() {
      console.log("MENU CALL: Media Download");
      mainWindow.webContents.send('menucall', "setPage('bMediaDownload')");
    }
  }, {
    label: 'Bibliography',
    click() {
      console.log("MENU CALL: Toggle Main Control e-Proof");
      mainWindow.webContents.send('menucall', "setPage('bBibliography')");
    }
  }]
}, {
  label: 'Window',
  role: 'window',
  submenu: [{
    label: 'Minimize',
    accelerator: 'CmdOrCtrl+M',
    role: 'minimize'
  }, {
    label: 'Close',
    accelerator: 'CmdOrCtrl+W',
    role: 'close'
  }, {
    type: 'separator'
  }, {
    label: 'Reopen Window',
    accelerator: 'CmdOrCtrl+Shift+T',
    enabled: false,
    key: 'reopenMenuItem',
    click: function () {
      app.emit('activate')
    }
  }]
}, {
  label: 'Help',
  role: 'help',
  submenu: [{
        label: 'Online PanDoc',
        click: function () {
          electron.shell.openExternal('http://pandoc.org/try')
        }
    }, {
        label: 'Learn about PanDocElectron',
        click: function () {
          electron.shell.openExternal('http://niebert.github.io/PanDocElectron/')
        }
    }, {
        label: 'Learn about PanDoc',
        click: function () {
          electron.shell.openExternal('http://pandoc.org/examples')
        }
    }, {
        label: 'Learn about Electron',
        click: function () {
          electron.shell.openExternal('http://electron.atom.io')
        }
    }]
}]

function addUpdateMenuItems (items, position) {
  if (process.mas) return

  const version = electron.app.getVersion()
  let updateItems = [{
    //label: `Version ${version}`,
    label: "Version "+require('./package.json').version,
    enabled: false
  }, {
    label: 'Checking for Update',
    enabled: false,
    key: 'checkingForUpdate'
  }, {
    label: 'Check for Update',
    visible: true,
    key: 'checkForUpdate',
    click: function () {
      require('electron').autoUpdater.checkForUpdates()
    }
  }, {
    label: 'Restart and Install Update',
    enabled: true,
    visible: false,
    key: 'restartToUpdate',
    click: function () {
      require('electron').autoUpdater.quitAndInstall()
    }
  }]

  items.splice.apply(items, [position, 0].concat(updateItems))
}

function findReopenMenuItem () {
  const menu = Menu.getApplicationMenu()
  if (!menu) return

  let reopenMenuItem
  menu.items.forEach(function (item) {
    if (item.submenu) {
      item.submenu.items.forEach(function (item) {
        if (item.key === 'reopenMenuItem') {
          reopenMenuItem = item
        }
      })
    }
  })
  return reopenMenuItem
}

if (process.platform === 'darwin') {
  const name = electron.app.getName()
  template.unshift({
    label: name,
    submenu: [{
      label: `About ${name}`,
      role: 'about'
    }, {
      type: 'separator'
    }, {
      label: 'Services',
      role: 'services',
      submenu: []
    }, {
      type: 'separator'
    }, {
      label: `Hide ${name}`,
      accelerator: 'Command+H',
      role: 'hide'
    }, {
      label: 'Hide Others',
      accelerator: 'Command+Alt+H',
      role: 'hideothers'
    }, {
      label: 'Show All',
      role: 'unhide'
    }, {
      type: 'separator'
    }, {
      label: 'Quit',
      accelerator: 'Command+Q',
      click: function () {
        app.quit()
      }
    }]
  })

  // Window menu.
  template[3].submenu.push({
    type: 'separator'
  }, {
    label: 'Bring All to Front',
    role: 'front'
  })

  addUpdateMenuItems(template[0].submenu, 1)
}

if (process.platform === 'win32') {
  const helpMenu = template[template.length - 1].submenu
  addUpdateMenuItems(helpMenu, 0)
}

app.on('ready', function () {
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu);
  createWindow();
})

app.on('browser-window-created', function () {
  let reopenMenuItem = findReopenMenuItem()
  if (reopenMenuItem) reopenMenuItem.enabled = false
})

app.on('window-all-closed', function () {
  let reopenMenuItem = findReopenMenuItem()
  if (reopenMenuItem) reopenMenuItem.enabled = true
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('X_ready', createWindow)

// Quit when all windows are closed.
app.on('X_window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
