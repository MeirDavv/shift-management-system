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
exports.deleteAllShifts = void 0;
const db_1 = require("../config/db");
const asyncLocalStorage_1 = __importDefault(require("../context/asyncLocalStorage"));
const TABLE_NAME = 'employee_shift_availability';
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const store = asyncLocalStorage_1.default.getStore();
        if (!store || !store.organization_id) {
            throw new Error("organization_id is missing");
        }
        const shifts = yield (0, db_1.db)(TABLE_NAME)
            .select("id", "employee_id", "shift_id", "day_id")
            .where({ organization_id: store.organization_id });
        return shifts;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
});
// Function to delete all shifts
const deleteAllShifts = () => __awaiter(void 0, void 0, void 0, function* () {
    const store = asyncLocalStorage_1.default.getStore();
    if (!store || !store.organization_id) {
        throw new Error("organization_id is missing");
    }
    yield (0, db_1.db)(TABLE_NAME)
        .where({ organization_id: store.organization_id })
        .del(); // This will delete all records from the 'shifts' table
});
exports.deleteAllShifts = deleteAllShifts;
const updateShifts = (shifts) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, db_1.db)(TABLE_NAME)
            .insert(shifts);
        // .onConflict(['employee_id','day_id','shift_id'])
        // .merge(); // Updates existing rows if conflicts occur, otherwise inserts new rows
    }
    catch (error) {
        console.error('Error updating shifts:', error);
        throw error;
    }
});
exports.default = { getAll, deleteAllShifts: exports.deleteAllShifts, updateShifts };
