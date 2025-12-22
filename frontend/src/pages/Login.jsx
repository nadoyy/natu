import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [username, setUsername] = useState("");
    const [pin, setPin] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, pin }),
            });
            const data = await res.json();
            if (res.ok) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("role", data.user.role);
                alert(`Logged in as ${data.user.role}`);
                navigate("/");
            } else {
                setError(data.error);
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
                {error && <p className="text-red-500 mb-2">{error}</p>}
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="border p-2 rounded w-full"
                        required
                    />
                    <input
                        type="text"
                        placeholder="PIN"
                        value={pin}
                        onChange={(e) => setPin(e.target.value)}
                        className="border p-2 rounded w-full"
                        required
                    />
                    <button
                        type="submit"
                        className="bg-green-600 text-white py-2 rounded hover:bg-green-700 transition mt-2"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}
