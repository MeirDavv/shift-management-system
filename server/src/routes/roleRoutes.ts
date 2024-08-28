import roleController from "../controllers/roleController";
import express from "express";


const router = express.Router();

router.get("/all/names", roleController.getAllRoles)

export default router