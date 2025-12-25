import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

export default function ShowLocationControl({ position, zoom = 16 }) {
    const map = useMap();

    useEffect(() => {
        if (!map || !position) return;

        const control = L.control({ position: "topright" });

        control.onAdd = () => {
            const btn = L.DomUtil.create(
                "button",
                "leaflet-bar leaflet-control"
            );

            btn.innerText = "Lokasi Saya";

            // Styling minimal (biar konsisten dengan Leaflet)
            btn.style.background = "#333";
            btn.style.padding = "6px 10px";
            btn.style.cursor = "pointer";
            btn.style.fontWeight = "bold";
            btn.style.top = "85vh";
            btn.style.color = "white";

            // Hindari map ikut drag / zoom
            L.DomEvent.disableClickPropagation(btn);

            btn.onclick = () => {
                map.flyTo(position, zoom, {
                    animate: true,
                    duration: 1.2,
                });
            };

            return btn;
        };

        control.addTo(map);

        return () => {
            control.remove();
        };
    }, [map, position, zoom]);

    return null;
}
