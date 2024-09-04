"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const employeeController_1 = __importDefault(require("../controllers/employeeController"));
const verifyToken_1 = __importDefault(require("../middlewares/verifyToken"));
const router = express_1.default.Router();
router.post("/user/register", employeeController_1.default.registerUser);
router.post("/user/login", employeeController_1.default.loginUser);
router.get("/user/logout", employeeController_1.default.logoutUser);
router.get("/user/auth", verifyToken_1.default, employeeController_1.default.authUser);
router.get("/user/all/names", verifyToken_1.default, employeeController_1.default.getAllUsersNames);
router.put('/user/:employeeId/role', employeeController_1.default.updateEmployeeRole);
// Only admin can access these routes
//router.get("/dashboard/settings" , verifyToken, authorizeRole('admin'), employeeController.adminDashboard);
exports.default = router;
