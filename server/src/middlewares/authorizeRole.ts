import { Request,Response,NextFunction } from "express";

const roleMap: { [key: number]: string} = {
    1: "Admin",
    2: "Manager",
    3: "Worker"
}

const authorizeRole = (requiredRole: string) => {
    return (req:Request, res:Response, next:NextFunction) => {

        if (req.role_id ===undefined){
            return res.status(400).json({message:"Role ID is missing"});
        }
        const roleName = roleMap[req.role_id];

        if(roleName !== requiredRole){
            return res.status(403).json({message: "Access denied"});
        }
        next();
    }
}

export default authorizeRole;