import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
const axios = require("axios").default;

import Header from "../../components/Header";
import Footer from "../Footer";
import styles from "./Home.module.scss";

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
		<React.Fragment >
			<Header />
			<div className="notification is-primary">
				This container is <strong>centered</strong> on desktop and larger viewports.
			</div>
			<section className={`${styles.body} section is-large is-link`}>
				<h1 className="title">Section</h1>
				<h2 className="subtitle">
					A simple container to divide your page into <strong>sections</strong>, like the one you're currently reading.
				</h2>
			</section>

			<section class="hero">
				<div class="hero-body">
					<p class="title">
						Hero title
					</p>
					<p class="subtitle">
						Hero subtitle
					</p>
				</div>
			</section>

			<Footer></Footer>
		</React.Fragment>
	);
}
