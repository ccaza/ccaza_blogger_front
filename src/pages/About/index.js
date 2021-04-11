const React = require("react");
import { BrowserRouter as Router } from "react-router-dom";
import Header from "../../components/Header";
import ModuleCss from './index.module.scss';
export default function About() {
	return (
		<Router>
			<div>
				<Header />
				<h2>这是一个关于页面...</h2>
			</div>
		</Router>
	);
}
