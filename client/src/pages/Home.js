import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Pages.css";

export default function Home() {
    useEffect(() => {
        if (window.location.pathname !== "/") {
            window.history.replaceState({}, null, "/");
        }
    }, []);

    return (
        <>
            <h1 className="home-padded-left">Imagine the possibilities.</h1>

            <div className="explore-section">
                <p>Explore our cars and find your dream vehicle.</p>
                <Link to="/carmodels" className="explore-button">
                    Explore Our Cars
                </Link>
            </div>
        </>
    );
}
