import { RouteProps } from "react-router-dom";

export interface ProtectedRouteProps extends Omit<RouteProps,'component'> {
    role: string;
    children: JSX.Element;
}