import { useEffect, useRef, useState } from "react";
import { IOrdenanca } from "../interfaces";


interface IState {
    data: IOrdenanca[];
    loading: boolean;
    msgError: string;
    error: boolean;
}

export const useInfraccions = ({ id_cod }: { id_cod: number }) => {


    const isMounted = useRef(true);

    const [state, setState] = useState<IState>({
        data: [],
        loading: true,
        error: false,
        msgError: "",
    });

    const fetchInfraccionsAndUpdateVersion = () => {

        console.log("fetchinfraccions")
        setState({
            loading: false,
            error: false,
            msgError: "",
            data:"hoalperro"
        })

    };

    useEffect(() => {
        let isMounted = true
        setState({ data: [], loading: true, error: false, msgError: "" });

        const isOnline = window.navigator.onLine;

        const checks = async () => {

            fetchInfraccionsAndUpdateVersion()
        };
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
    return state;
};