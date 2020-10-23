import React from "react";
import { observer } from "mobx-react-lite";
import { useStores } from "../store";
import styled, { keyframes } from "styled-components";
import { colors } from "../shared";
import { formatGameMode } from "../util/matchmaking-mode";

const InfoRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  width: 100%;
  border-bottom: 1px solid #242424;
  height: 65px;
  max-height: 45px;
`;



const CancelFindGameButton = styled.div`
  padding: 10px;
  color: ${colors.primaryText};

  border: 1px solid grey;

  margin-right: 20px;
  cursor: pointer;

  transition: 0.3s ease;
  color: ${colors.primaryTextDark};
  background-color: ${colors.evenDarkerBg};

  &:hover {
    color: ${colors.primaryText};
    background-color: ${colors.darkBg};
  }
`;

export const pendingAnimation = keyframes`
  0% {
    color: ${colors.primaryTextDark2};
  } 

  50% {
      color: white;
  }
  
  100% {
    color: ${colors.primaryTextDark2};
  }
`;
const SearchGameBar = styled.div`
  margin-left: 40px;
  display: flex;
  flex-direction: column;
  border: none;
  animation: ${pendingAnimation} 2s linear infinite;

  & span.info {
    font-size: 10px;
  }
`;

export default observer(() => {
  const stores = useStores();
  return (
    <InfoRow>
      {stores.game.searchingMode !== undefined && (
        <SearchGameBar>
          <span>
            Поиск {formatGameMode(stores.game.searchingMode)}
          </span>
          <span className={"info"}>
            игроков: {stores.game.inQueue[stores.game.activeMode]}
          </span>
        </SearchGameBar>
      )}

      <div style={{ flex: 1 }} />
      {(stores.game.searchingMode !== undefined && (
        <CancelFindGameButton onClick={() => stores.game.cancelSearch()}>
          Отменить поиск
        </CancelFindGameButton>
      )) || (
        <CancelFindGameButton
          onClick={() => stores.game.startSearch(stores.game.activeMode)}
        >
          Искать игру
        </CancelFindGameButton>
      )}
    </InfoRow>
  );
});
