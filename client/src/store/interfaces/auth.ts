import { Role } from "../../utils/roleUtils";

export interface AuthState {
    isAuthenticated: boolean,
    email: string | null,
    role: Role | null,
    loading: boolean,
    message: string,
}