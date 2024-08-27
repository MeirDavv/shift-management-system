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
const child_process_1 = require("child_process");
const path_1 = __importDefault(require("path"));
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
    const scriptPath = path_1.default.join(__dirname, '../ai/shift_calculator.py');
    (0, child_process_1.exec)(`python3 ${scriptPath}`, { timeout: 5000 }, (error, stdout, stderr) => {
        if (error) {
            console.error(`Execution error: ${error.message}`);
            res.status(500).json({ error: 'Execution failed', details: error.message });
            return;
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            res.status(500).json({ error: 'Script error', details: stderr });
            return;
        }
        console.log(`stdout: ${stdout}`);
        res.status(200).json({ message: 'AI script executed successfully', output: stdout });
    });
});
exports.default = { getShifts, updateShifts, runAIScript };
