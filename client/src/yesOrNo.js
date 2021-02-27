import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { receiveGenres, likeGenre, noLikeGenre } from "./actions";

export default function YesOrNo() {
    const dispatch = useDispatch();

    const musicGenres = useSelector(
        (state) =>
            state.musicGenres &&
            state.musicGenres.filter((music) => music.giveLike == null)
    );

    console.log("music.genre: ", musicGenres);

    useEffect(() => {
        dispatch(receiveGenres());
    }, []);

    if (!musicGenres) {
        return null;
    }

    return (
        <div id="yes-or-no">
            {musicGenres[0] && (
                <div className="music-genres">
                    <img src={musicGenres[0].image} />
                    <h2>{musicGenres[0].genre}</h2>
                    <div className="buttons">
                        <button
                            className="btn"
                            onClick={() =>
                                dispatch(likeGenre(musicGenres[0].id))
                            }
                        >
                            Yes
                        </button>
                        <button
                            className="btn"
                            onClick={() =>
                                dispatch(noLikeGenre(musicGenres[0].id))
                            }
                        >
                            No
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
