// import ProfilePic from "./ProfilePic";
// import BioEditor from "./BioEditor";
// import DeleteProfilePic from "./deleteProfilePic";
// import DeleteAccount from "./DeleteAccount";
import axios from "./Axios";
import { useState, useEffect } from "react";
import EditProfile from "./editProfile";
import UploaderPic from "./uploaderPic";
import MusicTaste from "./musicTaste";

export default function Profile(props) {
    // console.log("props in profile: ", props);

    const [editProfOpen, setEditProfOpen] = useState(false);

    const toggleEditBox = () => {
        setEditProfOpen(!editProfOpen);
    };

    const [uploaderPicVisible, setUploaderPicVisible] = useState(false);

    const togglePicUploader = () => {
        setUploaderPicVisible(!uploaderPicVisible);
    };
    const [musicTasteVisible, setMusicTasteVisible] = useState(false);

    const toggleMusicTaste = () => {
        setMusicTasteVisible(!musicTasteVisible);
    };
    let [error, setError] = useState(false);

    return (
        <div className="profile-container">
            <div className="profile-pic-box">
                <img src={props.image || "/avatar.jpg"} />
            </div>
            <UploaderPic
                setProfilePicUrl={props.setProfilePicUrl}
                togglePicUploader={togglePicUploader}
                uploaderPicVisible={uploaderPicVisible}
            />
            <h3>
                {props.first} {props.last}
            </h3>
            <EditProfile
                first={props.first}
                last={props.last}
                email={props.email}
                toggleEditBox={toggleEditBox}
                editProfOpen={editProfOpen}
                updateProfileData={props.updateProfileData}
            />
            <MusicTaste
                toggleMusicTaste={toggleMusicTaste}
                musicTasteVisible={musicTasteVisible}
            />
        </div>
    );
}

//  <div className="icon-box">
//      <img className="camera-icon" src="/camera.svg" />
//  </div>;
