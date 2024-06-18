const { app, BrowserWindow, Menu } = require('electron');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1150,
    height: 740,
    webPreferences: {
      nodeIntegration: true
    }
  });

  mainWindow.loadFile('index.html');

  Menu.setApplicationMenu(null);

  mainWindow.setMenuBarVisibility(false);
}

app.on('ready', createWindow);
