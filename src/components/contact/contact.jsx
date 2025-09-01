import React from "react";
import "./contact.css";

export default function Contact() {
    return (
        <section className="contact-wrap">
            <h1 className="contact-title">Contact</h1>
            <p className="contact-copy">
                <div className="contact-entry">
                    Lise Friedman:<br/>
                    <a className="contact-link" href="mailto:lisefri@gmail.com">lisefri@gmail.com</a>
                </div>
                <br/>
                <div className="contact-entry">
                    Maia Wechsler:<br/>
                    <a className="contact-link" href="mailto:maiawechsler@gmail.com">maiawechsler@gmail.com</a>
                </div>
            </p>
        </section>
    );
}