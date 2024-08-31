export enum Role {
    Admin = 'Admin',
    Manager = 'Manager',
    Worker = 'Worker'
}

const roleHierarchy = {
    [Role.Admin] : 1,
    [Role.Manager] : 2,
    [Role.Worker] : 3
}

export const hasAccess = (userRole: Role, requiredRole: Role) : boolean => {
    return roleHierarchy[userRole] <= roleHierarchy[requiredRole];
};