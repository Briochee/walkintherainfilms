import React, { useEffect, useState } from "react";
import "./App.css";

import Navbar from "./components/navbar/navbar.jsx";
import Landing from "./components/landing/landing.jsx";
import Films from "./components/films/films.jsx";
import Contact from "./components/contact/contact.jsx";

function App() {
	const [route, setRoute] = useState(window.location.hash || "#/");

	useEffect(() => {
		function onHashChange() {
			const next = window.location.hash || "#/";
			setRoute(next);
		}
		window.addEventListener("hashchange", onHashChange);
		return () => window.removeEventListener("hashchange", onHashChange);
	}, []);

	function navigate(to) {
		// normalize allowed routes
		const allowed = new Set(["#/", "#/films", "#/contact"]);
		const target = allowed.has(to) ? to : "#/";
		if (window.location.hash !== target) {
			window.location.hash = target;
		} else {
			setRoute(target);
		}
	}

	// Simple route switch
	let Page = Landing;
	if (route === "#/films") Page = Films;
	if (route === "#/contact") Page = Contact;

	return (
		<div className="app-shell">
			<Navbar currentRoute={route} onNavigate={navigate} />
			<main className="page-content">
				<Page />
			</main>
			<footer className="site-footer">
				<div className="footer-inner">© {new Date().getFullYear()} Walk In the Rain Films</div>
			</footer>
		</div>
	);
}

export default App;