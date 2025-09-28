import React, { useEffect, useState } from "react";
import "./App.css";

import Navbar from "./components/navbar/navbar.jsx";
import Landing from "./components/landing/landing.jsx";
import Films from "./components/films/films.jsx";
// import Contact from "./components/contact/contact.jsx";
import About from "./components/about/about.jsx";
import Updates from "./components/updates/updates.jsx";


const STORAGE_KEY = "walkintherainfilms_color_mode";

function App() {
	const [route, setRoute] = useState(window.location.hash || "#/");
	const [theme, setThemeState] = useState("dark"); // default

	// On page load: check system preference and set theme once
	useEffect(() => {
		const prefersDark =
			window.matchMedia &&
			window.matchMedia("(prefers-color-scheme: dark)").matches;

		const initialTheme = prefersDark ? "dark" : "light";
		setThemeState(initialTheme);
		document.documentElement.setAttribute("data-theme", initialTheme);
	}, []);

	// Helper to set theme and remember it
	function setTheme(next) {
		const valid = next === "light" || next === "dark";
		const finalTheme = valid ? next : "light";
		setThemeState(finalTheme);
		document.documentElement.setAttribute("data-theme", finalTheme);
		try {
			window.localStorage.setItem(STORAGE_KEY, finalTheme);
		} catch { /* ignore */ }
	}

	// Simple hash router
	useEffect(() => {
		function onHashChange() {
			const next = window.location.hash || "#/";
			setRoute(next);
		}
		window.addEventListener("hashchange", onHashChange);
		return () => window.removeEventListener("hashchange", onHashChange);
	}, []);

	function navigate(to) {
		const allowed = new Set(["#/", "#/films", "#/about", "#/newsandreviews"]);
		const target = allowed.has(to) ? to : "#/";
		if (window.location.hash !== target) {
			window.location.hash = target;
		} else {
			setRoute(target);
		}
	}

	let Page = Landing;
	if (route === "#/films") Page = Films;
	if (route === "#/about") Page = About;
	if (route === "#/newsandreviews") Page = Updates;
	// if (route === "#/contact") Page = Contact;

	const isDark = theme === "dark";

	return (
		<div className="app-shell">
			<Navbar currentRoute={route} onNavigate={navigate} />
			<main className={route === "#/" ? "page-content-landing" : "page-content"}>
				<Page onNavigate={navigate} currentRoute={route} />
			</main>
			{/* <footer className="site-footer">
				<div className="footer-inner">
					<div className="footer-left">© {new Date().getFullYear()} Walk In the Rain Films</div>
				</div>
			</footer> */}
		</div>
	);
}

export default App;