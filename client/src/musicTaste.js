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
            name: "electronic",
            key: "electronic",
            label: "electronic",
        },
        {
            name: "hiphop",
            key: "hiphop",
            label: "hiphop",
        },
        {
            name: "pop",
            key: "pop",
            label: "pop",
        },
        {
            name: "rock",
            key: "rock",
            label: "rock",
        },
        {
            name: "jazz",
            key: "jazz",
            label: "jazz",
        },
        {
            name: "reggae",
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
            })
            .catch((err) => {
                console.log("err in axios post profile pic: ", err);
                setError(true);
            });
    };

    return (
        <>
            <button onClick={props.toggleMusicTaste}>Update music taste</button>

            {props.musicTasteVisible && (
                <>
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
                    <button onClick={(e) => changeMusicTaste(e)}>Submit</button>
                </>
            )}
        </>
    );
}
