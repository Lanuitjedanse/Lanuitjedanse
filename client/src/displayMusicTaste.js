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

    // console.log("userTaste: ", userTaste);

    // const [music, setMusic] = useState([]);

    const [error, setError] = useState(false);

    const likedMusic = useSelector(
        (state) =>
            state.musicTaste &&
            userTaste[0] &&
            Object.keys(userTaste[0]).filter(
                (key) => userTaste[0][key] === true
            )
    );

    const music = useSelector(
        (state) =>
            state.musicGenres &&
            state.musicGenres.filter(
                (music) => music.giveLike == true || music.giveLike == false
            )
    );
    console.log("music: ", music);

    const dislikedMusicGenre = useSelector(
        (state) =>
            state.musicGenres &&
            state.musicGenres.filter((music) => music.giveLike == false)
    );

    console.log(" dislikedMusicGenre: ", dislikedMusicGenre);

    const dislikedMusic = useSelector(
        (state) =>
            state.musicTaste &&
            userTaste[0] &&
            Object.keys(userTaste[0]).filter(
                (key) => userTaste[0][key] === false
            )
    );

    // console.log("dislikedMusic: ", dislikedMusic);

    useEffect(() => {
        dispatch(musicTasteUser());
        dispatch(receiveGenres());
    }, []);

    // const handleChangeCheckBox = (e) => {
    //     // updating an object instead of a Map
    //     setCheckedItems([...checkedItems, e.target.name]);
    // };

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
