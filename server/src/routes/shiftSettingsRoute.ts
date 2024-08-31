import express from "express";
import shiftSettingsController from "../controllers/shiftSettingsController";
import verifyToken from "../middlewares/verifyToken";

const router = express.Router();

router.get('/shiftSettings/all', shiftSettingsController.getAllShiftSettings);
router.put('/shiftSettings/:shiftId/update', shiftSettingsController.updateShiftSettings);


export default router;

