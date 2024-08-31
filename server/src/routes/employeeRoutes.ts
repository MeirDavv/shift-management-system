import express, { Request,Response } from "express";
import employeeController from "../controllers/employeeController";
import verifyToken from "../middlewares/verifyToken";
import authorizeRole from "@/middlewares/authorizeRole";



const router = express.Router();

router.post("/user/register", employeeController.registerUser);
router.post("/user/login", employeeController.loginUser);
router.get("/user/logout", employeeController.logoutUser);


router.get("/user/auth", verifyToken, employeeController.authUser);
router.get("/user/all/names", employeeController.getAllUsersNames);

router.put('/user/:employeeId/role',employeeController.updateEmployeeRole)

// Only admin can access these routes
//router.get("/dashboard/settings" , verifyToken, authorizeRole('admin'), employeeController.adminDashboard);

export default router;