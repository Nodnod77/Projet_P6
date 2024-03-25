import React, { createContext, useContext, useState } from 'react';

export type ActivityContextType = {
    started: boolean;
    setStarted: React.Dispatch<React.SetStateAction<boolean>>;
}

// Création du contexte
export const ActivityContext = createContext<ActivityContextType>({
    started: false,
    setStarted: () => {}
});

//  composant pour fournir l'état
export function ActivityProvider( {children}: {children: React.JSX.Element}): React.JSX.Element {
    const [started, setStarted] = useState(false);

    console.log("Provider :" + started)
    return (
        <ActivityContext.Provider value={{ started, setStarted }}>
            {children}
        </ActivityContext.Provider>
    );
};

export const useActivity = (): ActivityContextType => useContext(ActivityContext);
