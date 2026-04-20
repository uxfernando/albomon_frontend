import { BattleStatus } from "@/enums/IBattle";
import { IPlayer } from "./IPlayer";

export interface IBattle {
  id: string;
  players: IPlayer[];
  status: BattleStatus;
  winner: string | null;
  currentTurnPlayerId: string | null;
}

export interface BattleTurnResult {
  damageDealt: number;
  attacker: string;
  defender: string;
}
