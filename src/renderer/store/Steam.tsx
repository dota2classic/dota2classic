// @ts-ignore

import greenworks from "greenworks";
import { action, computed, observable } from "mobx";
import { steam64to32 } from "../util/steamids";

export class Steam {
  @observable steamID?: string;
  @observable personaName?: string;

  @observable userImage?: string;

  @observable steamRunning?: boolean;

  @observable
  public isLoading = true;

  @observable
  public noUser = true;

  @computed
  public get signedIn(): boolean {
    return !!this.steamID;
  }

  @computed
  public get steam32(): string | undefined {
    return this.steamID && steam64to32(this.steamID);
  }

  constructor() {
    this.sync();
  }

  @action
  public sync() {
    this.isLoading = true;
    try {
      greenworks.init();
      this.steamRunning = true;
    } catch (e) {
      console.log(`Init error`, e);
      if (e.message.includes("not running")) this.steamRunning = false;
      else if(e.message.includes("is running")) this.steamRunning = true;
      return;
    } finally {
      console.log(`Settting loading to false`);
      this.isLoading = false;
    }

    console.log(`After init`);
    try {
      const info = greenworks.getSteamId();
      this.steamID = info.steamId;
      this.personaName = info.screenName;
      this.noUser = false;
    } catch (e) {
      this.noUser = true;
      console.log(`auth error`, e);
    } finally {
      console.log(`Settting loading to false`);
      this.isLoading = false;
    }
  }
}
