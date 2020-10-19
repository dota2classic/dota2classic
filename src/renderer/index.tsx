import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "mobx-react";

import { stores } from "./store";
import SteamInfo from "./components/steam-info";
import { Layout } from "./components/layout/layout";
import { GlobalStyle } from "./shared";

const App = () => {
  return (
    <Provider {...stores}>
      <GlobalStyle />
      <Layout>
        <SteamInfo />
      </Layout>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
