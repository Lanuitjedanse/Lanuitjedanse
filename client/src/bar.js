import axios from "./Axios";
import { useState, useEffect } from "react";

export default function Bar(props) {
    const [barId, setBarId] = useState("");
    const [name, setName] = useState("");
    const [imgBar, setImgBar] = useState("");
    const [description, setDescription] = useState("");
    const [music, setMusic] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        axios
            .get(`/bar/${props.match.params.id}`)
            .then((res) => {
                console.log("data: ", res.data.rows[0]);
                setBarId(res.data.rows[0].id);
                setName(res.data.rows[0].name);
                setImgBar(res.data.rows[0].img_bar);
                setDescription(res.data.rows[0].description);
                setMusic(res.data.rows[0].music);

                setError(false);
            })
            .catch((err) => {
                console.log("error in axios api/user: ", err);
                setError(true);
            });
    }, []);

    return (
        <div className="overlay">
            {barId && (
                <div className="bar-pop-box">
                    <div className="bar-title">
                        <img className="bar-icon" src="/cocktails.svg" />
                        <h2>{name}</h2>
                    </div>

                    <img src={imgBar} alt={name} />

                    <p>{description}</p>
                    <div className="music-box">
                        <img className="bar-icon" src="/subwoofer.svg" />
                        <p>{music}</p>
                    </div>
                </div>
            )}
            {error && <p>This bar doesn't exist</p>}
        </div>
    );
}
