import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { myLastBar } from "./actions";
import EditBar from "./editBar";
export default function MyLastBar(props) {
    const dispatch = useDispatch();

    const [editBarVisible, setEditBarVisible] = useState(false);
    const showLast = useSelector((state) => state.lastBar);
    const userCreator = useSelector((state) => state.creator);

    console.log("showLast: ", showLast);
    useEffect(() => {
        dispatch(myLastBar());
    }, []);

    const toggleEditBar = () => {
        setEditBarVisible(!editBarVisible);
    };

    return (
        <>
            {showLast && userCreator[0].id == props.id && (
                <div className="my-bar-con">
                    {showLast &&
                        showLast.map((bar) => (
                            <div key={bar.id}>
                                <div className="my-bar-box">
                                    <h2>
                                        I just added {""}
                                        <span className="bold">{bar.name}</span>
                                    </h2>
                                    <img
                                        className="my-bar-pic"
                                        src={bar.img_bar || "/avatar.jpg"}
                                    />
                                    <p>{bar.description}</p>
                                    <div className="music-box">
                                        <img
                                            className="icon-menu"
                                            src={`/music/${bar.music}.svg`}
                                        />
                                        <p>{bar.music}</p>
                                    </div>

                                    <div className="">
                                        <p className="gray">
                                            Posted on{" "}
                                            {bar.created_at
                                                .slice(0, 16)
                                                .replace("T", " at ")}
                                        </p>
                                    </div>

                                    <button
                                        className="btn"
                                        onClick={() => toggleEditBar()}
                                    >
                                        Edit Bar
                                    </button>
                                    {editBarVisible && (
                                        <EditBar
                                            id={props.id}
                                            toggleEditBar={toggleEditBar}
                                            updateBarLocation={
                                                props.updateBarLocation
                                            }
                                            barId={props.barId}
                                            barName={props.barName}
                                            barMusic={props.barMusic}
                                            imgBar={props.imgBar}
                                            userIdBar={props.userIdBar}
                                            description={props.description}
                                            lat={props.lat}
                                            lng={props.lng}
                                        />
                                    )}
                                </div>
                            </div>
                        ))}
                </div>
            )}
        </>
    );
}
