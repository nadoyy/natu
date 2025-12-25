import L from "leaflet";
import markerIcon from "/icons/location.gif";

const customIcon = L.icon({
    iconUrl: markerIcon,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
});


export default customIcon;