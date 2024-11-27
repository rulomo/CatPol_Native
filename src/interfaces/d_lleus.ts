export interface Id_lleus {
    id:              number;
    bj_protegido:    string;
    tipo:            string;
    texto:           string;
    pena:            string;
    perseguibilidad: Perseguibilidad;
    articulo_int:    string;
    articulo_exp:    null | string;
    articulo:        string;
    comentario:      null | string;
}

export enum Perseguibilidad {
    Privat = "Privat",
    Públic = "Públic",
    Semipúblic = "Semipúblic",
}