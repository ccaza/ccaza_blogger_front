import { BrowserRouter as Router } from "react-router-dom";
import Header from "../components/Header.jsx";
const axios = require("axios").default;
import React, { useState, useEffect } from "react";

function xx(setCount) {
  axios
    .get("http://127.0.0.1:8080/")
    .then(function (response) {
      setCount(response.data);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
}
export default function Home() {
  const [count, setCount] = useState("");
  useEffect(() => {
    if (count === "") {
      xx(setCount);
    }
  });
  return (
    <Router>
      <div>
        <Header />
        <h2>这是Home页面 {count} </h2>
      </div>
    </Router>
  );
}
