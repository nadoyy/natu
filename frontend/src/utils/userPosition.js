import { useState, useEffect } from "react";

/**
 * Hook untuk memantau posisi user
 */
export function useUserPosition() {
    const [position, setPosition] = useState(null);

    useEffect(() => {
        if (!navigator.geolocation) return;

        const watchId = navigator.geolocation.watchPosition(
            (pos) => setPosition([pos.coords.latitude, pos.coords.longitude]),
            (err) => console.error(err.message),
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        );

        return () => navigator.geolocation.clearWatch(watchId);
    }, []);

    return position;
}

/**
 * Fungsi untuk men-trigger recenter peta
 * @param {Map} mapInstance - instance react-leaflet useMap() atau ref-like object
 * @param {array} position - [lat, lng]
 */
export function showUserLocation(mapInstance, position) {
    if (mapInstance?.current && position) {
        mapInstance.current.setView(position, mapInstance.current.getZoom());
    }
}
