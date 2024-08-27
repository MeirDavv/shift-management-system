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
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../config/db");
const TABLE_NAME = 'employee_shift_availability';
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const shifts = yield (0, db_1.db)(TABLE_NAME)
            .select("id", "employee_id", "shift_id", "day_id");
        return shifts;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
});
const updateShifts = (shifts) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, db_1.db)(TABLE_NAME)
            .insert(shifts)
            .onConflict(['employee_id', 'day_id', 'shift_id'])
            .merge(); // Updates existing rows if conflicts occur, otherwise inserts new rows
    }
    catch (error) {
        console.error('Error updating shifts:', error);
        throw error;
    }
});
exports.default = { getAll, updateShifts };
