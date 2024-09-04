"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { ACCESS_TOKEN_SECRET } = process.env;
if (!ACCESS_TOKEN_SECRET) {
    throw new Error("Access Token can't be accessed");
}
const verifyToken = (req, res, next) => {
    var _a;
    const accessToken = req.cookies.token || ((_a = req.headers["authorization"]) === null || _a === void 0 ? void 0 : _a.split(' ')[1]); // Assuming Bearer token format
    //console.log("accessToken => ", accessToken);
    if (!accessToken)
        return res.status(401).json({ message: "unauthorized" });
    jsonwebtoken_1.default.verify(accessToken, ACCESS_TOKEN_SECRET, (err, decode) => {
        if (err)
            return res.status(403).json({ message: "forbidden", error: err.message });
        if (typeof decode === 'object' && decode != null) {
            const { userid, first_name, last_name, email, role_id } = decode;
            req.userid = userid;
            req.first_name = first_name;
            req.last_name = last_name;
            req.email = email;
            req.role_id = role_id;
        }
        next();
    });
};
exports.default = verifyToken;
