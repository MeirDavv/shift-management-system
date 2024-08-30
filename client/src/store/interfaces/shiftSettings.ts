export interface shiftSettings {
    id: number,
    name: string,
    start_time: string,
    end_time: string,
    min_employee_count: number,
    max_employee_count: number
}

export interface ShiftSettingsState {
    list: Array<shiftSettings>;
    loading: boolean;
    error: string | null;
}