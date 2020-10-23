import { computed, observable } from "mobx";
import { remote } from "electron";
import * as fs from "fs";
import * as path from "path";
import * as ws from "windows-shortcuts";
import { ShortcutOptions } from "windows-shortcuts";

export default class Settings {
  private static configFileName = "settings.json";
  @observable
  public path_681?: string;

  @observable
  public path_681_exe?: string;

  @observable
  settingsOpen: boolean = false;

  @computed
  public get path_681_dir(): string | undefined {
    return this.path_681 && path.dirname(this.path_681);
  }

  @computed
  public get path_681_filename(): string | undefined {
    return this.path_681 && path.basename(this.path_681);
  }

  constructor() {
    // const settingsAppData = remote.app.getPath("appData");
    // console.log(`hEY`, settingsAppData, remote.app.getPath("home"), );

    const filePath = path.join(
      remote.app.getPath("userData"),
      Settings.configFileName
    );

    if (fs.existsSync(filePath)) {
      try {
        const config = JSON.parse(fs.readFileSync(filePath).toString());
        this.path_681 = config.path_681 || undefined;
        this.path_681_exe = config.path_681_exe || undefined;
      } catch (e) {}
    } else {
      this.updateConfig();
    }
  }

  public async set681Path(path: string) {
    this.path_681 = path;
    await this.updateConfig();
  }

  private async updateConfig() {
    if (this.path_681 && path.extname(this.path_681).includes("lnk")) {
      console.log("Im lnk")
      // if it is shortcut
      const res = new Promise<ShortcutOptions>((resolve, reject) =>
        ws.query(this.path_681!!, (error, options) => {
          if (error) reject(error);
          else resolve(options);
        })
      );



      const result = await res;

      this.path_681_exe = result.target;
    } else {
      console.log("im exe")
      this.path_681_exe = this.path_681;
    }
    const config = JSON.stringify({
      path_681: this.path_681,
      path_681_exe: this.path_681_exe,
    });

    const filePath = path.join(
      remote.app.getPath("userData"),
      Settings.configFileName
    );

    fs.writeFileSync(filePath, config);
  }
}
