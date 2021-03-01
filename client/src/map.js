import React from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreateBar from "./createBar";
import { showAllBars, receiveGenres } from "./actions";
import { Link, Route } from "react-router-dom";
import Bar from "./bar";

// console.log(("apiKey", apiKey));

const containerStyle = {
    width: "100vw",
    height: "100vh",
};

function myMap(props) {
    const dispatch = useDispatch();
    console.log("props in map: ", props.showPopUpBar);
    const [latUser, setLatUser] = useState(0);
    const [lngUser, setLngUser] = useState(0);
    const [pinBarLocation, setPinBarLocation] = useState([]);
    const [markers, setMarkers] = useState([]);
    const [barPopUpVisible, setBarPopUpVisible] = useState(false);
    const [barPreviewVisible, setBarPreviewVisible] = useState(false);
    const [selectedBar, setSelectedBar] = useState({});
    const [selBarName, setSelBarName] = useState("");
    const [popAllBar, setPopAllBar] = useState(false);

    const bars = useSelector(
        (state) => state.allBars && state.allBars.filter((bar) => bar.id)
    );

    // const musicGenres = useSelector(
    //     (state) =>
    //         state.musicGenres &&
    //         state.musicGenres.filter((music) => music.genre)
    // );

    // const musicGenre = {
    //     electronic: "electronic",
    //     hiphop: "hiphop",
    //     pop: "pop",
    //     rock: "rock",
    //     jazz: "jazz",
    //     reggae: "reggae",
    // };

    const barElectronic = useSelector(
        (state) =>
            state.allBars &&
            state.allBars.filter((bar) => bar.music == "electronic")
    );
    const barHiphop = useSelector(
        (state) =>
            state.allBars &&
            state.allBars.filter((bar) => bar.music == "hiphop")
    );
    const barPop = useSelector(
        (state) =>
            state.allBars && state.allBars.filter((bar) => bar.music == "pop")
    );
    const barRock = useSelector(
        (state) =>
            state.allBars && state.allBars.filter((bar) => bar.music == "rock")
    );
    const barReggae = useSelector(
        (state) =>
            state.allBars &&
            state.allBars.filter((bar) => bar.music == "reggae")
    );

    const barJazz = useSelector(
        (state) =>
            state.allBars && state.allBars.filter((bar) => bar.music == "jazz")
    );
    console.log("electronic: ", barElectronic);

    let icon;

    if (barElectronic) {
        icon = "/electronic.svg";
    } else if (barHiphop) {
        icon = "/hiphop.svg";
    } else if (barPop) {
        icon = "/pop.svg";
    } else if (barRock) {
        icon = "/rock.svg";
    } else if (barReggae) {
        icon = "/reggae.svg";
    } else if (barJazz) {
        icon = "/jazz.svg";
    }

    barElectronic && icon == "/electronic.svg";
    // const barPerGenre = useSelector(
    //     (state) =>
    //         state.allBars &&
    //         state.allBars.map((bar) => bar.music == "electronic")
    // );

    // const music = ["electronic", "hiphop", "pop", "rock", "rock", "reggae"];
    // const index = music.length;
    // console.log("music: ", music);

    // console.log("bar", barPerGenre);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(
                (position) => {
                    setLatUser(position.coords.latitude);
                    setLngUser(position.coords.longitude);
                },
                (err) => console.log(err),
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 10000,
                }
            );
        } else {
            //  // No Support Web
            alert("The browser doesn't support Geolocation");
        }
    }, []);

    useEffect(() => {
        dispatch(showAllBars());
        dispatch(receiveGenres());
    }, []);

    const userLocation = {
        lat: latUser,
        lng: lngUser,
    };

    // console.log("userLocation: ", userLocation);

    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: apiKey,
    });

    const [map, setMap] = React.useState(null);

    // const onLoad = React.useCallback(function callback(map) {
    //     const bounds = new window.google.maps.LatLngBounds();
    //     map.fitBounds(bounds);
    //     setMap(map);
    // }, []);

    const mapRef = useRef();
    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
    }, []);

    // const onUnmount = React.useCallback(function callback(map) {
    //     setMap(null);
    // }, []);

    const onMapMount = useCallback((map) => {
        mapRef.current = map;
    }, []);

    const addMarker = (e) => {
        // console.log(("e, ", e.latLng));
        console.log("e: ", e);
        console.log(("e, ", e.latLng.lat())); // lat
        console.log(("e, ", e.latLng.lng())); // lng
        setPinBarLocation({ lat: e.latLng.lat(), lng: e.latLng.lng() });

        toggleCreateBar();
    };

    const toggleCreateBar = () => {
        setBarPopUpVisible(!barPopUpVisible);
        console.log("visibility: ", barPopUpVisible);
    };

    const toggleBarPreview = () => {
        setBarPreviewVisible(!barPreviewVisible);
    };

    const showPopUp = (marker) => {
        console.log("e", marker);
        setSelectedBar({
            id: marker.id,
            user_id: marker.user_id,
            name: marker.name,
            description: marker.description,
            img: marker.img_bar,
            lat: marker.lat,
            lng: marker.lng,
            music: marker.music,
            created: marker.created_at,
        });

        // setSelBarName(marker.name);

        // console.log("selectedBar: ", setSelectedBar);
        toggleBarPreview();
        // window.location.href = `/all-bars/${marker.id}`;
    };

    const openPopUpinAllBars = () => {
        setPopAllBar(!popAllBar);
    };

    const loadMarker = (marker) => {
        console.log("marker: ", marker);
    };

    if (!bars) {
        return null;
    }

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={userLocation}
            zoom={13}
            onLoad={onMapLoad}
            onUnmount={onMapMount}
            onClick={(e) => addMarker(e)}
        >
            {/* Child components, such as markers, info windows, etc. */}
            <>
                <Marker
                    onLoad={loadMarker}
                    position={{
                        lat: parseFloat(pinBarLocation.lat),
                        lng: parseFloat(pinBarLocation.lng),
                    }}
                    icon={{
                        url: "/placeholder-new.svg",
                        scaledSize: new window.google.maps.Size(30, 30),
                        origin: new window.google.maps.Point(0, 0),
                        anchor: new window.google.maps.Point(15, 15),
                    }}
                />
                {barElectronic &&
                    barElectronic.map((marker) => (
                        <Marker
                            key={marker.id}
                            position={{
                                lat: parseFloat(marker.lat),
                                lng: parseFloat(marker.lng),
                            }}
                            icon={{
                                url: "/electronic.svg",
                                scaledSize: new window.google.maps.Size(30, 30),
                                origin: new window.google.maps.Point(0, 0),
                                anchor: new window.google.maps.Point(15, 15),
                            }}
                            onClick={() => showPopUp(marker)}
                        />
                    ))}

                {barHiphop &&
                    barHiphop.map((marker) => (
                        <Marker
                            key={marker.id}
                            position={{
                                lat: parseFloat(marker.lat),
                                lng: parseFloat(marker.lng),
                            }}
                            icon={{
                                url: "/hiphop.svg",
                                scaledSize: new window.google.maps.Size(30, 30),
                                origin: new window.google.maps.Point(0, 0),
                                anchor: new window.google.maps.Point(15, 15),
                            }}
                            onClick={() => showPopUp(marker)}
                        />
                    ))}
                {barPop &&
                    barPop.map((marker) => (
                        <Marker
                            key={marker.id}
                            position={{
                                lat: parseFloat(marker.lat),
                                lng: parseFloat(marker.lng),
                            }}
                            icon={{
                                url: "/pop.svg",
                                scaledSize: new window.google.maps.Size(30, 30),
                                origin: new window.google.maps.Point(0, 0),
                                anchor: new window.google.maps.Point(15, 15),
                            }}
                            onClick={() => showPopUp(marker)}
                        />
                    ))}
                {barRock &&
                    barRock.map((marker) => (
                        <Marker
                            key={marker.id}
                            position={{
                                lat: parseFloat(marker.lat),
                                lng: parseFloat(marker.lng),
                            }}
                            icon={{
                                url: "/rock.svg",
                                scaledSize: new window.google.maps.Size(30, 30),
                                origin: new window.google.maps.Point(0, 0),
                                anchor: new window.google.maps.Point(15, 15),
                            }}
                            onClick={() => showPopUp(marker)}
                        />
                    ))}
                {barReggae &&
                    barReggae.map((marker) => (
                        <Marker
                            key={marker.id}
                            position={{
                                lat: parseFloat(marker.lat),
                                lng: parseFloat(marker.lng),
                            }}
                            icon={{
                                url: "/reggae.svg",
                                scaledSize: new window.google.maps.Size(30, 30),
                                origin: new window.google.maps.Point(0, 0),
                                anchor: new window.google.maps.Point(15, 15),
                            }}
                            onClick={() => showPopUp(marker)}
                        />
                    ))}
                {barJazz &&
                    barJazz.map((marker) => (
                        <Marker
                            key={marker.id}
                            position={{
                                lat: parseFloat(marker.lat),
                                lng: parseFloat(marker.lng),
                            }}
                            icon={{
                                url: "/jazz.svg",
                                scaledSize: new window.google.maps.Size(30, 30),
                                origin: new window.google.maps.Point(0, 0),
                                anchor: new window.google.maps.Point(15, 15),
                            }}
                            onClick={() => showPopUp(marker)}
                        />
                    ))}

                {barPopUpVisible && (
                    <CreateBar
                        toggleCreateBar={toggleCreateBar}
                        setPinBarLocation={setPinBarLocation}
                        pinBarLocation={pinBarLocation}
                        updateBarLocation={props.updateBarLocation}
                    />
                )}
                {barPreviewVisible && (
                    <div className="overlay">
                        <div className="create-bar-box">
                            <div className="bar-title">
                                <img
                                    className="bar-bop-icon"
                                    src="/cocktails.svg"
                                />
                                <h2>{selectedBar.name}</h2>
                                <img
                                    className="bar-bop-icon"
                                    src="/x-btn.svg"
                                    onClick={toggleBarPreview}
                                />
                            </div>

                            <img
                                className="img-bar-pop-up"
                                src={selectedBar.img || "/avatar.jpg"}
                                alt={selectedBar.name}
                            />

                            <p>{selectedBar.description}</p>
                            <div className="music-box">
                                <img
                                    className="bar-bop-icon"
                                    src="/subwoofer.svg"
                                />
                                <p>{selectedBar.music}</p>
                                <Link
                                    to={`/all-bars/${selectedBar.id}`}
                                    onClick={props.showPopUpBar}
                                >
                                    <p>View more</p>
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </>
        </GoogleMap>
    ) : (
        <></>
    );
}

export default React.memo(myMap);

//  {
//      popAllBar && (
//          <Route
//              path="/all-bars/:id"
//              render={(props) => (
//                  <Bar
//                      openPopUpinAllBars={openPopUpinAllBars}
//                      key={props.match.url}
//                      match={props.match}
//                      history={props.history}
//                  />
//              )}
//          />
//      );
//  }

// {
//     barPreviewVisible && (
//         <Route
//             path={"/:id"}
//             render={(props) => (
//                 <Bar
//                     selectedBar={selectedBar}
//                     barPreviewVisible={barPreviewVisible}
//                     key={props.match.url}
//                     match={props.match}
//                     history={props.history}
//                 />
//             )}
//         />
//     );
// }

//   <Marker
//       onLoad={loadMarker}
//       position={{
//           lat: parseFloat(props.lat),
//           lng: parseFloat(props.lng),
//       }}
//   />;
