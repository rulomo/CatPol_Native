export interface IDrogues {
    id:                  number;
    principio:           string;
    unidad:              Unitat_pes;
    dosis_habitual_baja: null | string;
    dosis_habitual_alta: null | string;
    dosis_media:         null | string;
    consumo_diario:      null | string;
    dosis_min_psico:     string;
    prev_tres_cinco:     null | string;
    notoria_imp:         null | string;
    nombres_altern:      null | string;
}

export enum Unitat_pes {
    G = "g",
    Mg = "mg",
}
