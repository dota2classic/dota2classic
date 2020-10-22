import { action, observable, observe } from "mobx";
import io from "socket.io-client";
import { MatchmakingMode } from "../util/matchmaking-mode";
import { Steam } from "./Steam";
import {
  GameFound,
  LauncherServerStarted,
  Messages,
  ReadyCheckUpdate,
  UpdateQueue,
} from "./messages";

const isDev = process.env.DEV === "true";

interface PendingGameInfo {
  mode: MatchmakingMode;
  accepted: number;
  total: number;
  roomID: string;
  iAccepted: boolean;
  serverURL?: string;
}

export class Game {
  @observable
  public searchingMode?: MatchmakingMode;

  @observable
  public activeMode: MatchmakingMode = MatchmakingMode.SOLOMID;

  @observable
  public pendingGame: PendingGameInfo | undefined = undefined;

  @observable inQueue: {
    [key in MatchmakingMode]: number;
  } = {
    [MatchmakingMode.ABILITY_DRAFT]: 0,
    [MatchmakingMode.RANKED]: 0,
    [MatchmakingMode.UNRANKED]: 0,
    [MatchmakingMode.SOLOMID]: 0,
    [MatchmakingMode.DIRETIDE]: 0,
    [MatchmakingMode.GREEVILING]: 0,
    [MatchmakingMode.TOURNAMENT]: 0,
  };

  private socket!: SocketIOClient.Socket;

  constructor(private readonly steam: Steam) {
    // this.socket = io(isDev ? "ws://localhost:5010" : "ws://5.101.50.140:5010", {
    this.socket = isDev
      ? io("ws://localhost:5010", { transports: ["websocket"] })
      : io("ws://5.101.50.140", {
          path: "/launcher",
          transports: ["websocket"],
        });
    observe(this.steam, "steamID", (steamId) => {
      if (steamId) {
        this.authorize();
      } else {
        console.log(`No steam id, no auth yet`);
      }
    });
    this.socket.on("connect", () => {
      this.authorize();
    });

    this.socket.on(Messages.QUEUE_UPDATE, this.updateQueue);
    this.socket.on(Messages.GAME_FOUND, this.gameFound);
    this.socket.on(Messages.READY_CHECK_UPDATE, this.updateReadyCheck);
    this.socket.on(Messages.SERVER_STARTED, this.joinGame);
  }

  private joinGame = (data: LauncherServerStarted) => {
    console.log("YEAH! time to join da game!", data.url);

    if (this.pendingGame) {
      this.pendingGame.serverURL = data.url;
    }
  };

  @action
  private gameFound = ({ mode, total, roomID, accepted }: GameFound) => {
    this.pendingGame = {
      mode,
      accepted,
      total,
      roomID,
      iAccepted: false,
    };

    new Audio("match.mp3").play();
  };

  private updateReadyCheck = (data: ReadyCheckUpdate) => {
    if (this.pendingGame?.roomID === data.roomID) {
      this.pendingGame.accepted = data.accepted;
      this.pendingGame.total = data.total;
    }
  };

  private updateQueue = (data: UpdateQueue) => {
    this.inQueue[data.mode] = data.inQueue;
  };

  private authorize() {
    this.socket.emit(Messages.AUTH, this.steam.steamID);
  }

  cancelSearch() {
    this.socket.emit(Messages.LEAVE_ALL_QUEUES);
    this.searchingMode = undefined;
  }

  startSearch(activeMode: MatchmakingMode) {
    this.socket.emit(Messages.ENTER_QUEUE, {
      mode: activeMode,
    });
    this.searchingMode = activeMode;
  }

  public acceptPendingGame = () => {
    this.socket.emit(Messages.SET_READY_CHECK, {
      roomID: this.pendingGame?.roomID,
      accept: true,
    });
    if (this.pendingGame) this.pendingGame.iAccepted = true;
  };
  public declinePendingGame = () => {
    this.socket.emit(Messages.SET_READY_CHECK, {
      roomID: this.pendingGame?.roomID,
      accept: false,
    });
    this.searchingMode = undefined;
    this.pendingGame = undefined;
  };
}
