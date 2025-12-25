import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import { showUserLocation } from "../../utils/userPosition";

export default function ShowLocationButton({ position }) {
    const map = useMap();

    useEffect(() => {
        if (!map) return;

        // Membuat control custom
        const control = L.control({ position: "bottomright" });

        control.onAdd = () => {
            const btn = L.DomUtil.create("button", "leaflet-bar");
            btn.innerText = "Show Location";

            // Styling tombol
            btn.style.background = "#3b82f6";
            btn.style.color = "white";
            btn.style.padding = "4px 8px";
            btn.style.border = "none";
            btn.style.borderRadius = "4px";
            btn.style.cursor = "pointer";

            // Aksi klik tombol
            btn.onclick = () => {
                showUserLocation({ current: map }, position);
            };

            return btn;
        };

        control.addTo(map);

        // Cleanup saat unmount
        return () => control.remove();
    }, [map, position]);

    return null;
}
