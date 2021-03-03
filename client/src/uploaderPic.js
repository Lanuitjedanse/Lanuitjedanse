import axios from "./Axios";
import { useState, useEffect } from "react";
// import ProfilePic from "./ProfilePic";
// export function Uploader() {
//     return <div className="uploader"></div>;
// }

export default function UploaderPic(props) {
    const [file, setFile] = useState("");
    const [error, setError] = useState(false);

    const submitPic = (e) => {
        e.preventDefault();

        let formData = new FormData();
        formData.append("file", file);

        axios
            .post("/profile-pic", formData)
            .then((response) => {
                props.setProfilePicUrl(response.data.rows);
                props.togglePicUploader(!props.togglePicUploader);
                setError(false);
            })
            .catch((err) => {
                console.log("err in axios post profile pic: ", err);
                setError(true);
            });
    };

    return (
        <>
            <img
                className="bar-icon"
                src="/camera.svg"
                onClick={() => props.togglePicUploader()}
            />

            {props.uploaderPicVisible && (
                <div className="upload-box">
                    <input
                        onChange={(e) => setFile(e.target.files[0])}
                        name="file"
                        type="file"
                        accept="image/*"
                    ></input>
                    <button className="btn" onClick={(e) => submitPic(e)}>
                        Upload
                    </button>
                </div>
            )}
        </>
    );
}
