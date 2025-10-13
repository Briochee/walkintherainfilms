import React from "react";
import "./landing.css";

export default function Landing() {

  const heroUrl = "https://raw.githubusercontent.com/Briochee/walkintherainfilms/main/src/assets/images/landing-hero.png";

  return (
    <section className="landing-hero" role="region" aria-label="Landing hero">
      <div
        className="landing-hero-bg"
        style={{ backgroundImage: `url(${heroUrl})` }}
        aria-hidden="true"
      />

      <h1 className="landing-hero-title">
        <div id="title-stack-one">Walk</div>
        <div id="title-stack-two">in the</div>
        <div id="title-stack-three">Rain Films</div>
      </h1>

      <nav className="landing-nav" aria-label="Landing navigation">
        <a className="landing-nav-link" href="#/films">Films</a>
        <a className="landing-nav-link" href="#/newsandreviews">News & Reviews</a>
        <a className="landing-nav-link" href="#/about">About</a>
      </nav>
    </section>
  );
}