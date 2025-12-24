export function getUserPosition() {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject("Geolocation tidak didukung browser");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                resolve([pos.coords.latitude, pos.coords.longitude]);
            },
            (err) => {
                reject(err.message);
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
            }
        );
    });
}
