const React = require("react");
import { BrowserRouter as Router } from "react-router-dom";
import Header from "../components/Header.jsx";

export default function About() {
  return (
    <Router>
      <div>
        <Header />
        <h2>这是About页面</h2>
      </div>
    </Router>
  );
}
