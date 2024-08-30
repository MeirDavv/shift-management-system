import express from "express";
import shiftSettingsController from "../controllers/shiftSettingsController";
import verifyToken from "../middlewares/verifyToken";

const router = express.Router();

router.get('/all', shiftSettingsController.getAllShiftSettings);
router.put('/:shiftId/update', shiftSettingsController.updateShiftSettings);


export default router;

