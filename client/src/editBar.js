import { useState, useEffect } from "react";
import axios from "./Axios";
import { useSelector, useDispatch } from "react-redux";
import { myLastBar, addBar } from "./actions";

export default function EditBar(props) {
    // console.log("editprofile: ", props);
    let [barName, setBarName] = useState("");
    let [barImg, setBarImg] = useState("");
    let [description, setDescription] = useState("");
    // const [link, setLink] = useState("");
    let [music, setMusic] = useState("");
    const [error, setError] = useState(false);
    const [errorNoName, setErrorNoName] = useState(false);
    const [errorPic, setErrorPic] = useState(false);
    const dispatch = useDispatch();

    const showLast = useSelector((state) => state.lastBar);
    useEffect(() => {
        dispatch(myLastBar());
    }, []);

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
    console.log("showLast: ", showLast[0].lat);

    const editBar = (e) => {
        barName = barName.length == 0 ? showLast[0].name : barName;
        description =
            description.length == 0 ? showLast[0].description : description;
        music = music.length == 0 ? showLast[0].music : music;

        e.preventDefault();
        let formDataPic = new FormData();
        formDataPic.append("barId", showLast[0].id);
        formDataPic.append("file", barImg);
        formDataPic.append("description", description);
        formDataPic.append("barName", barName);
        formDataPic.append("lat", showLast[0].lat);
        formDataPic.append("lng", showLast[0].lng);

        formDataPic.append("music", music);

        let lat = showLast[0].lat;
        let lng = showLast[0].lng;
        let barId = showLast[0].id;

        if (barName.length == 0) {
            setErrorNoName(true);
        } else if (barImg != 0) {
            axios
                .post("/edit-bar-pic", formDataPic)
                .then((response) => {
                    console.log(("response: ", response));

                    setError(false);
                    props.updateBarLocation(response.data.rows[0]);
                    // dispatch(addBar(response.data.rows[0]));
                    dispatch(myLastBar(response.data.rows[0]));

                    props.toggleEditBar(!props.editBarVisible);
                })
                .catch((err) => {
                    console.log("err in axios post profile pic: ", err);
                    setErrorPic(true);
                    setErrorNoName(false);
                });
        } else {
            axios
                .post("/edit-bar", {
                    barId,
                    barName,
                    description,
                    lat,
                    lng,
                    music,
                })
                .then((response) => {
                    console.log(("response: ", response));
                    setError(false);
                    props.updateBarLocation(response.data.rows[0]);
                    // dispatch(addBar(response.data.rows[0]));
                    dispatch(myLastBar(response.data.rows[0]));

                    props.toggleEditBar(!props.editBarVisible);
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
                <div className="edit-bar-box">
                    <img
                        className="close-icon edit-close"
                        src="/x-btn.svg"
                        onClick={props.toggleEditBar}
                    />
                    <h2>Edit Bar</h2>
                    {showLast &&
                        showLast.map((bar) => (
                            <div className="edit-innerbox" key={bar.id}>
                                <input
                                    className="reg-field"
                                    onChange={(e) => setBarName(e.target.value)}
                                    name="bar"
                                    type="text"
                                    placeholder="Bar Name"
                                    autoComplete="off"
                                    defaultValue={bar.name}
                                ></input>

                                <textarea
                                    className="reg-field"
                                    name="message"
                                    placeholder="Type a description"
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                    defaultValue={bar.description}
                                ></textarea>
                                <input
                                    onChange={(e) =>
                                        setBarImg(e.target.files[0])
                                    }
                                    name="file"
                                    type="file"
                                    accept="image/*"
                                ></input>
                                <div className=" box-choose-music">
                                    <label htmlFor="music">Music:</label>
                                    <select
                                        id="music"
                                        name="music"
                                        className="select-music"
                                        onChange={(e) =>
                                            setMusic(e.target.value)
                                        }
                                        defaultValue={bar.music}
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
                        ))}

                    <button className="btn white" onClick={(e) => editBar(e)}>
                        Submit new info
                    </button>

                    {errorNoName && <p>You need to add a Name for the bar</p>}
                    {errorPic && <p>The file is too large - max 2MB</p>}
                </div>
            </div>
        </>
    );
}
