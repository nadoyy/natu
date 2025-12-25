export async function sendEmergencyReport(token) {
    const res = await fetch(
        "https://natu-backend-production.up.railway.app/api/emergency",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ message: "Korban membutuhkan bantuan" }),
        }
    );

    if (res.status === 403) {
        throw new Error("403 Forbidden: hanya korban yang bisa mengirim laporan");
    }

    return res.json();
}
