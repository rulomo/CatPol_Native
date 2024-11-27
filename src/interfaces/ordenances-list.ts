export interface IOrdenanca {
    id: number;
    norma: string;
    articulo: string;
    apartado?: null | string;
    opcion?: null | string;
    calificacion: string;
    texto: string;
}

export interface OrdenancaStandard extends IOrdenanca {
    puntos?: null | string;
    multa: string | null;
    descuento?: string | null;
    responsabilidad: string;
    comentario?: null | string;
    materia: string;
    materiaDGT: string;
}

export interface OdenancaCivime extends IOrdenanca {
    multaInicio: null | string;
    multaFin: null | string;
    materia?: null | string;
    materia2?: null | string;
}

export interface ICodiPenal{    
        id: number;
        norma: string;
        libro_num: string;
        libro_tit: string;
        titulo_num:string;
        titulo_tit: string;
        capitulo_num?: string;
        capitulo_tit?:string;
        seccion?: string;
        articulo?: string;
        texto:string;
        parrafo?: string;
        parrafo_2?: string;      
}

export interface Data {
    info: Info;
    results: OrdenancaStandard[];
}

export interface Info {
    count: number;
    pages: number;
    next: string;
    prev: string;
    hasNext: boolean;
    currentPage: number;
    nextPage: string;
}

