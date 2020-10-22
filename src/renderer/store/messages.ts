import {MatchmakingMode} from "../util/matchmaking-mode";

export enum Messages {
  AUTH = 'AUTH',
  QUEUE_UPDATE = "QUEUE_UPDATE",
  ENTER_QUEUE = "ENTER_QUEUE",
  LEAVE_ALL_QUEUES = 'LEAVE_ALL_QUEUES'
}

export interface UpdateQueue {
  mode: MatchmakingMode;
  inQueue: number;
}

export interface EnterQueue {
  mode: MatchmakingMode
}