export interface Codificat {
    id:               number;
    id_city:          number;
    name_cod:         string;
    created_at:       Date;
    is_main:          boolean;
    label_nav:        string;
    select_1:         string;
    select_2:         null | string;
    template:         number;
    label_1:          null | string;
    field_1:          null | string;
    label_2:          null | string;
    field_2:          null | string;
    label_3:          null | string;
    field_3:          null | string;
    label_4:          null | string;
    field_4:          null | string;
    order:            string;
    order_all_fields: string;
    label_select_1:   string;
    label_select_2:   string;
    last_update:      Date;
    ELI:              null | string;
    normal_name:      null | string;
    group_menu:       string;
    visible:boolean;
}
