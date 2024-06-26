// electron/electron.js
import { join, dirname } from "path";
import { app, BrowserWindow } from "electron";
import { fileURLToPath } from "url";

const isDev = process.env.IS_DEV == "true" ? true : false;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: join(__dirname, "preload.mjs"),
      nodeIntegration: true,
      backgroundThrottling: false,
    },
    icon: join(__dirname, "assets/icons/png/koreanMedicineBlackIcon.png"),
  });

  // and load the index.html of the app.
  // win.loadFile("index.html");
  mainWindow.loadURL(
    isDev
      ? "http://localhost:5173"
      : `file://${join(__dirname, "../dist/index.html")}`
  );
  // Open the DevTools.
  if (isDev) {
    mainWindow.webContents.openDevTools(process.execPath);
  }
  // set app Id for notification
  app.setAppUserModelId("koreanMedicineTimer");
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  console.log(__dirname);
  createWindow();
  app.setName("koreanMeidicneTime");
  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
