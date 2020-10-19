import {observable} from "mobx";
import {MatchmakingMode} from "../util/matchmaking-mode";

export class Game {
  @observable
  public searchingMode?: MatchmakingMode;

  @observable
  public activeMode: MatchmakingMode = MatchmakingMode.RANKED;
  @observable

  public inQueue: number = 3;

  cancelSearch() {
    this.searchingMode = undefined;
  }

  startSearch(activeMode: MatchmakingMode) {
    this.searchingMode = activeMode;
  }
}
