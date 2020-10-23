import {useStores} from "../../store";
import {observer} from "mobx-react";
import styled, {keyframes} from "styled-components";
import {colors} from "../../shared";
import React from "react";
import {remote} from "electron";

const FullScreen = styled.div`
  width: 100vw;
  height: 100vw;
  background-color: ${colors.darkBg};
  display: flex;
  flex-direction: column;
`;

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  } 

  25% {
    transform: rotate(15deg);
  }
  
  50% {
      transform: rotate(0deg);
  }
  
  75% {
      transform: rotate(-15deg);
  }
  
  100% {
    transform: rotate(0deg);
  }
`;

const LoadingLogo = styled.img`
  width: 300px;
  height: auto;

  align-self: center;
  margin-top: 100px;
  animation: ${rotate} 2s linear infinite;
`;

const Dota2Classic = styled.div`
  color: ${colors.primaryText};
  font-size: 40px;
  font-weight: bold;
  align-self: center;
  margin-top: 20px;
  font-family: "Trajan Pro 3", sans-serif;
`;

const GenericIssue = styled.div`
  color: ${colors.error};
  font-size: 20px;

  font-weight: bold;
  align-self: center;
  margin-top: 120px;
  font-family: "Trajan Pro 3", sans-serif;
`;

const Button = styled.button`
  outline: none;
  width: fit-content;
  padding: 20px;
  align-self: center;
  margin-top: 20px;

  background: ${colors.evenDarkerBg};

  font-size: 20px;
  border: 1px solid rgba(24, 24, 24, 0.1);
  border-radius: 10px;
  color: ${colors.primaryText};

  transition: 0.3s ease;
  cursor: pointer;

  &:hover {
    background: rgb(13, 13, 14);
    border: 1px solid rgba(24, 24, 24, 0.8);
    border-radius: 20px;
  }
`;
export const WelcomeScreen = observer(() => {
  const stores = useStores();

  if (stores.steam.steamRunning === false) {
    return (
      <FullScreen>
        <GenericIssue>Для работы приложения нужно запустить Steam</GenericIssue>
        <Button onClick={() => stores.steam.sync()}>Я запустил Steam</Button>
      </FullScreen>
    );
  }

  if (stores.steam.isLoading)
    return (
      <FullScreen>
        <LoadingLogo src="https://1000logos.net/wp-content/uploads/2019/03/Dota-2-Logo.png" />
        <Dota2Classic>dota2classic</Dota2Classic>
      </FullScreen>
    );

  if (stores.steam.noUser) {
    return (
      <FullScreen>
        <GenericIssue>
          Для работы приложения нужно войти в Steam аккаунт
        </GenericIssue>
        <Button onClick={() => stores.steam.sync()}>Я вошел в аккаунт</Button>
      </FullScreen>
    );
  }

  if (stores.settings.path_681 === undefined) {
    return (
      <FullScreen>
        <GenericIssue>
          Остался последний шаг - укажите путь к dota.exe
        </GenericIssue>
        <Button
          onClick={() => {
            const s = remote.dialog.showOpenDialog({
              properties: ["openFile"],
              filters: [{ extensions: ["exe", "ts"], name: "Dota 2" }],
            });

            if (s) {
              stores.settings.set681Path(s[0]);
            }
          }}
        >
          Указать путь к игре
        </Button>
      </FullScreen>
    );
  }

  return <div>todo</div>;
});
