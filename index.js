const { app, BrowserWindow } = require("electron")
const path = require("path")
const { autoUpdater } = require("electron-updater")
const log = require("electron-log")
log.transports.file.resolvePath = () => path.join(__dirname, "logs/main.log")
log.info("Hello, log")
log.warn("Some problem appears")

function createWindow() {
  const startUrl = "public/index.html"
  const win = new BrowserWindow({
    minWidth: 800,
    minHeight: 500,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
    },
    minimizable: false,
    title: "SREE CHAKRA SEWING",
  })

  win.setMenu(null)
  win.setTitle("Update Test")
  win.loadFile(path.join(__dirname, "index.html"))
}
app.on("ready", createWindow)

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit()
  }
})

app.on("activate", function () {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
    autoUpdater.checkForUpdatesAndNotify()
  }
})

autoUpdater.on("update-available", () => {
  log.info("update-available")
})

autoUpdater.on("checking-for-update", () => {
  log.info("checking-for-update")
})
