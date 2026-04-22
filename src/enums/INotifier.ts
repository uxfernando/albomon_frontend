export enum NotifierEvent {
  LOBBY_STATUS = "lobby_status",
  BATTLE_START = "battle_start",
  TURN_RESULT = "turn_result",
  BATTLE_END = "battle_end",

  OPPONENT_DISCONNECT = "opponent_disconnect",
}

export enum BusEvent {
  THROW_POKEBALL = "throw_pokeball",
  POKEMON_DEFEAT = "pokemon_defeat",
  POKEMON_DIED = "pokemon_died",
}
