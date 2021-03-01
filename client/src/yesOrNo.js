import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { receiveGenres, likeGenre, dislikeGenre } from "./actions";

export default function YesOrNo() {
    const dispatch = useDispatch();

    const musicGenres = useSelector(
        (state) =>
            state.musicGenres &&
            state.musicGenres.filter((music) => music.giveLike == null)
    );

    musicGenres && musicGenres.length == 0 && window.location.replace("/");

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
                                dispatch(likeGenre(musicGenres[0].genre))
                            }
                        >
                            Yes
                        </button>
                        <button
                            className="btn"
                            onClick={() =>
                                dispatch(dislikeGenre(musicGenres[0].genre))
                            }
                        >
                            No
                        </button>
                    </div>
                </div>
            )}

            <div id="genres">
                <nav>
                    <Link to="/disliked-music">
                        See which music you don't like
                    </Link>
                    <Link to="/liked-music">See which music you like</Link>
                </nav>
            </div>
        </div>
    );
}
