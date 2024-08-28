"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const roleController_1 = __importDefault(require("../controllers/roleController"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get("/all/names", roleController_1.default.getAllRoles);
exports.default = router;
