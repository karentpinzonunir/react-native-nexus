import { useState, useEffect, useCallback } from 'react';
import api from '../api/axiosInstance';
import { ENDPOINTS } from '../api/endpoints';

export const useCoworking = () => {
    const [coworkings, setCoworkings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchCoworkings = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const res = await api.get(ENDPOINTS.ALL_COWORKING);
            setCoworkings(res.data ?? []);
        } catch (err) {
            setError(err?.message || 'No se pudo conectar con Apidog');
            if (process?.env?.NODE_ENV === 'development') console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCoworkings();
    }, [fetchCoworkings]);

    const getCoworkings = (ocupado) =>
        coworkings.filter((cow) => Boolean(cow.ocupado) === Boolean(ocupado));

    const getDetailsCoWorkingById = (id) => {
        const found = coworkings.find((cow) => Number(cow.id) === Number(id));
        if (found) {
            return found; 
        }
    };

    return {
        coworkings,
        loading,
        error,
        getCoworkings,
        getDetailsCoWorkingById,
        reload: fetchCoworkings,
    };
};