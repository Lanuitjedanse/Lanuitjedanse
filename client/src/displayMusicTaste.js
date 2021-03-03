import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    dislikeGenre,
    musicTasteUser,
    likeGenre,
    receiveGenres,
} from "./actions";
import axios from "./Axios";

export default function DisplayMusicTaste() {
    const dispatch = useDispatch();

    const userTaste = useSelector((state) => state.musicTaste);

    const [error, setError] = useState(false);

    const likedMusic = useSelector(
        (state) =>
            state.musicTaste &&
            userTaste[0] &&
            Object.keys(userTaste[0]).filter(
                (key) => userTaste[0][key] === true
            )
    );

    const dislikedMusic = useSelector(
        (state) =>
            state.musicTaste &&
            userTaste[0] &&
            Object.keys(userTaste[0]).filter(
                (key) => userTaste[0][key] === false
            )
    );

    useEffect(() => {
        dispatch(musicTasteUser());
        dispatch(receiveGenres());
    }, []);

    return (
        <>
            <div className="music-genre-box">
                <h1>Music Preferences</h1>
                <h3>Music you like </h3>
                <div className="genre-box">
                    {likedMusic &&
                        likedMusic.map((item, index) => (
                            <div className="genre" key={index}>
                                <p>{item}</p>

                                <img
                                    className="icon-menu"
                                    src={`/music/${item}.svg`}
                                />
                                <button
                                    className="btn"
                                    onClick={() => dispatch(dislikeGenre(item))}
                                >
                                    Dislike
                                </button>
                            </div>
                        ))}
                </div>
                <h3>Music you dislike </h3>
                <div className="genre-box">
                    {dislikedMusic &&
                        dislikedMusic.map((item, index) => (
                            <div className="genre" key={index}>
                                <p>{item}</p>
                                <img
                                    className="icon-menu"
                                    src={`/music/${item}.svg`}
                                />
                                <button
                                    className="btn"
                                    onClick={() => dispatch(likeGenre(item))}
                                >
                                    Like
                                </button>
                            </div>
                        ))}
                </div>
            </div>
        </>
    );
}
