import { useState, useEffect, useCallback } from 'react';
import api from '../api/axiosInstance';
import { ENDPOINTS } from '../api/endpoints';

export const useCoworking = () => {
    const [coworkings, setCoworkings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // función encargada de traer la lista desde Apidog
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

    // retorna los coworkings filtrados por estado (ocupado: true/false)
    const getCoworkings = (ocupado) =>
        coworkings.filter((cow) => Boolean(cow.ocupado) === Boolean(ocupado));

    // obtiene detalles de un coworking por id (llamada puntual)
    const getDetailsCoWorkingById = async (id) => {
        try {
            setLoading(true);
            setError(null);
            const url = ENDPOINTS.COWORKING_BY_ID.replace('{id}', id);
            const res = await api.get(url);
            const data = res.data;

            if (!data) throw new Error('CoWorking no encontrado');
            if (Array.isArray(data)) throw new Error('Respuesta inesperada: arreglo en vez de objeto');

            // Validación ligera de consistencia
            if (data.id && Number(data.id) !== Number(id)) {
                console.warn(`Inconsistencia de datos: id esperado ${id}, recibido ${data.id}`);
            }

            return data;
        } catch (err) {
            setError(err?.message || 'No se pudo conectar con Apidog');
            if (process?.env?.NODE_ENV === 'development') console.error(err);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return {
        coworkings,
        loading,
        error,
        getCoworkings,
        getDetailsCoWorkingById,
        reload: fetchCoworkings, // permite forzar una recarga desde la UI si es necesario
    };
};