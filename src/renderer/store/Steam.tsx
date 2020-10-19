// @ts-ignore

import greenworks from "greenworks";
import {computed, observable} from "mobx";
import {steam64to32} from "../util/steamids";

export class Steam {
  @observable steamID?: string;
  @observable personaName?: string;

  @observable userImage?: string;

  @observable
  public isLoading = true;

  @computed
  public get signedIn(): boolean {
    return !!this.steamID;
  }

  @computed
  public get steam32(): string | undefined {
    return this.steamID && steam64to32(this.steamID);
  }

  @computed
  public online: boolean = false;

  constructor() {
    greenworks.init();
    // this.sync();
  }

  public sync() {
    try {
      const info = greenworks.getSteamId();
      this.steamID = info.steamId;
      this.personaName = info.screenName;
    } catch (e) {
    } finally {
      this.isLoading = false;
    }
  }
}
