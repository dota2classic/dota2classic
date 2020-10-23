import { observer } from "mobx-react-lite";
import styled from "styled-components";
import React from "react";
import { useStores } from "../store";

const Modal = styled.div`
  z-index: 100;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;

  width: 300px;
  height: 150px;
  background: #1d1f22;

  padding: 40px;
  border-radius: 4px;

  box-shadow: 0 0 30px 10px rgba(150, 150, 150, 0.25);
`;

const ModalWrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
`;

const Button = styled.button`
  outline: none;
  background: #212325;
  padding-top: 12px;
  padding-bottom: 12px;

  cursor: pointer;
  transition: 0.3s ease;

  &:hover {
    color: #e2e2e2;
    background: #121213;
  }
  text-align: center;
  flex: 1;
  color: #c4c4c4;
  font-size: 18px;
  font-family: "Trajan Pro 3", sans-serif;

  border: 1px solid #a7a5a5;
  border-radius: 6px;

  & + & {
    margin-left: 30px;
  }
`;

const GameReady = styled.div`
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  color: #dcddde;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 60px;
`;

const AcceptDot = styled.div`
  width: 14px;
  height: 14px;
  background: #262629;
  transition: 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: 50%;

  &.accepted {
    background: #012f01;
  }
`;
const AcceptDots = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin-top: 40px;
`;
const IAcceptGameModal = () => {
  const { game } = useStores();

  if (game.serverURL)
      return (
        <ModalWrapper>
          <Modal>
            <GameReady>Игра готова!</GameReady>
            <Buttons>
              <Button onClick={() => game.launchGame()}>Подключиться</Button>
            </Buttons>
          </Modal>
        </ModalWrapper>
      );
      
  if (game.pendingGame)
    if (!game.pendingGame.iAccepted)
      return (
        <ModalWrapper>
          <Modal>
            <GameReady>Игра найдена!</GameReady>
            <Buttons>
              <Button onClick={game.acceptPendingGame}>Принять</Button>
              <Button onClick={game.declinePendingGame}>Отклонить</Button>
            </Buttons>
          </Modal>
        </ModalWrapper>
      );
    else
      return (
        <ModalWrapper>
          <Modal>
            <GameReady>Игра найдена!</GameReady>
            <AcceptDots>
              {new Array(game.pendingGame.total).fill(null).map((_, t) => (
                <AcceptDot
                  key={t}
                  className={
                    t < game.pendingGame!!.accepted ? "accepted" : undefined
                  }
                />
              ))}
            </AcceptDots>
          </Modal>
        </ModalWrapper>
      );

  return <span />;
};
export const AcceptGameModal = observer(IAcceptGameModal);
