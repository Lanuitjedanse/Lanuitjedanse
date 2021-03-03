import { useState, useEffect } from "react";
import axios from "./Axios";
import { useSelector, useDispatch } from "react-redux";
import { myLastBar } from "./actions";

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

    const editBar = (e) => {
        e.preventDefault();

        barName = barName.length == 0 ? props.barName : barName;
        barImg = barImg.length == 0 ? props.barImg : barImg;
        description = description == 0 ? props.description : description;
        music = music == 0 ? props.music : description;

        axios
            .post("/edit-profile", { first, email, last, pass })
            .then((res) => {
                // console.log("response: ", res);

                props.updateProfileData(res.data.rows[0]);
                props.toggleEditBox(!props.editProfOpen);

                setError(false);
            })
            .catch((err) => {
                console.log("error in axios api/user: ", err);
                setError(true);
            });
    };

    return (
        <>
            <p>I am the edit bar component</p>
            <div className="create-bar-box">
                <img
                    className="close-icon"
                    src="/x-btn.svg"
                    onClick={props.toggleCreateBar}
                />
                <h2>Edit Bar</h2>
                {showLast &&
                    showLast.map((bar) => (
                        <div key={bar.id}>
                            <input
                                className="create-bar-field"
                                onChange={(e) => setBarName(e.target.value)}
                                name="bar"
                                type="text"
                                placeholder="Bar Name"
                                autoComplete="off"
                                defaultValue={bar.name}
                            ></input>
                            <input
                                onChange={(e) => setBarImg(e.target.files[0])}
                                name="file"
                                type="file"
                                accept="image/*"
                            ></input>

                            <textarea
                                className="create-bar-field"
                                name="message"
                                placeholder="Type a description"
                                onChange={(e) => setDescription(e.target.value)}
                                defaultValue={bar.description}
                            ></textarea>

                            <label htmlFor="music">Choose a music genre:</label>
                            <select
                                id="music"
                                name="music"
                                onChange={(e) => setMusic(e.target.value)}
                                value={bar.music}
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
                    ))}

                <button onClick={(e) => editBar(e)}>Submit new info</button>

                {errorNoName && <p>You need to add a Name for the bar</p>}
                {errorPic && <p>The file is too large - max 2MB</p>}
            </div>
        </>
    );
}
