import {observer} from "mobx-react";
import {formatGameMode, MatchmakingMode} from "../../util/matchmaking-mode";
import styled from "styled-components";
import React from "react";
import {useStores} from "../../store";
// @ts-ignore
import cx from "classnames";

const MOption = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 20px;
  cursor: pointer;
  transition: 0.3s ease;

  &:hover {
    background: rgba(1, 1, 1, 0.1);
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

  &.active {
    background: rgba(1, 1, 1, 0.2);
  }
  &.disabled {
    cursor: not-allowed;
    font-size: 18px;
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
        game.searchingMode === props.mode || game.activeMode === props.mode && "active",
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
      {formatGameMode(props.mode)}
    </MOption>
  );
});

const Options = styled.div`
  display: flex;
  flex-direction: column;
  padding: 100px 10px 10px;
  border-right: 1px solid #242424;
`;
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
