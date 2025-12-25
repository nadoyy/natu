import useAuthFetch from "../auth/useAuthFetch";

export default function Dashboard() {
    const { data: user, status, errorMessage } = useAuthFetch(
        "https://natu-backend-production.up.railway.app/api/dashboard"
    );

    if (status === "loading") return <div>Loading...</div>;
    if (status !== "success") return <div>{errorMessage}</div>;
    if (!user) return <div>Data user tidak tersedia</div>;

    return (
        <div>
            <h1>Dashboard</h1>
            <p>Nama: {user?.username || "Unknown"}</p>
            <p>Role: {user.role}</p>
        </div>
    );
}
