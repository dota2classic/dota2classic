import { app, BrowserWindow, ipcMain } from "electron";
import * as path from "path";
import { format as formatUrl } from "url";
import { exec } from "child_process"
const isDevelopment = process.env.NODE_ENV !== "production";

// global reference to mainWindow (necessary to prevent window from being garbage collected)
let mainWindow;


ipcMain.on('launchgame', (evt, arg) => {
  const cmd = `cd ${arg.appDir} && rundota.exe ${arg.gameDir} ${arg.filename}`
  console.log(cmd);
  exec(cmd);
})
function createMainWindow() {
  const iconPath = path.join(__dirname, "../../static", "logo.jpg");
  console.log(iconPath);
  const window = new BrowserWindow({
    webPreferences: { nodeIntegration: true },
    title: "dota2classic",
    width: 920,
    height: 680,
    icon: path.join(__dirname, "../../static", "logo.png")
  });
  window.setMenuBarVisibility(false)

  window.setResizable(false);
  window.setMaximizable(false);

  if (isDevelopment) {
    // window.webContents.openDevTools();
  }

  if (isDevelopment) {
    window.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`);
  } else {
    window.loadURL(
      formatUrl({
        pathname: path.join(__dirname, "index.html"),
        protocol: "file",
        slashes: true,
      })
    );
  }


  window.webContents.once("did-frame-finish-load", function (event) {
    console.log(`Checking for update`)
    // todo check update
  })

  window.on("closed", () => {
    mainWindow = null;
  });

  window.webContents.on("devtools-opened", () => {
    window.focus();
    setImmediate(() => {
      window.focus();
    });
  });

  return window;
}

// quit application when all windows are closed
app.on("window-all-closed", () => {
  // on macOS it is common for applications to stay open until the user explicitly quits
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // on macOS it is common to re-create a window even after all windows have been closed
  if (mainWindow === null) {
    mainWindow = createMainWindow();
  }
});

// create main BrowserWindow when electron is ready
app.on("ready", () => {
  mainWindow = createMainWindow();
});
