'use strict'

import { app, protocol, BrowserWindow, BrowserView, ipcMain } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
const path = require("path")
const fs = require("fs")
const isDevelopment = process.env.NODE_ENV !== 'production'

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win
let view
// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

async function createWindow () {
  view = new BrowserView()
  // Create the browser window.
  win = new BrowserWindow({
    width: 600,
    height: 400,
    backgroundColor: '#00000000',
    frame: false,
    alwaysOnTop: false,
    transparent: true,
    maximizable: false,
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      webviewTag: true,
      enableRemoteModule: false, // turn off remote
      preload: path.join(__dirname, 'preload.js')
    }
  })
  win.setBrowserView(view)
  view.setBounds({ x: 48, y: 48, width: 552, height: 352 })
  view.setAutoResize({width:true, height:true, horizontal: true, vetical:true})
  view.setBackgroundColor('#00000000')
  view.webContents.loadURL('https://v3.vuejs.org/guide/introduction.html')
  view.webContents.setZoomFactor(0.8)
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) console.log('')//win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }

  win.on('closed', () => {
    win = null
  })
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  console.log("called")
  if (win === null) {
    createWindow()
  }
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}

ipcMain.on('close-app',()=>{
  win.close()
})

ipcMain.on('resize-view',(event, arg)=>{
  let newBounds = { x: Math.floor(arg.x), y: Math.floor(arg.y), width: Math.floor(arg.width), height: Math.floor(arg.height) }
  view.setBounds(newBounds)
  //view.webContents.setZoomFactor(0.8)
})

ipcMain.on('go-back', ()=> {
  view.webContents.goBack()
})

ipcMain.on('go-forward', ()=> {
  view.webContents.goForward()
})

ipcMain.on('click-through', () => {
 //console.log(document.getElementById('clickThrough'))
 //win.setIgnoreMouseEvents(true, { forward: true })
 //console.log(win.setIgnoreMouseEvents)
})
ipcMain.on('disable-click-through', () => {
  win.setIgnoreMouseEvents(false)
})

ipcMain.on('load-wiki', (event, arg) => {
  view.webContents.loadURL(arg)
})