import Logo from "./logo";
// import Menu from "./menu";
// import React from "react";
import HamburgerMenu from "./hamburgerMenu";
import { useState, useEffect } from "react";
import ProfilePic from "./profilePic";
import Playlist from "./playlist";

export default function Header(props) {
    // console.log("props in header: ", props);
    // const [mQuery, setMQuery] = useState();
    // const [screenSize, setScreenSize] = useState();

    // useEffect(() => {
    //     window.addEventListener("resize", updateSize);
    //     setScreenSize(window.innerWidth);
    //     // console.log("window.width: ", window.innerWidth);
    // });

    // const updateSize = () => {
    //     // console.log("size updated");
    //     let mql = window.matchMedia("(max-width: 900px)");
    //     setMQuery(mql.matches);

    //     // console.log(mql.matches); // true or falses
    // };

    const [burgerOpen, setBurgerOpen] = useState(false);

    const toggleBurgerMenu = () => {
        setBurgerOpen(!burgerOpen);
    };

    const [playlistOpen, setPlaylistOpen] = useState(false);

    const togglePlaylist = () => {
        // console.log("I was clicked");
        setPlaylistOpen(!playlistOpen);
    };

    let src;

    burgerOpen ? (src = "/x-btn.svg") : (src = "/hamburger-menu.svg");

    return (
        <>
            <header>
                <div className="logo-title">
                    <img src="/dance.svg" onClick={togglePlaylist} />

                    <h2 className="brand-header">Lanuitjedanse</h2>
                </div>
                <div className="menu-container">
                    <img
                        onClick={toggleBurgerMenu}
                        className="icon-menu"
                        src={src}
                    />
                    <ProfilePic {...props} />
                </div>
            </header>
            {burgerOpen && (
                <HamburgerMenu toggleBurgerMenu={toggleBurgerMenu} />
            )}

            {playlistOpen && <Playlist togglePlaylist={togglePlaylist} />}
        </>
    );
}
