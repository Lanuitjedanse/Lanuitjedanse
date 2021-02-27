import React from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { useState, useEffect, useRef, useCallback } from "react";
import CreateBar from "./createBar";

// console.log(("apiKey", apiKey));

const containerStyle = {
    width: "80vw",
    height: "90vh",
};

function myMap(props) {
    console.log("props in map: ", props);
    const [latUser, setLatUser] = useState(0);
    const [lngUser, setLngUser] = useState(0);
    const [pinBarLocation, setPinBarLocation] = useState([]);
    // const [barLat, setBarLat] = useState(0);
    // const [barLng, setBarLng] = useState(0);
    const [barPopUpVisible, setBarPopUpVisible] = useState(false);

    // const [lngBar, setLngBar] = useState(0);

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

    const loadMarker = (marker) => {
        console.log("marker: ", marker);
    };

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={userLocation}
            zoom={13}
            onLoad={onMapLoad}
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
                />
                {barPopUpVisible && (
                    <CreateBar
                        toggleCreateBar={toggleCreateBar}
                        setPinBarLocation={setPinBarLocation}
                        pinBarLocation={pinBarLocation}
                        updateBarLocation={props.updateBarLocation}
                    />
                )}
            </>
        </GoogleMap>
    ) : (
        <></>
    );
}

export default React.memo(myMap);

//    <Marker {...marker} onRightClick={() => props.onMarkerRightClick(marker)} />;
