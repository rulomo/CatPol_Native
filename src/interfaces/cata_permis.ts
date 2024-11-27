export interface ICpermis {
    id:                 number;
    preId:              string;
    mainQuestionC:      null | string;
    firstComment:       null | string;
    answerd1:           null | string;
    postIDQ1:           number | null;
    colora1:            NormalColors;
    answerd2:           null | string;
    postIDQ2:           number | null;
    colora2:            NormalColors;
    explicacio:         null | string;
    mainImage:          null | string;
    isLeaflet:          boolean;
    isFinallyLeaflet:   boolean;
    recuperacio:        null | string;
    isDelite:           boolean;
    isAdministratiu:    boolean;
    actuacio:           null | string;
    gestionsAtestats:   null | string;
    articleCP:          null | string;
    copiaDenuncia:      boolean;
    lleiDenuncia:       null | string;
    articleDenunciaSCT: null | string;
    sancio:             null | string;
    punts:              null | string;
    textDen:            null | string;
    intervencioP:       boolean;
    immobilització:     boolean;
}

type NormalColors =
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error"
  | "gradient";