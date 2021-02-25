// import ProfilePic from "./ProfilePic";
// import BioEditor from "./BioEditor";
// import DeleteProfilePic from "./deleteProfilePic";
// import DeleteAccount from "./DeleteAccount";
import axios from "./Axios";
import { useState, useEffect } from "react";
import EditProfile from "./EditProfile";

export default function Profile(props) {
    console.log("props in profile: ", props);
    let [first, setFirst] = useState("");
    let [last, setLast] = useState("");
    // const [image, setImage] = useState("");
    let [email, setEmail] = useState(false);
    // const [id, setId] = useState("");
    let [pass, setPass] = useState("");
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
            <h3>
                {props.first} {props.last}
            </h3>

            <EditProfile
                first={props.first}
                last={props.last}
                email={props.email}
                toggleEditBox={props.toggleEditBox}
                editProfile={(e) => props.editProfile(e)}
            />
        </div>
    );
}

//  <div className="icon-box">
//      <img className="camera-icon" src="/camera.svg" />
//  </div>;
