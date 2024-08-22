export interface Schedule {
    id: number;
    employeeId: number;
    date: string;
    shift: string;
}

export interface ScheduleState {
    list: Schedule[];
}