import React, { useEffect, useRef, useState } from "react";
import "./navbar.css";

// Icons
import homeIcon from "../../assets/icons/home.png";
import filmIcon from "../../assets/icons/film.png";
import newsIcon from "../../assets/icons/news.png";
import infoIcon from "../../assets/icons/information.png";

export default function Navbar({ currentRoute, onNavigate }) {
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);
    const buttonRef = useRef(null);

    // Close menu on outside click (when open)
    useEffect(() => {
        function handleDocumentClick(e) {
            if (!open) return;
            const menu = menuRef.current;
            const button = buttonRef.current;
            if (!menu || !button) return;
            if (!menu.contains(e.target) && !button.contains(e.target)) setOpen(false);
        }
        document.addEventListener("click", handleDocumentClick);
        return () => document.removeEventListener("click", handleDocumentClick);
    }, [open]);

    // Close on route change
    useEffect(() => setOpen(false), [currentRoute]);

    // Close on Esc
    useEffect(() => {
        function onKey(e) { if (e.key === "Escape") setOpen(false); }
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, []);

    const handleToggle = () => setOpen(prev => !prev);
    const handleOverlayClick = (e) => { if (e.target === e.currentTarget) setOpen(false); };
    const expanded = open ? "true" : "false";

    // Helper to render a nav button with icon
    const NavBtn = ({ to, icon, label, isActive }) => (
        <button
            className={`nav-link ${isActive ? "active" : ""}`}
            onClick={() => onNavigate(to)}
        >
            {/* <img className={`nav-icon ${isActive ? "active" : ""}`} src={icon} alt="" aria-hidden="true" /> */}
            <span className="nav-text">{label}</span>
        </button>
    );

    return (
        <header
            className="nav-header"
            style={currentRoute === "#/" ? { display: "none" } : undefined}
        >
            <div className={currentRoute === "#/" ? "nav-inner" : "nav-inner-full"}>
                {currentRoute === "#/" ? null : (
                    <div
                        className="brand"
                        onClick={() => onNavigate("#/")}
                        role="link"
                        tabIndex={0}
                        onKeyDown={(e) => { if (e.key === "Enter") onNavigate("#/"); }}
                    >
                        <div className="brand-title">Walk in the Rain Films</div>
                    </div>
                )}

                <button
                    ref={buttonRef}
                    className="hamburger"
                    aria-label="Toggle navigation"
                    aria-expanded={expanded}
                    aria-controls="nav-menu"
                    onClick={handleToggle}
                >
                    <span className={`bar ${open ? "bar-top-open" : ""}`}></span>
                    <span className={`bar ${open ? "bar-mid-open" : ""}`}></span>
                    <span className={`bar ${open ? "bar-bot-open" : ""}`}></span>
                </button>

                <nav
                    id="nav-menu"
                    ref={menuRef}
                    className={`nav-menu ${open ? "nav-menu-open" : ""}`}
                    aria-hidden={open ? "false" : "true"}
                    onClick={handleOverlayClick}
                >
                    <div className="nav-list">
                        <NavBtn
                            to="#/"
                            icon={homeIcon}
                            label="Home"
                            isActive={currentRoute === "#/"}
                        />
                        <NavBtn
                            to="#/films"
                            icon={filmIcon}
                            label="Films"
                            isActive={currentRoute === "#/films"}
                        />
                        <NavBtn
                            to="#/newsandreviews"
                            icon={newsIcon}
                            label="News & Reviews"
                            isActive={currentRoute === "#/newsandreviews"}
                        />
                        <NavBtn
                            to="#/about"
                            icon={infoIcon}
                            label="About"
                            isActive={currentRoute === "#/about"}
                        />
                    </div>
                </nav>
            </div>
        </header>
    );
}