import express, { Request,Response } from "express";
import employeeController from "../controllers/employeeController";
import verifyToken from "../middlewares/verifyToken";


const router = express.Router();

router.post("/register", employeeController.registerUser);
router.post("/login", employeeController.loginUser);

router.get("/auth", verifyToken, (req:Request, res:Response)=>{
    res.sendStatus(200);
})

export default router;