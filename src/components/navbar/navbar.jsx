import React, { useEffect, useRef, useState } from "react";
import "./navbar.css";

export default function Navbar({ currentRoute, onNavigate }) {
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);
    const buttonRef = useRef(null);

    // Click outside header controls (desktop safety)
    useEffect(() => {
        function handleDocumentClick(e) {
            const menu = menuRef.current;
            const button = buttonRef.current;
            if (!menu || !button) return;
            // If overlay is not open, ignore
            if (!open) return;
            // If click is outside both the menu and the hamburger, close
            if (!menu.contains(e.target) && !button.contains(e.target)) {
                setOpen(false);
            }
        }
        document.addEventListener("click", handleDocumentClick);
        return () => document.removeEventListener("click", handleDocumentClick);
    }, [open]);

    // Close on route change
    useEffect(() => {
        setOpen(false);
    }, [currentRoute]);

    // Close on Esc
    useEffect(() => {
        function onKey(e) {
            if (e.key === "Escape") setOpen(false);
        }
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, []);

    function handleToggle() {
        setOpen(prev => !prev);
    }

    // Close if user clicks the translucent background (but not inner list)
    function handleOverlayClick(e) {
        if (e.target === e.currentTarget) {
            setOpen(false);
        }
    }

    const expanded = open ? "true" : "false";

    return (
        <header className="nav-header">
            <div className="nav-inner">
                <div
                    className="brand"
                    onClick={() => onNavigate("#/")}
                    role="link"
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === "Enter") onNavigate("#/"); }}             
                >
                    <div className="brand-title">{currentRoute === "#/" ? "Welcome!" : "Walk In the Rain Films"}</div>
                </div>

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
                        <button
                            className={`nav-link ${currentRoute === "#/" ? "active" : ""}`}
                            onClick={() => onNavigate("#/")}
                        >
                            Home
                        </button>
                        <button
                            className={`nav-link ${currentRoute === "#/films" ? "active" : ""}`}
                            onClick={() => onNavigate("#/films")}
                        >
                            Films
                        </button>
                        <button
                            className={`nav-link ${currentRoute === "#/updates" ? "active" : ""}`}
                            onClick={() => onNavigate("#/updates")}
                        >
                            Updates
                        </button>
                        <button
                            className={`nav-link ${currentRoute === "#/about" ? "active" : ""}`}
                            onClick={() => onNavigate("#/about")}
                        >
                            About
                        </button>
                        <button
                            className={`nav-link ${currentRoute === "#/contact" ? "active" : ""}`}
                            onClick={() => onNavigate("#/contact")}
                        >
                            Contact
                        </button>
                    </div>
                </nav>
            </div>
        </header>
    );
}