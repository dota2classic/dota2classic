import React, {PropsWithChildren} from "react";
import styled from "styled-components";
import {colors} from "../../shared";
import {useStores} from "../../store";
import {observer} from "mobx-react";
import {WelcomeScreen} from "../WelcomeScreen";

const AppLayout = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${colors.darkBg};
  color: ${colors.primaryText};
`;
export const Layout = observer(({ children }: PropsWithChildren<{}>) => {
  const stores = useStores();

  if (stores.steam.signedIn) return <AppLayout>{children}</AppLayout>;
  else return <WelcomeScreen />;
});
