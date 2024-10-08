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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const employeeModel_1 = __importDefault(require("../models/employeeModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const tokenModel_1 = __importDefault(require("../models/tokenModel"));
const utils_1 = require("./utils");
dotenv_1.default.config();
const getAllUsersNames = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield employeeModel_1.default.getAllNames();
        res.status(200).json(users);
    }
    catch (error) {
        console.error(error);
        throw error;
    }
});
const getOrganizationId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const organization_id = yield employeeModel_1.default.getOrganizationId();
        res.status(200).json(organization_id);
    }
    catch (error) {
        console.error(error);
        throw error;
    }
});
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Destructure the necessary fields from req.body
        const { first_name, last_name, organization_id, email, password } = req.body;
        // Hash the plain text password
        const password_hash = yield (0, utils_1.hashPassword)(password);
        // Create a user object that matches the Employee interface
        const user = {
            first_name,
            last_name,
            organization_id,
            email,
            password_hash
        };
        const userInfo = yield employeeModel_1.default.create(user);
        res.status(201).json({
            message: "User registered successfully",
            user: userInfo,
        });
    }
    catch (error) {
        console.error(error);
        if (error.code === '23505') { //Checking for unique violation (PostgreSQL specific error code)
            res.status(409).json({ message: "Email already exists" });
            return;
        }
        res.status(500).json({ message: "Internal server error" });
    }
});
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield employeeModel_1.default.getByEmail(email);
        if (!user) {
            return res.status(404).json({ message: "User not found..." });
        }
        if (!user.id) {
            throw new Error("User doesn't have an id");
        }
        const passwordMatch = yield (0, utils_1.isPasswordMatch)(password, user.password_hash);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Authentication failed..." });
        }
        // After login, create the token
        const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;
        if (!ACCESS_TOKEN_SECRET) {
            throw new Error('ACCESS_TOKEN_SECRET is not defined');
        }
        if (!REFRESH_TOKEN_SECRET) {
            throw new Error('ACCESS_TOKEN_SECRET is not defined');
        }
        const accessToken = jsonwebtoken_1.default.sign({
            userid: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            organization_id: user.organization_id,
            email: user.email,
            role_id: user.role_id
        }, ACCESS_TOKEN_SECRET, { expiresIn: "10min" });
        const refreshToken = jsonwebtoken_1.default.sign({
            userid: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            organization_id: user.organization_id,
            email: user.email,
            role_id: user.role_id
        }, REFRESH_TOKEN_SECRET, { expiresIn: "3d" });
        //set token in httpOnly
        res.cookie("token", accessToken, {
            httpOnly: true,
            //secure:
            maxAge: 10 * 60 * 1000, //10 mins
        });
        res.cookie("refresh", refreshToken, {
            httpOnly: true,
            //secure:
            maxAge: 3 * 24 * 60 * 60 * 1000 //3 days
        });
        const accessTokenExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 mins
        const refreshTokenExpiresAt = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000); // 3 days
        yield tokenModel_1.default.upsertToken(user.id, accessToken, accessTokenExpiresAt, refreshToken, refreshTokenExpiresAt);
        const { password_hash: _ } = user, userWithoutPasword = __rest(user, ["password_hash"]); //destructure to remove the pasword from the response
        res.json({
            message: "Login sucessfully",
            user: userWithoutPasword,
            accessToken,
            refreshToken,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error" });
    }
});
const logoutUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const options = {
        httpOnly: true,
        //secure:
        maxAge: 0, //delete immediately
    };
    res.cookie('token', 'expiredToken', options);
    res.cookie('refresh', 'expiredToken', options); // Clear refresh token
    // Remove the tokens from the database using the employee's ID
    const deletedRows = yield tokenModel_1.default.removeTokens(req.userid);
    console.log(`Deleted ${deletedRows} token(s) for employee ID ${req.userid}`);
    res.status(200).json({ status: "success" });
});
const authUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({
        token: req.token,
        email: req.email,
        userid: req.userid,
        first_name: req.first_name,
        last_name: req.last_name,
        role_id: req.role_id
    });
});
const updateEmployeeRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { employeeId } = (req.params);
    const employeeIdNumber = Number(employeeId);
    const { roleId } = req.body;
    try {
        const updatedEmployee = yield employeeModel_1.default.updateEmployeeRole(employeeIdNumber, roleId);
        return res.status(200).json({
            message: 'Employee role updated successfully',
            employee: updatedEmployee, // Optionally include the updated employee data
        });
    }
    catch (error) {
        return res.status(500).json({
            message: 'Failed to update eemployee role',
            error: error.message,
        });
    }
});
exports.default = { getAllUsersNames, getOrganizationId, registerUser, loginUser, logoutUser, authUser, updateEmployeeRole };
