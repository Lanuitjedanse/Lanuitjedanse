import { useState, useEffect } from "react";
import axios from "./Axios";

export default function EditProfile(props) {
    // console.log("editprofile: ", props);
    let [first, setFirst] = useState("");
    let [last, setLast] = useState("");
    // const [image, setImage] = useState("");
    let [email, setEmail] = useState(false);
    // const [id, setId] = useState("");
    let [pass, setPass] = useState("");
    let [error, setError] = useState(false);

    const editProfile = (e) => {
        e.preventDefault();

        first = first.length == 0 ? props.first : first;
        last = last.length == 0 ? props.last : last;
        email = email == false ? props.email : email;

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
            <button className="btn" onClick={() => props.toggleEditBox()}>
                Edit Profile
            </button>

            {props.editProfOpen && (
                <div className="edit-profile-box">
                    <h3>Edit your profile</h3>
                    <input
                        className="edit-field"
                        onChange={(e) => setFirst(e.target.value)}
                        name="first"
                        type="text"
                        placeholder="First Name"
                        autoComplete="off"
                        defaultValue={props.first}
                    ></input>
                    <input
                        className="edit-field"
                        onChange={(e) => setLast(e.target.value)}
                        name="last"
                        type="text"
                        placeholder="Last Name"
                        autoComplete="off"
                        defaultValue={props.last}
                    ></input>
                    <input
                        className="edit-field"
                        onChange={(e) => setEmail(e.target.value)}
                        name="email"
                        type="email"
                        placeholder="Email"
                        autoComplete="off"
                        defaultValue={props.email}
                    ></input>
                    <input
                        className="edit-field"
                        onChange={(e) => setPass(e.target.value)}
                        name="password"
                        type="password"
                        placeholder="Password"
                        autoComplete="off"
                    ></input>

                    <button className="btn" onClick={(e) => editProfile(e)}>
                        Submit Changes
                    </button>
                </div>
            )}
        </>
    );
}
