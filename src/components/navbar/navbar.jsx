import React, { useEffect, useRef, useState } from "react";
import "./navbar.css";

export default function Navbar({ currentRoute, onNavigate }) {
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);
    const buttonRef = useRef(null);

    // Close menu when clicking outside
    useEffect(() => {
        function handleClick(e) {
            const menu = menuRef.current;
            const button = buttonRef.current;
            if (!menu || !button) return;
            if (!menu.contains(e.target) && !button.contains(e.target)) {
                setOpen(false);
            }
        }
        document.addEventListener("click", handleClick);
        return () => document.removeEventListener("click", handleClick);
    }, []);

    // Close on route change (e.g., after selecting a link)
    useEffect(() => {
        setOpen(false);
    }, [currentRoute]);

    function handleToggle() {
        setOpen(prev => !prev);
    }

    // A11y: label + aria state on the toggle button
    const expanded = open ? "true" : "false";

    return (
        <header className="nav-header">
            <div className="nav-inner">
                <div className="brand" onClick={() => onNavigate("#/")} role="link" tabIndex={0}
                    onKeyDown={(e) => { if (e.key === "Enter") onNavigate("#/"); }}>
                    <div className="brand-title">Walk In the Rain Films</div>
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
                >
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
                        className={`nav-link ${currentRoute === "#/contact" ? "active" : ""}`}
                        onClick={() => onNavigate("#/contact")}
                    >
                        Contact
                    </button>
                </nav>
            </div>
        </header>
    );
}