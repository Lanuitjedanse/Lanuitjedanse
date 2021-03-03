import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { allMyPosts } from "./actions";

export default function AllMyPosts() {
    const dispatch = useDispatch();

    const showAllPosts = useSelector(
        (state) =>
            state.allMyPosts && state.allMyPosts.filter((post) => post.id)
    );

    console.log("showAllPosts: ", showAllPosts);

    useEffect(() => {
        dispatch(allMyPosts());
    }, []);

    if (!showAllPosts) {
        return null;
    }

    return (
        <>
            <h2 className="title-allposts">All my posts</h2>
            <div className="bar-container">
                {showAllPosts &&
                    showAllPosts.map((bar) => (
                        <div className="event-box" key={bar.id}>
                            <Link to={`/all-bars/${bar.id}`}>
                                <img
                                    className="menu-icon"
                                    src="/right-arrow.svg"
                                />
                            </Link>
                            <h3>{bar.name}</h3>
                            <img
                                className="img-my-post"
                                src={bar.img_bar || "/avatar.jpg"}
                            />
                            <p>
                                Added on{" "}
                                {bar.created_at
                                    .slice(0, 16)
                                    .replace("T", " at ")}
                            </p>
                            <div className="music-genre">
                                <img
                                    className="icon"
                                    src={`/music-white/${bar.music}.svg`}
                                />
                                <p className="capitalize">
                                    {bar.music || "No info"}
                                </p>
                            </div>
                        </div>
                    ))}
            </div>
        </>
    );
}
