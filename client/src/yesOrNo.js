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

    musicGenres && musicGenres.length == 0 && location.replace("/");

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
                            className="btn yes"
                            onClick={() =>
                                dispatch(likeGenre(musicGenres[0].genre))
                            }
                        >
                            Yes
                        </button>
                        <button
                            className="btn no"
                            onClick={() =>
                                dispatch(dislikeGenre(musicGenres[0].genre))
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

//    {
//        musicGenres && musicGenres.length == 0 && (
//            <Link to="/">
//                <button className="btn">Go to map</button>
//            </Link>
//        );
//    }
