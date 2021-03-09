import axios from "./Axios";
import { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import Comments from "./comments";
// import { Ratings, RateLayout } from "./ratings";
import Ratings from "./ratings";
import DeleteBar from "./deleteBar";
import { useDispatch, useSelector } from "react-redux";
import { receiveRatings, addRating } from "./actions";

export default function Bar(props) {
    const [barId, setBarId] = useState("");
    const [name, setName] = useState("");
    const [imgBar, setImgBar] = useState("");
    const [description, setDescription] = useState("");
    const [music, setMusic] = useState("");
    const [error, setError] = useState(false);
    const [createdAt, setCreatedAt] = useState("");
    const [userFirst, setUserFirst] = useState("");
    const [userLast, setUserLast] = useState("");
    const [userPic, setUserPic] = useState("");
    const [userId, setUserId] = useState("");

    console.log("props.toggleDelete: ", props.toggleDelete); // const [rating, setRating] = useState("");

    // const changeRating = (newRating, name) => {
    //     setRating(newRating);
    // // };
    // const dispatch = useDispatch();

    // const ratings = useSelector(
    //     (state) =>
    //         state.allReviews && state.allReviews.filter((bar) => bar.bar_id)
    // );

    useEffect(() => {
        axios
            .get(`/bar/${props.match.params.id}`)
            .then((res) => {
                // console.log("data: ", res.data.rows[0]);
                setBarId(res.data.rowsBar[0].id);
                setName(res.data.rowsBar[0].name);
                setImgBar(res.data.rowsBar[0].img_bar);
                setDescription(res.data.rowsBar[0].description);
                setMusic(res.data.rowsBar[0].music);
                setCreatedAt(res.data.rowsBar[0].created_at);
                setUserFirst(res.data.rowsUser[0].first);
                setUserLast(res.data.rowsUser[0].last);
                setUserPic(res.data.rowsUser[0].image);
                setUserId(res.data.rowsUser[0].id);

                setError(false);
            })
            .catch((err) => {
                console.log("error in axios api/user: ", err);
                setError(true);
            });
    }, []);

    // useEffect(() => {
    //     dispatch(receiveRatings());
    // }, []);

    return (
        <div className="overlay">
            {barId && (
                <div className="bar-pop-box">
                    <div className="box-left-bar">
                        <div className="bar-title">
                            {/* <img
                                className="bar-bop-icon"
                                src="/cocktails.svg"
                            /> */}
                            <h2>{name}</h2>
                        </div>
                        <img
                            className="img-bar-pop-up"
                            src={imgBar || "/avatar.jpg"}
                            alt={name}
                        />
                        <div className="ratings">
                            <Ratings
                                rating={props.rating}
                                barId={barId}
                                id={props.match.params.id}
                            />
                        </div>
                        <div className="created-by">
                            <img
                                className="user-pic"
                                src={userPic || "/avatar.jpg"}
                            />
                            {userFirst} {userLast} added this bar on{" "}
                            {createdAt.slice(0, 16).replace("T", " at ")}
                        </div>
                        <p>{description}</p>
                        <div className="music-box">
                            <img
                                className="bar-icon"
                                src={`/music-white/${music}.svg`}
                            />
                            <p className="capitalize">{music}</p>
                        </div>
                        {userId == props.id && (
                            <DeleteBar
                                barId={barId}
                                toggleDelete={props.toggleDelete}
                            />
                        )}
                    </div>
                    <div className="box-right-bar">
                        <img
                            className="bar-bop-icon"
                            src="/x-btn-black.svg"
                            onClick={() => props.history.goBack()}
                        />
                        <Comments id={props.id} barId={barId} />
                    </div>
                </div>
            )}
            {error && <p>This bar doesn't exist</p>}
        </div>
    );
}

{
    /* <Route
    path="/ratings/:id"
    render={(props) => (
        <Ratings
            id={id}
            barId={barId}
            key={props.match.url}
            match={props.match}
            history={props.history}
        />
    )}
/>; */
}
