export interface Employee {
    id?:number;
    first_name: string,
    last_name: string,
    organization_id: number,
    email: string,
    password_hash: string,
    role_id?:number
}

export interface EmployeeIdAndName {
    id: number,
    first_name: string,
    last_name: string,
    role_id?:number
}