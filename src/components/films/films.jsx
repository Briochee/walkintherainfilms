import React, { useState, useEffect, useRef } from "react";
import { FastAverageColor } from "fast-average-color";
import "./films.css";
import arrowIcon from "../../assets/icons/arrow.png";

const petronioThumb = "https://raw.githubusercontent.com/Briochee/walkintherainfilms/main/src/assets/images/FILM%20PAGE%20IMAGE%20Stephen_Petronio_Company_1993_MSG_Chris_Nash.jpg";
const petronioInside = "https://raw.githubusercontent.com/Briochee/walkintherainfilms/main/src/assets/images/Inside%20image%20option%202_%20Stephen%20uncropped.JPG";

const dancerThumb = "https://raw.githubusercontent.com/Briochee/walkintherainfilms/main/src/assets/images/FILM%20PAGE%20IMAGE%20Dava%20Meg%20arms.jpg";
const dancerTrailerPoster = "https://raw.githubusercontent.com/Briochee/walkintherainfilms/main/src/assets/images/Ifthedancerdances.jpg";

const historyThumb = "https://raw.githubusercontent.com/Briochee/walkintherainfilms/main/src/assets/images/FILM%20PAGE%20IMAGE_%20Luis%20Hand%20on%20barre%20SHD__1602_2023-02-21-10-31-07.jpg";

const films = [
    {
        id: "petronio",
        title: "Petronio",
        popup: false,
        thumbSrc: petronioThumb,
        thumbPosition: "50% 35%",
        thumbAspect: "56.25%",
        thumbZoom: 1.07,
        inside: {
            kind: "image",
            src: petronioInside,
            title: "Stephen in rehearsal",
            aspect: "56.25%",
            position: "center center",
        },
        description: `Choreographer Stephen Petronio burst onto the scene at the beginning of the AIDS crisis, creating dances with unabashed sexuality that blurred gender lines and laid the ground for generations of dance-makers to come. As a massive backlash against gay and trans rights rocks the country today, Stephen leads his 40-year company to their final performances.`,
        credits: [
            {
                label: "Photo: Chris Nash",
                href: "https://www.chrisnashphoto.com",
                after: " @chrisnash_dancephotography",
            },
        ],
    },
    {
        id: "if-the-dancer-dances",
        title: "If the Dancer Dances",
        popup: true,
        thumbSrc: dancerThumb,
        thumbPosition: "center 0%",
        thumbAspect: "56.25%",
        thumbZoom: 1.0,
        inside: {
            kind: "embed",
            src: "https://player.vimeo.com/video/323308357?badge=0&autopause=0&player_id=0&app_id=58479",
            title: "IF THE DANCER DANCES - Official Trailer (2019)",
            aspect: "56.25%",
            position: "center center",
        },
        description: `If a dance is not danced, it vanishes. If the Dancer Dances invites viewers into the intimate world of the dance studio and reveals what it takes to keep a dance – and a legacy – alive.`,
        links: [
            {
                label: "Watch on Amazon Prime",
                href: "https://www.amazon.com/If-Dancer-Dances-Stephen-Petronio/dp/B07VBBSFQM",
            },
        ],
    },
    {
        id: "history-of-the-future",
        title: "The History of the Future",
        popup: true,
        thumbSrc: historyThumb,
        thumbPosition: "5% 55%",
        thumbAspect: "56.25%",
        thumbZoom: 1.0,
        inside: {
            kind: "embed",
            src: "https://www.youtube-nocookie.com/embed/tQyAJHpr_B0?si=96LxLFQQqMcbeVch&amp;controls=0&amp;start=7&modestbranding=1&rel=0&iv_load_policy=3&ytp-chrome-top=0",
            title: "Film sample",
            aspect: "56.25%",
            position: "center center",
        },
        description: `Project on the call for profound changes in the dance world around issues of equity: who dances, what is danced and who is leading. With MOVE|NYC|`,
    },
];

