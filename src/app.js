import React from "react";
/*
react-router: 实现了路由的核心功能
react-router-dom: 基于react-router，加入了在浏览器运行环境下的一些功能，
例如：Link组件，会渲染一个a标签，Link组件源码a标签行; BrowserRouter和HashRouter 组件，
前者使用pushState和popState事件构建路由，后者使用window.location.hash和hashchange事件构建路由。
react-router-native: 基于react-router，类似react-router-dom，加入了react-native运行环境下的一些功能。
*/
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect,
  useLocation,
} from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";

function NoMatch() {
  let location = useLocation();
  return (
    <div>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div>
        <Switch>
          {/* sensitive url区分大小写... */}
          <Route sensitive exact path="/">
            <Home />
          </Route>
          <Route sensitive path="/about">
            <About />
            {/* <Redirect to="/About" /> */}
          </Route>
          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
// 使用h5 querySelector
//const rootElement = document.querySelector("#root");
// ReactDOM.render(<App />, rootElement);

ReactDOM.render(<App></App>, document.getElementById("root"));
