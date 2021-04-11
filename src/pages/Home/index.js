import { BrowserRouter as Router } from "react-router-dom";
import Header from "../../components/Header";
const axios = require("axios").default;
import React, { useState, useEffect } from "react";

import "./index.scss";


function xx(setCount) {
	axios
		.get("http://127.0.0.1:8080/")
		.then(function (response) {
			setCount(response.data);
		})
		.catch(function (error) {
			setCount(0);
		});
}
export default function Home() {
	const [count, setCount] = useState("");
	useEffect(() => {
		window.document.title = "首页";
		if (count === "") {
			xx(setCount);
		}
	});
	return (
		<Router>
			<div>
				<Header />
				<div className="border">
					.border
				</div>
				<h2>我我我我 {count} </h2>
			</div>
		</Router>
	);
}