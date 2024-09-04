"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const verifyToken_1 = __importDefault(require("../middlewares/verifyToken"));
const roleController_1 = __importDefault(require("../controllers/roleController"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get("/roles/all/names", verifyToken_1.default, roleController_1.default.getAllRoles);
exports.default = router;
