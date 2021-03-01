import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { musicTasteUser } from "./actions";
import axios from "./Axios";

export default function MusicTaste(props) {
    const dispatch = useDispatch();

    const userTaste = useSelector(
        (state) =>
            state.musicTaste && state.musicTaste.filter((music) => music.genres)
    );

    console.log("userTaste: ", userTaste);

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
        dispatch(musicTasteUser());
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
