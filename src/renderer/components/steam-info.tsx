import React from "react";
import { observer } from "mobx-react";
import { useStores } from "../store";
import styled from "styled-components";
import {colors} from "../shared";

const InfoRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;
`;

const UsernameInactiveInfo = styled.div`

  font-size: 20px;
  color: ${colors.error};
  margin-right: 20px;
`;

const Username = styled.div`
  font-size: 20px;
  margin-right: 20px;
`;

const SteamLogo = styled.img`
  width: 20px;
  height: 20px;
`;

export default observer(() => {
  const stores = useStores();

  return (
    <InfoRow>
      {stores.steam.signedIn ? (
        <Username>{stores.steam.personaName}</Username>
      ) : (
        <UsernameInactiveInfo>
          Steam не запущен или нет пользователя
        </UsernameInactiveInfo>
      )}

      <SteamLogo src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Steam_icon_logo.svg/600px-Steam_icon_logo.svg.png" />
    </InfoRow>
  );
});
