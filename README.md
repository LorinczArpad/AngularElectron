# AngularElectron

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

# Angular-Electron SetUp here:

Video Tutorial:https://www.youtube.com/watch?v=Ckn5rH7q4P8&ab_channel=IsraelQuiroz

## Create Angular application
```bash
 ng new AppName
```
## Update Angular using 
```bash
ng update
ng update @angular/cli @angular/core
```
## Add Electron
```bash
 npm install electron
```
## Modify index.html like this 
```html
<base href="./">
```
## Add an app.json to your root directory copy paste this:
```javascript
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
        mainWindow.loadFile(path.join('dist/angular-electron/index.html'));
    } catch (error) {
        console.error('Error loading file:', error);
    }
}

app.whenReady().then(createWindow);
```
## Modify package.json
```json
{
  "name": "angular-electron",
  "version": "0.0.0",
  "main": "app.js",
  "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build",
    "watch": "ng build --watch --configuration development",
    "test": "ng test",
    "electron": "electron .",
    "electron-build": "ng build && electron ."
  }
``` 
With main electron and electron-build
## Run your Application
```bash
npm run electron-build
```
## Install electron packager
```bash
npm install -g electron-packager
```
## For Build use
```bash
electron-packager ./ appname --platform=win32 --overwrite
```