import axios from "./Axios";
import { useState, useEffect } from "react";
import { deleteBar } from "./actions";
import { useDispatch, useSelector } from "react-redux";

export default function DeleteBar(props) {
    const dispatch = useDispatch();

    const [toggleDel, setToggleDel] = useState(false);

    const toggleDelete = () => {
        setToggleDel(!toggleDel);
    };
    const deleteBar = () => {
        // console.log("deletePic", props.deletePic);
        const barId = props.barId;
        axios
            .post(`/delete-bar`, { barId })
            .then((res) => {
                console.log("data: ", res);
                // dispatch(deleteBar());
                // console.log("data: ", data.rows[0].profile_pic_url);
                // response.redirect("/logout");
                window.location.replace("/all-bars");
            })
            .catch((err) => {
                console.log("err in axios get users: ", err);
            });
    };

    return (
        <div className="delete-container">
            <img
                className="bar-icon"
                src="/stop.svg"
                onClick={() => toggleDelete()}
            />
            {toggleDel && (
                <div className="delete-box">
                    <p>Are you sure?</p>
                    <div className="button-box">
                        <button
                            className="btn white"
                            onClick={() => deleteBar()}
                        >
                            Yes
                        </button>
                        <button
                            className="btn white"
                            onClick={() => toggleDelete()}
                        >
                            No
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
