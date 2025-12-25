import { useState, useEffect } from "react";
import { useAuth } from "../components/auth/AuthContext";

export default function useAuthFetch(url, options = {}) {
    const [data, setData] = useState(null);
    const [status, setStatus] = useState("loading");
    const [errorMessage, setErrorMessage] = useState(null);
    const { user } = useAuth();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setStatus("unauthorized");
            setErrorMessage("401 Unauthorized");
            return;
        }

        const fetchData = async () => {
            try {
                const res = await fetch(url, {
                    ...options,
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                        ...(options.headers || {}),
                    },
                });

                setStatus(res.ok ? "success" : "error");

                const json = await res.json();
                setData(res.ok ? json : null);
                if (!res.ok) setErrorMessage(json.error || "Terjadi kesalahan");
            } catch {
                setStatus("error");
                setErrorMessage("Tidak dapat menghubungi server");
            }
        };

        fetchData();
    }, [url, options, user]);

    return { data, status, errorMessage };
}
