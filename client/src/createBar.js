import axios from "./Axios";
import { useState, useEffect } from "react";

export default function CreateBar(props) {
    const [barName, setBarName] = useState("");
    const [barImg, setBarImg] = useState("");
    const [description, setDescription] = useState("");
    // const [link, setLink] = useState("");
    const [music, setMusic] = useState("");
    const [error, setError] = useState(false);

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
    ];

    const submitBar = (e) => {
        console.log("music: ", music);
        e.preventDefault();
        let formData = new FormData();
        // console.log("barImg: ", barImg.length);

        // barImg.length == 0 ? barImg == "client/public/avatar.jpg"

        formData.append("file", barImg);

        formData.append("description", description);
        formData.append("barName", barName);
        formData.append("music", music);

        // formData.append("link", link);

        axios
            .post("/create-bar", formData)
            .then((response) => {
                console.log(("response: ", response));
                setError(false);
            })
            .catch((err) => {
                console.log("err in axios post profile pic: ", err);
                setError(true);
            });
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
                    <input
                        className="create-bar-field"
                        onChange={(e) => setBarName(e.target.value)}
                        name="bar"
                        type="text"
                        placeholder="Bar Name"
                        autoComplete="off"
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
                    ></textarea>

                    <label htmlFor="music">Choose a music genre:</label>
                    <select
                        id="music"
                        name="music"
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

                    <button
                        className="btn-purple"
                        onClick={(e) => submitBar(e)}
                    >
                        Send
                    </button>
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
