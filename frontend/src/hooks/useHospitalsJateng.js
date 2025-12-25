import { useEffect, useState } from "react";
import { fetchHospitalsJateng } from "../services/hospitalService";
import { fetchWithRetry } from "../utils/fetchWithRetry";

export function useHospitalsJateng() {
    const [hospitals, setHospitals] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchHospitalsJateng(fetchWithRetry)
            .then(setHospitals)
            .finally(() => setLoading(false));
    }, []);

    return { hospitals, loading };
}
