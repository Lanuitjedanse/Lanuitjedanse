import Logo from "./logo";
import Menu from "./menu";
import React from "react";
import HamburgerMenu from "./hamburgerMenu";
import { useState, useEffect } from "react";
// import Playlist from "./Playlist";

export default function Header() {
    const [mQuery, setMQuery] = useState();
    const [screenSize, setScreenSize] = useState();

    useEffect(() => {
        window.addEventListener("resize", updateSize);
        setScreenSize(window.innerWidth);
        // console.log("window.width: ", window.innerWidth);
    });

    const updateSize = () => {
        // console.log("size updated");
        let mql = window.matchMedia("(max-width: 900px)");
        setMQuery(mql.matches);

        // console.log(mql.matches); // true or falses
    };

    const [burgerOpen, setBurgerOpen] = useState(false);

    const toggleBurgerMenu = () => {
        setBurgerOpen(!burgerOpen);
    };

    const [playlistOpen, setPlaylistOpen] = useState(false);

    const togglePlaylist = () => {
        setPlaylistOpen(!playlistOpen);
    };

    let src;

    burgerOpen ? (src = "/x-btn.svg") : (src = "/hamburger-menu.svg");

    return (
        <>
            <header>
                <div className="logo-title">
                    <Logo togglePlaylist={togglePlaylist} />
                    <h2 className="brand-header">Tracklist</h2>
                </div>
                <div className="menu-container">
                    {screenSize < 900 || mQuery ? (
                        <img
                            onClick={toggleBurgerMenu}
                            className="icon-menu"
                            src={src}
                        />
                    ) : (
                        <Menu />
                    )}
                </div>
            </header>
            {burgerOpen && (
                <HamburgerMenu toggleBurgerMenu={toggleBurgerMenu} />
            )}
        </>
    );
}
