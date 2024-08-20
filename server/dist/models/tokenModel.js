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
const TABLE_NAME = 'jwt_tokens';
const updateRefreshToken = (refreshToken, employeeId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const affectedRows = yield (0, db_1.db)(TABLE_NAME)
            .update({ token: refreshToken })
            .where({ employee_id: employeeId });
        return affectedRows;
    }
    catch (error) {
        console.error(`Error updating refresh token for employee ID ${employeeId}:`, error);
        throw error;
    }
});
exports.default = { updateRefreshToken };
