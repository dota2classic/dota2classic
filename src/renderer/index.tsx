import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "mobx-react";

import { storesInternal } from "./store";
import { Layout } from "./components/layout/layout";
import { GlobalStyle } from "./shared";

const App = () => {
  return (
    <Provider {...storesInternal}>
      <GlobalStyle />
      <Layout />
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
