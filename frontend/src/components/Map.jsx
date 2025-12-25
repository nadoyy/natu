import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function Map({
    center,
    markers = [],
    userMarker = null,
    zoom = 15,
    children
}) {
    if (!center) return <div>Loading map...</div>;

    return (
        <MapContainer
            center={center}
            zoom={zoom}
            className="min-h-screen w-screen"
            zoomControl={false}
            attributionControl={false}
        >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {markers.map((marker, index) => (
                <Marker
                    key={index}
                    position={marker.position}
                    icon={marker.icon}
                >
                    {marker.popup && <Popup>{marker.popup}</Popup>}
                </Marker>
            ))}

            {userMarker && (
                <Marker
                    position={userMarker.position}
                    icon={userMarker.icon}
                >
                    <Popup>Posisi Anda</Popup>
                </Marker>
            )}

            {children}
        </MapContainer>
    );
}
