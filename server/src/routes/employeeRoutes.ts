import express, { Request,Response } from "express";
import employeeController from "../controllers/employeeController";
import verifyToken from "../middlewares/verifyToken";
import authorizeRole from "@/middlewares/authorizeRole";



const router = express.Router();

router.post("/register", employeeController.registerUser);
router.post("/login", employeeController.loginUser);
router.get("/logout", employeeController.logoutUser);


router.get("/auth", verifyToken, employeeController.authUser)

// Only admin can access these routes
//router.get("/dashboard/settings" , verifyToken, authorizeRole('admin'), employeeController.adminDashboard);

export default router;