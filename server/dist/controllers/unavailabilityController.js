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
const unavailabilityModel_1 = __importDefault(require("../models/unavailabilityModel"));
const getAllUnavailableShifts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const unavailableShifts = yield unavailabilityModel_1.default.getAll();
        res.status(200).json(unavailableShifts);
    }
    catch (error) {
        console.error(error);
        throw error;
    }
});
const getUnavailableShifts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.userid !== undefined) {
            const unavailableShifts = yield unavailabilityModel_1.default.getByEmployeeId(req.userid);
            res.status(200).json(unavailableShifts);
        }
        else {
            return res.status(400).json({ message: "User ID is missing" });
        }
    }
    catch (error) {
        console.error(error);
        throw error;
    }
});
const submitUnavailableShifts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const employeeId = req.userid;
    const updates = req.body;
    try {
        if (employeeId !== undefined) {
            for (const update of updates) {
                yield unavailabilityModel_1.default.submitUnavailability(update, employeeId);
            }
            res.status(200).json({ message: "Update successful" });
        }
        else {
            return res.status(400).json({ message: "User ID is missing" });
        }
    }
    catch (error) {
        console.error(error);
        throw error;
    }
});
exports.default = { getAllUnavailableShifts, getUnavailableShifts, submitUnavailableShifts };
