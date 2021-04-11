

import React from "react";
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

export default function App() {
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