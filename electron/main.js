const { app, BrowserWindow } = require("electron");
const path = require("path");

const isDev = process.env.NODE_ENV === "development";

const ASPECT_RATIO = 1648 / 847.838;
const TITLE_BAR_HEIGHT = 30;
function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 659 + TITLE_BAR_HEIGHT, // 689
    minWidth: 890,
    minHeight: 458 + TITLE_BAR_HEIGHT, // 488
    maxWidth: 1648,
    maxHeight: 848 + TITLE_BAR_HEIGHT, // 878
    autoHideMenuBar: true,
    icon: path.join(__dirname, "../build/icon.ico"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  win.setAspectRatio(1648 / (847.838 + TITLE_BAR_HEIGHT));

  if (isDev) {
    win.loadURL("http://localhost:5173");
    win.webContents.openDevTools();
  } else {
    win.loadFile(path.join(__dirname, "../dist/index.html"));
  }
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
