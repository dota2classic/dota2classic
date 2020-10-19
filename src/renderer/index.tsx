// Initial welcome page. Delete the following line to remove it.
import React from "react"
import ReactDOM from "react-dom"

// @ts-ignore
import greenworks from "greenworks"
// import {App} from "./components/app.jsx";
greenworks.init()

const App = () => {

  return <div>
    <h1>Hello fuckers</h1>
  </div>
}


ReactDOM.render(<App />, document.getElementById("root"));
