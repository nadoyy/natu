import L from "leaflet";

import userLocationGif from "/icons/location.gif";
import hospitalPng from "/icons/hospital.svg";

export const userLocationIcon = L.icon({
    iconUrl: userLocationGif,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
});

export const hospitalIcon = L.icon({
    iconUrl: hospitalPng,
    iconSize: [28, 28],
    iconAnchor: [14, 28],
    popupAnchor: [0, -30],
});
