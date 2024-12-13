import { useState, useEffect, useRef } from "react";
import { ICodificats, OrdenancaStandard } from "../interfaces";
import { useSQLiteContext } from "expo-sqlite";

interface IstateData {
    CodificatsCity: ICodificats[];
    defaultCodificatCity: ICodificats | undefined;
    infraccionsCodificat: any[];
}

interface IState {
    data: IstateData;    
    msgError: string;
    error: boolean;
}

export const useCodificat = ({ id_city }: { id_city: number }) => {
    
    const db = useSQLiteContext();

    const isMounted = useRef(true);

    const [state, setState] = useState<IState>({
        data: {
            CodificatsCity: [],
            defaultCodificatCity: {} as ICodificats,
            infraccionsCodificat: []
        },      
        error: false,
        msgError: "",
    });

    function getCodscity() {
        
        try {
            const dataTC: ICodificats[] = db.getAllSync(`SELECT * from codificats WHERE id_city = ${id_city}`);
            return dataTC;
        } catch (err) {
            console.log(err);
            return []; // or whatever you want
        }
    }

    function getInfraccionsCod(defaultCod: ICodificats | undefined) {

        if (defaultCod) {
          try {
            const dataTC: OrdenancaStandard[] = db.getAllSync(`SELECT * from ${defaultCod.name_cod}`);
            dataTC.sort((a, b) => parseInt(a.articulo) - parseInt(b.articulo));
            return dataTC
          } catch (error) {
            console.log(error)
            return []
          }
        }
        return []
      }

    // const fetchInfraccionsAndUpdateVersion = (v_table_remote: Iv_tables, reload: boolean) => {

    //     fetch("api/codificat", {
    //         method: "POST",
    //         headers: {
    //             Accept: "application/json",
    //             "Content-Type": "application/json",
    //         },
    //         //make sure to serialize your JSON body
    //         body: JSON.stringify({
    //             name_cod,
    //         }),
    //     })
    //         .then((resp) => resp.json())
    //         .then(async (data) => {
    //             try {
    //                 data.forEach(
    //                     (element: { id_city: number }) =>
    //                         (element.id_city = v_table_remote.id_city)
    //                 );

    //                 /**
    //                  * AQUI SI LA VERSION ES MAS GRANDE HAY QUE BORRAR
    //                  * TODAS LAS INFRACCIONES DEL MISMO CODIFICADO Y
    //                  * DESPUES GRABAR LAS NUEVAS.
    //                  */

    //                 await db.open();

    //                 //Borrar las infracciones del mismo codificado en local
    //                 const id1 = await db
    //                     .table("infraccions")
    //                     .where({ id_city: v_table_remote.id_city })
    //                     .delete();
    //                 //Grabar las nuevas infracciones.
    //                 const id2 = await db.table("infraccions").bulkAdd(data);
    //                 //Gravar los datos de la nueva tabla en local (version,...)
    //                 const id = await db.table("v_tables").put(v_table_remote);
    //                 console.log("Base de datos Actualizada");
    //             } catch (e) {
    //                 console.error(e);
    //             }
    //             console.log("Cargar Base de datos Actualizada");
    //             setState({
    //                 loading: false,
    //                 error: false,
    //                 msgError: "",
    //                 data,
    //             });
    //             reload && router.reload();
    //         })
    //         .catch((error) => console.error(error))

    // };



    useEffect(() => {        
        let isMounted = true
        const checks = async () => {
            const codificatsCity = getCodscity();
            const defaultCod: ICodificats | undefined = codificatsCity.find((i) => i.is_main)

            codificatsCity.length > 0 && console.log("CARGAMOS LAS INFRACCIONES")
            codificatsCity.length > 0 && setState({                
                error: false,
                msgError: "",
                data:{
                    CodificatsCity: codificatsCity,
                    defaultCodificatCity: defaultCod,
                    infraccionsCodificat: getInfraccionsCod(defaultCod),
                },
            });

           /* console.log("CON INTERNET");
            const raw_v_table = await fetch("api/v_tables", {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    name_cod,
                },
            });
            const v_table_remote = await raw_v_table.json();
            if ((infraccionsTotals.length <= 0) && isMounted) {
                console.log("NO HAY INFRACCIONS I PEDIMOS NUEVAS");
                fetchInfraccionsAndUpdateVersion(v_table_remote[0], false);
            } else if (isMounted) {
                console.log("HAY INFRACCIONES MIRAMOS LA VERSION");
                const v_tables_local = await db
                    .table("v_tables")
                    .toArray();

                const v_table_local = v_tables_local.find(
                    (row) => row.name_cod === name_cod
                );
                /////////////////clear in prod///////////////////////////////////                        
                v_table_local?.version < v_table_remote[0]?.version
                    ? console.log(
                        "VERSION MAS PEQUEÑA BAJAMOS NUEVA Y ACTUALIZAMOS BD?"
                    )
                    : console.log(
                        "VERSION ACTUALIZADA CARGAMOS LAS INF LOCALES"
                    );
                /////////////////////////////////////////////////////
                v_table_local?.version < v_table_remote[0]?.version
                    ? confirm("Hi ha una actualització del codificat, actualitzar?")
                    &&
                    fetchInfraccionsAndUpdateVersion(
                        v_table_remote[0],
                        true
                    )
                    : setState({
                        loading: false,
                        error: false,
                        msgError: "",
                        data: infraccionsTotals,
                    });
            }*/
        }


        checks();
        return () => {
            isMounted = false;
            console.log("Se desmonta!")
        }
    }, []);

    useEffect(() => {
        return () => {
            isMounted.current = false;
        };
    }, []);
    return {state,setState};
};
