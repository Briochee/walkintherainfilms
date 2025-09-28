import React from "react";
import "./landing.css";
import heroUrl from "../../assets/images/landing-hero.png";

export default function Landing() {
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
        <a className="landing-nav-link" href="#/newsandreviews">Updates</a>
        <a className="landing-nav-link" href="#/about">About</a>
      </nav>
    </section>
  );
}