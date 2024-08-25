export interface Employee{
    id: number;
    first_name: string;
    last_name: string;
    role: string;
}
export interface EmployeesState{
    list: Employee[];
    loading: boolean,
    error: string | null,
}

export interface EmployeeMap {
    [key: number]: string;
}