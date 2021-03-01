import axios from "./Axios";
import { useState, useEffect } from "react";
import Comments from "./comments";
// import { Ratings, RateLayout } from "./ratings";
import Ratings from "./ratings";
import { useDispatch, useSelector } from "react-redux";
import { receiveRatings, addRating } from "./actions";

export default function Bar(props) {
    const [barId, setBarId] = useState("");
    const [name, setName] = useState("");
    const [imgBar, setImgBar] = useState("");
    const [description, setDescription] = useState("");
    const [music, setMusic] = useState("");
    const [error, setError] = useState(false);
    // const [rating, setRating] = useState("");

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
                setBarId(res.data.rows[0].id);
                setName(res.data.rows[0].name);
                setImgBar(res.data.rows[0].img_bar);
                setDescription(res.data.rows[0].description);
                setMusic(res.data.rows[0].music);

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
                    <div className="bar-title">
                        <img className="bar-bop-icon" src="/cocktails.svg" />
                        <h2>{name}</h2>
                        <img
                            className="bar-bop-icon "
                            src="/x-btn.svg"
                            onClick={() => props.history.goBack()}
                        />
                    </div>

                    <img
                        className="img-bar-pop-up"
                        src={imgBar || "/avatar.jpg"}
                        alt={name}
                    />
                    <Ratings
                        rating={props.rating}
                        barId={barId}
                        id={props.match.params.id}
                    />

                    <p>{description}</p>

                    <div className="music-box">
                        <img className="bar-bop-icon" src="/subwoofer.svg" />
                        <p>{music}</p>
                    </div>
                    <Comments id={props.id} barId={barId} />
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