export default function Films({ registerClose }) {
    const [openId, setOpenId] = useState(null);
    const current = films.find((f) => f.id === openId) || null;
    const [dominantColors, setDominantColors] = useState({});
    const rowRefs = useRef([]);

    useEffect(() => {
        const fac = new FastAverageColor();
        const images = [];

        films.forEach((film) => {
            const img = new Image();
            img.crossOrigin = "Anonymous";
            img.src = film.thumbSrc;
            img.onload = async () => {
                try {
                    const colorData = await fac.getColorAsync(img);
                    setDominantColors((prev) => ({
                        ...prev,
                        [film.id]: colorData?.rgba || "rgba(60,60,60,1)",
                    }));
                } catch {
                    setDominantColors((prev) => ({ ...prev, [film.id]: "rgba(60,60,60,1)" }));
                }
            };
            images.push(img);
        });

        return () => {
            images.forEach((img) => (img.onload = null));
            fac.destroy();
        };
    }, []);

    useEffect(() => {
        if (registerClose) {
            registerClose.current = closeFilm;
            return () => { registerClose.current = null; };
        }
    }, [registerClose]);

    useEffect(() => {
        if (window.innerWidth < 768) return;
        const container = document.querySelector(".films-list");
        if (!container) return;

        let t;
        const onScroll = () => {
            clearTimeout(t);
            t = setTimeout(() => {
                const rows = rowRefs.current.filter(Boolean);
                const containerRect = container.getBoundingClientRect();
                let best = null, most = 0;
                for (const r of rows) {
                    const rect = r.getBoundingClientRect();
                    const v = Math.max(0, Math.min(rect.bottom, containerRect.bottom) - Math.max(rect.top, containerRect.top));
                    if (v > most) { most = v; best = r; }
                }
                if (best) best.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 120);
        };
        container.addEventListener("scroll", onScroll);
        return () => container.removeEventListener("scroll", onScroll);
    }, []);

    function openFilm(id) {
        const film = films.find((f) => f.id === id);
        if (!film?.popup) return;
        setOpenId(id);
        try { document.body.style.overflow = "hidden"; } catch { }
    }

    function closeFilm() {
        setOpenId(null);
        try { document.body.style.overflow = ""; } catch { }
    }

    const scrollToIndex = (idx) => {
        const el = rowRefs.current[idx];
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return (
        <section className="films-wrap">
            <div className="films-list">
                {films.map((film, i) => {
                    const isPopup = !!film.popup;
                    const avg = dominantColors[film.id] || "rgba(0,0,0,0.72)";
                    const isFirst = i === 0;
                    const isLast = i === films.length - 1;

                    return (
                        <div
                            key={film.id}
                            ref={(el) => (rowRefs.current[i] = el)}
                            className={`film-row ${isPopup ? "film-row--popup" : "film-row--inline"}`}
                            role={isPopup ? "button" : "region"}
                            tabIndex={isPopup ? 0 : -1}
                            onClick={() => isPopup && openFilm(film.id)}
                            aria-label={
                                isPopup ? `Open details for ${film.title}` : `${film.title} — inline information`
                            }
                            style={{ cursor: isPopup ? "pointer" : "default" }}
                        >
                            <div
                                className="film-thumb"
                                style={{
                                    backgroundImage: `url(${film.thumbSrc})`,
                                    backgroundPosition: film.thumbPosition || "center center",
                                    "--thumb-aspect": film.thumbAspect || "56.25%",
                                    "--thumb-zoom": film.thumbZoom,
                                }}
                                role="img"
                                aria-label={`${film.title} thumbnail`}
                            />

                            {/* Title only for inline cards */}
                            {isPopup && <h2 className="film-row-title">{film.title}</h2>}

                            {/* Popup hint */}
                            {isPopup && <div className="film-row-hint">Click image for more information</div>}

                            {/* Inline info bar with average color */}
                            {!isPopup && (
                                <div className="film-inline-info" style={{ background: avg }}>
                                    <h3 className="film-inline-title">{film.title}</h3>
                                    <p className="film-inline-desc">{film.description}</p>
                                    <div className="film-inline-links">
                                        {film.credits.map((l, i) => (
                                            <p key={i} className="film-inline-credit-line">
                                                <span className="film-inline-credit-after">{l.label}</span>
                                                {l.after ? (
                                                    <a href={l.href} target="_blank" rel="noreferrer" className="film-inline-credit-link">
                                                        {l.after}
                                                    </a>
                                                ) : null}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* === NAV ARROWS === */}
                            {/* Top arrow (not on first). Rotated 180° */}
                            {!isFirst && (
                                <button
                                    type="button"
                                    className="film-arrow film-arrow--top"
                                    onClick={(e) => { e.stopPropagation(); scrollToIndex(i - 1); }}
                                    aria-label="Scroll to previous film"
                                >
                                    <img src={arrowIcon} alt="" />
                                </button>
                            )}

                            {/* Bottom arrow (not on last) */}
                            {!isLast && (
                                <button
                                    type="button"
                                    className="film-arrow film-arrow--bottom"
                                    onClick={(e) => { e.stopPropagation(); scrollToIndex(i + 1); }}
                                    aria-label="Scroll to next film"
                                >
                                    <img src={arrowIcon} alt="" />
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Modal for popup films */}
            {current && current.popup && (
                <div
                    className="film-modal-overlay"
                    onClick={(e) => { if (e.target === e.currentTarget) closeFilm(); }}
                    role="dialog"
                    aria-modal="true"
                    aria-label={`${current.title} details`}
                    style={{ "--modal-bg": `${dominantColors[current.id] || "rgba(0,0,0,0.85)"}` }}
                >
                    <div className="film-modal">
                        <div className="film-modal-media">
                            <button className="film-modal-close" onClick={closeFilm} aria-label="Close">
                                <span className="films-bar films-bar-top" />
                                <span className="films-bar films-bar-bottom" />
                            </button>

                            <div className="aspect-16x9" style={{ "--media-aspect": current.inside?.aspect || "56.25%" }}>
                                {current.inside?.kind === "image" && current.inside?.src && (
                                    <div
                                        className="aspect-fill-image"
                                        style={{ backgroundImage: `url(${current.inside.src})`, backgroundPosition: current.inside?.position || "center center" }}
                                        role="img"
                                        aria-label={current.inside.title || current.title}
                                    />
                                )}

                                {current.inside?.kind === "video" && current.inside?.src && (
                                    <video className="aspect-fill-video" controls preload="metadata" poster={current.inside?.poster || undefined}>
                                        <source src={current.inside.src} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                )}

                                {current.inside?.kind === "embed" && current.inside?.src && (
                                    <iframe
                                        className="aspect-fill-embed"
                                        src={current.inside.src}
                                        title={current.inside.title || current.title}
                                        loading="lazy"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        allowFullScreen
                                        referrerPolicy="strict-origin-when-cross-origin"
                                    />
                                )}

                                {(!current.inside?.src || current.inside?.src.length === 0) && (
                                    <div className="film-media-placeholder">
                                        <div className="film-media-placeholder-text">Media coming soon</div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="film-modal-body">
                            <p className="film-description">{current.description}</p>

                            {current.credits?.length > 0 && (
                                <div className="film-credits">
                                    {current.credits.map((c, i) => (
                                        <p key={i} className="film-credit-line">
                                            <span className="film-credit-after">{c.label}</span>
                                            {c.after ? (
                                                <a href={c.href} target="_blank" rel="noreferrer" className="film-credit-link">
                                                    {c.after}
                                                </a>
                                            ) : null}
                                        </p>
                                    ))}
                                </div>
                            )}

                            {current.links?.length > 0 && (
                                <div className="film-links">
                                    {current.links.map((l, i) => (
                                        <p key={i} className="film-link-line">
                                            <a className="film-link" href={l.href} target="_blank" rel="noreferrer">
                                                {l.label}
                                            </a>
                                        </p>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}