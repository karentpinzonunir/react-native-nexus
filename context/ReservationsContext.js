import React, { createContext, useState, useContext } from 'react';
import * as Calendar from 'expo-calendar';

const ReservationsContext = createContext();

export const ReservationsProvider = ({ children }) => {
  const [myReservations, setMyReservations] = useState([]);

  const addReservation = (reservation) => {
    setMyReservations(prev => [
      ...prev,
      { 
        ...reservation, 
        id_interna: Date.now().toString() 
      }
    ]);
  };

  const removeReservation = async (id_interna) => {
    // Busca la reserva que vamos a eliminar
    const toDelete = myReservations.find(r => r.id_interna === id_interna);

    if (toDelete?.calendarEventId) {
      try {
        // 🔴 Borra el evento del calendario nativo del celular
        await Calendar.deleteEventAsync(toDelete.calendarEventId);
        console.log("Evento eliminado del calendario");
      } catch (err) {
        // Si ya fue borrado manualmente o no existe, no crashea la app
        console.log("No se pudo borrar del calendario (quizá ya no existía)");
      }
    }

    // Borra de nuestra memoria interna
    setMyReservations(prev => prev.filter(r => r.id_interna !== id_interna));
  };

  return (
    <ReservationsContext.Provider 
      value={{ myReservations, addReservation, removeReservation }}
    >
      {children}
    </ReservationsContext.Provider>
  );
};

export const useReservations = () => useContext(ReservationsContext);