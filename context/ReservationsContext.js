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
    const toDelete = myReservations.find(r => r.id_interna === id_interna);

    if (toDelete?.calendarEventId) {
      try {
        await Calendar.deleteEventAsync(toDelete.calendarEventId);
        console.log("Evento eliminado del calendario");
      } catch (err) {
        console.log("No se pudo borrar del calendario (quizá ya no existía)");
      }
    }

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