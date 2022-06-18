import {
  app,
  BrowserWindow,
  globalShortcut,
  ipcMain,
  Menu,
  MenuItem,
  powerMonitor,
  screen,
  shell,
  Tray,
} from "electron";
import electronReload from "electron-reload";
import path from "path";
const isDev = process.env.NODE_ENV === "development";
let tray: Tray | null = null;

let splashWindow: BrowserWindow;
let mainWindow: BrowserWindow;

if (isDev) {
  // console.log("electron", electronReload);
  // require("electron-reload")(__dirname, {
  //   electron: path.resolve(
  //     __dirname,
  //     process.platform === "win32"
  //       ? "../node_modules/electron/dist/electron.exe"
  //       : "../node_modules/.bin/electron"
  //   ),
  // });
}

const createSplash = () => {
  splashWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    frame: false,
    resizable: false,
    transparent: true,
    show: false,
    skipTaskbar: true,
    alwaysOnTop: true,
  });

  splashWindow.loadFile(path.resolve(__dirname, "renderer", "splash.html"));

  splashWindow.once("ready-to-show", () => {
    splashWindow.show();
  });
};

const createMainWindow = () => {
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.workAreaSize;

  mainWindow = new BrowserWindow({
    width: 310,
    height: 310,
    transparent: true,
    frame: false,
    movable: true,
    resizable: true,
    show: true,
    webPreferences: {
      preload: path.resolve(__dirname, "preload.js"),
    },
  });
  mainWindow.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
  mainWindow.setPosition(width - 400, height - 300);

  const handleUrlOpen = async (event: Electron.Event, url: string) => {
    if (url.match(/^http/)) {
      event.preventDefault();
      shell.openExternal(url);
    }
  };

  mainWindow.webContents.on("will-navigate", handleUrlOpen);
  mainWindow.webContents.on("new-window", handleUrlOpen);

  mainWindow.loadFile(path.resolve(__dirname, "renderer", "app.html"));
};

// 二重起動の防止
const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
  app.quit();
}

app.once("ready", async () => {
  //   globalShortcut.register("Alt+Space", async () => {
  //     mainWindow.webContents.send("reset");
  //     if (mainWindow.isVisible()) {
  //       mainWindow.hide();
  //     } else {
  //       mainWindow.show();
  //       mainWindow.focus();
  //     }
  //   })

  // createSplash();
  createMainWindow();
  // mainWindow.hide();

  const iconPath = path.resolve(
    __dirname,
    "icons",
    `icon16.${process.platform === "win32" ? "ico" : "png"}`
  );
  tray = new Tray(iconPath);
  tray.setContextMenu(
    Menu.buildFromTemplate([
      {
        label: "Reload",
        click: () => {
          mainWindow.reload();
        },
      },
      {
        type: "separator",
      },
      {
        label: "Exit",
        role: "quit",
      },
    ])
  );

  await new Promise((resolve) => setTimeout(resolve, 3500));

  //   splashWindow.hide();
  //   splashWindow.destroy();

  if (process.platform !== "win32") {
    powerMonitor.once("shutdown", () => {
      app.quit();
    });
  }
});

app.on("browser-window-blur", () => {
  // mainWindow.webContents.send("reset");
  // mainWindow.hide();
});

app.once("window-all-closed", () => {
  globalShortcut.unregisterAll();
});

process.once("exit", () => {
  globalShortcut.unregisterAll();
});

// ipc通信定義
// ipcMain.handle(
//   "getLinks",
//   (event: Electron.IpcMainInvokeEvent, inputVal: string) =>
//     searchLinks(inputVal)
// );
