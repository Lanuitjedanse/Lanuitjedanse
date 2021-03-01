import { useState, useEffect } from "react";
import axios from "./Axios";

export default function MusicTaste(props) {
    // console.log("props in music taste: ", props);
    const [music, setMusic] = useState([]);
    // const [electronic, setElectronic] = useState();
    // const [hiphop, setHiphop] = useState();
    // const [pop, setPop] = useState();
    // const [rock, setRock] = useState();
    // const [jazz, setJazz] = useState();
    let [checkedItems, setCheckedItems] = useState([]);
    const [error, setError] = useState(false);

    const checkboxes = [
        {
            name: "Electronic",
            key: "electronic",
            label: "electronic",
        },
        {
            name: "Hiphop",
            key: "hiphop",
            label: "hiphop",
        },
        {
            name: "Pop",
            key: "pop",
            label: "pop",
        },
        {
            name: "Rock",
            key: "rock",
            label: "rock",
        },
        {
            name: "Jazz",
            key: "jazz",
            label: "jazz",
        },
        {
            name: "Reggae",
            key: "reggae",
            label: "reggae",
        },
    ];

    useEffect(() => {
        console.log("checkedItems: ", checkedItems);
    }, [checkedItems]);

    const handleChangeCheckBox = (e) => {
        // updating an object instead of a Map
        setCheckedItems([...checkedItems, e.target.name]);
    };

    const changeMusicTaste = (e) => {
        e.preventDefault();
        console.log("checkedItems", checkedItems);
        // electronic && setMusic(["electronic"]);
        // setMusic([electronic]);
        // console.log("music: ", music);

        axios
            .post("/music-taste", { checkedItems })
            .then((response) => {
                console.log("response: ", response);
                setError(false);
                props.toggleMusicTaste(!props.musicTasteVisible);
                setCheckedItems([]);
            })
            .catch((err) => {
                console.log("err in axios post profile pic: ", err);
                setError(true);
            });
    };

    return (
        <>
            <button className="btn" onClick={props.toggleMusicTaste}>
                Update music taste
            </button>

            {props.musicTasteVisible && (
                <>
                    <div className="checkboxes">
                        {checkboxes.map((item) => (
                            <label key={item.key}>
                                {item.name}
                                <input
                                    name={item.name}
                                    type="checkbox"
                                    onChange={(e) => handleChangeCheckBox(e)}
                                ></input>
                            </label>
                        ))}
                        <button
                            className="btn"
                            onClick={(e) => changeMusicTaste(e)}
                        >
                            Submit
                        </button>
                    </div>
                </>
            )}
        </>
    );
}
