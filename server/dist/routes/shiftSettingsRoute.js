"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const shiftSettingsController_1 = __importDefault(require("../controllers/shiftSettingsController"));
const verifyToken_1 = __importDefault(require("../middlewares/verifyToken"));
const router = express_1.default.Router();
router.get('/shiftSettings/all', verifyToken_1.default, shiftSettingsController_1.default.getAllShiftSettings);
router.put('/shiftSettings/:shiftId/update', verifyToken_1.default, shiftSettingsController_1.default.updateShiftSettings);
exports.default = router;
