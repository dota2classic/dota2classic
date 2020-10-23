import {observer} from "mobx-react";
import {useStores} from "../../store";
import styled from "styled-components";
import React, {ReactNode} from "react";
import {shell} from "electron";
import {colors} from "../../shared";
import {formatGameMode, MatchmakingMode} from "../../util/matchmaking-mode";

const Container = styled.div`
  flex: 1;
  flex-direction: column;
  padding: 40px 20px 20px;
`;

const ShortInfo = styled.div`
  margin-left: 40px;
  margin-right: 40px;
  font-size: 16px;

  & .game-mode {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  & a {
    cursor: pointer;
    color: ${colors.primaryTextDark};
    transition: 0.3s ease;
    &:hover {
      color: ${colors.primaryText};
    }
  }
`;

const texts: { [key in MatchmakingMode]: ReactNode } = {
  [MatchmakingMode.RANKED]: (
    <span>
      Самый популярный режим на сервере. Первые 10 игр в сезоне - калибровочные,
      после калибровки рейтинг меняется на ±25 очков. <br />
      <br />
      <a
        onClick={() =>
          shell.openExternal("https://dota2classic.ru/leaderboard")
        }
      >
        Посмотреть таблицу лидеров
      </a>
    </span>
  ),
  [MatchmakingMode.UNRANKED]: (
    <span>
      Обычная игра 5х5 без рейтинга. Этот режим менее популярен, чем{" "}
      <b>{formatGameMode(MatchmakingMode.RANKED)}</b>
    </span>
  ),
  [MatchmakingMode.SOLOMID]: (
    <span>
      Отличный способ вспомнить карту, старые способности, привыкнуть к Source
      1. Второй по популярности режим
    </span>
  ),
  [MatchmakingMode.DIRETIDE]: (
    <span>
      Знаменитый {formatGameMode(MatchmakingMode.DIRETIDE)}, который все так
      давно просят.
    </span>
  ),
  [MatchmakingMode.GREEVILING]: (
    <span>Один из самых старых ивентов, проводимых Valve</span>
  ),
  [MatchmakingMode.TOURNAMENT]: <span>?</span>,
  [MatchmakingMode.ABILITY_DRAFT]: (
    <span>
      Старый добрый Ability Draft. Создай своего героя сам из старых
      способностей и без талантов!
    </span>
  ),
};

export const SelectedGameMode = observer(() => {
  const { game } = useStores();

  return (
    <Container>
      <ShortInfo>
        <div className={"game-mode"}>{formatGameMode(game.activeMode)}</div>
        {texts[game.activeMode]}
      </ShortInfo>
    </Container>
  );
});
