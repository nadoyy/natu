import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useUserPosition } from "../../utils/userPosition";
import ShowLocationButton from "./ShowLocationButton";
import customIcon from "../../utils/icons";

export default function Map() {
    const position = useUserPosition();

    if (!position) return <div>Loading location...</div>;

    return (
        <MapContainer center={position} zoom={15} className="h-screen w-screen" zoomControl={false} attributionControl={false}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={position} icon={customIcon}>
                <Popup>Lokasi saya</Popup>
            </Marker>
            <ShowLocationButton position={position} />
        </MapContainer>
    );
}
