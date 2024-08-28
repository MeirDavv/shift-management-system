export interface Employee{
    id: number;
    first_name: string;
    last_name: string;
    role_id: number;
    // submitted_availability: boolean;
}
export interface EmployeesState{
    list: Employee[];
    loading: boolean,
    error: string | null,
}

export interface EmployeeMap {
    [key: number]: string;
}