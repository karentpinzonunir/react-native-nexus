import React, { createContext, useContext, useState } from 'react';

const CoworkingContext = createContext();

export const CoworkingProvider = ({ children }) => {
    const [selectedCoworking, setSelectedCoworking] = useState(null);

    const selectCoworking = (coworking) => {
        setSelectedCoworking(coworking);
    };

    const clearCoworking = () => {
        setSelectedCoworking(null);
    };

    return (
        <CoworkingContext.Provider value={{
            selectedCoworking,
            selectCoworking,
            clearCoworking
        }}>
            {children}
        </CoworkingContext.Provider>
    );
};

export const useCoworkingContext = () => {
    const context = useContext(CoworkingContext);
    if (!context) throw new Error('useCoworkingContext debe estar dentro de CoworkingProvider');
    return context;
};