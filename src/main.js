import ReactDOM from "react-dom";
import React from "react";

import App from "./App";
import './App.scss';


// 使用h5 querySelector
const rootElement = document.querySelector("#root");
ReactDOM.render(<App />, rootElement);
//ReactDOM.render(<App></App>, document.getElementById("root"));
