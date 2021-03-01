import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { receiveGenres, dislikeGenre } from "./actions";

export default function likedMusic() {
    const dispatch = useDispatch();
    const likedGenres = useSelector(
        (state) =>
            state.musicGenres &&
            state.musicGenres.filter((music) => music.giveLike)
    );

    useEffect(() => {
        dispatch(receiveGenres());
    }, []);

    console.log("liked genres: ", likedGenres);
    if (!likedGenres) {
        return null;
    }
    const likeGenre = (
        <div className="music-genres">
            {likedGenres.map((music) => (
                <div className="user" key={music.id}>
                    <img src={music.image} />
                    <div className="buttons">
                        <button
                            onClick={() => dispatch(dislikeGenre(music.id))}
                        >
                            Not
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
    return (
        <div id="liked">
            {!likeGenre.length && <div>No music genres</div>}
            {!!likeGenre.length && likedGenres}
            <nav>
                <Link to="/yes-or-no">Music preferences</Link>
                <Link to="/not-liked-music">
                    See which music you don't like
                </Link>
            </nav>
        </div>
    );
}
