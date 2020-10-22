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
  padding-top: 100px;
  border-right: 1px solid #242424;
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
    color: grey;
  }
`;
interface MProps {
  mode: MatchmakingMode;
}
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
  return (
    <Options>
      <MOption className={"header"}>Поиск игры</MOption>
      <MatchmakingOption mode={MatchmakingMode.SOLOMID} />
      <MatchmakingOption mode={MatchmakingMode.RANKED} />
      <MatchmakingOption mode={MatchmakingMode.UNRANKED} />
    </Options>
  );
});
