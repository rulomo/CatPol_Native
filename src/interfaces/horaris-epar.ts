export interface IHoraris {
    id:             number;
    activitat:      string;
    obertura:       null | string;
    tancament:      null | string;
    desallotjament: Desallotjament | null;
    capsDe:         CapsDe | null;
    periodeEstival: PeriodeEstival | null;
    capDany:        CapDany | null;
    observacions:   null | string;
}

export enum CapDany {
    The60Min = "+60min",
    The90Min = "+90min",
}

export enum CapsDe {
    The30Min = "+30min",
    The60Min = "+60min",
}

export enum Desallotjament {
    The30Min500Pax45Min500Pax = "+30min <= 500 pax // +45min > 500 pax",
}

export enum PeriodeEstival {
    The30Min = "+30min",
    The45Min = "+45min",
}
