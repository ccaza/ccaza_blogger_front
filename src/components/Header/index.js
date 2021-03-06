const React = require("react");
/*
			这是header组件,函数式的
*/

import './index.scss';

export default function Header(xx) {
	return (
		<nav className="navbar" role="navigation" aria-label="main navigation">
			<div className="navbar-brand">
				<a className="navbar-item" href="https://bulma.io">
					<img src="https://bulma.io/images/bulma-logo.png"
						alt="Bulma: Free, open source, and modern CSS framework based on Flexbox" width="112" height="28" />
				</a>

				<a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false">
					<span aria-hidden="true"></span>
					<span aria-hidden="true"></span>
					<span aria-hidden="true"></span>
				</a>
			</div>
		</nav>
	);
}