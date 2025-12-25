import Map from "../../../components/Map";
import ShowLocationButton from "../../../components/ShowLocationButton";
import { userLocationIcon, hospitalIcon } from "../../../map/markerIcons";
import { useHospitalsJateng } from "../../../hooks/useHospitalsJateng";

export default function EmergencyMap({
    center,
    userPosition,
    initialZoom
}) {
    // Marker user
    const userMarker = userPosition && {
        position: userPosition,
        icon: userLocationIcon,
    };

    // Ambil data rumah sakit
    const { hospitals, loading } = useHospitalsJateng();

    // Convert hospital → marker
    const hospitalMarkers = hospitals.map((h) => ({
        position: h.position,
        icon: hospitalIcon,
        popup: h.name,
    }));

    return (
        <Map
            center={center}
            zoom={initialZoom}
            markers={hospitalMarkers}
            userMarker={userMarker}
        >
            {userPosition && (
                <ShowLocationButton
                    position={userPosition}
                    zoom={16}
                />
            )}

            {loading && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000] bg-white px-3 py-1 rounded shadow">
                    Memuat rumah sakit...
                </div>
            )}
        </Map>
    );
}
