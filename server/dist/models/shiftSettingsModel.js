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
const TABLE_NAME = 'shifts';
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const shiftSettings = yield (0, db_1.db)(TABLE_NAME)
            .select("id", "name", "start_time", "end_time", "min_employee_count", "max_employee_count");
        return shiftSettings;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
});
const updateShiftSettings = (shiftId, newShiftSettings) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, db_1.db)(TABLE_NAME)
            .where({ id: shiftId })
            .update({
            start_time: newShiftSettings.start_time,
            end_time: newShiftSettings.end_time,
            min_employee_count: newShiftSettings.min_employee_count,
            max_employee_count: newShiftSettings.max_employee_count,
            updated_at: db_1.db.fn.now()
        });
        // Return the updated shiftSetting record (optional)
        const updatedShiftSettings = yield (0, db_1.db)(TABLE_NAME)
            .where({ id: shiftId })
            .first();
        return updatedShiftSettings;
    }
    catch (error) {
        console.error('Error updating shift settings:', error);
        throw error;
    }
});
exports.default = { getAll, updateShiftSettings };
