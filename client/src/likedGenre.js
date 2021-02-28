import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { receiveGenres, noLikeGenre } from "./actions";

export default function Hot() {
    const dispatch = useDispatch();
    const musicGenres = useSelector(
        (state) =>
            state.musicGenres && state.musicGenres.filter((music) => music.like)
    );

    useEffect(() => {
        dispatch(receiveGenres());
    }, []);

    // console.log("users that are hot: ", musicGenres);
    if (!musicGenres) {
        return null;
    }
    const likedMusic = (
        <div className="users">
            {musicGenres.map((music) => (
                <div className="user" key={music.id}>
                    <img src={music.image} />
                    <div className="buttons">
                        <button
                            onClick={() =>
                                dispatch(noLikeGenre(musicGenres.id))
                            }
                        >
                            Not
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
    return (
        <div id="hot">
            {!musicGenres.length && <div>No genre was liked!</div>}
            {!!musicGenres.length && likedMusic}
            <nav>
                <Link to="/">Home</Link>
                <Link to="/not">See who&apos;s not</Link>
            </nav>
        </div>
    );
}
