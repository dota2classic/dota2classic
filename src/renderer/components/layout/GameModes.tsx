import { observer } from "mobx-react";
import { formatGameMode, MatchmakingMode } from "../../util/matchmaking-mode";
import styled from "styled-components";
import React from "react";
import { useStores } from "../../store";
// @ts-ignore
import cx from "classnames";
import { pendingAnimation } from "../steam-info";

const Options = styled.div`
  display: flex;
  flex-direction: column;
  border-right: 1px solid #242424;
  width: 300px;
`;
const MOption = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
  cursor: pointer;
  transition: 0.3s ease;

  &:hover {
    background: rgba(1, 1, 1, 0.1);
  }

  & span.info {
    font-size: 12px;
  }
  & + & {
    border-top: 1px solid #4e4d4d;
  }

  &.header {
    cursor: unset;
    font-weight: bold;
    font-size: 18px;
    &:hover {
      background: unset;
    }
  }

  &.current {
    background: rgba(248, 228, 0, 0.03);
  }
  &.active {
    animation: ${pendingAnimation} 2s linear infinite;
  }
  &.disabled {
    cursor: not-allowed;
    &:hover {
      background: unset;
    }
    color: #4a4a4a;
  }
`;
interface MProps {
  mode: MatchmakingMode;
}

const SteamLogo = styled.img`
  width: 20px;
  height: 20px;
`;
const UserInfo = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 80px;
  padding: 20px;
  border-bottom: 1px solid #242424;
  height: 65px;
  max-height: 25px;
  align-items: center;
`;

const Username = styled.div`
  font-size: 14px;
  margin-right: 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const MatchmakingOption = observer((props: MProps) => {
  const { game } = useStores();
  return (
    <MOption
      className={cx(
        game.searchingMode === props.mode && "active",
        game.activeMode === props.mode && "current",
        game.searchingMode !== undefined &&
          game.searchingMode !== props.mode &&
          "disabled"
      )}
      onClick={() => {
        if (
          !(
            game.searchingMode !== undefined &&
            game.searchingMode !== props.mode
          )
        ) {
          game.activeMode = props.mode;
        }
      }}
    >
      <span>{formatGameMode(props.mode)}</span>
      <span className={"info"}>{game.inQueue[props.mode]} в поиске</span>
    </MOption>
  );
});

export const GameModes = observer(() => {
  const { steam } = useStores();
  return (
    <Options>
      <UserInfo>
        <Username>{steam.personaName}</Username>
        <SteamLogo src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Steam_icon_logo.svg/600px-Steam_icon_logo.svg.png" />
      </UserInfo>

      <MOption className={"header"}>Поиск игры</MOption>
      <MatchmakingOption mode={MatchmakingMode.RANKED} />
      <MatchmakingOption mode={MatchmakingMode.UNRANKED} />
      <MatchmakingOption mode={MatchmakingMode.SOLOMID} />
      {/*<MatchmakingOption mode={MatchmakingMode.ABILITY_DRAFT} />*/}
      {/*<MatchmakingOption mode={MatchmakingMode.DIRETIDE} />*/}
      {/*<MatchmakingOption mode={MatchmakingMode.GREEVILING} />*/}
    </Options>
  );
});
