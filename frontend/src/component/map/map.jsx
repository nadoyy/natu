import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import { getUserPosition } from "../../utils/userPosition";

export default function Map() {
    const [position, setPosition] = useState(null);

    useEffect(() => {
        getUserPosition()
            .then(setPosition)
            .catch((err) => console.error(err));
    }, []);

    if (!position) {
        return (
            <div className="min-h-screen w-screen flex items-center justify-center">
                Mengambil lokasi...
            </div>
        );
    }
    return (
        <div className="min-h-screen w-screen flex items-center justify-center bg-white">
            <MapContainer
                className="min-h-screen w-screen"
                center={position}
                zoom={15}
                attributionControl={false}
                zoomControl={false}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <Marker position={position}>
                    <Popup>📍 Lokasi saya</Popup>
                </Marker>
            </MapContainer>
        </div>
    )
}