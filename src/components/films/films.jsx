import React, { useState } from "react";
import "./films.css";

import petronioThumb from "../../assets/images/FILM PAGE IMAGE Stephen_Petronio_Company_1993_MSG_Chris_Nash.jpg";
import petronioInside from "../../assets/images/Inside image option 2_ Stephen uncropped.JPG";

import dancerThumb from "../../assets/images/FILM PAGE IMAGE Dava Meg arms.jpg";
import dancerTrailerPoster from "../../assets/images/ifthedancerdances.jpg";

import historyThumb from "../../assets/images/FILM PAGE IMAGE_ Luis Hand on barre SHD__1602_2023-02-21-10-31-07.jpg";

const films = [
    {
        id: "petronio",
        title: "Petronio",
        thumbSrc: petronioThumb,
        /* tweak where the image sits inside 16:9:
           examples: "center center", "40% 50%", "left center", "50% 35%" */
        thumbPosition: "50% 45%",   // adjustable per film
        /* optional per-film aspect override (default 56.25% = 16:9) */
        thumbAspect: "56.25%",
        inside: {
            kind: "image",
            src: petronioInside,
            title: "Stephen in rehearsal",
            /* also 16:9 frame for inside media */
            aspect: "56.25%",
            position: "center center"
        },
        description: `Petronio (in progress)
Choreographer Stephen Petronio burst onto the scene at the beginning of the AIDS crisis, creating dances with unabashed sexuality that blurred gender lines and laid the ground for generations of dance-makers to come. As a massive backlash against gay and trans rights rocks the country today, Stephen leads his 40-year company to their final performances.`,
        credits: [
            {
                label: "Cover photo: Stephen in corset — Chris Nash",
                href: "https://www.chrisnashphoto.com",
                after: " @chrisnash_dancephotography",
            },
        ],
    },

    {
        id: "if-the-dancer-dances",
        title: "If the Dancer Dances",
        thumbSrc: dancerThumb,
        thumbPosition: "center center",
        thumbAspect: "56.25%",
        inside: {
            kind: "embed",
            src: "", /* put YouTube/Vimeo embed URL here */
            title: "Trailer",
            aspect: "56.25%",
            position: "center center"
        },
        description: `If the Dancer Dances (2018)
If a dance is not danced, it vanishes. If the Dancer Dances invites viewers into the intimate world of the dance studio and reveals what it takes to keep a dance – and a legacy – alive.`,
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
        thumbSrc: historyThumb,
        thumbPosition: "50% 55%",
        thumbAspect: "56.25%",
        inside: {
            kind: "video",
            src: "", /* e.g. "/samples/history-sample.mp4" when ready */
            title: "Film sample",
            aspect: "56.25%",
            position: "center center"
        },
        description: `History of the Future (in progress)
Project on the call for profound changes in the dance world around issues of equity: who dances, what is danced and who is leading.`,
    },
];

export default function Films() {
    const [openId, setOpenId] = useState(null);
    const current = films.find(f => f.id === openId) || null;

    function openFilm(id) {
        setOpenId(id);
        try { document.body.style.overflow = "hidden"; } catch { }
    }

    function closeFilm() {
        setOpenId(null);
        try { document.body.style.overflow = ""; } catch { }
    }

    return (
        <section className="films-wrap">
            <h1 className="films-title">Films</h1>
            <p className="films-copy">A selection of our work will live here.</p>

            {/* COLUMN LIST */}
            <div className="films-list">
                {films.map((film) => (
                    <button
                        key={film.id}
                        className="film-row"
                        onClick={() => openFilm(film.id)}
                        aria-label={`Open details for ${film.title}`}
                    >
                        <div
                            className="film-thumb"
                            style={{
                                backgroundImage: `url(${film.thumbSrc})`,
                                backgroundPosition: film.thumbPosition || "center center",
                                /* Standard 16:9 but adjustable per item */
                                "--thumb-aspect": film.thumbAspect || "56.25%",
                            }}
                            role="img"
                            aria-label={`${film.title} thumbnail`}
                        />
                        <div className="film-row-title">{film.title}</div>
                    </button>
                ))}
            </div>

            {current && (
                <div
                    className="film-modal-overlay"
                    onClick={(e) => { if (e.target === e.currentTarget) closeFilm(); }}
                    role="dialog"
                    aria-modal="true"
                    aria-label={`${current.title} details`}
                >
                    <div className="film-modal">
                        <div className="film-modal-header">
                            <h2 className="film-modal-title">{current.title}</h2>
                            <button className="film-modal-close" onClick={closeFilm} aria-label="Close">×</button>
                        </div>

                        <div className="film-modal-media">
                            {/* 16:9 aspect wrapper for everything inside */}
                            <div
                                className="aspect-16x9"
                                style={{
                                    "--media-aspect": current.inside?.aspect || "56.25%",
                                }}
                            >
                                {current.inside?.kind === "image" && current.inside?.src && (
                                    <div
                                        className="aspect-fill-image"
                                        style={{
                                            backgroundImage: `url(${current.inside.src})`,
                                            backgroundPosition: current.inside?.position || "center center",
                                        }}
                                        role="img"
                                        aria-label={current.inside.title || current.title}
                                    />
                                )}

                                {current.inside?.kind === "video" && current.inside?.src && (
                                    <video
                                        className="aspect-fill-video"
                                        controls
                                        preload="metadata"
                                        poster={current.inside?.poster || undefined}
                                    >
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

                            {current.credits && current.credits.length > 0 && (
                                <div className="film-credits">
                                    {current.credits.map((c, i) => (
                                        <p key={i} className="film-credit-line">
                                            <a className="film-credit-link" href={c.href} target="_blank" rel="noreferrer">
                                                {c.label}
                                            </a>
                                            {c.after ? <span className="film-credit-after">{c.after}</span> : null}
                                        </p>
                                    ))}
                                </div>
                            )}

                            {current.links && current.links.length > 0 && (
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