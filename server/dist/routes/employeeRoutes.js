"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const employeeController_1 = __importDefault(require("../controllers/employeeController"));
const verifyToken_1 = __importDefault(require("../middlewares/verifyToken"));
const router = express_1.default.Router();
router.post("/register", employeeController_1.default.registerUser);
router.post("/login", employeeController_1.default.loginUser);
router.get("/auth", verifyToken_1.default, (req, res) => {
    res.sendStatus(200);
});
exports.default = router;
