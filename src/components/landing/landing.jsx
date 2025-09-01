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
        Walk In the Rain Films
      </h1>
    </section>
  );
}