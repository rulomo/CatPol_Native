import React, { useContext, createContext, useState } from "react";
import { ColorSchemeName } from "react-native";

interface settingsContextType {
    contextTheme: ColorSchemeName;
    setContextTheme: React.Dispatch<React.SetStateAction<ColorSchemeName>>;
    contextKeepAwake: boolean;
    setContextKeepAwake: React.Dispatch<React.SetStateAction<boolean>>;
    contextSearchWhileTyping: boolean;
    setContextSearchWhileTyping: React.Dispatch<React.SetStateAction<boolean>>;
    contextHighlightResult: boolean;
    setContextHighlightResult: React.Dispatch<React.SetStateAction<boolean>>;
}

//Context
export const SettingsContext = createContext<settingsContextType>({

    contextTheme: 'dark',
    setContextTheme: () => { },
    contextKeepAwake: false,
    setContextKeepAwake: () => { },
    contextSearchWhileTyping: true,
    setContextSearchWhileTyping: () => { },
    contextHighlightResult: true,
    setContextHighlightResult: () => { }
}
)
//Provider
export const SettingsContextProvider = ({ children }: any) => {

    const [contextTheme, setContextTheme] = useState<ColorSchemeName>('dark');
    const [contextKeepAwake, setContextKeepAwake] = useState<boolean>(false);
    const [contextSearchWhileTyping, setContextSearchWhileTyping] = useState<boolean>(true);
    const [contextHighlightResult, setContextHighlightResult] = useState<boolean>(true)

    const values: settingsContextType = React.useMemo(
        () => ({
            contextTheme, setContextTheme,
            contextKeepAwake, setContextKeepAwake,
            contextSearchWhileTyping, setContextSearchWhileTyping,
            contextHighlightResult, setContextHighlightResult
        }),
        [contextTheme, contextKeepAwake, contextSearchWhileTyping, contextHighlightResult]
    ); // States que serán visibles en el contexto.

    // Interface donde será expuesto como proveedor y envolverá la App.
    return (
        <SettingsContext.Provider value={values}>
            {children}
        </SettingsContext.Provider>
    );
};

//
export function useSettingsContext() {

    const context = useContext(SettingsContext);

    if (!context) {
        console.error("Error deploying App Context!!!");
    }

    return context;
}

export default useSettingsContext;
