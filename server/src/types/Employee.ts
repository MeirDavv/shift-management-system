export interface Employee {
    id:number;
    first_name: string,
    last_name: string,
    email: string,
    password_hash: string,
    role_id?:number
}

