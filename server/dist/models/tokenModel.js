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
const upsertToken = (employeeId, accessToken, accessTokenExpiresAt, refreshToken, refreshTokenExpiresAt) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingToken = yield (0, db_1.db)(TABLE_NAME).where({ employee_id: employeeId }).first();
        if (existingToken) {
            //if exists, update the record
            const affectedRows = yield (0, db_1.db)(TABLE_NAME)
                .update({ access_token: accessToken, access_token_expires_at: accessTokenExpiresAt, refresh_token: refreshToken, refresh_token_expires_at: refreshTokenExpiresAt })
                .where({ employee_id: employeeId });
            return affectedRows;
        }
        else {
            // If doesnt exist, insert a new record
            const insertedId = yield (0, db_1.db)(TABLE_NAME).insert({
                employee_id: employeeId, access_token: accessToken, access_token_expires_at: accessTokenExpiresAt, refresh_token: refreshToken, refresh_token_expires_at: refreshTokenExpiresAt
            }).returning('id');
            return Array.isArray(insertedId) ? insertedId[0] : insertedId;
        }
    }
    catch (error) {
        console.error(`Error saving token for employee ID ${employeeId}:`, error);
        throw error;
    }
});
const getTokenByEmployeeId = (employeeId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tokenData = yield (0, db_1.db)(TABLE_NAME)
            .select('access_token', 'refresh_token')
            .where({ employee_id: employeeId })
            .first();
        return tokenData || null;
    }
    catch (error) {
        console.error('Error fetching token:', error);
        throw error;
    }
});
exports.default = { upsertToken, getTokenByEmployeeId };
