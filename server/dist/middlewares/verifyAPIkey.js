"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const verifyAPIkey = (req, res, next) => {
    var _a;
    const apiKey = (_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.split(' ')[1]; // Assuming Bearer token format
    if (apiKey === process.env.AI_API_KEY) {
        next(); // API is valid, procceed with request
    }
    else {
        res.status(403).json({ meessage: 'Forbidden: Invalid API key' });
    }
};
exports.default = verifyAPIkey;
