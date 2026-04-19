import { useEffect, useState } from "react";
import { useSessionStore } from "@/store/useSessionStore";
import { BattleService } from "@/services/BattleService";
import { SocketService } from "@/services/SocketService";
import { BattleData } from "@/types/battle";

export const useBattleLobby = () => {
  const nickname = useSessionStore((state) => state.nickname);
  const serverIp = useSessionStore((state) => state.serverIp);
  const [battleData, setBattleData] = useState<BattleData | null>(null);

  useEffect(() => {
    const joinBattle = async () => {
      if (!nickname || !serverIp) return;
      const result = await BattleService.joinBattle(serverIp, nickname);
      if (result.success) {
        setBattleData(result.battle);
      }
    };

    joinBattle();
  }, [nickname, serverIp]);

  useEffect(() => {
    if (!nickname || !serverIp) return;

    const socket = SocketService.connect(serverIp);

    if (socket) {
      SocketService.joinLobby(nickname);

      SocketService.onPlayerJoined((playerNickname: string) => {
        console.log(`${playerNickname} joined the lobby!`);
      });

      SocketService.onBattleUpdated((battle: BattleData) => {
        console.log("Battle updated:", battle);
        setBattleData(battle);
      });
    }

    return () => {
      SocketService.offLobbyEvents();
    };
  }, [nickname, serverIp]);

  return {
    nickname,
    battleData,
  };
};
