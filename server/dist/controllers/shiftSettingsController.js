"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const shiftSettingsModel_1 = __importDefault(require("../models/shiftSettingsModel"));
const getAllShiftSettings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const shiftSettings = yield shiftSettingsModel_1.default.getAll();
        res.status(200).json(shiftSettings);
    }
    catch (error) {
        console.error(error);
        throw error;
    }
});
const updateShiftSettings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { shiftId } = (req.params);
    const shiftIdNumber = Number(shiftId);
    const { newShiftSettings } = req.body;
    try {
        const updatedShiftSettings = yield shiftSettingsModel_1.default.updateShiftSettings(shiftIdNumber, newShiftSettings);
        return res.status(200).json({
            message: 'Shift settings updated successfully',
            shiftSettings: updatedShiftSettings, // Optionally include the updated employee data
        });
    }
    catch (error) {
        return res.status(500).json({
            message: 'Failed to update shift settings',
            error: error.message,
        });
    }
});
exports.default = { getAllShiftSettings, updateShiftSettings };
