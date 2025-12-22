import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
            <h1 className="text-3xl font-bold mb-6">Selamat Datang</h1>
            <div className="flex gap-4">
                <Link
                    to="/register"
                    className="bg-red-600 text-white py-2 px-6 rounded hover:bg-red-700 transition"
                >
                    Register
                </Link>
                <Link
                    to="/login"
                    className="bg-green-600 text-white py-2 px-6 rounded hover:bg-green-700 transition"
                >
                    Login
                </Link>
            </div>
        </div>
    );
}
