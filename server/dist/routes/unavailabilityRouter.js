"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const unavailabilityController_1 = __importDefault(require("../controllers/unavailabilityController"));
const verifyToken_1 = __importDefault(require("../middlewares/verifyToken"));
const router = express_1.default.Router();
router.get('/unavailability', verifyToken_1.default, unavailabilityController_1.default.getUnavailableShifts);
router.post('/unavailability', verifyToken_1.default, unavailabilityController_1.default.submitUnavailableShifts);
exports.default = router;
