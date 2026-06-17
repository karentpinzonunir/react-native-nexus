import React, { createContext, useState, useContext } from 'react';

// Creamos el contexto
const ReservationsContext = createContext();

// Proveedor del contexto
export const ReservationsProvider = ({ children }) => {
  const [myReservations, setMyReservations] = useState([]);

  // Función para añadir una reserva a la lista
  const addReservation = (newReservation) => {
    // newReservation debe ser un objeto con: id_espacio, nombre, fecha, ubicacion
    setMyReservations((prev) => [
      {
        id_interna: Date.now(), // ID único para el listado en memoria
        ...newReservation
      },
      ...prev // Las más nuevas aparecen primero
    ]);
  };

  // Función para cancelar/eliminar (opcional, por si quieres puntos extra)
  const removeReservation = (idInterna) => {
    setMyReservations((prev) => prev.filter(res => res.id_interna !== idInterna));
  };

  return (
    <ReservationsContext.Provider value={{ myReservations, addReservation, removeReservation }}>
      {children}
    </ReservationsContext.Provider>
  );
};

// Hook personalizado para usar las reservas fácilmente
export const useReservations = () => {
  const context = useContext(ReservationsContext);
  if (!context) {
    throw new Error('useReservations debe usarse dentro de un ReservationsProvider');
  }
  return context;
};