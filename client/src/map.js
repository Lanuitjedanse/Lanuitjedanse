import React from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreateBar from "./createBar";
import { showAllBars, receiveGenres, addBar } from "./actions";

// console.log(("apiKey", apiKey));

const containerStyle = {
    width: "100vw",
    height: "100vh",
};

function myMap(props) {
    const dispatch = useDispatch();
    // console.log("props in map: ", props);
    const [latUser, setLatUser] = useState(0);
    const [lngUser, setLngUser] = useState(0);
    const [pinBarLocation, setPinBarLocation] = useState([]);
    const [markers, setMarkers] = useState([]);
    const [barPopUpVisible, setBarPopUpVisible] = useState(false);
    const [barPreviewVisible, setBarPreviewVisible] = useState(false);
    const [selectedBar, setSelectedBar] = useState({});
    const [selBarName, setSelBarName] = useState("");

    const bars = useSelector(
        (state) => state.allBars && state.allBars.filter((bar) => bar.id)
    );

    // console.log("bars", bars);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(
                (position) => {
                    setLatUser(position.coords.latitude);
                    setLngUser(position.coords.longitude);
                },
                (err) => console.log(err),
                { enableHighAccuracy: true, timeout: 10000, maximumAge: 10000 }
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

    console.log("selectedBar: ", selectedBar);

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
                {bars &&
                    bars.map((marker) => (
                        <Marker
                            key={marker.id}
                            position={{
                                lat: parseFloat(marker.lat),
                                lng: parseFloat(marker.lng),
                            }}
                            icon={{
                                url: "/placeholder.svg",
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
