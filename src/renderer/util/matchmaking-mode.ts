
export enum MatchmakingMode {
  RANKED = 0,
  UNRANKED = 1,
  SOLOMID = 2,
  DIRETIDE = 3,
  GREEVILING = 4,
  ABILITY_DRAFT = 5,
  TOURNAMENT = 6,
}


export const formatGameMode = (mode: MatchmakingMode) => {
  if (mode === MatchmakingMode.SOLOMID) {
    return "1x1 Мид";
  } else if (mode === MatchmakingMode.DIRETIDE) {
    return "Diretide";
  } else if (mode === MatchmakingMode.RANKED) {
    return "Рейтинг";
  } else if (mode === MatchmakingMode.UNRANKED) {
    return "Обычная";
  } else if (mode === MatchmakingMode.GREEVILING) {
    return "Гряволы";
  } else if (mode === MatchmakingMode.ABILITY_DRAFT) {
    return "Ability Draft";
  } else if (mode === MatchmakingMode.TOURNAMENT) {
    return "Турнир";
  } else {
    return "Неизвестный режим";
  }
};
