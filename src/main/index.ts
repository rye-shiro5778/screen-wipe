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
import path from "path";
const isDev = process.env.NODE_ENV === "development";
const iconPath = path.resolve(
  __dirname,
  "icons",
  `icon16.${process.platform === "win32" ? "ico" : "png"}`
);
let tray: Tray | null = null;
let splashWindow: BrowserWindow;
let mainWindow: BrowserWindow;

const createSplash = () => {
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.workAreaSize;
  splashWindow = new BrowserWindow({
    width: 300,
    height: 300,
    frame: false,
    resizable: false,
    transparent: true,
    show: false,
    skipTaskbar: true,
    alwaysOnTop: true,
  });
  splashWindow.setPosition(width - 400, height - 300);
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
  mainWindow.loadFile(path.resolve(__dirname, "renderer", "app.html"));
};

// 二重起動の防止
const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
  app.quit();
}

const registerGlobalShortcut = () => {
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.workAreaSize;
  const globalShortcutArry: {
    content: string;
    cmd: string;
    callback: () => void;
  }[] = [
    {
      content: "アプリの停止",
      cmd: "CommandOrControl+Shift+Q",
      callback: () => app.quit(),
    },
    {
      content: "カメラのON/OFF",
      cmd: "CommandOrControl+Shift+S",
      callback: () => mainWindow.webContents.send("switchCamera"),
    },
    {
      content: "上移動",
      cmd: "CommandOrControl+Shift+UP",
      callback: () => {
        const [x, y] = mainWindow.getPosition();
        if (y > 20 && y < height + 20) {
          mainWindow.setPosition(x, y - 50);
        }
      },
    },
    {
      content: "下移動",
      cmd: "CommandOrControl+Shift+Down",
      callback: () => {
        const [x, y] = mainWindow.getPosition();
        if (y > 20 && y < height + 20) {
          mainWindow.setPosition(x, y + 50);
        }
      },
    },
    {
      content: "左移動",
      cmd: "CommandOrControl+Shift+Left",
      callback: () => {
        const [x, y] = mainWindow.getPosition();
        if (x > 20 && x < width + 20) {
          mainWindow.setPosition(x - 50, y);
        }
      },
    },
    {
      content: "右移動",
      cmd: "CommandOrControl+Shift+Right",
      callback: () => {
        const [x, y] = mainWindow.getPosition();
        if (x > 20 && x < width + 20) {
          mainWindow.setPosition(x + 50, y);
        }
      },
    },
  ];

  globalShortcutArry.forEach((obj) => {
    const { cmd, content, callback } = obj;
    const ret = globalShortcut.register(cmd, callback);
    if (!ret) {
      console.log(`${cmd}:${content}の登録に失敗`);
    }
  });
};

const createTray = () => {
  tray = new Tray(iconPath);
  tray.setContextMenu(
    Menu.buildFromTemplate([
      {
        label: "Reload",
        click: () => mainWindow.reload(),
      },
      {
        label: "Github",
        click: () =>
          shell.openExternal("https://github.com/rye-shiro5778/screen-wipe"),
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
};

app.once("ready", async () => {
  // 初期設定
  registerGlobalShortcut();
  createTray();

  //
  createSplash();

  createMainWindow();
  mainWindow.hide();

  await new Promise((resolve) => setTimeout(resolve, 2800));

  splashWindow.hide();
  splashWindow.destroy();
  mainWindow.show();

  if (process.platform !== "win32") {
    powerMonitor.once("shutdown", () => {
      app.quit();
    });
  }
});

app.on("browser-window-blur", () => {});

app.once("window-all-closed", () => {
  globalShortcut.unregisterAll();
});

process.once("exit", () => {
  globalShortcut.unregisterAll();
});

// ipc通信定義
ipcMain.handle("switchCamera", (event: Electron.IpcMainInvokeEvent) => {});
ipcMain.handle("opacityDown", (event: Electron.IpcMainInvokeEvent) => {});
ipcMain.handle("opacityUp", (event: Electron.IpcMainInvokeEvent) => {});
