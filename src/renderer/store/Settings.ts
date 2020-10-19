import { observable } from "mobx";
import { remote } from "electron";
import * as fs from "fs";
import * as path from "path";

export default class Settings {
  private static configFileName = "settings.json";
  @observable
  public path_681?: string;

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
      } catch (e) {}
    } else {
      this.updateConfig();
    }
  }


  public set681Path(path: string){
    this.path_681 = path;
    this.updateConfig();
  }

  private updateConfig() {
    const config = JSON.stringify({
      path_681: this.path_681,
    });
    const filePath = path.join(
      remote.app.getPath("userData"),
      Settings.configFileName
    );

    fs.writeFileSync(filePath, config);
  }
}
