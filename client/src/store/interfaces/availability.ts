export interface Unavailability {
    shift_id: number,
    day_id: number,
    is_unavailable: boolean
}

export interface UnavailabilityState {
    unavailability: {[key:string]: boolean};
    loading: boolean;
    error: string | null;
}

