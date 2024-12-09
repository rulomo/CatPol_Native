
import { deepClone, standaritzedText } from "../utils";
import { useSQLiteContext } from "expo-sqlite";


export const initialState = {
    currentCodificat: {},
    infraccionsTotals: [],
    localInfraccions: [],
    infraccionsToShow: [],
    infraccions: [], //Muestre infracciones vacias cargando la primera vez
    lastSearch: "",
    isLoading: true,
};

export const infraccionsReducer = (state, action) => {

    const db = useSQLiteContext();

    const { type, payload } = action;


    function getCodscity(id_city) {
        try {
            const dataTC = db.getAllSync(`SELECT * from codificats WHERE id_city = ${id_city}`);
            return dataTC;
        } catch (err) {
            console.log(err);
            return []; // or whatever you want
        }
    }

    function getInfraccionsCod({ name_cod }) {
        if (name_cod) {
            try {
                const dataTC = db.getAllSync(`SELECT * from ${name_cod}`);
                dataTC.sort((a, b) => parseInt(a.articulo) - parseInt(b.articulo));
                return dataTC
            } catch (error) {
                console.log(error)
                return []
            }
        }
        return []
    }

    switch (type) {

        case "reset":
            // console.log("reset_state");
            // return initialState;
            break;      
            
        case "load_default_infraccions":
            debugger
            const codificatsCity = getCodscity(payload);
            const defaultCod = codificatsCity.find((i) => i.is_main)
            const infraccions = getInfraccionsCod(defaultCod)

            return {
                ...state,
                codificatsCity: codificatsCity,
                currentCodificat: defaultCod,
                infraccionsTotals: deepClone(infraccions),
                infraccionsToShow: deepClone(infraccions),
                localInfraccions: deepClone(infraccions),
                isLoading: false,
            };

        case "load_infraccions":
            console.log("load_infraccions");
            return {
                ...state,
                infraccionsTotals: deepClone(payload),
                infraccionsToShow: deepClone(payload),
                localInfraccions: deepClone(payload),
                isLoading: false,
            };
        case "change_cod":
            console.log("change_cod");
            const newCodificatsCity = getCodscity(payload?.id_city);
            const newCod = newCodificatsCity.find((i) => i?.name_cod == payload.name_cod)
            const newInfraccions = getInfraccionsCod(newCod)
            return {
                ...state,
                currentCodificat: newCod,
                infraccionsTotals: deepClone(newInfraccions),
                infraccionsToShow: deepClone(newInfraccions),
                localInfraccions: deepClone(newInfraccions),
                isLoading: false,
            };
        case "filter_by_search":
            console.log("filter_by_search");
            const arrayFilter = payload;
            let param = encodeURIComponent(arrayFilter);
            if (state.localInfraccions.length && arrayFilter?.length) {
                let infraccions = state.localInfraccions.filter((infraccio) =>
                    arrayFilter.every((element) =>
                        standaritzedText(infraccio.texto).includes(
                            standaritzedText(element)
                        )
                        // || 
                        // //Penals titols, capitols, seccions, articles//
                        // infraccio?.titulo_tit && standaritzedText(infraccio.titulo_tit).includes(
                        //     standaritzedText(element)
                        // )|| 
                        // infraccio?.capitulo_tit && standaritzedText(infraccio?.capitulo_tit).includes(
                        //     standaritzedText(element)
                        // )|| 
                        // infraccio?.seccion && standaritzedText(infraccio?.seccion).includes(
                        //     standaritzedText(element)
                        // )|| 
                        // infraccio?.articulo && standaritzedText(infraccio?.articulo).includes(
                        //     standaritzedText(element)
                        // )
                        // END PENALS ///


                    )
                );
                return {
                    ...state,
                    infraccionsToShow: infraccions,
                    infraccions: infraccions,
                    lastSearch: param,
                };
            } else {
                return {
                    ...state,
                    infraccionsToShow: deepClone(state.localInfraccions),
                    infraccions: state.localInfraccions,
                    lastSearch: param,
                };
            }

        default:
            throw new Error(
                `No case for type ${type} found in infraccionsReducer`
            );
    }
};
