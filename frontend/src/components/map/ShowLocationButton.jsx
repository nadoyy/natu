import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import { showUserLocation } from "../../utils/userPosition";

export default function ShowLocationControl({ position }) {
    const map = useMap();

    useEffect(() => {
        if (!map) return;

        // Control di kanan atas secara default
        const control = L.control({ position: "topright" });

        control.onAdd = () => {
            const btn = L.DomUtil.create("button", "leaflet-bar");
            btn.innerText = "Show Location";

            // Styling tombol
            btn.style.background = "#333";
            btn.style.color = "white";
            btn.style.padding = "6px 10px";
            btn.style.border = "none";
            btn.style.borderRadius = "4px";
            btn.style.cursor = "pointer";
            btn.style.fontWeight = "bold";

            // Geser vertikal ke 85vh
            btn.style.position = "relative";  
            btn.style.top = "85vh";

            btn.onclick = () => showUserLocation({ current: map }, position);

            return btn;
        };

        control.addTo(map);

        return () => control.remove();
    }, [map, position]);

    return null;
}
