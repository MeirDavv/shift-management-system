export interface AuthState {
    isAuthenticated: boolean,
    email: string | null,
    loading: boolean,
    message: string,
}