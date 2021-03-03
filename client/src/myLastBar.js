import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { myLastBar } from "./actions";
import EditBar from "./editBar";
export default function MyLastBar(props) {
    const dispatch = useDispatch();
    const showLast = useSelector((state) => state.lastBar);
    useEffect(() => {
        dispatch(myLastBar());
    }, []);
    return (
        <div className="my-bar-con">
            {showLast &&
                showLast.map((bar) => (
                    <div key={bar.id}>
                        <div className="my-bar-box">
                            <h2>
                                I just pinned {""}
                                <span className="orange">{bar.name}</span>
                            </h2>
                            <img
                                className="my-bar-pic"
                                src={bar.image || "/avatar.jpg"}
                            />
                            <p>{bar.music}</p>
                            <div className="">
                                <p className="gray">
                                    {props.first} {props.last} on{" "}
                                    {bar.created_at
                                        .slice(0, 16)
                                        .replace("T", " at ")}
                                </p>
                                <Link to={`/all-bars/${bar.id}`}>
                                    <button className="btn">Edit Bar</button>
                                </Link>
                            </div>
                            <EditBar />
                        </div>
                    </div>
                ))}
        </div>
    );
}
