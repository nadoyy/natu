import { useUserPosition } from "../../hooks/userPosition";
import useAuthFetch from "../../auth/useAuthFetch";
import EmergencyMap from "./components/EmergencyMap";
import { sendEmergencyReport } from "../../services/emergencyServices";

const PROVINCE_CENTER = [-7.15, 110.14]; // Jawa Tengah
const PROVINCE_ZOOM = 8;

export default function EmergencyPage() {
    // GPS user
    const userPosition = useUserPosition();

    // Auth & role
    const { data: user, status, errorMessage } = useAuthFetch(
        "https://natu-backend-production.up.railway.app/api/dashboard"
    );

    const token = localStorage.getItem("token");

    const handleEmergency = async () => {
        try {
            const res = await sendEmergencyReport(token);
            alert(res.message);
        } catch (e) {
            alert(e.message || "Gagal mengirim laporan darurat");
        }
    };

    /* ========= GUARD ========= */

    if (status === "loading") return <div>Loading...</div>;
    if (status !== "success") return <div>{errorMessage}</div>;
    if (!user) return <div>Data user tidak tersedia</div>;
    if (user.role !== "korban") return <div>403 Forbidden</div>;

    /* ========= RENDER ========= */

    return (
        <div className="min-h-screen w-screen relative">
            <EmergencyMap
                center={PROVINCE_CENTER}
                initialZoom={PROVINCE_ZOOM}
                userPosition={userPosition}
            />
        </div>
    );
}
