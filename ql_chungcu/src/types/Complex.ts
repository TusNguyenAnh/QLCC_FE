export type Complex = {
    id: string;
    complex_name: string;
    address: string;
    description: string;
    total_building: number;
    total_apartment: number;
    name_contact: string;
    phone_contact: string;
    email_contact: string;
    financial_model:string;
};

export type cplItemCheckbox = {
    id: string;
    complex_name: string;
}