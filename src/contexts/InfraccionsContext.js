import React, { useContext, createContext, useReducer, useState } from "react";
import { infraccionsReducer, initialState } from "../reducers";


//Context
export const InfraccionsContext = createContext();

//Provider
export const InfraccionsContextProvider = ({ children }) => {
   
    const [state, dispatch] = useReducer(infraccionsReducer, initialState);
    
    const values = React.useMemo(
        () => ({
            state, // States que seran visibles en el contexto.
            dispatch,                
        }),
        [state,dispatch]
    ); // States que serán visibles en el contexto.

    // Interface donde será expuesto como proveedor y envolverá la App.
    return (
        <InfraccionsContext.Provider value={values}>
            {children}
        </InfraccionsContext.Provider>
    );
};

//
export function useInfraccionsContext() {
    
    const context = useContext(InfraccionsContext);

    if (!context) {
        console.error("Error deploying App Context!!!");
    }

    return context;
}

export default useInfraccionsContext;
