export async function fetchHospitalsJateng(fetchWithRetry) {
    const query = `
    [out:json][timeout:50];
    area["name"="Jawa Tengah"]["admin_level"="4"]->.jateng;

    (
      node["amenity"="hospital"](area.jateng);
      way["amenity"="hospital"](area.jateng);
      relation["amenity"="hospital"](area.jateng);
    );

    out center tags;
  `;

    const res = await fetchWithRetry(
        "https://overpass-api.de/api/interpreter",
        {
            method: "POST",
            headers: { "Content-Type": "text/plain" },
            body: query,
        }
    );

    const data = await res.json();

    return data.elements
        .map((el) => ({
            name: el.tags?.name || "Rumah Sakit",
            position: el.lat
                ? [el.lat, el.lon]
                : el.center
                    ? [el.center.lat, el.center.lon]
                    : null,
        }))
        .filter((h) => h.position);
}
