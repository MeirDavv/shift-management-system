import express, { Request,Response } from "express";
import employeeController from "../controllers/employeeController";
import verifyToken from "../middlewares/verifyToken";



const router = express.Router();

router.post("/user/register", employeeController.registerUser);
router.post("/user/login", employeeController.loginUser);
router.get("/user/logout", verifyToken, employeeController.logoutUser);


router.get("/user/auth", verifyToken, employeeController.authUser);
router.get("/user/all/names", verifyToken, employeeController.getAllUsersNames);
router.get("/user/organization", verifyToken, employeeController.getOrganizationId)

router.put('/user/:employeeId/role',employeeController.updateEmployeeRole)

// Only admin can access these routes
//router.get("/dashboard/settings" , verifyToken, authorizeRole('admin'), employeeController.adminDashboard);

export default router;