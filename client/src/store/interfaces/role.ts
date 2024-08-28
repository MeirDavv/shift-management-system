export interface Role{
    id: number;
    name: string;
    description: string;
}
export interface RoleState{
    list: Role[];
    loading: boolean,
    error: string | null,
}

export interface RoleMap {
    [key: number]: string;
}