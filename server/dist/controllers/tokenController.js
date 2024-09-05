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
const tokenModel_1 = __importDefault(require("../models/tokenModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getJwtForEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { employee_id } = req.params;
    const requestingUserId = req.userid;
    if (parseInt(employee_id, 10) !== requestingUserId) {
        return res.status(403).json({ message: 'Forbidden. You do not have access to this token.' });
    }
    try {
        const tokenData = yield tokenModel_1.default.getTokenByEmployeeId(requestingUserId);
        if (tokenData) {
            res.status(200).json({ accessToken: tokenData.access_token, refreshToken: tokenData.refresh_token });
        }
        else {
            res.status(404).json({ message: 'No token found for this employee.' });
        }
    }
    catch (error) {
        console.error('Error retrieving JWT:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
const refreshAccessToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { REFRESH_TOKEN_SECRET, ACCESS_TOKEN_SECRET } = process.env;
    if (!REFRESH_TOKEN_SECRET || !ACCESS_TOKEN_SECRET) {
        return res.status(500).json({ message: 'Token secrets are not defined' });
    }
    const refreshToken = req.cookies.refresh;
    if (!refreshToken) {
        return res.status(403).json({ message: "No refresh token provided." });
    }
    try {
        // Verify the refresh token
        const decoded = jsonwebtoken_1.default.verify(refreshToken, REFRESH_TOKEN_SECRET);
        const { userid, first_name, last_name, email, role_id } = decoded;
        // Check if the refresh token is in the database
        const tokenRecord = yield tokenModel_1.default.getTokenByEmployeeId(userid);
        if (!tokenRecord || tokenRecord.refresh_token != refreshToken) {
            return res.status(403).json({ message: "Invalid refresh token" });
        }
        // Generate a new access token
        const newAccessToken = jsonwebtoken_1.default.sign({ userid, first_name, last_name, email, role_id }, ACCESS_TOKEN_SECRET, { expiresIn: '10m' });
        const accessTokenExpiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
        // Update the access token in the database
        yield tokenModel_1.default.updateAccessToken(userid, newAccessToken, accessTokenExpiresAt);
        // Set the new access token in cookies
        res.cookie("token", newAccessToken, {
            httpOnly: true,
            maxAge: 5 * 1000 // 5 seconds 
        });
        res.json({
            message: "New access token generated successfully",
            accessToken: newAccessToken
        });
    }
    catch (error) {
        console.log("Error verifying refresh token:", error);
        res.status(403).json({ message: "Invalid refresh token" });
    }
});
exports.default = { getJwtForEmployee, refreshAccessToken };
