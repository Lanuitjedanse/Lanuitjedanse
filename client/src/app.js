import axios from "./Axios";

import Header from "./Header";

import { BrowserRouter, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Profile from "./profile";
import MyMap from "./map";

export default function App() {
    // console.log("this.state in app: ", this.state);
    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");
    const [image, setImage] = useState("");
    const [id, setId] = useState("");
    const [error, setError] = useState(false);
    const [email, setEmail] = useState(false);

    // console.log("props in app: ", props);

    useEffect(() => {
        axios
            .get("/api/user")
            .then((res) => {
                setFirst(res.data.rows.first);
                setLast(res.data.rows.last);
                setImage(res.data.rows.image);
                setId(res.data.rows.id);
                setEmail(res.data.rows.email);
                setError(false);
            })
            .catch((err) => {
                console.log("error in axios api/user: ", err);
                setError(true);
            });
    }, []);

    // const updateProfileData = (info) => {
    //     console.log("info: ", info);
    //     setFirst(info.first);
    //     setLast(info.last);
    //     setEmail(info.email);
    // };
    const updateProfileData = (info) => {
        console.log(info);
        setFirst(info.first);
        setLast(info.last);
        setEmail(info.email);
    };

    const setProfilePicUrl = (image) => {
        setImage(image);
    };

    return (
        <BrowserRouter>
            <div className="app">
                <Header id={id} first={first} last={last} image={image} />
                <Route
                    exact
                    path="/profile"
                    render={() => (
                        <Profile
                            id={id}
                            first={first}
                            last={last}
                            image={image}
                            email={email}
                            updateProfileData={updateProfileData}
                            setProfilePicUrl={setProfilePicUrl}

                            // playlist={this.state.playlist}
                        />
                    )}
                />
                <Route exact path="/" render={() => <MyMap />} />
            </div>
        </BrowserRouter>
    );
}
