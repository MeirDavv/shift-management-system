import verifyToken from "../middlewares/verifyToken";
import roleController from "../controllers/roleController";
import express from "express";


const router = express.Router();

router.get("/roles/all/names", verifyToken, roleController.getAllRoles)

export default router