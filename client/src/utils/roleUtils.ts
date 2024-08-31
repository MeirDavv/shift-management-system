export enum Role {
    Admin = 'Admin',
    Manager = 'Manager',
    Worker = 'Worker'
}

const roleHierarchy = {
    [Role.Admin] : 3,
    [Role.Manager] : 2,
    [Role.Worker] : 1
}

export const hasAccess = (userRole: Role, requiredRole: Role) : boolean => {
    return roleHierarchy[userRole] >= roleHierarchy[requiredRole];
};