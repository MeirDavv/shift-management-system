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
exports.default = { getJwtForEmployee };
