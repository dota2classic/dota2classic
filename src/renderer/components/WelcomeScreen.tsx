import {useStores} from "../store";
import {observer} from "mobx-react";
import styled, {keyframes} from "styled-components";
import {colors} from "../shared";
import React from "react";

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
export const WelcomeScreen = observer(() => {
  const stores = useStores();

  if (stores.steam.isLoading)
    return (
      <FullScreen>
        <LoadingLogo src="https://1000logos.net/wp-content/uploads/2019/03/Dota-2-Logo.png" />
        <Dota2Classic>dota2classic</Dota2Classic>
      </FullScreen>
    );
});
