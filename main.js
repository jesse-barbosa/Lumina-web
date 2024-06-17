const { app, BrowserWindow, Menu } = require('electron');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      nodeIntegration: true
    }
  });

  mainWindow.loadFile('index.html');

  Menu.setApplicationMenu(null);

  mainWindow.setMenuBarVisibility(false);
}

app.on('ready', createWindow);
