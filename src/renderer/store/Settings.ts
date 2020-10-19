import {observable} from "mobx";
// import { remote } from "electron"
export default class Settings {
  @observable
  public path_681?: string;

  constructor() {
    // const settingsAppData = remote.app.getPath("appData");
    // console.log(`hEY`, settingsAppData, remote.app.getPath("home"), remote.app.getPath("userData"));
  }
}
