import { useState, useEffect } from "react";

export default function Playlist() {
    const [musicPlaylist, setMusicPlaylist] = useState("");
    let selectGenre = [
        {
            name: "Choose a music genre",
            key: "choose",
            value: "choose",
        },
        {
            name: "Electronic",
            key: "electronic",
            value: "electronic",
        },
        {
            name: "Hiphop",
            key: "hiphop",
            value: "hiphop",
        },
        {
            name: "Pop",
            key: "pop",
            value: "pop",
        },
        {
            name: "Rock",
            key: "rock",
            value: "rock",
        },
        {
            name: "Jazz",
            key: "jazz",
            value: "jazz",
        },
        {
            name: "Reggae",
            key: "reggae",
            value: "reggae",
        },
        {
            name: "Disco",
            key: "disco",
            value: "disco",
        },
    ];

    let src;
    if (musicPlaylist == "electronic") {
        src = "https://open.spotify.com/embed/playlist/51siUNlGNdF4Bp78hKZ8RA";
    } else if (musicPlaylist == "hiphop") {
        src = "https://open.spotify.com/embed/playlist/6h2G7A5B401eA2BauiXf5I";
    } else if (musicPlaylist == "pop") {
        src = "https://open.spotify.com/embed/playlist/2PX2bq5UYzOBggTlDkbseo";
    } else if (musicPlaylist == "rock") {
        src = "https://open.spotify.com/embed/playlist/37i9dQZF1DWXRqgorJj26U";
    } else if (musicPlaylist == "jazz") {
        src = "https://open.spotify.com/embed/playlist/2puFFdGTID0iJdQtjLvhal";
    } else if (musicPlaylist == "reggae") {
        src = "https://open.spotify.com/embed/playlist/37i9dQZF1DXbSbnqxMTGx9";
    } else if (musicPlaylist == "disco") {
        src = "https://open.spotify.com/embed/playlist/37i9dQZF1DX1MUPbVKMgJE";
    }
    return (
        <>
            <iframe
                src={src}
                width="300"
                height="80"
                frameBorder="0"
                allowtransparency="true"
                allow="encrypted-media"
            ></iframe>
            <label htmlFor="music">Choose a music genre:</label>
            <select
                className="select-music"
                id="music"
                name="music"
                onChange={(e) => setMusicPlaylist(e.target.value)}
            >
                {selectGenre.map((item) => (
                    <option key={item.key} value={item.value} type="text">
                        {item.name}
                    </option>
                ))}
            </select>
        </>
    );
}
