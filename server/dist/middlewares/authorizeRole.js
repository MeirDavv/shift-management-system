"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const roleMap = {
    1: "Admin",
    2: "Manager",
    3: "Worker"
};
const authorizeRole = (requiredRole) => {
    return (req, res, next) => {
        if (req.role_id === undefined) {
            return res.status(400).json({ message: "Role ID is missing" });
        }
        const roleName = roleMap[req.role_id];
        if (roleName !== requiredRole) {
            return res.status(403).json({ message: "Access denied" });
        }
        next();
    };
};
exports.default = authorizeRole;
