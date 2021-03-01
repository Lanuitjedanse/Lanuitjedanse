import axios from "./Axios";

import Header from "./Header";

import { BrowserRouter, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Profile from "./profile";
import MyMap from "./map";
import CreateBar from "./createBar";
import Bar from "./bar";
import YesOrNo from "./yesOrNo";
import AllBars from "./allBars";
import LikedMusic from "./likedMusic";
import DislikedMusic from "./dislikedMusic";
import DisplayMusicTaste from "./displayMusicTaste";
import Ratings from "./ratings";

export default function App() {
    // console.log("this.state in app: ", this.state);
    const [first, setFirst] = useState("");
    const [last, setLast] = useState("");
    const [image, setImage] = useState("");
    const [id, setId] = useState("");
    const [error, setError] = useState(false);
    const [email, setEmail] = useState(false);
    const [barLocation, setBarLocation] = useState([]);
    const [barName, setBarName] = useState("");
    const [barMusic, setBarMusic] = useState("");
    const [imgBar, setImgbar] = useState("");
    const [userIdBar, setUserIdBar] = useState("");
    const [description, setDescription] = useState("");
    const [barId, setBarId] = useState("");
    const [lat, setLat] = useState("");
    const [lng, setLng] = useState("");

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

        axios
            .get("/api/all-bars")
            .then((res) => {
                // console.log("response: ", res.data.rows);
                setLat(res.data.rows.lat);
                setLng(res.data.rows.lng);
                // console.log("barLocation: ", barLocation);
                setBarMusic(res.data.rows.music);
                setBarName(res.data.rows.name);
                setImgbar(res.data.rows.img_bar);
                setUserIdBar(res.data.rows.user_id);
                setDescription(res.data.rows.description);
                setBarId(res.data.rows.id);
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

    // };
    const updateBarLocation = (loc) => {
        // console.log("update: ", loc);
        // setBarLocation({
        //     lat: loc.lat,
        //     lng: loc.barLocation.lng,
        // });

        setLat(loc.lat);
        setLng(loc.lng);
        setBarMusic(loc.music);
        setBarName(loc.name);
        setImgbar(loc.img_bar);
        setUserIdBar(loc.user_id);
        setDescription(loc.description);
        setBarId(loc.id);
    };

    const updateProfileData = (info) => {
        // console.log(info);
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
                <Route
                    path="/add-bar"
                    render={() => (
                        <CreateBar updateBarLocation={updateBarLocation} />
                    )}
                />
                <Route
                    exact
                    path="/"
                    render={() => (
                        <MyMap
                            id={id}
                            updateBarLocation={updateBarLocation}
                            barName={barName}
                            barMusic={barMusic}
                            imgBar={imgBar}
                            userIdBar={userIdBar}
                            description={description}
                            lat={lat}
                            lng={lng}
                            barId={barId}
                        />
                    )}
                />

                <Route path="/yes-or-no" render={() => <YesOrNo />} />

                <Route
                    path="/display-taste"
                    render={() => <DisplayMusicTaste />}
                />

                <Route
                    path="/all-bars"
                    render={() => (
                        <AllBars
                            updateBarLocation={updateBarLocation}
                            barName={barName}
                            barMusic={barMusic}
                            imgBar={imgBar}
                            userIdBar={userIdBar}
                            description={description}
                            lat={lat}
                            lng={lng}
                            barId={barId}
                        />
                    )}
                />
                <Route
                    path="/all-bars/:id"
                    render={(props) => (
                        <Bar
                            barPopUpVisible={props.barPopUpVisible}
                            showPopUpBar={props.showPopUpBar}
                            key={props.match.url}
                            match={props.match}
                            history={props.history}
                        />
                    )}
                />
                <Route
                    path="/ratings/:id"
                    render={(props) => (
                        <Ratings
                            id={id}
                            barId={barId}
                            key={props.match.url}
                            match={props.match}
                            history={props.history}
                        />
                    )}
                />
            </div>
        </BrowserRouter>
    );
}

{
    /* <Route path="/comments" render={() => <Comments id={id} barId={barId} />} />; */
}

//    <Route
//        path="/show-bar/:id"
//        render={(props) => (
//            <Bar
//                path="/show-bar/:id"
//                key={props.match.url}
//                match={props.match}
//                history={props.history}
//            />
//        )}
//    />;

//   <Route path="/liked-music" render={() => <LikedMusic />} />
//                 <Route
//                     path="/disliked-music"
//                     render={() => <DislikedMusic />}
//                 />
