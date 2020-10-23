import React, {PropsWithChildren} from "react";
import styled from "styled-components";
import {colors} from "../../shared";
import {useStores} from "../../store";
import {observer} from "mobx-react";
import {WelcomeScreen} from "../setup/WelcomeScreen";
import {GameModes} from "./GameModes";
import SteamInfo from "../steam-info";
import {SelectedGameMode} from "./SelectedGameMode";
import {AcceptGameModal} from "../AcceptGameModal";
import {SettingsModal} from "../settings/SettingsModal";

const AppLayout = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${colors.darkBg};
  color: ${colors.primaryText};
  display: flex;
  flex-direction: row;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;
export const Layout = observer(({ children }: PropsWithChildren<{}>) => {
  const stores = useStores();

  if (stores.steam.signedIn && stores.settings.path_681 !== undefined)
    return (
      <AppLayout>
        <GameModes />
        <Content>
          <SteamInfo />
          <SelectedGameMode />
          <AcceptGameModal />
          <SettingsModal />
        </Content>
      </AppLayout>
    );
  else return <WelcomeScreen />;
});
