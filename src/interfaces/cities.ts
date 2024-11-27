import { Codificat } from "./codificats";

export interface ICity {
    id:         number;
    name_city:  string;
    img:        string;
    is_default: boolean;
    created_at: Date;
    is_select: boolean;
    codificats: Codificat[];
}

