const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });

    try {
        // Load the main HTML file
        mainWindow.loadFile(path.join('dist/angular-electron/index.html'));
    } catch (error) {
        console.error('Error loading file:', error);
    }
}

app.whenReady().then(createWindow);