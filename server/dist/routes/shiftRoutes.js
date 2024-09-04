"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const shiftController_1 = __importDefault(require("../controllers/shiftController"));
const verifyAPIkey_1 = __importDefault(require("../middlewares/verifyAPIkey"));
const verifyToken_1 = __importDefault(require("../middlewares/verifyToken"));
const router = express_1.default.Router();
router.get('/shifts', verifyToken_1.default, shiftController_1.default.getShifts);
router.post('/shifts', verifyAPIkey_1.default, verifyToken_1.default, shiftController_1.default.updateShifts);
// Route to trigger AI script, protected by API key and JWT token
router.post('/run-ai-script', verifyToken_1.default, shiftController_1.default.runAIScript);
exports.default = router;
