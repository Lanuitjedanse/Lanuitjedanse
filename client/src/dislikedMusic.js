import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { receiveGenres, likeGenre } from "./actions";

export default function DislikedMusic() {
    const dispatch = useDispatch();
    const notLikedMusic = useSelector(
        (state) =>
            state.musicGenres &&
            state.musicGenres.filter((music) => music.giveLike == false)
    );

    useEffect(() => {
        dispatch(likeGenre());
    }, []);

    console.log("music not liked: ", notLikedMusic);

    if (!notLikedMusic) {
        return null;
    }
    const notLiked = (
        <div className="users">
            {notLikedMusic.map((music) => (
                <div className="user" key={music.id}>
                    <img src={music.image} />
                    <div className="buttons">
                        <button onClick={() => dispatch(likeGenre(music.id))}>
                            Hot
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
    return (
        <div id="not-liked">
            {!notLiked.length && <div>No music genres here</div>}
            {!!notLiked.length && notLikedMusic}
            <nav>
                <Link to="/yes-or-no">Music preferences</Link>
                <Link to={`/liked-music/${notLikedMusic.id}`}>
                    See which music you like
                </Link>
            </nav>
        </div>
    );
}
