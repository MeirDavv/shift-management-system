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
const db_1 = require("../config/db");
const employeeModel_1 = __importDefault(require("./employeeModel"));
const asyncLocalStorage_1 = __importDefault(require("../context/asyncLocalStorage"));
const TABLE_NAME = 'employee_shift_unavailability';
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const store = asyncLocalStorage_1.default.getStore();
        if (!store || !store.organization_id) {
            throw new Error("organization_id is missing");
        }
        const unavailabilityShifts = yield (0, db_1.db)(TABLE_NAME)
            .select("id", "employee_id", "shift_id", "day_id", "is_unavailable")
            .where({ organization_id: store.organization_id });
        return unavailabilityShifts;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
});
const getByEmployeeId = (employee_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const unavailabilityShifts = yield (0, db_1.db)(TABLE_NAME)
            .select("id", "shift_id", "day_id", "is_unavailable")
            .where({ employee_id });
        return unavailabilityShifts;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
});
const submitUnavailability = (update, employee_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const organizationId = yield employeeModel_1.default.getOrganizationId();
        yield (0, db_1.db)(TABLE_NAME)
            .insert({
            employee_id,
            shift_id: update.shift_id,
            day_id: update.day_id,
            is_unavailable: update.is_unavailable,
            organization_id: organizationId,
        })
            .onConflict(['employee_id', 'shift_id', 'day_id'])
            .merge({
            is_unavailable: update.is_unavailable,
            updated_at: db_1.db.fn.now(),
        });
    }
    catch (error) {
        console.error(error);
        throw error;
    }
});
exports.default = { getAll, getByEmployeeId, submitUnavailability };
