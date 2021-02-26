import axios from "./Axios";
import { useState, useEffect } from "react";
// import ProfilePic from "./ProfilePic";
// export function Uploader() {
//     return <div className="uploader"></div>;
// }

export default function UploaderPic(props) {
    const [file, setFile] = useState("");
    const [error, setError] = useState("");

    const submitPic = (e) => {
        e.preventDefault();

        let formData = new FormData();
        formData.append("file", file);

        axios
            .post("/profile-pic", formData)
            .then((response) => {
                props.setProfilePicUrl(response.data.rows);
                props.setUploaderPicVisible(!props.uploaderPicVisible);
            })
            .catch((err) => {
                console.log("err in axios post profile pic: ", err);
                this.setState({
                    error: true,
                });
            });
    };

    return (
        <>
            <button onClick={() => props.togglePicUploader()}>Add a pic</button>
            {props.uploaderPicVisible && (
                <>
                    <input
                        onChange={(e) => setFile(e.target.files[0])}
                        name="file"
                        type="file"
                        accept="image/*"
                    ></input>
                    <button className="btn" onClick={(e) => submitPic(e)}>
                        Upload
                    </button>
                </>
            )}
        </>
    );
}

//     submit = (e) => {
//         e.preventDefault();
//         //Axios request
//         // we can use code from imageboard
//         // need to add column to users table profilepicurl
//         let formData = new FormData();
//         formData.append("file", this.state.file);

//         axios
//             .post("/profile-pic", formData)
//             .then((response) => {
//                 // console.log("profile pic woop woop!");
//                 // console.log(
//                 //     "response.data.rows profile pic: ",
//                 //     response.data.rows
//                 // );

//                 this.props.setProfilePicUrl(response.data.rows);
//             })
//             .catch((err) => {
//                 console.log("err in axios post profile pic: ", err);
//                 this.setState({
//                     error: true,
//                 });
//             });
//         // formData.append("profilepic", this.state.file);
//         // this.props.updateprofilePic(profilePicUrl);
//         // update the state of app with the new profile pic once it is available
//     }
//     render() {
//         console.log("this.prop in uploader: ", this.props);
//         return (
//             <div className="uploader border-orange">
//                 <input
//                     onChange={(e) => this.handleChange(e)}
//                     name="file"
//                     type="file"
//                     accept="image/*"
//                 ></input>
//                 <button className="btn" onClick={(e) => this.submit(e)}>
//                     Upload
//                 </button>
//                 {this.state.error && (
//                     <p className="error-msg-dark">Oops something went wrong.</p>
//                 )}
//             </div>
//         );
//     }
// }
