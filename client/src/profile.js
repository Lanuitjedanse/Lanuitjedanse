// import ProfilePic from "./ProfilePic";
// import BioEditor from "./BioEditor";
// import DeleteProfilePic from "./deleteProfilePic";
// import DeleteAccount from "./DeleteAccount";
import axios from "./Axios";
import { useState, useEffect } from "react";
import EditProfile from "./EditProfile";
import UploaderPic from "./uploaderPic";

export default function Profile(props) {
    console.log("props in profile: ", props);
    // let [first, setFirst] = useState("");
    // let [last, setLast] = useState("");
    // // const [image, setImage] = useState("");
    // let [email, setEmail] = useState(false);
    // // const [id, setId] = useState("");
    // let [pass, setPass] = useState("");

    const [editProfOpen, setEditProfOpen] = useState(false);

    const toggleEditBox = () => {
        setEditProfOpen(!editProfOpen);
    };

    const [uploaderPicVisible, setUploaderPicVisible] = useState(false);

    const togglePicUploader = () => {
        setUploaderPicVisible(!uploaderPicVisible);
    };
    let [error, setError] = useState(false);
    // console.log("props in profile: ", props);

    // useEffect(() => {
    //     setFirst(props.first);
    //     setLast(props.last);
    //     setEmail(props.email);
    // }, []);

    return (
        <div className="profile-container">
            <div className="profile-pic-box">
                <img src={props.image || "/avatar.jpg"} />
            </div>
            <UploaderPic
                setProfilePicUrl={props.setProfilePicUrl}
                setUploaderPicVisible={setUploaderPicVisible}
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
                // editProfile={(e) => props.editProfile(e)}
                updateProfileData={(info) => props.updateProfileData(info)}
            />
        </div>
    );
}

//  <div className="icon-box">
//      <img className="camera-icon" src="/camera.svg" />
//  </div>;
