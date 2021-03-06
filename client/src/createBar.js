import axios from "./Axios";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBar, myLastBar } from "./actions";

export default function CreateBar(props) {
    const dispatch = useDispatch();

    const [barName, setBarName] = useState("");
    const [barImg, setBarImg] = useState("");
    const [description, setDescription] = useState("");
    // const [link, setLink] = useState("");
    const [music, setMusic] = useState("");
    const [error, setError] = useState(false);
    const [errorNoName, setErrorNoName] = useState(false);
    const [errorPic, setErrorPic] = useState(false);

    const selectGenre = [
        {
            name: "No info",
            key: "noInfo",
            value: "",
        },
        {
            name: "Electronic",
            key: "electronic",
            value: "electronic",
        },
        {
            name: "Hiphop",
            key: "hiphop",
            value: "hiphop",
        },
        {
            name: "Pop",
            key: "pop",
            value: "pop",
        },
        {
            name: "Rock",
            key: "rock",
            value: "rock",
        },
        {
            name: "Jazz",
            key: "jazz",
            value: "jazz",
        },
        {
            name: "Reggae",
            key: "reggae",
            value: "reggae",
        },
        {
            name: "Disco",
            key: "disco",
            value: "disco",
        },
    ];

    const submitBar = (e) => {
        // console.log("music: ", music);
        e.preventDefault();
        let formDataPic = new FormData();

        formDataPic.append("file", barImg);
        formDataPic.append("description", description);
        formDataPic.append("barName", barName);
        formDataPic.append("lat", props.pinBarLocation.lat);
        formDataPic.append("lng", props.pinBarLocation.lng);

        formDataPic.append("music", music);

        let lat = props.pinBarLocation.lat;
        let lng = props.pinBarLocation.lng;

        if (barName.length == 0) {
            setErrorNoName(true);
        } else if (barImg != 0) {
            axios
                .post("/create-bar-pic", formDataPic)
                .then((response) => {
                    // console.log(("response: ", response.data.rows[0].address));

                    props.updateBarLocation(response.data.rows[0]);
                    dispatch(addBar(response.data.rows[0]));
                    dispatch(myLastBar(response.data.rows[0]));

                    setError(false);
                    props.toggleCreateBar(!props.barPopUpVisible);
                })
                .catch((err) => {
                    console.log("err in axios post profile pic: ", err);
                    setErrorPic(true);
                    setErrorNoName(false);
                });
        } else {
            axios
                .post("/create-bar", { barName, description, lat, lng, music })
                .then((response) => {
                    // console.log(("response: ", response.data.rows[0].address));

                    props.updateBarLocation(response.data.rows[0]);
                    dispatch(addBar(response.data.rows[0]));
                    dispatch(myLastBar(response.data.rows[0]));
                    setError(false);
                    props.toggleCreateBar(!props.barPopUpVisible);
                })
                .catch((err) => {
                    console.log("err in axios post profile pic: ", err);
                    setError(true);
                });
        }
    };

    return (
        <>
            <div className="overlay">
                <div className="create-bar-box">
                    <img
                        className="close-icon"
                        src="/x-btn.svg"
                        onClick={props.toggleCreateBar}
                    />
                    <h2>Add a Bar</h2>
                    <div className="edit-innerbox">
                        <input
                            className="reg-field"
                            onChange={(e) => setBarName(e.target.value)}
                            name="bar"
                            type="text"
                            placeholder="Bar Name"
                            autoComplete="off"
                        ></input>

                        <textarea
                            className="reg-field"
                            name="message"
                            placeholder="Type a description"
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                        <input
                            onChange={(e) => setBarImg(e.target.files[0])}
                            name="file"
                            type="file"
                            accept="image/*"
                        ></input>

                        <div className=" box-choose-music">
                            <label htmlFor="music">Music: </label>
                            <select
                                id="music"
                                name="music"
                                className="select-music"
                                onChange={(e) => setMusic(e.target.value)}
                            >
                                {selectGenre.map((item) => (
                                    <option
                                        key={item.key}
                                        value={item.value}
                                        type="text"
                                    >
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <button className="btn white" onClick={(e) => submitBar(e)}>
                        Send
                    </button>
                    {errorNoName && <p>You need to add a Name for the bar</p>}
                    {errorPic && <p>The file is too large - max 2MB</p>}
                </div>
            </div>
        </>
    );
}

//  <label htmlFor="music">Choose a music genre:</label>
//             <select id="music" name="music">
//                 <option value="electronic">Electronic</option>
//                 <option value="saab">Saab</option>
//                 <option value="fiat">Fiat</option>
//                 <option value="audi">Audi</option>
//             </select>
