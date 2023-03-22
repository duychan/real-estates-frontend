import React, { useState, useEffect, useCallback } from "react";

const useGeoLocation = () => {
    const [location, setLocation] = useState({
        loaded: false,
        coordinates: { lat: 0, lng: 0 },
        error: {
            code: 0,
            message: ""
        }
    });

    const onSuccess = useCallback(
        (position: GeolocationPosition) => {
            if (
                location.coordinates.lat === 0 &&
                location.coordinates.lng === 0
            )
                setLocation({
                    ...location,
                    loaded: true,
                    coordinates: {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    }
                });
        },
        [location]
    );

    const onError = useCallback(
        (error: GeolocationPositionError) => {
            if (
                location.coordinates.lat === 0 &&
                location.coordinates.lng === 0
            )
                setLocation({
                    ...location,
                    loaded: true,
                    error: {
                        code: error.code,
                        message: error.message
                    }
                });
        },
        [location]
    );

    useEffect(() => {
        if (!("geolocation" in navigator)) {
            setLocation({
                ...location,
                error: {
                    code: 0,
                    message: "Geolocation not supported"
                }
            });
        }

        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }, [location, onError, onSuccess]);

    return location;
};

export default useGeoLocation;
