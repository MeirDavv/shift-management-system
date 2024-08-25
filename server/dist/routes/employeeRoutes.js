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
router.get("/logout", employeeController_1.default.logoutUser);
router.get("/auth", verifyToken_1.default, employeeController_1.default.authUser);
router.get("/all/names", employeeController_1.default.getAllUsersNames);
// Only admin can access these routes
//router.get("/dashboard/settings" , verifyToken, authorizeRole('admin'), employeeController.adminDashboard);
exports.default = router;
