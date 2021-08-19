
// include the Node.js 'path' module at the top of your file
const path = require('path')
const {app, BrowserWindow, Menu} = require('electron')
const DEFINE_DEV = 1;
let win;
let modalPopup;

// Application Menu
const mainAppMenu = [
  {
      label: app.name,
      submenu: [
          { label: 'Settings', click: () => { modalPopup = createModal("src/html/settings.html", win, 450, 450); ; } },
          { type:  'separator' },
          { label: 'List Processed Apps', click: () => { modalPopup = createModal("src/html/list_processed_apps.html", win, 800, 600); ;} },
          { type:  'separator' },
          { label: 'Exit', role: 'quit' }
      ]
  },
  {
      label: 'Window',
      submenu: [
          { label: 'Minimize', role: 'minimize' },
          { label: 'Exit', role: 'quit' },
          { label: 'About', role: 'about' }
      ]
  },
  ...(DEFINE_DEV ? [ 
          {
              label: 'Tools',
              submenu: [
                  { role: 'reload' },
                  { role: 'forceReload' },
                  { role: 'toggleDevTools' },
                  { type: 'separator' },
                  { role: 'resetZoom' },
                  { role: 'togglefullscreen' }
              ]
          }] 
      : []
  )      
]

const createModal = (htmlFile, parentWindow, width, height) => {
  let modal = new BrowserWindow({
    width: width,
    height: height,
    modal: true,
    parent: parentWindow,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      nativeWindowOpen: true
    }
  })

  if (DEFINE_DEV) modal.webContents.openDevTools({mode: "detach"});
  
  modal.setMenu(null);
  modal.loadFile(htmlFile);
  
  return modal;
}

function createWindow () {

    win = new BrowserWindow({
      width: 900,
      height: 800,
      resizable: false, 
      icon: 'res/icon.png', 
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        enableRemoteModule: true,
        nativeWindowOpen: true
      }
    })

    if (DEFINE_DEV) win.webContents.openDevTools({mode: "detach"});

    win.loadFile('src/html/index.html')

  }

app.whenReady().then(() => {
  createWindow();
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
})

// Builds the menu
const menu = Menu.buildFromTemplate(mainAppMenu);
Menu.setApplicationMenu(menu);
