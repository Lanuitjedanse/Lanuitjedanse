import React from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreateBar from "./createBar";
import { showAllBars, receiveGenres, musicTasteUser } from "./actions";

import { Link, Route } from "react-router-dom";
import Bar from "./bar";

// console.log(("apiKey", apiKey));

const containerStyle = {
    width: "100vw",
    height: "calc(100vh - 80px)",
};

function myMap(props) {
    const dispatch = useDispatch();
    // console.log("props in map: ", props.showPopUpBar);
    const [latUser, setLatUser] = useState(0);
    const [lngUser, setLngUser] = useState(0);
    const [pinBarLocation, setPinBarLocation] = useState([]);
    const [markers, setMarkers] = useState([]);
    const [barPopUpVisible, setBarPopUpVisible] = useState(false);
    const [barPreviewVisible, setBarPreviewVisible] = useState(false);
    const [selectedBar, setSelectedBar] = useState({});
    // const [selBarName, setSelBarName] = useState("");
    const [popAllBar, setPopAllBar] = useState(false);

    const bars = useSelector(
        (state) => state.allBars && state.allBars.filter((bar) => bar.id)
    );

    const userTaste = useSelector((state) => state.musicTaste);

    const likedMusic = useSelector(
        (state) =>
            state.musicTaste &&
            userTaste[0] &&
            Object.keys(userTaste[0]).filter(
                (key) => userTaste[0][key] === true
            )
    );

    // console.log("likedMusic.length: ", likedMusic);

    // const musicGenre = {
    //     electronic: "electronic",
    //     hiphop: "hiphop",
    //     pop: "pop",
    //     rock: "rock",
    //     jazz: "jazz",
    //     reggae: "reggae",
    //     disco: "disco",
    // };

    // const barElectronic = useSelector(
    //     (state) =>
    //         state.allBars &&
    //         state.allBars.filter((bar) => bar.music == musicGenre.electronic)
    // );
    // const barHiphop = useSelector(
    //     (state) =>
    //         state.allBars &&
    //         state.allBars.filter((bar) => bar.music == musicGenre.hiphop)
    // );
    // const barPop = useSelector(
    //     (state) =>
    //         state.allBars &&
    //         state.allBars.filter((bar) => bar.music == musicGenre.pop)
    // );
    // const barRock = useSelector(
    //     (state) =>
    //         state.allBars &&
    //         state.allBars.filter((bar) => bar.music == musicGenre.rock)
    // );
    // const barReggae = useSelector(
    //     (state) =>
    //         state.allBars &&
    //         state.allBars.filter((bar) => bar.music == musicGenre.reggae)
    // );

    // const barJazz = useSelector(
    //     (state) =>
    //         state.allBars &&
    //         state.allBars.filter((bar) => bar.music == musicGenre.jazz)
    // );

    // const barDisco = useSelector(
    //     (state) =>
    //         state.allBars &&
    //         state.allBars.filter((bar) => bar.music == musicGenre.disco)
    // );

    let matches = [];

    if (likedMusic && bars) {
        for (let i = 0; i < likedMusic.length; i++) {
            // console.log(arr[i]);
            // console.log("likedMusic: ", likedMusic[i]);
            for (let j = 0; j < bars.length; j++) {
                // console.log(bars[j]);
                if (likedMusic[i] == bars[j].music) {
                    // console.log(bars[j]);
                    matches.push(bars[j]);
                }
            }
        }
    }

    const musicForIcon = {
        electronic: "/markers/electronic.svg",
        hiphop: "/markers/hiphop.svg",
        pop: "/markers/pop.svg",
        rock: "/markers/rock.svg",
        jazz: "/markers/jazz.svg",
        reggae: "/markers/reggae.svg",
        disco: "/markers/disco.svg",
    };

    let setIconColor = (someStyle) => musicForIcon[someStyle];

    let watchId;

    const userLocation = {
        lat: latUser,
        lng: lngUser,
    };

    useEffect(() => {
        console.log("userLocation: ", userLocation);
        if (navigator.geolocation) {
            watchId = navigator.geolocation.watchPosition(
                (position) => {
                    console.log("position: ", position);
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
            return () => {
                console.log("running cleanup fn");
                navigator.geolocation.clearWatch(watchId);
            };
        } else {
            //  // No Support Web
            alert("The browser doesn't support Geolocation");
        }
    }, [latUser]);

    useEffect(() => {
        dispatch(showAllBars());
        dispatch(receiveGenres());
        dispatch(musicTasteUser());
    }, []);

    // console.log("apiKey: ", apiKey);

    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: apiKey,
    });
    const [map, setMap] = React.useState(null);

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

        toggleBarPreview();
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
                        url: "/markers/placeholder-new.svg",
                        scaledSize: new window.google.maps.Size(30, 30),
                        origin: new window.google.maps.Point(0, 0),
                        anchor: new window.google.maps.Point(15, 15),
                    }}
                />

                {matches &&
                    matches.map((marker, i) => (
                        <Marker
                            key={marker.id}
                            position={{
                                lat: parseFloat(marker.lat),
                                lng: parseFloat(marker.lng),
                            }}
                            icon={{
                                url: `${setIconColor(matches[i].music)}`,
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
                        <div className="preview-bar-box">
                            <div className="preview-title">
                                <img
                                    className="bar-icon"
                                    src="/cocktails.svg"
                                />
                                <h2>{selectedBar.name}</h2>
                                <img
                                    className="bar-icon-close"
                                    src="/x-btn.svg"
                                    onClick={toggleBarPreview}
                                />
                            </div>

                            <img
                                className="preview-pop-img"
                                src={selectedBar.img || "/avatar.jpg"}
                                alt={selectedBar.name}
                            />

                            <div className="music-box">
                                <img
                                    className="bar-icon"
                                    src={`/music-white/${selectedBar.music}.svg`}
                                />
                                <p className="capitalize">
                                    {selectedBar.music}
                                </p>
                            </div>
                            <Link
                                to={`/all-bars/${selectedBar.id}`}
                                onClick={props.showPopUpBar}
                            >
                                <button className="btn white">View more</button>
                            </Link>
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

/* {matches.length == 0 ||
                    (likedMusic.length == 7 && (
                        <>
                            {barElectronic &&
                                barElectronic.map((marker) => (
                                    <Marker
                                        key={marker.id}
                                        position={{
                                            lat: parseFloat(marker.lat),
                                            lng: parseFloat(marker.lng),
                                        }}
                                        icon={{
                                            url: "/markers/electronic.svg",
                                            scaledSize: new window.google.maps.Size(
                                                30,
                                                30
                                            ),
                                            origin: new window.google.maps.Point(
                                                0,
                                                0
                                            ),
                                            anchor: new window.google.maps.Point(
                                                15,
                                                15
                                            ),
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
                                            url: "/markers/hiphop.svg",
                                            scaledSize: new window.google.maps.Size(
                                                30,
                                                30
                                            ),
                                            origin: new window.google.maps.Point(
                                                0,
                                                0
                                            ),
                                            anchor: new window.google.maps.Point(
                                                15,
                                                15
                                            ),
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
                                            url: "/markers/pop.svg",
                                            scaledSize: new window.google.maps.Size(
                                                30,
                                                30
                                            ),
                                            origin: new window.google.maps.Point(
                                                0,
                                                0
                                            ),
                                            anchor: new window.google.maps.Point(
                                                15,
                                                15
                                            ),
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
                                            url: "/markers/rock.svg",
                                            scaledSize: new window.google.maps.Size(
                                                30,
                                                30
                                            ),
                                            origin: new window.google.maps.Point(
                                                0,
                                                0
                                            ),
                                            anchor: new window.google.maps.Point(
                                                15,
                                                15
                                            ),
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
                                            url: "/markers/reggae.svg",
                                            scaledSize: new window.google.maps.Size(
                                                30,
                                                30
                                            ),
                                            origin: new window.google.maps.Point(
                                                0,
                                                0
                                            ),
                                            anchor: new window.google.maps.Point(
                                                15,
                                                15
                                            ),
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
                                            url: "/markers/jazz.svg",
                                            scaledSize: new window.google.maps.Size(
                                                30,
                                                30
                                            ),
                                            origin: new window.google.maps.Point(
                                                0,
                                                0
                                            ),
                                            anchor: new window.google.maps.Point(
                                                15,
                                                15
                                            ),
                                        }}
                                        onClick={() => showPopUp(marker)}
                                    />
                                ))}

                            {barDisco &&
                                barDisco.map((marker) => (
                                    <Marker
                                        key={marker.id}
                                        position={{
                                            lat: parseFloat(marker.lat),
                                            lng: parseFloat(marker.lng),
                                        }}
                                        icon={{
                                            url: "/markers/disco.svg",
                                            scaledSize: new window.google.maps.Size(
                                                30,
                                                30
                                            ),
                                            origin: new window.google.maps.Point(
                                                0,
                                                0
                                            ),
                                            anchor: new window.google.maps.Point(
                                                15,
                                                15
                                            ),
                                        }}
                                        onClick={() => showPopUp(marker)}
                                    />
                                ))}
                        </>
                    ))} */
