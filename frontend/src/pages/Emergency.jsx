import Map from "../components/map/Map";
import useAuthFetch from "../hooks/useAuthFetch";

export default function Emergency() {
    const { data: user, status, errorMessage } = useAuthFetch(
        "https://natu-backend-production.up.railway.app/api/dashboard"
    );

    const token = localStorage.getItem("token");

    const sendEmergency = async () => {
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
            alert("403 Forbidden: hanya korban yang bisa mengirim laporan");
            return;
        }

        const data = await res.json();
        alert(data.message);
    };

    if (status === "loading") return <div>Loading...</div>;
    if (status !== "success") return <div>{errorMessage}</div>;
    if (!user) return <div>Data user tidak tersedia</div>;
    if (user.role !== "korban") return <div>403 Forbidden</div>;

    return (
        <div className="min-h-screen w-screen">
            <Map />
        </div>
    );
}
