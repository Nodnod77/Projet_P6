import React, { createContext, useContext, useState } from 'react';

interface ActivityContextType {
    started: boolean;
    setStarted: React.Dispatch<React.SetStateAction<boolean>>;
}

// Création du contexte
const ActivityContext = createContext<ActivityContextType>({
    started: false,
    setStarted: () => {}
});

//  composant pour fournir l'état
export const ActivityProvider: React.FC = ({ children }) => {
    const [started, setStarted] = useState(false);

    return (
        <ActivityContext.Provider value={{ started, setStarted }}>
            {children}
        </ActivityContext.Provider>
    );
};

export const useActivity = (): ActivityContextType => useContext(ActivityContext);
