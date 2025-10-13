import React, { useEffect, useState, useRef } from "react";
import "./App.css";

import Navbar from "./components/navbar/navbar.jsx";
import Landing from "./components/landing/landing.jsx";
import Films from "./components/films/films.jsx";
import About from "./components/about/about.jsx";
import Updates from "./components/updates/updates.jsx";

const STORAGE_KEY = "walkintherainfilms_color_mode";

function App() {
	const [route, setRoute] = useState(window.location.hash || "#/");
	const [theme, setThemeState] = useState("dark");
	const filmCloseRef = useRef(null);

	// Detect system theme on first load
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
		} catch {
			/* ignore */
		}
	}

	// Simple navigation with “close modal if on Films” logic
	function navigate(to) {
		const allowed = new Set(["#/", "#/films", "#/about", "#/newsandreviews"]);
		const target = allowed.has(to) ? to : "#/";

		// if already on Films page → close modal
		if (to === "#/films" && route === "#/films") {
			if (filmCloseRef.current) filmCloseRef.current();
			return;
		}

		// otherwise change hash
		if (window.location.hash !== target) {
			window.location.hash = target;
		} else {
			setRoute(target);
		}
	}

	// Watch hash changes
	useEffect(() => {
		function onHashChange() {
			const next = window.location.hash || "#/";
			setRoute(next);
		}
		window.addEventListener("hashchange", onHashChange);
		return () => window.removeEventListener("hashchange", onHashChange);
	}, []);

	let Page = Landing;
	if (route === "#/films") Page = () => <Films registerClose={filmCloseRef} />;
	if (route === "#/about") Page = About;
	if (route === "#/newsandreviews") Page = Updates;

	return (
		<div className="app-shell">
			<Navbar currentRoute={route} onNavigate={navigate} />
			<main className={route === "#/" ? "page-content-landing" : "page-content"}>
				<Page onNavigate={navigate} currentRoute={route} />
			</main>
		</div>
	);
}

export default App;