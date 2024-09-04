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
const shiftModel_1 = __importDefault(require("../models/shiftModel"));
const axios_1 = __importDefault(require("axios"));
const getShifts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const shifts = yield shiftModel_1.default.getAll();
        res.status(200).json(shifts);
    }
    catch (error) {
        console.error(error);
        throw error;
    }
});
const updateShifts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const shifts = req.body; // Extract the shifts data from the request body
        if (!Array.isArray(shifts) || shifts.length === 0) {
            res.status(400).json({ message: "Invalid data: shifts should be a non-empty array." });
            return;
        }
        // Step 1: Delete all existing shifts
        yield shiftModel_1.default.deleteAllShifts();
        // Step 2: Insert new shifts
        yield shiftModel_1.default.updateShifts(shifts); // Call the model function to update the shifts
        res.status(200).json({ message: 'Shifts updated successfully' }); // Respond with a success message
    }
    catch (error) {
        console.error('Error updating shifts:', error);
        res.status(500).json({ message: 'Internal server error' }); // Handle errors and respond with a 500 status
    }
});
// Route handler to trigger Pyhton script
const runAIScript = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const python_api_url = process.env.AI_SCRIPT_URL;
        const endpoint = '/api/run-ai-script';
        const token = req.cookies['token'];
        if (!token) {
            res.status(401).json({ error: "No authorization token found in request" });
            return;
        }
        const response = yield axios_1.default.post(`${python_api_url}${endpoint}`, {}, //No payload needed
        {
            headers: {
                Authorization: `Bearer ${token}`, //Include the token in the Authorization header
            }
        });
        res.status(200).json(response.data);
    }
    catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).json({ error: 'Failed to execute AI script', details: error.message });
    }
});
exports.default = { getShifts, updateShifts, runAIScript };
