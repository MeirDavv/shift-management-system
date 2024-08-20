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
const TABLE_NAME = 'employees';
const create = (employeeInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const { first_name, last_name, email, password_hash } = employeeInfo;
    console.log(password_hash);
    const trx = yield db_1.db.transaction(); //using transaction so that if we fail to insert it will rollback
    try {
        //Hash the password
        const [employee] = yield trx(TABLE_NAME)
            .insert({ first_name, last_name, email, password_hash }, ['email', 'first_name', 'last_name']);
        yield trx.commit();
        return employee;
    }
    catch (error) {
        yield trx.rollback();
        console.error(error);
        throw error;
    }
});
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employees = yield (0, db_1.db)(TABLE_NAME)
            .select("id", "first_name", "last_name", "email", "password_hash", "role_id");
        return employees;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
});
const getById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [employee] = yield (0, db_1.db)(TABLE_NAME)
            .select("id", "first_name", "last_name", "email", "password_hash", "role_id")
            .where({ id });
        return employee || null;
    }
    catch (error) {
        console.error(error);
        throw error;
        ;
    }
});
const getByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [employee] = yield (0, db_1.db)(TABLE_NAME)
            .select("id", "first_name", "last_name", "email", "password_hash", "role_id")
            .where({ email });
        return employee || null;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
});
const update = (id, employeeNewDetails) => __awaiter(void 0, void 0, void 0, function* () {
    const trx = yield db_1.db.transaction();
    try {
        // Ensure there's something to update
        if (Object.keys(employeeNewDetails).length === 0) {
            throw new Error('No data provided to update');
        }
        // Check if new email is already taken
        if (employeeNewDetails.email) {
            const existingEmployee = yield trx(TABLE_NAME)
                .select('id')
                .where({ email: employeeNewDetails.email })
                .andWhereNot({ id }) // Exclude the current employee from the check
                .first();
            if (existingEmployee) {
                throw new Error('Email is already taken');
            }
        }
        // Update employee record and return the updated row
        const [updatedEmployee] = yield trx(TABLE_NAME)
            .update(employeeNewDetails, ['id', 'first_name', 'last_name', 'email', 'password_hash', 'role_id']);
        yield trx.commit();
        if (!updatedEmployee) {
            throw new Error(`Employee with id ${id} not found`);
        }
        return updatedEmployee;
    }
    catch (error) {
        yield trx.rollback();
        console.error(`Error updating employee with ID ${id}`, error);
        throw error;
    }
});
const deleteEmployee = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [deletedEmployee] = yield (0, db_1.db)(TABLE_NAME)
            .where({ id })
            .del()
            .returning('*');
        return deletedEmployee || null;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
});
exports.default = { create, getAll, getById, getByEmail, update, deleteEmployee };
