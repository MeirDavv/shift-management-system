"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const jsonwebtoken_1 = __importStar(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const tokenController_1 = __importDefault(require("../controllers/tokenController"));
dotenv_1.default.config();
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;
if (!ACCESS_TOKEN_SECRET || !REFRESH_TOKEN_SECRET) {
    throw new Error("Access Token can't be accessed");
}
const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const accessToken = req.cookies.token || ((_a = req.headers["authorization"]) === null || _a === void 0 ? void 0 : _a.split(' ')[1]); // Assuming Bearer token format
        const refreshToken = req.cookies.refresh;
        console.log("Refresh token:", refreshToken);
        console.log("Access Token from Cookies or Header: ", accessToken);
        if (!accessToken) {
            if (refreshToken) {
                console.log("Access token missing, attempting to refresh");
                // Await the refresh process to complete before moving forward
                const success = yield tokenController_1.default.refreshAccessToken(req, res);
                if (success) {
                    console.log("Access token refreshed successfully");
                    return next();
                }
                else {
                    return res.status(401).json({ message: "Unauthorized" });
                }
            }
            return res.status(401).json({ message: "Unauthorized" });
        }
        jsonwebtoken_1.default.verify(accessToken, ACCESS_TOKEN_SECRET, (err, decode) => {
            if (err) {
                console.log("JWT Error: ", err);
                if (err instanceof jsonwebtoken_1.TokenExpiredError) {
                    console.log("Access token expired, attempting to refresh");
                    // Attempt to refresh the access token if expired and handle as a promise
                    tokenController_1.default.refreshAccessToken(req, res).then(success => {
                        if (success) {
                            return next(); // Refresh successful, move forward
                        }
                        return res.status(403).json({ message: 'Forbidden' });
                    }).catch(refreshErr => {
                        console.error("Error during token refresh:", refreshErr);
                        return res.status(403).json({ message: 'Forbidden', error: refreshErr.message });
                    });
                }
                else {
                    return res.status(403).json({ message: 'Forbidden', error: err.message });
                }
            }
            else {
                if (typeof decode === 'object' && decode != null) {
                    const { userid, first_name, last_name, email, role_id } = decode;
                    req.userid = userid;
                    req.first_name = first_name;
                    req.last_name = last_name;
                    req.email = email;
                    req.role_id = role_id;
                    req.token = accessToken;
                    console.log("Decoded User ID:", req.userid); // Log User ID
                }
                next(); //Token is verified, move forward
            }
        });
    }
    catch (error) {
        console.error("Error in token verification middleware", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.default = verifyToken;
