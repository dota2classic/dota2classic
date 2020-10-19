import { observer } from "mobx-react";
import { useStores } from "../../store";
import styled from "styled-components";
import React from "react";
import { shell } from "electron";
import { colors } from "../../shared";
import {formatGameMode} from "../../util/matchmaking-mode";

const Container = styled.div`
  flex: 1;
  flex-direction: column;
  padding: 40px 20px 20px;
`;

const ShortInfo = styled.div`
  margin-left: 40px;
  margin-right: 40px;
  font-size: 16px;

  & a {
    cursor: pointer;
    color: ${colors.primaryTextDark};
    transition: 0.3s ease;
    &:hover {
      color: ${colors.primaryText};
    }
  }
`;

export const SelectedGameMode = observer(() => {
  const { game } = useStores();

  return (
    <Container>
      <ShortInfo>
        {formatGameMode(game.activeMode)} - самый популярный режим на сервере. Первые 10 игр в сезоне -
        калибровочные, после калибровки рейтинг меняется на ±25 очков. <br />
        <a
          onClick={() =>
            shell.openExternal("https://dota2classic.ru/leaderboard")
          }
        >
          Посмотреть таблицу лидеров
        </a>
      </ShortInfo>
    </Container>
  );
});
