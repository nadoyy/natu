import { Marker, Popup } from "react-leaflet";
import { hospitalIcon } from "../../../map/markerIcons";
import { useHospitalsJateng } from "../../../hooks/useHospitalsJateng";

export default function HospitalMarkers() {
    const { hospitals, loading } = useHospitalsJateng();

    if (loading) return null;

    return (
        <>
            {hospitals.map((h, i) => (
                <Marker key={i} position={h.position} icon={hospitalIcon}>
                    <Popup>{h.name}</Popup>
                </Marker>
            ))}
        </>
    );
}
