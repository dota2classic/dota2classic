import {observable} from "mobx";
import {MatchmakingMode} from "../util/matchmaking-mode";

export class Game {


  @observable
  public searchingMode?: MatchmakingMode = MatchmakingMode.RANKED
}